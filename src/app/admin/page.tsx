import { adminGetProducts } from '@/app/actions/admin'
import AdminDashboardClient from './AdminDashboardClient'

export const dynamic = 'force-dynamic'

export default async function AdminPage() {
  const products = await adminGetProducts()

  return <AdminDashboardClient products={products} />
}
