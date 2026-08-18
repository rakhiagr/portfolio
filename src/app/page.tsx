import { TopNav } from "@/components/nav/TopNav";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Experience } from "@/components/sections/Experience";
import { Path } from "@/components/sections/Path";
import { Education } from "@/components/sections/Education";
import { Projects } from "@/components/sections/Projects";
import { Skills } from "@/components/sections/Skills";
import { Contact } from "@/components/sections/Contact";
import { CinemaSection } from "@/components/scene/CinemaSection";

export default function Home() {
  return (
    <>
      <TopNav />
      <main>
        <Hero />
        <CinemaSection
          id="cinema-1"
          height="min-h-[50vh]"
          eyebrow="Signal · packet"
          title="Behind every request, there's a system."
        />
        <About />
        <Experience />
        <Path />
        <Education />
        <Projects />
        <Skills />
        <Contact />
      </main>
    </>
  );
}
