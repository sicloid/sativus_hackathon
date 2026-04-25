"use client";

import { useState } from "react";
import Link from "next/link";
import { Home } from "lucide-react";
import { Button } from "./Button";
import { logoutAction } from "@/app/actions/auth";

export function Navbar({ user }: { user?: import("@supabase/supabase-js").User | null }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-[#fdfdfd] border-b-4 border-black w-full shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20 items-center">
          {/* LOGO */}
          <Link href="/hastane" className="flex items-center gap-2 group">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-black uppercase tracking-tighter group-hover:underline">
              PetVerse <span className="text-[#a855f7]">Care</span>
            </span>
          </Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 whitespace-nowrap">
            <Link href="/" className="bg-[var(--brutal-yellow)] border-2 border-black p-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all">
              <Home className="w-5 h-5" />
            </Link>
            <Link href="/randevu" className="font-bold text-base lg:text-lg hover:underline underline-offset-4 flex-shrink-0">Randevu Al</Link>
            <Link href="/pet-karne" className="font-bold text-base lg:text-lg hover:underline underline-offset-4 flex-shrink-0">Pet Karne</Link>
            <Link href="/receteler" className="font-bold text-base lg:text-lg hover:underline underline-offset-4 flex-shrink-0">Reçeteler</Link>
            <Link href="/faturalar" className="font-bold text-base lg:text-lg hover:underline underline-offset-4 flex-shrink-0">Faturalar</Link>
            
            {user ? (
              <>
                <Link href={user.user_metadata?.role === 'vet' ? "/hekim" : "/hastane/profil"} className="ml-2 lg:ml-4 flex-shrink-0">
                  <Button variant="outline" className="py-2 px-4 lg:px-6 whitespace-nowrap border-indigo-500 text-indigo-600 hover:bg-indigo-50">Profil</Button>
                </Link>
                <form action={logoutAction} className="ml-2 flex-shrink-0">
                  <Button variant="outline" className="py-2 px-4 lg:px-6 whitespace-nowrap border-red-500 text-red-600 hover:bg-red-50">Çıkış Yap</Button>
                </form>
              </>
            ) : (
              <Link href="/care-login" className="ml-2 lg:ml-4 flex-shrink-0">
                <Button variant="outline" className="py-2 px-4 lg:px-6 whitespace-nowrap border-blue-500 text-blue-600 hover:bg-blue-50">Giriş Yap</Button>
              </Link>
            )}
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
            <Link onClick={() => setIsOpen(false)} href="/" className="flex items-center gap-2 px-4 py-3 font-black text-lg border-b-2 border-zinc-100 bg-amber-50">
              <Home className="w-5 h-5" />
              ANA SAYFA
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/randevu" className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">Randevu Al</Link>
            <Link onClick={() => setIsOpen(false)} href="/pet-karne" className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">Pet Karne</Link>
            <Link onClick={() => setIsOpen(false)} href="/receteler" className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">Reçeteler</Link>
            <Link onClick={() => setIsOpen(false)} href="/faturalar" className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">Faturalar</Link>
            {user ? (
              <>
                <Link onClick={() => setIsOpen(false)} href={user.user_metadata?.role === 'vet' ? "/hekim" : "/hastane/profil"} className="block px-4 py-3 font-bold text-lg text-indigo-600 border-b-2 border-zinc-100">Profil</Link>
                <form action={logoutAction} className="w-full">
                  <button type="submit" className="w-full text-left px-4 py-3 font-bold text-lg text-red-600">Çıkış Yap</button>
                </form>
              </>
            ) : (
              <Link onClick={() => setIsOpen(false)} href="/care-login" className="block px-4 py-3 font-bold text-lg text-blue-600">Giriş Yap</Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
