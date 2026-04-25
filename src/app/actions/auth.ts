/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

export async function loginAction(prevState: any, formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string
  const loginType = formData.get('loginType') as string
  
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

  // Rol kontrolü
  const { data: { user } } = await supabase.auth.getUser()
  const role = user?.user_metadata?.role as string | undefined

  // ── Yönetici sekmesiyle giriş ──────────────────────────────────────────────
  if (loginType === 'admin') {
    // Admin değilse oturumu kapat ve hata döndür
    if (role !== 'admin') {
      await supabase.auth.signOut()
      return { error: 'Bu alana sadece yetkili yöneticiler giriş yapabilir.' }
    }
    // Admin ise panele yönlendir
    revalidatePath('/', 'layout')
    redirect('/admin')
  }

  // ── Kullanıcı sekmesiyle giriş ────────────────────────────────────────────
  // Admin hesabı kullanıcı sekmesiyle giriş yaparsa /urunler'e gider, /admin'e giremez
  revalidatePath('/', 'layout')
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
  redirect('/')
}
