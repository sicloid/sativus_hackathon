'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function loginHekim(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'E-posta ve şifre gereklidir.' }
  }

  // Önceki oturumu temizle (zombie session önleme)
  await supabase.auth.signOut()

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.' }
  }

  // Rol kontrolü — sadece vet ve admin giriş yapabilir
  const role = data.user?.user_metadata?.role
  if (role !== 'vet' && role !== 'admin') {
    await supabase.auth.signOut()
    return { error: 'Bu portal yalnızca veteriner hekimler içindir. Hasta girişi için PetVerse Care\'i kullanın.' }
  }

  revalidatePath('/', 'layout')
  redirect('/hekim')
}
