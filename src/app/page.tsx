import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <main className="bg-[#121212] min-h-screen text-white outline-none selection:bg-white/30">
      <div id="home" className="relative">
        <Overlay />
        <ScrollyCanvas />
      </div>
      <About />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
    </main>
  );
}
