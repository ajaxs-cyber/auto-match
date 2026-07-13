import { useNavigate, useParams } from 'react-router';
import {
  Music, Play, Pause, ArrowLeft, Palette, Target, Heart,
  Sparkles, Clock, Volume2, RefreshCw
} from 'lucide-react';
import { useState } from 'react';
import { MUSIC_TRACKS, getGenreLabelZh, getGenreColor } from '@/data/music';

const DEMO_DATA: Record<string, {
  brand: string; industry: string; industryEn: string;
  desc: string; descEn: string;
  colors: string[]; colorNames: string[];
  font: string; fontEn: string;
  musicId: string; musicReason: string;
  keywords: string[]; layout: string;
}> = {
  skincare: {
    brand: '花颜', industry: '美妆护肤', industryEn: 'Beauty & Skincare',
    desc: '一个以植物精华为核心的护肤品牌，主打自然治愈、温和调理。页面采用柔粉色与白色为主调，搭配自然纹理，传达纯净健康的品牌理念。',
    descEn: 'A plant-based skincare brand focused on natural healing and gentle care. Soft pinks and whites with organic textures convey purity and wellness.',
    colors: ['#F8EDE3', '#E8B4B8', '#A8D8B9', '#FFFFFF', '#5C4B51'],
    colorNames: ['柔粉', '珊瑚', '薄荷绿', '白色', '深棕'],
    font: '思源宋体 + 思源黑体', fontEn: 'Noto Serif + Noto Sans',
    musicId: 'track-4', musicReason: '流畅爵士乐带来精致感和温暖气质，与美妆护肤品牌的高端治愈定位完美契合。温暖而不喧哗的音色不会干扰用户浏览产品细节。',
    keywords: ['治愈', '自然', '精致', '温和', '纯净'],
    layout: '首屏大图 → 品牌故事 → 产品系列 → 成分说明 → 用户评价 → 联系方式',
  },
  pet: {
    brand: '毛茸茸的家', industry: '宠物生活', industryEn: 'Pet Lifestyle',
    desc: '一个关注宠物生活品质的品牌，提供天然宠物食品、定制用品和社区服务。页面使用温暖的橙黄色调，搭配圆润可爱的字体，营造温馨有趣的品牌氛围。',
    descEn: 'A pet lifestyle brand offering natural food, custom accessories, and community services. Warm orange-yellow tones with rounded fonts create a cozy, playful vibe.',
    colors: ['#FFF5E1', '#FFB347', '#A8D8B9', '#FFFFFF', '#6B5B4F'],
    colorNames: ['奶油黄', '暖阳橙', '草绿', '白色', '暖棕'],
    font: '站酷快乐体 + 思源黑体', fontEn: 'ZCOOL KuaiLe + Noto Sans',
    musicId: 'track-11', musicReason: '乐观的商务音乐建立信心和动力，与宠物生活品牌的温馨可靠调性相符。轻快但不喧闹的旋律传达"放心选择"的品牌承诺。',
    keywords: ['温馨', '有趣', '可靠', '天然', '陪伴'],
    layout: '首屏互动 → 服务介绍 → 产品展示 → 养宠知识 → 社区故事 → 预约服务',
  },
  cultural: {
    brand: '墨韵', industry: '传统文创', industryEn: 'Cultural & Creative',
    desc: '一个融合传统文化与现代设计的文创品牌，主营手工艺品、文化周边和体验课程。页面采用宣纸白与墨色为主调，点缀朱红，展现东方美学的雅致与韵味。',
    descEn: 'A cultural creative brand blending traditional heritage with modern design. Rice-paper white and ink black with vermillion accents showcase Eastern aesthetics.',
    colors: ['#F7F3E9', '#2C2C2C', '#C73E3A', '#FFFFFF', '#8B7355'],
    colorNames: ['宣纸白', '墨色', '朱红', '白色', '古铜'],
    font: '方正清刻本悦宋 + 思源黑体', fontEn: 'FZ QingKe BenYueSong + Noto Sans',
    musicId: 'track-17', musicReason: '真实民谣音乐搭配手工温暖质感，与文创品牌的手工艺和传统文化内核相呼应。自然朴素的音色强化了"匠心传承"的品牌故事。',
    keywords: ['雅致', '传统', '匠心', '文创', '美学'],
    layout: '首屏意境 → 品牌渊源 → 匠人手记 → 产品系列 → 文化课程 → 联络我们',
  },
};

