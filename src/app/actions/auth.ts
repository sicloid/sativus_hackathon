'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!email || !password) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'E-posta veya şifre hatalı.' }
  }

  redirect('/urunler')
}

export async function registerAction(prevState: any, formData: FormData) {
  const username = formData.get('username') as string
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  if (!username || !email || !password) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  const supabase = await createClient()

  const { error, data } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        username: username,
      }
    }
  })

  if (error) {
    return { error: error.message || 'Kayıt olurken bir hata oluştu.' }
  }

  // Supabase ayarlarında e-posta doğrulaması kapalıysa doğrudan başarılı kabul edilir.
  redirect('/login?success=Hesabınız oluşturuldu. Lütfen giriş yapın.')
}
