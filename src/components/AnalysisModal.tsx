import { useEffect, useState } from 'react';
import { Sparkles, Loader2, Check, Music, Palette, Layout, ArrowRight } from 'lucide-react';
import { generateMusicRecommendation, getTrackById, getGenreLabel, getGenreColor } from '@/data/music';
import type { MusicRecommendation, BrandMoodProfile, MusicTrack } from '@/types';
import { useLang } from '@/i18n/LanguageContext';

interface Props {
  prompt: string;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

export default function AnalysisModal({ prompt, onClose, onSelectTemplate }: Props) {
  const { lang, __ } = useLang();
  const [phase, setPhase] = useState<'analyzing' | 'results'>('analyzing');
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<MusicRecommendation | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack | null>(null);
  const [visible, setVisible] = useState(false);

  const STEPS = [
    __('analysis.step1'),
    __('analysis.step2'),
    __('analysis.step3'),
    __('analysis.step4'),
    __('analysis.step5'),
  ];

  useEffect(() => { setVisible(true); }, []);

  useEffect(() => {
    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < STEPS.length) setCurrentStep(stepIdx);
      else {
        clearInterval(interval);
        setResult(generateMusicRecommendation(detectIndustry(prompt)));
        setSelectedTrack(generateMusicRecommendation(detectIndustry(prompt)).primary);
        setPhase('results');
      }
    }, 500);
    return () => clearInterval(interval);
  }, [prompt]);

  const handleContinue = () => {
    const tplMap: Record<string, string> = { 'Coffee & Food': 'tpl-cafe-1', 'Creative': 'tpl-photo-1', 'Tech': 'tpl-tech-1', 'Health': 'tpl-fitness-1', 'Services': 'tpl-cafe-1' };
    onSelectTemplate(tplMap[detectIndustry(prompt)] || 'tpl-tech-1');
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`} style={{ background: 'rgba(26,43,60,0.6)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div className={`w-full max-w-[680px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-xl transition-all duration-400 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }} onClick={e => e.stopPropagation()}>
        {phase === 'analyzing' ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--accent-light)' }}>
              <Loader2 size={32} style={{ color: 'var(--accent)' }} className="animate-spin" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>{__('analysis.title')}</h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{__('analysis.subtitle')}</p>
            <div className="mt-8 space-y-3 max-w-sm mx-auto">
              {STEPS.map((s, i) => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${i <= currentStep ? 'bg-[var(--accent)]' : 'bg-gray-200'}`}>
                    {i < currentStep ? <Check size={10} className="text-white" /> : i === currentStep ? <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" /> : null}
                  </div>
                  <span className={`text-xs transition-colors duration-300 ${i <= currentStep ? 'text-[var(--text-primary)] font-medium' : 'text-[var(--text-tertiary)]'}`}>{s}</span>
                </div>
              ))}
            </div>
          </div>
        ) : result ? (
          <div>
            {/* Header */}
            <div className="p-8 pb-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: 'var(--accent-light)' }}>
                  <Sparkles size={14} style={{ color: 'var(--accent)' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>{__('analysis.badge')}</span>
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{__('analysis.result.title')}</h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>{__('analysis.result.subtitle')}</p>
              </div>

              {/* Brand Mood Profile */}
              <div className="mt-6 p-5 rounded-2xl" style={{ background: '#FAFAF8', border: '1px solid var(--border-color)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Palette size={16} style={{ color: 'var(--accent)' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{__('analysis.mood')}</span>
                </div>
                <MoodRadar profile={result.moodProfile} />
              </div>

              {/* Music Recommendation */}
              <div className="mt-4 p-5 rounded-2xl" style={{ background: 'rgba(123,97,255,0.04)', border: '1px solid rgba(123,97,255,0.15)' }}>
                <div className="flex items-center gap-2 mb-4">
                  <Music size={16} style={{ color: 'var(--music-accent)' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{__('analysis.music')}</span>
                </div>

                {/* Primary recommendation */}
                {selectedTrack && (
                  <div className="flex items-start gap-4 mb-4">
                    <img src={selectedTrack.cover} alt={selectedTrack.title} className="w-16 h-16 rounded-xl object-cover flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selectedTrack.title}</h3>
                        <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: getGenreColor(selectedTrack.genre) + '22', color: getGenreColor(selectedTrack.genre) }}>{getGenreLabel(selectedTrack.genre)}</span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{selectedTrack.artist} &middot; {selectedTrack.duration}</p>
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {selectedTrack.moods.map(m => <span key={m} className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>{m}</span>)}
                      </div>
                    </div>
                  </div>
                )}

                {/* AI Reasoning */}
                <div className="p-3 rounded-xl mb-4" style={{ background: 'rgba(123,97,255,0.08)' }}>
                  <p className="text-xs font-medium mb-1" style={{ color: 'var(--music-accent)' }}>{__('analysis.why')}</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{result.reasoning}</p>
                </div>

                {/* Alternatives */}
                <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>{__('analysis.alternatives')}</p>
                <div className="flex gap-2">
                  {result.alternatives.map(alt => (
                    <button key={alt.id} onClick={() => setSelectedTrack(alt)} className={`flex-1 p-2.5 rounded-xl text-left cursor-pointer transition-all border ${selectedTrack?.id === alt.id ? 'border-2' : 'border'}`}
                      style={{ background: selectedTrack?.id === alt.id ? 'var(--music-accent-light)' : 'white', borderColor: selectedTrack?.id === alt.id ? 'var(--music-accent)' : 'var(--border-color)' }}>
                      <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{alt.title}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{getGenreLabel(alt.genre)}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Visual summary */}
              <div className="mt-4 flex flex-wrap gap-3">
                <div className="flex-1 min-w-[140px] p-3 rounded-xl text-center" style={{ background: 'var(--accent-light)' }}>
                  <Layout size={16} className="mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{detectIndustry(prompt)}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('analysis.industry')}</p>
                </div>
                <div className="flex-1 min-w-[140px] p-3 rounded-xl text-center" style={{ background: 'var(--music-accent-light)' }}>
                  <Music size={16} className="mx-auto mb-1" style={{ color: 'var(--music-accent)' }} />
                  <p className="text-xs font-semibold" style={{ color: 'var(--music-accent)' }}>{selectedTrack ? getGenreLabel(selectedTrack.genre) : '—'}</p>
                  <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('analysis.soundscape')}</p>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="p-6 pt-2 flex gap-3">
              <button onClick={onClose} className="btn-ghost flex-1 text-xs">{__('analysis.refine')}</button>
              <button onClick={handleContinue} className="btn-primary flex-1 text-xs flex items-center justify-center gap-2">{__('analysis.continue')} <ArrowRight size={14} /></button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MoodRadar({ profile }: { profile: BrandMoodProfile }) {
  const { __ } = useLang();

  const dims = [
    { key: 'warmth', label: __('analysis.mood.warmth'), val: profile.warmth },
    { key: 'energy', label: __('analysis.mood.energy'), val: profile.energy },
    { key: 'professionalism', label: __('analysis.mood.professional'), val: profile.professionalism },
    { key: 'creativity', label: __('analysis.mood.creative'), val: profile.creativity },
    { key: 'sophistication', label: __('analysis.mood.sophisticated'), val: profile.sophistication },
  ];

  return (
    <div className="space-y-3">
      {dims.map(d => (
        <div key={d.key} className="flex items-center gap-3">
          <span className="text-xs w-24 text-right flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
            <div className="h-full rounded-full transition-all duration-1000" style={{ width: `${d.val}%`, background: d.val > 70 ? 'var(--accent)' : d.val > 50 ? 'var(--music-accent)' : 'var(--text-tertiary)' }} />
          </div>
          <span className="text-xs w-8 flex-shrink-0 font-medium" style={{ color: 'var(--text-primary)' }}>{d.val}</span>
        </div>
      ))}
    </div>
  );
}

export function detectIndustry(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('coffee') || p.includes('cafe') || p.includes('restaurant') || p.includes('food') || p.includes('bistro')) return 'Coffee & Food';
  if (p.includes('photo') || p.includes('portfolio') || p.includes('creative') || p.includes('design') || p.includes('art') || p.includes('studio')) return 'Creative';
  if (p.includes('tech') || p.includes('startup') || p.includes('saas') || p.includes('app') || p.includes('software')) return 'Tech';
  if (p.includes('fitness') || p.includes('gym') || p.includes('health') || p.includes('yoga') || p.includes('wellness')) return 'Health';
  return 'Services';
}
