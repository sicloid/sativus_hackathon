import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ToastProvider } from '@/context/ToastContext';
import Header from '@/components/Header';
import { createClient } from '@/utils/supabase/server';

export default async function MagazaLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  return (
    <ToastProvider>
      <FavoritesProvider>
        <CartProvider>
          <div className="min-h-screen flex flex-col bg-[var(--background)]">
            <Header user={user} />
            
            {/* Main Content */}
            <main className="container mx-auto px-4 flex-grow mb-12">
              {children}
            </main>
            
            {/* Footer */}
            <footer className="border-t-4 border-black bg-white py-8 mt-auto">
              <div className="container mx-auto px-4 text-center font-bold">
                <p className="uppercase text-xl mb-2">PetVerse © 2026</p>
                <p className="text-sm">Hackathon Projesi - (magaza) Modülü</p>
              </div>
            </footer>
          </div>
        </CartProvider>
      </FavoritesProvider>
    </ToastProvider>
  );
}
