'use server'

import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { revalidatePath } from 'next/cache'

// ─── Yetki Kontrolü ──────────────────────────────────────────────────────────
async function requireAdmin() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const role = user?.user_metadata?.role as string | undefined

  if (!user || role !== 'admin') {
    throw new Error('Bu işlem için admin yetkisi gereklidir.')
  }

  return user
}

// ─── Tüm Ürünleri Listele (Admin) ────────────────────────────────────────────
export async function adminGetProducts() {
  await requireAdmin()
  return prisma.product.findMany({
    orderBy: { createdAt: 'desc' },
  })
}

// ─── Ürün Ekle ────────────────────────────────────────────────────────────────
export async function adminCreateProduct(prevState: unknown, formData: FormData) {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Yetkisiz erişim.' }
  }

  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string
  const stockQuantity = parseInt(formData.get('stockQuantity') as string, 10)
  const imageUrl = formData.get('imageUrl') as string

  if (!name || !category || isNaN(price) || !description || isNaN(stockQuantity)) {
    return { error: 'Lütfen tüm zorunlu alanları doldurun.' }
  }

  try {
    await prisma.product.create({
      data: {
        name,
        category,
        price,
        description,
        stockQuantity,
        imageUrl: imageUrl || null,
      },
    })
  } catch {
    return { error: 'Ürün oluşturulurken bir hata oluştu.' }
  }

  revalidatePath('/urunler')
  revalidatePath('/admin')
  return { success: `"${name}" başarıyla eklendi.` }
}

// ─── Ürün Güncelle ────────────────────────────────────────────────────────────
export async function adminUpdateProduct(prevState: unknown, formData: FormData) {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Yetkisiz erişim.' }
  }

  const id = formData.get('id') as string
  const name = formData.get('name') as string
  const category = formData.get('category') as string
  const price = parseFloat(formData.get('price') as string)
  const description = formData.get('description') as string
  const stockQuantity = parseInt(formData.get('stockQuantity') as string, 10)
  const imageUrl = formData.get('imageUrl') as string

  if (!id || !name || !category || isNaN(price) || !description || isNaN(stockQuantity)) {
    return { error: 'Lütfen tüm zorunlu alanları doldurun.' }
  }

  try {
    await prisma.product.update({
      where: { id },
      data: {
        name,
        category,
        price,
        description,
        stockQuantity,
        imageUrl: imageUrl || null,
      },
    })
  } catch {
    return { error: 'Ürün güncellenirken bir hata oluştu.' }
  }

  revalidatePath('/urunler')
  revalidatePath('/admin')
  return { success: `"${name}" başarıyla güncellendi.` }
}

// ─── Ürün Sil ─────────────────────────────────────────────────────────────────
export async function adminDeleteProduct(id: string) {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Yetkisiz erişim.' }
  }

  try {
    await prisma.product.delete({ where: { id } })
  } catch {
    return { error: 'Ürün silinirken bir hata oluştu.' }
  }

  revalidatePath('/urunler')
  revalidatePath('/admin')
  return { success: 'Ürün başarıyla silindi.' }
}
