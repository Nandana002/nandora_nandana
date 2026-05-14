"use client";

import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Briefcase, 
  Layers, 
  Star, 
  CalendarCheck, 
  MessageSquare, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Share2,
  ExternalLink
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const menuItems = [
  { name: "Dashboard", icon: <LayoutDashboard size={20} />, href: "/admin/dashboard" },
  { name: "Portfolio", icon: <Briefcase size={20} />, href: "/admin/portfolio" },
  { name: "Categories", icon: <Layers size={20} />, href: "/admin/categories" },
  { name: "Testimonials", icon: <Star size={20} />, href: "/admin/testimonials" },
  { name: "Bookings", icon: <CalendarCheck size={20} />, href: "/admin/bookings" },
  { name: "Messages", icon: <MessageSquare size={20} />, href: "/admin/messages" },
  { name: "Social Links", icon: <Share2 size={20} />, href: "/admin/socials" },
  { name: "Settings", icon: <Settings size={20} />, href: "/admin/settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (pathname === "/admin/login") return <>{children}</>;

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ width: isSidebarOpen ? 280 : 80 }}
        className="fixed left-0 top-0 bottom-0 z-50 bg-charcoal/50 backdrop-blur-2xl border-r border-white/5 overflow-hidden flex flex-col"
      >
        <div className="p-6 flex items-center justify-between mb-8">
          {isSidebarOpen && (
            <motion.h1 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-xl font-bold font-display tracking-tighter"
            >
              ADMIN<span className="text-crimson">.</span>
            </motion.h1>
          )}
          <button 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="w-8 h-8 flex items-center justify-center hover:bg-white/5 rounded-lg text-white/50 hover:text-white transition-colors"
          >
            {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        <nav className="flex-grow px-4 space-y-2">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all group relative ${
                  isActive ? "bg-crimson/10 text-white border border-crimson/20" : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
              >
                <div className={`${isActive ? "text-crimson" : "group-hover:text-gold"} transition-colors`}>
                  {item.icon}
                </div>
                {isSidebarOpen && (
                  <motion.span 
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-sm font-bold uppercase tracking-widest"
                  >
                    {item.name}
                  </motion.span>
                )}
                {isActive && (
                  <motion.div 
                    layoutId="active-indicator"
                    className="absolute left-0 w-1 h-6 bg-crimson rounded-r-full" 
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-4 px-4 py-3.5 text-gold/60 hover:text-gold transition-colors"
          >
            <ExternalLink size={20} />
            {isSidebarOpen && <span className="text-xs font-bold uppercase tracking-widest">View Website</span>}
          </Link>
          <button
            className="w-full flex items-center gap-4 px-4 py-3.5 text-white/20 hover:text-crimson transition-colors"
          >
            <LogOut size={20} />
            {isSidebarOpen && <span className="text-xs font-bold uppercase tracking-widest">Logout</span>}
          </button>
        </div>
      </motion.aside>

      {/* Main Content */}
      <main 
        className="flex-grow transition-all duration-300 min-h-screen p-8 md:p-12"
        style={{ marginLeft: isSidebarOpen ? 280 : 80 }}
      >
        {children}
      </main>
    </div>
  );
}
