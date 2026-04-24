"use client";

import { useCart } from "@/context/CartContext";
import { useToast } from "@/context/ToastContext";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/Button";

interface PrescriptionCartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl: string | null;
}

export function AddPrescriptionToCart({
  items,
  totalPrice,
}: {
  items: PrescriptionCartItem[];
  totalPrice: number;
}) {
  const { addToCart } = useCart();
  const { showToast } = useToast();
  const router = useRouter();

  const handleAddAll = () => {
    items.forEach(item => {
      addToCart(
        {
          id: item.productId,
          name: item.name,
          price: item.price,
          image_url: item.imageUrl || "",
        },
        item.quantity
      );
    });
    showToast(`${items.length} ilaç sepete eklendi!`);
    router.push("/sepet");
  };

  return (
    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
      <div>
        <p className="font-bold text-sm text-zinc-600">
          🏪 {items.length} ürün mağazamızda mevcut
        </p>
        <p className="font-black text-lg">
          Toplam: {totalPrice.toLocaleString("tr-TR", { style: "currency", currency: "TRY" })}
        </p>
      </div>
      <Button
        variant="default"
        className="bg-[#34d399] hover:bg-[#10b981] text-lg font-black px-8 py-3"
        onClick={handleAddAll}
      >
        🛒 Reçeteyi Satın Al
      </Button>
    </div>
  );
}
