import { motion } from "framer-motion";
import { Github, Linkedin, Mail } from "lucide-react";
import { ANIMATION_VARIANTS } from "../../constants/data";
import { useState, useRef } from "react";
import { sendTelegramMessage } from "../../utils/telegram";

const { fadeInUp, staggerContainer } = ANIMATION_VARIANTS;

type FormStatus = "idle" | "loading" | "success" | "error";

const SOCIAL_LINKS = [
  { Icon: Github, href: "#", label: "GitHub profile" },
  { Icon: Linkedin, href: "#", label: "LinkedIn profile" },
  { Icon: Mail, href: "mailto:murod@example.com", label: "Send email" },
];

const ContactSection: React.FC = () => {
  const [status, setStatus] = useState<FormStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const subjectRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      await sendTelegramMessage({
        name: nameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        subject: subjectRef.current?.value ?? "",
        message: messageRef.current?.value ?? "",
      });
      setStatus("success");
      (e.target as HTMLFormElement).reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Xabar yuborib bo'lmadi");
    }
  };

  return (
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
            <form onSubmit={handleSubmit} noValidate>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-name" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                      Your Name <span className="text-blue-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-name"
                      ref={nameRef}
                      type="text"
                      required
                      aria-required="true"
                      autoComplete="name"
                      placeholder="Murod Shernazaroff"
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="contact-email" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                      Your Email <span className="text-blue-500" aria-hidden="true">*</span>
                    </label>
                    <input
                      id="contact-email"
                      ref={emailRef}
                      type="email"
                      required
                      aria-required="true"
                      autoComplete="email"
                      placeholder="murod@example.com"
                      className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-subject" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                    Subject <span className="text-blue-500" aria-hidden="true">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    ref={subjectRef}
                    type="text"
                    required
                    aria-required="true"
                    placeholder="Project inquiry"
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all"
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="contact-message" className="text-sm font-medium text-gray-700 dark:text-slate-300">
                    Message <span className="text-blue-500" aria-hidden="true">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    ref={messageRef}
                    rows={6}
                    required
                    aria-required="true"
                    placeholder="Tell me about your project..."
                    className="w-full px-4 py-3 rounded-lg bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-600 focus:border-transparent outline-none transition-all resize-none"
                  />
                </div>
                {status === "success" ? (
                  <div
                    role="alert"
                    className="flex items-center justify-center gap-2 w-full px-8 py-4 bg-green-600/20 border border-green-500/40 text-green-400 rounded-lg font-semibold"
                  >
                    ✓ Xabar yuborildi! Tez orada javob beraman.
                  </div>
                ) : status === "error" ? (
                  <div role="alert" className="flex flex-col gap-3">
                    <div className="flex items-center gap-2 w-full px-4 py-3 bg-red-600/10 border border-red-500/40 text-red-400 rounded-lg text-sm">
                      ✗ {errorMsg || "Xabar yuborib bo'lmadi. Qayta urinib ko'ring."}
                    </div>
                    <motion.button
                      type="button"
                      onClick={() => setStatus("idle")}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow"
                    >
                      Qayta yuborish
                    </motion.button>
                  </div>
                ) : (
                  <motion.button
                    type="submit"
                    disabled={status === "loading"}
                    whileHover={status !== "loading" ? { scale: 1.02 } : {}}
                    whileTap={status !== "loading" ? { scale: 0.98 } : {}}
                    className="w-full px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl transition-shadow disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    {status === "loading" ? (
                      <>
                        <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                        Sending...
                      </>
                    ) : (
                      "Send Message"
                    )}
                  </motion.button>
                )}
              </div>
            </form>
            <div className="flex justify-center gap-6 mt-8">
              {SOCIAL_LINKS.map(({ Icon, href, label }) => (
                <motion.a
                  key={label}
                  href={href}
                  aria-label={label}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  className="p-4 bg-white dark:bg-slate-800 rounded-full shadow-md hover:shadow-lg transition-shadow"
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
};

export default ContactSection;
