import prisma from "@/lib/prisma";
import { addVaccination } from "../actions";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export const dynamic = "force-dynamic";

export default async function AsiEklePage() {
  // Tüm kayıtlı petleri getir
  const pets = await prisma.pet.findMany({
    include: {
      vaccinations: {
        orderBy: { date: "desc" },
        take: 5,
      },
    },
    orderBy: { name: "asc" },
  });

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">

        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          💉 Aşı Kaydı Ekle
        </h1>

        {/* AŞI EKLEME FORMU */}
        <Card className="bg-[#bbf7d0]">
          <CardContent className="p-6 mt-0">
            <form action={addVaccination} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-sm uppercase mb-1">Evcil Hayvan *</label>
                  <select
                    name="petId"
                    required
                    className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
                  >
                    <option value="">Pet Seçin</option>
                    {pets.map(pet => (
                      <option key={pet.id} value={pet.id}>
                        {pet.name} ({pet.species})
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-sm uppercase mb-1">Aşı Adı *</label>
                  <select
                    name="name"
                    required
                    className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
                  >
                    <option value="">Seçin</option>
                    <option value="Kuduz">Kuduz</option>
                    <option value="Karma (DHPPi)">Karma (DHPPi)</option>
                    <option value="Leptospiroz">Leptospiroz</option>
                    <option value="Bordetella">Bordetella (Kennel Cough)</option>
                    <option value="Feline Panleukopeni">Feline Panleukopeni (Kedi)</option>
                    <option value="Feline Calicivirus">Feline Calicivirus (Kedi)</option>
                    <option value="FeLV">FeLV (Kedi Lösemi)</option>
                    <option value="İç Parazit">İç Parazit</option>
                    <option value="Dış Parazit">Dış Parazit</option>
                    <option value="Diğer">Diğer</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-sm uppercase mb-1">Aşı Tarihi *</label>
                  <input
                    name="date"
                    type="date"
                    required
                    className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
                  />
                </div>
                <div>
                  <label className="block font-bold text-sm uppercase mb-1">Sonraki Aşı Tarihi</label>
                  <input
                    name="nextDate"
                    type="date"
                    className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
                  />
                </div>
              </div>
              <div>
                <label className="block font-bold text-sm uppercase mb-1">Notlar</label>
                <textarea
                  name="notes"
                  placeholder="Ek bilgi..."
                  rows={2}
                  className="w-full p-3 border-4 border-black rounded-xl font-bold bg-white"
                />
              </div>
              <Button type="submit" variant="default" className="w-full bg-[#34d399] hover:bg-[#10b981] text-lg font-black py-3">
                💉 Aşı Kaydı Ekle
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* MEVCUT AŞI KAYITLARI */}
        <h2 className="text-2xl font-black uppercase mt-8">📋 Son Aşı Kayıtları</h2>
        {pets.filter(p => p.vaccinations.length > 0).length === 0 ? (
          <Card className="bg-zinc-50 text-center p-6">
            <p className="font-bold text-zinc-500">Henüz aşı kaydı yok.</p>
          </Card>
        ) : (
          <div className="space-y-4">
            {pets.filter(p => p.vaccinations.length > 0).map(pet => (
              <Card key={pet.id} className="border-l-8 border-l-green-400">
                <CardContent className="p-4 mt-0">
                  <h3 className="font-black text-lg mb-2">🐾 {pet.name} ({pet.species})</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {pet.vaccinations.map(vax => (
                      <div key={vax.id} className="bg-zinc-50 border-2 border-black rounded-lg p-3">
                        <div className="flex justify-between items-center">
                          <span className="font-black text-sm">{vax.name}</span>
                          <Badge variant="success" className="text-xs">
                            {new Date(vax.date).toLocaleDateString("tr-TR")}
                          </Badge>
                        </div>
                        {vax.nextDate && (
                          <p className="text-xs font-bold text-yellow-600 mt-1">
                            ⏰ Sonraki: {new Date(vax.nextDate).toLocaleDateString("tr-TR")}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
