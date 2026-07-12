"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion, Variants } from "framer-motion";
import { FolderKanban, Users, Trophy, GraduationCap } from "lucide-react";
import { animate } from "framer-motion";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
}

function AnimatedNumber({ value, duration = 1.8 }: AnimatedNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [displayValue, setDisplayValue] = useState(0);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) {
      setDisplayValue(value);
      return;
    }

    if (inView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(Math.floor(latest));
        },
      });
      return () => controls.stop();
    }
  }, [inView, value, duration, shouldReduceMotion]);

  return <span ref={ref}>{displayValue}</span>;
}

export default function Statistics() {
  const shouldReduceMotion = useReducedMotion();

  const stats = [
    {
      value: 15,
      suffix: "+",
      label: "Projects",
      icon: FolderKanban,
    },
    {
      value: 7,
      suffix: "+",
      label: "Communities",
      icon: Users,
    },
    {
      value: 3,
      suffix: "+",
      label: "Hackathons",
      icon: Trophy,
    },
    {
      value: 2,
      suffix: "+",
      label: "Years Learning",
      icon: GraduationCap,
    },
  ];

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : 0.12,
      },
    },
  };

  const cardVariants: Variants = {
    hidden: { 
      opacity: 0, 
      y: shouldReduceMotion ? 0 : 30 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0 : 0.6,
        ease: "easeOut",
      }
    },
  };

  return (
    <section id="statistics" className="relative z-20 bg-bg-primary py-24 px-6 md:px-20 lg:px-40 text-text-primary transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.8, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-text-primary">
            My Journey in Numbers
          </h2>
          <p className="mt-4 text-text-secondary text-lg max-w-2xl mx-auto font-light leading-relaxed">
            A quick snapshot of my growth, learning, and community involvement.
          </p>
        </motion.div>

        {/* Statistics Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 w-full"
        >
          {stats.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group relative rounded-3xl border border-border-color bg-card-bg p-8 backdrop-blur-md overflow-hidden hover:bg-card-bg-hover shadow-sm hover:shadow-md transition-all duration-300 hover:-translate-y-1.5 hover:scale-[1.03] hover:border-accent-secondary/50 flex flex-col items-center justify-center text-center cursor-default"
              >
                {/* Subtle Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-accent-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Lucide Icon */}
                <div className="mb-4 text-accent-secondary group-hover:text-accent-primary transition-colors duration-300">
                  <Icon size={32} className="stroke-[1.5]" />
                </div>

                {/* Animated Stat Value */}
                <div className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2 text-text-primary">
                  <AnimatedNumber value={item.value} />
                  <span>{item.suffix}</span>
                </div>

                {/* Stat Label */}
                <div className="text-sm font-medium tracking-wide uppercase text-text-secondary group-hover:text-text-primary transition-colors duration-300">
                  {item.label}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

      </div>
    </section>
  );
}
