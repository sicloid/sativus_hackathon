import { getLatestOrder } from '@/app/actions/store'
import ClearCartOnLoad from './ClearCartOnLoad'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function OdemeBasariliPage() {
  const order = await getLatestOrder()

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      {/* Sepeti temizle (client micro-component) */}
      <ClearCartOnLoad />

      {/* Başlık Kutusu */}
      <div className="bg-[var(--brutal-green)] brutal-border brutal-shadow p-10 max-w-2xl w-full text-center mb-8">
        <div className="w-20 h-20 bg-white brutal-border brutal-shadow mx-auto flex items-center justify-center mb-6 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-10 h-10">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>

        <h1 className="text-4xl md:text-5xl font-black uppercase mb-3">Siparişiniz Alındı!</h1>
        <p className="text-lg font-bold mb-6">
          Teşekkür ederiz. Hayvan dostunuz için siparişiniz başarıyla oluşturuldu.
        </p>

        {order && (
          <div className="bg-white brutal-border p-4 mb-6 inline-block">
            <p className="text-xs uppercase font-black mb-1 tracking-widest">Sipariş Numarası</p>
            <p className="text-2xl font-black text-[var(--brutal-blue)]">
              #{order.id.slice(-8).toUpperCase()}
            </p>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/profil/siparisler"
            className="bg-black text-white px-8 py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-lg transition-colors hover:bg-white hover:text-black"
          >
            Siparişlerime Git
          </Link>
          <Link
            href="/urunler"
            className="bg-white text-black px-8 py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-lg transition-colors hover:bg-[var(--brutal-yellow)]"
          >
            Alışverişe Dön
          </Link>
        </div>
      </div>

      {/* Sipariş Özeti */}
      {order ? (
        <div className="max-w-2xl w-full bg-white brutal-border brutal-shadow">
          {/* Özet Başlığı */}
          <div className="bg-black text-white px-6 py-4">
            <h2 className="font-black uppercase text-lg tracking-wider">📦 Sipariş Özeti</h2>
          </div>

          {/* Ürün Listesi */}
          <div className="p-6 border-b-2 border-black">
            <h3 className="font-black uppercase text-xs tracking-widest mb-4 text-gray-500">Ürünler</h3>
            <ul className="flex flex-col gap-3">
              {order.items.map((item) => (
                <li key={item.id} className="flex items-center gap-4">
                  {/* Ürün Görseli */}
                  {item.product.imageUrl ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={item.product.imageUrl}
                      alt={item.product.name}
                      className="w-14 h-14 object-cover brutal-border flex-shrink-0"
                      onError={undefined}
                    />
                  ) : (
                    <div className="w-14 h-14 bg-[#f0f0f0] brutal-border flex items-center justify-center flex-shrink-0 text-gray-400 font-black">?</div>
                  )}
                  <div className="flex-grow min-w-0">
                    <p className="font-black truncate">{item.product.name}</p>
                    <p className="text-sm font-bold text-gray-500">{item.quantity} adet × ₺{item.unitPrice.toFixed(2)}</p>
                  </div>
                  <p className="font-black flex-shrink-0">
                    ₺{(item.unitPrice * item.quantity).toFixed(2)}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          {/* Fiyat Özeti */}
          <div className="p-6 border-b-2 border-black">
            <h3 className="font-black uppercase text-xs tracking-widest mb-4 text-gray-500">Ödeme Detayı</h3>
            <div className="flex flex-col gap-2 font-bold text-sm">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>₺{order.totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>KDV (%20)</span>
                <span>₺{order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo</span>
                <span>{order.shippingCost === 0 ? '🎉 Ücretsiz' : `₺${order.shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between font-black text-lg border-t-2 border-black pt-2 mt-1">
                <span>Toplam</span>
                <span>₺{(order.totalPrice + order.tax + order.shippingCost).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Teslimat Adresi */}
          <div className="p-6">
            <h3 className="font-black uppercase text-xs tracking-widest mb-4 text-gray-500">Teslimat Adresi</h3>
            <div className="font-bold text-sm flex flex-col gap-1">
              <p className="font-black text-base">{order.fullName}</p>
              <p>📞 {order.phone}</p>
              <p>📍 {order.address}</p>
              <p>🏙️ {order.city}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="max-w-2xl w-full bg-[#f8f8f8] brutal-border p-8 text-center">
          <p className="font-bold text-gray-500">Sipariş detayları yükleniyor...</p>
        </div>
      )}
    </div>
  )
}
