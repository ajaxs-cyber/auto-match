import { useState, useCallback } from 'react';
import { useEditor } from '@/hooks/useEditor';
import { useToast } from '@/hooks/useToast';
import ModuleRenderer from './ModuleRenderer';
import PropertiesPanel from './PropertiesPanel';
import ExportDialog from './ExportDialog';
import {
  Undo2, Redo2, Save, Eye, ChevronLeft, GripVertical,
  Plus, Trash2, Copy, Home, FilePlus, Play,
  Music, Settings, Type, Layout, Image,
  Star as StarIcon, Phone, Users, HelpCircle, CreditCard,
  ShoppingBag, Briefcase, Video, CircleDot, SeparatorHorizontal,
} from 'lucide-react';
import type { WebsiteModule, Page } from '@/types';

const MODULE_TYPES = [
  { type: 'hero', name: 'Hero Section', icon: <Layout size={16} /> },
  { type: 'navbar', name: 'Navigation', icon: <CircleDot size={16} /> },
  { type: 'text', name: 'Text Block', icon: <Type size={16} /> },
  { type: 'features', name: 'Features', icon: <StarIcon size={16} /> },
  { type: 'gallery', name: 'Gallery', icon: <Image size={16} /> },
  { type: 'products', name: 'Products', icon: <ShoppingBag size={16} /> },
  { type: 'services', name: 'Services', icon: <Briefcase size={16} /> },
  { type: 'testimonials', name: 'Testimonials', icon: <Users size={16} /> },
  { type: 'team', name: 'Team', icon: <Users size={16} /> },
  { type: 'pricing', name: 'Pricing', icon: <CreditCard size={16} /> },
  { type: 'faq', name: 'FAQ', icon: <HelpCircle size={16} /> },
  { type: 'contact', name: 'Contact', icon: <Phone size={16} /> },
  { type: 'footer', name: 'Footer', icon: <Layout size={16} /> },
  { type: 'carousel', name: 'Carousel', icon: <Play size={16} /> },
  { type: 'video', name: 'Video', icon: <Video size={16} /> },
  { type: 'button', name: 'Button', icon: <CircleDot size={16} /> },
  { type: 'divider', name: 'Divider', icon: <SeparatorHorizontal size={16} /> },
  { type: 'music', name: 'Music Player', icon: <Music size={16} /> },
];

interface EditorProps {
  onClose: () => void;
  onPreview: () => void;
}

