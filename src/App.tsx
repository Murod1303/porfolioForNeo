/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./index.css";
import {
  Github,
  Linkedin,
  Mail,
  Moon,
  Sun,
  ExternalLink,
  Briefcase,
  ArrowRight,
  Sparkles,
} from "lucide-react";

// ============================================================================
// TYPES
// ============================================================================
interface Project {
  title: string;
  description: string;
  tech: string[];
  image: string;
  github: string;
  live: string;
}

interface Skill {
  name: string;
  level: number;
}

interface Experience {
  title: string;
  company: string;
  period: string;
  description: string;
}

interface MagneticButtonProps {
  children: React.ReactNode;
  mouseX: number;
  mouseY: number;
  primary?: boolean;
  href?: string;
}

// ============================================================================
// CONSTANTS
// ============================================================================
const ROLES = [
  "Frontend Developer",
  "Fullstack Developer",
  "UI/UX Engineer",
  "Creative Developer",
];
const NAME = "ALEX MORGAN";

const PROJECTS: Project[] = [
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with real-time inventory",
    tech: ["React", "Node.js", "MongoDB", "Stripe"],
    image:
      "https://images.unsplash.com/photo-1557821552-17105176677c?w=500&h=300&fit=crop",
    github: "#",
    live: "#",
  },
  {
    title: "AI Chat Application",
    description: "Real-time chat app with AI-powered responses",
    tech: ["TypeScript", "WebSocket", "OpenAI", "Redis"],
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=300&fit=crop",
    github: "#",
    live: "#",
  },
  {
    title: "Analytics Dashboard",
    description: "Data visualization dashboard for business metrics",
    tech: ["React", "D3.js", "Tailwind", "Firebase"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop",
    github: "#",
    live: "#",
  },
  {
    title: "Task Management App",
    description: "Collaborative project management tool",
    tech: ["Next.js", "PostgreSQL", "Prisma", "tRPC"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop",
    github: "#",
    live: "#",
  },
];

const SKILLS: Skill[] = [
  { name: "React", level: 95 },
  { name: "TypeScript", level: 90 },
  { name: "Node.js", level: 85 },
  { name: "Tailwind CSS", level: 92 },
  { name: "MongoDB", level: 80 },
  { name: "Next.js", level: 88 },
];

const EXPERIENCE: Experience[] = [
  {
    title: "Senior Frontend Developer",
    company: "Tech Innovations Inc.",
    period: "2022 - Present",
    description: "Leading frontend development for enterprise applications",
  },
  {
    title: "Full Stack Developer",
    company: "Digital Solutions Ltd.",
    period: "2020 - 2022",
    description: "Built scalable web applications using modern tech stack",
  },
  {
    title: "Junior Developer",
    company: "StartUp Hub",
    period: "2019 - 2020",
    description: "Developed and maintained client websites and web apps",
  },
];

// ============================================================================
// ANIMATION VARIANTS
// ============================================================================
const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut" },
};

const staggerContainer = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 50, rotateX: -90 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotateX: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.8,
      ease: [0.6, 0.05, 0.01, 0.9],
    },
  }),
};

// ============================================================================
// HERO COMPONENTS
// ============================================================================
const HeroBackground: React.FC = () => (
  <motion.div
    animate={{
      background: [
        "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        "radial-gradient(circle at 80% 50%, rgba(147, 51, 234, 0.15) 0%, transparent 50%)",
        "radial-gradient(circle at 50% 80%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
        "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.15) 0%, transparent 50%)",
      ],
    }}
    transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
    className="absolute inset-0"
  />
);

const HeroShapes: React.FC<{ parallaxX: any; parallaxY: any }> = ({
  parallaxX,
  parallaxY,
}) => (
  <>
    <motion.div
      style={{ x: parallaxX, y: parallaxY }}
      className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"
      animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
      transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      style={{
        x: useTransform(parallaxX, (v) => -v),
        y: useTransform(parallaxY, (v) => -v),
      }}
      className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </>
);

