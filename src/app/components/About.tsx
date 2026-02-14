import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// Seeded random for consistent visuals
function sr(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49311;
  return x - Math.floor(x);
}

const BIO_WORDS = [
  "Pragmatic", "Data", "Engineer", "with", "2+", "years",
  "of", "production", "experience", "building", "AWS-based",
  "data", "platforms,", "MLOps", "infrastructure,", "and",
  "real-time", "sensor", "systems."
];

const STAT_CHIPS = [
  { label: "1TB/day", color: "#6366f1" },
  { label: "99.9% uptime", color: "#34d399" },
  { label: "MAE 0.099%", color: "#f59e0b" },
];

const SKILL_ROOTS = [
  { label: "Cloud Engineering", angle: -50, length: 180, color: "#6366f1" },
  { label: "ML Infrastructure", angle: -25, length: 200, color: "#8b5cf6" },
  { label: "Data Pipelines", angle: 0, length: 220, color: "#3b82f6" },
  { label: "3D Vision", angle: 25, length: 190, color: "#14b8a6" },
  { label: "Net-Zero Systems", angle: 50, length: 170, color: "#34d399" },
];

const CITIES_INDIA = ["Coimbatore", "Bengaluru", "Noida", "Pune"];

const FOSSILS = [
  { label: "Jetson Nano", year: "2020", icon: "circuit", x: 25, y: 35 },
  { label: "FFT Waveform", year: "2020", icon: "wave", x: 55, y: 50 },
  { label: "Mech Eng", year: "2017", icon: "gear", x: 75, y: 30 },
];

