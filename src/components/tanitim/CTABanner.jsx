"use client";

import Link from 'next/link';

export default function CTABanner() {
  return (
    <section className="relative bg-green-800 px-6 pt-20 border-b-2 border-black text-center overflow-hidden">
      {/* Background Subtle Line Pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none"
        style={{backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 40px, rgba(255,255,255,0.2) 40px, rgba(255,255,255,0.2) 41px)'}} />
      
      <div className="relative z-10 max-w-4xl mx-auto space-y-8 mb-16">
        <h2 className="text-4xl md:text-6xl font-black tracking-tight text-white flex items-center justify-center gap-4">
          <span className="text-green-400 text-7xl md:text-8xl leading-none opacity-50">"</span>
          Sorularınız mı Var?
          <span className="text-green-400 text-7xl md:text-8xl leading-none opacity-50 rotate-180">"</span>
        </h2>
        <div>
          <Link href="/sss" className="inline-block bg-white text-green-800 font-black tracking-tight text-xl px-8 py-4 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 transition-all">
            SSS Sayfasına Git
          </Link>
        </div>
      </div>

      {/* Wave Transition to FAQ (bg-orange-50) */}
      <div className="w-full overflow-hidden leading-none relative z-20">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path
            d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z"
            fill="#fff7ed"
          />
        </svg>
      </div>
    </section>
  );
}
