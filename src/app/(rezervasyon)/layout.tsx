import { Navbar } from "@/components/ui/Navbar";

export const metadata = {
  title: "PetVerse Hospital",
};

export default function RezervasyonLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
}
