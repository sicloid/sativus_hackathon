import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import { HekimMobileMenu } from "./HekimMobileMenu";

export const metadata = {
  title: "PetVerse Hekim Paneli",
};

export default async function HekimLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) redirect("/care-login");

  const role = user.user_metadata?.role;
  if (role !== "vet" && role !== "admin") redirect("/care-login");

  const userName = user.user_metadata?.username || user.email?.split("@")[0] || "Hekim";

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-black font-sans">
      {/* HEKIM NAVBAR */}
      <nav className="sticky top-0 z-50 bg-[#fdfdfd] border-b-4 border-black w-full shadow-[0px_4px_0px_0px_rgba(0,0,0,1)]">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20 items-center">
            {/* LOGO */}
            <Link href="/hekim" className="flex items-center gap-2 group">
              <span className="text-3xl">🩺</span>
              <span className="text-2xl font-black uppercase tracking-tighter group-hover:underline">
                PetVerse <span className="text-[#a855f7]">Hekim</span>
              </span>
            </Link>

            {/* DESKTOP MENU */}
            <div className="hidden md:flex items-center gap-6">
              <Link href="/hekim" className="font-bold text-lg hover:underline underline-offset-4">
                Randevu Talepleri
              </Link>
              <Link href="/hekim/hastalarim" className="font-bold text-lg hover:underline underline-offset-4">
                Hastalarım
              </Link>
              <Link href="/hekim/teshisler" className="font-bold text-lg hover:underline underline-offset-4">
                Teşhisler
              </Link>
              <Link href="/hekim/asi-ekle" className="font-bold text-lg hover:underline underline-offset-4">
                Aşı Ekle
              </Link>
              <Link href="/hekim/recete-yaz" className="font-bold text-lg hover:underline underline-offset-4">
                Reçete Yaz
              </Link>

              <div className="flex items-center gap-3 ml-4 pl-4 border-l-4 border-black">
                <span className="font-black text-sm uppercase bg-[#e9d5ff] border-2 border-black px-3 py-1 rounded-lg">
                  Dr. {userName}
                </span>
                <form action={async () => {
                  "use server";
                  const supabase = await createClient();
                  await supabase.auth.signOut();
                  redirect("/care-login");
                }}>
                  <button
                    type="submit"
                    className="bg-black text-white font-black uppercase text-sm px-4 py-2 border-2 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-0.5 hover:shadow-[5px_5px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all"
                  >
                    Çıkış Yap
                  </button>
                </form>
              </div>
            </div>

            {/* MOBILE MENU */}
            <HekimMobileMenu userName={userName} />
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="pb-20">
        {children}
      </main>
    </div>
  );
}
