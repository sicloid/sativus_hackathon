'use client'

import { useActionState, useState, useEffect } from 'react'
import {
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
  adminBulkDeleteProducts,
} from '@/app/actions/admin'
import { Trash2, Edit, Plus, CheckSquare, Square } from 'lucide-react'

// Prisma'nın döndürdüğü Product tipiyle eşleşen tip
interface Product {
  id: string
  name: string
  description: string
  price: number
  imageUrl: string | null
  category: string
  stockQuantity: number
}

const CATEGORIES = [
  'Kedi', 
  'Köpek', 
  'Kuş', 
  'Balık', 
  'Kemirgen', 
  'Mama', 
  'Aksesuar', 
  'Sağlık', 
  'Oyuncak', 
  'Bakım', 
  'Diğer'
]

// ─── Silme Butonu ─────────────────────────────────────────────────────────────
function DeleteButton({ productId, productName }: { productId: string; productName: string }) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (!confirm(`"${productName}" ürününü kalıcı olarak silmek istediğinize emin misiniz?`)) return
    setPending(true)
    setError(null)
    const result = await adminDeleteProduct(productId)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
  }

  return (
    <div>
      {error && <p className="text-xs text-red-700 font-bold mb-1">{error}</p>}
      <button
        id={`delete-product-${productId}`}
        onClick={handleDelete}
        disabled={pending}
        className="px-3 py-1.5 bg-[var(--brutal-red)] text-black font-black text-xs uppercase brutal-border hover:bg-red-500 hover:text-white transition-colors disabled:opacity-50 brutal-shadow brutal-shadow-hover"
      >
        {pending ? '...' : <Trash2 size={14} />}
      </button>
    </div>
  )
}

// ─── Ürün Formu ───────────────────────────────────────────────────────────────
interface ProductFormProps {
  editingProduct: Product | null
  onCancel: () => void
}

function ProductForm({ editingProduct, onCancel }: ProductFormProps) {
  const isEditing = !!editingProduct
  const action = isEditing ? adminUpdateProduct : adminCreateProduct
  const [state, formAction, isPending] = useActionState(action, null)

  useEffect(() => {
    if (state?.success) {
      const timer = setTimeout(() => onCancel(), 1200)
      return () => clearTimeout(timer)
    }
  }, [state?.success, onCancel])

  return (
    <div className="bg-white brutal-border brutal-shadow p-6">
      <h2 className="text-xl font-black uppercase mb-5 border-b-2 border-black pb-3">
        {isEditing ? `✏️ Düzenle: ${editingProduct.name}` : '➕ Yeni Ürün Ekle'}
      </h2>

      {state?.error && <div className="mb-4 p-3 bg-[var(--brutal-red)] brutal-border font-bold text-sm">❌ {state.error}</div>}
      {state?.success && <div className="mb-4 p-3 bg-[var(--brutal-green)] brutal-border font-bold text-sm">✅ {state.success}</div>}

      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {isEditing && <input type="hidden" name="id" value={editingProduct.id} />}
        <div className="md:col-span-2">
          <label className="block font-black text-xs uppercase mb-1 tracking-widest">Ürün Adı *</label>
          <input name="name" type="text" required defaultValue={editingProduct?.name ?? ''} className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors" />
        </div>
        <div>
          <label className="block font-black text-xs uppercase mb-1 tracking-widest">Kategori *</label>
          <select name="category" required defaultValue={editingProduct?.category ?? ''} className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors appearance-none">
            <option value="" disabled>Seçin...</option>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div>
          <label className="block font-black text-xs uppercase mb-1 tracking-widest">Fiyat (₺) *</label>
          <input name="price" type="number" step="0.01" min="0" required defaultValue={editingProduct?.price ?? ''} className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors" />
        </div>
        <div>
          <label className="block font-black text-xs uppercase mb-1 tracking-widest">Stok Adedi *</label>
          <input name="stockQuantity" type="number" min="0" required defaultValue={editingProduct?.stockQuantity ?? 0} className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors" />
        </div>
        <div>
          <label className="block font-black text-xs uppercase mb-1 tracking-widest">Görsel URL</label>
          <input name="imageUrl" type="url" defaultValue={editingProduct?.imageUrl ?? ''} className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors" />
        </div>
        <div className="md:col-span-2">
          <label className="block font-black text-xs uppercase mb-1 tracking-widest">Açıklama *</label>
          <textarea name="description" required rows={3} defaultValue={editingProduct?.description ?? ''} className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors resize-none" />
        </div>
        <div className="md:col-span-2 flex gap-3">
          <button type="submit" disabled={isPending} className="flex-1 py-3 bg-black text-[var(--brutal-yellow)] font-black text-sm uppercase tracking-widest brutal-border brutal-shadow brutal-shadow-hover hover:bg-[var(--brutal-yellow)] hover:text-black transition-colors disabled:opacity-50">
            {isPending ? 'Kaydediliyor...' : isEditing ? '💾 Güncelle' : '➕ Ürün Ekle'}
          </button>
          <button type="button" onClick={onCancel} className="px-6 py-3 bg-white text-black font-black text-sm uppercase tracking-widest brutal-border hover:bg-gray-100 transition-colors">İptal</button>
        </div>
      </form>
    </div>
  )
}

