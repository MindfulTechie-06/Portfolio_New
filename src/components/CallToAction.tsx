"use client";

import React from "react";
import { FaArrowRight, FaDownload, FaGithub, FaLinkedin, FaInstagram, FaTwitter } from "react-icons/fa";

export default function CallToAction() {
  const scrollToContact = () => {
    const element = document.getElementById("contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="mt-12 flex flex-col lg:flex-row items-center justify-center gap-6 lg:gap-4 w-full">
      
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
        {/* Primary Button */}
        <button
          onClick={scrollToContact}
          className="group relative flex items-center justify-center gap-2 bg-white text-[#121212] font-medium px-8 py-3.5 rounded-full hover:bg-neutral-200 hover:scale-105 transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.1)] hover:shadow-[0_0_25px_rgba(255,255,255,0.2)] w-full sm:w-auto"
          aria-label="Get in touch"
        >
          <span>Get in touch</span>
          <FaArrowRight className="transform group-hover:translate-x-1 transition-transform" />
        </button>

        {/* Secondary Button */}
        <a
          href="https://drive.google.com/drive/folders/1A2LuAd_1Wb9mlVlM6qRCnO-zUUFw-dci?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2 bg-transparent text-white border border-white/20 font-medium px-8 py-3.5 rounded-full hover:border-white/50 hover:bg-white/5 hover:scale-105 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] w-full sm:w-auto"
          aria-label="View CV"
        >
          <span>View CV</span>
          <FaDownload className="transform group-hover:-translate-y-0.5 transition-transform" />
        </a>
      </div>

      {/* Social Icons */}
      <div className="flex items-center gap-4 lg:ml-4 mt-2 lg:mt-0">
        <a
          href="https://www.linkedin.com/in/himanish-chatterjee-153a50327/"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full border border-white/20 text-neutral-400 hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all duration-300 hover:scale-110"
          aria-label="LinkedIn Profile"
        >
          <FaLinkedin size={20} />
        </a>
        <a
          href="https://github.com/MindfulTechie-06"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full border border-white/20 text-neutral-400 hover:text-white hover:border-white/50 hover:bg-white/10 transition-all duration-300 hover:scale-110"
          aria-label="GitHub Profile"
        >
          <FaGithub size={20} />
        </a>
        <a
          href="https://www.instagram.com/_.himanixx._?igsh=MXUxMGUzZWlmZzFpYQ=="
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full border border-white/20 text-neutral-400 hover:text-pink-500 hover:border-pink-500/50 hover:bg-pink-500/10 transition-all duration-300 hover:scale-110"
          aria-label="Instagram Profile"
        >
          <FaInstagram size={20} />
        </a>
        <a
          href="https://x.com/HimanishCh65417"
          target="_blank"
          rel="noopener noreferrer"
          className="p-3.5 rounded-full border border-white/20 text-neutral-400 hover:text-sky-400 hover:border-sky-400/50 hover:bg-sky-400/10 transition-all duration-300 hover:scale-110"
          aria-label="Twitter Profile"
        >
          <FaTwitter size={20} />
        </a>
      </div>
    </div>
  );
}
