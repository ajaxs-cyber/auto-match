import { useEffect, useState } from 'react';
import { Sparkles, Briefcase, Palette, Layout, Music, X } from 'lucide-react';

interface AnalysisResult {
  industry: string;
  style: string;
  colors: string[];
  structure: string[];
  music: string[];
}

interface AnalysisModalProps {
  prompt: string;
  onClose: () => void;
  onSelectTemplate: (templateId: string) => void;
}

function simulateAnalysis(prompt: string): AnalysisResult {
  const p = prompt.toLowerCase();
  let industry = 'Creative Studio';
  let style = 'Modern, professional';
  let colors = ['#1A1A1A', '#F5F5F5', '#E85D4C', '#8B8B8B'];
  let structure = ['Hero', 'Portfolio', 'About', 'Services', 'Contact'];
  let music = ['Ambient Electronic', 'Cinematic'];

  if (p.includes('coffee') || p.includes('cafe') || p.includes('restaurant') || p.includes('food') || p.includes('bistro') || p.includes('bake') || p.includes('咖啡') || p.includes('餐厅') || p.includes('美食') || p.includes('饮品') || p.includes('烘焙') || p.includes('料理')) {
    industry = 'Coffee Shop & Café';
    style = 'Warm, cozy, artisanal';
    colors = ['#6B3A2A', '#D4A574', '#F5E6D3', '#3D2B1F'];
    structure = ['Hero', 'About', 'Menu', 'Gallery', 'Contact'];
    music = ['Lo-Fi Acoustic', 'Warm Jazz'];
  } else if (p.includes('photo') || p.includes('portfoli') || p.includes('design') || p.includes('art') || p.includes('creative') || p.includes('studio') || p.includes('摄影') || p.includes('设计') || p.includes('作品') || p.includes('艺术') || p.includes('画廊')) {
    industry = 'Creative Studio';
    style = 'Minimal, dramatic, artistic';
    colors = ['#1A1A1A', '#F5F5F5', '#E85D4C', '#8B8B8B'];
    structure = ['Hero', 'Portfolio', 'About', 'Services', 'Contact'];
    music = ['Ambient Electronic', 'Cinematic'];
  } else if (p.includes('tech') || p.includes('startup') || p.includes('saas') || p.includes('app') || p.includes('software') || p.includes('digital') || p.includes('cloud') || p.includes('ai') || p.includes('科技') || p.includes('创业') || p.includes('软件') || p.includes('智能')) {
    industry = 'Tech Startup';
    style = 'Clean, futuristic, innovative';
    colors = ['#0E243C', '#3B82F6', '#10B981', '#F8FAFC'];
    structure = ['Hero', 'Features', 'Pricing', 'Testimonials', 'Contact'];
    music = ['Ambient', 'Electronic'];
  } else if (p.includes('fitness') || p.includes('gym') || p.includes('yoga') || p.includes('health') || p.includes('wellness') || p.includes('sport') || p.includes('workout') || p.includes('健身') || p.includes('运动') || p.includes('瑜伽') || p.includes('健康')) {
    industry = 'Fitness & Wellness';
    style = 'Energetic, vibrant, motivating';
    colors = ['#1A2E1A', '#4ADE80', '#FEF08A', '#FFFFFF'];
    structure = ['Hero', 'Classes', 'Trainers', 'Membership', 'Contact'];
    music = ['Upbeat Electronic', 'Energetic Pop'];
  } else if (p.includes('wedding') || p.includes('marriage') || p.includes('bride') || p.includes('event') || p.includes('party') || p.includes('婚礼') || p.includes('婚庆') || p.includes('活动')) {
    industry = 'Wedding & Events';
    style = 'Elegant, romantic, soft';
    colors = ['#831843', '#FBCFE8', '#FFF1F2', '#FFFFFF'];
    structure = ['Hero', 'Gallery', 'Services', 'Testimonials', 'Contact'];
    music = ['Romantic Piano', 'Soft Strings'];
  } else if (p.includes('law') || p.includes('legal') || p.includes('attorney') || p.includes('firm') || p.includes('律师') || p.includes('法律') || p.includes('事务')) {
    industry = 'Legal Services';
    style = 'Professional, trustworthy, authoritative';
    colors = ['#1E3A5F', '#475569', '#F8FAFC', '#FFFFFF'];
    structure = ['Hero', 'About', 'Team', 'Services', 'Contact'];
    music = ['Classical Orchestra', 'Ambient'];
  } else if (p.includes('fashion') || p.includes('clothing') || p.includes('brand') || p.includes('luxury') || p.includes('style') || p.includes('shop') || p.includes('时尚') || p.includes('服装') || p.includes('品牌') || p.includes('零售')) {
    industry = 'Fashion & Retail';
    style = 'Bold, elegant, trendy';
    colors = ['#171717', '#E11D48', '#FAFAFA', '#FFFFFF'];
    structure = ['Hero', 'Gallery', 'Products', 'About', 'Contact'];
    music = ['Electronic Pop', 'Minimal Beats'];
  } else if (p.includes('education') || p.includes('school') || p.includes('course') || p.includes('learn') || p.includes('teach') || p.includes('train') || p.includes('教育') || p.includes('学校') || p.includes('课程') || p.includes('培训') || p.includes('学习')) {
    industry = 'Education';
    style = 'Warm, trustworthy, structured';
    colors = ['#1E40AF', '#3B82F6', '#F8FAFC', '#FFFFFF'];
    structure = ['Hero', 'Features', 'Courses', 'Team', 'Pricing', 'Contact'];
    music = ['Ambient Piano', 'Gentle Tones'];
  } else if (p.includes('music') || p.includes('band') || p.includes('artist') || p.includes('concert') || p.includes('音乐') || p.includes('乐队') || p.includes('演出')) {
    industry = 'Music & Entertainment';
    style = 'Energetic, bold, expressive';
    colors = ['#0C0C0C', '#A855F7', '#F59E0B', '#FFFFFF'];
    structure = ['Hero', 'Gallery', 'Text', 'Events', 'Contact'];
    music = ['Upbeat Pop', 'Indie Rock'];
  }

  return { industry, style, colors, structure, music };
}