const HeroText: React.FC<{ currentRole: number }> = ({ currentRole }) => (
  <div className="text-center max-w-5xl">
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex justify-center mb-8"
    >
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      >
        <Sparkles className="w-12 h-12 text-blue-400" strokeWidth={1.5} />
      </motion.div>
    </motion.div>

    <div className="mb-6 overflow-hidden">
      <div className="flex flex-wrap justify-center gap-2 md:gap-4">
        {NAME.split("").map((char, i) => (
          <motion.span
            key={i}
            custom={i}
            initial="hidden"
            animate="visible"
            variants={letterVariants}
            className="text-6xl md:text-8xl lg:text-9xl font-bold bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
            style={{
              textShadow: "0 0 40px rgba(96, 165, 250, 0.3)",
              display: "inline-block",
            }}
            whileHover={{
              scale: 1.2,
              rotate: [-5, 5, -5],
              transition: { duration: 0.3 },
            }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </div>
    </div>

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5 }}
      className="relative h-20 mb-8 flex items-center justify-center"
    >
      <motion.div
        key={currentRole}
        initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
        transition={{ duration: 0.5 }}
        className="absolute text-2xl md:text-4xl font-light text-blue-300/90"
      >
        {ROLES[currentRole]}
      </motion.div>
    </motion.div>

    <motion.p
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 2 }}
      className="text-lg md:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
    >
      Crafting digital experiences with modern web technologies and creative
      design thinking
    </motion.p>
  </div>
);

const HeroActions: React.FC<{ mousePosition: { x: number; y: number } }> = ({
  mousePosition,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay: 2.3 }}
    className="flex flex-col sm:flex-row gap-6 justify-center items-center"
  >
    <MagneticButton
      mouseX={mousePosition.x}
      mouseY={mousePosition.y}
      primary
      href="#projects"
    >
      <span className="flex items-center gap-2">
        View Projects
        <ArrowRight className="w-5 h-5" />
      </span>
    </MagneticButton>
    <MagneticButton
      mouseX={mousePosition.x}
      mouseY={mousePosition.y}
      href="#contact"
    >
      Contact Me
    </MagneticButton>
  </motion.div>
);

const ScrollIndicator: React.FC = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 3 }}
    className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
  >
    <motion.div
      animate={{ y: [0, 10, 0] }}
      transition={{ duration: 2, repeat: Infinity }}
      className="flex flex-col items-center gap-2 text-slate-500"
    >
      <span className="text-sm">Scroll to explore</span>
      <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex justify-center p-2">
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-1 h-3 bg-slate-500 rounded-full"
        />
      </div>
    </motion.div>
  </motion.div>
);

// ============================================================================
// MAGNETIC BUTTON COMPONENT
// ============================================================================
const MagneticButton: React.FC<MagneticButtonProps> = ({
  children,
  mouseX,
  mouseY,
  primary = false,
  href = "#",
}) => {
  const buttonRef = useRef<HTMLAnchorElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!buttonRef.current) return;
    const rect = buttonRef.current.getBoundingClientRect();
    setButtonPos({
      x: rect.left + rect.width / 2,
      y: rect.top + rect.height / 2,
    });
  }, []);

  const distance = Math.sqrt(
    Math.pow(mouseX - buttonPos.x, 2) + Math.pow(mouseY - buttonPos.y, 2)
  );
  const magneticStrength = 30;
  const magneticRadius = 150;

  let offsetX = 0,
    offsetY = 0;
  if (isHovered && distance < magneticRadius) {
    const angle = Math.atan2(mouseY - buttonPos.y, mouseX - buttonPos.x);
    const force = (magneticRadius - distance) / magneticRadius;
    offsetX = Math.cos(angle) * force * magneticStrength;
    offsetY = Math.sin(angle) * force * magneticStrength;
  }

  return (
    <motion.a
      ref={buttonRef}
      href={href}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{ x: offsetX, y: offsetY }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      className={`relative px-8 py-4 rounded-full font-semibold text-lg overflow-hidden transition-all duration-300 group inline-block
        ${
          primary
            ? "bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-500/30"
            : "border-2 border-slate-600 text-slate-300 hover:border-blue-500"
        }`}
    >
      <motion.div
        className="absolute inset-0 bg-white/20"
        initial={{ scale: 0, opacity: 1 }}
        whileHover={{ scale: 2, opacity: 0, transition: { duration: 0.6 } }}
        style={{ borderRadius: "100%" }}
      />
      {primary && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 blur-xl opacity-0 group-hover:opacity-50 transition-opacity duration-300"
          style={{ zIndex: -1 }}
        />
      )}
      <span className="relative z-10">{children}</span>
    </motion.a>
  );
};

