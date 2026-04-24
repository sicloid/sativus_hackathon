import Link from 'next/link';

export default function ShopSection() {
  return (
    <section className="bg-yellow-50 px-6 py-16 md:py-24 border-b-2 border-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Sol */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black">
            Güvenli ve Hızlı Alışveriş
          </h2>
          <p className="text-xl font-bold tracking-tight text-gray-800">
            Dostunuzun tüm ihtiyaçları için seçkin markalar, güvenilir ürünler ve hızlı teslimat avantajları sizi bekliyor.
          </p>
          <div className="pt-4">
            <Link href="/urunler" className="inline-block bg-blue-600 text-white font-black tracking-tight text-xl px-8 py-4 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
              Mağazayı Keşfet
            </Link>
          </div>
        </div>

        {/* Sağ */}
        <div className="bg-orange-100 border-2 border-black rounded-2xl min-h-[280px] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-2xl font-black tracking-tight text-black/50">🛍 Ürün Görseli</span>
        </div>
      </div>
    </section>
  );
}
