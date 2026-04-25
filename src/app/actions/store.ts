'use server'

import { prisma } from '@/lib/prisma'
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
  return prisma.product.findUnique({ 
    where: { id },
    include: {
      reviews: {
        orderBy: { createdAt: 'desc' }
      },
      questions: {
        where: { status: 'answered' },
        orderBy: { createdAt: 'desc' }
      }
    }
  })
}

// ─── Soru Sor ────────────────────────────────────────────────────────────────
export async function askQuestion(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Soru sormak için giriş yapmalısınız.' }
  }

  const productId = formData.get('productId') as string
  const questionText = formData.get('questionText') as string

  if (!productId || !questionText) {
    return { error: 'Lütfen sorunuzu yazın.' }
  }

  try {
    await prisma.productQuestion.create({
      data: {
        productId,
        userId: user.id,
        userEmail: user.email!,
        questionText,
        status: 'pending'
      }
    })

    revalidatePath(`/urunler/${productId}`)
    return { success: true }
  } catch (err) {
    console.error('Ask question error:', err)
    return { error: 'Soru gönderilirken bir hata oluştu.' }
  }
}

// ─── Ürün Yorumu Ekle ─────────────────────────────────────────────────────────
export async function addReview(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    return { error: 'Yorum yapmak için giriş yapmalısınız.' }
  }

  const productId = formData.get('productId') as string
  const rating = parseInt(formData.get('rating') as string)
  const comment = formData.get('comment') as string
  const userName = user.user_metadata?.full_name || user.email?.split('@')[0] || 'Kullanıcı'

  if (!productId || !rating || !comment) {
    return { error: 'Lütfen tüm alanları doldurun.' }
  }

  try {
    await prisma.review.create({
      data: {
        productId,
        userId: user.id,
        userName,
        rating,
        comment,
      },
    })

    revalidatePath(`/urunler/${productId}`)
    return { success: true }
  } catch (err) {
    console.error('Review error:', err)
    return { error: 'Yorum kaydedilirken bir hata oluştu.' }
  }
}

// ─── Soru Cevapla (Admin) ─────────────────────────────────────────────────────
export async function answerQuestion(formData: FormData) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Admin kontrolü (burada basitçe e-posta veya loginType üzerinden yapılabilir)
  // Mevcut yapıda loginAction admin kontrolü yapıyor, burada da benzer bir güvenlik olmalı
  // Örn: if (user.email !== 'admin@petverse.com') return { error: 'Yetkisiz erişim.' }

  const questionId = formData.get('questionId') as string
  const answerText = formData.get('answerText') as string

  if (!questionId || !answerText) {
    return { error: 'Lütfen cevabı yazın.' }
  }

  try {
    await prisma.productQuestion.update({
      where: { id: questionId },
      data: {
        answerText,
        status: 'answered'
      }
    })

    revalidatePath('/admin/sorular')
    return { success: true }
  } catch (err) {
    console.error('Answer question error:', err)
    return { error: 'Cevap kaydedilirken bir hata oluştu.' }
  }
}

// ─── Kullanıcı Sorularını Getir ───────────────────────────────────────────────
export async function getUserQuestions() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  return prisma.productQuestion.findMany({
    where: { userId: user.id },
    include: { product: true },
    orderBy: { createdAt: 'desc' }
  })
}

// ─── Admin Sorularını Getir ──────────────────────────────────────────────────
export async function getAdminQuestions(status?: string) {
  return prisma.productQuestion.findMany({
    where: status ? { status } : {},
    include: { product: true },
    orderBy: { createdAt: 'desc' }
  })
}

// ─── Kullanıcı Sipariş Sayısını Getir ─────────────────────────────────────────
export async function getUserOrderCount() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return 0

  return prisma.order.count({
    where: { userId: user.id }
  })
}

// ─── Kuponları Getir ──────────────────────────────────────────────────────────
export async function getCoupons() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return []

  // Sistemdeki aktif kuponları getir
  if (!prisma || !(prisma as any).coupon) {
    console.error("PRISMA ERROR: coupon model is missing from prisma client")
    return []
  }

  const coupons = await (prisma as any).coupon.findMany({
    where: { isActive: true },
    orderBy: { discountPercent: 'desc' }
  })

  // Kullanıcının hangilerini kullandığını işaretle
  if (!(prisma as any).usedCoupon) return coupons.map(c => ({ ...c, isUsed: false }))

  const usedCoupons = await (prisma as any).usedCoupon.findMany({
    where: { userId: user.id },
    select: { couponId: true }
  })

  const usedIds = usedCoupons.map(uc => uc.couponId)

  return coupons.map(c => ({
    ...c,
    isUsed: usedIds.includes(c.id)
  }))
}

// ─── Kupon Doğrula ───────────────────────────────────────────────────────────
export async function validateCoupon(code: string) {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Giriş yapmalısınız.' }

  const coupon = await prisma.coupon.findUnique({
    where: { code: code.toUpperCase() }
  })

  if (!coupon || !coupon.isActive) {
    return { error: 'Geçersiz veya süresi dolmuş kupon kodu.' }
  }

  const alreadyUsed = await prisma.usedCoupon.findUnique({
    where: {
      userId_couponId: {
        userId: user.id,
        couponId: coupon.id
      }
    }
  })

  if (alreadyUsed) {
    return { error: 'Bu kuponu daha önce kullandınız.' }
  }

  return { success: true, coupon }
}

// ─── Sipariş Oluştur (Kupon Destekli) ──────────────────────────────────────────
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
  const couponId = formData.get('couponId') as string // Kupon ID

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

  const priceMap = new Map(dbProducts.map((p: any) => [p.id, p.price]))

  let totalPrice = cartItems.reduce((sum: number, item) => {
    const isVirtual = item.productId.startsWith('exam-fee-') || item.productId.startsWith('prescription-')
    const dbPrice = isVirtual ? item.price : (priceMap.get(item.productId) ?? item.price)
    return sum + dbPrice * item.quantity
  }, 0)

  // Kupon İndirimi
  if (couponId) {
    const coupon = await prisma.coupon.findUnique({ where: { id: couponId } })
    if (coupon && coupon.isActive) {
      const discount = (totalPrice * coupon.discountPercent) / 100
      totalPrice -= discount
    }
  }

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

  // Kuponu kullanıldı olarak işaretle
  if (couponId) {
    await prisma.usedCoupon.create({
      data: {
        userId: user.id,
        couponId,
        orderId: order.id
      }
    })
  }

  // Stok güncelle
  for (const item of cartItems) {
    await prisma.product.update({
      where: { id: item.productId },
      data: { stockQuantity: { decrement: item.quantity } },
    })
  }

  revalidatePath('/urunler')
  revalidatePath('/profil/siparisler')
  revalidatePath('/profil')
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