// ============================================================================
// NAVIGATION COMPONENT
// ============================================================================
const Navigation: React.FC<{
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}> = ({ darkMode, setDarkMode }) => (
  <motion.nav
    initial={{ y: -100 }}
    animate={{ y: 0 }}
    className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-gray-200 dark:border-slate-800"
  >
    <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
      <motion.div
        whileHover={{ scale: 1.05 }}
        className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"
      >
        AM
      </motion.div>
      <div className="hidden md:flex space-x-8">
        {["Home", "About", "Projects", "Experience", "Contact"].map((item) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            whileHover={{ y: -2 }}
            className="text-gray-700 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
          >
            {item}
          </motion.a>
        ))}
      </div>
      <motion.button
        whileHover={{ scale: 1.1, rotate: 180 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full bg-gray-100 dark:bg-slate-800"
      >
        {darkMode ? (
          <Sun className="w-5 h-5 text-yellow-500" />
        ) : (
          <Moon className="w-5 h-5 text-gray-700" />
        )}
      </motion.button>
    </div>
  </motion.nav>
);

// ============================================================================
// SECTION COMPONENTS
// ============================================================================
const HeroSection: React.FC<{
  mousePosition: { x: number; y: number };
  currentRole: number;
  parallaxX: any;
  parallaxY: any;
}> = ({ mousePosition, currentRole, parallaxX, parallaxY }) => (
  <section
    id="home"
    className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
  >
    <HeroBackground />
    <HeroShapes parallaxX={parallaxX} parallaxY={parallaxY} />
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-20">
      <div>
        <HeroText currentRole={currentRole} />
        <HeroActions mousePosition={mousePosition} />
        <ScrollIndicator />
      </div>
    </div>
  </section>
);

const AboutSection: React.FC = () => (
  <section id="about" className="py-32 bg-gray-50 dark:bg-slate-900">
    <div className="max-w-7xl mx-auto px-6">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeInUp}
          className="text-5xl font-bold mb-16 text-center text-gray-900 dark:text-white"
        >
          About Me
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div variants={fadeInUp}>
            <p className="text-lg text-gray-600 dark:text-slate-300 mb-6 leading-relaxed">
              I'm a passionate full-stack developer with over 5 years of
              experience building modern web applications. I specialize in
              creating scalable, user-friendly solutions that solve real-world
              problems.
            </p>
            <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
              When I'm not coding, you'll find me exploring new technologies,
              contributing to open-source projects, or sharing knowledge with
              the developer community.
            </p>
          </motion.div>
          <motion.div variants={fadeInUp} className="space-y-4">
            {SKILLS.map((skill, index) => (
              <div key={skill.name}>
                <div className="flex justify-between mb-2">
                  <span className="text-gray-700 dark:text-slate-300 font-medium">
                    {skill.name}
                  </span>
                  <span className="text-gray-500 dark:text-slate-400">
                    {skill.level}%
                  </span>
                </div>
                <div className="h-2 bg-gray-200 dark:bg-slate-700 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: index * 0.1 }}
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 rounded-full"
                  />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </div>
  </section>
);

const ProjectsSection: React.FC = () => (
  <section id="projects" className="py-32 bg-white dark:bg-slate-950">
    <div className="max-w-7xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-bold mb-16 text-center text-gray-900 dark:text-white"
      >
        Featured Projects
      </motion.h2>
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
        variants={staggerContainer}
        className="grid md:grid-cols-2 gap-8"
      >
        {PROJECTS.map((project) => (
          <motion.div
            key={project.title}
            variants={fadeInUp}
            whileHover={{ y: -10 }}
            className="bg-white dark:bg-slate-900 rounded-2xl overflow-hidden shadow-lg border border-gray-100 dark:border-slate-800"
          >
            <div className="relative overflow-hidden group">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-48 object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="p-6">
              <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">
                {project.title}
              </h3>
              <p className="text-gray-600 dark:text-slate-400 mb-4">
                {project.description}
              </p>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-sm"
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <motion.a
                  href={project.github}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  Code
                </motion.a>
                <motion.a
                  href={project.live}
                  whileHover={{ scale: 1.1 }}
                  className="flex items-center gap-2 text-gray-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  <ExternalLink className="w-5 h-5" />
                  Live Demo
                </motion.a>
              </div>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

const ExperienceSection: React.FC = () => (
  <section id="experience" className="py-32 bg-gray-50 dark:bg-slate-900">
    <div className="max-w-4xl mx-auto px-6">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-5xl font-bold mb-16 text-center text-gray-900 dark:text-white"
      >
        Experience
      </motion.h2>
      <div className="relative">
        <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-600 to-purple-600" />
        {EXPERIENCE.map((exp, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2 }}
            className="relative pl-20 pb-12 last:pb-0"
          >
            <motion.div
              whileHover={{ scale: 1.2 }}
              className="absolute left-6 w-5 h-5 bg-blue-600 rounded-full border-4 border-white dark:border-slate-950"
            />
            <div className="bg-white dark:bg-slate-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-slate-700">
              <div className="flex items-center gap-2 mb-2">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {exp.title}
                </h3>
              </div>
              <p className="text-blue-600 dark:text-blue-400 font-semibold mb-2">
                {exp.company}
              </p>
              <p className="text-gray-500 dark:text-slate-400 text-sm mb-3">
                {exp.period}
              </p>
              <p className="text-gray-600 dark:text-slate-300">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

const ContactSection: React.FC = () => (
  <section id="contact" className="py-32 bg-white dark:bg-slate-950">
    <div className="max-w-4xl mx-auto px-6">
      <motion.div
        initial="initial"
        whileInView="animate"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <motion.h2
          variants={fadeInUp}
          className="text-5xl font-bold mb-16 text-center text-gray-900 dark:text-white"
        >
          Get In Touch
        </motion.h2>
        <motion.div
          variants={fadeInUp}
          className="bg-gray-50 dark:bg-slate-900 p-8 rounded-2xl shadow-lg"
        >
          <div className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
              />
            </div>
            <input
              type="text"
              placeholder="Subject"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
            />
            <textarea
              rows={6}
              placeholder="Your Message"
              className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
            />
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => alert("Message sent! (Demo)")}
              className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
            >
              Send Message
            </motion.button>
          </div>
          <div className="flex justify-center gap-6 mt-8">
            {[
              { Icon: Github, href: "#" },
              { Icon: Linkedin, href: "#" },
              { Icon: Mail, href: "mailto:alex@example.com" },
            ].map(({ Icon, href }, i) => (
              <motion.a
                key={i}
                href={href}
                whileHover={{ scale: 1.2, rotate: 5 }}
                className="p-3 bg-white dark:bg-slate-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
              >
                <Icon className="w-6 h-6 text-gray-700 dark:text-slate-300" />
              </motion.a>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  </section>
);

// ============================================================================
// MAIN APP
// ============================================================================
const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentRole, setCurrentRole] = useState(0);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const mouseXSpring = useSpring(mouseX, springConfig);
  const mouseYSpring = useSpring(mouseY, springConfig);
  const parallaxX = useTransform(
    mouseXSpring,
    [0, window.innerWidth],
    [-20, 20]
  );
  const parallaxY = useTransform(
    mouseYSpring,
    [0, window.innerHeight],
    [-20, 20]
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

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
    <div className="min-h-screen bg-white dark:bg-slate-950 transition-colors duration-300">
      <Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
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
      <footer className="py-8 bg-gray-50 dark:bg-slate-900 border-t border-gray-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-gray-600 dark:text-slate-400">
            © 2024 Alex Morgan. Crafted with passion and coffee ☕
          </p>
        </div>
      </footer>
    </div>
  );
};

export default App;
