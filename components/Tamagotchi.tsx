
import React, { useState, useEffect, useRef } from 'react';

interface TamagotchiProps {
  isDark: boolean;
}

export const Tamagotchi: React.FC<TamagotchiProps> = ({ isDark }) => {
  const [state, setState] = useState<'idle' | 'watching' | 'dizzy' | 'sleeping' | 'happy'>('idle');
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const lastScrollTime = useRef(0);
  const lastMouseMoveTime = useRef(Date.now());
  const idleTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Mouse tracking for "watching" state
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      lastMouseMoveTime.current = Date.now();
      
      if (state === 'sleeping') {
        setState('idle');
      } else if (state === 'idle' || state === 'watching') {
        setState('watching');
      }
      
      // Reset idle timer
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
      idleTimeoutRef.current = setTimeout(() => {
        setState('sleeping');
      }, 5000);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (idleTimeoutRef.current) clearTimeout(idleTimeoutRef.current);
    };
  }, [state]);

  // Scroll monitoring for "dizzy" state
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const checkScroll = () => {
      const currentScrollY = window.scrollY; 
      const velocity = Math.abs(currentScrollY - lastScrollY);
      lastScrollY = currentScrollY;

      if (velocity > 50) {
         lastScrollTime.current = Date.now();
         setState('dizzy');
         
         // Recovery
         setTimeout(() => {
            if (Date.now() - lastScrollTime.current > 500) {
                setState('idle');
            }
         }, 1000);
      }
    };
    
    const handleWheel = (e: WheelEvent) => {
       if (Math.abs(e.deltaY) > 50) {
         setState('dizzy');
         setTimeout(() => setState('idle'), 800);
       }
    }

    window.addEventListener('wheel', handleWheel);
    return () => window.removeEventListener('wheel', handleWheel);
  }, []);

  const handleClick = () => {
    setState('happy');
    setTimeout(() => setState('idle'), 2000);
  };

  // Calculate eye position
  const getEyeOffset = () => {
    if (!containerRef.current) return { x: 0, y: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    const catX = rect.left + rect.width / 2;
    const catY = rect.top + rect.height / 2;
    
    const dx = mousePos.x - catX;
    const dy = mousePos.y - catY;
    const angle = Math.atan2(dy, dx);
    const dist = Math.min(3, Math.sqrt(dx*dx + dy*dy) / 50); // Limit eye movement distance
    
    return {
      x: Math.cos(angle) * dist,
      y: Math.sin(angle) * dist
    };
  };

  const eyeOffset = state === 'watching' ? getEyeOffset() : { x: 0, y: 0 };

  // Colors
  const bodyColor = isDark ? '#0d9488' : '#14b8a6'; // Teal
  const detailColor = isDark ? '#ccfbf1' : '#f0fdfa'; 

  return (
    <div 
      ref={containerRef}
      onClick={handleClick}
      className="fixed bottom-6 left-6 z-40 cursor-pointer transition-transform hover:scale-110 active:scale-95 block"
      title="I'm your data pet. Click me!"
    >
       {state === 'sleeping' && (
         <div className="absolute -top-6 right-0 animate-bounce text-neutral-400 text-xs font-mono">Zzz...</div>
       )}
       {state === 'happy' && (
         <div className="absolute -top-6 right-0 animate-bounce text-pink-500 text-xs font-mono">♥</div>
       )}
       
       {/* Pixel Art Cat SVG */}
       <svg width="64" height="64" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
         {/* Body */}
         <rect x="6" y="10" width="20" height="18" rx="2" fill={bodyColor} />
         
         {/* Ears */}
         <path d="M6 10L6 4L12 10H6Z" fill={bodyColor} />
         <path d="M26 10L26 4L20 10H26Z" fill={bodyColor} />

         {/* Face Container for States */}
         <g transform={`translate(0, 0)`}>
            {state === 'dizzy' ? (
                <>
                    {/* X Eyes */}
                    <path d="M9 14L13 18M13 14L9 18" stroke={detailColor} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19 14L23 18M23 14L19 18" stroke={detailColor} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M14 22Q16 20 18 22" stroke={detailColor} strokeWidth="2" strokeLinecap="round"/>
                </>
            ) : state === 'sleeping' ? (
                <>
                    {/* Closed Eyes */}
                    <path d="M9 17H13" stroke={detailColor} strokeWidth="2" strokeLinecap="round"/>
                    <path d="M19 17H23" stroke={detailColor} strokeWidth="2" strokeLinecap="round"/>
                    {/* Mouth */}
                     <rect x="15" y="21" width="2" height="2" fill={detailColor} />
                </>
            ) : state === 'happy' ? (
                <>
                    {/* Happy Eyes */}
                    <path d="M9 16L11 14L13 16" stroke={detailColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M19 16L21 14L23 16" stroke={detailColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    {/* Mouth */}
                    <path d="M13 21Q16 24 19 21" stroke={detailColor} strokeWidth="2" strokeLinecap="round"/>
                </>
            ) : (
                <>
                   {/* Normal/Watching Eyes */}
                   <rect x={9 + eyeOffset.x} y={14 + eyeOffset.y} width="4" height="4" fill={detailColor} />
                   <rect x={19 + eyeOffset.x} y={14 + eyeOffset.y} width="4" height="4" fill={detailColor} />
                   {/* Pupils */}
                   <rect x={10 + eyeOffset.x*1.5} y={15 + eyeOffset.y*1.5} width="2" height="2" fill={bodyColor} />
                   <rect x={20 + eyeOffset.x*1.5} y={15 + eyeOffset.y*1.5} width="2" height="2" fill={bodyColor} />
                   
                   {/* Mouth */}
                   <rect x="14" y="22" width="4" height="2" fill={detailColor} />
                </>
            )}
         </g>
       </svg>
    </div>
  );
};
    