export default function AnalysisModal({ prompt, onClose, onSelectTemplate }: AnalysisModalProps) {
  const [visible, setVisible] = useState(false);
  const [result, setResult] = useState<AnalysisResult | null>(null);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setResult(simulateAnalysis(prompt));
    }, 1500);

    // Trigger entrance animation
    requestAnimationFrame(() => {
      setVisible(true);
    });

    return () => clearTimeout(timer);
  }, [prompt]);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 250);
  };

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-4 transition-opacity duration-300 ${
        visible ? 'opacity-100' : 'opacity-0'
      }`}
      style={{ background: 'rgba(26, 43, 60, 0.6)', backdropFilter: 'blur(8px)' }}
      onClick={handleClose}
    >
      <div
        className={`relative w-full max-w-[600px] max-h-[80vh] overflow-y-auto bg-white rounded-2xl shadow-xl p-8 sm:p-12 transition-all duration-400 ${
          visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}
        style={{ transitionTimingFunction: 'cubic-bezier(0.16, 1, 0.3, 1)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 rounded-full bg-transparent border-none cursor-pointer transition-colors hover:bg-gray-100"
          style={{ color: 'var(--text-tertiary)' }}
        >
          <X size={20} />
        </button>

        {!result ? (
          /* Loading State */
          <div className="text-center py-12">
            <div
              className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-6"
              style={{ background: 'var(--accent-light)' }}
            >
              <Sparkles size={28} style={{ color: 'var(--accent)' }} className="animate-spin" />
            </div>
            <h3 className="text-xl font-semibold" style={{ color: 'var(--text-primary)' }}>
              Analyzing your request...
            </h3>
            <p className="mt-2 text-sm" style={{ color: 'var(--text-secondary)' }}>
              Our AI is studying your description to build the perfect website
            </p>
            {/* Progress bar */}
            <div className="mt-6 max-w-xs mx-auto h-1 rounded-full overflow-hidden" style={{ background: 'var(--accent-light)' }}>
              <div
                className="h-full rounded-full transition-all duration-1000 ease-out"
                style={{ background: 'var(--accent)', width: '60%' }}
              />
            </div>
          </div>
        ) : (
          /* Results */
          <>
            {/* Header */}
            <div className="text-center">
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-5"
                style={{ background: 'var(--accent-light)' }}
              >
                <Sparkles size={28} style={{ color: 'var(--accent)' }} />
              </div>
              <h2
                className="text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Analysis Complete
              </h2>
              <p
                className="mt-2 text-sm"
                style={{ color: 'var(--text-secondary)' }}
              >
                Our AI analyzed your description and generated a personalized
                website plan.
              </p>
            </div>

            {/* Result Cards */}
            <div className="mt-8 space-y-4">
              {/* Industry */}
              <div className="card-surface p-5 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent-light)' }}
                >
                  <Briefcase size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div>
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Industry
                  </span>
                  <p
                    className="mt-1 text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {result.industry}
                  </p>
                </div>
              </div>

              {/* Style */}
              <div className="card-surface p-5 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent-light)' }}
                >
                  <Palette size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Visual Style
                  </span>
                  <p
                    className="mt-1 text-lg font-semibold"
                    style={{ color: 'var(--text-primary)' }}
                  >
                    {result.style}
                  </p>
                  {/* Color swatches */}
                  <div className="flex gap-2 mt-3">
                    {result.colors.map((color) => (
                      <div
                        key={color}
                        className="w-10 h-10 rounded-full border-2"
                        style={{
                          background: color,
                          borderColor: 'rgba(26,43,60,0.1)',
                        }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              </div>

              {/* Structure */}
              <div className="card-surface p-5 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--accent-light)' }}
                >
                  <Layout size={18} style={{ color: 'var(--accent)' }} />
                </div>
                <div className="flex-1">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Website Structure
                  </span>
                  {/* Flow */}
                  <div className="flex flex-wrap items-center gap-2 mt-3">
                    {result.structure.map((item, i) => (
                      <div key={item} className="flex items-center gap-2">
                        <span
                          className="px-3 py-1.5 rounded-lg text-sm font-medium"
                          style={{
                            background: 'var(--accent-light)',
                            color: 'var(--accent)',
                          }}
                        >
                          {item}
                        </span>
                        {i < result.structure.length - 1 && (
                          <span style={{ color: 'var(--text-tertiary)' }}>→</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Music */}
              <div className="card-surface p-5 flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                  style={{ background: 'var(--music-accent-light)' }}
                >
                  <Music size={18} style={{ color: 'var(--music-accent)' }} />
                </div>
                <div className="flex-1">
                  <span
                    className="text-xs font-semibold uppercase tracking-wider"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    Recommended Music
                  </span>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {result.music.map((track) => (
                      <span
                        key={track}
                        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium"
                        style={{
                          background: 'var(--music-accent-light)',
                          color: 'var(--music-accent)',
                        }}
                      >
                        <Music size={14} />
                        {track}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="mt-8 flex gap-3">
              <button
                onClick={handleClose}
                className="btn-ghost flex-1"
              >
                Refine Input
              </button>
              <button
                onClick={() => {
                  setVisible(false);
                  const tplMap: Record<string, string> = {
                    'Coffee Shop & Café': 'tpl-cafe-1', 'Creative Studio': 'tpl-photo-1',
                    'Tech Startup': 'tpl-tech-1', 'Fitness & Wellness': 'tpl-fitness-1',
                    'Wedding & Events': 'tpl-photo-1', 'Legal Services': 'tpl-tech-1',
                    'Fashion & Retail': 'tpl-studio-1', 'Education': 'tpl-tech-1',
                    'Music & Entertainment': 'tpl-photo-1',
                  };
                  setTimeout(() => onSelectTemplate(tplMap[result?.industry] || 'tpl-cafe-1'), 250);
                }}
                className="btn-primary flex-1"
              >
                Open in Editor
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
