import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router';
import {
  Music, Brain, Sparkles, ArrowRight, Play, Pause, Heart,
  Star, Zap, Palette, Volume2, Bookmark, BookmarkCheck,
  RefreshCw, ChevronRight, Target, Activity, SkipBack, SkipForward,
  Layers, Globe, Clock, TrendingUp, Mic2, AudioLines, SlidersHorizontal
} from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import {
  MUSIC_TRACKS, MUSIC_STYLE_PRESETS, CASE_STUDIES,
  generateBrandMoodProfile, generateBrandMoodAnalysis,
  getGenreLabel, getGenreLabelZh, getGenreColor
} from '@/data/music';

export default function MusicPage() {
  const navigate = useNavigate();
  const { lang } = useI18n();
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [activeStyle, setActiveStyle] = useState<string>('coffee');
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [analyzing, setAnalyzing] = useState(false);
  const [analysisProgress, setAnalysisProgress] = useState(0);
  const [showAnalysisResult, setShowAnalysisResult] = useState(false);
  const [activeCase, setActiveCase] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const o = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { setVisible(true); o.unobserve(e.target); } });
    }, { threshold: 0.1 });
    if (sectionRef.current) o.observe(sectionRef.current);
    return () => o.disconnect();
  }, []);

  const handleAnalyze = () => {
    setAnalyzing(true);
    setAnalysisProgress(0);
    setShowAnalysisResult(false);
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setAnalysisProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setAnalyzing(false);
        setShowAnalysisResult(true);
      }
    }, 400);
  };

  const toggleFavorite = (id: string) => {
    setFavorites(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const preset = MUSIC_STYLE_PRESETS.find(p => p.id === activeStyle);
  const styleTracks = preset
    ? MUSIC_TRACKS.filter(t => preset.genres.some(g => t.genre === g || t.genre.includes(g))).slice(0, 5)
    : MUSIC_TRACKS.slice(0, 5);

  const cases = CASE_STUDIES.slice(0, 3);
  const currentCase = cases[activeCase];
  const analysis = currentCase ? generateBrandMoodAnalysis(currentCase.industry) : null;

  return (
    <div className="min-h-screen" style={{ background: 'var(--canvas-base)' }}>
      {/* Hero */}
      <section className="relative pt-24 pb-16 px-4 sm:px-6 lg:px-10 overflow-hidden">
        <div className="absolute inset-0" style={{
          background: 'linear-gradient(135deg, rgba(123,97,255,0.08) 0%, rgba(232,93,76,0.04) 50%, rgba(26,43,60,0.02) 100%)'
        }} />
        {/* Floating orbs */}
        <div className="absolute top-20 right-10 w-64 h-64 rounded-full opacity-30" style={{ background: 'radial-gradient(circle, rgba(123,97,255,0.3), transparent 70%)', filter: 'blur(60px)' }} />
        <div className="absolute bottom-10 left-10 w-48 h-48 rounded-full opacity-20" style={{ background: 'radial-gradient(circle, rgba(232,93,76,0.3), transparent 70%)', filter: 'blur(40px)' }} />

        <div className="relative max-w-[1100px] mx-auto">
          {/* Back button */}
          <button onClick={() => navigate('/')} className="flex items-center gap-2 mb-8 text-sm bg-transparent border-none cursor-pointer hover:opacity-70 transition-opacity" style={{ color: 'var(--text-secondary)' }}>
            <SkipBack size={16} /> {lang === 'zh' ? '返回首页' : 'Back to Home'}
          </button>

          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4" style={{ background: 'var(--music-accent-light)' }}>
                <AudioLines size={14} style={{ color: 'var(--music-accent)' }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--music-accent)' }}>
                  {lang === 'zh' ? 'AI 音乐智能匹配' : 'AI Music Intelligence'}
                </span>
              </div>
              <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold leading-tight mb-4" style={{ color: 'var(--text-primary)' }}>
                {lang === 'zh' ? '让音乐成为您\n品牌的一部分' : 'Make music part of\nyour brand identity'}
              </h1>
              <p className="text-base leading-relaxed mb-6 max-w-lg" style={{ color: 'var(--text-secondary)' }}>
                {lang === 'zh'
                  ? 'AutoMatch 的 AI 不只是建站 — 它分析您的品牌情绪、行业特征和视觉风格，推荐完美匹配的背景音乐。从视觉到听觉，打造完整的品牌体验。'
                  : 'AutoMatch\'s AI doesn\'t just build websites — it analyzes your brand mood, industry, and visual style to recommend perfectly matched background music. From visual to audio, create a complete brand experience.'}
              </p>
              <div className="flex flex-wrap gap-3">
                <button onClick={handleAnalyze} className="btn-primary flex items-center gap-2">
                  <Brain size={16} />
                  {lang === 'zh' ? '体验 AI 分析' : 'Try AI Analysis'}
                </button>
                <button onClick={() => navigate('/editor')} className="btn-ghost flex items-center gap-2">
                  {lang === 'zh' ? '开始建站' : 'Start Building'}
                  <ArrowRight size={16} />
                </button>
              </div>
            </div>

            {/* Interactive Analysis Card */}
            <div className="flex-1 max-w-md w-full">
              <div className="liquid-glass rounded-2xl p-6">
                {!analyzing && !showAnalysisResult && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--music-accent-light)' }}>
                      <Sparkles size={28} style={{ color: 'var(--music-accent)' }} />
                    </div>
                    <h3 className="text-lg font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
                      {lang === 'zh' ? 'AI 品牌音乐分析' : 'AI Brand Music Analysis'}
                    </h3>
                    <p className="text-sm mb-4" style={{ color: 'var(--text-secondary)' }}>
                      {lang === 'zh' ? '点击上方按钮，体验 AI 如何分析品牌并推荐音乐' : 'Click the button above to see how AI analyzes brands and recommends music'}
                    </p>
                    <div className="flex flex-wrap justify-center gap-2">
                      {['Coffee', 'Tech', 'Wedding', 'Fitness', 'Luxury'].map(tag => (
                        <span key={tag} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'rgba(26,43,60,0.06)', color: 'var(--text-secondary)' }}>{tag}</span>
                      ))}
                    </div>
                  </div>
                )}

                {analyzing && (
                  <div className="py-6">
                    <div className="flex items-center justify-between mb-4">
                      {[
                        { icon: Target, label: lang === 'zh' ? '行业' : 'Industry' },
                        { icon: Palette, label: lang === 'zh' ? '调性' : 'Tone' },
                        { icon: Activity, label: lang === 'zh' ? '情绪' : 'Mood' },
                        { icon: SlidersHorizontal, label: lang === 'zh' ? '匹配' : 'Match' },
                      ].map((step, i) => (
                        <div key={step.label} className="flex flex-col items-center gap-1.5">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center transition-all duration-500 ${analysisProgress >= (i + 1) * 25 ? 'text-white' : ''}`}
                            style={{
                              background: analysisProgress >= (i + 1) * 25 ? 'var(--music-accent)' : 'rgba(26,43,60,0.06)',
                              color: analysisProgress >= (i + 1) * 25 ? 'white' : 'var(--text-tertiary)',
                            }}
                          >
                            <step.icon size={14} />
                          </div>
                          <span className="text-[10px] font-medium" style={{ color: analysisProgress >= (i + 1) * 25 ? 'var(--music-accent)' : 'var(--text-tertiary)' }}>{step.label}</span>
                        </div>
                      ))}
                    </div>
                    <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
                      <div className="h-full rounded-full transition-all duration-300" style={{ width: `${analysisProgress}%`, background: 'linear-gradient(90deg, var(--accent), var(--music-accent))' }} />
                    </div>
                    <p className="text-center text-xs mt-3" style={{ color: 'var(--text-tertiary)' }}>
                      {lang === 'zh' ? '正在分析品牌特征...' : 'Analyzing brand characteristics...'} {analysisProgress}%
                    </p>
                  </div>
                )}

                {showAnalysisResult && currentCase && analysis && (
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                        <CheckIcon />
                      </div>
                      <div>
                        <p className="text-xs font-semibold" style={{ color: 'var(--accent)' }}>{lang === 'zh' ? '分析完成' : 'Analysis Complete'}</p>
                        <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>{currentCase.industry}</p>
                      </div>
                    </div>

                    {/* Mood Profile */}
                    <div className="mb-4">
                      <p className="text-[10px] font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>
                        {lang === 'zh' ? '品牌情绪画像' : 'Brand Mood Profile'}
                      </p>
                      <div className="grid grid-cols-5 gap-1">
                        {[
                          { label: lang === 'zh' ? '温' : 'W', val: analysis.moodProfile.warmth },
                          { label: lang === 'zh' ? '活' : 'E', val: analysis.moodProfile.energy },
                          { label: lang === 'zh' ? '专' : 'P', val: analysis.moodProfile.professionalism },
                          { label: lang === 'zh' ? '创' : 'C', val: analysis.moodProfile.creativity },
                          { label: lang === 'zh' ? '精' : 'S', val: analysis.moodProfile.sophistication },
                        ].map(d => (
                          <div key={d.label} className="text-center">
                            <div className="relative w-10 h-10 mx-auto">
                              <svg className="w-10 h-10 -rotate-90" viewBox="0 0 40 40">
                                <circle cx="20" cy="20" r="16" fill="none" stroke="rgba(26,43,60,0.08)" strokeWidth="3" />
                                <circle cx="20" cy="20" r="16" fill="none" stroke={d.val > 70 ? 'var(--accent)' : d.val > 50 ? 'var(--music-accent)' : 'var(--text-tertiary)'} strokeWidth="3" strokeDasharray={`${(d.val / 100) * 100.5} 100.5`} strokeLinecap="round" />
                              </svg>
                              <span className="absolute inset-0 flex items-center justify-center text-[9px] font-bold" style={{ color: 'var(--text-primary)' }}>{d.val}</span>
                            </div>
                            <span className="text-[8px]" style={{ color: 'var(--text-tertiary)' }}>{d.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Recommended Track */}
                    <div className="p-3 rounded-xl" style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.12)' }}>
                      <div className="flex items-center gap-3">
                        <img src={currentCase.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{currentCase.musicTitle}</p>
                          <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{currentCase.musicArtist}</p>
                          <span className="inline-block mt-0.5 px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>{currentCase.musicGenre}</span>
                        </div>
                        <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-full flex items-center justify-center text-white border-none cursor-pointer" style={{ background: 'var(--music-accent)' }}>
                          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                        </button>
                      </div>
                    </div>

                    <p className="text-xs mt-3 leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {lang === 'zh' ? currentCase.reasoningZh : currentCase.reasoning}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section ref={sectionRef} className="py-20 px-4 sm:px-6 lg:px-10" style={{ background: 'white' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
              {lang === 'zh' ? '工作流程' : 'HOW IT WORKS'}
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
              {lang === 'zh' ? 'AI 音乐匹配的完整流程' : 'The Complete AI Music Matching Process'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Brain, num: '01', title: lang === 'zh' ? '品牌输入' : 'Brand Input', desc: lang === 'zh' ? '您描述业务类型、品牌调性和目标受众' : 'You describe your business type, brand tone, and target audience' },
              { icon: Target, num: '02', title: lang === 'zh' ? 'AI 分析' : 'AI Analysis', desc: lang === 'zh' ? 'AI 识别行业、分析品牌情绪画像和视觉风格' : 'AI identifies industry, analyzes brand mood profile and visual style' },
              { icon: Music, num: '03', title: lang === 'zh' ? '音乐推荐' : 'Music Match', desc: lang === 'zh' ? '基于分析结果推荐 3-5 首匹配的背景音乐' : 'Recommends 3-5 matching background tracks based on analysis' },
              { icon: Layers, num: '04', title: lang === 'zh' ? '同步体验' : 'Sync Experience', desc: lang === 'zh' ? '在编辑器中实时预览网站 + 音乐的完整效果' : 'Preview website + music together in real-time in the editor' },
            ].map((step, i) => (
              <div key={step.num} className={`p-6 rounded-2xl transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ background: '#FAFAF8', border: '1px solid var(--border-color)', transitionDelay: `${i * 100}ms` }}>
                <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4" style={{ background: 'var(--accent-light)' }}>
                  <step.icon size={20} style={{ color: 'var(--accent)' }} />
                </div>
                <span className="text-xs font-bold" style={{ color: 'var(--text-tertiary)' }}>{step.num}</span>
                <h3 className="text-base font-semibold mt-1 mb-2" style={{ color: 'var(--text-primary)' }}>{step.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Style Explorer */}
      <section className="py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
              {lang === 'zh' ? '风格探索' : 'STYLE EXPLORER'}
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
              {lang === 'zh' ? '选择品牌风格，发现匹配音乐' : 'Choose a brand style, discover matching music'}
            </h2>
          </div>

          {/* Style Tabs */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {MUSIC_STYLE_PRESETS.map(preset => (
              <button
                key={preset.id}
                onClick={() => setActiveStyle(preset.id)}
                className={`px-4 py-2 rounded-full text-xs font-medium cursor-pointer border-none transition-all ${activeStyle === preset.id ? 'text-white' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
                style={{ background: activeStyle === preset.id ? 'var(--music-accent)' : 'rgba(26,43,60,0.06)' }}
              >
                {lang === 'zh' ? preset.nameZh : preset.name}
              </button>
            ))}
          </div>

          {/* Tracks Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {styleTracks.map((track, i) => (
              <div key={track.id} className="group relative rounded-2xl overflow-hidden" style={{ background: 'white', border: '1px solid var(--border-color)', transitionDelay: `${i * 50}ms` }}>
                <div className="relative aspect-square">
                  <img src={track.cover} alt={track.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => { setActiveTrack(i); setIsPlaying(!isPlaying); }}
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white border-none cursor-pointer"
                      style={{ background: 'var(--music-accent)' }}
                    >
                      {isPlaying && activeTrack === i ? <Pause size={20} /> : <Play size={20} />}
                    </button>
                  </div>
                  <button
                    onClick={() => toggleFavorite(track.id)}
                    className="absolute top-2 right-2 p-1.5 rounded-full bg-black/30 border-none cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {favorites.has(track.id) ? <Heart size={14} className="text-red-400" fill="currentColor" /> : <Heart size={14} className="text-white" />}
                  </button>
                </div>
                <div className="p-3">
                  <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{track.title}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{track.artist}</p>
                  <div className="flex items-center gap-1.5 mt-2">
                    <span className="px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: getGenreColor(track.genre) + '22', color: getGenreColor(track.genre) }}>
                      {lang === 'zh' ? getGenreLabelZh(track.genre) : getGenreLabel(track.genre)}
                    </span>
                    <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{track.bpm} BPM</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-20 px-4 sm:px-6 lg:px-10" style={{ background: 'white' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
              {lang === 'zh' ? '真实案例' : 'REAL CASE STUDIES'}
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
              {lang === 'zh' ? '看看 AI 如何为品牌匹配音乐' : 'See how AI matches music to brands'}
            </h2>
          </div>

          {/* Case Selector */}
          <div className="flex justify-center gap-2 mb-8">
            {cases.map((cs, i) => (
              <button
                key={cs.id}
                onClick={() => setActiveCase(i)}
                className={`px-4 py-2 rounded-full text-xs font-medium cursor-pointer border-none transition-all ${activeCase === i ? 'text-white' : 'text-[var(--text-secondary)]'}`}
                style={{ background: activeCase === i ? 'var(--accent)' : 'rgba(26,43,60,0.06)' }}
              >
                {lang === 'zh' ? cs.industryZh : cs.industry}
              </button>
            ))}
          </div>

          {currentCase && (
            <div className="liquid-glass rounded-3xl overflow-hidden">
              <div className="grid lg:grid-cols-2">
                <div className="p-8 flex flex-col justify-center" style={{ background: currentCase.colorPalette.background }}>
                  <div className="rounded-2xl overflow-hidden shadow-lg mb-4">
                    <img src={currentCase.websiteImage} alt={currentCase.brandName} className="w-full aspect-[4/3] object-cover" />
                  </div>
                  <div className="p-3 rounded-xl flex items-center gap-3" style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,0,0,0.06)' }}>
                    <img src={currentCase.coverImage} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1">
                      <p className="text-xs font-semibold" style={{ color: 'var(--text-primary)' }}>{currentCase.musicTitle}</p>
                      <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{currentCase.musicArtist}</p>
                    </div>
                    <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>{currentCase.musicGenre}</span>
                  </div>
                </div>
                <div className="p-8 flex flex-col justify-center">
                  <h3 className="text-xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{currentCase.brandName}</h3>
                  <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
                    {lang === 'zh' ? currentCase.descriptionZh : currentCase.description}
                  </p>

                  <div className="p-4 rounded-xl mb-6" style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.12)' }}>
                    <p className="text-xs font-semibold mb-1" style={{ color: 'var(--music-accent)' }}>
                      {lang === 'zh' ? 'AI 推荐原因' : 'Why AI recommends this'}
                    </p>
                    <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>
                      {lang === 'zh' ? currentCase.reasoningZh : currentCase.reasoning}
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    {currentCase.metrics.map(m => (
                      <div key={m.label} className="p-3 rounded-xl text-center" style={{ background: 'var(--accent-light)' }}>
                        <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{m.value}</p>
                        <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{m.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[1100px] mx-auto">
          <div className="text-center mb-14">
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
              {lang === 'zh' ? '功能特性' : 'FEATURES'}
            </span>
            <h2 className="mt-3 text-[clamp(1.5rem,3vw,2.25rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
              {lang === 'zh' ? '完整的音乐智能匹配能力' : 'Complete music intelligence capabilities'}
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Brain, title: lang === 'zh' ? 'AI 品牌分析' : 'AI Brand Analysis', desc: lang === 'zh' ? '自动识别行业、品牌调性和目标受众' : 'Automatically identifies industry, brand tone, and target audience' },
              { icon: Palette, title: lang === 'zh' ? '情绪画像' : 'Mood Profiling', desc: lang === 'zh' ? '5 维度品牌情绪雷达图，直观展示品牌特征' : '5-dimension brand mood radar chart, visualizing brand characteristics' },
              { icon: Music, title: lang === 'zh' ? '智能推荐' : 'Smart Recommendation', desc: lang === 'zh' ? '基于品牌画像推荐 3-5 首匹配的背景音乐' : 'Recommends 3-5 matching background tracks based on brand profile' },
              { icon: Mic2, title: lang === 'zh' ? '多风格切换' : 'Style Switching', desc: lang === 'zh' ? '10 种预设风格，一键切换重新匹配音乐' : '10 preset styles, one-click switch to rematch music' },
              { icon: Volume2, title: lang === 'zh' ? '实时试听' : 'Real-time Preview', desc: lang === 'zh' ? '在编辑器中边建站边听音乐，完整体验' : 'Build websites while listening to music in the editor' },
              { icon: Globe, title: lang === 'zh' ? '免版税音乐' : 'Royalty-Free Music', desc: lang === 'zh' ? '精选免版税音乐库，可安全用于商业用途' : 'Curated royalty-free music library, safe for commercial use' },
              { icon: TrendingUp, title: lang === 'zh' ? '效果追踪' : 'Impact Tracking', desc: lang === 'zh' ? '品牌记忆度提升 3 倍，访问时长增加 40%' : 'Brand recall up 3x, visit duration up 40%' },
              { icon: Layers, title: lang === 'zh' ? '页面级配置' : 'Page-Level Config', desc: lang === 'zh' ? '不同页面可配置不同背景音乐' : 'Different pages can have different background music' },
              { icon: Star, title: lang === 'zh' ? '收藏与管理' : 'Library Management', desc: lang === 'zh' ? '收藏喜欢的音乐，查看历史推荐记录' : 'Save favorite tracks, view recommendation history' },
            ].map((f, i) => (
              <div key={i} className="p-5 rounded-2xl" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
                <div className="w-10 h-10 rounded-xl flex items-center justify-center mb-3" style={{ background: 'var(--accent-light)' }}>
                  <f.icon size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <h3 className="text-sm font-semibold mb-1.5" style={{ color: 'var(--text-primary)' }}>{f.title}</h3>
                <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Music Library Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-10" style={{ background: 'white' }}>
        <div className="max-w-[1100px] mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>
                {lang === 'zh' ? '音乐库预览' : 'MUSIC LIBRARY'}
              </span>
              <h2 className="mt-2 text-[clamp(1.25rem,2vw,1.75rem)] font-bold" style={{ color: 'var(--text-primary)' }}>
                {lang === 'zh' ? '18+ 精选免版税曲目' : '18+ Curated Royalty-Free Tracks'}
              </h2>
            </div>
            <span className="text-xs px-3 py-1.5 rounded-full font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>
              {MUSIC_TRACKS.length} {lang === 'zh' ? '首曲目' : 'Tracks'}
            </span>
          </div>

          <div className="space-y-2">
            {MUSIC_TRACKS.slice(0, 8).map((track, i) => (
              <div key={track.id} className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors group" style={{ background: i % 2 === 0 ? 'rgba(26,43,60,0.02)' : 'transparent' }}>
                <span className="text-xs w-5 text-center" style={{ color: 'var(--text-tertiary)' }}>{i + 1}</span>
                <img src={track.cover} alt="" className="w-10 h-10 rounded-lg object-cover" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{track.title}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{track.artist}</p>
                </div>
                <div className="hidden sm:flex items-center gap-1.5">
                  {track.moods.slice(0, 2).map(m => (
                    <span key={m} className="px-1.5 py-0.5 rounded text-[10px]" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>{m}</span>
                  ))}
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-medium" style={{ background: getGenreColor(track.genre) + '18', color: getGenreColor(track.genre) }}>
                  {lang === 'zh' ? getGenreLabelZh(track.genre) : getGenreLabel(track.genre)}
                </span>
                <span className="text-[10px] hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>{track.bpm} BPM</span>
                <span className="text-[10px] hidden sm:block" style={{ color: 'var(--text-tertiary)' }}>{track.duration}</span>
                <button onClick={() => toggleFavorite(track.id)} className="p-1.5 rounded-lg hover:bg-white border-none bg-transparent cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity">
                  {favorites.has(track.id) ? <BookmarkCheck size={14} style={{ color: 'var(--accent)' }} /> : <Bookmark size={14} style={{ color: 'var(--text-tertiary)' }} />}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-[700px] mx-auto text-center">
          <div className="liquid-glass rounded-3xl p-10 sm:p-14">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--accent-light)' }}>
              <Sparkles size={24} style={{ color: 'var(--accent)' }} />
            </div>
            <h2 className="text-2xl font-bold mb-3" style={{ color: 'var(--text-primary)' }}>
              {lang === 'zh' ? '开始打造您的品牌体验' : 'Start building your brand experience'}
            </h2>
            <p className="text-sm mb-6" style={{ color: 'var(--text-secondary)' }}>
              {lang === 'zh' ? '描述您的业务，让 AI 为您建站并匹配完美音乐。' : 'Describe your business and let AI build your site with perfectly matched music.'}
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => navigate('/')} className="btn-primary flex items-center gap-2">
                <Zap size={16} /> {lang === 'zh' ? '立即开始' : 'Get Started'}
              </button>
              <button onClick={() => navigate('/auth?mode=register')} className="btn-ghost">
                {lang === 'zh' ? '创建账户' : 'Create Account'}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 sm:px-6 lg:px-10 border-t" style={{ background: 'var(--canvas-base)', borderColor: 'var(--border-color)' }}>
        <div className="max-w-[1100px] mx-auto flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--accent)' }}>A</div>
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>AutoMatch</span>
          </div>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
            &copy; {new Date().getFullYear()} AutoMatch. {lang === 'zh' ? '保留所有权利。' : 'All rights reserved.'}
          </p>
        </div>
      </footer>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path d="M3 8L6.5 11.5L13 4.5" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
