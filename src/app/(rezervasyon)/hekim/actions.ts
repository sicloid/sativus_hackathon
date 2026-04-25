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

export async function addVaccination(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const petId = formData.get("petId") as string;
  const name = formData.get("name") as string;
  const dateStr = formData.get("date") as string;
  const nextDateStr = formData.get("nextDate") as string;
  const notes = formData.get("notes") as string;

  if (!petId || !name || !dateStr) return;

  const vetName = user.user_metadata?.username || user.email?.split("@")[0] || "Hekim";

  await prisma.vaccination.create({
    data: {
      petId,
      name,
      date: new Date(dateStr),
      nextDate: nextDateStr ? new Date(nextDateStr) : null,
      vetName,
      notes: notes || null,
    },
  });

  revalidatePath("/hekim/hastalarim");
  revalidatePath("/hekim/asi-ekle");
  return;
}

export async function createPrescription(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { error: "Yetki yok." };

  const petId = formData.get("petId") as string;
  const diagnosis = formData.get("diagnosis") as string;
  const notes = formData.get("notes") as string;
  const itemsJson = formData.get("items") as string;

  if (!petId || !itemsJson) return { error: "Pet ve ilaç listesi zorunludur." };

  const vetName = user.user_metadata?.username || user.email?.split("@")[0] || "Hekim";

  let items: Array<{ name: string; dosage?: string; quantity: number; price: number; productId?: string }>;
  try {
    items = JSON.parse(itemsJson);
  } catch {
    return { error: "İlaç listesi formatı hatalı." };
  }

  const totalPrice = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  await prisma.prescription.create({
    data: {
      petId,
      vetUserId: user.id,
      vetName,
      diagnosis: diagnosis || null,
      notes: notes || null,
      totalPrice,
      items: {
        create: items.map(item => ({
          name: item.name,
          dosage: item.dosage || null,
          quantity: item.quantity,
          price: item.price,
          productId: item.productId || null,
        })),
      },
    },
  });

  revalidatePath("/hekim/recete-yaz");
  revalidatePath("/hekim/hastalarim");
  return { success: true };
}

