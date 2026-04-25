import prisma from '@/lib/prisma'
import UrunlerClient from './UrunlerClient'
import { Product as ProductType } from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

export default async function UrunlerPage() {
  const products = await prisma.product.findMany({
    orderBy: {
      createdAt: 'desc'
    }
  })

  // Prisma modelini ProductCard'ın beklediği tipe dönüştür
  const formattedProducts: ProductType[] = products.map(p => ({
    id: p.id,
    name: p.name,
    description: p.description,
    price: p.price,
    image_url: p.imageUrl || '',
    category: p.category,
    stock_quantity: p.stockQuantity
  }))

  return <UrunlerClient products={formattedProducts} />
}
