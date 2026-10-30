'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from '@/hooks/useLanguage';

export default function Footer() {
  const { t } = useLanguage();
  const [year, setYear] = useState('');

  useEffect(() => {
    setYear(String(new Date().getFullYear()));
  }, []);

  return (
    <footer className="py-10 px-6 md:px-10 lg:px-16 border-t border-[var(--color-border)] bg-[#07080a]">
      <div className="max-w-[1400px] mx-auto w-full flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="accent-dot" />
          <p className="text-label text-white/80">{t('footer.credit')}</p>
        </div>
        <div className="flex items-center gap-6 font-mono text-[11px] text-white/40">
          <span>TASHKENT // UTC+5</span>
          {year && <span>{year} EDITION</span>}
        </div>
      </div>
    </footer>
  );
}
