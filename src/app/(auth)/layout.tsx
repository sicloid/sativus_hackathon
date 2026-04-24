import Link from 'next/link';

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col bg-[var(--brutal-yellow)]">
      {/* Basit Header */}
      <header className="p-4 flex justify-center border-b-4 border-black bg-white brutal-shadow relative z-10">
        <Link href="/urunler" className="font-black text-3xl tracking-tighter uppercase">
          PET<span className="text-[var(--brutal-blue)]">VERSE</span>
        </Link>
      </header>
      
      {/* Ana İçerik - Ortalanmış */}
      <main className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {children}
        </div>
      </main>
    </div>
  );
}
