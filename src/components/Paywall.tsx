import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/hooks/useI18n';
import { Lock, Sparkles, ArrowRight, Crown, Check, Star } from 'lucide-react';

interface Props { onClose: () => void; feature?: 'export' | 'music' | 'custom-domain'; }

export default function Paywall({ onClose, feature = 'export' }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { lang } = useI18n();

  const featureConfig = {
    export: {
      icon: Lock,
      title: lang === 'zh' ? '导出功能需要 Pro 订阅' : 'Export Requires Pro',
      desc: lang === 'zh' ? '免费版可以编辑和预览网站，但导出需要升级到 Pro 计划。' : 'Free plan allows editing and previewing, but exporting requires upgrading to Pro.',
    },
    music: {
      icon: Star,
      title: lang === 'zh' ? '高级音乐功能需要 Pro' : 'Advanced Music Requires Pro',
      desc: lang === 'zh' ? '解锁更多音乐风格、自定义上传和页面级音乐配置。' : 'Unlock more music styles, custom uploads, and page-level music configuration.',
    },
    'custom-domain': {
      icon: Crown,
      title: lang === 'zh' ? '自定义域名需要 Pro' : 'Custom Domain Requires Pro',
      desc: lang === 'zh' ? '使用您自己的域名需要升级到 Pro 计划。' : 'Using your own domain requires upgrading to Pro plan.',
    },
  };

  const config = featureConfig[feature];
  const Icon = config.icon;

  const proFeatures = [
    lang === 'zh' ? '无限导出 HTML/CSS/JS/ZIP' : 'Unlimited HTML/CSS/JS/ZIP exports',
    lang === 'zh' ? '10 种音乐风格切换' : '10 music style presets',
    lang === 'zh' ? '自定义音乐上传' : 'Custom music upload',
    lang === 'zh' ? '页面级音乐配置' : 'Page-level music config',
    lang === 'zh' ? '自定义域名' : 'Custom domain',
    lang === 'zh' ? '无水印导出' : 'No watermark exports',
  ];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4" style={{ background: 'rgba(26,43,60,0.6)', backdropFilter: 'blur(8px)' }} onClick={onClose}>
      <div className="w-full max-w-[460px] bg-white rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="relative p-8 pb-6 text-center" style={{ background: 'linear-gradient(135deg, #1A2B3C 0%, #2D4A5E 100%)' }}>
          <div className="absolute top-3 right-3">
            <button onClick={onClose} className="p-1.5 rounded-lg bg-transparent border-none cursor-pointer" style={{ color: 'rgba(255,255,255,0.5)' }}>✕</button>
          </div>
          <div className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4" style={{ background: 'rgba(232,93,76,0.2)' }}>
            <Icon size={24} className="text-white" />
          </div>
          <h2 className="text-lg font-bold text-white mb-1">{config.title}</h2>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>{config.desc}</p>
        </div>

        {/* Content */}
        <div className="p-6">
          {!user && (
            <div className="mb-4 p-3 rounded-xl text-center" style={{ background: 'var(--accent-light)' }}>
              <p className="text-xs font-medium mb-2" style={{ color: 'var(--accent)' }}>
                {lang === 'zh' ? '请先登录您的账户' : 'Please sign in to your account'}
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
              >
                {lang === 'zh' ? '登录' : 'Sign In'} <ArrowRight size={12} />
              </button>
            </div>
          )}

          {user && user.plan === 'free' && (
            <>
              <div className="mb-4 p-3 rounded-xl text-center" style={{ background: 'var(--accent-light)' }}>
                <p className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                  {lang === 'zh' ? `当前计划：Free — 升级到 Pro 解锁导出` : `Current plan: Free — Upgrade to Pro to unlock exporting`}
                </p>
              </div>

              <div className="p-4 rounded-xl mb-4" style={{ background: '#FAFAF8', border: '1px solid var(--border-color)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {lang === 'zh' ? 'Pro 计划包含' : 'Pro Plan Includes'}
                </p>
                <div className="space-y-2">
                  {proFeatures.map((f, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <Check size={14} style={{ color: 'var(--success)' }} />
                      <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>{f}</span>
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => { /* Simulate upgrade */ }}
                className="w-full py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border-none cursor-pointer"
                style={{ background: 'linear-gradient(135deg, var(--accent), var(--music-accent))', color: 'white' }}
              >
                <Sparkles size={14} />
                {lang === 'zh' ? '升级到 Pro — $12/月' : 'Upgrade to Pro — $12/mo'}
              </button>
            </>
          )}

          <button onClick={onClose} className="w-full mt-3 py-2.5 rounded-xl text-xs font-medium bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}>
            {lang === 'zh' ? '稍后再说' : 'Maybe later'}
          </button>
        </div>
      </div>
    </div>
  );
}
