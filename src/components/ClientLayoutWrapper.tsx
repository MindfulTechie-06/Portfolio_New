"use client";

import React, { useState, useEffect } from "react";
import { ThemeProvider } from "./ThemeProvider";
import Loader from "./Loader";
import { AnimatePresence } from "framer-motion";
import CommandPalette from "./CommandPalette";

export default function ClientLayoutWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if loader has played in this session
    const hasPlayed = sessionStorage.getItem("loaderPlayed");
    if (hasPlayed === "true") {
      setIsLoading(false);
    }
  }, []);

  return (
    <ThemeProvider>
      <AnimatePresence mode="wait">
        {isLoading && (
          <Loader onComplete={() => setIsLoading(false)} />
        )}
      </AnimatePresence>
      <div className={isLoading ? "opacity-0 pointer-events-none" : "opacity-100 transition-opacity duration-700"}>
        <CommandPalette />
        {children}
      </div>
    </ThemeProvider>
  );
}
