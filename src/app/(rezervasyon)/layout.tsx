import { CareNavbarWrapper } from "@/components/CareNavbarWrapper";
import { createClient } from "@/utils/supabase/server";

export const metadata = {
  title: "PetVerse Hospital",
};

export default async function RezervasyonLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <CareNavbarWrapper user={user}>
      {children}
    </CareNavbarWrapper>
  );
}
