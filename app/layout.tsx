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
  title: "Defai Arena",
  description: "Open platform for crowdsourced LLM benchmarking tailored for DeFAI applications",
  openGraph: {
    title: 'Defai Arena',
    description: 'Open platform for crowdsourced LLM benchmarking tailored for DeFAI applications',
    url: 'https://defaiarena.fun',
    images: [
      {
        url: 'https://raw.githubusercontent.com/guzus/defai-arena/main/assets/defai-arena.webp', 
      },
    ],
    type: 'website',
    locale: 'en_US',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
