import { useNavigate } from 'react-router';
import {
  ArrowLeft, TrendingUp, Users, Clock, Music, MousePointer,
  BarChart3, Star, Activity, Eye, Headphones, Calendar
} from 'lucide-react';

const METRICS = [
  { label: '页面访问', value: '2,847', change: '+12.5%', icon: Eye, color: 'var(--accent)' },
  { label: '平均停留', value: '3:42', change: '+8.3%', icon: Clock, color: 'var(--music-accent)' },
  { label: '音乐播放', value: '1,523', change: '+23.1%', icon: Headphones, color: '#2D8A4E' },
  { label: '商品点击', value: '876', change: '+15.7%', icon: MousePointer, color: '#F59E0B' },
];

const CHART_DATA = [
  { day: '周一', visits: 320, music: 180, clicks: 95 },
  { day: '周二', visits: 410, music: 230, clicks: 120 },
  { day: '周三', visits: 380, music: 210, clicks: 110 },
  { day: '周四', visits: 520, music: 290, clicks: 160 },
  { day: '周五', visits: 480, music: 260, clicks: 140 },
  { day: '周六', visits: 350, music: 190, clicks: 105 },
  { day: '周日', visits: 387, music: 163, clicks: 146 },
];

const MUSIC_MATCH_DATA = [
  { genre: '爵士', match: 92, count: 342 },
  { genre: '氛围', match: 88, count: 289 },
  { genre: '古典', match: 85, count: 198 },
  { genre: '民谣', match: 81, count: 156 },
  { genre: '电子', match: 78, count: 267 },
  { genre: '流行', match: 74, count: 210 },
];

const PAGE_COMPLETION = [
  { page: '首页', rate: 94 },
  { page: '产品页', rate: 78 },
  { page: '关于我们', rate: 65 },
  { page: '联系方式', rate: 82 },
];

export default function DashboardPage() {
  const navigate = useNavigate();
  const maxVisits = Math.max(...CHART_DATA.map(d => d.visits));

  return (
    <div className="min-h-screen" style={{ background: '#F0EFEA' }}>
      {/* Header */}
      <div className="sticky top-0 z-50 h-14 flex items-center justify-between px-6 border-b" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
        <button onClick={() => navigate('/')} className="flex items-center gap-2 text-sm bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          <ArrowLeft size={16} /> 返回首页
        </button>
        <div className="flex items-center gap-3">
          <Calendar size={14} style={{ color: 'var(--text-tertiary)' }} />
          <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>2025年6月 数据概览</span>
        </div>
      </div>

      <div className="max-w-[1100px] mx-auto px-4 py-8">
        {/* Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>数据分析看板</h1>
          <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>追踪网站表现与音乐匹配效果</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {METRICS.map(m => (
            <div key={m.label} className="p-5 rounded-2xl" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: m.color + '15' }}>
                  <m.icon size={16} style={{ color: m.color }} />
                </div>
                <span className="text-xs font-medium px-2 py-0.5 rounded-full" style={{ background: '#d1fae5', color: '#16a34a' }}>{m.change}</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: 'var(--text-primary)' }}>{m.value}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--text-tertiary)' }}>{m.label}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Weekly Traffic Chart */}
          <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>周度流量趋势</h3>
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}><span className="w-2 h-2 rounded-full" style={{ background: 'var(--accent)' }} /> 页面访问</span>
                <span className="flex items-center gap-1 text-[10px]" style={{ color: 'var(--text-tertiary)' }}><span className="w-2 h-2 rounded-full" style={{ background: 'var(--music-accent)' }} /> 音乐播放</span>
              </div>
            </div>
            <div className="flex items-end gap-3 h-40">
              {CHART_DATA.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex gap-0.5 items-end" style={{ height: 120 }}>
                    <div className="flex-1 rounded-t" style={{ height: `${(d.visits / maxVisits) * 100}%`, background: 'var(--accent)', opacity: 0.8 }} />
                    <div className="flex-1 rounded-t" style={{ height: `${(d.music / maxVisits) * 100}%`, background: 'var(--music-accent)', opacity: 0.8 }} />
                  </div>
                  <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{d.day}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Music Match Score */}
          <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>音乐匹配评分</h3>
              <Star size={14} style={{ color: '#F59E0B' }} />
            </div>
            <div className="space-y-4">
              {MUSIC_MATCH_DATA.map(m => (
                <div key={m.genre}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{m.genre}</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium" style={{ color: 'var(--accent)' }}>{m.match}分</span>
                      <span className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{m.count}次</span>
                    </div>
                  </div>
                  <div className="h-2 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
                    <div className="h-full rounded-full" style={{ width: `${m.match}%`, background: m.match > 85 ? 'var(--accent)' : m.match > 75 ? 'var(--music-accent)' : '#F59E0B' }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Page Completion Rate */}
          <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-6">
              <Activity size={14} style={{ color: 'var(--accent)' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>页面完成率</h3>
            </div>
            <div className="space-y-4">
              {PAGE_COMPLETION.map(p => (
                <div key={p.page} className="flex items-center gap-4">
                  <span className="text-xs w-16" style={{ color: 'var(--text-secondary)' }}>{p.page}</span>
                  <div className="flex-1 h-2 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.06)' }}>
                    <div className="h-full rounded-full transition-all" style={{ width: `${p.rate}%`, background: p.rate > 80 ? 'var(--success)' : p.rate > 60 ? 'var(--music-accent)' : 'var(--accent)' }} />
                  </div>
                  <span className="text-xs font-medium w-8 text-right" style={{ color: 'var(--text-primary)' }}>{p.rate}%</span>
                </div>
              ))}
            </div>
          </div>

          {/* Music Engagement */}
          <div className="p-6 rounded-2xl" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
            <div className="flex items-center gap-2 mb-6">
              <Music size={14} style={{ color: 'var(--music-accent)' }} />
              <h3 className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>音乐互动效果</h3>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { label: '音乐开启率', value: '62%', desc: '用户主动开启音乐' },
                { label: '平均播放时长', value: '2:18', desc: '单次音乐播放时长' },
                { label: '收藏转化率', value: '18%', desc: '收藏推荐音乐' },
                { label: '换曲频率', value: '2.3', desc: '平均更换曲目数' },
              ].map(item => (
                <div key={item.label} className="p-3 rounded-xl text-center" style={{ background: '#FAFAF8' }}>
                  <p className="text-lg font-bold" style={{ color: 'var(--accent)' }}>{item.value}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--text-secondary)' }}>{item.label}</p>
                  <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
