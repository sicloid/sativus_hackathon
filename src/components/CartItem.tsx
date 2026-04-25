import React from 'react';
import { CartItem as CartItemType, useCart } from '@/context/CartContext';

export default function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 bg-white brutal-border p-4 brutal-shadow mb-4">
      <div 
        className="w-24 h-24 bg-[var(--brutal-yellow)] brutal-border flex-shrink-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${item.image_url})` }}
      />
      
      <div className="flex-grow text-center sm:text-left">
        <h3 className="font-black uppercase text-lg">{item.name}</h3>
        <p className="font-bold text-xl mt-1">
          {item.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        {item.isPrescription ? (
          <div className="flex brutal-border h-10 w-24 items-center justify-center font-black bg-[#f8f8f8] cursor-not-allowed text-zinc-500" title="Reçeteli ilaçların adedi değiştirilemez">
            {item.quantity} Adet
          </div>
        ) : (
          <div className="flex brutal-border h-10 w-24">
            <button 
              onClick={() => updateQuantity(item.productId, item.quantity - 1)}
              className="w-8 flex items-center justify-center font-black hover:bg-[var(--brutal-red)] transition-colors"
            >
              -
            </button>
            <div className="flex-grow flex items-center justify-center font-black border-l-2 border-r-2 border-black bg-[#f8f8f8]">
              {item.quantity}
            </div>
            <button 
              onClick={() => updateQuantity(item.productId, item.quantity + 1)}
              className="w-8 flex items-center justify-center font-black hover:bg-[var(--brutal-green)] transition-colors"
            >
              +
            </button>
          </div>
        )}
        
        <button 
          onClick={() => removeFromCart(item.productId)}
          className="h-10 px-4 bg-[var(--brutal-red)] brutal-border font-black uppercase text-sm hover:bg-black hover:text-white transition-colors"
        >
          Sil
        </button>
      </div>
    </div>
  );
}
