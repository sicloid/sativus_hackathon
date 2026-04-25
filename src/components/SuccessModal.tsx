'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Footprints, Heart, ArrowRight, Home } from 'lucide-react'
import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function SuccessModal({ isOpen, onClose, orderId }: { isOpen: boolean; onClose: () => void; orderId?: string }) {
  const [paws, setPaws] = useState<any[]>([])

  useEffect(() => {
    if (isOpen) {
      const newPaws = Array.from({ length: 15 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 25 + 15,
        delay: Math.random() * 2,
        duration: Math.random() * 4 + 3
      }))
      setPaws(newPaws)
    }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
          {/* Backdrop with Cute Animal Photo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black"
          >
            <img 
              src="https://images.unsplash.com/photo-1544161442-e3dbd1a4c57b?w=1600&q=80" 
              alt="Cute animals" 
              className="w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
          </motion.div>

          {/* Floating Paws */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {paws.map((paw) => (
              <motion.div
                key={paw.id}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 0.6, 0],
                  scale: [0.5, 1.2, 0.5],
                  y: [0, -150],
                  rotate: [0, 90]
                }}
                transition={{ 
                  duration: paw.duration, 
                  repeat: Infinity, 
                  delay: paw.delay 
                }}
                className="absolute text-[var(--brutal-yellow)]"
                style={{ left: `${paw.x}%`, top: `${paw.y}%` }}
              >
                <Footprints size={paw.size} className="drop-shadow-[0_0_8px_rgba(0,0,0,0.5)]" />
              </motion.div>
            ))}
          </div>

          {/* Modal Content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            className="relative bg-white/90 backdrop-blur-md brutal-border brutal-shadow p-8 md:p-12 max-w-2xl w-full text-center"
          >
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: 'spring' }}
              className="w-20 h-20 bg-white brutal-border brutal-shadow mx-auto flex items-center justify-center mb-8 rounded-full"
            >
              <Heart className="w-10 h-10 text-[var(--brutal-red)] fill-current animate-pulse" />
            </motion.div>

            <h1 className="text-2xl md:text-4xl font-black italic uppercase mb-6 leading-tight tracking-tight">
              "Bir canı kurtardığınız ve hayat olduğunuz için teşekkürler!"
            </h1>
            
            <p className="text-lg md:text-xl font-bold italic mb-8 text-black/70 px-4">
              Her siparişiniz hayvanlar için %10 bağış olarak iletilmektedir.
            </p>

            {orderId && (
              <div className="bg-black text-white brutal-border p-3 mb-10 inline-block shadow-[6px_6px_0_0_var(--brutal-yellow)]">
                <p className="text-[10px] uppercase font-black mb-1 tracking-widest text-gray-400 italic">Sipariş No</p>
                <p className="text-xl font-black italic tracking-widest uppercase">
                  #{orderId.slice(-8)}
                </p>
              </div>
            )}

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/profil/siparisler"
                className="bg-black text-white px-6 py-3 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-sm flex items-center justify-center gap-2 transition-all hover:bg-[var(--brutal-blue)]"
              >
                Siparişlerim <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/urunler"
                className="bg-[var(--brutal-yellow)] text-black px-6 py-3 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-sm flex items-center justify-center gap-2 transition-all hover:bg-black hover:text-white"
              >
                <Home className="w-4 h-4" /> Anasayfaya Dön
              </Link>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
