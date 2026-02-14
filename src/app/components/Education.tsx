import { motion } from "motion/react";
import { GraduationCap, Award } from "lucide-react";

const education = [
  {
    institution: "Constructor University",
    location: "Bremen, Germany",
    degree: "M.Sc. Data Engineering",
    period: "Expected Aug 2026",
    gpa: "1.91",
    gpaLabel: "German Scale",
    color: "#6366f1",
    highlights: [
      "Deep Learning (1.0 Grade)",
      "Big Data Analytics",
      "Parallel & Distributed Computing",
      "Advanced Database Systems",
    ],
  },
  {
    institution: "Sri Ramakrishna Engineering College",
    location: "Coimbatore, India",
    degree: "B.E. Mechanical Engineering",
    period: "May 2021",
    gpa: "7.2/10",
    gpaLabel: "CGPA",
    color: "#8b5cf6",
    highlights: [
      "Founded coding communities",
      "Led technical workshops",
      "Published research paper",
      "Dean's List recognition",
    ],
  },
];

interface EducationCardProps {
  edu: typeof education[0];
  index: number;
}

function EducationCard({ edu, index }: EducationCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      className="relative p-6 rounded-2xl group transition-all duration-500 hover:scale-[1.01]"
      style={{
        background: "rgba(255,255,255,0.02)",
        border: "1px solid rgba(255,255,255,0.05)",
        backdropFilter: "blur(20px)",
      }}
    >
      {/* Hover gradient */}
      <div
        className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{
          background: `linear-gradient(135deg, ${edu.color}06 0%, transparent 60%)`,
        }}
      />

      <div className="relative z-10">
        {/* Icon + Header */}
        <div className="flex items-start gap-4 mb-5">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
            style={{
              background: `${edu.color}10`,
              border: `1px solid ${edu.color}20`,
            }}
          >
            <GraduationCap size={20} style={{ color: edu.color }} className="opacity-80" />
          </div>
          <div>
            <h3 className="font-['Syne'] text-white/90" style={{ fontSize: "16px" }}>
              {edu.institution}
            </h3>
            <p className="font-['Inter'] text-white/30" style={{ fontSize: "12px" }}>
              {edu.location}
            </p>
          </div>
        </div>

        {/* Degree + Period */}
        <div className="flex flex-wrap items-center gap-3 mb-5">
          <span className="font-['Inter'] text-indigo-400/60" style={{ fontSize: "13px" }}>
            {edu.degree}
          </span>
          <div className="w-1 h-1 rounded-full bg-white/10" />
          <span className="font-['Inter'] text-white/25" style={{ fontSize: "12px" }}>
            {edu.period}
          </span>
        </div>

        {/* GPA */}
        <div
          className="inline-flex items-center gap-3 px-4 py-2.5 rounded-xl mb-5"
          style={{
            background: "rgba(255,255,255,0.02)",
            border: "1px solid rgba(255,255,255,0.04)",
          }}
        >
          <span className="font-['Inter'] text-white/25" style={{ fontSize: "11px" }}>
            {edu.gpaLabel}
          </span>
          <span
            className="font-['Rajdhani'] text-white/90"
            style={{
              fontSize: "24px",
              background: `linear-gradient(135deg, #fff, ${edu.color})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {edu.gpa}
          </span>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {edu.highlights.map((highlight, i) => (
            <div key={i} className="flex items-start gap-2">
              <div className="w-1 h-1 rounded-full mt-2 flex-shrink-0" style={{ background: `${edu.color}40` }} />
              <span className="font-['Inter'] text-white/35" style={{ fontSize: "12px" }}>
                {highlight}
              </span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export function Education() {
  return (
    <section id="education" className="relative py-24">
      <div className="absolute inset-0" style={{ background: "linear-gradient(180deg, #07070d 0%, #0a0a14 50%, #07070d 100%)" }} />

      <div className="max-w-5xl mx-auto px-6 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-[1px] bg-indigo-500/40" />
            <span className="font-['Inter'] text-indigo-400/60 tracking-widest uppercase" style={{ fontSize: "11px" }}>
              Education
            </span>
          </div>
          <h2 className="font-['Syne'] text-white/90" style={{ fontSize: "32px" }}>
            Academic{" "}
            <span className="text-white/30">foundation.</span>
          </h2>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-12">
          {education.map((edu, index) => (
            <EducationCard key={index} edu={edu} index={index} />
          ))}
        </div>

        {/* Certification */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
          className="flex justify-center"
        >
          <div
            className="inline-flex items-center gap-4 px-6 py-4 rounded-2xl transition-all duration-500 hover:scale-[1.02]"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.05)",
              backdropFilter: "blur(20px)",
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: "rgba(245,158,11,0.08)", border: "1px solid rgba(245,158,11,0.15)" }}
            >
              <Award size={18} className="text-amber-400/80" />
            </div>
            <div>
              <p className="font-['Syne'] text-white/85" style={{ fontSize: "14px" }}>
                AWS Certified
              </p>
              <p className="font-['Inter'] text-white/30" style={{ fontSize: "11px" }}>
                Cloud Data Engineer  Associate
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
