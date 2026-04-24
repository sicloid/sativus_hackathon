import prisma from "@/lib/prisma";
import { approveAppointment, rejectAppointment } from "./actions";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";

export const dynamic = "force-dynamic";

export default async function HekimDashboard() {
  const appointments = await prisma.appointment.findMany({
    include: {
      provider: true,
      slot: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-black font-sans pb-20 p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <Card className="bg-[#bfdbfe]">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 p-6 sm:p-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight uppercase">Hekim Paneli</h1>
              <p className="mt-2 text-zinc-800 font-bold text-lg sm:text-xl">VetAI asistanından gelen tüm randevu talepleri.</p>
            </div>
            <Link href="/" className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto text-lg px-8">
                Ana Sayfaya Dön
              </Button>
            </Link>
          </div>
        </Card>

        {/* APPOINTMENT GRID */}
        {appointments.length === 0 ? (
          <Card className="bg-rose-200 text-center p-8 sm:p-12">
            <CardTitle className="text-3xl sm:text-4xl">Henüz Randevu Yok</CardTitle>
            <p className="font-bold text-lg sm:text-xl mt-4">Sisteme henüz düşen bir hasta talebi bulunmuyor.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {appointments.map((appt) => {
              const isUrgent = appt.aiAciliyet === "Yüksek" || appt.aiAciliyet === "Kritik";
              const isNormal = appt.aiAciliyet === "Normal" || appt.aiAciliyet === "Düşük";
              
              let cardBgClass = "bg-white"; 
              if (isUrgent) cardBgClass = "bg-[#fecaca]"; 
              else if (isNormal) cardBgClass = "bg-[#bbf7d0]"; 
              else cardBgClass = "bg-[#fef08a]"; 

              return (
                <Card key={appt.id} className={`${cardBgClass} flex flex-col h-full`}>
                  
                  <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4">
                    <div className="flex-1">
                      <CardTitle className="text-xl sm:text-2xl break-words">
                        {appt.petName} <span className="text-lg text-zinc-800 block sm:inline">({appt.petSpecies})</span>
                      </CardTitle>
                      <p className="font-bold text-md sm:text-lg mt-2 break-words">Sahibi: {appt.ownerName}</p>
                      {appt.ownerPhone && <p className="font-bold text-md text-zinc-800">{appt.ownerPhone}</p>}
                    </div>
                    
                    <div className="text-left sm:text-right shrink-0">
                      <Badge variant="neutral" className="text-sm sm:text-base px-4 py-2">
                        {appt.slot.startTime}
                      </Badge>
                      <div className="mt-2 font-bold text-sm">
                        {new Date(appt.slot.date).toLocaleDateString("tr-TR")}
                      </div>
                    </div>
                  </CardHeader>

                  {/* VET AI SUMMARY */}
                  <CardContent className="flex-grow space-y-4">
                    {appt.aiOzeti ? (
                      <Card className="bg-white border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <CardContent className="p-4 mt-0 space-y-3">
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="warning">Aciliyet: {appt.aiAciliyet}</Badge>
                            <Badge variant="default">Hizmet: {appt.aiHizmet}</Badge>
                          </div>
                          <p className="font-bold text-sm leading-relaxed">🤖 VetAI Özeti: {appt.aiOzeti}</p>
                        </CardContent>
                      </Card>
                    ) : (
                      <Card className="bg-white border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <CardContent className="p-4 mt-0">
                          <p className="font-bold text-sm italic">AI özeti bulunmuyor.</p>
                        </CardContent>
                      </Card>
                    )}
                    
                    {appt.notes && (
                      <Card className="bg-zinc-100 border-2 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <CardContent className="p-4 mt-0">
                          <p className="font-bold text-sm break-words">📝 Ek Notlar: {appt.notes}</p>
                        </CardContent>
                      </Card>
                    )}
                  </CardContent>

                  {/* STATUS & ACTIONS */}
                  <CardFooter className="flex flex-col items-stretch gap-4">
                    <div className="flex items-center gap-3 font-black uppercase text-sm sm:text-base">
                      Durum: 
                      <Badge variant={
                        appt.status === "PENDING" ? "warning" :
                        appt.status === "ONAYLANDI" ? "success" : "danger"
                      } className="text-sm">
                        {appt.status}
                      </Badge>
                    </div>

                    {appt.status === "PENDING" && (
                      <div className="flex flex-col sm:flex-row gap-3 w-full pt-4 border-t-4 border-black">
                        <form action={approveAppointment.bind(null, appt.id) as any} className="flex-1">
                          <Button type="submit" variant="default" className="w-full bg-[#34d399] hover:bg-[#10b981]">
                            Onayla
                          </Button>
                        </form>
                        <form action={rejectAppointment.bind(null, appt.id) as any} className="flex-1">
                          <Button type="submit" variant="danger" className="w-full">
                            İptal
                          </Button>
                        </form>
                      </div>
                    )}
                  </CardFooter>

                </Card>
              );
            })}
          </div>
        )}

      </div>
    </div>
  );
}
