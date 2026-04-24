// app/api/ai-teshis/route.ts
// ─── PetVerse · AI Ön Teşhis API Route ───────────────────────────────────────
//
// Bu route Gemini 1.5 Flash modeline katı bir sistem promptu göndererek
// SADECE yapılandırılmış JSON çıktısı alır:
//   { aciliyet, tavsiye_edilen_hizmet, ai_ozeti }
//
// İki işlevi vardır:
//   POST /api/ai-teshis  → Sohbet mesajlarını alır, Gemini'ye gönderir
//   GET  /api/ai-teshis  → Sağlık kontrolü

import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

// ─── Tip Tanımları ─────────────────────────────────────────────────────────────
interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface AiTeshisRequest {
  messages: ChatMessage[];        // Tüm sohbet geçmişi
  petName?: string;               // Evcil hayvan adı (bağlam için)
  petSpecies?: string;            // Tür (köpek/kedi/vb.)
  finalRequest?: boolean;         // true → JSON çıktısı iste
}

export interface AiTeshisResponse {
  // Standart sohbet yanıtı
  message?: string;
  // JSON teşhis sonucu (finalRequest=true olduğunda)
  diagnosis?: {
    aciliyet: "Yüksek" | "Orta" | "Düşük";
    tavsiye_edilen_hizmet: "Klinik" | "Kuaför";
    ai_ozeti: string;
  };
  error?: string;
}

// ─── Sistem Promptu ────────────────────────────────────────────────────────────
// İki aşamalı davranış tanımı:
// 1. Sohbet aşaması: Semptomları topla, empati kur, Türkçe konuş
// 2. Teşhis aşaması: Katı JSON formatı döndür, başka hiçbir şey yazma
const SYSTEM_PROMPT = `Sen "VetAI", PetVerse platformunun uzman veteriner yapay zeka asistanısın.
Görevin: Evcil hayvan sahiplerinin anlattığı semptomları dinleyerek hızlı ve güvenilir bir ön teşhis yapmak.

DAVRANIŞ KURALLARI:
- Türkçe konuş, sıcak ve güven verici bir ton kullan.
- Maksimum 2-3 kısa soru sor; sahipten gerekli bilgileri al.
- Felsefi tartışmalara, genel sohbete veya konu dışı sorulara GİRME. Kibarca yönlendir.
- Kesin teşhis koyma. "Bu bir ön değerlendirmedir, mutlaka veterinere gidin" uyarısını her zaman ekle.
- Acil durum sinyalleri (nefes darlığı, bilinç kaybı, aşırı kanama, felç): Hemen "ACİL - KLİNİĞE GÖTÜRÜN" uyarısı ver.

TOPLAMANIZ GEREKEN BİLGİLER:
1. Semptomlar neler? Ne zamandır devam ediyor?
2. Hayvanın yaşı ve genel sağlık geçmişi?
3. Son zamanlarda yeni bir yiyecek, ilaç veya ortam değişikliği oldu mu?

SONUÇ ÇIKTISI (finalRequest=true olduğunda KESİNLİKLE SADECE aşağıdaki JSON'u döndür, hiç metin ekleme):
{
  "aciliyet": "Yüksek|Orta|Düşük",
  "tavsiye_edilen_hizmet": "Klinik|Kuaför",
  "ai_ozeti": "2-3 cümle kısa değerlendirme"
}

ACİLİYET KRITERLERI:
- Yüksek: Hayatı tehdit eden belirtiler, acil müdahale gerekli
- Orta: 24-48 saat içinde veteriner ziyareti önerilir
- Düşük: Rutin kontrol veya estetik bakım yeterli

HİZMET KRİTERLERİ:
- Klinik: Tıbbi müdahale, ilaç veya tanı gerektirenler
- Kuaför: Sadece bakım/estetik (tırnak, tüy, banyo vb.) gerektiren durumlar`;

// ─── Gemini Client Başlatma ─────────────────────────────────────────────────────
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "buraya_gemini_api_key_yaz") {
    throw new Error("GEMINI_API_KEY ortam değişkeni tanımlanmamış veya placeholder değeri taşıyor.");
  }
  return new GoogleGenerativeAI(apiKey);
}

