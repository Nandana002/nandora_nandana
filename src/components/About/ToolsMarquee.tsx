"use client";

import { motion } from "framer-motion";

const tools = [
  "Adobe Photoshop",
  "Adobe Illustrator",
  "Canva",
  "Figma",
  "VS Code",
  "React",
  "Bootstrap",
  "GitHub",
  "Node.js",
  "Next.js",
  "Tailwind CSS",
  "Framer Motion",
];

export default function ToolsMarquee() {
  return (
    <div className="w-full py-20 bg-charcoal/50 border-y border-white/5 overflow-hidden">
      <div className="flex overflow-hidden">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 items-center"
        >
          {/* Double the list for seamless loop */}
          {[...tools, ...tools].map((tool, i) => (
            <div
              key={i}
              className="flex items-center gap-6 group cursor-default"
            >
              <span className="text-4xl md:text-6xl font-black text-white/10 group-hover:text-gold/40 transition-colors uppercase italic font-display">
                {tool}
              </span>
              <div className="w-3 h-3 rounded-full bg-crimson shadow-[0_0_15px_rgba(139,0,0,0.8)]" />
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
