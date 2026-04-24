import prisma from "@/lib/prisma";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function PetKarne() {
  const appointments = await prisma.appointment.findMany({
    orderBy: { createdAt: "desc" },
    include: { provider: true, slot: true }
  });

  return (
    <div className="min-h-screen bg-zinc-50 p-4 sm:p-8 text-black font-sans pb-20">
      <div className="max-w-3xl mx-auto space-y-8">
        <header className="border-4 border-black bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black tracking-tight uppercase">Pet Karne</h1>
            <p className="mt-2 text-zinc-700 font-bold text-lg">Evcil hayvanınızın geçmiş ve gelecek randevuları.</p>
          </div>
          <Link href="/ai-asistan" className="bg-indigo-600 text-white border-4 border-black rounded-2xl px-6 py-3 font-black uppercase tracking-wide shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all">
            Yeni Teşhis Başlat
          </Link>
        </header>

        <div className="space-y-6">
          {appointments.length === 0 ? (
            <div className="border-4 border-black bg-white p-8 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] text-center">
              <h2 className="text-2xl font-black uppercase mb-2">Henüz Randevu Yok</h2>
              <p className="text-zinc-600 font-bold text-lg">VetAI asistanını kullanarak ilk randevunuzu oluşturun.</p>
            </div>
          ) : (
            appointments.map(app => (
              <div key={app.id} className="border-4 border-black bg-white p-6 rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <div className="flex justify-between items-start flex-wrap gap-4 border-b-4 border-black pb-4 mb-4">
                  <div>
                    <h2 className="text-2xl font-black uppercase">{app.petName} <span className="text-zinc-500 text-lg">({app.petSpecies})</span></h2>
                    <p className="text-zinc-700 font-bold text-lg">{app.provider.name} - {app.provider.specialty}</p>
                  </div>
                  <div className="text-right">
                    <div className="bg-emerald-300 border-4 border-black px-4 py-2 font-black uppercase rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] inline-block">
                      {app.slot.date.toLocaleDateString('tr-TR')} {app.slot.startTime}
                    </div>
                  </div>
                </div>

                {app.aiDiagnosis || app.aiAciliyet ? (
                  <div className="bg-zinc-100 border-4 border-black p-4 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                    <h3 className="font-black uppercase mb-2">AI Teşhis Notları</h3>
                    <div className="flex gap-2 mb-2 flex-wrap">
                       {app.aiAciliyet && <span className="bg-orange-300 border-2 border-black px-2 py-1 font-bold text-sm rounded-full">Aciliyet: {app.aiAciliyet}</span>}
                       {app.aiHizmet && <span className="bg-cyan-300 border-2 border-black px-2 py-1 font-bold text-sm rounded-full">Hizmet: {app.aiHizmet}</span>}
                    </div>
                    <p className="font-bold">{app.aiOzeti}</p>
                  </div>
                ) : (
                  <p className="font-bold text-zinc-500 italic">Yapay zeka teşhisi kullanılmadan oluşturuldu.</p>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
