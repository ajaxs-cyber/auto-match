import { useState, useEffect, useRef } from 'react';
import { Search, Heart, Eye, ArrowRight, X } from 'lucide-react';
import { DEFAULT_TEMPLATES, CATEGORIES } from '@/data/templates';
import type { Template } from '@/types';

interface Props {
  onUseTemplate: (templateId: string) => void;
}

export default function Templates({ onUseTemplate }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const filtered = DEFAULT_TEMPLATES.filter(t => {
    const matchCat = activeCategory === 'All' || t.category === activeCategory;
    const matchSearch = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.description.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

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
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [activeCategory, search]);

  return (
    <>
      <section ref={sectionRef} id="templates" className="relative py-24 px-4 sm:px-6 lg:px-10" style={{ background: 'linear-gradient(to bottom, var(--canvas-base) 80%, #EDEAE4 100%)', zIndex: 1 }}>
        <div className="max-w-[1200px] mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>TEMPLATES</span>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>Start with a foundation</h2>
            <p className="mt-2 text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>Browse industry-specific templates, or let AI generate something unique.</p>
          </div>

          {/* Search + Filter */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 max-w-2xl mx-auto">
            <div className="flex-1 w-full relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
              <input
                type="text"
                value={search}
                onChange={e => setSearch(e.target.value)}
                placeholder="Search templates..."
                className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm border outline-none transition-all focus:ring-2"
                style={{ background: 'white', borderColor: 'var(--border-color)', color: 'var(--text-primary)', '--tw-ring-color': 'rgba(232,93,76,0.2)' } as React.CSSProperties}
              />
              {search && (
                <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}>
                  <X size={14} />
                </button>
              )}
            </div>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all border"
                style={{ background: activeCategory === cat ? 'var(--text-primary)' : 'rgba(255,255,255,0.6)', color: activeCategory === cat ? 'white' : 'var(--text-secondary)', borderColor: activeCategory === cat ? 'var(--text-primary)' : 'rgba(26,43,60,0.06)' }}>
                {cat}
              </button>
            ))}
          </div>

          {/* Results count */}
          <p className="text-xs text-center mb-4" style={{ color: 'var(--text-tertiary)' }}>{filtered.length} template{filtered.length !== 1 ? 's' : ''} found</p>

          {/* Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(tpl => (
              <div
                key={tpl.id}
                className="template-card card-elevated overflow-hidden opacity-0 translate-y-12 transition-all duration-700 relative group"
                style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
                onMouseEnter={() => setHoveredId(tpl.id)}
                onMouseLeave={() => setHoveredId(null)}
              >
                {/* Preview */}
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  {/* Hover overlay */}
                  <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity duration-300 ${hoveredId === tpl.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button onClick={() => setPreviewTemplate(tpl)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border-none cursor-pointer hover:bg-white/30 transition-colors" title="Preview">
                      <Eye size={18} />
                    </button>
                    <button onClick={() => onUseTemplate(tpl.id)} className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all" style={{ background: 'var(--accent)', color: 'white' }}>
                      Use Template
                    </button>
                  </div>
                  {/* Favorite */}
                  <button onClick={() => toggleFavorite(tpl.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-none cursor-pointer hover:bg-white/30 transition-colors z-10"
                    style={{ color: favorites.has(tpl.id) ? 'var(--accent)' : 'white' }}>
                    <Heart size={16} fill={favorites.has(tpl.id) ? 'var(--accent)' : 'none'} />
                  </button>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{tpl.name}</h3>
                      <p className="mt-0.5 text-xs" style={{ color: 'var(--text-secondary)' }}>{tpl.description}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tpl.tags.map(tag => (
                      <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{tag}</span>
                    ))}
                  </div>
                  <button onClick={() => onUseTemplate(tpl.id)} className="w-full mt-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all border hover:bg-[var(--text-primary)] hover:text-white hover:border-[var(--text-primary)]"
                    style={{ background: 'transparent', borderColor: 'rgba(26,43,60,0.15)', color: 'var(--text-primary)' }}>
                    Use This Template
                  </button>
                </div>
              </div>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-16" style={{ color: 'var(--text-tertiary)' }}>
              <Search size={40} className="mx-auto mb-3 opacity-30" />
              <p className="text-sm font-medium">No templates found</p>
              <p className="text-xs mt-1">Try adjusting your search or category</p>
            </div>
          )}
        </div>
      </section>

      {/* Preview Modal */}
      {previewTemplate && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" style={{ background: 'rgba(26,43,60,0.7)', backdropFilter: 'blur(8px)' }} onClick={() => setPreviewTemplate(null)}>
          <div className="w-full max-w-[900px] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div>
                <h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{previewTemplate.name}</h3>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{previewTemplate.description}</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={() => { onUseTemplate(previewTemplate.id); setPreviewTemplate(null); }} className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2">
                  Use Template <ArrowRight size={14} />
                </button>
                <button onClick={() => setPreviewTemplate(null)} className="p-2 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}>
                  <X size={18} />
                </button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6" style={{ background: '#F0EEEA' }}>
              <div className="max-w-full mx-auto rounded-xl overflow-hidden shadow-lg" style={{ background: previewTemplate.colors.background }}>
                <div className="aspect-video relative">
                  <img src={previewTemplate.image} alt={previewTemplate.name} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8">
                    <div>
                      <h2 className="text-white text-2xl font-bold">{previewTemplate.name}</h2>
                      <p className="text-white/70 text-sm mt-1">{previewTemplate.category} &middot; {previewTemplate.tags.join(', ')}</p>
                    </div>
                  </div>
                </div>
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Color Palette</h4>
                      <div className="flex gap-2">
                        {Object.entries(previewTemplate.colors).map(([key, color]) => (
                          <div key={key} className="text-center">
                            <div className="w-10 h-10 rounded-full border-2 mx-auto" style={{ background: color, borderColor: 'rgba(0,0,0,0.1)' }} />
                            <span className="text-xs mt-1 block capitalize" style={{ color: 'var(--text-tertiary)' }}>{key}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Typography</h4>
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}><strong>Heading:</strong> {previewTemplate.fonts.heading}</p>
                      <p className="text-sm" style={{ color: 'var(--text-primary)' }}><strong>Body:</strong> {previewTemplate.fonts.body}</p>
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Pages ({previewTemplate.pages.length})</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewTemplate.pages.map(page => (
                        <span key={page.id} className="px-3 py-1.5 rounded-lg text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                          {page.name} {page.isHome && '(Home)'}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="mt-6">
                    <h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Modules ({previewTemplate.pages[0]?.modules.length ?? 0})</h4>
                    <div className="flex flex-wrap gap-2">
                      {previewTemplate.pages[0]?.modules.map(mod => (
                        <span key={mod.id} className="px-2 py-1 rounded text-xs" style={{ background: 'rgba(26,43,60,0.05)', color: 'var(--text-secondary)' }}>
                          {mod.name}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
