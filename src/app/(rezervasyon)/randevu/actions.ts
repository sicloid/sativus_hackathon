'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createAppointment(formData: FormData) {
  const petName = formData.get("petName") as string
  const petSpecies = formData.get("petSpecies") as string
  const ownerName = formData.get("ownerName") as string
  const ownerPhone = formData.get("ownerPhone") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  
  // AI Params
  const aiAciliyet = formData.get("aiAciliyet") as string || "Normal"
  const aiHizmet = formData.get("aiHizmet") as string || "Klinik"
  const aiOzeti = formData.get("aiOzeti") as string || ""

  if (!petName || !ownerName || !date || !time) {
    return { error: "Lütfen gerekli tüm alanları doldurun." }
  }

  try {
    // Check if slot exists or create it
    let slot = await prisma.appointmentSlot.findFirst({
      where: {
        date: new Date(date),
        startTime: time
      }
    })

    if (!slot) {
      slot = await prisma.appointmentSlot.create({
        data: {
          date: new Date(date),
          startTime: time,
          endTime: "23:59", // Dummy end time
          isAvailable: true
        }
      })
    }

    // Default provider (Mock ID, since we don't have login context for provider selection here)
    let provider = await prisma.provider.findFirst()
    if (!provider) {
      provider = await prisma.provider.create({
        data: {
          name: "Dr. AI Nöbetçi",
          title: "Veteriner Hekim"
        }
      })
    }

    await prisma.appointment.create({
      data: {
        petName,
        petSpecies,
        ownerName,
        ownerPhone,
        aiAciliyet,
        aiHizmet,
        aiOzeti,
        status: "PENDING",
        slotId: slot.id,
        providerId: provider.id,
      }
    })

  } catch (error) {
    console.error("Randevu oluşturma hatası:", error)
    return { error: "Randevu oluşturulurken bir hata oluştu." }
  }

  revalidatePath("/hekim")
  redirect("/hastane?randevu=basarili")
}
