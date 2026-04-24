'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { useRouter } from 'next/navigation'
import { createOrder } from '@/app/actions/store'
import Link from 'next/link'

export default function OdemePage() {
  const { items, totalPrice, clearCart } = useCart()
  const router = useRouter()
  
  const [paymentMethod, setPaymentMethod] = useState<'kredi_karti' | 'kapida'>('kredi_karti')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Form states
  const [address, setAddress] = useState({
    fullName: '',
    phone: '',
    fullAddress: '',
    city: ''
  })

  const [card, setCard] = useState({
    number: '',
    name: '',
    expiry: '',
    cvv: ''
  })

  // Sepet boşsa sepete yönlendir
  useEffect(() => {
    if (items.length === 0) {
      router.push('/sepet')
    }
  }, [items, router])

  const tax = totalPrice * 0.20
  const shipping = totalPrice > 500 ? 0 : 50
  const finalTotal = totalPrice + tax + shipping

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError(null)

    const formData = new FormData()
    formData.set('fullName', address.fullName)
    formData.set('phone', address.phone)
    formData.set('address', address.fullAddress)
    formData.set('city', address.city)
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
      // createOrder redirects on success, clear local cart
      clearCart()
    } catch {
      // redirect throws in Next.js, which is expected behavior
      clearCart()
    }
  }

  if (items.length === 0) return null // Yönlendirme bekleniyor

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      <div className="flex-grow">
        <h1 className="text-4xl font-black uppercase mb-8">Ödeme & Teslimat</h1>

        {error && (
          <div className="mb-6 p-4 bg-[var(--brutal-red)] brutal-border font-bold text-white">
            {error}
          </div>
        )}
        
        <form id="checkout-form" onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* Adres Bilgileri */}
          <section className="bg-white brutal-border brutal-shadow p-6">
            <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Teslimat Adresi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-black uppercase mb-2 text-sm">Ad Soyad</label>
                <input required type="text" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={address.fullName} onChange={e => setAddress({...address, fullName: e.target.value})} />
              </div>
              <div>
                <label className="block font-black uppercase mb-2 text-sm">Telefon</label>
                <input required type="tel" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={address.phone} onChange={e => setAddress({...address, phone: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block font-black uppercase mb-2 text-sm">Açık Adres</label>
                <textarea required className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold min-h-[100px]" value={address.fullAddress} onChange={e => setAddress({...address, fullAddress: e.target.value})} />
              </div>
              <div className="md:col-span-2">
                <label className="block font-black uppercase mb-2 text-sm">İl / İlçe</label>
                <input required type="text" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} />
              </div>
            </div>
          </section>

          {/* Ödeme Yöntemi */}
          <section className="bg-white brutal-border brutal-shadow p-6">
            <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Ödeme Yöntemi</h2>
            
            <div className="flex gap-4 mb-6">
              <label className={`flex-1 p-4 brutal-border cursor-pointer transition-colors ${paymentMethod === 'kredi_karti' ? 'bg-[var(--brutal-yellow)] brutal-shadow' : 'bg-white hover:bg-gray-100'}`}>
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'kredi_karti'} onChange={() => setPaymentMethod('kredi_karti')} />
                <span className="font-black uppercase block text-center">Kredi / Banka Kartı</span>
              </label>
              <label className={`flex-1 p-4 brutal-border cursor-pointer transition-colors ${paymentMethod === 'kapida' ? 'bg-[var(--brutal-blue)] brutal-shadow' : 'bg-white hover:bg-gray-100'}`}>
                <input type="radio" name="payment" className="hidden" checked={paymentMethod === 'kapida'} onChange={() => setPaymentMethod('kapida')} />
                <span className="font-black uppercase block text-center">Kapıda Ödeme</span>
              </label>
            </div>

            {paymentMethod === 'kredi_karti' && (
              <div className="bg-[#f8f8f8] border-2 border-black p-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="md:col-span-2">
                  <label className="block font-black uppercase mb-2 text-sm">Kart Üzerindeki İsim</label>
                  <input required={paymentMethod === 'kredi_karti'} type="text" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={card.name} onChange={e => setCard({...card, name: e.target.value})} />
                </div>
                <div className="md:col-span-2">
                  <label className="block font-black uppercase mb-2 text-sm">Kart Numarası</label>
                  <input required={paymentMethod === 'kredi_karti'} type="text" maxLength={16} placeholder="0000 0000 0000 0000" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold text-lg tracking-widest" value={card.number} onChange={e => setCard({...card, number: e.target.value})} />
                </div>
                <div>
                  <label className="block font-black uppercase mb-2 text-sm">Son Kullanma (AA/YY)</label>
                  <input required={paymentMethod === 'kredi_karti'} type="text" placeholder="MM/YY" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={card.expiry} onChange={e => setCard({...card, expiry: e.target.value})} />
                </div>
                <div>
                  <label className="block font-black uppercase mb-2 text-sm">CVV</label>
                  <input required={paymentMethod === 'kredi_karti'} type="text" maxLength={3} placeholder="123" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" value={card.cvv} onChange={e => setCard({...card, cvv: e.target.value})} />
                </div>
              </div>
            )}
            
            {paymentMethod === 'kapida' && (
              <div className="bg-[var(--brutal-blue)] text-white brutal-border p-4 font-bold">
                Kapıda nakit veya kredi kartı ile ödeme yapabilirsiniz. Teslimat sırasında kuryeye ödeme yapılacaktır.
              </div>
            )}
          </section>

        </form>
      </div>

      {/* Sağ: Sipariş Özeti */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-6 sticky top-32">
          <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-4">Sipariş Özeti</h2>
          
          <div className="flex flex-col gap-4 font-bold text-lg mb-6 border-b-4 border-black pb-4">
            <div className="flex justify-between">
              <span>Ara Toplam:</span>
              <span>{totalPrice.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
            </div>
            <div className="flex justify-between">
              <span>KDV (%20):</span>
              <span>{tax.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
            </div>
            <div className="flex justify-between">
              <span>Kargo:</span>
              {shipping === 0 ? (
                <span className="text-[var(--brutal-green)] drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">Bedava</span>
              ) : (
                <span>{shipping.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              )}
            </div>
          </div>

          <div className="flex justify-between font-black text-3xl mb-8">
            <span>Toplam:</span>
            <span>{finalTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
          </div>

          <button 
            type="submit"
            form="checkout-form"
            disabled={isSubmitting}
            className="w-full bg-black text-white py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-xl transition-colors disabled:opacity-70"
          >
            {isSubmitting ? 'Sipariş Oluşturuluyor...' : 'Siparişi Tamamla'}
          </button>
          
          <Link href="/sepet" className="block text-center mt-4 font-bold underline hover:text-[var(--brutal-red)]">
            Sepete Dön
          </Link>
        </div>
      </div>
    </div>
  )
}
