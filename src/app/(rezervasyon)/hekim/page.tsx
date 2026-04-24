import prisma from "@/lib/prisma";
import { approveAppointment, rejectAppointment, dischargeAppointment } from "./actions";
import { logoutAction } from "@/app/actions/auth";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HekimTabs } from "./HekimTabs";
import { CheckCircle2, XCircle, Clock, Calendar, Phone, User, Activity, LogOut, Home } from "lucide-react";

export const dynamic = "force-dynamic";

function getAciliyetColor(aciliyet: string | null) {
  switch (aciliyet) {
    case "Yüksek": return "bg-[#fee2e2] border-rose-400";
    case "Kritik": return "bg-[#fee2e2] border-rose-600 animate-pulse";
    case "Normal": return "bg-[#fef9c3] border-yellow-400";
    case "Düşük": return "bg-[#dcfce7] border-emerald-400";
    default: return "bg-white border-zinc-200";
  }
}

function getStatusBadge(status: string) {
  switch (status) {
    case "PENDING": return { label: "Beklemede", variant: "warning" as const };
    case "ONAYLANDI": return { label: "Aktif Tedavi", variant: "success" as const };
    case "TABURCU": return { label: "Taburcu", variant: "neutral" as const };
    case "İPTAL EDİLDİ": return { label: "İptal Edildi", variant: "danger" as const };
    default: return { label: status, variant: "neutral" as const };
  }
}

