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
  title: "Ágil Assessoria | Previdenciária e Contábil",
  description:
    "Ágil Assessoria Previdenciária e Contábil. Orientação em benefícios do INSS, aposentadorias, BPC/LOAS, benefício por incapacidade, pensão por morte, salário-maternidade e serviços contábeis.",
  keywords: [
    "Ágil Assessoria",
    "INSS",
    "aposentadoria",
    "aposentadoria rural",
    "aposentadoria urbana",
    "BPC LOAS",
    "benefício por incapacidade",
    "pensão por morte",
    "salário-maternidade",
    "previdência",
    "serviços contábeis",
    "Colniza MT",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <body className="min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}