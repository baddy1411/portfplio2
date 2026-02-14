interface SceneProps {
  progress: number;
}

const AUTH_STEPS = [
  { label: "User Request", icon: "👤", color: "#6366f1" },
  { label: "Cognito Auth", icon: "🔒", color: "#f59e0b" },
  { label: "API Gateway", icon: "🌐", color: "#3b82f6" },
  { label: "Lambda", icon: "⚡", color: "#8b5cf6" },
  { label: "S3 Workspace", icon: "📦", color: "#34d399" },
];

const PIPELINE_STAGES = [
  { label: "SOURCE", status: "pending" },
  { label: "BUILD", status: "pending" },
  { label: "DEPLOY", status: "pending" },
];

const CODE_LINES = [
  "import boto3",
  "from aws_cdk import Stack",
  "",
  "class WorkspaceStack(Stack):",
  "  def __init__(self, scope):",
  '    bucket = s3.Bucket(',
  '      self, "workspace",',
  '      auto_delete=True',
  "    )",
  "",
  '    fn = lambda_.Function(',
  '      self, "provisioner",',
  '      runtime=Runtime.PY_3_12',
  "    )",
];

const FILE_TREE = [
  { name: "workspace/", indent: 0 },
  { name: "src/", indent: 1 },
  { name: "app.py", indent: 2 },
  { name: "handlers/", indent: 2 },
  { name: "provision.py", indent: 3 },
  { name: "config/", indent: 1 },
  { name: "cdk.json", indent: 2 },
  { name: "requirements.txt", indent: 1 },
];

