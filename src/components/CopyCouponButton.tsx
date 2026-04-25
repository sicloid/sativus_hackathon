'use client'

import { useState } from 'react'
import { Copy, Check } from 'lucide-react'

interface CopyCouponButtonProps {
  code: string
}

export default function CopyCouponButton({ code }: CopyCouponButtonProps) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className={`group relative flex items-center justify-center p-2 brutal-border transition-all
        ${copied ? 'bg-[var(--brutal-green)]' : 'bg-white hover:bg-[var(--brutal-yellow)]'}`}
      title="Kodu Kopyala"
    >
      {copied ? (
        <Check size={16} className="text-white" />
      ) : (
        <Copy size={16} className="text-black" />
      )}
      
      {copied && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 brutal-border font-black">
          KOPYALANDI!
        </span>
      )}
    </button>
  )
}
