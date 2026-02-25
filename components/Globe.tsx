import React, { useEffect, useRef } from 'react';

const Globe: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;
    
    // Handle Retina displays
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    let angle = 0;
    const GLOBE_RADIUS = width < 768 ? 120 : 200;
    const DOT_RADIUS = 1.5;
    const DOT_COUNT = 400;

    const dots: { lat: number; lon: number }[] = [];

    // Generate random points on a sphere
    for(let i=0; i<DOT_COUNT; i++) {
        const phi = Math.acos(-1 + (2 * i) / DOT_COUNT);
        const theta = Math.sqrt(DOT_COUNT * Math.PI) * phi;
        dots.push({ lat: phi, lon: theta });
    }

    let animationFrameId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      
      const cx = width / 2;
      const cy = height / 2;

      ctx.fillStyle = '#8b5cf6'; // Violet-500
      
      dots.forEach(dot => {
        // Rotate
        const rotatedLon = dot.lon + angle;
        
        // Convert spherical to cartesian
        const x = GLOBE_RADIUS * Math.sin(dot.lat) * Math.cos(rotatedLon);
        const y = GLOBE_RADIUS * Math.sin(dot.lat) * Math.sin(rotatedLon);
        const z = GLOBE_RADIUS * Math.cos(dot.lat);

        // Project 3D to 2D
        // Simple orthographic projection with some perspective
        const scale = 250 / (250 - z); // Perspective scale
        const px = cx + x * scale;
        const py = cy + z * scale * 0.2 + (y * 0.1); // Flatten slightly

        // Draw dot if it's on the front side
        if (y < 0 || true) { // Draw all for wireframe transparent effect, adjust opacity by Z
            const alpha = (y + GLOBE_RADIUS) / (2 * GLOBE_RADIUS); // Simple depth cue
            ctx.globalAlpha = Math.max(0.1, alpha);
            ctx.beginPath();
            ctx.arc(px, py, DOT_RADIUS * scale, 0, Math.PI * 2);
            ctx.fill();
        }
      });

      angle += 0.005;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => cancelAnimationFrame(animationFrameId);
  }, []);

  return (
    <div className="w-full h-[400px] md:h-[600px] flex items-center justify-center pointer-events-none">
        <canvas ref={canvasRef} className="w-full h-full" style={{ maxWidth: '600px', maxHeight: '600px'}} />
    </div>
  );
};

export default Globe;