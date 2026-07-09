import { createContext, useContext, useState, useCallback, useRef } from 'react';
import type { ReactNode } from 'react';
import { X, CheckCircle, AlertCircle, Info, Loader2 } from 'lucide-react';

type ToastType = 'success' | 'error' | 'info' | 'loading';

interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
}

interface ToastContextValue {
  toast: (message: string, type?: ToastType, duration?: number) => string;
  dismiss: (id: string) => void;
  success: (message: string) => void;
  error: (message: string) => void;
  info: (message: string) => void;
  loading: (message: string) => string;
}

const ToastContext = createContext<ToastContextValue | null>(null);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);
  const timersRef = useRef<Map<string, ReturnType<typeof setTimeout>>>(new Map());

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
    const timer = timersRef.current.get(id);
    if (timer) { clearTimeout(timer); timersRef.current.delete(id); }
  }, []);

  const toast = useCallback((message: string, type: ToastType = 'info', duration = 3000): string => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
    setToasts(prev => [...prev, { id, message, type, duration }]);
    if (type !== 'loading' && duration > 0) {
      timersRef.current.set(id, setTimeout(() => dismiss(id), duration));
    }
    return id;
  }, [dismiss]);

  const success = useCallback((message: string) => toast(message, 'success', 3000), [toast]);
  const error = useCallback((message: string) => toast(message, 'error', 4000), [toast]);
  const info = useCallback((message: string) => toast(message, 'info', 3000), [toast]);
  const loading = useCallback((message: string) => toast(message, 'loading', 0), [toast]);

  const icons = {
    success: <CheckCircle size={16} className="text-emerald-500" />,
    error: <AlertCircle size={16} className="text-red-500" />,
    info: <Info size={16} className="text-blue-500" />,
    loading: <Loader2 size={16} className="text-[var(--accent)] animate-spin" />,
  };

  return (
    <ToastContext.Provider value={{ toast, dismiss, success, error, info, loading }}>
      {children}
      <div className="fixed top-20 right-4 z-[200] flex flex-col gap-2 max-w-sm">
        {toasts.map(t => (
          <div
            key={t.id}
            className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white shadow-lg border animate-fade-in-up"
            style={{ borderColor: 'rgba(26,43,60,0.08)', animationDuration: '0.3s' }}
          >
            {icons[t.type]}
            <span className="text-sm flex-1" style={{ color: 'var(--text-primary)' }}>{t.message}</span>
            <button
              onClick={() => dismiss(t.id)}
              className="p-1 rounded bg-transparent border-none cursor-pointer hover:bg-gray-100"
              style={{ color: 'var(--text-tertiary)' }}
            >
              <X size={14} />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}
