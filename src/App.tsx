import { useState, useCallback } from 'react';
import { EditorProvider, useEditor } from '@/hooks/useEditor';
import { ToastProvider } from '@/hooks/useToast';
import { LanguageProvider } from '@/i18n/LanguageContext';
import LivingCanvas from '@/components/LivingCanvas';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import HowItWorks from '@/sections/HowItWorks';
import WhyMusic from '@/sections/WhyMusic';
import Templates from '@/sections/Templates';
import MusicShowcase from '@/sections/MusicShowcase';
import CaseStudies from '@/sections/CaseStudies';
import Pricing from '@/sections/Pricing';
import CTA from '@/sections/CTA';
import Footer from '@/sections/Footer';
import AnalysisModal from '@/components/AnalysisModal';
import Editor from '@/components/Editor';
import Preview from '@/components/Preview';
import { DEFAULT_TEMPLATES, generateWebsiteFromTemplate, generateEmptyWebsite } from '@/data/templates';

type View = 'landing' | 'editor' | 'preview';

function AppContent() {
  const [view, setView] = useState<View>('landing');
  const [analysisPrompt, setAnalysisPrompt] = useState<string | null>(null);
  const { dispatch } = useEditor();

  const scrollTo = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleGenerate = useCallback((prompt: string) => setAnalysisPrompt(prompt), []);

  const handleCloseAnalysis = useCallback(() => setAnalysisPrompt(null), []);

  const initEditor = useCallback((templateId?: string) => {
    if (templateId) {
      const tpl = DEFAULT_TEMPLATES.find(t => t.id === templateId);
      if (tpl) {
        const site = generateWebsiteFromTemplate(tpl);
        dispatch({ type: 'INIT_WEBSITE', website: site });
      }
    } else {
      const site = generateEmptyWebsite('My Website');
      dispatch({ type: 'INIT_WEBSITE', website: site });
    }
    setAnalysisPrompt(null);
    setView('editor');
  }, [dispatch]);

  const handleSelectTemplate = useCallback((templateId: string) => {
    initEditor(templateId);
  }, [initEditor]);

  const handleUseTemplate = useCallback((templateId: string) => {
    initEditor(templateId);
  }, [initEditor]);

  const handleStart = useCallback(() => {
    initEditor();
  }, [initEditor]);

  const handlePreview = useCallback(() => setView('preview'), []);
  const handleCloseEditor = useCallback(() => setView('landing'), []);
  const handleClosePreview = useCallback(() => setView('editor'), []);
  const handleBackToEditor = useCallback(() => setView('editor'), []);

  return (
    <>
      <LivingCanvas />
      {analysisPrompt && (
        <AnalysisModal prompt={analysisPrompt} onClose={handleCloseAnalysis} onSelectTemplate={handleSelectTemplate} />
      )}
      {view === 'editor' && <Editor onClose={handleCloseEditor} onPreview={handlePreview} />}
      {view === 'preview' && <Preview onClose={handleClosePreview} onBackToEditor={handleBackToEditor} />}
      {view === 'landing' && (
        <div className="relative" style={{ zIndex: 1 }}>
          <Navbar onNavigate={scrollTo} />
          <Hero onGenerate={handleGenerate} />
          <div style={{ background: 'var(--canvas-base)' }}>
            <Features />
            <HowItWorks />
            <WhyMusic />
            <Templates onUseTemplate={handleUseTemplate} />
          </div>
          <MusicShowcase />
          <CaseStudies />
          <div style={{ background: 'var(--canvas-base)' }}>
            <Pricing />
          </div>
          <CTA onStart={handleStart} />
          <Footer />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <LanguageProvider>
      <EditorProvider>
        <ToastProvider>
          <AppContent />
        </ToastProvider>
      </EditorProvider>
    </LanguageProvider>
  );
}
