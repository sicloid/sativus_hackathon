'use client'

import { motion } from 'framer-motion'
import { PawPrint } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function PawsAnimation() {
  const [paws, setPaws] = useState<any[]>([])

  useEffect(() => {
    // Rastgele konumlarda patiler oluştur
    const newPaws = Array.from({ length: 15 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 40 + 20,
      delay: Math.random() * 5,
      duration: Math.random() * 10 + 10,
      rotate: Math.random() * 360
    }))
    setPaws(newPaws)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {paws.map((paw) => (
        <motion.div
          key={paw.id}
          initial={{ opacity: 0, y: '110vh' }}
          animate={{ 
            opacity: [0, 0.2, 0],
            y: '-10vh',
            x: `${paw.x + (Math.sin(paw.id) * 10)}vw`,
            rotate: paw.rotate + 360
          }}
          transition={{ 
            duration: paw.duration, 
            repeat: Infinity, 
            delay: paw.delay,
            ease: "linear"
          }}
          className="absolute text-black/10"
          style={{ width: paw.size, height: paw.size }}
        >
          <PawPrint size={paw.size} />
        </motion.div>
      ))}
    </div>
  )
}
