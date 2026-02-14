import { useEffect, useState, useCallback } from "react";
import { motion } from "motion/react";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const updatePosition = useCallback((e: MouseEvent) => {
    setPosition({ x: e.clientX, y: e.clientY });
    if (!isVisible) setIsVisible(true);
  }, [isVisible]);

  useEffect(() => {
    const checkHoverElements = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null;
      setIsHovering(isInteractive);
    };

    const handleLeave = () => setIsVisible(false);
    const handleEnter = () => setIsVisible(true);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", checkHoverElements);
    document.addEventListener("mouseleave", handleLeave);
    document.addEventListener("mouseenter", handleEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", checkHoverElements);
      document.removeEventListener("mouseleave", handleLeave);
      document.removeEventListener("mouseenter", handleEnter);
    };
  }, [updatePosition]);

  // Only show on desktop
  if (typeof window !== "undefined" && window.matchMedia("(max-width: 768px)").matches) {
    return null;
  }

  return (
    <motion.div
      className="fixed pointer-events-none z-[9999] rounded-full"
      style={{
        left: position.x - (isHovering ? 20 : 6),
        top: position.y - (isHovering ? 20 : 6),
        width: isHovering ? 40 : 12,
        height: isHovering ? 40 : 12,
        background: isHovering ? "rgba(129,140,248,0.08)" : "rgba(129,140,248,0.3)",
        border: isHovering ? "1px solid rgba(129,140,248,0.15)" : "none",
        backdropFilter: isHovering ? "blur(4px)" : "none",
        mixBlendMode: "screen",
      }}
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1 : 1,
      }}
      transition={{ duration: 0.15, ease: "easeOut" }}
    />
  );
}
