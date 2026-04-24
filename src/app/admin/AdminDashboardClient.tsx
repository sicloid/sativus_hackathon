'use client'

import { useActionState, useState, useEffect } from 'react'
import {
  adminCreateProduct,
  adminUpdateProduct,
  adminDeleteProduct,
} from '@/app/actions/admin'

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

const CATEGORIES = ['Mama', 'Aksesuar', 'Sağlık', 'Oyuncak', 'Bakım', 'Diğer']

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
    // Başarılıysa revalidate tetiklenir, sayfa otomatik güncellenir
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
        {pending ? '...' : '🗑 Sil'}
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

  // Başarı sonrası formu kapat
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

      {state?.error && (
        <div className="mb-4 p-3 bg-[var(--brutal-red)] brutal-border font-bold text-sm">
          ❌ {state.error}
        </div>
      )}
      {state?.success && (
        <div className="mb-4 p-3 bg-[var(--brutal-green)] brutal-border font-bold text-sm">
          ✅ {state.success}
        </div>
      )}

      <form action={formAction} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gizli ID (düzenleme modu için) */}
        {isEditing && <input type="hidden" name="id" value={editingProduct.id} />}

        {/* Ürün Adı */}
        <div className="md:col-span-2">
          <label className="block font-black text-xs uppercase mb-1 tracking-widest" htmlFor="form-name">
            Ürün Adı *
          </label>
          <input
            id="form-name"
            name="name"
            type="text"
            required
            defaultValue={editingProduct?.name ?? ''}
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
            placeholder="örn. Royal Canin Yetişkin Mama"
          />
        </div>

        {/* Kategori */}
        <div>
          <label className="block font-black text-xs uppercase mb-1 tracking-widest" htmlFor="form-category">
            Kategori *
          </label>
          <select
            id="form-category"
            name="category"
            required
            defaultValue={editingProduct?.category ?? ''}
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors appearance-none"
          >
            <option value="" disabled>Seçin...</option>
            {CATEGORIES.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* Fiyat */}
        <div>
          <label className="block font-black text-xs uppercase mb-1 tracking-widest" htmlFor="form-price">
            Fiyat (₺) *
          </label>
          <input
            id="form-price"
            name="price"
            type="number"
            step="0.01"
            min="0"
            required
            defaultValue={editingProduct?.price ?? ''}
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
            placeholder="99.90"
          />
        </div>

        {/* Stok */}
        <div>
          <label className="block font-black text-xs uppercase mb-1 tracking-widest" htmlFor="form-stock">
            Stok Adedi *
          </label>
          <input
            id="form-stock"
            name="stockQuantity"
            type="number"
            min="0"
            required
            defaultValue={editingProduct?.stockQuantity ?? 0}
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
            placeholder="50"
          />
        </div>

        {/* Görsel URL */}
        <div>
          <label className="block font-black text-xs uppercase mb-1 tracking-widest" htmlFor="form-image">
            Görsel URL
          </label>
          <input
            id="form-image"
            name="imageUrl"
            type="url"
            defaultValue={editingProduct?.imageUrl ?? ''}
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
            placeholder="https://..."
          />
        </div>

        {/* Açıklama */}
        <div className="md:col-span-2">
          <label className="block font-black text-xs uppercase mb-1 tracking-widest" htmlFor="form-desc">
            Açıklama *
          </label>
          <textarea
            id="form-desc"
            name="description"
            required
            rows={3}
            defaultValue={editingProduct?.description ?? ''}
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors resize-none"
            placeholder="Ürün hakkında kısa bir açıklama..."
          />
        </div>

        {/* Butonlar */}
        <div className="md:col-span-2 flex gap-3">
          <button
            id="form-submit-btn"
            type="submit"
            disabled={isPending}
            className="flex-1 py-3 bg-black text-[var(--brutal-yellow)] font-black text-sm uppercase tracking-widest brutal-border brutal-shadow brutal-shadow-hover hover:bg-[var(--brutal-yellow)] hover:text-black transition-colors disabled:opacity-50"
          >
            {isPending ? 'Kaydediliyor...' : isEditing ? '💾 Güncelle' : '➕ Ürün Ekle'}
          </button>
          <button
            type="button"
            onClick={onCancel}
            className="px-6 py-3 bg-white text-black font-black text-sm uppercase tracking-widest brutal-border hover:bg-gray-100 transition-colors"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Ana Dashboard Bileşeni ───────────────────────────────────────────────────
export default function AdminDashboardClient({ products }: { products: Product[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)

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

  return (
    <div className="space-y-8">
      {/* Form Alanı */}
      {showForm ? (
        <ProductForm editingProduct={editingProduct} onCancel={handleCancel} />
      ) : (
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-black uppercase tracking-tight">Ürün Yönetimi</h1>
            <p className="font-bold text-gray-600 mt-1">Toplam {products.length} ürün</p>
          </div>
          <button
            id="add-product-btn"
            onClick={handleAddNew}
            className="px-6 py-3 bg-black text-[var(--brutal-yellow)] font-black text-sm uppercase tracking-widest brutal-border brutal-shadow brutal-shadow-hover hover:bg-[var(--brutal-yellow)] hover:text-black transition-colors"
          >
            ➕ Yeni Ürün Ekle
          </button>
        </div>
      )}

      {/* Ürün Tablosu */}
      <div className="bg-white brutal-border brutal-shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-black text-white">
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
                <tr>
                  <td colSpan={6} className="p-8 text-center font-bold text-gray-500">
                    Henüz ürün yok. Yukarıdan ekleyebilirsiniz.
                  </td>
                </tr>
              ) : (
                products.map((product, index) => (
                  <tr
                    key={product.id}
                    className={`border-b-2 border-black hover:bg-[var(--brutal-yellow)] transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-[#fafafa]'
                    }`}
                  >
                    {/* Görsel */}
                    <td className="p-3">
                      {product.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={product.imageUrl}
                          alt={product.name}
                          className="w-12 h-12 object-cover brutal-border"
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/48x48/f0f0f0/000?text=?'
                          }}
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-100 brutal-border flex items-center justify-center text-gray-400 font-black text-lg">
                          ?
                        </div>
                      )}
                    </td>

                    {/* İsim */}
                    <td className="p-3">
                      <p className="font-black">{product.name}</p>
                      <p className="text-xs text-gray-500 mt-0.5 line-clamp-1">{product.description}</p>
                    </td>

                    {/* Kategori */}
                    <td className="p-3">
                      <span className="px-2 py-1 bg-[var(--brutal-blue)] brutal-border font-black text-xs uppercase">
                        {product.category}
                      </span>
                    </td>

                    {/* Fiyat */}
                    <td className="p-3 font-black">
                      ₺{product.price.toFixed(2)}
                    </td>

                    {/* Stok */}
                    <td className="p-3">
                      <span className={`font-black ${product.stockQuantity === 0 ? 'text-red-600' : product.stockQuantity < 10 ? 'text-orange-500' : 'text-green-700'}`}>
                        {product.stockQuantity === 0 ? '⚠️ Tükendi' : `${product.stockQuantity} adet`}
                      </span>
                    </td>

                    {/* İşlemler */}
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <button
                          id={`edit-product-${product.id}`}
                          onClick={() => handleEdit(product)}
                          className="px-3 py-1.5 bg-[var(--brutal-blue)] text-black font-black text-xs uppercase brutal-border hover:bg-blue-400 transition-colors brutal-shadow brutal-shadow-hover"
                        >
                          ✏️ Düzenle
                        </button>
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
