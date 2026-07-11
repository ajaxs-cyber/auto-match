import { useState } from 'react';
import { useEditor } from '@/hooks/useEditor';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/hooks/useAuth';
import { useLang } from '@/i18n/LanguageContext';
import Paywall from '@/components/Paywall';
import { X, FileCode, Copy, Download, Archive, Check, Lock } from 'lucide-react';

interface Props {
  onClose: () => void;
}

export default function ExportDialog({ onClose }: Props) {
  const { exportWebsite, exportZip } = useEditor();
  const { user, canExport } = useAuth();
  const toast = useToast();
  const { __ } = useLang();
  const [copied, setCopied] = useState(false);

  // Free user or not logged in: show Paywall
  if (!canExport) {
    return <Paywall onClose={onClose} feature="export" />;
  }

  const html = exportWebsite();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(html);
      setCopied(true);
      toast.success(__('export.copied'));
      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error('Failed to copy');
    }
  };

  const handleDownloadHTML = () => {
    const blob = new Blob([html], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'index.html';
    a.click();
    URL.revokeObjectURL(url);
    toast.success('HTML file downloaded');
  };

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ background: 'rgba(26,43,60,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
      <div className="w-full max-w-[640px] bg-white rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
          <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{__('export.title')}</h2>
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}><X size={18} /></button>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-6">
            <button onClick={handleDownloadHTML} className="flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all hover:border-[var(--accent)] hover:shadow-sm bg-transparent" style={{ borderColor: 'var(--border-color)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                <FileCode size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{__('export.html')}</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('export.html.desc')}</p>
              </div>
            </button>
            <button onClick={() => { exportZip(); toast.success('Project exported'); }} className="flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all hover:border-[var(--accent)] hover:shadow-sm bg-transparent" style={{ borderColor: 'var(--border-color)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                <Archive size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{__('export.zip')}</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('export.zip.desc')}</p>
              </div>
            </button>
            <button onClick={handleCopy} className="flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all hover:border-[var(--accent)] hover:shadow-sm bg-transparent" style={{ borderColor: 'var(--border-color)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: copied ? '#d1fae5' : 'var(--accent-light)' }}>
                {copied ? <Check size={18} style={{ color: '#16a34a' }} /> : <Copy size={18} style={{ color: 'var(--accent)' }} />}
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{copied ? __('export.copied') : __('export.copy')}</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('export.copy.desc')}</p>
              </div>
            </button>
            <button onClick={handleDownloadHTML} className="flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all hover:border-[var(--accent)] hover:shadow-sm bg-transparent" style={{ borderColor: 'var(--border-color)' }}>
              <div className="w-10 h-10 rounded-lg flex items-center justify-center" style={{ background: 'var(--accent-light)' }}>
                <Download size={18} style={{ color: 'var(--accent)' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{__('export.draft')}</p>
                <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{__('export.draft.desc')}</p>
              </div>
            </button>
          </div>

          <div>
            <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>{__('export.preview')}</p>
            <div className="rounded-xl overflow-hidden border" style={{ borderColor: 'var(--border-color)' }}>
              <div className="flex items-center gap-1.5 px-3 py-2 border-b" style={{ background: '#f8f8f6', borderColor: 'var(--border-color)' }}>
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#ff5f57' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#febc2e' }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: '#28c840' }} />
                <span className="text-xs ml-2 opacity-40">index.html</span>
              </div>
              <pre className="p-4 text-xs overflow-auto max-h-48" style={{ background: '#0f172a', color: '#e2e8f0' }}>{html.slice(0, 1500)}...</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
