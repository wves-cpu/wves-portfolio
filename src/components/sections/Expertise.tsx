'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { skills } from '@/data/skills';

gsap.registerPlugin(ScrollTrigger);

export default function Expertise() {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section heading animation
      const headingLines = sectionRef.current?.querySelectorAll('.expertise-heading-line');
      if (headingLines) {
        gsap.fromTo(headingLines, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        });
      }

      // Skill items — staggered from different directions
      const skillItems = sectionRef.current?.querySelectorAll('.skill-item');
      if (skillItems) {
        gsap.fromTo(skillItems, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out',
          scrollTrigger: { trigger: skillItems[0], start: 'top 85%', once: true },
        });
      }

      // Divider lines expand
      const dividers = sectionRef.current?.querySelectorAll('.skill-divider');
      if (dividers) {
        dividers.forEach((d, i) => {
          gsap.fromTo(d, { scaleX: 0 }, {
            scaleX: 1, duration: 0.8, ease: 'power4.inOut',
            delay: i * 0.05,
            scrollTrigger: { trigger: d, start: 'top 92%', once: true },
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="expertise"
      className="section-padding relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="accent-dot" />
            <p className="text-label">{t('expertise.label')}</p>
          </div>
          <div className="section-divider mb-12" />
          <h2 className="heading-display heading-lg">
            <span className="expertise-heading-line block">{t('expertise.heading.line1')}</span>
            <span className="expertise-heading-line block mt-1">{t('expertise.heading.line2')}</span>
          </h2>
        </div>

        {/* Skills — large typographic list */}
        <div className="space-y-0">
          {skills.map((skill, index) => (
            <div key={skill.name}>
              <div
                className="skill-divider h-[1px] bg-[var(--color-border)]"
                style={{ transformOrigin: 'left center' }}
              />
              <div
                className="skill-item py-8 md:py-10 flex flex-col md:flex-row md:items-center justify-between gap-4 group cursor-default relative"
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
              >
                {/* Left: number + name */}
                <div className="flex items-baseline gap-6 md:gap-8">
                  <span className="text-mono text-[var(--color-text-secondary)] opacity-30 text-xs w-6">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <h3
                    className={`text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight transition-all duration-500 ${
                      hoveredSkill === skill.name
                        ? 'text-[var(--color-text-primary)] translate-x-3'
                        : hoveredSkill !== null
                        ? 'text-[var(--color-text-secondary)] opacity-30'
                        : 'text-[var(--color-text-primary)]'
                    }`}
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {skill.name}
                  </h3>
                </div>

                {/* Right: category + expanding line */}
                <div className="flex items-center gap-4">
                  <div
                    className={`h-[1px] bg-[var(--color-accent-violet)] transition-all duration-500 ${
                      hoveredSkill === skill.name ? 'w-12 opacity-100' : 'w-0 opacity-0'
                    }`}
                  />
                  <span
                    className={`text-label transition-all duration-500 whitespace-nowrap ${
                      hoveredSkill === skill.name
                        ? 'opacity-100 translate-x-0'
                        : 'opacity-0 translate-x-4'
                    }`}
                    style={{ color: 'var(--color-accent-violet)' }}
                  >
                    {skill.category[language]}
                  </span>
                </div>

                {/* Background highlight on hover */}
                <div
                  className={`absolute inset-0 -mx-4 rounded-sm transition-opacity duration-500 pointer-events-none ${
                    hoveredSkill === skill.name ? 'opacity-100' : 'opacity-0'
                  }`}
                  style={{
                    background: 'linear-gradient(90deg, rgba(146,117,255,0.03) 0%, transparent 100%)',
                  }}
                />
              </div>
            </div>
          ))}
          <div className="skill-divider h-[1px] bg-[var(--color-border)]" style={{ transformOrigin: 'left center' }} />
        </div>
      </div>
    </section>
  );
}
