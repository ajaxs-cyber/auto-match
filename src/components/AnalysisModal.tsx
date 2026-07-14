import { useEffect, useState, useCallback } from 'react';
import {
  Sparkles, Loader2, Check, Music, Palette, Layout, ArrowRight,
  Building2, Users, Zap, Activity, Brain, Heart, Eye, SkipForward,
  SkipBack, Play, Pause, Volume2, RefreshCw, Bookmark, BookmarkCheck,
  ChevronDown, ChevronUp, Gauge, Target, Sparkle
} from 'lucide-react';
import {
  matchScene, getGenreLabel, getGenreLabelZh, getGenreColor,
  generateBrandMoodProfile, generateBrandMoodAnalysis,
  createAnalysisSteps, MUSIC_STYLE_PRESETS, detectIndustry, MUSIC_TRACKS,
  getEmotionLabel
} from '@/data/music';
import { useI18n } from '@/hooks/useI18n';
import type { MusicTrack, BrandMoodProfile, AnalysisStep, SceneMatchResult, EmotionKey } from '@/types';

interface Props {
  prompt: string;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

export default function AnalysisModal({ prompt, onClose, onSelectTemplate }: Props) {
  const { lang, t } = useI18n();
  const [phase, setPhase] = useState<'analyzing' | 'results'>('analyzing');
  const [currentStep, setCurrentStep] = useState(0);
  const [result, setResult] = useState<SceneMatchResult[] | null>(null);
  const [selectedTrack, setSelectedTrack] = useState<MusicTrack | null>(null);
  const [selectedMatch, setSelectedMatch] = useState<SceneMatchResult | null>(null);
  const [visible, setVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'recommend' | 'dimensions'>('recommend');

  const industry = detectIndustry(prompt);
  const steps = createAnalysisSteps(industry);

  useEffect(() => { setVisible(true); }, []);

  useEffect(() => {
    let stepIdx = 0;
    const interval = setInterval(() => {
      stepIdx++;
      if (stepIdx < steps.length) {
        setCurrentStep(stepIdx);
      } else {
        clearInterval(interval);
        const matches = matchScene(industry, []);
        setResult(matches);
        if (matches.length > 0) {
          setSelectedTrack(matches[0].track);
          setSelectedMatch(matches[0]);
        }
        setPhase('results');
      }
    }, 900);
    return () => clearInterval(interval);
  }, [prompt, industry, steps.length]);

  // Simulate progress bar when playing
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setProgress(p => (p >= 100 ? 0 : p + 0.5));
    }, 100);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const selectTrack = (match: SceneMatchResult) => {
    setSelectedTrack(match.track);
    setSelectedMatch(match);
  };

  const handleContinue = () => {
    const tplMap: Record<string, string> = {
      'Beauty & Skincare': 'tpl-skincare-1',
      'Pet Lifestyle': 'tpl-pet-1',
      'Cultural & Creative': 'tpl-cultural-1',
      'Charity & Social Impact': 'tpl-charity-1',
    };
    onSelectTemplate(tplMap[industry] || 'tpl-skincare-1');
  };

