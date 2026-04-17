import { useState, useEffect } from "react";
import { useMotionValue, useSpring, useTransform } from "framer-motion";

import HeroSection from "../../components/sections/HeroSection";
import AboutSection from "../../components/sections/AboutSection";
import ProjectsSection from "../../components/sections/ProjectsSection";
import ExperienceSection from "../../components/sections/ExperienceSection";
import ContactSection from "../../components/sections/ContactSection";
import { ROLES } from "../../constants/data";

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  const parallaxX = useTransform(mouseXSpring, [0, window.innerWidth], [-20, 20]);
  const parallaxY = useTransform(mouseYSpring, [0, window.innerHeight], [-20, 20]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(
      () => setCurrentRole((prev) => (prev + 1) % ROLES.length),
      3000
    );
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <HeroSection
        mousePosition={mousePosition}
        currentRole={currentRole}
        parallaxX={parallaxX}
        parallaxY={parallaxY}
      />
      <AboutSection />
      <ProjectsSection />
      <ExperienceSection />
      <ContactSection />
    </>
  );
};

export default Home;
