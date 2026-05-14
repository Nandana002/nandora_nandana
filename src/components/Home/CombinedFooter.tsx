"use client";

import dynamic from "next/dynamic";
import ContactSection from "./ContactSection";
import SubmitTestimonial from "./SubmitTestimonial";

const CombinedFooter = () => {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      {/* Unified Background Ambient Glow */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-stretch">
          {/* Left Side: Start A Project (WhatsApp) */}
          <div className="flex flex-col h-full">
            <ContactContent />
          </div>

          {/* Right Side: Feedback Form */}
          <div className="flex flex-col h-full">
            <SubmitTestimonialContent />
          </div>
        </div>
      </div>
    </section>
  );
};

// We need to extract the content parts from the original components to avoid nested <section> tags
// For now, I will refactor the original files to export their inner content as well.

export default CombinedFooter;
