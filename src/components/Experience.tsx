"use client";

import { motion } from "framer-motion";

export default function Experience() {
  const experiences = [
    {
      role: "Community Champion",
      company: "React Kolkata",
      date: "Present",
      description: "Facilitating knowledge sharing and networking among Kolkata’s React developers through regular meetups and collaborative events.",
      current: true
    },
    {
      role: "Design Team ",
      company: "OpenSource Con India",
      date: "Present",
      description: "Creating engaging visuals that promote India's largest open-source conference and support the OSS community through compelling design.",
      current: true
    },
    {
      role: "Volunteer",
      company: "AWS User Group Kolkata",
      date: "Present",
      description: "Contributing to the cloud community by helping organize technical meetups, managing events, and facilitating networking opportunities for local developers and cloud enthusiasts.",
      current: true
    },
    {
      role: "Tech Team Member",
      company: "Sourcify",
      date: "Present",
      description: "Supporting the community's digital growth through web development, technical problem-solving, and active collaboration on innovative tech initiatives.",
      current: true
    },
    {
      role: "Tech Team Member",
      company: "Digital Dominators Community",
      date: "Present",
      description: "Contributing to the community's technical infrastructure, building robust web solutions, and engaging in collaborative large-scale digital initiatives.",
      current: true
    }
  ];

  return (
    <section id="experience" className="bg-bg-primary min-h-screen py-32 px-6 md:px-20 lg:px-40 text-text-primary flex flex-col justify-center items-center relative z-20 transition-colors duration-500">
      <div className="max-w-4xl w-full">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-5xl md:text-7xl font-bold tracking-tight mb-20 text-center"
        >
          Experience
        </motion.h2>

        <div className="relative border-l border-border-color ml-6 md:ml-10">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2, ease: "easeOut" }}
              viewport={{ once: true, margin: "-100px" }}
              className="mb-16 pl-10 md:pl-16 relative"
            >
              {/* Timeline Dot */}
              <div
                className={`absolute w-5 h-5 rounded-full -left-[10.5px] top-1.5 border-4 border-bg-primary transition-all duration-300 ${
                  exp.current 
                    ? "bg-text-primary shadow-[0_0_15px_rgba(115,207,246,0.5)] dark:shadow-[0_0_15px_rgba(255,255,255,0.4)]" 
                    : "bg-text-muted"
                }`}
              />

              <div className="flex flex-col md:flex-row md:justify-between md:items-baseline mb-2">
                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight">{exp.role}</h3>
                <span className="text-sm font-mono text-text-muted mt-2 md:mt-0 px-3 py-1 bg-card-bg rounded-full border border-border-color w-fit">
                  {exp.date}
                </span>
              </div>
              <h4 className="text-lg text-text-secondary font-light mb-4 flex items-center gap-2">
                {exp.company}
                {exp.current && (
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-text-primary opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-text-primary"></span>
                  </span>
                )}
              </h4>
              <p className="text-text-secondary font-light text-lg leading-relaxed max-w-2xl">
                {exp.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
