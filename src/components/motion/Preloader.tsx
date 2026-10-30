'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { useLanguage } from '@/hooks/useLanguage';

interface PreloaderProps {
  onComplete: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const topPanelRef = useRef<HTMLDivElement>(null);
  const bottomPanelRef = useRef<HTMLDivElement>(null);
  const brandRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  const reducedMotion = useReducedMotion();
  const { language } = useLanguage();
  const [shouldShow, setShouldShow] = useState(true);

  const exitAnimation = useCallback(() => {
    if (!containerRef.current) return;

    if (reducedMotion) {
      gsap.to(containerRef.current, {
        opacity: 0,
        duration: 0.4,
        onComplete,
      });
      return;
    }

    const tl = gsap.timeline({ onComplete });

    // 1. Brand explosion & shockwave
    tl.to(brandRef.current, {
      scale: 1.15,
      filter: 'blur(12px)',
      opacity: 0,
      duration: 0.6,
      ease: 'power3.in',
    })
    .to([counterRef.current, progressLineRef.current, statusRef.current, ringRef.current], {
      opacity: 0,
      scale: 0.9,
      duration: 0.3,
      ease: 'power2.in',
    }, '<')
    // 2. Dual curtain cinematic shutter opening (top slides up, bottom slides down)
    .to(topPanelRef.current, {
      yPercent: -100,
      duration: 1.0,
      ease: 'expo.inOut',
    }, '-=0.2')
    .to(bottomPanelRef.current, {
      yPercent: 100,
      duration: 1.0,
      ease: 'expo.inOut',
    }, '<')
    .to(containerRef.current, {
      opacity: 0,
      duration: 0.2,
      pointerEvents: 'none',
    });
  }, [onComplete, reducedMotion]);

  useEffect(() => {
    if (reducedMotion) {
      const timer = setTimeout(() => exitAnimation(), 300);
      return () => clearTimeout(timer);
    }

    const ctx = gsap.context(() => {
      const letters = brandRef.current?.querySelectorAll('.preloader-char');
      
      // Set initial states
      gsap.set(letters || [], { opacity: 0, y: 35, scale: 0.8, filter: 'blur(10px)' });
      gsap.set(ringRef.current, { scale: 0.3, opacity: 0, rotate: -45 });
      gsap.set(statusRef.current, { opacity: 0, y: 15 });

      const tl = gsap.timeline();

      // Entrance animation
      tl.to(ringRef.current, {
        scale: 1,
        opacity: 1,
        rotate: 0,
        duration: 1.0,
        ease: 'power4.out',
      })
      .to(letters || [], {
        opacity: 1,
        y: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 0.8,
        stagger: 0.08,
        ease: 'back.out(1.7)',
      }, '-=0.6')
      .to(statusRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.4,
        ease: 'power2.out',
      }, '-=0.3');

      // Numerical Counter & Progress Bar 0% -> 100%
      const statusPhrases = {
        en: [
          'INITIALIZING COSMIC TELEMETRY...',
          'CALIBRATING 60FPS RENDER PIPELINE...',
          'COMPILING FULL-STACK ARCHITECTURES...',
          'WVES. STUDIO READY',
        ],
        ru: [
          'ИНИЦИАЛИЗАЦИЯ КОСМИЧЕСКОЙ ТЕЛЕМЕТРИИ...',
          'КАЛИБРОВКА 60FPS ГРАФИЧЕСКОГО ДВИЖКА...',
          'ЗАГРУЗКА ИНТЕРФЕЙСОВ И АРХИТЕКТУР...',
          'WVES. ГОТОВ К РАБОТЕ',
        ],
        uz: [
          'KOSMIK TELEMETRIYA YUKLANMOQDA...',
          '60FPS GRAFIK TIZIM SOZLANMOQDA...',
          'FULL-STACK ARXITEKTURA TAYYORLANMOQDA...',
          'WVES. FOYDALANISHGA TAYYOR',
        ],
      };

      const phrases = statusPhrases[language] || statusPhrases.en;

      let progressObj = { value: 0 };
      gsap.to(progressObj, {
        value: 100,
        duration: 2.2,
        ease: 'power2.inOut',
        onUpdate: () => {
          const val = Math.round(progressObj.value);
          if (counterRef.current) {
            counterRef.current.innerText = `${val < 10 ? '0' : ''}${val}%`;
          }
          if (progressLineRef.current) {
            progressLineRef.current.style.width = `${val}%`;
          }
          if (statusRef.current) {
            const index = Math.min(Math.floor((val / 100) * phrases.length), phrases.length - 1);
            statusRef.current.innerText = phrases[index];
          }
        },
        onComplete: () => {
          setTimeout(exitAnimation, 250);
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [exitAnimation, reducedMotion, language]);

  if (!shouldShow) return null;

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-[10000] flex flex-col items-center justify-center overflow-hidden select-none"
      role="progressbar"
      aria-label="Loading digital experience"
    >
      {/* Top Shutter Panel */}
      <div 
        ref={topPanelRef} 
        className="absolute top-0 left-0 right-0 h-1/2 bg-[#060709] border-b border-white/10 z-10"
      />

      {/* Bottom Shutter Panel */}
      <div 
        ref={bottomPanelRef} 
        className="absolute bottom-0 left-0 right-0 h-1/2 bg-[#060709] border-t border-white/10 z-10"
      />

      {/* Center Cinematic Content */}
      <div className="relative z-20 flex flex-col items-center justify-center px-6">
        {/* Glowing Aperture Ring */}
        <div
          ref={ringRef}
          className="absolute w-56 h-56 md:w-72 md:h-72 rounded-full border border-purple-500/20 pointer-events-none"
          style={{
            background: 'radial-gradient(circle, rgba(146, 117, 255, 0.08) 0%, transparent 70%)',
            boxShadow: '0 0 60px rgba(146, 117, 255, 0.15)',
          }}
        >
          {/* Subtle rotating tick markers */}
          <div className="absolute inset-0 rounded-full border border-dashed border-blue-400/20 animate-spin" style={{ animationDuration: '20s' }} />
        </div>

        {/* Brand Text */}
        <div
          ref={brandRef}
          className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6"
          style={{ fontFamily: 'var(--font-display)' }}
        >
          {'wves.'.split('').map((char, i) => (
            <span 
              key={i} 
              className="preloader-char inline-block"
              style={{
                textShadow: '0 0 30px rgba(146,117,255,0.4)',
                color: i === 4 ? 'var(--color-accent-violet)' : '#ffffff',
              }}
            >
              {char}
            </span>
          ))}
        </div>

        {/* High-Tech Progress Bar */}
        <div className="w-56 md:w-72 h-[2px] bg-white/10 rounded-full overflow-hidden relative mb-4">
          <div
            ref={progressLineRef}
            className="h-full bg-gradient-to-r from-[var(--color-accent-violet)] via-purple-400 to-[var(--color-accent-blue)] rounded-full w-0 shadow-lg shadow-purple-500/50"
          />
        </div>

        {/* Percentage Counter + Status Phrase */}
        <div className="flex items-center justify-between w-56 md:w-72 font-mono text-[11px] text-white/50">
          <div ref={statusRef} className="truncate tracking-wider max-w-[190px]">
            INITIALIZING...
          </div>
          <span 
            ref={counterRef} 
            className="font-bold text-white tracking-widest text-[12px]"
          >
            00%
          </span>
        </div>
      </div>
    </div>
  );
}
