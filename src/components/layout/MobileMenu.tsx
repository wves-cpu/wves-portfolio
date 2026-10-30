'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (href: string) => void;
}

const NAV_ITEMS = [
  { key: 'nav.work', href: '#work' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.expertise', href: '#expertise' },
  { key: 'nav.contact', href: '#contact' },
];

export default function MobileMenu({ isOpen, onClose, onNavigate }: MobileMenuProps) {
  const { t } = useLanguage();
  const menuRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuRef.current) return;

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      gsap.set(menuRef.current, { display: 'flex' });
      gsap.fromTo(
        menuRef.current,
        { clipPath: 'inset(0 0 100% 0)' },
        { clipPath: 'inset(0 0 0% 0)', duration: 0.6, ease: 'power4.inOut' }
      );

      const links = linksRef.current?.querySelectorAll('.mobile-nav-link');
      if (links) {
        gsap.fromTo(
          links,
          { y: 60, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.6,
            stagger: 0.08,
            ease: 'power3.out',
            delay: 0.3,
          }
        );
      }
    } else {
      document.body.style.overflow = '';
      gsap.to(menuRef.current, {
        clipPath: 'inset(0 0 100% 0)',
        duration: 0.5,
        ease: 'power4.inOut',
        onComplete: () => {
          if (menuRef.current) gsap.set(menuRef.current, { display: 'none' });
        },
      });
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Keyboard trap
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <div
      ref={menuRef}
      className="mobile-menu md:hidden"
      style={{ display: 'none', clipPath: 'inset(0 0 100% 0)' }}
      role="dialog"
      aria-modal="true"
      aria-label="Navigation menu"
    >
      <div ref={linksRef} className="flex flex-col items-center gap-8">
        {NAV_ITEMS.map((item) => (
          <button
            key={item.key}
            onClick={() => onNavigate(item.href)}
            className="mobile-nav-link text-4xl font-bold tracking-tight opacity-0"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {t(item.key)}
          </button>
        ))}
      </div>
    </div>
  );
}
