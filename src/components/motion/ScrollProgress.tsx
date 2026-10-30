'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;
    
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(barRef.current, { scaleX: self.progress });
      },
    });

    return () => trigger.kill();
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[2px] z-[9998]">
      <div
        ref={barRef}
        className="h-full origin-left"
        style={{
          background: 'linear-gradient(90deg, var(--color-accent-violet), var(--color-accent-blue))',
          transform: 'scaleX(0)',
        }}
      />
    </div>
  );
}
