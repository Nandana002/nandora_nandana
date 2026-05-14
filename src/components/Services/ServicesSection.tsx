"use client";

import { motion } from "framer-motion";
import { 
  Image as ImageIcon, 
  Share2, 
  BookOpen, 
  CreditCard, 
  Monitor, 
  Fingerprint, 
} from "lucide-react";

const services = [
  {
    title: "Branding Systems",
    desc: "Crafting world-class visual identities and psychology-driven brand systems.",
    icon: <Fingerprint className="text-crimson" size={24} />,
    tags: ["Strategy", "Guidelines"]
  },
  {
    title: "Poster Design",
    desc: "High-impact visual compositions for global events and premium promotions.",
    icon: <ImageIcon className="text-gold" size={24} />,
    tags: ["Print", "Layout"]
  },
  {
    title: "Social Creatives",
    desc: "Scroll-stopping content designed for maximum engagement and brand growth.",
    icon: <Share2 className="text-crimson" size={24} />,
    tags: ["Digital", "Marketing"]
  },
  {
    title: "Menu & Invitation",
    desc: "Elegant and functional layouts for premium dining and luxury experiences.",
    icon: <BookOpen className="text-gold" size={24} />,
    tags: ["F&B", "Typography"]
  },
  {
    title: "Business Identity",
    desc: "Sophisticated networking tools that leave a permanent professional impression.",
    icon: <CreditCard className="text-crimson" size={24} />,
    tags: ["Minimal", "Luxury"]
  },
  {
    title: "Interactive Web",
    desc: "Modern digital experiences with cinematic motion and immersive storytelling.",
    icon: <Monitor className="text-gold" size={24} />,
    tags: ["Next.js", "Three.js"]
  },
];

export default function ServicesSection() {
  return (
    <section id="services" className="relative py-16 bg-background overflow-hidden border-t border-white/5">
      {/* Background Lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-crimson/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <div className="flex items-center justify-center space-x-3 mb-3">
            <span className="w-8 h-[1px] bg-crimson" />
            <span className="text-luxury text-gold text-[8px]">Expertise</span>
            <span className="w-8 h-[1px] bg-crimson" />
          </div>
          <h2 className="text-3xl md:text-4xl mb-3 font-bold tracking-tighter">
            Core <span className="text-crimson italic">Offerings</span>
          </h2>
          <p className="text-sm text-white/20 max-w-lg mx-auto font-display italic leading-relaxed">
            "High-end creative solutions designed for luxury brands."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              viewport={{ once: true }}
              whileHover={{ y: -4 }}
              className="group relative"
            >
              <div className="relative h-full glass-interactive p-5 md:p-6 rounded-2xl flex flex-col border border-white/5 group-hover:border-crimson/20 transition-all duration-500">
                <div className="mb-4 p-2.5 bg-white/5 rounded-lg w-fit group-hover:bg-crimson group-hover:text-white transition-all duration-500">
                  {service.icon}
                </div>

                <h3 className="text-lg font-bold mb-2 font-display tracking-tight group-hover:text-gold transition-colors">{service.title}</h3>
                <p className="text-white/25 leading-relaxed mb-4 text-[13px] italic flex-grow">
                  {service.desc}
                </p>

                <div className="flex flex-wrap gap-1.5 pt-4 border-t border-white/5">
                  {service.tags.map((tag, j) => (
                    <span key={j} className="text-[7px] uppercase tracking-[0.15em] px-2 py-0.5 bg-white/5 rounded-full border border-white/5 text-white/10 font-bold">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
