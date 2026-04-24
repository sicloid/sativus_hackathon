"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Calendar, FileText, Activity, ArrowRight, ShieldCheck, Clock } from "lucide-react";

export default function HastanePortal() {
  return (
    <div className="w-full bg-[#fdfdfd] text-black font-sans overflow-x-hidden flex flex-col relative min-h-screen">
      
      {/* BACKGROUND DOT GRID */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.15] pointer-events-none" 
        style={{
          backgroundImage: "radial-gradient(#000 2px, transparent 2px)",
          backgroundSize: "32px 32px"
        }}
      />

      {/* MARQUEE TAPE */}
      <div className="bg-[#fef08a] border-b-4 border-black py-3 overflow-hidden flex whitespace-nowrap shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] relative z-20 w-full">
        <div className="animate-marquee inline-block font-black text-sm md:text-lg uppercase tracking-[0.2em] px-4">
          PETVERSE HASTANESİNE HOŞ GELDİNİZ • 7/24 AÇIK • VETAI AKILLI ASİSTAN AKTİF • PETVERSE HASTANESİNE HOŞ GELDİNİZ • 7/24 AÇIK • VETAI AKILLI ASİSTAN AKTİF • PETVERSE HASTANESİNE HOŞ GELDİNİZ • 7/24 AÇIK • VETAI AKILLI ASİSTAN AKTİF •
        </div>
        <div className="animate-marquee inline-block font-black text-sm md:text-lg uppercase tracking-[0.2em] px-4" aria-hidden="true">
          PETVERSE HASTANESİNE HOŞ GELDİNİZ • 7/24 AÇIK • VETAI AKILLI ASİSTAN AKTİF • PETVERSE HASTANESİNE HOŞ GELDİNİZ • 7/24 AÇIK • VETAI AKILLI ASİSTAN AKTİF • PETVERSE HASTANESİNE HOŞ GELDİNİZ • 7/24 AÇIK • VETAI AKILLI ASİSTAN AKTİF •
        </div>
      </div>

      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-12 pt-8 md:pt-16 pb-24 relative z-10">
        
        {/* HERO SECTION */}
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-16">
          
          {/* LEFT CONTENT */}
          <div className="w-full lg:w-1/2 space-y-8 md:space-y-10">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-5xl sm:text-6xl lg:text-[4.5rem] xl:text-[5rem] font-black uppercase tracking-tight text-black break-words leading-none md:leading-[1.1]">
                Geleceğin
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#a855f7] to-[#3b82f6] filter drop-shadow-[3px_3px_0px_rgba(0,0,0,1)]">
                  VetCare
                </span>
                <br />
                Merkezi.
              </h1>
            </motion.div>

            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="text-xl md:text-2xl font-bold text-zinc-700 max-w-xl leading-relaxed border-l-8 border-[#3b82f6] pl-6"
            >
              Yapay zeka destekli ön teşhis, dijital karneler ve anında randevu sistemi ile evcil hayvanınızın sağlığı emin ellerde.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="flex flex-col sm:flex-row gap-4 sm:gap-6 pt-4"
            >
              <Link href="/randevu" className="group w-full sm:w-auto">
                <button className="w-full px-8 py-5 md:py-6 bg-[#3b82f6] text-white border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 transition-all flex items-center justify-center gap-3">
                  <Calendar className="w-7 h-7" />
                  <span className="font-black text-xl md:text-2xl uppercase tracking-wider">Randevu Al</span>
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform hidden sm:block" />
                </button>
              </Link>
              
              <Link href="/pet-karne" className="group w-full sm:w-auto">
                <button className="w-full px-8 py-5 md:py-6 bg-white text-black border-4 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] group-hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:translate-y-1 transition-all flex items-center justify-center gap-3">
                  <FileText className="w-7 h-7" />
                  <span className="font-black text-xl md:text-2xl uppercase tracking-wider">Pet Karne</span>
                </button>
              </Link>
            </motion.div>
          </div>

          {/* RIGHT VISUALS / PET IMAGE */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3, ease: "backOut" }}
            className="w-full lg:w-1/2 relative mt-8 lg:mt-0"
          >
            {/* Background Decorative Frame */}
            <div className="absolute top-4 left-4 md:top-8 md:left-8 w-full h-full bg-[#fef08a] border-4 border-black rounded-[2rem] md:rounded-[3rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] z-0" />
            
            {/* Main Image */}
            <div className="relative z-10 w-full aspect-[4/3] rounded-[2rem] md:rounded-[3rem] border-4 md:border-8 border-black overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] bg-white group">
              <img 
                src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?q=80&w=1200&auto=format&fit=crop" 
                alt="Veterinary Checkup" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Overlay Badge - Hidden on very small screens to avoid clutter */}
              <div className="hidden sm:flex absolute bottom-4 right-4 md:bottom-6 md:right-6 bg-white border-4 border-black rounded-2xl p-3 md:p-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] items-center gap-3 md:gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-[#bbf7d0] rounded-full border-2 border-black flex items-center justify-center animate-pulse">
                  <span className="text-xl md:text-2xl">🐕</span>
                </div>
                <div>
                  <p className="font-black text-sm md:text-lg uppercase leading-none">Can Dostlarımız</p>
                  <p className="font-bold text-xs md:text-sm text-zinc-600 mt-1">Emin Ellerde</p>
                </div>
              </div>
            </div>
          </motion.div>

        </div>

        {/* SYSTEM FEATURES GALLERY */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          className="mt-20 md:mt-32"
        >
          <div className="flex items-center gap-4 mb-8 md:mb-12 border-b-4 border-black pb-4">
            <Activity className="w-8 h-8 md:w-10 md:h-10 text-[#a855f7]" />
            <h2 className="text-2xl md:text-4xl font-black uppercase">Modern Klinik Sistemleri</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            {/* Feature 1 */}
            <div className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all group flex flex-col">
              <div className="h-48 md:h-56 overflow-hidden border-b-4 border-black">
                <img 
                  src="https://images.unsplash.com/photo-1576201836106-db1758fd1c97?q=80&w=800&auto=format&fit=crop" 
                  alt="Uzman Hekim Kadrosu" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 shrink-0 bg-[#bfdbfe] border-2 border-black rounded-xl flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-lg md:text-xl uppercase truncate">Uzman Kadro</h3>
                </div>
                <p className="font-bold text-sm md:text-base text-zinc-600 break-words line-clamp-3">Alanında uzman veteriner hekimlerimizle evcil hayvanınıza en doğru teşhis ve tedavi.</p>
              </div>
            </div>

            {/* Feature 2 */}
            <div className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all group flex flex-col">
              <div className="h-48 md:h-56 overflow-hidden border-b-4 border-black">
                <img 
                  src="https://images.unsplash.com/photo-1628009368231-7bb7cbcb8127?q=80&w=800&auto=format&fit=crop" 
                  alt="Dijital Takip" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 shrink-0 bg-[#fef08a] border-2 border-black rounded-xl flex items-center justify-center">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-lg md:text-xl uppercase truncate">Dijital Karne</h3>
                </div>
                <p className="font-bold text-sm md:text-base text-zinc-600 break-words line-clamp-3">Aşı takvimi, geçmiş reçeteler ve röntgen sonuçları bulut tabanlı sistemimizde güvende.</p>
              </div>
            </div>

            {/* Feature 3 */}
            <div className="bg-white border-4 border-black rounded-3xl overflow-hidden shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] transition-all group flex flex-col md:col-span-2 lg:col-span-1">
              <div className="h-48 md:h-56 overflow-hidden border-b-4 border-black">
                <img 
                  src="https://images.unsplash.com/photo-1606425271394-c3ca9aa1fc06?q=80&w=800&auto=format&fit=crop" 
                  alt="7/24 Kesintisiz Hizmet" 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-6 md:p-8 flex-1 flex flex-col min-w-0">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 shrink-0 bg-[#fecaca] border-2 border-black rounded-xl flex items-center justify-center">
                    <Clock className="w-6 h-6" />
                  </div>
                  <h3 className="font-black text-lg md:text-xl uppercase truncate">7/24 Acil Hizmet</h3>
                </div>
                <p className="font-bold text-sm md:text-base text-zinc-600 break-words line-clamp-3">Acil durumlarda kliniğimiz gece gündüz fark etmeksizin minik dostlarımızın yanında.</p>
              </div>
            </div>

          </div>
        </motion.div>

      </div>
    </div>
  );
}
