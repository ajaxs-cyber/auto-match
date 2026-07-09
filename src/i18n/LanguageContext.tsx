import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import type { ReactNode } from 'react';
import { t, type Lang } from './translations';

interface LangContextValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  toggleLang: () => void;
  __: (key: string) => string;
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(() => {
    const saved = typeof window !== 'undefined' ? localStorage.getItem('autoMatchLang') : null;
    return (saved === 'zh' ? 'zh' : 'en') as Lang;
  });

  useEffect(() => {
    localStorage.setItem('autoMatchLang', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const setLang = useCallback((l: Lang) => setLangState(l), []);
  const toggleLang = useCallback(() => setLangState(prev => prev === 'en' ? 'zh' : 'en'), []);

  const __ = useCallback((key: string) => {
    return t[lang][key] ?? key;
  }, [lang]);

  return (
    <LangContext.Provider value={{ lang, setLang, toggleLang, __ }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error('useLang must be used within LanguageProvider');
  return ctx;
}
