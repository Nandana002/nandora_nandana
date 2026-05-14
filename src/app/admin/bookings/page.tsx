"use client";

import { motion } from "framer-motion";
import { 
  Mail, 
  Phone, 
  MessageSquare, 
  Filter, 
  CheckCircle2, 
  Clock, 
  Trash2,
  MessageCircle,
  Loader2
} from "lucide-react";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BookingManagement() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const res = await axios.get("/api/bookings");
      setBookings(res.data);
    } catch (error) {
      console.error("Failed to fetch bookings", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteBooking = async (id: string) => {
    if (!confirm("Remove this booking record?")) return;
    try {
      await axios.delete(`/api/bookings/${id}`); // Need to create individual DELETE route if needed, but for now filtering locally or using a general endpoint
      setBookings(bookings.filter(b => b._id !== id));
    } catch (error) {
      alert("Failed to delete");
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white/20">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="text-luxury uppercase tracking-widest">Retrieving Inquiries...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-display tracking-tight mb-2">Project <span className="text-crimson">Bookings</span></h1>
          <p className="text-white/40 text-sm font-medium">Review and manage premium creative inquiries from global clients.</p>
        </div>
      </div>

      {/* Bookings Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
        {bookings.map((booking, i) => (
          <motion.div
            key={booking._id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.1 }}
            className="glass-dark p-8 rounded-[40px] border border-white/5 hover:border-crimson/20 transition-all group relative overflow-hidden"
          >
            <div className="absolute top-6 right-6">
              <span className="px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest flex items-center gap-2 bg-gold/10 text-gold">
                <Clock size={12} /> {booking.status}
              </span>
            </div>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-gold transition-colors">{booking.name}</h3>
                <p className="text-xs text-white/30 uppercase tracking-widest mt-1 font-bold">
                  {new Date(booking.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white/60">
                  <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-crimson">
                    <Mail size={18} />
                  </div>
                  <span className="text-sm font-medium">{booking.email}</span>
                </div>
                {booking.phone && (
                  <div className="flex items-center gap-4 text-white/60">
                    <div className="w-10 h-10 glass rounded-xl flex items-center justify-center text-gold">
                      <Phone size={18} />
                    </div>
                    <span className="text-sm font-medium">{booking.phone}</span>
                  </div>
                )}
              </div>

              <div className="p-6 bg-white/5 rounded-3xl border border-white/5 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Service</div>
                  <div className="text-xs font-bold text-white uppercase tracking-widest">{booking.service || "Not Specified"}</div>
                </div>
                <div className="flex items-center justify-between">
                  <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold">Budget</div>
                  <div className="text-xs font-bold text-gold uppercase tracking-widest">{booking.budget || "Contact for Quote"}</div>
                </div>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] uppercase tracking-widest text-white/30 font-bold flex items-center gap-2">
                  <MessageSquare size={12} /> Message Narrative
                </div>
                <p className="text-sm text-white/50 italic leading-relaxed line-clamp-3">
                  "{booking.message}"
                </p>
              </div>

              <div className="flex gap-4 pt-4">
                <button className="flex-grow py-4 bg-crimson text-white text-[10px] font-bold uppercase tracking-widest rounded-2xl flex items-center justify-center gap-2 hover:glow-crimson transition-all">
                  <MessageCircle size={16} /> Reply on WhatsApp
                </button>
                <button 
                  onClick={() => deleteBooking(booking._id)}
                  className="w-14 h-14 glass rounded-2xl flex items-center justify-center text-white/20 hover:text-crimson hover:bg-white/10 transition-all border border-white/5"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
