"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";

const roles = [
  "Frontend Developer.",
  "UI/UX Designer.",
  "Software Engineer.",
  "Creative Developer."
];

export default function Overlay() {
  const { scrollYProgress } = useScroll();
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  // Opacity transforms for each section to fade in/out at specific scroll percentages
  const opacity1 = useTransform(scrollYProgress, [0, 0.1, 0.2], [1, 1, 0]);
  const y1 = useTransform(scrollYProgress, [0, 0.2], [0, -100]);

  const opacity2 = useTransform(scrollYProgress, [0.2, 0.3, 0.45], [0, 1, 0]);
  const y2 = useTransform(scrollYProgress, [0.2, 0.45], [80, -80]);

  const opacity3 = useTransform(scrollYProgress, [0.45, 0.6, 0.8], [0, 1, 0]);
  const y3 = useTransform(scrollYProgress, [0.45, 0.8], [80, -80]);

  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 w-full h-[500vh]">
      
      {/* Container 1: Sticky wrapper that holds the viewport-height overlay */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center items-center px-6 md:px-20 lg:px-40">
        
        {/* SECTION 1: Center (0% Scroll) */}
        <motion.div 
          style={{ opacity: opacity1, y: y1 }}
          className="absolute inset-0 flex flex-col items-center justify-center text-center"
        >
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter text-white drop-shadow-lg">
            Himanish Chatterjee.
          </h1>
          <div className="mt-4 h-12 md:h-16 flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.p
                key={roleIndex}
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -15, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="text-3xl md:text-4xl text-zinc-200 font-semibold tracking-wide m-0"
              >
                {roles[roleIndex]}
              </motion.p>
            </AnimatePresence>
          </div>
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
