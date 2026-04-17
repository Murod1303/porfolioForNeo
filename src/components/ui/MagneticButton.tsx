import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { MagneticButtonProps } from "../../types";

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
    Math.pow(mouseX - buttonPos.x, 2) + Math.pow(mouseY - buttonPos.y, 2),
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

export default MagneticButton;
