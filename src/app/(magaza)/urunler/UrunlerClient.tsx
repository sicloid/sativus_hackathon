'use client'

import { useState } from 'react'
import ProductCard, { Product } from '@/components/ProductCard'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'

const CATEGORIES = ['Tümü', 'Kedi', 'Köpek', 'Kuş', 'Balık', 'Kemirgen']

interface UrunlerClientProps {
  products: Product[]
}

export default function UrunlerClient({ products }: UrunlerClientProps) {
  const [activeCategory, setActiveCategory] = useState('Tümü')
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  const filteredProducts = activeCategory === 'Tümü'
    ? products
    : products.filter(p => p.category === activeCategory)

  const handleAddToCart = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      addToCart({
        id: product.id,
        name: product.name,
        price: product.price,
        image_url: product.image_url
      })
      showToast('Ürün sepete eklendi!')
    }
  }

  const handleToggleFavorite = (productId: string) => {
    const product = products.find(p => p.id === productId)
    if (product) {
      toggleFavorite(product)
    }
  }

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-[var(--brutal-blue)] brutal-border brutal-shadow p-6 text-center sm:text-left">
        <h1 className="text-3xl sm:text-4xl font-black uppercase">Tüm Ürünler</h1>
        <div className="text-lg sm:text-xl font-bold bg-white brutal-border px-4 py-2">
          {filteredProducts.length} Ürün
        </div>
      </div>

      {/* Kategoriler */}
      <div className="flex flex-wrap justify-center sm:justify-start gap-2 sm:gap-4 mb-8">
        {CATEGORIES.map(category => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-4 py-2 sm:px-6 sm:py-3 font-black uppercase text-sm sm:text-base brutal-border brutal-shadow-hover transition-colors ${
              activeCategory === category
                ? 'bg-black text-white brutal-shadow'
                : 'bg-white text-black shadow-none border-b-4'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Ürün Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-8">
        {filteredProducts.map(product => (
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={handleAddToCart}
            onToggleFavorite={handleToggleFavorite}
            isFavorite={isFavorite(product.id)}
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
  )
}
