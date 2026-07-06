"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

const navItems = [
  { name: "Home", id: "home" },
  { name: "About", id: "about" },
  { name: "Projects", id: "projects" },
  { name: "Experience", id: "experience" },
  { name: "Achievements", id: "achievements" },
  { name: "Contact", id: "contact" },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      // Find the section that is closest to the top of the viewport
      const sections = navItems.map((item) => document.getElementById(item.id));
      let currentSection = activeSection;
      
      for (const section of sections) {
        if (!section) continue;
        const rect = section.getBoundingClientRect();
        // Adjust the offset value as needed (e.g., 200px from top)
        if (rect.top <= 200 && rect.bottom >= 200) {
          currentSection = section.id;
        }
      }
      
      if (currentSection !== activeSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once on mount to determine initial section
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeSection]);

  const scrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed top-6 left-0 right-0 z-50 flex justify-center w-full pointer-events-none">
      <nav className="pointer-events-auto flex items-center gap-1 sm:gap-2 rounded-full bg-nav-bg backdrop-blur-md border border-nav-border p-1.5 shadow-2xl transition-colors duration-300">
        {navItems.map((item) => {
          const isActive = activeSection === item.id;

          return (
            <button
              key={item.id}
              onClick={() => scrollTo(item.id)}
              className={`relative px-4 py-2 rounded-full text-sm font-medium transition-colors duration-300 ${
                isActive ? "text-nav-text-hover font-semibold" : "text-nav-text hover:text-nav-text-hover"
              }`}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-accent-secondary/10 rounded-full border border-accent-secondary/20"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.name}</span>
            </button>
          );
        })}
        
        {/* Separator Line */}
        <div className="w-[1px] h-6 bg-border-color mx-1 self-center" />

        {/* Theme Toggle Button */}
        <div className="pr-1 flex items-center justify-center">
          <ThemeToggle />
        </div>
      </nav>
    </div>
  );
}
