import Navbar from '@/components/tanitim/Navbar';
import HeroSection from '@/components/tanitim/HeroSection';
import BlogSection from '@/components/tanitim/BlogSection';
import AppointmentSection from '@/components/tanitim/AppointmentSection';
import ShopSection from '@/components/tanitim/ShopSection';
import CTABanner from '@/components/tanitim/CTABanner';
import FAQSection from '@/components/tanitim/FAQSection';
import Footer from '@/components/tanitim/Footer';
import { FloatingAIBot } from '@/components/ui/FloatingAIBot';

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      {/* Animasyonlu gradient arka plan */}
      <div className="fixed inset-0 -z-10 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 animate-gradient-shift bg-200%" />
      
      {/* Yavaş hareket eden subtle desenler */}
      <div className="fixed inset-0 -z-10 opacity-30 pointer-events-none">
        <div className="absolute top-10 left-10 w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-float-slow" />
        <div className="absolute top-40 right-20 w-80 h-80 bg-orange-200 rounded-full blur-3xl animate-float-slower" />
        <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-green-200 rounded-full blur-3xl animate-float-medium" />
      </div>

      {/* Pati deseni (statik, çok düşük opacity) */}
      <div className="fixed inset-0 -z-10 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M30 20c-2.5 0-4.5 2-4.5 4.5S27.5 29 30 29s4.5-2 4.5-4.5S32.5 20 30 20zM20 30c-1.5 0-2.5 1-2.5 2.5S18.5 35 20 35s2.5-1 2.5-2.5S21.5 30 20 30zM40 30c-1.5 0-2.5 1-2.5 2.5S38.5 35 40 35s2.5-1 2.5-2.5S41.5 30 40 30zM25 35c-1.5 0-2.5 1-2.5 2.5S23.5 40 25 40s2.5-1 2.5-2.5S26.5 35 25 35zM35 35c-1.5 0-2.5 1-2.5 2.5S33.5 40 35 40s2.5-1 2.5-2.5S36.5 35 35 35z' fill='%23000000' fill-opacity='1'/%3E%3C/svg%3E")`,
          backgroundSize: '80px 80px'
        }}
      />

      <Navbar />
      <HeroSection />
      <BlogSection />
      <AppointmentSection />
      <ShopSection />
      <CTABanner />
      <FAQSection />
      <Footer />
      <FloatingAIBot />
    </main>
  );
}
