"use client";

import { loginHekim } from "./actions";
import Link from "next/link";
import { ArrowLeft, User, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function HekimLoginPage() {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleLogin(formData: FormData) {
    setError(null);
    setLoading(true);
    const res = await loginHekim(formData);
    if (res?.error) setError(res.error);
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-black font-sans flex flex-col relative overflow-hidden">
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
            <span className="font-black uppercase hidden sm:block">Geri Dön</span>
          </button>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="w-full max-w-md"
        >
          {/* MAIN CARD (Red/Pink themed for personnel) */}
          <div className="bg-[#fecaca] border-4 border-black rounded-[2rem] p-8 sm:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden">
            
            {/* Caution tape decoration */}
            <div className="absolute -right-12 top-6 rotate-45 bg-[#fef08a] text-black font-black uppercase text-[10px] tracking-widest py-1 px-12 border-y-2 border-black">
              PERSONNEL ONLY
            </div>

            <div className="text-center mb-10 mt-4">
              <div className="w-20 h-20 bg-white border-4 border-black rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] rotate-3">
                <ShieldCheck className="w-10 h-10 text-rose-500" />
              </div>
              <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">Hekim Girişi</h1>
              <p className="font-bold text-zinc-700">Yetkili personel paneline erişim.</p>
            </div>

            {error && (
              <div className="mb-6 bg-red-100 border-4 border-black rounded-xl p-4 font-bold text-red-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                {error}
              </div>
            )}

            <form action={handleLogin} className="space-y-6 flex flex-col">
              
              <div className="space-y-2">
                <label className="font-black uppercase text-sm ml-2">Personel E-posta</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <User className="w-6 h-6 text-zinc-500" />
                  </div>
                  <input 
                    name="email"
                    type="email"
                    placeholder="hekim@petverse.com"
                    required
                    className="w-full bg-white border-4 border-black rounded-2xl py-4 pl-12 pr-4 font-bold text-lg placeholder:text-zinc-400 focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="font-black uppercase text-sm ml-2">Şifre</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="w-6 h-6 text-zinc-500" />
                  </div>
                  <input 
                    name="password"
                    type="password"
                    placeholder="••••••••"
                    required
                    minLength={6}
                    className="w-full bg-white border-4 border-black rounded-2xl py-4 pl-12 pr-4 font-bold text-lg placeholder:text-zinc-400 focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                  />
                </div>
              </div>

              <div className="pt-6 space-y-4">
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#ef4444] text-white border-4 border-black rounded-2xl py-4 font-black uppercase text-xl flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                >
                  {loading ? "Bekleniyor..." : "Sisteme Gir"}
                  {!loading && <ArrowRight className="w-6 h-6" />}
                </button>
              </div>

            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
