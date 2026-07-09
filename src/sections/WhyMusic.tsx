import { useEffect, useRef, useState } from 'react';
import { Clock, Brain, Sparkles, Users, Music, TrendingUp, Headphones, Volume2 } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

const STATS = [
  { icon: Clock, value: '40%', labelKey: 'why.stat1.label', descKey: 'why.stat1.desc' },
  { icon: Brain, value: '3x', labelKey: 'why.stat2.label', descKey: 'why.stat2.desc' },
  { icon: Sparkles, value: 'Complete', labelKey: 'why.stat3.label', descKey: 'why.stat3.desc' },
  { icon: Users, value: 'Unique', labelKey: 'why.stat4.label', descKey: 'why.stat4.desc' },
];

const HOW_IT_WORKS = [
  { icon: TrendingUp, titleKey: 'why.how1.title', textKey: 'why.how1.text' },
  { icon: Headphones, titleKey: 'why.how2.title', textKey: 'why.how2.text' },
  { icon: Volume2, titleKey: 'why.how3.title', textKey: 'why.how3.text' },
];

export default function WhyMusic() {
  const { lang, __ } = useLang();
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { setIsVisible(true); o.unobserve(e.target); } }); }, { threshold: 0.15 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} id="why-music" className="relative py-24 px-4 sm:px-6 lg:px-10" style={{ background: 'linear-gradient(180deg, var(--canvas-base) 0%, #EDEAE4 50%, var(--canvas-base) 100%)', zIndex: 1 }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Header */}
        <div className={`text-center mb-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5" style={{ background: 'var(--music-accent-light)' }}>
            <Music size={14} style={{ color: 'var(--music-accent)' }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--music-accent)' }}>{__('why.label')}</span>
          </div>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
            {__('why.title')}
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {__('why.subtitle')}
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {STATS.map((s, i) => {
            const I = s.icon;
            return (
              <div key={s.labelKey} className={`card-elevated p-6 text-center transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto" style={{ background: 'var(--accent-light)' }}>
                  <I size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <p className="mt-4 text-2xl font-bold" style={{ color: 'var(--accent)' }}>{s.value}</p>
                <p className="mt-1 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{__(s.labelKey)}</p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{__(s.descKey)}</p>
              </div>
            );
          })}
        </div>

        {/* How it works sub-section */}
        <div className={`liquid-glass rounded-3xl p-8 sm:p-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
          <h3 className="text-center text-xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>{__('why.howTitle')}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((h, i) => {
              const I = h.icon;
              return (
                <div key={h.titleKey} className="text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: i === 0 ? 'var(--accent-light)' : i === 1 ? 'var(--music-accent-light)' : 'rgba(26,43,60,0.04)' }}>
                    <I size={24} style={{ color: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--music-accent)' : 'var(--text-secondary)' }} />
                  </div>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{__(h.titleKey)}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{__(h.textKey)}</p>
                  {i < 2 && <div className="hidden md:block absolute right-0 top-1/2 w-8 h-px" style={{ background: 'var(--border-color)' }} />}
                </div>
              );
            })}
          </div>

          {/* Example pairing */}
          <div className="mt-10 p-5 rounded-2xl" style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.15)' }}>
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: '#6B3A2A' }}><span className="text-white text-xs font-bold">C</span></div>
                <div><p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{__('why.example.brand')}</p><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('why.example.brand.desc')}</p></div>
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                <div className="h-px flex-1 max-w-16" style={{ background: 'var(--border-color)' }} />
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{__('why.example.match')}</span>
                <div className="h-px flex-1 max-w-16" style={{ background: 'var(--border-color)' }} />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--music-accent-light)' }}><Music size={16} style={{ color: 'var(--music-accent)' }} /></div>
                <div><p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{__('why.example.sound')}</p><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('why.example.sound.desc')}</p></div>
              </div>
            </div>
            <p className="mt-3 text-xs text-center italic" style={{ color: 'var(--text-tertiary)' }}>
              {__('why.example.quote')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
