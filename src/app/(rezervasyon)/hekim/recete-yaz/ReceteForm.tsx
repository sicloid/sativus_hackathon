"use client";

import { useState } from "react";
import { createPrescription } from "../actions";
import { Card, CardContent } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

interface Pet {
  id: string;
  name: string;
  species: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
}

interface PrescriptionItem {
  name: string;
  dosage: string;
  quantity: number;
  price: number;
  productId?: string;
}

export function ReceteForm({ pets, products }: { pets: Pet[]; products: Product[] }) {
  const [items, setItems] = useState<PrescriptionItem[]>([]);
  const [manualName, setManualName] = useState("");
  const [manualDosage, setManualDosage] = useState("");
  const [manualPrice, setManualPrice] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const addProductItem = () => {
    const product = products.find(p => p.id === selectedProduct);
    if (!product) return;
    setItems(prev => [...prev, {
      name: product.name,
      dosage: "",
      quantity: 1,
      price: product.price,
      productId: product.id,
    }]);
    setSelectedProduct("");
  };

  const addManualItem = () => {
    if (!manualName) return;
    setItems(prev => [...prev, {
      name: manualName,
      dosage: manualDosage,
      quantity: 1,
      price: parseFloat(manualPrice) || 0,
    }]);
    setManualName("");
    setManualDosage("");
    setManualPrice("");
  };

  const removeItem = (index: number) => {
    setItems(prev => prev.filter((_, i) => i !== index));
  };

  const updateItemQuantity = (index: number, qty: number) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, quantity: Math.max(1, qty) } : item));
  };

  const updateItemDosage = (index: number, dosage: string) => {
    setItems(prev => prev.map((item, i) => i === index ? { ...item, dosage } : item));
  };

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const handleSubmit = async (formData: FormData) => {
    formData.set("items", JSON.stringify(items));
    const result = await createPrescription(formData);
    if (result.success) {
      setSubmitted(true);
      setItems([]);
    }
  };

  if (submitted) {
    return (
      <Card className="bg-[#bbf7d0] text-center p-8">
        <CardContent className="mt-0">
          <p className="text-2xl font-black">✅ Reçete Başarıyla Kaydedildi!</p>
          <p className="font-bold text-zinc-600 mt-2">Hasta reçetesini profilinden görüntüleyebilir.</p>
          <Button
            variant="default"
            className="mt-4"
            onClick={() => setSubmitted(false)}
          >
            Yeni Reçete Yaz
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <form action={handleSubmit} className="space-y-6">
      {/* PET SEÇİMİ + TEŞHİS */}
      <Card className="bg-white">
        <CardContent className="p-6 mt-0 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-sm uppercase mb-1">Evcil Hayvan *</label>
              <select
                name="petId"
                required
                className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
              >
                <option value="">Pet Seçin</option>
                {pets.map(pet => (
                  <option key={pet.id} value={pet.id}>
                    {pet.name} ({pet.species})
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block font-bold text-sm uppercase mb-1">Teşhis</label>
              <input
                name="diagnosis"
                placeholder="Otitis externa"
                className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
              />
            </div>
          </div>
          <div>
            <label className="block font-bold text-sm uppercase mb-1">Hekim Notu</label>
            <textarea
              name="notes"
              placeholder="Tedavi planı, öneriler..."
              rows={2}
              className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
            />
          </div>
        </CardContent>
      </Card>

      {/* İLAÇ EKLEME */}
      <Card className="bg-[#e9d5ff]">
        <CardContent className="p-6 mt-0 space-y-4">
          <h3 className="text-xl font-black uppercase">💊 İlaç Ekle</h3>

          {/* MAĞAZADAN ÜRÜN SEÇ */}
          <div className="flex flex-col sm:flex-row gap-2">
            <select
              value={selectedProduct}
              onChange={e => setSelectedProduct(e.target.value)}
              className="flex-1 p-3 border-4 border-black rounded-xl font-bold bg-white"
            >
              <option value="">Mağazadan Ürün Seç (fiyat otomatik)</option>
              {products.map(p => (
                <option key={p.id} value={p.id}>
                  {p.name} — {p.price.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                </option>
              ))}
            </select>
            <Button type="button" variant="default" onClick={addProductItem} className="shrink-0 bg-[#a855f7] hover:bg-[#9333ea]">
              + Ekle
            </Button>
          </div>

          {/* MANUEL İLAÇ GİRİŞİ */}
          <div className="border-t-4 border-black pt-4">
            <p className="font-bold text-sm text-zinc-600 mb-2">veya manuel ilaç ekleyin:</p>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-2">
              <input
                value={manualName}
                onChange={e => setManualName(e.target.value)}
                placeholder="İlaç adı"
                className="p-3 border-4 border-black rounded-xl font-bold bg-white"
              />
              <input
                value={manualDosage}
                onChange={e => setManualDosage(e.target.value)}
                placeholder="Dozaj (2x1)"
                className="p-3 border-4 border-black rounded-xl font-bold bg-white"
              />
              <input
                value={manualPrice}
                onChange={e => setManualPrice(e.target.value)}
                type="number"
                step="0.01"
                placeholder="Fiyat (₺)"
                className="p-3 border-4 border-black rounded-xl font-bold bg-white"
              />
              <Button type="button" variant="outline" onClick={addManualItem}>
                + Manuel Ekle
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* İLAÇ LİSTESİ */}
      {items.length > 0 && (
        <Card className="bg-white">
          <CardContent className="p-6 mt-0">
            <h3 className="text-xl font-black uppercase mb-4">📋 Reçete İçeriği</h3>
            <div className="space-y-3">
              {items.map((item, i) => (
                <div key={i} className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 bg-zinc-50 border-2 border-black rounded-xl">
                  <div className="flex-1">
                    <span className="font-black">{item.name}</span>
                    {item.productId && (
                      <Badge variant="default" className="ml-2 text-xs">Mağaza Ürünü</Badge>
                    )}
                  </div>
                  <input
                    value={item.dosage}
                    onChange={e => updateItemDosage(i, e.target.value)}
                    placeholder="Dozaj"
                    className="w-24 p-2 border-2 border-black rounded-lg font-bold text-sm bg-white"
                  />
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm">Adet:</span>
                    <input
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={e => updateItemQuantity(i, parseInt(e.target.value))}
                      className="w-16 p-2 border-2 border-black rounded-lg font-bold text-sm text-center bg-white"
                    />
                  </div>
                  <span className="font-black text-lg shrink-0">
                    {(item.price * item.quantity).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                  </span>
                  <button type="button" onClick={() => removeItem(i)} className="text-red-500 font-black text-lg">✕</button>
                </div>
              ))}
            </div>

            {/* TOPLAM */}
            <div className="mt-4 pt-4 border-t-4 border-black flex justify-between items-center">
              <span className="text-xl font-black uppercase">Toplam</span>
              <span className="text-2xl font-black text-[#a855f7]">
                {totalPrice.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
              </span>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KAYDET */}
      <Button
        type="submit"
        variant="default"
        className="w-full bg-[#34d399] hover:bg-[#10b981] text-xl font-black py-4"
        disabled={items.length === 0}
      >
        ✅ Reçeteyi Kaydet ({items.length} ilaç)
      </Button>
    </form>
  );
}
