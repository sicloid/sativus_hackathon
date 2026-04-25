'use client'

import { useState } from 'react'
import { addReview } from '@/app/actions/store'
import { useToast } from '@/context/ToastContext'
import { Star } from 'lucide-react'

export default function ReviewForm({ productId }: { productId: string }) {
  const [rating, setRating] = useState(5)
  const [hover, setHover] = useState(0)
  const [comment, setComment] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.set('productId', productId)
    formData.set('rating', rating.toString())
    formData.set('comment', comment)

    const result = await addReview(formData)
    setIsSubmitting(false)

    if (result.error) {
      showToast(result.error)
    } else {
      showToast('Yorumunuz başarıyla eklendi!')
      setComment('')
      setRating(5)
    }
  }

  return (
    <div className="bg-white brutal-border brutal-shadow p-6 mt-12">
      <h3 className="text-2xl font-black uppercase mb-6">Yorum Yap & Değerlendir</h3>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Rating Stars */}
        <div>
          <label className="block font-black uppercase text-xs mb-2">Puanınız</label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                className="transition-transform hover:scale-110 focus:outline-none"
                onClick={() => setRating(star)}
                onMouseEnter={() => setHover(star)}
                onMouseLeave={() => setHover(0)}
              >
                <Star
                  size={32}
                  className={`brutal-border p-1 ${
                    (hover || rating) >= star 
                      ? 'fill-[var(--brutal-yellow)] text-black' 
                      : 'fill-white text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        {/* Comment Textarea */}
        <div>
          <label className="block font-black uppercase text-xs mb-2">Yorumunuz</label>
          <textarea
            required
            rows={4}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ürün hakkında ne düşünüyorsunuz?"
            className="w-full p-4 brutal-border font-bold focus:outline-none focus:ring-4 focus:ring-black transition-all"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-lg transition-all hover:bg-[var(--brutal-yellow)] hover:text-black disabled:opacity-50"
        >
          {isSubmitting ? 'Gönderiliyor...' : 'Yorumu Gönder'}
        </button>
      </form>
    </div>
  )
}
