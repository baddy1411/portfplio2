import { useMemo } from "react";

interface SceneProps {
  progress: number;
}

const NODES = [
  { label: "DATA", short: "D" },
  { label: "ANNOTATE", short: "A" },
  { label: "TRAIN", short: "T" },
  { label: "EVALUATE", short: "E" },
  { label: "RE-LABEL", short: "R" },
];

export function ScenePipeline({ progress }: SceneProps) {
  const beat = progress < 0.3 ? 1 : progress < 0.6 ? 2 : progress < 0.85 ? 3 : 4;

  const nodes = useMemo(() => {
    const cx = 200, cy = 200, r = 130;
    return NODES.map((node, i) => {
      const angle = (i * 2 * Math.PI / 5) - Math.PI / 2;
      return {
        ...node,
        x: cx + r * Math.cos(angle),
        y: cy + r * Math.sin(angle),
      };
    });
  }, []);

  // Counter: +12% accuracy rolls up in beat 2
  const counterValue = beat >= 2
    ? Math.min(12, Math.round(12 * Math.min(1, (progress - 0.3) / 0.25)))
    : 0;

  // Distribution curve draw progress (beat 4)
  const curveProgress = beat >= 4
    ? Math.min(1, (progress - 0.85) / 0.15)
    : 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center px-6 lg:px-20 pt-16">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-6 lg:gap-16">
        {/* Diagram */}
        <div className="flex-shrink-0 flex justify-center">
          <svg viewBox="0 0 400 400" className="w-[300px] h-[300px] sm:w-[380px] sm:h-[380px] lg:w-[440px] lg:h-[440px]">
            <defs>
              <filter id="glowPipeline">
                <feGaussianBlur stdDeviation="4" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <linearGradient id="arcGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#6366f1" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#a78bfa" stopOpacity="0.1" />
              </linearGradient>
            </defs>

            {/* Circular path for orbiting dot */}
            <circle
              cx="200" cy="200" r="130"
              fill="none"
              stroke="rgba(99,102,241,0.06)"
              strokeWidth="1"
              strokeDasharray="4 6"
              style={{
                opacity: beat >= 1 ? 1 : 0,
                transition: "opacity 0.8s",
              }}
            />

            {/* Connection lines between nodes */}
            {nodes.map((node, i) => {
              const next = nodes[(i + 1) % 5];
              const nodeOpacity = Math.min(1, Math.max(0, progress * 8 - i * 0.8));
              return (
                <line
                  key={`conn-${i}`}
                  x1={node.x} y1={node.y}
                  x2={next.x} y2={next.y}
                  stroke="rgba(99,102,241,0.12)"
                  strokeWidth="1"
                  strokeDasharray="3 5"
                  style={{
                    opacity: nodeOpacity,
                    transition: "opacity 0.6s",
                  }}
                />
              );
            })}

            {/* Short circuit: EVALUATE → ANNOTATE (beat 3) */}
            <line
              x1={nodes[3].x} y1={nodes[3].y}
              x2={nodes[1].x} y2={nodes[1].y}
              stroke="rgba(248,113,113,0.5)"
              strokeWidth="1.5"
              strokeDasharray="6 4"
              style={{
                opacity: beat >= 3 ? 1 : 0,
                transition: "opacity 0.6s",
              }}
            />
            {beat >= 3 && (
              <text
                x={(nodes[3].x + nodes[1].x) / 2 + 8}
                y={(nodes[3].y + nodes[1].y) / 2 - 8}
                fill="rgba(248,113,113,0.5)"
                fontSize="7"
                fontFamily="'Inter', sans-serif"
                style={{ opacity: beat >= 3 ? 1 : 0, transition: "opacity 0.6s" }}
              >
                re-route
              </text>
            )}

            {/* Nodes */}
            {nodes.map((node, i) => {
              const nodeOpacity = Math.min(1, Math.max(0, progress * 8 - i * 0.8));
              const isEval = i === 3;
              const pulsing = beat >= 3 && isEval;
              const healthy = beat >= 4;

              return (
                <g key={node.label}>
                  {/* Healthy glow (beat 4) */}
                  {healthy && (
                    <circle
                      cx={node.x} cy={node.y} r="30"
                      fill={`rgba(99,102,241,0.04)`}
                      style={{ transition: "all 0.8s" }}
                    />
                  )}
                  {/* Pulse ring for EVALUATE */}
                  {pulsing && !healthy && (
                    <>
                      <circle cx={node.x} cy={node.y} r="26" fill="none"
                        stroke="rgba(248,113,113,0.25)" strokeWidth="1">
                        <animate attributeName="r" from="26" to="42" dur="1.8s" repeatCount="indefinite" />
                        <animate attributeName="opacity" from="0.4" to="0" dur="1.8s" repeatCount="indefinite" />
                      </circle>
                    </>
                  )}
                  {/* Node background */}
                  <circle
                    cx={node.x} cy={node.y} r="22"
                    fill={pulsing && !healthy ? "rgba(248,113,113,0.08)" : "rgba(255,255,255,0.03)"}
                    stroke={pulsing && !healthy ? "rgba(248,113,113,0.25)" : healthy ? "rgba(99,102,241,0.25)" : "rgba(255,255,255,0.08)"}
                    strokeWidth="1"
                    style={{
                      opacity: nodeOpacity,
                      transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  />
                  {/* Node label */}
                  <text
                    x={node.x} y={node.y + 1}
                    textAnchor="middle"
                    dominantBaseline="middle"
                    fill={pulsing && !healthy ? "rgba(248,113,113,0.7)" : "rgba(255,255,255,0.45)"}
                    fontSize="7"
                    fontFamily="'JetBrains Mono', monospace"
                    letterSpacing="0.5"
                    style={{
                      opacity: nodeOpacity,
                      transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
                    }}
                  >
                    {node.label}
                  </text>
                </g>
              );
            })}

            {/* Orbiting dot */}
            {beat >= 2 && (
              <circle r="4" fill="#818cf8" filter="url(#glowPipeline)">
                <animateMotion
                  dur="4s"
                  repeatCount="indefinite"
                >
                  <mpath xlinkHref="#orbitPath" />
                </animateMotion>
              </circle>
            )}

            {/* Orbit path for animateMotion */}
            <path
              id="orbitPath"
              d="M 200 70 A 130 130 0 1 1 199.99 70"
              fill="none"
              stroke="none"
            />

            {/* Distribution curve (beat 4) */}
            {beat >= 4 && (
              <path
                d="M 280 360 Q 300 360 310 340 Q 320 300 330 295 Q 340 300 350 340 Q 360 360 380 360"
                fill="none"
                stroke="rgba(99,102,241,0.3)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeDasharray="120"
                strokeDashoffset={120 * (1 - curveProgress)}
                style={{ transition: "stroke-dashoffset 0.8s ease-out" }}
              />
            )}
          </svg>
        </div>

        {/* Text content */}
        <div className="flex-1 space-y-5 text-center lg:text-left">
          {/* Title (beat 2) */}
          <div
            style={{
              opacity: beat >= 2 ? 1 : 0,
              transform: beat >= 2 ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h3 className="font-['Syne'] text-white/90 mb-2" style={{ fontSize: "32px" }}>
              Automated Evaluation Factory
            </h3>
            <p className="font-['Inter'] text-white/30" style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Closed-loop active learning pipeline for multimodal LLMs with human-in-the-loop annotation
            </p>
          </div>

          {/* Counter (beat 2) */}
          <div
            style={{
              opacity: beat >= 2 ? 1 : 0,
              transform: beat >= 2 ? "translateY(0)" : "translateY(12px)",
              transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1) 0.15s",
            }}
          >
            <span
              className="font-['Inter']"
              style={{
                fontSize: "52px",
                fontWeight: 600,
                background: "linear-gradient(135deg, #fff, #818cf8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              +{counterValue}%
            </span>
            <span className="font-['Inter'] text-white/25 ml-3" style={{ fontSize: "15px" }}>
              Model Accuracy
            </span>
          </div>

          {/* Alert (beat 3) */}
          <div
            className="p-3.5 rounded-xl inline-block lg:block"
            style={{
              background: "rgba(248,113,113,0.05)",
              border: "1px solid rgba(248,113,113,0.1)",
              opacity: beat >= 3 ? 1 : 0,
              transform: beat >= 3 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <p className="font-['Inter'] text-red-400/60" style={{ fontSize: "14px" }}>
              ⚡ High-loss samples auto-routed back to annotation queue
            </p>
          </div>

          {/* CI/CD note + chips (beat 4) */}
          <div
            style={{
              opacity: beat >= 4 ? 1 : 0,
              transform: beat >= 4 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <p className="font-['Inter'] text-white/25 mb-3" style={{ fontSize: "13px" }}>
              CI/CD: Prometheus monitors data drift in real-time
            </p>
            <div className="flex flex-wrap justify-center lg:justify-start gap-2">
              {["Django", "GitHub Actions", "Prometheus", "MLflow"].map((tag) => (
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
      </div>
    </div>
  );
}