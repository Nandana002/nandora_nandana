import HeroSection from "@/components/Hero/HeroSection";
import AboutSection from "@/components/About/AboutSection";
import ToolsMarquee from "@/components/About/ToolsMarquee";
import ServicesSection from "@/components/Services/ServicesSection";
import ProjectsFeedbackSplit from "@/components/Home/ProjectsFeedbackSplit";
import PortfolioSection from "@/components/Portfolio/PortfolioSection";
import TestimonialSection from "@/components/Home/TestimonialSection";

export default function Home() {
  return (
    <div className="relative w-full">
      <HeroSection />
      <AboutSection />
      <ToolsMarquee />
      <ServicesSection />
      
      {/* Main Full Sections */}
      <PortfolioSection />

      {/* Premium Split Section for CTA & Feedback */}
      <ProjectsFeedbackSplit />

      <TestimonialSection />
    </div>
  );
}
