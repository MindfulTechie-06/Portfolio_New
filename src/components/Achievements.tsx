"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      title: "Hackathon Winner",
      event: "Global Tech Innovation Hack",
      description: "Built an AI-driven accessibility tool within 48 hours, winning first place against 100+ teams.",
      link: "https://drive.google.com/drive/folders/1ajBZAmnyBEXpEu5INDXrV3_Gt4QfNtkN",
      year: "2025"
    },
    {
      title: "Google Cloud Study Jam",
      event: "Google Developer Groups",
      description: "Successfully completed advanced tracks in generative AI and cloud infrastructure.",
      link: "https://drive.google.com/drive/folders/1P80TCIPr4CPYpN_N_L0rD3LzU1gGIm7z",
      year: "2024"
    },
    {
      title: "Software Engineering Intern",
      event: "Tech Innovations",
      description: "Designed, built, and maintained core features of the enterprise web application suite.",
      link: "#",
      year: "2024",
      buttonText: "View my certificates"
    },
    {
      title: "Open Source Contributor",
      event: "Hacktoberfest",
      description: "Contributed over 10 substantial PRs to major React and TypeScript repositories.",
      link: "#",
      year: "2024"
    }
  ];

  return (
    <section id="achievements" className="relative z-20 bg-[#121212] py-32 px-6 md:px-20 lg:px-40 text-white">
      <div className="max-w-7xl mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-20 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight">
            Achievements
          </h2>
          <p className="mt-4 text-zinc-400 text-lg max-w-2xl mx-auto font-light">
            A track record of hackathons, continuous learning, and community contributions.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative rounded-3xl border border-white/10 bg-white/5 p-8 backdrop-blur-md overflow-hidden hover:bg-white/10 transition-colors duration-500 flex flex-col justify-between"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

              <div className="relative z-10 flex-grow">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                  <Award className="text-zinc-300" size={24} />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-semibold tracking-tight leading-tight">{item.title}</h3>
                </div>
                <p className="text-zinc-300 font-medium mb-3">{item.event}</p>
                <p className="text-zinc-400 font-light mb-8 pt-4 border-t border-white/10">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto flex items-center justify-between">
                <span className="text-sm font-mono text-zinc-500 bg-[#121212] px-3 py-1 rounded-full">{item.year}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-white hover:text-zinc-300 transition-colors bg-white/10 px-4 py-2 rounded-full hover:bg-white/20"
                >
                  {item.buttonText || "View Certificate"} <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
