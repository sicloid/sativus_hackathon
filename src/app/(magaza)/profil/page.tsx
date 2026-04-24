import { createClient } from '@/utils/supabase/server';
import { logoutAction } from '@/app/actions/auth';
import { redirect } from 'next/navigation';

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const name = user.user_metadata?.username || user.email?.split('@')[0] || 'Kullanıcı';
  const email = user.email || '';
  const joinDate = new Date(user.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  // Mock data for stats
  const totalOrders = 3;
  const activeCoupons = 1;

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-black uppercase">Hoş Geldin, {name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[var(--brutal-blue)] brutal-border brutal-shadow p-6 flex flex-col justify-between h-40">
          <h3 className="font-bold uppercase text-sm">Toplam Sipariş</h3>
          <p className="text-5xl font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-white">{totalOrders}</p>
        </div>
        
        <div className="bg-[var(--brutal-yellow)] brutal-border brutal-shadow p-6 flex flex-col justify-between h-40">
          <h3 className="font-bold uppercase text-sm">Aktif Kuponlar</h3>
          <p className="text-5xl font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-white">{activeCoupons}</p>
        </div>
        
        <div className="bg-[var(--brutal-green)] brutal-border brutal-shadow p-6 flex flex-col justify-between h-40">
          <h3 className="font-bold uppercase text-sm">Üyelik Tarihi</h3>
          <p className="text-xl font-black drop-shadow-[1px_1px_0_rgba(0,0,0,1)] text-white mt-auto">{joinDate}</p>
        </div>
      </div>

      <div className="bg-white brutal-border brutal-shadow p-8 mt-4">
        <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Kişisel Bilgiler</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold uppercase text-sm mb-2 text-gray-600">Ad Soyad</label>
            <p className="font-black text-xl p-3 bg-[#f8f8f8] brutal-border">{name}</p>
          </div>
          <div>
            <label className="block font-bold uppercase text-sm mb-2 text-gray-600">E-Posta</label>
            <p className="font-black text-xl p-3 bg-[#f8f8f8] brutal-border">{email}</p>
          </div>
          <div className="md:col-span-2 flex flex-wrap gap-4 mt-4">
            <button className="bg-black text-white px-6 py-3 font-black uppercase brutal-border hover:bg-white hover:text-black transition-colors">
              Bilgileri Güncelle
            </button>
            <form action={logoutAction}>
              <button type="submit" className="bg-[var(--brutal-red)] text-white px-6 py-3 font-black uppercase brutal-border brutal-shadow brutal-shadow-hover hover:bg-black transition-colors">
                Çıkış Yap
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
