import { CareNavbarWrapper } from "@/components/CareNavbarWrapper";

export const metadata = {
  title: "PetVerse Hospital",
};

export default function RezervasyonLayout({ children }: { children: React.ReactNode }) {
  return (
    <CareNavbarWrapper>
      {children}
    </CareNavbarWrapper>
  );
}
