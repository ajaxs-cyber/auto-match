import { useEffect, useRef } from 'react';
import { Sparkles, Music, Paintbrush, Rocket } from 'lucide-react';

const FEATURES = [
  {
    icon: Sparkles,
    title: 'AI-Powered Generation',
    description:
      'Describe your business in natural language. Our AI analyzes your needs and generates a complete website structure with matching colors and layout.',
  },
  {
    icon: Music,
    title: 'Smart Music Matching',
    description:
      'Our system recommends background music based on your industry, brand tone, and target audience. Choose from curated tracks or let AI surprise you.',
  },
  {
    icon: Paintbrush,
    title: 'Visual Editor',
    description:
      'Fine-tune every detail — colors, fonts, spacing, images — with our intuitive three-panel editor. No coding required, full creative control.',
  },
  {
    icon: Rocket,
    title: 'One-Click Publish',
    description:
      'Preview your complete website with music, then export clean code, deploy to your domain, or publish to our hosting in seconds.',
  },
];

export default function Features() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.feature-card');
            cards.forEach((card, i) => {
              setTimeout(() => {
                (card as HTMLElement).style.opacity = '1';
                (card as HTMLElement).style.transform = 'translateY(0)';
              }, i * 100);
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative py-24 px-4 sm:px-6 lg:px-10"
      style={{ background: 'var(--canvas-base)', zIndex: 1 }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-tertiary)' }}
          >
            WHY AUTOMATCH
          </span>
          <h2
            className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Everything you need to launch
          </h2>
          <p
            className="mt-2 text-base max-w-lg mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            From idea to live website — with music that fits your brand.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature) => {
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className="feature-card card-elevated p-8 opacity-0 translate-y-10 transition-all duration-600"
                style={{
                  transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ background: 'var(--accent-light)' }}
                >
                  <Icon size={24} style={{ color: 'var(--accent)' }} />
                </div>
                <h3
                  className="mt-5 text-lg font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {feature.title}
                </h3>
                <p
                  className="mt-2 text-sm leading-relaxed"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
