import { useEffect, useRef } from 'react';
import { MessageSquare, Brain, Palette, Sliders, Globe } from 'lucide-react';

const STEPS = [
  { num: '01', icon: MessageSquare, title: 'Describe Your Brand', description: 'Tell us about your business, audience, and the vibe you want to create. Include style preferences if you have them.' },
  { num: '02', icon: Brain, title: 'AI Analyzes Everything', description: 'Our AI identifies your industry, visual style preferences, color psychology, and — uniquely — your brand\'s emotional mood profile.' },
  { num: '03', icon: Palette, title: 'Brand Experience Design', description: 'AI generates your website structure, visual design, color palette, typography AND a curated brand soundtrack with reasoning for each choice.' },
  { num: '04', icon: Sliders, title: 'Edit Visually + Audibly', description: 'Fine-tune every design detail in our WYSIWYG editor while your brand music plays. See and hear your brand come together in real time.' },
  { num: '05', icon: Globe, title: 'Launch the Experience', description: 'Export your complete website with integrated audio design guide. Deploy a brand experience that engages visitors on every level.' },
];

export default function HowItWorks() {
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
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>HOW IT WORKS</span>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>From idea to brand experience in 5 steps</h2>
          <p className="mt-2 text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>Every step includes both visual design and audio identity decisions.</p>
        </div>

        <div className="flex flex-col md:flex-row items-start gap-6 md:gap-4">
          {STEPS.map((step, index) => {
            const I = step.icon;
            const isLast = index === STEPS.length - 1;
            return (
              <div key={step.num} className="flex md:flex-col items-start gap-4 md:gap-0 flex-1 w-full">
                <div className="flex items-center gap-4 md:flex-col md:items-center md:text-center w-full">
                  <div className="step-item flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold opacity-0 translate-y-8 transition-all duration-600" style={{ background: index < 3 ? 'var(--accent)' : index === 3 ? 'var(--music-accent)' : 'var(--text-primary)', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}>
                    <I size={18} />
                  </div>
                  <div className="step-item md:mt-5 opacity-0 translate-y-8 transition-all duration-600 flex-1" style={{ transitionDelay: '100ms' }}>
                    <span className="text-xs font-bold" style={{ color: 'var(--text-tertiary)' }}>{step.num}</span>
                    <h3 className="text-base font-semibold mt-0.5" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.description}</p>
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
