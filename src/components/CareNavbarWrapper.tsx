"use client";

import { usePathname } from "next/navigation";
import { Navbar } from "@/components/ui/Navbar";

export function CareNavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Hekim panelinin kendi layout'u ve navbar'ı var — burada gösterme
  const isHekimPanel = pathname.startsWith("/hekim") && !pathname.startsWith("/hekim-login");

  if (isHekimPanel) {
    return <>{children}</>;
  }

  return (
    <>
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}
