
import React, { useEffect, useRef } from 'react';

interface BonsaiTreeProps {
  progress: number; // 0 to 1
  isDark: boolean;
}

export const BonsaiTree: React.FC<BonsaiTreeProps> = ({ progress, isDark }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Configuration
  const MAX_DEPTH = 12;
  const BRANCH_ANGLE = 0.35; // Radians
  const LENGTH_SCALE = 0.78;

  const drawTree = (
    ctx: CanvasRenderingContext2D,
    startX: number,
    startY: number,
    length: number,
    angle: number,
    depth: number,
    width: number
  ) => {
    // Base case for recursion
    if (depth <= 0) return;

    // Determine how much of this specific branch to draw based on remaining depth "budget"
    // If depth is 3.5, we draw this branch fully, but the children will only be drawn 0.5
    // Wait, better strategy:
    // We always draw the full structure, but we limit the recursion by the global progress.
    
    const endX = startX + length * Math.cos(angle);
    const endY = startY + length * Math.sin(angle);

    ctx.beginPath();
    ctx.moveTo(startX, startY);
    ctx.lineTo(endX, endY);
    ctx.strokeStyle = isDark ? `rgba(20, 184, 166, ${0.3 + (depth/MAX_DEPTH)*0.7})` : `rgba(13, 148, 136, ${0.3 + (depth/MAX_DEPTH)*0.7})`;
    ctx.lineWidth = width;
    ctx.lineCap = 'round';
    ctx.stroke();

    // Flowers at the tips if depth is low (meaning we are at the end of a branch)
    // and if global progress is high enough
    if (depth <= 1 && progress > 0.9) {
      ctx.beginPath();
      ctx.arc(endX, endY, 2 + Math.random() * 2, 0, Math.PI * 2);
      ctx.fillStyle = isDark ? '#f472b6' : '#db2777'; // Pink flowers
      ctx.fill();
    }

    const newLength = length * LENGTH_SCALE;
    const newWidth = width * 0.7;
    const newDepth = depth - 1;

    // Recursive calls
    drawTree(ctx, endX, endY, newLength, angle - BRANCH_ANGLE, newDepth, newWidth);
    drawTree(ctx, endX, endY, newLength, angle + BRANCH_ANGLE, newDepth, newWidth);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    // We make it fairly large but use CSS to position/scale it
    canvas.width = 400;
    canvas.height = 400;

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Calculate current depth based on progress
    // Progress 0 -> Depth 2 (Stump)
    // Progress 1 -> Depth MAX_DEPTH
    const currentDepth = 2 + (progress * (MAX_DEPTH - 2));
    
    // Start drawing from bottom center
    // x, y, length, angle, depth, width
    // -Math.PI / 2 is pointing straight up
    drawTree(
      ctx, 
      canvas.width / 2, 
      canvas.height, 
      80, 
      -Math.PI / 2, 
      currentDepth, 
      10
    );

  }, [progress, isDark]);

  return (
    <div className="fixed bottom-0 right-0 z-0 pointer-events-none opacity-80 transition-opacity duration-1000">
       <canvas 
         ref={canvasRef} 
         className="w-[250px] h-[250px] md:w-[400px] md:h-[400px] object-contain origin-bottom-right"
       />
    </div>
  );
};
