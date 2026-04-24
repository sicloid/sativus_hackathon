'use client'

import { useActionState, Suspense } from 'react'
import { loginAction } from '@/app/actions/auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

function LoginForm() {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const searchParams = useSearchParams()
  const successMsg = searchParams.get('success')

  return (
    <>
      {successMsg && (
        <div className="mb-6 p-4 bg-[var(--brutal-green)] brutal-border font-bold">
          {successMsg}
        </div>
      )}
      
      {state?.error && (
        <div className="mb-6 p-4 bg-[var(--brutal-red)] brutal-border font-bold">
          {state.error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-6">
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
          className="mt-4 bg-[var(--brutal-green)] p-4 font-black text-xl uppercase brutal-border brutal-shadow brutal-shadow-hover hover:bg-black hover:text-white transition-colors disabled:opacity-50 disabled:hover:bg-[var(--brutal-green)] disabled:hover:text-black disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          {isPending ? 'Giriş Yapılıyor...' : 'Giriş Yap'}
        </button>
      </form>
    </>
  )
}

export default function LoginPage() {
  return (
    <div className="bg-white p-8 brutal-border brutal-shadow">
      <h1 className="text-4xl font-black uppercase mb-6 text-center">Giriş Yap</h1>
      
      <Suspense fallback={<div className="text-center font-bold">Yükleniyor...</div>}>
        <LoginForm />
      </Suspense>

      <div className="mt-8 text-center font-bold">
        Hesabın yok mu?{' '}
        <Link href="/register" className="underline hover:text-[var(--brutal-blue)]">
          Kayıt Ol
        </Link>
      </div>
    </div>
  )
}
