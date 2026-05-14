import type { Metadata } from "next";
import { Inter, Outfit } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/Global/LayoutWrapper";
import Preloader from "@/components/Global/Preloader";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit" });

export const metadata: Metadata = {
  title: "Nandana K | Premium Graphic Designer & Creative Web Developer",
  description: "A world-class futuristic portfolio of Nandana K — specializing in premium branding, cinematic web experiences, and modern visual design for international clients.",
  keywords: ["Graphic Design", "Web Development", "Branding", "Creative Portfolio", "Next.js", "Three.js", "Nandana K"],
  authors: [{ name: "Nandana K" }],
  openGraph: {
    title: "Nandana K | Creative Portfolio",
    description: "Cinematic digital experiences and premium visual design.",
    url: "https://nandanak.com",
    siteName: "Nandana K Portfolio",
    images: [
      {
        url: "https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671236/og_image.jpg",
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Nandana K | Portfolio",
    description: "Premium Creative Design & Web Development",
    images: ["https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671236/og_image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${outfit.variable} antialiased`}>
        <div className="noise-overlay" />
        <Preloader />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
