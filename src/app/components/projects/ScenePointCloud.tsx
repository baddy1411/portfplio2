import { useMemo } from "react";

interface SceneProps {
  progress: number;
}

// Seed-based pseudo-random for consistent dots
function seededRandom(seed: number) {
  const x = Math.sin(seed * 9301 + 49297) * 49311;
  return x - Math.floor(x);
}

export function ScenePointCloud({ progress }: SceneProps) {
  const beat = progress < 0.3 ? 1 : progress < 0.55 ? 2 : progress < 0.8 ? 3 : 4;

  // Generate dots with random + target positions
  const dots = useMemo(() => {
    const result: Array<{
      rx: number; ry: number;
      tx: number; ty: number;
      size: number;
      brightness: number;
    }> = [];
    const count = 140;

    for (let i = 0; i < count; i++) {
      // Random positions (chaos)
      const rx = seededRandom(i * 3 + 1) * 90 + 5;
      const ry = seededRandom(i * 3 + 2) * 80 + 10;

      // Target positions: perspective grid (road scene)
      const row = Math.floor(i / 14);
      const col = i % 14;
      const depth = row / 9;
      const spreadX = 1 - depth * 0.5;
      const tx = 50 + (col - 7) * (5 * spreadX);
      const ty = 30 + row * 5.5;

      const size = 1.5 + seededRandom(i * 7) * 2;
      const brightness = 0.3 + seededRandom(i * 11) * 0.7;

      result.push({ rx, ry, tx, ty, size, brightness });
    }

    // Add extra dots for "car" shape (raised/brighter cluster)
    const carDots = [
      [48, 52], [50, 52], [52, 52], [54, 52],
      [47, 54], [49, 54], [51, 54], [53, 54], [55, 54],
      [47, 56], [49, 56], [51, 56], [53, 56], [55, 56],
      [48, 58], [50, 58], [52, 58], [54, 58],
    ];

    carDots.forEach(([tx, ty], i) => {
      result.push({
        rx: seededRandom(200 + i * 3) * 90 + 5,
        ry: seededRandom(200 + i * 3 + 1) * 80 + 10,
        tx,
        ty,
        size: 2.5,
        brightness: 1,
      });
    });

    return result;
  }, []);

  // Interpolation factor for dots (0 = chaos, 1 = organized)
  const orgFactor = beat >= 2
    ? Math.min(1, (progress - 0.3) / 0.2)
    : 0;

  // Counter
  const counterValue = beat >= 2
    ? Math.min(40, Math.round(40 * Math.min(1, (progress - 0.3) / 0.2)))
    : 0;

  // Camera frustum visibility
  const frustumOpacity = beat >= 3
    ? Math.min(1, (progress - 0.55) / 0.1)
    : 0;

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden pt-16">
      {/* Point cloud */}
      <div className="absolute inset-0">
        {dots.map((dot, i) => {
          const x = dot.rx + (dot.tx - dot.rx) * orgFactor;
          const y = dot.ry + (dot.ty - dot.ry) * orgFactor;
          const isCar = i >= 140;
          const highlightHard = beat >= 4 && i === 145;

          return (
            <div
              key={i}
              className="absolute rounded-full"
              style={{
                left: `${x}%`,
                top: `${y}%`,
                width: `${dot.size}px`,
                height: `${dot.size}px`,
                background: highlightHard
                  ? "#f59e0b"
                  : isCar && orgFactor > 0.5
                    ? `rgba(129,140,248,${dot.brightness * orgFactor})`
                    : `rgba(255,255,255,${0.08 + dot.brightness * 0.25 * (1 - orgFactor * 0.3)})`,
                boxShadow: highlightHard
                  ? "0 0 12px rgba(245,158,11,0.6)"
                  : isCar && orgFactor > 0.5
                    ? `0 0 6px rgba(129,140,248,${0.3 * orgFactor})`
                    : "none",
                transition: beat >= 2
                  ? `left 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 3}ms, top 1.2s cubic-bezier(0.22, 1, 0.36, 1) ${i * 3}ms, background 0.6s, box-shadow 0.6s`
                  : "none",
                opacity: beat >= 1 ? 1 : 0,
              }}
            />
          );
        })}

        {/* Jitter animation for chaos state */}
        {beat === 1 && (
          <style>{`
            @keyframes jitter {
              0%, 100% { transform: translate(0, 0); }
              25% { transform: translate(1px, -1px); }
              50% { transform: translate(-1px, 1px); }
              75% { transform: translate(1px, 1px); }
            }
          `}</style>
        )}
      </div>

      {/* Camera frustum overlay (beat 3) */}
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        style={{
          opacity: frustumOpacity,
          transition: "opacity 0.6s",
        }}
      >
        {/* Camera frustum (left) */}
        <polygon
          points="15,45 35,35 35,65"
          fill="none"
          stroke="rgba(99,102,241,0.2)"
          strokeWidth="0.3"
          strokeDasharray="1 1"
        />
        <text x="12" y="44" fill="rgba(99,102,241,0.5)" fontSize="2.5" fontFamily="'Inter', sans-serif">
          Camera
        </text>

        {/* LiDAR frustum (right) */}
        <polygon
          points="85,45 65,30 65,60"
          fill="none"
          stroke="rgba(139,92,246,0.2)"
          strokeWidth="0.3"
          strokeDasharray="1 1"
        />
        <text x="82" y="44" fill="rgba(139,92,246,0.5)" fontSize="2.5" fontFamily="'Inter', sans-serif" textAnchor="end">
          LiDAR
        </text>

        {/* Merge zone */}
        <ellipse
          cx="50" cy="50" rx="12" ry="10"
          fill="none"
          stroke="rgba(129,140,248,0.15)"
          strokeWidth="0.3"
          strokeDasharray="2 2"
        />
        <text x="50" y="47" fill="rgba(129,140,248,0.4)" fontSize="2" fontFamily="'Inter', sans-serif" textAnchor="middle">
          FUSION
        </text>
      </svg>

      {/* Content overlay */}
      <div className="relative z-10 max-w-4xl w-full px-6 flex flex-col items-center lg:items-start gap-6">
        {/* Title (fades in over noise) */}
        <div
          className="text-center lg:text-left"
          style={{
            opacity: beat >= 1 ? 1 : 0,
            transform: beat >= 1 ? "translateY(0)" : "translateY(20px)",
            transition: "all 0.8s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <h3 className="font-['Syne'] text-white/90 mb-2" style={{ fontSize: "32px" }}>
            Scalable 4D Perception Engine
          </h3>
          <p className="font-['Inter'] text-white/30" style={{ fontSize: "15px" }}>
            Raw chaos of sensor data condensing into clarity
          </p>
        </div>

        {/* Counter (beat 2) */}
        <div
          style={{
            opacity: beat >= 2 ? 1 : 0,
            transform: beat >= 2 ? "translateY(0)" : "translateY(12px)",
            transition: "all 0.7s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <span
            className="font-['Inter']"
            style={{
              fontSize: "52px",
              fontWeight: 600,
              background: "linear-gradient(135deg, #fff, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {counterValue}%
          </span>
          <span className="font-['Inter'] text-white/25 ml-3" style={{ fontSize: "15px" }}>
            Faster Retrieval
          </span>
        </div>

        {/* Hard example tag (beat 4) */}
        <div
          className="p-3.5 rounded-xl"
          style={{
            background: "rgba(245,158,11,0.05)",
            border: "1px solid rgba(245,158,11,0.1)",
            opacity: beat >= 4 ? 1 : 0,
            transform: beat >= 4 ? "translateY(0)" : "translateY(10px)",
            transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
          }}
        >
          <p className="font-['Inter'] text-amber-400/60" style={{ fontSize: "14px" }}>
            ⚡ GPU-accelerated transformations · Hard examples flagged for re-training
          </p>
        </div>

        {/* Tech chips (beat 4) */}
        <div
          className="flex flex-wrap justify-center lg:justify-start gap-2"
          style={{
            opacity: beat >= 4 ? 1 : 0,
            transition: "opacity 0.6s",
          }}
        >
          {["Python", "C++", "LiDAR", "Camera Pipeline", "CUDA"].map((tag) => (
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
  );
}