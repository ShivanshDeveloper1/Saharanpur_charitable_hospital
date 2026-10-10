import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/(Navbar)/Navbar";
import { WhatsAppButton } from "@/components/(Homepage)/WhatsappButton";

// Inter for highly legible body text and UI elements
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Montserrat for trustworthy, structured headings
const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Medical Center | Expert Healthcare",
  description: "Providing top-quality medical care and patient services.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      {/* Navbar MUST be inside the body tag in Next.js */}
      <body className="min-h-full flex flex-col font-sans text-text-dark bg-bg-light">
        <Navbar />
        <WhatsAppButton />
        <main className="flex-grow">

          {children}
        </main>
      </body>
    </html>
  );
}