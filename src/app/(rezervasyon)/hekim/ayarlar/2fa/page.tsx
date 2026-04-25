import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import EnrollMFA from './EnrollMFA';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function SetupMFAPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/care-login');
  }

  // Zaten TOTP kurulu mu?
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const hasTotp = factors?.totp && factors.totp.length > 0;

  if (hasTotp) {
    redirect('/hekim/ayarlar'); // Kuruluysa ayarlara geri dön
  }

  return (
    <div className="flex flex-col gap-8 max-w-2xl mx-auto mt-10">
      <div className="flex items-center gap-4 mb-4">
        <Link 
          href="/hekim/ayarlar" 
          className="p-2 bg-white border-2 border-black rounded-lg hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-4xl font-black uppercase">Güvenlik Kurulumu</h1>
      </div>

      <EnrollMFA />
    </div>
  );
}
