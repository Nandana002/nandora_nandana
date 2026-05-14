"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import {
  Menu,
  X,
  Instagram,
  Linkedin,
  MessageCircle,
  ArrowRight,
  Globe,
  Palette
} from "lucide-react";

const navLinks = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Services", href: "#services" },
  { name: "Portfolio", href: "#portfolio" },
  { name: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: <Instagram size={18} />, href: "#" },
  { icon: <Linkedin size={18} />, href: "https://www.linkedin.com/in/nandana-k-42296b32a/" },
  { icon: <MessageCircle size={18} />, href: "#" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[10000] transition-all duration-700 ${scrolled ? "py-4" : "py-10"
        }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className={`relative flex items-center justify-between px-8 py-4 rounded-[2rem] transition-all duration-700 ${scrolled ? "glass-dark border-white/10" : "bg-transparent border-transparent"
          }`}>
          {/* Logo */}
          <Link href="/" className="group relative z-10">
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-3xl font-bold font-display tracking-tighter text-white"
            >
              NANDANA<span className="text-crimson">.</span>
            </motion.h1>
            <div className="absolute -bottom-1 left-0 w-0 h-[2px] bg-crimson transition-all duration-500 group-hover:w-full" />
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center space-x-12">
            <div className="flex items-center space-x-10">
              {navLinks.map((link, i) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative text-[10px] uppercase tracking-[0.3em] font-bold text-white/50 hover:text-white transition-colors group"
                >
                  {link.name}
                  <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-crimson rounded-full scale-0 group-hover:scale-100 transition-transform duration-300" />
                </Link>
              ))}
            </div>

            <div className="h-6 w-[1px] bg-white/10" />

            <div className="flex items-center space-x-6">
              {socialLinks.map((social, i) => (
                <Link
                  key={i}
                  href={social.href}
                  className="text-white/30 hover:text-crimson transition-all hover:scale-110"
                >
                  {social.icon}
                </Link>
              ))}
            </div>

            <Link
              href="#contact"
              className="px-6 py-2.5 bg-white text-black text-[10px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-crimson hover:text-white transition-all transform hover:scale-105 active:scale-95 shadow-glow-crimson magnetic-target"
            >
              Let's Talk
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="lg:hidden w-12 h-12 glass rounded-full flex items-center justify-center text-white"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-[9999] bg-background/95 backdrop-blur-3xl flex flex-col items-center justify-center space-y-12"
          >
            {navLinks.map((link, i) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-5xl md:text-7xl font-bold font-display text-white/40 hover:text-white transition-all tracking-tighter"
              >
                {link.name}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
