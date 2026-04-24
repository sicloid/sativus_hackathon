import Link from 'next/link';

export default function SiparislerPage() {
  // Mock data
  const orders = [
    {
      id: 'PV-847392',
      date: '10 Nisan 2026',
      total: 1850,
      status: 'Teslim Edildi',
      statusColor: 'bg-[var(--brutal-green)]',
      items: [
        { name: 'Premium Köpek Maması 15kg', quantity: 1, price: 1250 },
        { name: 'Köpek Gezdirme Tasması 5m', quantity: 1, price: 220 },
        { name: 'Kargo', quantity: 1, price: 0 }
      ]
    },
    {
      id: 'PV-293847',
      date: '28 Mart 2026',
      total: 450,
      status: 'Kargoya Verildi',
      statusColor: 'bg-[var(--brutal-yellow)]',
      items: [
        { name: 'Kuş Kafesi Tam Takım', quantity: 1, price: 450 },
        { name: 'Kargo', quantity: 1, price: 0 }
      ]
    },
    {
      id: 'PV-102938',
      date: '15 Mart 2026',
      total: 290,
      status: 'Hazırlanıyor',
      statusColor: 'bg-[var(--brutal-blue)]',
      items: [
        { name: 'Kedi Tırmalama Tahtası', quantity: 1, price: 290 },
        { name: 'Kargo', quantity: 1, price: 50 }
      ]
    }
  ];

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-black uppercase mb-4">Siparişlerim</h1>
      
      <div className="flex flex-col gap-6">
        {orders.map((order) => (
          <div key={order.id} className="bg-white brutal-border brutal-shadow p-0 flex flex-col">
            <div className="flex flex-col md:flex-row justify-between border-b-4 border-black p-4 bg-[#f8f8f8]">
              <div className="flex flex-col gap-1 mb-4 md:mb-0">
                <span className="font-bold uppercase text-sm">Sipariş Numarası</span>
                <span className="text-xl font-black">{order.id}</span>
              </div>
              <div className="flex flex-col gap-1 mb-4 md:mb-0">
                <span className="font-bold uppercase text-sm">Tarih</span>
                <span className="text-lg font-black">{order.date}</span>
              </div>
              <div className="flex flex-col gap-1 mb-4 md:mb-0">
                <span className="font-bold uppercase text-sm">Tutar</span>
                <span className="text-lg font-black">{order.total.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
              <div className="flex flex-col gap-1 items-start md:items-end">
                <span className="font-bold uppercase text-sm mb-1">Durum</span>
                <span className={`px-3 py-1 font-black uppercase text-xs border-2 border-black ${order.statusColor}`}>
                  {order.status}
                </span>
              </div>
            </div>
            
            <div className="p-6">
              <h3 className="font-black uppercase mb-4">Ürünler</h3>
              <ul className="flex flex-col gap-2">
                {order.items.map((item, index) => (
                  <li key={index} className="flex justify-between font-bold border-b-2 border-dashed border-gray-300 pb-2">
                    <span>{item.quantity}x {item.name}</span>
                    <span>{item.price === 0 ? 'Ücretsiz' : item.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
                  </li>
                ))}
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
        ))}
      </div>
    </div>
  );
}
