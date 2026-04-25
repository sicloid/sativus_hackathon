/* eslint-disable @typescript-eslint/no-explicit-any */
import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { addPet, deletePet } from "@/app/actions/pet";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import EditPetModal from "./EditPetModal";

export const dynamic = "force-dynamic";

export default async function EvcilHayvanlarimPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/care-login");

  const pets = await prisma.pet.findMany({
    where: { userId: user.id },
    include: {
      vaccinations: {
        orderBy: { date: "desc" },
      },
      prescriptions: {
        orderBy: { createdAt: "desc" },
        take: 3,
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 rounded-2xl">
        <h2 className="text-3xl font-black uppercase mb-2 border-b-4 border-black pb-2">
          🐾 Evcil Hayvanlarım
        </h2>
        <p className="font-bold text-zinc-600">
          {pets.length} evcil hayvanınız kayıtlı
        </p>
      </div>

      {/* YENİ PET EKLE FORMU */}
      <Card className="bg-[#e9d5ff]">
        <CardContent className="p-6 mt-0">
          <h3 className="text-xl font-black uppercase mb-4">➕ Yeni Evcil Hayvan Ekle</h3>
          <form action={addPet} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <div>
              <label className="block font-bold text-sm uppercase mb-1">İsim *</label>
              <input
                name="name"
                required
                placeholder="Boncuk"
                className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-sm uppercase mb-1">Tür *</label>
              <select
                name="species"
                required
                className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
              >
                <option value="">Seçin</option>
                <option value="Köpek">🐕 Köpek</option>
                <option value="Kedi">🐈 Kedi</option>
                <option value="Kuş">🐦 Kuş</option>
                <option value="Balık">🐠 Balık</option>
                <option value="Hamster">🐹 Hamster</option>
                <option value="Tavşan">🐰 Tavşan</option>
                <option value="Sürüngen">🦎 Sürüngen</option>
                <option value="Diğer">Diğer</option>
              </select>
            </div>
            <div>
              <label className="block font-bold text-sm uppercase mb-1">Cins</label>
              <input
                name="breed"
                placeholder="Golden Retriever"
                className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
              />
            </div>
            <div>
              <label className="block font-bold text-sm uppercase mb-1">Yaş</label>
              <input
                name="age"
                type="number"
                min="0"
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
                placeholder="12.5"
                className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
              />
            </div>
            <div className="flex items-end">
              <Button type="submit" variant="default" className="w-full bg-[#34d399] hover:bg-[#10b981] text-lg font-black py-3">
                Ekle
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* PET LİSTESİ */}
      {pets.length === 0 ? (
        <Card className="bg-zinc-50 text-center p-8">
          <p className="font-bold text-lg">Henüz evcil hayvan eklemediniz.</p>
          <p className="font-bold text-zinc-500 mt-2">Yukarıdaki formu kullanarak ilk evcil hayvanınızı ekleyin.</p>
        </Card>
      ) : (
        <div className="space-y-6">
          {pets.map(pet => {
            const speciesEmoji = {
              "Köpek": "🐕", "Kedi": "🐈", "Kuş": "🐦", "Balık": "🐠",
              "Hamster": "🐹", "Tavşan": "🐰", "Sürüngen": "🦎",
            }[pet.species] || "🐾";

            const upcomingVax = pet.vaccinations.find(v => v.nextDate && new Date(v.nextDate) > new Date());

            return (
              <Card key={pet.id} className="border-l-8 border-l-[#a855f7]">
                <CardContent className="p-6 mt-0">
                  {/* PET HEADER */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 pb-4 border-b-4 border-black">
                    <div>
                      <h3 className="text-2xl font-black">
                        {speciesEmoji} {pet.name}
                      </h3>
                      <div className="flex flex-wrap gap-2 mt-2">
                        <Badge variant="default">{pet.species}</Badge>
                        {pet.breed && <Badge variant="neutral">{pet.breed}</Badge>}
                        {pet.age ? <Badge variant="neutral">{pet.age} yaş</Badge> : null}
                        {pet.weight ? <Badge variant="neutral">{pet.weight} kg</Badge> : null}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <EditPetModal pet={pet} />
                      <form action={deletePet.bind(null, pet.id) as any}>
                        <Button type="submit" variant="danger" className="text-sm">
                          🗑️ Sil
                        </Button>
                      </form>
                    </div>
                  </div>

                  {/* AŞI TAKVİMİ */}
                  <div className="mb-4">
                    <h4 className="font-black uppercase text-sm mb-2">💉 Aşı Takvimi</h4>
                    {pet.vaccinations.length === 0 ? (
                      <p className="font-bold text-sm text-zinc-500 italic">
                        Henüz aşı kaydı yok. Hekiminiz aşı kayıtlarınızı ekleyecektir.
                      </p>
                    ) : (
                      <div className="space-y-2">
                        {upcomingVax && (
                          <div className="bg-[#fef08a] border-2 border-black rounded-lg p-3 flex items-center gap-2">
                            <span className="font-black text-sm">⏰ Sonraki Aşı:</span>
                            <Badge variant="warning">
                              {upcomingVax.name} — {new Date(upcomingVax.nextDate!).toLocaleDateString("tr-TR")}
                            </Badge>
                          </div>
                        )}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {pet.vaccinations.map(vax => (
                            <div key={vax.id} className="bg-zinc-50 border-2 border-black rounded-lg p-3">
                              <div className="flex justify-between items-center">
                                <span className="font-black text-sm">{vax.name}</span>
                                <Badge variant="success" className="text-xs">
                                  {new Date(vax.date).toLocaleDateString("tr-TR")}
                                </Badge>
                              </div>
                              {vax.vetName && <p className="text-xs font-bold text-zinc-500 mt-1">Dr. {vax.vetName}</p>}
                              {vax.notes && <p className="text-xs font-bold text-zinc-400 mt-1">{vax.notes}</p>}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* SON REÇETELER */}
                  {pet.prescriptions.length > 0 && (
                    <div>
                      <h4 className="font-black uppercase text-sm mb-2">📋 Son Reçeteler</h4>
                      <div className="space-y-2">
                        {pet.prescriptions.map(rx => (
                          <div key={rx.id} className="bg-blue-50 border-2 border-black rounded-lg p-3 flex justify-between items-center">
                            <div>
                              <span className="font-black text-sm">Dr. {rx.vetName}</span>
                              {rx.diagnosis && <span className="font-bold text-sm text-zinc-600 ml-2">— {rx.diagnosis}</span>}
                            </div>
                            <div className="text-right">
                              <Badge variant="default">
                                {rx.totalPrice.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                              </Badge>
                              <p className="text-xs font-bold text-zinc-500">
                                {new Date(rx.createdAt).toLocaleDateString("tr-TR")}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}
