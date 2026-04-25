import { getUserQuestions } from '@/app/actions/store'
import { MessageCircle, Package, Clock, CheckCircle2, ArrowRight } from 'lucide-react'
import Link from 'next/link'

export const dynamic = 'force-dynamic'

export default async function ProfilSorularPage() {
  const questions = await getUserQuestions()

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Sorularım & Cevaplar</h1>
        <p className="font-bold text-gray-500 uppercase text-sm">Ürünler hakkında sorduğunuz soruların durumunu buradan takip edebilirsiniz.</p>
      </header>

      <div className="grid gap-6">
        {questions.length === 0 ? (
          <div className="bg-white brutal-border p-12 text-center">
            <MessageCircle size={48} className="mx-auto mb-4 text-gray-300" />
            <p className="font-black text-xl uppercase text-gray-400 mb-4">Henüz bir soru sormadınız.</p>
            <Link href="/urunler" className="inline-block bg-[var(--brutal-yellow)] px-8 py-3 brutal-border brutal-shadow brutal-shadow-hover font-black uppercase transition-all">
              Alışverişe Başla
            </Link>
          </div>
        ) : (
          questions.map((q) => (
            <div key={q.id} className="bg-white brutal-border brutal-shadow overflow-hidden group">
              {/* Product Header */}
              <div className="bg-gray-50 border-b-2 border-black p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Package size={20} className="text-gray-500" />
                  <Link href={`/urunler/${q.productId}`} className="font-black uppercase text-sm hover:underline flex items-center gap-2">
                    {q.product.name} <ArrowRight size={14} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
                <div className={`flex items-center gap-2 px-3 py-1 brutal-border text-[10px] font-black uppercase
                  ${q.status === 'answered' ? 'bg-[var(--brutal-green)] text-white' : 'bg-[var(--brutal-yellow)] text-black'}`}>
                  {q.status === 'answered' ? <CheckCircle2 size={12} /> : <Clock size={12} />}
                  {q.status === 'answered' ? 'Cevaplandı' : 'Bekliyor'}
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Question */}
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sorunuz</p>
                  <div className="bg-white brutal-border p-4 shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                    <p className="font-bold text-gray-800">{q.questionText}</p>
                    <p className="text-[10px] font-bold text-gray-400 mt-2">
                      {new Date(q.createdAt).toLocaleString('tr-TR')}
                    </p>
                  </div>
                </div>

                {/* Answer */}
                {q.answerText ? (
                  <div className="space-y-2 ml-4 sm:ml-8">
                    <p className="text-[10px] font-black text-[var(--brutal-green)] uppercase tracking-widest text-right">Satıcı Cevabı</p>
                    <div className="bg-[var(--brutal-green)]/10 brutal-border p-4 border-l-8 border-l-[var(--brutal-green)] shadow-[4px_4px_0_0_rgba(0,0,0,1)]">
                      <p className="font-black text-gray-900">{q.answerText}</p>
                      <p className="text-[10px] font-bold text-[var(--brutal-green)] mt-2">
                        {new Date(q.updatedAt).toLocaleString('tr-TR')}
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="ml-4 sm:ml-8 border-2 border-dashed border-gray-200 p-4 text-center">
                    <p className="font-bold text-gray-400 italic">Sorunuz satıcı tarafından henüz cevaplanmadı.</p>
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
