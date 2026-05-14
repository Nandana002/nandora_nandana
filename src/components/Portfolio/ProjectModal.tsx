"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ArrowLeft, ArrowRight, ExternalLink, Calendar, User, Hammer, Briefcase } from "lucide-react";
import Image from "next/image";
import { Project } from "@/lib/portfolioData";
import { useState } from "react";

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
  const [currentSlide, setCurrentSlide] = useState(0);

  if (!project) return null;

  const slides = [project.image, ...(project.gallery || (project as any).images || [])];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[12000] flex items-center justify-center p-4 md:p-10"
        >
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/90 backdrop-blur-3xl"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 50 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-7xl h-full max-h-[90vh] bg-charcoal/50 rounded-[40px] border border-white/10 overflow-hidden flex flex-col md:flex-row glass-dark"
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-6 right-6 z-[12001] w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:bg-crimson hover:border-crimson transition-all"
            >
              <X size={24} />
            </button>

            {/* Left Side: Image Gallery */}
            <div className="w-full md:w-3/5 h-1/2 md:h-full relative group">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
                  className="relative w-full h-full"
                >
                  <Image
                    src={slides[currentSlide]}
                    alt={project.title}
                    fill
                    className="object-contain bg-black/20"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent pointer-events-none" />
                </motion.div>
              </AnimatePresence>

              {/* Slider Controls */}
              {slides.length > 1 && (
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10">
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev > 0 ? prev - 1 : slides.length - 1))}
                    className="w-14 h-14 glass rounded-full flex items-center justify-center text-white hover:glow-crimson transition-all"
                  >
                    <ArrowLeft size={24} />
                  </button>
                  <div className="flex gap-2">
                    {slides.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1.5 rounded-full transition-all duration-500 ${
                          currentSlide === i ? "w-8 bg-crimson" : "w-2 bg-white/20"
                        }`}
                      />
                    ))}
                  </div>
                  <button
                    onClick={() => setCurrentSlide((prev) => (prev < slides.length - 1 ? prev + 1 : 0))}
                    className="w-14 h-14 glass rounded-full flex items-center justify-center text-white hover:glow-crimson transition-all"
                  >
                    <ArrowRight size={24} />
                  </button>
                </div>
              )}
            </div>

            {/* Right Side: Details */}
            <div className="w-full md:w-2/5 h-1/2 md:h-full p-8 md:p-16 overflow-y-auto custom-scrollbar flex flex-col">
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <div className="flex items-center gap-4 mb-8">
                  <span className="px-4 py-1.5 bg-crimson/20 border border-crimson/30 text-crimson text-xs font-bold uppercase tracking-[0.2em] rounded-full">
                    {project.category}
                  </span>
                </div>

                <h2 className="text-4xl md:text-6xl font-bold font-display mb-8 text-white leading-tight">
                  {project.title}
                </h2>

                <p className="text-white/60 text-lg leading-relaxed mb-12">
                  {project.description}
                </p>

                <div className="grid grid-cols-2 gap-8 mb-12">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest">
                      <User size={14} /> Client
                    </div>
                    <div className="text-white font-medium">{project.client}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest">
                      <Calendar size={14} /> Year
                    </div>
                    <div className="text-white font-medium">{project.year}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest">
                      <Hammer size={14} /> Tools
                    </div>
                    <div className="text-white/70 text-sm">{(project.tools || []).join(", ")}</div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gold text-xs font-bold uppercase tracking-widest">
                      <Briefcase size={14} /> Category
                    </div>
                    <div className="text-white/70 text-sm">{project.category}</div>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-12">
                  {(project.tags || []).map((tag: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] text-white/40 uppercase tracking-widest">
                      #{tag}
                    </span>
                  ))}
                </div>

                <button className="w-full py-5 bg-crimson text-white font-bold uppercase tracking-[0.3em] rounded-2xl flex items-center justify-center gap-3 hover:glow-crimson transition-all transform active:scale-95 group">
                  Live Preview <ExternalLink size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
