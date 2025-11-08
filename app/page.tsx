import Contact from "@/pages/contact/page";
import Home from "@/pages/home/page";
import AboutMe from "@/pages/about-me/page";
import Skills from "@/pages/skills/page";
import Projects from "@/pages/projects/page";
import Footer from "@/components/footer";

export default function Default() {
  return (
    <main>
      <Home />
      <AboutMe />
      <Skills />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}