'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';

const MENU_ITEMS = [
  { name: 'Profil Özeti', path: '/profil' },
  { name: 'Siparişlerim', path: '/profil/siparisler' },
  { name: 'Kuponlarım', path: '/profil/kuponlar' },
  { name: 'Sorularım & Cevaplar', path: '/profil/sorular' },
  { name: 'Adreslerim', path: '/profil/adreslerim' },
];

export default function ProfilLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="flex flex-col md:flex-row gap-8">
      {/* Sidebar */}
      <aside className="w-full md:w-64 flex-shrink-0">
        <div className="bg-white brutal-border brutal-shadow p-6 sticky top-32">
          <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Hesabım</h2>
          
          <nav className="flex flex-col gap-3">
            {MENU_ITEMS.map((item) => {
              const isActive = pathname === item.path;
              return (
                <Link 
                  key={item.path} 
                  href={item.path}
                  className={`p-3 font-bold uppercase transition-colors brutal-border
                    ${isActive 
                      ? 'bg-black text-white brutal-shadow transform translate-x-2' 
                      : 'bg-[#f8f8f8] hover:bg-[var(--brutal-yellow)] hover:translate-x-1'
                    }`}
                >
                  {item.name}
                </Link>
              );
            })}
            
            <Link 
              href="/login"
              className="mt-8 p-3 font-black uppercase text-center brutal-border bg-[var(--brutal-red)] hover:bg-black hover:text-white transition-colors"
            >
              Çıkış Yap
            </Link>
          </nav>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow">
        {children}
      </div>
    </div>
  );
}
