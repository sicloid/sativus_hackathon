import { getAdminQuestions } from '@/app/actions/store'
import AdminQuestionsClient from './AdminQuestionsClient'

export const dynamic = 'force-dynamic'

export default async function AdminSorularPage() {
  const questions = await getAdminQuestions()

  return (
    <div className="p-4 sm:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="mb-10">
          <h1 className="text-4xl font-black uppercase tracking-tight mb-2">Gelen Sorular</h1>
          <p className="font-bold text-gray-500 uppercase text-sm">Ürünler hakkında sorulan soruları buradan yönetebilirsiniz.</p>
        </header>

        <AdminQuestionsClient initialQuestions={questions} />
      </div>
    </div>
  )
}
