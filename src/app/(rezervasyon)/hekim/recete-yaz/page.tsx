import prisma from "@/lib/prisma";
import { ReceteForm } from "./ReceteForm";

export const dynamic = "force-dynamic";

export default async function ReceteYazPage() {
  const pets = await prisma.pet.findMany({
    orderBy: { name: "asc" },
  });

  const products = await prisma.product.findMany({
    where: { category: { in: ["Reçeteli İlaç", "İlaç", "Vitamin", "Sağlık", "Bakım"] } },
    orderBy: { name: "asc" },
  });

  // Eğer ilaç kategorisi yoksa tüm ürünleri getir
  const allProducts = products.length === 0
    ? await prisma.product.findMany({ orderBy: { name: "asc" } })
    : products;

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="max-w-4xl mx-auto space-y-6">
        <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight">
          📝 Reçete Yaz
        </h1>
        <ReceteForm
          pets={pets.map(p => ({ id: p.id, name: p.name, species: p.species }))}
          products={allProducts.map(p => ({ id: p.id, name: p.name, price: p.price, category: p.category }))}
        />
      </div>
    </div>
  );
}
