/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  
  if (!email || !password) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  const supabase = await createClient()

  // Önceki oturumu temizle (hatalı deneme sonrası kalan zombie session'ı önler)
  await supabase.auth.signOut()

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return { error: 'E-posta veya şifre hatalı.' }
  }

  // Rol kontrolü: admin → /admin, diğerleri → /urunler
  const { data: { user } } = await supabase.auth.getUser()
  const role = user?.user_metadata?.role as string | undefined

  revalidatePath('/', 'layout')

  if (role === 'admin') {
    redirect('/admin')
  } else {
    redirect('/urunler')
  }
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
        role: 'store_customer',
      }
    }
  })

  if (error) {
    return { error: error.message || 'Kayıt olurken bir hata oluştu.' }
  }

  redirect('/login?success=Hesabınız oluşturuldu. Lütfen giriş yapın.')
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/urunler')
}
