import { useEffect, useState } from "react";

interface SceneProps {
  progress: number;
}

// Animated sine wave line
function WaveLine({ amplitude, frequency, offset, color, smooth, progress: drawProgress }: {
  amplitude: number;
  frequency: number;
  offset: number;
  color: string;
  smooth: number;
  progress: number;
}) {
  const points: string[] = [];
  const width = 200;
  for (let x = 0; x <= width; x += 2) {
    const noise = smooth < 1
      ? Math.sin(x * 0.3 + offset) * (1 - smooth) * amplitude * 0.5
      : 0;
    const y = 20 + Math.sin(x * frequency * 0.02 + offset) * amplitude * smooth + noise;
    points.push(`${x},${y}`);
  }

  return (
    <polyline
      points={points.join(" ")}
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeDasharray="300"
      strokeDashoffset={300 * (1 - drawProgress)}
      style={{ transition: "stroke-dashoffset 1s ease-out" }}
    />
  );
}

const ARCH_NODES = [
  { label: "IoT Sensors", x: 5, color: "#34d399" },
  { label: "Airflow DAG", x: 23, color: "#6366f1" },
  { label: "dbt Transform", x: 41, color: "#f59e0b" },
  { label: "BigQuery", x: 59, color: "#3b82f6" },
  { label: "Dashboard", x: 77, color: "#8b5cf6" },
];

