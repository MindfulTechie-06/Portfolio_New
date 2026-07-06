"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sun, Moon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="w-14 h-8 rounded-full bg-border-color border border-border-color/30 opacity-40 select-none pointer-events-none" />
    );
  }
  return (
    <button
      onClick={toggleTheme}
      className={`relative flex items-center w-14 h-8 p-1 rounded-full cursor-pointer border transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-secondary/50 select-none ${
        theme === "dark"
          ? "bg-[#111A30]/80 border-accent-secondary/30 shadow-[0_0_10px_rgba(115,207,246,0.15)]"
          : "bg-white/80 border-[#17213A]/10 shadow-[0_2px_8px_rgba(23,33,58,0.05)] hover:shadow-[0_2px_12px_rgba(23,33,58,0.1)]"
      }`}
      aria-label={`Switch to ${theme === "light" ? "dark" : "light"} theme`}
    >
      {/* Sliding Knobs Track */}
      <div className="absolute inset-1 flex justify-between items-center px-1 text-text-muted/40 pointer-events-none">
        <Sun size={12} className={theme === "light" ? "opacity-0" : "opacity-40"} />
        <Moon size={12} className={theme === "dark" ? "opacity-0" : "opacity-40"} />
      </div>

      {/* Sliding Toggle Head */}
      <motion.div
        layout
        transition={{ type: "spring", stiffness: 450, damping: 28 }}
        className={`z-10 flex items-center justify-center w-6 h-6 rounded-full shadow-sm ${
          theme === "dark"
            ? "bg-accent-secondary text-[#111A30]"
            : "bg-accent-primary text-white"
        }`}
        style={{
          marginLeft: theme === "dark" ? "auto" : "0",
        }}
      >
        <motion.div
          key={theme}
          initial={{ rotate: -120, scale: 0.6, opacity: 0 }}
          animate={{ rotate: 0, scale: 1, opacity: 1 }}
          exit={{ rotate: 120, scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="flex items-center justify-center"
        >
          {theme === "light" ? (
            <Sun size={13} className="stroke-[2.5]" />
          ) : (
            <Moon size={13} className="stroke-[2.5]" />
          )}
        </motion.div>
      </motion.div>
    </button>
  );
}
