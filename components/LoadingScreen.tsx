
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export const LoadingScreen = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [lines, setLines] = useState<string[]>(["INITIALIZING SYSTEM..."]);

  useEffect(() => {
    const jargon = [
      "LOAD_KERNEL_V2.4",
      "BYPASS_SECURE_BOOT",
      "ALLOCATE_VRAM_BLOCKS",
      "DECRYPT_USER_PROFILE",
      "MOUNT_VIRTUAL_DOM",
      "COMPILE_TAILWIND_JIT",
      "FETCH_GITHUB_GRAPH",
      "OPTIMIZE_RENDER_TREE",
      "ESTABLISH_UPLINK",
      "ACCESS_GRANTED"
    ];

    let lineIndex = 0;
    const lineInterval = setInterval(() => {
        setLines(prev => {
            if (lineIndex >= jargon.length) return prev;
            const newLine = `> ${jargon[lineIndex]} [OK]`;
            const newLines = [...prev, newLine];
            if (newLines.length > 6) newLines.shift();
            lineIndex++;
            return newLines;
        });
    }, 250);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
            clearInterval(progressInterval);
            return 100;
        }
        // Non-linear progress for realism
        return prev + Math.random() * 4;
      });
    }, 50);

    return () => {
        clearInterval(lineInterval);
        clearInterval(progressInterval);
    }
  }, []);

  useEffect(() => {
    if (progress >= 100) {
        setTimeout(onComplete, 800);
    }
  }, [progress, onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[100] bg-neutral-950 flex flex-col items-center justify-center font-mono text-teal-500 overflow-hidden cursor-wait"
      exit={{ 
        opacity: 0,
        scale: 1.05,
        filter: "blur(10px)", 
        transition: { duration: 0.8, ease: "easeInOut" }
      }}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-teal-900/50 via-transparent to-transparent"></div>
      <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_bottom,transparent_50%,black_50%)] bg-[length:100%_4px] pointer-events-none"></div>
      
      <div className="relative z-10 w-full max-w-sm px-6">
        <div className="mb-8 text-center relative">
            <h1 className="text-5xl md:text-6xl font-black tracking-tighter text-white mix-blend-difference animate-pulse" style={{ textShadow: '2px 0 #0d9488, -2px 0 #f43f5e' }}>
                BADRISH_MS
            </h1>
            <div className="absolute -inset-4 bg-teal-500/10 blur-xl rounded-full opacity-50 animate-pulse"></div>
        </div>
        
        {/* Console Output */}
        <div className="h-32 mb-6 font-mono text-xs md:text-sm text-teal-500/80 font-bold flex flex-col justify-end border-l-2 border-teal-500/20 pl-4">
            {lines.map((line, i) => (
                <motion.div 
                    key={i}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="truncate"
                >
                    {line}
                </motion.div>
            ))}
        </div>

        {/* Progress Bar */}
        <div className="h-1 w-full bg-neutral-900 border border-teal-900/50 relative overflow-hidden">
             <motion.div 
                className="h-full bg-teal-400 shadow-[0_0_15px_rgba(45,212,191,0.8)]"
                style={{ width: `${progress}%` }}
             />
        </div>
        
        <div className="flex justify-between mt-2 text-[10px] tracking-[0.2em] text-teal-600 font-bold uppercase">
            <span>Memory_Check</span>
            <span>{Math.min(100, Math.floor(progress))}%</span>
        </div>
      </div>
    </motion.div>
  );
};
