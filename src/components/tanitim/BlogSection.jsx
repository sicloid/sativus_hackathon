"use client";

import { useScrollReveal } from '@/hooks/useScrollReveal';

export default function BlogSection() {
  const { ref, isVisible } = useScrollReveal();

  return (
    <section ref={ref} className={`bg-white px-6 pt-16 md:pt-24 border-b-2 border-black overflow-hidden transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-16">
        {/* Sol */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black">
            <span className="relative">
              Bilgi Paylaştıkça Çoğalır
              <span className="absolute -bottom-1 left-0 w-full h-3 bg-yellow-300 -z-10 rounded" />
            </span>
          </h2>
          <p className="text-xl font-bold tracking-tight text-gray-800">
            Evcil hayvanınızın sağlığı, beslenmesi ve eğitimi hakkında bilmeniz gereken her şeyi uzman içeriklerimizle öğrenin.
          </p>
          <ul className="space-y-4 pt-4">
            <li className="flex items-center gap-3 font-black text-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 animate-pulse-subtle">
                <span className="text-white text-xs font-black">✓</span>
              </div>
              Uzman içeriklere erişim
            </li>
            <li className="flex items-center gap-3 font-black text-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 animate-pulse-subtle">
                <span className="text-white text-xs font-black">✓</span>
              </div>
              Haftalık yeni makaleler
            </li>
            <li className="flex items-center gap-3 font-black text-lg">
              <div className="w-6 h-6 bg-green-500 rounded-full border-2 border-black flex items-center justify-center flex-shrink-0 animate-pulse-subtle">
                <span className="text-white text-xs font-black">✓</span>
              </div>
              Topluluk destekli bilgi bankası
            </li>
          </ul>
        </div>

        {/* Sağ */}
        <div className="bg-blue-100 border-2 border-black rounded-2xl min-h-[350px] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all duration-300 ease-out overflow-hidden relative cursor-pointer group">
          <img src="https://picsum.photos/id/237/800/600" alt="Blog Görseli" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors z-10" />
        </div>
      </div>

      {/* Wave Transition to AppointmentSection */}
      <div className="w-full overflow-hidden leading-none -mb-1">
        <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-12">
          <path d="M0,60 C300,20 600,100 900,60 C1050,40 1150,80 1200,60 L1200,120 L0,120 Z" fill="#fff7ed" />
        </svg>
      </div>
    </section>
  );
}
