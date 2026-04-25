'use server'

import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

export async function updateProfileSettings(prevState: any, formData: FormData) {
  const name = formData.get('name') as string
  const phone = formData.get('phone') as string

  if (!name) {
    return { error: 'Ad Soyad alanı zorunludur.' }
  }

  const supabase = await createClient()

  // Kullanıcı metadata'sını güncelle
  const { error } = await supabase.auth.updateUser({
    data: {
      username: name,
      phone: phone || '',
    }
  })

  if (error) {
    return { error: error.message || 'Profil güncellenirken bir hata oluştu.' }
  }

  revalidatePath('/profil', 'layout')
  revalidatePath('/hastane/profil', 'layout')
  
  return { success: 'Profil başarıyla güncellendi!' }
}

export async function updatePassword(prevState: any, formData: FormData) {
  const password = formData.get('password') as string
  const confirmPassword = formData.get('confirmPassword') as string

  if (!password || password.length < 6) {
    return { error: 'Şifre en az 6 karakter olmalıdır.' }
  }

  if (password !== confirmPassword) {
    return { error: 'Şifreler birbiriyle eşleşmiyor.' }
  }

  const supabase = await createClient()

  const { error } = await supabase.auth.updateUser({
    password: password
  })

  if (error) {
    return { error: error.message || 'Şifre güncellenirken bir hata oluştu.' }
  }

  return { success: 'Şifreniz başarıyla güncellendi!' }
}
