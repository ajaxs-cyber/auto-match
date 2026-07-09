import { useEffect, useRef } from 'react';
import { MessageSquare, Brain, Palette, Globe } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const STEPS = [
  { num: '01', icon: MessageSquare, titleKey: 'how.step1.title', descKey: 'how.step1.desc' },
  { num: '02', icon: Brain, titleKey: 'how.step2.title', descKey: 'how.step2.desc' },
  { num: '03', icon: Palette, titleKey: 'how.step3.title', descKey: 'how.step3.desc' },
  { num: '04', icon: Globe, titleKey: 'how.step4.title', descKey: 'how.step4.desc' },
];

export default function HowItWorks() {
  const { lang, __ } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.step-item').forEach((s, i) => setTimeout(() => { (s as HTMLElement).style.opacity = '1'; (s as HTMLElement).style.transform = 'translateY(0)'; }, i * 150)); o.unobserve(e.target); } }); }, { threshold: 0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-10" style={{ background: 'var(--canvas-base)', zIndex: 1 }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{__('how.label')}</span>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>{__('how.title')}</h2>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-4">
          {STEPS.map((step, index) => {
            const I = step.icon;
            const isLast = index === STEPS.length - 1;
            return (
              <div key={step.num} className="flex md:flex-col items-start gap-4 md:gap-0 flex-1 w-full">
                <div className="flex items-center gap-4 md:flex-col md:items-center md:text-center w-full">
                  <div className="step-item flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold opacity-0 translate-y-8 transition-all duration-600" style={{ background: index < 3 ? 'var(--accent)' : 'var(--text-primary)', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <I size={18} />
                  </div>
                  <div className="step-item md:mt-5 opacity-0 translate-y-8 transition-all duration-600 flex-1" style={{ transitionDelay: '100ms' }}>
                    <span className="text-xs font-bold" style={{ color: 'var(--text-tertiary)' }}>{step.num}</span>
                    <h3 className="text-base font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>{__(step.titleKey)}</h3>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{__(step.descKey)}</p>
                  </div>
                </div>
                {!isLast && <div className="hidden md:block w-full h-px mt-6 origin-left" style={{ background: 'var(--border-color)' }} />}
                {!isLast && <div className="md:hidden w-px h-8 ml-6" style={{ background: 'var(--border-color)' }} />}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
