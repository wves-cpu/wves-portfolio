'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { projects } from '@/data/projects';
import { ArrowUpRight, ExternalLink, Eye, Monitor, Play, Sparkles } from 'lucide-react';
import Link from 'next/link';
import ProjectLivePreview from '@/components/projects/ProjectLivePreview';
import ProjectMockup from '@/components/visuals/ProjectMockup';

gsap.registerPlugin(ScrollTrigger);

export default function SelectedWork() {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);
  const [previewProject, setPreviewProject] = useState<string | null>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Section heading
      const headingLines = sectionRef.current?.querySelectorAll('.work-heading-line');
      if (headingLines) {
        gsap.fromTo(headingLines, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power4.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        });
      }

      // Animate each project card
      const cards = sectionRef.current?.querySelectorAll('.project-item');
      cards?.forEach((card, i) => {
        const image = card.querySelector('.project-image-wrapper');
        const info = card.querySelector('.project-info');
        const number = card.querySelector('.project-number');
        const line = card.querySelector('.project-line');

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: card,
            start: 'top 82%',
            once: true,
          },
        });

        if (line) {
          tl.fromTo(line, { scaleX: 0 }, {
            scaleX: 1, duration: 1, ease: 'power4.inOut',
          });
        }

        if (number) {
          tl.fromTo(number, { opacity: 0, y: 20 }, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power3.out',
          }, '-=0.6');
        }

        if (image) {
          const dir = i % 2 === 0 ? 'inset(0% 100% 0% 0%)' : 'inset(0% 0% 0% 100%)';
          tl.fromTo(image,
            { clipPath: dir },
            { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut' },
            '-=0.4'
          );
        }

        if (info) {
          const infoEls = info.querySelectorAll('.project-info-item');
          tl.fromTo(infoEls, { y: 25, opacity: 0 }, {
            y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'power3.out',
          }, '-=0.7');
        }
      });

      // Parallax on images
      const images = sectionRef.current?.querySelectorAll('.project-parallax');
      images?.forEach((img) => {
        gsap.to(img, {
          yPercent: -10,
          ease: 'none',
          scrollTrigger: {
            trigger: img.closest('.project-image-wrapper'),
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1.2,
          },
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="section-padding relative"
    >
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="mb-16 md:mb-24">
          <div className="flex items-center gap-3 mb-6">
            <div className="accent-dot" />
            <p className="text-label">{t('work.label')}</p>
          </div>
          <div className="section-divider mb-10" />
          <h2 className="heading-display heading-lg">
            <span className="work-heading-line block">{t('work.heading.line1')}</span>
            <span className="work-heading-line block mt-1 gradient-text-accent">{t('work.heading.line2')}</span>
          </h2>
        </div>

        {/* Projects */}
        <div className="flex flex-col gap-0">
          {projects.map((project, index) => {
            const isEven = index % 2 === 0;
            return (
              <div
                key={project.id}
                className="project-item group"
              >
                {/* Top divider line */}
                <div
                  className="project-line h-[1px] bg-[var(--color-border)] mb-8 md:mb-10"
                  style={{ transformOrigin: isEven ? 'left center' : 'right center' }}
                />

                {/* Content grid with balanced column widths */}
                <div className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center mb-24 md:mb-32`}>
                  {/* Number + Info column (5 cols) */}
                  <div className={`project-info lg:col-span-5 flex flex-col gap-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                    {/* Project number + Category */}
                    <div className="project-number flex items-center gap-3">
                      <span className="text-mono text-white/40 font-bold" style={{ fontSize: '0.75rem' }}>
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <div className="h-[1px] w-8 bg-white/15" />
                      <span className="project-info-item text-label font-bold" style={{ color: project.accentColor }}>
                        {project.category[language]}
                      </span>
                    </div>

                    {/* Title */}
                    <Link href={`/projects/${project.slug}`} data-cursor="project">
                      <h3 className="project-info-item heading-display text-2xl md:text-3xl lg:text-4xl text-white group-hover:text-[var(--color-accent-violet)] transition-colors duration-400">
                        {project.name}
                      </h3>
                    </Link>

                    {/* Description */}
                    <p className="project-info-item text-body text-sm md:text-base leading-relaxed text-white/70 max-w-md font-sans">
                      {project.description[language]}
                    </p>

                    {/* Status badge */}
                    {project.status === 'live' && (
                      <div className="project-info-item flex items-center gap-2">
                        <span className="status-live">Verified Live Website</span>
                      </div>
                    )}

                    {/* Action buttons — balanced and comfortable */}
                    <div className="project-info-item flex flex-wrap items-center gap-3 mt-2 pt-3 border-t border-white/10">
                      {/* Live Preview Button */}
                      {project.previewUrl && (
                        <button
                          onClick={() => setPreviewProject(project.slug)}
                          className="preview-btn preview-btn-primary"
                          data-cursor="interactive"
                          title={t('work.preview')}
                        >
                          <Play size={12} className="fill-current" />
                          {t('work.preview')}
                        </button>
                      )}

                      {/* Explore */}
                      <Link
                        href={`/projects/${project.slug}`}
                        className="preview-btn"
                        data-cursor="interactive"
                      >
                        <Eye size={13} />
                        {t('work.view')}
                      </Link>

                      {/* Visit Website */}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="preview-btn"
                          data-cursor="interactive"
                        >
                          <ExternalLink size={13} />
                          {t('work.visit')}
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Image panel with Real Visual Project Mockup (7 cols) */}
                  <div
                    className={`project-image-wrapper lg:col-span-7 relative rounded-2xl border border-white/10 bg-[#0d0f14]/90 overflow-hidden shadow-2xl transition-all duration-500 hover:border-white/25 group/mockup ${isEven ? 'lg:order-2' : 'lg:order-1'}`}
                    style={{ minHeight: '340px' }}
                  >
                    {/* Ambient Glow */}
                    <div 
                      className="absolute -top-24 -right-24 w-72 h-72 rounded-full opacity-20 pointer-events-none blur-3xl transition-opacity duration-700 group-hover/mockup:opacity-40"
                      style={{ background: project.accentColor }}
                    />
                    
                    {/* Browser / Device Chrome Header */}
                    <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
                      <div className="flex items-center gap-2">
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
                        <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
                        <span className="ml-2 font-mono text-[10px] text-white/40">
                          {project.slug}.wves.app
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-[9px] uppercase tracking-wider text-white/40 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                          Live Interactive View
                        </span>
                      </div>
                    </div>

                    {/* Interactive UI Mockup */}
                    <div className="relative min-h-[290px] flex items-center justify-center p-2">
                      <ProjectMockup slug={project.slug} accentColor={project.accentColor} />
                    </div>

                    {/* Hover Quick Overlay with Buttons */}
                    <div className="absolute inset-0 bg-[#08090b]/85 opacity-0 group-hover/mockup:opacity-100 transition-all duration-400 flex flex-col items-center justify-center gap-3 backdrop-blur-sm p-6 pointer-events-none group-hover/mockup:pointer-events-auto">
                      <div className="text-center mb-1">
                        <span className="text-label text-xs" style={{ color: project.accentColor }}>
                          {project.category[language]}
                        </span>
                        <h4 className="heading-display text-2xl text-white mt-1">
                          {project.name}
                        </h4>
                      </div>

                      <div className="flex flex-wrap items-center justify-center gap-3">
                        {project.previewUrl && (
                          <button
                            onClick={() => setPreviewProject(project.slug)}
                            className="preview-btn preview-btn-primary"
                          >
                            <Play size={13} className="fill-current" />
                            {t('work.preview')}
                          </button>
                        )}
                        <Link
                          href={`/projects/${project.slug}`}
                          className="preview-btn"
                        >
                          <Eye size={13} />
                          {t('work.view')}
                        </Link>
                        {project.liveUrl && (
                          <a
                            href={project.liveUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="preview-btn"
                          >
                            <ExternalLink size={13} />
                            {t('work.visit')}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Interactive Project Explorer / Live Preview Modal */}
      {previewProject && (() => {
        const activeProj = projects.find((p) => p.slug === previewProject);
        if (!activeProj) return null;
        return (
          <ProjectLivePreview
            isOpen={true}
            onClose={() => setPreviewProject(null)}
            projectName={activeProj.name}
            previewUrl={activeProj.previewUrl}
            liveUrl={activeProj.liveUrl}
            allowEmbed={activeProj.allowEmbed}
            accentColor={activeProj.accentColor}
          />
        );
      })()}
    </section>
  );
}
