'use server'

import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// ─── Oturum Kontrolü ─────────────────────────────────────────────────────────
async function requireUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) throw new Error('Bu işlem için giriş yapmalısınız.')
  return user
}

// ─── Adresleri Listele ────────────────────────────────────────────────────────
export async function getAddresses() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  return prisma.address.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'asc' },
  })
}

// ─── Adres Ekle ───────────────────────────────────────────────────────────────
export async function createAddress(prevState: unknown, formData: FormData) {
  let user
  try { user = await requireUser() } catch { return { error: 'Giriş yapmalısınız.' } }

  const title = (formData.get('title') as string)?.trim()
  const fullName = (formData.get('fullName') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const fullAddress = (formData.get('fullAddress') as string)?.trim()
  const city = (formData.get('city') as string)?.trim()

  if (!title || !fullName || !phone || !fullAddress || !city) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  try {
    await prisma.address.create({
      data: { userId: user.id, title, fullName, phone, fullAddress, city },
    })
  } catch {
    return { error: 'Adres eklenirken bir hata oluştu.' }
  }

  revalidatePath('/profil/adreslerim')
  return { success: 'Adres başarıyla eklendi.' }
}

// ─── Adres Güncelle ───────────────────────────────────────────────────────────
export async function updateAddress(prevState: unknown, formData: FormData) {
  let user
  try { user = await requireUser() } catch { return { error: 'Giriş yapmalısınız.' } }

  const id = formData.get('id') as string
  const title = (formData.get('title') as string)?.trim()
  const fullName = (formData.get('fullName') as string)?.trim()
  const phone = (formData.get('phone') as string)?.trim()
  const fullAddress = (formData.get('fullAddress') as string)?.trim()
  const city = (formData.get('city') as string)?.trim()

  if (!id || !title || !fullName || !phone || !fullAddress || !city) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  try {
    // Sadece kendi adresini güncelleyebilsin
    const existing = await prisma.address.findFirst({ where: { id, userId: user.id } })
    if (!existing) return { error: 'Adres bulunamadı.' }

    await prisma.address.update({
      where: { id },
      data: { title, fullName, phone, fullAddress, city },
    })
  } catch {
    return { error: 'Adres güncellenirken bir hata oluştu.' }
  }

  revalidatePath('/profil/adreslerim')
  return { success: 'Adres başarıyla güncellendi.' }
}

// ─── Adres Sil ────────────────────────────────────────────────────────────────
export async function deleteAddress(id: string) {
  let user
  try { user = await requireUser() } catch { return { error: 'Giriş yapmalısınız.' } }

  try {
    // Sadece kendi adresini silebilsin (güvenlik)
    const existing = await prisma.address.findFirst({ where: { id, userId: user.id } })
    if (!existing) return { error: 'Adres bulunamadı.' }

    await prisma.address.delete({ where: { id } })
  } catch {
    return { error: 'Adres silinirken bir hata oluştu.' }
  }

  revalidatePath('/profil/adreslerim')
  return { success: 'Adres silindi.' }
}
