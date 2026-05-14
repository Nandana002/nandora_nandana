"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 1000);
          return 100;
        }
        return prev + Math.floor(Math.random() * 5) + 1;
      });
    }, 50);

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ 
            y: "-100%",
            transition: { duration: 1, ease: [0.76, 0, 0.24, 1], delay: 0.2 }
          }}
          className="fixed inset-0 z-[99999] bg-background flex flex-col items-center justify-center overflow-hidden"
        >
          {/* Cinematic Background Particles */}
          <div className="absolute inset-0 pointer-events-none opacity-20">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ 
                  opacity: [0, 1, 0], 
                  scale: [0, 1, 0],
                  x: (Math.random() - 0.5) * 1000,
                  y: (Math.random() - 0.5) * 1000,
                }}
                transition={{ 
                  duration: Math.random() * 3 + 2, 
                  repeat: Infinity,
                  delay: Math.random() * 2
                }}
                className="absolute left-1/2 top-1/2 w-1 h-1 bg-crimson rounded-full blur-[1px]"
              />
            ))}
          </div>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 1 }}
              className="mb-12"
            >
              <h1 className="text-6xl md:text-9xl font-bold font-display tracking-tighter text-white">
                NANDANA<span className="text-crimson">.</span>
              </h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 2, ease: "easeInOut" }}
                className="h-[1px] bg-gradient-to-r from-transparent via-crimson to-transparent mt-4"
              />
            </motion.div>

            <div className="flex flex-col items-center gap-4">
              <div className="relative w-64 h-[2px] bg-white/5 rounded-full overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full bg-crimson glow-crimson"
                  initial={{ width: 0 }}
                  animate={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-bold font-display text-white">{progress}</span>
                <span className="text-xs text-white/40 uppercase tracking-[0.4em] font-bold">Percent Immersed</span>
              </div>
            </div>
          </div>

          {/* Ambience Lighting */}
          <motion.div
            animate={{ 
              scale: [1, 1.2, 1],
              opacity: [0.1, 0.2, 0.1]
            }}
            transition={{ duration: 4, repeat: Infinity }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/10 rounded-full blur-[150px]"
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
