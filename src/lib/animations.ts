import gsap from 'gsap';

// Premium easing curves
export const EASE = {
  smooth: 'power3.out',
  smoothInOut: 'power3.inOut',
  cinematic: 'power4.out',
  cinematicInOut: 'power4.inOut',
  expo: 'expo.out',
  expoInOut: 'expo.inOut',
  elastic: 'elastic.out(1, 0.5)',
  back: 'back.out(1.7)',
} as const;

// Standard durations
export const DURATION = {
  fast: 0.3,
  normal: 0.6,
  slow: 0.9,
  cinematic: 1.2,
  hero: 1.5,
} as const;

// Stagger presets
export const STAGGER = {
  fast: 0.05,
  normal: 0.08,
  slow: 0.12,
  text: 0.03,
} as const;

// Split text animation helper
export function animateTextReveal(
  elements: Element | Element[] | NodeListOf<Element>,
  options?: {
    duration?: number;
    stagger?: number;
    ease?: string;
    delay?: number;
    y?: number;
  }
) {
  const { duration = DURATION.slow, stagger = STAGGER.normal, ease = EASE.cinematic, delay = 0, y = 60 } = options || {};

  return gsap.fromTo(
    elements,
    { y, opacity: 0, willChange: 'transform, opacity' },
    { y: 0, opacity: 1, duration, stagger, ease, delay }
  );
}

// Fade in animation
export function animateFadeIn(
  elements: Element | Element[] | NodeListOf<Element>,
  options?: {
    duration?: number;
    delay?: number;
    y?: number;
  }
) {
  const { duration = DURATION.normal, delay = 0, y = 30 } = options || {};

  return gsap.fromTo(
    elements,
    { opacity: 0, y, willChange: 'transform, opacity' },
    { opacity: 1, y: 0, duration, ease: EASE.smooth, delay }
  );
}

// Image reveal with mask
export function animateImageReveal(
  container: Element,
  options?: {
    duration?: number;
    delay?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
  }
) {
  const { duration = DURATION.cinematic, delay = 0, direction = 'up' } = options || {};

  const clipPaths: Record<string, { from: string; to: string }> = {
    up: { from: 'inset(100% 0% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    down: { from: 'inset(0% 0% 100% 0%)', to: 'inset(0% 0% 0% 0%)' },
    left: { from: 'inset(0% 100% 0% 0%)', to: 'inset(0% 0% 0% 0%)' },
    right: { from: 'inset(0% 0% 0% 100%)', to: 'inset(0% 0% 0% 0%)' },
  };

  const { from, to } = clipPaths[direction];

  return gsap.fromTo(
    container,
    { clipPath: from, willChange: 'clip-path' },
    { clipPath: to, duration, ease: EASE.cinematicInOut, delay }
  );
}

// Scale reveal
export function animateScaleIn(
  elements: Element | Element[],
  options?: {
    duration?: number;
    delay?: number;
    scale?: number;
  }
) {
  const { duration = DURATION.slow, delay = 0, scale = 0.9 } = options || {};

  return gsap.fromTo(
    elements,
    { scale, opacity: 0, willChange: 'transform, opacity' },
    { scale: 1, opacity: 1, duration, ease: EASE.smooth, delay }
  );
}

// Line expand
export function animateLineExpand(
  element: Element,
  options?: {
    duration?: number;
    delay?: number;
  }
) {
  const { duration = DURATION.cinematic, delay = 0 } = options || {};

  return gsap.fromTo(
    element,
    { scaleX: 0, transformOrigin: 'left center', willChange: 'transform' },
    { scaleX: 1, duration, ease: EASE.cinematicInOut, delay }
  );
}
