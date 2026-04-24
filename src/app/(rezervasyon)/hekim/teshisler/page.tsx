import prisma from "@/lib/prisma";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function TeshislerPage() {
  const appointments = await prisma.appointment.findMany({
    where: {
      aiOzeti: { not: null },
    },
    include: {
      provider: true,
      slot: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const byAciliyet = {
    yuksek: appointments.filter(a => a.aiAciliyet === "Yüksek"),
    orta: appointments.filter(a => a.aiAciliyet === "Orta"),
    dusuk: appointments.filter(a => a.aiAciliyet === "Düşük"),
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
            🔬 Teşhisler
          </h1>
          <p className="font-bold text-zinc-600 mt-1">
            VetAI tarafından oluşturulan tüm teşhis özetleri ({appointments.length} kayıt)
          </p>
        </div>

        {/* İSTATİSTİKLER */}
        <div className="grid grid-cols-3 gap-3">
          <Card className="bg-[#fecaca] text-center p-3 sm:p-4">
            <p className="text-2xl sm:text-3xl font-black">{byAciliyet.yuksek.length}</p>
            <p className="font-bold text-xs sm:text-sm uppercase">🚨 Yüksek</p>
          </Card>
          <Card className="bg-[#fef08a] text-center p-3 sm:p-4">
            <p className="text-2xl sm:text-3xl font-black">{byAciliyet.orta.length}</p>
            <p className="font-bold text-xs sm:text-sm uppercase">⚠️ Orta</p>
          </Card>
          <Card className="bg-[#bbf7d0] text-center p-3 sm:p-4">
            <p className="text-2xl sm:text-3xl font-black">{byAciliyet.dusuk.length}</p>
            <p className="font-bold text-xs sm:text-sm uppercase">✅ Düşük</p>
          </Card>
        </div>

        {/* TEŞHİS LİSTESİ */}
        {appointments.length === 0 ? (
          <Card className="bg-zinc-50 text-center p-8 sm:p-12">
            <p className="text-xl font-bold">Henüz teşhis kaydı yok</p>
            <p className="font-bold text-zinc-500 mt-2">Hastalar randevu aldığında VetAI otomatik teşhis oluşturur.</p>
          </Card>
        ) : (
          <div className="space-y-3">
            {appointments.map(appt => {
              const aciliyetColor = appt.aiAciliyet === "Yüksek" ? "border-l-red-500 bg-red-50" :
                appt.aiAciliyet === "Orta" ? "border-l-yellow-500 bg-yellow-50" :
                "border-l-green-500 bg-green-50";

              return (
                <Card key={appt.id} className={`border-l-8 ${aciliyetColor}`}>
                  <CardContent className="p-4 sm:p-5 mt-0">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* SOL: HASTA BİLGİSİ */}
                      <div className="shrink-0 sm:w-48">
                        <h3 className="font-black text-lg">{appt.petName}</h3>
                        <p className="font-bold text-sm text-zinc-600">{appt.petSpecies} {appt.petAge && `• ${appt.petAge} yaş`}</p>
                        <p className="font-bold text-sm text-zinc-500 mt-1">👤 {appt.ownerName}</p>
                        <p className="font-bold text-xs text-zinc-400 mt-1">
                          📅 {new Date(appt.slot.date).toLocaleDateString("tr-TR")}
                        </p>
                      </div>

                      {/* ORTA: AI TEŞHİSİ */}
                      <div className="flex-1 space-y-2">
                        <div className="flex flex-wrap gap-2">
                          <Badge variant={
                            appt.aiAciliyet === "Yüksek" ? "danger" :
                            appt.aiAciliyet === "Orta" ? "warning" : "success"
                          }>
                            ⚡ {appt.aiAciliyet}
                          </Badge>
                          <Badge variant="default">🏥 {appt.aiHizmet || "Genel"}</Badge>
                          <Badge variant={
                            appt.status === "ONAYLANDI" ? "success" :
                            appt.status === "PENDING" ? "warning" :
                            appt.status === "TABURCU" ? "neutral" : "danger"
                          }>
                            {appt.status === "ONAYLANDI" ? "Aktif" :
                             appt.status === "PENDING" ? "Beklemede" :
                             appt.status === "TABURCU" ? "Taburcu" : "İptal"}
                          </Badge>
                        </div>
                        <p className="font-bold text-sm leading-relaxed">
                          🤖 <span className="text-[#a855f7] font-black">VetAI Özeti:</span> {appt.aiOzeti}
                        </p>
                        {appt.aiDiagnosis && (
                          <p className="font-bold text-sm text-zinc-700">
                            📋 Ön Teşhis: {appt.aiDiagnosis}
                          </p>
                        )}
                        {appt.notes && (
                          <p className="font-bold text-xs text-zinc-500">
                            📝 Not: {appt.notes}
                          </p>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
