'use client';

import { useEffect, useRef, Suspense } from 'react';
import gsap from 'gsap';
import dynamic from 'next/dynamic';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { ArrowUpRight } from 'lucide-react';

const RealisticCosmos = dynamic(() => import('@/components/visuals/RealisticCosmos'), {
  ssr: false,
  loading: () => (
    <div className="absolute inset-0 bg-[#060709]" />
  ),
});

export default function Hero() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const metaLeftRef = useRef<HTMLDivElement>(null);
  const metaRightRef = useRef<HTMLDivElement>(null);
  const accentLineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (reducedMotion || !headingRef.current) return;

    const ctx = gsap.context(() => {
      const words = headingRef.current?.querySelectorAll('.hero-letter');

      // 3D Perspective Initial States
      gsap.set(headingRef.current, { perspective: 1200 });
      gsap.set(words || [], { 
        y: 80, 
        opacity: 0, 
        rotateX: -75, 
        scale: 0.85,
        filter: 'blur(16px)',
        transformOrigin: '50% 100% -40px',
      });
      gsap.set(subtitleRef.current, { opacity: 0, y: 30 });
      gsap.set(ctaRef.current, { opacity: 0, y: 25, scale: 0.95 });
      gsap.set(metaLeftRef.current, { opacity: 0, x: -25 });
      gsap.set(metaRightRef.current, { opacity: 0, x: 25 });
      gsap.set(accentLineRef.current, { scaleX: 0 });

      // Grand Reveal Timeline
      const tl = gsap.timeline({ delay: 1.8 });

      tl.to(words || [], {
        y: 0,
        opacity: 1,
        rotateX: 0,
        scale: 1,
        filter: 'blur(0px)',
        duration: 1.4,
        stagger: 0.04,
        ease: 'power4.out',
      })
      .to(accentLineRef.current, {
        scaleX: 1,
        duration: 1.0,
        ease: 'power3.inOut',
      }, '-=0.8')
      .to(subtitleRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.9,
        ease: 'power3.out',
      }, '-=0.6')
      .to(ctaRef.current, {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.7,
        ease: 'back.out(1.6)',
      }, '-=0.5')
      .to([metaLeftRef.current, metaRightRef.current], {
        opacity: 1,
        x: 0,
        duration: 0.8,
        ease: 'power3.out',
      }, '-=0.4');
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion, t]);

  const handleExploreClick = () => {
    const workSection = document.getElementById('work');
    if (workSection) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(workSection, { offset: -70, duration: 1.6 });
      } else {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  // Split title line into character spans with guaranteed word spacing
  const renderWords = (text: string, isAccent = false) => {
    const words = text.split(' ');
    return words.map((word, wordIdx) => (
      <span key={wordIdx} className="inline-flex items-center">
        {word.split('').map((char, charIdx) => (
          <span
            key={charIdx}
            className={`hero-letter inline-block ${isAccent ? 'gradient-text-accent' : 'text-white'}`}
          >
            {char}
          </span>
        ))}
        {wordIdx < words.length - 1 && (
          <span className="inline-block w-[0.32em] select-none">&nbsp;</span>
        )}
      </span>
    ));
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex flex-col justify-center items-center overflow-hidden bg-[#060709]"
    >
      {/* Photorealistic Cosmos with Twinkling Stars & Shooting Stars on Cooldown */}
      <Suspense fallback={null}>
        <RealisticCosmos />
      </Suspense>

      {/* Cinematic Horizontal Anamorphic Flare */}
      <div className="cinematic-flare top-32" />

      {/* Subtle vignettes */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#060709]/70 via-transparent to-[#060709] pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#060709] to-transparent pointer-events-none" />

      {/* Content: Expansive, Majestic, Beautifully Spaced */}
      <div className="relative z-10 px-6 md:px-12 lg:px-20 pt-40 pb-32 flex flex-col justify-center items-center min-h-screen text-center w-full">
        <div className="max-w-[1200px] mx-auto w-full flex flex-col items-center">
          {/* Centered Status Badge */}
          <div className="inline-flex items-center gap-3 px-5 py-2 rounded-full bg-white/[0.04] border border-white/10 backdrop-blur-md mb-12 shadow-xl">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span className="font-mono text-xs uppercase tracking-widest text-emerald-300 font-semibold">
              Available for Projects // 2024
            </span>
          </div>

          {/* Grand 3D Kinetic Heading Centered */}
          <h1
            ref={headingRef}
            className="heading-display mb-12 tracking-tight text-center"
            style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6.8rem)', lineHeight: 0.98 }}
          >
            <div className="block overflow-hidden pb-4">
              {renderWords(t('hero.title.line1'), false)}
            </div>
            <div className="block overflow-hidden pb-4">
              {renderWords(t('hero.title.line2'), true)}
            </div>
          </h1>

          {/* Accent Line Centered */}
          <div
            ref={accentLineRef}
            className="w-32 md:w-56 h-[2px] mb-12 mx-auto origin-center"
            style={{ 
              background: 'linear-gradient(90deg, transparent, var(--color-accent-violet), var(--color-accent-blue), transparent)',
            }}
          />

          {/* Subtitle Centered with Generous Breathing Room */}
          <p
            ref={subtitleRef}
            className="text-body max-w-2xl mb-16 text-lg md:text-xl text-white/80 leading-relaxed font-sans text-center mx-auto"
          >
            {t('hero.subtitle')}
          </p>

          {/* Luxury Animated CTA Button Centered */}
          <div ref={ctaRef} className="flex justify-center pb-8">
            <button
              onClick={handleExploreClick}
              className="group relative inline-flex items-center gap-4 px-11 py-5 rounded-full font-mono text-xs uppercase tracking-widest text-white transition-all duration-400 overflow-hidden cursor-pointer shadow-2xl"
              style={{
                background: 'linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(255,255,255,0.02) 100%)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 30px rgba(146, 117, 255, 0.25)',
              }}
              data-cursor="interactive"
            >
              {/* Glowing hover backdrop */}
              <div className="absolute inset-0 bg-gradient-to-r from-[var(--color-accent-violet)] via-purple-500 to-[var(--color-accent-blue)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full" />
              
              {/* Subtle radiant halo on hover */}
              <div className="absolute -inset-1 rounded-full bg-purple-500/40 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-500 -z-10" />

              <span className="relative z-10 font-bold tracking-wider transition-colors duration-300">
                {t('hero.cta')}
              </span>
              <ArrowUpRight 
                size={18} 
                className="relative z-10 transition-transform duration-300 group-hover:translate-x-1.5 group-hover:-translate-y-1.5 text-white/80 group-hover:text-white" 
              />
            </button>
          </div>
        </div>

        {/* Bottom Bar with Metadata */}
        <div className="absolute bottom-10 left-0 right-0 px-6 md:px-12 lg:px-20 pointer-events-none">
          <div className="max-w-[1400px] mx-auto flex items-end justify-between pointer-events-auto">
            {/* Left Meta */}
            <div ref={metaLeftRef} className="flex items-center gap-3 font-mono text-xs text-white/50">
              <div className="accent-dot" />
              <span className="text-white/90 font-medium">Full-Stack Developer</span>
              <span className="text-white/35 ml-2">// wves.</span>
            </div>

            {/* Right Meta */}
            <div ref={metaRightRef} className="flex items-center gap-3 font-mono text-xs text-white/50 text-right">
              <span className="text-white/90 font-medium">Based Worldwide</span>
              <span className="text-white/35 ml-2">// Open for Work</span>
              <div className="accent-dot-blue" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
