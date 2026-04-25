'use client';

import { deleteAccountAction } from '@/app/actions/auth';
import { Trash2 } from 'lucide-react';

export default function DeleteAccountButton() {
  const handleDelete = async (e: React.FormEvent) => {
    if (!confirm('Hesabınızı ve tüm verilerinizi (siparişler, evcil hayvanlar, adresler) kalıcı olarak silmek istediğinize emin misiniz? Bu işlem geri alınamaz.')) {
      e.preventDefault();
    }
  };

  return (
    <form action={deleteAccountAction} onSubmit={handleDelete}>
      <button 
        type="submit" 
        className="flex items-center gap-2 bg-white text-black px-6 py-3 font-black uppercase border-4 border-black brutal-shadow brutal-shadow-hover hover:bg-rose-600 hover:text-white transition-all group"
      >
        <Trash2 size={18} className="group-hover:animate-bounce" />
        Hesabı Sil
      </button>
    </form>
  );
}
