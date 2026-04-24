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

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'Giriş başarısız. Lütfen bilgilerinizi kontrol edin.' }
  }

  // Rol kontrolü — hekim bu portaldan giriş yapamaz
  const role = data.user?.user_metadata?.role
  if (role === 'vet') {
    await supabase.auth.signOut()
    return { error: 'Hekim hesabıyla hasta portalına giriş yapılamaz. Lütfen Hekim Girişi\'ni kullanın.' }
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
    options: {
      data: {
        role: 'patient',  // Hasta portalından kayıt olan = patient
      }
    }
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
