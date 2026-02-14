import { useEffect, useRef, useState, useCallback } from "react";

// --- Seeded random ---
function sr(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49311;
  return x - Math.floor(x);
}

// --- Mission Data ---
const MISSIONS = [
  {
    id: "forge",
    company: "Forge Accelerator",
    codename: "OPERATION: SPARK",
    period: "Jan – Jul 2020",
    location: "Coimbatore, India",
    color: "#f59e0b",
    status: "MISSION COMPLETE · Jul 2020",
    debrief: "First contact with edge computing. The foundation.",
    beats: 3,
  },
  {
    id: "mindtree",
    company: "LTIMindtree Solutions",
    codename: "OPERATION: CLEANSE",
    period: "Mar – Jul 2021",
    location: "Bangalore, India",
    color: "#14b8a6",
    status: "MISSION COMPLETE · Jul 2021",
    debrief: "Pipeline integrity achieved. Data quality automated.",
    beats: 3,
  },
  {
    id: "capgemini",
    company: "Capgemini",
    codename: "OPERATION: TITAN",
    period: "Feb 2022 – Nov 2023",
    location: "Chennai, India",
    color: "#3b82f6",
    status: "MISSION COMPLETE · Nov 2023 · 21 MONTHS",
    debrief: "The flagship. 1TB/day. 99.9% uptime. Zero drift.",
    beats: 4,
    wide: true,
  },
  {
    id: "oakter",
    company: "Oakter (Riot Labz)",
    codename: "OPERATION: ACCELERATE",
    period: "Jan – Jul 2024",
    location: "Remote",
    color: "#8b5cf6",
    status: "MISSION COMPLETE · Jul 2024",
    debrief: "Startup velocity. Dev === Production.",
    beats: 3,
  },
  {
    id: "sms",
    company: "SMS Group / Paul Wurth",
    codename: "OPERATION: CONVERGENCE",
    period: "Mar 2025 – Present",
    location: "Bremen, Germany",
    color: "#6366f1",
    status: "● ONGOING · 2026",
    debrief: "Currently active. Convergence mission LIVE.",
    beats: 4,
    live: true,
  },
];

const TIMELINE_CITIES = [
  { city: "Coimbatore", year: 2020, x: 8 },
  { city: "Bengaluru", year: 2021, x: 25 },
  { city: "Chennai", year: 2022, x: 42 },
  { city: "Noida/Pune", year: 2023, x: 55 },
  { city: "Remote", year: 2024, x: 70 },
  { city: "Bremen", year: 2025, x: 88 },
];

const COMM_LOG = [
  { year: 2020, text: "[2020.01] FORGE_ACCELERATOR: Mission boot sequence initiated" },
  { year: 2021, text: "[2021.03] MINDTREE: Pipeline integrity achieved" },
  { year: 2022, text: "[2022.02] CAPGEMINI: 1TB threshold exceeded — nominal" },
  { year: 2023, text: "[2023.11] CAPGEMINI: Mission concluded. 99.9% uptime confirmed" },
  { year: 2024, text: "[2024.01] OAKTER: Startup ignition sequence" },
  { year: 2025, text: "[2025.03] SMS_GROUP: Convergence mission ACTIVE" },
];

// --- Education data ---
const EDUCATION = [
  {
    institution: "Constructor University",
    location: "Bremen, Germany",
    degree: "M.Sc. Data Engineering",
    period: "Expected Aug 2026",
    gpa: "1.91",
    courses: ["Deep Learning (1.0)", "Big Data", "Parallel Computing", "Adv. Databases"],
    color: "#6366f1",
  },
  {
    institution: "Sri Ramakrishna Engineering College",
    location: "Coimbatore, India",
    degree: "B.E. Mechanical Engineering",
    period: "May 2021",
    gpa: "7.2/10",
    courses: ["Founded coding communities", "Led technical workshops", "Published research", "Dean's List"],
    color: "#8b5cf6",
  },
];

// --- Elapsed time ---
function getElapsedTime() {
  const start = new Date(2020, 0, 1);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  const years = Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
  const months = Math.floor((diffMs % (365.25 * 24 * 60 * 60 * 1000)) / (30.44 * 24 * 60 * 60 * 1000));
  return `${years} YRS ${months} MONTHS`;
}

// =================== MISSION PANEL RENDERS ===================

