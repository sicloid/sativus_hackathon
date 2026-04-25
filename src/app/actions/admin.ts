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

// ─── Otomatik Görsel Çekme Yardımcısı ─────────────────────────────────────────
async function fetchImageForProduct(name: string): Promise<string | null> {
  try {
    const query = encodeURIComponent(name);
    const res = await fetch(`https://www.bing.com/images/search?q=${query}`, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36' }
    });
    const html = await res.text();
    
    // Bing'in image grid'inden src veya data-src çıkarımı
    const match = html.match(/class="mimg"[^>]*src="([^"]+)"/);
    if (match && match[1].startsWith('http')) {
      return match[1].replace(/&amp;/g, '&');
    }
    const match2 = html.match(/data-src="([^"]+)"/);
    if (match2 && match2[1].startsWith('http')) {
      return match2[1].replace(/&amp;/g, '&');
    }
    return null;
  } catch (e) {
    console.error('Görsel çekilirken hata oluştu:', e);
    return null;
  }
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
  let imageUrl = formData.get('imageUrl') as string

  if (!name || !category || isNaN(price) || !description || isNaN(stockQuantity)) {
    return { error: 'Lütfen tüm zorunlu alanları doldurun.' }
  }

  // Eğer görsel verilmemişse otomatik çek
  if (!imageUrl || imageUrl.trim() === '') {
    const fetchedImg = await fetchImageForProduct(name);
    if (fetchedImg) {
      imageUrl = fetchedImg;
    }
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
  let imageUrl = formData.get('imageUrl') as string

  if (!id || !name || !category || isNaN(price) || !description || isNaN(stockQuantity)) {
    return { error: 'Lütfen tüm zorunlu alanları doldurun.' }
  }

  // Eğer görsel verilmemişse veya rastgele silinmişse, otomatik çek
  if (!imageUrl || imageUrl.trim() === '') {
    const fetchedImg = await fetchImageForProduct(name);
    if (fetchedImg) {
      imageUrl = fetchedImg;
    }
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

// ─── Toplu Ürün Sil ──────────────────────────────────────────────────────────
export async function adminBulkDeleteProducts(ids: string[]) {
  try {
    await requireAdmin()
  } catch {
    return { error: 'Yetkisiz erişim.' }
  }

  if (!ids || ids.length === 0) {
    return { error: 'Silinecek ürün seçilmedi.' }
  }

  try {
    await prisma.product.deleteMany({
      where: { id: { in: ids } }
    })
  } catch {
    return { error: 'Ürünler silinirken bir hata oluştu.' }
  }

  revalidatePath('/urunler')
  revalidatePath('/admin')
  return { success: `${ids.length} ürün başarıyla silindi.` }
}
