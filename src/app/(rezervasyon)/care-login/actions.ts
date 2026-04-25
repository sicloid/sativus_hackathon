'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function loginAction(prevState: any, formData: FormData) {
  const supabase = await createClient()

  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const loginType = formData.get('loginType') as string

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

  const role = data.user?.user_metadata?.role

  if (loginType === 'hekim' && role !== 'vet') {
    await supabase.auth.signOut()
    return { error: 'Bu alana sadece veteriner hekimler giriş yapabilir.' }
  }

  if (loginType === 'hasta' && role === 'vet') {
    await supabase.auth.signOut()
    return { error: 'Hekim hesabıyla hasta portalına giriş yapılamaz. Lütfen Hekim sekmesini kullanın.' }
  }

  revalidatePath('/', 'layout')

  if (loginType === 'hekim') {
    redirect('/hekim')
  } else {
    redirect('/hastane/profil')
  }
}

export async function signupAction(prevState: any, formData: FormData) {
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
        role: 'patient',
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
  redirect('/care-login')
}
