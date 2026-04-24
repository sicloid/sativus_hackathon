'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'

export default function Header() {
  const { totalItems } = useCart()

  return (
    <header className="border-b-4 border-black bg-white sticky top-0 z-50 brutal-shadow mb-8">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-4">
        <Link href="/urunler" className="font-black text-3xl tracking-tighter uppercase">
          PET<span className="text-[var(--brutal-blue)]">VERSE</span>
        </Link>
        
        <div className="flex-grow w-full md:w-auto max-w-xl flex relative">
          <input 
            type="text" 
            placeholder="Ürün veya kategori ara..." 
            className="w-full brutal-border px-4 py-2 font-bold focus:outline-none focus:ring-2 focus:ring-black"
          />
          <button className="absolute right-0 top-0 bottom-0 px-4 bg-[var(--brutal-yellow)] brutal-border border-l-2 font-black uppercase hover:bg-black hover:text-white transition-colors">
            Ara
          </button>
        </div>
        
        <nav className="flex gap-4">
          <Link href="/sepet" className="brutal-border brutal-shadow brutal-shadow-hover bg-[var(--brutal-green)] px-4 py-2 font-black uppercase flex items-center gap-2">
            <span>Sepet</span>
            <span className="bg-white text-black rounded-full w-6 h-6 flex items-center justify-center text-xs border-2 border-black">
              {totalItems}
            </span>
          </Link>
          <Link href="/favoriler" className="brutal-border brutal-shadow brutal-shadow-hover bg-white px-4 py-2 font-black uppercase">
            Favoriler
          </Link>
          <Link href="/profil" className="brutal-border brutal-shadow brutal-shadow-hover bg-[var(--brutal-blue)] px-4 py-2 font-black uppercase">
            Profil
          </Link>
        </nav>
      </div>
    </header>
  )
}