export function About() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const tickingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;
    requestAnimationFrame(() => {
      if (!containerRef.current) { tickingRef.current = false; return; }
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) { tickingRef.current = false; return; }
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(progress);
      tickingRef.current = false;
    });
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Layer boundaries
  const layer = scrollProgress < 0.2 ? 1
    : scrollProgress < 0.4 ? 2
    : scrollProgress < 0.6 ? 3
    : scrollProgress < 0.82 ? 4
    : 5;

  const layerProgress = (p: number, start: number, end: number) =>
    Math.max(0, Math.min(1, (p - start) / (end - start)));

  const l1 = layerProgress(scrollProgress, 0, 0.2);
  const l2 = layerProgress(scrollProgress, 0.2, 0.4);
  const l3 = layerProgress(scrollProgress, 0.4, 0.6);
  const l4 = layerProgress(scrollProgress, 0.6, 0.82);
  const l5 = layerProgress(scrollProgress, 0.82, 1);

  // Background color interpolation based on depth
  const bgColor = scrollProgress < 0.2
    ? "#0a0e12"
    : scrollProgress < 0.4
      ? "#0d0a08"
      : scrollProgress < 0.6
        ? "#0b0808"
        : scrollProgress < 0.82
          ? "#080606"
          : "#0d0505";

  // Crack animation width
  const crackWidth = Math.min(1, l1 * 3);

  // Root grow progress (layer 2)
  const rootGrowFactor = l2;

  // Tectonic shift (layer 3)
  const tectonicShift = l3;

  // German crystal growth
  const germanGrowth = Math.min(1, l3 * 1.5);

  return (
    <section
      id="about"
      ref={containerRef}
      className="relative"
      style={{ height: "700vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: bgColor, transition: "background 0.8s ease" }}
      >
        {/* --- Left Depth Indicator --- */}
        <div className="absolute left-4 lg:left-8 top-0 bottom-0 z-30 flex flex-col items-center pointer-events-none">
          {/* Vertical ruler line */}
          <div className="absolute top-12 bottom-12 w-[1px]" style={{ background: "rgba(255,255,255,0.06)" }}>
            <div
              className="w-full rounded-full transition-all duration-500"
              style={{
                height: `${scrollProgress * 100}%`,
                background: "linear-gradient(180deg, rgba(99,102,241,0.4), rgba(245,158,11,0.3), rgba(239,68,68,0.3))",
              }}
            />
          </div>
          {/* Depth markers */}
          {[0, 5, 10, 15, 20].map((m, i) => (
            <div
              key={m}
              className="absolute flex items-center gap-2"
              style={{
                top: `${12 + (i / 4) * 76}%`,
                opacity: scrollProgress >= i * 0.2 ? 0.6 : 0.15,
                transition: "opacity 0.6s",
              }}
            >
              <div className="w-3 h-[1px]" style={{ background: "rgba(255,255,255,0.15)" }} />
              <span className="font-['JetBrains_Mono'] text-white/40" style={{ fontSize: "9px" }}>
                {m}m
              </span>
            </div>
          ))}
        </div>

        {/* --- Right Pickaxe Indicator --- */}
        <div
          className="absolute right-4 lg:right-8 z-30 pointer-events-none transition-all duration-300"
          style={{
            top: `${12 + scrollProgress * 76}%`,
            transform: l5 > 0.8 ? "rotate(45deg)" : "rotate(0deg)",
            transition: "top 0.3s ease-out, transform 0.5s ease",
          }}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M14 2L8 8L2 14L10 22L16 16L22 10L14 2Z" stroke="rgba(245,158,11,0.5)" strokeWidth="1.5" fill="rgba(245,158,11,0.05)" />
            <path d="M8 8L2 14" stroke="rgba(245,158,11,0.6)" strokeWidth="2" strokeLinecap="round" />
            <circle cx="14" cy="6" r="2" fill="rgba(245,158,11,0.3)" />
          </svg>
        </div>

        {/* --- Section Header --- */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-30">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-indigo-500/30" />
            <span className="font-['Inter'] text-indigo-400/50 tracking-widest uppercase" style={{ fontSize: "10px" }}>
              Excavate
            </span>
            <div className="w-8 h-[1px] bg-indigo-500/30" />
          </div>
        </div>

        {/* === LAYER 1: THE SURFACE (0–20%) === */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center px-8 lg:px-24"
          style={{
            opacity: layer <= 1 ? 1 : Math.max(0, 1 - (scrollProgress - 0.2) * 8),
            transform: `translateY(${layer > 1 ? -60 : 0}px)`,
            transition: "opacity 0.5s, transform 0.6s ease",
          }}
        >
          {/* Surface crack line */}
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 h-[2px] z-10"
            style={{
              width: `${crackWidth * 80}%`,
              background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.08), rgba(255,255,255,0.15), rgba(255,255,255,0.08), transparent)",
              opacity: crackWidth > 0 ? 1 : 0,
              transition: "width 0.8s ease-out",
            }}
          />
          {/* Fracture branches */}
          {crackWidth > 0.3 && (
            <svg className="absolute top-0 left-0 w-full h-20 pointer-events-none" style={{ opacity: crackWidth * 0.6 }}>
              <path d="M 50% 0 L 48% 40 L 45% 60" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" fill="none"
                style={{ strokeDasharray: 100, strokeDashoffset: 100 * (1 - crackWidth) }} />
              <path d="M 50% 0 L 53% 35 L 56% 55" stroke="rgba(255,255,255,0.04)" strokeWidth="0.5" fill="none"
                style={{ strokeDasharray: 100, strokeDashoffset: 100 * (1 - crackWidth) }} />
            </svg>
          )}

          {/* City skyline silhouette */}
          <div className="absolute top-8 left-1/2 -translate-x-1/2 w-full max-w-3xl pointer-events-none" style={{ opacity: 0.04 + l1 * 0.08 }}>
            <svg viewBox="0 0 800 100" className="w-full" fill="rgba(255,255,255,0.15)">
              <rect x="100" y="50" width="30" height="50" rx="2" />
              <rect x="140" y="30" width="25" height="70" rx="2" />
              <rect x="175" y="40" width="35" height="60" rx="2" />
              <rect x="220" y="20" width="20" height="80" rx="2" />
              <rect x="250" y="45" width="40" height="55" rx="2" />
              <rect x="310" y="35" width="28" height="65" rx="2" />
              <rect x="400" y="25" width="22" height="75" rx="2" />
              <rect x="440" y="55" width="45" height="45" rx="2" />
              <rect x="500" y="15" width="18" height="85" rx="2" />
              <rect x="530" y="40" width="35" height="60" rx="2" />
              <rect x="580" y="30" width="25" height="70" rx="2" />
              <rect x="620" y="50" width="30" height="50" rx="2" />
              {/* Church spire */}
              <polygon points="350,10 345,45 355,45" />
            </svg>
          </div>

          {/* Ground surface texture */}
          <div
            className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
            style={{
              background: "linear-gradient(0deg, rgba(34,80,50,0.08) 0%, transparent 100%)",
              opacity: Math.max(0, 1 - l1 * 2),
            }}
          />

          <div className="relative z-10 max-w-3xl w-full text-center space-y-8">
            {/* Compass Rose */}
            <div
              className="mx-auto w-20 h-20 relative"
              style={{
                opacity: l1 > 0.1 ? 1 : 0,
                transform: `scale(${l1 > 0.1 ? 1 : 0.8})`,
                transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
              }}
            >
              <svg viewBox="0 0 80 80" className="w-full h-full" style={{ animation: "spinSlow 20s linear infinite" }}>
                <circle cx="40" cy="40" r="35" fill="none" stroke="rgba(99,102,241,0.12)" strokeWidth="0.5" />
                <circle cx="40" cy="40" r="28" fill="none" stroke="rgba(99,102,241,0.08)" strokeWidth="0.5" strokeDasharray="2 3" />
                {/* N/S/E/W arrows */}
                <path d="M40 8 L38 18 L42 18 Z" fill="rgba(99,102,241,0.5)" />
                <path d="M40 72 L38 62 L42 62 Z" fill="rgba(255,255,255,0.15)" />
                <path d="M8 40 L18 38 L18 42 Z" fill="rgba(255,255,255,0.15)" />
                <path d="M72 40 L62 38 L62 42 Z" fill="rgba(255,255,255,0.15)" />
                <text x="40" y="6" textAnchor="middle" fill="rgba(99,102,241,0.5)" fontSize="4" fontFamily="'JetBrains Mono'">N</text>
              </svg>
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                <span className="font-['JetBrains_Mono'] text-indigo-400/40" style={{ fontSize: "9px" }}>
                  PRESENT · 2025 · BREMEN, DE
                </span>
              </div>
            </div>

            {/* Bio text — word by word */}
            <div className="mt-10">
              <p className="font-['Inter'] text-white/50 leading-relaxed" style={{ fontSize: "16px" }}>
                {BIO_WORDS.map((word, i) => {
                  const wordProgress = Math.max(0, Math.min(1, (l1 - 0.15 - i * 0.03) * 15));
                  return (
                    <span
                      key={i}
                      className="inline-block mr-[6px]"
                      style={{
                        opacity: wordProgress,
                        transform: `translateY(${(1 - wordProgress) * 12}px)`,
                        transition: "all 0.4s cubic-bezier(0.22,1,0.36,1)",
                      }}
                    >
                      {word}
                    </span>
                  );
                })}
              </p>
            </div>

            {/* Stat chips */}
            <div className="flex justify-center gap-4 mt-6">
              {STAT_CHIPS.map((chip, i) => (
                <div
                  key={chip.label}
                  className="px-4 py-2 rounded-xl"
                  style={{
                    background: `${chip.color}08`,
                    border: `1px solid ${chip.color}18`,
                    backdropFilter: "blur(16px)",
                    opacity: l1 > 0.5 + i * 0.1 ? 1 : 0,
                    transform: `translateY(${l1 > 0.5 + i * 0.1 ? 0 : 16}px) scale(${l1 > 0.5 + i * 0.1 ? 1 : 0.9})`,
                    transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${i * 100}ms`,
                  }}
                >
                  <span className="font-['JetBrains_Mono']" style={{ fontSize: "12px", color: `${chip.color}cc` }}>
                    {chip.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === LAYER 2: THE CRAFT (20–40%) === */}
        <div
          className="absolute inset-0 flex items-center justify-center px-8 lg:px-24"
          style={{
            opacity: layer === 2 ? 1 : layer === 3 ? Math.max(0, 1 - (scrollProgress - 0.4) * 6) : 0,
            transform: `translateY(${layer < 2 ? 80 : layer > 2 ? -60 : 0}px)`,
            transition: "opacity 0.6s, transform 0.7s ease",
            pointerEvents: layer === 2 ? "auto" : "none",
          }}
        >
          {/* Soil texture overlay */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.03 }}>
            <div className="absolute inset-0" style={{
              backgroundImage: "radial-gradient(circle, rgba(139,90,43,0.3) 0.5px, transparent 0.5px)",
              backgroundSize: "12px 12px",
            }} />
          </div>

          <div className="max-w-4xl w-full flex flex-col lg:flex-row items-center gap-12">
            {/* Roots SVG */}
            <div className="flex-shrink-0 relative" style={{ width: "320px", height: "380px" }}>
              <svg viewBox="0 0 320 380" className="w-full h-full">
                {/* Ground surface */}
                <line x1="0" y1="30" x2="320" y2="30" stroke="rgba(34,80,50,0.15)" strokeWidth="2" />
                <text x="160" y="20" textAnchor="middle" fill="rgba(255,255,255,0.15)" fontSize="8" fontFamily="'Inter'">
                  SURFACE
                </text>

                {/* Skill roots growing down */}
                {SKILL_ROOTS.map((root, i) => {
                  const startX = 120 + i * 20;
                  const rootProgress = Math.max(0, Math.min(1, (rootGrowFactor - i * 0.1) * 2.5));
                  const endX = startX + Math.sin((root.angle * Math.PI) / 180) * root.length * rootProgress;
                  const endY = 30 + Math.cos((root.angle * Math.PI) / 180) * root.length * rootProgress;

                  // Control points for curve
                  const cx1 = startX + Math.sin((root.angle * Math.PI) / 180) * root.length * 0.4;
                  const cy1 = 30 + root.length * 0.3;
                  const cx2 = startX + Math.sin((root.angle * Math.PI) / 180) * root.length * 0.7;
                  const cy2 = 30 + root.length * 0.6;

                  const pathD = `M ${startX} 30 C ${cx1} ${cy1}, ${cx2} ${cy2}, ${endX} ${endY}`;

                  return (
                    <g key={root.label}>
                      <path
                        d={pathD}
                        fill="none"
                        stroke={root.color}
                        strokeWidth="1.5"
                        strokeOpacity={0.35 * rootProgress}
                        strokeLinecap="round"
                        style={{
                          strokeDasharray: root.length * 1.5,
                          strokeDashoffset: root.length * 1.5 * (1 - rootProgress),
                          transition: "stroke-dashoffset 0.8s ease-out",
                        }}
                      />
                      {/* Root label */}
                      {rootProgress > 0.7 && (
                        <text
                          x={endX}
                          y={endY + 14}
                          textAnchor="middle"
                          fill={root.color}
                          fontSize="7"
                          fontFamily="'Inter'"
                          opacity={0.6 * Math.min(1, (rootProgress - 0.7) * 3.3)}
                        >
                          {root.label}
                        </text>
                      )}
                      {/* Root tip glow */}
                      {rootProgress > 0.3 && (
                        <circle
                          cx={endX}
                          cy={endY}
                          r={3}
                          fill={root.color}
                          opacity={0.25 * rootProgress}
                        />
                      )}
                    </g>
                  );
                })}

                {/* Stone band (pivot layer) */}
                <rect
                  x="0" y="240" width="320" height="12" rx="2"
                  fill="rgba(120,120,120,0.08)"
                  stroke="rgba(120,120,120,0.1)"
                  strokeWidth="0.5"
                  style={{
                    opacity: l2 > 0.5 ? 1 : 0,
                    transition: "opacity 0.8s",
                  }}
                />
                {l2 > 0.6 && (
                  <text x="160" y="250" textAnchor="middle" fill="rgba(255,255,255,0.3)" fontSize="6" fontFamily="'JetBrains Mono'">
                    PIVOT: MECHANICAL → DATA
                  </text>
                )}
              </svg>
            </div>

            {/* Text content */}
            <div className="flex-1 space-y-6 text-center lg:text-left">
              {/* AWS Badge crystallizing */}
              <div
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl"
                style={{
                  background: "rgba(245,158,11,0.06)",
                  border: "1px solid rgba(245,158,11,0.12)",
                  opacity: l2 > 0.3 ? 1 : 0,
                  transform: `scale(${l2 > 0.3 ? 1 : 0.3})`,
                  filter: l2 > 0.5 ? "blur(0px)" : "blur(4px)",
                  transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
                }}
              >
                <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
                  <path d="M14 0L28 8V24L14 32L0 24V8L14 0Z" fill="rgba(245,158,11,0.15)" stroke="rgba(245,158,11,0.4)" strokeWidth="0.5" />
                  <text x="14" y="18" textAnchor="middle" fill="rgba(245,158,11,0.8)" fontSize="8" fontFamily="'Inter'" fontWeight="600">
                    AWS
                  </text>
                </svg>
                <div>
                  <p className="font-['Inter'] text-amber-400/80" style={{ fontSize: "13px" }}>AWS Certified</p>
                  <p className="font-['Inter'] text-white/25" style={{ fontSize: "10px" }}>Cloud Data Engineer</p>
                </div>
              </div>

              {/* Quote */}
              <div style={{
                opacity: l2 > 0.5 ? 1 : 0,
                transition: "opacity 0.8s",
              }}>
                <p className="font-['Inter'] text-white/30 italic" style={{ fontSize: "15px", lineHeight: 1.7 }}>
                  {'"Expert in the model development loop"'.split(" ").map((word, i) => (
                    <span
                      key={i}
                      className="inline-block mr-[5px]"
                      style={{
                        opacity: l2 > 0.5 + i * 0.04 ? 1 : 0,
                        transform: `translateY(${l2 > 0.5 + i * 0.04 ? 0 : 10}px)`,
                        transition: "all 0.5s ease",
                      }}
                    >
                      {word}
                    </span>
                  ))}
                </p>
              </div>

              {/* Pivot text */}
              <div
                className="p-4 rounded-xl"
                style={{
                  background: "rgba(255,255,255,0.02)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  opacity: l2 > 0.7 ? 1 : 0,
                  transform: `translateY(${l2 > 0.7 ? 0 : 12}px)`,
                  transition: "all 0.6s ease",
                }}
              >
                <div className="flex items-center gap-3">
                  <span className="font-['Inter'] text-white/30" style={{ fontSize: "12px" }}>Mechanical Eng</span>
                  <div className="flex-1 h-[1px] relative" style={{ background: "rgba(255,255,255,0.06)" }}>
                    <div
                      className="absolute top-0 left-0 h-full bg-indigo-500/40 rounded-full"
                      style={{ width: `${Math.min(100, (l2 - 0.7) * 333)}%`, transition: "width 0.6s" }}
                    />
                  </div>
                  <span className="font-['Inter'] text-indigo-400/60" style={{ fontSize: "12px" }}>Data Engineering</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* === LAYER 3: THE JOURNEY (40–60%) === */}
        <div
          className="absolute inset-0 flex items-center justify-center px-8 lg:px-24"
          style={{
            opacity: layer === 3 ? 1 : layer === 4 ? Math.max(0, 1 - (scrollProgress - 0.6) * 6) : 0,
            transform: `translateY(${layer < 3 ? 80 : layer > 3 ? -60 : 0}px)`,
            transition: "opacity 0.6s, transform 0.7s ease",
            pointerEvents: layer === 3 ? "auto" : "none",
          }}
        >
          {/* Mineral vein accents */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: 0.06 }}>
            <line x1="10%" y1="20%" x2="40%" y2="80%" stroke="#6366f1" strokeWidth="0.5" strokeDasharray="4 8" />
            <line x1="60%" y1="15%" x2="90%" y2="75%" stroke="#8b5cf6" strokeWidth="0.5" strokeDasharray="4 8" />
            <line x1="30%" y1="10%" x2="70%" y2="90%" stroke="#3b82f6" strokeWidth="0.3" strokeDasharray="3 10" />
          </svg>

          <div className="relative z-10 max-w-4xl w-full space-y-10">
            {/* Tectonic plates */}
            <div className="relative h-32 overflow-hidden rounded-xl" style={{ background: "rgba(255,255,255,0.01)", border: "1px solid rgba(255,255,255,0.04)" }}>
              {/* India slab */}
              <div
                className="absolute top-0 h-full flex items-center justify-center gap-4 px-8 rounded-l-xl"
                style={{
                  left: 0,
                  width: "55%",
                  background: "rgba(245,158,11,0.03)",
                  borderRight: "2px solid rgba(245,158,11,0.15)",
                  transform: `translateX(${-tectonicShift * 30}px)`,
                  transition: "transform 1s ease-out",
                }}
              >
                {CITIES_INDIA.map((city, i) => (
                  <span
                    key={city}
                    className="font-['JetBrains_Mono'] text-amber-400/40"
                    style={{
                      fontSize: "11px",
                      opacity: l3 > i * 0.15 ? 1 : 0,
                      transition: `opacity 0.5s ${i * 100}ms`,
                    }}
                  >
                    {city}
                  </span>
                ))}
              </div>
              {/* Germany slab */}
              <div
                className="absolute top-0 right-0 h-full flex items-center justify-center px-8 rounded-r-xl"
                style={{
                  width: "45%",
                  background: "rgba(99,102,241,0.03)",
                  borderLeft: "2px solid rgba(99,102,241,0.15)",
                  transform: `translateX(${tectonicShift * 20}px)`,
                  transition: "transform 1s ease-out",
                }}
              >
                <span className="font-['JetBrains_Mono'] text-indigo-400/60" style={{ fontSize: "14px" }}>
                  Bremen 🇩🇪
                </span>
              </div>
              {/* Friction sparks */}
              {l3 > 0.4 && (
                <div className="absolute top-1/2 left-[55%] -translate-x-1/2 -translate-y-1/2">
                  {[...Array(6)].map((_, i) => (
                    <div
                      key={i}
                      className="absolute w-1 h-1 rounded-full bg-amber-400/60"
                      style={{
                        left: `${sr(i * 7) * 20 - 10}px`,
                        top: `${sr(i * 11) * 20 - 10}px`,
                        opacity: l3 > 0.5 ? sr(i * 3) : 0,
                        animation: `sparkle ${0.5 + sr(i * 5) * 0.5}s ease-out ${sr(i * 13) * 0.3}s infinite`,
                      }}
                    />
                  ))}
                </div>
              )}
              {/* Relocated label */}
              <div
                className="absolute bottom-2 left-1/2 -translate-x-1/2"
                style={{
                  opacity: l3 > 0.5 ? 1 : 0,
                  transition: "opacity 0.6s",
                }}
              >
                <span className="font-['JetBrains_Mono'] text-white/25" style={{ fontSize: "9px" }}>
                  RELOCATED · 2024
                </span>
              </div>
            </div>

            {/* Language crystals */}
            <div className="flex flex-wrap justify-center gap-6">
              {[
                { lang: "Tamil", level: "Native", size: 72, color: "#f59e0b", facets: true, growing: false },
                { lang: "English", level: "C1", size: 64, color: "#6366f1", facets: true, growing: false },
                { lang: "Hindi", level: "B2", size: 52, color: "#8b5cf6", facets: true, growing: false },
                { lang: "German", level: "B1", size: 44, color: "#34d399", facets: false, growing: true },
              ].map((crystal, i) => {
                const crystalOpacity = Math.max(0, Math.min(1, (l3 - 0.3 - i * 0.12) * 4));
                return (
                  <div
                    key={crystal.lang}
                    className="flex flex-col items-center gap-2"
                    style={{
                      opacity: crystalOpacity,
                      transform: `translateY(${(1 - crystalOpacity) * 20}px) scale(${0.8 + crystalOpacity * 0.2})`,
                      transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    <svg width={crystal.size} height={crystal.size * 1.3} viewBox="0 0 60 78">
                      {/* Crystal shape */}
                      <polygon
                        points="30,2 55,22 50,60 10,60 5,22"
                        fill={`${crystal.color}12`}
                        stroke={crystal.color}
                        strokeWidth="1"
                        strokeOpacity={crystal.growing ? germanGrowth * 0.6 : 0.4}
                      />
                      {crystal.facets && (
                        <>
                          <line x1="30" y1="2" x2="30" y2="60" stroke={crystal.color} strokeWidth="0.3" strokeOpacity="0.2" />
                          <line x1="5" y1="22" x2="55" y2="22" stroke={crystal.color} strokeWidth="0.3" strokeOpacity="0.15" />
                        </>
                      )}
                      {/* Growing crystal animation */}
                      {crystal.growing && germanGrowth < 1 && (
                        <polygon
                          points="30,2 55,22 50,60 10,60 5,22"
                          fill="none"
                          stroke={crystal.color}
                          strokeWidth="1.5"
                          strokeOpacity={0.4}
                          strokeDasharray="200"
                          strokeDashoffset={200 * (1 - germanGrowth)}
                        />
                      )}
                      {/* Sparkle on German crystal */}
                      {crystal.growing && (
                        <circle cx="38" cy="15" r="2" fill={crystal.color} opacity="0.6">
                          <animate attributeName="opacity" values="0.6;0.1;0.6" dur="2s" repeatCount="indefinite" />
                          <animate attributeName="r" values="1.5;3;1.5" dur="2s" repeatCount="indefinite" />
                        </circle>
                      )}
                    </svg>
                    <span className="font-['Inter']" style={{ fontSize: "12px", color: `${crystal.color}bb` }}>
                      {crystal.lang}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-white/25" style={{ fontSize: "9px" }}>
                      {crystal.level}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* === LAYER 4: BEDROCK (60–82%) === */}
        <div
          className="absolute inset-0 flex items-center justify-center px-8 lg:px-24"
          style={{
            opacity: layer === 4 ? 1 : layer === 5 ? Math.max(0, 1 - (scrollProgress - 0.82) * 8) : 0,
            transform: `translateY(${layer < 4 ? 80 : layer > 4 ? -40 : 0}px)`,
            transition: "opacity 0.6s, transform 0.7s ease",
            pointerEvents: layer === 4 ? "auto" : "none",
          }}
        >
          {/* Dense rock texture */}
          <div className="absolute inset-0 pointer-events-none" style={{ opacity: 0.015 }}>
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "radial-gradient(circle, rgba(100,80,60,0.5) 0.3px, transparent 0.3px)",
              backgroundSize: "8px 8px",
            }} />
          </div>

          <div className="relative z-10 max-w-4xl w-full">
            {/* Fossils */}
            <div className="relative h-80 mx-auto max-w-2xl">
              {FOSSILS.map((fossil, i) => {
                const fossilShow = Math.max(0, Math.min(1, (l4 - 0.1 - i * 0.2) * 3));
                return (
                  <div
                    key={fossil.label}
                    className="absolute group"
                    style={{
                      left: `${fossil.x}%`,
                      top: `${fossil.y}%`,
                      transform: `translate(-50%, -50%) scale(${0.6 + fossilShow * 0.4})`,
                      opacity: fossilShow,
                      transition: "all 0.8s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {/* Fossil shape */}
                    <div
                      className="relative w-24 h-24 rounded-xl flex items-center justify-center"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        boxShadow: fossilShow > 0.8 ? "0 0 20px rgba(245,158,11,0.05), inset 0 0 20px rgba(245,158,11,0.02)" : "none",
                      }}
                    >
                      {/* Fossil icons */}
                      {fossil.icon === "circuit" && (
                        <svg width="48" height="48" viewBox="0 0 48 48" opacity="0.3">
                          <rect x="8" y="8" width="32" height="32" rx="4" fill="none" stroke="rgba(99,102,241,0.5)" strokeWidth="1" />
                          <circle cx="16" cy="16" r="2" fill="rgba(99,102,241,0.4)" />
                          <circle cx="32" cy="16" r="2" fill="rgba(99,102,241,0.4)" />
                          <circle cx="16" cy="32" r="2" fill="rgba(99,102,241,0.4)" />
                          <circle cx="32" cy="32" r="2" fill="rgba(99,102,241,0.4)" />
                          <line x1="16" y1="16" x2="32" y2="32" stroke="rgba(99,102,241,0.3)" strokeWidth="0.5" />
                          <line x1="32" y1="16" x2="16" y2="32" stroke="rgba(99,102,241,0.3)" strokeWidth="0.5" />
                        </svg>
                      )}
                      {fossil.icon === "wave" && (
                        <svg width="48" height="32" viewBox="0 0 48 32" opacity="0.3">
                          <path d="M4 16 Q10 4 16 16 Q22 28 28 16 Q34 4 40 16 Q44 24 48 16"
                            fill="none" stroke="rgba(139,92,246,0.5)" strokeWidth="1.5" />
                        </svg>
                      )}
                      {fossil.icon === "gear" && (
                        <svg width="44" height="44" viewBox="0 0 44 44" opacity="0.3">
                          <circle cx="22" cy="22" r="10" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" />
                          <circle cx="22" cy="22" r="4" fill="rgba(245,158,11,0.2)" />
                          {[...Array(8)].map((_, t) => {
                            const angle = (t * Math.PI * 2) / 8;
                            return (
                              <rect
                                key={t}
                                x={22 + Math.cos(angle) * 13 - 2}
                                y={22 + Math.sin(angle) * 13 - 3}
                                width="4" height="6" rx="1"
                                fill="rgba(245,158,11,0.25)"
                                transform={`rotate(${(t * 360) / 8} ${22 + Math.cos(angle) * 13} ${22 + Math.sin(angle) * 13})`}
                              />
                            );
                          })}
                        </svg>
                      )}
                    </div>
                    {/* Label */}
                    <div className="mt-2 text-center">
                      <p className="font-['JetBrains_Mono'] text-white/30" style={{ fontSize: "10px" }}>{fossil.label}</p>
                      <p className="font-['JetBrains_Mono'] text-white/15" style={{ fontSize: "8px" }}>{fossil.year}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chiseled text */}
            <div className="text-center mt-4">
              <p className="font-['Syne'] text-white/20" style={{ fontSize: "16px", letterSpacing: "2px" }}>
                {"Founded coding communities to foster technical learning".split("").map((char, i) => {
                  const charShow = l4 > 0.5 + i * 0.006 ? 1 : 0;
                  return (
                    <span
                      key={i}
                      style={{
                        opacity: charShow,
                        display: "inline-block",
                        transform: charShow ? "translateY(0)" : "translateY(4px)",
                        transition: `all 0.15s ease ${i * 15}ms`,
                      }}
                    >
                      {char === " " ? "\u00A0" : char}
                    </span>
                  );
                })}
              </p>
            </div>
          </div>
        </div>

        {/* === LAYER 5: MAGMA CORE (82–100%) === */}
        <div
          className="absolute inset-0 flex items-center justify-center px-8 lg:px-24"
          style={{
            opacity: layer === 5 ? 1 : 0,
            transform: `translateY(${layer < 5 ? 60 : 0}px)`,
            transition: "opacity 0.6s, transform 0.7s ease",
            pointerEvents: layer === 5 ? "auto" : "none",
          }}
        >
          {/* Magma glow from below */}
          <div
            className="absolute bottom-0 left-0 right-0 pointer-events-none"
            style={{
              height: `${40 + l5 * 30}%`,
              background: `radial-gradient(ellipse at 50% 100%, rgba(239,68,68,${0.03 + l5 * 0.04}) 0%, rgba(245,158,11,${0.02 + l5 * 0.02}) 30%, transparent 70%)`,
              transition: "height 0.8s, background 0.8s",
            }}
          />

          {/* Ambient heat particles */}
          {l5 > 0.2 && [...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 rounded-full"
              style={{
                left: `${20 + sr(i * 7) * 60}%`,
                bottom: `${10 + sr(i * 3) * 30}%`,
                background: `rgba(${200 + sr(i * 11) * 55}, ${80 + sr(i * 13) * 80}, ${20 + sr(i * 17) * 30}, 0.4)`,
                animation: `floatUp ${2 + sr(i * 5) * 2}s ease-out ${sr(i * 19) * 1.5}s infinite`,
              }}
            />
          ))}

          <div className="relative z-10 text-center space-y-8">
            {/* Core quote */}
            <h3
              className="font-['Syne'] mx-auto max-w-lg"
              style={{
                fontSize: "28px",
                lineHeight: 1.4,
                background: "linear-gradient(135deg, #fff, #f59e0b, #ef4444)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                opacity: l5 > 0.2 ? 1 : 0,
                filter: `blur(${Math.max(0, (1 - l5 * 2) * 4)}px)`,
                transition: "all 1s ease",
              }}
            >
              Shipping SOTA models. Startup mindset. Always.
            </h3>

            {/* Heartbeat pulse */}
            {l5 > 0.5 && (
              <div className="flex justify-center">
                <svg width="120" height="40" viewBox="0 0 120 40">
                  <path
                    d="M10 20 L30 20 L38 8 L46 32 L54 8 L62 32 L70 20 L110 20"
                    fill="none"
                    stroke="rgba(239,68,68,0.4)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    style={{
                      strokeDasharray: 200,
                      strokeDashoffset: 200 * Math.max(0, 1 - (l5 - 0.5) * 3),
                      transition: "stroke-dashoffset 1.2s ease-out",
                    }}
                  />
                </svg>
              </div>
            )}

            {/* Pickaxe planted */}
            {l5 > 0.8 && (
              <div className="flex justify-center" style={{ opacity: Math.min(1, (l5 - 0.8) * 5) }}>
                <span className="font-['JetBrains_Mono'] text-white/20" style={{ fontSize: "10px" }}>
                  ⛏ planted at bedrock
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Layer label indicator */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30">
          <AnimatePresence mode="wait">
            <motion.div
              key={layer}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="px-4 py-1.5 rounded-full"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}
            >
              <span className="font-['JetBrains_Mono'] text-white/25" style={{ fontSize: "9px" }}>
                {layer === 1 ? "THE SURFACE — PRESENT" :
                 layer === 2 ? "SHALLOW EARTH — THE CRAFT" :
                 layer === 3 ? "DEEP EARTH — THE JOURNEY" :
                 layer === 4 ? "BEDROCK — THE ORIGIN" :
                 "MAGMA CORE — THE DRIVE"}
              </span>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes sparkle {
          0% { opacity: 0.6; transform: scale(1); }
          50% { opacity: 0; transform: scale(0.3) translateY(-8px); }
          100% { opacity: 0; transform: scale(0) translateY(-16px); }
        }
        @keyframes floatUp {
          0% { opacity: 0.4; transform: translateY(0); }
          100% { opacity: 0; transform: translateY(-60px); }
        }
      `}</style>
    </section>
  );
}