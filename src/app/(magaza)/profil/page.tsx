import { createClient } from '@/utils/supabase/server';
import { getUserOrderCount } from '@/app/actions/store';
import { logoutAction, deleteAccountAction } from '@/app/actions/auth';
import { redirect } from 'next/navigation';
import ProfileUpdateForm from '@/components/profile/ProfileUpdateForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import DeleteAccountButton from '@/components/profile/DeleteAccountButton';

export default async function ProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const name = user.user_metadata?.username || user.email?.split('@')[0] || 'Kullanıcı';
  const email = user.email || '';
  const joinDate = new Date(user.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  // Dinamik verileri çek
  const totalOrders = await getUserOrderCount();
  const activeCoupons = 1;

  return (
    <div className="flex flex-col gap-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h1 className="text-4xl font-black uppercase">Hoş Geldin, {name}</h1>
        <div className="flex flex-wrap gap-4">
          <DeleteAccountButton />
        </div>
      </div>
      
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

      <ProfileUpdateForm 
        initialName={name} 
        initialPhone={user.user_metadata?.phone || ''} 
        email={email} 
      />
      
      <PasswordChangeForm />
    </div>
  );
}
