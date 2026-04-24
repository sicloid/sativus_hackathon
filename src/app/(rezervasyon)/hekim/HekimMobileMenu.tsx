"use client";

import { useState } from "react";
import Link from "next/link";
import { logoutHekim } from "./actions";

export function HekimMobileMenu({ userName }: { userName: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
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

      {isOpen && (
        <div className="absolute top-20 left-0 right-0 border-t-4 border-black bg-white shadow-[0px_8px_0px_0px_rgba(0,0,0,1)] z-50">
          <div className="px-4 pt-2 pb-6 space-y-2 flex flex-col">
            <div className="px-4 py-3 font-black uppercase text-sm bg-[#e9d5ff] border-2 border-black rounded-lg text-center">
              🩺 Dr. {userName}
            </div>
            <Link onClick={() => setIsOpen(false)} href="/hekim"
              className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">
              📋 Randevu Talepleri
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/hekim/hastalarim"
              className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">
              🐾 Hastalarım
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/hekim/teshisler"
              className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">
              🔬 Teşhisler
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/hekim/asi-ekle"
              className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">
              💉 Aşı Ekle
            </Link>
            <Link onClick={() => setIsOpen(false)} href="/hekim/recete-yaz"
              className="block px-4 py-3 font-bold text-lg border-b-2 border-zinc-100">
              📝 Reçete Yaz
            </Link>
            <form action={logoutHekim}>
              <button
                type="submit"
                className="w-full mt-2 bg-black text-white font-black uppercase text-lg px-4 py-3 border-2 border-black rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
              >
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
