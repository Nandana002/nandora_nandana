"use client";

import { motion } from "framer-motion";
import { Star, Quote, Loader2 } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TestimonialSection() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();

    // Listen for new testimonials being added
    const handleNewTestimonial = () => fetchTestimonials();
    window.addEventListener('testimonialAdded', handleNewTestimonial);
    
    return () => {
      window.removeEventListener('testimonialAdded', handleNewTestimonial);
    };
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("/api/testimonials");
      // Filter only approved ones
      const approved = res.data.filter((t: any) => t.status === "approved");
      setTestimonials(approved);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div className="py-20 flex flex-col items-center justify-center text-white/10">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="text-luxury tracking-widest">Listening to Client Praise...</p>
    </div>
  );

  if (testimonials.length === 0) return null;

  return (
    <section id="testimonials" className="relative py-32 bg-charcoal/20 overflow-hidden">
      {/* Background Atmosphere */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-center mb-24"
        >
          <div className="flex items-center justify-center space-x-6 mb-8">
            <span className="w-16 h-[1px] bg-crimson" />
            <span className="text-luxury text-gold">Elite Collaborations</span>
            <span className="w-16 h-[1px] bg-crimson" />
          </div>
          <h2 className="heading-huge text-5xl md:text-7xl mb-8">
            Client <span className="text-crimson">Voices</span>
          </h2>
          <p className="text-white/40 uppercase tracking-[0.4em] text-sm font-bold">Trusted by Industry Leaders Worldwide</p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8">
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="w-full md:w-[calc(50%-2rem)] lg:w-[calc(33.33%-2rem)] glass-dark p-10 rounded-[40px] border border-white/5 hover:border-white/20 transition-all group relative"
            >
              <Quote className="absolute top-8 right-8 text-white/5 group-hover:text-crimson/20 transition-colors" size={60} />
              
              <div className="flex gap-1 mb-6">
                {[...Array(t.rating)].map((_, j) => (
                  <Star key={j} size={14} fill="#d4af37" className="text-gold" />
                ))}
              </div>

              <p className="text-white/70 italic mb-10 leading-relaxed text-lg line-clamp-4">
                "{t.text}"
              </p>

              <div className="flex items-center gap-4">
                <div className="relative w-14 h-14 rounded-2xl overflow-hidden border border-white/10">
                  <Image src={t.image || `https://i.pravatar.cc/150?u=${t._id}`} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h4 className="text-white font-bold">{t.name}</h4>
                  <p className="text-gold/60 text-xs uppercase tracking-widest">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