function MissionForge({ beatProgress }: { beatProgress: number[] }) {
  const b1 = beatProgress[0], b2 = beatProgress[1], b3 = beatProgress[2];

  // Energy cost counter
  const costReduction = Math.round(Math.min(20, b2 * 20));

  return (
    <div className="space-y-6">
      {/* Beat 1: Mission patch */}
      <div className="flex justify-center" style={{ opacity: b1, transform: `scale(${0.3 + b1 * 0.7})`, transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)" }}>
        <div className="relative w-28 h-28">
          <svg viewBox="0 0 120 120" className="w-full h-full">
            <circle cx="60" cy="60" r="55" fill="rgba(245,158,11,0.06)" stroke="rgba(245,158,11,0.25)" strokeWidth="1.5" />
            <circle cx="60" cy="60" r="45" fill="none" stroke="rgba(245,158,11,0.1)" strokeWidth="0.5" strokeDasharray="3 3" />
            {/* Circuit board pattern */}
            <rect x="40" y="40" width="40" height="40" rx="4" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="1" />
            <circle cx="48" cy="48" r="2" fill="rgba(245,158,11,0.4)" />
            <circle cx="72" cy="48" r="2" fill="rgba(245,158,11,0.4)" />
            <circle cx="48" cy="72" r="2" fill="rgba(245,158,11,0.4)" />
            <circle cx="72" cy="72" r="2" fill="rgba(245,158,11,0.4)" />
            <line x1="48" y1="48" x2="72" y2="72" stroke="rgba(245,158,11,0.3)" strokeWidth="0.5" />
            <text x="60" y="105" textAnchor="middle" fill="rgba(245,158,11,0.6)" fontSize="10" fontFamily="'JetBrains Mono'">SPARK · 2020</text>
          </svg>
        </div>
      </div>

      {/* Beat 2: Energy system + cost */}
      <div style={{ opacity: b2, transform: `translateY(${(1 - b2) * 16}px)`, transition: "all 0.6s ease" }}>
        <div className="flex items-center justify-center gap-6">
          {/* Mini circuit */}
          <svg width="120" height="40" viewBox="0 0 120 40">
            <path d="M10 20 L30 20 L40 10 L60 10 L70 20 L90 20 L100 30 L110 30" fill="none" stroke="rgba(245,158,11,0.4)" strokeWidth="1.5" strokeLinecap="round" />
            {b2 > 0.3 && (
              <circle r="3" fill="#f59e0b" opacity="0.7">
                <animateMotion dur="2s" repeatCount="indefinite" path="M10 20 L30 20 L40 10 L60 10 L70 20 L90 20 L100 30 L110 30" />
              </circle>
            )}
          </svg>
          <div className="text-center">
            <span className="font-['Inter']" style={{ fontSize: "28px", fontWeight: 600, background: "linear-gradient(135deg, #fff, #f59e0b)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
              ↓{costReduction}%
            </span>
            <p className="font-['Inter'] text-white/25 mt-1" style={{ fontSize: "11px" }}>Energy Costs</p>
          </div>
        </div>
      </div>

      {/* Beat 3: Waveforms */}
      <div style={{ opacity: b3, transform: `translateY(${(1 - b3) * 12}px)`, transition: "all 0.6s ease" }}>
        <div className="flex items-center justify-center gap-4">
          {/* Raw signal */}
          <div className="text-center">
            <svg width="100" height="40" viewBox="0 0 100 40">
              <path d="M5 20 Q10 5 15 20 Q18 35 22 15 Q25 5 30 25 Q35 35 40 10 Q45 30 50 20 Q55 5 60 25 Q65 35 70 15 Q75 5 80 20 Q85 30 90 18 Q95 10 100 20"
                fill="none" stroke="rgba(255,255,255,0.3)" strokeWidth="1" />
            </svg>
            <span className="font-['JetBrains_Mono'] text-white/20" style={{ fontSize: "12px" }}>Raw Signal</span>
          </div>
          <span className="font-['Inter'] text-amber-400/40" style={{ fontSize: "16px" }}>→</span>
          {/* Clean FFT */}
          <div className="text-center">
            <svg width="100" height="40" viewBox="0 0 100 40">
              <path d="M5 35 L15 35 L20 30 L30 20 L40 8 L50 20 L60 30 L65 35 L95 35"
                fill="none" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5"
                style={{ strokeDasharray: 200, strokeDashoffset: 200 * (1 - b3), transition: "stroke-dashoffset 0.8s ease" }} />
            </svg>
            <span className="font-['JetBrains_Mono'] text-emerald-400/40" style={{ fontSize: "12px" }}>Anomaly Detected ✓</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MissionMindtree({ beatProgress }: { beatProgress: number[] }) {
  const b1 = beatProgress[0], b2 = beatProgress[1], b3 = beatProgress[2];

  // Data quality counter
  const quality = Math.round(47 + Math.min(53, b2 * 53));
  const scanBeamX = b2 * 100;

  // Grid cells
  const gridCells = Array.from({ length: 48 }, (_, i) => ({
    dirty: sr(i * 7) > 0.6,
    col: i % 8,
    row: Math.floor(i / 8),
  }));

  return (
    <div className="space-y-6">
      {/* Beat 1 + 2: Data grid with scan beam */}
      <div style={{ opacity: Math.max(b1, 0.3), transition: "opacity 0.6s" }}>
        <div className="relative mx-auto" style={{ width: "260px" }}>
          <div className="grid grid-cols-8 gap-[3px]">
            {gridCells.map((cell, i) => {
              const cellX = (cell.col / 8) * 100;
              const cleaned = b2 > 0 && cellX < scanBeamX;
              const isDirty = cell.dirty && !cleaned;
              return (
                <div
                  key={i}
                  className="h-5 rounded-sm transition-all duration-300"
                  style={{
                    background: isDirty ? "rgba(239,68,68,0.3)" : "rgba(52,211,153,0.2)",
                    border: `1px solid ${isDirty ? "rgba(239,68,68,0.25)" : "rgba(52,211,153,0.15)"}`,
                    animation: isDirty && b1 > 0.5 ? "blink 1.5s infinite" : "none",
                  }}
                />
              );
            })}
          </div>
          {/* Scan beam */}
          {b2 > 0 && b2 < 1 && (
            <div
              className="absolute top-0 bottom-0 w-[2px]"
              style={{
                left: `${scanBeamX}%`,
                background: "linear-gradient(180deg, transparent, rgba(52,211,153,0.7), transparent)",
                boxShadow: "0 0 12px rgba(52,211,153,0.4)",
                transition: "left 0.2s linear",
              }}
            />
          )}
          {/* Counter */}
          <div className="mt-3 text-center">
            <span className="font-['JetBrains_Mono']" style={{ fontSize: "14px", color: quality >= 100 ? "rgba(52,211,153,0.8)" : "rgba(255,255,255,0.5)" }}>
              Data Quality: {quality}%
            </span>
          </div>
        </div>
      </div>

      {/* Beat 3: Checkmark + healthy pulse */}
      <div style={{ opacity: b3, transform: `translateY(${(1 - b3) * 12}px)`, transition: "all 0.6s ease" }}>
        <div className="flex flex-col items-center gap-3">
          <svg width="48" height="48" viewBox="0 0 48 48">
            <circle cx="24" cy="24" r="20" fill="rgba(52,211,153,0.15)" stroke="rgba(52,211,153,0.3)" strokeWidth="1" />
            <path d="M14 24 L21 31 L34 18" fill="none" stroke="rgba(52,211,153,0.8)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 40, strokeDashoffset: 40 * (1 - b3), transition: "stroke-dashoffset 0.6s ease" }} />
          </svg>
          {/* Heartbeat pulse */}
          <svg width="120" height="24" viewBox="0 0 120 24">
            <path d="M5 12 L30 12 L38 4 L46 20 L54 4 L62 20 L70 12 L115 12"
              fill="none" stroke="rgba(52,211,153,0.4)" strokeWidth="1" strokeLinecap="round"
              style={{ strokeDasharray: 160, strokeDashoffset: 160 * (1 - b3), transition: "stroke-dashoffset 1s ease-out" }} />
          </svg>
        </div>
      </div>
    </div>
  );
}

function MissionCapgemini({ beatProgress }: { beatProgress: number[] }) {
  const b1 = beatProgress[0], b2 = beatProgress[1], b3 = beatProgress[2], b4 = beatProgress[3];

  return (
    <div className="space-y-5">
      {/* Beat 1: Architecture assembly */}
      <div style={{ opacity: b1, transition: "opacity 0.6s" }}>
        <div className="flex items-center justify-center gap-4">
          {[
            { label: "Lambda", icon: "⚡", delay: 0, from: "above" },
            { label: "API GW", icon: "🌐", delay: 100, from: "left" },
            { label: "S3", icon: "📦", delay: 200, from: "below" },
          ].map((svc, i) => (
            <div key={svc.label} className="flex flex-col items-center gap-1" style={{
              opacity: b1 > 0.2 + i * 0.15 ? 1 : 0,
              transform: `translateY(${b1 > 0.2 + i * 0.15 ? 0 : (svc.from === "above" ? -20 : svc.from === "below" ? 20 : 0)}px)`,
              transition: `all 0.5s cubic-bezier(0.22,1,0.36,1) ${svc.delay}ms`,
            }}>
              <div className="w-12 h-12 rounded-lg flex items-center justify-center" style={{ background: "rgba(59,130,246,0.15)", border: "1px solid rgba(59,130,246,0.25)" }}>
                <span style={{ fontSize: "18px" }}>{svc.icon}</span>
              </div>
              <span className="font-['JetBrains_Mono'] text-white/25" style={{ fontSize: "12px" }}>{svc.label}</span>
            </div>
          ))}
          {/* Cost badge */}
          {b1 > 0.7 && (
            <div className="px-3 py-1.5 rounded-lg" style={{ background: "rgba(52,211,153,0.15)", border: "1px solid rgba(52,211,153,0.22)", opacity: Math.min(1, (b1 - 0.7) * 3.3) }}>
              <span className="font-['JetBrains_Mono'] text-emerald-400/60" style={{ fontSize: "14px" }}>Ops Cost ↓30%</span>
            </div>
          )}
        </div>
      </div>

      {/* Beat 2: Data flow pipeline */}
      <div style={{ opacity: b2, transform: `translateY(${(1 - b2) * 12}px)`, transition: "all 0.6s ease" }}>
        <div className="relative flex items-center justify-center gap-3">
          {/* Data stream */}
          <svg width="280" height="50" viewBox="0 0 280 50">
            {/* Flow line */}
            <path d="M10 25 L60 25 L80 25 L120 25 L160 25 L200 25 L240 25 L270 25" fill="none" stroke="rgba(59,130,246,0.25)" strokeWidth="1" strokeDasharray="4 4" />
            {/* Spark turbine */}
            <circle cx="90" cy="25" r="15" fill="rgba(59,130,246,0.15)" stroke="rgba(59,130,246,0.3)" strokeWidth="1">
              {b2 > 0.3 && <animateTransform attributeName="transform" type="rotate" from="0 90 25" to="360 90 25" dur="3s" repeatCount="indefinite" />}
            </circle>
            <text x="90" y="28" textAnchor="middle" fill="rgba(59,130,246,0.7)" fontSize="14" fontFamily="'JetBrains Mono'">SPARK</text>
            {/* Glue funnel */}
            <polygon points="165,15 195,15 185,35 175,35" fill="rgba(59,130,246,0.1)" stroke="rgba(59,130,246,0.25)" strokeWidth="0.5" />
            <text x="180" y="27" textAnchor="middle" fill="rgba(59,130,246,0.6)" fontSize="13" fontFamily="'JetBrains Mono'">GLUE</text>
            {/* Flowing packets */}
            {b2 > 0.3 && [...Array(4)].map((_, i) => (
              <rect key={i} width="4" height="3" rx="0.5" fill="rgba(99,102,241,0.6)">
                <animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" begin={`${i * 0.4}s`}
                  path="M10 25 L60 25 L90 25 L140 25 L180 25 L220 25 L270 25" />
              </rect>
            ))}
          </svg>
        </div>
        <div className="text-center mt-2">
          <span className="font-['Inter']" style={{ fontSize: "32px", fontWeight: 600, background: "linear-gradient(135deg, #fff, #3b82f6)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            1TB / day
          </span>
        </div>
      </div>

      {/* Beat 3: K8s constellation + CI/CD */}
      <div style={{ opacity: b3, transition: "opacity 0.6s" }}>
        <div className="flex items-center justify-center gap-8">
          {/* Constellation */}
          <svg width="120" height="90" viewBox="0 0 120 90">
            {/* Nodes */}
            {[
              [30, 20], [60, 10], [90, 25], [100, 50],
              [80, 75], [50, 80], [20, 65], [45, 45],
            ].map(([x, y], i) => (
              <g key={i}>
                <circle cx={x} cy={y} r="5" fill="rgba(99,102,241,0.25)" stroke="rgba(99,102,241,0.4)" strokeWidth="0.5">
                  <animate attributeName="opacity" values="0.6;1;0.6" dur={`${2 + sr(i) * 1.5}s`} repeatCount="indefinite" />
                </circle>
                {i < 7 && (
                  <line x1={x} y1={y} x2={[60, 90, 100, 80, 50, 20, 45][i]} y2={[10, 25, 50, 75, 80, 65, 45][i]}
                    stroke="rgba(99,102,241,0.2)" strokeWidth="0.3" />
                )}
              </g>
            ))}
          </svg>
          {/* CI/CD pipeline */}
          <div className="flex items-center gap-2">
            {["BUILD", "TEST", "DEPLOY", "✓"].map((stage, i) => (
              <div key={stage} className="flex items-center gap-2">
                <span className="font-['JetBrains_Mono']" style={{
                  fontSize: "13px",
                  color: b3 > 0.3 + i * 0.15 ? "rgba(52,211,153,0.7)" : "rgba(255,255,255,0.2)",
                  transition: `color 0.4s ${i * 100}ms`,
                }}>
                  {stage}
                </span>
                {i < 3 && <span className="text-white/10" style={{ fontSize: "8px" }}>→</span>}
              </div>
            ))}
          </div>
        </div>
        <div className="text-center mt-2">
          <span className="font-['JetBrains_Mono'] text-white/20" style={{ fontSize: "14px" }}>
            UPTIME: 99.9% · CLOUDWATCH
          </span>
        </div>
      </div>

      {/* Beat 4: IaC origami */}
      <div style={{ opacity: b4 || 0, transform: `translateY(${(1 - (b4 || 0)) * 12}px)`, transition: "all 0.6s ease" }}>
        <div className="flex items-center justify-center gap-4">
          <div style={{
            width: "80px", height: "60px",
            background: "rgba(59,130,246,0.1)",
            border: "1px solid rgba(59,130,246,0.22)",
            borderRadius: "8px",
            transform: `perspective(300px) rotateX(${(1 - (b4 || 0)) * 45}deg)`,
            transition: "transform 1s cubic-bezier(0.22,1,0.36,1)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span className="font-['JetBrains_Mono'] text-blue-400/50" style={{ fontSize: "11px" }}>CloudFormation</span>
          </div>
          <p className="font-['Inter'] text-white/25" style={{ fontSize: "11px", maxWidth: "180px" }}>
            Reproducible environments. Zero drift.
          </p>
        </div>
      </div>
    </div>
  );
}

function MissionOakter({ beatProgress }: { beatProgress: number[] }) {
  const b1 = beatProgress[0], b2 = beatProgress[1], b3 = beatProgress[2];

  const latencyReduction = Math.round(Math.min(20, b1 * 20));
  const accuracy = Math.round(Math.min(18, b2 * 18));

  return (
    <div className="space-y-6">
      {/* Beat 1: ETL bottleneck */}
      <div style={{ opacity: b1, transform: `translateY(${(1 - b1) * 12}px)`, transition: "all 0.5s ease" }}>
        <div className="flex items-center justify-center gap-3">
          {/* Pipe visualization */}
          <svg width="200" height="50" viewBox="0 0 200 50">
            <rect x="5" y="10" width="50" height="30" rx="4" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
            <text x="30" y="28" textAnchor="middle" fill="rgba(139,92,246,0.6)" fontSize="14" fontFamily="'JetBrains Mono'">Extract</text>
            {/* Bottleneck → widening */}
            <path d={`M55 15 Q95 ${25 - b1 * 10} 135 15`} fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
            <path d={`M55 35 Q95 ${25 + b1 * 10} 135 35`} fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
            <rect x="140" y="10" width="50" height="30" rx="4" fill="none" stroke="rgba(139,92,246,0.3)" strokeWidth="1" />
            <text x="165" y="28" textAnchor="middle" fill="rgba(139,92,246,0.6)" fontSize="14" fontFamily="'JetBrains Mono'">Load</text>
          </svg>
          <span className="font-['JetBrains_Mono'] text-violet-400/80" style={{ fontSize: "14px" }}>
            Latency ↓{latencyReduction}%
          </span>
        </div>
      </div>

      {/* Beat 2: Scatter plot + decision boundary */}
      <div style={{ opacity: b2, transition: "opacity 0.6s" }}>
        <div className="flex items-center justify-center gap-4">
          <svg width="160" height="120" viewBox="0 0 160 120">
            {/* Scatter points */}
            {[...Array(30)].map((_, i) => {
              const x = 10 + sr(i * 3) * 140;
              const y = 10 + sr(i * 5) * 100;
              const correctSide = b2 > 0.5;
              const above = y < 60;
              const color = above ? "rgba(99,102,241,0.6)" : "rgba(245,158,11,0.6)";
              const targetX = correctSide ? (above ? Math.min(80, x) : Math.max(80, x)) : x;
              return (
                <circle
                  key={i}
                  cx={targetX}
                  cy={y}
                  r="3"
                  fill={color}
                  style={{ transition: "cx 1s ease" }}
                />
              );
            })}
            {/* Decision boundary */}
            <line x1="80" y1="5" x2="80" y2="115" stroke="rgba(52,211,153,0.5)" strokeWidth="1.5" strokeDasharray="4 4"
              style={{ strokeDasharray: 200, strokeDashoffset: 200 * (1 - Math.min(1, b2 * 2)), transition: "stroke-dashoffset 0.8s ease" }} />
          </svg>
          <span className="font-['JetBrains_Mono'] text-emerald-400/80" style={{ fontSize: "14px" }}>
            +{accuracy}% accuracy
          </span>
        </div>
      </div>

      {/* Beat 3: Docker containers */}
      <div style={{ opacity: b3, transform: `translateY(${(1 - b3) * 12}px)`, transition: "all 0.6s ease" }}>
        <div className="flex items-center justify-center gap-4">
          <div className="flex items-center gap-3">
            {["DEV", "PROD"].map((env, i) => (
              <div key={env} className="px-4 py-3 rounded-lg" style={{
                background: "rgba(59,130,246,0.1)",
                border: "1px solid rgba(59,130,246,0.22)",
                opacity: b3 > 0.3 + i * 0.2 ? 1 : 0,
                transition: `opacity 0.4s ${i * 150}ms`,
              }}>
                <span className="font-['JetBrains_Mono'] text-blue-400/80" style={{ fontSize: "16px" }}>🐳 {env}</span>
              </div>
            ))}
            {b3 > 0.7 && (
              <span className="font-['Inter'] text-white/30" style={{ fontSize: "20px", opacity: Math.min(1, (b3 - 0.7) * 3.3) }}>=</span>
            )}
          </div>
        </div>
        {b3 > 0.8 && (
          <p className="font-['JetBrains_Mono'] text-white/20 text-center mt-2" style={{ fontSize: "14px" }}>
            Dev === Production. No surprises.
          </p>
        )}
      </div>
    </div>
  );
}

function MissionSMS({ beatProgress }: { beatProgress: number[] }) {
  const b1 = beatProgress[0], b2 = beatProgress[1], b3 = beatProgress[2], b4 = beatProgress[3];

  const ARCHITECTURES = ["LSTM", "Transformer", "BiLSTM", "GRU", "Seq2Seq", "CNN-RNN", "WaveNet", "TCN", "Attention", "Informer", "TFT"];

  return (
    <div className="space-y-5">
      {/* Beat 1: 11 Architecture cards */}
      <div style={{ opacity: b1, transition: "opacity 0.6s" }}>
        <div className="grid grid-cols-4 gap-1.5 max-w-[280px] mx-auto">
          {ARCHITECTURES.map((arch, i) => {
            const flipped = b1 > 0.2 + i * 0.06;
            const passed = [0, 3, 5, 6, 7, 8].includes(i); // Some fail
            return (
              <div
                key={arch}
                className="px-2 py-1.5 rounded text-center"
                style={{
                  background: flipped ? (passed ? "rgba(239,68,68,0.15)" : "rgba(52,211,153,0.15)") : "rgba(255,255,255,0.05)",
                  border: `1px solid ${flipped ? (passed ? "rgba(239,68,68,0.22)" : "rgba(52,211,153,0.22)") : "rgba(255,255,255,0.08)"}`,
                  transform: flipped ? "rotateY(0deg)" : "rotateY(90deg)",
                  transition: `all 0.4s ${i * 40}ms`,
                }}
              >
                <span className="font-['JetBrains_Mono']" style={{ fontSize: "11px", color: flipped ? (passed ? "rgba(239,68,68,0.6)" : "rgba(52,211,153,0.7)") : "rgba(255,255,255,0.1)" }}>
                  {flipped ? `${arch} ${passed ? "✗" : "✓"}` : "?"}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Beat 2: Loss landscape */}
      <div style={{ opacity: b2, transition: "opacity 0.6s" }}>
        <div className="flex flex-col items-center gap-2">
          <svg width="220" height="80" viewBox="0 0 220 80">
            {/* Loss surface */}
            <path d="M10 70 Q30 20 50 50 Q70 75 90 30 Q110 10 130 40 Q150 65 170 25 Q190 5 210 45"
              fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1" />
            {/* Gradient descent path */}
            <path d="M30 22 Q50 48 90 32 Q130 38 170 27 Q190 8 200 15"
              fill="none" stroke="rgba(245,158,11,0.5)" strokeWidth="1" strokeDasharray="200"
              style={{ strokeDashoffset: 200 * (1 - b2), transition: "stroke-dashoffset 1.5s ease-out" }} />
            {/* Minimum point */}
            {b2 > 0.7 && (
              <g>
                <circle cx="195" cy="12" r="4" fill="rgba(52,211,153,0.3)" stroke="rgba(52,211,153,0.5)" strokeWidth="1" />
                <text x="195" y="15" textAnchor="middle" fill="rgba(52,211,153,0.7)" fontSize="8" fontFamily="'JetBrains Mono'">★</text>
              </g>
            )}
          </svg>
          {b2 > 0.8 && (
            <span className="font-['JetBrains_Mono'] text-emerald-400/60" style={{ fontSize: "13px" }}>
              MAE 0.099% 👑
            </span>
          )}
        </div>
      </div>

      {/* Beat 3: Sensor drift */}
      <div style={{ opacity: b3, transition: "opacity 0.6s" }}>
        <svg width="260" height="50" viewBox="0 0 260 50" className="mx-auto block">
          <path d="M5 25 L50 24 L100 25 L130 23 L160 28 L180 35 L200 40 L220 42"
            fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="1" />
          {/* Drift detection zone */}
          <rect x="150" y="5" width="80" height="40" rx="4" fill="none" stroke="rgba(239,68,68,0.2)" strokeWidth="0.5" strokeDasharray="3 3"
            style={{ opacity: b3 > 0.5 ? 1 : 0, transition: "opacity 0.5s" }} />
          {b3 > 0.6 && (
            <text x="190" y="15" textAnchor="middle" fill="rgba(239,68,68,0.8)" fontSize="10" fontFamily="'JetBrains Mono'">DRIFT DETECTED</text>
          )}
        </svg>
        {b3 > 0.7 && (
          <p className="font-['JetBrains_Mono'] text-amber-400/40 text-center mt-1" style={{ fontSize: "9px" }}>
            Re-calibration → +15% stability
          </p>
        )}
      </div>

      {/* Beat 4: Production handoff */}
      <div style={{ opacity: b4 || 0, transition: "opacity 0.6s" }}>
        <div className="flex items-center justify-center gap-2">
          {["Data Quality Gate", "Distribution Match", "Inference Ready"].map((gate, i) => (
            <div key={gate} className="flex items-center gap-1.5">
              <span className="font-['JetBrains_Mono']" style={{
                fontSize: "8px",
                color: (b4 || 0) > 0.3 + i * 0.2 ? "rgba(52,211,153,0.7)" : "rgba(255,255,255,0.15)",
                transition: `color 0.4s ${i * 100}ms`,
              }}>
                ✓ {gate}
              </span>
              {i < 2 && <span className="text-white/10" style={{ fontSize: "8px" }}>→</span>}
            </div>
          ))}
        </div>
        {(b4 || 0) > 0.8 && (
          <div className="flex justify-center mt-2">
            <div className="w-3 h-3 rounded-full bg-emerald-400/60" style={{ boxShadow: "0 0 8px rgba(52,211,153,0.4)" }} />
          </div>
        )}
      </div>
    </div>
  );
}

// --- Mission panel renderer ---
const MISSION_RENDERERS = [MissionForge, MissionMindtree, MissionCapgemini, MissionOakter, MissionSMS];

// =================== MAIN COMPONENT ===================

export function Experience() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [met, setMet] = useState(getElapsedTime());
  const tickingRef = useRef(false);

  // MET ticker
  useEffect(() => {
    const id = setInterval(() => setMet(getElapsedTime()), 60000);
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

  // Scroll mapping: missions take ~75%, education takes ~25%
  const MISSION_PORTION = 0.75; // 75% of scroll for missions
  const EDU_PORTION = 1 - MISSION_PORTION; // 25% for education

  // Mission scroll: 0..1 over the mission portion
  const missionScrollProgress = Math.min(1, scrollProgress / MISSION_PORTION);

  // Current segment for legacy compatibility
  const TOTAL_SEGMENTS = 7;
  const segmentSize = 1 / TOTAL_SEGMENTS;
  const currentSegment = Math.min(TOTAL_SEGMENTS - 1, Math.floor(scrollProgress * TOTAL_SEGMENTS));
  const segmentProgress = (scrollProgress * TOTAL_SEGMENTS) - currentSegment;

  // Education drawer
  const inEducation = scrollProgress > MISSION_PORTION;
  const eduProgress = inEducation ? Math.min(1, (scrollProgress - MISSION_PORTION) / EDU_PORTION) : 0;

  // Playhead position on timeline
  const playheadX = Math.min(95, 5 + missionScrollProgress * 90);

  // Orbital arc progress
  const arcProgress = missionScrollProgress;

  // Comm log visible entries
  const visibleLogEntries = Math.floor(missionScrollProgress * COMM_LOG.length);

  // Current mission in view (0-4)
  const currentMission = Math.min(4, Math.floor(missionScrollProgress * 5));

  // Beat progress for current mission
  const getBeatProgress = (missionIdx: number) => {
    const localP = Math.max(0, Math.min(1, missionScrollProgress * 5 - missionIdx));
    const beats = MISSIONS[missionIdx].beats;
    return Array.from({ length: beats }, (_, i) => {
      const beatStart = i / beats;
      const beatEnd = (i + 1) / beats;
      return Math.max(0, Math.min(1, (localP - beatStart) / (beatEnd - beatStart)));
    });
  };

  return (
    <section
      id="experience"
      ref={containerRef}
      className="relative"
      style={{ height: "1200vh" }}
    >
      <div className="sticky top-0 h-screen overflow-hidden" style={{ background: "#07070d" }}>

        {/* === PERSISTENT TOP BAR === */}
        <div
          className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 lg:px-8 py-3"
          style={{ background: "rgba(7,7,13,0.9)", borderBottom: "1px solid rgba(255,255,255,0.04)", backdropFilter: "blur(12px)" }}
        >
          {/* Left: Title */}
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-indigo-500/40" />
            <span className="font-['JetBrains_Mono'] text-white/50 hidden sm:inline" style={{ fontSize: "12px" }}>
              MISSION CONTROL — BADRISH.MS
            </span>
            <span className="font-['JetBrains_Mono'] text-white/30 sm:hidden" style={{ fontSize: "10px" }}>
              MISSION CTRL
            </span>
          </div>

          {/* Center: Timeline ruler */}
          <div className="hidden md:flex items-center gap-0 flex-1 mx-8 relative">
            <div className="w-full h-[1px] relative" style={{ background: "rgba(255,255,255,0.06)" }}>
              {/* Year markers */}
              {[2020, 2021, 2022, 2023, 2024, 2025].map((year, i) => (
                <div
                  key={year}
                  className="absolute -top-2 flex flex-col items-center"
                  style={{ left: `${5 + i * 18}%` }}
                >
                  <div className="w-[1px] h-2" style={{ background: "rgba(255,255,255,0.1)" }} />
                  <span className="font-['JetBrains_Mono'] text-white/15 mt-0.5" style={{ fontSize: "7px" }}>
                    {year}
                  </span>
                </div>
              ))}
              {/* Mission markers */}
              {MISSIONS.map((m, i) => (
                <div
                  key={m.id}
                  className="absolute -top-1 w-2 h-2 rounded-full"
                  style={{
                    left: `${5 + i * 18}%`,
                    background: i <= currentMission ? m.color : "rgba(255,255,255,0.08)",
                    transition: "background 0.4s",
                    boxShadow: i === currentMission ? `0 0 8px ${m.color}60` : "none",
                  }}
                />
              ))}
              {/* Playhead */}
              <div
                className="absolute -top-3 w-[1px] h-4"
                style={{
                  left: `${playheadX}%`,
                  background: "rgba(255,255,255,0.3)",
                  transition: "left 0.3s ease-out",
                }}
              >
                <div className="absolute -top-0.5 -left-[2px] w-[5px] h-[5px] rotate-45" style={{ background: "rgba(255,255,255,0.3)" }} />
              </div>
            </div>
          </div>

          {/* Right: MET counter */}
          <span className="font-['JetBrains_Mono'] text-indigo-400/40" style={{ fontSize: "9px" }}>
            MET: {met}
          </span>
        </div>

        {/* === HORIZONTAL SCROLL AREA (Missions) === */}
        <div
          className="absolute inset-0 pt-14"
          style={{
            opacity: inEducation ? Math.max(0, 1 - eduProgress * 4) : 1,
            transition: "opacity 0.5s",
          }}
        >
          {/* Mission panels container — horizontal scroll */}
          <div
            className="flex h-full items-center gap-8 px-8 lg:px-16"
            style={{
              transform: `translateX(calc(${-missionScrollProgress * (MISSIONS.length - 1)} * (min(70vw, 560px) + 2rem)))`,
              transition: "transform 0.15s ease-out",
              width: "fit-content",
            }}
          >
            {MISSIONS.map((mission, mIdx) => {
              const isActive = mIdx === currentMission;
              const isPast = mIdx < currentMission;
              const beatProgress = getBeatProgress(mIdx);
              const MissionRenderer = MISSION_RENDERERS[mIdx];

              return (
                <div
                  key={mission.id}
                  className="flex-shrink-0 relative"
                  style={{
                    width: mission.wide ? "min(85vw, 780px)" : "min(70vw, 560px)",
                    height: "75vh",
                  }}
                >
                  {/* Panel */}
                  <div
                    className="relative w-full h-full rounded-2xl overflow-hidden p-6 lg:p-8 flex flex-col"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid ${isActive ? `${mission.color}25` : "rgba(255,255,255,0.04)"}`,
                      backdropFilter: "blur(20px)",
                      boxShadow: isActive ? `0 0 40px ${mission.color}08` : "none",
                      transition: "border-color 0.6s, box-shadow 0.6s",
                      // Dossier corner cut
                      clipPath: "polygon(0 0, calc(100% - 30px) 0, 100% 30px, 100% 100%, 0 100%)",
                    }}
                  >
                    {/* LIVE badge */}
                    {mission.live && (
                      <div className="absolute top-4 right-8 flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400/70" style={{ animation: "pulse 1.5s infinite" }} />
                        <span className="font-['JetBrains_Mono'] text-emerald-400/60" style={{ fontSize: "9px" }}>LIVE</span>
                      </div>
                    )}

                    {/* Header */}
                    <div className="mb-5">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="w-3 h-3 rounded" style={{ background: `${mission.color}40` }} />
                        <span className="font-['JetBrains_Mono'] text-white/40" style={{ fontSize: "11px" }}>
                          {mission.codename}
                        </span>
                      </div>
                      <h3 className="font-['Syne'] text-white/85 mb-1" style={{ fontSize: "24px" }}>
                        {mission.company}
                      </h3>
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="font-['Inter'] text-white/40" style={{ fontSize: "12px" }}>{mission.period}</span>
                        <div className="w-1 h-1 rounded-full bg-white/20" />
                        <span className="font-['Inter'] text-white/40" style={{ fontSize: "12px" }}>{mission.location}</span>
                      </div>
                    </div>

                    {/* Mission content */}
                    <div className="flex-1 overflow-hidden">
                      <MissionRenderer beatProgress={beatProgress} />
                    </div>

                    {/* Status badge */}
                    <div className="mt-4 pt-3" style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}>
                      <div className="flex items-center justify-between">
                        <span
                          className="font-['JetBrains_Mono']"
                          style={{
                            fontSize: "9px",
                            color: mission.live ? "rgba(52,211,153,0.6)" : `${mission.color}60`,
                          }}
                        >
                          {mission.status}
                        </span>
                      </div>
                      {/* Debrief */}
                      {(isPast || (isActive && segmentProgress > 0.7)) && (
                        <p className="font-['Inter'] text-white/15 mt-2 italic" style={{ fontSize: "11px" }}>
                          "{mission.debrief}"
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* === BOTTOM-LEFT: Communication Log === */}
        <div className="absolute bottom-4 left-4 lg:left-8 z-30 hidden lg:block" style={{ maxWidth: "340px" }}>
          <div className="space-y-0.5">
            {COMM_LOG.map((entry, i) => (
              <div
                key={i}
                className="font-['JetBrains_Mono']"
                style={{
                  fontSize: "8px",
                  color: i < visibleLogEntries ? "rgba(52,211,153,0.35)" : "rgba(255,255,255,0.05)",
                  transition: `color 0.4s ${i * 100}ms`,
                  lineHeight: 1.6,
                }}
              >
                {entry.text}
              </div>
            ))}
          </div>
        </div>

        {/* === TOP-RIGHT: Orbital Map === */}
        <div className="absolute top-14 right-4 lg:right-8 z-30 hidden lg:block">
          <svg width="160" height="60" viewBox="0 0 160 60">
            {/* Arc path */}
            <path
              d="M10 50 Q40 10 80 30 Q120 50 150 15"
              fill="none"
              stroke="rgba(99,102,241,0.1)"
              strokeWidth="0.5"
              strokeDasharray="3 3"
            />
            {/* Arc drawn based on progress */}
            <path
              d="M10 50 Q40 10 80 30 Q120 50 150 15"
              fill="none"
              stroke="rgba(99,102,241,0.3)"
              strokeWidth="1"
              strokeLinecap="round"
              style={{
                strokeDasharray: 200,
                strokeDashoffset: 200 * (1 - arcProgress),
                transition: "stroke-dashoffset 0.5s ease-out",
              }}
            />
            {/* City dots */}
            {TIMELINE_CITIES.map((c, i) => {
              const visible = arcProgress > i * 0.16;
              const cx = 10 + (i / 5) * 140;
              const cy = i < 3 ? 50 - i * 15 : 20 + (i - 3) * 8;
              return (
                <g key={c.city}>
                  <circle
                    cx={cx} cy={cy} r="2.5"
                    fill={visible ? "rgba(99,102,241,0.5)" : "rgba(255,255,255,0.05)"}
                    style={{ transition: "fill 0.4s" }}
                  />
                  <text
                    x={cx} y={cy + 10}
                    textAnchor="middle"
                    fill={visible ? "rgba(255,255,255,0.2)" : "rgba(255,255,255,0.05)"}
                    fontSize="4"
                    fontFamily="'JetBrains Mono'"
                    style={{ transition: "fill 0.4s" }}
                  >
                    {c.city}
                  </text>
                </g>
              );
            })}
          </svg>
        </div>

        {/* === EDUCATION DRAWER === */}
        {inEducation && (
          <div
            className="absolute inset-0 pt-14 flex items-center justify-center z-20 px-6 lg:px-16"
            style={{
              opacity: Math.min(1, eduProgress * 3),
              transform: `translateY(${Math.max(0, (1 - eduProgress * 3) * 40)}px)`,
              transition: "opacity 0.6s, transform 0.6s",
            }}
          >
            {/* DECLASSIFIED header */}
            <div className="absolute top-20 left-1/2 -translate-x-1/2">
              <div className="flex items-center gap-3">
                <div className="w-6 h-[1px] bg-amber-500/30" />
                <span className="font-['JetBrains_Mono'] text-amber-400/50 tracking-widest" style={{ fontSize: "10px" }}>
                  DECLASSIFIED — MISSION ARCHIVE
                </span>
                <div className="w-6 h-[1px] bg-amber-500/30" />
              </div>
            </div>

            <div className="max-w-4xl w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
              {EDUCATION.map((edu, eduIdx) => {
                const eduShow = eduProgress > 0.15 + eduIdx * 0.25;
                const gpaNeedle = eduShow ? 1 : 0;

                return (
                  <div
                    key={edu.institution}
                    className="relative rounded-2xl p-6 overflow-hidden"
                    style={{
                      background: "rgba(255,255,255,0.02)",
                      border: `1px solid rgba(255,255,255,0.06)`,
                      backdropFilter: "blur(16px)",
                      opacity: eduShow ? 1 : 0,
                      transform: `translateY(${eduShow ? 0 : 20}px)`,
                      transition: "all 0.6s cubic-bezier(0.22,1,0.36,1)",
                    }}
                  >
                    {/* Tab at top */}
                    <div
                      className="absolute -top-[1px] left-6 px-4 py-1 rounded-b-lg"
                      style={{
                        background: `${edu.color}15`,
                        border: `1px solid ${edu.color}20`,
                        borderTop: "none",
                      }}
                    >
                      <span className="font-['JetBrains_Mono']" style={{ fontSize: "8px", color: `${edu.color}80` }}>
                        📁 {edu.institution.split(" ")[0]}
                      </span>
                    </div>

                    <div className="mt-4">
                      <h4 className="font-['Syne'] text-white/80 mb-1" style={{ fontSize: "18px" }}>
                        {edu.institution}
                      </h4>
                      <p className="font-['Inter'] text-white/25 mb-1" style={{ fontSize: "11px" }}>{edu.location}</p>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-['Inter'] text-indigo-400/50" style={{ fontSize: "12px" }}>{edu.degree}</span>
                        <span className="font-['Inter'] text-white/15" style={{ fontSize: "10px" }}>· {edu.period}</span>
                      </div>

                      {/* GPA gauge */}
                      <div className="flex items-center gap-3 mb-5">
                        <svg width="60" height="36" viewBox="0 0 60 36">
                          {/* Gauge arc */}
                          <path d="M8 32 A 24 24 0 0 1 52 32" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3" strokeLinecap="round" />
                          <path d="M8 32 A 24 24 0 0 1 52 32" fill="none" stroke={edu.color} strokeWidth="3" strokeLinecap="round"
                            strokeOpacity="0.5"
                            style={{
                              strokeDasharray: 70,
                              strokeDashoffset: 70 * (1 - gpaNeedle * 0.7),
                              transition: "stroke-dashoffset 1.5s cubic-bezier(0.22,1,0.36,1)",
                            }} />
                        </svg>
                        <span
                          className="font-['Inter']"
                          style={{
                            fontSize: "24px",
                            fontWeight: 600,
                            background: `linear-gradient(135deg, #fff, ${edu.color})`,
                            WebkitBackgroundClip: "text",
                            WebkitTextFillColor: "transparent",
                          }}
                        >
                          {edu.gpa}
                        </span>
                      </div>

                      {/* Course chips */}
                      <div className="flex flex-wrap gap-1.5">
                        {edu.courses.map((course, ci) => (
                          <span
                            key={course}
                            className="px-2.5 py-1 rounded-lg font-['JetBrains_Mono']"
                            style={{
                              fontSize: "9px",
                              background: `${edu.color}08`,
                              border: `1px solid ${edu.color}12`,
                              color: `${edu.color}90`,
                              opacity: eduShow && eduProgress > 0.3 + eduIdx * 0.2 + ci * 0.05 ? 1 : 0,
                              transform: `scale(${eduShow && eduProgress > 0.3 + eduIdx * 0.2 + ci * 0.05 ? 1 : 0.8})`,
                              transition: `all 0.3s ${ci * 60}ms`,
                            }}
                          >
                            {course}
                          </span>
                        ))}
                      </div>

                      {/* Gear → Circuit morph for SREC */}
                      {eduIdx === 1 && eduProgress > 0.6 && (
                        <div className="mt-4 flex items-center gap-3">
                          <svg width="32" height="32" viewBox="0 0 32 32">
                            <circle cx="16" cy="16" r="8" fill="none" stroke="rgba(245,158,11,0.3)" strokeWidth="1.5"
                              style={{ opacity: 1 - Math.min(1, (eduProgress - 0.6) * 3) }} />
                            <rect x="4" y="4" width="24" height="24" rx="4" fill="none" stroke="rgba(99,102,241,0.3)" strokeWidth="1.5"
                              style={{ opacity: Math.min(1, (eduProgress - 0.6) * 3) }} />
                          </svg>
                          <span className="font-['JetBrains_Mono'] text-white/20" style={{ fontSize: "8px" }}>
                            Mechanical → Data Engineering
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Mobile mission indicator */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-30 lg:hidden">
          {!inEducation && (
            <div className="flex flex-col items-center gap-1">
              <span className="font-['JetBrains_Mono']" style={{ fontSize: "10px", color: MISSIONS[currentMission]?.color + "80" }}>
                {MISSIONS[currentMission]?.codename}
              </span>
              <div className="flex items-center gap-1.5">
                {MISSIONS.map((m, i) => (
                  <div
                    key={m.id}
                    className="h-1 rounded-full transition-all duration-300"
                    style={{
                      width: i === currentMission ? "20px" : "6px",
                      background: i <= currentMission ? m.color + "60" : "rgba(255,255,255,0.06)",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 0.7; }
          50% { opacity: 0.3; }
        }
        @keyframes blink {
          0%, 100% { opacity: 0.6; }
          50% { opacity: 0.2; }
        }
      `}</style>
    </section>
  );
}