"use client";

import React from 'react';
import { FaGithub, FaLinkedin, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: 'Home', id: 'home' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Achievements', id: 'achievements' },
    { name: 'Contact', id: 'contact' },
  ];

  return (
    <footer className="bg-neutral-950 text-neutral-300 py-12 border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-12">
          {/* Left Section */}
          <div className="flex flex-col space-y-4">
            <h2 className="text-2xl font-bold text-white tracking-tight">Himanish Chatterjee</h2>
            <p className="text-neutral-400 max-w-sm">
              Building impactful digital experiences
            </p>
          </div>

          {/* Center Section - Quick Links */}
          <div className="flex flex-col space-y-4 md:items-center">
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
              <ul className="flex flex-col space-y-2">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <button
                      onClick={() => scrollToSection(link.id)}
                      className="text-neutral-400 hover:text-white transition-colors duration-300 hover:underline underline-offset-4 decoration-neutral-500"
                      aria-label={`Scroll to ${link.name}`}
                    >
                      {link.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Section - Socials */}
          <div className="flex flex-col space-y-4 md:items-end">
            <div className="w-full md:w-auto">
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <div className="flex items-center space-x-4">
                <a
                  href="https://github.com/MindfulTechie-06"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all duration-300 hover:scale-110"
                  aria-label="GitHub Profile"
                >
                  <FaGithub size={20} />
                </a>
                <a
                  href="https://www.linkedin.com/in/himanish-chatterjee-153a50327/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-blue-500 transition-all duration-300 hover:scale-110"
                  aria-label="LinkedIn Profile"
                >
                  <FaLinkedin size={20} />
                </a>
                <a
                  href="mailto:your.chatterjeehimanish520@gmail.com"
                  className="p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-red-400 transition-all duration-300 hover:scale-110"
                  aria-label="Send Email"
                >
                  <FaEnvelope size={20} />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-neutral-800 space-y-4 md:space-y-0 relative">
          <p className="text-sm text-neutral-500 text-center md:text-left">
            &copy; 2026 Himanish Chatterjee. All rights reserved.
          </p>
          
          <button
            onClick={scrollToTop}
            className="md:absolute md:left-1/2 md:-translate-x-1/2 p-3 rounded-full bg-neutral-900 border border-neutral-800 hover:bg-neutral-800 hover:border-neutral-700 text-neutral-400 hover:text-white transition-all duration-300 hover:-translate-y-1 group focus:outline-none focus:ring-2 focus:ring-neutral-500"
            aria-label="Back to Top"
          >
            <FaArrowUp size={20} className="group-hover:-translate-y-1 transition-transform" />
          </button>

          <p className="text-sm text-neutral-500 text-center md:text-right flex items-center space-x-1">
            <span>Designed & Developed by</span>
            <span className="font-medium text-neutral-300">Himanish</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
