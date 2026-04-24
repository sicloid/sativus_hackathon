"use client";

import Link from 'next/link';

export default function ShopSection() {
  return (
    <section className="bg-yellow-50 px-6 pt-16 md:pt-24 border-b-2 border-black overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        {/* Sol */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black">
            Güvenli ve Hızlı Alışveriş
          </h2>
          <p className="text-xl font-bold tracking-tight text-gray-800">
            Dostunuzun tüm ihtiyaçları için seçkin markalar, güvenilir ürünler ve hızlı teslimat avantajları sizi bekliyor.
          </p>
          <div className="pt-4">
            <Link href="/urunler" className="inline-block bg-blue-600 text-white font-black tracking-tight text-xl px-8 py-4 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              Mağazayı Keşfet
            </Link>
          </div>
        </div>

        {/* Sağ - Ürün Kolajı Mockup */}
        <div className="relative h-72 md:h-80">
          <div className="absolute top-0 left-0 w-32 h-32 bg-orange-200 border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl hover:-translate-y-1 transition-transform cursor-pointer">🦴</div>
          <div className="absolute top-4 left-28 w-32 h-32 bg-blue-200 border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl hover:-translate-y-1 transition-transform cursor-pointer z-10">🐟</div>
          <div className="absolute top-8 left-56 w-32 h-32 bg-green-200 border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-4xl hover:-translate-y-1 transition-transform cursor-pointer">🐾</div>
          <div className="absolute bottom-4 left-8 w-56 h-32 bg-yellow-300 border-2 border-black rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center text-5xl hover:-translate-y-1 transition-transform cursor-pointer z-20">🛍️</div>
        </div>
      </div>

      {/* Wave Transition to CTABanner (bg-green-800) */}
      <div className="w-full overflow-hidden leading-none relative z-20">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#064e3b"
          />
        </svg>
      </div>
    </section>
  );
}
