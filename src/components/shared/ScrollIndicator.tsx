import { motion } from "framer-motion";

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

export default ScrollIndicator;
