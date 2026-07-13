import { useState, useMemo } from 'react';
import { useNavigate, useSearchParams } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { useI18n } from '@/hooks/useI18n';
import { Music, Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles, Check, Shield } from 'lucide-react';

function getStrength(pw: string): { score: number; label: string; color: string } {
  let score = 0;
  if (pw.length >= 6) score++;
  if (pw.length >= 10) score++;
  if (/[a-z]/.test(pw) && /[A-Z]/.test(pw)) score++;
  if (/\d/.test(pw)) score++;
  if (/[^a-zA-Z0-9]/.test(pw)) score++;
  if (score <= 1) return { score, label: 'weak', color: '#EF4444' };
  if (score === 2) return { score, label: 'fair', color: '#F59E0B' };
  if (score === 3) return { score, label: 'good', color: '#10B981' };
  return { score, label: 'strong', color: '#10B981' };
}

export default function AuthPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { login, register } = useAuth();
  const { lang } = useI18n();
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

  const t = (zh: string, en: string) => lang === 'zh' ? zh : en;

  const validate = (): boolean => {
    const errs: Record<string, string> = {};
    if (mode === 'register') {
      if (!name.trim()) errs.name = t('请输入姓名', 'Please enter your name');
      else if (name.trim().length < 2) errs.name = t('姓名至少2个字符', 'Name must be at least 2 characters');
    }
    if (!email.trim()) errs.email = t('请输入邮箱', 'Please enter your email');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = t('邮箱格式不正确', 'Invalid email format');
    if (!password) errs.password = t('请输入密码', 'Please enter a password');
    else if (password.length < 6) errs.password = t('密码至少6位', 'Password must be at least 6 characters');
    if (mode === 'register') {
      if (!confirmPassword) errs.confirmPassword = t('请确认密码', 'Please confirm your password');
      else if (password !== confirmPassword) errs.confirmPassword = t('两次密码不一致', 'Passwords do not match');
      if (!agreedTerms) errs.terms = t('请同意服务条款', 'Please agree to the terms');
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
      let success_: boolean;
      if (mode === 'login') {
        success_ = await login(email, password);
      } else {
        success_ = await register(name, email, password);
      }

      if (success_) {
        if (mode === 'register') {
          setSuccess(true);
          setTimeout(() => navigate('/'), 1200);
        } else {
          navigate('/');
        }
      } else {
        setError(t('邮箱或密码错误', 'Invalid email or password'));
      }
    } catch {
      setError(t('发生错误，请重试', 'An error occurred. Please try again.'));
    } finally {
      setLoading(false);
    }
  };

  const clearFieldError = (field: string) => {
    if (fieldErrors[field]) setFieldErrors(prev => { const n = { ...prev }; delete n[field]; return n; });
  };

  const features = [
    t('AI 智能建站 + 音乐匹配', 'AI Website + Music Matching'),
    t('18+ 网站模块组件', '18+ Website Modules'),
    t('可视化编辑器', 'Visual Editor'),
    t('免版税音乐库', 'Royalty-Free Music Library'),
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

  const strengthLabels: Record<string, [string, string]> = {
    weak: [t('弱', 'Weak'), t('密码强度', 'Password strength')],
    fair: [t('一般', 'Fair'), t('密码强度', 'Password strength')],
    good: [t('良好', 'Good'), t('密码强度', 'Password strength')],
    strong: [t('强', 'Strong'), t('密码强度', 'Password strength')],
  };

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: 'var(--canvas-base)' }}>
        <div className="text-center p-12">
          <div className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6" style={{ background: '#D1FAE5' }}>
            <Check size={36} color="#10B981" />
          </div>
          <h2 className="text-2xl font-bold mb-2" style={{ color: 'var(--text-primary)' }}>
            {t('注册成功！正在进入编辑器...', 'Account created! Entering editor...')}
          </h2>
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
          <button onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer bg-transparent border-none">
            <div className="w-10 h-10 rounded-full flex items-center justify-center text-white text-lg font-bold" style={{ background: 'var(--accent)' }}>A</div>
            <span className="text-xl font-semibold text-white">AutoMatch</span>
          </button>
        </div>
        <div className="relative z-10">
          <h2 className="text-3xl font-bold text-white leading-tight mb-4">
            {t('打造视听一体\n的品牌体验', 'Build complete\nbrand experiences')}
          </h2>
          <p className="text-base leading-relaxed mb-8" style={{ color: 'rgba(255,255,255,0.7)' }}>
            {t('AutoMatch 是唯一一个将 AI 网站设计与智能音乐匹配相结合的平台。', 'AutoMatch is the only platform that combines AI website design with intelligent music matching.')}
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
              {t('AI 驱动的音乐智能匹配技术', 'AI-Powered Music Matching Technology')}
            </span>
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
            {mode === 'login' ? t('欢迎回来', 'Welcome back') : t('创建账户', 'Create account')}
          </h1>
          <p className="text-sm mb-8" style={{ color: 'var(--text-secondary)' }}>
            {mode === 'login' ? t('登录您的 AutoMatch 账户', 'Sign in to your AutoMatch account') : t('开始您的品牌体验之旅', 'Start your brand experience journey')}
          </p>

          {/* Tab Switcher */}
          <div className="flex mb-8 p-0.5 rounded-lg" style={{ background: '#f0eeea' }}>
            <button
              onClick={() => { setMode('login'); setError(''); setFieldErrors({}); }}
              className={`flex-1 py-2.5 rounded-md text-xs font-semibold cursor-pointer border-none transition-all ${mode === 'login' ? 'bg-white shadow-sm' : ''}`}
              style={{ color: mode === 'login' ? 'var(--accent)' : 'var(--text-tertiary)' }}
            >
              {t('登录', 'Sign In')}
            </button>
            <button
              onClick={() => { setMode('register'); setError(''); setFieldErrors({}); }}
              className={`flex-1 py-2.5 rounded-md text-xs font-semibold cursor-pointer border-none transition-all ${mode === 'register' ? 'bg-white shadow-sm' : ''}`}
              style={{ color: mode === 'register' ? 'var(--accent)' : 'var(--text-tertiary)' }}
            >
              {t('注册', 'Sign Up')}
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
                  {t('姓名', 'Name')}
                </label>
                {renderInput(<User size={16} />, 'name', 'text', name, setName, t('您的姓名', 'Your name'))}
              </div>
            )}

            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                {t('邮箱', 'Email')}
              </label>
              {renderInput(<Mail size={16} />, 'email', 'email', email, setEmail, 'your@email.com')}
            </div>

            <div>
              <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                {t('密码', 'Password')}
              </label>
              {renderInput(
                <Lock size={16} />, 'password', showPassword ? 'text' : 'password',
                password, setPassword, t('至少 6 位字符', 'At least 6 characters'),
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
                      {strengthLabels[strength.label][1]}: {strengthLabels[strength.label][0]}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {mode === 'register' && (
              <>
                <div>
                  <label className="text-xs font-semibold mb-1.5 block" style={{ color: 'var(--text-secondary)' }}>
                    {t('确认密码', 'Confirm Password')}
                  </label>
                  {renderInput(
                    <Lock size={16} />, 'confirmPassword', showConfirm ? 'text' : 'password',
                    confirmPassword, setConfirmPassword, t('再次输入密码', 'Re-enter your password'),
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
                    {t('我已阅读并同意', 'I agree to the')}{' '}
                    <a href="#" className="underline" style={{ color: 'var(--accent)' }}>{t('服务条款', 'Terms of Service')}</a>
                    {' & '}
                    <a href="#" className="underline" style={{ color: 'var(--accent)' }}>{t('隐私政策', 'Privacy Policy')}</a>
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
                  {mode === 'login' ? t('登录', 'Sign In') : t('创建账户', 'Create Account')}
                </>
              )}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-6 p-3 rounded-xl" style={{ background: 'rgba(123,97,255,0.04)', border: '1px solid rgba(123,97,255,0.12)' }}>
              <p className="text-[10px] font-semibold uppercase tracking-wider mb-1.5" style={{ color: 'var(--music-accent)' }}>
                {t('演示账户', 'Demo Accounts')}
              </p>
              <div className="space-y-1">
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>demo@automatch.com (Pro)</p>
                <p className="text-xs" style={{ color: 'var(--text-secondary)' }}>free@automatch.com (Free)</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{t('密码：任意 6 位以上', 'Password: any 6+ chars')}</p>
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
