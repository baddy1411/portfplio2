import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";

// --- Data ---
const BOOT_LINES = [
  "BADRISH OS v2.0 — INITIALIZING",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
  "RAM CHECK:         8/8 CORES OK",
  "SKILL MODULES:     LOADING...",
  "EXPERIENCE ENGINE: MOUNTING...",
  "PIPELINE RUNTIME:  CONNECTED",
  "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
];

const TERMINAL_LINES = [
  { text: "$ python --version", color: "#34d399" },
  { text: "Python 3.11.4", color: "rgba(255,255,255,0.4)" },
  { text: "", color: "" },
  { text: "$ import torch, spark, pandas, sklearn", color: "#34d399" },
  { text: "[✓] All modules loaded", color: "#6366f1" },
  { text: "", color: "" },
  { text: "$ run pipeline --scale 1TB --daily", color: "#34d399" },
  { text: "Pipeline status: ██████████ 100% · 0 errors", color: "#818cf8" },
];

const PROCESSES = [
  { name: "apache-spark", cpu: 0.7, status: "RUNNING", note: "1TB/day pipelines" },
  { name: "airflow-scheduler", cpu: 0.5, status: "RUNNING", note: "DAG orchestration" },
  { name: "aws-glue-etl", cpu: 0.85, status: "ACTIVE", note: "ETL transforms" },
  { name: "kafka-consumer", cpu: 0.35, status: "LISTENING", note: "Event streaming" },
  { name: "dbt-transform", cpu: 0.65, status: "RUNNING", note: "Data modeling" },
  { name: "kubernetes-daemon", cpu: 0.55, status: "HEALTHY", note: "Container orchestration" },
];

const CLOUD_SERVICES = [
  { name: "S3", x: 20, y: 30, icon: "📦", color: "#34d399" },
  { name: "Lambda", x: 50, y: 20, icon: "⚡", color: "#f59e0b" },
  { name: "SageMaker", x: 50, y: 55, icon: "🧠", color: "#8b5cf6" },
  { name: "EKS", x: 80, y: 35, icon: "⎈", color: "#3b82f6" },
  { name: "API GW", x: 20, y: 65, icon: "🌐", color: "#6366f1" },
  { name: "CloudWatch", x: 80, y: 70, icon: "📊", color: "#ef4444" },
];

const DB_CONNECTIONS = [
  { name: "PostgreSQL", ping: "12ms", status: "CONNECTED", color: "#336791" },
  { name: "MongoDB", ping: "8ms", status: "CONNECTED", color: "#47A248" },
  { name: "DynamoDB", ping: "3ms", status: "CONNECTED", color: "#4053D6" },
  { name: "Aurora", ping: "—", status: "STANDBY", color: "#FF9900" },
  { name: "MySQL", ping: "15ms", status: "CONNECTED", color: "#4479A1" },
  { name: "Timestream", ping: "↑", status: "STREAMING", color: "#8b5cf6" },
];

const SKILL_CHIPS_LANG = ["Python", "SQL", "C++", "TypeScript", "Bash"];
const ML_LABELS = ["PyTorch", "Voxel51", "Foxglove", "MLflow", "Pandera"];

const TASKBAR_ICONS = [
  { label: "Terminal", icon: ">_" },
  { label: "Monitor", icon: "📊" },
  { label: "ML Studio", icon: "🧊" },
  { label: "AWS", icon: "☁️" },
  { label: "Databases", icon: "💾" },
];

