'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Search, Clock, Phone, Navigation, ArrowLeft } from 'lucide-react'
import Footer from '@/components/tanitim/Footer'

const locations = [
  {
    id: 1,
    isim: "PetVerse Kadıköy Mağaza",
    tip: "Mağaza",
    adres: "Moda Cad. No:42, Kadıköy/İstanbul",
    mesafe: "0.8 km",
    saat: "09:00 - 21:00",
    telefon: "0216 xxx xx xx",
    aktif: true,
    renk: "bg-blue-500",
    emoji: "🏪"
  },
  {
    id: 2,
    isim: "PetVerse Care Üsküdar",
    tip: "Klinik",
    adres: "Hakimiyet-i Milliye Cad. No:15, Üsküdar",
    mesafe: "2.1 km",
    saat: "08:00 - 20:00",
    telefon: "0216 xxx xx xx",
    aktif: false,
    renk: "bg-green-500",
    emoji: "🩺"
  },
  {
    id: 3,
    isim: "PetVerse Beşiktaş Kuaför",
    tip: "Kuaför",
    adres: "Barbaros Bulvarı No:78, Beşiktaş",
    mesafe: "3.4 km",
    saat: "10:00 - 19:00",
    telefon: "0212 xxx xx xx",
    aktif: false,
    renk: "bg-orange-400",
    emoji: "✂️"
  },
  {
    id: 4,
    isim: "PetVerse Şişli Mağaza",
    tip: "Mağaza",
    adres: "Halaskargazi Cad. No:123, Şişli",
    mesafe: "5.2 km",
    saat: "09:00 - 22:00",
    telefon: "0212 xxx xx xx",
    aktif: false,
    renk: "bg-blue-500",
    emoji: "🏪"
  },
  {
    id: 5,
    isim: "PetVerse Ataşehir Klinik",
    tip: "Klinik",
    adres: "Atatürk Mah. Ertuğrul Gazi Sok. No:5",
    mesafe: "6.8 km",
    saat: "08:00 - 18:00",
    telefon: "0216 xxx xx xx",
    aktif: false,
    renk: "bg-green-500",
    emoji: "🩺"
  },
  {
    id: 6,
    isim: "PetVerse Maltepe Barınak",
    tip: "Barınak",
    adres: "Bağlarbaşı Mah. İstasyon Cad. No:89",
    mesafe: "8.3 km",
    saat: "07:00 - 23:00",
    telefon: "0216 xxx xx xx",
    aktif: false,
    renk: "bg-purple-500",
    emoji: "🏠"
  }
]

export default function HaritalarPage() {
  const [selectedId, setSelectedId] = useState(1)
  const [filter, setFilter] = useState('Tümü')
  const [distance, setDistance] = useState('10 km')

  const filteredLocations = filter === 'Tümü' 
    ? locations 
    : locations.filter(loc => loc.tip === filter)

  return (
    <div className="min-h-screen bg-orange-50 font-sans text-black">
      {/* STICKY NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white border-b-2 border-black px-6 py-4 shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-2 group">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-black uppercase tracking-tighter group-hover:underline">
              PetVerse
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <input 
              type="text" 
              placeholder="Şehir veya ilçe ara..." 
              className="border-2 border-black rounded-xl px-4 py-2 w-64 font-bold focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="bg-black text-white font-black border-2 border-black rounded-xl px-6 py-2 hover:bg-gray-800 transition-colors">
              ARA
            </button>
          </div>

          <div className="flex items-center gap-4">
            <Link href="/" className="font-bold border-2 border-black rounded-xl px-4 py-2 hover:bg-gray-100 transition-colors">
              Ana Menü
            </Link>
            <Link href="/login" className="font-bold border-2 border-black rounded-xl px-4 py-2 hover:bg-gray-100 transition-colors">
              Giriş Yap
            </Link>
            <Link href="/register" className="bg-blue-600 text-white font-black border-2 border-black rounded-xl px-4 py-2 hover:bg-blue-700 transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              Kayıt Ol
            </Link>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* ANA SAYFAYA DÖN BUTONU */}
        <Link href="/">
          <button className="flex items-center gap-2 bg-white border-2 border-black rounded-xl px-4 py-2 font-black text-sm shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 transition-transform duration-200 mb-6">
            <ArrowLeft className="w-4 h-4" />
            Ana Sayfaya Dön
          </button>
        </Link>

        {/* FİLTRE ÇUBUĞU */}
        <div className="flex flex-wrap items-center gap-6 mb-8">
          <div className="flex items-center gap-2">
            <span className="font-black text-sm uppercase tracking-wider text-gray-500">Kategori:</span>
            <div className="flex gap-2">
              {['Tümü', 'Mağaza', 'Klinik', 'Kuaför', 'Barınak'].map((cat) => (
                <button 
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`border-2 border-black rounded-xl px-3 py-1 font-bold text-sm transition-all ${filter === cat ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                  {cat === 'Mağaza' ? '🏪 Mağaza' : cat === 'Klinik' ? '🩺 Klinik' : cat === 'Kuaför' ? '✂️ Kuaför' : cat === 'Barınak' ? '🏠 Barınak' : 'Tümü'}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="font-black text-sm uppercase tracking-wider text-gray-500">Mesafe:</span>
            <div className="flex gap-2">
              {['5 km', '10 km', '25 km'].map((dist) => (
                <button 
                  key={dist}
                  onClick={() => setDistance(dist)}
                  className={`border-2 border-black rounded-xl px-3 py-1 font-bold text-sm transition-all ${distance === dist ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
                >
                  {dist}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ANA IÇERIK */}
        <div className="grid grid-cols-1 lg:grid-cols-[380px_1fr] gap-8 h-[calc(100vh-250px)]">
          {/* SOL PANEL — Konum Listesi */}
          <div className="bg-white border-2 border-black rounded-3xl p-6 overflow-y-auto shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-black text-xl uppercase tracking-tighter italic">
                {filteredLocations.length} Nokta Bulundu
              </h3>
              <MapPin className="w-6 h-6 text-blue-500" />
            </div>

            <div className="space-y-4">
              {filteredLocations.map((loc) => (
                <div 
                  key={loc.id}
                  onClick={() => setSelectedId(loc.id)}
                  className={`border-2 border-black rounded-2xl p-4 cursor-pointer transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0.5 ${selectedId === loc.id ? 'bg-blue-50 border-blue-600' : 'bg-white hover:bg-gray-50'}`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{loc.emoji}</span>
                      <span className={`text-[10px] font-black uppercase text-white px-2 py-0.5 rounded border border-black ${loc.renk}`}>
                        {loc.tip}
                      </span>
                    </div>
                    <span className="font-black text-xs text-blue-600">{loc.mesafe}</span>
                  </div>
                  
                  <h4 className="font-black text-lg leading-tight mb-3 uppercase tracking-tighter">
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
                      <Navigation className="w-3 h-3" />
                      Yol Tarifi Al →
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SAĞ TARAF — Google Maps */}
          <div className="h-full">
            <div className="h-full rounded-[2.5rem] border-4 border-black overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative group">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d96699.09038386479!2d28.872078!3d41.013611!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14caa7040068086b%3A0xe1ccfe98bc01b0d0!2zxLBzdGFuYnVs!5e0!3m2!1str!2str!4v1234567890"
                width="100%"
                height="100%"
                style={{border: 0}}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="grayscale-[0.5] group-hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Overlay Label */}
              <div className="absolute top-6 right-6 bg-white border-2 border-black rounded-xl px-4 py-2 font-black text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                📍 Canlı Harita Görünümü
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
