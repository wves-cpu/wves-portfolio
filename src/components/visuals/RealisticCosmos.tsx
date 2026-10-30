'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  alpha: number;
  twinkleSpeed: number;
  twinklePhase: number;
  color: string;
  depth: number;
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  life: number;
  maxLife: number;
  width: number;
  color: string;
}

export default function RealisticCosmos() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const starColors = [
      '#ffffff',
      '#eef2ff',
      '#dbeafe',
      '#fef3c7',
      '#ede9fe',
      '#93c5fd',
    ];

    // Generate static deep cosmos stars
    const starCount = Math.min(Math.floor((width * height) / 2500), 700);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      const depth = Math.random() * 0.8 + 0.2; // depth from 0.2 to 1.0
      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: (Math.random() * 1.2 + 0.3) * depth,
        baseAlpha: Math.random() * 0.6 + 0.2,
        alpha: 0.5,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinklePhase: Math.random() * Math.PI * 2,
        color: starColors[Math.floor(Math.random() * starColors.length)],
        depth,
      });
    }

    // Shooting stars system
    const shootingStars: ShootingStar[] = [];
    let lastShootingStarTime = Date.now();
    let nextShootingStarDelay = 2200; // spawn every 2.2 - 4.5 seconds

    function createShootingStar(): ShootingStar {
      // Spawn mostly from top or top-right, shooting downward-left
      const startX = Math.random() * (width * 1.2) - width * 0.1;
      const startY = Math.random() * (height * 0.4);
      const angle = (Math.PI / 180) * (Math.random() * 25 + 130); // ~130 to 155 degrees
      const speed = Math.random() * 14 + 16; // 16 to 30 px/frame
      const maxLife = Math.random() * 45 + 35; // duration in frames

      const colors = ['#ffffff', '#93c5fd', '#c4b5fd', '#fef08a'];
      const color = colors[Math.floor(Math.random() * colors.length)];

      return {
        x: startX,
        y: startY,
        length: Math.random() * 120 + 90,
        speed,
        angle,
        opacity: 1,
        life: 0,
        maxLife,
        width: Math.random() * 1.5 + 1.2,
        color,
      };
    }

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);

    let lastTime = Date.now();

    const render = () => {
      const now = Date.now();
      const dt = (now - lastTime) / 1000;
      lastTime = now;

      // Smooth mouse interpolation for parallax
      mouseX += (targetMouseX - mouseX) * 0.04;
      mouseY += (targetMouseY - mouseY) * 0.04;

      const offsetX = (mouseX - width / 2) * 0.03;
      const offsetY = (mouseY - height / 2) * 0.03;

      ctx.clearRect(0, 0, width, height);

      // 1. Draw realistic twinkling stars
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!reducedMotion) {
          star.twinklePhase += star.twinkleSpeed;
          star.alpha = star.baseAlpha + Math.sin(star.twinklePhase) * 0.35;
        }

        const currentAlpha = Math.max(0.1, Math.min(1, star.alpha));
        const px = star.x - offsetX * star.depth;
        const py = star.y - offsetY * star.depth;

        ctx.fillStyle = star.color;
        ctx.globalAlpha = currentAlpha;

        ctx.beginPath();
        ctx.arc(px, py, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Extra realistic soft glow for prominent stars
        if (star.radius > 1.0 && currentAlpha > 0.6) {
          ctx.beginPath();
          ctx.arc(px, py, star.radius * 2.8, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = currentAlpha * 0.18;
          ctx.fill();
        }
      }

      // 2. Check and spawn shooting stars on cooldown
      if (!reducedMotion && now - lastShootingStarTime > nextShootingStarDelay) {
        shootingStars.push(createShootingStar());
        // occasionally spawn a second twin shooting star
        if (Math.random() > 0.6) {
          setTimeout(() => {
            shootingStars.push(createShootingStar());
          }, 300);
        }
        lastShootingStarTime = now;
        nextShootingStarDelay = Math.random() * 2500 + 1800; // 1.8s - 4.3s cooldown
      }

      // 3. Render and update shooting stars
      for (let i = shootingStars.length - 1; i >= 0; i--) {
        const s = shootingStars[i];
        s.life++;

        // Fade in rapidly, then fade out gracefully
        let currentOpacity = 1;
        if (s.life < 8) {
          currentOpacity = s.life / 8;
        } else {
          currentOpacity = Math.max(0, 1 - (s.life - 8) / (s.maxLife - 8));
        }

        // Tail calculation
        const tailX = s.x - Math.cos(s.angle) * s.length;
        const tailY = s.y - Math.sin(s.angle) * s.length;

        const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
        gradient.addColorStop(0, s.color);
        gradient.addColorStop(0.2, s.color);
        gradient.addColorStop(0.6, 'rgba(147, 197, 253, 0.4)');
        gradient.addColorStop(1, 'rgba(147, 197, 253, 0)');

        ctx.beginPath();
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(tailX, tailY);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = s.width;
        ctx.lineCap = 'round';
        ctx.globalAlpha = currentOpacity;
        ctx.stroke();

        // Glowing meteor head
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.width * 1.5, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.globalAlpha = currentOpacity * 0.9;
        ctx.fill();

        // Move meteor
        s.x += Math.cos(s.angle) * s.speed;
        s.y += Math.sin(s.angle) * s.speed;

        // Remove dead meteors
        if (s.life >= s.maxLife || s.x < -100 || s.y > height + 100) {
          shootingStars.splice(i, 1);
        }
      }

      ctx.globalAlpha = 1.0;
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [reducedMotion]);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" style={{ zIndex: 0 }}>
      {/* Deep Space Background Canvas with Twinkling Stars & Shooting Stars on Cooldown */}
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ opacity: 0.9 }}
      />

      {/* Atmospheric Cosmic Nebula Depth Layers */}
      <div 
        className="absolute top-[-10%] right-[-5%] w-[650px] h-[650px] rounded-full pointer-events-none opacity-20 blur-[130px]"
        style={{ background: 'radial-gradient(circle, #4f46e5 0%, #1e1b4b 60%, transparent 100%)' }}
      />
      <div 
        className="absolute bottom-[5%] left-[-10%] w-[550px] h-[550px] rounded-full pointer-events-none opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(circle, #6366f1 0%, #312e81 60%, transparent 100%)' }}
      />
    </div>
  );
}