const TOOLS_TICKER = [
  { name: "Python", color: "#34d399", icon: "🐍" },
  { name: "TypeScript", color: "#3178c6", icon: "TS" },
  { name: "AWS", color: "#ff9900", icon: "☁️" },
  { name: "Kubernetes", color: "#326ce5", icon: "⎈" },
  { name: "Docker", color: "#2496ed", icon: "🐳" },
  { name: "Kafka", color: "#231f20", icon: "📨" },
  { name: "Spark", color: "#e25a1c", icon: "⚡" },
  { name: "Airflow", color: "#017cee", icon: "💨" },
  { name: "Terraform", color: "#623ce4", icon: "🏗️" },
  { name: "PostgreSQL", color: "#336791", icon: "🐘" },
  { name: "React", color: "#61dafb", icon: "⚛️" },
  { name: "Next.js", color: "#000000", icon: "▲" },
  { name: "Tailwind", color: "#38bdf8", icon: "🌊" },
  { name: "PyTorch", color: "#ee4c2c", icon: "🔥" },
  { name: "Scikit-learn", color: "#f7931e", icon: "🧠" },
];

function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49311;
  return x - Math.floor(x);
}

// Window component
function OSWindow({
  title,
  children,
  visible,
  delay = 0,
  className = "",
  style = {},
  active = false,
}: {
  title: string;
  children: React.ReactNode;
  visible: boolean;
  delay?: number;
  className?: string;
  style?: React.CSSProperties;
  active?: boolean;
}) {
  return (
    <div
      className={`absolute rounded-xl overflow-hidden ${className}`}
      style={{
        background: "rgba(20,20,30,0.85)",
        border: `1px solid ${active ? "rgba(99,102,241,0.2)" : "rgba(255,255,255,0.06)"}`,
        backdropFilter: "blur(24px)",
        boxShadow: active
          ? "0 20px 60px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.1)"
          : "0 12px 40px rgba(0,0,0,0.5)",
        opacity: visible ? 1 : 0,
        transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(20px)",
        transition: `all 0.6s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
        pointerEvents: visible ? "auto" : "none",
        ...style,
      }}
    >
      {/* Title bar */}
      <div className="flex items-center gap-2 px-3 py-2" style={{ background: "rgba(255,255,255,0.03)", borderBottom: "1px solid rgba(255,255,255,0.04)" }}>
        <div className="flex items-center gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-red-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-amber-400/50" />
          <div className="w-2.5 h-2.5 rounded-full bg-emerald-400/50" />
        </div>
        <span className="font-['JetBrains_Mono'] text-white/25 ml-2" style={{ fontSize: "10px" }}>
          {title}
        </span>
      </div>
      {/* Content */}
      <div className="p-3">
        {children}
      </div>
    </div>
  );
}

export function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState("");
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const hoverTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const tickingRef = useRef(false);

  // Real clock
  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: false }));
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, []);

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

  // Phase calculations
  const bootPhase = scrollProgress < 0.25; // 0-25%: boot sequence
  const bootProgress = Math.min(1, scrollProgress / 0.25);

  // Window visibility: each appears over a scroll range
  const w1Visible = scrollProgress > 0.22; // Terminal
  const w2Visible = scrollProgress > 0.35; // Activity Monitor
  const w3Visible = scrollProgress > 0.48; // ML Viewport
  const w4Visible = scrollProgress > 0.61; // Cloud Dashboard
  const w5Visible = scrollProgress > 0.74; // Database Client

  // Active window
  const activeWindow = scrollProgress < 0.35 ? 0
    : scrollProgress < 0.48 ? 1
      : scrollProgress < 0.61 ? 2
        : scrollProgress < 0.74 ? 3
          : 4;

  // Terminal typing progress
  const terminalProgress = Math.max(0, Math.min(1, (scrollProgress - 0.22) / 0.15));
  const visibleTermLines = Math.floor(terminalProgress * TERMINAL_LINES.length);

  // Process animation
  const processProgress = Math.max(0, Math.min(1, (scrollProgress - 0.35) / 0.15));

  // ML cube convergence
  const mlProgress = Math.max(0, Math.min(1, (scrollProgress - 0.48) / 0.15));

  // Cloud assembly
  const cloudProgress = Math.max(0, Math.min(1, (scrollProgress - 0.61) / 0.15));

  // DB connections
  const dbProgress = Math.max(0, Math.min(1, (scrollProgress - 0.74) / 0.15));

  // Boot loading bar
  const bootBarWidth = Math.min(100, bootProgress * 120);

  // Animated CPU values
  const [cpuJitter, setCpuJitter] = useState<number[]>(PROCESSES.map(() => 0));
  useEffect(() => {
    if (!w2Visible) return;
    const id = setInterval(() => {
      setCpuJitter(PROCESSES.map((_, i) => (Math.sin(Date.now() / (800 + i * 200)) * 0.15)));
    }, 200);
    return () => clearInterval(id);
  }, [w2Visible]);

  const handleDesktopHover = () => {
    if (showEasterEgg) return;
    hoverTimerRef.current = setTimeout(() => setShowEasterEgg(true), 2000);
  };
  const handleDesktopLeave = () => {
    if (hoverTimerRef.current) clearTimeout(hoverTimerRef.current);
  };

  return (
    <section
      id="stack"
      ref={containerRef}
      className="relative"
      style={{ height: "700vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "#07070d" }}
        onMouseEnter={handleDesktopHover}
        onMouseLeave={handleDesktopLeave}
      >
        {/* Desktop wallpaper — abstract data graph */}
        <div className="absolute inset-0 pointer-events-none" style={{ opacity: bootPhase ? 0 : 0.04 + scrollProgress * 0.02 }}>
          <svg className="w-full h-full" viewBox="0 0 1000 600" preserveAspectRatio="none">
            <path
              d="M0 400 Q100 380 200 390 Q300 350 400 370 Q500 310 600 350 Q700 330 800 360 Q900 340 1000 350"
              fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1"
            >
              <animate attributeName="d"
                values="M0 400 Q100 380 200 390 Q300 350 400 370 Q500 310 600 350 Q700 330 800 360 Q900 340 1000 350;M0 390 Q100 400 200 380 Q300 370 400 360 Q500 340 600 370 Q700 350 800 340 Q900 360 1000 370;M0 400 Q100 380 200 390 Q300 350 400 370 Q500 310 600 350 Q700 330 800 360 Q900 340 1000 350"
                dur="8s" repeatCount="indefinite" />
            </path>
            <path
              d="M0 420 Q100 410 200 425 Q300 400 400 410 Q500 390 600 405 Q700 395 800 400 Q900 385 1000 395"
              fill="none" stroke="rgba(139,92,246,0.15)" strokeWidth="0.5"
            >
              <animate attributeName="d"
                values="M0 420 Q100 410 200 425 Q300 400 400 410 Q500 390 600 405 Q700 395 800 400 Q900 385 1000 395;M0 415 Q100 425 200 410 Q300 415 400 400 Q500 410 600 395 Q700 405 800 410 Q900 400 1000 390;M0 420 Q100 410 200 425 Q300 400 400 410 Q500 390 600 405 Q700 395 800 400 Q900 385 1000 395"
                dur="10s" repeatCount="indefinite" />
            </path>
          </svg>
        </div>

        {/* Section label */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 z-40">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-indigo-500/30" />
            <span className="font-['Inter'] text-indigo-400/50 tracking-widest uppercase" style={{ fontSize: "10px" }}>
              Tech Stack
            </span>
            <div className="w-8 h-[1px] bg-indigo-500/30" />
          </div>
        </div>

        {/* Rolling Tool Band */}
        <div
          className="absolute top-16 left-0 right-0 z-30 overflow-hidden py-2"
          style={{
            background: "linear-gradient(90deg, transparent, rgba(7,7,13,0.8), transparent)",
            maskImage: "linear-gradient(90deg, transparent, #000 10%, #000 90%, transparent)",
            opacity: bootPhase ? 0 : 1,
            transition: "opacity 1s ease 0.5s"
          }}
        >
          <div
            className="flex items-center gap-12 w-max"
            style={{ animation: "ticker 40s linear infinite" }}
          >
            {[...TOOLS_TICKER, ...TOOLS_TICKER, ...TOOLS_TICKER, ...TOOLS_TICKER].map((tool, i) => (
              <div key={i} className="flex items-center gap-2.5 opacity-60 hover:opacity-100 transition-opacity">
                <div
                  className="w-8 h-8 rounded flex items-center justify-center text-lg"
                  style={{ background: `${tool.color}15`, border: `1px solid ${tool.color}30` }}
                >
                  {tool.icon}
                </div>
                <span className="font-['JetBrains_Mono'] text-white/50 text-xs tracking-wider">
                  {tool.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* === BOOT SEQUENCE === */}
        <div
          className="absolute inset-0 flex items-center justify-center z-30"
          style={{
            opacity: bootPhase ? 1 : 0,
            transition: "opacity 0.6s",
            pointerEvents: bootPhase ? "auto" : "none",
          }}
        >
          <div className="w-full max-w-lg px-6">
            <div
              className="p-6 rounded-xl"
              style={{
                background: "rgba(0,0,0,0.8)",
                border: "1px solid rgba(255,255,255,0.06)",
              }}
            >
              {BOOT_LINES.map((line, i) => {
                const lineVisible = bootProgress > i * 0.12;
                return (
                  <div
                    key={i}
                    className="font-['JetBrains_Mono']"
                    style={{
                      fontSize: "12px",
                      color: line.includes("━") ? "rgba(99,102,241,0.3)" : "rgba(52,211,153,0.7)",
                      opacity: lineVisible ? 1 : 0,
                      transition: `opacity 0.3s ${i * 80}ms`,
                      lineHeight: 1.8,
                    }}
                  >
                    {line}
                  </div>
                );
              })}

              {/* Loading bar */}
              <div className="mt-4 w-full h-2 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${bootBarWidth}%`,
                    background: "linear-gradient(90deg, rgba(99,102,241,0.6), rgba(139,92,246,0.4))",
                  }}
                />
              </div>
              <p className="font-['JetBrains_Mono'] text-white/20 mt-2 text-right" style={{ fontSize: "10px" }}>
                {Math.min(100, Math.round(bootBarWidth))}%
              </p>
            </div>
          </div>
        </div>

        {/* === OS DESKTOP (after boot) === */}
        <div
          className="absolute inset-0 z-20"
          style={{
            opacity: bootPhase ? 0 : 1,
            transition: "opacity 0.8s ease 0.2s",
          }}
        >
          {/* Window 1 — Terminal (top-left) */}
          <OSWindow
            title="bash — Python Advanced"
            visible={w1Visible}
            active={activeWindow === 0}
            delay={0}
            className="w-[340px] lg:w-[420px]"
            style={{ top: "60px", left: "3%", transform: w1Visible ? "rotate(-1deg)" : "rotate(-1deg) scale(0.85)" }}
          >
            <div className="space-y-0.5 min-h-[140px]">
              {TERMINAL_LINES.map((line, i) => (
                <div
                  key={i}
                  className="font-['JetBrains_Mono']"
                  style={{
                    fontSize: "11px",
                    color: line.color,
                    opacity: i < visibleTermLines ? 1 : 0,
                    transition: `opacity 0.2s ${i * 40}ms`,
                    lineHeight: 1.6,
                    minHeight: line.text === "" ? "8px" : "auto",
                  }}
                >
                  {line.text}
                </div>
              ))}
              {/* Blinking cursor */}
              {visibleTermLines >= TERMINAL_LINES.length && (
                <span className="font-['JetBrains_Mono'] text-emerald-400/60" style={{ fontSize: "11px", animation: "cursorBlink 1s infinite" }}>
                  $ _
                </span>
              )}
            </div>
            {/* Skill chips */}
            {terminalProgress > 0.8 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                {SKILL_CHIPS_LANG.map((tag, i) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 rounded font-['JetBrains_Mono']"
                    style={{
                      fontSize: "9px",
                      background: "rgba(52,211,153,0.08)",
                      border: "1px solid rgba(52,211,153,0.15)",
                      color: "rgba(52,211,153,0.7)",
                      opacity: terminalProgress > 0.8 + i * 0.03 ? 1 : 0,
                      transition: `opacity 0.3s ${i * 50}ms`,
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </OSWindow>

          {/* Window 2 — Activity Monitor (right) */}
          <OSWindow
            title="Data Engineering Processes"
            visible={w2Visible}
            active={activeWindow === 1}
            delay={100}
            className="w-[360px] lg:w-[440px]"
            style={{ top: "50px", right: "3%", transform: w2Visible ? "rotate(1deg)" : "rotate(1deg) scale(0.85)" }}
          >
            {/* Process header */}
            <div className="flex items-center gap-4 mb-2 px-1">
              <span className="font-['JetBrains_Mono'] text-white/20 flex-1" style={{ fontSize: "8px" }}>PROCESS</span>
              <span className="font-['JetBrains_Mono'] text-white/20 w-24" style={{ fontSize: "8px" }}>CPU</span>
              <span className="font-['JetBrains_Mono'] text-white/20 w-16" style={{ fontSize: "8px" }}>STATUS</span>
            </div>
            <div className="space-y-1.5">
              {PROCESSES.map((proc, i) => {
                const rowVisible = processProgress > i * 0.12;
                const cpuWidth = Math.max(10, (proc.cpu + (cpuJitter[i] || 0)) * 100);
                return (
                  <div
                    key={proc.name}
                    className="flex items-center gap-4 px-1 py-1 rounded-lg group"
                    style={{
                      opacity: rowVisible ? 1 : 0,
                      transition: `opacity 0.3s ${i * 60}ms`,
                      background: "rgba(255,255,255,0.01)",
                    }}
                  >
                    <span className="font-['JetBrains_Mono'] text-white/40 flex-1" style={{ fontSize: "10px" }}>
                      {proc.name}
                    </span>
                    <div className="w-24 h-2 rounded-full" style={{ background: "rgba(255,255,255,0.04)" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${cpuWidth}%`,
                          background: cpuWidth > 70 ? "rgba(245,158,11,0.5)" : "rgba(99,102,241,0.4)",
                          transition: "width 0.4s ease, background 0.4s",
                        }}
                      />
                    </div>
                    <span
                      className="font-['JetBrains_Mono'] w-16"
                      style={{
                        fontSize: "8px",
                        color: proc.status === "HEALTHY" ? "rgba(52,211,153,0.7)"
                          : proc.status === "LISTENING" ? "rgba(245,158,11,0.6)"
                            : "rgba(129,140,248,0.6)",
                      }}
                    >
                      {proc.status}
                    </span>
                  </div>
                );
              })}
            </div>
          </OSWindow>

          {/* Window 3 — ML/3D Viewport (center, large, behind) */}
          <OSWindow
            title="ML & 3D Vision — PyTorch Studio"
            visible={w3Visible}
            active={activeWindow === 2}
            delay={150}
            className="w-[380px] lg:w-[480px]"
            style={{ bottom: "70px", left: "50%", marginLeft: "-240px", zIndex: activeWindow === 2 ? 25 : 15 }}
          >
            <div className="flex flex-col items-center gap-3 py-4">
              {/* 3D Tensor cube */}
              <div className="relative" style={{ width: "200px", height: "160px", perspective: "400px" }}>
                <div
                  style={{
                    width: "100%",
                    height: "100%",
                    transformStyle: "preserve-3d",
                    animation: "rotateCube 12s linear infinite",
                  }}
                >
                  {/* Cube faces using SVG */}
                  <svg className="absolute inset-0" viewBox="0 0 200 160">
                    {/* Wireframe cube - gets cleaner as progress increases */}
                    {/* Back face */}
                    <polygon
                      points={mlProgress > 0.5
                        ? "60,20 140,20 140,100 60,100"
                        : `${55 + seededRandom(1) * 10},${15 + seededRandom(2) * 10} ${135 + seededRandom(3) * 10},${18 + seededRandom(4) * 6} ${142 + seededRandom(5) * 8},${95 + seededRandom(6) * 10} ${58 + seededRandom(7) * 8},${102 + seededRandom(8) * 6}`
                      }
                      fill="rgba(99,102,241,0.04)"
                      stroke="rgba(99,102,241,0.25)"
                      strokeWidth="0.8"
                      style={{ transition: "all 1.5s cubic-bezier(0.22,1,0.36,1)" }}
                    />
                    {/* Front face */}
                    <polygon
                      points={mlProgress > 0.5
                        ? "80,45 160,45 160,135 80,135"
                        : `${75 + seededRandom(9) * 12},${40 + seededRandom(10) * 10} ${155 + seededRandom(11) * 10},${42 + seededRandom(12) * 8} ${162 + seededRandom(13) * 6},${130 + seededRandom(14) * 10} ${78 + seededRandom(15) * 10},${138 + seededRandom(16) * 6}`
                      }
                      fill="rgba(139,92,246,0.06)"
                      stroke="rgba(139,92,246,0.3)"
                      strokeWidth="0.8"
                      style={{ transition: "all 1.5s cubic-bezier(0.22,1,0.36,1)" }}
                    />
                    {/* Connecting edges */}
                    <line x1="60" y1="20" x2="80" y2="45" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
                    <line x1="140" y1="20" x2="160" y2="45" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
                    <line x1="140" y1="100" x2="160" y2="135" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
                    <line x1="60" y1="100" x2="80" y2="135" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" />
                    {/* Grid lines inside cube for tensor feel */}
                    {mlProgress > 0.3 && [...Array(3)].map((_, i) => (
                      <g key={i}>
                        <line
                          x1={80 + i * 27} y1="45" x2={80 + i * 27} y2="135"
                          stroke="rgba(99,102,241,0.08)" strokeWidth="0.3"
                          style={{ opacity: mlProgress }}
                        />
                        <line
                          x1="80" y1={45 + i * 30} x2="160" y2={45 + i * 30}
                          stroke="rgba(99,102,241,0.08)" strokeWidth="0.3"
                          style={{ opacity: mlProgress }}
                        />
                      </g>
                    ))}
                  </svg>
                </div>
              </div>

              {/* Convergence label */}
              <div style={{ opacity: mlProgress > 0.7 ? 1 : 0, transition: "opacity 0.6s" }}>
                <span
                  className="font-['JetBrains_Mono']"
                  style={{
                    fontSize: "12px",
                    background: "linear-gradient(135deg, #fff, #818cf8)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  MAE 0.099% — Converged
                </span>
              </div>

              {/* ML tool labels */}
              <div className="flex flex-wrap justify-center gap-1.5 mt-1">
                {ML_LABELS.map((label, i) => (
                  <span
                    key={label}
                    className="px-2 py-0.5 rounded font-['JetBrains_Mono']"
                    style={{
                      fontSize: "8px",
                      background: "rgba(139,92,246,0.08)",
                      border: "1px solid rgba(139,92,246,0.12)",
                      color: "rgba(139,92,246,0.6)",
                      opacity: mlProgress > 0.5 + i * 0.08 ? 1 : 0,
                      transition: `opacity 0.3s ${i * 50}ms`,
                    }}
                  >
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </OSWindow>

          {/* Window 4 — Cloud Dashboard (top-right, overlapping) */}
          <OSWindow
            title="AWS Console — Live"
            visible={w4Visible}
            active={activeWindow === 3}
            delay={200}
            className="w-[320px] lg:w-[380px]"
            style={{ top: "35%", right: "8%", zIndex: activeWindow === 3 ? 25 : 18 }}
          >
            <div className="relative" style={{ height: "200px" }}>
              {CLOUD_SERVICES.map((svc, i) => {
                const svcVisible = cloudProgress > i * 0.14;
                return (
                  <div
                    key={svc.name}
                    className="absolute flex flex-col items-center gap-1"
                    style={{
                      left: `${svc.x}%`,
                      top: `${svc.y}%`,
                      transform: `translate(-50%, -50%) scale(${svcVisible ? 1 : 0.5})`,
                      opacity: svcVisible ? 1 : 0,
                      transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${i * 80}ms`,
                    }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${svc.color}10`,
                        border: `1px solid ${svc.color}25`,
                      }}
                    >
                      <span style={{ fontSize: "16px" }}>{svc.icon}</span>
                    </div>
                    <span className="font-['JetBrains_Mono'] text-white/30" style={{ fontSize: "8px" }}>
                      {svc.name}
                    </span>
                  </div>
                );
              })}
              {/* Connection arrows */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ opacity: cloudProgress > 0.5 ? cloudProgress : 0 }}>
                <line x1="30%" y1="30%" x2="45%" y2="22%" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="55%" y1="22%" x2="75%" y2="35%" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="30%" y1="35%" x2="45%" y2="55%" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" strokeDasharray="3 3" />
                <line x1="55%" y1="55%" x2="75%" y2="70%" stroke="rgba(99,102,241,0.15)" strokeWidth="0.5" strokeDasharray="3 3" />
                {/* Traveling packet */}
                {cloudProgress > 0.6 && (
                  <circle r="2" fill="#6366f1">
                    <animateMotion dur="3s" repeatCount="indefinite"
                      path="M 60 60 L 120 44 L 180 70 L 180 140 L 60 130 Z" />
                  </circle>
                )}
              </svg>
            </div>
          </OSWindow>

          {/* Window 5 — Database Client (bottom-left) */}
          <OSWindow
            title="DB Connections — Active"
            visible={w5Visible}
            active={activeWindow === 4}
            delay={250}
            className="w-[300px] lg:w-[360px]"
            style={{ bottom: "60px", left: "5%", zIndex: activeWindow === 4 ? 25 : 16 }}
          >
            <div className="space-y-1.5">
              {DB_CONNECTIONS.map((db, i) => {
                const dbVisible = dbProgress > i * 0.12;
                return (
                  <div
                    key={db.name}
                    className="flex items-center gap-3 px-2 py-1 rounded-lg"
                    style={{
                      opacity: dbVisible ? 1 : 0,
                      transition: `opacity 0.3s ${i * 50}ms`,
                      background: "rgba(255,255,255,0.01)",
                    }}
                  >
                    {/* Status dot */}
                    <div
                      className="w-2 h-2 rounded-full flex-shrink-0"
                      style={{
                        background: db.status === "CONNECTED" ? "rgba(52,211,153,0.7)"
                          : db.status === "STREAMING" ? "rgba(139,92,246,0.7)"
                            : "rgba(245,158,11,0.4)",
                        boxShadow: db.status === "STREAMING" ? "0 0 6px rgba(139,92,246,0.4)" : "none",
                        animation: db.status === "STREAMING" ? "pulse 1.5s infinite" : "none",
                      }}
                    />
                    <span className="font-['JetBrains_Mono'] text-white/40 flex-1" style={{ fontSize: "10px" }}>
                      {db.name}
                    </span>
                    <span
                      className="font-['JetBrains_Mono']"
                      style={{
                        fontSize: "8px",
                        color: db.status === "CONNECTED" ? "rgba(52,211,153,0.5)"
                          : db.status === "STREAMING" ? "rgba(139,92,246,0.5)"
                            : "rgba(245,158,11,0.4)",
                      }}
                    >
                      {db.status}
                    </span>
                    <span className="font-['JetBrains_Mono'] text-white/20" style={{ fontSize: "8px" }}>
                      {db.ping}
                    </span>
                    {/* Mini streaming graph for Timestream */}
                    {db.status === "STREAMING" && (
                      <svg width="40" height="12" viewBox="0 0 40 12" className="flex-shrink-0">
                        <path
                          d="M0 6 Q5 2 10 6 Q15 10 20 6 Q25 2 30 6 Q35 10 40 6"
                          fill="none" stroke="rgba(139,92,246,0.4)" strokeWidth="1"
                        >
                          <animate attributeName="d"
                            values="M0 6 Q5 2 10 6 Q15 10 20 6 Q25 2 30 6 Q35 10 40 6;M0 6 Q5 10 10 6 Q15 2 20 6 Q25 10 30 6 Q35 2 40 6;M0 6 Q5 2 10 6 Q15 10 20 6 Q25 2 30 6 Q35 10 40 6"
                            dur="2s" repeatCount="indefinite" />
                        </path>
                      </svg>
                    )}
                  </div>
                );
              })}
            </div>
          </OSWindow>
        </div>

        {/* === TASKBAR (fixed bottom) === */}
        {!bootPhase && (
          <div
            className="absolute bottom-0 left-0 right-0 z-40 flex items-center justify-center gap-1 px-4 py-2"
            style={{
              background: "rgba(20,20,30,0.7)",
              borderTop: "1px solid rgba(255,255,255,0.04)",
              backdropFilter: "blur(20px)",
              opacity: bootPhase ? 0 : 1,
              transition: "opacity 0.6s 0.4s",
            }}
          >
            {TASKBAR_ICONS.map((icon, i) => {
              const isActive = i === activeWindow;
              return (
                <div
                  key={icon.label}
                  className="flex flex-col items-center gap-0.5 px-3 py-1 rounded-lg transition-all duration-300"
                  style={{
                    background: isActive ? "rgba(99,102,241,0.1)" : "transparent",
                  }}
                >
                  <span style={{ fontSize: "16px", filter: isActive ? "none" : "grayscale(0.5) opacity(0.5)" }}>
                    {icon.icon}
                  </span>
                  <span
                    className="font-['JetBrains_Mono']"
                    style={{
                      fontSize: "7px",
                      color: isActive ? "rgba(129,140,248,0.8)" : "rgba(255,255,255,0.2)",
                    }}
                  >
                    {icon.label}
                  </span>
                  {/* Active dot */}
                  {isActive && (
                    <div className="w-1 h-1 rounded-full bg-indigo-400/60" />
                  )}
                </div>
              );
            })}

            {/* Clock */}
            <div className="absolute right-4 flex items-center gap-2">
              <span className="font-['JetBrains_Mono'] text-white/25" style={{ fontSize: "10px" }}>
                {currentTime}
              </span>
            </div>
          </div>
        )}

        {/* Easter egg notification */}
        <AnimatePresence>
          {showEasterEgg && (
            <motion.div
              initial={{ opacity: 0, y: 20, x: "-50%" }}
              animate={{ opacity: 1, y: 0, x: "-50%" }}
              exit={{ opacity: 0, y: 20, x: "-50%" }}
              transition={{ duration: 0.4, type: "spring" }}
              className="absolute bottom-14 left-1/2 z-50 px-4 py-3 rounded-xl"
              style={{
                background: "rgba(20,20,35,0.9)",
                border: "1px solid rgba(99,102,241,0.2)",
                backdropFilter: "blur(20px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
                minWidth: "320px",
              }}
            >
              <div className="flex items-start gap-3">
                <span style={{ fontSize: "18px" }}>☁️</span>
                <div>
                  <p className="font-['Inter'] text-white/60" style={{ fontSize: "11px" }}>
                    New message from AWS
                  </p>
                  <p className="font-['JetBrains_Mono'] text-indigo-400/60 mt-1" style={{ fontSize: "10px" }}>
                    Your Lambda function processed 847,293 records today.
                  </p>
                </div>
                <button
                  onClick={() => setShowEasterEgg(false)}
                  className="text-white/20 hover:text-white/40 transition-colors ml-2"
                  style={{ fontSize: "12px" }}
                >
                  ✕
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style>{`
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
        @keyframes rotateCube {
          0% { transform: rotateY(0deg) rotateX(5deg); }
          100% { transform: rotateY(360deg) rotateX(5deg); }
        }
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        @keyframes ticker {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}