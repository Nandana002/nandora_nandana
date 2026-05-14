"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Global/Navbar";
import Footer from "@/components/Global/Footer";
import CustomCursor from "@/components/Global/CustomCursor";
import SmoothScroll from "@/components/Global/SmoothScroll";
import WhatsAppButton from "@/components/Global/WhatsAppButton";
import AmbientSound from "@/components/Global/AmbientSound";
import ScrollProgress from "@/components/Global/ScrollProgress";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  if (isAdmin) {
    return (
      <main>
        <CustomCursor />
        {children}
      </main>
    );
  }

  return (
    <>
      <ScrollProgress />
      <SmoothScroll>
        <CustomCursor />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </SmoothScroll>
      <WhatsAppButton />
      <AmbientSound />
    </>
  );
}
