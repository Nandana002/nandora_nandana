"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Star, Quote, Plus, Trash2, Edit, Check, X, Loader2, Clock } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import axios from "axios";

export default function TestimonialsPage() {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.get("/api/testimonials");
      setTestimonials(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id: string, status: string) => {
    try {
      await axios.patch(`/api/testimonials/${id}`, { status });
      setTestimonials(testimonials.map(t => t._id === id ? { ...t, status } : t));
    } catch (error) {
      alert("Failed to update status");
    }
  };

  const deleteTestimonial = async (id: string) => {
    if (!confirm("Remove this testimonial?")) return;
    try {
      await axios.delete(`/api/testimonials/${id}`);
      setTestimonials(testimonials.filter(t => t._id !== id));
    } catch (error) {
      alert("Failed to delete");
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white/20">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="text-luxury uppercase tracking-widest">Accessing Praise Hub...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-4xl font-bold font-display tracking-tight mb-2">Client <span className="text-crimson">Testimonials</span></h1>
          <p className="text-white/40 text-sm font-medium">Moderate and manage the praise from your global collaborators.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <AnimatePresence>
          {testimonials.map((t, i) => (
            <motion.div
              key={t._id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.1 }}
              className="glass-dark p-10 rounded-[40px] border border-white/5 relative group"
            >
              <Quote className="absolute top-10 right-10 text-white/5" size={80} />
              
              {/* Status Badge */}
              <div className="absolute top-6 left-10">
                <span className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 ${
                  t.status === "pending" ? "bg-gold/10 text-gold border border-gold/20" : 
                  t.status === "rejected" ? "bg-crimson/10 text-crimson border border-crimson/20" : 
                  "bg-green-500/10 text-green-500 border border-green-500/20"
                }`}>
                  {t.status === "pending" ? <Clock size={12} /> : t.status === "approved" ? <Check size={12} /> : <X size={12} />}
                  {t.status}
                </span>
              </div>

              <div className="flex items-center gap-6 mb-8 mt-6 relative z-10">
                <div className="w-16 h-16 glass rounded-2xl overflow-hidden border border-white/10 relative">
                  <Image src={t.image || `https://i.pravatar.cc/150?u=${t._id}`} alt={t.name} fill className="object-cover" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">{t.name}</h3>
                  <p className="text-xs text-gold font-bold uppercase tracking-widest">{t.role}</p>
                </div>
              </div>

              <p className="text-lg text-white/60 italic font-display leading-relaxed mb-10">"{t.text}"</p>
              
              <div className="flex justify-between items-center pt-8 border-t border-white/5">
                <div className="flex gap-1">
                  {[...Array(t.rating)].map((_, j) => (
                    <Star key={j} size={14} className="text-gold fill-gold" />
                  ))}
                </div>
                
                <div className="flex gap-3">
                  {t.status === "pending" && (
                    <>
                      <button 
                        onClick={() => updateStatus(t._id, "approved")}
                        className="p-3 bg-green-500/10 border border-green-500/20 rounded-xl text-green-500 hover:bg-green-500 hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4"
                      >
                        <Check size={16} /> Approve
                      </button>
                      <button 
                        onClick={() => updateStatus(t._id, "rejected")}
                        className="p-3 bg-crimson/10 border border-crimson/20 rounded-xl text-crimson hover:bg-crimson hover:text-white transition-all flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest px-4"
                      >
                        <X size={16} /> Reject
                      </button>
                    </>
                  )}
                  <button 
                    onClick={() => deleteTestimonial(t._id)}
                    className="p-3 bg-white/5 rounded-xl text-white/20 hover:text-crimson transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
