import Link from 'next/link';
import { Twitter, Instagram, Linkedin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-black text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12 border-b-2 border-white pb-12">
          {/* Sütun 1 */}
          <div className="space-y-4 md:col-span-2">
            <h3 className="text-3xl font-black tracking-tight">PetVerse</h3>
            <p className="font-bold text-gray-400 max-w-sm">
              Gençlik enerjisi seninle, sevgin patilerle! Dostların için aradığın her şey burada.
            </p>
          </div>

          {/* Sütun 2 */}
          <div className="space-y-4">
            <h4 className="text-xl font-black tracking-tight">Hızlı Bağlantılar</h4>
            <ul className="space-y-2 font-bold text-gray-400">
              <li><Link href="/blog" className="hover:text-white transition-colors">Blog</Link></li>
              <li><Link href="/urunler" className="hover:text-white transition-colors">Mağaza</Link></li>
              <li><Link href="/randevu" className="hover:text-white transition-colors">Randevu</Link></li>
            </ul>
          </div>

          {/* Sütun 3 */}
          <div className="space-y-4">
            <h4 className="text-xl font-black tracking-tight">İletişim</h4>
            <ul className="space-y-2 font-bold text-gray-400">
              <li>merhaba@petverse.com</li>
              <li>+90 (555) 123 45 67</li>
              <li>Patiler Mah. Sevgi Sok. No:1 Kadıköy / İstanbul</li>
            </ul>
          </div>
        </div>

        {/* Alt şerit */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-bold text-gray-400">
            &copy; {new Date().getFullYear()} PetVerse. Tüm hakları saklıdır.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="bg-white text-black p-2 border-2 border-transparent rounded-xl hover:bg-gray-200 transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="#" className="bg-white text-black p-2 border-2 border-transparent rounded-xl hover:bg-gray-200 transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="bg-white text-black p-2 border-2 border-transparent rounded-xl hover:bg-gray-200 transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
