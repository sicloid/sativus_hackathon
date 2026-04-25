'use client'

import { useActionState } from 'react'
import { updatePassword } from '@/app/actions/profile'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function PasswordChangeForm() {
  const [state, formAction, isPending] = useActionState(updatePassword, null)

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mt-4 rounded-2xl mb-8">
      <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Şifre Değiştir</h2>
      
      {state?.error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 font-bold">
          {state.error}
        </div>
      )}
      
      {state?.success && (
        <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 mb-6 font-bold">
          {state.success}
        </div>
      )}

      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="password" className="block font-bold uppercase text-sm mb-2 text-gray-600">Yeni Şifre</label>
          <Input 
            id="password" 
            name="password" 
            type="password"
            required 
            placeholder="En az 6 karakter"
            className="w-full text-lg"
            minLength={6}
          />
        </div>
        <div>
          <label htmlFor="confirmPassword" className="block font-bold uppercase text-sm mb-2 text-gray-600">Yeni Şifre (Tekrar)</label>
          <Input 
            id="confirmPassword" 
            name="confirmPassword" 
            type="password"
            required 
            placeholder="Şifreyi doğrulayın"
            className="w-full text-lg"
            minLength={6}
          />
        </div>
        
        <div className="md:col-span-2 flex mt-4">
          <Button type="submit" disabled={isPending} className="w-full md:w-auto py-3 px-8 text-lg bg-[var(--brutal-blue)] text-white hover:bg-black">
            {isPending ? 'Güncelleniyor...' : 'Şifreyi Değiştir'}
          </Button>
        </div>
      </form>
    </div>
  )
}
