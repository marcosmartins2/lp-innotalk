import type { Metadata } from "next";
import { Geist, Geist_Mono, Manrope } from "next/font/google";
import MetaPixel from "@/components/MetaPixel";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const description =
  "CRM para WhatsApp: centralize as conversas da equipe, organize leads no funil de vendas e sincronize a agenda com o Google Calendar. Teste grátis por 7 dias, sem cartão de crédito.";

export const metadata: Metadata = {
  metadataBase: new URL("https://innotalk.com.br"),
  title: {
    default: "InnoTalk | CRM para WhatsApp com funil de vendas e agenda",
    template: "%s | InnoTalk",
  },
  applicationName: "InnoTalk",
  description,
  keywords: ["CRM para WhatsApp", "atendimento pelo WhatsApp", "funil de vendas", "gestão de leads", "agenda integrada", "Google Calendar", "InnoTalk"],
  openGraph: {
    title: "InnoTalk | CRM para WhatsApp com funil de vendas e agenda",
    siteName: "InnoTalk",
    description,
    url: "https://innotalk.com.br",
    type: "website",
    locale: "pt_BR",
  },
  twitter: {
    card: "summary",
    title: "InnoTalk | CRM para WhatsApp com funil de vendas e agenda",
    description,
  },
  icons: {
    icon: "/LogoInnotalk.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>)
{
  return (
    <html lang="pt-BR">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${manrope.variable} antialiased`}
      >
        {children}
        <MetaPixel />
      </body>
    </html>
  );
}
