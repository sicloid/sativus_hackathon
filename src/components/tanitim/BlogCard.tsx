import Link from 'next/link';

export default function BlogCard({ post }: { post: any }) {
  // Soft-Brutalism için arka plan renkleri (sırayla)
  const bgColors = ["bg-brutal-yellow", "bg-brutal-blue", "bg-brutal-red", "bg-brutal-green", "bg-orange-300", "bg-pink-300"];
  // ID'ye göre sıradan bir renk seç (örnekte brutal- sınıfları globals.css'den beslenir veya Tailwind standart renkleri)
  const fallbackBgColors = ["bg-yellow-400", "bg-blue-400", "bg-red-400", "bg-green-400", "bg-orange-400", "bg-purple-400"];
  const bgColor = fallbackBgColors[(post.id - 1) % fallbackBgColors.length];

  return (
    <div className="border-2 border-black rounded-2xl shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform overflow-hidden flex flex-col bg-white h-full">
      {/* Üst Kısım: Görsel Kutu */}
      <div className="h-40 border-b-2 border-black overflow-hidden bg-gray-100">
        <img src={post.image} alt={post.baslik} className="w-full h-full object-cover" />
      </div>

      {/* Alt Kısım: İçerik */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Kategori Etiketi */}
        <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider mb-2">
          {post.kategori}
        </span>

        {/* Başlık */}
        <h3 className="font-black text-base leading-snug mb-2 tracking-tight text-black flex-grow">
          {post.baslik}
        </h3>

        {/* Kısa Açıklama */}
        <p className="text-xs font-bold text-gray-500 mb-4 line-clamp-2">
          {post.ozet}
        </p>

        {/* Alt Satır: Tarih ve Buton */}
        <div className="flex items-center justify-between mt-auto">
          <span className="text-[11px] font-bold text-gray-800">
            {post.tarih}
          </span>
          <Link
            href={`/blog/${post.id}`}
            className="bg-black text-white rounded-lg px-3 py-1 text-xs font-black hover:bg-gray-800 transition-colors"
          >
            Oku →
          </Link>
        </div>
      </div>
    </div>
  );
}
