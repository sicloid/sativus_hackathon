"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "./Button";
import { Home } from "lucide-react";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#fdfdfd] border-b-4 border-black w-full shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center gap-4">
          <div className="flex items-center gap-4">
            <Link href="/">
              <Button variant="outline" className="hidden sm:flex items-center gap-2 border-zinc-200 text-zinc-500 hover:text-black hover:border-black transition-all">
                <Home className="w-4 h-4" />
                <span className="font-black uppercase text-xs">Ana Sayfa</span>
              </Button>
              <Button variant="outline" className="sm:hidden p-2 border-zinc-200 text-zinc-500">
                <Home className="w-5 h-5" />
              </Button>
            </Link>
          </div>

          <Link href="/hastane" className="flex items-center gap-2 group">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-black uppercase tracking-tighter group-hover:underline">
              PetVerse <span className="text-[#a855f7]">Care</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 whitespace-nowrap">
            <Link href="/randevu" className="font-bold text-base lg:text-lg hover:underline underline-offset-4 flex-shrink-0">Randevu Al</Link>
            <Link href="/pet-karne" className="font-bold text-base lg:text-lg hover:underline underline-offset-4 flex-shrink-0">Pet Karne</Link>
            <Link href="/receteler" className="font-bold text-base lg:text-lg hover:underline underline-offset-4 flex-shrink-0">Reçeteler</Link>
            <Link href="/faturalar" className="font-bold text-base lg:text-lg hover:underline underline-offset-4 flex-shrink-0">Faturalar</Link>
            
            <Link href="/hasta-login" className="ml-2 lg:ml-4 flex-shrink-0">
              <Button variant="outline" className="py-2 px-4 lg:px-6 whitespace-nowrap border-blue-500 text-blue-600 hover:bg-blue-50">Hasta Girişi</Button>
            </Link>
            <Link href="/hekim-login" className="ml-2 flex-shrink-0">
              <Button variant="outline" className="py-2 px-4 lg:px-6 whitespace-nowrap">Personel Girişi</Button>
            </Link>
          </div>

          {/* HAMBURGER BUTTON (MOBILE) */}
          <div className="md:hidden flex items-center">
            <button 
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 border-2 border-black rounded-lg shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all bg-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden border-t-4 border-black bg-white">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <Link onClick={() => setIsOpen(false)} href="/randevu" className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">Randevu Al</Link>
            <Link onClick={() => setIsOpen(false)} href="/pet-karne" className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">Pet Karne</Link>
            <Link onClick={() => setIsOpen(false)} href="/receteler" className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">Reçeteler</Link>
            <Link onClick={() => setIsOpen(false)} href="/faturalar" className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">Faturalar</Link>
            <Link onClick={() => setIsOpen(false)} href="/hasta-login" className="block px-4 py-3 font-bold text-lg text-blue-600 border-b-2 border-zinc-100">Hasta Girişi</Link>
            <Link onClick={() => setIsOpen(false)} href="/hekim" className="block px-4 py-3 font-bold text-lg text-red-600">Personel Girişi</Link>
          </div>
        </div>
      )}
    </nav>
  );
}
