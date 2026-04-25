'use client'

import { useState } from 'react'
import { askQuestion } from '@/app/actions/store'
import { useToast } from '@/context/ToastContext'
import { Send, HelpCircle } from 'lucide-react'

export default function QuestionForm({ productId }: { productId: string }) {
  const [question, setQuestion] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { showToast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!question.trim()) return

    setIsSubmitting(true)
    const formData = new FormData()
    formData.set('productId', productId)
    formData.set('questionText', question)

    const result = await askQuestion(formData)
    setIsSubmitting(false)

    if (result.error) {
      showToast(result.error)
    } else {
      showToast('Sorunuz satıcıya iletildi!')
      setQuestion('')
    }
  }

  return (
    <div className="bg-white brutal-border brutal-shadow p-6 mt-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-[var(--brutal-blue)] p-2 brutal-border">
          <HelpCircle className="text-white" size={24} />
        </div>
        <h3 className="text-2xl font-black uppercase">Satıcıya Soru Sor</h3>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          required
          rows={4}
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Ürün hakkında merak ettiğiniz her şeyi sorabilirsiniz..."
          className="w-full p-4 brutal-border font-bold focus:outline-none focus:ring-4 focus:ring-black transition-all resize-none"
        />
        
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-black text-white py-4 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-lg flex items-center justify-center gap-2 transition-all hover:bg-[var(--brutal-blue)] disabled:opacity-50"
        >
          {isSubmitting ? 'Gönderiliyor...' : (
            <>
              Soruyu Gönder <Send size={20} />
            </>
          )}
        </button>
      </form>
      <p className="mt-4 text-xs font-bold text-gray-500 uppercase italic">
        * Sorunuz cevaplandıktan sonra ürün sayfasında görünecektir.
      </p>
    </div>
  )
}
