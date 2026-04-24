import Link from 'next/link'
import { getUserOrders } from '@/app/actions/store'

const STATUS_MAP: Record<string, { label: string; color: string }> = {
  PENDING: { label: 'Beklemede', color: 'bg-[var(--brutal-yellow)]' },
  CONFIRMED: { label: 'Onaylandı', color: 'bg-[var(--brutal-blue)]' },
  SHIPPED: { label: 'Kargoya Verildi', color: 'bg-[var(--brutal-green)]' },
  DELIVERED: { label: 'Teslim Edildi', color: 'bg-[var(--brutal-green)]' },
}

export default async function SiparislerPage() {
  const orders = await getUserOrders()

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-black uppercase mb-4">Siparişlerim</h1>
      
      {orders.length === 0 ? (
        <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-12 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">Henüz Siparişiniz Yok</h2>
          <p className="text-xl font-bold mb-8">Hemen mağazamızı keşfedin!</p>
          <Link 
            href="/urunler" 
            className="inline-block bg-black text-white px-8 py-4 brutal-border font-black uppercase text-xl hover:bg-white hover:text-black transition-colors"
          >
            Alışverişe Başla
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-6">
          {orders.map((order) => {
            const status = STATUS_MAP[order.status] || { label: order.status, color: 'bg-gray-200' }
            const orderDate = new Date(order.createdAt).toLocaleDateString('tr-TR', {
              day: 'numeric', month: 'long', year: 'numeric'
            })

            return (
              <div key={order.id} className="bg-white brutal-border brutal-shadow p-0 flex flex-col">
                <div className="flex flex-col md:flex-row justify-between border-b-4 border-black p-4 bg-[#f8f8f8]">
                  <div className="flex flex-col gap-1 mb-4 md:mb-0">
                    <span className="font-bold uppercase text-sm">Sipariş No</span>
                    <span className="text-xl font-black">{order.id.slice(-8).toUpperCase()}</span>
                  </div>
                  <div className="flex flex-col gap-1 mb-4 md:mb-0">
                    <span className="font-bold uppercase text-sm">Tarih</span>
                    <span className="text-lg font-black">{orderDate}</span>
                  </div>
                  <div className="flex flex-col gap-1 mb-4 md:mb-0">
                    <span className="font-bold uppercase text-sm">Tutar</span>
                    <span className="text-lg font-black">
                      {(order.totalPrice + order.tax + order.shippingCost).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 items-start md:items-end">
                    <span className="font-bold uppercase text-sm mb-1">Durum</span>
                    <span className={`px-3 py-1 font-black uppercase text-xs border-2 border-black ${status.color}`}>
                      {status.label}
                    </span>
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="font-black uppercase mb-4">Ürünler</h3>
                  <ul className="flex flex-col gap-2">
                    {order.items.map((item) => (
                      <li key={item.id} className="flex justify-between font-bold border-b-2 border-dashed border-gray-300 pb-2">
                        <span>{item.quantity}x {item.product.name}</span>
                        <span>{(item.unitPrice * item.quantity).toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                      </li>
                    ))}
                    {order.shippingCost === 0 && (
                      <li className="flex justify-between font-bold border-b-2 border-dashed border-gray-300 pb-2">
                        <span>Kargo</span>
                        <span>Ücretsiz</span>
                      </li>
                    )}
                  </ul>
                  
                  <div className="mt-6 flex justify-end">
                    <Link 
                      href="/urunler" 
                      className="bg-black text-white px-6 py-2 font-black uppercase brutal-border hover:bg-white hover:text-black transition-colors"
                    >
                      Tekrar Sipariş Ver
                    </Link>
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
