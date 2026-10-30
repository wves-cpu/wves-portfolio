'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Terminal, Shield, Zap, Layers, Sparkles, Code2, Cpu, CheckCircle2, ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const headingLeftRef = useRef<HTMLDivElement>(null);
  const contentRightRef = useRef<HTMLDivElement>(null);
  const dividerRef = useRef<HTMLDivElement>(null);
  const dossierRef = useRef<HTMLDivElement>(null);
  const [activeTab, setActiveTab] = useState<'stack' | 'education' | 'methods'>('stack');

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Divider line
      if (dividerRef.current) {
        gsap.fromTo(dividerRef.current, { scaleX: 0 }, {
          scaleX: 1,
          duration: 1.2,
          ease: 'power4.inOut',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            once: true,
          },
        });
      }

      // Left heading
      const headingLines = headingLeftRef.current?.querySelectorAll('.about-heading-line');
      if (headingLines) {
        gsap.fromTo(headingLines, { y: 80, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.15,
          ease: 'power4.out',
          scrollTrigger: {
            trigger: headingLeftRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Right content
      const contentEls = contentRightRef.current?.querySelectorAll('.about-content-item');
      if (contentEls) {
        gsap.fromTo(contentEls, { y: 40, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRightRef.current,
            start: 'top 80%',
            once: true,
          },
        });
      }

      // Dossier & Pillars animation
      const cards = sectionRef.current?.querySelectorAll('.about-card');
      if (cards) {
        gsap.fromTo(cards, { y: 50, opacity: 0 }, {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0],
            start: 'top 85%',
            once: true,
          },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const pillars = [
    {
      icon: <Layers className="text-[var(--color-accent-violet)]" size={20} />,
      title: t('about.pillar1.title'),
      desc: t('about.pillar1.desc'),
    },
    {
      icon: <Sparkles className="text-[var(--color-accent-blue)]" size={20} />,
      title: t('about.pillar2.title'),
      desc: t('about.pillar2.desc'),
    },
    {
      icon: <Code2 className="text-emerald-400" size={20} />,
      title: t('about.pillar3.title'),
      desc: t('about.pillar3.desc'),
    },
    {
      icon: <Zap className="text-amber-400" size={20} />,
      title: t('about.pillar4.title'),
      desc: t('about.pillar4.desc'),
    },
  ];

  const workflowSteps = [
    { step: t('about.workflow.step1'), desc: t('about.workflow.desc1') },
    { step: t('about.workflow.step2'), desc: t('about.workflow.desc2') },
    { step: t('about.workflow.step3'), desc: t('about.workflow.desc3') },
    { step: t('about.workflow.step4'), desc: t('about.workflow.desc4') },
  ];

  return (
    <section
      ref={sectionRef}
      id="about"
      className="section-padding relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="accent-dot" />
            <p className="text-label">{t('about.label')}</p>
          </div>
          <div ref={dividerRef} className="section-divider" style={{ transformOrigin: 'left center' }} />
        </div>

        {/* Narrative Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 mb-20 md:mb-28">
          {/* Left Column: Heading */}
          <div ref={headingLeftRef} className="lg:col-span-5">
            <h2 className="heading-display heading-lg">
              <span className="about-heading-line block overflow-hidden">
                {t('about.heading.line1')}
              </span>
              <span className="about-heading-line block overflow-hidden mt-2 gradient-text-accent">
                {t('about.heading.line2')}
              </span>
            </h2>

            {/* Quick Tagline */}
            <div className="mt-8 pt-6 border-t border-white/10 flex items-center gap-4">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-xs uppercase text-white/60 tracking-wider">
                Full-Stack Developer // Mars IT School Alum
              </span>
            </div>
          </div>

          {/* Right Column: In-Depth Bio */}
          <div ref={contentRightRef} className="lg:col-span-7 flex flex-col gap-6 lg:pt-2">
            <p className="about-content-item text-body text-base md:text-lg leading-relaxed text-white/90">
              {t('about.description')}
            </p>
            <p className="about-content-item text-body text-sm md:text-base leading-relaxed text-white/70">
              {t('about.p1')}
            </p>
            <p className="about-content-item text-body text-sm md:text-base leading-relaxed text-white/70">
              {t('about.p2')}
            </p>
          </div>
        </div>

        {/* Developer Dossier / Interactive Terminal HUD */}
        <div 
          ref={dossierRef}
          className="about-card rounded-2xl border border-white/10 bg-[#0e1017]/90 backdrop-blur-xl overflow-hidden shadow-2xl mb-24 md:mb-32"
        >
          {/* Terminal Titlebar */}
          <div className="px-6 py-4 border-b border-white/10 bg-white/[0.02] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Terminal size={15} className="text-[var(--color-accent-violet)]" />
              <span className="font-mono text-xs font-semibold text-white/90 tracking-wider uppercase">
                {t('about.dossier.title')} // wves.sys
              </span>
            </div>
            {/* Tabs */}
            <div className="flex items-center gap-2 font-mono text-[10px]">
              <button 
                onClick={() => setActiveTab('stack')}
                className={`px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${activeTab === 'stack' ? 'bg-white/15 text-white font-bold border border-white/20' : 'text-white/40 hover:text-white'}`}
              >
                // STACK
              </button>
              <button 
                onClick={() => setActiveTab('education')}
                className={`px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${activeTab === 'education' ? 'bg-white/15 text-white font-bold border border-white/20' : 'text-white/40 hover:text-white'}`}
              >
                // EDUCATION
              </button>
              <button 
                onClick={() => setActiveTab('methods')}
                className={`px-3.5 py-1.5 rounded-md transition-all cursor-pointer ${activeTab === 'methods' ? 'bg-white/15 text-white font-bold border border-white/20' : 'text-white/40 hover:text-white'}`}
              >
                // STANDARDS
              </button>
            </div>
          </div>

          {/* Terminal Content */}
          <div className="p-6 md:p-8 font-mono text-xs">
            {activeTab === 'stack' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Frontend Core</span>
                  <div className="text-white font-semibold text-sm">React, Next.js, TypeScript</div>
                  <p className="text-white/50 text-[11px] font-sans">
                    Modern component hierarchies, SSR/SSG rendering, Tailwind CSS, Lenis, GSAP motion.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Backend & APIs</span>
                  <div className="text-white font-semibold text-sm">Node.js, Express, MongoDB</div>
                  <p className="text-white/50 text-[11px] font-sans">
                    Structured collections, REST endpoints, secure data modeling, token authentication.
                  </p>
                </div>
                <div className="space-y-2">
                  <span className="text-[10px] text-white/40 uppercase tracking-widest block">Tooling & Testing</span>
                  <div className="text-white font-semibold text-sm">Postman, Git, Vercel</div>
                  <p className="text-white/50 text-[11px] font-sans">
                    Rigorous API contract testing in Postman, continuous automated deployments.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'education' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--color-accent-violet)] font-bold text-sm">Mars IT School</span>
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1"><CheckCircle2 size={11} /> Graduated</span>
                  </div>
                  <div className="text-white font-semibold text-xs mb-2">Frontend Development Course</div>
                  <p className="text-white/50 text-[11px] font-sans leading-relaxed">
                    Comprehensive study of HTML5, CSS3, modern JavaScript ES6+, responsive layout engineering, and DOM mechanics.
                  </p>
                </div>
                <div className="p-4 rounded-lg bg-white/[0.02] border border-white/5">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-[var(--color-accent-blue)] font-bold text-sm">Mars IT School</span>
                    <span className="text-emerald-400 text-[10px] flex items-center gap-1"><CheckCircle2 size={11} /> Graduated</span>
                  </div>
                  <div className="text-white font-semibold text-xs mb-2">Frontend Pro Course</div>
                  <p className="text-white/50 text-[11px] font-sans leading-relaxed">
                    Advanced React patterns, state managers, complex application architecture, REST API integrations, and production optimizations.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'methods' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <span className="text-emerald-400 text-xs font-bold block mb-1">01 // Zero Lag</span>
                  <p className="text-white/60 text-[11px] font-sans">
                    All animations run via hardware-accelerated transforms with requestAnimationFrame sync.
                  </p>
                </div>
                <div>
                  <span className="text-blue-400 text-xs font-bold block mb-1">02 // Type Safety</span>
                  <p className="text-white/60 text-[11px] font-sans">
                    Strict TypeScript across components and data layers to eradicate runtime crashes.
                  </p>
                </div>
                <div>
                  <span className="text-purple-400 text-xs font-bold block mb-1">03 // Mobile Native</span>
                  <p className="text-white/60 text-[11px] font-sans">
                    Touch-first gestures, responsive clamped typography, and graceful degradation.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section Divider with Spacing */}
        <div className="section-divider my-24 md:my-32 opacity-40" />

        {/* 4 Pillars of Engineering */}
        <div className="mb-24 md:mb-32">
          <div className="flex items-center gap-3 mb-10">
            <div className="accent-dot-blue" />
            <h3 className="text-label text-white/90 text-xs font-bold tracking-wider">{t('about.philosophy.title')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {pillars.map((pillar, i) => (
              <div 
                key={i}
                className="about-card p-7 rounded-2xl border border-white/10 bg-[#0d0f14]/80 backdrop-blur-md hover:border-white/25 transition-all duration-400 hover:-translate-y-1.5 group shadow-lg"
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300">
                  {pillar.icon}
                </div>
                <h4 className="text-white font-bold text-sm mb-2.5 font-sans tracking-tight">
                  {pillar.title}
                </h4>
                <p className="text-white/50 text-xs font-sans leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Section Divider with Spacing */}
        <div className="section-divider my-24 md:my-32 opacity-40" />

        {/* Workflow Stages */}
        <div className="pb-8">
          <div className="flex items-center gap-3 mb-10">
            <div className="accent-dot" />
            <h3 className="text-label text-white/90 text-xs font-bold tracking-wider">{t('about.workflow.title')}</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {workflowSteps.map((step, i) => (
              <div 
                key={i}
                className="about-card p-6 rounded-xl border border-white/10 bg-[#0d0f14]/60 backdrop-blur-sm hover:border-white/20 transition-all"
              >
                <span className="font-mono text-[11px] text-[var(--color-accent-violet)] font-bold block mb-3">
                  {step.step}
                </span>
                <p className="text-white/60 text-xs font-sans leading-relaxed">
                  {step.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
