import Link from 'next/link';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  category: string;
  stock_quantity: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (productId: string) => void;
  onToggleFavorite?: (productId: string) => void;
  isFavorite?: boolean;
}

import { useState } from 'react';

export default function ProductCard({ product, onAddToCart, onToggleFavorite, isFavorite = false }: ProductCardProps) {
  const [isAdding, setIsAdding] = useState(false);

  const handleAdd = () => {
    if (onAddToCart) {
      setIsAdding(true);
      onAddToCart(product.id);
      setTimeout(() => setIsAdding(false), 1500);
    }
  };

  return (
    <div className="brutal-border brutal-shadow brutal-shadow-hover bg-white flex flex-col h-full overflow-hidden">
      <Link href={`/urunler/${product.id}`} className="block relative aspect-square border-b-2 border-black bg-[var(--brutal-yellow)] group cursor-pointer">
        {product.image_url && (
          // eslint-disable-next-line @next/next/no-img-element
          <img 
            src={product.image_url}
            alt={product.name}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}
        <div className="absolute top-2 left-2 bg-white brutal-border px-1 sm:px-2 py-0.5 sm:py-1 text-[10px] sm:text-xs font-black uppercase">
          {product.category}
        </div>
      </Link>
      
      <div className="p-2 sm:p-4 flex flex-col flex-grow">
        <Link href={`/urunler/${product.id}`} className="hover:underline">
          <h3 className="font-black text-sm sm:text-lg leading-tight mb-1 sm:mb-2 uppercase line-clamp-2">{product.name}</h3>
        </Link>
        <p className="text-xs sm:text-sm mb-2 sm:mb-4 line-clamp-2 flex-grow">{product.description}</p>
        
        <div className="mt-auto">
          <div className="font-black text-lg sm:text-2xl mb-2 sm:mb-4">
            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </div>
          
          <div className="flex flex-col sm:flex-row gap-1 sm:gap-2">
            <button 
              onClick={handleAdd}
              disabled={isAdding}
              className={`brutal-border brutal-shadow brutal-shadow-hover flex-grow py-1.5 sm:py-2 font-black uppercase text-xs sm:text-sm transition-colors ${isAdding ? 'bg-black text-white' : 'bg-[var(--brutal-green)]'}`}
            >
              {isAdding ? 'Eklendi! ✅' : 'Sepete Ekle'}
            </button>
            <button 
              onClick={() => onToggleFavorite && onToggleFavorite(product.id)}
              className={`brutal-border brutal-shadow brutal-shadow-hover px-2 sm:px-4 py-1.5 sm:py-0 flex items-center justify-center ${isFavorite ? 'bg-[var(--brutal-red)]' : 'bg-white'}`}
              aria-label="Favorilere ekle"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
