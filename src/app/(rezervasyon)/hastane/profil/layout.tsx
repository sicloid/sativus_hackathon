'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react';
import { logout } from '../../hasta-login/actions';

const MENU_ITEMS = [
  { name: 'Profil Özeti', path: '/hastane/profil' },
  { name: 'Randevularım', path: '/hastane/profil/randevularim' },
  { name: 'Evcil Hayvanlarım', path: '/hastane/profil/evcil-hayvanlarim' },
  { name: 'Reçetelerim', path: '/hastane/profil/recetelerim' },
];

export default function CareProfilLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="w-full bg-[#fdfdfd] text-black font-sans min-h-screen pt-8 pb-24 px-4 sm:px-8 lg:px-12 relative z-10 max-w-[1400px] mx-auto">
      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <div className="bg-white border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 sticky top-32">
            <h2 className="text-2xl font-black uppercase mb-6 border-b-4 border-black pb-2">Care Profili</h2>
            
            <nav className="flex flex-col gap-3">
              {MENU_ITEMS.map((item) => {
                const isActive = pathname === item.path;
                return (
                  <Link 
                    key={item.path} 
                    href={item.path}
                    className={`p-3 font-bold uppercase transition-all border-4 border-black rounded-xl
                      ${isActive 
                        ? 'bg-[#a855f7] text-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transform translate-x-2' 
                        : 'bg-[#f8f8f8] hover:bg-[#fef08a] hover:translate-x-1'
                      }`}
                  >
                    {item.name}
                  </Link>
                );
              })}
              
              <form action={logout}>
                <button 
                  type="submit"
                  className="w-full mt-8 p-3 font-black uppercase text-center border-4 border-black rounded-xl bg-rose-500 text-white hover:bg-black hover:text-white transition-colors shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Çıkış Yap
                </button>
              </form>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-grow">
          {children}
        </div>
      </div>
    </div>
  );
}
