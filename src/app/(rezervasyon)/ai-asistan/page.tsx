"use client";
// app/(rezervasyon)/ai-asistan/page.tsx
// ─── PetVerse · AI Ön Teşhis Sohbet Arayüzü ─────────────────────────────────
// Tasarım Dili: Tactile Tech / Soft-Brutalism (Anti-Glassmorphism)
//   - Solid renkler, sert siyah sınırlar, basılabilir buton efektleri

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import type { AiTeshisResponse } from "@/app/api/ai-teshis/route";

// ─── Tipler ────────────────────────────────────────────────────────────────────
interface Message {
  role: "user" | "model";
  content: string;
}

interface DiagnosisResult {
  aciliyet: "Yüksek" | "Orta" | "Düşük";
  tavsiye_edilen_hizmet: "Klinik" | "Kuaför";
  ai_ozeti: string;
}

// ─── Yardımcı: Aciliyet renk şeması ───────────────────────────────────────────
const ACILIYET_STYLE: Record<string, { bg: string; text: string; border: string; emoji: string }> = {
  Yüksek: { bg: "bg-red-500",    text: "text-white",    border: "border-red-700",   emoji: "🚨" },
  Orta:   { bg: "bg-amber-400",  text: "text-black",    border: "border-amber-600", emoji: "⚠️" },
  Düşük:  { bg: "bg-emerald-500",text: "text-white",    border: "border-emerald-700",emoji: "✅" },
};

const SPECIES_OPTIONS = ["Köpek", "Kedi", "Kuş", "Tavşan", "Hamster", "Diğer"];

// ─── İlk karşılama mesajı ─────────────────────────────────────────────────────
const WELCOME_MESSAGE = (petName: string, species: string): string =>
  `Merhaba! Ben VetAI, senin ${species.toLowerCase()} dostu ${petName} için buradayım. 🐾\n\n${petName}'in bugün nasıl hissettirdiğini bana anlatır mısın? Hangi belirtileri gözlemledin?`;

