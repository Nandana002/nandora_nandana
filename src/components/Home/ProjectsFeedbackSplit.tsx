"use client";

import { motion } from "framer-motion";
import { ContactContent } from "./ContactSection";
import { SubmitTestimonialContent } from "./SubmitTestimonial";

export default function ProjectsFeedbackSplit() {
  return (
    <section id="highlights" className="relative w-full bg-background overflow-hidden border-y border-white/5">
      <div className="flex flex-col lg:flex-row min-h-[60vh] relative z-10">
        
        {/* Left Side: Direct Contact CTA */}
        <div className="w-full lg:w-1/2 relative border-r border-white/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-crimson/5 via-transparent to-transparent pointer-events-none" />
          <div className="max-w-md ml-auto w-full">
            <ContactContent />
          </div>
        </div>

        {/* Right Side: Share Your Story (Feedback Form) */}
        <div className="w-full lg:w-1/2 relative p-8 md:p-12 lg:p-16 flex flex-col justify-center bg-white/[0.01]">
          <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-bl from-gold/5 via-transparent to-transparent pointer-events-none" />
          
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="max-w-md mr-auto w-full"
          >
            <SubmitTestimonialContent />
          </motion.div>
        </div>

      </div>
    </section>
  );
}
