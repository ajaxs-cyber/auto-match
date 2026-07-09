import { useState } from 'react';
import {
  Undo2,
  Redo2,
  Save,
  Eye,
  ChevronLeft,
  GripVertical,
  Plus,
  Type,
  Image,
  Layout,
  Music,
  MapPin,
  Phone,
  Star,
  Settings,
  Play,
  Pause,
  SkipBack,
  SkipForward,
  Volume2,
  ChevronDown,
} from 'lucide-react';

interface EditorProps {
  onClose: () => void;
  onPreview: () => void;
}

interface Module {
  id: string;
  name: string;
  icon: React.ReactNode;
  visible: boolean;
}

const INITIAL_MODULES: Module[] = [
  { id: '1', name: 'Hero Section', icon: <Layout size={16} />, visible: true },
  { id: '2', name: 'About', icon: <Type size={16} />, visible: true },
  { id: '3', name: 'Services', icon: <Star size={16} />, visible: true },
  { id: '4', name: 'Gallery', icon: <Image size={16} />, visible: true },
  { id: '5', name: 'Music Player', icon: <Music size={16} />, visible: true },
  { id: '6', name: 'Contact', icon: <Phone size={16} />, visible: true },
  { id: '7', name: 'Location', icon: <MapPin size={16} />, visible: false },
];

const MODULE_PALETTE = [
  { name: 'Text Block', icon: <Type size={16} /> },
  { name: 'Image', icon: <Image size={16} /> },
  { name: 'Gallery', icon: <Layout size={16} /> },
  { name: 'Music', icon: <Music size={16} /> },
  { name: 'Contact', icon: <Phone size={16} /> },
  { name: 'Map', icon: <MapPin size={16} /> },
];

const TRACKS = [
  { title: 'Autumn Breeze', artist: 'Whispering Woods', duration: '3:42' },
  { title: 'Sunday Morning', artist: 'Various Artists', duration: '4:15' },
  { title: 'Urban Flow', artist: 'Chillhop Beats', duration: '3:28' },
];

