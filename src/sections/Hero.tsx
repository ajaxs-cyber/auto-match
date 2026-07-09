import { useState, useEffect, useRef } from 'react';
import { Sparkles, Check } from 'lucide-react';

interface HeroProps {
  onGenerate: (prompt: string) => void;
}

const SUGGESTIONS = [
  'Coffee Shop',
  'Photography Portfolio',
  'Tech Startup',
  'Restaurant',
  'Fitness Studio',
];

export default function Hero({ onGenerate }: HeroProps) {
  const [prompt, setPrompt] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 300);
    return () => clearTimeout(timer);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim()) {
      onGenerate(prompt.trim());
    }
  };

  const handleSuggestion = (suggestion: string) => {
    const fullPrompt = `Create a ${suggestion.toLowerCase()} website`;
    setPrompt(fullPrompt);
    onGenerate(fullPrompt);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6"
      style={{ zIndex: 1 }}
    >
      <div
        className={`liquid-glass w-full max-w-[720px] rounded-3xl p-10 sm:p-14 text-center transition-all duration-800 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}
        style={{ transitionDuration: '800ms', transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
      >
        {/* Badge */}
        <div
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6 transition-all duration-500 ${
            isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-90'
          }`}
          style={{
            background: 'var(--accent-light)',
            transitionDelay: '200ms',
            transitionDuration: '500ms',
          }}
        >
          <Sparkles size={14} style={{ color: 'var(--accent)' }} />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: 'var(--accent)' }}
          >
            AI-Powered Website Builder
          </span>
        </div>

        {/* Headline */}
        <h1
          className={`font-display text-[clamp(1.75rem,4vw,2.75rem)] leading-tight transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{
            color: 'var(--text-primary)',
            transitionDelay: '300ms',
            transitionDuration: '600ms',
          }}
        >
          Describe your business. We'll build the site — and find the perfect soundtrack.
        </h1>

        {/* Subheadline */}
        <p
          className={`mt-4 text-base max-w-[480px] mx-auto transition-all duration-600 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'
          }`}
          style={{
            color: 'var(--text-secondary)',
            transitionDelay: '400ms',
            transitionDuration: '600ms',
          }}
        >
          AutoMatch uses AI to generate complete websites from your description, then matches background music to your brand's mood and industry.
        </p>

        {/* AI Input */}
        <form
          onSubmit={handleSubmit}
          className={`mt-8 transition-all duration-500 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
          style={{
            transitionDelay: '500ms',
            transitionDuration: '500ms',
          }}
        >
          <div
            className="liquid-glass rounded-2xl p-2 flex items-center gap-2 focus-within:ring-2 transition-shadow duration-200"
            style={{ '--tw-ring-color': 'rgba(232, 93, 76, 0.2)' } as React.CSSProperties}
          >
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="A cozy coffee shop website with warm tones..."
              className="flex-1 bg-transparent border-none outline-none px-4 py-3 text-sm sm:text-base placeholder:text-[var(--text-tertiary)]"
              style={{ color: 'var(--text-primary)' }}
            />
            <button
              type="submit"
              className="btn-primary py-3 px-6 flex items-center gap-2 whitespace-nowrap"
            >
              <Sparkles size={16} />
              Generate
            </button>
          </div>
        </form>

        {/* Suggestions */}
        <div
          className={`mt-4 flex flex-wrap items-center justify-center gap-2 transition-all duration-400 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
          }`}
          style={{
            transitionDelay: '600ms',
            transitionDuration: '400ms',
          }}
        >
          {SUGGESTIONS.map((suggestion, i) => (
            <button
              key={suggestion}
              onClick={() => handleSuggestion(suggestion)}
              className="px-4 py-1.5 rounded-full text-xs font-medium cursor-pointer transition-all duration-200 border hover:scale-105"
              style={{
                background: 'rgba(255,255,255,0.4)',
                borderColor: 'rgba(26,43,60,0.08)',
                color: 'var(--text-secondary)',
                transitionDelay: `${600 + i * 50}ms`,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white';
                e.currentTarget.style.borderColor = 'var(--accent-light)';
                e.currentTarget.style.color = 'var(--accent)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255,255,255,0.4)';
                e.currentTarget.style.borderColor = 'rgba(26,43,60,0.08)';
                e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {suggestion}
            </button>
          ))}
        </div>

        {/* Trust bar */}
        <div
          className={`mt-8 pt-5 border-t flex items-center justify-between transition-all duration-500 ${
            isVisible ? 'opacity-100' : 'opacity-0'
          }`}
          style={{
            borderColor: 'rgba(26,43,60,0.08)',
            transitionDelay: '700ms',
          }}
        >
          <div className="flex items-center gap-2">
            <Check size={14} style={{ color: 'var(--success)' }} />
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              No credit card required
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Check size={14} style={{ color: 'var(--success)' }} />
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Free to start
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
