"use client";

import { motion, AnimatePresence, Variants } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaDownload, FaEnvelope } from "react-icons/fa";

const subtitles = [
  { text: "Frontend Developer", color: "text-text-primary", dot: "bg-text-primary" },
  { text: "AI Enthusiast", color: "text-[#4F7D4A] dark:text-[#6EE7B7]", dot: "bg-[#4F7D4A] dark:bg-[#6EE7B7]" },
  { text: "Open Source Contributor", color: "text-[#D7263D] dark:text-[#F87171]", dot: "bg-[#D7263D] dark:bg-[#F87171]" }
];

const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/MindfulTechie-06",
    icon: FaGithub,
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/himanish-chatterjee-153a50327/",
    icon: FaLinkedin,
  },
  {
    name: "Email",
    url: "mailto:chatterjeehimanish520@gmail.com",
    icon: FaEnvelope,
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/_.himanixx._?igsh=MXUxMGUzZWlmZzFpYQ==",
    icon: FaInstagram,
  }
];

interface Particle {
  id: number;
  size: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  color: string;
}

export default function Overlay() {
  const [subIndex, setSubIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubIndex((prev) => (prev + 1) % subtitles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generated = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
      color: i % 2 === 0 ? "#73CFF6" : "#D7263D"
    }));
    setParticles(generated);
  }, []);

  // Stagger variants for Hero section entry
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <div className="relative w-full min-h-screen bg-bg-primary text-text-primary flex items-center overflow-hidden z-10 transition-colors duration-500">
      
      {/* Background Photograph Container */}
      <div className="absolute right-0 top-0 bottom-0 w-full lg:w-1/2 h-full z-0 pointer-events-none">
        <img 
          src="/himanish.jpg" 
          alt="Himanish Chatterjee"
          className="w-full h-full object-cover object-center lg:object-[right_center] select-none"
        />
        {/* Soft left-to-right gradient overlay to blend into the left side's background */}
        <div 
          className="absolute inset-0 z-10 pointer-events-none" 
          style={{ backgroundImage: "var(--hero-gradient-r)" }}
        />
        {/* Mobile vertical blend (top and bottom) for readability when image spans full screen */}
        <div 
          className="absolute inset-0 z-10 block lg:hidden pointer-events-none" 
          style={{ backgroundImage: "var(--hero-gradient-b)" }}
        />
      </div>

      {/* Bottom fade-to-dark transition to blend with the About section below */}
      <div 
        className="absolute bottom-0 left-0 right-0 h-32 z-20 pointer-events-none" 
        style={{ backgroundImage: "var(--hero-to-about-gradient)" }}
      />

      {/* Floating Blurred Gradient Blobs */}
      <motion.div
        animate={{
          y: [0, 20, 0],
          x: [0, 10, 0],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute -left-20 top-1/4 w-[400px] h-[400px] bg-[#73CFF6]/8 dark:bg-[#73CFF6]/12 rounded-full blur-[130px] z-0 pointer-events-none"
      />
      <motion.div
        animate={{
          y: [0, -25, 0],
          x: [0, -15, 0],
          scale: [1, 0.95, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute left-1/3 bottom-1/4 w-[350px] h-[350px] bg-[#D7263D]/4 dark:bg-[#D7263D]/8 rounded-full blur-[120px] z-0 pointer-events-none"
      />

      {/* Floating Particles (Extracted colors) */}
      <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="absolute rounded-full"
            style={{
              width: p.size,
              height: p.size,
              left: `${p.x}%`,
              top: `${p.y}%`,
              backgroundColor: p.color
            }}
            animate={{
              y: ["0vh", "-100vh"],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: p.duration,
              repeat: Infinity,
              ease: "linear",
              delay: -p.delay,
            }}
          />
        ))}
      </div>

      {/* Hero Content Container */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-6 md:px-12 lg:px-20 py-24 flex flex-col justify-center min-h-screen">
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-xl sm:max-w-2xl lg:max-w-[55%] text-left"
        >
          <motion.p
            variants={itemVariants}
            className="text-[#D7263D] dark:text-[#F87171] font-mono text-sm md:text-base tracking-widest uppercase mb-3 font-bold"
          >
            Hi, I'm 👋
          </motion.p>
          
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-text-primary mb-4 leading-none"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-[#73CFF6] to-[#D7263D] font-black drop-shadow-[0_2px_5px_rgba(23,33,58,0.05)]">
              Himanish
            </span>{" "}
            Chatterjee.
          </motion.h1>

          {/* Subtitle with Rotating Text Animation */}
          <motion.div
            variants={itemVariants}
            className="h-10 md:h-12 flex items-center mb-6 overflow-hidden"
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={subIndex}
                initial={{ y: 24, opacity: 0, filter: "blur(4px)" }}
                animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                exit={{ y: -24, opacity: 0, filter: "blur(4px)" }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className={`text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight flex items-center gap-2 ${subtitles[subIndex].color}`}
              >
                <span className={`w-2.5 h-2.5 rounded-full animate-pulse ${subtitles[subIndex].dot}`} />
                {subtitles[subIndex].text}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          {/* Short Description */}
          <motion.p
            variants={itemVariants}
            className="text-text-secondary text-base md:text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-xl"
          >
            Building modern, responsive and high-performance web experiences with React, TypeScript, Tailwind CSS and AI.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8"
          >
            <button
              onClick={() => {
                const element = document.getElementById("projects");
                if (element) element.scrollIntoView({ behavior: "smooth" });
              }}
              className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-[#17213A] dark:from-[#73CFF6] to-[#D7263D] text-[#F8FAFC] dark:text-[#0B1224] font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-[0_4px_15px_rgba(215,38,61,0.25)] dark:shadow-[0_4px_20px_rgba(115,207,246,0.3)] cursor-pointer text-center"
            >
              <span>View Projects</span>
              <span className="transform group-hover:translate-x-1 transition-transform">→</span>
            </button>

            <a
              href="https://drive.google.com/drive/folders/1A2LuAd_1Wb9mlVlM6qRCnO-zUUFw-dci?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="group relative flex items-center justify-center gap-2 bg-card-bg hover:bg-card-bg-hover text-text-primary border border-border-color font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-sm cursor-pointer hover:border-accent-secondary hover:text-accent-secondary text-center"
            >
              <span>Download Resume</span>
              <FaDownload className="text-text-secondary group-hover:text-accent-secondary transition-colors" size={14} />
            </a>
          </motion.div>

          {/* Social Icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4"
          >
            {socialLinks.map((link) => {
              const Icon = link.icon;
              return (
                <a
                  key={link.name}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-full border border-border-color bg-card-bg text-text-secondary transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:border-accent-secondary hover:text-accent-secondary hover:shadow-[0_0_15px_rgba(115,207,246,0.2)] hover:bg-accent-secondary/5"
                  aria-label={`${link.name} Profile`}
                >
                  <Icon size={18} />
                </a>
              );
            })}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Indicator */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 0.7, y: 0 }}
        transition={{ delay: 1.2, duration: 0.8 }}
        onClick={() => {
          const element = document.getElementById("about");
          if (element) element.scrollIntoView({ behavior: "smooth" });
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-text-secondary hover:text-accent-primary transition-colors select-none z-30"
      >
        <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">Scroll Down</span>
        <div className="w-5 h-9 border border-text-secondary/40 rounded-full flex justify-center p-1">
          <motion.div
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="w-1 h-1 bg-text-secondary/60 rounded-full"
          />
        </div>
      </motion.div>

    </div>
  );
}
