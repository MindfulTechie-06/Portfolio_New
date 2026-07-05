"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { FaGithub, FaLinkedin, FaInstagram, FaDownload, FaEnvelope } from "react-icons/fa";

const subtitles = [
  "Frontend Developer",
  "AI Enthusiast",
  "Open Source Contributor"
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
}

export default function Overlay() {
  const { scrollYProgress } = useScroll();
  const [subIndex, setSubIndex] = useState(0);
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setSubIndex((prev) => (prev + 1) % subtitles.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const generated = Array.from({ length: 25 }, (_, i) => ({
      id: i,
      size: Math.random() * 3 + 1,
      x: Math.random() * 100,
      y: Math.random() * 100,
      duration: Math.random() * 12 + 8,
      delay: Math.random() * 6,
    }));
    setParticles(generated);
  }, []);

  // Opacity transforms for each section to fade in/out at specific scroll percentages
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  // Pointer events mapping to allow clicks on hero but let them pass through when scrolled past
  const pointerEvents1 = useTransform(
    scrollYProgress,
    [0, 0.15, 0.2],
    ["auto", "auto", "none"]
  );

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.45], [80, -80]);

  const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.8], [80, -80]);

  // Stagger variants for Hero section entry
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 25 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const, // easeOutExpo
      },
    },
  };

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 w-full h-[500vh]">
      
      {/* Container 1: Sticky wrapper that holds the viewport-height overlay */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6 md:px-20 lg:px-40">
        
        {/* SECTION 1: Left Aligned Hero (0% Scroll) */}
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ opacity: opacity1, y: y1, pointerEvents: pointerEvents1 }}
          className="absolute inset-0 flex flex-col items-start justify-center text-left px-6 md:px-20 lg:px-40 z-10 w-full"
        >
          {/* Subtle left-to-right dark gradient overlay inside the hero section for readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#0c0f1a] via-[#0c0f1a]/85 to-transparent z-0 pointer-events-none" />

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
            className="absolute -left-20 top-1/4 w-[400px] h-[400px] bg-blue-600/10 rounded-full blur-[130px] z-0 pointer-events-none"
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
            className="absolute left-1/3 bottom-1/4 w-[350px] h-[350px] bg-orange-500/5 rounded-full blur-[120px] z-0 pointer-events-none"
          />

          {/* Floating Particles */}
          <div className="absolute inset-0 overflow-hidden z-0 pointer-events-none">
            {particles.map((p) => (
              <motion.div
                key={p.id}
                className="absolute rounded-full bg-orange-500/15"
                style={{
                  width: p.size,
                  height: p.size,
                  left: `${p.x}%`,
                  top: `${p.y}%`,
                }}
                animate={{
                  y: ["0vh", "-100vh"],
                  opacity: [0, 0.7, 0],
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

          {/* Hero Text Content Wrapper */}
          <div className="relative z-10 max-w-xl sm:max-w-2xl">
            <motion.p
              variants={itemVariants}
              className="text-orange-500 font-mono text-sm md:text-base tracking-widest uppercase mb-3 font-semibold"
            >
              Hi, I'm 👋
            </motion.p>
            
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-4 leading-none"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-500 drop-shadow-sm font-black">
                Himanish
              </span>{" "}
              Chatterjee
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
                  className="text-xl md:text-2xl lg:text-3xl font-semibold tracking-tight text-zinc-300 flex items-center gap-2"
                >
                  <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
                  {subtitles[subIndex]}
                </motion.p>
              </AnimatePresence>
            </motion.div>

            {/* Short Description */}
            <motion.p
              variants={itemVariants}
              className="text-zinc-400 text-base md:text-lg lg:text-xl font-light leading-relaxed mb-8 max-w-xl"
            >
              Building modern, responsive and high-performance web experiences with React, TypeScript, Tailwind CSS and AI.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 w-full sm:w-auto mb-8 pointer-events-auto"
            >
              <button
                onClick={() => {
                  const element = document.getElementById("projects");
                  if (element) element.scrollIntoView({ behavior: "smooth" });
                }}
                className="group relative flex items-center justify-center gap-2 bg-gradient-to-r from-orange-500 to-amber-500 text-white font-semibold px-8 py-4 rounded-full hover:from-orange-600 hover:to-amber-600 hover:scale-105 transition-all duration-300 shadow-[0_0_20px_rgba(249,115,22,0.3)] hover:shadow-[0_0_30px_rgba(249,115,22,0.5)] cursor-pointer text-center"
              >
                <span>View Projects</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </button>

              <a
                href="https://drive.google.com/drive/folders/1A2LuAd_1Wb9mlVlM6qRCnO-zUUFw-dci?usp=sharing"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-center gap-2 bg-[#1e2330]/40 hover:bg-[#1e2330]/75 text-white border border-white/10 hover:border-white/30 font-semibold px-8 py-4 rounded-full hover:scale-105 transition-all duration-300 shadow-md cursor-pointer text-center"
              >
                <span>Download Resume</span>
                <FaDownload className="text-zinc-400 group-hover:text-white transition-colors" size={14} />
              </a>
            </motion.div>

            {/* Social Icons */}
            <motion.div
              variants={itemVariants}
              className="flex items-center gap-4 pointer-events-auto"
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full border border-white/10 bg-white/5 text-zinc-400 hover:text-white hover:border-white/30 transition-all duration-300 hover:bg-[#1e2330]/40 shadow-sm hover:scale-110 hover:-translate-y-1"
                    aria-label={`${link.name} Profile`}
                  >
                    <Icon size={18} />
                  </a>
                );
              })}
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
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 cursor-pointer text-zinc-500 hover:text-white transition-colors select-none pointer-events-auto z-20"
          >
            <span className="text-[10px] font-mono tracking-widest uppercase font-semibold">Scroll Down</span>
            <div className="w-5 h-9 border border-zinc-500 rounded-full flex justify-center p-1">
              <motion.div
                animate={{
                  y: [0, 10, 0],
                }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="w-1 h-1 bg-zinc-500 rounded-full"
              />
            </div>
          </motion.div>

        </motion.div>

        {/* SECTION 2: Left Aligned (30% Scroll) */}
        <motion.div 
          style={{ opacity: opacity2, y: y2 }}
          className="absolute inset-0 flex flex-col items-start justify-center pr-10 md:pr-40 px-6 md:px-20 lg:px-40"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            I build digital <br />
            <span className="text-zinc-500 italic font-serif">experiences.</span>
          </h2>
        </motion.div>

        {/* SECTION 3: Right Aligned (60% Scroll) */}
        <motion.div 
          style={{ opacity: opacity3, y: y3 }}
          className="absolute inset-0 flex flex-col items-end justify-center pl-10 md:pl-40 px-6 md:px-20 lg:px-40 text-right"
        >
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-tight drop-shadow-md">
            Bridging design <br />
            <span className="text-zinc-400 font-light">and engineering.</span>
          </h2>
        </motion.div>

      </div>
    </div>
  );
}