export default function Editor({ onClose, onPreview }: EditorProps) {
  const [modules, setModules] = useState<Module[]>(INITIAL_MODULES);
  const [selectedId, setSelectedId] = useState<string>('1');
  const [musicOpen, setMusicOpen] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [siteTitle, setSiteTitle] = useState('My Coffee Shop');
  const [primaryColor, setPrimaryColor] = useState('#6B3A2A');
  const [accentColor, setAccentColor] = useState('#D4A574');
  const [bgColor, setBgColor] = useState('#F5E6D3');

  const toggleModule = (id: string) => {
    setModules((prev) =>
      prev.map((m) => (m.id === id ? { ...m, visible: !m.visible } : m))
    );
  };

  const selectedModule = modules.find((m) => m.id === selectedId);

  return (
    <div className="fixed inset-0 z-[90] flex flex-col" style={{ background: '#F0EEEA' }}>
      {/* Toolbar */}
      <div
        className="h-12 flex items-center justify-between px-4 border-b flex-shrink-0"
        style={{
          background: 'white',
          borderColor: 'var(--border-color)',
          boxShadow: 'var(--shadow-sm)',
        }}
      >
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-transparent border-none cursor-pointer hover:bg-gray-100 transition-colors"
            style={{ color: 'var(--text-secondary)' }}
          >
            <ChevronLeft size={18} />
          </button>
          <div
            className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ background: 'var(--accent)' }}
          >
            A
          </div>
          <div className="flex items-center gap-1 cursor-pointer">
            <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
              {siteTitle}
            </span>
            <ChevronDown size={14} style={{ color: 'var(--text-tertiary)' }} />
          </div>
          <div className="w-px h-6 mx-1" style={{ background: 'var(--border-color)' }} />
          <button className="p-1.5 rounded-lg bg-transparent border-none cursor-pointer hover:bg-gray-100 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
            <Undo2 size={16} />
          </button>
          <button className="p-1.5 rounded-lg bg-transparent border-none cursor-pointer hover:bg-gray-100 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
            <Redo2 size={16} />
          </button>
          <button className="p-1.5 rounded-lg bg-transparent border-none cursor-pointer hover:bg-gray-100 transition-colors" style={{ color: 'var(--text-tertiary)' }}>
            <Save size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={onPreview}
            className="flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider cursor-pointer transition-all border"
            style={{
              background: 'transparent',
              borderColor: 'rgba(26,43,60,0.15)',
              color: 'var(--text-primary)',
            }}
          >
            <Eye size={14} />
            Preview
          </button>
          <button className="btn-primary py-2 px-5 text-xs">Publish</button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel - Modules */}
        <div
          className="w-[280px] flex-shrink-0 flex flex-col border-r overflow-y-auto"
          style={{
            background: 'white',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="px-4 py-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-tertiary)' }}
            >
              MODULES
            </span>
          </div>

          {/* Module List */}
          <div className="px-3 space-y-1">
            {modules.map((mod) => (
              <div
                key={mod.id}
                onClick={() => setSelectedId(mod.id)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-xl cursor-pointer transition-all border ${
                  selectedId === mod.id
                    ? 'border-2'
                    : 'border-transparent hover:border'
                }`}
                style={{
                  background: selectedId === mod.id ? 'white' : 'transparent',
                  borderColor:
                    selectedId === mod.id
                      ? 'var(--accent)'
                      : 'rgba(26,43,60,0.06)',
                  boxShadow:
                    selectedId === mod.id ? 'var(--shadow-sm)' : 'none',
                }}
              >
                <span style={{ color: 'var(--text-tertiary)' }}>
                  <GripVertical size={14} />
                </span>
                <span style={{ color: 'var(--text-secondary)' }}>{mod.icon}</span>
                <span
                  className="flex-1 text-sm font-medium"
                  style={{
                    color: mod.visible
                      ? 'var(--text-primary)'
                      : 'var(--text-tertiary)',
                    textDecoration: mod.visible ? 'none' : 'line-through',
                  }}
                >
                  {mod.name}
                </span>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleModule(mod.id);
                  }}
                  className="p-1 rounded bg-transparent border-none cursor-pointer"
                  style={{ color: mod.visible ? 'var(--success)' : 'var(--text-tertiary)' }}
                >
                  {mod.visible ? (
                    <div className="w-4 h-4 rounded-full border-2 flex items-center justify-center" style={{ borderColor: 'var(--success)' }}>
                      <div className="w-2 h-2 rounded-full" style={{ background: 'var(--success)' }} />
                    </div>
                  ) : (
                    <div className="w-4 h-4 rounded-full border-2" style={{ borderColor: 'var(--text-tertiary)' }} />
                  )}
                </button>
              </div>
            ))}
          </div>

          {/* Add Module */}
          <div className="px-3 mt-3">
            <button
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium cursor-pointer transition-all border-dashed border"
              style={{
                color: 'var(--text-tertiary)',
                borderColor: 'var(--border-color)',
                background: 'transparent',
              }}
            >
              <Plus size={16} />
              Add Module
            </button>
          </div>

          {/* Module Palette */}
          <div className="px-4 pt-6 pb-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-tertiary)' }}
            >
              ADD MODULE
            </span>
          </div>
          <div className="px-3 pb-4 grid grid-cols-2 gap-2">
            {MODULE_PALETTE.map((item) => (
              <button
                key={item.name}
                className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm cursor-pointer transition-all border hover:shadow-sm bg-transparent"
                style={{
                  borderColor: 'rgba(26,43,60,0.06)',
                  color: 'var(--text-secondary)',
                }}
              >
                {item.icon}
                {item.name}
              </button>
            ))}
          </div>
        </div>

        {/* Center - Preview */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 p-6 overflow-y-auto">
            <div
              className="w-full max-w-[900px] mx-auto rounded-2xl overflow-hidden min-h-[600px]"
              style={{
                background: bgColor,
                boxShadow: 'var(--shadow-lg)',
              }}
            >
              {/* Mock Website Preview */}
              {/* Hero */}
              {modules.find((m) => m.id === '1')?.visible && (
                <div
                  className="h-64 flex flex-col items-center justify-center text-center px-8"
                  style={{ background: `linear-gradient(135deg, ${primaryColor}, ${accentColor})` }}
                >
                  <h1 className="text-3xl font-bold text-white">{siteTitle}</h1>
                  <p className="mt-2 text-white/80">Welcome to our world</p>
                </div>
              )}
              {/* About */}
              {modules.find((m) => m.id === '2')?.visible && (
                <div className="py-12 px-8 text-center">
                  <h2 className="text-2xl font-bold" style={{ color: primaryColor }}>About Us</h2>
                  <p className="mt-3 max-w-md mx-auto text-sm" style={{ color: 'var(--text-secondary)' }}>
                    We are passionate about creating amazing experiences for our customers.
                  </p>
                </div>
              )}
              {/* Services */}
              {modules.find((m) => m.id === '3')?.visible && (
                <div className="py-10 px-8">
                  <h2 className="text-xl font-bold text-center mb-6" style={{ color: primaryColor }}>Our Services</h2>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3].map((i) => (
                      <div key={i} className="p-4 rounded-xl text-center" style={{ background: 'rgba(255,255,255,0.5)' }}>
                        <Star size={20} style={{ color: accentColor, margin: '0 auto' }} />
                        <p className="mt-2 text-xs font-medium" style={{ color: primaryColor }}>Service {i}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
              {/* Gallery */}
              {modules.find((m) => m.id === '4')?.visible && (
                <div className="py-10 px-8">
                  <h2 className="text-xl font-bold text-center mb-6" style={{ color: primaryColor }}>Gallery</h2>
                  <div className="grid grid-cols-3 gap-3">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div
                        key={i}
                        className="aspect-square rounded-lg"
                        style={{ background: `linear-gradient(135deg, ${accentColor}22, ${primaryColor}22)` }}
                      />
                    ))}
                  </div>
                </div>
              )}
              {/* Music */}
              {modules.find((m) => m.id === '5')?.visible && (
                <div className="py-10 px-8">
                  <h2 className="text-xl font-bold text-center mb-4" style={{ color: primaryColor }}>Music</h2>
                  <div
                    className="max-w-sm mx-auto p-4 rounded-xl flex items-center gap-3"
                    style={{ background: 'rgba(255,255,255,0.6)' }}
                  >
                    <div
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{ background: 'var(--music-accent-light)' }}
                    >
                      <Music size={16} style={{ color: 'var(--music-accent)' }} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Autumn Breeze</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Whispering Woods</p>
                    </div>
                    <button
                      className="w-8 h-8 rounded-full flex items-center justify-center text-white border-none cursor-pointer"
                      style={{ background: 'var(--music-accent)' }}
                    >
                      <Play size={12} />
                    </button>
                  </div>
                </div>
              )}
              {/* Contact */}
              {modules.find((m) => m.id === '6')?.visible && (
                <div className="py-10 px-8 text-center">
                  <h2 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>Contact Us</h2>
                  <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>hello@example.com</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div
          className="w-[300px] flex-shrink-0 flex flex-col border-l overflow-y-auto"
          style={{
            background: 'white',
            borderColor: 'var(--border-color)',
          }}
        >
          <div className="px-4 py-3">
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: 'var(--text-tertiary)' }}
            >
              PROPERTIES
            </span>
          </div>

          {selectedModule && (
            <div className="px-4 space-y-5 pb-6">
              {/* Page Info */}
              <div>
                <label
                  className="text-xs font-medium mb-1.5 block"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Site Title
                </label>
                <input
                  type="text"
                  value={siteTitle}
                  onChange={(e) => setSiteTitle(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg text-sm border outline-none transition-all focus:ring-2"
                  style={{
                    background: '#F8F6F0',
                    borderColor: 'var(--border-color)',
                    color: 'var(--text-primary)',
                  }}
                />
              </div>

              {/* Colors */}
              <div>
                <label
                  className="text-xs font-medium mb-2 block"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Colors
                </label>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Primary</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{primaryColor}</span>
                      <input
                        type="color"
                        value={primaryColor}
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border-none cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Accent</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{accentColor}</span>
                      <input
                        type="color"
                        value={accentColor}
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border-none cursor-pointer"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm" style={{ color: 'var(--text-secondary)' }}>Background</span>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{bgColor}</span>
                      <input
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="w-8 h-8 rounded-lg border-none cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Module Settings */}
              <div>
                <label
                  className="text-xs font-medium mb-2 block"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Module: {selectedModule.name}
                </label>
                <div className="space-y-2">
                  <button className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer bg-transparent border transition-all hover:shadow-sm"
                    style={{ borderColor: 'rgba(26,43,60,0.08)', color: 'var(--text-secondary)' }}>
                    <Settings size={14} />
                    Edit Content
                  </button>
                  <button
                    onClick={() => toggleModule(selectedModule.id)}
                    className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-sm cursor-pointer bg-transparent border transition-all hover:shadow-sm"
                    style={{ borderColor: 'rgba(26,43,60,0.08)', color: 'var(--text-secondary)' }}
                  >
                    <Eye size={14} />
                    {selectedModule.visible ? 'Hide' : 'Show'} Module
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Music Panel */}
      <div
        className="flex-shrink-0 border-t transition-all duration-300"
        style={{
          background: 'white',
          borderColor: 'var(--border-color)',
          height: musicOpen ? '200px' : '48px',
        }}
      >
        {/* Collapsed Bar */}
        <div
          className="h-12 flex items-center justify-between px-4 cursor-pointer"
          onClick={() => setMusicOpen(!musicOpen)}
        >
          <div className="flex items-center gap-2">
            <button className="p-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
              {musicOpen ? (
                <ChevronDown size={16} />
              ) : (
                <ChevronLeft size={16} className="rotate-90" />
              )}
            </button>
            <Music size={16} style={{ color: 'var(--music-accent)' }} />
            <span className="text-sm font-medium" style={{ color: 'var(--text-primary)' }}>
              Music Matching
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="px-3 py-1 rounded-full text-xs font-medium"
              style={{ background: 'var(--music-accent-light)', color: 'var(--music-accent)' }}
            >
              {TRACKS[currentTrack].title}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setIsPlaying(!isPlaying);
              }}
              className="w-7 h-7 rounded-full flex items-center justify-center text-white border-none cursor-pointer"
              style={{ background: 'var(--music-accent)' }}
            >
              {isPlaying ? <Pause size={12} /> : <Play size={12} />}
            </button>
          </div>
        </div>

        {/* Expanded Content */}
        {musicOpen && (
          <div className="px-4 pb-4">
            {/* Track List */}
            <div className="flex gap-3 overflow-x-auto pb-2">
              {TRACKS.map((track, i) => (
                <div
                  key={track.title}
                  onClick={() => setCurrentTrack(i)}
                  className={`flex-shrink-0 w-40 p-3 rounded-xl cursor-pointer transition-all border ${
                    currentTrack === i ? 'border-2' : 'border'
                  }`}
                  style={{
                    background: currentTrack === i ? 'var(--music-accent-light)' : 'white',
                    borderColor: currentTrack === i ? 'var(--music-accent)' : 'rgba(26,43,60,0.08)',
                  }}
                >
                  <div
                    className="w-10 h-10 rounded-lg mb-2 flex items-center justify-center"
                    style={{ background: 'var(--music-accent-light)' }}
                  >
                    <Music size={16} style={{ color: 'var(--music-accent)' }} />
                  </div>
                  <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>
                    {track.title}
                  </p>
                  <p className="text-xs truncate" style={{ color: 'var(--text-tertiary)' }}>
                    {track.artist}
                  </p>
                </div>
              ))}
            </div>

            {/* Controls */}
            <div className="flex items-center gap-4 mt-3">
              <button className="p-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <SkipBack size={16} />
              </button>
              <button
                onClick={() => setIsPlaying(!isPlaying)}
                className="w-9 h-9 rounded-full flex items-center justify-center text-white border-none cursor-pointer"
                style={{ background: 'var(--music-accent)' }}
              >
                {isPlaying ? <Pause size={16} /> : <Play size={16} />}
              </button>
              <button className="p-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <SkipForward size={16} />
              </button>
              <div className="flex-1 h-1 rounded-full overflow-hidden" style={{ background: 'rgba(26,43,60,0.08)' }}>
                <div
                  className="h-full rounded-full transition-all"
                  style={{ background: 'var(--music-accent)', width: isPlaying ? `${(Date.now() % 10000) / 100}%` : '30%' }}
                />
              </div>
              <button className="p-1 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
                <Volume2 size={16} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
