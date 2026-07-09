import { useState, useCallback, useRef, useEffect } from 'react';
import { EditorProvider, useEditor } from '@/hooks/useEditor';
import { ToastProvider } from '@/hooks/useToast';
import LivingCanvas from '@/components/LivingCanvas';
import Navbar from '@/sections/Navbar';
import Hero from '@/sections/Hero';
import Features from '@/sections/Features';
import HowItWorks from '@/sections/HowItWorks';
import Templates from '@/sections/Templates';
import MusicShowcase from '@/sections/MusicShowcase';
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
  const contentRef = useRef<HTMLDivElement>(null);

  // Initialize with empty website (hidden)
  useEffect(() => {
    const emptySite = generateEmptyWebsite('My Website');
    dispatch({ type: 'INIT_WEBSITE', website: emptySite });
  }, [dispatch]);

  const scrollToSection = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleGenerate = useCallback((prompt: string) => {
    setAnalysisPrompt(prompt);
  }, []);

  const handleCloseAnalysis = useCallback(() => {
    setAnalysisPrompt(null);
  }, []);

  const handleSelectTemplate = useCallback((templateId: string) => {
    const tpl = DEFAULT_TEMPLATES.find(t => t.id === templateId);
    if (tpl) {
      const site = generateWebsiteFromTemplate(tpl);
      dispatch({ type: 'INIT_WEBSITE', website: site });
      setAnalysisPrompt(null);
      setView('editor');
    }
  }, [dispatch]);

  const handleOpenEditor = useCallback(() => {
    setAnalysisPrompt(null);
    setView('editor');
  }, []);

  const handlePreview = useCallback(() => {
    setView('preview');
  }, []);

  const handleCloseEditor = useCallback(() => {
    setView('landing');
  }, []);

  const handleClosePreview = useCallback(() => {
    setView('editor');
  }, []);

  const handleBackToEditor = useCallback(() => {
    setView('editor');
  }, []);

  const handleUseTemplate = useCallback((templateId: string) => {
    const tpl = DEFAULT_TEMPLATES.find(t => t.id === templateId);
    if (tpl) {
      const site = generateWebsiteFromTemplate(tpl);
      dispatch({ type: 'INIT_WEBSITE', website: site });
      setView('editor');
    }
  }, [dispatch]);

  return (
    <>
      <LivingCanvas />

      {analysisPrompt && (
        <AnalysisModal
          prompt={analysisPrompt}
          onClose={handleCloseAnalysis}
          onOpenEditor={handleOpenEditor}
          onSelectTemplate={handleSelectTemplate}
        />
      )}

      {view === 'editor' && (
        <Editor onClose={handleCloseEditor} onPreview={handlePreview} />
      )}

      {view === 'preview' && (
        <Preview onClose={handleClosePreview} onBackToEditor={handleBackToEditor} />
      )}

      {view === 'landing' && (
        <div ref={contentRef} className="relative" style={{ zIndex: 1 }}>
          <Navbar onNavigate={scrollToSection} />
          <Hero onGenerate={handleGenerate} />
          <div style={{ background: 'var(--canvas-base)' }}>
            <Features />
            <HowItWorks />
            <Templates onUseTemplate={handleUseTemplate} />
          </div>
          <MusicShowcase />
          <div style={{ background: 'var(--canvas-base)' }}>
            <Pricing />
          </div>
          <CTA onStart={() => { const site = generateEmptyWebsite('My Website'); dispatch({ type: 'INIT_WEBSITE', website: site }); setView('editor'); }} />
          <Footer />
        </div>
      )}
    </>
  );
}

export default function App() {
  return (
    <EditorProvider>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </EditorProvider>
  );
}
