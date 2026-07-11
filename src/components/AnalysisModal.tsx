import { useEffect, useState } from 'react';
import { Sparkles, Briefcase, Palette, Layout, Music, X, Activity, Heart } from 'lucide-react';
import { recommend, type LibraryMatch } from '@/lib/music-recommender';

interface AnalysisResult {
  industry: string;
  style: string;
  colors: string[];
  structure: string[];
  musicGenres: string[];
  tracks: LibraryMatch[];
  moodLabel: string;
  moodLabelZh: string;
  bpm: number;
}

interface AnalysisModalProps {
  prompt: string;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

function analyzePrompt(prompt: string): AnalysisResult {
  const p = prompt.toLowerCase();

  // Run music recommendation
  const rec = recommend(prompt);
  const topTracks = rec.libraryMatches.slice(0, 4);
  const musicGenres = [...new Set(topTracks.map(t => t.genre))];

  // Industry matching (10 categories with Chinese+English keywords)
  let industry = 'Creative Studio';
  let style = 'Minimal, dramatic, artistic';
  let colors = ['#1A1A1A', '#F5F5F5', '#E85D4C', '#8B8B8B'];
  let structure = ['Hero', 'Portfolio', 'About', 'Services', 'Contact'];

  if (p.includes('coffee') || p.includes('cafe') || p.includes('restaurant') || p.includes('food') || p.includes('bistro') || p.includes('bake') || p.includes('dining') || p.includes('cookie') || p.includes('咖啡') || p.includes('餐厅') || p.includes('美食') || p.includes('饮品') || p.includes('烘焙') || p.includes('料理') || p.includes('蛋糕') || p.includes('甜品') || p.includes('小吃')) {
    industry = 'Coffee Shop & Café';
    style = 'Warm, cozy, artisanal';
    colors = ['#6B3A2A', '#D4A574', '#F5E6D3', '#3D2B1F'];
    structure = ['Hero', 'About', 'Menu', 'Gallery', 'Contact'];
  } else if (p.includes('photo') || p.includes('portfoli') || p.includes('design') || p.includes('art') || p.includes('creative') || p.includes('studio') || p.includes('摄影') || p.includes('设计') || p.includes('作品') || p.includes('艺术') || p.includes('画廊') || p.includes('插画') || p.includes('手绘')) {
    industry = 'Creative Studio';
    style = 'Minimal, dramatic, artistic';
    colors = ['#1A1A1A', '#F5F5F5', '#E85D4C', '#8B8B8B'];
    structure = ['Hero', 'Portfolio', 'About', 'Services', 'Contact'];
  } else if (p.includes('tech') || p.includes('startup') || p.includes('saas') || p.includes('app') || p.includes('software') || p.includes('digital') || p.includes('cloud') || p.includes('ai') || p.includes('data') || p.includes('科技') || p.includes('创业') || p.includes('软件') || p.includes('智能') || p.includes('互联网') || p.includes('电商') || p.includes('编程')) {
    industry = 'Tech Startup';
    style = 'Clean, futuristic, innovative';
    colors = ['#0E243C', '#3B82F6', '#10B981', '#F8FAFC'];
    structure = ['Hero', 'Features', 'Pricing', 'Testimonials', 'Contact'];
  } else if (p.includes('fitness') || p.includes('gym') || p.includes('yoga') || p.includes('health') || p.includes('wellness') || p.includes('sport') || p.includes('workout') || p.includes('健身') || p.includes('运动') || p.includes('瑜伽') || p.includes('健康') || p.includes('减肥') || p.includes('pliates')) {
    industry = 'Fitness & Wellness';
    style = 'Energetic, vibrant, motivating';
    colors = ['#1A2E1A', '#4ADE80', '#FEF08A', '#FFFFFF'];
    structure = ['Hero', 'Classes', 'Trainers', 'Membership', 'Contact'];
  } else if (p.includes('wedding') || p.includes('marriage') || p.includes('bride') || p.includes('event') || p.includes('party') || p.includes('ceremony') || p.includes('婚礼') || p.includes('婚庆') || p.includes('活动') || p.includes('策划') || p.includes('庆典')) {
    industry = 'Wedding & Events';
    style = 'Elegant, romantic, soft';
    colors = ['#831843', '#FBCFE8', '#FFF1F2', '#FFFFFF'];
    structure = ['Hero', 'Gallery', 'Services', 'Testimonials', 'Contact'];
  } else if (p.includes('law') || p.includes('legal') || p.includes('attorney') || p.includes('firm') || p.includes('court') || p.includes('律师') || p.includes('法律') || p.includes('事务') || p.includes('法务') || p.includes('咨询')) {
    industry = 'Legal Services';
    style = 'Professional, trustworthy, authoritative';
    colors = ['#1E3A5F', '#475569', '#F8FAFC', '#FFFFFF'];
    structure = ['Hero', 'About', 'Team', 'Services', 'Contact'];
  } else if (p.includes('fashion') || p.includes('clothing') || p.includes('brand') || p.includes('luxury') || p.includes('style') || p.includes('shop') || p.includes('retail') || p.includes('stylist') || p.includes('时尚') || p.includes('服装') || p.includes('品牌') || p.includes('零售') || p.includes('潮牌') || p.includes('买手')) {
    industry = 'Fashion & Retail';
    style = 'Bold, elegant, trendy';
    colors = ['#171717', '#E11D48', '#FAFAFA', '#FFFFFF'];
    structure = ['Hero', 'Gallery', 'Products', 'About', 'Contact'];
  } else if (p.includes('education') || p.includes('school') || p.includes('course') || p.includes('learn') || p.includes('teach') || p.includes('train') || p.includes('college') || p.includes('university') || p.includes('教育') || p.includes('学校') || p.includes('课程') || p.includes('培训') || p.includes('学习') || p.includes('大学') || p.includes('辅导')) {
    industry = 'Education';
    style = 'Warm, trustworthy, structured';
    colors = ['#1E40AF', '#3B82F6', '#F8FAFC', '#FFFFFF'];
    structure = ['Hero', 'Features', 'Courses', 'Team', 'Pricing', 'Contact'];
  } else if (p.includes('music') || p.includes('band') || p.includes('artist') || p.includes('concert') || p.includes('singer') || p.includes('album') || p.includes('音乐') || p.includes('乐队') || p.includes('演出') || p.includes('歌手') || p.includes('演唱会')) {
    industry = 'Music & Entertainment';
    style = 'Energetic, bold, expressive';
    colors = ['#0C0C0C', '#A855F7', '#F59E0B', '#FFFFFF'];
    structure = ['Hero', 'Gallery', 'Text', 'Events', 'Contact'];
  } else if (p.includes('hotel') || p.includes('travel') || p.includes('tour') || p.includes('resort') || p.includes('trip') || p.includes('酒店') || p.includes('旅游') || p.includes('旅行') || p.includes('民宿') || p.includes('度假')) {
    industry = 'Hospitality & Travel';
    style = 'Elegant, refreshing, inviting';
    colors = ['#0C4A6E', '#38BDF8', '#F0F9FF', '#FFFFFF'];
    structure = ['Hero', 'Rooms', 'Gallery', 'Amenities', 'Contact'];
  } else if (p.includes('car') || p.includes('auto') || p.includes('vehicle') || p.includes('automotive') || p.includes('汽车') || p.includes('车行') || p.includes('修车')) {
    industry = 'Automotive';
    style = 'Bold, sleek, dynamic';
    colors = ['#1E293B', '#EF4444', '#F8FAFC', '#FFFFFF'];
    structure = ['Hero', 'Showroom', 'Services', 'About', 'Contact'];
  } else if (p.includes('spa') || p.includes('beauty') || p.includes('salon') || p.includes('hair') || p.includes('nail') || p.includes('美业') || p.includes('美容') || p.includes('美发') || p.includes('护肤')) {
    industry = 'Beauty & Wellness';
    style = 'Soft, elegant, luxurious';
    colors = ['#831843', '#EC4899', '#FCE7F3', '#FFFFFF'];
    structure = ['Hero', 'Services', 'Gallery', 'Pricing', 'Contact'];
  } else if (p.includes('realestate') || p.includes('property') || p.includes('house') || p.includes('apartment') || p.includes('房地产') || p.includes('房产') || p.includes('楼盘') || p.includes('中介')) {
    industry = 'Real Estate';
    style = 'Professional, spacious, trustworthy';
    colors = ['#1E3A5F', '#D97706', '#FFFBEB', '#FFFFFF'];
    structure = ['Hero', 'Properties', 'About', 'Team', 'Contact'];
  } else if (p.includes('charity') || p.includes('ngo') || p.includes('volunteer') || p.includes('donation') || p.includes('nonprofit') || p.includes('公益') || p.includes('慈善') || p.includes('志愿者') || p.includes('捐款')) {
    industry = 'Non-Profit';
    style = 'Warm, hopeful, trustworthy';
    colors = ['#065F46', '#22C55E', '#F0FDF4', '#FFFFFF'];
    structure = ['Hero', 'Mission', 'Projects', 'Impact', 'Contact'];
  }

  return {
    industry, style, colors, structure, musicGenres,
    tracks: topTracks,
    moodLabel: rec.textAnalysis.moodLabel,
    moodLabelZh: rec.musicParams.moodLabelZh,
    bpm: rec.musicParams.bpm,
  };
}

const tplMap: Record<string, string> = {
  'Coffee Shop & Café': 'tpl-cafe-1',
  'Creative Studio': 'tpl-photo-1',
  'Tech Startup': 'tpl-tech-1',
  'Fitness & Wellness': 'tpl-fitness-1',
  'Wedding & Events': 'tpl-photo-1',
  'Legal Services': 'tpl-tech-1',
  'Fashion & Retail': 'tpl-studio-1',
  'Education': 'tpl-tech-1',
  'Music & Entertainment': 'tpl-photo-1',
  'Hospitality & Travel': 'tpl-cafe-1',
  'Automotive': 'tpl-tech-1',
  'Beauty & Wellness': 'tpl-studio-1',
  'Real Estate': 'tpl-tech-1',
  'Non-Profit': 'tpl-cafe-1',
};

export default function AnalysisModal({ prompt, onClose, onSelectTemplate }: AnalysisModalProps) {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    const timer = setTimeout(() => {
      setResult(analyzePrompt(prompt));
    }, 1500);

    requestAnimationFrame(() => { setVisible(true); });
    return () => clearTimeout(timer);
  }, [prompt]);

  const handleClose = () => { setVisible(false); setTimeout(onClose, 250); };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
      style={{ background: 'rgba(26, 43, 60, 0.6)', backdropFilter: 'blur(8px)' }}
      onClick={handleClose}
    >
      <div className={`relative w-full max-w-[620px] max-h-[85vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-8 sm:p-10 transition-all duration-400 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={handleClose} className="absolute top-4 right-4 p-2 rounded-full bg-transparent border-none cursor-pointer hover:bg-gray-100" style={{ color: 'var(--text-tertiary)' }}><X size={20} /></button>

        {!result ? (
          <div className="text-center py-12">
            <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: 'var(--accent-light)' }}>
              <Sparkles size={28} style={{ color: 'var(--accent)' }} className="animate-spin" />
            </div>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>Analyzing your request...</h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>Our AI analyzes industry, visual style, and emotional tone to match the perfect music.</p>
            <div className="mt-6 max-w-xs mx-auto h-1 rounded-full overflow-hidden" style={{ background: 'var(--accent-light)' }}>
              <div className="h-full rounded-full transition-all duration-1000 ease-out" style={{ background: 'var(--accent)', width: '60%' }} />
            </div>
          </div>
        ) : (
          <>
            <div className="text-center mb-6">
              <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'var(--accent-light)' }}>
                <Sparkles size={28} style={{ color: 'var(--accent)' }} />
              </div>
              <h2 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>Analysis Complete</h2>
              <p className="mt-1 text-sm" style={{ color: 'var(--text-secondary)' }}>AI detected your industry, visual style, and emotional profile.</p>
            </div>

            <div className="space-y-4">
              {/* Industry + Style */}
              <div className="grid grid-cols-2 gap-4">
                <div className="card-surface p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                    <Briefcase size={18} color="var(--accent)" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Industry</span>
                    <p className="text-base font-semibold" style={{ color: 'var(--text-primary)' }}>{result.industry}</p>
                  </div>
                </div>
                <div className="card-surface p-4 flex items-start gap-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                    <Palette size={18} color="var(--accent)" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Visual Style</span>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{result.style}</p>
                    <div className="flex gap-1.5 mt-2">
                      {result.colors.map(c => <div key={c} className="w-6 h-6 rounded-full border-2" style={{ background: c, borderColor: 'rgba(26,43,60,0.1)' }} title={c} />)}
                    </div>
                  </div>
                </div>
              </div>

              {/* Structure */}
              <div className="card-surface p-4 flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--accent-light)' }}>
                  <Layout size={18} color="var(--accent)" />
                </div>
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Website Structure</span>
                  <div className="flex flex-wrap items-center gap-1.5 mt-2">
                    {result.structure.map((item, i) => (
                      <div key={item} className="flex items-center gap-1.5">
                        <span className="px-2.5 py-1 rounded-lg text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{item}</span>
                        {i < result.structure.length - 1 && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>→</span>}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Music Recommendation */}
              <div className="card-surface p-4" style={{ background: 'rgba(123,97,255,0.04)', border: '1px solid rgba(123,97,255,0.15)' }}>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: 'var(--music-accent-light)' }}>
                    <Music size={18} color="var(--music-accent)" />
                  </div>
                  <div>
                    <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>AI Music Match</span>
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {result.moodLabelZh} · {result.bpm} BPM · {result.musicGenres.join(', ')}
                    </p>
                  </div>
                </div>

                {/* Track list */}
                {result.tracks.length > 0 && (
                  <div className="space-y-2 mt-3 pt-3 border-t" style={{ borderColor: 'rgba(123,97,255,0.12)' }}>
                    {result.tracks.map((track, i) => (
                      <div key={track.id} className="flex items-center gap-3 p-2 rounded-lg" style={{ background: i === 0 ? 'rgba(123,97,255,0.08)' : 'transparent' }}>
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold" style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}>
                          {i + 1}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{track.title} — {track.artist}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className="text-[10px] px-1.5 py-0.5 rounded" style={{ background: '#F0EBFF', color: 'var(--music-accent)' }}>{track.genre}</span>
                            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{track.bpm} BPM</span>
                            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{track.energy > 0.6 ? '高能量' : track.energy > 0.3 ? '中能量' : '低能量'}</span>
                            <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{track.mode === 'major' ? '大调' : '小调'}</span>
                          </div>
                        </div>
                        <div>
                          <span className="text-xs font-bold" style={{ color: i === 0 ? 'var(--music-accent)' : 'var(--text-tertiary)' }}>
                            {Math.round(track.score * 100)}%
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Mood bars */}
              <div className="card-surface p-4 flex items-start gap-3">
                <Activity size={18} style={{ color: 'var(--accent)', marginTop: 2 }} />
                <div className="flex-1">
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Emotional Profile</span>
                  <div className="flex gap-4 mt-2">
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1"><span style={{ color: 'var(--text-secondary)' }}>Valence</span><span style={{ color: 'var(--text-primary)' }}>{Math.round(result.tracks[0]?.valence * 100 || 0)}%</span></div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.round((result.tracks[0]?.valence || 0) * 100)}%`, background: '#10b981' }} />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between text-xs mb-1"><span style={{ color: 'var(--text-secondary)' }}>Arousal</span><span style={{ color: 'var(--text-primary)' }}>{Math.round(result.tracks[0]?.arousal * 100 || 0)}%</span></div>
                      <div className="h-1.5 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
                        <div className="h-full rounded-full" style={{ width: `${Math.round((result.tracks[0]?.arousal || 0) * 100)}%`, background: '#f59e0b' }} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-6 flex gap-3">
              <button onClick={handleClose} className="btn-ghost flex-1 text-xs">Refine Input</button>
              <button
                onClick={() => { setVisible(false); setTimeout(() => onSelectTemplate(tplMap[result?.industry] || 'tpl-cafe-1'), 250); }}
                className="btn-primary flex-1 text-xs flex items-center justify-center gap-2"
              >
                Open in Editor <Sparkles size={14} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
