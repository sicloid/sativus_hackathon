'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import { MapPin, Clock, Phone, Navigation } from 'lucide-react'
import Footer from '@/components/tanitim/Footer'
import { mapLocations } from '@/components/tanitim/PetVerseMap'

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

  const filteredLocations = filter === 'Tümü' 
    ? mapLocations 
    : mapLocations.filter(loc => loc.tip === filter)

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-black">
      {/* 1. NAVBAR GÜNCELLEMESİ */}
      <nav className="bg-white border-b-2 border-black sticky top-0 z-50 px-6 py-3 flex justify-between items-center shadow-[0px_2px_0px_0px_rgba(0,0,0,1)]">
        {/* SOL — Logo */}
        <Link href="/">
          <div className="flex items-center gap-2 group">
            <span className="text-2xl group-hover:rotate-12 transition-transform">🗺️</span>
            <div>
              <span className="font-black text-xl text-black">PETVERSE</span>
              <span className="font-black text-xl text-blue-600">LOCATION</span>
            </div>
          </div>
        </Link>

        {/* ORTA — Arama */}
        <div className="hidden md:flex items-center gap-2">
          <div className="flex items-center border-2 border-black rounded-xl overflow-hidden shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <input 
              placeholder="Şehir veya ilçe ara..."
              className="px-4 py-2 w-56 font-medium outline-none bg-white"
            />
            <button className="bg-black text-white px-4 py-2 font-black border-l-2 border-black hover:bg-gray-800 transition-colors">
              ARA
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
          <button className="border-2 border-black rounded-xl px-4 py-2 font-black text-sm bg-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform duration-200 hidden sm:block">
            Giriş Yap
          </button>
          <button className="border-2 border-black rounded-xl px-4 py-2 font-black text-sm bg-blue-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform duration-200">
            Kayıt Ol
          </button>
        </div>
      </nav>

      {/* 2. FİLTRE ÇUBUĞU */}
      <div className="bg-amber-50 border-b-2 border-black px-4 py-3 sticky top-[64px] z-40">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center gap-4">
          <button 
            onClick={() => setFilter('Tümü')}
            className={`border-2 border-black rounded-xl px-4 py-2 font-black text-sm transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 ${filter === 'Tümü' ? 'bg-black text-white' : 'bg-white'}`}
          >
            🗺️ Tümü
          </button>

          <button 
            onClick={() => setFilter('Mağaza')}
            className={`border-2 border-black rounded-xl px-4 py-2 font-black text-sm transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 ${filter === 'Mağaza' ? 'bg-black text-white' : 'bg-white'}`}
          >
            <div className="flex items-center gap-2">
              <Image
                src="https://images.unsplash.com/photo-1601758125946-6ec2ef64daf8?w=32&h=32&fit=crop&q=80"
                alt="mağaza" width={20} height={20}
                className="rounded-full border border-black object-cover"
              />
              <span>Mağaza</span>
            </div>
          </button>

          <button 
            onClick={() => setFilter('Klinik')}
            className={`border-2 border-black rounded-xl px-4 py-2 font-black text-sm transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 ${filter === 'Klinik' ? 'bg-black text-white' : 'bg-white'}`}
          >
            <div className="flex items-center gap-2">
              <Image
                src="https://images.unsplash.com/photo-1628009368231-7bb7cfcb0def?w=32&h=32&fit=crop&q=80"
                alt="klinik" width={20} height={20}
                className="rounded-full border border-black object-cover"
              />
              <span>Klinik</span>
            </div>
          </button>

          <button 
            onClick={() => setFilter('Kuaför')}
            className={`border-2 border-black rounded-xl px-4 py-2 font-black text-sm transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 ${filter === 'Kuaför' ? 'bg-black text-white' : 'bg-white'}`}
          >
            <div className="flex items-center gap-2">
              <Image
                src="https://images.unsplash.com/photo-1625316708582-7c38734be31d?w=32&h=32&fit=crop&q=80"
                alt="kuaför" width={20} height={20}
                className="rounded-full border border-black object-cover"
              />
              <span>Kuaför</span>
            </div>
          </button>

          <button 
            onClick={() => setFilter('Barınak')}
            className={`border-2 border-black rounded-xl px-4 py-2 font-black text-sm transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 ${filter === 'Barınak' ? 'bg-black text-white' : 'bg-white'}`}
          >
            <div className="flex items-center gap-2">
              <Image
                src="https://images.unsplash.com/photo-1548767797-d8c844163c4a?w=32&h=32&fit=crop&q=80"
                alt="barınak" width={20} height={20}
                className="rounded-full border border-black object-cover"
              />
              <span>Barınak</span>
            </div>
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
            <PetVerseMap selectedId={selectedId} />
          </div>
          
          <div className="mt-6">
            <Footer />
          </div>
        </div>
      </div>
    </div>
  )
}
