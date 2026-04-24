'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'E-posta ve şifre gereklidir.' }
  }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.' }
  }

  revalidatePath('/', 'layout')
  redirect('/hastane/profil')
}

export async function signup(formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!email || !password) {
    return { error: 'E-posta ve şifre gereklidir.' }
  }

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return { error: 'Kayıt başarısız. Lütfen tekrar deneyin.' }
  }

  revalidatePath('/', 'layout')
  redirect('/hastane/profil')
}

export async function logout() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  
  revalidatePath('/', 'layout')
  redirect('/hasta-login')
}
