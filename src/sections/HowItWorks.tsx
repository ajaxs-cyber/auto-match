import { useEffect, useRef } from 'react';
import { MessageSquare, Brain, Palette, Sliders, Globe, Music } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';

export default function HowItWorks() {
  const { lang, t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const o = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.step-item').forEach((s, i) => setTimeout(() => { (s as HTMLElement).style.opacity = '1'; (s as HTMLElement).style.transform = 'translateY(0)'; }, i * 150)); o.unobserve(e.target); } }); }, { threshold: 0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  const steps = [
    {
      num: '01', icon: MessageSquare,
      title: lang === 'zh' ? '描述您的品牌' : 'Describe Your Brand',
      desc: lang === 'zh' ? '告诉我们您的业务、受众和您想营造的氛围。如果您有风格偏好，也可以一并说明。' : 'Tell us about your business, audience, and the vibe you want to create. Include style preferences if you have them.'
    },
    {
      num: '02', icon: Brain,
      title: lang === 'zh' ? 'AI 全面分析' : 'AI Analyzes Everything',
      desc: lang === 'zh' ? '我们的 AI 识别您的行业、视觉风格偏好、色彩心理学，以及 — 独特的 — 品牌情感画像。' : 'Our AI identifies your industry, visual style preferences, color psychology, and — uniquely — your brand\'s emotional mood profile.'
    },
    {
      num: '03', icon: Music,
      title: lang === 'zh' ? 'AI 匹配音乐' : 'AI Matches Music',
      desc: lang === 'zh' ? '基于品牌画像，AI 从我们的精选库中推荐 3-5 首匹配的背景音乐，并附详细的推荐理由。' : 'Based on your brand profile, AI recommends 3-5 matching background tracks from our curated library with detailed reasoning.'
    },
    {
      num: '04', icon: Palette,
      title: lang === 'zh' ? '设计网站 + 音景' : 'Design Site + Soundscape',
      desc: lang === 'zh' ? 'AI 生成您的网站结构、视觉设计、配色方案、字体，以及附带理由的精选品牌音景。' : 'AI generates your website structure, visual design, color palette, typography AND a curated brand soundtrack.'
    },
    {
      num: '05', icon: Sliders,
      title: lang === 'zh' ? '可视化 + 可听化编辑' : 'Edit Visually + Audibly',
      desc: lang === 'zh' ? '在我们的 WYSIWYG 编辑器中微调每个设计细节，同时播放品牌音乐。实时看到和听到您的品牌呈现。' : 'Fine-tune every design detail in our WYSIWYG editor while your brand music plays. See and hear your brand come together.'
    },
    {
      num: '06', icon: Globe,
      title: lang === 'zh' ? '发布体验' : 'Launch the Experience',
      desc: lang === 'zh' ? '导出包含集成音频设计指南的完整网站。部署一个在每个层面都吸引访问者的品牌体验。' : 'Export your complete website with integrated audio design guide. Deploy a brand experience that engages visitors on every level.'
    },
  ];

  return (
    <section ref={ref} id="how-it-works" className="relative py-24 px-4 sm:px-6 lg:px-10" style={{ background: 'var(--canvas-base)', zIndex: 1 }}>
      <div className="max-w-[1000px] mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{t('hiw.eyebrow', 'HOW IT WORKS')}</span>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
            {lang === 'zh' ? '6 步完成品牌体验' : 'Brand experience in 6 steps'}
          </h2>
          <p className="mt-2 text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'zh' ? '每一步都包含视觉设计和音频身份决策。' : 'Every step includes both visual design and audio identity decisions.'}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => {
            const I = step.icon;
            return (
              <div key={step.num} className="step-item opacity-0 translate-y-8 transition-all duration-600 p-6 rounded-2xl" style={{ background: 'white', border: '1px solid var(--border-color)', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center text-white" style={{ background: index === 2 ? 'var(--music-accent)' : 'var(--accent)' }}>
                    <I size={18} />
                  </div>
                  <span className="text-xs font-bold" style={{ color: 'var(--text-tertiary)' }}>{step.num}</span>
                </div>
                <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-xs mt-2 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            );
          })}
        </div>

        {/* Visual Flow */}
        <div className="mt-12 p-6 rounded-2xl" style={{ background: 'rgba(123,97,255,0.04)', border: '1px solid rgba(123,97,255,0.12)' }}>
          <p className="text-xs font-semibold uppercase tracking-wider text-center mb-4" style={{ color: 'var(--music-accent)' }}>
            {lang === 'zh' ? '完整流程可视化' : 'Complete Workflow'}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {[
              lang === 'zh' ? '描述业务' : 'Describe',
              lang === 'zh' ? 'AI 分析' : 'AI Analyze',
              lang === 'zh' ? '音乐匹配' : 'Music Match',
              lang === 'zh' ? '网站设计' : 'Site Design',
              lang === 'zh' ? '实时试听' : 'Live Preview',
              lang === 'zh' ? '一键发布' : 'Launch'
            ].map((label, i) => (
              <div key={label} className="flex items-center gap-2">
                <span className="px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: i === 2 ? 'var(--music-accent-light)' : 'var(--accent-light)', color: i === 2 ? 'var(--music-accent)' : 'var(--accent)' }}>
                  {label}
                </span>
                {i < 5 && <span style={{ color: 'var(--text-tertiary)' }}>&rarr;</span>}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
