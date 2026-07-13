import { useEffect, useRef, useState } from 'react';
import { Sparkles, Layers, Target, Lightbulb, Music, TrendingUp, Headphones, Volume2 } from 'lucide-react';

const STATS = [
  { icon: Sparkles, value: '', label: 'Enhance immersive browsing', labelZh: '增强沉浸式浏览', desc: 'Sites with matched background music create a deeper, more engaging visitor experience that keeps users connected to your brand.', descZh: '匹配背景音乐的网站创造更深、更具吸引力的访问体验，让用户与品牌产生更深连接。' },
  { icon: Layers, value: '', label: 'Strengthen brand expression', labelZh: '强化品牌表达', desc: 'Sound completes your visual identity. Music becomes an integral part of how visitors perceive and remember your brand story.', descZh: '声音完善您的视觉识别。音乐成为访问者感知和记忆品牌故事的不可分割部分。' },
  { icon: Target, value: '', label: 'Support data-driven optimization', labelZh: '支持数据驱动优化', desc: 'AI continuously learns from brand-music pairing outcomes to refine recommendations and improve matching accuracy over time.', descZh: 'AI 持续从品牌-音乐配对结果中学习，不断优化推荐和提升匹配准确度。' },
  { icon: Lightbulb, value: '', label: 'Create a differentiated experience', labelZh: '创造差异化体验', desc: 'Stand out from the thousands of generic AI-built sites. Music makes your brand instantly memorable and emotionally resonant.', descZh: '从数千个通用 AI 网站中脱颖而出。音乐让您的品牌即刻令人难忘且产生情感共鸣。' },
];

const HOW_IT_WORKS = [
  { icon: TrendingUp, title: 'AI Analyzes Your Brand', titleZh: 'AI 分析您的品牌', text: 'Our AI reads your industry, colors, typography, and content tone to understand your brand\'s emotional profile.', textZh: '我们的 AI 读取您的行业、颜色、排版和内容调性，以理解品牌的情感画像。' },
  { icon: Headphones, title: 'Matches the Soundscape', titleZh: '匹配音景', text: 'Based on the analysis, AI recommends music genres and specific tracks that amplify your brand message.', textZh: '基于分析，AI 推荐放大品牌信息的音乐风格和具体曲目。' },
  { icon: Volume2, title: 'Integrated Experience', titleZh: '整合体验', text: 'The music becomes part of your brand guide. Preview, adjust, and export the complete sensory experience.', textZh: '音乐成为品牌指南的一部分。预览、调整并导出完整的感官体验。' },
];

export default function WhyMusic() {
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
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--music-accent)' }}>
              声音的科学
            </span>
          </div>
          <h2 className="text-[clamp(1.5rem,3.5vw,2.5rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
            为什么您的网站需要 AI 音乐匹配
          </h2>
          <p className="mt-3 text-base max-w-2xl mx-auto" style={{ color: 'var(--text-secondary)' }}>
            音乐不是背景噪音 — 它是战略性品牌工具。正确的配乐会改变访问者感知和记忆您品牌的方式。
          </p>
        </div>

        {/* Stats Grid - 定性描述 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-16">
          {STATS.map((s, i) => {
            const I = s.icon;
            return (
              <div key={s.label} className={`card-elevated p-6 text-center transition-all duration-600 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`} style={{ transitionDelay: `${i * 100}ms` }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mx-auto" style={{ background: 'var(--accent-light)' }}>
                  <I size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <p className="mt-4 text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{s.labelZh}</p>
                <p className="mt-2 text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{s.descZh}</p>
              </div>
            );
          })}
        </div>

        {/* How it works sub-section */}
        <div className={`liquid-glass rounded-3xl p-8 sm:p-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
          <h3 className="text-center text-xl font-bold mb-8" style={{ color: 'var(--text-primary)' }}>AutoMatch 如何将声音与设计配对</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {HOW_IT_WORKS.map((h, i) => {
              const I = h.icon;
              return (
                <div key={h.title} className="text-center">
                  <div className="w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4" style={{ background: i === 0 ? 'var(--accent-light)' : i === 1 ? 'var(--music-accent-light)' : 'rgba(26,43,60,0.04)' }}>
                    <I size={24} style={{ color: i === 0 ? 'var(--accent)' : i === 1 ? 'var(--music-accent)' : 'var(--text-secondary)' }} />
                  </div>
                  <h4 className="text-sm font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{h.titleZh}</h4>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{h.textZh}</p>
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
                <div><p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}> Artisan Coffee Brand</p><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>暖色调、有机纹理</p></div>
              </div>
              <div className="flex-1 flex items-center justify-center gap-2">
                <div className="h-px flex-1 max-w-16" style={{ background: 'var(--border-color)' }} />
                <span className="text-xs font-medium px-3 py-1 rounded-full" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>AI 匹配</span>
                <div className="h-px flex-1 max-w-16" style={{ background: 'var(--border-color)' }} />
              </div>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--music-accent-light)' }}><Music size={16} style={{ color: 'var(--music-accent)' }} /></div>
                <div><p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>Acoustic Jazz</p><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>温暖、亲密、有机</p></div>
              </div>
            </div>
            <p className="mt-3 text-xs text-center italic" style={{ color: 'var(--text-tertiary)' }}>
              推荐理由：温暖棕色的自然纹理唤起舒适与匠心。原声爵士的有机温暖与手工品牌体验相呼应。
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
