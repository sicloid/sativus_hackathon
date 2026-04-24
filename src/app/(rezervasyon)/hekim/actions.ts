"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function approveAppointment(appointmentId: string, formData?: FormData) {
  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "ONAYLANDI" },
    });
    
    // Refresh the dashboard
    revalidatePath("/hekim");
    return { success: true };
  } catch (error) {
    console.error("Randevu onaylanırken hata oluştu:", error);
    return { success: false, error: "Randevu onaylanamadı." };
  }
}

export async function rejectAppointment(appointmentId: string, formData?: FormData) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "İPTAL EDİLDİ" },
    });

    // We must also free up the slot so others can book it!
    await prisma.slot.update({
      where: { id: appointment.slotId },
      data: { isBooked: false },
    });

    revalidatePath("/hekim");
    return { success: true };
  } catch (error) {
    console.error("Randevu iptal edilirken hata oluştu:", error);
    return { success: false, error: "Randevu iptal edilemedi." };
  }
}
