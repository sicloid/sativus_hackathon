"use client";

import { useState } from "react";
import { updatePet } from "@/app/actions/pet";
import { Button } from "@/components/ui/Button";

export default function EditPetModal({ pet }: { pet: any }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button 
        variant="outline" 
        onClick={() => setIsOpen(true)}
        className="text-sm border-2 border-black font-black"
      >
        ✏️ Düzenle
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-2xl w-full max-w-md p-6 relative">
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 font-black text-xl hover:text-red-500"
            >
              ✕
            </button>
            <h3 className="text-2xl font-black uppercase mb-4">🐾 {pet.name} Düzenle</h3>
            <form 
              action={async (formData) => {
                await updatePet(formData);
                setIsOpen(false);
              }} 
              className="space-y-4"
            >
              <input type="hidden" name="petId" value={pet.id} />
              
              <div>
                <label className="block font-bold text-sm uppercase mb-1">Yaş</label>
                <input
                  name="age"
                  type="number"
                  min="0"
                  defaultValue={pet.age || ""}
                  placeholder="3"
                  className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
                />
              </div>
              
              <div>
                <label className="block font-bold text-sm uppercase mb-1">Kilo (kg)</label>
                <input
                  name="weight"
                  type="number"
                  step="0.1"
                  min="0"
                  defaultValue={pet.weight || ""}
                  placeholder="12.5"
                  className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
                />
              </div>

              <Button type="submit" variant="default" className="w-full bg-[#fef08a] hover:bg-[#fde047] text-lg font-black py-3 mt-4">
                Kaydet
              </Button>
            </form>
          </div>
        </div>
      )}
    </>
  );
}
