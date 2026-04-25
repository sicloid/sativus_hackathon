import prisma from "@/lib/prisma";
import { approveAppointment, rejectAppointment } from "./actions";
import { logoutAction } from "@/app/actions/auth"; 
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { CheckCircle2, XCircle, Clock, Calendar, Phone, User, Activity, LogOut } from "lucide-react";

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
    <div className="min-h-screen bg-[#fdfdfd] text-black font-sans pb-20 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="bg-[#bfdbfe] border-4 border-black rounded-[2.5rem] p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
          {/* Decorative element */}
          <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-300 rounded-full opacity-30"></div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 relative z-10">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 bg-white border-2 border-black px-4 py-1 rounded-full font-black text-xs uppercase tracking-widest shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <Activity className="w-4 h-4 text-blue-600" />
                Sistem Aktif
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tighter uppercase leading-none">
                Hekim <span className="text-blue-700">Kontrol Merkezi</span>
              </h1>
              <p className="text-zinc-800 font-bold text-lg sm:text-xl max-w-2xl">
                VetAI asistanı tarafından ön-teşhisi konulmuş aktif randevu taleplerini yönetin.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 w-full md:w-auto">
              <Link href="/hekim/ayarlar" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto text-lg px-8 h-14 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white text-black hover:bg-gray-100 border-4 border-black font-black uppercase">
                  Ayarlar / 2FA
                </Button>
              </Link>
              <Link href="/hastane" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto text-lg px-8 h-14 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] bg-white text-black hover:bg-gray-100 border-4 border-black font-black uppercase">
                  Care Ana Sayfa
                </Button>
              </Link>
              <form action={logoutAction}>
                <Button type="submit" variant="danger" className="w-full md:w-auto text-lg px-8 flex items-center gap-2 h-14 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
                  <LogOut className="w-6 h-6" />
                  Çıkış Yap
                </Button>
              </form>
            </div>
          </div>
        </div>

        {/* STATS SUMMARY */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: 'Toplam Talep', val: appointments.length, color: 'bg-white' },
            { label: 'Bekleyen', val: appointments.filter(a => a.status === 'PENDING').length, color: 'bg-yellow-100' },
            { label: 'Onaylanan', val: appointments.filter(a => a.status === 'ONAYLANDI').length, color: 'bg-green-100' },
            { label: 'Kritik Vaka', val: appointments.filter(a => a.aiAciliyet === 'Kritik').length, color: 'bg-rose-100' },
          ].map((stat, i) => (
            <div key={i} className={`${stat.color} border-4 border-black p-4 rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]`}>
              <p className="text-xs font-black uppercase tracking-widest text-zinc-500">{stat.label}</p>
              <p className="text-3xl font-black">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* APPOINTMENT GRID */}
        {appointments.length === 0 ? (
          <Card className="bg-rose-100 border-4 border-black text-center p-12 sm:p-20 rounded-[3rem] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)]">
            <div className="w-24 h-24 bg-white border-4 border-black rounded-3xl mx-auto mb-8 flex items-center justify-center rotate-3 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
              <Calendar className="w-12 h-12 text-zinc-300" />
            </div>
            <CardTitle className="text-4xl font-black uppercase tracking-tighter">Henüz Randevu Yok</CardTitle>
            <p className="font-bold text-xl mt-4 text-zinc-600">Sisteme henüz düşen bir hasta talebi bulunmuyor.</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {appointments.map((appt) => {
              const isUrgent = appt.aiAciliyet === "Yüksek" || appt.aiAciliyet === "Kritik";
              const isNormal = appt.aiAciliyet === "Normal" || appt.aiAciliyet === "Düşük";
              
              let cardBgClass = "bg-white"; 
              let accentColor = "border-zinc-200";
              if (isUrgent) { cardBgClass = "bg-[#fee2e2]"; accentColor = "border-rose-400"; }
              else if (isNormal) { cardBgClass = "bg-[#dcfce7]"; accentColor = "border-emerald-400"; }
              else { cardBgClass = "bg-[#fef9c3]"; accentColor = "border-yellow-400"; }

              return (
                <Card key={appt.id} className={`${cardBgClass} border-4 border-black rounded-[2.5rem] shadow-[10px_10px_0px_0px_rgba(0,0,0,1)] flex flex-col h-full hover:-translate-y-2 transition-all`}>
                  
                  <CardHeader className="p-8 border-b-4 border-black">
                    <div className="flex justify-between items-start mb-4">
                      <Badge variant="neutral" className="bg-black text-white px-4 py-1 rounded-full font-black text-xs uppercase">
                        {appt.status}
                      </Badge>
                      <div className="flex flex-col items-end">
                        <span className="flex items-center gap-1 font-black text-lg">
                          <Clock className="w-4 h-4" />
                          {appt.slot.startTime}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-600">
                          {new Date(appt.slot.date).toLocaleDateString("tr-TR")}
                        </span>
                      </div>
                    </div>
                    
                    <div className="space-y-1">
                      <h2 className="text-3xl font-black uppercase tracking-tighter leading-none">
                        {appt.petName}
                      </h2>
                      <div className="flex items-center gap-2 font-bold text-zinc-600 uppercase text-xs">
                        <Activity className="w-3 h-3" />
                        {appt.petSpecies} • {appt.petAge ? `${appt.petAge} Yaş` : 'Yaş Bilinmiyor'}
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="p-8 space-y-6 flex-grow">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 font-bold">
                        <User className="w-4 h-4 text-zinc-400" />
                        <span className="text-sm uppercase tracking-tight">{appt.ownerName}</span>
                      </div>
                      {appt.ownerPhone && (
                        <div className="flex items-center gap-2 font-bold">
                          <Phone className="w-4 h-4 text-zinc-400" />
                          <span className="text-sm">{appt.ownerPhone}</span>
                        </div>
                      )}
                    </div>

                    <div className={`border-2 border-black rounded-2xl p-5 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-4 ${accentColor}`}>
                      <div className="flex items-center justify-between">
                        <span className="font-black text-[10px] uppercase tracking-[0.2em] text-blue-600 flex items-center gap-1">
                          <Activity className="w-3 h-3" />
                          VetAI Insights
                        </span>
                        <Badge className={`${isUrgent ? 'bg-rose-500' : 'bg-emerald-500'} text-white border-2 border-black`}>
                          {appt.aiAciliyet}
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <p className="font-bold text-xs uppercase text-zinc-400">Olası Teşhis / Hizmet</p>
                        <p className="font-black text-sm">{appt.aiHizmet || 'Belirtilmedi'}</p>
                      </div>

                      <div className="pt-2 border-t-2 border-zinc-100">
                        <p className="font-bold text-xs leading-relaxed text-zinc-700 italic">
                          "{appt.aiOzeti || 'Hasta hakkında AI özeti bulunmuyor.'}"
                        </p>
                      </div>
                    </div>
                    
                    {appt.notes && (
                      <div className="bg-white/50 border-2 border-dashed border-black rounded-xl p-4">
                        <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Hekim Notu</p>
                        <p className="font-bold text-sm">{appt.notes}</p>
                      </div>
                    )}
                  </CardContent>

                  <CardFooter className="p-8 pt-0 mt-auto">
                    {appt.status === "PENDING" ? (
                      <div className="grid grid-cols-2 gap-4 w-full">
                        <form action={approveAppointment.bind(null, appt.id) as any} className="w-full">
                          <Button type="submit" className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white border-4 border-black rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2">
                            <CheckCircle2 className="w-5 h-5" />
                            Onayla
                          </Button>
                        </form>
                        <form action={rejectAppointment.bind(null, appt.id) as any} className="w-full">
                          <Button type="submit" variant="danger" className="w-full h-14 border-4 border-black rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2">
                            <XCircle className="w-5 h-5" />
                            İptal
                          </Button>
                        </form>
                      </div>
                    ) : (
                      <div className="w-full py-4 border-4 border-black rounded-2xl bg-zinc-100 text-center font-black uppercase text-sm tracking-widest opacity-50">
                        İşlem Tamamlandı
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
