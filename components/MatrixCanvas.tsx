import React, { useEffect, useRef } from 'react';

const MatrixCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;
    
    const dpr = window.devicePixelRatio || 1;
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    ctx.scale(dpr, dpr);

    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      opacity: number;
      fadeSpeed: number;

      constructor() {
        this.x = Math.random() * width;
        this.y = Math.random() * height;
        this.size = Math.random() * 2 + 0.5; // Very small: 0.5px to 2.5px
        this.speedX = (Math.random() - 0.5) * 0.3; // Slight drift sideways
        this.speedY = -(Math.random() * 0.4 + 0.1); // Slow upward float
        this.opacity = Math.random() * 0.5 + 0.1; // Start with varied low opacity
        this.fadeSpeed = Math.random() * 0.005 + 0.002;
        
        // Soft Blue Palette (White, Soft Blue, Sky Blue)
        const colors = [
          '255, 255, 255', // White sparkle
          '147, 197, 253', // Soft Blue
          '186, 230, 253', // Sky Blue
          '96, 165, 250'   // Medium Blue
        ];
        this.color = colors[Math.floor(Math.random() * colors.length)];
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        
        // Twinkle effect (sine wave opacity)
        this.opacity += this.fadeSpeed;
        if (this.opacity >= 0.7 || this.opacity <= 0.1) {
          this.fadeSpeed = -this.fadeSpeed;
        }

        // Loop around screen
        if (this.y < -10) {
            this.y = height + 10;
            this.x = Math.random() * width;
        }
        if (this.x > width + 10) this.x = -10;
        if (this.x < -10) this.x = width + 10;
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${Math.abs(this.opacity)})`;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];
    const particleCount = 20; // Lightweight particle count for high performance

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    init();

    let animationId: number;
    let isTabActive = !document.hidden;

    const animate = () => {
      if (!isTabActive) {
        animationId = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleVisibilityChange = () => {
      isTabActive = !document.hidden;
      if (isTabActive && !animationId) {
        animate();
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.scale(dpr, dpr);
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationId) cancelAnimationFrame(animationId);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-full pointer-events-none z-0 overflow-hidden">
      {/* Hero background placeholder ambient glow for instant interactive feel */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] md:w-[1000px] md:h-[1000px] bg-gradient-to-tr from-blue-200/30 via-sky-100/40 to-blue-100/20 rounded-full blur-3xl opacity-80" />
      <canvas 
        ref={canvasRef} 
        className="w-full h-full transition-opacity duration-700"
      />
    </div>
  );
};

export default MatrixCanvas;