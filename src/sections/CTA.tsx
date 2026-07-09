import { useEffect, useRef, useState } from 'react';
import { useLang } from '@/i18n/LanguageContext';

interface Props {
  onStart: () => void;
}

export default function CTA({ onStart }: Props) {
  const { lang, __ } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
        });
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-4 sm:px-6 lg:px-10" style={{ zIndex: 1 }}>
      <div className={`liquid-glass max-w-[640px] mx-auto rounded-3xl p-12 sm:p-14 text-center transition-all duration-600 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
        <h2 className="text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
          {__('cta.title')}
        </h2>
        <p className="mt-3 text-base" style={{ color: 'var(--text-secondary)' }}>
          {__('cta.subtitle')}
        </p>
        <button onClick={onStart} className="btn-primary mt-8 py-4 px-9" style={{ animation: 'pulse-glow 3s ease-in-out infinite' }}>
          {__('cta.button')}
        </button>
        <p className="mt-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('cta.note')}</p>
      </div>
    </section>
  );
}
