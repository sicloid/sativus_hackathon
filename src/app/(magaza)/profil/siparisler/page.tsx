import Link from 'next/link'
import { getUserOrders } from '@/app/actions/store'

export const dynamic = 'force-dynamic'

const STATUS_MAP: Record<string, { label: string; color: string; icon: string }> = {
  PENDING:   { label: 'Beklemede',       color: 'bg-[var(--brutal-yellow)]', icon: '⏳' },
  CONFIRMED: { label: 'Onaylandı',       color: 'bg-[var(--brutal-blue)]',   icon: '✅' },
  SHIPPED:   { label: 'Kargoya Verildi', color: 'bg-[var(--brutal-green)]',  icon: '🚚' },
  DELIVERED: { label: 'Teslim Edildi',   color: 'bg-[var(--brutal-green)]',  icon: '🏠' },
  CANCELLED: { label: 'İptal Edildi',    color: 'bg-[var(--brutal-red)]',    icon: '❌' },
}

export default async function SiparislerPage() {
  const orders = await getUserOrders()

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-black uppercase mb-2">Siparişlerim</h1>

      {orders.length === 0 ? (
        <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-12 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">Henüz Siparişiniz Yok</h2>
          <p className="text-xl font-bold mb-8">Hemen mağazamızı keşfedin!</p>
          <Link
            href="/urunler"
            className="inline-block bg-black text-white px-8 py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-xl transition-colors hover:bg-white hover:text-black"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const status = STATUS_MAP[order.status] || { label: order.status, color: 'bg-gray-200', icon: '📦' }
            const orderDate = new Date(order.createdAt).toLocaleDateString('tr-TR', {
              day: 'numeric', month: 'long', year: 'numeric',
            })
            const orderTime = new Date(order.createdAt).toLocaleTimeString('tr-TR', {
              hour: '2-digit', minute: '2-digit',
            })
            const grandTotal = order.totalPrice + order.tax + order.shippingCost

            return (
              <div key={order.id} className="bg-white brutal-border brutal-shadow flex flex-col overflow-hidden">

                {/* ── Sipariş Başlığı ── */}
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center border-b-4 border-black p-5 bg-[#f8f8f8] gap-4">
                  <div className="flex flex-col gap-1">
                    <span className="font-bold uppercase text-xs tracking-widest text-gray-500">Sipariş No</span>
                    <span className="text-xl font-black">#{order.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold uppercase text-xs tracking-widest text-gray-500">Tarih</span>
                    <span className="font-black">{orderDate} – {orderTime}</span>
                  </div>
                  <div className="flex flex-col gap-1">
                    <span className="font-bold uppercase text-xs tracking-widest text-gray-500">Toplam Tutar</span>
                    <span className="text-xl font-black">
                      ₺{grandTotal.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 items-start md:items-end">
                    <span className="font-bold uppercase text-xs tracking-widest text-gray-500 mb-1">Durum</span>
                    <span className={`px-3 py-1 font-black uppercase text-xs border-2 border-black ${status.color}`}>
                      {status.icon} {status.label}
                    </span>
                  </div>
                </div>

                {/* ── İçerik: Ürünler + Adres + Fiyat ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-black">

                  {/* Ürün Listesi */}
                  <div className="p-5 md:col-span-1">
                    <h3 className="font-black uppercase text-xs tracking-widest mb-3 text-gray-500">Ürünler ({order.items.length})</h3>
                    <ul className="flex flex-col gap-3">
                      {order.items.map((item) => (
                        <li key={item.id} className="flex items-center gap-3">
                          {item.product.imageUrl ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={item.product.imageUrl}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover brutal-border flex-shrink-0"
                            />
                          ) : (
                            <div className="w-12 h-12 bg-[#f0f0f0] brutal-border flex items-center justify-center flex-shrink-0 text-gray-400 font-black text-sm">?</div>
                          )}
                          <div className="min-w-0">
                            <p className="font-black text-sm leading-tight truncate">{item.product.name}</p>
                            <p className="text-xs font-bold text-gray-500">
                              {item.quantity} adet × ₺{item.unitPrice.toFixed(2)}
                            </p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Teslimat Adresi */}
                  <div className="p-5 md:col-span-1">
                    <h3 className="font-black uppercase text-xs tracking-widest mb-3 text-gray-500">Teslimat Adresi</h3>
                    <div className="flex flex-col gap-1.5 text-sm font-bold">
                      <p className="font-black">{order.fullName}</p>
                      <p>📞 {order.phone}</p>
                      <p>📍 {order.address}</p>
                      <p>🏙️ {order.city}</p>
                    </div>
                  </div>

                  {/* Fiyat Özeti */}
                  <div className="p-5 md:col-span-1">
                    <h3 className="font-black uppercase text-xs tracking-widest mb-3 text-gray-500">Ödeme Özeti</h3>
                    <div className="flex flex-col gap-2 text-sm font-bold">
                      <div className="flex justify-between">
                        <span>Ürünler</span>
                        <span>₺{order.totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>KDV (%20)</span>
                        <span>₺{order.tax.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Kargo</span>
                        <span>
                          {order.shippingCost === 0
                            ? <span className="text-green-700">Ücretsiz</span>
                            : `₺${order.shippingCost.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between font-black text-base border-t-2 border-black pt-2 mt-1">
                        <span>Genel Toplam</span>
                        <span>₺{grandTotal.toFixed(2)}</span>
                      </div>
                    </div>

                    <div className="mt-5">
                      <Link
                        href="/urunler"
                        className="w-full block text-center bg-black text-white py-2.5 font-black uppercase text-xs tracking-wider brutal-border brutal-shadow brutal-shadow-hover hover:bg-[var(--brutal-yellow)] hover:text-black transition-colors"
                      >
                        Tekrar Sipariş Ver
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
