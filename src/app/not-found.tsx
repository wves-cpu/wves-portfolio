import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--color-bg-primary)] text-[var(--color-text-primary)]">
      <p className="text-label mb-4">404</p>
      <h1
        className="text-4xl md:text-6xl font-bold tracking-tight mb-6"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        Page not found.
      </h1>
      <p className="text-body mb-10">The page you're looking for doesn't exist.</p>
      <Link
        href="/"
        className="magnetic-btn"
      >
        Back to Home
      </Link>
    </div>
  );
}
