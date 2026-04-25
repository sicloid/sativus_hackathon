import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import VerifyMFA from './VerifyMFA';

export const dynamic = "force-dynamic";

export default async function CareLogin2FAPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/care-login');
  }

  // AAL (Authenticator Assurance Level) kontrolü
  const { data: aal } = await supabase.auth.mfa.getAuthenticatorAssuranceLevel();
  
  if (aal?.currentLevel === 'aal2') {
    // Zaten AAL2 ise hekim paneline yönlendir
    redirect('/hekim');
  }

  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center py-12 px-4">
      <VerifyMFA />
    </div>
  );
}