// ─── Ana Dashboard Bileşeni ───────────────────────────────────────────────────
export default function AdminDashboardClient({ products }: { products: Product[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [selectedIds, setSelectedIds] = useState<string[]>([])
  const [isBulkDeleting, setIsBulkDeleting] = useState(false)

  function handleEdit(product: Product) {
    setEditingProduct(product)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleAddNew() {
    setEditingProduct(null)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleCancel() {
    setShowForm(false)
    setEditingProduct(null)
  }

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id])
  }

  const toggleSelectAll = () => {
    if (selectedIds.length === products.length) setSelectedIds([])
    else setSelectedIds(products.map(p => p.id))
  }

  const handleBulkDelete = async () => {
    if (!confirm(`${selectedIds.length} ürünü silmek istediğinize emin misiniz?`)) return
    setIsBulkDeleting(true)
    const result = await adminBulkDeleteProducts(selectedIds)
    setIsBulkDeleting(false)
    if (result.success) {
      setSelectedIds([])
    }
  }

  return (
    <div className="space-y-8">
      {/* Form Alanı */}
      {showForm ? (
        <ProductForm editingProduct={editingProduct} onCancel={handleCancel} />
      ) : (
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Ürün Yönetimi</h1>
            <p className="font-bold text-gray-600 mt-1">Toplam {products.length} ürün</p>
          </div>
          <div className="flex gap-3">
            {selectedIds.length > 0 && (
              <button
                onClick={handleBulkDelete}
                disabled={isBulkDeleting}
                className="px-6 py-3 bg-[var(--brutal-red)] text-white font-black text-sm uppercase tracking-widest brutal-border brutal-shadow brutal-shadow-hover hover:bg-black transition-all disabled:opacity-50"
              >
                {isBulkDeleting ? '...' : `🗑 Seçilenleri Sil (${selectedIds.length})`}
              </button>
            )}
            <button
              onClick={handleAddNew}
              className="px-6 py-3 bg-black text-[var(--brutal-yellow)] font-black text-sm uppercase tracking-widest brutal-border brutal-shadow brutal-shadow-hover hover:bg-[var(--brutal-yellow)] hover:text-black transition-colors"
            >
              <Plus size={18} className="inline mr-2" /> Yeni Ürün Ekle
            </button>
          </div>
        </div>
      )}

      {/* Ürün Tablosu */}
      <div className="bg-white brutal-border brutal-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black text-white">
                <th className="p-4 w-12">
                  <button onClick={toggleSelectAll} className="text-white hover:text-[var(--brutal-yellow)] transition-colors">
                    {selectedIds.length === products.length && products.length > 0 ? <CheckSquare size={20} /> : <Square size={20} />}
                  </button>
                </th>
                <th className="text-left p-4 font-black uppercase tracking-wider">Görsel</th>
                <th className="text-left p-4 font-black uppercase tracking-wider">Ürün Adı</th>
                <th className="text-left p-4 font-black uppercase tracking-wider">Kategori</th>
                <th className="text-left p-4 font-black uppercase tracking-wider">Fiyat</th>
                <th className="text-left p-4 font-black uppercase tracking-wider">Stok</th>
                <th className="text-left p-4 font-black uppercase tracking-wider">İşlemler</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr><td colSpan={7} className="p-8 text-center font-bold text-gray-500">Henüz ürün yok.</td></tr>
              ) : (
                products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b-2 border-black hover:bg-[var(--brutal-yellow)]/20 transition-colors ${
                      selectedIds.includes(product.id) ? 'bg-[var(--brutal-yellow)]/30' : index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                    }`}
                  >
                    <td className="p-3 text-center">
                      <button onClick={() => toggleSelect(product.id)} className="transition-colors">
                        {selectedIds.includes(product.id) ? <CheckSquare size={20} /> : <Square size={20} />}
                      </button>
                    </td>
                    <td className="p-3">
                      {product.imageUrl ? (
                        <img src={product.imageUrl} alt={product.name} className="w-12 h-12 object-cover brutal-border" />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 brutal-border flex items-center justify-center text-gray-400 font-black text-lg">?</div>
                      )}
                    </td>
                    <td className="p-3">
                      <p className="font-black">{product.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{product.description}</p>
                    </td>
                    <td className="p-3"><span className="px-2 py-1 bg-[var(--brutal-blue)] brutal-border font-black text-xs uppercase">{product.category}</span></td>
                    <td className="p-3 font-black">₺{product.price.toFixed(2)}</td>
                    <td className="p-3">
                      <span className={`font-black ${product.stockQuantity === 0 ? 'text-red-600' : product.stockQuantity < 10 ? 'text-orange-500' : 'text-green-700'}`}>
                        {product.stockQuantity === 0 ? '⚠️ Tükendi' : `${product.stockQuantity} adet`}
                      </span>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(product)} className="px-3 py-1.5 bg-[var(--brutal-blue)] text-black font-black text-xs uppercase brutal-border hover:bg-blue-400 transition-colors brutal-shadow brutal-shadow-hover"><Edit size={14} /></button>
                        <DeleteButton productId={product.id} productName={product.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
