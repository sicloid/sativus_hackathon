'use server'

import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// ─── Ürünleri Listele ─────────────────────────────────────────────────────────
export async function getProducts(category?: string) {
  const where = category && category !== 'Tümü' ? { category } : {}
  return prisma.product.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  })
}

// ─── Tek Ürün Getir ───────────────────────────────────────────────────────────
export async function getProduct(id: string) {
  return prisma.product.findUnique({ where: { id } })
}

// ─── Sipariş Oluştur ──────────────────────────────────────────────────────────
export async function createOrder(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Sipariş vermek için giriş yapmalısınız.' }
  }

  const fullName = formData.get('fullName') as string
  const phone = formData.get('phone') as string
  const address = formData.get('address') as string
  const city = formData.get('city') as string
  const cartItemsJson = formData.get('cartItems') as string

  if (!fullName || !phone || !address || !city || !cartItemsJson) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  let cartItems: Array<{ productId: string; name: string; price: number; quantity: number }>
  try {
    cartItems = JSON.parse(cartItemsJson)
  } catch {
    return { error: 'Sepet verisi hatalı.' }
  }

  if (cartItems.length === 0) {
    return { error: 'Sepetiniz boş.' }
  }

  // Fiyatları DB'den doğrula (güvenlik)
  const productIds = cartItems.map(i => i.productId)
  const dbProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
  })

  const priceMap = new Map(dbProducts.map((p: { id: string; price: number }) => [p.id, p.price]))

  const totalPrice = cartItems.reduce((sum: number, item) => {
    const dbPrice = priceMap.get(item.productId) ?? item.price
    return sum + dbPrice * item.quantity
  }, 0)

  const tax = totalPrice * 0.20
  const shippingCost = totalPrice > 500 ? 0 : 50

  const order = await prisma.order.create({
    data: {
      userId: user.id,
      totalPrice,
      tax,
      shippingCost,
      fullName,
      phone,
      address,
      city,
      status: 'CONFIRMED',
      items: {
        create: cartItems.map(item => ({
          productId: item.productId,
          quantity: item.quantity,
          unitPrice: priceMap.get(item.productId) ?? item.price,
        })),
      },
    },
  })

  // Stok güncelle
  for (const item of cartItems) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stockQuantity: { decrement: item.quantity } },
    })
  }

  revalidatePath('/urunler')
  revalidatePath('/profil/siparisler')
  redirect('/odeme/basarili')
}

// ─── Kullanıcı Siparişlerini Getir ────────────────────────────────────────────
export async function getUserOrders() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return []

  return prisma.order.findMany({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}

// ─── En Son Siparişi Getir (Ödeme Başarı Sayfası için) ───────────────────────
export async function getLatestOrder() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) return null

  return prisma.order.findFirst({
    where: { userId: user.id },
    include: {
      items: {
        include: { product: true },
      },
    },
    orderBy: { createdAt: 'desc' },
  })
}
