import { useEffect, useState } from 'react';
import { Sparkles, Briefcase, Palette, Layout, Music, ArrowRight, Loader2 } from 'lucide-react';
import { getRecommendedTracks } from '@/data/music';
import type { MusicTrack } from '@/types';

interface Props {
  prompt: string;
  onClose: () => void;
  onOpenEditor: () => void;
  onSelectTemplate: (templateId: string) => void;
}

interface AnalysisResult {
  industry: string;
  style: string;
  colors: string[];
  structure: string[];
  music: MusicTrack[];
  templateId: string;
}

function simulateAnalysis(prompt: string): AnalysisResult {
  const p = prompt.toLowerCase();
  let industry = 'Business';
  let style = 'Modern, professional';
  let colors = ['#1A2B3C', '#5A6B7C', '#E85D4C', '#F5F3EE'];
  let structure = ['Hero', 'About', 'Services', 'Contact'];
  let templateId = 'tpl-tech-1';

  if (p.includes('coffee') || p.includes('cafe') || p.includes('caffè') || p.includes('espresso')) {
    industry = 'Coffee Shop & Café';
    style = 'Warm, cozy, artisanal';
    colors = ['#6B3A2A', '#D4A574', '#F5E6D3', '#3D2B1F'];
    structure = ['Hero', 'About', 'Menu', 'Gallery', 'Contact'];
    templateId = 'tpl-cafe-1';
  } else if (p.includes('photo') || p.includes('portfolio') || p.includes('creative') || p.includes('design') || p.includes('art')) {
    industry = 'Creative Studio';
    style = 'Minimal, dramatic, artistic';
    colors = ['#1A1A1A', '#F5F5F5', '#E85D4C', '#8B8B8B'];
    structure = ['Hero', 'Portfolio', 'About', 'Services', 'Contact'];
    templateId = 'tpl-photo-1';
  } else if (p.includes('tech') || p.includes('startup') || p.includes('saas') || p.includes('app') || p.includes('software')) {
    industry = 'Tech Startup';
    style = 'Clean, futuristic, innovative';
    colors = ['#0E243C', '#3B82F6', '#10B981', '#F8FAFC'];
    structure = ['Hero', 'Features', 'Pricing', 'FAQ', 'Contact'];
    templateId = 'tpl-tech-1';
  } else if (p.includes('fitness') || p.includes('gym') || p.includes('health') || p.includes('yoga') || p.includes('wellness')) {
    industry = 'Fitness & Wellness';
    style = 'Energetic, vibrant, motivating';
    colors = ['#1A2E1A', '#4ADE80', '#FEF08A', '#FFFFFF'];
    structure = ['Hero', 'Classes', 'Trainers', 'Membership', 'Contact'];
    templateId = 'tpl-fitness-1';
  } else if (p.includes('restaurant') || p.includes('food') || p.includes('dining') || p.includes('bistro')) {
    industry = 'Fine Dining';
    style = 'Sophisticated, luxurious, elegant';
    colors = ['#1C0F0A', '#C8A97E', '#0D0806', '#F5E6D3'];
    structure = ['Hero', 'Menu', 'Reservations', 'About', 'Contact'];
    templateId = 'tpl-restaurant-1';
  }

  const tracks = getRecommendedTracks(industry);
  return { industry, style, colors, structure, music: tracks, templateId };
}

export default function AnalysisModal({ prompt, onClose, onOpenEditor: _onOpenEditor, onSelectTemplate }: Props) {
  const [phase, setPhase] = useState<'analyzing' | 'results'>('analyzing');
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setResult(simulateAnalysis(prompt));
      setPhase('results');
    }, 2000);
    return () => clearTimeout(timer);
  }, [prompt]);

  const handleUseTemplate = () => {
    if (result) {
      onSelectTemplate(result.templateId);
    }
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'rgba(26,43,60,0.6)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div className={`w-full max-w-[560px] max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl transition-all duration-400 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} onClick={e => e.stopPropagation()}>
        {phase === 'analyzing' ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--accent-light)' }}>
              <Loader2 size={32} style={{ color: 'var(--accent)' }} className="animate-spin" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>Analyzing your request...</h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Our AI is studying your description to build the perfect website</p>
            <div className="mt-8 max-w-xs mx-auto h-1.5 rounded-full overflow-hidden" style={{ background: 'var(--accent-light)' }}>
              <div className="h-full rounded-full animate-pulse" style={{ background: 'linear-gradient(90deg, var(--accent), var(--music-accent))', width: '70%' }} />
            </div>
            <p className="mt-3 text-xs" style={{ color: 'var(--text-tertiary)' }}>Identifying industry, style, colors, and structure...</p>
          </div>
        ) : result ? (
          <>
            <div className="p-8 pb-4">
              <div className="text-center">
                <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--accent-light)' }}>
                  <Sparkles size={28} style={{ color: 'var(--accent)' }} />
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Analysis Complete</h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Our AI analyzed your description and generated a personalized plan.</p>
              </div>

              <div className="mt-6 space-y-3">
                {/* Industry */}
                <div className="card-surface p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                    <Briefcase size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Industry</span>
                    <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{result.industry}</p>
                  </div>
                </div>

                {/* Style */}
                <div className="card-surface p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                    <Palette size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Visual Style</span>
                    <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{result.style}</p>
                    <div className="flex gap-2 mt-2">
                      {result.colors.map(color => (
                        <div key={color} className="w-8 h-8 rounded-full border-2" style={{ background: color, borderColor: 'rgba(0,0,0,0.1)' }} title={color} />
                      ))}
                    </div>
                  </div>
                </div>

                {/* Structure */}
                <div className="card-surface p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                    <Layout size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Website Structure</span>
                    <div className="flex flex-wrap items-center gap-1.5 mt-2">
                      {result.structure.map((item, i) => (
                        <span key={item} className="flex items-center gap-1.5">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{item}</span>
                          {i < result.structure.length - 1 && <ArrowRight size={10} style={{ color: 'var(--text-tertiary)' }} />}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Music */}
                <div className="card-surface p-4 flex items-start gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--music-accent-light)' }}>
                    <Music size={16} style={{ color: 'var(--music-accent)' }} />
                  </div>
                  <div className="flex-1">
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Recommended Music</span>
                    <div className="flex flex-wrap gap-2 mt-2">
                      {result.music.map(track => (
                        <span key={track.id} className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>
                          <Music size={10} /> {track.title}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-2 flex gap-3">
              <button onClick={onClose} className="btn-ghost flex-1 text-xs">Try Again</button>
              <button onClick={handleUseTemplate} className="btn-primary flex-1 text-xs">Use This Template</button>
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}
