'use client'

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react'
import { User } from '@supabase/supabase-js'
import { Product } from '@/components/ProductCard'
import { createClient } from '@/utils/supabase/client'
import { useToast } from '@/context/ToastContext'

interface FavoritesContextType {
  favorites: Product[]
  toggleFavorite: (product: Product) => void
  isFavorite: (productId: string) => boolean
  clearFavorites: () => void
  totalFavorites: number
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined)

export function FavoritesProvider({ children }: { children: ReactNode }) {
  const [favorites, setFavorites] = useState<Product[]>([])
  const [isLoaded, setIsLoaded] = useState(false)
  const [currentUser, setCurrentUser] = useState<User | null>(null)
  const supabase = createClient()
  const { showToast } = useToast()

  // Load favorites on mount
  useEffect(() => {
    const loadFavorites = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      
      if (user) {
        setCurrentUser(user)
        // Here we could load from Supabase database via Prisma/Server Action
        // For now, we fallback to local storage
      }
      
      const storedFavorites = localStorage.getItem('petverse_favorites')
      if (storedFavorites) {
        try {
          setFavorites(JSON.parse(storedFavorites))
        } catch (e) {
          console.error("Favorites parse error", e)
        }
      }
      setIsLoaded(true)
    }
    
    loadFavorites()
  }, [supabase.auth])

  // Sync favorites to local storage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('petverse_favorites', JSON.stringify(favorites))
      // TODO: If user is logged in, sync to Supabase database
    }
  }, [favorites, isLoaded])

  const toggleFavorite = (product: Product) => {
    if (!currentUser) {
      showToast('Favorilere eklemek için giriş yapmalısınız!')
      return
    }

    setFavorites(prev => {
      const existing = prev.find(item => item.id === product.id)
      if (existing) {
        showToast('Ürün favorilerden çıkarıldı!')
        return prev.filter(item => item.id !== product.id)
      }
      showToast('Ürün favorilere eklendi!')
      return [...prev, product]
    })
  }

  const isFavorite = (productId: string) => {
    return favorites.some(item => item.id === productId)
  }

  const clearFavorites = () => setFavorites([])

  const totalFavorites = favorites.length

  return (
    <FavoritesContext.Provider value={{
      favorites,
      toggleFavorite,
      isFavorite,
      clearFavorites,
      totalFavorites
    }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const context = useContext(FavoritesContext)
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider')
  }
  return context
}
