import { useState, useCallback } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router';
import { EditorProvider, useEditor } from '@/hooks/useEditor';
import { ToastProvider } from '@/hooks/useToast';
import { I18nProvider } from '@/hooks/useI18n';
import { AuthProvider, useAuth } from '@/hooks/useAuth';
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
import MusicPage from '@/pages/MusicPage';
import AuthPage from '@/pages/AuthPage';
import DemoPage from '@/pages/DemoPage';
import DashboardPage from '@/pages/DashboardPage';
import { DEFAULT_TEMPLATES, generateWebsiteFromTemplate, generateEmptyWebsite } from '@/data/templates';

type View = 'landing' | 'editor' | 'preview';

function LandingPage() {
  const [view, setView] = useState<View>('landing');
  const [analysisPrompt, setAnalysisPrompt] = useState<string | null>(null);
  const { dispatch } = useEditor();
  const navigate = useNavigate();

  const scrollTo = useCallback((section: string) => {
    const el = document.getElementById(section);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }, []);

  const handleGenerate = useCallback((prompt: string) => setAnalysisPrompt(prompt), []);
  const handleCloseAnalysis = useCallback(() => setAnalysisPrompt(null), []);

  const handleSelectTemplate = useCallback((templateId: string) => {
    const tpl = DEFAULT_TEMPLATES.find(t => t.id === templateId);
    if (tpl) {
      const site = generateWebsiteFromTemplate(tpl);
      dispatch({ type: 'INIT_WEBSITE', website: site });
      setAnalysisPrompt(null);
      setView('editor');
    }
  }, [dispatch]);

  const handlePreview = useCallback(() => setView('preview'), []);
  const handleCloseEditor = useCallback(() => setView('landing'), []);
  const handleClosePreview = useCallback(() => setView('editor'), []);
  const handleBackToEditor = useCallback(() => setView('editor'), []);

  const handleUseTemplate = useCallback((templateId: string) => {
    const tpl = DEFAULT_TEMPLATES.find(t => t.id === templateId);
    if (tpl) {
      const site = generateWebsiteFromTemplate(tpl);
      dispatch({ type: 'INIT_WEBSITE', website: site });
      setView('editor');
    }
  }, [dispatch]);

  const handleStart = useCallback(() => {
    const site = generateEmptyWebsite('My Website');
    dispatch({ type: 'INIT_WEBSITE', website: site });
    setView('editor');
  }, [dispatch]);

  return (
    <>
      <LivingCanvas />
      {analysisPrompt && (
        <AnalysisModal
          prompt={analysisPrompt}
          onClose={handleCloseAnalysis}
          onSelectTemplate={handleSelectTemplate}
        />
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

function AppRoutes() {
  const location = useLocation();
  const isEditorRoute = location.pathname === '/editor';
  const isPreviewRoute = location.pathname === '/preview';
  const showCanvas = !isEditorRoute && !isPreviewRoute;

  return (
    <>
      {showCanvas && <LivingCanvas />}
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/music" element={<MusicPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/demo/:industry" element={<DemoPage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="*" element={<LandingPage />} />
      </Routes>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <I18nProvider>
        <EditorProvider>
          <ToastProvider>
            <AppRoutes />
          </ToastProvider>
        </EditorProvider>
      </I18nProvider>
    </AuthProvider>
  );
}
