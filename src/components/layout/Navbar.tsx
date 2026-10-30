'use client';

import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useLanguage } from '@/hooks/useLanguage';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';
import MobileMenu from '@/components/layout/MobileMenu';

gsap.registerPlugin(ScrollTrigger);

const NAV_ITEMS = [
  { key: 'nav.work', href: '#work' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.expertise', href: '#expertise' },
  { key: 'nav.contact', href: '#contact' },
];

export default function Navbar() {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = ['work', 'about', 'expertise', 'contact'];
    const triggers: ScrollTrigger[] = [];

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onEnter: () => setActiveSection(id),
          onEnterBack: () => setActiveSection(id),
        })
      );
    });

    return () => triggers.forEach((t) => t.kill());
  }, []);

  useEffect(() => {
    if (!navRef.current) return;
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out', delay: 2.5 }
    );
  }, []);

  const handleNavClick = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      const lenis = (window as any).__lenis;
      if (lenis) {
        lenis.scrollTo(el, { offset: -80, duration: 1.5 });
      } else {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-4 md:top-6 left-0 right-0 z-[998] transition-all duration-500 px-4 md:px-10 lg:px-16 pointer-events-none`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div 
          className={`max-w-[1400px] mx-auto w-full px-6 md:px-8 py-3.5 rounded-full transition-all duration-500 flex items-center justify-between pointer-events-auto ${
            isScrolled
              ? 'bg-[#090b10]/90 border border-white/15 backdrop-blur-xl shadow-2xl shadow-black/80'
              : 'bg-[#0e1017]/75 border border-white/10 backdrop-blur-md shadow-lg shadow-black/50'
          }`}
        >
          {/* Brand + Cinematic Status */}
          <div className="flex items-center gap-4">
            <button
              onClick={() => {
                const lenis = (window as any).__lenis;
                if (lenis) lenis.scrollTo(0, { duration: 1.5 });
                else window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-lg md:text-xl font-bold tracking-tight text-white hover:text-[var(--color-accent-violet)] transition-colors flex items-center gap-1.5 cursor-pointer"
              style={{ fontFamily: 'var(--font-display)' }}
              aria-label="Scroll to top"
            >
              <span>wves</span>
              <span className="text-[var(--color-accent-violet)]">.</span>
            </button>
            <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-white/10 font-mono text-[10px] text-white/40">
              <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
              <span>REC // 24FPS</span>
            </div>
          </div>

          {/* Desktop Nav with spacious links */}
          <div className="hidden md:flex items-center gap-8 lg:gap-11">
            {NAV_ITEMS.map((item) => {
              const sectionId = item.href.replace('#', '');
              const isActive = activeSection === sectionId;
              return (
                <button
                  key={item.key}
                  onClick={() => handleNavClick(item.href)}
                  className={`text-mono text-xs uppercase tracking-widest relative py-1 transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'text-white font-bold'
                      : 'text-white/60 hover:text-white'
                  }`}
                >
                  {t(item.key)}
                  {isActive && (
                    <span className="absolute -bottom-1 left-0 w-full h-[2px] rounded-full bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-blue)]" />
                  )}
                </button>
              );
            })}

            {/* Language Switcher with comfortable left separation */}
            <div className="pl-4 border-l border-white/10">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-3">
            <LanguageSwitcher />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex flex-col gap-1.5 p-2"
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isMobileMenuOpen}
            >
              <span
                className={`block w-6 h-[1.5px] bg-[var(--color-text-primary)] transition-transform duration-300 ${
                  isMobileMenuOpen ? 'rotate-45 translate-y-[4.5px]' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-[var(--color-text-primary)] transition-all duration-300 ${
                  isMobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`block w-6 h-[1.5px] bg-[var(--color-text-primary)] transition-transform duration-300 ${
                  isMobileMenuOpen ? '-rotate-45 -translate-y-[4.5px]' : ''
                }`}
              />
            </button>
          </div>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        onNavigate={handleNavClick}
      />
    </>
  );
}
