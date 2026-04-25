import { getLatestOrder } from '@/app/actions/store'
import ClearCartOnLoad from './ClearCartOnLoad'
import ConfettiTrigger from './ConfettiTrigger'
import Link from 'next/link'
import { Heart } from 'lucide-react'
import { Bebas_Neue, Space_Mono } from 'next/font/google'

const bebas = Bebas_Neue({ weight: '400', subsets: ['latin'] })
const spaceMono = Space_Mono({ weight: ['400', '700'], subsets: ['latin'] })

export const dynamic = 'force-dynamic'

export default async function OdemeBasariliPage() {
  const order = await getLatestOrder()

  return (
    <div className="relative min-h-[90vh] -mt-8 -mx-4 flex items-center justify-center p-4">
      {/* Sepeti temizle & Konfeti patlat */}
      <ClearCartOnLoad />
      <ConfettiTrigger />

      {/* Full Screen Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1200&q=80" 
          alt="Success background" 
          className="w-full h-full object-cover scale-105"
        />
        {/* Dark Overlay (bg-gray-900/60) */}
        <div className="absolute inset-0 bg-gray-900/60" />
      </div>

      {/* Content Card (Solid colors, no glassmorphism) */}
      <div className="relative z-10 w-full max-w-xl bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 md:p-12 text-center">
        {/* Animated Heart in Yellow Circle */}
        <div className="mb-8 flex justify-center">
          <div className="w-24 h-24 bg-[#FFD600] border-4 border-black rounded-full flex items-center justify-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] heartbeat-anim">
             <Heart className="w-12 h-12 text-[#FF2E2E] fill-[#FF2E2E]" />
          </div>
        </div>

        {/* Typography */}
        <h1 className={`${bebas.className} text-4xl md:text-6xl uppercase mb-4 leading-none text-black tracking-wider`}>
          Bir canı kurtardığınız ve hayat olduğunuz için teşekkürler!
        </h1>
        
        <p className="text-lg text-gray-500 italic mb-8 font-medium">
          Desteğinizle bir dostumuzun daha hayatı güzelleşiyor.
        </p>

        {/* Order Number (Space Mono) */}
        {order && (
          <Link 
            href="/profil/siparisler" 
            className={`${spaceMono.className} inline-block mb-10 px-8 py-4 bg-[#FFD600] border-4 border-black font-bold text-xl md:text-3xl hover:bg-black hover:text-[#FFD600] transition-colors cursor-pointer shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px]`}
          >
            #{order.id.slice(-8).toUpperCase()}
          </Link>
        )}

        {/* Buttons (Soft-brutalism) */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center mb-10">
          <Link
            href="/profil/siparisler"
            className="flex-1 bg-black text-white px-6 py-4 border-4 border-black font-black uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] transition-all text-center"
          >
            Siparişlerim
          </Link>
          <Link
            href="/urunler"
            className="flex-1 bg-[#FFD600] text-black px-6 py-4 border-4 border-black font-black uppercase tracking-widest text-sm shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-y-[4px] hover:translate-x-[4px] transition-all text-center"
          >
            Anasayfaya Dön
          </Link>
        </div>

        {/* Donation Footer (Dashed border) */}
        <div className="border-t-4 border-dashed border-black pt-8 flex items-center justify-center gap-3">
          <span className="text-3xl">🐾</span>
          <p className="font-black text-xs md:text-sm uppercase tracking-tighter text-black">
            Her siparişiniz hayvanlar için %10 bağış olarak iletilmektedir.
          </p>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes heartbeat {
          0% { transform: scale(1); }
          15% { transform: scale(1.15); }
          30% { transform: scale(1); }
          45% { transform: scale(1.2); }
          70% { transform: scale(1); }
        }
        .heartbeat-anim {
          animation: heartbeat 1.5s ease-in-out infinite;
        }
      ` }} />
    </div>
  )
}
