"use client";

import { motion } from "framer-motion";
import { Award, ExternalLink, BadgeCheck } from "lucide-react";

export default function Achievements() {
  const achievements = [
    {
      title: "Hackathon ",
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
      year: "2025"
    },
    {
      title: "Internships",
      event: "Tech Innovations",
      description: "Gained practical experience in real-world software development by contributing to the design and maintenance of core features in an enterprise web application.",
      link: "https://drive.google.com/drive/folders/17dEfFRf15gSZ0P1OQXExq_ZjUU45672x",
      year: "2025-2026",
      buttonText: "View my certificates"
    },
    {
      title: "Open Source Contributor",
      event: "Aperture 3.0",
      description: "Contributed to real-world projects.",
      link: "https://drive.google.com/drive/folders/1L1PvYfjZHnvWDMd6eOER85kMfpR3eiGC",
      year: "2026"
    }
  ];

  const certifications = [
    {
      title: "AI Fluency: Framework & Foundations",
      issuer: "Anthropic",
      description: "Completed the foundational framework course on Artificial Intelligence fluency.",
      link: "https://drive.google.com/drive/folders/1QaUGAHan9KvXH2J2a1Y7BHL_BDaRUSiR",
      year: "2025"
    },
    {
      title: "Gemini Certified Student",
      issuer: "Google for Education",
      description: "Demonstrated the knowledge, skills, and basic competencies needed to use Google AI.",
      link: "https://drive.google.com/drive/folders/1QaUGAHan9KvXH2J2a1Y7BHL_BDaRUSiR",
      year: "2025"
    },
    {
      title: "Bring AI to Work Workshop",
      issuer: "Google Workspace",
      description: "Successfully completed the workshop on integrating and applying AI tools in professional workflows.",
      link: "https://drive.google.com/drive/folders/1QaUGAHan9KvXH2J2a1Y7BHL_BDaRUSiR",
      year: "2025"
    }
  ];

  return (
    <section id="achievements" className="relative z-20 bg-bg-secondary py-32 px-6 md:px-20 lg:px-40 text-text-primary transition-colors duration-500">
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
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto font-light">
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
              className="group relative rounded-3xl border border-border-color bg-card-bg p-8 backdrop-blur-md overflow-hidden hover:bg-card-bg-hover transition-colors duration-500 flex flex-col justify-between shadow-sm"
            >
              {/* Subtle hover glow effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex-grow">
                <div className="w-12 h-12 rounded-full bg-text-primary/10 flex items-center justify-center mb-6">
                  <Award className="text-text-primary" size={24} />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-2xl font-semibold tracking-tight leading-tight">{item.title}</h3>
                </div>
                <p className="text-text-secondary font-medium mb-3">{item.event}</p>
                <p className="text-text-secondary font-light mb-8 pt-4 border-t border-border-color leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto flex items-center justify-between">
                <span className="text-sm font-mono text-text-muted bg-bg-primary px-3 py-1 rounded-full border border-border-color">{item.year}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-text-primary/80 transition-colors bg-text-primary/10 px-4 py-2 rounded-full hover:bg-text-primary/20"
                >
                  {item.buttonText || "View Certificate"} <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certifications Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-32 mb-20 text-center"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
            Certifications
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto font-light">
            Professional certifications demonstrating continuous learning and expertise.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {certifications.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1, ease: "easeOut" }}
              viewport={{ once: true, margin: "-50px" }}
              className="group relative rounded-3xl border border-border-color bg-card-bg p-8 backdrop-blur-md overflow-hidden hover:bg-card-bg-hover transition-colors duration-500 flex flex-col justify-between shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex-grow">
                <div className="w-12 h-12 rounded-full bg-text-primary/10 flex items-center justify-center mb-6">
                  <BadgeCheck className="text-text-primary" size={24} />
                </div>
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-xl font-semibold tracking-tight leading-tight">{item.title}</h3>
                </div>
                <p className="text-text-secondary font-medium mb-3">{item.issuer}</p>
                <p className="text-text-secondary font-light text-sm mb-8 pt-4 border-t border-border-color leading-relaxed">
                  {item.description}
                </p>
              </div>

              <div className="relative z-10 mt-auto flex items-center justify-between">
                <span className="text-sm font-mono text-text-muted bg-bg-primary px-3 py-1 rounded-full border border-border-color">{item.year}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm font-medium text-text-primary hover:text-text-primary/80 transition-colors bg-text-primary/10 px-4 py-2 rounded-full hover:bg-text-primary/20"
                >
                  View <ExternalLink size={14} />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
