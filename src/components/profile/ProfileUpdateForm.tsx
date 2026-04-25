'use client'

import { useActionState, useEffect } from 'react'
import { updateProfileSettings } from '@/app/actions/profile'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

interface ProfileUpdateFormProps {
  initialName: string;
  initialPhone: string;
  email: string;
}

export default function ProfileUpdateForm({ initialName, initialPhone, email }: ProfileUpdateFormProps) {
  const [state, formAction, isPending] = useActionState(updateProfileSettings, null)

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mt-4 rounded-2xl mb-8">
      <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Kişisel Bilgiler</h2>
      
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
          <label className="block font-bold uppercase text-sm mb-2 text-gray-600">E-Posta (Değiştirilemez)</label>
          <p className="font-black text-xl p-3 bg-gray-200 border-4 border-black rounded-xl text-gray-500 select-none">
            {email}
          </p>
        </div>
        <div>
          <label htmlFor="name" className="block font-bold uppercase text-sm mb-2 text-gray-600">Ad Soyad</label>
          <Input 
            id="name" 
            name="name" 
            defaultValue={initialName} 
            required 
            placeholder="Adınız Soyadınız"
            className="w-full text-lg"
          />
        </div>
        <div>
          <label htmlFor="phone" className="block font-bold uppercase text-sm mb-2 text-gray-600">Telefon Numarası</label>
          <Input 
            id="phone" 
            name="phone" 
            defaultValue={initialPhone} 
            placeholder="05XX XXX XX XX"
            className="w-full text-lg"
          />
        </div>
        
        <div className="md:col-span-2 flex mt-4">
          <Button type="submit" disabled={isPending} className="w-full md:w-auto py-3 px-8 text-lg">
            {isPending ? 'Güncelleniyor...' : 'Bilgileri Güncelle'}
          </Button>
        </div>
      </form>
    </div>
  )
}
