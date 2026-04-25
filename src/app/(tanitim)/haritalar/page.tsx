'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { MapPin, Clock, Phone, ShoppingBag, Stethoscope, Scissors, Home, Search } from 'lucide-react'
import Footer from '@/components/tanitim/Footer'
import { mapLocations } from '@/data/mapLocations'

const PetVerseMap = dynamic(
  () => import('@/components/tanitim/PetVerseMap'),
  { 
    ssr: false, 
    loading: () => (
      <div className="w-full h-full bg-blue-50 border-2 border-black rounded-2xl flex items-center justify-center font-black">
        Harita yükleniyor...
      </div>
    )
  }
)

export default function HaritalarPage() {
  const [selectedId, setSelectedId] = useState<number | null>(1)
  const [filter, setFilter] = useState('Tümü')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredLocations = useMemo(() => {
    let locs = filter === 'Tümü' 
      ? mapLocations 
      : mapLocations.filter(loc => loc.tip === filter)
    
    return locs
  }, [filter])

  const handleSearch = () => {
    if (!searchTerm.trim()) return
    
    const searchLower = searchTerm.toLowerCase()
    const found = mapLocations.find(loc => 
      loc.isim.toLowerCase().includes(searchLower) || 
      loc.adres.toLowerCase().includes(searchLower)
    )
    
    if (found) {
      if (filter !== 'Tümü' && found.tip !== filter) {
        setFilter('Tümü')
      }
      setSelectedId(found.id)
    }
  }

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-black">
      {/* 1. NAVBAR GÜNCELLEMESİ */}
      <nav className="bg-white border-b-4 border-black sticky top-0 z-50 px-6 py-4 flex justify-between items-center brutal-shadow">
        {/* SOL — Logo (PetVerse Shop Stili Birebir) */}
        <Link href="/haritalar" className="flex items-center gap-2 group w-full md:w-auto justify-center md:justify-start">
          <span className="text-3xl md:text-4xl">🐾</span>
          <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter group-hover:underline">
            PetVerse <span className="text-[#a855f7]">Location</span>
          </span>
        </Link>

        {/* ORTA — Arama */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center bg-white border-2 border-black rounded-xl overflow-hidden shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] focus-within:ring-4 ring-blue-400 transition-all">
            <input 
              placeholder="Şehir veya ilçe ara..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              className="px-4 py-2 w-64 font-bold outline-none bg-white"
            />
            <button 
              onClick={handleSearch}
              className="bg-blue-600 text-white px-4 py-2 font-black border-l-2 border-black hover:bg-black transition-colors"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* SAĞ — Butonlar */}
        <div className="flex items-center gap-3">
          <Link href="/">
            <button className="border-2 border-black rounded-xl px-4 py-2 font-black text-sm bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform duration-200">
              Ana Menü
            </button>
          </Link>
          <Link href="/urunler">
            <button className="border-2 border-black rounded-xl px-4 py-2 font-black text-sm bg-[var(--brutal-yellow)] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform duration-200 hidden sm:block">
              Mağaza
            </button>
          </Link>
        </div>
      </nav>

      {/* 2. FİLTRE ÇUBUĞU (Renklendirilmiş) */}
      <div className="bg-white border-b-2 border-black px-4 py-4 sticky top-[76px] z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4 justify-center md:justify-start">
          <button 
            onClick={() => setFilter('Tümü')}
            className={`border-2 border-black rounded-xl px-6 py-2.5 font-black text-sm uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 ${filter === 'Tümü' ? 'bg-black text-white' : 'bg-white text-black'}`}
          >
            <MapPin className="w-4 h-4" /> Tümü
          </button>

          <button 
            onClick={() => setFilter('Mağaza')}
            className={`border-2 border-black rounded-xl px-6 py-2.5 font-black text-sm uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 ${filter === 'Mağaza' ? 'bg-blue-600 text-white' : 'bg-white text-black hover:bg-blue-50'}`}
          >
            <ShoppingBag className="w-4 h-4" /> Mağaza
          </button>

          <button 
            onClick={() => setFilter('Klinik')}
            className={`border-2 border-black rounded-xl px-6 py-2.5 font-black text-sm uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 ${filter === 'Klinik' ? 'bg-green-400 text-black' : 'bg-white text-black hover:bg-green-50'}`}
          >
            <Stethoscope className="w-4 h-4" /> Klinik
          </button>

          <button 
            onClick={() => setFilter('Kuaför')}
            className={`border-2 border-black rounded-xl px-6 py-2.5 font-black text-sm uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 ${filter === 'Kuaför' ? 'bg-orange-400 text-black' : 'bg-white text-black hover:bg-orange-50'}`}
          >
            <Scissors className="w-4 h-4" /> Kuaför
          </button>

          <button 
            onClick={() => setFilter('Barınak')}
            className={`border-2 border-black rounded-xl px-6 py-2.5 font-black text-sm uppercase transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 flex items-center gap-2 ${filter === 'Barınak' ? 'bg-purple-500 text-white' : 'bg-white text-black hover:bg-purple-50'}`}
          >
            <Home className="w-4 h-4" /> Barınak
          </button>
        </div>
      </div>

      {/* ANA İÇERİK */}
      <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-0">
        {/* SOL PANEL — Konum Listesi */}
        <div className="bg-white border-r-2 border-black overflow-y-auto h-[calc(100vh-125px)] p-6">
          <h3 className="font-black text-xl uppercase tracking-tighter italic mb-6">
            {filteredLocations.length} Nokta Bulundu
          </h3>

          <div className="space-y-4 pb-10">
            {filteredLocations.map((loc) => (
              <div 
                key={loc.id}
                onClick={() => setSelectedId(loc.id)}
                className={`border-2 border-black rounded-2xl p-4 cursor-pointer transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 ${selectedId === loc.id ? 'bg-blue-50 border-blue-600' : 'bg-white hover:bg-gray-50'}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xl">
                      {loc.tip === 'Mağaza' ? '🏪' : loc.tip === 'Klinik' ? '🩺' : loc.tip === 'Kuaför' ? '✂️' : '🏠'}
                    </span>
                    <span className={`text-[10px] font-black uppercase text-white px-2 py-0.5 rounded border border-black ${loc.tip === 'Mağaza' ? 'bg-blue-500' : loc.tip === 'Klinik' ? 'bg-green-500' : loc.tip === 'Kuaför' ? 'bg-orange-400' : 'bg-purple-500'}`}>
                      {loc.tip}
                    </span>
                  </div>
                </div>
                
                <h4 className="font-black text-lg leading-tight mb-2 uppercase tracking-tighter">
                  {loc.isim}
                </h4>

                <div className="space-y-2 text-sm font-bold text-gray-600">
                  <div className="flex items-start gap-2">
                    <MapPin className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{loc.adres}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 shrink-0" />
                    <span>{loc.saat}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 shrink-0" />
                    <span>{loc.telefon}</span>
                  </div>
                </div>

                <div className="mt-4">
                  <button 
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(`https://www.google.com/maps/search/${encodeURIComponent(loc.adres)}`)
                    }}
                    className="w-full bg-black text-white rounded-xl py-2 font-black text-xs flex items-center justify-center gap-2 hover:bg-blue-600 transition-colors"
                  >
                    Yol Tarifi Al →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SAĞ TARAF — Harita */}
        <div className="p-4 bg-orange-50">
          <div className="w-full h-[calc(100vh-160px)] rounded-2xl border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden bg-blue-50">
            <PetVerseMap selectedId={selectedId} locations={filteredLocations} />
          </div>
          
          <div className="mt-6">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
