import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lumina Tech – Gençlik Enerjisi Seninle!",
  description:
    "Lumina Tech'in genç kitleye özel akıllı yaşam ürünleri kampanyası. LuminaBand, LuminaPods, LuminaBoom ve daha fazlası ile hayatını ışılt!",
  keywords: "Lumina Tech, akıllı bileklik, kablosuz kulaklık, mini hoparlör, gençlik kampanyası",
  openGraph: {
    title: "Lumina Tech – Gençlik Enerjisi Seninle!",
    description: "Genç ruhu için tasarlanmış akıllı teknoloji ürünleri.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="tr"
      className={`${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
