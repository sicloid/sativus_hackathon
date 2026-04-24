'use client';

import { useState } from 'react';

export default function AdreslerimPage() {
  const [showForm, setShowForm] = useState(false);
  
  // Mock data
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      title: 'Ev Adresi',
      fullName: 'Zeynep Kaya',
      phone: '0555 123 45 67',
      fullAddress: 'Atatürk Mah. Cumhuriyet Cad. No: 12 Daire: 4',
      city: 'Kadıköy / İstanbul'
    },
    {
      id: 2,
      title: 'İş Adresi',
      fullName: 'Zeynep Kaya',
      phone: '0555 123 45 67',
      fullAddress: 'Levent Mah. Büyükdere Cad. Kanyon Ofis Kat: 5',
      city: 'Şişli / İstanbul'
    }
  ]);

  const handleDelete = (id: number) => {
    setAddresses(addresses.filter(addr => addr.id !== id));
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
        <h1 className="text-4xl font-black uppercase mb-4 sm:mb-0">Adreslerim</h1>
        <button 
          onClick={() => setShowForm(!showForm)}
          className="bg-[var(--brutal-yellow)] text-black px-6 py-3 font-black uppercase brutal-border brutal-shadow brutal-shadow-hover transition-colors"
        >
          {showForm ? 'İptal Et' : '+ Yeni Adres Ekle'}
        </button>
      </div>
      
      {showForm && (
        <div className="bg-white brutal-border brutal-shadow p-6 mb-8 border-t-8 border-t-[var(--brutal-blue)]">
          <h2 className="text-2xl font-black uppercase mb-6">Yeni Adres Ekle</h2>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-4" onSubmit={(e) => { e.preventDefault(); setShowForm(false); }}>
            <div>
              <label className="block font-bold uppercase text-sm mb-2">Adres Başlığı</label>
              <input type="text" placeholder="Örn: Ev Adresim" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" />
            </div>
            <div>
              <label className="block font-bold uppercase text-sm mb-2">Ad Soyad</label>
              <input type="text" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold uppercase text-sm mb-2">Telefon</label>
              <input type="tel" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold uppercase text-sm mb-2">Açık Adres</label>
              <textarea className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold min-h-[100px]" />
            </div>
            <div className="md:col-span-2">
              <label className="block font-bold uppercase text-sm mb-2">İl / İlçe</label>
              <input type="text" className="w-full p-3 brutal-border focus:ring-4 focus:ring-black outline-none font-bold" />
            </div>
            <div className="md:col-span-2 mt-4">
              <button type="submit" className="bg-black text-white w-full py-4 font-black uppercase text-xl brutal-border hover:bg-[var(--brutal-green)] hover:text-black transition-colors">
                Adresi Kaydet
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {addresses.map((addr) => (
          <div key={addr.id} className="bg-white brutal-border brutal-shadow p-6 flex flex-col h-full relative group">
            <div className="absolute top-0 right-0 bg-black text-white px-3 py-1 font-black text-sm border-l-2 border-b-2 border-black">
              {addr.title}
            </div>
            
            <h3 className="font-black text-xl mb-4 mt-2">{addr.fullName}</h3>
            
            <div className="flex flex-col gap-2 mb-6 flex-grow font-bold text-gray-700">
              <p>{addr.phone}</p>
              <p>{addr.fullAddress}</p>
              <p>{addr.city}</p>
            </div>
            
            <div className="flex gap-4 mt-auto pt-4 border-t-2 border-dashed border-gray-300">
              <button className="flex-1 bg-[#f8f8f8] p-2 brutal-border font-black uppercase text-sm hover:bg-[var(--brutal-blue)] transition-colors">
                Düzenle
              </button>
              <button 
                onClick={() => handleDelete(addr.id)}
                className="flex-1 bg-[#f8f8f8] p-2 brutal-border font-black uppercase text-sm hover:bg-[var(--brutal-red)] transition-colors"
              >
                Sil
              </button>
            </div>
          </div>
        ))}

        {addresses.length === 0 && !showForm && (
          <div className="col-span-1 md:col-span-2 bg-[#f8f8f8] brutal-border p-12 text-center">
            <p className="font-bold text-xl mb-4">Henüz kayıtlı bir adresiniz bulunmuyor.</p>
            <button 
              onClick={() => setShowForm(true)}
              className="bg-black text-white px-6 py-3 font-black uppercase brutal-border hover:bg-[var(--brutal-yellow)] hover:text-black transition-colors"
            >
              Adres Ekle
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
