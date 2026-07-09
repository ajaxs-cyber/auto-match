import { useEffect, useRef, useState } from 'react';
import { Check } from 'lucide-react';

interface Plan {
  name: string;
  price: number;
  period: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const PLANS: Plan[] = [
  {
    name: 'Starter',
    price: 0,
    period: '/mo',
    description: 'For experimenting and learning',
    features: [
      'AI generation (3/mo)',
      '10 templates',
      'Basic editor',
      'Watermarked preview',
    ],
    cta: 'Start Free',
  },
  {
    name: 'Pro',
    price: 12,
    period: '/mo',
    description: 'For creators ready to launch',
    features: [
      'Unlimited AI generation',
      'All templates',
      'Full editor',
      'Music matching',
      'Custom domain',
      'No watermark',
    ],
    cta: 'Start Pro Trial',
    highlighted: true,
  },
  {
    name: 'Enterprise',
    price: 29,
    period: '/mo',
    description: 'For teams and agencies',
    features: [
      'Everything in Pro',
      'Team collaboration',
      'Priority support',
      'API access',
      'White-label export',
    ],
    cta: 'Contact Sales',
  },
];

export default function Pricing() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isYearly, setIsYearly] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.pricing-card');
            const order = [1, 0, 2]; // Center first, then left, then right
            order.forEach((idx, i) => {
              setTimeout(() => {
                const card = cards[idx] as HTMLElement;
                if (card) {
                  card.style.opacity = '1';
                  card.style.transform = 'translateY(0)';
                }
              }, i * 150);
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

  const getPrice = (basePrice: number) => {
    if (basePrice === 0) return 0;
    return isYearly ? Math.round(basePrice * 0.8) : basePrice;
  };

  return (
    <section
      ref={sectionRef}
      id="pricing"
      className="relative py-24 px-4 sm:px-6 lg:px-10"
      style={{ background: 'var(--canvas-base)', zIndex: 1 }}
    >
      <div className="max-w-[1000px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-6">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-tertiary)' }}
          >
            PRICING
          </span>
          <h2
            className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Simple, transparent pricing
          </h2>
          <p
            className="mt-2 text-base"
            style={{ color: 'var(--text-secondary)' }}
          >
            Start free. Upgrade when you're ready to launch.
          </p>
        </div>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-4 mb-10">
          <span
            className={`text-sm font-medium transition-colors ${
              !isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
            }`}
          >
            Monthly
          </span>
          <button
            onClick={() => setIsYearly(!isYearly)}
            className="relative w-12 h-6 rounded-full cursor-pointer border-none transition-colors duration-200"
            style={{ background: isYearly ? 'var(--accent)' : 'var(--text-tertiary)' }}
          >
            <div
              className="absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
              style={{ left: '2px', transform: isYearly ? 'translateX(24px)' : 'translateX(0)' }}
            />
          </button>
          <span
            className={`text-sm font-medium transition-colors ${
              isYearly ? 'text-[var(--text-primary)]' : 'text-[var(--text-tertiary)]'
            }`}
          >
            Yearly
          </span>
          {isYearly && (
            <span
              className="px-2 py-0.5 rounded-full text-xs font-medium"
              style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}
            >
              Save 20%
            </span>
          )}
        </div>

        {/* Pricing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={`pricing-card relative p-8 sm:p-10 rounded-2xl opacity-0 translate-y-10 transition-all duration-600 ${
                plan.highlighted
                  ? 'border-2 md:-mt-4 md:mb-4'
                  : 'border'
              }`}
              style={{
                background: 'white',
                borderColor: plan.highlighted ? 'var(--accent)' : 'rgba(26,43,60,0.08)',
                boxShadow: plan.highlighted ? 'var(--shadow-xl)' : 'var(--shadow-sm)',
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Most Popular Badge */}
              {plan.highlighted && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider text-white"
                  style={{ background: 'var(--accent)' }}
                >
                  Most Popular
                </div>
              )}

              {/* Plan Name */}
              <h3
                className="text-xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                {plan.name}
              </h3>

              {/* Price */}
              <div className="mt-3 flex items-baseline gap-1">
                <span
                  className="text-4xl font-bold"
                  style={{ color: 'var(--accent)' }}
                >
                  ${getPrice(plan.price)}
                </span>
                <span
                  className="text-sm"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {plan.period}
                </span>
              </div>

              {/* Description */}
              <p
                className="mt-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                {plan.description}
              </p>

              {/* Divider */}
              <div
                className="my-6 h-px"
                style={{ background: 'var(--border-color)' }}
              />

              {/* Features */}
              <ul className="space-y-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check
                      size={16}
                      style={{ color: 'var(--success)', flexShrink: 0 }}
                    />
                    <span
                      className="text-sm"
                      style={{ color: 'var(--text-secondary)' }}
                    >
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <button
                className={`w-full mt-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-widest cursor-pointer transition-all duration-200 border ${
                  plan.highlighted
                    ? 'text-white hover:shadow-lg hover:-translate-y-0.5'
                    : 'bg-transparent hover:text-white'
                }`}
                style={{
                  background: plan.highlighted ? 'var(--accent)' : 'transparent',
                  borderColor: plan.highlighted ? 'var(--accent)' : 'var(--text-primary)',
                  color: plan.highlighted ? 'white' : 'var(--text-primary)',
                }}
                onMouseEnter={(e) => {
                  if (!plan.highlighted) {
                    e.currentTarget.style.background = 'var(--text-primary)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!plan.highlighted) {
                    e.currentTarget.style.background = 'transparent';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
