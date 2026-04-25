'use client'

import { useState } from 'react'
import { answerQuestion } from '@/app/actions/store'
import { useToast } from '@/context/ToastContext'
import { MessageCircle, CheckCircle2, Clock, Send, Package } from 'lucide-react'
import Link from 'next/link'

export default function AdminQuestionsClient({ initialQuestions }: { initialQuestions: any[] }) {
  const [questions, setQuestions] = useState(initialQuestions)
  const [answers, setAnswers] = useState<{ [key: string]: string }>({})
  const [isSubmitting, setIsSubmitting] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'answered'>('all')
  const { showToast } = useToast()

  const handleAnswer = async (questionId: string) => {
    const answerText = answers[questionId]
    if (!answerText?.trim()) return

    setIsSubmitting(questionId)
    const formData = new FormData()
    formData.set('questionId', questionId)
    formData.set('answerText', answerText)

    const result = await answerQuestion(formData)
    setIsSubmitting(null)

    if (result.error) {
      showToast(result.error)
    } else {
      showToast('Cevap başarıyla yayınlandı!')
      // Update local state
      setQuestions(prev => prev.map(q => 
        q.id === questionId ? { ...q, answerText, status: 'answered' } : q
      ))
      setAnswers(prev => {
        const next = { ...prev }
        delete next[questionId]
        return next
      })
    }
  }

  const filteredQuestions = questions.filter(q => {
    if (filter === 'pending') return q.status === 'pending'
    if (filter === 'answered') return q.status === 'answered'
    return true
  })

  return (
    <div className="space-y-8">
      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        {[
          { id: 'all', label: 'Tümü', icon: MessageCircle },
          { id: 'pending', label: 'Bekleyenler', icon: Clock },
          { id: 'answered', label: 'Cevaplananlar', icon: CheckCircle2 },
        ].map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id as any)}
            className={`flex items-center gap-2 px-6 py-3 font-black uppercase text-sm brutal-border transition-all
              ${filter === f.id ? 'bg-black text-white brutal-shadow translate-x-1 translate-y-1' : 'bg-white hover:bg-gray-100'}`}
          >
            <f.icon size={18} /> {f.label}
          </button>
        ))}
      </div>

      {/* Questions List */}
      <div className="grid gap-6">
        {filteredQuestions.length === 0 ? (
          <div className="bg-white brutal-border p-12 text-center">
            <p className="font-black text-xl uppercase text-gray-400">Soru bulunamadı.</p>
          </div>
        ) : (
          filteredQuestions.map((q) => (
            <div key={q.id} className="bg-white brutal-border brutal-shadow overflow-hidden">
              {/* Header: Product Info */}
              <div className="bg-gray-50 border-b-2 border-black p-4 flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-gray-500" />
                  <Link href={`/urunler/${q.productId}`} className="font-black uppercase text-sm hover:underline">
                    {q.product.name}
                  </Link>
                </div>
                <div className={`px-3 py-1 brutal-border text-[10px] font-black uppercase shadow-[2px_2px_0_0_rgba(0,0,0,1)]
                  ${q.status === 'answered' ? 'bg-[var(--brutal-green)] text-white' : 'bg-[var(--brutal-yellow)] text-black'}`}>
                  {q.status === 'answered' ? 'Cevaplandı' : 'Bekliyor'}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Question Section */}
                <div className="flex gap-4 items-start">
                  <div className="w-10 h-10 shrink-0 bg-black text-white brutal-border flex items-center justify-center font-black">
                    Q
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-black text-gray-400 uppercase mb-1">{q.userEmail}</p>
                    <p className="font-bold text-lg text-gray-800">{q.questionText}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-2">
                      {new Date(q.createdAt).toLocaleString('tr-TR')}
                    </p>
                  </div>
                </div>

                {/* Answer Section */}
                {q.status === 'answered' ? (
                  <div className="flex gap-4 items-start bg-[var(--brutal-green)]/5 p-4 brutal-border border-l-8 border-l-[var(--brutal-green)]">
                    <div className="w-10 h-10 shrink-0 bg-[var(--brutal-green)] text-white brutal-border flex items-center justify-center font-black">
                      A
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-black text-[var(--brutal-green)] uppercase mb-1">Cevabınız</p>
                      <p className="font-black text-gray-900">{q.answerText}</p>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-4 items-start mt-4">
                    <div className="w-10 h-10 shrink-0 bg-white brutal-border flex items-center justify-center font-black">
                      A
                    </div>
                    <div className="flex-1 space-y-3">
                      <textarea
                        value={answers[q.id] || ''}
                        onChange={(e) => setAnswers(prev => ({ ...prev, [q.id]: e.target.value }))}
                        placeholder="Cevabınızı buraya yazın..."
                        className="w-full p-4 brutal-border font-bold focus:outline-none focus:ring-4 focus:ring-black transition-all resize-none bg-[#fdfdfd]"
                        rows={3}
                      />
                      <button
                        onClick={() => handleAnswer(q.id)}
                        disabled={isSubmitting === q.id || !answers[q.id]?.trim()}
                        className="bg-[var(--brutal-green)] text-white px-6 py-2 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase text-sm flex items-center gap-2 transition-all hover:bg-black disabled:opacity-50"
                      >
                        {isSubmitting === q.id ? 'Gönderiliyor...' : (
                          <>Cevapla <Send size={16} /></>
                        )}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
