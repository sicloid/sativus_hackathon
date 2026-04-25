import { getAddresses } from '@/app/actions/address'
import AdreslerimClient from './AdreslerimClient'

export const dynamic = 'force-dynamic'

export default async function AdreslerimPage() {
  const addresses = await getAddresses()
  return <AdreslerimClient addresses={addresses} />
}
