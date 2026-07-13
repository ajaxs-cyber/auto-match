import { Github, Twitter } from 'lucide-react';

const FOOTER_LINKS = {
  产品: ['模板中心', '编辑器', '音乐库', '集成'],
  资源: ['使用文档', '教程', '博客', '社区'],
  公司: ['关于我们', '联系我们'],
  法律: ['隐私政策', '使用条款', '音乐授权', '版权声明', '数据政策'],
};

export default function Footer() {
  return (
    <footer className="relative py-16 px-6 lg:px-10" style={{ background: 'var(--text-primary)', zIndex: 1 }}>
      <div className="max-w-[1200px] mx-auto">
        {/* Top Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold" style={{ background: 'var(--accent)' }}>A</div>
              <span className="text-lg font-semibold text-white">AutoMatch</span>
            </div>
            <p className="text-xs leading-relaxed mb-4" style={{ color: 'rgba(255,255,255,0.5)' }}>
              AI 驱动的智能建站与音乐匹配平台。从视觉到听觉，打造完整的品牌体验。
            </p>
            {/* Legal links inline */}
            <div className="flex flex-wrap gap-3">
              {['隐私政策', '使用条款', '音乐授权', '版权声明', '数据政策'].map(link => (
                <a key={link} href="#" className="text-[10px] transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.4)' }}>{link}</a>
              ))}
            </div>
          </div>

          {/* Link Columns */}
          {Object.entries(FOOTER_LINKS).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: 'white' }}>{title}</h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.6)' }}>{link}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4" style={{ borderTop: '1px solid rgba(255,255,255,0.1)' }}>
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            &copy; 2025 AutoMatch. 保留所有权利。 | 所有音乐均为免版税授权 | 数据政策遵循 GDPR 标准
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}><Github size={18} /></a>
            <a href="#" className="transition-colors duration-200 hover:text-white" style={{ color: 'rgba(255,255,255,0.5)' }}><Twitter size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}
