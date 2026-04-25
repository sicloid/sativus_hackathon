/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use server'

import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'
import { prisma } from '@/lib/prisma'

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
    let errorMsg = error.message;
    if (error.code === 'over_email_send_rate_limit') {
      errorMsg = 'Çok fazla kayıt isteği gönderildi. Lütfen daha sonra tekrar deneyin veya Supabase üzerinden "Confirm Email" ayarını kapatın.';
    }
    return { error: errorMsg || 'Kayıt olurken bir hata oluştu.' }
  }

  if (!data.session) {
    return { error: 'Kayıt başarılı! Lütfen e-posta adresinize gönderilen onay linkine tıklayın.' }
  }

  revalidatePath('/', 'layout')
  redirect('/urunler')
}

export async function logoutAction() {
  const supabase = await createClient()
  await supabase.auth.signOut()
  revalidatePath('/', 'layout')
  redirect('/')
}

export async function deleteAccountAction() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  
  if (!user) {
    redirect('/login')
  }

  const userId = user.id

  try {
    // 1. Prisma verilerini temizle (Bağımlılık sırasına göre)
    
    // Yorumlar ve Sorular
    await prisma.review.deleteMany({ where: { userId } })
    await prisma.productQuestion.deleteMany({ where: { userId } })
    
    // Kupon kullanım kayıtları
    await prisma.usedCoupon.deleteMany({ where: { userId } })
    
    // Evcil Hayvanlar (Aşı ve Reçeteler cascade delete ise otomatik silinir, değilse manuel silinmeli)
    // schema.prisma'da Vaccination ve Prescription petId üzerinden Cascade ile bağlı.
    await prisma.pet.deleteMany({ where: { userId } })
    
    // Adresler
    await prisma.address.deleteMany({ where: { userId } })

    // Siparişler
    // Sipariş kalemleri (OrderItem) orderId üzerinden Cascade ile bağlı.
    await prisma.order.deleteMany({ where: { userId } })

    // 2. Supabase Oturumunu Kapat
    await supabase.auth.signOut()
    
    // NOT: Auth admin delete için service_role gerekir. 
    // DB temizliği ve logout kullanıcı için "hesap silindi" etkisini yaratır.
  } catch (error) {
    console.error('Hesap silme hatası:', error)
    // Hata olsa bile oturumu kapatıp ana sayfaya atalım
    await supabase.auth.signOut()
  }

  revalidatePath('/', 'layout')
  redirect('/')
}
