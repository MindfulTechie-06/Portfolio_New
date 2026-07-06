"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface LoaderProps {
  onComplete: () => void;
}

export default function Loader({ onComplete }: LoaderProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Disable scrolling while loading
    document.body.style.overflow = "hidden";

    // Randomize duration between 1.8 and 2.2 seconds
    const duration = 1800 + Math.random() * 400; 
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const currentProgress = Math.min((step / steps) * 100, 100);
      setProgress(currentProgress);

      if (step >= steps) {
        clearInterval(timer);
        // Let it stay at 100% for a tiny moment before finishing
        setTimeout(() => {
          onComplete();
          document.body.style.overflow = "";
        }, 150);
      }
    }, intervalTime);

    return () => {
      clearInterval(timer);
      document.body.style.overflow = "";
    };
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-bg-primary text-text-primary pointer-events-auto"
    >
      <div className="flex flex-col items-center max-w-md px-6 text-center">
        {/* Glassmorphism Circle with Glowing Ring */}
        <div className="relative mb-8">
          {/* Soft Glow Pulse */}
          <motion.div
            animate={{
              scale: [1, 1.08, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 2.2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            className="absolute -inset-4 rounded-full bg-accent-secondary/20 blur-xl pointer-events-none"
          />
          
          {/* Subtle Glowing Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-2 rounded-full border border-dashed border-accent-secondary/40 pointer-events-none"
          />

          {/* Inner Circle (Glassmorphism) */}
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="relative w-32 h-32 rounded-full border border-border-color bg-card-bg flex items-center justify-center shadow-2xl backdrop-blur-md"
          >
            <span className="text-4xl font-black tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-accent-secondary to-accent-primary select-none font-sans">
              HC
            </span>
          </motion.div>
        </div>

        {/* Full Name */}
        <motion.h1
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.25, duration: 0.5, ease: "easeOut" }}
          className="text-3xl font-bold tracking-tight mb-2 select-none text-text-primary"
        >
          Himanish Chatterjee
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ y: 15, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.5, ease: "easeOut" }}
          className="text-xs font-mono tracking-widest uppercase mb-8 select-none text-text-secondary"
        >
          Building the Experience...
        </motion.p>

        {/* Progress Bar Container */}
        <div className="w-64 h-1.5 bg-border-color rounded-full overflow-hidden relative shadow-inner">
          <div
            className="h-full bg-gradient-to-r from-accent-secondary to-accent-primary rounded-full transition-all duration-75 ease-out"
            style={{ width: `${progress}%` }}
          />
        </div>
        
        {/* Percentage Indicator */}
        <motion.span 
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.5 }}
          className="text-[10px] font-mono mt-2 text-text-secondary select-none"
        >
          {Math.round(progress)}%
        </motion.span>
      </div>
    </motion.div>
  );
}
