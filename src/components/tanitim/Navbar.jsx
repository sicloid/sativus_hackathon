"use client";

import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 px-6 py-4 ${
      scrolled 
        ? 'bg-white shadow-lg border-b-2 border-black' 
        : 'bg-white/80 backdrop-blur-md border-b-2 border-black/50'
    }`}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Sol: PetVerse logo yazısı - Styled with Soft-Brutalist Aesthetic */}
        <Link href="/" className="group flex items-center gap-0 tracking-tighter transition-all hover:-translate-y-0.5">
          <span className="text-4xl font-black text-black uppercase">
            Pet
          </span>
          <span className="text-4xl font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-lg border-2 border-transparent group-hover:border-blue-600 transition-all">
            Verse
          </span>
          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full ml-1 self-end mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
        </Link>

        {/* Sağ Alan Temizlendi */}
        <div className="flex items-center gap-4">
          {/* Butonlar kaldırıldı */}
        </div>
      </div>
    </nav>
  );
}
