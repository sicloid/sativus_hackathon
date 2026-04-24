"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";

interface Message {
  role: "user" | "model";
  content: string;
}

export default function AiAsistan() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Merhaba! Ben VetAI, PetVerse'in uzman yapay zeka asistanıyım. Dostumuzun ne gibi şikayetleri var?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{ aciliyet: string; tavsiye_edilen_hizmet: string; ai_ozeti: string } | null>(null);
  
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, diagnosis]);

  const sendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const newMessages = [...messages, { role: "user" as const, content: input }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/ai-teshis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newMessages, finalRequest: false })
      });
      const data = await res.json();
      
      if (data.message) {
        setMessages([...newMessages, { role: "model", content: data.message }]);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const finishDiagnosis = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/ai-teshis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages, finalRequest: true })
      });
      const data = await res.json();
      
      if (data.diagnosis) {
        setDiagnosis(data.diagnosis);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const goToReservation = () => {
    const params = new URLSearchParams();
    if (diagnosis) {
      params.set("aciliyet", diagnosis.aciliyet);
      params.set("hizmet", diagnosis.tavsiye_edilen_hizmet);
      params.set("ozet", diagnosis.ai_ozeti);
    }
    router.push(`/randevu?${params.toString()}`);
  };

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-8 text-black font-sans">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <header className="border-4 border-black bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
          <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">Yapay Zeka Ön Teşhis</h1>
          <p className="mt-2 text-zinc-700 font-bold">Evcil hayvanınızın semptomlarını anlatın, VetAI ön değerlendirme yapsın.</p>
        </header>

        {/* Chat Area */}
        <div className="border-4 border-black bg-white rounded-2xl p-4 sm:p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col h-[50vh] overflow-hidden">
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`
                  px-4 py-3 rounded-2xl border-2 border-black max-w-[85%] font-bold text-lg
                  ${msg.role === "user" ? "bg-indigo-300 rounded-br-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" : "bg-emerald-300 rounded-bl-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}
                `}>
                  {msg.content}
                </div>
              </div>
            ))}
            {isLoading && !diagnosis && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl border-2 border-black bg-emerald-300 rounded-bl-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-lg animate-pulse">
                  VetAI Düşünüyor...
                </div>
              </div>
            )}
            <div ref={chatEndRef} />
          </div>

          {/* Input Area */}
          {!diagnosis ? (
            <form onSubmit={sendMessage} className="mt-4 flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Şikayetinizi yazın..."
                className="flex-1 border-4 border-black rounded-2xl px-4 py-3 font-bold text-lg bg-zinc-50 focus:outline-none focus:bg-yellow-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] placeholder:text-zinc-500"
                disabled={isLoading}
              />
              <button 
                type="submit" 
                disabled={isLoading}
                className="bg-indigo-600 text-white border-4 border-black rounded-2xl px-6 py-3 font-black uppercase text-lg tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-50 disabled:transform-none disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
              >
                Gönder
              </button>
            </form>
          ) : (
            <div className="mt-4 p-4 border-4 border-black bg-yellow-300 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black text-center text-lg uppercase">
              Teşhis tamamlandı. Sonuçları inceleyin.
            </div>
          )}
        </div>

        {/* Diagnosis Action */}
        {!diagnosis && messages.length > 2 && (
          <div className="flex justify-center">
             <button 
                onClick={finishDiagnosis}
                disabled={isLoading}
                className="bg-rose-500 text-white border-4 border-black rounded-2xl px-8 py-4 font-black uppercase text-lg tracking-wide shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:translate-x-2 active:shadow-none transition-all disabled:opacity-50"
              >
                Teşhisi Tamamla ve Sonuçları Gör
              </button>
          </div>
        )}

        {/* Diagnosis Result */}
        {diagnosis && (
          <div className="border-4 border-black bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] space-y-6">
            <h2 className="text-3xl font-black uppercase border-b-4 border-black pb-2">Teşhis Sonucu</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="border-4 border-black p-4 rounded-2xl bg-orange-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-sm uppercase font-black text-zinc-600">Aciliyet</div>
                <div className="text-3xl font-black">{diagnosis.aciliyet}</div>
              </div>
              <div className="border-4 border-black p-4 rounded-2xl bg-cyan-200 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-sm uppercase font-black text-zinc-600">Önerilen Hizmet</div>
                <div className="text-3xl font-black">{diagnosis.tavsiye_edilen_hizmet}</div>
              </div>
            </div>

            <div className="border-4 border-black p-4 rounded-2xl bg-zinc-100 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div className="text-sm uppercase font-black text-zinc-600 mb-2">Yapay Zeka Özeti</div>
              <p className="font-bold text-lg leading-relaxed">{diagnosis.ai_ozeti}</p>
            </div>

            <button 
              onClick={goToReservation}
              className="w-full mt-4 bg-emerald-500 text-black border-4 border-black rounded-2xl px-6 py-4 font-black uppercase text-xl tracking-wide shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] active:translate-y-2 active:translate-x-2 active:shadow-none transition-all"
            >
              Hemen Randevu Oluştur
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
