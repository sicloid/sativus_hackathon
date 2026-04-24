'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';
import { useFavorites } from '@/context/FavoritesContext';
import { useToast } from '@/context/ToastContext';

// Mock product for development
const MOCK_PRODUCT = {
  id: '1',
  name: 'Premium Köpek Maması 15kg',
  description: 'Yetişkin köpekler için somonlu, tahılsız yüksek proteinli premium kuru mama. Tüylerin daha parlak olmasını sağlar, sindirim sistemini destekler. \n\nİçindekiler: Somon %30, Tatlı patates %20, Bezelye, Tavuk yağı.',
  price: 1250,
  image_url: 'https://placehold.co/600x600/fca5a5/000000?text=Kopek+Mamasi',
  category: 'Köpek',
  stock_quantity: 45,
  seller: 'PetVerse Market'
};

const MOCK_REVIEWS = [
  { id: '1', user: 'Ahmet Y.', rating: 5, comment: 'Köpeğim bayılarak yiyor, teşekkürler!' },
  { id: '2', user: 'Zeynep K.', rating: 4, comment: 'Hızlı kargo ama paket biraz ezilmişti.' }
];

export default function UrunDetayPage() {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'qa'>('details');
  const { addToCart } = useCart();
  const { toggleFavorite, isFavorite } = useFavorites();
  const { showToast } = useToast();

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const handleAddToCart = () => {
    addToCart({
      id: MOCK_PRODUCT.id,
      name: MOCK_PRODUCT.name,
      price: MOCK_PRODUCT.price,
      image_url: MOCK_PRODUCT.image_url
    }, quantity);
    showToast(`${quantity} adet ürün sepete eklendi!`);
  };

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: MOCK_PRODUCT.id,
      name: MOCK_PRODUCT.name,
      price: MOCK_PRODUCT.price,
      image_url: MOCK_PRODUCT.image_url,
      description: MOCK_PRODUCT.description,
      category: MOCK_PRODUCT.category,
      stock_quantity: MOCK_PRODUCT.stock_quantity
    });
  };

  return (
    <div className="flex flex-col gap-8">
      {/* Breadcrumb */}
      <div className="font-bold uppercase text-sm">
        <Link href="/urunler" className="hover:underline">Ürünler</Link> &gt; 
        <span className="mx-2">{MOCK_PRODUCT.category}</span> &gt; 
        <span className="mx-2 underline">{MOCK_PRODUCT.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="brutal-border brutal-shadow bg-[var(--brutal-yellow)] aspect-square relative">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${MOCK_PRODUCT.image_url})` }}
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="bg-black text-white self-start px-3 py-1 font-black uppercase text-xs mb-4 brutal-border">
            {MOCK_PRODUCT.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 leading-tight">{MOCK_PRODUCT.name}</h1>
          <p className="text-xl font-bold mb-6">Satıcı: <span className="underline">{MOCK_PRODUCT.seller}</span></p>
          
          <div className="text-4xl sm:text-5xl font-black mb-8">
            {MOCK_PRODUCT.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex brutal-border brutal-shadow w-full sm:w-32 h-12 sm:h-auto">
              <button onClick={decreaseQuantity} className="w-10 flex items-center justify-center font-black text-xl hover:bg-[var(--brutal-red)] transition-colors">-</button>
              <div className="flex-grow flex items-center justify-center font-black text-xl border-l-2 border-r-2 border-black bg-white">{quantity}</div>
              <button onClick={increaseQuantity} className="w-10 flex items-center justify-center font-black text-xl hover:bg-[var(--brutal-green)] transition-colors">+</button>
            </div>
            
            <button onClick={handleAddToCart} className="flex-grow bg-[var(--brutal-green)] brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-lg sm:text-xl py-3 sm:py-0">
              Sepete Ekle
            </button>
            <button onClick={handleToggleFavorite} className={`brutal-border brutal-shadow brutal-shadow-hover px-4 py-3 sm:py-0 flex items-center justify-center transition-colors ${isFavorite(MOCK_PRODUCT.id) ? 'bg-[var(--brutal-red)] text-white' : 'bg-white hover:bg-[var(--brutal-red)] hover:text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite(MOCK_PRODUCT.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 sm:mt-12">
        <div className="flex flex-col sm:flex-row sm:border-b-4 sm:border-black mb-6">
          <button 
            onClick={() => setActiveTab('details')}
            className={`px-4 py-3 sm:px-8 sm:py-4 font-black uppercase text-base sm:text-xl border-4 sm:border-0 sm:border-b-0 border-black mb-2 sm:mb-0 transition-colors ${activeTab === 'details' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
          >
            Açıklama
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`px-4 py-3 sm:px-8 sm:py-4 font-black uppercase text-base sm:text-xl border-4 sm:border-0 sm:border-b-0 sm:border-l-4 border-black mb-2 sm:mb-0 transition-colors ${activeTab === 'reviews' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
          >
            Değerlendirmeler
          </button>
          <button 
            onClick={() => setActiveTab('qa')}
            className={`px-4 py-3 sm:px-8 sm:py-4 font-black uppercase text-base sm:text-xl border-4 sm:border-0 sm:border-b-0 sm:border-l-4 border-black mb-2 sm:mb-0 transition-colors ${activeTab === 'qa' ? 'bg-black text-white' : 'bg-white hover:bg-gray-100'}`}
          >
            Satıcıya Sor
          </button>
        </div>

        <div className="bg-white brutal-border brutal-shadow p-8 min-h-[300px]">
          {activeTab === 'details' && (
            <div className="prose prose-lg max-w-none font-bold">
              <p className="whitespace-pre-line">{MOCK_PRODUCT.description}</p>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="flex flex-col gap-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="font-black text-2xl uppercase">Yorumlar</h3>
                <button className="bg-[var(--brutal-yellow)] brutal-border px-4 py-2 font-black uppercase hover:bg-black hover:text-white transition-colors">
                  Yorum Yaz
                </button>
              </div>
              {MOCK_REVIEWS.map(review => (
                <div key={review.id} className="border-b-2 border-black pb-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-black text-lg">{review.user}</span>
                    <span className="text-[var(--brutal-yellow)] flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <svg key={i} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={i < review.rating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
                        </svg>
                      ))}
                    </span>
                  </div>
                  <p className="font-bold">{review.comment}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="flex flex-col gap-6">
              <h3 className="font-black text-2xl uppercase mb-4">Satıcıya Soru Sor</h3>
              <textarea 
                className="w-full brutal-border p-4 font-bold min-h-[150px] focus:outline-none focus:ring-4 focus:ring-black"
                placeholder="Ürünle ilgili sorunuzu buraya yazın..."
              />
              <button className="bg-[var(--brutal-blue)] brutal-border brutal-shadow brutal-shadow-hover px-8 py-3 font-black uppercase text-xl self-end">
                Gönder
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
