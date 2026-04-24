"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function approveAppointment(appointmentId: string) {
  try {
    await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "ONAYLANDI" },
    });
    
    revalidatePath("/hekim");
    revalidatePath("/hekim/hastalarim");
    return { success: true };
  } catch (error) {
    console.error("Randevu onaylanırken hata oluştu:", error);
    return { success: false, error: "Randevu onaylanamadı." };
  }
}

export async function rejectAppointment(appointmentId: string) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "İPTAL EDİLDİ" },
    });

    // Slotu serbest bırak
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

export async function dischargeAppointment(appointmentId: string) {
  try {
    const appointment = await prisma.appointment.update({
      where: { id: appointmentId },
      data: { status: "TABURCU" },
    });

    // Slotu serbest bırak
    await prisma.slot.update({
      where: { id: appointment.slotId },
      data: { isBooked: false },
    });

    revalidatePath("/hekim");
    revalidatePath("/hekim/hastalarim");
    revalidatePath("/hekim/teshisler");
    return { success: true };
  } catch (error) {
    console.error("Hasta taburcu edilirken hata oluştu:", error);
    return { success: false, error: "Hasta taburcu edilemedi." };
  }
}

export async function logoutHekim() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  revalidatePath("/", "layout");
  redirect("/hekim-login");
}
