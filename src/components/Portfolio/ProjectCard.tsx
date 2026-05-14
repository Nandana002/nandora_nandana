"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Calendar } from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/portfolioData";
import { useState } from "react";

interface ProjectCardProps {
  project: Project;
  onClick: (project: Project) => void;
}

export default function ProjectCard({ project, onClick }: ProjectCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // 3D Tilt Effect
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { damping: 20, stiffness: 200 });
  const mouseYSpring = useSpring(y, { damping: 20, stiffness: 200 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;

    x.set(xPct);
    y.set(yPct);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
    setIsHovered(false);
  }

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
      className="relative group cursor-pointer"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeave}
      onClick={() => onClick(project)}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
    >
      <div className="relative aspect-[4/5] overflow-hidden rounded-3xl glass-dark border border-white/5 group-hover:border-crimson/30 transition-all duration-500 shadow-xl">
        {/* Background Image with Premium Treatment */}
        <div className="absolute inset-0 bg-white/5 animate-pulse" />
        <Image
          src={project.image}
          alt={project.title}
          fill
          className="object-cover group-hover:scale-105 transition-all duration-700 ease-out"
        />

        {/* Cinematic Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent opacity-90 group-hover:opacity-100 transition-opacity duration-500" />

        {/* Content Area */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 transform translate-z-10">
          <motion.div
            animate={{ y: isHovered ? 0 : 10, opacity: isHovered ? 1 : 0.8 }}
            transition={{ duration: 0.4 }}
            className="space-y-4"
          >
            <div className="flex items-center gap-3">
              <span className="px-3 py-1 bg-crimson text-[8px] font-bold uppercase tracking-[0.2em] rounded-full">
                {project.category}
              </span>
              <span className="text-white/40 text-[8px] uppercase tracking-[0.2em] flex items-center gap-1.5 font-bold">
                <Calendar size={12} className="text-gold" /> {project.year}
              </span>
            </div>

            <h3 className="text-lg md:text-xl font-bold font-display tracking-tight text-white group-hover:text-gold transition-colors duration-500">
              {project.title}
            </h3>

            <p className="text-[10px] md:text-xs text-white/40 line-clamp-2 max-w-[240px] font-medium italic group-hover:text-white/70 transition-colors">
              {project.description}
            </p>

            <div className="flex items-center justify-between pt-4 border-t border-white/5">
              <div className="flex gap-2">
                {project.tags.slice(0, 2).map((tag, i) => (
                  <span key={i} className="text-[7px] uppercase tracking-[0.1em] text-white/20 border border-white/5 px-2 py-0.5 rounded-md">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="w-10 h-10 glass rounded-full flex items-center justify-center text-white border border-white/10 group-hover:bg-crimson group-hover:border-crimson transition-all duration-500">
                <ArrowUpRight size={18} />
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
