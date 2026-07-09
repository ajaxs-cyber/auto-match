import { Github, Twitter } from 'lucide-react';

const FOOTER_LINKS = {
  Product: ['Templates', 'Editor', 'Music Library', 'Integrations', 'Changelog'],
  Resources: ['Documentation', 'Tutorials', 'Blog', 'Community'],
  Company: ['About', 'Careers', 'Contact', 'Privacy', 'Terms'],
};

export default function Footer() {
  return (
    <footer
      className="relative py-16 px-6 lg:px-10"
      style={{ background: 'var(--text-primary)', zIndex: 1 }}
    >
      <div className="max-w-[1200px] mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold"
                style={{ background: 'var(--accent)' }}
              >
                A
              </div>
              <span className="text-lg font-semibold text-white">
                AutoMatch
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
              AI-powered websites with perfect music.
            </p>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4
                className="text-xs font-semibold uppercase tracking-widest mb-4"
                style={{ color: 'white' }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="text-sm transition-colors duration-200 hover:text-white"
                      style={{ color: 'rgba(255,255,255,0.6)' }}
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            &copy; 2025 AutoMatch. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="#"
              className="transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <Github size={18} />
            </a>
            <a
              href="#"
              className="transition-colors duration-200 hover:text-white"
              style={{ color: 'rgba(255,255,255,0.5)' }}
            >
              <Twitter size={18} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
