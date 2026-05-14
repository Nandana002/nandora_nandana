"use client";

import { motion } from "framer-motion";
import { Globe, Palette, Instagram, Linkedin, MessageCircle } from "lucide-react";

export default function HeroContent() {
  return (
    <div className="relative z-10 w-full min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-8">
      <div className="max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col items-center text-center">
          
          {/* Top Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex items-center gap-2.5 px-5 py-2 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-md"
          >
            <span className="w-1.5 h-1.5 bg-crimson rounded-full animate-ping" />
            <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white/50">Available for Premium Projects</span>
          </motion.div>

          {/* Main Headings */}
          <div className="relative mb-12">
            <motion.div
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <h2 className="text-gold text-base md:text-xl font-display italic mb-4 opacity-70">
                Visual Designer & Creative Developer
              </h2>
              <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.9]">
                CRAFTING <br />
                <span className="text-crimson italic">EXPERIENCES</span>
              </h1>
            </motion.div>
            
            {/* Decorative Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.02 }}
              transition={{ duration: 2, delay: 1 }}
              className="absolute -top-16 -left-16 text-[15vw] font-black pointer-events-none select-none hidden lg:block"
            >
              CREATIVE
            </motion.div>
          </div>

          {/* Intro Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-lg md:text-xl text-white/30 max-w-2xl mb-12 leading-relaxed font-display italic"
          >
            "Elevating brands through cinematic visual storytelling, modern identities, and high-end interactive digital experiences."
          </motion.p>

          {/* Creative Three.js Element (Subtle) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="w-full h-32 flex items-center justify-center relative"
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-full h-[1px] bg-gradient-to-r from-transparent via-white/5 to-transparent" />
            </div>
            
            <div className="relative z-10 flex flex-col items-center">
              <div className="text-[7px] uppercase tracking-[0.6em] text-white/10 font-bold mb-4">Visual Intelligence</div>
              <div className="flex items-center gap-8">
                <div className="w-12 h-12 rounded-full border border-white/5 flex items-center justify-center animate-spin-slow">
                  <div className="w-1.5 h-1.5 bg-crimson rounded-full" />
                </div>
                <div className="text-left border-l border-white/5 pl-8">
                  <p className="text-[9px] text-white/30 uppercase tracking-[0.3em] mb-1">Artistic Direction</p>
                  <p className="text-lg font-bold tracking-tight">nandora</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
);
}
