import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";
import Statistics from "@/components/Statistics";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Achievements from "@/components/Achievements";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="bg-bg-primary min-h-screen text-text-primary outline-none transition-colors duration-500">
      <div id="home" className="relative">
        <Overlay />
        <ScrollyCanvas />
      </div>
      <Statistics />
      <About />
      <Projects />
      <Experience />
      <Achievements />
      <Contact />
      <Footer />
    </main>
  );
}
