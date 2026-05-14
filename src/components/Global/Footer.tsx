"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Instagram, Linkedin, MessageCircle, Github, ArrowUp, Mail, Globe } from "lucide-react";

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="relative bg-background border-t border-white/5 pt-20 pb-12 overflow-hidden">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/20 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-crimson/5 rounded-full blur-[150px] pointer-events-none" />

      {/* Large Decorative Typography */}
      <div className="absolute top-12 left-0 w-full overflow-hidden pointer-events-none opacity-[0.02] select-none">
        <h2 className="text-[15vw] font-black leading-none whitespace-nowrap tracking-tighter uppercase">
          NANDANA K NANDANA K
        </h2>
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16 mb-20">
          <div className="max-w-xl">
            <Link href="/" className="group inline-block mb-8">
              <h1 className="text-3xl font-bold font-display tracking-tighter text-white">
                NANDANA<span className="text-crimson">.</span>
              </h1>
            </Link>
            <p className="text-xl text-white/40 leading-relaxed mb-10 font-display italic">
              "Redefining excellence through cinematic visual design and modern interactive experiences."
            </p>
            <div className="flex gap-6">
              {[
                { icon: <Instagram size={20} />, href: "#" },
                { icon: <Linkedin size={20} />, href: "https://www.linkedin.com/in/nandana-k-42296b32a/" },
                { icon: <Github size={20} />, href: "#" },
                { icon: <MessageCircle size={20} />, href: "https://wa.me/918921087740" },
              ].map((item, i) => (
                <Link key={i} href={item.href} target="_blank" className="text-white/10 hover:text-crimson hover:scale-110 transition-all duration-500">
                  {item.icon}
                </Link>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-12 lg:gap-24 w-full lg:w-auto">
            <div className="space-y-8">
              <h4 className="text-luxury text-gold">Navigation</h4>
              <ul className="space-y-4">
                {["Home", "About", "Services", "Portfolio", "Contact"].map((link) => (
                  <li key={link}>
                    <Link href={`#${link.toLowerCase()}`} className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/30 hover:text-white transition-all duration-500 relative group">
                      {link}
                      <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 bg-crimson rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="space-y-8">
              <h4 className="text-luxury text-gold">Collaborate</h4>
              <ul className="space-y-4">
                <li>
                  <Link href="mailto:hello@nandanak.com" className="flex items-center gap-3 text-white/30 hover:text-white transition-all">
                    <Mail size={14} className="text-crimson" />
                    <span className="text-xs font-bold tracking-tight">hello@nandanak.com</span>
                  </Link>
                </li>
                <li>
                  <Link href="#" className="flex items-center gap-3 text-white/30 hover:text-white transition-all">
                    <Globe size={14} className="text-gold" />
                    <span className="text-xs font-bold tracking-tight">Schedule a Call</span>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-12 border-t border-white/5 gap-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/10">
              &copy; {new Date().getFullYear()} Nandana K Portfolio
            </p>
            <div className="hidden md:block w-8 h-[1px] bg-white/5" />
            <p className="text-[9px] uppercase tracking-[0.3em] font-bold text-white/5 italic">
              Experience Handcrafted with Passion
            </p>
          </div>
          
          <button 
            onClick={scrollToTop}
            className="group flex items-center gap-4 text-[9px] uppercase tracking-[0.3em] font-bold text-white/20 hover:text-white transition-all"
          >
            Top
            <div className="w-12 h-12 glass rounded-full flex items-center justify-center text-white group-hover:bg-crimson group-hover:shadow-glow-crimson transition-all duration-500">
              <ArrowUp size={20} />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
}
