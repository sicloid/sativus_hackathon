'use client';

import { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';
import Link from 'next/link';

export default function OdemeBasariliPage() {
  const { clearCart } = useCart();
  const [orderNumber, setOrderNumber] = useState('');

  useEffect(() => {
    // Generate random order number
    const randomOrderNumber = 'PV-' + Math.floor(100000 + Math.random() * 900000);
    setOrderNumber(randomOrderNumber);
    
    // Clear the cart upon successful order
    clearCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex flex-col items-center justify-center py-20 px-4">
      <div className="bg-[var(--brutal-green)] brutal-border brutal-shadow p-12 max-w-2xl w-full text-center">
        <div className="w-24 h-24 bg-white brutal-border brutal-shadow mx-auto flex items-center justify-center mb-8 rounded-full">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-12 h-12">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
          </svg>
        </div>
        
        <h1 className="text-4xl md:text-5xl font-black uppercase mb-4">Siparişiniz Alındı!</h1>
        <p className="text-xl font-bold mb-8">Teşekkür ederiz. Hayvan dostunuz için siparişiniz başarıyla oluşturuldu.</p>
        
        <div className="bg-white brutal-border p-6 mb-8 inline-block">
          <p className="text-sm uppercase font-black mb-1">Sipariş Numarası</p>
          <p className="text-3xl font-black text-[var(--brutal-blue)]">{orderNumber}</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-4">
          <Link 
            href="/profil/siparisler"
            className="bg-black text-white px-8 py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-xl transition-colors hover:bg-white hover:text-black"
          >
            Siparişlerim
          </Link>
          <Link 
            href="/urunler"
            className="bg-white text-black px-8 py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-xl transition-colors hover:bg-[var(--brutal-yellow)]"
          >
            Alışverişe Dön
          </Link>
        </div>
      </div>
    </div>
  );
}
