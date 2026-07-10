import { useEffect, useState, useCallback } from 'react';
import {
  Sparkles, Loader2, Check, Music, Palette, Layout, ArrowRight,
  Building2, Users, Zap, Activity, Brain, Heart, Eye, SkipForward,
  SkipBack, Play, Pause, Volume2, RefreshCw, Bookmark, BookmarkCheck,
  ChevronDown, ChevronUp, Gauge, Target, Sparkle
} from 'lucide-react';
import {
  generateMusicRecommendation, getTrackById, getGenreLabel,
  getGenreLabelZh, getGenreColor, generateBrandMoodProfile,
  generateBrandMoodAnalysis, createAnalysisSteps, MUSIC_STYLE_PRESETS,
  detectIndustry, MUSIC_TRACKS
} from '@/data/music';
import { useLang } from '@/i18n/LanguageContext';
import type { MusicRecommendation, BrandMoodProfile, MusicTrack, AnalysisStep, MusicStylePreset } from '@/types';

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
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [selectedStyle, setSelectedStyle] = useState<string>('auto');
  const [expandedStep, setExpandedStep] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [activeTab, setActiveTab] = useState<'recommend' | 'style'>('recommend');

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
        const rec = generateMusicRecommendation(industry);
        setResult(rec);
        setSelectedTrack(rec.primary);
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

  const handleStyleSwitch = useCallback((styleId: string) => {
    setSelectedStyle(styleId);
    if (styleId === 'auto') {
      const rec = generateMusicRecommendation(industry);
      setResult(rec);
      setSelectedTrack(rec.primary);
    } else {
      const preset = MUSIC_STYLE_PRESETS.find(p => p.id === styleId);
      if (preset) {
        const matchingTracks = MUSIC_TRACKS.filter(t =>
          preset.genres.some(g => t.genre === g || t.genre.includes(g))
        );
        if (matchingTracks.length > 0) {
          const shuffled = [...matchingTracks].sort(() => Math.random() - 0.5);
          setResult({
            primary: shuffled[0],
            alternatives: shuffled.slice(1, 4),
            reasoning: lang === 'zh'
              ? `${preset.nameZh} 风格强调${preset.descriptionZh}。这些曲目与您选择的品牌氛围匹配，精致度对齐 ${preset.moodProfile.sophistication}%。`
              : `The ${preset.name} style emphasizes ${preset.description.toLowerCase()}. These tracks match your selected brand atmosphere with ${preset.moodProfile.sophistication}% sophistication alignment.`,
            moodProfile: preset.moodProfile,
            analysis: {
              industry: preset.name,
              moodProfile: preset.moodProfile,
              keywords: preset.genres,
              colorStyle: preset.description,
              visualRhythm: 'Style-driven',
              targetAudience: 'Style-aligned',
              brandPersonality: preset.name,
            },
            style: styleId,
          });
          setSelectedTrack(shuffled[0]);
        }
      }
    }
  }, [industry, lang]);

  const handleContinue = () => {
    const tplMap: Record<string, string> = {
      'Coffee & Food': 'tpl-cafe-1', 'Creative': 'tpl-photo-1', 'Tech': 'tpl-tech-1',
      'Health': 'tpl-fitness-1', 'Fitness': 'tpl-fitness-1', 'Services': 'tpl-cafe-1',
      'Wedding': 'tpl-photo-1', 'Luxury': 'tpl-restaurant-1', 'Legal': 'tpl-tech-1',
      'Fashion': 'tpl-studio-1', 'Retail': 'tpl-cafe-1', 'Education': 'tpl-tech-1',
    };
    onSelectTemplate(tplMap[industry] || 'tpl-tech-1');
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
              {__('analysis.title', 'Analyzing your brand experience...')}
            </h2>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              {__('analysis.subtitle', 'Our AI is studying both visual and audio dimensions of your brand')}
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
                  {__('analysis.resultTitle', 'Your brand experience is ready')}
                </h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
                  {__('analysis.resultSubtitle', 'AI analyzed your description and designed a complete visual + audio identity.')}
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
                    className={`px-4 py-2 rounded-md text-xs font-medium transition-all border-none cursor-pointer ${activeTab === 'style' ? 'bg-white shadow-sm text-[var(--accent)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}
                  >
                    {lang === 'zh' ? '切换风格' : 'Switch Style'}
                  </button>
                </div>
              </div>

              {activeTab === 'recommend' ? (
                <>
                  {/* Brand Mood Profile */}
                  <div className="mt-6 p-5 rounded-2xl" style={{ background: '#FAFAF8', border: '1px solid var(--border-color)' }}>
                    <div className="flex items-center gap-2 mb-4">
                      <Palette size={16} style={{ color: 'var(--accent)' }} />
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                        {__('analysis.moodProfile', 'Brand Mood Profile')}
                      </span>
                    </div>
                    <MoodRadar profile={result.moodProfile} lang={lang} t={t} />

                    {/* Brand Keywords & Details */}
                    {result.analysis && (
                      <div className="mt-4 pt-4 border-t" style={{ borderColor: 'var(--border-color)' }}>
                        <div className="flex flex-wrap gap-2 mb-3">
                          {result.analysis.keywords.map(kw => (
                            <span key={kw} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
                              {kw}
                            </span>
                          ))}
                        </div>
                        <div className="grid grid-cols-2 gap-2 text-xs" style={{ color: 'var(--text-secondary)' }}>
                          <div className="flex items-center gap-1.5">
                            <Target size={12} style={{ color: 'var(--text-tertiary)' }} />
                            <span>{__('analysis.targetAudience', 'Target')}: {result.analysis.targetAudience}</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Sparkle size={12} style={{ color: 'var(--text-tertiary)' }} />
                            <span>{__('analysis.personality', 'Personality')}: {result.analysis.brandPersonality}</span>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Music Recommendation Cards */}
                  <div className="mt-4">
                    <div className="flex items-center gap-2 mb-4">
                      <Music size={16} style={{ color: 'var(--music-accent)' }} />
                      <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                        {__('analysis.musicRec', 'AI Music Recommendation')}
                      </span>
                    </div>

                    {/* Primary Recommendation - Full Card */}
                    {selectedTrack && (
                      <div className="p-4 rounded-2xl mb-4" style={{ background: 'rgba(123,97,255,0.04)', border: '1px solid rgba(123,97,255,0.15)' }}>
                        <div className="flex items-start gap-4">
                          <div className="relative flex-shrink-0">
                            <img src={selectedTrack.cover} alt={selectedTrack.title} className="w-20 h-20 rounded-xl object-cover" />
                            <button
                              onClick={() => setIsPlaying(!isPlaying)}
                              className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl transition-opacity hover:bg-black/50"
                            >
                              {isPlaying ? <Pause size={24} className="text-white" /> : <Play size={24} className="text-white ml-1" />}
                            </button>
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
                            </div>
                            <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{selectedTrack.artist} &middot; {selectedTrack.duration}</p>
                            <div className="flex flex-wrap gap-1 mt-2">
                              {selectedTrack.moods.map(m => (
                                <span key={m} className="px-1.5 py-0.5 rounded text-xs" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>{m}</span>
                              ))}
                            </div>
                          </div>
                          <button
                            onClick={() => toggleFavorite(selectedTrack.id)}
                            className="p-2 rounded-lg hover:bg-white/50 transition-colors border-none bg-transparent cursor-pointer flex-shrink-0"
                          >
                            {favorites.has(selectedTrack.id) ? <BookmarkCheck size={18} style={{ color: 'var(--accent)' }} /> : <Bookmark size={18} style={{ color: 'var(--text-tertiary)' }} />}
                          </button>
                        </div>

                        {/* Mini Player */}
                        <div className="mt-3 flex items-center gap-3">
                          <button onClick={() => setIsPlaying(!isPlaying)} className="w-7 h-7 rounded-full flex items-center justify-center text-white border-none cursor-pointer" style={{ background: 'var(--music-accent)' }}>
                            {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                          </button>
                          <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.08)' }}>
                            <div className="h-full rounded-full transition-all" style={{ width: `${progress}%`, background: 'var(--music-accent)' }} />
                          </div>
                          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{selectedTrack.duration}</span>
                          <Volume2 size={14} style={{ color: 'var(--text-tertiary)' }} />
                        </div>

                        {/* AI Reasoning */}
                        <div className="mt-3 p-3 rounded-xl" style={{ background: 'rgba(123,97,255,0.08)' }}>
                          <p className="text-xs font-medium mb-1" style={{ color: 'var(--music-accent)' }}>
                            {__('analysis.whyRecommend', 'Why AI recommends this:')}
                          </p>
                          <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{result.reasoning}</p>
                        </div>
                      </div>
                    )}

                    {/* Alternative Tracks */}
                    <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                      {__('analysis.alternatives', 'Alternative options')}
                    </p>
                    <div className="grid grid-cols-1 gap-2">
                      {result.alternatives.map(alt => (
                        <button
                          key={alt.id}
                          onClick={() => setSelectedTrack(alt)}
                          className={`flex items-center gap-3 p-3 rounded-xl text-left cursor-pointer transition-all border ${selectedTrack?.id === alt.id ? 'border-2' : 'border'}`}
                          style={{
                            background: selectedTrack?.id === alt.id ? 'var(--music-accent-light)' : 'white',
                            borderColor: selectedTrack?.id === alt.id ? 'var(--music-accent)' : 'var(--border-color)'
                          }}
                        >
                          <img src={alt.cover} alt={alt.title} className="w-10 h-10 rounded-lg object-cover flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{alt.title}</p>
                            <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{alt.artist} &middot; {lang === 'zh' ? getGenreLabelZh(alt.genre) : getGenreLabel(alt.genre)}</p>
                          </div>
                          <div className="flex items-center gap-1 flex-shrink-0">
                            <span className="text-xs px-1.5 py-0.5 rounded" style={{ background: 'rgba(26,43,60,0.06)', color: 'var(--text-tertiary)' }}>{alt.bpm} BPM</span>
                            <button
                              onClick={(e) => { e.stopPropagation(); toggleFavorite(alt.id); }}
                              className="p-1 rounded hover:bg-gray-50 border-none bg-transparent cursor-pointer"
                            >
                              {favorites.has(alt.id) ? <BookmarkCheck size={14} style={{ color: 'var(--accent)' }} /> : <Bookmark size={14} style={{ color: 'var(--text-tertiary)' }} />}
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
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('analysis.industry', 'Industry')}</p>
                    </div>
                    <div className="flex-1 min-w-[120px] p-3 rounded-xl text-center" style={{ background: 'var(--music-accent-light)' }}>
                      <Music size={16} className="mx-auto mb-1" style={{ color: 'var(--music-accent)' }} />
                      <p className="text-xs font-semibold" style={{ color: 'var(--music-accent)' }}>
                        {selectedTrack ? (lang === 'zh' ? getGenreLabelZh(selectedTrack.genre) : getGenreLabel(selectedTrack.genre)) : '—'}
                      </p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('analysis.soundscape', 'Soundscape')}</p>
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
                    <RefreshCw size={14} /> {__('music.rematch', 'Rematch Music')}
                  </button>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="p-6 pt-2 flex gap-3">
              <button onClick={onClose} className="btn-ghost flex-1 text-xs">
                {__('analysis.tryAgain', 'Try Different Input')}
              </button>
              <button onClick={handleContinue} className="btn-primary flex-1 text-xs flex items-center justify-center gap-2">
                {__('analysis.continue', 'Continue to Editor')} <ArrowRight size={14} />
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
    { key: 'warmth', label: __('analysis.warmth', 'Warmth'), labelZh: '温暖度', val: profile.warmth },
    { key: 'energy', label: __('analysis.energy', 'Energy'), labelZh: '活力值', val: profile.energy },
    { key: 'professionalism', label: __('analysis.professionalism', 'Professional'), labelZh: '专业度', val: profile.professionalism },
    { key: 'creativity', label: __('analysis.creativity', 'Creative'), labelZh: '创意值', val: profile.creativity },
    { key: 'sophistication', label: __('analysis.sophistication', 'Sophisticated'), labelZh: '精致度', val: profile.sophistication },
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
