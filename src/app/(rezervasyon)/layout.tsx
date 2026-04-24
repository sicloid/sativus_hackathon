// app/(rezervasyon)/layout.tsx
// PetVerse rezervasyon modülü için ortak layout
// Lumina'nın dark/neon tasarımından bağımsız — Tactile Tech dili
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s · PetVerse",
    default: "PetVerse — Evcil Hayvan Ekosistemi",
  },
  description: "Evcil hayvanınız için AI destekli ön teşhis ve online randevu sistemi.",
};

export default function RezervasyonLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-100 font-sans">
      {/* ─── Top Nav ─────────────────────────────────────────────── */}
      <header className="bg-white border-b-4 border-black sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 h-14 flex items-center justify-between">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2 group">
            <div
              className="w-8 h-8 rounded-xl bg-indigo-600 border-2 border-black flex items-center justify-center
                         shadow-[2px_2px_0px_0px_#000] group-hover:shadow-none group-hover:translate-x-0.5
                         group-hover:translate-y-0.5 transition-all duration-150"
            >
              <span className="text-white text-sm font-black">🐾</span>
            </div>
            <span className="font-black text-lg tracking-tight text-black">PetVerse</span>
          </a>

          {/* Nav links */}
          <nav className="flex items-center gap-1">
            {[
              { href: "/ai-asistan", label: "AI Asistan" },
              { href: "/randevu", label: "Randevu" },
              { href: "/pet-karne", label: "Pet Karne" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-3 py-1.5 rounded-lg text-sm font-bold text-zinc-700 hover:bg-indigo-50
                           hover:text-indigo-700 transition-colors duration-150"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </header>

      {/* ─── Page Content ─────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
