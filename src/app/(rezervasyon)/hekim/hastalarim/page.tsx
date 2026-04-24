/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { dischargeAppointment } from "../actions";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function HastalarimPage() {
  const activePatients = await prisma.appointment.findMany({
    where: { status: "ONAYLANDI" },
    include: {
      provider: true,
      slot: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* HEADER */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
              🐾 Hastalarım
            </h1>
            <p className="font-bold text-zinc-600 mt-1">
              Aktif tedavi altındaki hastalarınız ({activePatients.length} hasta)
            </p>
          </div>
        </div>

        {/* HASTA LİSTESİ */}
        {activePatients.length === 0 ? (
          <Card className="bg-zinc-50 text-center p-8 sm:p-12">
            <p className="text-xl font-bold">🎉 Şu anda aktif hasta bulunmuyor</p>
            <p className="font-bold text-zinc-500 mt-2">Randevu taleplerinden hasta onaylayabilirsiniz.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {activePatients.map(appt => {
              const aciliyetColor = appt.aiAciliyet === "Yüksek" ? "border-l-red-500" :
                appt.aiAciliyet === "Orta" ? "border-l-yellow-500" : "border-l-green-500";

              return (
                <Card key={appt.id} className={`border-l-8 ${aciliyetColor}`}>
                  <div className="flex flex-col lg:flex-row gap-4 p-4 sm:p-6">
                    {/* HASTA BİLGİSİ */}
                    <div className="flex-1 space-y-2">
                      <div className="flex flex-wrap items-center gap-3">
                        <h3 className="text-xl sm:text-2xl font-black">
                          {appt.petName}
                        </h3>
                        <Badge variant="neutral" className="text-sm">
                          {appt.petSpecies}
                        </Badge>
                        {appt.petAge && (
                          <Badge variant="neutral" className="text-sm">
                            {appt.petAge} yaş
                          </Badge>
                        )}
                      </div>
                      <p className="font-bold text-zinc-600">
                        👤 {appt.ownerName} {appt.ownerPhone && `• 📞 ${appt.ownerPhone}`}
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="success">Aktif Tedavi</Badge>
                        <Badge variant={
                          appt.aiAciliyet === "Yüksek" ? "danger" :
                          appt.aiAciliyet === "Orta" ? "warning" : "success"
                        }>
                          ⚡ {appt.aiAciliyet || "Normal"}
                        </Badge>
                        <Badge variant="default">
                          🏥 {appt.aiHizmet || "Genel"}
                        </Badge>
                      </div>
                    </div>

                    {/* AI ÖZETİ */}
                    <div className="flex-1">
                      {appt.aiOzeti && (
                        <div className="bg-white/80 border-2 border-black rounded-xl p-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
                          <p className="font-bold text-sm">
                            🤖 <span className="text-[#a855f7] font-black">VetAI:</span> {appt.aiOzeti}
                          </p>
                          {appt.aiDiagnosis && (
                            <p className="font-bold text-sm text-zinc-600 mt-2">
                              📋 Teşhis: {appt.aiDiagnosis}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* RANDEVU BİLGİSİ + EYLEM */}
                    <div className="flex flex-col items-end justify-between gap-3 shrink-0">
                      <div className="text-right">
                        <p className="font-bold text-sm">
                          📅 {new Date(appt.slot.date).toLocaleDateString("tr-TR")}
                        </p>
                        <p className="font-bold text-sm text-zinc-600">
                          🕐 {appt.slot.startTime}
                        </p>
                      </div>
                      <form action={dischargeAppointment.bind(null, appt.id) as any}>
                        <Button type="submit" variant="outline" className="bg-[#93c5fd] hover:bg-[#60a5fa] border-blue-500 font-black">
                          🏠 Taburcu Et
                        </Button>
                      </form>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
