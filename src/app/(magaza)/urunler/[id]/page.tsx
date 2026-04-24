import { getProduct } from '@/app/actions/store'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

export default async function UrunDetayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
}
