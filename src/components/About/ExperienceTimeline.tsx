"use client";

import { motion } from "framer-motion";
import { Sparkles, Code, Briefcase, Palette, Megaphone, Heart } from "lucide-react";

const timelineData = [
  {
    stage: "2021",
    title: "The Creative Spark",
    description: "Started Graphic Design journey, mastering Photoshop and Illustrator for digital art.",
    icon: <Palette size={24} className="text-crimson" />,
  },
  {
    stage: "2022",
    title: "Digital Evolution",
    description: "Learned Frontend Development, bridging the gap between design and interactive code.",
    icon: <Code size={24} className="text-gold" />,
  },
  {
    stage: "2023",
    title: "Freelance Mastery",
    description: "Built premium portfolio websites and worked on diverse international freelance projects.",
    icon: <Briefcase size={24} className="text-crimson" />,
  },
  {
    stage: "2024",
    title: "Brand Architect",
    description: "Designed comprehensive branding systems and high-converting social media creatives.",
    icon: <Megaphone size={24} className="text-gold" />,
  },
  {
    stage: "Present",
    title: "Cinematic Experiences",
    description: "Focusing on premium interactive digital experiences and high-end creative solutions.",
    icon: <Sparkles size={24} className="text-crimson" />,
  },
];

export default function ExperienceTimeline() {
  return (
    <section className="relative py-32 bg-charcoal/30">
      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-center mb-24"
        >
          <h2 className="text-5xl font-bold mb-4 font-display">Creative <span className="text-crimson">Journey</span></h2>
          <p className="text-white/40 uppercase tracking-[0.4em] text-sm font-bold italic">The Evolution of Excellence</p>
        </motion.div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-crimson via-gold to-transparent -translate-x-1/2 hidden md:block" />

          <div className="space-y-24">
            {timelineData.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: i * 0.1 }}
                viewport={{ once: true }}
                className={`relative flex flex-col md:flex-row items-center gap-8 ${
                  i % 2 === 0 ? "md:flex-row-reverse" : ""
                }`}
              >
                {/* Dot */}
                <div className="absolute left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-background border-2 border-gold glow-gold z-20 hidden md:block" />

                {/* Content Card */}
                <div className={`w-full md:w-1/2 ${i % 2 === 0 ? "md:text-left" : "md:text-right"}`}>
                  <div className="glass-dark p-8 rounded-3xl border border-white/5 hover:border-white/20 transition-all hover:scale-105 group relative overflow-hidden">
                    {/* Background glow on hover */}
                    <div className="absolute -inset-10 bg-gradient-radial from-crimson/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                    
                    <div className={`flex items-center gap-4 mb-4 ${i % 2 === 0 ? "" : "md:flex-row-reverse"}`}>
                      <div className="p-3 bg-white/5 rounded-xl border border-white/10">
                        {item.icon}
                      </div>
                      <span className="text-gold font-mono text-xl font-bold">{item.stage}</span>
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 font-display">{item.title}</h3>
                    <p className="text-white/60 leading-relaxed text-sm md:text-base">
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Empty spacer for desktop */}
                <div className="hidden md:block md:w-1/2" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
