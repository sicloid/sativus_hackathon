import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import prisma from '@/lib/prisma';

export const dynamic = "force-dynamic";

export default async function CareProfilPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/hasta-login');
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

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mt-4 rounded-2xl">
        <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Kişisel Bilgiler</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block font-bold uppercase text-sm mb-2 text-gray-600">Ad Soyad</label>
            <p className="font-black text-xl p-3 bg-[#f8f8f8] border-4 border-black rounded-xl">{name}</p>
          </div>
          <div>
            <label className="block font-bold uppercase text-sm mb-2 text-gray-600">E-Posta</label>
            <p className="font-black text-xl p-3 bg-[#f8f8f8] border-4 border-black rounded-xl">{email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
