import prisma from '@/lib/prisma';
import { createClient } from '@/utils/supabase/server';
import { redirect } from 'next/navigation';
import AddExamFeeButton from './AddExamFeeButton';
import { Calendar, Clock, Activity, FileText } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

export const dynamic = 'force-dynamic';

export default async function RandevularimPage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const resolvedSearchParams = await searchParams;
  const showSuccess = resolvedSearchParams.success === 'true';

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    redirect('/care-login');
  }

  // Kullanıcının randevularını getir
  const appointments = await prisma.appointment.findMany({
    where: {
      ownerName: user.user_metadata?.full_name || '', // Veya userId üzerinden daha sağlam bir eşleştirme yapılabilir, ancak şu an ownerName/ownerPhone kullanılıyor
    },
    include: {
      provider: true,
      slot: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });

  return (
    <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sm:p-8 rounded-2xl">
      <h2 className="text-3xl font-black uppercase mb-6 border-b-4 border-black pb-2">Randevularım</h2>
      
      {showSuccess && (
        <div className="bg-emerald-300 border-4 border-black p-4 mb-6 rounded-xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] font-black uppercase text-center text-emerald-900">
          🎉 Randevunuz başarıyla oluşturuldu!
        </div>
      )}

      {appointments.length === 0 ? (
        <div className="text-zinc-600 font-bold bg-zinc-50 p-6 rounded-xl border-2 border-dashed border-zinc-300 text-center">
          Henüz alınmış bir randevunuz bulunmuyor.
        </div>
      ) : (
        <div className="space-y-6">
          {appointments.map((appt) => {
            const isCompleted = appt.status === 'TAMAMLANDI';
            const isApproved = appt.status === 'ONAYLANDI';
            
            return (
              <div key={appt.id} className="border-4 border-black rounded-xl p-5 bg-[#fdfdfd] shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
                
                <div className="space-y-3 flex-grow">
                  <div className="flex flex-wrap gap-2 items-center">
                    <Badge variant="neutral" className={`${isCompleted ? 'bg-emerald-500' : isApproved ? 'bg-blue-500' : 'bg-yellow-500'} text-white border-2 border-black font-black uppercase`}>
                      {appt.status}
                    </Badge>
                    <span className="font-bold text-sm text-zinc-500 flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {new Date(appt.slot.date).toLocaleDateString('tr-TR')}
                    </span>
                    <span className="font-bold text-sm text-zinc-500 flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {appt.slot.startTime} - {appt.slot.endTime}
                    </span>
                  </div>
                  
                  <div>
                    <h3 className="text-xl font-black uppercase">{appt.petName} <span className="text-sm font-bold text-zinc-500 normal-case">({appt.petSpecies})</span></h3>
                    <p className="font-bold text-zinc-700 flex items-center gap-1 mt-1">
                      <Activity className="w-4 h-4 text-rose-500" />
                      {appt.provider.name}
                    </p>
                  </div>

                  {appt.aiHizmet && (
                    <div className="bg-blue-50 p-3 rounded-lg border-2 border-blue-200">
                      <p className="text-xs font-black uppercase text-blue-600 mb-1 flex items-center gap-1">
                        <FileText className="w-3 h-3" /> VetAI Özet
                      </p>
                      <p className="text-sm font-bold">{appt.aiHizmet}</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-3 w-full md:w-auto">
                  {(isApproved || isCompleted) && (
                    <AddExamFeeButton appointmentId={appt.id} petName={appt.petName} examFee={appt.examFee} />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
