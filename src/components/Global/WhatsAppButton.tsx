"use client";

import { motion } from "framer-motion";
import { MessageCircle } from "lucide-react";

export default function WhatsAppButton() {
  const openWhatsApp = () => {
    window.open("https://wa.me/918921087740?text=Hello%20Nandana,%20I%20would%20like%20to%20discuss%20a%20project.", "_blank");
  };

  return (
    <motion.button
      onClick={openWhatsApp}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 10 }}
      whileTap={{ scale: 0.9 }}
      className="fixed bottom-10 left-10 z-[9999] w-16 h-16 bg-green-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(34,197,94,0.5)] glow-green group"
    >
      <MessageCircle size={32} />
      <span className="absolute left-20 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-widest text-white opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
        Chat with Nandana
      </span>
      <motion.div
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute inset-0 rounded-full bg-green-500/20 -z-10"
      />
    </motion.button>
  );
}
