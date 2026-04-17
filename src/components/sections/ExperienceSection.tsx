import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { EXPERIENCE } from "../../constants/data";

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

export default ExperienceSection;
