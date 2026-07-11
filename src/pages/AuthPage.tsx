import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/i18n/LanguageContext';
import { Music, Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles, Check } from 'lucide-react';

interface AuthPageProps { onBack?: () => void; }

export default function AuthPage({ onBack }: AuthPageProps) {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const { login, register } = useAuth();
  const { __ } = useLang();
  const defaultMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      let success: boolean;
      if (mode === 'login') {
        success = await login(email, password);
      } else {
        if (!name.trim()) { setError(__('auth.enterName')); setLoading(false); return; }
        success = await register(name, email, password);
      }

      if (success) {
        onBack?.();
      } else {
        setError(__('auth.invalidCredentials'));
      }
    } catch {
      setError(__('auth.error'));
    } finally {
      setLoading(false);
    }
  };

  const features = [
    __('auth.feature1'),
    __('auth.feature2'),
    __('auth.feature3'),
    __('auth.feature4'),
  ];

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--canvas-base)' }}>
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A2B3C 0%, #2D4A5E 50%, #1A2B3C 100%)' }}>
        {/* Animated background */}
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: `${20 + Math.random() * 60}px`,
              height: `${20 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              background: 'radial-gradient(circle, rgba(123,97,255,0.4) 0%, transparent 70%)',
              animation: `float ${3 + Math.random() * 4}s ease-in-out infinite`,
              animationDelay: `${Math.random() * 2}s`,
            }} />
          ))}
        </div>

        <div className="relative z-10">
          <button onClick={() => onBack?.()} className="flex items-center gap-3 cursor-pointer bg-transparent border-none">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ background: 'var(--accent)' }}>A</div>
            <span className="text-xl font-semibold text-white">AutoMatch</span>
          </button>
        </div>

        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            {__('auth.brandingTitle')}
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {__('auth.brandingDesc')}
          </p>
          <div className="space-y-3">
            {features.map((f, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full flex items-center justify-center" style={{ background: 'rgba(123,97,255,0.3)' }}>
                  <Check size={12} className="text-white" />
                </div>
                <span className="text-sm" style={{ color: 'rgba(255,255,255,0.8)' }}>{f}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3">
            <Music size={16} className="text-white/50" />
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {__('auth.footerTag')}
            </span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[400px]">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ background: 'var(--accent)' }}>A</div>
            <span className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>AutoMatch</span>
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {mode === 'login'
              ? __('auth.welcomeBack')
              : __('auth.createAccount')
            }
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            {mode === 'login'
              ? __('auth.signInToAccount')
              : __('auth.startJourney')
            }
          </p>

          {/* Tab Switcher */}
          <div className="flex mb-8 p-0.5 rounded-lg" style={{ background: '#f0eeea' }}>
            <button
              onClick={() => { setMode('login'); setError(''); }}
              className={`flex-1 py-2.5 rounded-md text-xs font-semibold cursor-pointer border-none transition-all ${mode === 'login' ? 'bg-white shadow-sm' : ''}`}
              style={{ color: mode === 'login' ? 'var(--accent)' : 'var(--text-tertiary)' }}
            >
              {__('auth.signInTab')}
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); }}
              className={`flex-1 py-2.5 rounded-md text-xs font-semibold cursor-pointer border-none transition-all ${mode === 'register' ? 'bg-white shadow-sm' : ''}`}
              style={{ color: mode === 'register' ? 'var(--accent)' : 'var(--text-tertiary)' }}
            >
              {__('auth.signUpTab')}
            </button>
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl text-xs" style={{ background: '#FDF0EE', color: 'var(--accent)', border: '1px solid rgba(232,93,76,0.2)' }}>
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {mode === 'register' && (
              <div>
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                  {__('auth.nameLabel')}
                </label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                  <input
                    type="text" value={name} onChange={e => setName(e.target.value)}
                    placeholder={__('auth.namePlaceholder')}
                    className="w-full pl-10 pr-4 py-3 rounded-xl text-sm prop-input"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                {__('auth.emailLabel')}
              </label>
              <div className="relative">
                <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                <input
                  type="email" value={email} onChange={e => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 rounded-xl text-sm prop-input"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                {__('auth.passwordLabel')}
              </label>
              <div className="relative">
                <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }} />
                <input
                  type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  placeholder={__('auth.passwordPlaceholder')}
                  className="w-full pl-10 pr-10 py-3 rounded-xl text-sm prop-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full btn-primary py-3.5 flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Sparkles size={16} />
                  {mode === 'login'
                    ? __('auth.signInButton')
                    : __('auth.createAccountButton')
                  }
                </>
              )}
            </button>
          </form>

          {/* Demo accounts hint */}
          <div className="mt-6 p-3 rounded-xl" style={{ background: 'rgba(123,97,255,0.04)', border: '1px solid rgba(123,97,255,0.12)' }}>
            <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--music-accent)' }}>
              {__('auth.demoAccounts')}
            </p>
            <div className="space-y-1">
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>demo@automatch.com (Pro)</p>
              <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>free@automatch.com (Free)</p>
              <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('auth.demoPasswordHint')}</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </div>
  );
}
