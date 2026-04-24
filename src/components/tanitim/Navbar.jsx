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

        {/* Sağ: Giriş + Kayıt Ol */}
        <div className="flex items-center gap-4">
          <Link href="/giris" className="hidden md:inline-block font-black tracking-tight text-black px-6 py-2 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all bg-white">
            Giriş
          </Link>
          <Link href="/kayit" className="font-black tracking-tight text-white px-6 py-2 border-2 border-black rounded-2xl shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] bg-blue-600 hover:-translate-y-1 hover:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
            Kayıt Ol
          </Link>
        </div>
      </div>
    </nav>
  );
}
