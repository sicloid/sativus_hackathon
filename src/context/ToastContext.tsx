'use client'

import React, { createContext, useContext, useState, ReactNode } from 'react'

interface ToastContextType {
  showToast: (message: string) => void
}

const ToastContext = createContext<ToastContextType | undefined>(undefined)

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null)

  const showToast = (message: string) => {
    const id = Date.now()
    setToast({ id, message })
    setTimeout(() => {
      setToast(prev => prev?.id === id ? null : prev)
    }, 3000)
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      {toast && (
        <div className="fixed top-8 right-8 z-[250] bg-[var(--brutal-yellow)] text-black border-4 border-black brutal-shadow px-6 py-4 font-black uppercase text-sm md:text-base animate-[bounce_0.5s_infinite] flex items-center gap-3">
          <span className="text-2xl">✨</span>
          {toast.message}
        </div>
      )}
    </ToastContext.Provider>
  )
}

export function useToast() {
  const context = useContext(ToastContext)
  if (!context) throw new Error('useToast must be used within ToastProvider')
  return context
}
