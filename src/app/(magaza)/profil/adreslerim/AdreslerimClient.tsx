'use client'

import { useActionState, useState, useEffect } from 'react'
import { createAddress, updateAddress, deleteAddress } from '@/app/actions/address'

interface Address {
  id: string
  title: string
  fullName: string
  phone: string
  fullAddress: string
  city: string
}

// ─── Adres Formu ─────────────────────────────────────────────────────────────
function AddressForm({
  editing,
  onDone,
}: {
  editing: Address | null
  onDone: () => void
}) {
  const isEditing = !!editing
  const action = isEditing ? updateAddress : createAddress
  const [state, formAction, isPending] = useActionState(action, null)

  useEffect(() => {
    if (state?.success) {
      const t = setTimeout(onDone, 800)
      return () => clearTimeout(t)
    }
  }, [state?.success, onDone])

  return (
    <div className="bg-white brutal-border brutal-shadow p-6 mb-6 border-t-8 border-t-[var(--brutal-blue)]">
      <h2 className="text-2xl font-black uppercase mb-5">
        {isEditing ? `✏️ Düzenle: ${editing.title}` : '➕ Yeni Adres Ekle'}
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
        {isEditing && <input type="hidden" name="id" value={editing.id} />}

        <div>
          <label className="block font-black uppercase text-xs mb-1 tracking-widest" htmlFor="addr-title">
            Adres Başlığı *
          </label>
          <input
            id="addr-title"
            name="title"
            type="text"
            required
            defaultValue={editing?.title ?? ''}
            placeholder="Örn: Ev, İş"
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
          />
        </div>

        <div>
          <label className="block font-black uppercase text-xs mb-1 tracking-widest" htmlFor="addr-name">
            Ad Soyad *
          </label>
          <input
            id="addr-name"
            name="fullName"
            type="text"
            required
            defaultValue={editing?.fullName ?? ''}
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-black uppercase text-xs mb-1 tracking-widest" htmlFor="addr-phone">
            Telefon *
          </label>
          <input
            id="addr-phone"
            name="phone"
            type="tel"
            required
            defaultValue={editing?.phone ?? ''}
            placeholder="0555 123 45 67"
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-black uppercase text-xs mb-1 tracking-widest" htmlFor="addr-full">
            Açık Adres *
          </label>
          <textarea
            id="addr-full"
            name="fullAddress"
            required
            rows={3}
            defaultValue={editing?.fullAddress ?? ''}
            placeholder="Mahalle, cadde, sokak, kapı no, daire..."
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors resize-none"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block font-black uppercase text-xs mb-1 tracking-widest" htmlFor="addr-city">
            İlçe / İl *
          </label>
          <input
            id="addr-city"
            name="city"
            type="text"
            required
            defaultValue={editing?.city ?? ''}
            placeholder="Kadıköy / İstanbul"
            className="w-full p-3 brutal-border bg-[#f8f8f8] focus:bg-white focus:outline-none focus:ring-4 focus:ring-black font-bold transition-colors"
          />
        </div>

        <div className="md:col-span-2 flex gap-3 mt-2">
          <button
            type="submit"
            disabled={isPending}
            className="flex-1 py-4 bg-black text-white font-black uppercase text-base brutal-border brutal-shadow brutal-shadow-hover hover:bg-[var(--brutal-green)] hover:text-black transition-colors disabled:opacity-50"
          >
            {isPending ? 'Kaydediliyor...' : isEditing ? '💾 Güncelle' : 'Adresi Kaydet'}
          </button>
          <button
            type="button"
            onClick={onDone}
            className="px-6 py-4 bg-white text-black font-black uppercase text-sm brutal-border hover:bg-gray-100 transition-colors"
          >
            İptal
          </button>
        </div>
      </form>
    </div>
  )
}

// ─── Tek Adres Kartı ─────────────────────────────────────────────────────────
function AddressCard({
  address,
  onEdit,
}: {
  address: Address
  onEdit: (a: Address) => void
}) {
  const [pending, setPending] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleDelete() {
    if (!confirm(`"${address.title}" adresini silmek istediğinize emin misiniz?`)) return
    setPending(true)
    setError(null)
    const result = await deleteAddress(address.id)
    if (result?.error) {
      setError(result.error)
      setPending(false)
    }
    // Başarıysa revalidatePath sayfayı günceller
  }

  return (
    <div className="bg-white brutal-border brutal-shadow p-6 flex flex-col h-full relative">
      {/* Başlık etiketi */}
      <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-black text-sm border-l-2 border-b-2 border-black uppercase tracking-wider">
        {address.title}
      </div>

      <h3 className="font-black text-xl mb-4 mt-2">{address.fullName}</h3>

      <div className="flex flex-col gap-1.5 mb-6 flex-grow font-bold text-gray-700 text-sm">
        <p>📞 {address.phone}</p>
        <p>📍 {address.fullAddress}</p>
        <p>🏙️ {address.city}</p>
      </div>

      {error && (
        <p className="text-xs text-red-700 font-bold mb-2">❌ {error}</p>
      )}

      <div className="flex gap-3 mt-auto pt-4 border-t-2 border-dashed border-gray-300">
        <button
          id={`edit-addr-${address.id}`}
          onClick={() => onEdit(address)}
          className="flex-1 bg-[#f8f8f8] p-2.5 brutal-border font-black uppercase text-sm hover:bg-[var(--brutal-blue)] transition-colors"
        >
          ✏️ Düzenle
        </button>
        <button
          id={`delete-addr-${address.id}`}
          onClick={handleDelete}
          disabled={pending}
          className="flex-1 bg-[#f8f8f8] p-2.5 brutal-border font-black uppercase text-sm hover:bg-[var(--brutal-red)] transition-colors disabled:opacity-50"
        >
          {pending ? '...' : '🗑 Sil'}
        </button>
      </div>
    </div>
  )
}

// ─── Ana Bileşen ─────────────────────────────────────────────────────────────
export default function AdreslerimClient({ addresses }: { addresses: Address[] }) {
  const [showForm, setShowForm] = useState(false)
  const [editingAddress, setEditingAddress] = useState<Address | null>(null)

  function handleEdit(address: Address) {
    setEditingAddress(address)
    setShowForm(true)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function handleAddNew() {
    setEditingAddress(null)
    setShowForm(true)
  }

  function handleDone() {
    setShowForm(false)
    setEditingAddress(null)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Başlık + Yeni Adres Butonu */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-4xl font-black uppercase">Adreslerim</h1>
        {!showForm && (
          <button
            id="new-address-btn"
            onClick={handleAddNew}
            className="bg-[var(--brutal-yellow)] text-black px-6 py-3 font-black uppercase brutal-border brutal-shadow brutal-shadow-hover transition-colors"
          >
            + Yeni Adres Ekle
          </button>
        )}
      </div>

      {/* Form */}
      {showForm && (
        <AddressForm editing={editingAddress} onDone={handleDone} />
      )}

      {/* Adres Kartları */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <AddressCard key={addr.id} address={addr} onEdit={handleEdit} />
        ))}

        {addresses.length === 0 && !showForm && (
          <div className="col-span-1 md:col-span-2 bg-[#f8f8f8] brutal-border p-12 text-center">
            <p className="font-bold text-xl mb-4">Henüz kayıtlı bir adresiniz bulunmuyor.</p>
            <button
              onClick={handleAddNew}
              className="bg-black text-white px-6 py-3 font-black uppercase brutal-border brutal-shadow brutal-shadow-hover hover:bg-[var(--brutal-yellow)] hover:text-black transition-colors"
            >
              Adres Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
