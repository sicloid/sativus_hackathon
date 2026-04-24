/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { approveAppointment, rejectAppointment, dischargeAppointment } from "./actions";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { HekimTabs } from "./HekimTabs";

export const dynamic = "force-dynamic";

function getAciliyetColor(aciliyet: string | null) {
  switch (aciliyet) {
    case "Yüksek": return "bg-[#fecaca] border-red-400";
    case "Orta": return "bg-[#fef08a] border-yellow-400";
    case "Düşük": return "bg-[#bbf7d0] border-green-400";
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

function getAciliyetBadgeVariant(aciliyet: string | null) {
  switch (aciliyet) {
    case "Yüksek": return "danger" as const;
    case "Orta": return "warning" as const;
    case "Düşük": return "success" as const;
    default: return "neutral" as const;
  }
}

function AppointmentCard({ appt, showActions }: { appt: any; showActions: "pending" | "active" | "completed" }) {
  const aciliyetColor = getAciliyetColor(appt.aiAciliyet);
  const statusBadge = getStatusBadge(appt.status);

  return (
    <Card className={`${aciliyetColor} flex flex-col h-full border-l-8`}>
      <CardHeader className="flex flex-col sm:flex-row justify-between items-start gap-4">
        <div className="flex-1">
          <CardTitle className="text-xl sm:text-2xl break-words">
            🐾 {appt.petName} <span className="text-lg text-zinc-600 block sm:inline">({appt.petSpecies})</span>
          </CardTitle>
          <p className="font-bold text-md mt-2 break-words">👤 Sahip: {appt.ownerName}</p>
          {appt.ownerPhone && <p className="font-bold text-sm text-zinc-600">📞 {appt.ownerPhone}</p>}
        </div>

        <div className="text-left sm:text-right shrink-0 space-y-2">
          <Badge variant={statusBadge.variant} className="text-sm px-3 py-1">
            {statusBadge.label}
          </Badge>
          <div className="font-bold text-sm">
            📅 {new Date(appt.slot.date).toLocaleDateString("tr-TR")}
          </div>
          <Badge variant="neutral" className="text-xs px-2 py-1">
            🕐 {appt.slot.startTime}
          </Badge>
        </div>
      </CardHeader>

      {/* AI ÖZETİ */}
      <CardContent className="flex-grow space-y-3">
        {appt.aiOzeti ? (
          <Card className="bg-white/80 border-2 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]">
            <CardContent className="p-4 mt-0 space-y-3">
              <div className="flex flex-wrap gap-2">
                <Badge variant={getAciliyetBadgeVariant(appt.aiAciliyet)}>
                  ⚡ Aciliyet: {appt.aiAciliyet || "Belirsiz"}
                </Badge>
                <Badge variant="default">
                  🏥 {appt.aiHizmet || "Genel Muayene"}
                </Badge>
              </div>
              <p className="font-bold text-sm leading-relaxed">
                🤖 <span className="text-[#a855f7] font-black">VetAI:</span> {appt.aiOzeti}
              </p>
              {appt.aiDiagnosis && (
                <p className="font-bold text-sm leading-relaxed text-zinc-700">
                  📋 Ön Teşhis: {appt.aiDiagnosis}
                </p>
              )}
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-zinc-50 border-2">
            <CardContent className="p-4 mt-0">
              <p className="font-bold text-sm italic text-zinc-500">AI özeti bulunmuyor.</p>
            </CardContent>
          </Card>
        )}

        {appt.notes && (
          <Card className="bg-zinc-50 border-2">
            <CardContent className="p-4 mt-0">
              <p className="font-bold text-sm break-words">📝 Ek Notlar: {appt.notes}</p>
            </CardContent>
          </Card>
        )}
      </CardContent>

      {/* EYLEM BUTONLARI */}
      <CardFooter className="flex flex-col items-stretch gap-3">
        {showActions === "pending" && (
          <div className="flex flex-col sm:flex-row gap-3 w-full pt-4 border-t-4 border-black">
            <form action={approveAppointment.bind(null, appt.id) as any} className="flex-1">
              <Button type="submit" variant="default" className="w-full bg-[#34d399] hover:bg-[#10b981] text-lg font-black">
                ✅ Onayla
              </Button>
            </form>
            <form action={rejectAppointment.bind(null, appt.id) as any} className="flex-1">
              <Button type="submit" variant="danger" className="w-full text-lg font-black">
                ❌ Reddet
              </Button>
            </form>
          </div>
        )}

        {showActions === "active" && (
          <div className="w-full pt-4 border-t-4 border-black">
            <form action={dischargeAppointment.bind(null, appt.id) as any}>
              <Button type="submit" variant="outline" className="w-full text-lg font-black bg-[#93c5fd] hover:bg-[#60a5fa] border-blue-500">
                🏠 Taburcu Et
              </Button>
            </form>
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
    urgent: appointments.filter(a => a.aiAciliyet === "Yüksek" && a.status === "PENDING").length,
  };

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto space-y-6">

        {/* İSTATİSTİK KARTLARI */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <Card className="bg-[#fef08a] text-center p-4">
            <p className="text-3xl sm:text-4xl font-black">{stats.pending}</p>
            <p className="font-bold text-sm uppercase mt-1">Bekleyen</p>
          </Card>
          <Card className="bg-[#bbf7d0] text-center p-4">
            <p className="text-3xl sm:text-4xl font-black">{stats.active}</p>
            <p className="font-bold text-sm uppercase mt-1">Aktif</p>
          </Card>
          {stats.urgent > 0 && (
            <Card className="bg-[#fecaca] text-center p-4 animate-pulse">
              <p className="text-3xl sm:text-4xl font-black">{stats.urgent}</p>
              <p className="font-bold text-sm uppercase mt-1">🚨 Acil</p>
            </Card>
          )}
          <Card className="bg-[#e0e7ff] text-center p-4">
            <p className="text-3xl sm:text-4xl font-black">{stats.completed}</p>
            <p className="font-bold text-sm uppercase mt-1">Tamamlanan</p>
          </Card>
        </div>

        {/* TAB'LI RANDEVU LİSTESİ */}
        <HekimTabs
          pendingCards={
            pending.length === 0 ? (
              <Card className="bg-zinc-50 text-center p-8">
                <p className="font-bold text-lg">✅ Bekleyen randevu yok</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {pending.map(appt => (
                  <AppointmentCard key={appt.id} appt={appt} showActions="pending" />
                ))}
              </div>
            )
          }
          activeCards={
            active.length === 0 ? (
              <Card className="bg-zinc-50 text-center p-8">
                <p className="font-bold text-lg">Aktif hasta yok</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {active.map(appt => (
                  <AppointmentCard key={appt.id} appt={appt} showActions="active" />
                ))}
              </div>
            )
          }
          completedCards={
            completed.length === 0 ? (
              <Card className="bg-zinc-50 text-center p-8">
                <p className="font-bold text-lg">Tamamlanan kayıt yok</p>
              </Card>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
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
