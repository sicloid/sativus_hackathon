import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';
import ProfileUpdateForm from '@/components/profile/ProfileUpdateForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';

export const dynamic = "force-dynamic";

export default async function CareProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/care-login');
  }

  const name = user.user_metadata?.username || user.email?.split('@')[0] || 'Kullanıcı';
  const email = user.email || '';
  const joinDate = new Date(user.created_at).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });

  // Gerçek veriler
  const totalPets = await prisma.pet.count({ where: { userId: user.id } });
  const totalPrescriptions = await prisma.prescription.count({
    where: { pet: { userId: user.id } },
  });

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-4xl font-black uppercase">Hoş Geldin, {name}</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#bbf7d0] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between h-40 rounded-2xl">
          <h3 className="font-bold uppercase text-sm">Evcil Hayvanlarım</h3>
          <p className="text-5xl font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-white">{totalPets}</p>
        </div>
        
        <div className="bg-[#fef08a] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between h-40 rounded-2xl">
          <h3 className="font-bold uppercase text-sm">Reçetelerim</h3>
          <p className="text-5xl font-black drop-shadow-[2px_2px_0_rgba(0,0,0,1)] text-white">{totalPrescriptions}</p>
        </div>
        
        <div className="bg-[#a855f7] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 flex flex-col justify-between h-40 rounded-2xl">
          <h3 className="font-bold uppercase text-sm text-white">Kayıt Tarihi</h3>
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
