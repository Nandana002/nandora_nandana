"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import axios from "axios";
import ProjectCard from "./ProjectCard";
import ProjectModal from "./ProjectModal";
import { Loader2 } from "lucide-react";

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<any | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [projects, setProjects] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>(["All"]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [projectsRes, categoriesRes] = await Promise.all([
        axios.get("/api/projects"),
        axios.get("/api/categories")
      ]);
      setProjects(projectsRes.data);
      const cats = categoriesRes.data.map((c: any) => c.name);
      setCategories(["All", ...cats]);
    } catch (error) {
      console.error("Failed to fetch data", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProjects = activeCategory === "All"
    ? projects
    : projects.filter(p => p.category === activeCategory);

  const handleProjectClick = (project: any) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  if (loading) return (
    <div className="min-h-[40vh] flex flex-col items-center justify-center text-white/10">
      <Loader2 className="animate-spin mb-4" size={32} />
      <p className="text-luxury tracking-[0.4em] text-[10px]">Loading Masterpieces</p>
    </div>
  );

  return (
    <section id="portfolio" className="relative py-24 bg-background overflow-hidden border-t border-white/5">
      {/* Cinematic Background Atmosphere */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-crimson/5 rounded-full blur-[200px]" />
        <div className="absolute bottom-[20%] left-[-10%] w-[600px] h-[600px] bg-gold/5 rounded-full blur-[200px]" />
      </div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        {/* Intro Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center space-x-4 mb-6">
            <span className="w-12 h-[1px] bg-crimson" />
            <span className="text-luxury text-gold text-[10px]">Curated Excellence</span>
            <span className="w-12 h-[1px] bg-crimson" />
          </div>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tighter">
            Selected <span className="text-crimson italic">Works</span>
          </h2>
          <p className="text-xl text-white/30 max-w-2xl mx-auto font-display italic leading-relaxed mt-6">
            "A showcase of high-end branding, cinematic digital experiences, and visionary creative campaigns."
          </p>
        </motion.div>

        {/* Premium Filter System */}
        <div className="flex flex-wrap justify-center gap-4 mb-16">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`relative px-6 py-2 rounded-full text-[9px] font-bold uppercase tracking-[0.2em] transition-all duration-500 border ${activeCategory === category
                  ? "bg-crimson border-crimson text-white shadow-glow-crimson"
                  : "bg-white/[0.03] border-white/10 text-white/40 hover:border-white/30 hover:text-white"
                }`}
            >
              {category}
              {activeCategory === category && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 bg-crimson rounded-full -z-10 shadow-glow-crimson"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
            </button>
          ))}
        </div>

        {/* Dynamic Masonry-style Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, i) => (
              <ProjectCard
                key={project._id}
                project={project}
                onClick={handleProjectClick}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {filteredProjects.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="text-white/20 text-xl font-display italic tracking-tight">Discovering new horizons...</p>
          </motion.div>
        )}
      </div>

      {/* Cinematic Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </section>
  );
}
