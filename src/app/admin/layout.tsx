import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { logoutAction } from '@/app/actions/auth'
import Link from 'next/link'

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = user?.user_metadata?.role as string | undefined

  // Server-side güvenlik katmanı (middleware'e ek)
  if (!user || role !== 'admin') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-[var(--brutal-yellow)] flex flex-col">
      {/* Top Bar */}
      <header className="bg-black text-white border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-4">
            <Link href="/admin" className="font-black text-2xl tracking-tighter">
              PET<span className="text-[var(--brutal-yellow)]">VERSE</span>
              <span className="ml-2 text-xs font-black bg-[var(--brutal-yellow)] text-black px-2 py-1 uppercase tracking-widest">
                Admin
              </span>
            </Link>
          </div>

          <nav className="flex items-center gap-2">
            <Link
              href="/admin"
              className="px-4 py-2 font-black text-sm uppercase tracking-wider border-2 border-[var(--brutal-yellow)] text-[var(--brutal-yellow)] hover:bg-[var(--brutal-yellow)] hover:text-black transition-colors"
            >
              📦 Ürünler
            </Link>
            <Link
              href="/urunler"
              target="_blank"
              className="px-4 py-2 font-black text-sm uppercase tracking-wider border-2 border-white text-white hover:bg-white hover:text-black transition-colors"
            >
              🛒 Mağazayı Gör
            </Link>
            <form action={logoutAction}>
              <button
                type="submit"
                id="admin-logout-btn"
                className="px-4 py-2 font-black text-sm uppercase tracking-wider bg-[var(--brutal-red)] text-black border-2 border-[var(--brutal-red)] hover:bg-red-600 hover:text-white transition-colors"
              >
                Çıkış Yap
              </button>
            </form>
          </nav>
        </div>
      </header>

      {/* Admin Info Bar */}
      <div className="bg-[var(--brutal-yellow)] border-b-2 border-black">
        <div className="max-w-7xl mx-auto px-6 py-2 flex items-center gap-2 text-sm font-bold">
          <span className="w-2 h-2 rounded-full bg-black inline-block animate-pulse" />
          Admin olarak giriş yapıldı:
          <span className="font-black">{user?.email}</span>
        </div>
      </div>

      {/* Main Content */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-6 py-8">
        {children}
      </main>
    </div>
  )
}
