"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, Upload, Trash2, Send, CheckCircle2, User, Briefcase, MessageSquare } from "lucide-react";
import { useForm } from "react-hook-form";
import axios from "axios";

export function SubmitTestimonialContent() {
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [image, setImage] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const { register, handleSubmit, reset, formState: { isSubmitting } } = useForm();

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await axios.post("/api/upload", { image: reader.result });
        setImage(res.data.url);
      } catch (error) {
        alert("Image upload failed");
      } finally {
        setUploading(false);
      }
    };
  };

  const onSubmit = async (data: any) => {
    try {
      const testimonialData = {
        ...data,
        rating,
        image: image || `https://i.pravatar.cc/150?u=${data.name}`,
        status: "approved"
      };
      await axios.post("/api/testimonials", testimonialData);
      setSubmitted(true);
      reset();
      setRating(5);
      setImage(null);
      // Dispatch an event to notify TestimonialSection to refresh
      window.dispatchEvent(new Event('testimonialAdded'));
    } catch (error) {
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="glass-dark p-8 md:p-12 rounded-[32px] border border-white/5 relative overflow-hidden h-full">
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-center mb-8"
      >
        <div className="flex items-center justify-center space-x-3 mb-2">
          <span className="w-8 h-[1px] bg-gold/20" />
          <span className="text-[8px] uppercase tracking-[0.4em] text-gold/60 font-bold">Feedback</span>
          <span className="w-8 h-[1px] bg-gold/20" />
        </div>
        <h2 className="text-2xl font-bold tracking-tight text-white">Share Your <span className="text-gold">Story</span></h2>
      </motion.div>

      <AnimatePresence mode="wait">
        {submitted ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-6"
          >
            <div className="w-16 h-16 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mx-auto mb-6 shadow-glow-green">
              <CheckCircle2 className="text-green-500" size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Success!</h3>
            <p className="text-white/40 text-xs italic mb-8">Thank you. Your story will be live soon.</p>
            <button 
              onClick={() => setSubmitted(false)}
              className="text-gold font-bold uppercase tracking-widest text-[8px] hover:underline"
            >
              Submit Another
            </button>
          </motion.div>
        ) : (
          <form key="form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col items-center justify-center space-y-2">
                <label className="relative w-16 h-16 rounded-[16px] border-2 border-dashed border-white/10 hover:border-gold/50 transition-all cursor-pointer overflow-hidden flex items-center justify-center group">
                  <input type="file" onChange={handleImageUpload} className="hidden" />
                  {image ? (
                    <img src={image} alt="Preview" className="w-full h-full object-cover" />
                  ) : uploading ? (
                    <div className="w-5 h-5 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
                  ) : (
                    <div className="flex flex-col items-center text-white/20 group-hover:text-gold transition-colors">
                      <Upload size={14} />
                      <span className="text-[6px] font-bold uppercase mt-1">Photo</span>
                    </div>
                  )}
                </label>
              </div>

              <div className="flex flex-col items-center justify-center space-y-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <motion.button
                      key={star}
                      type="button"
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      onClick={() => setRating(star)}
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                      className="transition-colors"
                    >
                      <Star 
                        size={16} 
                        className={`${
                          (hoverRating || rating) >= star ? "text-gold fill-gold glow-gold" : "text-white/10"
                        } transition-all duration-300`} 
                      />
                    </motion.button>
                  ))}
                </div>
                <p className="text-[7px] font-bold uppercase tracking-widest text-white/20">Rating</p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1">
                <div className="relative group">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-gold transition-colors" size={14} />
                  <input 
                    {...register("name", { required: true })}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-gold/30 focus:bg-white/[0.04] transition-all text-xs text-white"
                    placeholder="Your Name"
                  />
                </div>
              </div>
              <div className="space-y-1">
                <div className="relative group">
                  <Briefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-gold transition-colors" size={14} />
                  <input 
                    {...register("role", { required: true })}
                    className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-3 outline-none focus:border-gold/30 focus:bg-white/[0.04] transition-all text-xs text-white"
                    placeholder="Role / Company"
                  />
                </div>
              </div>
            </div>

            <div className="space-y-1">
              <div className="relative group">
                <MessageSquare className="absolute left-4 top-4 text-white/10 group-focus-within:text-gold transition-colors" size={14} />
                <textarea 
                  {...register("text", { required: true, minLength: 10 })}
                  rows={3}
                  className="w-full bg-white/[0.02] border border-white/5 rounded-xl pl-12 pr-4 py-4 outline-none focus:border-gold/30 focus:bg-white/[0.04] transition-all resize-none text-xs text-white"
                  placeholder="Share your story..."
                />
              </div>
            </div>

            <button 
              disabled={isSubmitting || uploading}
              className="w-full py-4 bg-gold text-black font-bold uppercase tracking-[0.3em] rounded-xl flex items-center justify-center gap-2 hover:shadow-glow-gold transition-all duration-500 active:scale-[0.98] disabled:opacity-50 text-[10px]"
            >
              {isSubmitting ? "Transmitting..." : <><Send size={14} /> Send Story</>}
            </button>
          </form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function SubmitTestimonial() {
  return (
    <section className="py-24 bg-background relative overflow-hidden">
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[300px] h-[300px] bg-gold/5 rounded-full blur-[100px] pointer-events-none" />
      <div className="max-w-xl mx-auto px-6 relative z-10">
        <SubmitTestimonialContent />
      </div>
    </section>
  );
}