export default function Editor({ onClose, onPreview }: EditorProps) {
  const { state, dispatch, currentPage } = useEditor();
  const toast = useToast();
  const [showAddModule, setShowAddModule] = useState(false);
  const [showPageMenu, setShowPageMenu] = useState<string | null>(null);
  const [showExport, setShowExport] = useState(false);
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleSave = useCallback(() => {
    dispatch({ type: 'SAVE' });
    toast.success('Project saved');
  }, [dispatch, toast]);

  const handleUndo = useCallback(() => {
    if (state.undoStack.length > 0) {
      dispatch({ type: 'UNDO' });
      toast.info('Undo');
    }
  }, [dispatch, state.undoStack.length, toast]);

  const handleRedo = useCallback(() => {
    if (state.redoStack.length > 0) {
      dispatch({ type: 'REDO' });
      toast.info('Redo');
    }
  }, [dispatch, state.redoStack.length, toast]);

  const handleAddPage = useCallback(() => {
    const newPage: Page = {
      id: `page-${Date.now()}`,
      name: `Page ${state.website.pages.length + 1}`,
      slug: `/page-${state.website.pages.length + 1}`,
      isHome: false,
      modules: [createDefaultModule('hero'), createDefaultModule('text'), createDefaultModule('footer')],
    };
    dispatch({ type: 'ADD_PAGE', page: newPage });
    toast.success('Page added');
  }, [dispatch, state.website.pages.length, toast]);

  const handleAddModule = useCallback((type: string) => {
    if (!currentPage) return;
    const mod = createDefaultModule(type);
    dispatch({ type: 'ADD_MODULE', pageId: currentPage.id, module: mod });
    setShowAddModule(false);
    toast.success(`${mod.name} added`);
  }, [dispatch, currentPage, toast]);

  const handleDragStart = useCallback((id: string) => {
    setDraggedId(id);
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent, id: string) => {
    e.preventDefault();
    setDragOverId(id);
  }, []);

  const handleDrop = useCallback((targetId: string) => {
    if (!draggedId || !currentPage || draggedId === targetId) { setDraggedId(null); setDragOverId(null); return; }
    const ids = currentPage.modules.map(m => m.id);
    const fromIdx = ids.indexOf(draggedId);
    const toIdx = ids.indexOf(targetId);
    if (fromIdx === -1 || toIdx === -1) { setDraggedId(null); setDragOverId(null); return; }
    const newIds = [...ids];
    newIds.splice(fromIdx, 1);
    newIds.splice(toIdx, 0, draggedId);
    dispatch({ type: 'REORDER_MODULES', pageId: currentPage.id, moduleIds: newIds });
    setDraggedId(null);
    setDragOverId(null);
    toast.success('Module reordered');
  }, [draggedId, currentPage, dispatch, toast]);

  // Keyboard shortcuts
  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 'z') {
      e.preventDefault();
      if (e.shiftKey) handleRedo();
      else handleUndo();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      handleSave();
    }
  }, [handleUndo, handleRedo, handleSave]);

  if (!currentPage) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col" style={{ background: '#F0EEEA' }} onKeyDown={handleKeyDown} tabIndex={0}>
      {/* Toolbar */}
      <div className="h-12 flex items-center justify-between px-3 border-b flex-shrink-0" style={{ background: 'white', borderColor: 'var(--border-color)', boxShadow: 'var(--shadow-sm)' }}>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }} title="Back">
            <ChevronLeft size={18} />
          </button>
          <div className="w-px h-5 mx-1" style={{ background: 'var(--border-color)' }} />
          <input
            type="text"
            value={state.website.name}
            onChange={(e) => dispatch({ type: 'UPDATE_WEBSITE_NAME', name: e.target.value })}
            className="text-sm font-semibold bg-transparent border-none outline-none w-40"
            style={{ color: 'var(--text-primary)' }}
          />
          <div className="w-px h-5 mx-1" style={{ background: 'var(--border-color)' }} />
          <button onClick={handleUndo} disabled={!state.undoStack.length} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" style={{ color: 'var(--text-tertiary)' }} title="Undo (Ctrl+Z)">
            <Undo2 size={16} />
          </button>
          <button onClick={handleRedo} disabled={!state.redoStack.length} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer disabled:opacity-30 disabled:cursor-not-allowed" style={{ color: 'var(--text-tertiary)' }} title="Redo (Ctrl+Shift+Z)">
            <Redo2 size={16} />
          </button>
          <button onClick={handleSave} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }} title="Save (Ctrl+S)">
            <Save size={16} />
          </button>
          {state.lastSaved && (
            <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>
              Saved {state.lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onPreview} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-transparent border cursor-pointer hover:bg-gray-50 transition-colors" style={{ borderColor: 'rgba(26,43,60,0.15)', color: 'var(--text-primary)' }}>
            <Eye size={14} /> Preview
          </button>
          <button onClick={() => setShowExport(true)} className="btn-primary py-2 px-4 text-xs">Export</button>
        </div>
      </div>

      {/* Main Area */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[260px] flex-shrink-0 flex flex-col border-r overflow-hidden" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
          {/* Pages Section */}
          <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Pages ({state.website.pages.length})</span>
            <button onClick={handleAddPage} className="p-1 rounded-md hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--accent)' }} title="Add page">
              <FilePlus size={14} />
            </button>
          </div>
          <div className="max-h-32 overflow-y-auto border-b" style={{ borderColor: 'var(--border-color)' }}>
            {state.website.pages.map(page => (
              <div
                key={page.id}
                onClick={() => dispatch({ type: 'SELECT_PAGE', pageId: page.id })}
                className={`flex items-center justify-between px-3 py-2 cursor-pointer transition-colors ${state.currentPageId === page.id ? 'bg-[var(--accent-light)]' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-center gap-2 min-w-0">
                  {page.isHome && <Home size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />}
                  <span className="text-xs font-medium truncate" style={{ color: state.currentPageId === page.id ? 'var(--accent)' : 'var(--text-primary)' }}>{page.name}</span>
                </div>
                <div className="relative">
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowPageMenu(showPageMenu === page.id ? null : page.id); }}
                    className="p-1 rounded bg-transparent border-none cursor-pointer hover:bg-gray-100"
                    style={{ color: 'var(--text-tertiary)' }}
                  >
                    <Settings size={12} />
                  </button>
                  {showPageMenu === page.id && (
                    <PageMenuDropdown
                      page={page}
                      onClose={() => setShowPageMenu(null)}
                      onSetHome={() => { dispatch({ type: 'SET_HOME_PAGE', pageId: page.id }); setShowPageMenu(null); toast.success('Home page set'); }}
                      onRename={(name) => { dispatch({ type: 'RENAME_PAGE', pageId: page.id, name }); setShowPageMenu(null); }}
                      onDuplicate={() => { dispatch({ type: 'DUPLICATE_PAGE', pageId: page.id }); setShowPageMenu(null); toast.success('Page duplicated'); }}
                      onDelete={() => { dispatch({ type: 'DELETE_PAGE', pageId: page.id }); setShowPageMenu(null); toast.success('Page deleted'); }}
                      canDelete={state.website.pages.length > 1}
                    />
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Modules Section */}
          <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>Modules ({currentPage.modules.length})</span>
            <button onClick={() => setShowAddModule(!showAddModule)} className="p-1 rounded-md hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--accent)' }}>
              <Plus size={14} />
            </button>
          </div>

          {/* Add Module Panel */}
          {showAddModule && (
            <div className="p-2 border-b grid grid-cols-2 gap-1.5" style={{ borderColor: 'var(--border-color)', background: '#FAFAF8' }}>
              {MODULE_TYPES.map(mt => (
                <button key={mt.type} onClick={() => handleAddModule(mt.type)} className="flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs cursor-pointer bg-transparent border hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all" style={{ borderColor: 'rgba(26,43,60,0.08)', color: 'var(--text-secondary)' }}>
                  {mt.icon} {mt.name}
                </button>
              ))}
            </div>
          )}

          {/* Module List */}
          <div className="flex-1 overflow-y-auto">
            {currentPage.modules.map((mod, index) => (
              <div
                key={mod.id}
                draggable
                onDragStart={() => handleDragStart(mod.id)}
                onDragOver={(e) => handleDragOver(e, mod.id)}
                onDrop={() => handleDrop(mod.id)}
                onClick={() => dispatch({ type: 'SELECT_MODULE', moduleId: mod.id })}
                className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-all border-l-2 ${state.selectedModuleId === mod.id ? 'border-l-[var(--accent)] bg-[var(--accent-light)]' : 'border-l-transparent hover:bg-gray-50'}`}
                style={{ opacity: dragOverId === mod.id && draggedId !== mod.id ? 0.5 : 1 }}
              >
                <span style={{ color: 'var(--text-tertiary)', cursor: 'grab' }}><GripVertical size={14} /></span>
                <span style={{ color: mod.visible ? 'var(--text-secondary)' : 'var(--text-tertiary)' }}>
                  {MODULE_TYPES.find(m => m.type === mod.type)?.icon}
                </span>
                <span className={`text-xs font-medium flex-1 truncate ${!mod.visible ? 'line-through opacity-50' : ''}`} style={{ color: state.selectedModuleId === mod.id ? 'var(--accent)' : 'var(--text-primary)' }}>
                  {index + 1}. {mod.name}
                </span>
                {!mod.visible && <span className="text-xs px-1 rounded" style={{ background: 'var(--text-tertiary)', color: 'white', fontSize: '0.6rem' }}>HIDDEN</span>}
              </div>
            ))}
          </div>
        </div>

        {/* Center - Preview */}
        <div className="flex-1 overflow-y-auto p-4" style={{ background: '#E8E6E0' }}>
          <div style={{ maxWidth: 1100, margin: '0 auto' }}>
            {currentPage.modules.map(mod => (
              <div key={mod.id} style={{ display: mod.visible ? 'block' : 'none' }}>
                <ModuleRenderer
                  mod={mod}
                  colors={state.website.colors}
                  fonts={state.website.fonts}
                  isSelected={state.selectedModuleId === mod.id}
                  onClick={() => dispatch({ type: 'SELECT_MODULE', moduleId: mod.id })}
                />
              </div>
            ))}
            {currentPage.modules.filter(m => m.visible).length === 0 && (
              <div className="flex flex-col items-center justify-center py-20 text-center" style={{ color: 'var(--text-tertiary)' }}>
                <Layout size={40} className="mb-3 opacity-30" />
                <p className="text-sm font-medium">No visible modules</p>
                <p className="text-xs mt-1 opacity-60">Add modules from the left panel</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Properties */}
        <div className="w-[280px] flex-shrink-0 flex flex-col border-l overflow-hidden" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
          <PropertiesPanel />
        </div>
      </div>

      {/* Export Dialog */}
      {showExport && <ExportDialog onClose={() => setShowExport(false)} />}
    </div>
  );
}

// Page Menu Dropdown
function PageMenuDropdown({ page, onClose: _onClose, onSetHome, onRename, onDuplicate, onDelete, canDelete }: {
  page: Page; onClose: () => void; onSetHome: () => void; onRename: (n: string) => void;
  onDuplicate: () => void; onDelete: () => void; canDelete: boolean;
}) {
  const [renaming, setRenaming] = useState(false);
  const [name, setName] = useState(page.name);

  return (
    <div className="absolute right-0 top-6 w-40 rounded-xl py-1.5 z-50 shadow-xl" style={{ background: 'white', border: '1px solid var(--border-color)' }}>
      {!page.isHome && <button onClick={onSetHome} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 bg-transparent border-none cursor-pointer flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Home size={12} /> Set as Home</button>}
      {renaming ? (
        <div className="px-3 py-1">
          <input type="text" value={name} onChange={e => setName(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { onRename(name); setRenaming(false); } }} className="prop-input text-xs w-full" autoFocus />
        </div>
      ) : (
        <button onClick={() => setRenaming(true)} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-primary)' }}>Rename</button>
      )}
      <button onClick={onDuplicate} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 bg-transparent border-none cursor-pointer flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Copy size={12} /> Duplicate</button>
      {canDelete && <button onClick={onDelete} className="w-full text-left px-3 py-1.5 text-xs hover:bg-red-50 bg-transparent border-none cursor-pointer flex items-center gap-2" style={{ color: '#ef4444' }}><Trash2 size={12} /> Delete</button>}
    </div>
  );
}

// Create default module
function createDefaultModule(type: string): WebsiteModule {
  const id = `mod-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
  const base = { id, type: type as any, name: type.charAt(0).toUpperCase() + type.slice(1), visible: true, styles: {} };

  switch (type) {
    case 'hero': return { ...base, styles: { bgColor: '#1A2B3C', textColor: '#FFFFFF', textAlign: 'center' as const, padding: '80px 24px' }, content: { title: 'Your Hero Title', subtitle: 'Add a compelling subtitle here.', buttonText: 'Get Started', buttonLink: '#' } } as WebsiteModule;
    case 'navbar': return { ...base, styles: { bgColor: '#FFFFFF', textColor: '#1A2B3C' }, content: { logo: 'Brand', links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Get Started', ctaLink: '#' } } as WebsiteModule;
    case 'text': return { ...base, styles: { bgColor: '#F5F3EE', textColor: '#1A2B3C', textAlign: 'center' as const, padding: '60px 24px' }, content: { title: 'Section Title', body: 'Add your content here. Describe what makes your business unique and why visitors should care.' } } as WebsiteModule;
    case 'features': return { ...base, styles: { bgColor: '#FFFFFF', textColor: '#1A2B3C', padding: '60px 24px' }, content: { title: 'Key Features', items: [{ icon: 'star', title: 'Feature 1', description: 'Describe your feature' }, { icon: 'star', title: 'Feature 2', description: 'Describe your feature' }, { icon: 'star', title: 'Feature 3', description: 'Describe your feature' }] } } as WebsiteModule;
    case 'gallery': return { ...base, styles: { bgColor: '#F5F3EE', textColor: '#1A2B3C', padding: '60px 24px' }, content: { title: 'Gallery', images: [{ src: '', alt: 'Image 1' }, { src: '', alt: 'Image 2' }, { src: '', alt: 'Image 3' }], columns: 3 } } as WebsiteModule;
    case 'products': return { ...base, styles: { bgColor: '#FFFFFF', textColor: '#1A2B3C', padding: '60px 24px' }, content: { title: 'Our Products', items: [{ name: 'Product 1', price: '$29', description: 'Product description' }, { name: 'Product 2', price: '$49', description: 'Product description' }] } } as WebsiteModule;
    case 'services': return { ...base, styles: { bgColor: '#F5F3EE', textColor: '#1A2B3C', padding: '60px 24px' }, content: { title: 'Our Services', items: [{ icon: 'briefcase', title: 'Service 1', description: 'Service description' }, { icon: 'briefcase', title: 'Service 2', description: 'Service description' }] } } as WebsiteModule;
    case 'testimonials': return { ...base, styles: { bgColor: '#FFFFFF', textColor: '#1A2B3C', padding: '60px 24px' }, content: { title: 'What People Say', items: [{ name: 'Customer Name', role: 'Role', text: 'Amazing experience working with this team!' }] } } as WebsiteModule;
    case 'team': return { ...base, styles: { bgColor: '#F5F3EE', textColor: '#1A2B3C', padding: '60px 24px' }, content: { title: 'Our Team', members: [{ name: 'Team Member', role: 'Position', bio: 'Short bio' }] } } as WebsiteModule;
    case 'pricing': return { ...base, styles: { bgColor: '#FFFFFF', textColor: '#1A2B3C', padding: '60px 24px' }, content: { title: 'Pricing', plans: [{ name: 'Basic', price: '$9', period: '/mo', features: ['Feature 1', 'Feature 2'] }, { name: 'Pro', price: '$29', period: '/mo', features: ['Feature 1', 'Feature 2', 'Feature 3'], highlighted: true }] } } as WebsiteModule;
    case 'faq': return { ...base, styles: { bgColor: '#F5F3EE', textColor: '#1A2B3C', padding: '60px 24px' }, content: { title: 'FAQ', items: [{ question: 'What is your return policy?', answer: 'We offer a 30-day money-back guarantee on all plans.' }] } } as WebsiteModule;
    case 'contact': return { ...base, styles: { bgColor: '#1A2B3C', textColor: '#FFFFFF', padding: '60px 24px' }, content: { title: 'Contact Us', email: 'hello@example.com', phone: '+1 (555) 000-0000', showForm: true } } as WebsiteModule;
    case 'footer': return { ...base, styles: { bgColor: '#1A2B3C', textColor: '#FFFFFF' }, content: { logo: 'Brand', tagline: 'Built with care.', links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], social: [], copyright: `© ${new Date().getFullYear()} Brand. All rights reserved.` } } as WebsiteModule;
    case 'carousel': return { ...base, styles: { bgColor: '#FFFFFF', padding: '0' }, content: { slides: [{ image: '', title: 'Slide 1' }], autoplay: true, interval: 5 } } as WebsiteModule;
    case 'video': return { ...base, styles: { bgColor: '#FFFFFF', padding: '60px 24px' }, content: { url: '', title: 'Video Section', autoplay: false, muted: true } } as WebsiteModule;
    case 'button': return { ...base, styles: { bgColor: 'transparent', textColor: '#1A2B3C', padding: '24px' }, content: { text: 'Click Me', link: '#', variant: 'primary', size: 'medium', align: 'center' } } as WebsiteModule;
    case 'divider': return { ...base, styles: { bgColor: 'transparent', padding: '16px 24px' }, content: { style: 'line', label: '' } } as WebsiteModule;
    case 'music': return { ...base, styles: { bgColor: 'rgba(123,97,255,0.05)', padding: '24px' }, content: { title: 'Background Music', trackId: 'track-1', autoplay: false, loop: true, showControls: true } } as WebsiteModule;
    default: return base as WebsiteModule;
  }
}
