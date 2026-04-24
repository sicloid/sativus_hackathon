import Navbar from '@/components/tanitim/Navbar';
import HeroSection from '@/components/tanitim/HeroSection';
import BlogSection from '@/components/tanitim/BlogSection';
import AppointmentSection from '@/components/tanitim/AppointmentSection';
import ShopSection from '@/components/tanitim/ShopSection';
import CTABanner from '@/components/tanitim/CTABanner';
import FAQSection from '@/components/tanitim/FAQSection';
import Footer from '@/components/tanitim/Footer';

export default function HomePage() {
  return (
    <main>
      <Navbar />
      <HeroSection />
      <BlogSection />
      <AppointmentSection />
      <ShopSection />
      <CTABanner />
      <FAQSection />
      <Footer />
    </main>
  );
}
