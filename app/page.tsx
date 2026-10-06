import { LandingFooter, LandingHeader, LandingHero, LandingResources, LandingFinalCTA } from "@/components/PublishedSections";
import Pricing from "@/components/Pricing";

export default function Home()
{
  return (
    <div id="landing-page" className="min-h-screen bg-[#0b1f3a] text-white [font-family:var(--font-manrope),sans-serif]">
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
      <LandingHeader />
      <LandingHero />
      <LandingResources />
      <Pricing />
      <LandingFinalCTA />
      <LandingFooter />
    </div>
  );
}
