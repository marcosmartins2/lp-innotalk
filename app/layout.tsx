import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "InnoTalk",
  applicationName: "InnoTalk",
  description: "Centralize seu atendimento e agenda diretamente pelo WhatsApp. Organize conversas, leads e agendamentos de forma simples e automática.",
  openGraph: {
    title: "InnoTalk",
    siteName: "InnoTalk",
    description: "Centralize seu atendimento e agenda diretamente pelo WhatsApp. Organize conversas, leads e agendamentos de forma simples e automática.",
    url: "https://innotalk.com.br",
    type: "website",
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
