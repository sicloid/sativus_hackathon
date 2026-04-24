"use client";

import Link from 'next/link';
import { Calendar, ShoppingBag } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="relative bg-orange-50 px-6 pt-16 md:pt-24 border-b-2 border-black overflow-hidden">
      {/* Background Dot Pattern */}
      <div className="absolute inset-0 opacity-20 pointer-events-none"
        style={{backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
        backgroundSize: '24px 24px'}} />

      {/* Decorative Circles (Solid Colors, No Glassmorphism) */}
      <div className="w-64 h-64 bg-blue-200 rounded-full opacity-30 absolute -top-16 -left-16 pointer-events-none" />
      <div className="w-48 h-48 bg-orange-200 rounded-full opacity-40 absolute -top-8 -right-8 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto flex flex-col items-center text-center">
        <div className="transition-all duration-700 ease-out">
          <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black mb-6 max-w-4xl leading-tight">
            Gençlik Enerjisi Seninle, <span className="text-blue-600 inline-block">Sevgin Patilerle!</span>
          </h1>
        </div>
        
        <p className="text-xl md:text-2xl font-bold tracking-tight text-gray-800 mb-12 max-w-2xl">
          Sevimli dostlarınız için ihtiyacınız olan her şey tek bir platformda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl mb-16">
          {/* Blog Kartı */}
          <div className="h-full">
            <Link href="/blog" className="relative group block h-full border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all overflow-hidden min-h-[250px]">
              <img src="https://picsum.photos/id/1025/600/400" alt="Blog" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="bg-white text-black px-3 py-1 font-black text-sm rounded border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] inline-block mb-2">
                  🐾 BLOG REHBERİ
                </span>
                <p className="text-white font-bold tracking-tight text-lg leading-tight drop-shadow-md">Dostunuz için uzman tavsiyeleri</p>
              </div>
            </Link>
          </div>

          <div className="md:col-span-2 grid grid-cols-1 gap-6">
            {/* PetVerse Care Kartı */}
            <div className="h-full">
              <Link href="/hastane" className="h-full bg-green-400 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4 text-black">
                <div className="bg-white p-4 border-2 border-black rounded-xl">
                  <span className="text-3xl leading-none">🐾</span>
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black tracking-tight">PetVerse Care</h3>
                  <p className="font-bold">Randevu, Karne, Teşhis</p>
                </div>
              </Link>
            </div>

            {/* Mağaza Şeridi */}
            <div className="h-full">
              <Link href="/urunler" className="h-full bg-yellow-300 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4 text-black">
                <div className="bg-white p-4 border-2 border-black rounded-xl">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <h3 className="text-2xl font-black tracking-tight">Mağaza</h3>
                  <p className="font-bold">Oyuncak, mama, aksesuar</p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Wave Transition */}
      <div className="w-full overflow-hidden leading-none relative z-20">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#ffffff"
          />
        </svg>
      </div>
    </section>
  );
}
