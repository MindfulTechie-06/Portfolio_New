"use client";

import { motion } from "framer-motion";

export default function About() {
  return (
    <section id="about" className="bg-[#121212] min-h-screen py-32 px-6 md:px-20 lg:px-40 text-white flex flex-col justify-center items-center relative z-20">
      <motion.div 
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        viewport={{ once: true, margin: "-100px" }}
        className="max-w-3xl text-center"
      >
        <h2 className="text-5xl md:text-7xl font-bold tracking-tight mb-8">About</h2>
        <p className="text-xl text-zinc-400 font-light leading-relaxed">
          I’m Himanish Chatterjee, a tech enthusiast and undergraduate student at Techno India University, passionate about building impactful digital solutions.

I enjoy turning ideas into real-world applications, especially at the intersection of AI, software development, and user-centric design. From leading projects like InnoSphere, focused on AI-generated educational content, to working on FashionBridge, a platform empowering small-scale fashion businesses, I actively explore how technology can create meaningful change.

Beyond coding, I’m deeply involved in innovation and community building, contributing to initiatives like the Entrepreneurship Cell in collaboration with GDG. I thrive in fast-paced environments like hackathons, where I can learn quickly, build rapidly, and solve real problems.

I’m constantly pushing myself to grow—whether it’s mastering new technologies, leading teams, or building products that actually matter.
        </p>
      </motion.div>
    </section>
  );
}
