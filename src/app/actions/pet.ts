"use server";

import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { revalidatePath } from "next/cache";

export async function addPet(formData: FormData) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const name = formData.get("name") as string;
  const species = formData.get("species") as string;
  const breed = (formData.get("breed") as string) || null;
  const ageStr = formData.get("age") as string;
  const weightStr = formData.get("weight") as string;

  if (!name || !species) return;

  await prisma.pet.create({
    data: {
      userId: user.id,
      name,
      species,
      breed,
      age: ageStr ? parseInt(ageStr) : null,
      weight: weightStr ? parseFloat(weightStr) : null,
    },
  });

  revalidatePath("/hastane/profil/evcil-hayvanlarim");
  revalidatePath("/hastane/profil");
}

export async function deletePet(petId: string) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return;

  const pet = await prisma.pet.findFirst({
    where: { id: petId, userId: user.id },
  });
  if (!pet) return;

  await prisma.pet.delete({ where: { id: petId } });

  revalidatePath("/hastane/profil/evcil-hayvanlarim");
  revalidatePath("/hastane/profil");
}
