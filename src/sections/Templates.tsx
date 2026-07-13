import { useState, useEffect, useRef } from 'react';
import { Search, Heart, Eye, ArrowRight, X, Music } from 'lucide-react';
import { DEFAULT_TEMPLATES, CATEGORIES } from '@/data/templates';
import { getGenreLabel, getGenreColor } from '@/data/music';
import type { Template } from '@/types';

interface Props { onUseTemplate: (templateId: string) => void; }

export default function Templates({ onUseTemplate }: Props) {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);

  const toggleFav = (id: string) => setFavorites(p => { const n = new Set(p); n.has(id) ? n.delete(id) : n.add(id); return n; });
  const filtered = DEFAULT_TEMPLATES.filter(t => {
    const mc = activeCategory === 'All' || t.category === activeCategory;
    const ms = !search || t.name.toLowerCase().includes(search.toLowerCase()) || t.tags.some(tg => tg.toLowerCase().includes(search.toLowerCase()));
    return mc && ms;
  });

  useEffect(() => {
    const o = new IntersectionObserver((entries) => { entries.forEach(e => { if (e.isIntersecting) { e.target.querySelectorAll('.template-card').forEach((c, i) => setTimeout(() => { (c as HTMLElement).style.opacity = '1'; (c as HTMLElement).style.transform = 'translateY(0)'; }, i * 100)); o.unobserve(e.target); } }); }, { threshold: 0.1 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, [activeCategory, search]);

  return (
    <>
      <section ref={sectionRef} id="templates" className="relative py-24 px-4 sm:px-6 lg:px-10" style={{ background: 'linear-gradient(to bottom, var(--canvas-base) 80%, #EDEAE4 100%)', zIndex: 1 }}>
        <div className="max-w-[1200px] mx-auto">
          <div className="text-center mb-8">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>TEMPLATES</span>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>Every template comes with a soundtrack</h2>
            <p className="mt-2 text-base max-w-lg mx-auto" style={{ color: 'var(--text-secondary)' }}>Each template includes an AI-recommended music genre that matches its visual style and industry.</p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6 max-w-2xl mx-auto">
            <div className="flex-1 w-full relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
              <input type="text" value={search} onChange={e => setSearch(e.target.value)} placeholder="Search templates..." className="w-full pl-9 pr-4 py-2.5 rounded-full text-sm border outline-none focus:ring-2" style={{ background: 'white', borderColor: 'var(--border-color)', color: 'var(--text-primary)', '--tw-ring-color': 'rgba(232,93,76,0.2)' } as React.CSSProperties} />
              {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 rounded-full bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}><X size={14} /></button>}
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
            {CATEGORIES.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)} className="px-4 py-2 rounded-full text-sm font-medium cursor-pointer transition-all border" style={{ background: activeCategory === cat ? 'var(--text-primary)' : 'rgba(255,255,255,0.6)', color: activeCategory === cat ? 'white' : 'var(--text-secondary)', borderColor: activeCategory === cat ? 'var(--text-primary)' : 'rgba(26,43,60,0.06)' }}>{cat}</button>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map(tpl => (
              <div key={tpl.id} className="template-card card-elevated overflow-hidden opacity-0 translate-y-12 transition-all duration-700 relative group" style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} onMouseEnter={() => setHoveredId(tpl.id)} onMouseLeave={() => setHoveredId(null)}>
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={tpl.image} alt={tpl.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className={`absolute inset-0 bg-black/50 flex items-center justify-center gap-3 transition-opacity duration-300 ${hoveredId === tpl.id ? 'opacity-100' : 'opacity-0'}`}>
                    <button onClick={() => setPreviewTemplate(tpl)} className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white border-none cursor-pointer hover:bg-white/30 transition-colors" title="Preview"><Eye size={18} /></button>
                    <button onClick={() => onUseTemplate(tpl.id)} className="px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer" style={{ background: 'var(--accent)', color: 'white' }}>Use Template</button>
                  </div>
                  <button onClick={() => toggleFav(tpl.id)} className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center border-none cursor-pointer hover:bg-white/30 transition-colors z-10" style={{ color: favorites.has(tpl.id) ? 'var(--accent)' : 'white' }}>
                    <Heart size={16} fill={favorites.has(tpl.id) ? 'var(--accent)' : 'none'} />
                  </button>
                  {/* Music genre badge */}
                  <div className="absolute bottom-3 left-3 flex items-center gap-1.5 px-2.5 py-1 rounded-full backdrop-blur-sm" style={{ background: 'rgba(0,0,0,0.5)' }}>
                    <Music size={10} style={{ color: getGenreColor(tpl.recommendedGenre) }} />
                    <span className="text-[10px] font-medium text-white">{getGenreLabel(tpl.recommendedGenre)}</span>
                  </div>
                </div>
                <div className="p-5">
                  <h3 className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{tpl.name}</h3>
                  <p className="mt-0.5 text-xs" style={{ color: 'var(--text-secondary)' }}>{tpl.description}</p>
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {tpl.tags.map(tag => <span key={tag} className="px-2 py-0.5 rounded text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{tag}</span>)}
                  </div>
                  <button onClick={() => onUseTemplate(tpl.id)} className="w-full mt-4 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all border hover:bg-[var(--text-primary)] hover:text-white" style={{ background: 'transparent', borderColor: 'rgba(26,43,60,0.15)', color: 'var(--text-primary)' }}>Use This Template</button>
                </div>
              </div>
            ))}
          </div>
          {filtered.length === 0 && <div className="text-center py-16" style={{ color: 'var(--text-tertiary)' }}><Search size={40} className="mx-auto mb-3 opacity-30" /><p className="text-sm font-medium">No templates found</p></div>}
        </div>
      </section>

      {previewTemplate && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center p-4" style={{ background: 'rgba(26,43,60,0.7)', backdropFilter: 'blur(8px)' }} onClick={() => setPreviewTemplate(null)}>
          <div className="w-full max-w-[900px] max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
              <div><h3 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{previewTemplate.name}</h3><p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{previewTemplate.description}</p></div>
              <div className="flex items-center gap-2">
                <button onClick={() => { onUseTemplate(previewTemplate.id); setPreviewTemplate(null); }} className="btn-primary text-xs py-2.5 px-5 flex items-center gap-2">Use Template <ArrowRight size={14} /></button>
                <button onClick={() => setPreviewTemplate(null)} className="p-2 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}><X size={18} /></button>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-6" style={{ background: '#F0EEEA' }}>
              <div className="rounded-xl overflow-hidden shadow-lg" style={{ background: previewTemplate.colors.background }}>
                <div className="aspect-video relative"><img src={previewTemplate.image} alt="" className="w-full h-full object-cover" /><div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-8"><div><h2 className="text-white text-2xl font-bold">{previewTemplate.name}</h2><p className="text-white/70 text-sm">{previewTemplate.category} &middot; {previewTemplate.tags.join(', ')}</p></div></div></div>
                <div className="p-8">
                  <div className="grid grid-cols-2 gap-6">
                    <div><h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Color Palette</h4><div className="flex gap-2">{Object.entries(previewTemplate.colors).map(([k, c]) => <div key={k} className="text-center"><div className="w-10 h-10 rounded-full border-2 mx-auto" style={{ background: c as string, borderColor: 'rgba(0,0,0,0.1)' }} /><span className="text-xs mt-1 block capitalize" style={{ color: 'var(--text-tertiary)' }}>{k}</span></div>)}</div></div>
                    <div><h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>AI Music Match</h4><div className="flex items-center gap-2 p-2 rounded-lg" style={{ background: getGenreColor(previewTemplate.recommendedGenre) + '15' }}><Music size={14} style={{ color: getGenreColor(previewTemplate.recommendedGenre) }} /><div><p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{getGenreLabel(previewTemplate.recommendedGenre)}</p><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{previewTemplate.musicReason}</p></div></div></div>
                  </div>
                  <div className="mt-6"><h4 className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Modules ({previewTemplate.pages[0]?.modules.length ?? 0})</h4><div className="flex flex-wrap gap-2">{previewTemplate.pages[0]?.modules.map(m => <span key={m.id} className="px-2 py-1 rounded text-xs" style={{ background: 'rgba(26,43,60,0.05)', color: 'var(--text-secondary)' }}>{m.name}</span>)}</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
