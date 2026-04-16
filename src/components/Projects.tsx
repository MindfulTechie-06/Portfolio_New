"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Code2, ExternalLink } from "lucide-react";

export default function Projects() {
  const projects = [
    {
      title: "InnoSphere",
      description: "An AI-powered educational content platform that generates engaging video lessons for learners of all ages. Designed to scale content creation using modern generative AI tools.",

      tags: ["Node.js", "React", "Gemini API"],
      year: "2025",
    },
    {
      title: "Lumina Studio",
      description: "A 24-hour hackathon project focused on solving real-world problems using AI-driven solutions and rapid prototyping.",
      tags: ["Next.js", "Tailwind", "Framer Motion"],
      year: "2025",
    },
    {
      title: "Chroma API",
      description: "A high-performance color palette generator and API built on Rust.",
      tags: ["Rust", "Actix", "Redis"],
      year: "2025",
    },
    {
      title: "Abyss Protocol",
      description: "Decentralized data aggregation dashboard with real-time websocket streams.",
      tags: ["React", "D3.js", "WebSockets"],
      year: "2024",
    },
  ];

  return (
    <section id="projects" className="relative z-20 bg-[#121212] py-32 px-6 md:px-20 lg:px-40 text-white">
      <div className="max-w-7xl mx-auto">
        
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20"
        >
          <h3 className="text-sm font-mono text-zinc-500 mb-4 tracking-widest uppercase">Select Works</h3>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Featured <br /> Projects.
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 md:p-10 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors duration-500"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              
              <div className="relative z-10 flex flex-col h-full justify-between">
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <h4 className="text-2xl md:text-3xl font-semibold tracking-tight">{project.title}</h4>
                    <span className="text-sm font-mono text-zinc-500">{project.year}</span>
                  </div>
                  <p className="text-zinc-400 text-lg md:text-xl font-light mb-12 max-w-sm">
                    {project.description}
                  </p>
                </div>
                
                <div className="flex items-center justify-between border-t border-white/10 pt-6">
                  <div className="flex gap-2 flex-wrap">
                    {project.tags.map(tag => (
                      <span key={tag} className="text-xs font-mono text-zinc-300 bg-white/5 px-3 py-1 rounded-full border border-white/10">
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex gap-4">
                    <button className="text-zinc-400 hover:text-white transition-colors">
                      <Code2 size={20} />
                    </button>
                    <button className="text-zinc-400 hover:text-white transition-colors">
                      <ArrowUpRight size={22} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
