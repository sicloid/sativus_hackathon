import Link from 'next/link';
import { Calendar, ShoppingBag } from 'lucide-react';

export default function HeroSection() {
  return (
    <section className="bg-orange-50 px-6 py-16 md:py-24 border-b-2 border-black">
      <div className="max-w-7xl mx-auto flex flex-col items-center text-center">
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-black mb-6 max-w-4xl leading-tight">
          Gençlik Enerjisi Seninle, Sevgin Patilerle!
        </h1>
        <p className="text-xl md:text-2xl font-bold tracking-tight text-gray-800 mb-12 max-w-2xl">
          Sevimli dostlarınız için ihtiyacınız olan her şey tek bir platformda.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-5xl">
          {/* Blog Kartı */}
          <Link href="/blog" className="md:col-span-1 bg-blue-600 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex flex-col justify-end min-h-[250px] text-white">
            <h3 className="text-2xl font-black tracking-tight mb-2">Blog Oku</h3>
            <p className="font-bold">Dostunuz için en iyi ipuçları</p>
          </Link>

          <div className="md:col-span-2 grid grid-cols-1 gap-6">
            {/* Randevu Kartı */}
            <Link href="/randevu" className="bg-green-400 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4 text-black h-full">
              <div className="bg-white p-4 border-2 border-black rounded-xl">
                <Calendar className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black tracking-tight">Randevu Al</h3>
                <p className="font-bold">Veteriner veya kuaför</p>
              </div>
            </Link>

            {/* Mağaza Şeridi */}
            <Link href="/urunler" className="bg-yellow-300 border-2 border-black rounded-2xl p-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all flex items-center gap-4 text-black h-full">
              <div className="bg-white p-4 border-2 border-black rounded-xl">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <div className="text-left">
                <h3 className="text-2xl font-black tracking-tight">Mağaza</h3>
                <p className="font-bold">Oyuncak, mama, aksesuar</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
