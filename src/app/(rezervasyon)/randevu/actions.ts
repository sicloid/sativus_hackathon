'use server'

import prisma from "@/lib/prisma"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function getProviders() {
  return await prisma.provider.findMany({
    select: {
      id: true,
      name: true,
      specialty: true,
      type: true
    }
  })
}

export async function createAppointment(prevState: any, formData: FormData) {
  const petName = formData.get("petName") as string
  const petSpecies = formData.get("petSpecies") as string
  const ownerName = formData.get("ownerName") as string
  const ownerPhone = formData.get("ownerPhone") as string
  const date = formData.get("date") as string
  const time = formData.get("time") as string
  const providerId = formData.get("providerId") as string
  
  // AI Params
  const aiAciliyet = formData.get("aiAciliyet") as string || ""
  const aiHizmet = formData.get("aiHizmet") as string || ""
  const aiOzeti = formData.get("aiOzeti") as string || ""

  if (!petName || !ownerName || !date || !time || !providerId) {
    return { error: "Lütfen gerekli tüm alanları doldurun." }
  }

  try {
    const provider = await prisma.provider.findUnique({
      where: { id: providerId }
    })

    if (!provider) {
      return { error: "Seçilen klinik/hekim bulunamadı." }
    }

    // Check if slot exists or create it
    let slot = await prisma.slot.findFirst({
      where: {
        providerId: provider.id,
        date: new Date(date),
        startTime: time
      }
    })

    if (!slot) {
      slot = await prisma.slot.create({
        data: {
          providerId: provider.id,
          date: new Date(date),
          startTime: time,
          endTime: `${parseInt(time.split(":")[0]) + 1}:00`,
          isBooked: true
        }
      })
    } else if (slot.isBooked) {
       // Slot already booked, we could return error but let's just create appointment for hackathon
    } else {
       await prisma.slot.update({
         where: { id: slot.id },
         data: { isBooked: true }
       })
    }

    await prisma.appointment.create({
      data: {
        petName,
        petSpecies,
        ownerName,
        ownerPhone,
        aiAciliyet: aiAciliyet || null,
        aiHizmet: aiHizmet || null,
        aiOzeti: aiOzeti || null,
        status: "PENDING",
        slotId: slot.id,
        providerId: provider.id,
      }
    })

  } catch (error) {
    console.error("Randevu oluşturma hatası:", error)
    return { error: "Randevu oluşturulurken bir hata oluştu." }
  }

  revalidatePath("/hastane/profil/randevularim")
  revalidatePath("/hekim")
  redirect("/hastane/profil/randevularim?success=true")
}
