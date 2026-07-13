import { useState, useEffect } from 'react';
import { Sparkles, Check, Music } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

interface HeroProps { onGenerate: (prompt: string) => void; }

const SUGGESTIONS = [
  { label: 'Coffee Shop', labelZh: '咖啡店', music: 'Acoustic Jazz', musicZh: '原声爵士' },
  { label: 'Tech Startup', labelZh: '科技初创', music: 'Electronic Ambient', musicZh: '电子氛围' },
  { label: 'Fitness Studio', labelZh: '健身工作室', music: 'Energetic Beats', musicZh: '活力节拍' },
  { label: 'Photo Portfolio', labelZh: '摄影作品集', music: 'Lo-Fi Chill', musicZh: '轻音乐' },
  { label: 'Restaurant', labelZh: '餐厅', music: 'Smooth Jazz', musicZh: '爵士' },
];

export default function Hero({ onGenerate }: HeroProps) {
  const { lang, t } = useI18n();
  const [prompt, setPrompt] = useState('');
  const [visible, setVisible] = useState(false);

  useEffect(() => { const t = setTimeout(() => setVisible(true), 300); return () => clearTimeout(t); }, []);

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); if (prompt.trim()) onGenerate(prompt.trim()); };
  const handleSuggestion = (s: string) => { const p = `Create a ${s.toLowerCase()} website`; setPrompt(p); onGenerate(p); };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-4 sm:px-6" style={{ zIndex: 1 }}>
      <div className={`liquid-glass w-full max-w-[720px] rounded-3xl p-10 sm:p-14 text-center transition-all duration-800 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDuration: '800ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
        {/* Badge */}
        <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 transition-all duration-500 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`} style={{ background: 'var(--accent-light)', transitionDelay: '200ms' }}>
          <Music size={14} style={{ color: 'var(--accent)' }} />
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
            {t('hero.badge', 'AI Website Builder + Smart Music Matching')}
          </span>
        </div>

        {/* Headline */}
        <h1 className={`font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ color: 'var(--text-primary)', transitionDelay: '300ms' }}>
          {lang === 'zh' ? '描述您的业务。我们将建站 — 并找到完美配乐。' : 'Describe your business. We\'ll build the site — and find the perfect soundtrack.'}
        </h1>

        {/* Subheadline */}
        <p className={`mt-4 text-base max-w-[500px] mx-auto transition-all duration-600 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ color: 'var(--text-secondary)', transitionDelay: '400ms' }}>
          {lang === 'zh'
            ? <>AutoMatch 是唯一一个<strong style={{ color: 'var(--accent)' }}>既设计完整网站</strong>，又智能匹配品牌背景音乐的人工智能平台。视觉设计 + 音频识别 = 难忘的品牌体验。</>
            : <>AutoMatch is the only AI platform that designs your complete website <strong style={{ color: 'var(--accent)' }}>and</strong> intelligently matches background music to your brand. Visual design + audio identity = unforgettable brand experiences.</>
          }
        </p>

        {/* AI Input */}
        <form onSubmit={handleSubmit} className={`mt-8 transition-all duration-500 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`} style={{ transitionDelay: '500ms' }}>
          <div className="liquid-glass rounded-2xl p-2 flex items-center gap-2" style={{ '--tw-ring-color': 'rgba(232,93,76,0.2)' } as React.CSSProperties}>
            <input type="text" value={prompt} onChange={e => setPrompt(e.target.value)} placeholder={t('hero.placeholder', 'A cozy coffee shop with warm acoustic vibes...')} className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm sm:text-base placeholder:text-[var(--text-tertiary)]" style={{ color: 'var(--text-primary)' }} />
            <button type="submit" className="btn-primary py-3 px-6 flex items-center gap-2 whitespace-nowrap"><Sparkles size={16} /> {t('hero.generate', 'Generate')}</button>
          </div>
        </form>

        {/* Suggestions with music labels */}
        <div className={`mt-4 flex flex-wrap items-center justify-center gap-2 transition-all duration-400 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`} style={{ transitionDelay: '600ms' }}>
          {SUGGESTIONS.map((s) => (
            <button key={s.label} onClick={() => handleSuggestion(s.label)} className="group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all border hover:scale-105" style={{ background: 'rgba(255,255,255,0.4)', borderColor: 'rgba(26,43,60,0.08)', color: 'var(--text-secondary)' }}>
              {lang === 'zh' ? s.labelZh : s.label}
              <span className="text-[10px] opacity-0 group-hover:opacity-100 transition-opacity px-1.5 py-0.5 rounded-full" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>
                {lang === 'zh' ? s.musicZh : s.music}
              </span>
            </button>
          ))}
        </div>

        {/* Trust bar */}
        <div className={`mt-8 pt-5 border-t flex items-center justify-between transition-all duration-500 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ borderColor: 'rgba(26,43,60,0.08)', transitionDelay: '700ms' }}>
          <div className="flex items-center gap-2"><Check size={14} style={{ color: 'var(--success)' }} /><span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t('hero.noCard', 'No credit card required')}</span></div>
          <div className="flex items-center gap-2"><Check size={14} style={{ color: 'var(--success)' }} /><span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{lang === 'zh' ? 'AI 音乐 + 设计已包含' : 'AI Music + Design included'}</span></div>
        </div>
      </div>
    </section>
  );
}
