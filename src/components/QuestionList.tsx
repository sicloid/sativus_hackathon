import { MessageCircle, User, ShieldCheck } from 'lucide-react'

interface Question {
  id: string
  questionText: string
  answerText: string | null
  status: string
  createdAt: Date
}

export default function QuestionList({ questions }: { questions: Question[] }) {
  if (questions.length === 0) {
    return (
      <div className="bg-[#f8f8f8] brutal-border p-8 text-center mt-8 italic font-bold">
        Bu ürün için henüz soru sorulmamış. İlk soruyu siz sorun!
      </div>
    )
  }

  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center gap-3 border-b-4 border-black pb-4">
        <MessageCircle size={28} className="text-black" />
        <h3 className="text-2xl font-black uppercase">Ürün Soruları ({questions.length})</h3>
      </div>

      <div className="space-y-6">
        {questions.map((q) => (
          <div key={q.id} className="space-y-4">
            {/* Soru */}
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 shrink-0 bg-white brutal-border flex items-center justify-center">
                <User size={20} />
              </div>
              <div className="bg-white brutal-border p-4 flex-1 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                <p className="font-black text-xs uppercase text-gray-500 mb-1">Kullanıcı Sorusu</p>
                <p className="font-bold text-gray-800">{q.questionText}</p>
              </div>
            </div>

            {/* Cevap */}
            {q.answerText && (
              <div className="flex gap-4 items-start ml-8 sm:ml-12">
                <div className="w-10 h-10 shrink-0 bg-[var(--brutal-green)] brutal-border flex items-center justify-center">
                  <ShieldCheck size={20} className="text-white" />
                </div>
                <div className="bg-[var(--brutal-green)]/10 brutal-border p-4 flex-1 border-l-8 border-l-[var(--brutal-green)] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                  <p className="font-black text-xs uppercase text-[var(--brutal-green)] mb-1">Satıcı Cevabı</p>
                  <p className="font-black text-gray-900">{q.answerText}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
