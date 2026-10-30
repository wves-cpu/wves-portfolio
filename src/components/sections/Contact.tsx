'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import MagneticButton from '@/components/ui/MagneticButton';
import { Send, Phone, ArrowUp, ArrowUpRight } from 'lucide-react';

function GithubIcon({ size = 22, className = '' }: { size?: number; className?: string }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/>
    </svg>
  );
}

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const { t } = useLanguage();
  const reducedMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (reducedMotion || !sectionRef.current) return;

    const ctx = gsap.context(() => {
      // Heading reveal
      const headingLines = sectionRef.current?.querySelectorAll('.contact-heading-line');
      if (headingLines) {
        headingLines.forEach((line, i) => {
          const words = line.querySelectorAll('.contact-word');
          gsap.fromTo(words, { y: '110%' }, {
            y: '0%', duration: 1.2, stagger: 0.08, ease: 'power4.out',
            delay: i * 0.15,
            scrollTrigger: { trigger: sectionRef.current, start: 'top 70%', once: true },
          });
        });
      }

      // Description
      const desc = sectionRef.current?.querySelector('.contact-desc');
      if (desc) {
        gsap.fromTo(desc, { y: 30, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: desc, start: 'top 85%', once: true },
        });
      }

      // Links with stagger
      const links = sectionRef.current?.querySelectorAll('.contact-link');
      if (links) {
        gsap.fromTo(links, { y: 40, opacity: 0 }, {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: links[0], start: 'top 88%', once: true },
        });
      }

      // Background glow pulse
      const glow = sectionRef.current?.querySelector('.contact-glow');
      if (glow) {
        gsap.fromTo(glow, { scale: 0.3, opacity: 0 }, {
          scale: 1, opacity: 1, duration: 2.5, ease: 'power2.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%', once: true },
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  const scrollToTop = () => {
    const lenis = (window as any).__lenis;
    if (lenis) lenis.scrollTo(0, { duration: 1.8 });
    else window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative overflow-hidden min-h-screen flex flex-col justify-between py-32 md:py-48 px-6 md:px-12 lg:px-20 bg-[#060709]"
    >
      {/* Background ambient lighting */}
      <div
        className="contact-glow absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] pointer-events-none opacity-0"
        style={{
          background: 'radial-gradient(circle, rgba(146,117,255,0.08) 0%, rgba(77,141,255,0.04) 40%, transparent 70%)',
        }}
      />

      <div className="max-w-[1400px] mx-auto relative z-10 w-full flex flex-col justify-between flex-1">
        {/* Section Header */}
        <div className="mb-20 md:mb-28">
          <div className="flex items-center gap-3 mb-6">
            <div className="accent-dot" />
            <p className="text-label text-white/80">{t('contact.label')}</p>
          </div>
          <div className="section-divider mb-12 opacity-30" />

          {/* Grand Headline */}
          <h2 className="heading-display mb-8 md:mb-12" style={{ fontSize: 'clamp(2.5rem, 6.5vw, 6.5rem)', lineHeight: 0.98 }}>
            <span className="contact-heading-line block overflow-hidden pb-2">
              <span className="contact-word inline-block">{t('contact.heading.line1')}</span>
            </span>
            <span className="contact-heading-line block overflow-hidden pb-2">
              <span className="contact-word inline-block gradient-text-accent">{t('contact.heading.line2')}</span>
            </span>
          </h2>

          <p className="contact-desc text-body text-base md:text-xl text-white/70 max-w-xl font-sans leading-relaxed">
            {t('contact.description')}
          </p>
        </div>

        {/* Contact Links — Spacious, Expansive Luxury Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-28 md:mb-36">
          {/* GitHub Card */}
          <a
            href="https://github.com/wves-cpu"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group relative p-8 md:p-10 min-h-[200px] flex flex-col justify-between border border-white/10 bg-[#0e1017]/80 rounded-2xl hover:border-[var(--color-accent-violet)] transition-all duration-500 overflow-hidden backdrop-blur-xl shadow-2xl hover:-translate-y-1.5"
            data-cursor="interactive"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-violet)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[var(--color-accent-violet)] group-hover:border-[var(--color-accent-violet)]/40 transition-all">
                <GithubIcon size={24} />
              </div>
              <ArrowUpRight size={18} className="text-white/30 group-hover:text-[var(--color-accent-violet)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="relative z-10 pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-2">{t('contact.github')}</span>
              <span className="text-base md:text-lg font-mono font-bold text-white group-hover:text-[var(--color-accent-violet)] transition-colors">
                github.com/wves-cpu
              </span>
            </div>
          </a>

          {/* Telegram Card */}
          <a
            href="https://t.me/wvees"
            target="_blank"
            rel="noopener noreferrer"
            className="contact-link group relative p-8 md:p-10 min-h-[200px] flex flex-col justify-between border border-white/10 bg-[#0e1017]/80 rounded-2xl hover:border-[var(--color-accent-blue)] transition-all duration-500 overflow-hidden backdrop-blur-xl shadow-2xl hover:-translate-y-1.5"
            data-cursor="interactive"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent-blue)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70 group-hover:text-[var(--color-accent-blue)] group-hover:border-[var(--color-accent-blue)]/40 transition-all">
                <Send size={24} />
              </div>
              <ArrowUpRight size={18} className="text-white/30 group-hover:text-[var(--color-accent-blue)] group-hover:translate-x-1 group-hover:-translate-y-1 transition-all" />
            </div>
            <div className="relative z-10 pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-2">{t('contact.telegram')}</span>
              <span className="text-base md:text-lg font-mono font-bold text-white group-hover:text-[var(--color-accent-blue)] transition-colors">
                @wvees
              </span>
            </div>
          </a>

          {/* Phone Card */}
          <div className="contact-link relative p-8 md:p-10 min-h-[200px] flex flex-col justify-between border border-white/10 bg-[#0e1017]/80 rounded-2xl backdrop-blur-xl shadow-2xl">
            <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/70">
              <Phone size={24} />
            </div>
            <div className="pt-6">
              <span className="font-mono text-xs uppercase tracking-widest text-white/40 block mb-2">{t('contact.phone')}</span>
              <span className="text-base md:text-lg font-mono font-bold text-white">
                (99) 838-80-08
              </span>
            </div>
          </div>
        </div>

        {/* Back to top — Spaciously placed at bottom */}
        <div className="pt-10 border-t border-white/10 flex justify-center w-full">
          <MagneticButton onClick={scrollToTop} ariaLabel={t('contact.backToTop')}>
            <span className="flex items-center gap-3">
              <ArrowUp size={15} />
              {t('contact.backToTop')}
            </span>
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
