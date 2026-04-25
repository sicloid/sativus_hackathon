'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Package, MessageSquare, LayoutDashboard, LogOut } from 'lucide-react'

const NAV_ITEMS = [
  { name: 'Ürün Yönetimi', path: '/admin', icon: Package },
  { name: 'Gelen Sorular', path: '/admin/sorular', icon: MessageSquare },
]

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()

  return (
    <div className="min-h-screen bg-[#f0f0f0] flex">
      {/* Sidebar */}
      <aside className="w-64 bg-black text-white p-6 flex flex-col gap-8 sticky top-0 h-screen overflow-y-auto">
        <div className="flex items-center gap-3 border-b border-gray-800 pb-6">
          <div className="w-10 h-10 bg-[var(--brutal-yellow)] brutal-border flex items-center justify-center">
            <LayoutDashboard className="text-black" size={24} />
          </div>
          <span className="font-black uppercase tracking-tighter text-xl">Admin Panel</span>
        </div>

        <nav className="flex-grow flex flex-col gap-2">
          {NAV_ITEMS.map((item) => {
            const isActive = pathname === item.path
            return (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center gap-3 p-4 font-black uppercase text-sm transition-all brutal-border
                  ${isActive 
                    ? 'bg-[var(--brutal-yellow)] text-black brutal-shadow translate-x-2' 
                    : 'bg-zinc-900 hover:bg-zinc-800 hover:translate-x-1'
                  }`}
              >
                <item.icon size={20} />
                {item.name}
              </Link>
            )
          })}
        </nav>

        <div className="border-t border-gray-800 pt-6 space-y-3">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 font-black uppercase text-sm bg-white text-black brutal-border hover:bg-[var(--brutal-yellow)] transition-all"
          >
            <LayoutDashboard size={20} /> Mağazaya Git
          </Link>
          <button
            onClick={async () => {
              const { logoutAction } = await import('@/app/actions/auth')
              await logoutAction()
            }}
            className="w-full flex items-center gap-3 p-4 font-black uppercase text-sm bg-[var(--brutal-red)] text-white brutal-border hover:bg-black transition-all"
          >
            <LogOut size={20} /> Hesaptan Çık
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow">
        <div className="p-8">
          {children}
        </div>
      </main>
    </div>
  )
}
