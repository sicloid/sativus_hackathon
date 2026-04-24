/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useSearchParams } from "next/navigation";
import { createAppointment } from "./actions";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock, PawPrint, User, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { Suspense } from "react";

function BookingForm() {
  const searchParams = useSearchParams();
  const aiAciliyet = searchParams?.get("aciliyet") || "";
  const aiHizmet = searchParams?.get("hizmet") || "";
  const aiOzeti = searchParams?.get("ozet") || "";

  return (
    <form action={createAppointment as any} className="space-y-6 flex flex-col">
      {/* Hidden inputs to pass AI params */}
      <input type="hidden" name="aiAciliyet" value={aiAciliyet} />
      <input type="hidden" name="aiHizmet" value={aiHizmet} />
      <input type="hidden" name="aiOzeti" value={aiOzeti} />

      {(aiAciliyet || aiHizmet) && (
        <div className="bg-[#bbf7d0] border-4 border-black rounded-2xl p-4 shadow-inner mb-4">
          <p className="font-black uppercase text-sm mb-1 text-emerald-800">VetAI Önerileri Aktarıldı</p>
          <div className="flex gap-2">
            {aiAciliyet && <span className="bg-white border-2 border-black rounded-lg px-2 py-1 text-xs font-bold">{aiAciliyet} Aciliyet</span>}
            {aiHizmet && <span className="bg-white border-2 border-black rounded-lg px-2 py-1 text-xs font-bold">{aiHizmet} Hizmeti</span>}
          </div>
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

export default function BookingPage() {
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
      <div className="absolute top-6 left-6 z-20">
        <Link href="/hastane">
          <button className="bg-white border-4 border-black rounded-2xl p-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center gap-2">
            <ArrowLeft className="w-6 h-6" />
            <span className="font-black uppercase hidden sm:block">Hastaneye Dön</span>
          </button>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10 pt-24">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-2xl"
        >
          {/* MAIN CARD */}
          <div className="bg-[#fef08a] border-4 border-black rounded-[2rem] p-8 sm:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col">
            
            <div className="text-center mb-10">
              <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter mb-2">Hızlı Randevu</h1>
              <p className="font-bold text-zinc-700">Dostunuz için en uygun zamanı belirleyin.</p>
            </div>

            <Suspense fallback={<div className="font-bold text-center">Yükleniyor...</div>}>
              <BookingForm />
            </Suspense>

          </div>
        </motion.div>
      </div>
    </div>
  );
}
