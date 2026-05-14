"use client";

import { motion } from "framer-motion";
import { 
  Briefcase, 
  Users, 
  TrendingUp, 
  Calendar, 
  ArrowUpRight, 
  Plus,
  Clock,
  CircleCheck
} from "lucide-react";

const stats = [
  { label: "Total Projects", value: "24", icon: <Briefcase />, color: "bg-blue-500/10 text-blue-500" },
  { label: "Total Bookings", value: "15", icon: <Calendar />, color: "bg-crimson/10 text-crimson" },
  { label: "Happy Clients", value: "82", icon: <Users />, color: "bg-gold/10 text-gold" },
  { label: "Conversion Rate", value: "12%", icon: <TrendingUp />, color: "bg-green-500/10 text-green-500" },
];

const recentActivities = [
  { action: "Project Uploaded", target: "Vanguard Tech Identity", time: "2 hours ago", status: "success" },
  { action: "New Booking Request", target: "Royal Kerala Wedding", time: "5 hours ago", status: "pending" },
  { action: "Testimonial Added", target: "Sarah Johnson", time: "Yesterday", status: "success" },
  { action: "Category Updated", target: "Logos", time: "2 days ago", status: "success" },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-display tracking-tight mb-2">Welcome Back, <span className="text-crimson">Nandana</span></h1>
          <p className="text-white/40 text-sm font-medium">Here's what's happening with your portfolio today.</p>
        </div>
        <div className="flex gap-4">
          <button className="px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold uppercase tracking-widest hover:bg-white/10 transition-all">
            Settings
          </button>
          <button className="px-6 py-3 bg-crimson text-white rounded-2xl text-xs font-bold uppercase tracking-widest flex items-center gap-2 hover:glow-crimson transition-all transform active:scale-95">
            <Plus size={16} /> New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark p-8 rounded-[32px] border border-white/5 hover:border-white/20 transition-all group"
          >
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-6 ${stat.color}`}>
              {stat.icon}
            </div>
            <div className="text-3xl font-bold mb-1 tracking-tight">{stat.value}</div>
            <div className="text-xs uppercase tracking-widest text-white/40 font-bold">{stat.label}</div>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Activity */}
        <div className="lg:col-span-2 glass-dark rounded-[32px] border border-white/5 p-8">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl font-bold font-display">Recent Activity</h3>
            <button className="text-xs font-bold uppercase tracking-widest text-gold/60 hover:text-gold transition-colors">View All</button>
          </div>
          <div className="space-y-6">
            {recentActivities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 transition-all group">
                <div className="flex items-center gap-4">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    activity.status === "success" ? "bg-green-500/10 text-green-500" : "bg-gold/10 text-gold"
                  }`}>
                    {activity.status === "success" ? <CircleCheck size={18} /> : <Clock size={18} />}
                  </div>
                  <div>
                    <h4 className="font-bold text-white group-hover:text-gold transition-colors">{activity.action}</h4>
                    <p className="text-xs text-white/40">{activity.target}</p>
                  </div>
                </div>
                <span className="text-xs text-white/20 font-medium italic">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Card */}
        <div className="glass-dark rounded-[32px] border border-white/5 p-8 relative overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-crimson/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h3 className="text-xl font-bold font-display mb-8 relative z-10">Quick Actions</h3>
          <div className="space-y-4 relative z-10">
            {[
              "Update Categories",
              "Manage Bookings",
              "Edit Services",
              "View Feedback",
              "System Logs"
            ].map((action, i) => (
              <button key={i} className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 border border-white/5 transition-all text-sm font-medium">
                {action} <ArrowUpRight size={16} className="text-white/20 group-hover:text-white" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
