import { useState, useEffect, useRef } from 'react';

interface Template {
  name: string;
  description: string;
  image: string;
  tags: string[];
  category: string;
}

const CATEGORIES = ['All', 'Coffee & Food', 'Creative', 'Tech', 'Services', 'Health'];

const TEMPLATES: Template[] = [
  {
    name: 'Lumière Café',
    description: 'A warm, inviting coffee shop website',
    image: '/images/template-lumiere-cafe.jpg',
    tags: ['Food', 'Cozy'],
    category: 'Coffee & Food',
  },
  {
    name: 'Frame Studio',
    description: 'Photography portfolio with dramatic layouts',
    image: '/images/template-frame-studio.jpg',
    tags: ['Creative', 'Portfolio'],
    category: 'Creative',
  },
  {
    name: 'Nexa Labs',
    description: 'Clean tech startup landing page',
    image: '/images/template-nexa-labs.jpg',
    tags: ['Tech', 'SaaS'],
    category: 'Tech',
  },
  {
    name: 'Zenith Fitness',
    description: 'Energetic gym and wellness site',
    image: '/images/template-zenith-fitness.jpg',
    tags: ['Health', 'Energy'],
    category: 'Health',
  },
  {
    name: 'Atelier',
    description: 'Elegant design studio showcase',
    image: '/images/template-atelier.jpg',
    tags: ['Creative', 'Studio'],
    category: 'Creative',
  },
  {
    name: 'Bistro Moderne',
    description: 'Sophisticated restaurant experience',
    image: '/images/template-bistro-moderne.jpg',
    tags: ['Food', 'Fine Dining'],
    category: 'Coffee & Food',
  },
];

export default function Templates() {
  const [activeCategory, setActiveCategory] = useState('All');
  const sectionRef = useRef<HTMLDivElement>(null);

  const filtered =
    activeCategory === 'All'
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.template-card');
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
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [activeCategory]);

  return (
    <section
      ref={sectionRef}
      id="templates"
      className="relative py-24 px-4 sm:px-6 lg:px-10"
      style={{
        background: 'linear-gradient(to bottom, var(--canvas-base) 80%, #EDEAE4 100%)',
        zIndex: 1,
      }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-8">
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--text-tertiary)' }}
          >
            TEMPLATES
          </span>
          <h2
            className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold"
            style={{ color: 'var(--text-primary)' }}
          >
            Start with a foundation
          </h2>
          <p
            className="mt-2 text-base max-w-lg mx-auto"
            style={{ color: 'var(--text-secondary)' }}
          >
            Browse industry-specific templates, or let AI generate something unique.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className="px-5 py-2 rounded-full text-sm font-medium cursor-pointer transition-all duration-200 border"
              style={{
                background:
                  activeCategory === cat
                    ? 'var(--text-primary)'
                    : 'rgba(255,255,255,0.6)',
                color: activeCategory === cat ? 'white' : 'var(--text-secondary)',
                borderColor:
                  activeCategory === cat
                    ? 'var(--text-primary)'
                    : 'rgba(26,43,60,0.06)',
              }}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Template Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((template) => (
            <div
              key={template.name}
              className="template-card card-elevated overflow-hidden cursor-pointer opacity-0 translate-y-12 transition-all duration-700"
              style={{
                transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)',
              }}
            >
              {/* Preview */}
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={template.image}
                  alt={template.name}
                  className="w-full h-full object-cover transition-transform duration-400 hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="p-5">
                <h3
                  className="text-base font-semibold"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {template.name}
                </h3>
                <p
                  className="mt-1 text-sm"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {template.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-3">
                  {template.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-0.5 rounded-md text-xs font-medium"
                      style={{
                        background: 'var(--accent-light)',
                        color: 'var(--accent)',
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View All */}
        <div className="text-center mt-10">
          <button className="btn-ghost">View All Templates</button>
        </div>
      </div>
    </section>
  );
}