export default function DemoPage() {
  const navigate = useNavigate();
  const { industry } = useParams<{ industry: string }>();
  const [isPlaying, setIsPlaying] = useState(false);
  const data = industry ? DEMO_DATA[industry] : null;
  const track = data ? MUSIC_TRACKS.find(t => t.id === data.musicId) : null;

  if (!data || !track) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--canvas-base)' }}>
        <div className="text-center">
          <p className="text-lg mb-4" style={{ color: 'var(--text-primary)' }}>示例页面不存在</p>
          <button onClick={() => navigate('/')} className="btn-primary">返回首页</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen" style={{ background: 'var(--canvas-base)' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 h-14 flex items-center justify-between px-6 border-b" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> 返回首页
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-1 rounded-full font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{data.industry}</span>
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{data.brand}</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-10">
        {/* Brand Overview */}
        <div className="liquid-glass rounded-3xl p-8 mb-8">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="flex-1">
              <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{data.industryEn}</span>
              <h1 className="text-3xl font-bold mt-2 mb-3" style={{ color: 'var(--text-primary)' }}>{data.brand}</h1>
              <p className="text-sm leading-relaxed mb-4" style={{ color: 'var(--text-secondary)' }}>{data.desc}</p>

              {/* Keywords */}
              <div className="flex flex-wrap gap-2 mb-4">
                {data.keywords.map(k => (
                  <span key={k} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{k}</span>
                ))}
              </div>

              {/* Colors */}
              <div className="flex items-center gap-3 mb-3">
                <Palette size={14} style={{ color: 'var(--text-tertiary)' }} />
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>品牌配色：</span>
                <div className="flex gap-1.5">
                  {data.colors.map((c, i) => (
                    <div key={i} className="group relative">
                      <div className="w-6 h-6 rounded-full border" style={{ background: c, borderColor: 'rgba(0,0,0,0.1)' }} />
                      <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] whitespace-nowrap opacity-0 group-hover:opacity-100" style={{ color: 'var(--text-tertiary)' }}>{data.colorNames[i]}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Font */}
              <div className="flex items-center gap-3">
                <Target size={14} style={{ color: 'var(--text-tertiary)' }} />
                <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>字体方案：{data.font}</span>
              </div>
            </div>

            {/* Music Match Card */}
            <div className="flex-1 max-w-md">
              <div className="p-5 rounded-2xl" style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.15)' }}>
                <div className="flex items-center gap-2 mb-3">
                  <Music size={14} style={{ color: 'var(--music-accent)' }} />
                  <span className="text-xs font-semibold" style={{ color: 'var(--music-accent)' }}>AI 音乐匹配</span>
                </div>

                <div className="flex items-center gap-3 mb-3">
                  <div className="relative">
                    <img src={track.cover} alt={track.title} className="w-14 h-14 rounded-xl object-cover" />
                    <button onClick={() => setIsPlaying(!isPlaying)} className="absolute inset-0 flex items-center justify-center bg-black/30 rounded-xl border-none cursor-pointer">
                      {isPlaying ? <Pause size={16} className="text-white" /> : <Play size={16} className="text-white ml-0.5" />}
                    </button>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{track.title}</p>
                    <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{track.artist}</p>
                    <span className="inline-block mt-1 px-1.5 py-0.5 rounded text-[10px] font-medium" style={{ background: getGenreColor(track.genre) + '22', color: getGenreColor(track.genre) }}>{getGenreLabelZh(track.genre)}</span>
                  </div>
                </div>

                {/* Match Reason */}
                <div className="p-3 rounded-xl mb-3" style={{ background: 'rgba(123,97,255,0.08)' }}>
                  <p className="text-[10px] font-semibold uppercase tracking-wider mb-1" style={{ color: 'var(--music-accent)' }}>匹配理由</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{data.musicReason}</p>
                </div>

                {/* Music Controls Info */}
                <div className="grid grid-cols-2 gap-2 text-[10px]" style={{ color: 'var(--text-tertiary)' }}>
                  <div className="flex items-center gap-1"><Clock size={10} /> 默认不自动播放</div>
                  <div className="flex items-center gap-1"><Volume2 size={10} /> 支持音量调节</div>
                  <div className="flex items-center gap-1"><RefreshCw size={10} /> 支持更换曲目</div>
                  <div className="flex items-center gap-1"><Heart size={10} /> 用户主动触发</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page Structure */}
        <div className="liquid-glass rounded-3xl p-8 mb-8">
          <h2 className="text-lg font-bold mb-4" style={{ color: 'var(--text-primary)' }}>页面结构</h2>
          <div className="flex flex-wrap items-center gap-2">
            {data.layout.split(' → ').map((step, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="px-3 py-2 rounded-lg text-xs font-medium" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{step}</span>
                {i < data.layout.split(' → ').length - 1 && <span style={{ color: 'var(--text-tertiary)' }}>→</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Color Preview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          {data.colors.slice(0, 3).map((c, i) => (
            <div key={i} className="rounded-2xl overflow-hidden" style={{ background: c, minHeight: 120 }}>
              <div className="p-4">
                <p className="text-xs font-semibold" style={{ color: i === 0 || i === 2 ? 'var(--text-primary)' : 'white' }}>{data.colorNames[i]}</p>
                <p className="text-[10px] opacity-60" style={{ color: i === 0 || i === 2 ? 'var(--text-primary)' : 'white' }}>{c}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Mood Profile */}
        <div className="liquid-glass rounded-3xl p-8">
          <h2 className="text-lg font-bold mb-6" style={{ color: 'var(--text-primary)' }}>品牌情绪画像</h2>
          <div className="grid grid-cols-5 gap-4">
            {[
              { label: '温暖度', val: industry === 'skincare' ? 85 : industry === 'pet' ? 90 : 65 },
              { label: '活力值', val: industry === 'skincare' ? 40 : industry === 'pet' ? 75 : 50 },
              { label: '专业度', val: industry === 'skincare' ? 70 : industry === 'pet' ? 60 : 80 },
              { label: '创意值', val: industry === 'skincare' ? 55 : industry === 'pet' ? 70 : 90 },
              { label: '精致度', val: industry === 'skincare' ? 90 : industry === 'pet' ? 50 : 85 },
            ].map(d => (
              <div key={d.label} className="text-center">
                <div className="relative w-16 h-16 mx-auto mb-2">
                  <svg className="w-16 h-16 -rotate-90" viewBox="0 0 64 64">
                    <circle cx="32" cy="32" r="26" fill="none" stroke="rgba(26,43,60,0.08)" strokeWidth="4" />
                    <circle cx="32" cy="32" r="26" fill="none" stroke={d.val > 70 ? 'var(--accent)' : d.val > 50 ? 'var(--music-accent)' : 'var(--text-tertiary)'} strokeWidth="4" strokeDasharray={`${(d.val / 100) * 163.3} 163.3`} strokeLinecap="round" />
                  </svg>
                  <span className="absolute inset-0 flex items-center justify-center text-sm font-bold" style={{ color: 'var(--text-primary)' }}>{d.val}</span>
                </div>
                <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{d.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
