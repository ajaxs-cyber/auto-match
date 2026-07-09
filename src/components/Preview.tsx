import { useState } from 'react';
import { X, Monitor, Tablet, Smartphone, Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface PreviewProps {
  onClose: () => void;
  onBackToEditor: () => void;
}

export default function Preview({ onClose, onBackToEditor }: PreviewProps) {
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [isPlaying, setIsPlaying] = useState(false);

  const deviceWidths = {
    desktop: '100%',
    tablet: '768px',
    mobile: '375px',
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-white animate-fade-in-scale">
      {/* Toolbar */}
      <div
        className="h-12 flex items-center justify-between px-4 border-b flex-shrink-0"
        style={{
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="flex items-center gap-2">
          <button
            onClick={() => setDevice('desktop')}
            className={`p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors ${
              device === 'desktop' ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Monitor size={18} />
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors ${
              device === 'tablet' ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Tablet size={18} />
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors ${
              device === 'mobile' ? 'text-[var(--accent)]' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Smartphone size={18} />
          </button>
          <div
            className="ml-4 px-4 py-1 rounded-lg text-sm"
            style={{
              background: '#F8F6F0',
              border: '1px solid var(--border-color)',
              color: 'var(--text-secondary)',
            }}
          >
            mycoffeeshop.com
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onBackToEditor}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all border"
            style={{
              background: 'transparent',
              borderColor: 'rgba(26,43,60,0.15)',
              color: 'var(--text-primary)',
            }}
          >
            Edit
          </button>
          <button className="btn-primary py-2 px-5 text-xs">Publish</button>
          <button
            onClick={onClose}
            className="p-2 rounded-lg bg-transparent border-none cursor-pointer ml-2"
            style={{ color: 'var(--text-secondary)' }}
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6" style={{ background: '#F0EEEA' }}>
        <div
          className="mx-auto rounded-2xl overflow-hidden transition-all duration-300"
          style={{
            width: deviceWidths[device],
            maxWidth: '100%',
            minHeight: '600px',
            background: '#F5E6D3',
            boxShadow: 'var(--shadow-lg)',
          }}
        >
          {/* Hero */}
          <div
            className="h-72 flex flex-col items-center justify-center text-center px-8"
            style={{ background: 'linear-gradient(135deg, #6B3A2A, #D4A574)' }}
          >
            <h1 className="text-4xl font-bold text-white">My Coffee Shop</h1>
            <p className="mt-3 text-white/80 text-lg">Welcome to our world of artisanal coffee</p>
            <button className="mt-6 px-6 py-2.5 rounded-full text-sm font-semibold bg-white/20 text-white border border-white/30">
              Explore Menu
            </button>
          </div>

          {/* About */}
          <div className="py-14 px-8 text-center">
            <h2 className="text-2xl font-bold" style={{ color: '#6B3A2A' }}>About Us</h2>
            <p className="mt-3 max-w-md mx-auto text-sm" style={{ color: 'var(--text-secondary)' }}>
              We are passionate about creating the perfect cup of coffee. Every bean is carefully selected and roasted to perfection.
            </p>
          </div>

          {/* Services */}
          <div className="py-12 px-8">
            <h2 className="text-xl font-bold text-center mb-8" style={{ color: '#6B3A2A' }}>Our Services</h2>
            <div className="grid grid-cols-3 gap-4">
              {['Fresh Coffee', 'Pastries', 'Catering'].map((s) => (
                <div key={s} className="p-5 rounded-xl text-center bg-white/50">
                  <div className="w-10 h-10 rounded-lg mx-auto mb-2 flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                    <Play size={16} style={{ color: 'var(--accent)' }} />
                  </div>
                  <p className="text-sm font-medium" style={{ color: '#6B3A2A' }}>{s}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery */}
          <div className="py-12 px-8">
            <h2 className="text-xl font-bold text-center mb-6" style={{ color: '#6B3A2A' }}>Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div
                  key={i}
                  className="aspect-square rounded-lg"
                  style={{ background: `linear-gradient(135deg, hsl(${30 + i * 15}, 40%, ${60 + i * 5}%), hsl(${30 + i * 15}, 30%, ${50 + i * 5}%))` }}
                />
              ))}
            </div>
          </div>

          {/* Music */}
          <div className="py-12 px-8">
            <h2 className="text-xl font-bold text-center mb-4" style={{ color: '#6B3A2A' }}>Our Vibe</h2>
            <div className="max-w-sm mx-auto p-4 rounded-xl flex items-center gap-3 bg-white/60">
              <img
                src="/images/album-autumn-breeze.jpg"
                alt="Album"
                className="w-12 h-12 rounded-lg object-cover"
              />
              <div className="flex-1">
                <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Autumn Breeze</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Whispering Woods</p>
              </div>
              <button className="w-8 h-8 rounded-full flex items-center justify-center text-white border-none cursor-pointer" style={{ background: 'var(--music-accent)' }}>
                <Play size={12} />
              </button>
            </div>
          </div>

          {/* Contact */}
          <div className="py-14 px-8 text-center">
            <h2 className="text-xl font-bold mb-3" style={{ color: '#6B3A2A' }}>Contact Us</h2>
            <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>hello@mycoffeeshop.com</p>
            <p className="text-sm mt-1" style={{ color: 'var(--text-secondary)' }}>+1 (555) 123-4567</p>
          </div>
        </div>
      </div>

      {/* Music Bar */}
      <div
        className="h-14 flex items-center gap-4 px-4 border-t flex-shrink-0"
        style={{
          background: 'white',
          borderColor: 'var(--border-color)',
          boxShadow: '0 -4px 16px rgba(0,0,0,0.04)',
        }}
      >
        <img
          src="/images/album-autumn-breeze.jpg"
          alt="Track"
          className="w-9 h-9 rounded-lg object-cover"
        />
        <div className="flex-shrink-0">
          <p className="text-xs font-medium" style={{ color: 'var(--text-primary)' }}>Autumn Breeze</p>
          <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Whispering Woods</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="p-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
            <SkipBack size={14} />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="w-8 h-8 rounded-full flex items-center justify-center text-white border-none cursor-pointer"
            style={{ background: 'var(--music-accent)' }}
          >
            {isPlaying ? <Pause size={14} /> : <Play size={14} />}
          </button>
          <button className="p-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
            <SkipForward size={14} />
          </button>
        </div>
        <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.08)' }}>
          <div className="h-full rounded-full" style={{ background: 'var(--music-accent)', width: '35%' }} />
        </div>
        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>1:24</span>
        <button className="p-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
          <Volume2 size={14} />
        </button>
      </div>
    </div>
  );
}
