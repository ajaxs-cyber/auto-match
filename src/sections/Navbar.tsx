import { useState, useEffect } from 'react';
import { Menu, X, Globe, Music } from 'lucide-react';
import { useLang } from '@/i18n/LanguageContext';

interface NavbarProps {
  onNavigate: (section: string) => void;
  onSignIn?: () => void;
  onMusic?: () => void;
}

export default function Navbar({ onNavigate, onSignIn, onMusic }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { lang, toggleLang, __ } = useLang();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: __('nav.templates'), section: 'templates' },
    { label: __('nav.howItWorks'), section: 'how-it-works' },
    { label: __('nav.music'), section: 'music' },
    { label: __('nav.pricing'), section: 'pricing' },
  ];

  const handleNav = (section: string) => { onNavigate(section); setMobileOpen(false); };

  const linkClass = scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]' : 'text-[#94a3b8] hover:text-[#f1f5f9]';

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-xl border-b border-[rgba(26,43,60,0.06)]' : 'bg-transparent'}`}>
        <button onClick={() => handleNav('hero')} className="flex items-center gap-3 cursor-pointer bg-transparent border-none">
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>A</div>
          <span className={`text-lg font-semibold transition-colors duration-300 ${scrolled ? 'text-[var(--text-primary)]' : 'text-[#f1f5f9]'}`}>AutoMatch</span>
        </button>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map(link => (
            <button key={link.section} onClick={() => handleNav(link.section)} className={`relative text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none ${linkClass} group`}>
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center gap-3">
          <button onClick={onMusic} className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium transition-all cursor-pointer border-none ${scrolled ? 'text-[var(--text-primary)] hover:shadow-md' : 'text-[#f1f5f9] hover:bg-white/10'}`}
            style={{ background: scrolled ? 'var(--music-accent-light)' : 'transparent', border: scrolled ? '1px solid rgba(123,97,255,0.2)' : 'none' }}
          >
            <Music size={14} style={{ color: 'var(--music-accent)' }} />
            {__('nav.exploreMusic')}
          </button>
          <button onClick={toggleLang} className={`p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors flex items-center gap-1 ${scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]' : 'text-[#94a3b8] hover:text-[#f1f5f9]'}`} title={lang === 'en' ? 'Switch to Chinese' : '切换到英文'}>
            <Globe size={16} />
            <span className="text-xs font-medium">{lang === 'en' ? '中文' : 'EN'}</span>
          </button>
          <button className={`text-sm font-medium bg-transparent border-none cursor-pointer transition-colors duration-200 ${linkClass}`} onClick={onSignIn}>{__('nav.signIn')}</button>
          <button onClick={() => handleNav('hero')} className="btn-primary py-2.5 px-6">{__('nav.getStarted')}</button>
        </div>

        <button onClick={() => setMobileOpen(!mobileOpen)} className={`md:hidden p-2 bg-transparent border-none cursor-pointer ${scrolled ? 'text-[var(--text-primary)]' : 'text-white'}`}>
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-white md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            {navLinks.map(link => (
              <button key={link.section} onClick={() => handleNav(link.section)} className="text-2xl font-semibold text-[var(--text-primary)] bg-transparent border-none cursor-pointer">{link.label}</button>
            ))}
            <button onClick={toggleLang} className="flex items-center gap-2 text-lg text-[var(--text-secondary)] bg-transparent border-none cursor-pointer">
              <Globe size={18} /> {lang === 'en' ? '切换到中文' : 'Switch to English'}
            </button>
            <div className="flex flex-col items-center gap-4 mt-8">
              <button onClick={onSignIn} className="text-lg text-[var(--text-secondary)] bg-transparent border-none cursor-pointer">{__('nav.signIn')}</button>
              <button onClick={() => handleNav('hero')} className="btn-primary">{__('nav.getStarted')}</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
