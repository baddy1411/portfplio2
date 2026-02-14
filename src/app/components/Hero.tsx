import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, MapPin, ArrowDown } from "lucide-react";

export function Hero() {
  const [textIndex, setTextIndex] = useState(0);
  const descriptors = [
    "Building production AWS pipelines at 1TB/day",
    "Optimizing 3D computer vision datasets",
    "Driving Net-Zero intelligence systems",
    "M.Sc. Data Engineering  Constructor University",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setTextIndex((prev) => (prev + 1) % descriptors.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Ambient background */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(99,102,241,0.07) 0%, transparent 70%)",
            left: "-10%",
            top: "-20%",
          }}
          animate={{ x: [0, 30, 0], y: [0, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(139,92,246,0.05) 0%, transparent 70%)",
            right: "-5%",
            bottom: "-10%",
          }}
          animate={{ x: [0, -20, 0], y: [0, -30, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute w-[300px] h-[300px] rounded-full"
          style={{
            background: "radial-gradient(circle, rgba(52,211,153,0.04) 0%, transparent 70%)",
            right: "30%",
            top: "20%",
          }}
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
        />

        {/* Subtle dot grid */}
        <div
          className="absolute inset-0 opacity-[0.015]"
          style={{
            backgroundImage: "radial-gradient(circle, #fff 1px, transparent 1px)",
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="max-w-6xl mx-auto px-6 py-20 relative z-10">
        <div className="flex flex-col items-center text-center">
          {/* Greeting badge */}
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="mb-8 px-4 py-2 rounded-full flex items-center gap-2"
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
            }}
          >
            <MapPin size={13} className="text-indigo-400/70" />
            <span className="font-['Inter'] text-white/40" style={{ fontSize: "12px" }}>
              Bremen, Germany
            </span>
            <div className="w-1 h-1 rounded-full bg-white/10" />
            <span className="font-['Inter'] text-white/40" style={{ fontSize: "12px" }}>
              Data Engineer & ML Researcher
            </span>
          </motion.div>

          {/* Name */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            className="mb-6"
          >
            <h1
              className="font-['Syne'] text-white/95 tracking-tight"
              style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
            >
              Badrish{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #818cf8, #a78bfa, #c4b5fd)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Madapuji
              </span>
            </h1>
            <h2
              className="font-['Syne'] text-white/95 tracking-tight -mt-2"
              style={{ fontSize: "clamp(40px, 8vw, 80px)" }}
            >
              Srinivasan
            </h2>
          </motion.div>

          {/* Rotating subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="h-10 mb-10 flex items-center"
          >
            <motion.p
              key={textIndex}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.5 }}
              className="font-['Inter'] text-white/35"
              style={{ fontSize: "15px" }}
            >
              {descriptors[textIndex]}
            </motion.p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-wrap justify-center gap-3 mb-12"
          >
            <button
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-2.5 rounded-xl font-['Inter'] text-white/95 transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/20"
              style={{
                background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
                fontSize: "13px",
              }}
            >
              View Projects
            </button>
            <button
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
              className="px-6 py-2.5 rounded-xl font-['Inter'] text-white/60 transition-all duration-300 hover:text-white/90 hover:scale-[1.02]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(20px)",
                fontSize: "13px",
              }}
            >
              Get in Touch
            </button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex items-center gap-4"
          >
            {[
              { icon: <Github size={18} />, href: "https://github.com", label: "GitHub" },
              { icon: <Linkedin size={18} />, href: "https://linkedin.com", label: "LinkedIn" },
              { icon: <Mail size={18} />, href: "mailto:badrish.dev@gmail.com", label: "Email" },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith("http") ? "_blank" : undefined}
                rel={link.href.startsWith("http") ? "noopener noreferrer" : undefined}
                className="w-10 h-10 rounded-xl flex items-center justify-center text-white/30 hover:text-white/80 transition-all duration-300 hover:scale-110"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {link.icon}
              </a>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-2"
        >
          <ArrowDown size={16} className="text-white/15" />
        </motion.div>
      </motion.div>
    </section>
  );
}
