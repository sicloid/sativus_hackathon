// app/api/ai-global/route.ts
import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI, HarmCategory, HarmBlockThreshold } from "@google/generative-ai";

interface ChatMessage {
  role: "user" | "model";
  content: string;
}

interface AiGlobalRequest {
  messages: ChatMessage[];
}

const SYSTEM_PROMPT = `Sen "VetAI", PetVerse platformunun genel rehber asistanısın.
Görevin: Site ziyaretçilerine yardımcı olmak, pet bakımı hakkında genel soruları yanıtlamak ve onları sitenin doğru bölümlerine yönlendirmek.

DAVRANIŞ KURALLARI:
- Türkçe konuş, samimi, eğlenceli ve yardımsever bir ton kullan.
- Felsefi, politik veya konu dışı sorulara girme; kibarca reddet.
- Kesin tıbbi teşhis koyma. "Ben bir genel asistanım, sağlık sorunları için lütfen Randevu sayfasından uzman hekimlerimize görünün" uyarısı yap.
- Hastalık veya acil durum belirtisi (kanama, bayılma, kırık, şiddetli kusma vb.) duyarsan kullanıcıyı hemen "/randevu" adresine veya "Acil Randevu"ya yönlendir.
- Ürünler hakkında sorular gelirse "/magaza" adresini tavsiye et.
- Blog veya bilgi sayfaları için "/blog" adresini tavsiye et.
- Sadece metin olarak yanıt ver. Uzun destanlar yazma, olabildiğince kısa ve öz ol (maks 3-4 cümle).
`;

function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === "buraya_gemini_api_key_yaz") {
    throw new Error("GEMINI_API_KEY bulunamadı.");
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function POST(req: NextRequest) {
  try {
    const body: AiGlobalRequest = await req.json();
    const { messages } = body;

    if (!messages || messages.length === 0) {
      return NextResponse.json({ error: "Mesaj geçmişi boş olamaz." }, { status: 400 });
    }

    const genAI = getGeminiClient();

    const model = genAI.getGenerativeModel({
      model: "gemini-3.1-flash-lite-preview",
      systemInstruction: SYSTEM_PROMPT,
      generationConfig: {
        temperature: 0.7,
      },
      safetySettings: [
        { category: HarmCategory.HARM_CATEGORY_HARASSMENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
        { category: HarmCategory.HARM_CATEGORY_HATE_SPEECH, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE },
      ],
    });

    const history = messages.slice(0, -1).map((m) => ({
      role: m.role,
      parts: [{ text: m.content }],
    }));

    if (history.length > 0 && history[0].role === "model") {
      history.shift();
    }

    const lastMessage = messages[messages.length - 1];

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(lastMessage.content);
    const rawText = result.response.text().trim();

    return NextResponse.json({ message: rawText });

  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Bilinmeyen hata";
    console.error("[AI-GLOBAL] Route hatası:", message);
    return NextResponse.json({ error: `Servis hatası: ${message}` }, { status: 500 });
  }
}
