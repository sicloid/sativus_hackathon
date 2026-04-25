import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import ProfileUpdateForm from '@/components/profile/ProfileUpdateForm';
import PasswordChangeForm from '@/components/profile/PasswordChangeForm';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export const dynamic = "force-dynamic";

export default async function HekimAyarlarPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/care-login');
  }

  const name = user.user_metadata?.username || user.email?.split('@')[0] || 'Hekim';
  const email = user.email || '';

  // 2FA durumunu kontrol et
  const { data: factors } = await supabase.auth.mfa.listFactors();
  const hasTotp = factors?.totp && factors.totp.length > 0;

  return (
    <div className="flex flex-col gap-8 max-w-4xl mx-auto">
      <div className="flex items-center gap-4 mb-4">
        <Link 
          href="/hekim" 
          className="p-2 bg-white border-2 border-black rounded-lg hover:bg-gray-100 transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
        >
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <h1 className="text-4xl font-black uppercase">Hesap Ayarları</h1>
      </div>
      
      <ProfileUpdateForm 
        initialName={name} 
        initialPhone={user.user_metadata?.phone || ''} 
        email={email} 
      />
      
      <PasswordChangeForm />

      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-8 mt-4 rounded-2xl mb-8">
        <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">İki Aşamalı Doğrulama (2FA)</h2>
        
        {hasTotp ? (
          <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 font-bold">
            İki aşamalı doğrulama (MFA) hesabınız için AKTİF durumdadır.
          </div>
        ) : (
          <div>
            <p className="text-gray-600 font-medium mb-4">
              Hesabınızın güvenliğini artırmak için İki Aşamalı Doğrulama'yı (2FA) etkinleştirin. Bu işlem, şifrenize ek olarak telefonunuzdaki bir doğrulama uygulamasından (Google Authenticator vb.) kod girmenizi gerektirecektir.
            </p>
            <Link 
              href="/hekim/ayarlar/2fa"
              className="inline-block bg-black text-white px-6 py-3 font-black uppercase rounded-xl hover:bg-gray-800 transition-colors"
            >
              2FA Kurulumunu Başlat
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
