import { useEffect, useState } from "react";

interface SceneProps {
  progress: number;
}

const ENDPOINTS = [
  { label: "AWS IoT FleetWise", angle: 0, color: "#f59e0b" },
  { label: "Amazon Timestream", angle: -90, color: "#3b82f6" },
  { label: "Grafana Dashboard", angle: 180, color: "#34d399" },
  { label: "Raspberry Pi Edge", angle: 90, color: "#8b5cf6" },
];

// Simple sine-wave graph data generator
function useWaveData() {
  const [data, setData] = useState<number[]>(() => {
    const d = [];
    for (let i = 0; i < 40; i++) d.push(0.5 + Math.sin(i * 0.3) * 0.3);
    return d;
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setData((prev) => {
        const next = [...prev.slice(1)];
        const last = prev[prev.length - 1];
        next.push(Math.max(0.1, Math.min(0.9, last + (Math.random() - 0.5) * 0.15)));
        return next;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return data;
}

export function SceneTelematics({ progress }: SceneProps) {
  const beat = progress < 0.3 ? 1 : progress < 0.6 ? 2 : progress < 0.8 ? 3 : 4;

  const waveData = useWaveData();

  // Line draw progress (beat 2)
  const lineProgress = beat >= 2
    ? Math.min(1, (progress - 0.3) / 0.2)
    : 0;

  // Latency countdown (beat 4)
  const latencyStages = [2000, 1200, 800, 487];
  const latencyIndex = beat >= 4
    ? Math.min(3, Math.floor((progress - 0.8) / 0.05))
    : -1;

  // Signal ring pulse visibility
  const signalOpacity = beat >= 1 ? 1 : 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center px-6 lg:px-20 pt-16">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
        {/* Car + Signal diagram */}
        <div className="flex-shrink-0 relative" style={{ width: "400px", height: "400px" }}>
          <svg viewBox="0 0 340 340" className="w-full h-full">
            <defs>
              <filter id="glowTelem">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Signal rings from car */}
            {[1, 2, 3].map((ring) => (
              <circle
                key={ring}
                cx="170" cy="170" r={30 + ring * 20}
                fill="none"
                stroke="rgba(99,102,241,0.08)"
                strokeWidth="0.5"
                style={{
                  opacity: signalOpacity,
                  transition: "opacity 0.8s",
                }}
              >
                <animate
                  attributeName="r"
                  from={30 + ring * 20}
                  to={30 + ring * 20 + 15}
                  dur={`${2 + ring * 0.5}s`}
                  repeatCount="indefinite"
                />
                <animate
                  attributeName="opacity"
                  from="0.3"
                  to="0"
                  dur={`${2 + ring * 0.5}s`}
                  repeatCount="indefinite"
                />
              </circle>
            ))}

            {/* Car outline (simplified top-down view) */}
            <g
              style={{
                opacity: beat >= 1 ? 1 : 0,
                transition: "opacity 0.8s",
              }}
            >
              <rect x="155" y="148" width="30" height="44" rx="8"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.15)"
                strokeWidth="1"
              />
              {/* Windows */}
              <rect x="159" y="152" width="22" height="10" rx="3"
                fill="rgba(99,102,241,0.08)"
                stroke="rgba(99,102,241,0.15)"
                strokeWidth="0.5"
              />
              <rect x="159" y="176" width="22" height="10" rx="3"
                fill="rgba(99,102,241,0.08)"
                stroke="rgba(99,102,241,0.15)"
                strokeWidth="0.5"
              />
              {/* Wheels */}
              <rect x="150" y="155" width="4" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
              <rect x="186" y="155" width="4" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
              <rect x="150" y="177" width="4" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
              <rect x="186" y="177" width="4" height="8" rx="2" fill="rgba(255,255,255,0.15)" />
              {/* Center dot */}
              <circle cx="170" cy="170" r="3" fill="#818cf8" filter="url(#glowTelem)">
                <animate attributeName="opacity" from="0.5" to="1" dur="1.5s" repeatCount="indefinite" />
              </circle>
            </g>

            {/* Connection lines to endpoints (beat 2) */}
            {ENDPOINTS.map((ep, i) => {
              const rad = (ep.angle * Math.PI) / 180;
              const endX = 170 + Math.cos(rad) * 130;
              const endY = 170 + Math.sin(rad) * 130;
              const visible = lineProgress > i * 0.2;

              return (
                <g key={ep.label}>
                  {/* Connection line */}
                  <line
                    x1="170" y1="170"
                    x2={endX} y2={endY}
                    stroke={`${ep.color}40`}
                    strokeWidth="1"
                    strokeDasharray="4 4"
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: "opacity 0.5s",
                      strokeDashoffset: visible ? 0 : 130,
                    }}
                  />
                  {/* Endpoint node */}
                  <g
                    style={{
                      opacity: visible ? 1 : 0,
                      transition: "opacity 0.4s",
                    }}
                  >
                    <circle cx={endX} cy={endY} r="16"
                      fill="rgba(255,255,255,0.02)"
                      stroke={`${ep.color}30`}
                      strokeWidth="1"
                    />
                    <circle cx={endX} cy={endY} r="3" fill={`${ep.color}80`} />
                    <text
                      x={endX}
                      y={endY + (ep.angle === -90 ? -22 : ep.angle === 90 ? 26 : 0)}
                      textAnchor="middle"
                      dominantBaseline="middle"
                      dx={ep.angle === 0 ? 30 : ep.angle === 180 ? -30 : 0}
                      fill="rgba(255,255,255,0.35)"
                      fontSize="7"
                      fontFamily="'Inter', sans-serif"
                    >
                      {ep.label}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>

        {/* Right panel: text + live graph */}
        <div className="flex-1 space-y-5 text-center lg:text-left">
          {/* Title */}
          <div
            style={{
              opacity: beat >= 1 ? 1 : 0,
              transform: beat >= 1 ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h3 className="font-['Syne'] text-white/90 mb-2" style={{ fontSize: "32px" }}>
              Vehicle Telematics Visualization
            </h3>
            <p className="font-['Inter'] text-white/30" style={{ fontSize: "15px" }}>
              10,000+ signals/sec · &lt;500ms latency
            </p>
          </div>

          {/* Live graph panel (beat 3) */}
          <div
            className="rounded-xl p-4 relative overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: "1px solid rgba(255,255,255,0.06)",
              backdropFilter: "blur(20px)",
              opacity: beat >= 3 ? 1 : 0,
              transform: beat >= 3 ? "translateX(0)" : "translateX(20px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {/* Header */}
            <div className="flex items-center justify-between mb-3">
              <span className="font-['Inter'] text-white/30" style={{ fontSize: "12px" }}>
                Real-time Telemetry
              </span>
              <div className="flex items-center gap-1.5">
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" style={{ animation: "blink 1.5s infinite" }} />
                <span className="font-['JetBrains_Mono'] text-emerald-400/70" style={{ fontSize: "10px" }}>
                  LIVE
                </span>
              </div>
            </div>

            {/* Wave graph */}
            <svg viewBox="0 0 200 60" className="w-full h-20">
              <defs>
                <linearGradient id="waveGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(99,102,241,0.2)" />
                  <stop offset="100%" stopColor="rgba(99,102,241,0)" />
                </linearGradient>
              </defs>
              {/* Area fill */}
              <path
                d={`M 0 60 ${waveData.map((v, i) => `L ${(i / 39) * 200} ${60 - v * 50}`).join(" ")} L 200 60 Z`}
                fill="url(#waveGrad)"
              />
              {/* Line */}
              <polyline
                points={waveData.map((v, i) => `${(i / 39) * 200},${60 - v * 50}`).join(" ")}
                fill="none"
                stroke="rgba(99,102,241,0.6)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>

            <div className="flex justify-between mt-2">
              <span className="font-['JetBrains_Mono'] text-white/15" style={{ fontSize: "9px" }}>-30s</span>
              <span className="font-['JetBrains_Mono'] text-white/15" style={{ fontSize: "9px" }}>now</span>
            </div>
          </div>

          {/* Latency countdown (beat 4) */}
          <div
            className="flex items-center gap-3"
            style={{
              opacity: beat >= 4 ? 1 : 0,
              transform: beat >= 4 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            {latencyStages.map((ms, i) => {
              const crossed = latencyIndex > i;
              const active = latencyIndex === i;
              const isLast = i === latencyStages.length - 1;
              return (
                <div key={ms} className="flex items-center gap-2">
                  <span
                    className="font-['JetBrains_Mono'] relative"
                    style={{
                      fontSize: active ? "20px" : "14px",
                      color: crossed
                        ? "rgba(255,255,255,0.12)"
                        : active
                          ? isLast
                            ? "rgba(52,211,153,0.9)"
                            : "rgba(255,255,255,0.7)"
                          : "rgba(255,255,255,0.2)",
                      textDecoration: crossed ? "line-through" : "none",
                      transition: "all 0.3s",
                    }}
                  >
                    {ms}ms
                    {active && isLast && (
                      <span className="ml-1" style={{ color: "rgba(52,211,153,0.9)" }}>✓</span>
                    )}
                  </span>
                  {i < latencyStages.length - 1 && (
                    <span className="text-white/10" style={{ fontSize: "10px" }}>→</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Tech chips (beat 4) */}
          <div
            className="flex flex-wrap justify-center lg:justify-start gap-2"
            style={{
              opacity: beat >= 4 ? 1 : 0,
              transition: "opacity 0.6s",
            }}
          >
            {["AWS IoT FleetWise", "Timestream", "Grafana", "Raspberry Pi", "Python"].map((tag) => (
              <span
                key={tag}
                className="px-3 py-1.5 rounded-lg font-['JetBrains_Mono']"
                style={{
                  fontSize: "11px",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  color: "rgba(255,255,255,0.4)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  );
}