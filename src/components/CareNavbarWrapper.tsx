"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";
import type { User } from "@supabase/supabase-js";

export function CareNavbarWrapper({ children, user }: { children: React.ReactNode, user?: User | null }) {
  const pathname = usePathname();

  // Hekim panelinin kendi layout'u ve navbar'ı var — burada gösterme
  const isHekimPanel = pathname.startsWith("/hekim") && !pathname.startsWith("/care-login");

  if (isHekimPanel) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar user={user} />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}
