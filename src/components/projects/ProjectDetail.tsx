'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { Project } from '@/types/project';
import { projects } from '@/data/projects';
import { ArrowLeft, ArrowRight, ExternalLink, Eye } from 'lucide-react';
import MagneticButton from '@/components/ui/MagneticButton';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import ProjectLivePreview from '@/components/projects/ProjectLivePreview';
import ProjectMockup from '@/components/visuals/ProjectMockup';

gsap.registerPlugin(ScrollTrigger);

interface ProjectDetailProps {
  project: Project;
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const { language, t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [showPreview, setShowPreview] = useState(false);

  const currentIndex = projects.findIndex((p) => p.id === project.id);
  const nextProject = projects[(currentIndex + 1) % projects.length];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];

  useEffect(() => {
    if (reducedMotion) return;

    const ctx = gsap.context(() => {
      // Hero
      gsap.fromTo(heroRef.current,
        { clipPath: 'inset(100% 0% 0% 0%)' },
        { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.inOut', delay: 0.2 }
      );

      // Content
      const items = contentRef.current?.querySelectorAll('.detail-item');
      if (items) {
        gsap.fromTo(items, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power3.out', delay: 0.8,
        });
      }

      // Next project link
      const nextLink = contentRef.current?.querySelector('.next-project');
      if (nextLink) {
        gsap.fromTo(nextLink, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: nextLink, start: 'top 90%', once: true },
        });
      }
    });

    return () => ctx.revert();
  }, [reducedMotion, project.id]);

  return (
    <div className="min-h-screen bg-[var(--color-bg-primary)]">
      <Navbar />

      {/* Hero */}
      <div
        ref={heroRef}
        className="w-full relative overflow-hidden"
        style={{ height: 'clamp(50vh, 65vh, 70vh)' }}
      >
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${project.accentColor}18 0%, var(--color-bg-secondary) 35%, var(--color-bg-elevated) 100%)`,
          }}
        />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,1) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />
        {/* Ghost title */}
        <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
          <span
            className="text-6xl md:text-8xl lg:text-[12rem] font-bold opacity-[0.03] tracking-tighter select-none"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {project.name}
          </span>
        </div>
        {/* Accent glow */}
        <div
          className="absolute w-[500px] h-[500px] rounded-full"
          style={{
            background: `radial-gradient(circle, ${project.accentColor}12, transparent 60%)`,
            top: '20%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            filter: 'blur(60px)',
          }}
        />
        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-[var(--color-bg-primary)] to-transparent" />
      </div>

      {/* Content */}
      <div ref={contentRef} className="max-w-[900px] mx-auto px-6 md:px-10 -mt-16 relative z-10 pb-24">
        {/* Category badge */}
        <span
          className="detail-item text-label inline-block mb-5 px-3 py-1 border rounded-full"
          style={{ color: project.accentColor, borderColor: `${project.accentColor}40` }}
        >
          {project.category[language]}
        </span>

        {/* Title — reduced size */}
        <h1 className="detail-item heading-display text-3xl md:text-5xl lg:text-6xl mb-8">
          {project.name}
        </h1>

        {/* Status */}
        {project.status === 'live' && (
          <div className="detail-item mb-6">
            <span className="status-live">Live</span>
          </div>
        )}

        <div className="detail-item section-divider mb-12" />

        {/* Overview */}
        <div className="detail-item mb-14">
          <h2 className="text-label mb-5">{t('project.overview')}</h2>
          <p className="text-body text-base md:text-lg leading-relaxed max-w-2xl">
            {project.description[language]}
          </p>
        </div>

        {/* Technologies */}
        {project.technologies && project.technologies.length > 0 && (
          <div className="detail-item mb-14">
            <h2 className="text-label mb-5">Technologies</h2>
            <div className="flex flex-wrap gap-3">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="px-4 py-2 text-sm border border-[var(--color-border)] rounded-full text-[var(--color-text-secondary)] hover:border-[var(--color-accent-violet)] hover:text-[var(--color-text-primary)] transition-colors duration-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Project Interactive Visual Showcase */}
        <div className="detail-item mb-14 rounded-xl border border-white/10 bg-[#0d0f14]/90 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-white/[0.02]">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]/80" />
              <div className="w-2.5 h-2.5 rounded-full bg-[#27C93F]/80" />
              <span className="ml-2 font-mono text-[10px] text-white/40">
                {project.slug}.wves.app // Interactive Telemetry
              </span>
            </div>
            <span className="font-mono text-[9px] uppercase tracking-wider text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              Active System
            </span>
          </div>
          <div className="p-3 md:p-6 min-h-[300px] flex items-center justify-center">
            <ProjectMockup slug={project.slug} accentColor={project.accentColor} />
          </div>
        </div>

        {/* Action Buttons — properly spaced */}
        <div className="detail-item flex flex-wrap items-center gap-4 mb-14">
          {project.previewUrl && project.allowEmbed && (
            <button
              onClick={() => setShowPreview(true)}
              className="preview-btn preview-btn-primary"
            >
              <Eye size={14} />
              {t('project.livePreview')}
            </button>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="preview-btn"
            >
              <ExternalLink size={14} />
              {t('project.visitSite')}
            </a>
          )}
          {project.githubUrl && (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="preview-btn"
            >
              GitHub
            </a>
          )}
        </div>

        {/* Prev / Next navigation */}
        <div className="next-project mt-20 pt-12 border-t border-[var(--color-border)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Previous */}
            <Link
              href={`/projects/${prevProject.slug}`}
              className="group flex items-center gap-4 py-3"
              data-cursor="project"
            >
              <ArrowLeft
                size={20}
                className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-violet)] group-hover:-translate-x-2 transition-all duration-400 flex-shrink-0"
              />
              <div>
                <span className="text-label block mb-2">{t('project.prev')}</span>
                <span className="heading-display text-xl md:text-2xl group-hover:text-[var(--color-accent-violet)] transition-colors duration-400">
                  {prevProject.name}
                </span>
              </div>
            </Link>

            {/* Next */}
            <Link
              href={`/projects/${nextProject.slug}`}
              className="group flex items-center justify-end gap-4 py-3 text-right"
              data-cursor="project"
            >
              <div>
                <span className="text-label block mb-2">{t('project.next')}</span>
                <span className="heading-display text-xl md:text-2xl group-hover:text-[var(--color-accent-violet)] transition-colors duration-400">
                  {nextProject.name}
                </span>
              </div>
              <ArrowRight
                size={20}
                className="text-[var(--color-text-secondary)] group-hover:text-[var(--color-accent-violet)] group-hover:translate-x-2 transition-all duration-400 flex-shrink-0"
              />
            </Link>
          </div>
        </div>

        {/* Back link */}
        <div className="mt-12 flex justify-center">
          <MagneticButton href="/#work" ariaLabel={t('project.back')}>
            <span className="flex items-center gap-2">
              <ArrowLeft size={14} />
              {t('project.back')}
            </span>
          </MagneticButton>
        </div>
      </div>

      <Footer />

      {/* Live Preview Modal */}
      <ProjectLivePreview
        isOpen={showPreview}
        onClose={() => setShowPreview(false)}
        projectName={project.name}
        previewUrl={project.previewUrl}
        liveUrl={project.liveUrl}
        allowEmbed={project.allowEmbed}
        accentColor={project.accentColor}
      />
    </div>
  );
}
