"use client";

import { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue, AnimatePresence } from "framer-motion";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [hoverType, setHoverType] = useState<string | null>(null);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 25, stiffness: 250, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  // Trailing Dot
  const dotX = useSpring(cursorX, { damping: 40, stiffness: 400 });
  const dotY = useSpring(cursorY, { damping: 40, stiffness: 400 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);

      const target = e.target as HTMLElement;
      const isMagnetic = target.closest(".magnetic-target");
      const isLink = target.closest("a, button, [role='button']");

      if (isMagnetic) {
        setIsHovered(true);
        setHoverType("magnetic");
        
        const rect = (isMagnetic as HTMLElement).getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Slightly pull cursor towards center
        cursorX.set(centerX + (e.clientX - centerX) * 0.3);
        cursorY.set(centerY + (e.clientY - centerY) * 0.3);
      } else if (isLink) {
        setIsHovered(true);
        setHoverType("link");
      } else {
        setIsHovered(false);
        setHoverType(null);
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [cursorX, cursorY]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[99999] hidden md:block">
      {/* Outer Ring */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        animate={{
          width: isHovered ? (hoverType === "magnetic" ? 80 : 60) : 32,
          height: isHovered ? (hoverType === "magnetic" ? 80 : 60) : 32,
          backgroundColor: isClicking ? "rgba(139, 0, 0, 0.4)" : "rgba(255, 255, 255, 0.05)",
          border: isHovered ? "1px solid rgba(139, 0, 0, 0.5)" : "1px solid rgba(255, 255, 255, 0.2)",
          scale: isClicking ? 0.8 : 1,
        }}
        className="rounded-full flex items-center justify-center backdrop-blur-[2px] transition-colors duration-300"
      >
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              className="w-2 h-2 bg-crimson rounded-full glow-crimson"
            />
          )}
        </AnimatePresence>
      </motion.div>

      {/* Trailing Dot */}
      <motion.div
        style={{
          translateX: dotX,
          translateY: dotY,
          x: "-50%",
          y: "-50%",
        }}
        className="w-1.5 h-1.5 bg-gold rounded-full mix-blend-difference"
      />

      {/* Global Cursor Lighting Effect */}
      <motion.div
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          x: "-50%",
          y: "-50%",
        }}
        className="absolute w-[400px] h-[400px] bg-crimson/5 rounded-full blur-[100px] pointer-events-none -z-10"
      />
    </div>
  );
}
