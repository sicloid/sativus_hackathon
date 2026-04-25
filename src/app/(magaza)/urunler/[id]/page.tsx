import { getProduct } from '@/app/actions/store'
import { createClient } from '@/utils/supabase/server'
import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'

export default async function UrunDetayPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  const product = await getProduct(id)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} user={user} />
}
