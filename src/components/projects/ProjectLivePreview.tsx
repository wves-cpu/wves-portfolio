'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { useLanguage } from '@/hooks/useLanguage';
import { X, Monitor, Smartphone, Maximize2, Minimize2, ExternalLink, Loader2 } from 'lucide-react';

interface ProjectLivePreviewProps {
  isOpen: boolean;
  onClose: () => void;
  projectName: string;
  previewUrl: string | null;
  liveUrl: string | null;
  allowEmbed: boolean;
  accentColor: string;
}

export default function ProjectLivePreview({
  isOpen,
  onClose,
  projectName,
  previewUrl,
  liveUrl,
  allowEmbed,
  accentColor,
}: ProjectLivePreviewProps) {
  const { t } = useLanguage();
  const overlayRef = useRef<HTMLDivElement>(null);
  const browserRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [viewMode, setViewMode] = useState<'desktop' | 'mobile'>('desktop');
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [embedFailed, setEmbedFailed] = useState(false);

  // Open animation
  useEffect(() => {
    if (!isOpen || !overlayRef.current || !browserRef.current) return;

    document.body.style.overflow = 'hidden';
    setIsLoading(true);
    setEmbedFailed(false);

    const tl = gsap.timeline();
    tl.fromTo(overlayRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 0.4, ease: 'power2.out' }
    )
    .fromTo(browserRef.current,
      { y: 60, opacity: 0, scale: 0.95 },
      { y: 0, opacity: 1, scale: 1, duration: 0.6, ease: 'power3.out' },
      '-=0.2'
    );

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Close handler with animation
  const handleClose = useCallback(() => {
    if (!overlayRef.current || !browserRef.current) {
      onClose();
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = '';
        onClose();
      },
    });

    tl.to(browserRef.current, {
      y: 40, opacity: 0, scale: 0.97, duration: 0.4, ease: 'power3.inOut',
    })
    .to(overlayRef.current, {
      opacity: 0, duration: 0.3, ease: 'power2.inOut',
    }, '-=0.2');
  }, [onClose]);

  // Escape key
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') handleClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, handleClose]);

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!browserRef.current) return;
    if (!isFullscreen) {
      browserRef.current.requestFullscreen?.();
    } else {
      document.exitFullscreen?.();
    }
    setIsFullscreen(!isFullscreen);
  }, [isFullscreen]);

  // iframe load handler
  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  // iframe error
  const handleIframeError = () => {
    setIsLoading(false);
    setEmbedFailed(true);
  };

  if (!isOpen) return null;

  const showIframe = allowEmbed && previewUrl && !embedFailed;
  const iframeWidth = viewMode === 'mobile' ? '375px' : '100%';

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8"
      style={{ background: 'rgba(0, 0, 0, 0.85)' }}
      onClick={(e) => {
        if (e.target === overlayRef.current) handleClose();
      }}
      role="dialog"
      aria-modal="true"
      aria-label={`${projectName} preview`}
    >
      <div
        ref={browserRef}
        className="w-full max-w-6xl h-[85vh] flex flex-col rounded-lg overflow-hidden border border-[var(--color-border)]"
        style={{ background: 'var(--color-bg-primary)' }}
      >
        {/* Browser Chrome */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]"
          style={{ background: 'var(--color-bg-secondary)' }}
        >
          {/* Traffic lights */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-[#FF5F57] hover:brightness-110 transition-all"
              aria-label={t('project.close')}
            />
            <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
            <div className="w-3 h-3 rounded-full bg-[#28C840]" />
          </div>

          {/* Address bar */}
          <div className="flex-1 mx-4 max-w-md">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-md text-xs"
              style={{ background: 'var(--color-bg-elevated)', color: 'var(--color-text-secondary)' }}
            >
              <div className="w-3 h-3 rounded-full border border-[var(--color-text-secondary)] opacity-30" />
              <span className="truncate font-mono text-[0.65rem]">
                {previewUrl || liveUrl || projectName}
              </span>
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-1">
            {/* View mode switcher */}
            <button
              onClick={() => setViewMode('desktop')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'desktop' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              aria-label={t('project.desktop')}
              title={t('project.desktop')}
            >
              <Monitor size={14} />
            </button>
            <button
              onClick={() => setViewMode('mobile')}
              className={`p-1.5 rounded transition-colors ${viewMode === 'mobile' ? 'text-[var(--color-text-primary)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'}`}
              aria-label={t('project.mobile')}
              title={t('project.mobile')}
            >
              <Smartphone size={14} />
            </button>

            <div className="w-[1px] h-4 bg-[var(--color-border)] mx-1" />

            {/* Fullscreen */}
            <button
              onClick={toggleFullscreen}
              className="p-1.5 rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
              aria-label={t('project.fullscreen')}
              title={t('project.fullscreen')}
            >
              {isFullscreen ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </button>

            {/* External link */}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p-1.5 rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors"
                aria-label={t('project.visitSite')}
                title={t('project.visitSite')}
              >
                <ExternalLink size={14} />
              </a>
            )}

            {/* Close */}
            <button
              onClick={handleClose}
              className="p-1.5 rounded text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] transition-colors ml-1"
              aria-label={t('project.close')}
            >
              <X size={14} />
            </button>
          </div>
        </div>

        {/* Content area */}
        <div className="flex-1 relative flex items-center justify-center overflow-hidden"
          style={{ background: viewMode === 'mobile' ? 'var(--color-bg-secondary)' : 'transparent' }}
        >
          {showIframe ? (
            <>
              {/* Loading state */}
              {isLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 z-10"
                  style={{ background: 'var(--color-bg-primary)' }}
                >
                  <Loader2 size={24} className="animate-spin" style={{ color: accentColor }} />
                  <span className="text-label">{t('project.loading')}</span>
                </div>
              )}

              {/* iframe */}
              <div
                className="h-full transition-all duration-500 ease-out"
                style={{
                  width: iframeWidth,
                  ...(viewMode === 'mobile' ? {
                    maxWidth: '375px',
                    margin: '0 auto',
                    borderLeft: '1px solid var(--color-border)',
                    borderRight: '1px solid var(--color-border)',
                  } : {}),
                }}
              >
                <iframe
                  ref={iframeRef}
                  src={previewUrl!}
                  className="w-full h-full border-0"
                  title={`${projectName} preview`}
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                  loading="lazy"
                />
              </div>
            </>
          ) : (
            /* Fallback when embed is not available */
            <div className="flex flex-col items-center justify-center gap-6 p-8 text-center">
              <div className="w-16 h-16 rounded-full border border-[var(--color-border)] flex items-center justify-center">
                <Monitor size={24} className="text-[var(--color-text-secondary)]" />
              </div>
              <p className="text-body max-w-sm">
                {t('project.previewUnavailable')}
              </p>
              {liveUrl && (
                <a
                  href={liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="preview-btn preview-btn-primary"
                >
                  <ExternalLink size={13} />
                  {t('project.visitSite')}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Bottom status bar */}
        <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--color-border)] text-[0.6rem]"
          style={{ background: 'var(--color-bg-secondary)', fontFamily: 'var(--font-mono)', color: 'var(--color-text-secondary)' }}
        >
          <span>{projectName}</span>
          <div className="flex items-center gap-3">
            <span>{viewMode === 'desktop' ? '1920 × 1080' : '375 × 812'}</span>
            <div className="w-1.5 h-1.5 rounded-full" style={{ background: isLoading ? '#FEBC2E' : '#28C840' }} />
          </div>
        </div>
      </div>
    </div>
  );
}
