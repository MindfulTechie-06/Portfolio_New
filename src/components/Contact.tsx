"use client";

import { motion, Variants } from "framer-motion";
import { useState, useRef } from "react";
import { Send, CheckCircle, XCircle } from "lucide-react";
import Script from "next/script";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [focusedInput, setFocusedInput] = useState<string | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formRef.current) return;
    
    setIsSending(true);
    setFeedbackMsg(null);

    if (typeof window !== 'undefined' && (window as any).emailjs) {
      (window as any).emailjs.sendForm(
        'service_o7j4ebi', 
        'template_twjqgli', 
        formRef.current, 
        'yO5Ehzjsk4yMF8Mcs'
      )
        .then(() => {
          setFeedbackMsg({ type: 'success', text: 'Message sent successfully!' });
          setIsSending(false);
          formRef.current?.reset();
          setFormData({ name: '', email: '', message: '' });
          setFocusedInput(null);
        }, (error: any) => {
          console.error(error);
          setFeedbackMsg({ type: 'error', text: 'Failed to send message.' });
          setIsSending(false);
        });
    } else {
      setFeedbackMsg({ type: 'error', text: 'Failed to send message.' });
      setIsSending(false);
    }
  };

  const containerVariants: Variants = {
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

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  return (
    <>
      <Script 
        src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"
        strategy="lazyOnload"
        onLoad={() => {
          (window as any).emailjs.init("yO5Ehzjsk4yMF8Mcs");
        }}
      />
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
          
          <form id="contact-form" ref={formRef} className="flex flex-col gap-6 text-left" onSubmit={sendEmail}>
            
            <motion.div variants={itemVariants} className="relative group">
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                onFocus={() => setFocusedInput('name')}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300 focus:bg-white/10 focus:border-white/30 peer"
                required
              />
              <label 
                htmlFor="name" 
                className={`absolute left-6 text-zinc-500 transition-all duration-300 pointer-events-none ${
                  focusedInput === 'name' || formData.name.length > 0 ? 'top-2 text-xs text-zinc-300' : 'top-4 text-base'
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
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                onFocus={() => setFocusedInput('email')}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300 focus:bg-white/10 focus:border-white/30 peer"
                required
              />
              <label 
                htmlFor="email" 
                className={`absolute left-6 text-zinc-500 transition-all duration-300 pointer-events-none ${
                  focusedInput === 'email' || formData.email.length > 0 ? 'top-2 text-xs text-zinc-300' : 'top-4 text-base'
                }`}
              >
                Email Address
              </label>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-focus-within:w-full" />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <textarea 
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                onFocus={() => setFocusedInput('message')}
                onBlur={() => setFocusedInput(null)}
                className="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-white outline-none transition-all duration-300 focus:bg-white/10 focus:border-white/30 resize-none peer pt-8"
                required
              />
              <label 
                htmlFor="message" 
                className={`absolute left-6 text-zinc-500 transition-all duration-300 pointer-events-none ${
                  focusedInput === 'message' || formData.message.length > 0 ? 'top-3 text-xs text-zinc-300' : 'top-6 text-base'
                }`}
              >
                Tell me about your project
              </label>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-white transition-all duration-500 ease-out group-focus-within:w-[calc(100%-3rem)]" />
            </motion.div>

            {feedbackMsg && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
                  feedbackMsg.type === 'success' ? 'bg-green-500/10 text-green-400 border border-green-500/20' : 'bg-red-500/10 text-red-400 border border-red-500/20'
                }`}
              >
                {feedbackMsg.type === 'success' ? <CheckCircle size={18} /> : <XCircle size={18} />}
                {feedbackMsg.text}
              </motion.div>
            )}

            <motion.button 
              variants={itemVariants}
              whileHover={!isSending ? { scale: 1.02 } : {}}
              whileTap={!isSending ? { scale: 0.98 } : {}}
              disabled={isSending}
              className={`group relative flex items-center justify-center gap-2 w-full mt-2 bg-white text-[#121212] font-semibold text-lg py-4 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] ${
                isSending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              {!isSending && <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </form>

        </motion.div>
      </section>
    </>
  );
}
