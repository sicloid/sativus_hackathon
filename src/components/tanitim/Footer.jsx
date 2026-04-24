import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 pb-12">
          {/* Sütun 1 */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-3xl font-black tracking-tight flex items-center gap-2">
              PetVerse 🐾
            </h3>
            <p className="font-bold text-gray-400 max-w-sm">
              Gençlik enerjisi seninle, sevgin patilerle! Dostların için aradığın her şey burada.
            </p>
          </div>

          {/* Sütun 2 */}
          <div className="space-y-4">
            <h4 className="text-xl font-black tracking-tight text-blue-600">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 font-bold text-gray-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/urunler" className="hover:text-white transition-colors">Mağaza</Link></li>
              <li><Link href="/hastane" className="hover:text-white transition-colors">Randevu</Link></li>
            </ul>
          </div>

          {/* Sütun 3 */}
          <div className="space-y-4">
            <h4 className="text-xl font-black tracking-tight text-orange-500">İletişim</h4>
            <ul className="space-y-2 font-bold text-gray-400">
              <li>merhaba@petverse.com</li>
              <li>+90 (555) 123 45 67</li>
              <li>Patiler Mah. Sevgi Sok. No:1 Kadıköy / İstanbul</li>
            </ul>
          </div>
        </div>

        {/* Alt şerit */}
        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} PetVerse. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            {['Twitter', 'Instagram', 'LinkedIn'].map((social) => (
              <div 
                key={social}
                className="w-10 h-10 border-2 border-gray-700 rounded-xl flex items-center justify-center cursor-pointer hover:bg-blue-600 hover:border-blue-600 transition-all duration-200"
              >
                <span className="text-xs font-black">{social[0]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
