'use client'

import { useEffect, useState } from 'react'
import { useCart } from '@/context/CartContext'

export default function ClearCartOnLoad() {
  const { clearCart } = useCart()
  const [showToast, setShowToast] = useState(true)

  useEffect(() => {
    clearCart()
    // Toast 4 saniye sonra kaybolsun
    const t = setTimeout(() => setShowToast(false), 4000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!showToast) return null

  return (
    <div
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50 flex items-center gap-3 px-6 py-4 bg-[var(--brutal-green)] brutal-border brutal-shadow font-black text-black text-sm uppercase tracking-wider animate-bounce"
      style={{ animationIterationCount: 2 }}
    >
      <span className="text-xl">✅</span>
      <span>Sipariş Başarıyla Oluşturuldu!</span>
    </div>
  )
}
