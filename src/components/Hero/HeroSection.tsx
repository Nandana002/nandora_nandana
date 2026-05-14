"use client";

import dynamic from "next/dynamic";
import HeroContent from "./HeroContent";

// Dynamically import Three.js component to avoid SSR issues
const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
  loading: () => <div className="absolute inset-0 bg-[#050505]" />,
});

export default function HeroSection() {
  return (
    <section id="home" className="relative w-full min-h-screen overflow-hidden">
      <ThreeBackground />
      <HeroContent />
    </section>
  );
}
