'use client';

import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { useFavorites } from '@/context/FavoritesContext';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';

export default function FavorilerPage() {
  const { favorites, toggleFavorite, isFavorite, clearFavorites } = useFavorites();
  const { addToCart } = useCart();
  const { showToast } = useToast();

  const handleAddToCart = (productId: string) => {
    const product = favorites.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url
      });
      showToast('Ürün sepete eklendi!');
    }
  };

  const handleToggleFavorite = (product: any) => {
    toggleFavorite(product);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center mb-8 bg-[var(--brutal-red)] brutal-border brutal-shadow p-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black uppercase text-white mb-4 sm:mb-0">Favorilerim</h1>
        <div className="text-xl font-bold bg-white text-black brutal-border px-4 py-2">
          {favorites.length} Ürün
        </div>
      </div>

      {favorites.length > 0 && (
        <div className="mb-8 flex justify-end">
          <button 
            onClick={() => {
              clearFavorites();
              showToast('Tüm favoriler temizlendi!');
            }}
            className="brutal-border brutal-shadow brutal-shadow-hover bg-white px-6 py-2 font-black uppercase hover:bg-gray-100"
          >
            Tümünü Temizle
          </button>
        </div>
      )}

      {favorites.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
          {favorites.map(product => (
            <ProductCard 
              key={product.id} 
              product={product} 
              onAddToCart={handleAddToCart}
              onToggleFavorite={() => handleToggleFavorite(product)}
              isFavorite={isFavorite(product.id)}
            />
          ))}
        </div>
      ) : (
        <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-6 sm:p-12 text-center flex flex-col items-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-24 h-24 mb-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
          </svg>
          <h2 className="text-3xl font-black uppercase mb-4">Favori Ürününüz Bulunmuyor</h2>
          <p className="text-xl font-bold mb-8">Hemen mağazayı keşfedin ve beğendiğiniz ürünleri favorilerinize ekleyin!</p>
          <Link 
            href="/urunler" 
            className="brutal-border brutal-shadow brutal-shadow-hover bg-white px-8 py-4 font-black uppercase text-xl inline-block"
          >
            Alışverişe Başla
          </Link>
        </div>
      )}
    </div>
  );
}