  const toggleFavorite = (trackId: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(trackId)) next.delete(trackId);
      else next.add(trackId);
      return next;
    });
  };

  const getStepIcon = (stepId: string) => {
    switch (stepId) {
      case 'industry': return <Building2 size={16} />;
      case 'brand-tone': return <Users size={16} />;
      case 'mood': return <Heart size={16} />;
      case 'visual': return <Palette size={16} />;
      case 'matching': return <Music size={16} />;
      default: return <Sparkles size={16} />;
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'rgba(26,43,60,0.6)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className={`w-full max-w-[780px] max-h-[92vh] overflow-y-auto bg-white rounded-2xl shadow-xl transition-all duration-400 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        onClick={e => e.stopPropagation()}
      >
        {phase === 'analyzing' ? (
          <div className="p-12 text-center">
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--accent-light)' }}>
              <Loader2 size={32} style={{ color: 'var(--accent)' }} className="animate-spin" />
            </div>
            <h2 className="text-xl font-bold" style={{ color: 'var(--text-primary)' }}>
              {t('analysis.title', 'Analyzing your brand experience...')}
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {t('analysis.subtitle', 'Our AI is studying both visual and audio dimensions of your brand')}
            </p>

            {/* Analysis Cards */}
            <div className="mt-8 grid grid-cols-2 gap-3 max-w-lg mx-auto">
              {steps.map((step, i) => (
                <div
                  key={step.id}
                  className={`p-3 rounded-xl border transition-all duration-500 ${i <= currentStep ? 'opacity-100 border-[var(--accent)]' : 'opacity-40 border-gray-200'}`}
                  style={{ background: i <= currentStep ? 'var(--accent-light)' : '#f9f9f9' }}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span style={{ color: i <= currentStep ? 'var(--accent)' : 'var(--text-tertiary)' }}>
                      {i < currentStep ? <Check size={14} /> : i === currentStep ? <Loader2 size={14} className="animate-spin" /> : getStepIcon(step.id)}
                    </span>
                    <span className={`text-xs font-semibold ${i <= currentStep ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)]'}`}>
                      {lang === 'zh' ? step.labelZh : step.label}
                    </span>
                  </div>
                  <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {lang === 'zh' ? step.descriptionZh : step.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Progress */}
            <div className="mt-6 max-w-sm mx-auto">
              <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${((currentStep + 1) / steps.length) * 100}%`,
                    background: 'linear-gradient(90deg, var(--accent), var(--music-accent))'
                  }}
                />
              </div>
              <p className="text-xs mt-2" style={{ color: 'var(--text-tertiary)' }}>
                {Math.round(((currentStep + 1) / steps.length) * 100)}%
              </p>
            </div>
          </div>
        ) : result ? (
          <div>
            {/* Header */}
            <div className="p-8 pb-4">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: 'var(--accent-light)' }}>
                  <Sparkles size={14} style={{ color: 'var(--accent)' }} />
                  <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--accent)' }}>
                    Brand Experience Analysis
                  </span>
                </div>
                <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>
                  {t('analysis.resultTitle', 'Your brand experience is ready')}
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {t('analysis.resultSubtitle', 'AI analyzed your description and designed a complete visual + audio identity.')}
                </p>
              </div>

              {/* Tab Switcher: Recommend vs Style */}
              <div className="mt-6 flex justify-center">
                <div className="inline-flex p-0.5 rounded-lg" style={{ background: '#f5f5f3' }}>
                  <button
                    onClick={() => setActiveTab('recommend')}
                    className={`px-4 py-2 rounded-md text-xs font-medium transition-all border-none cursor-pointer ${activeTab === 'recommend' ? 'bg-white shadow-sm text-[var(--accent)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
                  >
                    {lang === 'zh' ? 'AI 推荐' : 'AI Recommendation'}
                  </button>
                  <button
                    onClick={() => setActiveTab('style')}
                    className={`px-4 py-2 rounded-md text-xs font-medium transition-all border-none cursor-pointer ${activeTab === 'dimensions' ? 'bg-white shadow-sm text-[var(--accent)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
                  >
                    {lang === 'zh' ? '切换风格' : 'Switch Style'}
                  </button>
                </div>
              </div>

              {activeTab === 'recommend' ? (
                <>
                  {/* Emotion Dimensions Profile */}
                  {selectedMatch && (
                    <div className="mt-6 p-5 rounded-2xl" style={{ background: '#FAFAF8', border: '1px solid var(--border-color)' }}>
                      <div className="flex items-center gap-2 mb-4">
                        <Palette size={16} style={{ color: 'var(--accent)' }} />
                        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                          {lang === 'zh' ? '目标情绪画像' : 'Target Emotion Profile'}
                        </span>
                        <span className="ml-auto text-xs font-bold" style={{ color: 'var(--accent)' }}>
                          {lang === 'zh' ? '综合' : 'Score'}: {selectedMatch.score}%
                        </span>
                      </div>
                      <div className="space-y-2.5">
                        {selectedMatch.dimensionDetails.map(d => {
                          const meta = getEmotionLabel(d.key);
                          return (
                            <div key={d.key} className="flex items-center gap-3">
                              <span className="text-xs w-20 text-right flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
                                {meta.cn}
                              </span>
                              <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
                                <div className="h-full rounded-full transition-all" style={{ width: `${(d.actual / 7) * 100}%`, background: d.fit ? 'var(--accent)' : meta.color }} />
                              </div>
                              <span className="text-xs w-16 flex-shrink-0 font-medium" style={{ color: 'var(--text-primary)' }}>{d.actual.toFixed(1)}</span>
                              <span className="text-[10px] w-24 flex-shrink-0" style={{ color: 'var(--text-tertiary)' }}>目标 {d.target}</span>
                              <span className="text-[10px] w-8 flex-shrink-0" style={{ color: d.fit ? '#10B981' : '#EF4444' }}>
                                {d.fit ? (lang === 'zh' ? '✓' : '✓') : (lang === 'zh' ? '×' : '×')}
                              </span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* Music Recommendation Cards */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Music size={16} style={{ color: 'var(--music-accent)' }} />
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                        {t('analysis.musicRec', 'AI Music Recommendation')}
                      </span>
                    </div>

                    {/* Primary Recommendation - Full Card */}
                    {selectedTrack && selectedMatch && (
                      <div className="p-4 rounded-2xl mb-4" style={{ background: 'rgba(123,97,255,0.04)', border: '1px solid rgba(123,97,255,0.15)' }}>
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <img src={selectedTrack.cover} alt={selectedTrack.title} className="w-20 h-20 rounded-xl object-cover" />
                            <div className="absolute top-0 left-0 bg-black/60 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-tl-xl rounded-br-xl">
                              {selectedMatch.score}%
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 flex-wrap">
                              <h3 className="text-base font-bold" style={{ color: 'var(--text-primary)' }}>{selectedTrack.title}</h3>
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: getGenreColor(selectedTrack.genre) + '22', color: getGenreColor(selectedTrack.genre) }}>
                                {lang === 'zh' ? getGenreLabelZh(selectedTrack.genre) : getGenreLabel(selectedTrack.genre)}
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                                {selectedTrack.bpm} BPM
                              </span>
                              <span className="px-2 py-0.5 rounded-full text-xs" style={{ background: 'rgba(16,185,129,0.1)', color: '#10B981' }}>
                                {selectedMatch.confidence}
                              </span>
                            </div>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{selectedTrack.artist} &middot; {selectedTrack.duration}</p>

                            {/* Confidence badge */}
                            <div className="flex flex-wrap gap-1 mt-2">
                              {selectedTrack.moods.map(m => (
                                <span key={m} className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>{m}</span>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Scene Matching Reasoning */}
                        <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(123,97,255,0.08)' }}>
                          <p className="text-xs font-medium mb-1" style={{ color: 'var(--music-accent)' }}>
                            {lang === 'zh' ? '场景匹配理由' : 'Scene Match Reason'}
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{selectedMatch.reason}</p>
                        </div>
                      </div>
                    )}

                    {/* Alternative Tracks */}
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      {t('analysis.alternatives', 'Alternative options')}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {result.slice(1, 4).map(m => (
                        <button
                          key={m.track.id}
                          onClick={() => selectTrack(m)}
                          className={`flex items-center gap-3 p-3 rounded-xl text-left cursor-pointer transition-all border ${selectedTrack?.id === m.track.id ? 'border-2' : 'border'}`}
                          style={{
                            background: selectedTrack?.id === m.track.id ? 'var(--music-accent-light)' : 'white',
                            borderColor: selectedTrack?.id === m.track.id ? 'var(--music-accent)' : 'var(--border-color)'
                          }}
                        >
                          <img src={m.track.cover} alt={m.track.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{m.track.title}</p>
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{m.track.artist} &middot; {lang === 'zh' ? getGenreLabelZh(m.track.genre) : getGenreLabel(m.track.genre)}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(26,43,60,0.06)', color: 'var(--text-tertiary)' }}>{m.track.bpm} BPM</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(m.track.id); }}
                              className="p-1 rounded hover:bg-gray-50 border-none bg-transparent cursor-pointer"
                            >
                              {favorites.has(m.track.id) ? <BookmarkCheck size={14} style={{ color: 'var(--accent)' }} /> : <Bookmark size={14} style={{ color: 'var(--text-tertiary)' }} />}
                            </button>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Analysis Steps Accordion */}
                  <div className="mt-4 p-4 rounded-2xl" style={{ background: '#FAFAF8', border: '1px solid var(--border-color)' }}>
                    <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                      {lang === 'zh' ? '分析详情' : 'Analysis Details'}
                    </p>
                    {steps.map((step, i) => (
                      <div key={step.id} className="mb-1">
                        <button
                          onClick={() => setExpandedStep(expandedStep === step.id ? null : step.id)}
                          className="w-full flex items-center justify-between p-2.5 rounded-lg hover:bg-white transition-colors border-none bg-transparent cursor-pointer text-left"
                        >
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                              <Check size={10} style={{ color: 'var(--accent)' }} />
                            </div>
                            <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>
                              {lang === 'zh' ? step.labelZh : step.label}
                            </span>
                          </div>
                          {expandedStep === step.id ? <ChevronUp size={14} style={{ color: 'var(--text-tertiary)' }} /> : <ChevronDown size={14} style={{ color: 'var(--text-tertiary)' }} />}
                        </button>
                        {expandedStep === step.id && step.dimensions && (
                          <div className="pl-9 pr-2 pb-2 space-y-1.5">
                            {step.dimensions.map(dim => (
                              <div key={dim.id} className="flex items-center justify-between py-1">
                                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{lang === 'zh' ? dim.labelZh : dim.label}</span>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{lang === 'zh' ? dim.valueZh : dim.value}</span>
                                  <div className="w-12 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
                                    <div className="h-full rounded-full" style={{ width: `${dim.confidence}%`, background: 'var(--accent)' }} />
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Visual summary */}
                  <div className="mt-4 flex flex-wrap gap-3">
                    <div className="flex-1 min-w-[120px] p-3 rounded-xl text-center" style={{ background: 'var(--accent-light)' }}>
                      <Layout size={16} className="mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                      <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{industry}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t('analysis.industry', 'Industry')}</p>
                    </div>
                    <div className="flex-1 min-w-[120px] p-3 rounded-xl text-center" style={{ background: 'var(--music-accent-light)' }}>
                      <Music size={16} className="mx-auto mb-1" style={{ color: 'var(--music-accent)' }} />
                      <p className="text-xs font-semibold" style={{ color: 'var(--music-accent)' }}>
                        {selectedTrack ? (lang === 'zh' ? getGenreLabelZh(selectedTrack.genre) : getGenreLabel(selectedTrack.genre)) : '—'}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t('analysis.soundscape', 'Soundscape')}</p>
                    </div>
                    <div className="flex-1 min-w-[120px] p-3 rounded-xl text-center" style={{ background: 'rgba(45,138,78,0.08)' }}>
                      <Gauge size={16} className="mx-auto mb-1" style={{ color: 'var(--success)' }} />
                      <p className="text-xs font-semibold" style={{ color: 'var(--success)' }}>{selectedTrack?.bpm || '—'}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>BPM</p>
                    </div>
                  </div>
                </>
              ) : (
                /* Style Switcher Tab */
                <div className="mt-6">
                  <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                    {lang === 'zh' ? '选择不同的音乐风格，AI 将重新推荐匹配的音乐。' : 'Choose a different music style and AI will re-recommend matching tracks.'}
                  </p>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => handleStyleSwitch('auto')}
                      className={`p-3 rounded-xl text-left cursor-pointer transition-all border ${selectedStyle === 'auto' ? 'border-2' : 'border'}`}
                      style={{
                        background: selectedStyle === 'auto' ? 'var(--accent-light)' : 'white',
                        borderColor: selectedStyle === 'auto' ? 'var(--accent)' : 'var(--border-color)'
                      }}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Brain size={16} style={{ color: 'var(--accent)' }} />
                        <span className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>
                          {lang === 'zh' ? 'AI 自动' : 'AI Auto'}
                        </span>
                      </div>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                        {lang === 'zh' ? '基于品牌分析自动匹配' : 'Auto-match based on brand analysis'}
                      </p>
                    </button>
                    {MUSIC_STYLE_PRESETS.map(preset => (
                      <button
                        key={preset.id}
                        onClick={() => handleStyleSwitch(preset.id)}
                        className={`p-3 rounded-xl text-left cursor-pointer transition-all border ${selectedStyle === preset.id ? 'border-2' : 'border'}`}
                        style={{
                          background: selectedStyle === preset.id ? 'var(--music-accent-light)' : 'white',
                          borderColor: selectedStyle === preset.id ? 'var(--music-accent)' : 'var(--border-color)'
                        }}
                      >
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-semibold" style={{ color: selectedStyle === preset.id ? 'var(--music-accent)' : 'var(--text-primary)' }}>
                            {lang === 'zh' ? preset.nameZh : preset.name}
                          </span>
                        </div>
                        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
                          {lang === 'zh' ? preset.descriptionZh : preset.description}
                        </p>
                      </button>
                    ))}
                  </div>

                  {/* Rematch Button */}
                  <button
                    onClick={() => handleStyleSwitch(selectedStyle)}
                    className="w-full mt-4 py-3 rounded-xl text-xs font-medium flex items-center justify-center gap-2 border-none cursor-pointer transition-all hover:opacity-90"
                    style={{ background: 'linear-gradient(135deg, var(--accent), var(--music-accent))', color: 'white' }}
                  >
                    <RefreshCw size={14} /> {t('music.rematch', 'Rematch Music')}
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 pt-2 flex gap-3">
              <button onClick={onClose} className="btn-ghost flex-1 text-xs">
                {t('analysis.tryAgain', 'Try Different Input')}
              </button>
              <button onClick={handleContinue} className="btn-primary flex-1 text-xs flex items-center justify-center gap-2">
                {t('analysis.continue', 'Continue to Editor')} <ArrowRight size={14} />
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function MoodRadar({ profile, lang, t }: { profile: BrandMoodProfile; lang: string; t: (key: string, fallback?: string) => string }) {
  const dims = [
    { key: 'warmth', label: t('analysis.warmth', 'Warmth'), labelZh: '温暖度', val: profile.warmth },
    { key: 'energy', label: t('analysis.energy', 'Energy'), labelZh: '活力值', val: profile.energy },
    { key: 'professionalism', label: t('analysis.professionalism', 'Professional'), labelZh: '专业度', val: profile.professionalism },
    { key: 'creativity', label: t('analysis.creativity', 'Creative'), labelZh: '创意值', val: profile.creativity },
    { key: 'sophistication', label: t('analysis.sophistication', 'Sophisticated'), labelZh: '精致度', val: profile.sophistication },
  ];

  return (
    <div className="space-y-3">
      {dims.map(d => (
        <div key={d.key} className="flex items-center gap-3">
          <span className="text-xs w-28 text-right flex-shrink-0" style={{ color: 'var(--text-secondary)' }}>
            {lang === 'zh' ? d.labelZh : d.label}
          </span>
          <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{
                width: `${d.val}%`,
                background: d.val > 70 ? 'var(--accent)' : d.val > 50 ? 'var(--music-accent)' : 'var(--text-tertiary)'
              }}
            />
          </div>
          <span className="text-xs w-8 flex-shrink-0 font-medium" style={{ color: 'var(--text-primary)' }}>{d.val}</span>
        </div>
      ))}
    </div>
  );
}
