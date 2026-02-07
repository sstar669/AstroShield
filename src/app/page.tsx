import CanvasBackground from '@/app/components/CanvasBackground';
import Navbar from '@/app/components/Navbar';
import HeroSection from '@/app/components/HeroSection';
import FeaturesSection from '@/app/components/FeaturesSection';
import CallToAction from '@/app/components/CallToAction';
import Footer from '@/app/components/Footer';


export default function Home() {
  return (
    <main className="relative bg-neutral-950 text-white overflow-hidden">
      <CanvasBackground />
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <CallToAction />
      <Footer />
    </main>
  );
}
