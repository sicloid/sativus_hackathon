/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { createClient } from '@/utils/supabase/client'

export interface CartItem {
  id: string
  productId: string
  name: string
  price: number
  quantity: number
  image_url: string
  isPrescription?: boolean
}

interface CartContextType {
  items: CartItem[]
  addToCart: (product: { id: string, name: string, price: number, image_url: string, isPrescription?: boolean }, quantity?: number) => void
  removeFromCart: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  totalItems: number
  totalPrice: number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Load cart on mount
  useEffect(() => {
    const loadCart = async () => {
      try {
        const supabase = createClient()
        const { data: { user } } = await supabase.auth.getUser()
        
        if (user) {
          // Here we could load from Supabase database via Prisma/Server Action
          // For now, we fallback to local storage
        }
      } catch (e) {
        console.error("Supabase auth error during cart load", e)
      }
      
      const storedCart = localStorage.getItem('petverse_cart')
      if (storedCart) {
        try {
          setItems(JSON.parse(storedCart))
        } catch (e) {
          console.error("Cart parse error", e)
        }
      }
      setIsLoaded(true)
    }
    
    loadCart()
  }, [])

  // Sync cart to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('petverse_cart', JSON.stringify(items))
      // TODO: If user is logged in, sync to Supabase database
    }
  }, [items, isLoaded])

  const addToCart = (product: { id: string, name: string, price: number, image_url: string, isPrescription?: boolean }, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(item => item.productId === product.id)
      if (existing) {
        return prev.map(item => 
          item.productId === product.id 
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      return [...prev, {
        id: Math.random().toString(36).substring(7),
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image_url: product.image_url,
        isPrescription: product.isPrescription
      }]
    })
  }

  const removeFromCart = (productId: string) => {
    setItems(prev => prev.filter(item => item.productId !== productId))
  }

  const updateQuantity = (productId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId)
      return
    }
    setItems(prev => prev.map(item => 
      item.productId === productId ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => setItems([])

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  return (
    <CartContext.Provider value={{
      items,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