export function SceneServerless({ progress }: SceneProps) {
  const beat = progress < 0.3 ? 1 : progress < 0.55 ? 2 : progress < 0.8 ? 3 : 4;

  // Workspace fill progress (beat 2)
  const fillProgress = beat >= 2
    ? Math.min(1, (progress - 0.3) / 0.2)
    : 0;

  // Auth flow progress (beat 3)
  const authProgress = beat >= 3
    ? Math.min(1, (progress - 0.55) / 0.2)
    : 0;

  // Pipeline progress (beat 4)
  const pipelineProgress = beat >= 4
    ? Math.min(1, (progress - 0.8) / 0.15)
    : 0;

  // Visible code lines
  const visibleLines = Math.floor(fillProgress * CODE_LINES.length);
  const visibleFiles = Math.floor(fillProgress * FILE_TREE.length);

  // Pipeline stage completion
  const completedStages = Math.floor(pipelineProgress * 3);

  return (
    <div className="relative w-full h-full flex items-center justify-center px-6 lg:px-20 pt-16">
      <div className="max-w-5xl w-full flex flex-col lg:flex-row items-center gap-8 lg:gap-14">
        {/* Workspace visualization */}
        <div className="flex-shrink-0 relative" style={{ width: "420px" }}>
          {/* Workspace container */}
          <div
            className="rounded-xl overflow-hidden"
            style={{
              background: "rgba(255,255,255,0.02)",
              border: `1px solid ${beat >= 2 ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.04)"}`,
              transition: "border-color 0.6s",
              height: "320px",
            }}
          >
            {/* Title bar */}
            <div
              className="flex items-center gap-2 px-3 py-2"
              style={{
                background: "rgba(255,255,255,0.03)",
                borderBottom: "1px solid rgba(255,255,255,0.04)",
                opacity: fillProgress > 0 ? 1 : 0,
                transform: fillProgress > 0 ? "translateX(0)" : "translateX(-20px)",
                transition: "all 0.5s cubic-bezier(0.22, 1, 0.36, 1)",
              }}
            >
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-red-400/40" />
                <div className="w-2 h-2 rounded-full bg-amber-400/40" />
                <div className="w-2 h-2 rounded-full bg-emerald-400/40" />
              </div>
              <span className="font-['JetBrains_Mono'] text-white/20 ml-2" style={{ fontSize: "10px" }}>
                workspace — provisioned
              </span>
            </div>

            {/* Content area */}
            <div className="flex h-[calc(100%-32px)]">
              {/* File tree sidebar */}
              <div
                className="border-r py-2 px-2 flex-shrink-0"
                style={{
                  width: "120px",
                  borderColor: "rgba(255,255,255,0.04)",
                  opacity: fillProgress > 0.2 ? 1 : 0,
                  transition: "opacity 0.5s",
                }}
              >
                {FILE_TREE.map((file, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-1 py-0.5"
                    style={{
                      paddingLeft: `${file.indent * 10}px`,
                      opacity: i < visibleFiles ? 1 : 0,
                      transform: i < visibleFiles ? "translateY(0)" : "translateY(6px)",
                      transition: `all 0.3s cubic-bezier(0.22, 1, 0.36, 1) ${i * 50}ms`,
                    }}
                  >
                    <span className="font-['JetBrains_Mono'] text-white/25" style={{ fontSize: "9px" }}>
                      {file.name.endsWith("/") ? "📁" : "📄"}
                    </span>
                    <span
                      className="font-['JetBrains_Mono']"
                      style={{
                        fontSize: "9px",
                        color: file.name.endsWith("/")
                          ? "rgba(129,140,248,0.5)"
                          : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {file.name}
                    </span>
                  </div>
                ))}
              </div>

              {/* Code editor area */}
              <div className="flex-1 py-2 px-3 overflow-hidden">
                {CODE_LINES.map((line, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2"
                    style={{
                      opacity: i < visibleLines ? 1 : 0,
                      transition: `opacity 0.2s ${i * 30}ms`,
                    }}
                  >
                    <span className="font-['JetBrains_Mono'] text-white/10 w-5 text-right flex-shrink-0" style={{ fontSize: "9px" }}>
                      {i + 1}
                    </span>
                    <span
                      className="font-['JetBrains_Mono']"
                      style={{
                        fontSize: "9.5px",
                        color: line.startsWith("import") || line.startsWith("from")
                          ? "rgba(139,92,246,0.6)"
                          : line.startsWith("class") || line.startsWith("  def")
                            ? "rgba(99,102,241,0.7)"
                            : line.includes('"')
                              ? "rgba(52,211,153,0.5)"
                              : "rgba(255,255,255,0.3)",
                        whiteSpace: "pre",
                      }}
                    >
                      {line}
                    </span>
                  </div>
                ))}
                {/* Blinking cursor */}
                {visibleLines > 0 && visibleLines < CODE_LINES.length && (
                  <span
                    className="inline-block w-[1px] h-3 ml-6"
                    style={{
                      background: "rgba(99,102,241,0.6)",
                      animation: "cursorBlink 1s infinite",
                    }}
                  />
                )}
              </div>
            </div>

            {/* Empty state (beat 1) */}
            {beat === 1 && (
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{
                  opacity: 1 - fillProgress * 3,
                  transition: "opacity 0.3s",
                }}
              >
                <div className="text-center">
                  <span
                    className="font-['JetBrains_Mono'] text-white/15"
                    style={{ fontSize: "14px" }}
                  >
                    [ EMPTY WORKSPACE ]
                  </span>
                  <span
                    className="inline-block w-[1px] h-4 ml-1"
                    style={{
                      background: "rgba(255,255,255,0.2)",
                      animation: "cursorBlink 1s infinite",
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Auth flow diagram (beat 3) */}
          {beat >= 3 && (
            <div
              className="mt-5 flex items-center justify-between"
              style={{
                opacity: authProgress,
                transition: "opacity 0.6s",
              }}
            >
              {AUTH_STEPS.map((step, i) => {
                const stepVisible = authProgress > i * 0.2;
                const isLock = i === 1;
                const passed = authProgress > (i + 1) * 0.2;

                return (
                  <div key={step.label} className="flex items-center gap-0">
                    {/* Step node */}
                    <div
                      className="flex flex-col items-center gap-1"
                      style={{
                        opacity: stepVisible ? 1 : 0,
                        transform: stepVisible ? "translateY(0)" : "translateY(8px)",
                        transition: `all 0.4s cubic-bezier(0.22, 1, 0.36, 1) ${i * 80}ms`,
                      }}
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center relative"
                        style={{
                          background: `${step.color}10`,
                          border: `1px solid ${step.color}25`,
                        }}
                      >
                        <span style={{ fontSize: "11px" }}>{step.icon}</span>
                        {isLock && passed && (
                          <div
                            className="absolute -top-1 -right-1 w-3 h-3 rounded-full flex items-center justify-center"
                            style={{
                              background: "rgba(52,211,153,0.2)",
                              border: "1px solid rgba(52,211,153,0.3)",
                            }}
                          >
                            <span style={{ fontSize: "6px" }}>✓</span>
                          </div>
                        )}
                      </div>
                      <span className="font-['JetBrains_Mono'] text-white/25 whitespace-nowrap" style={{ fontSize: "6px" }}>
                        {step.label}
                      </span>
                    </div>

                    {/* Arrow */}
                    {i < AUTH_STEPS.length - 1 && (
                      <div
                        className="w-4 h-[1px] mx-0.5"
                        style={{
                          background: passed
                            ? `${step.color}40`
                            : "rgba(255,255,255,0.06)",
                          transition: "background 0.4s",
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {/* Pipeline stages (beat 4) */}
          {beat >= 4 && (
            <div
              className="mt-5 flex items-center justify-center gap-4"
              style={{
                opacity: pipelineProgress > 0 ? 1 : 0,
                transition: "opacity 0.6s",
              }}
            >
              {PIPELINE_STAGES.map((stage, i) => {
                const completed = i < completedStages;
                const active = i === completedStages;

                return (
                  <div key={stage.label} className="flex items-center gap-3">
                    <div
                      className="px-4 py-2 rounded-lg flex items-center gap-2"
                      style={{
                        background: completed
                          ? "rgba(52,211,153,0.08)"
                          : active
                            ? "rgba(99,102,241,0.08)"
                            : "rgba(255,255,255,0.02)",
                        border: `1px solid ${
                          completed
                            ? "rgba(52,211,153,0.2)"
                            : active
                              ? "rgba(99,102,241,0.2)"
                              : "rgba(255,255,255,0.04)"
                        }`,
                        transition: "all 0.4s",
                      }}
                    >
                      <span
                        className="font-['JetBrains_Mono']"
                        style={{
                          fontSize: "10px",
                          color: completed
                            ? "rgba(52,211,153,0.8)"
                            : active
                              ? "rgba(129,140,248,0.8)"
                              : "rgba(255,255,255,0.3)",
                        }}
                      >
                        {stage.label}
                      </span>
                      {completed && (
                        <span style={{ fontSize: "10px", color: "rgba(52,211,153,0.8)" }}>✓</span>
                      )}
                    </div>
                    {i < PIPELINE_STAGES.length - 1 && (
                      <span className="text-white/10" style={{ fontSize: "10px" }}>→</span>
                    )}
                  </div>
                );
              })}
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
              Serverless DaaS Portal
            </h3>
            <p className="font-['Inter'] text-white/30" style={{ fontSize: "15px", lineHeight: "1.6" }}>
              On-demand data provisioning platform with automated workspace creation
            </p>
          </div>

          {/* Provision speed (beat 2) */}
          <div
            className="p-3.5 rounded-xl inline-block lg:block"
            style={{
              background: "rgba(99,102,241,0.05)",
              border: "1px solid rgba(99,102,241,0.1)",
              opacity: beat >= 2 ? 1 : 0,
              transform: beat >= 2 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <p className="font-['Inter'] text-indigo-400/60" style={{ fontSize: "14px" }}>
              ⚡ Workspace auto-provisioned in &lt;3 seconds
            </p>
          </div>

          {/* Cost reduction (beat 4) */}
          <div
            style={{
              opacity: beat >= 4 ? 1 : 0,
              transform: beat >= 4 ? "translateY(0)" : "translateY(10px)",
              transition: "all 0.6s cubic-bezier(0.22, 1, 0.36, 1)",
            }}
          >
            <div className="flex items-center gap-2">
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
                30%
              </span>
              <div className="flex flex-col">
                <span className="font-['Inter'] text-white/25" style={{ fontSize: "13px" }}>
                  Cost Reduction
                </span>
                <span className="font-['Inter'] text-emerald-400/40" style={{ fontSize: "11px" }}>
                  ↓ operational expenses
                </span>
              </div>
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
            {["AWS Lambda", "Cognito", "API Gateway", "S3", "CodePipeline", "CloudFormation"].map((tag) => (
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
        @keyframes cursorBlink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
}