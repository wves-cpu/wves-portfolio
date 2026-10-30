'use client';

import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const { t } = useLanguage();
  const posRef = useRef({ x: -100, y: -100 });
  const isExpandedRef = useRef(false);

  useEffect(() => {
    // Check for fine pointer and no touch
    const isFine = window.matchMedia('(pointer: fine)').matches;
    const hasTouch = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    setIsDesktop(isFine && !hasTouch);
  }, []);

  useEffect(() => {
    if (!isDesktop || !cursorRef.current) return;

    document.body.style.cursor = 'none';

    const onMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Check for project cursor
      const projectEl = target.closest('[data-cursor="project"]');
      if (projectEl && !isExpandedRef.current) {
        isExpandedRef.current = true;
        cursorRef.current?.classList.add('expanded');
        labelRef.current?.classList.add('visible');
        return;
      }

      // Check for interactive cursor
      const interactiveEl = target.closest('a, button, [data-cursor="interactive"]');
      if (interactiveEl && !projectEl) {
        gsap.to(cursorRef.current, { scale: 1.5, duration: 0.3, ease: 'power2.out' });
      }
    };

    const onMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const projectEl = target.closest('[data-cursor="project"]');
      const relatedProject = (e.relatedTarget as HTMLElement)?.closest('[data-cursor="project"]');
      
      if (projectEl && !relatedProject && isExpandedRef.current) {
        isExpandedRef.current = false;
        cursorRef.current?.classList.remove('expanded');
        labelRef.current?.classList.remove('visible');
      }

      const interactiveEl = target.closest('a, button, [data-cursor="interactive"]');
      if (interactiveEl) {
        gsap.to(cursorRef.current, { scale: 1, duration: 0.3, ease: 'power2.out' });
      }
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.addEventListener('mouseout', onMouseOut, { passive: true });

    // Smooth follow via GSAP ticker
    const ticker = () => {
      if (!cursorRef.current) return;
      const cw = cursorRef.current.offsetWidth;
      const ch = cursorRef.current.offsetHeight;

      gsap.to(cursorRef.current, {
        x: posRef.current.x - cw / 2,
        y: posRef.current.y - ch / 2,
        duration: 0.12,
        ease: 'power2.out',
        overwrite: 'auto',
      });

      if (labelRef.current) {
        gsap.to(labelRef.current, {
          x: posRef.current.x - 15,
          y: posRef.current.y - 8,
          duration: 0.18,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }
    };

    gsap.ticker.add(ticker);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
      gsap.ticker.remove(ticker);
      document.body.style.cursor = '';
    };
  }, [isDesktop]);

  if (!isDesktop) return null;

  return (
    <>
      <div ref={cursorRef} className="custom-cursor" aria-hidden="true" />
      <div ref={labelRef} className="custom-cursor-label" aria-hidden="true">
        {t('cursor.view')}
      </div>
    </>
  );
}
