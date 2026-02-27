import { HeroSection } from "../_components/hero/HeroSection";
import { AboutSection } from "../_components/about/AboutSection";
import { ProjectsSection } from "../_components/projects/ProjectsSection";
import { SkillsSection } from "../_components/skills/SkillsSection";
import { ExperienceSection } from "../_components/experience/ExperienceSection";
import { ContactSection } from "../_components/contact/ContactSection";

/**
 * Home page — the portfolio's single-page assembly.
 * Each section is a self-contained client component imported here.
 */
export default function Home() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <SkillsSection />
      <ExperienceSection />
      <ContactSection />
    </main>
  );
}
