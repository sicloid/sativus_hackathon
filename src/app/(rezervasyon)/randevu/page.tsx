/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useRef, useEffect } from "react";
import { createAppointment, getProviders } from "./actions";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, PawPrint, User, Phone, Bot, Stethoscope } from "lucide-react";
import { motion } from "framer-motion";
import { useFormState } from "react-dom";

interface Message {
  role: "user" | "model";
  content: string;
}

const initialState = { error: "" };

import { mapLocations } from "@/data/mapLocations";

function getDistanceFromLatLonInKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371; 
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180; 
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
  return R * c;
}

function BookingForm({ diagnosis }: { diagnosis: any }) {
  const [providers, setProviders] = useState<any[]>([]);
  const [state, formAction] = useFormState(createAppointment, initialState);
  const [selectedProviderId, setSelectedProviderId] = useState<string>("");
  const [nearestMsg, setNearestMsg] = useState("");
  
  const aiAciliyet = diagnosis?.aciliyet || "";
  const aiHizmet = diagnosis?.tavsiye_edilen_hizmet || "";
  const aiOzeti = diagnosis?.ai_ozeti || "";

  useEffect(() => {
    getProviders().then(data => setProviders(data));
  }, []);

  useEffect(() => {
    if (aiAciliyet === "Yüksek" && providers.length > 0 && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          let nearest = mapLocations[0];
          let minDist = Infinity;
          
          for (const loc of mapLocations) {
            const dist = getDistanceFromLatLonInKm(latitude, longitude, loc.lat, loc.lng);
            if (dist < minDist) {
              minDist = dist;
              nearest = loc;
            }
          }
          
          setNearestMsg(`📍 Konumunuza en yakın klinik (${nearest.isim}) otomatik seçildi.`);
          
          // Match DB provider or fallback
          const matchedDbProvider = providers.find(p => p.name.includes(nearest.isim) || nearest.isim.includes(p.name));
          if (matchedDbProvider) {
            setSelectedProviderId(matchedDbProvider.id);
          } else {
            setSelectedProviderId(providers[0].id);
          }
        },
        (error) => {
          console.warn("Konum alınamadı:", error);
          setSelectedProviderId(providers[0]?.id || "");
        }
      );
    }
  }, [aiAciliyet, providers]);

  return (
    <form action={formAction} className="space-y-6 flex flex-col">
      {state?.error && (
        <div className="bg-red-100 border-4 border-red-500 rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4 text-red-900 font-bold">
          {state.error}
        </div>
      )}
      <input type="hidden" name="aiAciliyet" value={aiAciliyet} />
      <input type="hidden" name="aiHizmet" value={aiHizmet} />
      <input type="hidden" name="aiOzeti" value={aiOzeti} />

      <div className="space-y-2">
        <label className="font-black uppercase text-sm ml-2">Klinik / Hekim Seçimi</label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Stethoscope className="w-5 h-5 text-zinc-500" />
          </div>
          <select 
            name="providerId"
            required
            value={selectedProviderId}
            onChange={(e) => setSelectedProviderId(e.target.value)}
            className="w-full bg-white border-4 border-black rounded-2xl py-3 pl-12 pr-4 font-bold text-base focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] appearance-none"
          >
            <option value="" disabled>Lütfen klinik veya hekim seçin</option>
            {providers.map(p => (
              <option key={p.id} value={p.id}>{p.name} - {p.specialty || "Klinik"}</option>
            ))}
          </select>
        </div>
      </div>

      {(aiAciliyet || aiHizmet) && (
        <div className="bg-[#bbf7d0] border-4 border-black rounded-2xl p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mb-4">
          <p className="font-black uppercase text-sm mb-2 text-emerald-900">VetAI Önerileri Forma Eklendi</p>
          <div className="flex gap-2 flex-wrap mb-2">
            {aiAciliyet && <span className="bg-white border-2 border-black rounded-lg px-3 py-1 text-sm font-bold">{aiAciliyet} Aciliyet</span>}
            {aiHizmet && <span className="bg-white border-2 border-black rounded-lg px-3 py-1 text-sm font-bold">{aiHizmet} Hizmeti</span>}
          </div>
          {nearestMsg && (
            <p className="text-sm font-bold text-emerald-800 animate-pulse">{nearestMsg}</p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-black uppercase text-sm ml-2">Evcil Hayvan Adı</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <PawPrint className="w-5 h-5 text-zinc-500" />
            </div>
            <input 
              name="petName"
              type="text"
              placeholder="Karabaş"
              required
              className="w-full bg-white border-4 border-black rounded-2xl py-3 pl-12 pr-4 font-bold text-base placeholder:text-zinc-400 focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-black uppercase text-sm ml-2">Türü (Kedi, Köpek vb.)</label>
          <input 
            name="petSpecies"
            type="text"
            placeholder="Köpek"
            className="w-full bg-white border-4 border-black rounded-2xl py-3 px-4 font-bold text-base placeholder:text-zinc-400 focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-black uppercase text-sm ml-2">Hasta Sahibi</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <User className="w-5 h-5 text-zinc-500" />
            </div>
            <input 
              name="ownerName"
              type="text"
              placeholder="Ad Soyad"
              required
              className="w-full bg-white border-4 border-black rounded-2xl py-3 pl-12 pr-4 font-bold text-base placeholder:text-zinc-400 focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-black uppercase text-sm ml-2">Telefon</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Phone className="w-5 h-5 text-zinc-500" />
            </div>
            <input 
              name="ownerPhone"
              type="tel"
              placeholder="05XX XXX XX XX"
              required
              className="w-full bg-white border-4 border-black rounded-2xl py-3 pl-12 pr-4 font-bold text-base placeholder:text-zinc-400 focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="font-black uppercase text-sm ml-2">Tarih</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Calendar className="w-5 h-5 text-zinc-500" />
            </div>
            <input 
              name="date"
              type="date"
              required
              className="w-full bg-white border-4 border-black rounded-2xl py-3 pl-12 pr-4 font-bold text-base placeholder:text-zinc-400 focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="font-black uppercase text-sm ml-2">Saat</label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Clock className="w-5 h-5 text-zinc-500" />
            </div>
            <select 
              name="time"
              required
              className="w-full bg-white border-4 border-black rounded-2xl py-3 pl-12 pr-4 font-bold text-base focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] appearance-none"
            >
              <option value="">Saat Seçin</option>
              <option value="09:00">09:00</option>
              <option value="10:00">10:00</option>
              <option value="11:30">11:30</option>
              <option value="13:00">13:00</option>
              <option value="14:30">14:30</option>
              <option value="16:00">16:00</option>
            </select>
          </div>
        </div>
      </div>

      <div className="pt-6">
        <button 
          type="submit"
          className="w-full bg-[#3b82f6] text-white border-4 border-black rounded-2xl py-4 font-black uppercase text-xl flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all"
        >
          Randevuyu Onayla
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

    </form>
  );
}

export default function UnifiedBookingPage() {
  const [mode, setMode] = useState<"select" | "manual" | "ai">("select");
  const [messages, setMessages] = useState<Message[]>([
    { role: "model", content: "Merhaba! Randevu almadan önce VetAI ile ön teşhis yapmak isterseniz şikayetinizi yazabilirsiniz." }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [diagnosis, setDiagnosis] = useState<{ aciliyet: string; tavsiye_edilen_hizmet: string; ai_ozeti: string } | null>(null);
  
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, diagnosis, mode]);

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

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-black font-sans flex flex-col relative overflow-hidden pb-10">
      {/* BACKGROUND DOT GRID */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
          backgroundSize: "32px 32px"
        }}
      />
      
      {/* BACK BUTTON */}
      <div className="absolute top-6 left-6 z-20 flex gap-4">
        <Link href="/hastane">
          <button className="bg-white border-4 border-black rounded-2xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-black uppercase hidden sm:block">Hastaneye Dön</span>
          </button>
        </Link>
        {mode !== "select" && (
          <button 
            onClick={() => setMode("select")}
            className="bg-[#fef08a] border-4 border-black rounded-2xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
          >
            <span className="font-black uppercase hidden sm:block">Mod Değiştir</span>
          </button>
        )}
      </div>

      <div className="flex-1 max-w-3xl mx-auto w-full px-4 pt-24 relative z-10 flex flex-col gap-8">
        
        {mode === "select" && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex flex-col items-center justify-center mt-10 space-y-8"
          >
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-4">Randevu Oluştur</h1>
              <p className="font-bold text-zinc-700 text-lg">Nasıl ilerlemek istersiniz?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
              <button 
                onClick={() => setMode("manual")}
                className="bg-white border-4 border-black rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all flex flex-col items-center text-center gap-4 group"
              >
                <div className="w-20 h-20 bg-[#3b82f6] text-white rounded-full border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Calendar className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase mb-2">Manuel Form</h3>
                  <p className="font-bold text-zinc-600">Hızlıca kendi randevunuzu oluşturun.</p>
                </div>
              </button>

              <button 
                onClick={() => setMode("ai")}
                className="bg-[#bbf7d0] border-4 border-black rounded-[2rem] p-8 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] active:translate-y-0 active:shadow-none transition-all flex flex-col items-center text-center gap-4 group"
              >
                <div className="w-20 h-20 bg-[#a855f7] text-white rounded-full border-4 border-black flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Bot className="w-10 h-10" />
                </div>
                <div>
                  <h3 className="text-2xl font-black uppercase mb-2">VetAI ile Teşhis</h3>
                  <p className="font-bold text-zinc-600">Semptomları söyleyin, VetAI ön teşhis koysun.</p>
                </div>
              </button>
            </div>
          </motion.div>
        )}

        {mode === "ai" && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <div className="bg-white border-4 border-black rounded-[2rem] p-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col">
              <div className="flex items-center gap-3 mb-4 border-b-4 border-black pb-4">
                <Bot className="w-8 h-8 text-[#a855f7]" />
                <div>
                  <h2 className="text-2xl font-black uppercase tracking-tight">VetAI Ön Teşhis</h2>
                  <p className="font-bold text-sm text-zinc-600">Randevu öncesi yapay zeka değerlendirmesi alın.</p>
                </div>
              </div>

              <div className="bg-zinc-50 border-4 border-black rounded-xl p-4 flex flex-col h-[50vh] min-h-[400px] overflow-hidden">
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {messages.map((msg, idx) => {
                    // Basit markdown formatlayıcı
                    const formatMessage = (text: string) => {
                      let html = text
                        .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
                        .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
                        .replace(/\n/g, '<br/>'); // Yeni satır
                      return { __html: html };
                    };

                    return (
                      <div key={idx} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        <div 
                          className={`
                            px-4 py-3 rounded-2xl border-2 border-black max-w-[90%] sm:max-w-[85%] text-sm sm:text-base break-words
                            ${msg.role === "user" ? "bg-indigo-300 rounded-br-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold" : "bg-emerald-300 rounded-bl-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-medium"}
                          `}
                          dangerouslySetInnerHTML={formatMessage(msg.content)}
                        />
                      </div>
                    );
                  })}
                  {isLoading && !diagnosis && (
                    <div className="flex justify-start">
                      <div className="px-4 py-3 rounded-2xl border-2 border-black bg-emerald-300 rounded-bl-none shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-bold text-sm animate-pulse">
                        VetAI Düşünüyor...
                      </div>
                    </div>
                  )}
                  <div ref={chatEndRef} />
                </div>

                {!diagnosis ? (
                  <form onSubmit={sendMessage} className="mt-4 flex gap-2">
                    <input
                      type="text"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Şikayetinizi yazın..."
                      className="flex-1 border-4 border-black rounded-xl px-4 py-2 font-bold text-sm bg-white focus:outline-none focus:bg-yellow-50 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      disabled={isLoading}
                    />
                    <button 
                      type="submit" 
                      disabled={isLoading}
                      className="bg-indigo-600 text-white border-4 border-black rounded-xl px-4 py-2 font-black uppercase text-sm tracking-wide shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
                    >
                      Gönder
                    </button>
                  </form>
                ) : (
                  <div className="mt-4 p-3 border-4 border-black bg-yellow-300 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-black text-center text-sm uppercase">
                    Teşhis tamamlandı. Randevu Formu aşağıda açıldı.
                  </div>
                )}
              </div>

              {!diagnosis && messages.length > 2 && (
                <div className="flex justify-center mt-4">
                   <button 
                      onClick={finishDiagnosis}
                      disabled={isLoading}
                      className="bg-rose-500 text-white border-4 border-black rounded-xl px-6 py-3 font-black uppercase text-sm tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all disabled:opacity-50"
                    >
                      Teşhisi Tamamla ve Randevu Formuna Aktar
                    </button>
                </div>
              )}
            </div>
          </motion.div>
        )}

        {(mode === "manual" || (mode === "ai" && diagnosis)) && (
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
          >
            <div className="bg-[#fef08a] border-4 border-black rounded-[2rem] p-8 sm:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col mb-16">
              <div className="text-center mb-8">
                <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter mb-2">Randevu Formu</h1>
                <p className="font-bold text-zinc-700">Dostunuz için en uygun zamanı belirleyin.</p>
              </div>

              <BookingForm diagnosis={mode === "ai" ? diagnosis : null} />
            </div>
          </motion.div>
        )}

      </div>
    </div>
  );
}