function AppointmentCard({ appt, showActions }: { appt: any; showActions: "pending" | "active" | "completed" }) {
  const aciliyetColor = getAciliyetColor(appt.aiAciliyet);
  const statusBadge = getStatusBadge(appt.status);
  const isUrgent = appt.aiAciliyet === "Yüksek" || appt.aiAciliyet === "Kritik";

  return (
    <Card className={`${aciliyetColor} flex flex-col h-full border-4 border-black rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-all`}>
      <CardHeader className="p-6 border-b-2 border-black flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <CardTitle className="text-2xl font-black uppercase tracking-tighter break-words">
            🐾 {appt.petName} <span className="text-lg text-zinc-600 block sm:inline">({appt.petSpecies})</span>
          </CardTitle>
          <div className="flex items-center gap-2 mt-2 font-bold text-sm">
            <User className="w-4 h-4 text-zinc-400" />
            <span>{appt.ownerName}</span>
          </div>
          {appt.ownerPhone && (
            <div className="flex items-center gap-2 font-bold text-xs text-zinc-500">
              <Phone className="w-3 h-3" />
              <span>{appt.ownerPhone}</span>
            </div>
          )}
        </div>

        <div className="text-left sm:text-right shrink-0 space-y-2">
          <Badge variant={statusBadge.variant} className="text-xs px-3 py-1 border-2 border-black">
            {statusBadge.label}
          </Badge>
          <div className="font-black text-sm flex items-center justify-end gap-1">
            <Calendar className="w-4 h-4" />
            {new Date(appt.slot.date).toLocaleDateString("tr-TR")}
          </div>
          <div className="font-black text-xs flex items-center justify-end gap-1 text-zinc-600">
            <Clock className="w-3 h-3" />
            {appt.slot.startTime}
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-6 flex-grow space-y-4">
        {/* VetAI Insights Section */}
        <div className="border-2 border-black rounded-xl p-4 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
          <div className="flex items-center justify-between">
            <span className="font-black text-[10px] uppercase tracking-widest text-blue-600 flex items-center gap-1">
              <Activity className="w-3 h-3" />
              VetAI Analizi
            </span>
            <Badge className={`${isUrgent ? 'bg-rose-500' : 'bg-emerald-500'} text-white border-2 border-black text-[10px]`}>
              {appt.aiAciliyet}
            </Badge>
          </div>
          
          <p className="font-black text-sm">{appt.aiHizmet || "Genel Muayene"}</p>
          
          <div className="pt-2 border-t border-zinc-100">
            <p className="font-bold text-xs leading-relaxed italic text-zinc-700">
              "{appt.aiOzeti || 'AI özeti bulunmuyor.'}"
            </p>
          </div>
        </div>

        {appt.notes && (
          <div className="bg-zinc-50 border-2 border-black border-dashed rounded-xl p-3">
            <p className="text-[10px] font-black uppercase text-zinc-400 mb-1">Müşteri Notu</p>
            <p className="font-bold text-xs italic">"{appt.notes}"</p>
          </div>
        )}
      </CardContent>

      <CardFooter className="p-6 pt-0 mt-auto">
        {showActions === "pending" && (
          <div className="grid grid-cols-2 gap-3 w-full">
            <form action={approveAppointment.bind(null, appt.id) as any} className="w-full">
              <Button type="submit" className="w-full h-12 bg-emerald-400 hover:bg-emerald-500 text-black border-2 border-black rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                Onayla
              </Button>
            </form>
            <form action={rejectAppointment.bind(null, appt.id) as any} className="w-full">
              <Button type="submit" variant="danger" className="w-full h-12 border-2 border-black rounded-xl font-black uppercase text-xs shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2 text-white">
                <XCircle className="w-4 h-4" />
                Reddet
              </Button>
            </form>
          </div>
        )}

        {showActions === "active" && (
          <div className="w-full">
            <form action={dischargeAppointment.bind(null, appt.id) as any}>
              <Button type="submit" className="w-full h-12 bg-blue-400 hover:bg-blue-500 text-black border-2 border-black rounded-xl font-black uppercase text-sm shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none transition-all flex items-center justify-center gap-2">
                <Home className="w-5 h-5" />
                Taburcu Et
              </Button>
            </form>
          </div>
        )}
        
        {showActions === "completed" && (
          <div className="w-full py-3 border-2 border-black rounded-xl bg-zinc-100 text-center font-black uppercase text-[10px] tracking-widest opacity-50">
            Kayıt Arşivlendi
          </div>
        )}
      </CardFooter>
    </Card>
  );
}

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

  const pending = appointments.filter(a => a.status === "PENDING");
  const active = appointments.filter(a => a.status === "ONAYLANDI");
  const completed = appointments.filter(a => a.status === "TABURCU" || a.status === "İPTAL EDİLDİ");

  const stats = {
    total: appointments.length,
    pending: pending.length,
    active: active.length,
    completed: completed.length,
    urgent: appointments.filter(a => (a.aiAciliyet === "Yüksek" || a.aiAciliyet === "Kritik") && a.status === "PENDING").length,
  };

  return (
    <div className="min-h-screen bg-[#fdfdfd] text-black font-sans pb-20 p-4 sm:p-6 lg:p-10">
      <div className="max-w-7xl mx-auto space-y-10">
        
        {/* HEADER SECTION */}
        <div className="bg-[#bfdbfe] border-4 border-black rounded-[2.5rem] p-8 sm:p-12 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden">
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
              <form action={logoutAction}>
                <Button type="submit" variant="danger" className="w-full md:w-auto text-lg px-8 flex items-center gap-2 h-14 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black font-black uppercase">
                  <LogOut className="w-6 h-6" />
                  Çıkış Yap
                </Button>
              </form>
              <Link href="/hastane" className="w-full md:w-auto">
                <Button variant="outline" className="w-full md:w-auto text-lg px-8 h-14 rounded-2xl shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] border-4 border-black font-black uppercase bg-white">
                  Care Ana Sayfa
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* İSTATİSTİK KARTLARI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          <Card className="bg-[#fef9c3] border-4 border-black p-6 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Bekleyen</p>
            <p className="text-4xl font-black">{stats.pending}</p>
          </Card>
          <Card className="bg-[#dcfce7] border-4 border-black p-6 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-zinc-500 mb-1">Aktif</p>
            <p className="text-4xl font-black">{stats.active}</p>
          </Card>
          {stats.urgent > 0 && (
            <Card className="bg-[#fee2e2] border-4 border-black p-6 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pulse">
              <p className="text-xs font-black uppercase tracking-widest text-rose-600 mb-1">🚨 Acil Vaka</p>
              <p className="text-4xl font-black text-rose-700">{stats.urgent}</p>
            </Card>
          )}
          <Card className="bg-[#e0e7ff] border-4 border-black p-6 rounded-[2rem] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]">
            <p className="text-xs font-black uppercase tracking-widest text-indigo-500 mb-1">Tamamlanan</p>
            <p className="text-4xl font-black">{stats.completed}</p>
          </Card>
        </div>

        {/* TAB'LI RANDEVU LİSTESİ */}
        <HekimTabs
          pendingCards={
            pending.length === 0 ? (
              <Card className="bg-zinc-50 border-4 border-black border-dashed rounded-[3rem] text-center p-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-2xl uppercase text-zinc-400">Bekleyen randevu yok</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {pending.map(appt => (
                  <AppointmentCard key={appt.id} appt={appt} showActions="pending" />
                ))}
              </div>
            )
          }
          activeCards={
            active.length === 0 ? (
              <Card className="bg-zinc-50 border-4 border-black border-dashed rounded-[3rem] text-center p-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-2xl uppercase text-zinc-400">Aktif hasta yok</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {active.map(appt => (
                  <AppointmentCard key={appt.id} appt={appt} showActions="active" />
                ))}
              </div>
            )
          }
          completedCards={
            completed.length === 0 ? (
              <Card className="bg-zinc-50 border-4 border-black border-dashed rounded-[3rem] text-center p-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]">
                <p className="font-black text-2xl uppercase text-zinc-400">Tamamlanan kayıt yok</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {completed.map(appt => (
                  <AppointmentCard key={appt.id} appt={appt} showActions="completed" />
                ))}
              </div>
            )
          }
          pendingCount={stats.pending}
          activeCount={stats.active}
          completedCount={stats.completed}
        />

      </div>
    </div>
  );
}
