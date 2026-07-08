"use client";

import { motion, Variants, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Send, CheckCircle, XCircle, Copy, Check } from "lucide-react";
import Script from "next/script";

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const formRef = useRef<HTMLFormElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [feedbackMsg, setFeedbackMsg] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const [isCopied, setIsCopied] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
  
  const copyTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const toastTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const copyToClipboard = async () => {
    if (copyTimeoutRef.current) clearTimeout(copyTimeoutRef.current);
    if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);

    try {
      await navigator.clipboard.writeText("chatterjeehimanish520@gmail.com");
      setIsCopied(true);
      setToast({ message: "✓ Email copied to clipboard!", type: "success" });
      
      copyTimeoutRef.current = setTimeout(() => {
        setIsCopied(false);
      }, 2000);
      
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
      }, 2500);
    } catch {
      setToast({ message: "Unable to copy email.", type: "error" });
      toastTimeoutRef.current = setTimeout(() => {
        setToast(null);
      }, 2500);
    }
  };

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
      <section id="contact" className="bg-bg-primary min-h-[90vh] py-32 px-6 md:px-20 lg:px-40 text-text-primary flex flex-col justify-center items-center relative z-20 overflow-hidden transition-colors duration-500">
        
        {/* Background ambient glow matching the high-end aesthetic */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-text-primary/5 blur-[120px] rounded-full pointer-events-none" />

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="max-w-xl text-center w-full relative z-10"
        >
          <motion.h2 variants={itemVariants} className="text-5xl md:text-7xl font-bold tracking-tight mb-4">
            Let&apos;s Talk
          </motion.h2>
          <motion.p variants={itemVariants} className="text-lg md:text-xl text-text-secondary font-light mb-8">
            Ready to start your next project or just want to say hi? Send me a message.
          </motion.p>

          <motion.div 
            variants={itemVariants}
            className="inline-flex items-center justify-center gap-3 mb-12 px-6 py-3 rounded-full bg-card-bg/40 backdrop-blur-md border border-border-color shadow-sm"
          >
            <span className="text-base md:text-lg font-light text-text-primary tracking-wide select-all">
              chatterjeehimanish520@gmail.com
            </span>
            <button
              type="button"
              onClick={copyToClipboard}
              className="p-2.5 rounded-xl bg-card-bg/40 backdrop-blur-md border border-border-color hover:bg-card-bg-hover/60 hover:scale-105 hover:shadow-[0_0_15px_rgba(215,38,61,0.25)] dark:hover:shadow-[0_0_15px_rgba(115,207,246,0.35)] transition-all duration-250 cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent-secondary/50 group"
              aria-label="Copy email address"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isCopied ? (
                  <motion.div
                    key="check"
                    initial={{ scale: 0, rotate: -45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: 45 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    <Check size={16} className="text-green-500" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="copy"
                    initial={{ scale: 0, rotate: 45 }}
                    animate={{ scale: 1, rotate: 0 }}
                    exit={{ scale: 0, rotate: -45 }}
                    transition={{ duration: 0.15 }}
                    className="flex items-center justify-center"
                  >
                    <Copy size={16} className="text-text-secondary group-hover:text-text-primary transition-colors" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </motion.div>
          
          <form id="contact-form" ref={formRef} className="flex flex-col gap-6 text-left" onSubmit={sendEmail}>
            
            <motion.div variants={itemVariants} className="relative group">
              <input 
                type="text" 
                id="name"
                name="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder=" "
                className="w-full bg-input-bg border border-input-border rounded-2xl px-6 pt-7 pb-3 text-text-primary outline-none transition-all duration-300 focus:bg-input-bg focus:border-input-border-focus peer"
                required
              />
              <label 
                htmlFor="name" 
                className="absolute left-6 top-2 text-xs text-text-secondary transition-all duration-300 pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:text-text-secondary"
              >
                Your Name
              </label>
              {/* Animated Bottom Glow */}
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-text-primary transition-all duration-500 ease-out group-focus-within:w-full" />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <input 
                type="email" 
                id="email"
                name="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder=" "
                className="w-full bg-input-bg border border-input-border rounded-2xl px-6 pt-7 pb-3 text-text-primary outline-none transition-all duration-300 focus:bg-input-bg focus:border-input-border-focus peer"
                required
              />
              <label 
                htmlFor="email" 
                className="absolute left-6 top-2 text-xs text-text-secondary transition-all duration-300 pointer-events-none peer-placeholder-shown:top-5 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-muted peer-focus:top-2 peer-focus:text-xs peer-focus:text-text-secondary"
              >
                Email Address
              </label>
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-text-primary transition-all duration-500 ease-out group-focus-within:w-full" />
            </motion.div>

            <motion.div variants={itemVariants} className="relative group">
              <textarea 
                id="message"
                name="message"
                rows={4}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder=" "
                className="w-full bg-input-bg border border-input-border rounded-2xl px-6 pt-8 pb-4 text-text-primary outline-none transition-all duration-300 focus:bg-input-bg focus:border-input-border-focus resize-none peer"
                required
              />
              <label 
                htmlFor="message" 
                className="absolute left-6 top-3 text-xs text-text-secondary transition-all duration-300 pointer-events-none peer-placeholder-shown:top-6 peer-placeholder-shown:text-base peer-placeholder-shown:text-text-muted peer-focus:top-3 peer-focus:text-xs peer-focus:text-text-secondary"
              >
                Tell me about your project
              </label>
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-text-primary transition-all duration-500 ease-out group-focus-within:w-[calc(100%-3rem)]" />
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
              className={`group relative flex items-center justify-center gap-2 w-full mt-2 bg-button-primary-bg text-button-primary-text font-semibold text-lg py-4 rounded-2xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-lg dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.15)] cursor-pointer ${
                isSending ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              <span>{isSending ? 'Sending...' : 'Send Message'}</span>
              {!isSending && <Send size={18} className="transform group-hover:translate-x-1 transition-transform" />}
            </motion.button>
          </form>

        </motion.div>
      </section>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed bottom-6 left-1/2 -translate-x-1/2 sm:left-auto sm:translate-x-0 sm:bottom-8 sm:right-8 z-50 flex items-center gap-3 py-3.5 px-5 rounded-2xl border bg-white/80 dark:bg-[#111A30]/85 border-border-color shadow-lg text-text-primary dark:text-white backdrop-blur-md font-medium text-sm md:text-base pointer-events-none"
          >
            {toast.type === "success" ? (
              <CheckCircle size={18} className="text-green-500 shrink-0" />
            ) : (
              <XCircle size={18} className="text-red-500 shrink-0" />
            )}
            <span>{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
