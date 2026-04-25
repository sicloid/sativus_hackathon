'use client'

import { useActionState, Suspense, useState } from 'react'
import { loginAction } from '@/app/actions/auth'
import Link from 'next/link'
import { useSearchParams } from 'next/navigation'

type Tab = 'user' | 'admin'

function LoginForm({ activeTab }: { activeTab: Tab }) {
  const [state, formAction, isPending] = useActionState(loginAction, null)
  const searchParams = useSearchParams()
  const successMsg = searchParams.get('success')

  const isAdmin = activeTab === 'admin'

  return (
    <>
      {successMsg && (
        <div className="mb-6 p-4 bg-[var(--brutal-green)] brutal-border font-bold text-sm">
          ✅ {successMsg}
        </div>
      )}

      {state?.error && (
        <div className="mb-6 p-4 bg-[var(--brutal-red)] brutal-border font-bold text-sm">
          ❌ {state.error}
        </div>
      )}

      <form action={formAction} className="flex flex-col gap-5">
        <input type="hidden" name="loginType" value={activeTab} />
        <div>
          <label className="block font-black uppercase mb-2 text-sm tracking-widest" htmlFor={`email-${activeTab}`}>
            E-posta
          </label>
          <input
            type="email"
            id={`email-${activeTab}`}
            name="email"
            required
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black transition-colors font-bold"
            placeholder={isAdmin ? 'admin@petverse.com' : 'ornek@email.com'}
          />
        </div>

        <div>
          <label className="block font-black uppercase mb-2 text-sm tracking-widest" htmlFor={`password-${activeTab}`}>
            Şifre
          </label>
          <input
            type="password"
            id={`password-${activeTab}`}
            name="password"
            required
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black transition-colors font-bold"
            placeholder="••••••••"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className={`mt-2 p-4 font-black text-xl uppercase brutal-border brutal-shadow brutal-shadow-hover transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            ${isAdmin
              ? 'bg-black text-[var(--brutal-yellow)] hover:bg-[var(--brutal-yellow)] hover:text-black'
              : 'bg-[var(--brutal-green)] text-black hover:bg-black hover:text-white'
            }`}
        >
          {isPending
            ? 'Giriş Yapılıyor...'
            : isAdmin ? '⚡ Admin Girişi' : 'Giriş Yap'}
        </button>
      </form>
    </>
  )
}

function LoginPageInner() {
  const [activeTab, setActiveTab] = useState<Tab>('user')

  return (
    <div className="bg-white brutal-border brutal-shadow overflow-hidden">
      {/* Tab Bar */}
      <div className="flex border-b-2 border-black">
        <button
          id="tab-user"
          onClick={() => setActiveTab('user')}
          className={`flex-1 py-4 font-black uppercase text-sm tracking-widest transition-colors border-r-2 border-black
            ${activeTab === 'user'
              ? 'bg-[var(--brutal-green)] text-black'
              : 'bg-[#f0f0f0] text-gray-500 hover:bg-gray-200'
            }`}
        >
          👤 Kullanıcı Girişi
        </button>
        <button
          id="tab-admin"
          onClick={() => setActiveTab('admin')}
          className={`flex-1 py-4 font-black uppercase text-sm tracking-widest transition-colors
            ${activeTab === 'admin'
              ? 'bg-black text-[var(--brutal-yellow)]'
              : 'bg-[#f0f0f0] text-gray-500 hover:bg-gray-200'
            }`}
        >
          ⚡ Yönetici Girişi
        </button>
      </div>

      {/* Form Alanı */}
      <div className="p-8">
        <h1 className="text-3xl font-black uppercase mb-6 text-center tracking-tight">
          {activeTab === 'user' ? 'Hesabına Giriş Yap' : 'Admin Paneli'}
        </h1>

        {activeTab === 'admin' && (
          <div className="mb-5 p-3 border-2 border-black bg-[var(--brutal-yellow)] text-xs font-bold uppercase tracking-wider">
            ⚠️ Bu alan yalnızca yetkili yöneticilere özeldir.
          </div>
        )}

        <Suspense fallback={<div className="text-center font-bold py-4">Yükleniyor...</div>}>
          <LoginForm activeTab={activeTab} />
        </Suspense>

        {activeTab === 'user' && (
          <div className="mt-6 text-center font-bold text-sm">
            Hesabın yok mu?{' '}
            <Link href="/register" className="underline hover:text-[var(--brutal-blue)]">
              Kayıt Ol
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

export default function LoginPage() {
  return (
    <div className="w-full max-w-md">
      <Suspense fallback={<div className="text-center font-bold py-10">Yükleniyor...</div>}>
        <LoginPageInner />
      </Suspense>
    </div>
  )
}
