'use client'

import { createClient } from '@/utils/supabase/client'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function HekimPanelPage() {
  const supabase = createClient()
  const router = useRouter()
  const [user, setUser] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const checkUser = async () => {
      const { data: { user: currentUser } } = await supabase.auth.getUser()
      if (!currentUser) {
        router.push('/hekim-login')
      } else {
        setUser(currentUser)
      }
      setLoading(false)
    }
    checkUser()
  }, [router, supabase])

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.push('/hekim-login')
  }

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdfdfd]">
      <div className="animate-bounce font-black text-4xl uppercase tracking-widest text-zinc-300">Yükleniyor...</div>
    </div>
  )
  
  if (!user) return null

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-black font-sans pb-20 p-4 sm:p-6 lg:p-10">
      {/* TOP BAR */}
      <div className="max-w-7xl mx-auto mb-12 flex flex-col sm:flex-row items-center justify-between gap-6 bg-white border-4 border-black p-6 sm:p-8 rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter flex items-center gap-4">
          <span className="text-4xl sm:text-5xl">👨‍⚕️</span> Hekim Paneli
        </h1>
        <button 
          onClick={handleSignOut}
          className="w-full sm:w-auto bg-black text-white px-10 py-4 rounded-2xl font-black uppercase text-lg hover:bg-rose-600 transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.3)] active:translate-y-1 active:shadow-none"
        >
          Çıkış Yap
        </button>
      </div>

      <div className="max-w-7xl mx-auto space-y-12">
        {/* WELCOME CARD */}
        <div className="bg-white border-4 border-black rounded-[3rem] shadow-[16px_16px_0px_0px_rgba(0,0,0,1)] p-12 sm:p-20 text-center relative overflow-hidden group hover:-translate-y-1 transition-transform">
           {/* Decorative elements */}
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-100 rounded-bl-[100%] opacity-50"></div>
           <div className="absolute bottom-0 left-0 w-24 h-24 bg-rose-100 rounded-tr-[100%] opacity-50"></div>
           
           <div className="text-8xl sm:text-9xl mb-8 group-hover:scale-110 transition-transform duration-500">🩺</div>
           <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter mb-6 leading-tight">
             Hoş Geldin, <br className="sm:hidden" />
             <span className="text-blue-600 break-words">{user.email}</span>
           </h2>
           <p className="font-bold text-zinc-500 text-xl sm:text-2xl italic">Bugünün randevuları yükleniyor...</p>
        </div>

        {/* APPOINTMENT GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
           {/* KARAMEL */}
           <div className="bg-green-50 border-4 border-black rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all group">
             <div className="flex justify-between items-start mb-6">
                <span className="text-4xl group-hover:rotate-12 transition-transform">🐕</span>
                <span className="bg-white border-2 border-black px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Aşı</span>
             </div>
             <p className="font-black text-3xl sm:text-4xl uppercase tracking-tighter mb-2">Karamel</p>
             <p className="font-bold text-zinc-600 text-lg">Aşı Takvimi</p>
             <div className="mt-8 pt-6 border-t-4 border-black flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-zinc-400">Saat</span>
                  <span className="font-black text-2xl">10:00</span>
                </div>
                <div className="h-10 w-10 bg-black text-white rounded-xl flex items-center justify-center font-black">✓</div>
             </div>
           </div>

           {/* PAMUK */}
           <div className="bg-green-50 border-4 border-black rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all group">
             <div className="flex justify-between items-start mb-6">
                <span className="text-4xl group-hover:rotate-12 transition-transform">🐈</span>
                <span className="bg-white border-2 border-black px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Kontrol</span>
             </div>
             <p className="font-black text-3xl sm:text-4xl uppercase tracking-tighter mb-2">Pamuk</p>
             <p className="font-bold text-zinc-600 text-lg">Genel Kontrol</p>
             <div className="mt-8 pt-6 border-t-4 border-black flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-zinc-400">Saat</span>
                  <span className="font-black text-2xl">11:30</span>
                </div>
                <div className="h-10 w-10 bg-black text-white rounded-xl flex items-center justify-center font-black">✓</div>
             </div>
           </div>

           {/* BONCUK */}
           <div className="bg-green-50 border-4 border-black rounded-[2.5rem] p-10 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-2 transition-all group">
             <div className="flex justify-between items-start mb-6">
                <span className="text-4xl group-hover:rotate-12 transition-transform">🐰</span>
                <span className="bg-white border-2 border-black px-4 py-1 rounded-full text-[10px] font-black uppercase shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">Ağız Sağlığı</span>
             </div>
             <p className="font-black text-3xl sm:text-4xl uppercase tracking-tighter mb-2">Boncuk</p>
             <p className="font-bold text-zinc-600 text-lg">Diş Temizliği</p>
             <div className="mt-8 pt-6 border-t-4 border-black flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-[10px] font-black uppercase text-zinc-400">Saat</span>
                  <span className="font-black text-2xl">14:00</span>
                </div>
                <div className="h-10 w-10 bg-black text-white rounded-xl flex items-center justify-center font-black">✓</div>
             </div>
           </div>
        </div>
      </div>
    </div>
  )
}
