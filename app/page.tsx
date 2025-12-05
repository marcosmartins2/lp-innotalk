import Header from "@/components/Header";
import Hero from "@/components/Hero";
import VideoSection from "@/components/VideoSection";
import FeaturesFlow from "@/components/FeaturesFlow";
import Benefits from "@/components/Benefits";
import HowToStart from "@/components/HowToStart";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import Security from "@/components/Security";
import CTAForm from "@/components/CTAForm";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home()
{
  return (
    <div className="min-h-screen">
      <Header />
      <Hero />
      <VideoSection />
      <FeaturesFlow />
      <Benefits />
      <HowToStart />
      <Pricing />
      <FAQ />
      <Security />
      <CTAForm />
      <FinalCTA />
      <Footer />
    </div>
  );
}
