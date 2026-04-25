"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { ArrowLeft, User, Lock, ArrowRight, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { authAction } from "./actions";

type Tab = "hasta" | "hekim";

export default function CareLoginPage() {
  const [activeTab, setActiveTab] = useState<Tab>("hasta");
  const [authState, authFormAction, isPending] = useActionState(authAction, null);

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

      <div className="flex-1 flex flex-col items-center justify-center p-6 relative z-10 pt-24 pb-10">
        
        {/* TABS */}
        <div className="flex bg-white border-4 border-black rounded-2xl p-2 mb-8 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] w-full max-w-md relative z-30">
          <button
            onClick={() => setActiveTab("hasta")}
            className={`flex-1 py-3 px-4 font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === "hasta"
                ? "bg-[#bfdbfe] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            Hasta Girişi
          </button>
          <button
            onClick={() => setActiveTab("hekim")}
            className={`flex-1 py-3 px-4 font-black uppercase tracking-widest rounded-xl transition-all ${
              activeTab === "hekim"
                ? "bg-[#fff1f2] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-rose-600"
                : "text-zinc-500 hover:bg-zinc-100"
            }`}
          >
            Personel
          </button>
        </div>

        <div className="w-full max-w-md relative">
          <AnimatePresence mode="wait">
            {activeTab === "hasta" ? (
              <motion.div 
                key="hasta"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3 }}
              >
                {/* PATIENT CARD */}
                <div className="bg-[#bfdbfe] border-4 border-black rounded-[2rem] p-8 sm:p-10 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex flex-col">
                  <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-white border-4 border-black rounded-2xl mx-auto mb-6 flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] -rotate-3">
                      <span className="text-4xl">🐾</span>
                    </div>
                    <h1 className="text-4xl font-black uppercase tracking-tighter mb-2">PetVerse Giriş</h1>
                    <p className="font-bold text-zinc-700">Randevulara erişmek için giriş yapın.</p>
                  </div>

                  {(authState?.error) && (
                    <div className="mb-6 bg-red-100 border-4 border-black rounded-xl p-4 font-bold text-red-700 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                      {authState.error}
                    </div>
                  )}

                  <form action={authFormAction} className="space-y-6 flex flex-col">
                    <input type="hidden" name="loginType" value="hasta" />
                    
                    <div className="space-y-2">
                      <label className="font-black uppercase text-sm ml-2">E-posta Adresi</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                          <User className="w-6 h-6 text-zinc-500" />
                        </div>
                        <input 
                          name="email"
                          type="email"
                          placeholder="ornek@email.com"
                          required
                          className="w-full bg-white border-4 border-black rounded-2xl py-4 pl-12 pr-4 font-bold text-lg placeholder:text-zinc-400 focus:outline-none focus:bg-[#fef08a] transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <label className="font-black uppercase text-sm ml-2">Şifre (En az 6 karakter)</label>
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
                        name="submitAction"
                        value="login"
                        disabled={isPending}
                        className="w-full bg-[#a855f7] text-white border-4 border-black rounded-2xl py-4 font-black uppercase text-xl flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isPending ? "Bekleniyor..." : "Giriş Yap"}
                        {!isPending && <ArrowRight className="w-6 h-6" />}
                      </button>
                      
                      <button 
                        type="submit"
                        name="submitAction"
                        value="signup"
                        disabled={isPending}
                        className="w-full bg-white text-black border-4 border-black rounded-2xl py-4 font-black uppercase text-xl flex items-center justify-center gap-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed"
                      >
                        {isPending ? "Bekleniyor..." : "Kayıt Ol"}
                      </button>
                    </div>
                  </form>
                </div>
              </motion.div>
            ) : (
              <motion.div 
                key="hekim"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="w-full"
              >
                {/* PERSONNEL CARD */}
                <div className="bg-[#fff1f2] border-[6px] border-black rounded-[3rem] p-10 sm:p-14 shadow-[20px_20px_0px_0px_rgba(0,0,0,1)] flex flex-col relative overflow-hidden">
                  
                  {/* Caution tape decoration */}
                  <div className="absolute -right-16 top-10 rotate-45 bg-[#fef08a] text-black font-black uppercase text-xs tracking-widest py-2 px-20 border-y-4 border-black z-20 shadow-md">
                    PERSONNEL ONLY
                  </div>

                  <div className="text-center mb-12 relative">
                    <motion.div 
                      animate={{ rotate: [3, -3, 3] }}
                      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                      className="w-24 h-24 bg-white border-4 border-black rounded-3xl mx-auto mb-8 flex items-center justify-center shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"
                    >
                      <ShieldCheck className="w-12 h-12 text-rose-600" />
                    </motion.div>
                    <h1 className="text-5xl font-black uppercase tracking-tighter mb-4 leading-none">
                      Hekim <span className="text-rose-600">Portalı</span>
                    </h1>
                    <p className="font-bold text-zinc-600 text-lg">Yetkili veteriner hekim paneline erişim sağlayın.</p>
                  </div>

                  {authState?.error && (
                    <motion.div 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="mb-8 bg-rose-100 border-4 border-black rounded-2xl p-5 font-bold text-rose-700 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center gap-3"
                    >
                      <div className="w-8 h-8 bg-rose-600 text-white rounded-lg flex items-center justify-center font-black shrink-0">!</div>
                      {authState.error}
                    </motion.div>
                  )}

                  <form action={authFormAction} className="space-y-8 flex flex-col">
                    <input type="hidden" name="loginType" value="hekim" />

                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-2">
                        <label className="font-black uppercase text-sm tracking-wider">Personel E-posta</label>
                        <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest italic">Kurumsal Hesap</span>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:scale-110 transition-transform">
                          <User className="w-6 h-6 text-zinc-500" />
                        </div>
                        <input 
                          name="email"
                          type="email"
                          placeholder="hekim@petverse.com"
                          required
                          className="w-full bg-white border-4 border-black rounded-2xl py-5 pl-14 pr-4 font-bold text-xl placeholder:text-zinc-300 focus:outline-none focus:bg-[#fef08a] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center px-2">
                        <label className="font-black uppercase text-sm tracking-wider">Şifre</label>
                      </div>
                      <div className="relative group">
                        <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none group-focus-within:scale-110 transition-transform">
                          <Lock className="w-6 h-6 text-zinc-500" />
                        </div>
                        <input 
                          name="password"
                          type="password"
                          placeholder="••••••••"
                          required
                          minLength={6}
                          className="w-full bg-white border-4 border-black rounded-2xl py-5 pl-14 pr-4 font-bold text-xl placeholder:text-zinc-300 focus:outline-none focus:bg-[#fef08a] transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] focus:-translate-y-1 focus:shadow-[10px_10px_0px_0px_rgba(0,0,0,1)]"
                        />
                      </div>
                    </div>

                    <div className="pt-8 space-y-6">
                      <button 
                        type="submit"
                        name="submitAction"
                        value="login"
                        disabled={isPending}
                        className="w-full bg-rose-600 text-white border-4 border-black rounded-2xl py-5 font-black uppercase text-2xl flex items-center justify-center gap-4 shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1.5 hover:shadow-[14px_14px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all disabled:opacity-70 disabled:cursor-not-allowed group"
                      >
                        {isPending ? (
                          <span className="flex items-center gap-2">
                            <div className="w-6 h-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            Giriş Yapılıyor...
                          </span>
                        ) : (
                          <>
                            SİSTEME ERİŞ
                            <ArrowRight className="w-7 h-7 group-hover:translate-x-2 transition-transform" />
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-4 py-2 opacity-50 grayscale hover:grayscale-0 transition-all">
                        <div className="h-px bg-black flex-1"></div>
                        <ShieldCheck className="w-6 h-6" />
                        <div className="h-px bg-black flex-1"></div>
                      </div>
                    </div>

                  </form>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
