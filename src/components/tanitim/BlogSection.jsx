import { CheckCircle } from 'lucide-react';

export default function BlogSection() {
  return (
    <section className="bg-white px-6 py-16 md:py-24 border-b-2 border-black">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Sol */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-black tracking-tight text-black">
            Bilgi Paylaştıkça Çoğalır
          </h2>
          <p className="text-xl font-bold tracking-tight text-gray-800">
            Evcil hayvanınızın sağlığı, beslenmesi ve eğitimi hakkında bilmeniz gereken her şeyi uzman içeriklerimizle öğrenin.
          </p>
          <ul className="space-y-4 pt-4">
            <li className="flex items-center gap-3 font-black text-lg">
              <CheckCircle className="w-6 h-6 text-blue-600" />
              Uzman içeriklere erişim
            </li>
            <li className="flex items-center gap-3 font-black text-lg">
              <CheckCircle className="w-6 h-6 text-green-500" />
              Haftalık yeni makaleler
            </li>
            <li className="flex items-center gap-3 font-black text-lg">
              <CheckCircle className="w-6 h-6 text-orange-500" />
              Topluluk destekli bilgi bankası
            </li>
          </ul>
        </div>

        {/* Sağ */}
        <div className="bg-blue-100 border-2 border-black rounded-2xl min-h-[300px] flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
          <span className="text-2xl font-black tracking-tight text-black/50">📷 Blog Görseli</span>
        </div>
      </div>
    </section>
  );
}
