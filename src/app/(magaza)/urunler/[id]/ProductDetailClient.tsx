'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { useToast } from '@/context/ToastContext'
import ReviewForm from '@/components/ReviewForm'
import ReviewList from '@/components/ReviewList'
import QuestionForm from '@/components/QuestionForm'
import QuestionList from '@/components/QuestionList'
import { MessageSquare, Star, Info } from 'lucide-react'

export default function ProductDetailClient({ product, user }: { product: any, user: any }) {
  const [quantity, setQuantity] = useState(1)
  const [activeTab, setActiveTab] = useState<'details' | 'reviews' | 'qa'>('details')
  const { addToCart } = useCart()
  const { toggleFavorite, isFavorite } = useFavorites()
  const { showToast } = useToast()

  const increaseQuantity = () => setQuantity(prev => prev + 1)
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1))

  const imageUrl = product.imageUrl || 'https://placehold.co/600x600/fca5a5/000000?text=Pet+Urun'

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: imageUrl
    }, quantity)
    showToast(`${quantity} adet ürün sepete eklendi!`)
  }

  const handleToggleFavorite = () => {
    toggleFavorite({
      id: product.id,
      name: product.name,
      price: product.price,
      image_url: imageUrl,
      description: product.description,
      category: product.category,
      stock_quantity: product.stockQuantity
    })
  }

  return (
    <div className="flex flex-col gap-8 pb-12">
      {/* Breadcrumb */}
      <div className="font-bold uppercase text-sm">
        <Link href="/urunler" className="hover:underline">Ürünler</Link> &gt; 
        <span className="mx-2">{product.category}</span> &gt; 
        <span className="mx-2 underline">{product.name}</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Product Image */}
        <div className="brutal-border brutal-shadow bg-[var(--brutal-yellow)] aspect-square relative overflow-hidden">
          <img 
            src={imageUrl} 
            alt={product.name}
            className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col">
          <div className="bg-black text-white self-start px-3 py-1 font-black uppercase text-xs mb-4 brutal-border">
            {product.category}
          </div>
          <h1 className="text-4xl md:text-5xl font-black uppercase mb-4 leading-tight">{product.name}</h1>
          
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-1 bg-[var(--brutal-yellow)] brutal-border px-2 py-1 font-black">
              <Star size={16} className="fill-black" />
              <span>{product.reviews?.length > 0 
                ? (product.reviews.reduce((a: any, b: any) => a + b.rating, 0) / product.reviews.length).toFixed(1) 
                : 'Yorum Yok'}</span>
            </div>
            <span className="font-bold text-gray-500 uppercase text-sm">
              {product.reviews?.length || 0} Değerlendirme
            </span>
          </div>

          <p className="text-xl font-bold mb-2">Stok Durumu: 
            <span className={`ml-2 ${product.stockQuantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
              {product.stockQuantity > 0 ? `${product.stockQuantity} Adet` : 'Tükendi'}
            </span>
          </p>
          
          <div className="text-4xl sm:text-5xl font-black mb-8">
            {product.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-8">
            <div className="flex brutal-border brutal-shadow w-full sm:w-32 h-12 sm:h-auto">
              <button onClick={decreaseQuantity} className="w-10 flex items-center justify-center font-black text-xl hover:bg-[var(--brutal-red)] transition-colors">-</button>
              <div className="flex-grow flex items-center justify-center font-black text-xl border-l-2 border-r-2 border-black bg-white">{quantity}</div>
              <button onClick={increaseQuantity} className="w-10 flex items-center justify-center font-black text-xl hover:bg-[var(--brutal-green)] transition-colors">+</button>
            </div>
            
            <button 
              onClick={handleAddToCart} 
              disabled={product.stockQuantity <= 0}
              className="flex-grow bg-[var(--brutal-green)] brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-lg sm:text-xl py-3 sm:py-0 disabled:opacity-50"
            >
              Sepete Ekle
            </button>
            <button onClick={handleToggleFavorite} className={`brutal-border brutal-shadow brutal-shadow-hover px-4 py-3 sm:py-0 flex items-center justify-center transition-colors ${isFavorite(product.id) ? 'bg-[var(--brutal-red)] text-white' : 'bg-white hover:bg-[var(--brutal-red)] hover:text-white'}`}>
              <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite(product.id) ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-8 sm:mt-12">
        <div className="flex flex-wrap gap-2 mb-6">
          <button 
            onClick={() => setActiveTab('details')}
            className={`flex items-center gap-2 px-6 py-3 font-black uppercase text-sm brutal-border transition-all ${activeTab === 'details' ? 'bg-black text-white brutal-shadow translate-x-1 translate-y-1' : 'bg-white hover:bg-gray-100'}`}
          >
            <Info size={18} /> Açıklama
          </button>
          <button 
            onClick={() => setActiveTab('reviews')}
            className={`flex items-center gap-2 px-6 py-3 font-black uppercase text-sm brutal-border transition-all ${activeTab === 'reviews' ? 'bg-black text-white brutal-shadow translate-x-1 translate-y-1' : 'bg-white hover:bg-gray-100'}`}
          >
            <Star size={18} /> Değerlendirmeler ({product.reviews?.length || 0})
          </button>
          <button 
            onClick={() => setActiveTab('qa')}
            className={`flex items-center gap-2 px-6 py-3 font-black uppercase text-sm brutal-border transition-all ${activeTab === 'qa' ? 'bg-black text-white brutal-shadow translate-x-1 translate-y-1' : 'bg-white hover:bg-gray-100'}`}
          >
            <MessageSquare size={18} /> Satıcıya Sor ({product.questions?.length || 0})
          </button>
        </div>

        <div className="transition-all duration-300">
          {activeTab === 'details' && (
            <div className="bg-white brutal-border brutal-shadow p-8 min-h-[300px]">
              <div className="prose prose-lg max-w-none font-bold">
                <p className="whitespace-pre-line">{product.description}</p>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <ReviewList reviews={product.reviews || []} />
              </div>
              <div className="sticky top-32">
                {user ? (
                  <ReviewForm productId={product.id} />
                ) : (
                  <div className="bg-[var(--brutal-blue)] brutal-border brutal-shadow p-6 text-center">
                    <h3 className="text-xl font-black uppercase mb-4 text-white">Yorum Yapmak İster misiniz?</h3>
                    <p className="font-bold text-white/90 mb-6">Değerlendirme bırakmak için giriş yapmanız gerekmektedir.</p>
                    <Link
                      href={`/login?redirect=/urunler/${product.id}`}
                      className="inline-block w-full bg-white text-black py-3 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase transition-all"
                    >
                      Giriş Yap
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'qa' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
              <div className="lg:col-span-2">
                <QuestionList questions={product.questions || []} />
              </div>
              <div className="sticky top-32">
                {user ? (
                  <QuestionForm productId={product.id} />
                ) : (
                  <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-6 text-center">
                    <h3 className="text-xl font-black uppercase mb-4">Soru Sormak İster misiniz?</h3>
                    <p className="font-bold text-black/70 mb-6">Satıcıya soru sormak için giriş yapmanız gerekmektedir.</p>
                    <Link
                      href={`/login?redirect=/urunler/${product.id}`}
                      className="inline-block w-full bg-black text-white py-3 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase transition-all"
                    >
                      Giriş Yap
                    </Link>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
