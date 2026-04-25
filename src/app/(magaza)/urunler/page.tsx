import { getProducts } from '@/app/actions/store'
import UrunlerClient from './UrunlerClient'
import { Product as ProductType } from '@/components/ProductCard'

export const dynamic = 'force-dynamic'

interface PageProps {
  searchParams: Promise<{
    kategori?: string;
    ara?: string;
    sirala?: string;
  }>;
}

export default async function UrunlerPage({ searchParams }: PageProps) {
  const params = await searchParams
  
  const category = params.kategori
  const search = params.ara
  const sort = params.sirala as any

  const products = await getProducts({ 
    category, 
    search, 
    sort 
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

  return <UrunlerClient initialProducts={formattedProducts} />
}
