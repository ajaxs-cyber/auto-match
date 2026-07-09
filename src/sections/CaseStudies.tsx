import { useEffect, useRef, useState } from 'react';
import { ArrowRight, Play, Pause, TrendingUp, Users, Clock, Music } from 'lucide-react';
import { CASE_STUDIES } from '@/data/music';
import { useLang } from '@/i18n/LanguageContext';

export default function CaseStudies() {
  const { lang, __ } = useLang();
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeCase, setActiveCase] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentCase = CASE_STUDIES[activeCase];

  return (
    <section
      ref={sectionRef}
      id="cases"
      className="relative py-24 px-4 sm:px-6 lg:px-10"
      style={{ zIndex: 1 }}
    >
      <div className="max-w-[1100px] mx-auto">
        {/* Header */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
            {__('cases.label')}
          </span>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
            {__('cases.title')}
          </h2>
          <p className="mt-4 text-base leading-relaxed max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {__('cases.subtitle')}
          </p>
        </div>

        {/* Case Navigation */}
        <div className={`flex flex-wrap justify-center gap-2 mb-10 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          {CASE_STUDIES.map((cs, i) => (
            <button
              key={cs.id}
              onClick={() => { setActiveCase(i); setIsPlaying(false); }}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer border-none ${
                activeCase === i
                  ? 'text-white'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
              style={{
                background: activeCase === i ? 'var(--accent)' : 'rgba(26,43,60,0.06)',
              }}
            >
              {lang === 'zh' ? cs.industryZh : cs.industry}
            </button>
          ))}
        </div>

        {/* Active Case Display */}
        <div className={`transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
          <div className="liquid-glass rounded-3xl overflow-hidden">
            <div className="grid lg:grid-cols-2">
              {/* Left: Website Preview & Music */}
              <div className="relative p-8 flex flex-col justify-center" style={{ background: currentCase.colorPalette.background }}>
                <div className="rounded-2xl overflow-hidden shadow-lg mb-6">
                  <img
                    src={currentCase.websiteImage}
                    alt={currentCase.brandName}
                    className="w-full aspect-[4/3] object-cover"
                  />
                </div>

                {/* Music Player Card */}
                <div className="p-4 rounded-xl" style={{ background: 'rgba(255,255,255,0.8)', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <div className="flex items-center gap-3">
                    <div className="relative flex-shrink-0">
                      <img src={currentCase.coverImage} alt={currentCase.musicTitle} className="w-14 h-14 rounded-lg object-cover" />
                      <button
                        onClick={() => setIsPlaying(!isPlaying)}
                        className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-lg hover:bg-black/50 transition-colors border-none cursor-pointer"
                      >
                        {isPlaying ? <Pause size={18} className="text-white" /> : <Play size={18} className="text-white ml-0.5" />}
                      </button>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{currentCase.musicTitle}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{currentCase.musicArtist}</p>
                      <span className="inline-block mt-1 px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>
                        {currentCase.musicGenre}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right: Analysis */}
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-6">
                  <h3 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{currentCase.brandName}</h3>
                  <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>
                    {lang === 'zh' ? currentCase.descriptionZh : currentCase.description}
                  </p>
                </div>

                {/* Mood Profile Mini */}
                <div className="mb-6">
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                    {__('cases.moodProfile')}
                  </p>
                  <div className="grid grid-cols-5 gap-2">
                    {[
                      { key: 'warmth', label: __('analysis.mood.warmth'), val: currentCase.moodProfile.warmth },
                      { key: 'energy', label: __('analysis.mood.energy'), val: currentCase.moodProfile.energy },
                      { key: 'professionalism', label: __('analysis.mood.professional'), val: currentCase.moodProfile.professionalism },
                      { key: 'creativity', label: __('analysis.mood.creative'), val: currentCase.moodProfile.creativity },
                      { key: 'sophistication', label: __('analysis.mood.sophisticated'), val: currentCase.moodProfile.sophistication },
                    ].map(d => (
                      <div key={d.key} className="text-center">
                        <div className="relative w-12 h-12 mx-auto mb-1">
                          <svg className="w-12 h-12 -rotate-90" viewBox="0 0 48 48">
                            <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(26,43,60,0.08)" strokeWidth="4" />
                            <circle
                              cx="24" cy="24" r="20" fill="none"
                              stroke={d.val > 70 ? 'var(--accent)' : d.val > 50 ? 'var(--music-accent)' : 'var(--text-tertiary)'}
                              strokeWidth="4"
                              strokeDasharray={`${(d.val / 100) * 125.6} 125.6`}
                              strokeLinecap="round"
                            />
                          </svg>
                          <span className="absolute inset-0 flex items-center justify-center text-xs font-bold" style={{ color: 'var(--text-primary)' }}>{d.val}</span>
                        </div>
                        <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{d.label}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Reasoning */}
                <div className="p-4 rounded-xl mb-6" style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.12)' }}>
                  <div className="flex items-center gap-2 mb-2">
                    <Music size={14} style={{ color: 'var(--music-accent)' }} />
                    <span className="text-xs font-semibold" style={{ color: 'var(--music-accent)' }}>
                      {__('cases.why')}
                    </span>
                  </div>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                    {lang === 'zh' ? currentCase.reasoningZh : currentCase.reasoning}
                  </p>
                </div>

                {/* Metrics */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                    {__('cases.impact')}
                  </p>
                  <div className="grid grid-cols-3 gap-3">
                    {currentCase.metrics.map(m => (
                      <div key={m.label} className="p-3 rounded-xl text-center" style={{ background: 'var(--accent-light)' }}>
                        <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{m.value}</p>
                        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
