import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CampaignSection from "@/components/CampaignSection";
import ProductsSection from "@/components/ProductsSection";
import QuizSection from "@/components/QuizSection";
import Footer from "@/components/Footer";
import RevealObserver from "@/components/RevealObserver";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <CampaignSection />
        <ProductsSection />
        <QuizSection />
      </main>
      <Footer />
      <RevealObserver />
    </>
  );
}
