"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Plus, Trash2, Loader2, X, Check } from "lucide-react";
import axios from "axios";

export default function CategoriesPage() {
  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/categories");
      setCategories(res.data);
    } catch (error) {
      console.error("Failed to fetch categories", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategoryName.trim()) return;
    setIsSubmitting(true);
    try {
      const res = await axios.post("/api/categories", { name: newCategoryName });
      setCategories([...categories, res.data]);
      setNewCategoryName("");
      setIsAdding(false);
    } catch (error) {
      console.error("Failed to add category", error);
      alert("Failed to add category. It might already exist.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteCategory = async (id: string) => {
    if (!confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`/api/categories/${id}`);
      setCategories(categories.filter((cat) => cat._id !== id));
    } catch (error) {
      console.error("Failed to delete category", error);
      alert("Failed to delete category");
    }
  };

  if (loading) {
    return (
      <div className="flex h-[50vh] items-center justify-center text-white/20">
        <Loader2 className="animate-spin" size={32} />
      </div>
    );
  }

  return (
    <div className="space-y-12">
      <div>
        <h1 className="text-4xl font-bold font-display tracking-tight mb-2">Project <span className="text-crimson">Categories</span></h1>
        <p className="text-white/40 text-sm font-medium">Organize your projects into cinematic groups.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {!isAdding ? (
          <button 
            onClick={() => setIsAdding(true)}
            className="h-64 border-2 border-dashed border-white/10 rounded-[40px] flex flex-col items-center justify-center gap-4 hover:border-crimson/50 hover:bg-white/[0.02] transition-all group"
          >
            <div className="w-16 h-16 glass rounded-2xl flex items-center justify-center text-white/20 group-hover:text-crimson group-hover:glow-crimson transition-all">
              <Plus size={32} />
            </div>
            <span className="text-xs font-bold uppercase tracking-widest text-white/40">Add New Category</span>
          </button>
        ) : (
          <div className="h-64 border-2 border-dashed border-crimson/50 rounded-[40px] flex flex-col items-center justify-center p-8 gap-4 bg-white/[0.02] transition-all">
            <h3 className="text-sm font-bold uppercase tracking-widest text-white/60 mb-2">New Category</h3>
            <input 
              type="text" 
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="e.g. Branding"
              className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-crimson transition-all text-center"
              autoFocus
              onKeyDown={(e) => {
                if (e.key === 'Enter') handleAddCategory();
                if (e.key === 'Escape') setIsAdding(false);
              }}
            />
            <div className="flex gap-2 w-full mt-2">
              <button 
                onClick={() => setIsAdding(false)}
                className="flex-1 py-2 rounded-xl bg-white/5 hover:bg-white/10 text-white/60 flex items-center justify-center transition-all"
                disabled={isSubmitting}
              >
                <X size={18} />
              </button>
              <button 
                onClick={handleAddCategory}
                className="flex-1 py-2 rounded-xl bg-crimson hover:bg-crimson/80 text-white flex items-center justify-center transition-all shadow-glow-crimson"
                disabled={isSubmitting || !newCategoryName.trim()}
              >
                {isSubmitting ? <Loader2 size={18} className="animate-spin" /> : <Check size={18} />}
              </button>
            </div>
          </div>
        )}

        <AnimatePresence>
          {categories.map((cat, i) => (
            <motion.div
              key={cat._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: i * 0.05 }}
              className="glass-dark p-10 rounded-[40px] border border-white/5 group hover:border-gold/20 transition-all flex flex-col justify-between"
            >
              <div className="w-12 h-12 glass rounded-2xl flex items-center justify-center text-gold mb-6">
                <Layers size={24} />
              </div>
              <div>
                <h3 className="text-2xl font-bold mb-2">{cat.name}</h3>
                <p className="text-xs text-white/20 uppercase tracking-widest font-bold">Category</p>
              </div>
              <div className="flex gap-4 mt-8">
                {/* <button className="flex-grow py-3 bg-white/5 border border-white/5 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-all">Edit</button> */}
                <button 
                  onClick={() => handleDeleteCategory(cat._id)}
                  className="w-full h-12 glass rounded-xl flex items-center justify-center text-white/40 hover:text-crimson transition-all"
                  title="Delete Category"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
