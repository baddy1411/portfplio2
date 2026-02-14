import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ScenePipeline } from "./projects/ScenePipeline";
import { ScenePointCloud } from "./projects/ScenePointCloud";
import { SceneMedallion } from "./projects/SceneMedallion";
import { SceneTelematics } from "./projects/SceneTelematics";
import { SceneServerless } from "./projects/SceneServerless";

const projects = [
  { id: 1, number: "01", title: "Automated Evaluation Factory", subtitle: "Active learning pipeline" },
  { id: 2, number: "02", title: "4D Perception Engine", subtitle: "Sensor fusion system" },
  { id: 3, number: "03", title: "Carbon Intelligence Platform", subtitle: "Net-zero monitoring" },
  { id: 4, number: "04", title: "Vehicle Telematics", subtitle: "Real-time fleet analytics" },
  { id: 5, number: "05", title: "Serverless DaaS Portal", subtitle: "Data provisioning" },
];

const SceneComponents = [ScenePipeline, ScenePointCloud, SceneMedallion, SceneTelematics, SceneServerless];

export function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showHint, setShowHint] = useState(true);
  const tickingRef = useRef(false);

  const handleScroll = useCallback(() => {
    if (tickingRef.current) return;
    tickingRef.current = true;

    requestAnimationFrame(() => {
      if (!containerRef.current) {
        tickingRef.current = false;
        return;
      }
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) {
        tickingRef.current = false;
        return;
      }
      const scrolled = Math.max(0, -rect.top);
      const progress = Math.min(1, Math.max(0, scrolled / totalScrollable));
      setScrollProgress(progress);
      if (progress > 0.12 && showHint) setShowHint(false);
      tickingRef.current = false;
    });
  }, [showHint]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  const currentScene = Math.min(4, Math.floor(scrollProgress * 5));
  const sceneProgress = Math.min(1, scrollProgress * 5 - currentScene);

  const ActiveScene = SceneComponents[currentScene];
  const project = projects[currentScene];

  const scrollToScene = (index: number) => {
    if (!containerRef.current) return;
    const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerRef.current.offsetTop + (index / 5) * totalScrollable;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  };

  return (
    <section
      id="projects"
      ref={containerRef}
      className="relative"
      style={{ height: "900vh" }}
    >
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "#07070d" }}
      >
        {/* Background ambience */}
        <div className="absolute inset-0 pointer-events-none">
          <div
            className="absolute w-[700px] h-[700px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(99,102,241,0.04) 0%, transparent 70%)",
              right: "-15%",
              top: "10%",
            }}
          />
          <div
            className="absolute w-[400px] h-[400px] rounded-full"
            style={{
              background: "radial-gradient(circle, rgba(139,92,246,0.03) 0%, transparent 70%)",
              left: "-5%",
              bottom: "10%",
            }}
          />
          {/* Subtle grid */}
          <div
            className="absolute inset-0 opacity-[0.008]"
            style={{
              backgroundImage: "radial-gradient(circle, #fff 0.5px, transparent 0.5px)",
              backgroundSize: "40px 40px",
            }}
          />
        </div>

        {/* Section header (top center) */}
        <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20">
          <div className="flex items-center gap-3">
            <div className="w-8 h-[1px] bg-indigo-500/40" />
            <span
              className="font-['Inter'] text-indigo-400/60 tracking-widest uppercase"
              style={{ fontSize: "11px" }}
            >
              Featured Projects
            </span>
            <div className="w-8 h-[1px] bg-indigo-500/40" />
          </div>
        </div>

        {/* Left persistent UI — Project counter + title */}
        <div className="absolute left-6 lg:left-10 top-1/2 -translate-y-1/2 z-20 hidden lg:block pointer-events-none">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentScene}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 8 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <div
                className="font-['Syne'] text-white/[0.03] select-none"
                style={{ fontSize: "90px", lineHeight: 1 }}
              >
                {project.number}
              </div>
              <div className="mt-3 max-w-[120px]">
                <div
                  className="font-['Inter'] text-white/40"
                  style={{ fontSize: "11px", lineHeight: 1.4 }}
                >
                  {project.title}
                </div>
                <div
                  className="font-['Inter'] text-white/15 mt-1"
                  style={{ fontSize: "10px" }}
                >
                  {project.subtitle}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right persistent UI — Progress dots */}
        <div className="absolute right-6 lg:right-10 top-1/2 -translate-y-1/2 z-20 hidden lg:flex flex-col items-end gap-4">
          <div className="relative flex flex-col items-center gap-3">
            {projects.map((p, i) => (
              <button
                key={p.id}
                onClick={() => scrollToScene(i)}
                className="group flex items-center gap-3 py-0.5"
              >
                {/* Label on hover */}
                <span
                  className={`font-['Inter'] transition-all duration-300 whitespace-nowrap ${
                    i === currentScene
                      ? "text-white/40 opacity-100"
                      : "text-white/0 group-hover:text-white/25 opacity-0 group-hover:opacity-100"
                  }`}
                  style={{ fontSize: "10px" }}
                >
                  {p.number}
                </span>

                {/* Dot */}
                <div className="relative">
                  <div
                    className="w-2 h-2 rounded-full transition-all duration-500"
                    style={{
                      background:
                        i < currentScene
                          ? "rgba(99,102,241,0.5)"
                          : i === currentScene
                            ? "rgba(129,140,248,0.9)"
                            : "rgba(255,255,255,0.08)",
                      boxShadow:
                        i === currentScene
                          ? "0 0 12px rgba(99,102,241,0.4), 0 0 4px rgba(99,102,241,0.6)"
                          : "none",
                      transform: i === currentScene ? "scale(1.4)" : "scale(1)",
                    }}
                  />
                  {/* Active ring */}
                  {i === currentScene && (
                    <div
                      className="absolute -inset-1.5 rounded-full"
                      style={{
                        border: "1px solid rgba(99,102,241,0.15)",
                      }}
                    />
                  )}
                </div>
              </button>
            ))}

            {/* Progress track */}
            <div
              className="absolute right-[3px] top-1 bottom-1 w-[1px] -z-10"
              style={{ background: "rgba(255,255,255,0.03)" }}
            >
              <div
                className="w-full rounded-full transition-all duration-500 ease-out"
                style={{
                  height: `${(currentScene / 4) * 100}%`,
                  background: "linear-gradient(180deg, rgba(99,102,241,0.3), rgba(139,92,246,0.15))",
                }}
              />
            </div>
          </div>
        </div>

        {/* Mobile counter */}
        <div className="absolute top-14 left-1/2 -translate-x-1/2 z-20 lg:hidden">
          <div className="flex items-center gap-2">
            <span
              className="font-['JetBrains_Mono'] text-indigo-400/50"
              style={{ fontSize: "11px" }}
            >
              {project.number}
            </span>
            <div className="w-[1px] h-3 bg-white/10" />
            <span
              className="font-['Inter'] text-white/30"
              style={{ fontSize: "11px" }}
            >
              {project.title}
            </span>
          </div>
          {/* Mobile progress bar */}
          <div className="w-40 h-[2px] rounded-full mt-2 mx-auto" style={{ background: "rgba(255,255,255,0.04)" }}>
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{
                width: `${scrollProgress * 100}%`,
                background: "linear-gradient(90deg, rgba(99,102,241,0.5), rgba(139,92,246,0.3))",
              }}
            />
          </div>
        </div>

        {/* Active Scene with transitions */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentScene}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -30 }}
            transition={{
              duration: 0.45,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="absolute inset-0"
          >
            <ActiveScene progress={sceneProgress} />
          </motion.div>
        </AnimatePresence>

        {/* Bottom scroll hint */}
        <AnimatePresence>
          {showHint && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.5 }}
              className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20"
            >
              <div
                className="flex items-center gap-2 px-4 py-2 rounded-full"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  backdropFilter: "blur(20px)",
                }}
              >
                <span
                  className="font-['Inter'] text-white/25"
                  style={{ fontSize: "11px" }}
                >
                  scroll to explore
                </span>
                <motion.span
                  animate={{ y: [0, 4, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="text-white/25"
                  style={{ fontSize: "12px" }}
                >
                  ↓
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom scene quick-nav for mobile */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 lg:hidden flex items-center gap-2">
          {projects.map((p, i) => (
            <button
              key={p.id}
              onClick={() => scrollToScene(i)}
              className="w-6 h-1 rounded-full transition-all duration-300"
              style={{
                background:
                  i === currentScene
                    ? "rgba(99,102,241,0.6)"
                    : i < currentScene
                      ? "rgba(99,102,241,0.2)"
                      : "rgba(255,255,255,0.06)",
                width: i === currentScene ? "24px" : "12px",
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}