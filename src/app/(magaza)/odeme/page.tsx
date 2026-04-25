import { createClient } from '@/utils/supabase/server'
import { getAddresses } from '@/app/actions/address'
import { getCoupons } from '@/app/actions/store'
import CheckoutClient from './CheckoutClient'

export const dynamic = 'force-dynamic'

export default async function OdemePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Kayıtlı adresleri ve kuponları sunucu tarafında çek
  const savedAddresses = user ? await getAddresses() : []
  const allCoupons = user ? await getCoupons() : []
  const availableCoupons = allCoupons.filter((c: any) => !c.isUsed)

  return (
    <CheckoutClient
      savedAddresses={savedAddresses}
      isLoggedIn={!!user}
      availableCoupons={availableCoupons}
    />
  )
}
