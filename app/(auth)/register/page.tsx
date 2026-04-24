'use client'

import { useActionState } from 'react'
import { registerAction } from '@/app/actions/auth'
import Link from 'next/link'

export default function RegisterPage() {
  const [state, formAction, isPending] = useActionState(registerAction, null)

  return (
    <div className="bg-white p-8 brutal-border brutal-shadow">
      <h1 className="text-4xl font-black uppercase mb-6 text-center">Kayıt Ol</h1>
      
      {state?.error && (
        <div className="mb-6 p-4 bg-[var(--brutal-red)] brutal-border font-bold">
          {state.error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-6">
        <div>
          <label className="block font-black uppercase mb-2" htmlFor="username">Kullanıcı Adı</label>
          <input 
            type="text" 
            id="username" 
            name="username" 
            required 
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black transition-colors font-bold"
            placeholder="Kullanıcı Adı"
          />
        </div>

        <div>
          <label className="block font-black uppercase mb-2" htmlFor="email">E-posta</label>
          <input 
            type="email" 
            id="email" 
            name="email" 
            required 
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black transition-colors font-bold"
            placeholder="ornek@email.com"
          />
        </div>

        <div>
          <label className="block font-black uppercase mb-2" htmlFor="password">Şifre</label>
          <input 
            type="password" 
            id="password" 
            name="password" 
            required 
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black transition-colors font-bold"
            placeholder="••••••••"
          />
        </div>

        <button 
          type="submit" 
          disabled={isPending}
          className="mt-4 bg-[var(--brutal-yellow)] p-4 font-black text-xl uppercase brutal-border brutal-shadow brutal-shadow-hover hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-[var(--brutal-yellow)] disabled:hover:text-black disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {isPending ? 'Kayıt Olunuyor...' : 'Kayıt Ol'}
        </button>
      </form>

      <div className="mt-8 text-center font-bold">
        Zaten hesabın var mı?{' '}
        <Link href="/login" className="underline hover:text-[var(--brutal-blue)]">
          Giriş Yap
        </Link>
      </div>
    </div>
  )
}
