'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/app/actions/store'
import Link from 'next/link'

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
}

export default function CheckoutClient({ savedAddresses, isLoggedIn }: CheckoutClientProps) {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()

  // ─── Giriş yapmamış → /login'e yönlendir ────────────────────────────────────
  useEffect(() => {
    if (!isLoggedIn) {
      router.push('/login?redirect=/odeme')
    }
  }, [isLoggedIn, router])

  // ─── Sepet boşsa → sepete yönlendir ─────────────────────────────────────────
  useEffect(() => {
    if (items.length === 0) {
      router.push('/sepet')
    }
  }, [items, router])

  const tax = totalPrice * 0.20
  const shipping = totalPrice > 500 ? 0 : 50
  const finalTotal = totalPrice + tax + shipping

  // ─── Adres seçim modu ─────────────────────────────────────────────────────────
  // 'saved' → kayıtlı adres seçildi, 'new' → yeni adres giriliyor
  const [addressMode, setAddressMode] = useState<'saved' | 'new'>(
    savedAddresses.length > 0 ? 'saved' : 'new'
  )
  const [selectedAddressId, setSelectedAddressId] = useState<string>(
    savedAddresses[0]?.id ?? ''
  )

  // Yeni adres form alanları
  const [newAddress, setNewAddress] = useState({
    fullName: '', phone: '', fullAddress: '', city: ''
  })

  const [paymentMethod, setPaymentMethod] = useState<'kredi_karti' | 'kapida'>('kredi_karti')
  const [card, setCard] = useState({ number: '', name: '', expiry: '', cvv: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!isLoggedIn || items.length === 0) return null

  // Seçili adresi bul (saved modda)
  const selectedSavedAddr = savedAddresses.find(a => a.id === selectedAddressId)

  // Forma gönderilecek adres verisini hazırla
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
      clearCart()
    } catch {
      // redirect() Next.js'de exception fırlatır — bu beklenen davranış
      clearCart()
    }
  }

  return (
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

          {/* ── Teslimat Adresi ── */}
          <section className="bg-white brutal-border brutal-shadow p-6">
            <h2 className="text-2xl font-black uppercase mb-5 border-b-4 border-black pb-2">
              Teslimat Adresi
            </h2>

            {/* Kayıtlı adres varsa sekme seçici */}
            {savedAddresses.length > 0 && (
              <div className="flex gap-3 mb-5">
                <button
                  type="button"
                  onClick={() => setAddressMode('saved')}
                  className={`flex-1 py-2.5 font-black text-sm uppercase brutal-border transition-colors
                    ${addressMode === 'saved' ? 'bg-black text-white' : 'bg-[#f8f8f8] hover:bg-gray-200'}`}
                >
                  📌 Kayıtlı Adreslerim
                </button>
                <button
                  type="button"
                  onClick={() => setAddressMode('new')}
                  className={`flex-1 py-2.5 font-black text-sm uppercase brutal-border transition-colors
                    ${addressMode === 'new' ? 'bg-black text-white' : 'bg-[#f8f8f8] hover:bg-gray-200'}`}
                >
                  ➕ Yeni Adres
                </button>
              </div>
            )}

            {/* Kayıtlı Adres Listesi */}
            {addressMode === 'saved' && savedAddresses.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {savedAddresses.map((addr) => (
                  <label
                    key={addr.id}
                    className={`p-4 brutal-border cursor-pointer transition-all select-none
                      ${selectedAddressId === addr.id
                        ? 'bg-[var(--brutal-yellow)] brutal-shadow border-4'
                        : 'bg-[#f8f8f8] hover:bg-yellow-50'
                      }`}
                  >
                    <input
                      type="radio"
                      name="savedAddress"
                      value={addr.id}
                      className="hidden"
                      checked={selectedAddressId === addr.id}
                      onChange={() => setSelectedAddressId(addr.id)}
                    />
                    <div className="flex items-start gap-2">
                      <span className="text-lg">{selectedAddressId === addr.id ? '🔵' : '⚪'}</span>
                      <div>
                        <p className="font-black text-sm uppercase tracking-wider">{addr.title}</p>
                        <p className="font-bold text-sm mt-1">{addr.fullName}</p>
                        <p className="text-xs font-bold text-gray-500 mt-0.5">{addr.phone}</p>
                        <p className="text-xs font-bold text-gray-500">{addr.fullAddress}</p>
                        <p className="text-xs font-bold text-gray-500">{addr.city}</p>
                      </div>
                    </div>
                  </label>
                ))}
                <Link
                  href="/profil/adreslerim"
                  className="p-4 brutal-border bg-white hover:bg-gray-50 transition-colors flex items-center justify-center gap-2 font-black text-sm uppercase text-gray-500 hover:text-black"
                  target="_blank"
                >
                  ⚙️ Adres Yönet
                </Link>
              </div>
            )}

            {/* Yeni Adres Formu */}
            {addressMode === 'new' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block font-black uppercase mb-2 text-xs tracking-widest">Ad Soyad *</label>
                  <input
                    required={addressMode === 'new'}
                    type="text"
                    className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
                    value={newAddress.fullName}
                    onChange={e => setNewAddress({ ...newAddress, fullName: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block font-black uppercase mb-2 text-xs tracking-widest">Telefon *</label>
                  <input
                    required={addressMode === 'new'}
                    type="tel"
                    placeholder="0555 123 45 67"
                    className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
                    value={newAddress.phone}
                    onChange={e => setNewAddress({ ...newAddress, phone: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-black uppercase mb-2 text-xs tracking-widest">Açık Adres *</label>
                  <textarea
                    required={addressMode === 'new'}
                    rows={3}
                    placeholder="Mahalle, cadde, sokak, kapı no, daire..."
                    className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors resize-none"
                    value={newAddress.fullAddress}
                    onChange={e => setNewAddress({ ...newAddress, fullAddress: e.target.value })}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-black uppercase mb-2 text-xs tracking-widest">İlçe / İl *</label>
                  <input
                    required={addressMode === 'new'}
                    type="text"
                    placeholder="Kadıköy / İstanbul"
                    className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
                    value={newAddress.city}
                    onChange={e => setNewAddress({ ...newAddress, city: e.target.value })}
                  />
                </div>
              </div>
            )}
          </section>

          {/* ── Ödeme Yöntemi ── */}
          <section className="bg-white brutal-border brutal-shadow p-6">
            <h2 className="text-2xl font-black uppercase mb-5 border-b-4 border-black pb-2">
              Ödeme Yöntemi
            </h2>

            <div className="flex gap-4 mb-5">
              <label className={`flex-1 p-4 brutal-border cursor-pointer transition-colors text-center font-black uppercase
                ${paymentMethod === 'kredi_karti' ? 'bg-[var(--brutal-yellow)] brutal-shadow' : 'bg-white hover:bg-gray-100'}`}>
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'kredi_karti'} onChange={() => setPaymentMethod('kredi_karti')} />
                💳 Kredi / Banka Kartı
              </label>
              <label className={`flex-1 p-4 brutal-border cursor-pointer transition-colors text-center font-black uppercase
                ${paymentMethod === 'kapida' ? 'bg-[var(--brutal-blue)] brutal-shadow' : 'bg-white hover:bg-gray-100'}`}>
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'kapida'} onChange={() => setPaymentMethod('kapida')} />
                🚪 Kapıda Ödeme
              </label>
            </div>

            {paymentMethod === 'kredi_karti' && (
              <div className="bg-[#f8f8f8] brutal-border p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-black uppercase mb-2 text-xs tracking-widest">Kart Üzerindeki İsim</label>
                  <input required type="text" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={card.name} onChange={e => setCard({ ...card, name: e.target.value })} />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-black uppercase mb-2 text-xs tracking-widest">Kart Numarası</label>
                  <input required type="text" maxLength={16} placeholder="0000 0000 0000 0000" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold text-lg tracking-widest" value={card.number} onChange={e => setCard({ ...card, number: e.target.value })} />
                </div>
                <div>
                  <label className="block font-black uppercase mb-2 text-xs tracking-widest">Son Kullanma (AA/YY)</label>
                  <input required type="text" placeholder="MM/YY" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={card.expiry} onChange={e => setCard({ ...card, expiry: e.target.value })} />
                </div>
                <div>
                  <label className="block font-black uppercase mb-2 text-xs tracking-widest">CVV</label>
                  <input required type="text" maxLength={3} placeholder="123" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={card.cvv} onChange={e => setCard({ ...card, cvv: e.target.value })} />
                </div>
              </div>
            )}

            {paymentMethod === 'kapida' && (
              <div className="bg-[var(--brutal-blue)] brutal-border p-4 font-bold">
                🚚 Teslimat sırasında kuryeye nakit veya kart ile ödeme yapabilirsiniz.
              </div>
            )}
          </section>

          {/* ── Sepet Özeti (mobil için) ── */}
          <section className="bg-white brutal-border brutal-shadow p-5 lg:hidden">
            <h2 className="text-lg font-black uppercase mb-3 border-b-2 border-black pb-2">Sepetim</h2>
            <ul className="flex flex-col gap-2 mb-4">
              {items.map(item => (
                <li key={item.productId} className="flex justify-between text-sm font-bold">
                  <span>{item.quantity}× {item.name}</span>
                  <span>₺{(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          </section>

        </form>
      </div>

      {/* ── Sağ: Sipariş Özeti ── */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-6 sticky top-32 flex flex-col gap-4">
          <h2 className="text-2xl font-black uppercase border-b-4 border-black pb-4">Sipariş Özeti</h2>

          {/* Ürün Listesi */}
          <div className="flex flex-col gap-2 border-b-2 border-black pb-4">
            {items.map(item => (
              <div key={item.productId} className="flex justify-between text-sm font-bold">
                <span className="truncate flex-1 pr-2">{item.quantity}× {item.name}</span>
                <span className="flex-shrink-0">₺{(item.price * item.quantity).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* Fiyat Dökümü */}
          <div className="flex flex-col gap-2 font-bold border-b-4 border-black pb-4">
            <div className="flex justify-between">
              <span>Ara Toplam</span>
              <span>₺{totalPrice.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>KDV (%20)</span>
              <span>₺{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo</span>
              {shipping === 0 ? (
                <span className="font-black text-green-700">🎉 Bedava</span>
              ) : (
                <span>₺{shipping.toFixed(2)}</span>
              )}
            </div>
            {shipping === 0 && (
              <p className="text-xs text-green-800 font-bold bg-green-100 px-2 py-1 brutal-border border-green-700">
                ✅ ₺500 üzeri alışverişte kargo bedava!
              </p>
            )}
          </div>

          <div className="flex justify-between font-black text-2xl">
            <span>Toplam</span>
            <span>₺{finalTotal.toFixed(2)}</span>
          </div>

          <button
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full bg-black text-[var(--brutal-yellow)] py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-lg transition-colors hover:bg-white hover:text-black disabled:opacity-70"
          >
            {isSubmitting ? '⏳ Sipariş Oluşturuluyor...' : '✅ Siparişi Tamamla'}
          </button>

          <Link href="/sepet" className="block text-center font-bold underline hover:text-[var(--brutal-red)] text-sm">
            ← Sepete Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
