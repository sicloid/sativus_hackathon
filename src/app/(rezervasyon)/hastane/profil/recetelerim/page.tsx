import prisma from "@/lib/prisma";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { Card, CardContent } from "@/components/ui/Card";
import { Badge } from "@/components/ui/Badge";
import { AddPrescriptionToCart } from "./AddPrescriptionToCart";

export const dynamic = "force-dynamic";

export default async function RecetelerimPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/care-login");

  // Kullanıcının petlerine yazılan reçeteleri getir
  const prescriptions = await prisma.prescription.findMany({
    where: {
      pet: { userId: user.id },
    },
    include: {
      pet: true,
      items: {
        include: {
          product: true,
        },
      },
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="space-y-6">
      <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 rounded-2xl">
        <h2 className="text-3xl font-black uppercase mb-2 border-b-4 border-black pb-2">
          📋 Reçetelerim
        </h2>
        <p className="font-bold text-zinc-600">
          Evcil hayvanlarınıza yazılmış {prescriptions.length} reçete
        </p>
      </div>

      {prescriptions.length === 0 ? (
        <Card className="bg-zinc-50 text-center p-8">
          <p className="font-bold text-lg">Henüz reçeteniz bulunmuyor.</p>
          <p className="font-bold text-zinc-500 mt-2">
            Hekiminiz muayene sonrası reçete yazdığında burada görünecektir.
          </p>
        </Card>
      ) : (
        <div className="space-y-6">
          {prescriptions.map(rx => {
            const hasStoreProducts = rx.items.some(item => item.productId);
            const storeItems = rx.items.filter(item => item.productId && item.product);

            return (
              <Card key={rx.id} className="border-l-8 border-l-[#a855f7]">
                <CardContent className="p-6 mt-0">
                  {/* REÇETE HEADER */}
                  <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4 pb-4 border-b-4 border-black">
                    <div>
                      <h3 className="text-xl font-black">
                        🐾 {rx.pet.name} ({rx.pet.species})
                      </h3>
                      <p className="font-bold text-zinc-600 mt-1">
                        🩺 Dr. {rx.vetName}
                      </p>
                      {rx.diagnosis && (
                        <p className="font-bold text-sm mt-1">
                          📋 Teşhis: <span className="text-[#a855f7]">{rx.diagnosis}</span>
                        </p>
                      )}
                    </div>
                    <div className="text-right">
                      <Badge variant="default" className="text-lg px-4 py-2">
                        {rx.totalPrice.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                      </Badge>
                      <p className="font-bold text-xs text-zinc-500 mt-1">
                        {new Date(rx.createdAt).toLocaleDateString("tr-TR", {
                          day: "numeric", month: "long", year: "numeric"
                        })}
                      </p>
                    </div>
                  </div>

                  {/* İLAÇ LİSTESİ */}
                  <div className="space-y-2 mb-4">
                    <h4 className="font-black uppercase text-sm">💊 İlaç Listesi</h4>
                    {rx.items.map(item => (
                      <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 p-3 bg-zinc-50 border-2 border-black rounded-xl">
                        <div className="flex-1">
                          <span className="font-black">{item.name}</span>
                          {item.dosage && (
                            <span className="font-bold text-sm text-zinc-500 ml-2">
                              ({item.dosage})
                            </span>
                          )}
                          {item.productId && (
                            <Badge variant="success" className="ml-2 text-xs">
                              Mağazada Mevcut
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-bold text-sm text-zinc-600">
                            {item.quantity} adet
                          </span>
                          <span className="font-black">
                            {(item.price * item.quantity).toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* HEKIM NOTU */}
                  {rx.notes && (
                    <div className="bg-blue-50 border-2 border-black rounded-xl p-3 mb-4">
                      <p className="font-bold text-sm">📝 Hekim Notu: {rx.notes}</p>
                    </div>
                  )}

                  {/* SATIN AL BUTONU */}
                  {hasStoreProducts && (
                    <div className="pt-4 border-t-4 border-black">
                      <AddPrescriptionToCart
                        items={storeItems.map(item => ({
                          productId: item.productId!,
                          name: item.product!.name,
                          price: item.product!.price,
                          quantity: item.quantity,
                          imageUrl: item.product!.imageUrl,
                        }))}
                        totalPrice={storeItems.reduce((sum, item) => sum + (item.product!.price * item.quantity), 0)}
                      />
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
