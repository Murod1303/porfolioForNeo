import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ANIMATION_VARIANTS } from "../../constants/data";

const { fadeInUp, staggerContainer } = ANIMATION_VARIANTS;

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

export default ContactSection;
