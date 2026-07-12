import { useState, useMemo } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/i18n/LanguageContext';
import { Music, Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles, Check, Shield } from 'lucide-react';

interface AuthPageProps { onBack?: () => void; onEnterEditor?: () => void; }

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'auth.passwordWeak', color: '#EF4444' };
  if (score === 2) return { score, label: 'auth.passwordFair', color: '#F59E0B' };
  if (score === 3) return { score, label: 'auth.passwordGood', color: '#10B981' };
  return { score, label: 'auth.passwordStrong', color: '#10B981' };
}

export default function AuthPage({ onBack, onEnterEditor }: AuthPageProps) {
  const [searchParams] = useState(() => new URLSearchParams(window.location.search));
  const { login, register } = useAuth();
  const { __ } = useLang();
  const defaultMode = searchParams.get('mode') === 'register' ? 'register' : 'login';
  const [mode, setMode] = useState<'login' | 'register'>(defaultMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [agreedTerms, setAgreedTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState(false);

  const strength = useMemo(() => getStrength(password), [password]);

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (mode === 'register') {
      if (!name.trim()) errs.name = __('auth.enterName');
      else if (name.trim().length < 2) errs.name = '姓名至少2个字符';
    }
    if (!email.trim()) errs.email = '请输入邮箱';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = '邮箱格式不正确';
    if (!password) errs.password = '请输入密码';
    else if (password.length < 6) errs.password = '密码至少6位';
    if (mode === 'register') {
      if (!confirmPassword) errs.confirmPassword = '请确认密码';
      else if (password !== confirmPassword) errs.confirmPassword = __('auth.passwordMismatch');
      if (!agreedTerms) errs.terms = '请同意服务条款';
    }
    setFieldErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (!validate()) return;
    setLoading(true);

    try {
      let result: { success: boolean; error?: string };
      if (mode === 'login') {
        result = await login(email, password);
      } else {
        result = await register(name, email, password);
      }

      if (result.success) {
        if (mode === 'register') {
          setSuccess(true);
          setTimeout(() => onEnterEditor?.(), 1200);
        } else {
          onEnterEditor?.();
        }
      } else {
        setError(result.error || __('auth.invalidCredentials'));
      }
    } catch {
      setError(__('auth.error'));
    } finally {
      setLoading(false);
    }
  };

  const clearFieldError = (field: string) => {
    if (fieldErrors[field]) setFieldErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const features = [
    __('auth.feature1'),
    __('auth.feature2'),
    __('auth.feature3'),
    __('auth.feature4'),
  ];

  const renderInput = (
    icon: React.ReactNode, field: string, type: string, value: string,
    setter: (v: string) => void, placeholder: string,
    right?: React.ReactNode
  ) => (
    <div className="relative">
      <div className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'var(--text-tertiary)' }}>{icon}</div>
      <input
        type={type} value={value}
        onChange={e => { setter(e.target.value); clearFieldError(field); }}
        onBlur={() => validate()}
        placeholder={placeholder}
        className="w-full pl-10 pr-4 py-3 rounded-xl text-sm prop-input"
        style={fieldErrors[field] ? { borderColor: '#EF4444' } : undefined}
      />
      {right}
      {fieldErrors[field] && (
        <p className="text-[11px] mt-1" style={{ color: '#EF4444' }}>{fieldErrors[field]}</p>
      )}
    </div>
  );

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--canvas-base)' }}>
        <div className="text-center p-12">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#D1FAE5' }}>
            <Check size={36} color="#10B981" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>{__('auth.registerSuccess')}</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex" style={{ background: 'var(--canvas-base)' }}>
      {/* Left Panel - Branding */}
      <div className="hidden lg:flex lg:w-[45%] flex-col justify-between p-12 relative overflow-hidden" style={{ background: 'linear-gradient(135deg, #1A2B3C 0%, #2D4A5E 50%, #1A2B3C 100%)' }}>
        <div className="absolute inset-0 opacity-20">
          {Array.from({ length: 20 }).map((_, i) => (
            <div key={i} className="absolute rounded-full" style={{
              width: `${20 + Math.random() * 60}px`, height: `${20 + Math.random() * 60}px`,
              left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
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
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">{__('auth.brandingTitle')}</h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>{__('auth.brandingDesc')}</p>
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
            <span className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{__('auth.footerTag')}</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
        <div className="w-full max-w-[420px]">
          <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ background: 'var(--accent)' }}>A</div>
            <span className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>AutoMatch</span>
          </div>

          <h1 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {mode === 'login' ? __('auth.welcomeBack') : __('auth.createAccount')}
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            {mode === 'login' ? __('auth.signInToAccount') : __('auth.startJourney')}
          </p>

          {/* Tab Switcher */}
          <div className="flex mb-8 p-0.5 rounded-lg" style={{ background: '#f0eeea' }}>
            <button
              onClick={() => { setMode('login'); setError(''); setFieldErrors({}); }}
              className={`flex-1 py-2.5 rounded-md text-xs font-semibold cursor-pointer border-none transition-all ${mode === 'login' ? 'bg-white shadow-sm' : ''}`}
              style={{ color: mode === 'login' ? 'var(--accent)' : 'var(--text-tertiary)' }}
            >
              {__('auth.signInTab')}
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); setFieldErrors({}); }}
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
                <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{__('auth.nameLabel')}</label>
                {renderInput(<User size={16} />, 'name', 'text', name, setName, __('auth.namePlaceholder'))}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{__('auth.emailLabel')}</label>
              {renderInput(<Mail size={16} />, 'email', 'email', email, setEmail, 'your@email.com')}
            </div>

            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{__('auth.passwordLabel')}</label>
              {renderInput(
                <Lock size={16} />, 'password', showPassword ? 'text' : 'password',
                password, setPassword, __('auth.passwordPlaceholder'),
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}>
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              )}

              {/* Password strength bar */}
              {mode === 'register' && password.length > 0 && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-1">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="flex-1 h-1 rounded-full transition-colors" style={{
                        background: i <= strength.score ? strength.color : '#E5E7EB',
                      }} />
                    ))}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Shield size={11} style={{ color: strength.color }} />
                    <span className="text-[10px] font-medium" style={{ color: strength.color }}>
                      {__('auth.passwordStrength')}: {__(strength.label)}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>{__('auth.confirmPasswordLabel')}</label>
                  {renderInput(
                    <Lock size={16} />, 'confirmPassword', showConfirm ? 'text' : 'password',
                    confirmPassword, setConfirmPassword, __('auth.confirmPasswordPlaceholder'),
                    <button type="button" onClick={() => setShowConfirm(!showConfirm)} className="absolute right-3 top-1/2 -translate-y-1/2 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}>
                      {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
                    </button>
                  )}
                </div>

                {/* Terms checkbox */}
                <div className="flex items-start gap-2">
                  <input
                    type="checkbox" checked={agreedTerms}
                    onChange={e => { setAgreedTerms(e.target.checked); clearFieldError('terms'); }}
                    className="mt-0.5"
                  />
                  <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>
                    {__('auth.agreeTerms')}{' '}
                    <a href="#" className="underline" style={{ color: 'var(--accent)' }}>{__('auth.termsOfService')}</a>
                    {' '}&{' '}
                    <a href="#" className="underline" style={{ color: 'var(--accent)' }}>{__('auth.privacyPolicy')}</a>
                  </span>
                </div>
                {fieldErrors.terms && (
                  <p className="text-[11px]" style={{ color: '#EF4444' }}>{fieldErrors.terms}</p>
                )}
              </>
            )}

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
                  {mode === 'login' ? __('auth.signInButton') : __('auth.createAccountButton')}
                </>
              )}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-6 p-3 rounded-xl" style={{ background: 'rgba(123,97,255,0.04)', border: '1px solid rgba(123,97,255,0.12)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--music-accent)' }}>{__('auth.demoAccounts')}</p>
              <div className="space-y-1">
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>demo@automatch.com (Pro)</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>free@automatch.com (Free)</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('auth.demoPasswordHint')}</p>
              </div>
            </div>
          )}
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
