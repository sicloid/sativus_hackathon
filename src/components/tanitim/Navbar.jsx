import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b-2 border-black px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Sol: PetVerse logo yazısı - Styled with Soft-Brutalist Aesthetic */}
        <Link href="/" className="group flex items-center gap-0 tracking-tighter transition-all hover:-translate-y-0.5">
          <span className="text-4xl font-black text-black uppercase">
            Pet
          </span>
          <span className="text-4xl font-black text-blue-600 uppercase bg-blue-50 px-2 py-0.5 rounded-lg border-2 border-transparent group-hover:border-blue-600 transition-all">
            Verse
          </span>
          <div className="w-2.5 h-2.5 bg-orange-500 rounded-full ml-1 self-end mb-2 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]" />
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
