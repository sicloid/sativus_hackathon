'use client'

import Link from 'next/link'
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts'
import { useScrollReveal } from '@/hooks/useScrollReveal'

const appointmentData = [
  { ay: 'Oca', sayi: 420 },
  { ay: 'Şub', sayi: 380 },
  { ay: 'Mar', sayi: 510 },
  { ay: 'Nis', sayi: 620 },
  { ay: 'May', sayi: 590 },
  { ay: 'Haz', sayi: 710 },
]

const serviceData = [
  { name: 'Mağaza', value: 40, color: '#2563eb' },
  { name: 'Klinik', value: 35, color: '#22c55e' },
  { name: 'Kuaför', value: 15, color: '#f97316' },
  { name: 'Barınak', value: 10, color: '#a855f7' },
]

export default function CTABanner() {
  const { ref, isVisible } = useScrollReveal()

  return (
    <section ref={ref} className={`bg-amber-50 border-y-2 border-black pt-16 px-6 transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-7xl mx-auto mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* SOL KART — İstatistik Grafikler */}
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-base mb-4 uppercase tracking-tighter italic">
              Rakamlarla PetVerse
            </h3>

            <div className="mb-6">
              <p className="font-black text-sm mb-2 text-gray-500 uppercase tracking-widest">
                Aylık Randevu Trendi
              </p>
              <div className="h-[250px] w-full min-h-[250px]">
                <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                  <BarChart data={appointmentData} margin={{ top: 4, right: 4, left: -20, bottom: 0 }}>
                    <XAxis dataKey="ay" tick={{ fontSize: 10, fontWeight: 700 }} axisLine={false} tickLine={false} />
                    <YAxis tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                    <Tooltip
                      contentStyle={{
                        border: '2px solid black',
                        borderRadius: '8px',
                        fontWeight: 700,
                        fontSize: 11
                      }}
                      cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                    />
                    <Bar dataKey="sayi" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div>
              <p className="font-black text-sm mb-2 text-gray-500 uppercase tracking-widest">
                Hizmet Dağılımı
              </p>
              <div className="flex items-center gap-4">
                <div className="w-[60%] h-[120px] min-h-[120px]">
                  <ResponsiveContainer width="100%" height="100%" minWidth={0} minHeight={0}>
                    <PieChart>
                      <Pie
                        data={serviceData}
                        cx="50%" cy="50%"
                        innerRadius={25}
                        outerRadius={45}
                        dataKey="value"
                        strokeWidth={2}
                        stroke="#000"
                      >
                        {serviceData.map((entry, index) => (
                          <Cell key={index} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip
                        contentStyle={{
                          border: '2px solid black',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: 11
                        }}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div className="flex flex-col gap-1.5 shrink-0">
                  {serviceData.map((item, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-sm border border-black flex-shrink-0"
                        style={{ backgroundColor: item.color }} />
                      <span className="text-[10px] font-black uppercase tracking-tighter">
                        {item.name} %{item.value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* ORTA SÜTUN — Ana Mesaj */}
          <div className="bg-blue-600 border-2 border-black rounded-2xl p-8 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] text-center flex flex-col items-center justify-center">
            <div className="inline-flex items-center gap-2 bg-yellow-400 border-2 border-black rounded-full px-4 py-1 mb-6 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
              <span className="text-lg">🐾</span>
              <span className="font-black text-sm text-black">PetVerse Ailesi</span>
            </div>

            <h2 className="text-white font-black text-4xl tracking-tight mb-4 leading-tight uppercase">
              Dostunuzun En İyi<br />Arkadaşıyız
            </h2>

            <p className="text-blue-100 text-base font-medium mb-8 max-w-[280px]">
              Sağlık, bakım ve alışveriş — her şey tek çatı altında.
            </p>

            <div className="w-full">
              <Link href="/haritalar">
                <button className="w-full bg-white text-black font-black border-2 border-black rounded-2xl px-5 py-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 active:translate-y-0 transition-transform duration-200 flex items-center justify-center gap-2 text-base">
                  📍 Bizi Bul
                </button>
              </Link>
            </div>
          </div>

          {/* SAĞ KART — Neden PetVerse? */}
          <div className="bg-white border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <h3 className="font-black text-base mb-6 uppercase tracking-tighter italic border-b-2 border-black pb-2">
              Neden PetVerse?
            </h3>

            <div className="flex flex-col gap-3">
              {[
                { label: "7/24 Acil Veteriner Desteği", color: "bg-blue-600", light: "bg-blue-50" },
                { label: "VetAI Asistan Desteği", color: "bg-green-500", light: "bg-green-50" },
                { label: "Türkiye Geneli 40+ Şube", color: "bg-purple-500", light: "bg-purple-50" },
                { label: "Güvenli Online Alışveriş", color: "bg-yellow-400", light: "bg-yellow-50", text: "text-black" }
              ].map((item, idx) => (
                <div key={idx} className={`flex items-center gap-3 ${item.light} border-2 border-black rounded-xl p-3 transition-transform hover:-translate-x-1 cursor-default`}>
                  <div className={`${item.color} w-8 h-8 border-2 border-black rounded-lg flex items-center justify-center flex-shrink-0 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]`}>
                    <span className={`${item.text || 'text-white'} font-black text-xs`}>✓</span>
                  </div>
                  <span className="font-black text-sm uppercase tracking-tighter">
                    {item.label}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>

      {/* Wave Transition to FAQSection */}
      <div className="w-full overflow-hidden leading-none relative z-20">
        <svg viewBox="0 0 1440 60" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none" className="w-full h-12 md:h-16">
          <path d="M0,30 C360,60 1080,0 1440,30 L1440,60 L0,60 Z" fill="#ffffff" />
        </svg>
      </div>
    </section>
  )
}
