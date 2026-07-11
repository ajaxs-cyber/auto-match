import { useNavigate } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/i18n/LanguageContext';
import { Lock, Sparkles, ArrowRight, Crown, Check, Star } from 'lucide-react';

interface Props { onClose: () => void; feature?: 'export' | 'music' | 'custom-domain'; }

export default function Paywall({ onClose, feature = 'export' }: Props) {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { __ } = useLang();

  const featureConfig = {
    export: {
      icon: Lock,
      title: __('paywall.export.title'),
      desc: __('paywall.export.desc'),
    },
    music: {
      icon: Star,
      title: __('paywall.music.title'),
      desc: __('paywall.music.desc'),
    },
    'custom-domain': {
      icon: Crown,
      title: __('paywall.customDomain.title'),
      desc: __('paywall.customDomain.desc'),
    },
  };

  const config = featureConfig[feature];
  const Icon = config.icon;

  const proFeatures = [
    __('paywall.proFeature1'),
    __('paywall.proFeature2'),
    __('paywall.proFeature3'),
    __('paywall.proFeature4'),
    __('paywall.proFeature5'),
    __('paywall.proFeature6'),
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
                {__('paywall.pleaseSignIn')}
              </p>
              <button
                onClick={() => navigate('/auth')}
                className="btn-primary text-xs py-2 px-4 inline-flex items-center gap-1.5"
              >
                {__('paywall.signIn')} <ArrowRight size={12} />
              </button>
            </div>
          )}

          {user && user.plan === 'free' && (
            <>
              <div className="mb-4 p-3 rounded-xl text-center" style={{ background: 'var(--accent-light)' }}>
                <p className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                  {__('paywall.currentPlan')}
                </p>
              </div>

              <div className="p-4 rounded-xl mb-4" style={{ background: '#FAFAF8', border: '1px solid var(--border-color)' }}>
                <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>
                  {__('paywall.proPlanIncludes')}
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
                {__('paywall.upgrade')}
              </button>
            </>
          )}

          <button onClick={onClose} className="w-full mt-3 py-2.5 rounded-xl text-xs font-medium bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}>
            {__('paywall.maybeLater')}
          </button>
        </div>
      </div>
    </div>
  );
}
