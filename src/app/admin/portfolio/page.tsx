"use client";

import { motion } from "framer-motion";
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  Star,
  ExternalLink,
  ChevronRight,
  Loader2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";

export default function PortfolioManagement() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const res = await axios.get("/api/projects");
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteProject = async (id: string) => {
    if (!confirm("Are you sure you want to delete this project? This action is permanent.")) return;

    try {
      await axios.delete(`/api/projects/${id}`);
      setProjects(projects.filter(p => p._id !== id));
    } catch (error) {
      alert("Failed to delete project");
    }
  };

  if (loading) return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-white/20">
      <Loader2 className="animate-spin mb-4" size={40} />
      <p className="text-luxury uppercase tracking-widest">Accessing Database...</p>
    </div>
  );

  return (
    <div className="space-y-12">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h1 className="text-4xl font-bold font-display tracking-tight mb-2">Portfolio <span className="text-crimson">Projects</span></h1>
          <p className="text-white/40 text-sm font-medium">Manage your creative showcase and featured works.</p>
        </div>
        <Link 
          href="/admin/portfolio/add"
          className="btn-crimson flex items-center gap-3 magnetic-target !py-3 !px-6"
        >
          <Plus size={18} /> Add New Project
        </Link>
      </div>

      {/* Projects Table/Grid */}
      <div className="glass-dark rounded-[40px] border border-white/5 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-white/5 bg-white/[0.02]">
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Project</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Category</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Client</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30">Year</th>
                <th className="px-8 py-6 text-[10px] font-bold uppercase tracking-[0.3em] text-white/30 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {projects.map((project, i) => (
                <motion.tr 
                  key={project._id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="group hover:bg-white/[0.02] transition-all"
                >
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-4">
                      <div className="relative w-16 h-12 rounded-xl overflow-hidden border border-white/10 group-hover:border-crimson/50 transition-all">
                        <Image src={project.image} alt={project.title} fill className="object-cover" />
                      </div>
                      <div>
                        <h4 className="font-bold text-white group-hover:text-gold transition-colors">{project.title}</h4>
                        <div className="flex gap-2 mt-1">
                          {project.tags?.slice(0, 2).map((tag: string) => (
                            <span key={tag} className="text-[8px] uppercase tracking-widest text-white/20">#{tag}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <span className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-[10px] font-bold uppercase tracking-widest text-white/40">
                      {project.category}
                    </span>
                  </td>
                  <td className="px-8 py-6 text-sm text-white/60 font-medium">{project.client}</td>
                  <td className="px-8 py-6 text-sm text-white/60 font-medium">{project.year}</td>
                  <td className="px-8 py-6 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <Link 
                        href={project.url || "/#portfolio"}
                        target="_blank"
                        className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-white hover:bg-white/10 transition-all inline-block"
                      >
                        <Eye size={18} />
                      </Link>
                      <Link 
                        href={`/admin/portfolio/edit/${project._id}`}
                        className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-gold hover:bg-gold/10 transition-all inline-block"
                      >
                        <Edit size={18} />
                      </Link>
                      <button 
                        onClick={() => deleteProject(project._id)}
                        className="p-3 bg-white/5 border border-white/5 rounded-xl text-white/40 hover:text-crimson hover:bg-crimson/10 transition-all"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
