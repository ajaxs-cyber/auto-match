import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Menu, X, Globe, LogIn, LogOut, User } from 'lucide-react';
import { useI18n } from '@/hooks/useI18n';
import { useAuth } from '@/hooks/useAuth';

interface NavbarProps { onNavigate: (section: string) => void; }

export default function Navbar({ onNavigate }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const { lang, setLang, t } = useI18n();
  const { user, isLoggedIn, logout } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: t('nav.templates', 'Templates'), section: 'templates' },
    { label: t('nav.howItWorks', 'How it Works'), section: 'how-it-works' },
    { label: t('nav.musicMatching', 'Music Matching'), section: 'music', href: '/music' },
    { label: t('nav.pricing', 'Pricing'), section: 'pricing' },
  ];

  const handleNav = (link: typeof navLinks[0]) => {
    if (link.href) {
      navigate(link.href);
    } else {
      onNavigate(link.section);
    }
    setMobileOpen(false);
  };

  const toggleLang = () => setLang(lang === 'en' ? 'zh' : 'en');

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 transition-all duration-300 ${
        scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-[rgba(26,43,60,0.06)]' : 'bg-transparent'
      }`}>
        {/* Logo */}
        <button onClick={() => navigate('/')} className="flex items-center gap-3 cursor-pointer bg-transparent border-none">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>A</div>
          <span className={`text-lg font-semibold transition-colors duration-300 ${scrolled ? 'text-[var(--text-primary)]' : 'text-[#f1f5f9]'}`}>AutoMatch</span>
        </button>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button key={link.section} onClick={() => handleNav(link)}
              className={`relative text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none ${
                scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]' : 'text-[#94a3b8] hover:text-[#f1f5f9]'
              } group`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-3">
          <button onClick={toggleLang}
            className={`flex items-center gap-1.5 text-sm font-medium bg-transparent border-none cursor-pointer transition-colors duration-200 px-2 py-1 rounded-lg ${
              scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-50' : 'text-[#94a3b8] hover:text-[#f1f5f9]'
            }`}
          >
            <Globe size={14} />
            {lang === 'en' ? '中文' : 'EN'}
          </button>

          {isLoggedIn && user ? (
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className={`flex items-center gap-2 text-sm font-medium bg-transparent border-none cursor-pointer transition-colors px-2 py-1 rounded-lg ${
                  scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-gray-50' : 'text-[#94a3b8] hover:text-[#f1f5f9]'
                }`}
              >
                <div className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold" style={{ background: 'var(--accent)' }}>
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <span className="text-xs">{user.name}</span>
                <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                  user.plan === 'pro' ? 'bg-[var(--accent-light)] text-[var(--accent)]' : user.plan === 'enterprise' ? 'bg-purple-100 text-purple-600' : 'bg-gray-100 text-gray-500'
                }`}>
                  {user.plan === 'free' ? 'Free' : user.plan === 'pro' ? 'Pro' : 'Ent'}
                </span>
              </button>

              {showUserMenu && (
                <div className="absolute right-0 top-full mt-2 w-48 rounded-xl shadow-lg border py-1" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
                  <div className="px-4 py-2 border-b" style={{ borderColor: 'var(--border-color)' }}>
                    <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>{user.name}</p>
                    <p className="text-[10px]" style={{ color: 'var(--text-tertiary)' }}>{user.email}</p>
                  </div>
                  <button onClick={() => { logout(); setShowUserMenu(false); }}
                    className="w-full flex items-center gap-2 px-4 py-2 text-xs bg-transparent border-none cursor-pointer hover:bg-gray-50 text-left"
                    style={{ color: 'var(--text-secondary)' }}
                  >
                    <LogOut size={12} /> {lang === 'zh' ? '退出登录' : 'Sign Out'}
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button onClick={() => navigate('/auth')}
              className={`flex items-center gap-1.5 text-sm font-medium bg-transparent border-none cursor-pointer transition-colors ${
                scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]' : 'text-[#94a3b8] hover:text-[#f1f5f9]'
              }`}
            >
              <LogIn size={14} /> {t('nav.signIn', 'Sign In')}
            </button>
          )}

          <button onClick={() => onNavigate('hero')} className="btn-primary py-2.5 px-5 text-xs">
            {t('nav.getStarted', 'Get Started')}
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button onClick={() => setMobileOpen(!mobileOpen)}
          className={`md:hidden p-2 bg-transparent border-none cursor-pointer ${scrolled ? 'text-[var(--text-primary)]' : 'text-white'}`}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map((link) => (
              <button key={link.section} onClick={() => handleNav(link)}
                className="text-2xl font-semibold text-[var(--text-primary)] bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            {isLoggedIn && user ? (
              <>
                <div className="flex items-center gap-3 py-2">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>
                    {user.name.charAt(0).toUpperCase()}
                  </div>
                  <span className="text-lg text-[var(--text-primary)]">{user.name}</span>
                </div>
                <button onClick={() => { logout(); setMobileOpen(false); }}
                  className="text-lg text-[var(--text-secondary)] bg-transparent border-none cursor-pointer flex items-center gap-2"
                >
                  <LogOut size={18} /> {lang === 'zh' ? '退出登录' : 'Sign Out'}
                </button>
              </>
            ) : (
              <button onClick={() => { navigate('/auth'); setMobileOpen(false); }}
                className="text-lg text-[var(--text-secondary)] bg-transparent border-none cursor-pointer"
              >
                {t('nav.signIn', 'Sign In')}
              </button>
            )}
            <button onClick={toggleLang} className="flex items-center gap-2 text-lg text-[var(--text-secondary)] bg-transparent border-none cursor-pointer">
              <Globe size={18} /> {lang === 'en' ? '切换到中文' : 'Switch to English'}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
