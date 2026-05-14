"use client";

import { motion } from "framer-motion";
import { MessageCircle, ArrowRight, Sparkles } from "lucide-react";

export function ContactContent() {
  const whatsappUrl = "https://wa.me/918921087740";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true }}
      className="glass-dark p-8 md:p-12 rounded-[32px] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col justify-center text-center"
    >
      {/* Decorative Elements */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl group-hover:bg-gold/20 transition-all duration-700" />
      
      <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full glass border border-white/10 text-gold mb-6 mx-auto">
        <Sparkles size={12} />
        <span className="text-[8px] font-bold uppercase tracking-[0.4em]">Available Now</span>
      </div>

      <h2 className="text-3xl md:text-4xl font-bold tracking-tighter mb-6">
        Let's Craft Your <br />
        <span className="text-crimson">Masterpiece</span>
      </h2>

      <p className="text-base text-white/40 mb-8 italic font-display max-w-sm mx-auto leading-relaxed">
        "Direct collaboration yields the best results. Let's discuss your vision instantly."
      </p>

      <a 
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-4 px-8 py-4 bg-[#25D366] text-white rounded-xl font-bold uppercase tracking-[0.2em] text-[10px] hover:scale-105 active:scale-95 transition-all duration-500 shadow-[0_15px_40px_rgba(37,211,102,0.15)] mx-auto"
      >
        <MessageCircle size={18} className="fill-current" />
        WhatsApp Me
        <ArrowRight size={16} />
      </a>

      <div className="mt-8 pt-8 border-t border-white/5 flex flex-col items-center justify-center gap-4 text-[8px] uppercase tracking-[0.2em] text-white/20 font-bold">
        <p>Direct Response • Global Projects</p>
      </div>
    </motion.div>
  );
}

export default function ContactSection() {
  return (
    <section id="contact" className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[150px] pointer-events-none" />
      <div className="max-w-4xl mx-auto px-6 relative z-10">
        <ContactContent />
      </div>
    </section>
  );
}
