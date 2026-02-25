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
        
        // Sweet Pastel Palette (White, Soft Violet, Baby Pink)
        const colors = [
          '255, 255, 255', // White sparkle
          '216, 180, 254', // Soft Violet
          '240, 171, 252', // Soft Pink
          '167, 139, 250'  // Slightly deeper violet
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
        // Use absolute value for opacity to handle potential small float errors
        ctx.fillStyle = `rgba(${this.color}, ${Math.abs(this.opacity)})`;
        
        // Add a tiny glow
        ctx.shadowBlur = 4;
        ctx.shadowColor = `rgba(${this.color}, 0.4)`;
        
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    const particles: Particle[] = [];
    const particleCount = 60; // Enough to look sweet, not enough to clutter

    const init = () => {
      particles.length = 0;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    init();

    let animationId: number;
    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      particles.forEach(p => {
        p.update();
        p.draw();
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

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
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
    />
  );
};

export default MatrixCanvas;