"use client";

import Link from 'next/link';
import Image from 'next/image';

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

        {/* Sağ - Ürün Kolajı */}
        <div className="relative w-full h-80">
          {/* Sol üst — büyük kart */}
          <div className="absolute top-0 left-0 w-52 h-48 border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src="https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&q=80"
              alt="köpek ürünleri"
              fill
              className="object-cover"
            />
          </div>

          {/* Sağ üst — küçük kart */}
          <div className="absolute top-0 left-56 w-36 h-36 border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&q=80"
              alt="kedi ürünleri"
              fill
              className="object-cover"
            />
          </div>

          {/* Sağ alt — orta kart */}
          <div className="absolute bottom-0 left-48 w-44 h-40 border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src="https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&q=80"
              alt="kemirgen ürünleri"
              fill
              className="object-cover"
            />
          </div>

          {/* Sol alt — küçük etiket kart */}
          <div className="absolute bottom-0 left-0 w-44 h-28 border-2 border-black rounded-2xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <Image
              src="https://images.unsplash.com/photo-1522069169874-c58ec4b76be5?w=400&q=80"
              alt="akvaryum ürünleri"
              fill
              className="object-cover"
            />
            {/* Üzerine indirim etiketi */}
            <div className="absolute top-2 right-2 bg-yellow-400 border-2 border-black rounded-lg px-2 py-1 font-black text-xs shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              %20 İndirim
            </div>
          </div>
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