export default function AiAsistanPage() {
  const router = useRouter();

  // ─── Aşama durumu: setup → chat → result ──────────────────────────────────
  const [phase, setPhase] = useState<"setup" | "chat" | "result">("setup");
  const [petName, setPetName] = useState("");
  const [petSpecies, setPetSpecies] = useState("Köpek");

  // ─── Chat durumu ───────────────────────────────────────────────────────────
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [diagnosisLoading, setDiagnosisLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  // Yeni mesaj gelince scroll'u aşağı kaydır
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, loading]);

  // ─── Setup → Chat geçişi ───────────────────────────────────────────────────
  const startChat = () => {
    if (!petName.trim()) return;
    const welcome: Message = { role: "model", content: WELCOME_MESSAGE(petName.trim(), petSpecies) };
    setMessages([welcome]);
    setPhase("chat");
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  // ─── Mesaj gönder ─────────────────────────────────────────────────────────
  const sendMessage = async () => {
    const text = input.trim();
    if (!text || loading) return;

    const userMsg: Message = { role: "user", content: text };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-teshis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, petName, petSpecies, finalRequest: false }),
      });
      const data: AiTeshisResponse = await res.json();

      if (data.error) throw new Error(data.error);
      if (data.message) {
        setMessages([...newMessages, { role: "model", content: data.message }]);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Bağlantı hatası";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ─── AI teşhisi iste ─────────────────────────────────────────────────────
  const requestDiagnosis = async () => {
    setDiagnosisLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/ai-teshis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, petName, petSpecies, finalRequest: true }),
      });
      const data: AiTeshisResponse = await res.json();

      if (data.error) throw new Error(data.error);
      if (data.diagnosis) {
        setDiagnosis(data.diagnosis);
        setPhase("result");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Teşhis alınamadı";
      setError(msg);
    } finally {
      setDiagnosisLoading(false);
    }
  };

  // ─── Randevu sayfasına yönlendir ──────────────────────────────────────────
  const goToRandevu = () => {
    if (!diagnosis) return;
    const params = new URLSearchParams({
      petName,
      petSpecies,
      aciliyet: diagnosis.aciliyet,
      hizmet: diagnosis.tavsiye_edilen_hizmet,
      ozet: diagnosis.ai_ozeti,
    });
    router.push(`/randevu?${params.toString()}`);
  };

  // Enter gönder, Shift+Enter yeni satır
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  // ─── RENDER ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-2xl mx-auto">
      {/* ── Sayfa Başlığı ────────────────────────────────────────── */}
      <div className="mb-6">
        <div className="inline-flex items-center gap-2 bg-indigo-100 border-2 border-black rounded-full
                        px-4 py-1.5 text-sm font-bold text-indigo-800 shadow-[2px_2px_0px_0px_#000] mb-3">
          🤖 AI Ön Teşhis
        </div>
        <h1 className="text-3xl font-black tracking-tight text-black">VetAI Asistan</h1>
        <p className="text-zinc-600 font-medium mt-1">
          Evcil hayvanınızın semptomlarını anlatın, yapay zeka ön değerlendirme yapsın.
        </p>
      </div>

      {/* ════════════════════════════════════════════════════════════
          AŞAMA 1: Setup — Pet bilgisi girişi
      ════════════════════════════════════════════════════════════ */}
      {phase === "setup" && (
        <div className="bg-white border-4 border-black rounded-2xl p-6
                        shadow-[6px_6px_0px_0px_#000]">
          <h2 className="text-xl font-black tracking-tight mb-5">
            🐾 Önce evcil hayvanınızı tanıyalım
          </h2>

          {/* Pet adı */}
          <div className="mb-4">
            <label className="block text-sm font-black text-black mb-1.5 uppercase tracking-wide">
              Evcil Hayvanın Adı
            </label>
            <input
              type="text"
              value={petName}
              onChange={(e) => setPetName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && startChat()}
              placeholder="örn. Maviş, Boncuk, Leo..."
              className="w-full px-4 py-3 border-3 border-black rounded-xl font-bold text-black
                         placeholder:text-zinc-400 focus:outline-none focus:ring-0
                         focus:border-indigo-600 transition-colors duration-150 bg-zinc-50"
            />
          </div>

          {/* Tür seçimi — pill butonlar */}
          <div className="mb-6">
            <label className="block text-sm font-black text-black mb-2 uppercase tracking-wide">
              Türü
            </label>
            <div className="flex flex-wrap gap-2">
              {SPECIES_OPTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => setPetSpecies(s)}
                  className={`px-4 py-2 rounded-full border-2 border-black text-sm font-bold
                              transition-all duration-100
                              ${petSpecies === s
                                ? "bg-indigo-600 text-white shadow-none translate-x-0.5 translate-y-0.5"
                                : "bg-white text-black shadow-[2px_2px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5"
                              }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Başlat butonu */}
          <button
            onClick={startChat}
            disabled={!petName.trim()}
            className="w-full py-4 bg-indigo-600 text-white font-black text-base rounded-xl
                       border-2 border-black shadow-[4px_4px_0px_0px_#000]
                       hover:shadow-none hover:translate-x-1 hover:translate-y-1
                       disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-[4px_4px_0px_0px_#000]
                       disabled:hover:translate-x-0 disabled:hover:translate-y-0
                       transition-all duration-100 tracking-tight"
          >
            Sohbete Başla →
          </button>
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          AŞAMA 2: Chat arayüzü
      ════════════════════════════════════════════════════════════ */}
      {phase === "chat" && (
        <div className="flex flex-col gap-4">
          {/* Pet bilgi bandı */}
          <div className="flex items-center gap-3 bg-indigo-600 border-2 border-black rounded-xl
                          px-4 py-2.5 shadow-[3px_3px_0px_0px_#000]">
            <div className="w-8 h-8 rounded-full bg-white border-2 border-black flex items-center
                            justify-center text-base font-black text-indigo-600 flex-none">
              {petName.charAt(0).toUpperCase()}
            </div>
            <div>
              <span className="text-white font-black text-sm">{petName}</span>
              <span className="text-indigo-200 text-xs font-medium ml-2">· {petSpecies}</span>
            </div>
            <button
              onClick={() => { setPhase("setup"); setMessages([]); setDiagnosis(null); }}
              className="ml-auto text-indigo-200 hover:text-white text-xs font-bold transition-colors"
            >
              Değiştir
            </button>
          </div>

          {/* Mesaj listesi */}
          <div
            ref={scrollRef}
            className="bg-white border-4 border-black rounded-2xl p-4 h-96 overflow-y-auto
                       shadow-[6px_6px_0px_0px_#000] flex flex-col gap-3"
          >
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                {/* Model avatar */}
                {msg.role === "model" && (
                  <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-black flex-none
                                  flex items-center justify-center text-sm mr-2 mt-0.5">
                    🤖
                  </div>
                )}
                <div
                  className={`max-w-[78%] px-4 py-2.5 rounded-2xl border-2 border-black text-sm
                              font-medium leading-relaxed whitespace-pre-wrap
                              ${msg.role === "user"
                                ? "bg-indigo-600 text-white rounded-br-sm shadow-[2px_2px_0px_0px_#000]"
                                : "bg-zinc-100 text-black rounded-bl-sm shadow-[2px_2px_0px_0px_#000]"
                              }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}

            {/* Yazıyor göstergesi */}
            {loading && (
              <div className="flex justify-start">
                <div className="w-8 h-8 rounded-full bg-indigo-600 border-2 border-black flex-none
                                flex items-center justify-center text-sm mr-2">
                  🤖
                </div>
                <div className="bg-zinc-100 border-2 border-black rounded-2xl rounded-bl-sm px-4 py-3
                                shadow-[2px_2px_0px_0px_#000]">
                  <div className="flex gap-1 items-center">
                    {[0, 1, 2].map((i) => (
                      <span
                        key={i}
                        className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"
                        style={{ animationDelay: `${i * 0.15}s` }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Hata bandı */}
          {error && (
            <div className="bg-red-100 border-2 border-red-600 rounded-xl px-4 py-3 text-sm
                            font-bold text-red-700 shadow-[2px_2px_0px_0px_#991b1b]">
              ⚠️ {error}
            </div>
          )}

          {/* Input alanı */}
          <div className="flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`${petName}'in semptomlarını yazın... (Enter: gönder, Shift+Enter: satır)`}
              rows={2}
              disabled={loading}
              className="flex-1 px-4 py-3 border-3 border-black rounded-xl text-sm font-medium
                         text-black placeholder:text-zinc-400 focus:outline-none focus:border-indigo-600
                         resize-none bg-white transition-colors duration-150
                         disabled:opacity-60"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || loading}
              className="px-5 py-3 bg-indigo-600 text-white font-black rounded-xl border-2 border-black
                         shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5
                         disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:shadow-[3px_3px_0px_0px_#000]
                         disabled:hover:translate-x-0 disabled:hover:translate-y-0
                         transition-all duration-100 flex-none"
            >
              ↑
            </button>
          </div>

          {/* Teşhis iste butonu — 2+ kullanıcı mesajından sonra göster */}
          {messages.filter((m) => m.role === "user").length >= 2 && !loading && (
            <div className="bg-amber-50 border-2 border-amber-500 rounded-xl p-4
                            shadow-[3px_3px_0px_0px_#d97706]">
              <p className="text-sm font-bold text-amber-800 mb-3">
                💡 Yeterli bilgi toplandı! AI ön teşhisini almak ister misin?
              </p>
              <button
                onClick={requestDiagnosis}
                disabled={diagnosisLoading}
                className="w-full py-3 bg-amber-500 text-black font-black rounded-xl border-2 border-black
                           shadow-[3px_3px_0px_0px_#000] hover:shadow-none hover:translate-x-0.5 hover:translate-y-0.5
                           disabled:opacity-60 disabled:cursor-not-allowed
                           transition-all duration-100 text-sm tracking-tight"
              >
                {diagnosisLoading ? "🔍 Analiz ediliyor..." : "🩺 AI Teşhisi Al"}
              </button>
            </div>
          )}
        </div>
      )}

      {/* ════════════════════════════════════════════════════════════
          AŞAMA 3: Teşhis sonucu
      ════════════════════════════════════════════════════════════ */}
      {phase === "result" && diagnosis && (() => {
        const style = ACILIYET_STYLE[diagnosis.aciliyet] ?? ACILIYET_STYLE["Orta"];
        return (
          <div className="flex flex-col gap-4">
            {/* Sonuç kartı */}
            <div className="bg-white border-4 border-black rounded-2xl overflow-hidden
                            shadow-[6px_6px_0px_0px_#000]">
              {/* Aciliyet bandı */}
              <div className={`${style.bg} ${style.text} px-6 py-4 border-b-4 border-black`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-0.5">
                      Aciliyet Düzeyi
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{style.emoji}</span>
                      <span className="text-2xl font-black tracking-tight">{diagnosis.aciliyet}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-black uppercase tracking-widest opacity-80 mb-0.5">
                      Önerilen Hizmet
                    </p>
                    <span className="text-xl font-black">
                      {diagnosis.tavsiye_edilen_hizmet === "Klinik" ? "🏥 Klinik" : "✂️ Kuaför"}
                    </span>
                  </div>
                </div>
              </div>

              {/* AI özeti */}
              <div className="px-6 py-5">
                <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-2">
                  AI Değerlendirmesi
                </p>
                <p className="text-base font-medium text-black leading-relaxed">
                  {diagnosis.ai_ozeti}
                </p>

                {/* Uyarı notu */}
                <div className="mt-4 bg-zinc-100 border-2 border-zinc-300 rounded-xl px-4 py-3">
                  <p className="text-xs font-bold text-zinc-600">
                    ⚕️ Bu sonuç bir ön değerlendirmedir. Kesin teşhis için mutlaka bir veterinere başvurun.
                  </p>
                </div>
              </div>
            </div>

            {/* CTA butonları */}
            <div className="grid grid-cols-2 gap-3">
              {/* Randevu oluştur */}
              <button
                onClick={goToRandevu}
                className="py-4 bg-indigo-600 text-white font-black text-sm rounded-xl border-2 border-black
                           shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1
                           transition-all duration-100 tracking-tight"
              >
                📅 Randevu Oluştur
              </button>

              {/* Yeniden başla */}
              <button
                onClick={() => { setPhase("setup"); setMessages([]); setDiagnosis(null); setPetName(""); }}
                className="py-4 bg-white text-black font-black text-sm rounded-xl border-2 border-black
                           shadow-[4px_4px_0px_0px_#000] hover:shadow-none hover:translate-x-1 hover:translate-y-1
                           transition-all duration-100 tracking-tight"
              >
                🔄 Yeni Teşhis
              </button>
            </div>

            {/* Sohbet özeti */}
            <details className="bg-white border-2 border-zinc-300 rounded-xl overflow-hidden">
              <summary className="px-4 py-3 text-sm font-black text-zinc-600 cursor-pointer
                                   hover:bg-zinc-50 transition-colors">
                📋 Sohbet Geçmişi ({messages.length} mesaj)
              </summary>
              <div className="px-4 pb-4 max-h-48 overflow-y-auto flex flex-col gap-2 mt-2">
                {messages.map((m, i) => (
                  <div key={i} className={`text-xs font-medium px-3 py-2 rounded-lg
                    ${m.role === "user" ? "bg-indigo-50 text-indigo-900" : "bg-zinc-100 text-zinc-700"}`}>
                    <span className="font-black mr-1">{m.role === "user" ? "Sen:" : "VetAI:"}</span>
                    {m.content.slice(0, 120)}{m.content.length > 120 ? "…" : ""}
                  </div>
                ))}
              </div>
            </details>
          </div>
        );
      })()}
    </div>
  );
}
