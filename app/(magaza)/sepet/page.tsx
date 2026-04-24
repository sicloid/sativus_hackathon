'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import CartItem from '@/components/CartItem';
import Link from 'next/link';

export default function SepetPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [couponError, setCouponError] = useState('');

  const handleApplyCoupon = () => {
    // Mock coupon logic
    if (coupon.toUpperCase() === 'PET10') {
      setDiscount(0.10);
      setCouponError('');
    } else if (coupon.toUpperCase() === 'VERSE20') {
      setDiscount(0.20);
      setCouponError('');
    } else {
      setDiscount(0);
      setCouponError('Geçersiz kupon kodu!');
    }
  };

  const tax = totalPrice * 0.20; // %20 KDV varsayımı
  const discountAmount = totalPrice * discount;
  const finalTotal = totalPrice + tax - discountAmount;

  if (items.length === 0) {
    return (
      <div className="bg-white brutal-border brutal-shadow p-12 text-center">
        <h1 className="text-4xl font-black uppercase mb-6">Sepetiniz Boş</h1>
        <p className="text-xl font-bold mb-8">Hayvan dostunuz için güzel bir şeyler bulmak ister misiniz?</p>
        <Link 
          href="/urunler" 
          className="inline-block bg-[var(--brutal-yellow)] px-8 py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-xl transition-colors hover:bg-black hover:text-white"
        >
          Alışverişe Başla
        </Link>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Sol: Ürün Listesi */}
      <div className="flex-grow">
        <div className="flex justify-between items-end mb-6">
          <h1 className="text-4xl font-black uppercase">Sepetim</h1>
          <button 
            onClick={clearCart}
            className="font-black text-sm uppercase underline hover:text-[var(--brutal-red)]"
          >
            Tümünü Sil
          </button>
        </div>
        
        <div className="flex flex-col gap-4">
          {items.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </div>
      </div>

      {/* Sağ: Sipariş Özeti */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-[var(--brutal-blue)] brutal-border brutal-shadow p-6 sticky top-32">
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
            {discount > 0 && (
              <div className="flex justify-between text-[var(--brutal-yellow)] drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">
                <span>İndirim:</span>
                <span>-{discountAmount.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
              </div>
            )}
          </div>

          <div className="flex justify-between font-black text-3xl mb-8">
            <span>Toplam:</span>
            <span>{finalTotal.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}</span>
          </div>

          <div className="mb-8">
            <label className="block font-black uppercase mb-2 text-sm" htmlFor="coupon">Kampanya Kodu</label>
            <div className="flex">
              <input 
                type="text" 
                id="coupon"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                className="w-full p-2 brutal-border border-r-0 focus:outline-none focus:ring-inset focus:ring-4 focus:ring-black uppercase font-bold text-sm"
                placeholder="KOD GİRİNİZ"
              />
              <button 
                onClick={handleApplyCoupon}
                className="bg-black text-white brutal-border px-4 font-black uppercase text-sm hover:bg-white hover:text-black transition-colors"
              >
                Uygula
              </button>
            </div>
            {couponError && <p className="text-[var(--brutal-red)] font-black text-sm mt-2 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">{couponError}</p>}
            {discount > 0 && <p className="text-[var(--brutal-yellow)] font-black text-sm mt-2 drop-shadow-[1px_1px_0_rgba(0,0,0,1)]">Kupon uygulandı!</p>}
          </div>

          <Link 
            href="/odeme"
            className="block text-center w-full bg-[var(--brutal-green)] py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-xl transition-colors hover:bg-black hover:text-white"
          >
            Ödemeye Geç
          </Link>
        </div>
      </div>
    </div>
  );
}
