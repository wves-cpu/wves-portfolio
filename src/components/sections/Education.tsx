'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useReducedMotion';

gsap.registerPlugin(ScrollTrigger);

export default function Education() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading lines
      const headingLines = sectionRef.current?.querySelectorAll('.edu-heading-line');
      if (headingLines) {
        gsap.fromTo(headingLines, { y: 50, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.9, stagger: 0.15, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        });
      }

      // Timeline elements
      const timelineItems = sectionRef.current?.querySelectorAll('.edu-item');
      if (timelineItems) {
        gsap.fromTo(timelineItems, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.12, ease: 'power3.out',
          scrollTrigger: { trigger: timelineItems[0], start: 'top 85%', once: true },
        });
      }

      // Timeline line grow
      const timelineLine = sectionRef.current?.querySelector('.edu-timeline-line');
      if (timelineLine) {
        gsap.fromTo(timelineLine, { scaleY: 0 }, {
          scaleY: 1, duration: 1.4, ease: 'power4.inOut',
          scrollTrigger: { trigger: timelineLine, start: 'top 85%', once: true },
        });
      }

      // Dots appear
      const dots = sectionRef.current?.querySelectorAll('.edu-dot');
      if (dots) {
        gsap.fromTo(dots, { scale: 0, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 0.5, stagger: 0.2, ease: 'back.out(2)',
          scrollTrigger: { trigger: dots[0], start: 'top 85%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      className="section-padding relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="accent-dot" />
            <p className="text-label">{t('education.label')}</p>
          </div>
          <div className="section-divider mb-12" />
          <h2 className="heading-display heading-lg">
            <span className="edu-heading-line block">{t('education.heading.line1')}</span>
            <span className="edu-heading-line block mt-1">{t('education.heading.line2')}</span>
            <span className="edu-heading-line block mt-1 gradient-text-accent">{t('education.heading.line3')}</span>
          </h2>
        </div>

        {/* Education — editorial timeline */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          {/* Left column — timeline visual */}
          <div className="lg:col-span-5">
            <div className="relative flex gap-8">
              {/* Vertical timeline */}
              <div className="relative flex flex-col items-center min-h-[280px]">
                <div
                  className="edu-timeline-line absolute top-0 w-[1px] h-full bg-[var(--color-border)]"
                  style={{ transformOrigin: 'top center' }}
                />
                {/* Top dot */}
                <div className="edu-dot relative z-10 w-3 h-3 rounded-full border border-[var(--color-accent-violet)] bg-[var(--color-bg-primary)] flex-shrink-0" />
                {/* Bottom dot */}
                <div className="edu-dot absolute bottom-0 z-10 w-3 h-3 rounded-full border border-[var(--color-accent-blue)] bg-[var(--color-bg-primary)] flex-shrink-0" />
              </div>

              {/* Timeline content */}
              <div className="flex flex-col justify-between py-0 min-h-[280px]">
                {/* School */}
                <div className="edu-item">
                  <h3
                    className="text-2xl md:text-3xl font-bold mb-6 tracking-tight"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {t('education.school')}
                  </h3>
                </div>

                {/* Programs */}
                <div className="flex flex-col gap-6">
                  <div className="edu-item group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-violet)] group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-body text-[var(--color-text-primary)] text-base">
                        {t('education.program1')}
                      </span>
                    </div>
                  </div>

                  <div className="edu-item group">
                    <div className="flex items-center gap-3 mb-2">
                      <div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-blue)] group-hover:scale-150 transition-transform duration-300" />
                      <span className="text-body text-[var(--color-text-primary)] text-base">
                        {t('education.program2')}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right column — description */}
          <div className="lg:col-span-7 flex items-center">
            <div className="edu-item">
              <p className="text-body text-base md:text-lg leading-relaxed max-w-xl">
                {t('education.description')}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
