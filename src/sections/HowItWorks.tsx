import { useEffect, useRef } from 'react';
import { Pencil, Brain, SlidersHorizontal, Globe } from 'lucide-react';

const STEPS = [
  {
    num: '01',
    icon: Pencil,
    title: 'Describe',
    description: 'Tell us about your business, audience, and style preferences in plain language.',
  },
  {
    num: '02',
    icon: Brain,
    title: 'AI Analyzes',
    description: 'Our AI identifies your industry, brand tone, color palette, and optimal website structure.',
  },
  {
    num: '03',
    icon: SlidersHorizontal,
    title: 'Edit & Match',
    description: 'Customize your site in the visual editor and explore AI-matched background music.',
  },
  {
    num: '04',
    icon: Globe,
    title: 'Launch',
    description: 'Preview the complete experience, then publish or export your website code.',
  },
];

export default function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const steps = entry.target.querySelectorAll('.step-item');
            const lines = entry.target.querySelectorAll('.step-line');
            steps.forEach((step, i) => {
              setTimeout(() => {
                (step as HTMLElement).style.opacity = '1';
                (step as HTMLElement).style.transform = 'translateY(0)';
              }, i * 150);
            });
            lines.forEach((line, i) => {
              setTimeout(() => {
                (line as HTMLElement).style.transform = 'scaleX(1)';
              }, 300 + i * 150);
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
      id="how-it-works"
      className="relative py-24 px-4 sm:px-6 lg:px-10"
      style={{ background: 'var(--canvas-base)', zIndex: 1 }}
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-tertiary)' }}
          >
            HOW IT WORKS
          </span>
          <h2
            className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Four steps to your perfect site
          </h2>
        </div>

        {/* Steps Flow */}
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-4">
          {STEPS.map((step, index) => {
            const Icon = step.icon;
            const isLast = index === STEPS.length - 1;

            return (
              <div key={step.num} className="flex md:flex-col items-center gap-4 md:gap-0 flex-1">
                {/* Step Item */}
                <div className="flex md:flex-col items-center gap-4 md:text-center flex-1 w-full">
                  {/* Number Circle */}
                  <div
                    className="step-item w-12 h-12 rounded-full flex items-center justify-center text-white text-lg font-bold flex-shrink-0 opacity-0 translate-y-8 transition-all duration-600"
                    style={{
                      background: 'var(--accent)',
                      transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
                    }}
                  >
                    {parseInt(step.num)}
                  </div>

                  {/* Content */}
                  <div className="md:mt-5">
                    <div className="flex items-center md:justify-center gap-2 mb-1">
                      <Icon size={16} style={{ color: 'var(--accent)' }} />
                      <h3
                        className="text-lg font-semibold"
                        style={{ color: 'var(--text-primary)' }}
                      >
                        {step.title}
                      </h3>
                    </div>
                    <p
                      className="text-sm max-w-[200px]"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {step.description}
                    </p>
                  </div>
                </div>

                {/* Connector Line - horizontal on desktop */}
                {!isLast && (
                  <div
                    className="step-line hidden md:block w-full h-px mt-6 origin-left transition-transform duration-700"
                    style={{
                      background: 'var(--border-color)',
                      transform: 'scaleX(0)',
                    }}
                  />
                )}

                {/* Connector Line - vertical on mobile */}
                {!isLast && (
                  <div
                    className="md:hidden w-px h-8 ml-6 transition-all duration-500"
                    style={{
                      background: 'var(--border-color)',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
