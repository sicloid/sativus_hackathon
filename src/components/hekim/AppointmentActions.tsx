"use client";

import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/Button";
import { CheckCircle2, XCircle, Loader2 } from "lucide-react";
import { approveAppointment, rejectAppointment } from "../../hekim/actions";

interface AppointmentActionsProps {
  appointmentId: string;
}

export function ApproveButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      disabled={pending}
      className="w-full h-14 bg-emerald-500 hover:bg-emerald-600 text-white border-4 border-black rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <CheckCircle2 className="w-5 h-5" />
      )}
      {pending ? "İşleniyor..." : "Onayla"}
    </Button>
  );
}

export function RejectButton() {
  const { pending } = useFormStatus();

  return (
    <Button 
      type="submit" 
      variant="danger"
      disabled={pending}
      className="w-full h-14 border-4 border-black rounded-2xl font-black uppercase shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-none flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
    >
      {pending ? (
        <Loader2 className="w-5 h-5 animate-spin" />
      ) : (
        <XCircle className="w-5 h-5" />
      )}
      {pending ? "..." : "İptal"}
    </Button>
  );
}

export default function AppointmentActions({ appointmentId }: AppointmentActionsProps) {
  return (
    <div className="grid grid-cols-2 gap-4 w-full">
      <form action={approveAppointment} className="w-full flex flex-col gap-2">
        <input type="hidden" name="appointmentId" value={appointmentId} />
        <div className="relative">
          <input
            type="number"
            name="examFee"
            placeholder="Muayene Ücreti (₺)"
            className="w-full h-10 border-2 border-black rounded-xl font-bold px-3 text-sm"
            required
            min="0"
            defaultValue="500"
          />
        </div>
        <ApproveButton />
      </form>
      <form action={() => rejectAppointment(appointmentId)} className="w-full">
        <RejectButton />
      </form>
    </div>
  );
}
