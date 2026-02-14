import { motion } from "motion/react";
import { Mail, Phone, MapPin, Github, Linkedin, Globe, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #07070d 0%, #09091a 50%, #07070d 100%)" }} />

      {/* Ambient orbs */}
      <motion.div
        className="absolute w-[500px] h-[500px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
          left: "10%",
          bottom: "10%",
        }}
        animate={{ scale: [1, 1.3, 1] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="max-w-4xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-8 h-[1px] bg-indigo-500/40" />
            <span className="font-['Inter'] text-indigo-400/60 tracking-widest uppercase" style={{ fontSize: "11px" }}>
              Contact
            </span>
            <div className="w-8 h-[1px] bg-indigo-500/40" />
          </div>
          <h2 className="font-['Syne'] text-white/95 mb-4" style={{ fontSize: "clamp(32px, 5vw, 52px)" }}>
            Let's build something{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #818cf8, #a78bfa)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              together.
            </span>
          </h2>
          <p className="font-['Inter'] text-white/30 max-w-md mx-auto" style={{ fontSize: "14px", lineHeight: "1.7" }}>
            Open to collaborations, consulting, and full-time opportunities in data engineering and ML research.
          </p>
        </motion.div>

        {/* Contact Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12"
        >
          {[
            {
              icon: <Mail size={18} />,
              label: "Email",
              value: "badrish.dev@gmail.com",
              href: "mailto:badrish.dev@gmail.com",
              color: "#6366f1",
            },
            {
              icon: <Phone size={18} />,
              label: "Phone",
              value: "+49 176 87452640",
              href: "tel:+4917687452640",
              color: "#8b5cf6",
            },
            {
              icon: <MapPin size={18} />,
              label: "Location",
              value: "28717 Bremen, Germany",
              href: null,
              color: "#34d399",
            },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 * i }}
              viewport={{ once: true }}
            >
              {item.href ? (
                <a
                  href={item.href}
                  className="block p-5 rounded-2xl group transition-all duration-500 hover:scale-[1.02]"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: `${item.color}10`,
                        border: `1px solid ${item.color}18`,
                      }}
                    >
                      <div style={{ color: `${item.color}cc` }}>{item.icon}</div>
                    </div>
                    <div>
                      <p className="font-['Inter'] text-white/20 mb-1" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                        {item.label.toUpperCase()}
                      </p>
                      <p className="font-['Inter'] text-white/60 break-all" style={{ fontSize: "13px" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                </a>
              ) : (
                <div
                  className="p-5 rounded-2xl"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    backdropFilter: "blur(20px)",
                  }}
                >
                  <div className="flex flex-col items-center text-center gap-3">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `${item.color}10`,
                        border: `1px solid ${item.color}18`,
                      }}
                    >
                      <div style={{ color: `${item.color}cc` }}>{item.icon}</div>
                    </div>
                    <div>
                      <p className="font-['Inter'] text-white/20 mb-1" style={{ fontSize: "10px", letterSpacing: "0.1em" }}>
                        {item.label.toUpperCase()}
                      </p>
                      <p className="font-['Inter'] text-white/60" style={{ fontSize: "13px" }}>
                        {item.value}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-3 mb-16"
        >
          {[
            { icon: <Linkedin size={16} />, label: "LinkedIn", href: "https://linkedin.com" },
            { icon: <Github size={16} />, label: "GitHub", href: "https://github.com" },
            { icon: <Globe size={16} />, label: "Portfolio", href: "https://portfolio.com" },
          ].map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-xl font-['Inter'] text-white/35 hover:text-white/70 transition-all duration-300 group hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.02)",
                border: "1px solid rgba(255,255,255,0.05)",
                fontSize: "12px",
              }}
            >
              {link.icon}
              {link.label}
              <ArrowUpRight size={12} className="text-white/15 group-hover:text-white/40 transition-colors" />
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          viewport={{ once: true }}
          className="pt-8 flex flex-col md:flex-row justify-between items-center gap-4"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="font-['Inter'] text-white/15" style={{ fontSize: "12px" }}>
            Badrish Madapuji Srinivasan 2025
          </p>
          <p className="font-['Inter'] text-white/15" style={{ fontSize: "12px" }}>
            Designed with care in Bremen, Germany
          </p>
        </motion.div>
      </div>
    </section>
  );
}
