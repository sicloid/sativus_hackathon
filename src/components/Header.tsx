'use client'

import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'

export default function Header({ user }: { user: any }) {
  const { totalItems } = useCart()
  const { totalFavorites } = useFavorites()

  return (
    <header className="border-b-4 border-black bg-white sticky top-0 z-50 brutal-shadow mb-8">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        <Link href="/urunler" className="font-black text-3xl md:text-4xl tracking-tighter uppercase text-center md:text-left w-full md:w-auto group">
          PET<span className="text-[var(--brutal-blue)]">VERSE</span>
          <span className="text-[var(--brutal-yellow)] ml-1 drop-shadow-[2px_2px_0px_rgba(0,0,0,1)] group-hover:text-black transition-colors">SHOP</span>
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
        
        <nav className="flex flex-wrap justify-center gap-3 md:gap-4 w-full md:w-auto">
          <Link href="/sepet" className="brutal-border brutal-shadow brutal-shadow-hover bg-[var(--brutal-green)] px-3 py-2 md:px-4 md:py-2 font-black uppercase flex items-center gap-2 text-sm md:text-base flex-1 md:flex-none justify-center">
            <span>Sepet</span>
            <span className="bg-white text-black rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs border-2 border-black">
              {totalItems}
            </span>
          </Link>
          <Link href="/favoriler" className="brutal-border brutal-shadow brutal-shadow-hover bg-white px-3 py-2 md:px-4 md:py-2 font-black uppercase flex items-center gap-2 text-sm md:text-base flex-1 md:flex-none justify-center">
            <span className="hidden sm:inline">Favoriler</span>
            <span className="sm:hidden">Fav</span>
            <span className="bg-[var(--brutal-red)] text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs border-2 border-black">
              {totalFavorites}
            </span>
          </Link>
          {user ? (
            <Link href="/profil" className="brutal-border brutal-shadow brutal-shadow-hover bg-[var(--brutal-blue)] px-3 py-2 md:px-4 md:py-2 font-black uppercase text-sm md:text-base flex-1 md:flex-none text-center">
              Profil
            </Link>
          ) : (
            <Link href="/login" className="brutal-border brutal-shadow brutal-shadow-hover bg-[var(--brutal-blue)] px-3 py-2 md:px-4 md:py-2 font-black uppercase text-sm md:text-base flex-1 md:flex-none text-center">
              Giriş Yap
            </Link>
          )}
        </nav>
      </div>
    </header>
  )
}
