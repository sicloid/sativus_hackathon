'use client'

import { User } from '@supabase/supabase-js'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import { Home, Search, ShoppingCart, Heart, User as UserIcon } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { getSearchSuggestions } from '@/app/actions/store'

export default function Header({ user }: { user: User | null }) {
  const router = useRouter()
  const { totalItems } = useCart()
  const { totalFavorites } = useFavorites()
  
  // Search State
  const [searchTerm, setSearchTerm] = useState('')
  const [suggestions, setSuggestions] = useState<any[]>([])
  const [showSuggestions, setShowSuggestions] = useState(false)
  const [highlightedIndex, setHighlightedIndex] = useState(-1)
  const searchRef = useRef<HTMLDivElement>(null)

  // Debounced Suggestion Fetching
  useEffect(() => {
    const timer = setTimeout(async () => {
      if (searchTerm.length >= 2) {
        const results = await getSearchSuggestions(searchTerm)
        setSuggestions(results)
        setShowSuggestions(true)
      } else {
        setSuggestions([])
        setShowSuggestions(false)
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [searchTerm])

  // Click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearchSubmit = (term: string) => {
    if (!term.trim()) return
    router.push(`/urunler?ara=${encodeURIComponent(term)}`)
    setShowSuggestions(false)
    setSearchTerm('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.min(prev + 1, suggestions.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlightedIndex(prev => Math.max(prev - 1, -1))
    } else if (e.key === 'Enter') {
      if (highlightedIndex >= 0) {
        handleSearchSubmit(suggestions[highlightedIndex].name)
      } else {
        handleSearchSubmit(searchTerm)
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false)
    }
  }

  return (
    <header className="border-b-4 border-black bg-white sticky top-0 z-50 brutal-shadow mb-8">
      <div className="container mx-auto px-4 py-4 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-4">
        {/* Logo */}
        <Link href="/urunler" className="flex items-center gap-2 group w-full md:w-auto justify-center md:justify-start">
          <span className="text-3xl md:text-4xl">🐾</span>
          <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:underline">
            PetVerse <span className="text-[#a855f7]">Shop</span>
          </span>
        </Link>

        {/* Global Smart Search with Home Button */}
        <div className="flex-grow w-full md:w-auto max-w-xl flex items-center gap-3">
          <Link href="/" className="bg-[var(--brutal-yellow)] border-2 border-black p-2 rounded-xl shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all shrink-0">
            <Home className="w-5 h-5" />
          </Link>
          
          <div ref={searchRef} className="flex-grow relative">
          <div className="flex bg-white brutal-border focus-within:ring-4 ring-black transition-all">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Ürün veya kategori ara..."
              className="w-full px-4 py-2 font-bold outline-none"
            />
            <button 
              onClick={() => handleSearchSubmit(searchTerm)}
              className="px-4 bg-[var(--brutal-yellow)] border-l-2 border-black font-black uppercase hover:bg-black hover:text-white transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>

          {/* Suggestions Dropdown */}
          {showSuggestions && suggestions.length > 0 && (
            <div className="absolute top-full left-0 right-0 z-[60] bg-white brutal-border mt-2 brutal-shadow overflow-hidden">
              {suggestions.map((item, index) => (
                <button
                  key={item.id}
                  onClick={() => handleSearchSubmit(item.name)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                  className={`w-full text-left p-3 flex items-center justify-between border-b-2 border-black last:border-none transition-colors ${
                    highlightedIndex === index ? 'bg-[var(--brutal-yellow)]' : 'hover:bg-gray-50'
                  }`}
                >
                  <div>
                    <p className="font-bold text-sm">{item.name}</p>
                    <p className="text-[10px] font-black uppercase text-gray-500">{item.category}</p>
                  </div>
                  <Search className="w-3 h-3 text-gray-400" />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Navigation */}
        <nav className="flex flex-wrap justify-center gap-3 md:gap-4 w-full md:w-auto">
          <Link href="/sepet" className="brutal-border brutal-shadow brutal-shadow-hover bg-[var(--brutal-green)] px-3 py-2 md:px-4 md:py-2 font-black uppercase flex items-center gap-2 text-sm md:text-base flex-1 md:flex-none justify-center">
            <ShoppingCart className="w-4 h-4" />
            <span>Sepet</span>
            <span className="bg-white text-black rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs border-2 border-black">
              {totalItems}
            </span>
          </Link>
          <Link href="/favoriler" className="brutal-border brutal-shadow brutal-shadow-hover bg-white px-3 py-2 md:px-4 md:py-2 font-black uppercase flex items-center gap-2 text-sm md:text-base flex-1 md:flex-none justify-center">
            <Heart className="w-4 h-4" />
            <span className="hidden sm:inline">Favoriler</span>
            <span className="sm:hidden">Fav</span>
            <span className="bg-[var(--brutal-red)] text-white rounded-full w-5 h-5 md:w-6 md:h-6 flex items-center justify-center text-xs border-2 border-black">
              {totalFavorites}
            </span>
          </Link>
          {user ? (
            <Link href="/profil" className="brutal-border brutal-shadow brutal-shadow-hover bg-[var(--brutal-blue)] px-3 py-2 md:px-4 md:py-2 font-black uppercase flex items-center gap-2 text-sm md:text-base flex-1 md:flex-none justify-center">
              <UserIcon className="w-4 h-4" />
              <span>Profil</span>
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
