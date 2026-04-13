"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Send } from "lucide-react";

export default function Contact() {
  const [focusedInput, setFocusedInput] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut",
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <section id="contact" className="bg-[#121212] min-h-[90vh] py-32 px-6 md:px-20 lg:px-40 text-white flex flex-col justify-center items-center relative z-20 overflow-hidden">
      
      {/* Background ambient glow matching the high-end aesthetic */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-white/5 blur-[120px] rounded-full pointer-events-none" />

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-xl text-center w-full relative z-10"
      >
        <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
          Let's Talk
        </motion.h2>
        <motion.p variants={itemVariants} className="text-lg md:text-xl text-zinc-400 font-light mb-12">
          Ready to start your next project or just want to say hi? Send me a message.
        </motion.p>
        
        <form className="flex flex-col gap-6 text-left" onSubmit={(e) => e.preventDefault()}>
          
          <motion.div variants={itemVariants} className="relative group">
            <input 
              type="text" 
              id="name"
              onFocus={() => setFocusedInput('name')}
              onBlur={(e) => setFocusedInput(e.target.value ? 'name' : null)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300 focus:bg-white/10 focus:border-white/30 peer"
              required
            />
            <label 
              htmlFor="name" 
              className={`absolute left-6 text-zinc-500 transition-all duration-300 pointer-events-none ${
                focusedInput === 'name' ? 'top-2 text-xs text-zinc-300' : 'top-4 text-base'
              }`}
            >
              Your Name
            </label>
            {/* Animated Bottom Glow */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-focus-within:w-full" />
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <input 
              type="email" 
              id="email"
              onFocus={() => setFocusedInput('email')}
              onBlur={(e) => setFocusedInput(e.target.value ? 'email' : null)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300 focus:bg-white/10 focus:border-white/30 peer"
              required
            />
            <label 
              htmlFor="email" 
              className={`absolute left-6 text-zinc-500 transition-all duration-300 pointer-events-none ${
                focusedInput === 'email' ? 'top-2 text-xs text-zinc-300' : 'top-4 text-base'
              }`}
            >
              Email Address
            </label>
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-focus-within:w-full" />
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <textarea 
              id="message"
              rows={4}
              onFocus={() => setFocusedInput('message')}
              onBlur={(e) => setFocusedInput(e.target.value ? 'message' : null)}
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300 focus:bg-white/10 focus:border-white/30 resize-none peer pt-8"
              required
            />
            <label 
              htmlFor="message" 
              className={`absolute left-6 text-zinc-500 transition-all duration-300 pointer-events-none ${
                focusedInput === 'message' ? 'top-3 text-xs text-zinc-300' : 'top-6 text-base'
              }`}
            >
              Tell me about your project
            </label>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-focus-within:w-[calc(100%-3rem)]" />
          </motion.div>

          <motion.button 
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="group relative flex items-center justify-center gap-2 w-full mt-2 bg-white text-[#121212] font-semibold text-lg py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]"
          >
            <span>Send Message</span>
            <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />
          </motion.button>
        </form>

      </motion.div>
    </section>
  );
}