// ─── POST Handler ───────────────────────────────────────────────────────────────
export async function POST(req: NextRequest): Promise<NextResponse<AiTeshisResponse>> {
  try {
    const body: AiTeshisRequest = await req.json();
    const { messages, petName, petSpecies, finalRequest } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Mesaj geçmişi boş olamaz." }, { status: 400 });
    }

    const genAI = getGeminiClient();

    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: finalRequest ? 0.1 : 0.7,   // Teşhiste düşük sıcaklık → deterministik JSON
        maxOutputTokens: finalRequest ? 300 : 500,
        candidateCount: 1,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ],
    });

    // Gemini'nin beklediği history formatına dönüştür
    // Son mesaj "contents" olarak gönderilmeli, geri kalanlar "history"'ye
    const history = messages.slice(0, -1).map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    // Gemini API'si history'nin her zaman 'user' ile başlamasını bekler.
    // İlk mesaj genelde UI'daki "Merhaba!" model mesajıdır, bunu çıkarıyoruz.
    if (history.length > 0 && history[0].role === "model") {
      history.shift();
    }

    const lastMessage = messages[messages.length - 1];

    // finalRequest=true → Gemini'ye JSON üretme talimatı ekle
    const userPrompt = finalRequest
      ? `[BAĞLAM: Hayvan Adı: ${petName || "Belirtilmedi"}, Tür: ${petSpecies || "Belirtilmedi"}]\n\nTüm sohbeti değerlendirerek SADECE JSON formatında teşhis sonucunu döndür. Başka hiçbir metin ekleme.`
      : lastMessage.content;

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(userPrompt);
    const rawText = result.response.text().trim();

    // finalRequest=true ise JSON parse et ve doğrula
    if (finalRequest) {
      try {
        // Gemini bazen markdown kod bloğu içinde verir, temizle
        const cleaned = rawText
          .replace(/^```json\s*/i, "")
          .replace(/^```\s*/i, "")
          .replace(/\s*```$/i, "")
          .trim();

        const parsed = JSON.parse(cleaned);

        // Zorunlu alan kontrolü
        const validAciliyet = ["Yüksek", "Orta", "Düşük"];
        const validHizmet = ["Klinik", "Kuaför"];

        if (
          !validAciliyet.includes(parsed.aciliyet) ||
          !validHizmet.includes(parsed.tavsiye_edilen_hizmet) ||
          typeof parsed.ai_ozeti !== "string"
        ) {
          throw new Error("JSON şeması geçersiz");
        }

        return NextResponse.json({
          diagnosis: {
            aciliyet: parsed.aciliyet,
            tavsiye_edilen_hizmet: parsed.tavsiye_edilen_hizmet,
            ai_ozeti: parsed.ai_ozeti,
          },
        });
      } catch (parseError) {
        console.error("[AI-TESHIS] JSON parse hatası:", parseError, "\nHam yanıt:", rawText);
        return NextResponse.json(
          { error: "AI yanıtı JSON formatında değil. Lütfen tekrar deneyin." },
          { status: 502 }
        );
      }
    }

    // Normal sohbet yanıtı
    return NextResponse.json({ message: rawText });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[AI-TESHIS] Route hatası:", message);

    // API anahtarı eksikse özel hata kodu
    if (message.includes("GEMINI_API_KEY")) {
      return NextResponse.json({ error: message }, { status: 503 });
    }

    return NextResponse.json({ error: `Servis hatası: ${message}` }, { status: 500 });
  }
}

// ─── GET Handler (Sağlık Kontrolü) ─────────────────────────────────────────────
export async function GET(): Promise<NextResponse> {
  const hasKey = !!(process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY !== "buraya_gemini_api_key_yaz");
  return NextResponse.json({
    status: "ok",
    service: "PetVerse AI Teşhis",
    model: "gemini-2.0-flash",
    apiKeyConfigured: hasKey,
    timestamp: new Date().toISOString(),
  });
}
