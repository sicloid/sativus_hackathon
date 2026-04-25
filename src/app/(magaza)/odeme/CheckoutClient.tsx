'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { createOrder, validateCoupon } from '@/app/actions/store'
import { useToast } from '@/context/ToastContext'
import SuccessModal from '@/components/SuccessModal'
import Link from 'next/link'
import { Ticket, X, Check } from 'lucide-react'

interface SavedAddress {
  id: string
  title: string
  fullName: string
  phone: string
  fullAddress: string
  city: string
}

interface CheckoutClientProps {
  savedAddresses: SavedAddress[]
  isLoggedIn: boolean
  availableCoupons?: any[]
}

export default function CheckoutClient({ savedAddresses, isLoggedIn, availableCoupons = [] }: CheckoutClientProps) {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  const { showToast } = useToast()

  // Success State
  const [showSuccess, setShowSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string>('')

  // Coupon State
  const [couponCode, setCouponCode] = useState('')
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null)
  const [isValidating, setIsValidating] = useState(false)

  // ─── Giriş yapmamış → /login'e yönlendir ────────────────────────────────────
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/odeme')
    }
  }, [isLoggedIn, router])

  // ─── Sepet boşsa → sepete yönlendir ─────────────────────────────────────────
  useEffect(() => {
    if (items.length === 0 && !showSuccess) {
      router.push('/sepet')
    }
  }, [items, router, showSuccess])

  // Hesaplamalar
  const discountAmount = appliedCoupon ? (totalPrice * appliedCoupon.discountPercent) / 100 : 0
  const discountedSubtotal = totalPrice - discountAmount
  const tax = discountedSubtotal * 0.20
  const shipping = discountedSubtotal > 500 ? 0 : 50
  const finalTotal = discountedSubtotal + tax + shipping

  // ─── Adres seçim modu ─────────────────────────────────────────────────────────
  const [addressMode, setAddressMode] = useState<'saved' | 'new'>(
    savedAddresses.length > 0 ? 'saved' : 'new'
  )
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    savedAddresses[0]?.id ?? ''
  )

  const [newAddress, setNewAddress] = useState({
    fullName: '', phone: '', fullAddress: '', city: ''
  })

  const [paymentMethod, setPaymentMethod] = useState<'kredi_karti' | 'kapida'>('kredi_karti')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isLoggedIn || (items.length === 0 && !showSuccess)) return null

  const handleApplyCoupon = async () => {
    const cleanCode = couponCode.trim()
    if (!cleanCode) return
    setIsValidating(true)
    const result = await validateCoupon(cleanCode)
    setIsValidating(false)

    if (result.error) {
      showToast(result.error)
      setAppliedCoupon(null)
    } else {
      showToast(`Kupon Uygulandı: %${result.coupon?.discountPercent} İndirim!`)
      setAppliedCoupon(result.coupon!)
    }
  }

  const removeCoupon = () => {
    setAppliedCoupon(null)
    setCouponCode('')
    showToast('Kupon kaldırıldı.')
  }

  const selectedSavedAddr = savedAddresses.find(a => a.id === selectedAddressId)

  const getDeliveryAddress = () => {
    if (addressMode === 'saved' && selectedSavedAddr) {
      return {
        fullName: selectedSavedAddr.fullName,
        phone: selectedSavedAddr.phone,
        address: selectedSavedAddr.fullAddress,
        city: selectedSavedAddr.city,
      }
    }
    return {
      fullName: newAddress.fullName,
      phone: newAddress.phone,
      address: newAddress.fullAddress,
      city: newAddress.city,
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const delivery = getDeliveryAddress()

    if (!delivery.fullName || !delivery.phone || !delivery.address || !delivery.city) {
      setError('Lütfen teslimat adresini eksiksiz doldurun.')
      setIsSubmitting(false)
      return
    }

    const formData = new FormData()
    formData.set('fullName', delivery.fullName)
    formData.set('phone', delivery.phone)
    formData.set('address', delivery.address)
    formData.set('city', delivery.city)
    formData.set('couponId', appliedCoupon?.id || '')
    formData.set('cartItems', JSON.stringify(
      items.map(item => ({
        productId: item.productId,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
      }))
    ))

    try {
      const result = await createOrder(formData)
      if (result?.error) {
        setError(result.error)
        setIsSubmitting(false)
        return
      }

      if (result?.success) {
        setOrderId(result.orderId)
        showToast('Siparişiniz başarıyla oluşturuldu!')
        clearCart()
        setShowSuccess(true)
      }
    } catch (err) {
      console.error('Checkout error:', err)
      setError('Sipariş oluşturulurken bir hata oluştu.')
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <SuccessModal 
        isOpen={showSuccess} 
        onClose={() => router.push('/urunler')} 
        orderId={orderId}
      />

      <div className="flex flex-col lg:flex-row gap-8">
        {/* ── Sol: Form ── */}
        <div className="flex-grow">
          <h1 className="text-4xl font-black uppercase mb-8">Ödeme &amp; Teslimat</h1>

          {error && (
            <div className="mb-6 p-4 bg-[var(--brutal-red)] brutal-border font-bold">
              ❌ {error}
            </div>
          )}

          <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
            <section className="bg-white brutal-border brutal-shadow p-6">
              <h2 className="text-2xl font-black uppercase mb-5 border-b-4 border-black pb-2">Teslimat Adresi</h2>
              {savedAddresses.length > 0 && (
                <div className="flex gap-3 mb-5">
                  <button type="button" onClick={() => setAddressMode('saved')} className={`flex-1 py-2.5 font-black text-sm uppercase brutal-border transition-colors ${addressMode === 'saved' ? 'bg-black text-white' : 'bg-[#f8f8f8] hover:bg-gray-200'}`}>📌 Kayıtlı Adreslerim</button>
                  <button type="button" onClick={() => setAddressMode('new')} className={`flex-1 py-2.5 font-black text-sm uppercase brutal-border transition-colors ${addressMode === 'new' ? 'bg-black text-white' : 'bg-[#f8f8f8] hover:bg-gray-200'}`}>➕ Yeni Adres</button>
                </div>
              )}
              {addressMode === 'saved' && savedAddresses.length > 0 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {savedAddresses.map((addr) => (
                    <label key={addr.id} className={`p-4 brutal-border cursor-pointer transition-all select-none ${selectedAddressId === addr.id ? 'bg-[var(--brutal-yellow)] brutal-shadow border-4' : 'bg-[#f8f8f8] hover:bg-yellow-50'}`}>
                      <input type="radio" name="savedAddress" value={addr.id} className="hidden" checked={selectedAddressId === addr.id} onChange={() => setSelectedAddressId(addr.id)} />
                      <div className="flex items-start gap-2">
                        <span className="text-lg">{selectedAddressId === addr.id ? '🔵' : '⚪'}</span>
                        <div>
                          <p className="font-black text-sm uppercase tracking-wider">{addr.title}</p>
                          <p className="font-bold text-sm mt-1">{addr.fullName}</p>
                          <p className="text-xs font-bold text-gray-500 mt-0.5">{addr.phone}</p>
                        </div>
                      </div>
                    </label>
                  ))}
                </div>
              )}
              {addressMode === 'new' && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Ad Soyad *" className="w-full p-3 brutal-border bg-[#f8f8f8] font-bold" value={newAddress.fullName} onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })} />
                  <input required placeholder="Telefon *" className="w-full p-3 brutal-border bg-[#f8f8f8] font-bold" value={newAddress.phone} onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })} />
                  <textarea required placeholder="Açık Adres *" className="md:col-span-2 w-full p-3 brutal-border bg-[#f8f8f8] font-bold resize-none" rows={3} value={newAddress.fullAddress} onChange={e => setNewAddress({ ...newAddress, fullAddress: e.target.value })} />
                  <input required placeholder="İlçe / İl *" className="md:col-span-2 w-full p-3 brutal-border bg-[#f8f8f8] font-bold" value={newAddress.city} onChange={e => setNewAddress({ ...newAddress, city: e.target.value })} />
                </div>
              )}
            </section>

            <section className="bg-white brutal-border brutal-shadow p-6">
              <h2 className="text-2xl font-black uppercase mb-5 border-b-4 border-black pb-2">Ödeme Yöntemi</h2>
              <div className="flex gap-4 mb-5">
                <label className={`flex-1 p-4 brutal-border cursor-pointer transition-colors text-center font-black uppercase ${paymentMethod === 'kredi_karti' ? 'bg-[var(--brutal-yellow)] brutal-shadow' : 'bg-white hover:bg-gray-100'}`}>
                  <input type="radio" className="hidden" checked={paymentMethod === 'kredi_karti'} onChange={() => setPaymentMethod('kredi_karti')} /> 💳 Kart
                </label>
                <label className={`flex-1 p-4 brutal-border cursor-pointer transition-colors text-center font-black uppercase ${paymentMethod === 'kapida' ? 'bg-[var(--brutal-blue)] brutal-shadow' : 'bg-white hover:bg-gray-100'}`}>
                  <input type="radio" className="hidden" checked={paymentMethod === 'kapida'} onChange={() => setPaymentMethod('kapida')} /> 🚚 Kapıda
                </label>
              </div>
              {paymentMethod === 'kredi_karti' && (
                <div className="bg-[#f8f8f8] brutal-border p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input required placeholder="Kart İsim" className="md:col-span-2 w-full p-3 brutal-border font-bold" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                  <input required placeholder="Kart No" className="md:col-span-2 w-full p-3 brutal-border font-bold" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                  <input required placeholder="AA/YY" className="w-full p-3 brutal-border font-bold" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} />
                  <input required placeholder="CVV" className="w-full p-3 brutal-border font-bold" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                </div>
              )}
            </section>
          </form>
        </div>

        {/* ── Sağ: Sipariş Özeti ── */}
        <div className="w-full lg:w-96 flex-shrink-0">
          <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-6 sticky top-32 flex flex-col gap-4">
            <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-4">Sipariş Özeti</h2>

            <div className="flex flex-col gap-2 border-b-2 border-black pb-4">
              {items.map(item => (
                <div key={item.productId} className="flex justify-between text-sm font-bold">
                  <span className="truncate flex-1 pr-2">{item.quantity}× {item.name}</span>
                  <span>₺{(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}
            </div>

            {/* Kupon Alanı */}
            <div className="border-b-2 border-black pb-4">
              <label className="block font-black uppercase text-[10px] mb-1">İndirim Kuponu</label>
              {appliedCoupon ? (
                <div className="bg-white brutal-border p-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Check className="text-[var(--brutal-green)]" size={16} />
                    <span className="font-black text-sm uppercase tracking-tighter">{appliedCoupon.code} (%{appliedCoupon.discountPercent})</span>
                  </div>
                  <button onClick={removeCoupon} type="button" className="text-red-500 hover:text-black transition-colors"><X size={16} /></button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                      placeholder="KOD GİRİN"
                      className="flex-1 brutal-border px-3 py-2 text-xs font-black uppercase focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={handleApplyCoupon}
                      disabled={isValidating || !couponCode}
                      className="bg-black text-white px-3 py-2 brutal-border font-black text-xs uppercase hover:bg-white hover:text-black transition-all disabled:opacity-50"
                    >
                      {isValidating ? '...' : 'UYGULA'}
                    </button>
                  </div>
                  {availableCoupons.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                      {availableCoupons.map((c) => (
                        <button
                          key={c.id}
                          type="button"
                          onClick={async () => {
                            setCouponCode(c.code)
                            setIsValidating(true)
                            const result = await validateCoupon(c.code)
                            setIsValidating(false)
                            if (result.error) {
                              showToast(result.error)
                              setAppliedCoupon(null)
                            } else {
                              showToast(`Kupon Uygulandı: %${result.coupon?.discountPercent} İndirim!`)
                              setAppliedCoupon(result.coupon!)
                            }
                          }}
                          className="px-2 py-1 bg-gray-100 hover:bg-[var(--brutal-yellow)] text-[10px] font-black uppercase brutal-border transition-colors border-2"
                        >
                          {c.code} (%{c.discountPercent})
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex flex-col gap-2 font-bold border-b-4 border-black pb-4">
              <div className="flex justify-between">
                <span>Ara Toplam</span>
                <span>₺{totalPrice.toFixed(2)}</span>
              </div>
              {appliedCoupon && (
                <div className="flex justify-between text-[var(--brutal-red)]">
                  <span>Kupon İndirimi</span>
                  <span>-₺{discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>KDV (%20)</span>
                <span>₺{tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Kargo</span>
                {shipping === 0 ? <span className="font-black text-green-700">🎉 Bedava</span> : <span>₺{shipping.toFixed(2)}</span>}
              </div>
            </div>

            <div className="flex justify-between font-black text-2xl">
              <span>Toplam</span>
              <div className="flex flex-col items-end">
                <span>₺{finalTotal.toFixed(2)}</span>
                {appliedCoupon && <span className="text-[10px] uppercase bg-black text-white px-2 py-0.5 mt-1">İndirim Uygulandı</span>}
              </div>
            </div>

            <button type="submit" form="checkout-form" disabled={isSubmitting} className="w-full bg-black text-[var(--brutal-yellow)] py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-lg hover:bg-white hover:text-black disabled:opacity-70 transition-all">
              {isSubmitting ? '⏳ Oluşturuluyor...' : '✅ Siparişi Tamamla'}
            </button>

            <Link href="/sepet" className="block text-center font-bold underline hover:text-[var(--brutal-red)] text-sm">← Sepete Dön</Link>
          </div>
        </div>
      </div>
    </>
  )
}
