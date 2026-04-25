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

    // Override ownerName with authenticated user's full_name if available (fixes profile matching)
    let finalOwnerName = ownerName;
    const { createClient } = await import("@/utils/supabase/server");
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    
    let petIdForPrescription: string | null = null;

    if (user && user.user_metadata?.full_name) {
      finalOwnerName = user.user_metadata.full_name;
    }

    if (user) {
      // Check if pet exists for this user, if not create a stub
      let pet = await prisma.pet.findFirst({
        where: { 
          name: petName,
          userId: user.id
        }
      });

      if (!pet) {
        pet = await prisma.pet.create({
          data: {
            userId: user.id,
            name: petName,
            species: petSpecies || "Belirtilmedi"
          }
        });
      }
      petIdForPrescription = pet.id;
    }

    // Auto Approve High Urgency AI cases
    let status = "PENDING";
    let examFee = null;
    if (aiAciliyet === "Yüksek") {
      status = "ONAYLANDI";
      examFee = 800;
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
       // Slot already booked
    } else {
       await prisma.slot.update({
         where: { id: slot.id },
         data: { isBooked: true }
       })
    }

    const appt = await prisma.appointment.create({
      data: {
        petName,
        petSpecies,
        ownerName: finalOwnerName,
        ownerPhone,
        aiAciliyet: aiAciliyet || null,
        aiHizmet: aiHizmet || null,
        aiOzeti: aiOzeti || null,
        status,
        examFee,
        userId: user?.id || null,
        slotId: slot.id,
        providerId: provider.id,
      }
    })

    // Auto create prescription for high urgency exam fee
    if (status === "ONAYLANDI" && examFee && petIdForPrescription) {
        await prisma.prescription.create({
          data: {
            petId: petIdForPrescription,
            vetUserId: provider.id,
            vetName: provider.name,
            diagnosis: aiOzeti || "Yüksek Aciliyetli AI Ön Teşhisi",
            notes: "Muayene Ücreti Otomatik Olarak Eklendi",
            totalPrice: examFee,
            items: {
              create: [
                {
                  name: "Muayene Ücreti (Acil)",
                  quantity: 1,
                  price: examFee,
                }
              ]
            }
          }
        });
      }
    }

  } catch (error) {
    console.error("Randevu oluşturma hatası:", error)
    return { error: "Randevu oluşturulurken bir hata oluştu." }
  }

  revalidatePath("/hastane/profil/randevularim")
  revalidatePath("/hekim")
  
  return { success: true }
}
