"use client";

import React, { useState, useEffect, useRef, useTransition } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Search, 
  Home, 
  User, 
  FolderGit2, 
  Code2, 
  Briefcase, 
  Trophy, 
  MessageSquare, 
  FileDown, 
  Mail, 
  CornerDownLeft 
} from "lucide-react";
import { FaGithub, FaLinkedin } from "react-icons/fa";

interface CommandItem {
  id: string;
  name: string;
  category: "Navigation" | "External Links";
  icon: React.ComponentType<any>;
  action: () => void;
  shortcut?: string;
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [, startTransition] = useTransition();

  const inputRef = useRef<HTMLInputElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Toggle Command Palette on Ctrl+K or Cmd+K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.key === "k" || e.key === "K") && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Handle scrolling of background and focusing input
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Small timeout to allow transition to render input
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 50);
      return () => {
        clearTimeout(timer);
        document.body.style.overflow = "unset";
      };
    } else {
      document.body.style.overflow = "unset";
      setSearch("");
      setSelectedIndex(0);
    }
  }, [isOpen]);

  const scrollToSection = (id: string) => {
    setIsOpen(false);
    // Smooth scroll with small delay to let modal animate out
    setTimeout(() => {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }, 150);
  };

  const openExternal = (url: string, newTab = true) => {
    setIsOpen(false);
    if (newTab) {
      window.open(url, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = url;
    }
  };

  const commands: CommandItem[] = [
    {
      id: "home",
      name: "Home",
      category: "Navigation",
      icon: Home,
      action: () => scrollToSection("home"),
    },
    {
      id: "about",
      name: "About",
      category: "Navigation",
      icon: User,
      action: () => scrollToSection("about"),
    },
    {
      id: "projects",
      name: "Projects",
      category: "Navigation",
      icon: FolderGit2,
      action: () => scrollToSection("projects"),
    },
    {
      id: "skills",
      name: "Skills",
      category: "Navigation",
      icon: Code2,
      action: () => scrollToSection("about"), // Skills are located in About
    },
    {
      id: "experience",
      name: "Experience",
      category: "Navigation",
      icon: Briefcase,
      action: () => scrollToSection("experience"),
    },
    {
      id: "achievements",
      name: "Achievements",
      category: "Navigation",
      icon: Trophy,
      action: () => scrollToSection("achievements"),
    },
    {
      id: "contact",
      name: "Contact",
      category: "Navigation",
      icon: MessageSquare,
      action: () => scrollToSection("contact"),
    },
    {
      id: "resume",
      name: "Resume",
      category: "External Links",
      icon: FileDown,
      action: () => openExternal("https://drive.google.com/drive/folders/1A2LuAd_1Wb9mlVlM6qRCnO-zUUFw-dci?usp=sharing"),
      shortcut: "↓",
    },
    {
      id: "github",
      name: "GitHub",
      category: "External Links",
      icon: FaGithub,
      action: () => openExternal("https://github.com/MindfulTechie-06"),
    },
    {
      id: "linkedin",
      name: "LinkedIn",
      category: "External Links",
      icon: FaLinkedin,
      action: () => openExternal("https://www.linkedin.com/in/himanish-chatterjee-153a50327/"),
    },
    {
      id: "email",
      name: "Email",
      category: "External Links",
      icon: Mail,
      action: () => openExternal("mailto:chatterjeehimanish520@gmail.com", false),
    },
  ];

  // Filter commands dynamically
  const filtered = commands.filter((cmd) =>
    cmd.name.toLowerCase().includes(search.toLowerCase()) ||
    cmd.category.toLowerCase().includes(search.toLowerCase())
  );

  // Auto-correct selectedIndex if it goes out of range
  useEffect(() => {
    if (filtered.length > 0 && selectedIndex >= filtered.length) {
      setSelectedIndex(0);
    }
  }, [search, filtered.length, selectedIndex]);

  // Handle all keydown actions inside the palette
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % filtered.length);
        break;
      case "ArrowUp":
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        break;
      case "Tab":
        e.preventDefault();
        if (e.shiftKey) {
          // Tab backwards
          setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
        } else {
          // Tab forwards
          setSelectedIndex((prev) => (prev + 1) % filtered.length);
        }
        break;
      case "Enter":
        e.preventDefault();
        if (filtered[selectedIndex]) {
          filtered[selectedIndex].action();
        }
        break;
      case "Escape":
        e.preventDefault();
        setIsOpen(false);
        break;
      default:
        break;
    }
  };

  // Scroll active item into view inside the list container if needed
  useEffect(() => {
    if (listRef.current) {
      const activeEl = listRef.current.children[selectedIndex] as HTMLElement;
      if (activeEl) {
        const listHeight = listRef.current.clientHeight;
        const activeTop = activeEl.offsetTop;
        const activeHeight = activeEl.clientHeight;

        if (activeTop + activeHeight > listRef.current.scrollTop + listHeight) {
          listRef.current.scrollTop = activeTop + activeHeight - listHeight;
        } else if (activeTop < listRef.current.scrollTop) {
          listRef.current.scrollTop = activeTop;
        }
      }
    }
  }, [selectedIndex]);

  // Trap focus inside modal
  const handleContainerKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Tab") {
      // Focus trapping handled by input keydown, but fallback check here
      inputRef.current?.focus();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4"
          role="dialog"
          aria-modal="true"
          aria-label="Command Palette"
        >
          {/* Backdrop Blur Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/40 dark:bg-black/65 backdrop-blur-[4px] cursor-pointer"
          />

          {/* Centered glassmorphic panel */}
          <motion.div
            ref={containerRef}
            onKeyDown={handleContainerKeyDown}
            initial={{ opacity: 0, scale: 0.96, y: -8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-[600px] bg-white/75 dark:bg-[#0B1224]/80 backdrop-blur-xl border border-black/[0.08] dark:border-white/[0.08] rounded-2xl shadow-[0_24px_50px_-12px_rgba(0,0,0,0.25)] dark:shadow-[0_24px_50px_-12px_rgba(0,0,0,0.6)] overflow-hidden flex flex-col focus-within:ring-1 focus-within:ring-accent-secondary/30 focus-within:border-accent-secondary/35 transition-shadow duration-300 pointer-events-auto"
          >
            {/* Header: Input search */}
            <div className="relative border-b border-black/[0.06] dark:border-white/[0.06]">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-muted w-5 h-5 pointer-events-none" />
              <input
                ref={inputRef}
                type="text"
                value={search}
                onChange={(e) => startTransition(() => setSearch(e.target.value))}
                onKeyDown={handleKeyDown}
                placeholder="Search portfolio..."
                className="w-full bg-transparent border-0 outline-none text-text-primary placeholder:text-text-muted text-base py-4.5 pl-12 pr-16"
                aria-autocomplete="list"
                aria-expanded={isOpen}
                aria-controls="command-palette-listbox"
                role="combobox"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                <kbd className="text-[10px] font-sans font-medium px-2 py-0.5 rounded border border-border-color bg-card-bg text-text-secondary select-none shadow-sm">
                  ESC
                </kbd>
              </div>
            </div>

            {/* List box */}
            <div 
              ref={listRef}
              id="command-palette-listbox"
              role="listbox"
              className="max-h-[350px] overflow-y-auto p-2 space-y-1 scrollbar-thin"
            >
              {filtered.length === 0 ? (
                <div className="text-center py-8 text-text-secondary font-light text-sm">
                  No results found for <span className="font-semibold text-text-primary">"{search}"</span>
                </div>
              ) : (
                filtered.map((item, index) => {
                  const Icon = item.icon;
                  const isSelected = index === selectedIndex;

                  return (
                    <button
                      key={item.id}
                      role="option"
                      aria-selected={isSelected}
                      onClick={item.action}
                      onMouseEnter={() => setSelectedIndex(index)}
                      className={`relative w-full flex items-center justify-between px-3 py-3 rounded-xl transition-colors duration-150 text-left outline-none cursor-pointer group ${
                        isSelected 
                          ? "text-text-primary" 
                          : "text-text-secondary hover:text-text-primary"
                      }`}
                    >
                      {/* Keyboard highlight pill animation */}
                      {isSelected && (
                        <motion.div
                          layoutId="active-item-highlight"
                          className="absolute inset-0 bg-black/[0.04] dark:bg-white/[0.08] rounded-xl -z-10"
                          transition={{ type: "spring", stiffness: 420, damping: 33 }}
                        />
                      )}

                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-lg border transition-colors ${
                          isSelected
                            ? "bg-white dark:bg-bg-primary border-black/[0.08] dark:border-white/[0.08] text-accent-secondary"
                            : "bg-black/[0.02] dark:bg-white/[0.03] border-transparent text-text-muted group-hover:text-text-primary"
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <span className="text-sm font-medium">{item.name}</span>
                        <span className="text-[10px] text-text-muted font-mono uppercase bg-black/[0.02] dark:bg-white/[0.04] px-1.5 py-0.5 rounded border border-black/[0.03] dark:border-white/[0.03]">
                          {item.category}
                        </span>
                      </div>

                      {/* Right feedback: enter symbol */}
                      {isSelected && (
                        <motion.div
                          initial={{ opacity: 0, x: -3 }}
                          animate={{ opacity: 1, x: 0 }}
                          className="flex items-center gap-1.5 text-[11px] text-text-muted font-light"
                        >
                          <span>Go</span>
                          <CornerDownLeft className="w-3.5 h-3.5" />
                        </motion.div>
                      )}
                    </button>
                  );
                })
              )}
            </div>

            {/* Footer with key hints */}
            <div className="px-4 py-3 bg-black/[0.02] dark:bg-white/[0.02] border-t border-black/[0.04] dark:border-white/[0.04] flex items-center justify-between text-[11px] text-text-muted select-none">
              <div className="flex items-center gap-3">
                <span>
                  <kbd className="font-sans border border-border-color bg-card-bg px-1 py-0.5 rounded shadow-sm mr-1">↑↓</kbd> or 
                  <kbd className="font-sans border border-border-color bg-card-bg px-1.5 py-0.5 rounded shadow-sm mx-1">Tab</kbd> to navigate
                </span>
                <span>
                  <kbd className="font-sans border border-border-color bg-card-bg px-1.5 py-0.5 rounded shadow-sm mr-1">Enter ↵</kbd> to select
                </span>
              </div>
              <div className="font-mono text-[10px]">
                Ctrl + K
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
