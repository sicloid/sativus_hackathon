"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { X, Send, Stethoscope } from "lucide-react";

interface Message {
  role: "user" | "model";
  content: string;
}

export function FloatingAIBot() {
  const [isVisible, setIsVisible] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  
  // Chat State
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Merhaba! Ben PetVerse Asistanı VetAI. Mağaza, hizmetlerimiz veya genel sorularınız hakkında size nasıl yardımcı olabilirim?" }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{ aciliyet: string; tavsiye_edilen_hizmet: string; ai_ozeti: string } | null>(null);
  
  const router = useRouter();
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Initial animation
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-scroll
  useEffect(() => {
    if (isOpen) {
      chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, diagnosis, isOpen]);

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
    setIsOpen(false);
    router.push(`/randevu?${params.toString()}`);
  };

  return (
    <>
      {/* CHAT WIDGET MODAL / POPOVER */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 md:bottom-10 md:right-10 z-[60] w-[calc(100vw-32px)] md:w-[450px] h-[80vh] max-h-[700px] bg-white border-4 border-black rounded-[2rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden animate-in slide-in-from-bottom-10 fade-in duration-300">
          
          {/* Header */}
          <div className="bg-[#a855f7] border-b-4 border-black p-4 flex items-center justify-between shrink-0">
            <div className="flex items-center gap-3 overflow-hidden">
              <div className="w-10 h-10 shrink-0 bg-white rounded-full border-2 border-black flex items-center justify-center shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-xl">🤖</span>
              </div>
              <div className="min-w-0">
                <h3 className="text-white font-black uppercase text-lg sm:text-xl truncate">VetAI Asistan</h3>
                <p className="text-white font-bold text-[10px] sm:text-xs opacity-90 mt-1 truncate">Anında Teşhis Sistemi</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)}
              className="w-10 h-10 shrink-0 bg-white border-2 border-black rounded-xl flex items-center justify-center hover:bg-zinc-200 active:translate-y-1 active:shadow-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all ml-2"
            >
              <X className="w-6 h-6 text-black" />
            </button>
          </div>

          {/* Chat Body */}
          <div className="flex-1 overflow-y-auto p-4 bg-zinc-50 space-y-4">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`
                  px-4 py-3 rounded-2xl border-2 border-black max-w-[85%] font-bold text-sm sm:text-base break-words
                  ${msg.role === "user" 
                    ? "bg-[#3b82f6] text-white rounded-br-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" 
                    : "bg-[#bbf7d0] text-black rounded-bl-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"}
                `}>
                  {msg.content}
                </div>
              </div>
            ))}
            
            {isLoading && !diagnosis && (
              <div className="flex justify-start">
                <div className="px-4 py-3 rounded-2xl border-2 border-black bg-[#bbf7d0] rounded-bl-none shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-bold text-base flex gap-2 items-center">
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                  <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{ animationDelay: "0.4s" }} />
                </div>
              </div>
            )}
            
            {/* Diagnosis Result Box */}
            {diagnosis && (
              <div className="mt-4 border-4 border-black bg-white rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <div className="bg-[#fef08a] border-b-4 border-black p-3 text-center">
                  <span className="font-black uppercase text-lg">VetAI Teşhis Raporu</span>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex justify-between items-center border-b-2 border-zinc-200 pb-2">
                    <span className="font-bold text-zinc-500 uppercase text-xs">Aciliyet Durumu</span>
                    <span className={`font-black uppercase px-3 py-1 rounded-full border-2 border-black text-sm
                      ${diagnosis.aciliyet.includes('Yüksek') || diagnosis.aciliyet.includes('Acil') ? 'bg-rose-400' : 
                        diagnosis.aciliyet.includes('Orta') ? 'bg-orange-300' : 'bg-emerald-300'}
                    `}>
                      {diagnosis.aciliyet}
                    </span>
                  </div>
                  <div className="border-b-2 border-zinc-200 pb-2">
                    <span className="font-bold text-zinc-500 uppercase text-xs block mb-1">Tavsiye Edilen Hizmet</span>
                    <span className="font-black text-lg">{diagnosis.tavsiye_edilen_hizmet}</span>
                  </div>
                  <div>
                    <span className="font-bold text-zinc-500 uppercase text-xs block mb-1">Özet Analiz</span>
                    <p className="font-bold text-sm leading-snug">{diagnosis.ai_ozeti}</p>
                  </div>
                  <button 
                    onClick={goToReservation}
                    className="w-full mt-2 bg-[#3b82f6] text-white border-4 border-black rounded-xl px-4 py-3 font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
                  >
                    Hemen Randevu Al
                  </button>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Footer Input Area */}
          {!diagnosis && (
            <div className="p-4 bg-white border-t-4 border-black">
              {!diagnosis && messages.length > 2 && (
                <button 
                  onClick={finishDiagnosis}
                  disabled={isLoading}
                  className="w-full mb-3 bg-[#fef08a] text-black border-4 border-black rounded-xl px-4 py-2 font-black uppercase text-sm flex items-center justify-center gap-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50 disabled:transform-none"
                >
                  <Stethoscope className="w-5 h-5" />
                  Teşhisi Tamamla
                </button>
              )}
              <form onSubmit={sendMessage} className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Sorunuzu yazın..."
                  className="flex-1 border-4 border-black rounded-xl px-4 py-3 font-bold text-base bg-zinc-50 focus:outline-none focus:bg-white shadow-inner placeholder:text-zinc-400"
                  disabled={isLoading}
                />
                <button 
                  type="submit" 
                  disabled={isLoading}
                  className="bg-black text-white border-2 border-black rounded-xl w-14 flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-50"
                >
                  <Send className="w-5 h-5" />
                </button>
              </form>
            </div>
          )}
        </div>
      )}

      {/* FLOATING TRIGGER BUTTON */}
      {!isOpen && (
        <div 
          className={`fixed z-50 transition-all duration-700 ease-out 
            ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
            bottom-6 right-6 md:bottom-10 md:right-10
          `}
        >
          <button 
            onClick={() => setIsOpen(true)}
            className="group block"
          >
            <div className="bg-[#a855f7] border-[4px] border-black rounded-full shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 transition-all p-4 md:p-6 flex items-center gap-6 cursor-pointer">
              <div className="bg-white rounded-full p-3 border-[3px] border-black animate-bounce shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                <span className="text-4xl md:text-5xl leading-none block">🤖</span>
              </div>
              <div className="flex-1 text-left hidden sm:block pr-4">
                <p className="text-white font-black uppercase text-xl md:text-2xl leading-tight">VetAI Asistan</p>
                <p className="text-white font-bold text-sm md:text-base opacity-90 mt-1">Hızlı Rehber ve Sorularınız</p>
              </div>
            </div>
          </button>
        </div>
      )}
    </>
  );
}
