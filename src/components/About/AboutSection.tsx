"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Palette, Users, CircleCheck, Briefcase, Sparkles, Award } from "lucide-react";
import { cn } from "@/lib/utils";

const stats = [
  { label: "Selected Works", value: "150+", icon: <CircleCheck className="text-crimson" size={18} /> },
  { label: "Global Clients", value: "80+", icon: <Users className="text-gold" size={18} /> },
  { label: "Visual Designs", value: "500+", icon: <Palette className="text-crimson" size={18} /> },
  { label: "Professional Exp.", value: "3+ Yrs", icon: <Briefcase className="text-gold" size={18} /> },
];

const skills = [
  { name: "Photoshop", icon: "Ps", color: "from-blue-600/20 to-blue-400/20", textColor: "text-blue-400" },
  { name: "Illustrator", icon: "Ai", color: "from-orange-600/20 to-orange-400/20", textColor: "text-orange-400" },
  { name: "Figma", icon: "Fg", color: "from-purple-600/20 to-pink-400/20", textColor: "text-pink-400" },
  { name: "Canva", icon: "Cv", color: "from-cyan-500/20 to-blue-400/20", textColor: "text-cyan-400" },
  { name: "React", icon: "Re", color: "from-sky-500/20 to-cyan-300/20", textColor: "text-sky-300" },
  { name: "JavaScript", icon: "JS", color: "from-yellow-500/20 to-orange-300/20", textColor: "text-yellow-300" },
  { name: "Next.js", icon: "Nx", color: "from-slate-500/20 to-slate-300/20", textColor: "text-slate-300" },
  { name: "Tailwind", icon: "Tw", color: "from-teal-500/20 to-teal-300/20", textColor: "text-teal-300" },
];

export default function AboutSection() {
  const containerRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <section id="about" ref={containerRef} className="relative py-24 overflow-hidden bg-background border-t border-white/5">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden opacity-50">
        <motion.div
          style={{ y: y1 }}
          className="absolute top-[10%] left-[5%] w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[150px]"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-[10%] right-[5%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[150px]"
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">

          {/* LEFT SIDE: Image Reveal */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-5/12 relative"
          >
            <div className="relative aspect-[4/5] w-full max-w-sm mx-auto group">
              <div className="absolute -inset-4 border border-gold/5 rounded-[2rem] rotate-3 group-hover:rotate-0 transition-all duration-700" />
              
              <div className="relative h-full w-full overflow-hidden rounded-[2rem] glass border border-white/5 shadow-xl">
                <Image
                  src="/profile.png"
                  alt="Nandana K"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700 scale-105 group-hover:scale-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Floating UI Elements (Subtle) */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-6 -left-6 glass-dark p-4 rounded-2xl border border-white/10 shadow-glow-gold"
              >
                <Sparkles className="text-gold mb-2" size={20} />
                <div className="text-[8px] uppercase tracking-[0.2em] text-white/40">Creative</div>
                <div className="text-sm font-bold">Visionary</div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute -bottom-6 -right-6 glass-dark p-4 rounded-2xl border border-white/10 shadow-glow-crimson"
              >
                <Award className="text-crimson mb-2" size={20} />
                <div className="text-[8px] uppercase tracking-[0.2em] text-white/40">Premium</div>
                <div className="text-sm font-bold">Quality</div>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT SIDE: Content */}
          <div className="w-full lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center space-x-4 mb-6">
                <span className="w-12 h-[1px] bg-crimson" />
                <span className="text-luxury text-gold text-[10px]">Biography</span>
              </div>

              <h2 className="text-4xl md:text-6xl mb-8 font-bold tracking-tighter">
                Story Of <span className="text-crimson italic">Excellence</span>
              </h2>

              <p className="text-lg text-white/70 font-display mb-8 leading-relaxed italic">
                "Designing visual experiences that combine deep creativity, branding psychology, and modern web technology."
              </p>

              <p className="text-base text-white/30 mb-12 leading-relaxed max-w-xl">
                Nandana K is a creative design specialist focused on high-end branding systems and world-class digital experiences. By blending technical precision with artistic vision, I help international brands stand out.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {stats.map((stat, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    viewport={{ once: true }}
                    className="glass-interactive p-6 rounded-2xl border border-white/5"
                  >
                    <div className="mb-4">{stat.icon}</div>
                    <div className="text-2xl font-bold mb-1 tracking-tight">{stat.value}</div>
                    <div className="text-[8px] uppercase tracking-[0.2em] text-white/20 font-bold">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Skills Section */}
        <div className="mt-24 pt-24 border-t border-white/5">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 font-display tracking-tight">Technical <span className="text-crimson italic">Mastery</span></h2>
            <p className="text-luxury text-white/20 text-[10px]">Advanced Skills & Industry Tools</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {skills.map((skill, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.03 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="relative group aspect-square flex flex-col items-center justify-center glass rounded-2xl border border-white/5 hover:border-gold/20 transition-all cursor-default"
              >
                <div className={cn(
                  "w-10 h-10 rounded-xl mb-4 flex items-center justify-center text-lg font-black bg-gradient-to-br shadow-lg",
                  skill.color,
                  skill.textColor
                )}>
                  {skill.icon}
                </div>
                <div className="text-[8px] uppercase tracking-[0.2em] font-bold text-white/20 group-hover:text-white transition-colors">
                  {skill.name}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
