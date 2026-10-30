'use client';

import { useLanguage } from '@/hooks/useLanguage';
import { Language } from '@/i18n/translations';

const LANGUAGES: { code: Language; label: string }[] = [
  { code: 'en', label: 'EN' },
  { code: 'ru', label: 'RU' },
  { code: 'uz', label: 'UZ' },
];

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage();

  return (
    <div 
      className="inline-flex items-center gap-1 p-1 rounded-full bg-[#12141a]/90 border border-white/10 backdrop-blur-md shadow-lg"
      role="radiogroup" 
      aria-label="Language selection"
    >
      {LANGUAGES.map((lang) => {
        const isActive = language === lang.code;
        return (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`px-3 py-1 text-[11px] font-mono tracking-wider uppercase transition-all duration-300 rounded-full select-none cursor-pointer ${
              isActive
                ? 'bg-gradient-to-r from-[var(--color-accent-violet)] to-[var(--color-accent-blue)] text-white font-bold shadow-md shadow-purple-500/20'
                : 'text-white/60 hover:text-white hover:bg-white/5'
            }`}
            role="radio"
            aria-checked={isActive}
            aria-label={lang.label}
          >
            {lang.label}
          </button>
        );
      })}
    </div>
  );
}
