import { useState } from 'react';
import { useNavigate } from 'react-router';
import { useEditor } from '@/hooks/useEditor';
import { useAuth } from '@/hooks/useAuth';
import { useToast } from '@/hooks/useToast';
import { useI18n } from '@/hooks/useI18n';
import Paywall from '@/components/Paywall';
import { X, FileCode, Copy, Download, Archive, Check, Lock, Sparkles } from 'lucide-react';

interface Props { onClose: () => void; }

export default function ExportDialog({ onClose }: Props) {
  const navigate = useNavigate();
  const { exportWebsite, exportZip } = useEditor();
  const { isLoggedIn, canExport, user } = useAuth();
  const toast = useToast();
  const { lang } = useI18n();
  const [copied, setCopied] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  const html = exportWebsite();

  const checkExportPermission = (action: () => void) => {
    if (!isLoggedIn) {
      setShowPaywall(true);
      return;
    }
    if (!canExport) {
      setShowPaywall(true);
      return;
    }
    action();
  };

  const handleCopy = async () => {
    checkExportPermission(async () => {
      try {
        await navigator.clipboard.writeText(html);
        setCopied(true);
        toast.success(lang === 'zh' ? '代码已复制' : 'Code copied to clipboard');
        setTimeout(() => setCopied(false), 2000);
      } catch {
        toast.error(lang === 'zh' ? '复制失败' : 'Failed to copy');
      }
    });
  };

  const handleDownloadHTML = () => {
    checkExportPermission(() => {
      const blob = new Blob([html], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'index.html';
      a.click();
      URL.revokeObjectURL(url);
      toast.success(lang === 'zh' ? 'HTML 文件已下载' : 'HTML file downloaded');
    });
  };

  const handleExportZip = () => {
    checkExportPermission(() => {
      exportZip();
      toast.success(lang === 'zh' ? '项目已导出' : 'Project exported');
    });
  };

  return (
    <>
      {showPaywall && <Paywall onClose={() => setShowPaywall(false)} feature="export" />}

      <div className="fixed inset-0 z-[150] flex items-center justify-center p-4" style={{ background: 'rgba(26,43,60,0.5)', backdropFilter: 'blur(4px)' }} onClick={onClose}>
        <div className="w-full max-w-[640px] bg-white rounded-2xl shadow-xl overflow-hidden" onClick={e => e.stopPropagation()}>
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b" style={{ borderColor: 'var(--border-color)' }}>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-bold" style={{ color: 'var(--text-primary)' }}>{lang === 'zh' ? '导出网站' : 'Export Website'}</h2>
              {user && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-medium" style={{ background: user.plan === 'free' ? 'rgba(26,43,60,0.06)' : 'var(--accent-light)', color: user.plan === 'free' ? 'var(--text-tertiary)' : 'var(--accent)' }}>
                  {user.plan === 'free' ? 'Free' : user.plan === 'pro' ? 'Pro' : 'Enterprise'}
                </span>
              )}
            </div>
            <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }}><X size={18} /></button>
          </div>

          {/* Free Plan Notice */}
          {(!isLoggedIn || (user && user.plan === 'free')) && (
            <div className="mx-6 mt-4 p-3 rounded-xl flex items-center gap-3" style={{ background: 'var(--accent-light)' }}>
              <Lock size={16} style={{ color: 'var(--accent)' }} />
              <div className="flex-1">
                <p className="text-xs font-medium" style={{ color: 'var(--accent)' }}>
                  {lang === 'zh' ? '导出功能需要 Pro 订阅' : 'Export requires Pro subscription'}
                </p>
              </div>
              <button onClick={() => setShowPaywall(true)} className="btn-primary text-[10px] py-1.5 px-3 flex items-center gap-1">
                <Sparkles size={10} /> {lang === 'zh' ? '升级' : 'Upgrade'}
              </button>
            </div>
          )}

          {/* Actions */}
          <div className="p-6">
            <div className="grid grid-cols-2 gap-3 mb-6">
              <ExportButton
                icon={<FileCode size={18} style={{ color: 'var(--accent)' }} />}
                title={lang === 'zh' ? '下载 HTML' : 'Download HTML'}
                desc={lang === 'zh' ? '单文件 HTML' : 'Single HTML file'}
                onClick={handleDownloadHTML}
                locked={!canExport}
              />
              <ExportButton
                icon={<Archive size={18} style={{ color: 'var(--accent)' }} />}
                title={lang === 'zh' ? '导出 ZIP' : 'Export ZIP'}
                desc={lang === 'zh' ? '完整项目压缩包' : 'Full project archive'}
                onClick={handleExportZip}
                locked={!canExport}
              />
              <ExportButton
                icon={copied ? <Check size={18} style={{ color: '#16a34a' }} /> : <Copy size={18} style={{ color: 'var(--accent)' }} />}
                title={copied ? (lang === 'zh' ? '已复制!' : 'Copied!') : (lang === 'zh' ? '复制代码' : 'Copy Code')}
                desc={lang === 'zh' ? '复制到剪贴板' : 'Copy to clipboard'}
                onClick={handleCopy}
                locked={!canExport}
                highlight={copied}
              />
              <ExportButton
                icon={<Download size={18} style={{ color: 'var(--accent)' }} />}
                title={lang === 'zh' ? '保存草稿' : 'Save Draft'}
                desc={lang === 'zh' ? '保存到草稿箱' : 'Save to drafts'}
                onClick={handleDownloadHTML}
                locked={!canExport}
              />
            </div>

            {/* Code Preview */}
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>{lang === 'zh' ? '预览' : 'Preview'}</p>
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
    </>
  );
}

function ExportButton({ icon, title, desc, onClick, locked, highlight }: {
  icon: React.ReactNode; title: string; desc: string; onClick: () => void; locked: boolean; highlight?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={locked}
      className={`flex items-center gap-3 p-4 rounded-xl border text-left cursor-pointer transition-all relative overflow-hidden ${
        locked ? 'opacity-60 cursor-not-allowed' : 'hover:border-[var(--accent)] hover:shadow-sm'
      } ${highlight ? '' : ''}`}
      style={{
        borderColor: highlight ? '#16a34a' : 'var(--border-color)',
        background: highlight ? '#f0fdf4' : 'transparent',
      }}
    >
      {locked && (
        <div className="absolute top-2 right-2">
          <Lock size={10} style={{ color: 'var(--text-tertiary)' }} />
        </div>
      )}
      <div className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: highlight ? '#d1fae5' : 'var(--accent-light)' }}>
        {icon}
      </div>
      <div className="min-w-0">
        <p className="text-sm font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{title}</p>
        <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{desc}</p>
      </div>
    </button>
  );
}
