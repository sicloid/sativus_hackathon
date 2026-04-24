import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Sol: PetVerse logo yazısı */}
        <Link href="/" className="text-3xl font-black tracking-tight text-black hover:-translate-y-1 transition-transform">
          PetVerse
        </Link>

        {/* Orta: SSS linki KALDIRILDI */}
        <div className="hidden md:block">
          {/* Boş bırakıldı veya başka linkler eklenebilir */}
        </div>

        {/* Sağ Alan Boşaltıldı */}
        <div className="flex items-center gap-4">
        </div>
      </div>
    </nav>
  );
}
