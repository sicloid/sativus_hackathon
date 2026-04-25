"use client";

import Link from 'next/link';
import { Bell, RefreshCw, Calendar as CalendarIcon } from 'lucide-react';
import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function AppointmentSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`bg-orange-50 px-6 pt-16 md:pt-24 border-b-2 border-black overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        {/* Sol - Tablet Mockup */}
        <div className="order-2 md:order-1 bg-gray-900 border-4 border-black rounded-[2.5rem] p-3 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative aspect-[4/3] flex flex-col hover:-translate-y-2 hover:shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] transition-all duration-300">
          {/* Sahte Tarayıcı Bar */}
          <div className="flex gap-1.5 mb-3 px-4 pt-1">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
          </div>
          
          <div className="bg-white rounded-2xl p-4 flex-1 flex flex-col overflow-hidden">
            <div className="border-b-2 border-black pb-4 mb-4 flex items-center justify-between">
              <h3 className="font-black text-xl">Randevularım</h3>
              <CalendarIcon className="w-6 h-6" />
            </div>
            
            <div className="space-y-3 flex-1">
              <div className="bg-green-100 border border-green-400 rounded-xl p-3 flex justify-between items-center cursor-pointer hover:bg-green-200 transition-colors">
                <div>
                  <p className="font-black text-sm">Aşı Takvimi</p>
                  <p className="text-xs font-bold text-green-700">Yarın, 14:00</p>
                </div>
                <div className="px-2 py-1 bg-green-500 text-white text-[10px] font-black rounded uppercase">Aktif</div>
              </div>
              
              <div className="bg-blue-100 border border-blue-400 rounded-xl p-3 flex justify-between items-center cursor-pointer hover:bg-blue-200 transition-colors">
                <div>
                  <p className="font-black text-sm">Kuaför Bakımı</p>
                  <p className="text-xs font-bold text-blue-700">16 Mayıs, 10:30</p>
                </div>
              </div>
              
              <div className="bg-yellow-100 border border-yellow-400 rounded-xl p-3 flex justify-between items-center cursor-pointer hover:bg-yellow-200 transition-colors opacity-80">
                <div>
                  <p className="font-black text-sm">Genel Kontrol</p>
                  <p className="text-xs font-bold text-yellow-700">Tamamlandı</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sağ */}
        <div className="order-1 md:order-2 space-y-8">
          <div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black mb-4">
              Karmaşıklığa Son Verin
            </h2>
            <p className="text-xl font-bold tracking-tight text-gray-800">
              Veteriner ve bakım randevularınızı tek bir ekrandan kolayca yönetin, hiçbir önemli tarihi kaçırmayın.
            </p>
          </div>

          <div className="flex flex-wrap gap-4">
            <div className="bg-white border-2 border-black rounded-xl p-4 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 bg-blue-100 border-2 border-black rounded-xl flex items-center justify-center">
                <Bell className="w-5 h-5 text-blue-600" />
              </div>
              <span className="font-black text-lg">Akıllı Hatırlatıcılar</span>
            </div>
            <div className="bg-white border-2 border-black rounded-xl p-4 flex items-center gap-3 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
              <div className="w-10 h-10 bg-green-100 border-2 border-black rounded-xl flex items-center justify-center">
                <RefreshCw className="w-5 h-5 text-green-600" />
              </div>
              <span className="font-black text-lg">Anlık Senkronizasyon</span>
            </div>
          </div>

          <div>
            <Link href="/hastane" className="inline-block bg-black text-white font-black tracking-tight text-xl px-8 py-4 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              PetVerse Care'e Git
            </Link>
          </div>
        </div>
      </div>

      {/* Wave Transition to ShopSection */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,80 C400,40 800,100 1200,60 L1200,120 L0,120 Z" fill="#fef3c7" />
        </svg>
      </div>
    </section>
  );
}
