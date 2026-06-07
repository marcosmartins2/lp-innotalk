import Header from "@/components/Header";
import Hero from "@/components/Hero";
// import VideoSection from "@/components/VideoSection";
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
      {/* Sinal legível por máquina (nome + propósito) para a verificação de marca do Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: "InnoTalk",
            applicationCategory: "BusinessApplication",
            operatingSystem: "Web",
            url: "https://innotalk.com.br",
            description:
              "InnoTalk é um CRM para WhatsApp que centraliza o atendimento, organiza leads e integra-se ao Google Calendar para criar e sincronizar agendamentos.",
          }),
        }}
      />
      <Header />
      <Hero />
      {/* <VideoSection /> */}
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
