/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useTransform } from "framer-motion";
import { Sparkles, ArrowRight } from "lucide-react";
import MagneticButton from "../ui/MagneticButton";
import ScrollIndicator from "../shared/ScrollIndicator";
import { NAME, ROLES } from "../../constants/data";

// const { letterVariants } = ANIMATION_VARIANTS;

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
        x: useTransform(parallaxX, (v: number) => -v),
        y: useTransform(parallaxY, (v: number) => -v),
      }}
      className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
      animate={{ scale: [1.2, 1, 1.2], opacity: [0.5, 0.3, 0.5] }}
      transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
    />
  </>
);

interface HeroSectionProps {
  mousePosition: { x: number; y: number };
  currentRole: number;
  parallaxX: any;
  parallaxY: any;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  mousePosition,
  currentRole,
  parallaxX,
  parallaxY,
}) => (
  <section
    id="home"
    className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900"
  >
    <HeroBackground />
    <HeroShapes parallaxX={parallaxX} parallaxY={parallaxY} />
    <div className="relative z-10 flex items-center justify-center min-h-screen px-6 pt-20">
      <div>
        {/* Hero Text */}
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
            <div className="flex flex-wrap justify-center gap-x-4 md:gap-x-8 gap-y-2 md:gap-y-4">
              {NAME.split(" ").map((word, wordIndex) => (
                <div key={wordIndex} className="flex gap-[2px] md:gap-1">
                  {word.split("").map((char, i) => {
                    const charIndex = wordIndex * 15 + i;
                    return (
                      <motion.span
                        key={i}
                        custom={charIndex}
                        initial="hidden"
                        animate="visible"
                        // variants={letterVariants}
                        className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold bg-gradient-to-br from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent"
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
                        {char}
                      </motion.span>
                    );
                  })}
                </div>
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
              className="absolute text-xl md:text-3xl font-light text-blue-300/90"
            >
              {ROLES[currentRole]}
            </motion.div>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="text-base md:text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed"
          >
            Crafting digital experiences with modern web technologies and
            creative design thinking
          </motion.p>
        </div>

        {/* Actions */}
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

        <ScrollIndicator />
      </div>
    </div>
  </section>
);

export default HeroSection;
