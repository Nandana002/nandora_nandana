"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";

export default function AmbientSound() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Note: Most browsers block autoplay without user interaction.
    // This audio is muted/stopped by default as per requirements.
    audioRef.current = new Audio("https://res.cloudinary.com/dzvk7vpk8/video/upload/v1715671237/ambient_chill.mp3");
    audioRef.current.loop = true;
    audioRef.current.volume = 0.2;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleSound = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.log("Audio playback blocked", e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-10 right-32 z-[9999] flex items-center gap-4">
      <AnimatePresence>
        {isPlaying && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="flex gap-1 items-end h-4"
          >
            {[...Array(4)].map((_, i) => (
              <motion.div
                key={i}
                animate={{ height: [4, 16, 4] }}
                transition={{ duration: 0.5 + i * 0.1, repeat: Infinity }}
                className="w-[2px] bg-crimson"
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      
      <motion.button
        onClick={toggleSound}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="w-12 h-12 glass rounded-full flex items-center justify-center text-white hover:glow-crimson transition-all magnetic-target"
      >
        {isPlaying ? <Volume2 size={20} /> : <VolumeX size={20} />}
      </motion.button>
    </div>
  );
}
