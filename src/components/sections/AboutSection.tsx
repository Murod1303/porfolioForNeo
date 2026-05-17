import { motion } from "framer-motion";
import { ANIMATION_VARIANTS } from "../../constants/data";

const { fadeInUp, staggerContainer } = ANIMATION_VARIANTS;

const SKILL_LOGOS = [
  {
    name: "HTML5",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg",
  },
  {
    name: "CSS3",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg",
  },
  {
    name: "JavaScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg",
  },
  {
    name: "TypeScript",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg",
  },
  {
    name: "React",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg",
  },
  {
    name: "Next.js",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nextjs/nextjs-original.svg",
  },
  {
    name: "Tailwind CSS",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg",
  },
  {
    name: "Redux",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/redux/redux-original.svg",
  },
  {
    name: "Git",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg",
  },
  {
    name: "Figma",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/figma/figma-original.svg",
  },
  {
    name: "Vite",
    src: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg",
  },
];

const AboutSection: React.FC = () => {
  return (
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
              <p className="text-lg text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">
                I am a passionate full-stack developer who enjoys building modern web applications. I have experience working with both frontend and backend technologies, creating fast, reliable, and user-friendly solutions.
              </p>
              <p className="text-lg text-gray-600 dark:text-slate-300 mb-4 leading-relaxed">
                I mainly work with React, Node.js, and modern web technologies. Currently, I'm focused on working on different startup ideas and projects, learning new technologies, and building systems that solve real-world problems.
              </p>
              <p className="text-lg text-gray-600 dark:text-slate-300 leading-relaxed">
                Beyond coding, I enjoy exploring open-source projects, experimenting with new ideas, and sharing knowledge with the developer community.
              </p>
            </motion.div>

            {/* Custom Floating Skills Container */}
            <motion.div
              variants={fadeInUp}
              className="relative w-full min-h-[400px] bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-gray-100 dark:border-slate-700 flex justify-center items-center py-6"
            >
              {/* Background Text */}
              <div className="absolute inset-0 flex items-center justify-center opacity-5 pointer-events-none">
                <span className="text-9xl font-black">SKILLS</span>
              </div>

              {/* Floating Logos */}
              <div className="relative z-10 w-full h-full p-8 flex flex-wrap justify-center items-center gap-x-6 gap-y-10">
                {SKILL_LOGOS.map((skill) => (
                  <motion.div
                    key={skill.name}
                    className="relative group p-4 bg-gray-50 dark:bg-slate-700/50 rounded-2xl shadow-sm border border-gray-100 dark:border-slate-600 cursor-pointer hover:shadow-md transition-shadow"
                    whileHover={{ scale: 1.15, transition: { duration: 0.2 } }}
                  >
                    <img
                      src={skill.src}
                      alt={skill.name}
                      width={64}
                      height={64}
                      loading="lazy"
                      className="w-16 h-16 object-contain filter drop-shadow-sm"
                    />

                    {/* Tooltip on hover */}
                    <div className="absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-gray-900 dark:bg-slate-950 text-white text-xs font-semibold px-3 py-1 rounded-full whitespace-nowrap pointer-events-none z-20 shadow-lg">
                      {skill.name}
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
