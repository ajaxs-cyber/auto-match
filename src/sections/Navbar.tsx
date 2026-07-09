import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface NavbarProps {
  onNavigate: (section: string) => void;
}

export default function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'Templates', section: 'templates' },
    { label: 'How it Works', section: 'how-it-works' },
    { label: 'Music Matching', section: 'music' },
    { label: 'Pricing', section: 'pricing' },
  ];

  const handleNav = (section: string) => {
    onNavigate(section);
    setMobileOpen(false);
  };

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-6 lg:px-10 transition-all duration-300 ${
          scrolled
            ? 'bg-white/95 backdrop-blur-xl border-b border-[rgba(26,43,60,0.06)]'
            : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <button
          onClick={() => handleNav('hero')}
          className="flex items-center gap-3 cursor-pointer bg-transparent border-none"
        >
          <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>
            A
          </div>
          <span className={`text-lg font-semibold transition-colors duration-300 ${scrolled ? 'text-[var(--text-primary)]' : 'text-[#f1f5f9]'}`}>
            AutoMatch
          </span>
        </button>

        {/* Center Nav Links - Desktop */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              key={link.section}
              onClick={() => handleNav(link.section)}
              className={`relative text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none ${
                scrolled
                  ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                  : 'text-[#94a3b8] hover:text-[#f1f5f9]'
              } group`}
            >
              {link.label}
              <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-[var(--accent)] scale-x-0 group-hover:scale-x-100 transition-transform duration-250 origin-left" />
            </button>
          ))}
        </div>

        {/* Right Actions */}
        <div className="hidden md:flex items-center gap-4">
          <button
            className={`text-sm font-medium bg-transparent border-none cursor-pointer transition-colors duration-200 ${
              scrolled ? 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]' : 'text-[#94a3b8] hover:text-[#f1f5f9]'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => handleNav('hero')}
            className="btn-primary py-2.5 px-6"
          >
            Get Started
          </button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
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
              <button
                key={link.section}
                onClick={() => handleNav(link.section)}
                className="text-2xl font-semibold text-[var(--text-primary)] bg-transparent border-none cursor-pointer"
              >
                {link.label}
              </button>
            ))}
            <div className="flex flex-col items-center gap-4 mt-8">
              <button className="text-lg text-[var(--text-secondary)] bg-transparent border-none cursor-pointer">
                Sign In
              </button>
              <button
                onClick={() => handleNav('hero')}
                className="btn-primary"
              >
                Get Started
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