export function SceneMedallion({ progress }: SceneProps) {
  const beat = progress < 0.3 ? 1 : progress < 0.6 ? 2 : progress < 0.8 ? 3 : 4;

  // Layer visibility (stagger)
  const bronzeOpacity = Math.min(1, progress / 0.1);
  const silverOpacity = Math.min(1, Math.max(0, (progress - 0.08) / 0.1));
  const goldOpacity = Math.min(1, Math.max(0, (progress - 0.16) / 0.1));

  // Data drop animation (beat 2)
  const dropProgress = beat >= 2
    ? Math.min(1, (progress - 0.3) / 0.25)
    : 0;

  // Anomaly flash (beat 3)
  const anomalyVisible = beat >= 3;
  const latencyValue = beat >= 3
    ? Math.min(65, Math.round(65 * Math.min(1, (progress - 0.6) / 0.15)))
    : 0;

  // Architecture assembly (beat 4)
  const archProgress = beat >= 4
    ? Math.min(1, (progress - 0.8) / 0.15)
    : 0;

  // Animated drop Y position
  const dropPhase = dropProgress;

  return (
    <div className="relative w-full h-full flex items-center justify-center px-6 lg:px-20 pt-16">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-16">
        {/* Layered diagram */}
        <div className="flex-shrink-0 relative" style={{ width: "400px", height: "380px" }}>
          {/* Three layers */}
          {[
            {
              label: "GOLD",
              sublabel: "Analytics Ready",
              y: 20,
              color: "rgba(245,158,11,0.15)",
              borderColor: "rgba(245,158,11,0.2)",
              textColor: "rgba(245,158,11,0.6)",
              opacity: goldOpacity,
              waveAmplitude: 8,
              waveSmooth: 1,
              waveColor: "rgba(245,158,11,0.4)",
            },
            {
              label: "SILVER",
              sublabel: "Cleaned & Validated",
              y: 130,
              color: "rgba(192,192,210,0.08)",
              borderColor: "rgba(192,192,210,0.12)",
              textColor: "rgba(192,192,210,0.5)",
              opacity: silverOpacity,
              waveAmplitude: 12,
              waveSmooth: 0.6,
              waveColor: "rgba(192,192,210,0.3)",
            },
            {
              label: "BRONZE",
              sublabel: "Raw IoT Sensor Data",
              y: 240,
              color: "rgba(180,130,80,0.06)",
              borderColor: "rgba(180,130,80,0.1)",
              textColor: "rgba(180,130,80,0.5)",
              opacity: bronzeOpacity,
              waveAmplitude: 20,
              waveSmooth: 0.2,
              waveColor: "rgba(180,130,80,0.3)",
            },
          ].map((layer) => (
            <div
              key={layer.label}
              className="absolute left-0 right-0 rounded-xl overflow-hidden"
              style={{
                top: `${layer.y}px`,
                height: "96px",
                background: layer.color,
                border: `1px solid ${layer.borderColor}`,
                opacity: layer.opacity,
                transition: "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              {/* Label */}
              <div className="absolute top-3 left-4 flex items-center gap-2">
                <span className="font-['JetBrains_Mono']" style={{ fontSize: "10px", color: layer.textColor, letterSpacing: "1px" }}>
                  {layer.label}
                </span>
                <span className="font-['Inter']" style={{ fontSize: "10px", color: `${layer.textColor}80` }}>
                  — {layer.sublabel}
                </span>
              </div>

              {/* Wave line */}
              <svg className="absolute bottom-0 left-4 right-4" viewBox="0 0 200 40" style={{ width: "calc(100% - 32px)", height: "40px" }}>
                <WaveLine
                  amplitude={layer.waveAmplitude}
                  frequency={layer.label === "GOLD" ? 3 : layer.label === "SILVER" ? 5 : 8}
                  offset={layer.y}
                  color={layer.waveColor}
                  smooth={layer.waveSmooth}
                  progress={layer.opacity}
                />
              </svg>
            </div>
          ))}

          {/* Data drop (beat 2) */}
          {beat >= 2 && (
            <div
              className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full z-10"
              style={{
                top: `${-10 + dropPhase * 350}px`,
                background: dropPhase < 0.33
                  ? "rgba(180,130,80,0.8)"
                  : dropPhase < 0.66
                    ? "rgba(192,192,210,0.8)"
                    : "rgba(245,158,11,0.9)",
                boxShadow: `0 0 ${8 + dropPhase * 8}px ${
                  dropPhase < 0.33
                    ? "rgba(180,130,80,0.4)"
                    : dropPhase < 0.66
                      ? "rgba(192,192,210,0.4)"
                      : "rgba(245,158,11,0.5)"
                }`,
                transition: "top 0.3s ease-out, background 0.3s, box-shadow 0.3s",
                // Reduce size as it gets cleaner
                width: `${12 - dropPhase * 4}px`,
                height: `${12 - dropPhase * 4}px`,
              }}
            />
          )}

          {/* Anomaly spike (beat 3) */}
          {anomalyVisible && (
            <div
              className="absolute right-6 top-6"
              style={{
                opacity: anomalyVisible ? 1 : 0,
                transition: "opacity 0.6s",
              }}
            >
              <div className="relative">
                {/* Pulsing ring */}
                <div
                  className="absolute -inset-2 rounded-full"
                  style={{
                    border: "1px solid rgba(248,113,113,0.3)",
                    animation: "pulse 1.5s ease-in-out infinite",
                  }}
                />
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center"
                  style={{
                    background: "rgba(248,113,113,0.1)",
                    border: "1px solid rgba(248,113,113,0.25)",
                  }}
                >
                  <span style={{ fontSize: "10px", color: "rgba(248,113,113,0.7)" }}>!</span>
                </div>
              </div>
            </div>
          )}

          {/* Architecture nodes (beat 4) */}
          {beat >= 4 && (
            <div
              className="absolute -bottom-14 left-0 right-0 flex items-center justify-between"
              style={{
                opacity: archProgress,
                transition: "opacity 0.6s",
              }}
            >
              {ARCH_NODES.map((node, i) => (
                <div
                  key={node.label}
                  className="flex flex-col items-center gap-1"
                  style={{
                    opacity: Math.min(1, archProgress * 5 - i),
                    transform: `translateY(${Math.max(0, (1 - archProgress * 5 + i) * 10)}px)`,
                    transition: "all 0.4s cubic-bezier(0.22, 1, 0.36, 1)",
                  }}
                >
                  <div
                    className="w-5 h-5 rounded-md flex items-center justify-center"
                    style={{
                      background: `${node.color}15`,
                      border: `1px solid ${node.color}25`,
                    }}
                  >
                    <div className="w-1.5 h-1.5 rounded-full" style={{ background: `${node.color}80` }} />
                  </div>
                  <span className="font-['JetBrains_Mono'] text-white/25 whitespace-nowrap" style={{ fontSize: "6px" }}>
                    {node.label}
                  </span>
                </div>
              ))}
              {/* Connection arrows */}
              <svg className="absolute top-2.5 left-0 right-0 h-[2px] -z-10" viewBox="0 0 100 2" preserveAspectRatio="none">
                <line x1="8" y1="1" x2="92" y2="1" stroke="rgba(255,255,255,0.06)" strokeWidth="0.5" strokeDasharray="2 2" />
              </svg>
            </div>
          )}
        </div>

        {/* Text content */}
        <div className="flex-1 space-y-5 text-center lg:text-left">
          <div
            style={{
              opacity: beat >= 1 ? 1 : 0,
              transform: beat >= 1 ? "translateY(0)" : "translateY(16px)",
              transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <h3 className="font-['Syne'] text-white/90 mb-2" style={{ fontSize: "32px" }}>
              Carbon Intelligence Platform
            </h3>
            <p className="font-['Inter'] text-white/30" style={{ fontSize: "15px", lineHeight: "1.6" }}>
              Net-zero monitoring with Medallion Architecture — data flowing through bronze, silver, and gold tiers
            </p>
          </div>

          {/* Anomaly flag (beat 3) */}
          <div
            className="p-3.5 rounded-xl inline-block lg:block"
            style={{
              background: "rgba(52,211,153,0.05)",
              border: "1px solid rgba(52,211,153,0.1)",
              opacity: beat >= 3 ? 1 : 0,
              transform: beat >= 3 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <p className="font-['Inter'] text-emerald-400/60" style={{ fontSize: "14px" }}>
              ✓ 99% of sensor anomalies flagged automatically via Great Expectations
            </p>
          </div>

          {/* Latency counter (beat 3) */}
          <div
            style={{
              opacity: beat >= 3 ? 1 : 0,
              transition: "opacity 0.6s",
            }}
          >
            <div className="flex items-center gap-3">
              <span
                className="font-['Inter']"
                style={{
                  fontSize: "44px",
                  fontWeight: 600,
                  background: "linear-gradient(135deg, #fff, #34d399)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {latencyValue}%
              </span>
              <span className="font-['Inter'] text-white/25" style={{ fontSize: "15px" }}>
                Latency Reduced
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-56 h-1.5 rounded-full mt-2" style={{ background: "rgba(255,255,255,0.04)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${(latencyValue / 65) * 100}%`,
                  background: "linear-gradient(90deg, #34d399, #6366f1)",
                  transition: "width 0.3s ease-out",
                }}
              />
            </div>
          </div>

          {/* Tech chips (beat 4) */}
          <div
            className="flex flex-wrap justify-center lg:justify-start gap-2"
            style={{
              opacity: beat >= 4 ? 1 : 0,
              transition: "opacity 0.6s",
            }}
          >
            {["dbt", "Airflow", "GCP", "BigQuery", "Great Expectations"].map((tag) => (
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
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.5; }
          50% { transform: scale(1.4); opacity: 0; }
        }
      `}</style>
    </div>
  );
}