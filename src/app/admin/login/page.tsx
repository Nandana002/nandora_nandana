"use client";

import { motion } from "framer-motion";
import { Lock, Mail, ArrowRight, Sparkles, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Mock authentication
    setTimeout(() => {
      router.push("/admin/dashboard");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6 overflow-hidden relative">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-crimson/10 via-transparent to-transparent opacity-50" />
        <motion.div 
          animate={{ 
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.3, 0.1]
          }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute -top-[20%] -right-[20%] w-[1000px] h-[1000px] bg-gold/5 rounded-full blur-[200px]" 
        />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, ease: [0.76, 0, 0.24, 1] }}
        className="w-full max-w-xl relative z-10"
      >
        {/* Branding */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-flex items-center gap-3 px-6 py-2 glass rounded-full mb-8 border-white/10"
          >
            <ShieldCheck size={16} className="text-crimson" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Secure Admin Gateway</span>
          </motion.div>
          
          <h1 className="text-6xl md:text-8xl font-bold font-display tracking-tighter text-white mb-4">
            NANDANA<span className="text-crimson">.</span>
          </h1>
          <p className="text-luxury text-gold opacity-50">Authorized Personnel Only</p>
        </div>

        {/* Login Form */}
        <div className="glass-dark p-12 md:p-16 rounded-[40px] border border-white/5 shadow-premium relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-crimson/50 to-transparent" />
          
          <form onSubmit={handleLogin} className="space-y-10">
            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 ml-2">Email Address</label>
                <div className="relative group">
                  <Mail className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-crimson transition-colors" size={20} />
                  <input 
                    type="email" 
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-16 pr-8 py-5 outline-none focus:border-crimson/50 focus:bg-white/[0.05] transition-all duration-500 placeholder:text-white/5"
                    placeholder="admin@nandanak.com"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/30 ml-2">Access Key</label>
                <div className="relative group">
                  <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-crimson transition-colors" size={20} />
                  <input 
                    type="password" 
                    required
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl pl-16 pr-8 py-5 outline-none focus:border-crimson/50 focus:bg-white/[0.05] transition-all duration-500 placeholder:text-white/5"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button 
              disabled={isLoading}
              className="w-full btn-crimson flex items-center justify-center gap-4 group !py-5"
            >
              {isLoading ? (
                <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Authenticate Access <ArrowRight className="group-hover:translate-x-2 transition-transform" />
                </>
              )}
            </button>
          </form>

          <div className="mt-12 pt-10 border-t border-white/5 text-center">
            <button className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20 hover:text-white transition-colors flex items-center gap-3 mx-auto">
              <Sparkles size={14} className="text-gold" /> Forgot Secure Key?
            </button>
          </div>
        </div>

        {/* Footer Info */}
        <div className="mt-12 text-center">
          <p className="text-[10px] uppercase tracking-[0.4em] font-bold text-white/10 italic">
            Powered by Premium Creative Engine 2024
          </p>
        </div>
      </motion.div>
    </div>
  );
}
