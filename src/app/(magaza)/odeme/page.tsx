import { createClient } from '@/utils/supabase/server'
import { getAddresses } from '@/app/actions/address'
import CheckoutClient from './CheckoutClient'

export const dynamic = 'force-dynamic'

export default async function OdemePage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  // Kayıtlı adresleri sunucu tarafında çek
  const savedAddresses = user ? await getAddresses() : []

  return (
    <CheckoutClient
      savedAddresses={savedAddresses}
      isLoggedIn={!!user}
    />
  )
}
