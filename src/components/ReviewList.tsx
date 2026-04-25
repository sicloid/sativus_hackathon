import { Star } from 'lucide-react'

interface Review {
  id: string
  userName: string
  rating: number
  comment: string
  createdAt: Date
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return (
      <div className="bg-[#f8f8f8] brutal-border p-8 text-center mt-8 italic font-bold">
        Bu ürün için henüz yorum yapılmamış. İlk yorumu siz yapın!
      </div>
    )
  }

  const averageRating = reviews.reduce((acc, curr) => acc + curr.rating, 0) / reviews.length

  return (
    <div className="mt-12 space-y-8">
      <div className="flex items-center justify-between border-b-4 border-black pb-4">
        <h3 className="text-2xl font-black uppercase">Müşteri Yorumları ({reviews.length})</h3>
        <div className="flex items-center gap-2 bg-white brutal-border px-3 py-1">
          <Star size={20} className="fill-[var(--brutal-yellow)]" />
          <span className="font-black text-xl">{averageRating.toFixed(1)}</span>
        </div>
      </div>

      <div className="grid gap-6">
        {reviews.map((review) => (
          <div key={review.id} className="bg-white brutal-border brutal-shadow p-6 flex flex-col gap-4">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-black uppercase text-sm">{review.userName}</p>
                <div className="flex gap-1 mt-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= review.rating ? 'fill-[var(--brutal-yellow)] text-black' : 'text-gray-300'}
                    />
                  ))}
                </div>
              </div>
              <span className="text-[10px] font-bold text-gray-400">
                {new Date(review.createdAt).toLocaleDateString('tr-TR')}
              </span>
            </div>
            
            <p className="font-bold text-gray-700 leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
