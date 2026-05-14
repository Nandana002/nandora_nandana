"use client";

import { motion } from "framer-motion";
import { 
  ArrowLeft, 
  Upload, 
  X, 
  Plus, 
  Trash2, 
  Check, 
  Image as ImageIcon,
  Save,
  Rocket
} from "lucide-react";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function AddProjectPage() {
  const [images, setImages] = useState<string[]>([]);
  const [uploading, setUploading] = useState(false);
  const { register, handleSubmit, formState: { isSubmitting } } = useForm();
  const router = useRouter();

  const [categories, setCategories] = useState<{_id: string, name: string}[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axios.get("/api/categories");
        setCategories(res.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };
    fetchCategories();
  }, []);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      try {
        const res = await axios.post("/api/upload", { image: reader.result });
        setImages((prev) => [...prev, res.data.url]);
      } catch (error) {
        alert("Image upload failed");
      } finally {
        setUploading(false);
      }
    };
  };

  const removeImage = (index: number) => {
    setImages(images.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: any) => {
    if (images.length === 0) {
      alert("Please upload at least one image");
      return;
    }

    try {
      const projectData = {
        ...data,
        image: images[0],
        images: images,
        tags: data.tags.split(",").map((t: string) => t.trim()),
        tools: data.tools.split(",").map((t: string) => t.trim()),
      };

      await axios.post("/api/projects", projectData);
      router.push("/admin/portfolio");
    } catch (error) {
      alert("Failed to create project");
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-12">
      {/* Top Bar */}
      <div className="flex items-center justify-between">
        <Link 
          href="/admin/portfolio"
          className="flex items-center gap-3 text-white/40 hover:text-white transition-colors group"
        >
          <div className="w-10 h-10 glass rounded-xl flex items-center justify-center group-hover:bg-white/10 transition-all">
            <ArrowLeft size={18} />
          </div>
          <span className="text-xs font-bold uppercase tracking-widest">Back to Projects</span>
        </Link>
        <div className="flex gap-4">
          <button 
            onClick={handleSubmit(onSubmit)}
            disabled={isSubmitting || uploading}
            className="btn-crimson flex items-center gap-3 !py-3 !px-8 disabled:opacity-50"
          >
            {isSubmitting ? "Publishing..." : <><Rocket size={18} /> Publish Project</>}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Left Column: Primary Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="glass-dark p-10 md:p-12 rounded-[40px] border border-white/5 space-y-10">
            <h2 className="text-2xl font-bold font-display tracking-tight flex items-center gap-4">
              <span className="w-2 h-8 bg-crimson rounded-full" /> Primary Project Details
            </h2>

            <div className="space-y-8">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Project Vision Title</label>
                <input 
                  {...register("title", { required: true })}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-crimson/50 focus:glow-crimson transition-all"
                  placeholder="e.g., Vanguard Tech Brand Identity"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Category</label>
                  <select 
                    {...register("category")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-crimson/50 transition-all appearance-none text-white/60"
                  >
                    {categories.map((cat) => (
                      <option key={cat._id} value={cat.name}>{cat.name}</option>
                    ))}
                  </select>
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Release Year</label>
                  <input 
                    {...register("year")}
                    className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-crimson/50 focus:glow-crimson transition-all"
                    placeholder="2024"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Short Narrative</label>
                <textarea 
                  {...register("description")}
                  rows={3}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-crimson/50 focus:glow-crimson transition-all resize-none"
                  placeholder="Summarize the essence of this project..."
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Full Project Story</label>
                <textarea 
                  {...register("detailedDescription")}
                  rows={8}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-8 py-5 outline-none focus:border-crimson/50 focus:glow-crimson transition-all resize-none"
                  placeholder="Dive deep into the creative process and execution..."
                />
              </div>
            </div>
          </div>

          {/* Luxury Image Upload Zone */}
          <div className="glass-dark p-10 md:p-12 rounded-[40px] border border-white/5 space-y-10">
            <h2 className="text-2xl font-bold font-display tracking-tight flex items-center gap-4">
              <span className="w-2 h-8 bg-gold rounded-full" /> Visual Gallery
            </h2>

            <label className="relative aspect-video rounded-3xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center hover:bg-white/[0.02] hover:border-crimson/50 transition-all group cursor-pointer overflow-hidden">
              <input type="file" onChange={handleImageUpload} className="hidden" />
              {uploading ? (
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 border-4 border-crimson/20 border-t-crimson rounded-full animate-spin mb-4" />
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Uploading to cloud...</p>
                </div>
              ) : (
                <>
                  <div className="w-20 h-20 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:text-crimson group-hover:glow-crimson transition-all mb-4">
                    <Upload size={32} />
                  </div>
                  <p className="text-sm font-bold text-white/40 uppercase tracking-widest">Click to upload visual assets</p>
                  <p className="text-[10px] text-white/20 mt-2">Maximum file size: 10MB per image</p>
                </>
              )}
            </label>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {images.map((img, i) => (
                <div key={i} className="aspect-square glass rounded-2xl border border-white/5 relative group overflow-hidden">
                  <img src={img} alt="Preview" className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl flex items-center justify-center">
                    <Trash2 
                      onClick={() => removeImage(i)}
                      size={20} 
                      className="text-crimson cursor-pointer hover:scale-110 transition-transform" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Metadata & Toggles */}
        <div className="space-y-8">
          <div className="glass-dark p-10 rounded-[40px] border border-white/5 space-y-10">
            <h3 className="text-xl font-bold font-display tracking-tight">Collaboration</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Client Name</label>
                <input 
                  {...register("client")}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-crimson/50 focus:glow-crimson transition-all text-sm"
                  placeholder="Global Tech Corp"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Creative Tools (comma separated)</label>
                <input 
                  {...register("tools")}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-crimson/50 focus:glow-crimson transition-all text-sm"
                  placeholder="Figma, Photoshop, GSAP"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Tags (comma separated)</label>
                <input 
                  {...register("tags")}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-crimson/50 focus:glow-crimson transition-all text-sm"
                  placeholder="UI, UX, Branding"
                />
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 ml-2">Live Preview URL</label>
                <input 
                  {...register("url")}
                  className="w-full bg-white/[0.03] border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-crimson/50 focus:glow-crimson transition-all text-sm"
                  placeholder="https://vanguard-identity.com"
                />
              </div>
            </div>
          </div>

          <div className="glass-dark p-10 rounded-[40px] border border-white/5 space-y-8">
            <h3 className="text-xl font-bold font-display tracking-tight">Visibility</h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between p-4 bg-white/5 rounded-2xl border border-white/5">
                <div>
                  <p className="text-sm font-bold text-white">Featured Project</p>
                  <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Display on Homepage</p>
                </div>
                <input type="checkbox" {...register("featured")} className="w-6 h-6 accent-crimson" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
