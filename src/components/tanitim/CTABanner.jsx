"use client";

import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="bg-blue-600 border-y-2 border-black py-16 px-6 relative overflow-hidden">
      {/* Subtle background decoration */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500 rounded-full -mr-32 -mt-32 opacity-20 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-48 h-48 bg-blue-700 rounded-full -ml-24 -mb-24 opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-center">
          
          {/* SOL SÜTUN — İstatistikler */}
          <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
            <div className="flex flex-col gap-6">
              <div className="text-center group">
                <p className="text-5xl font-black text-blue-600 group-hover:scale-110 transition-transform">40+</p>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Türkiye Geneli Şube</p>
              </div>
              <div className="border-t-2 border-dashed border-gray-200 pt-6 text-center group">
                <p className="text-5xl font-black text-orange-500 group-hover:scale-110 transition-transform">12K+</p>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Mutlu Evcil Hayvan</p>
              </div>
              <div className="border-t-2 border-dashed border-gray-200 pt-6 text-center group">
                <p className="text-5xl font-black text-green-600 group-hover:scale-110 transition-transform">98%</p>
                <p className="text-sm font-bold text-gray-600 uppercase tracking-wider">Müşteri Memnuniyeti</p>
              </div>
            </div>
          </div>

          {/* ORTA SÜTUN — Ana Mesaj */}
          <div className="text-center lg:px-6">
            <div className="inline-flex items-center gap-2 bg-yellow-400 border-2 border-black rounded-full px-5 py-1.5 mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-xl">🐾</span>
              <span className="font-black text-sm text-black uppercase tracking-widest">PetVerse Ailesi</span>
            </div>

            <h2 className="text-white font-black text-5xl md:text-6xl tracking-tighter leading-[1.1] mb-6">
              Dostunuzun En İyi <br className="hidden md:block" />
              Arkadaşıyız
            </h2>

            <p className="text-blue-100 text-xl font-medium mb-10 max-w-md mx-auto leading-relaxed">
              Sağlık, bakım ve alışveriş — <br />
              her şey tek çatı altında.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link href="/haritalar" className="w-full sm:w-auto">
                <button className="w-full bg-white text-black font-black border-2 border-black rounded-2xl px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all flex items-center justify-center gap-2 text-lg">
                  📍 Bizi Bul
                </button>
              </Link>
              <Link href="/randevu" className="w-full sm:w-auto">
                <button className="w-full bg-yellow-400 text-black font-black border-2 border-black rounded-2xl px-8 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all flex items-center justify-center gap-2 text-lg">
                  🩺 Randevu Al
                </button>
              </Link>
            </div>
          </div>

          {/* SAĞ SÜTUN — Özellik Listesi */}
          <div className="bg-white border-2 border-black rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform duration-300">
            <h3 className="font-black text-2xl uppercase tracking-tighter mb-6 italic border-b-2 border-black pb-2">
              Neden PetVerse?
            </h3>

            <div className="flex flex-col gap-5">
              {[
                { label: "7/24 Acil Veteriner Desteği", color: "bg-green-500" },
                { label: "Lumina Tech Cihaz Entegrasyonu", color: "bg-blue-500" },
                { label: "Gemini AI Ön Teşhis", color: "bg-orange-500" },
                { label: "Türkiye Geneli 40+ Şube", color: "bg-purple-500" },
                { label: "Güvenli Online Alışveriş", color: "bg-yellow-500" }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 group cursor-default">
                  <div className={`${item.color} w-10 h-10 border-2 border-black rounded-xl flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] group-hover:rotate-6 transition-transform`}>
                    <span className="text-white font-black text-sm">✓</span>
                  </div>
                  <span className="font-bold text-base leading-tight group-hover:text-blue-600 transition-colors">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
