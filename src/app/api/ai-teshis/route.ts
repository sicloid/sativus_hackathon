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
    tavsiye_edilen_hizmet: "Dahiliye" | "Cerrahi" | "Dermatoloji" | "Genel Muayene" | "Kuaför";
    ai_ozeti: string;
  };
  error?: string;
}

// ─── Sistem Promptu ────────────────────────────────────────────────────────────
// İki aşamalı davranış tanımı:
// 1. Sohbet aşaması: Semptomları detaylıca topla, eksik bilgileri sor, empati kur
// 2. Teşhis aşaması: Katı JSON formatı döndür, başka hiçbir şey yazma
const SYSTEM_PROMPT = `Sen "VetAI", PetVerse platformunun uzman veteriner yapay zeka asistanısın.
Görevin: Evcil hayvan sahiplerinin anlattığı semptomları detaylıca analiz etmek, eksik bilgileri sorarak durumu netleştirmek ve güvenilir bir ön teşhis yapmak.

DAVRANIŞ KURALLARI:
- Türkçe konuş, empati kur, bilimsel ve güven verici bir ton kullan.
- İlk mesajda TEŞHİS KOYMA. Hasta sahibinden mutlaka "Ateşi var mı?", "Ne zamandır devam ediyor?", "İştahsızlık veya halsizlik var mı?" gibi durumu aydınlatacak kritik sorular sor.
- Hastanın yaşı, türü ve mevcut hastalık geçmişi hakkında bilgi almaya çalış.
- Felsefi tartışmalara, genel sohbete GİRME. Sadece tıbbi ve veterinerlik bağlamında kal.
- Acil durum sinyalleri (nefes darlığı, bilinç kaybı, aşırı kanama, felç, zehirlenme): Hemen "ACİL DURUM - LÜTFEN VAKİT KAYBETMEDEN KLİNİĞE GÖTÜRÜN" uyarısı ver.

SONUÇ ÇIKTISI (Sistem senden "finalRequest: true" ile nihai teşhisi istediğinde, KESİNLİKLE SADECE aşağıdaki formatta JSON döndür, başına veya sonuna markdown ( \`\`\`json vb. ) veya metin ekleme):
{
  "aciliyet": "Yüksek|Orta|Düşük",
  "tavsiye_edilen_hizmet": "Dahiliye|Cerrahi|Dermatoloji|Genel Muayene|Kuaför",
  "ai_ozeti": "Hastalığın tıbbi özeti ve klinik değerlendirme (Maks 3 cümle)"
}

ACİLİYET KRITERLERI:
- Yüksek: Hayatı tehdit eden belirtiler (örn: kanama, solunum güçlüğü, nöbet, yüksek ateş).
- Orta: 24-48 saat içinde müdahale edilmeli (örn: kusma, topallama, geçmeyen ishal).
- Düşük: Acil olmayan, rutin işlemler veya hafif semptomlar (örn: hafif kaşıntı, tüy bakımı, aşı).

HİZMET KRİTERLERİ:
- En uygun bölümü seç: Dahiliye, Cerrahi, Dermatoloji, Genel Muayene veya Kuaför.`;

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
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: finalRequest ? 0.1 : 0.7,   // Teşhiste düşük sıcaklık → deterministik JSON
        candidateCount: 1,
        responseMimeType: finalRequest ? "application/json" : undefined,
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

        let parsed;
        try {
          parsed = JSON.parse(cleaned);
        } catch {
          // JSON yarım kalmış olabilir — regex ile alanları çıkar
          console.warn("[AI-TESHIS] JSON parse başarısız, regex ile kurtarılıyor. Ham:", cleaned);
          const aciliyetMatch = cleaned.match(/"aciliyet"\s*:\s*"(Yüksek|Orta|Düşük)"/);
          const hizmetMatch = cleaned.match(/"tavsiye_edilen_hizmet"\s*:\s*"(Dahiliye|Cerrahi|Dermatoloji|Genel Muayene|Kuaför)"/);
          const ozetMatch = cleaned.match(/"ai_ozeti"\s*:\s*"([^"]+)"/);

          if (aciliyetMatch && hizmetMatch && ozetMatch) {
            parsed = {
              aciliyet: aciliyetMatch[1],
              tavsiye_edilen_hizmet: hizmetMatch[1],
              ai_ozeti: ozetMatch[1],
            };
          } else {
            throw new Error("JSON alanları regex ile de bulunamadı");
          }
        }

        // Zorunlu alan kontrolü
        const validAciliyet = ["Yüksek", "Orta", "Düşük"];
        const validHizmet = ["Dahiliye", "Cerrahi", "Dermatoloji", "Genel Muayene", "Kuaför"];

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
          { error: "AI yanıtı işlenemedi. Lütfen tekrar deneyin." },
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
    model: "gemini-3-flash-preview",
    apiKeyConfigured: hasKey,
    timestamp: new Date().toISOString(),
  });
}
