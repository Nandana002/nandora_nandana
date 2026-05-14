"use client";

import { motion } from "framer-motion";
import { 
  User, 
  Mail, 
  Lock, 
  Shield, 
  Bell, 
  Globe, 
  Save, 
  Camera,
  Trash2,
  Eye,
  Github,
  Instagram,
  Linkedin
} from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function ProfileSettings() {
  return (
    <div className="max-w-5xl mx-auto space-y-12">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold font-display tracking-tight mb-2">Profile <span className="text-crimson">Settings</span></h1>
        <p className="text-white/40 text-sm font-medium">Manage your personal identity and secure your digital presence.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Left: Avatar & Quick Stats */}
        <div className="lg:col-span-1 space-y-8">
          <div className="glass-dark p-10 rounded-[40px] border border-white/5 flex flex-col items-center text-center">
            <div className="relative group cursor-pointer mb-8">
              <div className="w-32 h-32 rounded-[32px] overflow-hidden border-2 border-white/10 group-hover:border-crimson transition-all relative">
                <Image 
                  src="https://res.cloudinary.com/dzvk7vpk8/image/upload/v1715671235/profile_avatar.jpg" 
                  alt="Nandana" 
                  fill 
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Camera className="text-white" size={24} />
                </div>
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-crimson rounded-xl flex items-center justify-center text-white shadow-glow-crimson border-4 border-background">
                <Save size={16} />
              </div>
            </div>

            <h3 className="text-2xl font-bold text-white mb-2">Nandana K</h3>
            <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-bold mb-8 italic">Creative Specialist</p>
            
            <div className="w-full space-y-4">
              <button className="w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-white transition-all flex items-center justify-center gap-3">
                <Eye size={16} /> Preview Profile
              </button>
              <button className="w-full py-4 bg-crimson/10 hover:bg-crimson/20 border border-crimson/20 rounded-2xl text-[10px] font-bold uppercase tracking-widest text-crimson transition-all flex items-center justify-center gap-3">
                <Trash2 size={16} /> Delete Account
              </button>
            </div>
          </div>

          <div className="glass-dark p-8 rounded-[40px] border border-white/5 space-y-6">
            <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] text-gold/60 ml-2">System Status</h4>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3 text-white/60">
                  <Shield size={16} /> <span className="text-sm font-medium">Security</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-green-500">Strong</span>
              </div>
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl">
                <div className="flex items-center gap-3 text-white/60">
                  <Globe size={16} /> <span className="text-sm font-medium">Domain</span>
                </div>
                <span className="text-[10px] font-bold uppercase tracking-widest text-blue-500">Live</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Detailed Settings */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-dark p-10 md:p-12 rounded-[40px] border border-white/5 space-y-12">
            
            {/* General Info */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold font-display tracking-tight flex items-center gap-4">
                <span className="w-2 h-8 bg-crimson rounded-full" /> General Information
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Display Name</label>
                  <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-crimson/50 transition-all text-sm" placeholder="Nandana K" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Creative Title</label>
                  <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-crimson/50 transition-all text-sm" placeholder="Graphic Designer & Developer" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Email Identity</label>
                  <input className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-crimson/50 transition-all text-sm" placeholder="hello@nandanak.com" />
                </div>
              </div>
            </div>

            {/* Social Matrix */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold font-display tracking-tight flex items-center gap-4">
                <span className="w-2 h-8 bg-gold rounded-full" /> Digital Matrix
              </h2>
              <div className="space-y-6">
                {[
                  { icon: <Instagram size={18} />, label: "Instagram", placeholder: "@nandana_k" },
                  { icon: <Linkedin size={18} />, label: "LinkedIn", placeholder: "linkedin.com/in/nandanak" },
                  { icon: <Github size={18} />, label: "GitHub", placeholder: "github.com/nandanak" }
                ].map((social, i) => (
                  <div key={i} className="flex items-center gap-4 group">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-white/20 group-focus-within:text-gold transition-all">
                      {social.icon}
                    </div>
                    <input className="flex-grow bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-gold/50 transition-all text-sm" placeholder={social.placeholder} />
                  </div>
                ))}
              </div>
            </div>

            {/* Security Pulse */}
            <div className="space-y-8">
              <h2 className="text-xl font-bold font-display tracking-tight flex items-center gap-4">
                <span className="w-2 h-8 bg-white/20 rounded-full" /> Security Protocol
              </h2>
              <div className="space-y-6">
                <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-crimson">
                      <Lock size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Two-Factor Authentication</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Recommended for security</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-white/10 rounded-full relative p-1 cursor-pointer">
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white/20 rounded-full" />
                  </div>
                </div>

                <div className="flex items-center justify-between p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gold">
                      <Bell size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">Email Notifications</p>
                      <p className="text-[10px] text-white/30 uppercase tracking-widest mt-1">Receive new booking alerts</p>
                    </div>
                  </div>
                  <div className="w-12 h-6 bg-green-500 rounded-full relative p-1 cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full shadow-lg" />
                  </div>
                </div>
              </div>
            </div>

            <button className="w-full btn-crimson !py-5 !rounded-3xl flex items-center justify-center gap-3 group">
              <Save size={20} className="group-hover:rotate-12 transition-transform" /> Synchronize Profile
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
