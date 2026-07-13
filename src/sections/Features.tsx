import { useEffect, useRef } from 'react';
import { Sparkles, Music, Paintbrush, Rocket } from 'lucide-react';

const FEATURES = [
  { icon: Sparkles, title: 'AI Dual-Engine Design', description: 'Our AI analyzes your brand and generates both a stunning visual layout AND a perfectly matched audio identity. No other builder does both.', highlight: true },
  { icon: Music, title: 'Brand Soundscape Matching', description: 'Music is selected based on your industry, color palette, and emotional mood. Warm coffee shops get acoustic jazz. Tech startups get electronic ambient.', highlight: true },
  { icon: Paintbrush, title: 'Visual Website Builder', description: 'Full WYSIWYG editor with element-level control. Click any text to edit inline. Drag to reorder. Adjust layouts, colors, spacing, and typography freely.', highlight: false },
  { icon: Rocket, title: 'Complete Experience Export', description: 'Export your full website with integrated audio design. Get clean HTML, CSS, and a brand soundtrack guide. One platform, complete sensory experience.', highlight: false },
];

export default function Features() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const o = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.feature-card').forEach((c, i) => setTimeout(() => { (c as HTMLElement).style.opacity = '1'; (c as HTMLElement).style.transform = 'translateY(0)'; }, i * 100)); o.unobserve(e.target); } }); }, { threshold: 0.2 });
    if (ref.current) o.observe(ref.current);
    return () => o.disconnect();
  }, []);

  return (
    <section ref={ref} id="features" className="relative py-24 px-4 sm:px-6 lg:px-10" style={{ background: 'var(--canvas-base)', zIndex: 1 }}>
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>WHY AUTOMATCH</span>
          <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>Not just a website. A complete brand experience.</h2>
          <p className="mt-2 text-base max-w-xl mx-auto" style={{ color: 'var(--text-secondary)' }}>While other AI builders stop at visuals, AutoMatch creates multi-sensory brand experiences that visitors remember.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {FEATURES.map(f => {
            const I = f.icon;
            return (
              <div key={f.title} className="feature-card card-elevated p-8 opacity-0 translate-y-10 transition-all duration-600" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)', borderColor: f.highlight ? 'var(--accent)' : undefined, borderWidth: f.highlight ? '2px' : undefined }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center" style={{ background: f.highlight ? 'var(--accent-light)' : 'rgba(26,43,60,0.04)' }}>
                  <I size={24} style={{ color: f.highlight ? 'var(--accent)' : 'var(--text-secondary)' }} />
                </div>
                <h3 className="mt-5 text-lg font-semibold" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
