import { getCoupons, seedCoupons } from '@/app/actions/store'
import { Ticket, Scissors, CheckCircle2, AlertCircle } from 'lucide-react'
import CopyCouponButton from '@/components/CopyCouponButton'

export const dynamic = 'force-dynamic'

export default async function KuponlarPage() {
  let coupons = await getCoupons()

  // Eğer hiç kupon yoksa, tohumla ve tekrar çek
  if (coupons.length === 0) {
    await seedCoupons()
    coupons = await getCoupons()
  }

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Kuponlarım</h1>
        <p className="font-bold text-gray-500 uppercase text-sm">Alışverişlerinizde kullanabileceğiniz size özel indirim kuponları.</p>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {coupons.length === 0 ? (
          <div className="bg-white brutal-border p-12 text-center md:col-span-2">
            <Ticket size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-black text-xl uppercase text-gray-400">Şu an aktif kuponunuz bulunmuyor.</p>
          </div>
        ) : (
          coupons.map((coupon) => (
            <div 
              key={coupon.id} 
              className={`relative overflow-hidden brutal-border brutal-shadow p-6 flex flex-col justify-between min-h-[180px] transition-all
                ${coupon.isUsed ? 'bg-gray-100 grayscale' : 'bg-white hover:-translate-y-1'}`}
            >
              {/* Scissors effect for coupon look */}
              <div className="absolute top-0 right-10 bottom-0 border-l-4 border-dashed border-gray-200" />
              
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <div className={`p-1.5 brutal-border ${coupon.isUsed ? 'bg-gray-400' : 'bg-[var(--brutal-yellow)]'}`}>
                      <Ticket size={18} className="text-black" />
                    </div>
                    <span className="font-black uppercase text-sm tracking-widest">{coupon.description}</span>
                  </div>
                  <h3 className="text-3xl font-black uppercase tracking-tighter">%{coupon.discountPercent} İNDİRİM</h3>
                </div>
                
                {coupon.isUsed ? (
                  <div className="bg-black text-white px-3 py-1 brutal-border text-[10px] font-black uppercase flex items-center gap-1">
                    <CheckCircle2 size={12} /> KULLANILDI
                  </div>
                ) : (
                  <div className="bg-[var(--brutal-green)] text-white px-3 py-1 brutal-border text-[10px] font-black uppercase flex items-center gap-1">
                    AKTİF
                  </div>
                )}
              </div>

              <div className="mt-6 flex items-center justify-between gap-4">
                <div className={`flex flex-grow items-center gap-2 bg-gray-50 brutal-border p-1 ${coupon.isUsed ? 'opacity-50' : ''}`}>
                  <div className={`flex-grow text-center font-black text-xl tracking-widest uppercase py-1 ${coupon.isUsed ? 'blur-[2px] select-none' : ''}`}>
                    {coupon.code}
                  </div>
                  {!coupon.isUsed && <CopyCouponButton code={coupon.code} />}
                </div>
                {!coupon.isUsed ? (
                  <div className="text-[10px] font-bold text-gray-400 uppercase leading-tight max-w-[100px]">
                    Ödeme sayfasında kodu uygulayabilirsiniz.
                  </div>
                ) : (
                  <div className="text-[10px] font-bold text-red-500 uppercase leading-tight max-w-[100px]">
                    Bu kupon artık kullanılamaz.
                  </div>
                )}
              </div>

              {coupon.code === 'HOSGELDIN5' && (
                <div className="mt-3 flex items-center gap-1 text-[10px] font-bold text-[var(--brutal-blue)] uppercase italic">
                  <AlertCircle size={10} /> Sadece ilk alışverişe özel
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <div className="bg-[var(--brutal-blue)]/10 brutal-border p-6 border-l-8 border-l-[var(--brutal-blue)]">
        <h4 className="font-black uppercase text-sm mb-2">💡 Nasıl Kullanılır?</h4>
        <p className="font-bold text-xs text-gray-600 leading-relaxed uppercase">
          Beğendiğiniz ürünleri sepetinize ekledikten sonra ödeme sayfasındaki "Kupon Kodu" alanına yukarıdaki kodlardan birini yazıp "Uygula" butonuna basmanız yeterlidir. İndirim anında toplam tutara yansıtılacaktır.
        </p>
      </div>
    </div>
  )
}
