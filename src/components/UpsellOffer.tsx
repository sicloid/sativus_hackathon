'use client'

import { useState, useEffect } from 'react'
import { useCart } from '@/context/CartContext'
import { getRandomProduct } from '@/app/actions/store'
import { Sparkles, Plus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function UpsellOffer() {
  const { addToCart } = useCart()
  const [offer, setOffer] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchOffer() {
      try {
        const product = await getRandomProduct()
        setOffer(product)
      } catch (error) {
        console.error('Upsell fetch error:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchOffer()
  }, [])

  if (loading || !offer) return null

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-8 bg-black text-white brutal-border brutal-shadow p-6 relative overflow-hidden"
    >
      <div className="absolute top-0 right-0 p-2 opacity-20">
        <Sparkles className="w-24 h-24 rotate-12" />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-4">
          <span className="bg-[var(--brutal-yellow)] text-black px-2 py-1 brutal-border font-black uppercase text-[10px] animate-pulse">
            Sepette Fırsat!
          </span>
          <h3 className="font-black uppercase text-xl italic tracking-tighter">Sizin İçin Seçtik</h3>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-6">
          <div className="w-24 h-24 shrink-0 bg-white brutal-border overflow-hidden">
            <img src={offer.imageUrl || ''} alt="" className="w-full h-full object-cover" />
          </div>
          
          <div className="flex-grow text-center sm:text-left">
            <h4 className="font-black text-lg mb-1 leading-tight">{offer.name}</h4>
            <p className="text-xs text-gray-400 mb-2 line-clamp-1">{offer.description}</p>
            <div className="font-black text-xl text-[var(--brutal-yellow)]">
              {offer.price.toLocaleString('tr-TR', { style: 'currency', currency: 'TRY' })}
            </div>
          </div>

          <button 
            onClick={() => addToCart({
              id: offer.id,
              name: offer.name,
              price: offer.price,
              image_url: offer.imageUrl || ''
            })}
            className="w-full sm:w-auto flex items-center justify-center gap-2 bg-white text-black px-6 py-3 brutal-border font-black uppercase text-sm hover:bg-[var(--brutal-green)] transition-colors brutal-shadow-hover"
          >
            <Plus className="w-4 h-4" /> Sepete Ekle
          </button>
        </div>
      </div>
    </motion.div>
  )
}
