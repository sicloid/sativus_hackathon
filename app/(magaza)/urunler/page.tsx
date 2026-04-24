'use client';

import { useState } from 'react';
import ProductCard, { Product } from '@/components/ProductCard';
import { useCart } from '@/context/CartContext';

// Mock data for development
const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Premium Köpek Maması 15kg',
    description: 'Yetişkin köpekler için somonlu, tahılsız yüksek proteinli premium kuru mama.',
    price: 1250,
    image_url: 'https://placehold.co/400x400/fca5a5/000000?text=Kopek+Mamasi',
    category: 'Köpek',
    stock_quantity: 45
  },
  {
    id: '2',
    name: 'Kedi Kumu İnce Taneli 10L',
    description: 'Ekstra topaklaşan, parfümlü, tozsuz bentonit kedi kumu.',
    price: 180,
    image_url: 'https://placehold.co/400x400/93c5fd/000000?text=Kedi+Kumu',
    category: 'Kedi',
    stock_quantity: 120
  },
  {
    id: '3',
    name: 'Kuş Kafesi Tam Takım',
    description: 'Muhabbet kuşları ve kanaryalar için uygun, yemlik ve suluk dahil kafes.',
    price: 450,
    image_url: 'https://placehold.co/400x400/fde047/000000?text=Kus+Kafesi',
    category: 'Kuş',
    stock_quantity: 12
  },
  {
    id: '4',
    name: 'Akvaryum Dış Filtre 1000L/H',
    description: 'Sessiz çalışan, 3 sepetli, enerji tasarruflu akvaryum dış motoru.',
    price: 1850,
    image_url: 'https://placehold.co/400x400/86efac/000000?text=Akvaryum+Filtre',
    category: 'Balık',
    stock_quantity: 8
  },
  {
    id: '5',
    name: 'Kedi Tırmalama Tahtası',
    description: 'Kedi nanesi hediyeli, dayanıklı sisal ipli tırmalama platformu.',
    price: 290,
    image_url: 'https://placehold.co/400x400/93c5fd/000000?text=Tirmalama',
    category: 'Kedi',
    stock_quantity: 34
  },
  {
    id: '6',
    name: 'Köpek Gezdirme Tasması 5m',
    description: 'Otomatik sarmallı, stop tuşlu, fosforlu şeritli gezdirme kayışı.',
    price: 220,
    image_url: 'https://placehold.co/400x400/fca5a5/000000?text=Tasma',
    category: 'Köpek',
    stock_quantity: 56
  }
];

const CATEGORIES = ['Tümü', 'Kedi', 'Köpek', 'Kuş', 'Balık', 'Kemirgen'];

export default function UrunlerPage() {
  const [activeCategory, setActiveCategory] = useState('Tümü');
  const [favorites, setFavorites] = useState<string[]>([]);
  const { addToCart } = useCart();
  
  const filteredProducts = activeCategory === 'Tümü' 
    ? MOCK_PRODUCTS 
    : MOCK_PRODUCTS.filter(p => p.category === activeCategory);

  const handleAddToCart = (productId: string) => {
    const product = MOCK_PRODUCTS.find(p => p.id === productId);
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url
      });
      // Optionally show a mini brutalist toast here
    }
  };

  const handleToggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8 bg-[var(--brutal-blue)] brutal-border brutal-shadow p-6">
        <h1 className="text-4xl font-black uppercase">Tüm Ürünler</h1>
        <div className="text-xl font-bold bg-white brutal-border px-4 py-2">
          {filteredProducts.length} Ürün
        </div>
      </div>

      {/* Categories / Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-3 font-black uppercase brutal-border brutal-shadow-hover transition-colors ${
              activeCategory === category 
                ? 'bg-black text-white brutal-shadow' 
                : 'bg-white text-black shadow-none border-b-4'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filteredProducts.map(product => (
          <ProductCard 
            key={product.id} 
            product={product} 
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={favorites.includes(product.id)}
          />
        ))}
      </div>
      
      {filteredProducts.length === 0 && (
        <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-12 text-center">
          <h2 className="text-3xl font-black uppercase mb-4">Üzgünüz, ürün bulunamadı.</h2>
          <p className="text-xl font-bold">Bu kategoride henüz ürün eklenmemiş.</p>
        </div>
      )}
    </div>
  );
}
