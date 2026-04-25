'use server'

import prisma from '@/lib/prisma'
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

// ─── Ürünleri Listele (Filtreleme ve Arama ile) ───────────────────────────────
export async function getProducts(options: { 
  category?: string, 
  search?: string, 
  sort?: 'price_asc' | 'price_desc' | 'newest' 
} = {}) {
  const { category, search, sort } = options

  const where: any = {
    NOT: { category: 'Reçeteli İlaç' }
  }

  if (category && category !== 'Tümü') {
    where.category = category
  }

  if (search) {
    where.OR = [
      { name: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ]
  }

  let orderBy: any = { createdAt: 'desc' }
  if (sort === 'price_asc') orderBy = { price: 'asc' }
  if (sort === 'price_desc') orderBy = { price: 'desc' }
  if (sort === 'newest') orderBy = { createdAt: 'desc' }

  return prisma.product.findMany({
    where,
    orderBy,
  })
}

// ─── Arama Önerileri Getir (Smart Search) ────────────────────────────────────
export async function getSearchSuggestions(query: string) {
  if (!query || query.length < 2) return []

  return prisma.product.findMany({
    where: {
      name: { contains: query, mode: 'insensitive' },
      NOT: { category: 'Reçeteli İlaç' }
    },
    select: {
      id: true,
      name: true,
      category: true,
    },
    take: 5,
  })
}

// ─── Rastgele Ürün Getir (Upselling) ─────────────────────────────────────────
export async function getRandomProduct() {
  const count = await prisma.product.count({
    where: { NOT: { category: 'Reçeteli İlaç' } }
  })
  const skip = Math.floor(Math.random() * count)
  return prisma.product.findFirst({
    where: { NOT: { category: 'Reçeteli İlaç' } },
    skip: skip,
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
  const productIds = cartItems.map(i => i.productId).filter(id => !id.startsWith('exam-fee-') && !id.startsWith('prescription-'))
  const dbProducts = await prisma.product.findMany({
    where: { id: { in: productIds } },
  })

  const priceMap = new Map(dbProducts.map((p: { id: string; price: number }) => [p.id, p.price]))

  const totalPrice = cartItems.reduce((sum: number, item) => {
    const isVirtual = item.productId.startsWith('exam-fee-') || item.productId.startsWith('prescription-')
    const dbPrice = isVirtual ? item.price : (priceMap.get(item.productId) ?? item.price)
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
        create: cartItems.map(item => {
          const isVirtual = item.productId.startsWith('exam-fee-') || item.productId.startsWith('prescription-')
          return {
            productId: isVirtual ? null : item.productId,
            productName: isVirtual ? item.name : undefined,
            quantity: item.quantity,
            unitPrice: isVirtual ? item.price : (priceMap.get(item.productId) ?? item.price),
          }
        }),
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
  return { success: true, orderId: order.id }
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
