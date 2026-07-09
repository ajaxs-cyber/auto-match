import { useState } from 'react';
import { useEditor } from '@/hooks/useEditor';
import ModuleRenderer from './ModuleRenderer';
import { X, Monitor, Tablet, Smartphone, ChevronLeft, RotateCcw } from 'lucide-react';

interface PreviewProps {
  onClose: () => void;
  onBackToEditor: () => void;
}

export default function Preview({ onClose, onBackToEditor }: PreviewProps) {
  const { state, currentPage } = useEditor();
  const [device, setDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  const deviceWidths = { desktop: '100%', tablet: '768px', mobile: '375px' };
  const deviceIcons = {
    desktop: <Monitor size={16} />,
    tablet: <Tablet size={16} />,
    mobile: <Smartphone size={16} />,
  };

  if (!currentPage) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col bg-[#E8E6E0] animate-fade-in-scale">
      {/* Toolbar */}
      <div className="h-12 flex items-center justify-between px-4 border-b flex-shrink-0" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2">
          <button onClick={onBackToEditor} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer flex items-center gap-1 text-xs" style={{ color: 'var(--text-secondary)' }}>
            <ChevronLeft size={16} /> Editor
          </button>
          <div className="w-px h-5 mx-1" style={{ background: 'var(--border-color)' }} />
          {/* Device toggles */}
          {(['desktop', 'tablet', 'mobile'] as const).map(d => (
            <button key={d} onClick={() => setDevice(d)} className={`p-2 rounded-lg bg-transparent border-none cursor-pointer transition-colors ${device === d ? 'text-[var(--accent)] bg-[var(--accent-light)]' : 'text-[var(--text-tertiary)] hover:bg-gray-100'}`} title={d.charAt(0).toUpperCase() + d.slice(1)}>
              {deviceIcons[d]}
            </button>
          ))}
          <div className="ml-3 px-3 py-1 rounded-lg text-xs" style={{ background: '#F8F6F0', border: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
            {state.website.name.toLowerCase().replace(/\s+/g, '-')}.com
          </div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setDevice('desktop')} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }} title="Refresh">
            <RotateCcw size={14} />
          </button>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }}>
            <X size={18} />
          </button>
        </div>
      </div>

      {/* Preview Content */}
      <div className="flex-1 overflow-y-auto p-6">
        <div
          className="mx-auto rounded-xl overflow-hidden transition-all duration-300 shadow-lg"
          style={{ width: deviceWidths[device], maxWidth: '100%', minHeight: '80vh', background: state.website.colors.background }}
        >
          {currentPage.modules.filter(m => m.visible).map(mod => (
            <ModuleRenderer
              key={mod.id}
              mod={mod}
              colors={state.website.colors}
              fonts={state.website.fonts}
              isSelected={false}
              onClick={() => {}}
            />
          ))}
          {currentPage.modules.filter(m => m.visible).length === 0 && (
            <div className="flex flex-col items-center justify-center h-full py-40 text-center" style={{ color: 'var(--text-tertiary)' }}>
              <Monitor size={48} className="mb-4 opacity-30" />
              <p className="text-lg font-medium">No content to preview</p>
              <p className="text-sm mt-1 opacity-60">Add modules in the editor to see them here</p>
              <button onClick={onBackToEditor} className="btn-primary mt-6">Go to Editor</button>
            </div>
          )}
        </div>
      </div>

      {/* Device indicator */}
      <div className="flex-shrink-0 h-8 flex items-center justify-center border-t" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
        <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
          Previewing on {device.charAt(0).toUpperCase() + device.slice(1)} ({deviceWidths[device]})
        </span>
      </div>
    </div>
  );
}
