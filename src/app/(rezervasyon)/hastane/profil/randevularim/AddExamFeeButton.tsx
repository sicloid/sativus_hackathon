'use client';

import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';

export default function AddExamFeeButton({ appointmentId, petName, examFee }: { appointmentId: string, petName: string, examFee: number | null }) {
  const { addToCart } = useCart();
  const router = useRouter();

  // Eğer ücret 0 veya null ise ücretsiz olarak göster
  const isFree = examFee === null || examFee === 0;
  const price = examFee || 0;

  const handleAddFee = () => {
    addToCart({
      id: `exam-fee-${appointmentId}`,
      name: `${petName} Muayene Ücreti`,
      price: price,
      image_url: 'https://images.unsplash.com/photo-1628177142898-93e46e46248c?w=400&q=80',
      isExamFee: true
    }, 1);
    router.push('/sepet');
  };

  if (isFree) {
    return (
      <div className="w-full sm:w-auto px-4 py-2 border-2 border-dashed border-emerald-500 rounded-xl bg-emerald-50 text-emerald-600 font-black uppercase text-xs text-center flex items-center justify-center">
        Ücretsiz Muayene
      </div>
    );
  }

  return (
    <Button 
      onClick={handleAddFee}
      className="bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-xs w-full sm:w-auto"
    >
      Muayene Ücreti Öde ({price}₺)
    </Button>
  );
}
