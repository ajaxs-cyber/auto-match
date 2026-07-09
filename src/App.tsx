import { useState, useRef, useCallback } from 'react';
import LivingCanvas from './components/LivingCanvas';
import Navbar from './sections/Navbar';
import Hero from './sections/Hero';
import Features from './sections/Features';
import HowItWorks from './sections/HowItWorks';
import Templates from './sections/Templates';
import MusicShowcase from './sections/MusicShowcase';
import Pricing from './sections/Pricing';
import CTA from './sections/CTA';
import Footer from './sections/Footer';
import AnalysisModal from './components/AnalysisModal';
import Editor from './components/Editor';
import Preview from './components/Preview';

type View = 'landing' | 'editor' | 'preview';

export default function App() {
  const [view, setView] = useState<View>('landing');
  const [analysisPrompt, setAnalysisPrompt] = useState<string | null>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const scrollToSection = useCallback((section: string) => {
    if (view !== 'landing') {
      setView('landing');
      setTimeout(() => {
        const el = document.getElementById(section);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      const el = document.getElementById(section);
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [view]);

  const handleGenerate = useCallback((prompt: string) => {
    setAnalysisPrompt(prompt);
  }, []);

  const handleCloseAnalysis = useCallback(() => {
    setAnalysisPrompt(null);
  }, []);

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

  return (
    <>
      {/* Living Canvas Background - always rendered */}
      <LivingCanvas />

      {/* Analysis Modal */}
      {analysisPrompt && (
        <AnalysisModal
          prompt={analysisPrompt}
          onClose={handleCloseAnalysis}
          onOpenEditor={handleOpenEditor}
        />
      )}

      {/* Editor View */}
      {view === 'editor' && (
        <Editor onClose={handleCloseEditor} onPreview={handlePreview} />
      )}

      {/* Preview View */}
      {view === 'preview' && (
        <Preview onClose={handleClosePreview} onBackToEditor={handleBackToEditor} />
      )}

      {/* Landing Page Content */}
      {view === 'landing' && (
        <div ref={contentRef} className="relative" style={{ zIndex: 1 }}>
          <Navbar onNavigate={scrollToSection} />
          <Hero onGenerate={handleGenerate} />

          {/* Content sections on cream background */}
          <div style={{ background: 'var(--canvas-base)' }}>
            <Features />
            <HowItWorks />
            <Templates />
          </div>

          {/* Music showcase with shader visible at edges */}
          <MusicShowcase />

          {/* Back to cream */}
          <div style={{ background: 'var(--canvas-base)' }}>
            <Pricing />
          </div>

          {/* CTA with shader visible */}
          <CTA />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  );
}
