import prisma from "@/lib/prisma";
import Link from "next/link";
import KarneTabs from "./KarneTabs";

export const dynamic = "force-dynamic";

export default async function PetKarne({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const showSuccess = resolvedSearchParams.success === 'true';

  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    include: { provider: true, slot: true }
  });

  // Hackathon demo: Since user auth to specific pets isn't fully robust, 
  // we can fetch all or just mock in the client component.
  // We'll pass empty arrays and let the KarneTabs handle mock data for now.
  const vaccinations: any[] = []; 
  const prescriptions: any[] = [];

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-8 text-black font-sans pb-20">
      <div className="max-w-4xl mx-auto space-y-8">
        {showSuccess && (
          <div className="bg-emerald-300 border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-center text-emerald-900 animate-pulse">
            🎉 Randevunuz Başarıyla Oluşturuldu!
          </div>
        )}
        <header className="border-4 border-black bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">Dijital Karne</h1>
            <p className="mt-2 text-zinc-700 font-bold text-lg">Aşı takvimi, geçmiş reçeteler, röntgen sonuçları ve randevularınız.</p>
          </div>
          <Link href="/randevu" className="bg-indigo-600 text-white border-4 border-black rounded-2xl px-6 py-3 font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            Yeni Teşhis Başlat
          </Link>
        </header>

        <KarneTabs 
          appointments={appointments} 
          vaccinations={vaccinations} 
          prescriptions={prescriptions} 
        />
      </div>
    </div>
  );
}
