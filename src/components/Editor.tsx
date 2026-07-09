import { useState, useCallback, useEffect, useRef } from 'react';
import { useEditor } from '@/hooks/useEditor';
import { useToast } from '@/hooks/useToast';
import { getTrackById, generateMusicRecommendation, getGenreLabel, getGenreColor } from '@/data/music';
import { detectIndustry } from '@/components/AnalysisModal';
import {
  Undo2, Redo2, Save, Eye, ChevronLeft, GripVertical, Plus, Trash2, Copy,
  Home, FilePlus, Play, Pause, Music, X, Settings, Type, Layout, Image,
  Star, Phone, Users, HelpCircle, CreditCard, ShoppingBag, Briefcase, Video,
  CircleDot, SeparatorHorizontal, BarChart3, ImageIcon, Calendar, MapPin,
  Monitor, Tablet, Smartphone, Volume2, Sparkles, Upload, Heart, SkipForward
} from 'lucide-react';
import type { WebsiteModule, Page, EditorPanel } from '@/types';

const MODULE_TYPES = [
  { type: 'hero', name: 'Hero Section', icon: <Layout size={16} />, desc: 'Full-width banner with title, subtitle, buttons' },
  { type: 'navbar', name: 'Navigation', icon: <CircleDot size={16} />, desc: 'Top nav with logo, links, CTA' },
  { type: 'text', name: 'Text Block', icon: <Type size={16} />, desc: 'Rich text with heading and body' },
  { type: 'features', name: 'Features', icon: <Star size={16} />, desc: 'Grid of feature cards with icons' },
  { type: 'gallery', name: 'Gallery', icon: <Image size={16} />, desc: 'Image grid with configurable columns' },
  { type: 'services', name: 'Services', icon: <Briefcase size={16} />, desc: 'Service cards with descriptions' },
  { type: 'testimonials', name: 'Testimonials', icon: <Users size={16} />, desc: 'Customer review cards' },
  { type: 'team', name: 'Team', icon: <Users size={16} />, desc: 'Team member profiles' },
  { type: 'pricing', name: 'Pricing', icon: <CreditCard size={16} />, desc: 'Pricing plan comparison cards' },
  { type: 'faq', name: 'FAQ', icon: <HelpCircle size={16} />, desc: 'Collapsible Q&A accordion' },
  { type: 'contact', name: 'Contact', icon: <Phone size={16} />, desc: 'Contact form with info' },
  { type: 'stats', name: 'Stats', icon: <BarChart3 size={16} />, desc: 'Number/statistic counters' },
  { type: 'cta', name: 'CTA Section', icon: <Sparkles size={16} />, desc: 'Call-to-action banner' },
  { type: 'footer', name: 'Footer', icon: <Layout size={16} />, desc: 'Site footer with links' },
  { type: 'divider', name: 'Divider', icon: <SeparatorHorizontal size={16} />, desc: 'Section separator line' },
  { type: 'music', name: 'Music Player', icon: <Music size={16} />, desc: 'Background music display' },
];

const PANEL_TABS: { id: EditorPanel; label: string; icon: React.ReactNode }[] = [
  { id: 'components', label: 'Components', icon: <Layout size={14} /> },
  { id: 'pages', label: 'Pages', icon: <FilePlus size={14} /> },
  { id: 'music', label: 'Music', icon: <Music size={14} /> },
  { id: 'styles', label: 'Styles', icon: <Settings size={14} /> },
];

interface EditorProps { onClose: () => void; onPreview: () => void; }

export default function Editor({ onClose, onPreview }: EditorProps) {
  const { state, dispatch, currentPage, selectedModule, canUndo, canRedo } = useEditor();
  const toast = useToast();
  const [dragModId, setDragModId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const [showPageMenu, setShowPageMenu] = useState<string | null>(null);
  const [renamingPage, setRenamingPage] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const inlineRef = useRef<HTMLDivElement>(null);

  const rec = currentPage ? generateMusicRecommendation(detectIndustryFromPage(currentPage)) : null;
  const tracks = rec ? [rec.primary, ...rec.alternatives] : [];

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'z') { e.preventDefault(); e.shiftKey ? dispatch({ type: 'REDO' }) : dispatch({ type: 'UNDO' }); }
      if ((e.metaKey || e.ctrlKey) && e.key === 's') { e.preventDefault(); handleSave(); }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  });

  const handleSave = useCallback(() => { dispatch({ type: 'SAVE' }); toast.success('Project saved'); }, [dispatch, toast]);
  const handleUndo = useCallback(() => { if (canUndo) dispatch({ type: 'UNDO' }); }, [canUndo, dispatch]);
  const handleRedo = useCallback(() => { if (canRedo) dispatch({ type: 'REDO' }); }, [canRedo, dispatch]);

  const addModule = (type: string) => {
    if (!currentPage) return;
    const mod = createDefaultModule(type);
    dispatch({ type: 'ADD_MODULE', pageId: currentPage.id, module: mod });
    toast.success(`${mod.name} added`);
  };

  const handleDrop = (targetId: string) => {
    if (!dragModId || !currentPage || dragModId === targetId) { setDragModId(null); setDragOverId(null); return; }
    const ids = currentPage.modules.map(m => m.id);
    const fi = ids.indexOf(dragModId), ti = ids.indexOf(targetId);
    if (fi === -1 || ti === -1) return;
    const n = [...ids]; n.splice(fi, 1); n.splice(ti, 0, dragModId);
    dispatch({ type: 'REORDER_MODULES', pageId: currentPage.id, moduleIds: n });
    setDragModId(null); setDragOverId(null);
  };

  if (!currentPage) return null;

  return (
    <div className="fixed inset-0 z-[90] flex flex-col" style={{ background: '#F0EEEA' }} tabIndex={0}>
      {/* Toolbar */}
      <div className="h-12 flex items-center justify-between px-3 border-b flex-shrink-0" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-secondary)' }} title="Back"><ChevronLeft size={18} /></button>
          <div className="w-px h-5 mx-1" style={{ background: 'var(--border-color)' }} />
          <input type="text" value={state.website.name} onChange={e => dispatch({ type: 'UPDATE_WEBSITE_NAME', name: e.target.value })} className="text-sm font-semibold bg-transparent border-none outline-none w-36" style={{ color: 'var(--text-primary)' }} />
          <div className="w-px h-5 mx-1" style={{ background: 'var(--border-color)' }} />
          <button onClick={handleUndo} disabled={!canUndo} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer disabled:opacity-30" style={{ color: 'var(--text-tertiary)' }} title="Undo"><Undo2 size={16} /></button>
          <button onClick={handleRedo} disabled={!canRedo} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer disabled:opacity-30" style={{ color: 'var(--text-tertiary)' }} title="Redo"><Redo2 size={16} /></button>
          <button onClick={handleSave} className="p-1.5 rounded-lg hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-tertiary)' }} title="Save"><Save size={16} /></button>
          {state.lastSaved && <span className="text-xs" style={{ color: 'var(--text-tertiary)' }}>Saved {state.lastSaved.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>}
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 p-0.5 rounded-lg" style={{ background: '#f5f5f3' }}>
            {(['desktop', 'tablet', 'mobile'] as const).map(d => (
              <button key={d} onClick={() => dispatch({ type: 'SET_PREVIEW_DEVICE', device: d })} className={`p-1.5 rounded-md bg-transparent border-none cursor-pointer transition-colors ${state.previewDevice === d ? 'text-[var(--accent)] bg-white shadow-sm' : 'text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}>
                {d === 'desktop' ? <Monitor size={14} /> : d === 'tablet' ? <Tablet size={14} /> : <Smartphone size={14} />}
              </button>
            ))}
          </div>
          <button onClick={onPreview} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-transparent border cursor-pointer hover:bg-gray-50" style={{ borderColor: 'rgba(26,43,60,0.15)', color: 'var(--text-primary)' }}><Eye size={14} /> Preview</button>
          <button onClick={handleSave} className="btn-primary py-2 px-4 text-xs">Export</button>
        </div>
      </div>

      {/* Main */}
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-[280px] flex-shrink-0 flex flex-col border-r overflow-hidden" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
          {/* Panel Tabs */}
          <div className="flex border-b" style={{ borderColor: 'var(--border-color)' }}>
            {PANEL_TABS.map(t => (
              <button key={t.id} onClick={() => dispatch({ type: 'SET_ACTIVE_PANEL', panel: t.id })} className={`flex-1 flex items-center justify-center gap-1 py-2.5 text-xs font-medium cursor-pointer bg-transparent border-none border-b-2 transition-colors ${state.activePanel === t.id ? 'border-[var(--accent)] text-[var(--accent)]' : 'border-transparent text-[var(--text-tertiary)] hover:text-[var(--text-primary)]'}`}>
                {t.icon} {t.label}
              </button>
            ))}
          </div>

          {/* Panel Content */}
          <div className="flex-1 overflow-y-auto">
            {state.activePanel === 'components' && (
              <div className="p-3 space-y-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider px-2 mb-2" style={{ color: 'var(--text-tertiary)' }}>Drag to add</p>
                {MODULE_TYPES.map(mt => (
                  <button key={mt.type} onClick={() => addModule(mt.type)} className="w-full flex items-start gap-3 p-3 rounded-xl text-left cursor-pointer bg-transparent border hover:border-[var(--accent)] hover:shadow-sm transition-all group" style={{ borderColor: 'rgba(26,43,60,0.06)' }}>
                    <span className="mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{mt.icon}</span>
                    <div><p className="text-xs font-semibold group-hover:text-[var(--accent)] transition-colors" style={{ color: 'var(--text-primary)' }}>{mt.name}</p><p className="text-xs mt-0.5" style={{ color: 'var(--text-tertiary)' }}>{mt.desc}</p></div>
                    <Plus size={14} className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity mt-1" style={{ color: 'var(--accent)' }} />
                  </button>
                ))}
              </div>
            )}

            {state.activePanel === 'pages' && (
              <div>
                <div className="px-3 py-2 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
                  <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>Pages</span>
                  <button onClick={() => { const np: Page = { id: `page-${Date.now()}`, name: `Page ${state.website.pages.length + 1}`, slug: `/page-${state.website.pages.length + 1}`, isHome: false, modules: [createDefaultModule('hero'), createDefaultModule('text'), createDefaultModule('footer')] }; dispatch({ type: 'ADD_PAGE', page: np }); }} className="p-1 rounded hover:bg-gray-100 bg-transparent border-none cursor-pointer" style={{ color: 'var(--accent)' }}><FilePlus size={14} /></button>
                </div>
                {state.website.pages.map(page => (
                  <div key={page.id} onClick={() => dispatch({ type: 'SELECT_PAGE', pageId: page.id })} className={`flex items-center justify-between px-3 py-2.5 cursor-pointer transition-colors ${state.currentPageId === page.id ? 'bg-[var(--accent-light)]' : 'hover:bg-gray-50'}`}>
                    <div className="flex items-center gap-2 min-w-0 flex-1">
                      {page.isHome && <Home size={12} style={{ color: 'var(--accent)', flexShrink: 0 }} />}
                      {renamingPage === page.id ? (
                        <input type="text" value={renameVal} onChange={e => setRenameVal(e.target.value)} onKeyDown={e => { if (e.key === 'Enter') { dispatch({ type: 'RENAME_PAGE', pageId: page.id, name: renameVal }); setRenamingPage(null); } }} onBlur={() => setRenamingPage(null)} className="prop-input text-xs flex-1" autoFocus />
                      ) : (
                        <span className="text-xs font-medium truncate" style={{ color: state.currentPageId === page.id ? 'var(--accent)' : 'var(--text-primary)' }}>{page.name}</span>
                      )}
                    </div>
                    <button onClick={e => { e.stopPropagation(); setShowPageMenu(showPageMenu === page.id ? null : page.id); }} className="p-1 rounded bg-transparent border-none cursor-pointer hover:bg-gray-100 relative" style={{ color: 'var(--text-tertiary)' }}>
                      <Settings size={12} />
                      {showPageMenu === page.id && (
                        <div className="absolute right-0 top-6 w-36 rounded-xl py-1.5 z-50 shadow-xl bg-white border" style={{ borderColor: 'var(--border-color)' }}>
                          {!page.isHome && <button onClick={e => { e.stopPropagation(); dispatch({ type: 'SET_HOME_PAGE', pageId: page.id }); setShowPageMenu(null); toast.success('Home page set'); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 bg-transparent border-none cursor-pointer flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Home size={12} /> Set as Home</button>}
                          <button onClick={e => { e.stopPropagation(); setRenamingPage(page.id); setRenameVal(page.name); setShowPageMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 bg-transparent border-none cursor-pointer" style={{ color: 'var(--text-primary)' }}>Rename</button>
                          <button onClick={e => { e.stopPropagation(); dispatch({ type: 'DUPLICATE_PAGE', pageId: page.id }); setShowPageMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-gray-50 bg-transparent border-none cursor-pointer flex items-center gap-2" style={{ color: 'var(--text-primary)' }}><Copy size={12} /> Duplicate</button>
                          {state.website.pages.length > 1 && <button onClick={e => { e.stopPropagation(); dispatch({ type: 'DELETE_PAGE', pageId: page.id }); setShowPageMenu(null); }} className="w-full text-left px-3 py-1.5 text-xs hover:bg-red-50 bg-transparent border-none cursor-pointer flex items-center gap-2 text-red-500"><Trash2 size={12} /> Delete</button>}
                        </div>
                      )}
                    </button>
                  </div>
                ))}

                {/* Module list for current page */}
                <div className="mt-4 border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="px-3 text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Modules on this page</p>
                  {currentPage.modules.map((mod, i) => (
                    <div key={mod.id} draggable onDragStart={() => setDragModId(mod.id)} onDragOver={e => { e.preventDefault(); setDragOverId(mod.id); }} onDrop={() => handleDrop(mod.id)}
                      onClick={() => dispatch({ type: 'SELECT_MODULE', moduleId: mod.id })}
                      className={`flex items-center gap-2 px-3 py-2 cursor-pointer transition-all border-l-2 ${state.selectedModuleId === mod.id ? 'border-l-[var(--accent)] bg-[var(--accent-light)]' : 'border-l-transparent hover:bg-gray-50'}`}>
                      <span style={{ color: 'var(--text-tertiary)', cursor: 'grab' }}><GripVertical size={14} /></span>
                      <span className={`text-xs font-medium flex-1 truncate ${!mod.visible ? 'line-through opacity-50' : ''}`} style={{ color: state.selectedModuleId === mod.id ? 'var(--accent)' : 'var(--text-primary)' }}>{i + 1}. {mod.name}</span>
                      {!mod.visible && <span className="text-[9px] px-1 py-0.5 rounded" style={{ background: 'var(--text-tertiary)', color: 'white' }}>HIDDEN</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {state.activePanel === 'music' && rec && (
              <div className="p-4 space-y-5">
                {/* AI Reasoning */}
                <div className="p-3 rounded-xl" style={{ background: 'rgba(123,97,255,0.06)', border: '1px solid rgba(123,97,255,0.12)' }}>
                  <p className="text-xs font-semibold mb-1" style={{ color: 'var(--music-accent)' }}>AI Recommendation Reasoning</p>
                  <p className="text-xs leading-relaxed" style={{ color: 'var(--text-secondary)' }}>{rec.reasoning}</p>
                </div>

                {/* Current Track */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Now Playing</p>
                  <div className="flex items-center gap-3 p-3 rounded-xl card-surface">
                    <img src={tracks[currentTrack]?.cover} alt="" className="w-12 h-12 rounded-lg object-cover" />
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold truncate" style={{ color: 'var(--text-primary)' }}>{tracks[currentTrack]?.title}</p>
                      <p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{tracks[currentTrack]?.artist}</p>
                    </div>
                    <button onClick={() => setIsPlaying(!isPlaying)} className="w-8 h-8 rounded-full flex items-center justify-center text-white border-none cursor-pointer" style={{ background: 'var(--music-accent)' }}>{isPlaying ? <Pause size={14} /> : <Play size={14} />}</button>
                  </div>
                </div>

                {/* Track List */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Recommended Tracks</p>
                  <div className="space-y-2">
                    {tracks.map((t, i) => (
                      <div key={t.id} onClick={() => setCurrentTrack(i)} className={`flex items-center gap-2 p-2 rounded-lg cursor-pointer transition-all ${currentTrack === i ? 'bg-[var(--music-accent-light)]' : 'hover:bg-gray-50'}`}>
                        <span className="text-xs w-4 text-center" style={{ color: 'var(--text-tertiary)' }}>{i + 1}</span>
                        <div className="flex-1 min-w-0"><p className="text-xs font-medium truncate" style={{ color: 'var(--text-primary)' }}>{t.title}</p><p className="text-xs" style={{ color: 'var(--text-tertiary)' }}>{getGenreLabel(t.genre)}</p></div>
                        <Heart size={12} style={{ color: 'var(--text-tertiary)' }} />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Playback Settings */}
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: 'var(--text-tertiary)' }}>Playback</p>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between"><span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Autoplay</span><Toggle /></div>
                    <div className="flex items-center justify-between"><span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Loop</span><Toggle /></div>
                    <div className="flex items-center gap-2"><Volume2 size={12} style={{ color: 'var(--text-tertiary)' }} /><input type="range" min="0" max="100" defaultValue="70" className="flex-1 h-1 accent-[var(--music-accent)]" /></div>
                  </div>
                </div>

                <button className="w-full py-2.5 rounded-xl text-xs font-medium border-dashed border cursor-pointer hover:border-[var(--accent)] flex items-center justify-center gap-2" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)', background: 'transparent' }}>
                  <Upload size={12} /> Upload Custom Music
                </button>
              </div>
            )}

            {state.activePanel === 'styles' && (
              <div className="p-4 space-y-5">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Colors</p>
                  {Object.entries(state.website.colors).map(([key, val]) => (
                    <div key={key} className="flex items-center justify-between mb-2">
                      <span className="text-xs capitalize" style={{ color: 'var(--text-secondary)' }}>{key.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <div className="flex items-center gap-2"><span className="text-xs font-mono" style={{ color: 'var(--text-tertiary)' }}>{val}</span><input type="color" value={val} onChange={e => dispatch({ type: 'UPDATE_COLORS', colors: { [key]: e.target.value } as any })} className="w-7 h-7 rounded border-none cursor-pointer" /></div>
                    </div>
                  ))}
                </div>
                <div className="border-t pt-4" style={{ borderColor: 'var(--border-color)' }}>
                  <p className="text-xs font-semibold uppercase tracking-wider mb-3" style={{ color: 'var(--text-tertiary)' }}>Typography</p>
                  <div className="mb-2"><label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Heading Font</label><select value={state.website.fonts.heading} onChange={e => dispatch({ type: 'UPDATE_FONTS', fonts: { heading: e.target.value } })} className="prop-input text-xs"><option>Inter</option><option>Playfair Display</option><option>Georgia</option><option>system-ui</option></select></div>
                  <div><label className="text-xs block mb-1" style={{ color: 'var(--text-secondary)' }}>Body Font</label><select value={state.website.fonts.body} onChange={e => dispatch({ type: 'UPDATE_FONTS', fonts: { body: e.target.value } })} className="prop-input text-xs"><option>Inter</option><option>Georgia</option><option>system-ui</option></select></div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Center Canvas */}
        <div className="flex-1 overflow-y-auto p-6" style={{ background: '#E8E6E0' }}>
          <div className="mx-auto transition-all duration-300" style={{ maxWidth: state.previewDevice === 'desktop' ? '100%' : state.previewDevice === 'tablet' ? '768px' : '375px' }}>
            {currentPage.modules.map(mod => (
              <div key={mod.id} style={{ display: mod.visible ? 'block' : 'none' }}>
                <ModuleBlock mod={mod} isSelected={state.selectedModuleId === mod.id} colors={state.website.colors} fonts={state.website.fonts}
                  onSelect={() => dispatch({ type: 'SELECT_MODULE', moduleId: mod.id })}
                  onUpdateContent={(c: any) => dispatch({ type: 'UPDATE_MODULE_CONTENT', pageId: currentPage.id, moduleId: mod.id, content: c })}
                  onDelete={() => { dispatch({ type: 'DELETE_MODULE', pageId: currentPage.id, moduleId: mod.id }); toast.success('Deleted'); }}
                  onDuplicate={() => { dispatch({ type: 'DUPLICATE_MODULE', pageId: currentPage.id, moduleId: mod.id }); toast.success('Duplicated'); }}
                  onToggleVisibility={() => dispatch({ type: 'TOGGLE_MODULE_VISIBILITY', pageId: currentPage.id, moduleId: mod.id })}
                />
              </div>
            ))}
            {currentPage.modules.filter(m => m.visible).length === 0 && (
              <div className="flex flex-col items-center justify-center py-32 text-center" style={{ color: 'var(--text-tertiary)' }}>
                <Layout size={48} className="mb-4 opacity-30" />
                <p className="text-sm font-medium">This page is empty</p>
                <p className="text-xs mt-1">Click a component from the left panel to add</p>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Properties */}
        <RightPanel />
      </div>
    </div>
  );
}

// Module Block with inline editing
function ModuleBlock({ mod, isSelected, colors, fonts, onSelect, onUpdateContent, onDelete, onDuplicate, onToggleVisibility }: any) {
  const c = mod.content as any;
  const [editingField, setEditingField] = useState<string | null>(null);
  const [hovered, setHovered] = useState(false);

  const borderColor = isSelected ? 'var(--accent)' : hovered ? 'rgba(232,93,76,0.35)' : 'transparent';
  const baseStyle: React.CSSProperties = {
    background: mod.styles?.bgColor || 'transparent',
    color: mod.styles?.textColor || colors.text,
    padding: mod.styles?.padding || '48px 24px',
    borderRadius: mod.styles?.borderRadius || '0px',
    position: 'relative',
    outline: `2px solid ${borderColor}`,
    outlineOffset: '-2px',
    cursor: 'default',
    transition: 'outline-color 0.15s',
  };

  const handleTextEdit = (field: string, val: string) => {
    onUpdateContent({ [field]: val });
  };

  const EditableText = ({ field, val, style, tag = 'p' }: { field: string; val: string; style?: React.CSSProperties; tag?: string }) => {
    const isEditing = editingField === field;
    if (isEditing) {
      const Tag = tag as any;
      return (
        <Tag contentEditable suppressContentEditableWarning
          onBlur={(e: any) => { handleTextEdit(field, e.currentTarget.textContent || ''); setEditingField(null); }}
          onKeyDown={(e: any) => { if (e.key === 'Enter' && tag !== 'p') { e.preventDefault(); setEditingField(null); } }}
          style={{ ...style, outline: '2px solid var(--accent)', outlineOffset: '2px', borderRadius: '4px', cursor: 'text' }}
          ref={(el: any) => el?.focus()}
        >{val}</Tag>
      );
    }
    const Tag = tag as any;
    return <Tag onClick={(e: any) => { e.stopPropagation(); setEditingField(field); }} style={{ ...style, cursor: 'text' }} className="hover:opacity-80 transition-opacity">{val}</Tag>;
  };

  return (
    <div style={baseStyle} onClick={onSelect} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      {/* Module toolbar on hover */}
      {(isSelected || hovered) && (
        <div className="absolute top-0 right-0 flex items-center gap-1 z-10 px-2 py-1 rounded-bl-lg" style={{ background: 'var(--accent)' }}>
          <span className="text-white text-[10px] font-semibold mr-1">{mod.name}</span>
          <button onClick={(e) => { e.stopPropagation(); onToggleVisibility(); }} className="p-0.5 bg-transparent border-none cursor-pointer text-white/80 hover:text-white"><Eye size={10} /></button>
          <button onClick={(e) => { e.stopPropagation(); onDuplicate(); }} className="p-0.5 bg-transparent border-none cursor-pointer text-white/80 hover:text-white"><Copy size={10} /></button>
          <button onClick={(e) => { e.stopPropagation(); onDelete(); }} className="p-0.5 bg-transparent border-none cursor-pointer text-white/80 hover:text-white"><Trash2 size={10} /></button>
        </div>
      )}

      <div style={{ maxWidth: mod.styles?.maxWidth || '1200px', margin: '0 auto', textAlign: mod.styles?.textAlign || 'center' }}>
        {mod.type === 'hero' && (
          <>
            <EditableText field="title" val={c.title} tag="h1" style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16, fontFamily: fonts.heading }} />
            <EditableText field="subtitle" val={c.subtitle} tag="p" style={{ fontSize: '1.1rem', opacity: 0.8, maxWidth: 560, margin: '0 auto 28px' }} />
            {(c.buttonText || c.secondaryButtonText) && (
              <div style={{ display: 'flex', gap: 12, justifyContent: (mod.styles?.textAlign || 'center') === 'center' ? 'center' : (mod.styles?.textAlign || 'center') === 'right' ? 'flex-end' : 'flex-start', flexWrap: 'wrap' }}>
                {c.buttonText && <span style={{ padding: '12px 28px', borderRadius: 9999, background: colors.primary, color: 'white', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }} onClick={e => { e.stopPropagation(); setEditingField('buttonText'); }}>{c.buttonText}</span>}
                {c.secondaryButtonText && <span style={{ padding: '12px 28px', borderRadius: 9999, border: `1px solid ${colors.primary}`, color: colors.primary, fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer' }}>{c.secondaryButtonText}</span>}
              </div>
            )}
          </>
        )}
        {mod.type === 'navbar' && (
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '8px 0' }}>
            <EditableText field="logo" val={c.logo} tag="div" style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: fonts.heading }} />
            <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap' }}>
              {c.links?.map((l: any, i: number) => <span key={i} style={{ fontSize: '0.82rem', fontWeight: 500, opacity: 0.8 }}>{l.label}</span>)}
              <span style={{ padding: '8px 18px', borderRadius: 9999, background: colors.primary, color: 'white', fontSize: '0.7rem', fontWeight: 600 }}>{c.ctaText}</span>
            </div>
          </div>
        )}
        {mod.type === 'text' && (
          <>
            <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 14 }} />
            <EditableText field="body" val={c.body} tag="p" style={{ fontSize: '0.95rem', opacity: 0.8, lineHeight: 1.7, marginBottom: 20 }} />
            {c.buttonText && <span style={{ padding: '12px 28px', borderRadius: 9999, background: colors.primary, color: 'white', fontSize: '0.78rem', fontWeight: 600 }}>{c.buttonText}</span>}
          </>
        )}
        {mod.type === 'features' && (
          <>
            <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 8 }} />
            {c.subtitle && <EditableText field="subtitle" val={c.subtitle} tag="p" style={{ fontSize: '0.9rem', opacity: 0.65, marginBottom: 36 }} />}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(c.items?.length || 3, 3)}, 1fr)`, gap: 20, textAlign: 'left' }}>
              {c.items?.map((item: any, i: number) => (
                <div key={i} style={{ padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'left' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
                  <p style={{ fontSize: '0.78rem', opacity: 0.65, lineHeight: 1.5 }}>{item.description}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {mod.type === 'gallery' && (
          <>
            {c.title && <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 28 }} />}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(c.images?.length || 3, 3)}, 1fr)`, gap: 12 }}>
              {c.images?.map((img: any, i: number) => (
                <div key={i} style={{ aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden', background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accent}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  {img.src ? <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '0.75rem', opacity: 0.4 }}>Image {i + 1}</span>}
                </div>
              ))}
            </div>
          </>
        )}
        {mod.type === 'testimonials' && (
          <>
            {c.title && <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 28 }} />}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(c.items?.length || 2, 2)}, 1fr)`, gap: 20 }}>
              {c.items?.map((item: any, i: number) => (
                <div key={i} style={{ padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)', textAlign: 'left' }}>
                  <p style={{ fontStyle: 'italic', marginBottom: 16, fontSize: '0.85rem', opacity: 0.85 }}>&ldquo;{item.text}&rdquo;</p>
                  <p style={{ fontWeight: 600, fontSize: '0.82rem' }}>{item.name}</p>
                  <p style={{ fontSize: '0.72rem', opacity: 0.55 }}>{item.role}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {mod.type === 'pricing' && (
          <>
            <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 8 }} />
            {c.subtitle && <p style={{ fontSize: '0.9rem', opacity: 0.65, marginBottom: 36 }}>{c.subtitle}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(c.plans?.length || 3, 3)}, 1fr)`, gap: 20 }}>
              {c.plans?.map((plan: any, i: number) => (
                <div key={i} style={{ padding: 28, borderRadius: 16, background: 'rgba(255,255,255,0.5)', border: `2px solid ${plan.highlighted ? colors.accent : 'rgba(0,0,0,0.05)'}`, transform: plan.highlighted ? 'scale(1.02)' : 'none' }}>
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{plan.name}</h3>
                  <p style={{ fontSize: '1.8rem', fontWeight: 700, color: colors.primary, marginBottom: 16 }}>{plan.price}<span style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.55 }}>{plan.period}</span></p>
                  <ul style={{ listStyle: 'none', padding: 0 }}>{plan.features?.map((f: string, j: number) => <li key={j} style={{ padding: '5px 0', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: '#2D8A4E' }}>&#10003;</span>{f}</li>)}</ul>
                </div>
              ))}
            </div>
          </>
        )}
        {mod.type === 'faq' && (
          <>
            <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 28 }} />
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, textAlign: 'left', maxWidth: 800, margin: '0 auto' }}>
              {c.items?.map((item: any, i: number) => (
                <div key={i} style={{ padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.question}</p>
                  <p style={{ marginTop: 8, fontSize: '0.8rem', opacity: 0.75 }}>{item.answer}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {mod.type === 'contact' && (
          <>
            <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 8 }} />
            {c.subtitle && <p style={{ fontSize: '0.9rem', opacity: 0.65, marginBottom: 24 }}>{c.subtitle}</p>}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', marginBottom: 28 }}>
              {c.email && <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>&#9993; {c.email}</p>}
              {c.phone && <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>&#9742; {c.phone}</p>}
              {c.address && <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>&#10070; {c.address}</p>}
            </div>
            {c.showForm && (
              <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
                <input type="text" placeholder="Your Name" readOnly style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.82rem' }} />
                <input type="email" placeholder="Your Email" readOnly style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.82rem' }} />
                <textarea placeholder="Your Message" rows={3} readOnly style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.82rem', resize: 'vertical' }} />
                <span style={{ padding: '10px 24px', borderRadius: 9999, background: colors.primary, color: 'white', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', alignSelf: 'center' }}>Send Message</span>
              </div>
            )}
          </>
        )}
        {mod.type === 'footer' && (
          <div style={{ maxWidth: 1200, margin: '0 auto' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', alignItems: 'center', padding: '28px 0' }}>
              <div><EditableText field="logo" val={c.logo} tag="p" style={{ fontWeight: 700, fontSize: '1rem' }} /><EditableText field="tagline" val={c.tagline} tag="p" style={{ fontSize: '0.72rem', opacity: 0.5, marginTop: 2 }} /></div>
              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>{c.links?.map((l: any, i: number) => <span key={i} style={{ fontSize: '0.78rem', opacity: 0.6 }}>{l.label}</span>)}</div>
            </div>
            <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '14px 0', textAlign: 'center' }}>
              <EditableText field="copyright" val={c.copyright} tag="p" style={{ fontSize: '0.68rem', opacity: 0.4 }} />
            </div>
          </div>
        )}
        {mod.type === 'stats' && (
          <>
            {c.title && <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 28 }} />}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(c.items?.length || 4, 4)}, 1fr)`, gap: 20 }}>
              {c.items?.map((item: any, i: number) => (
                <div key={i} style={{ textAlign: 'center', padding: 24 }}>
                  <p style={{ fontSize: '2.2rem', fontWeight: 700, color: colors.primary }}>{item.value}</p>
                  <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: 4 }}>{item.label}</p>
                </div>
              ))}
            </div>
          </>
        )}
        {mod.type === 'cta' && (
          <>
            <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2.5rem)', fontWeight: 700, marginBottom: 12 }} />
            {c.subtitle && <EditableText field="subtitle" val={c.subtitle} tag="p" style={{ opacity: 0.8, marginBottom: 24 }} />}
            <span style={{ padding: '14px 36px', borderRadius: 9999, background: colors.primary, color: 'white', fontSize: '0.85rem', fontWeight: 600 }}>{c.buttonText}</span>
          </>
        )}
        {mod.type === 'divider' && (
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ flex: 1, height: 1, borderTop: `2px ${c.style === 'dashed' ? 'dashed' : c.style === 'dotted' ? 'dotted' : 'solid'} rgba(0,0,0,0.1)` }} />
            {c.label && <span style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</span>}
            <div style={{ flex: 1, height: 1, borderTop: `2px ${c.style === 'dashed' ? 'dashed' : c.style === 'dotted' ? 'dotted' : 'solid'} rgba(0,0,0,0.1)` }} />
          </div>
        )}
        {mod.type === 'music' && (
          <div style={{ maxWidth: 600, margin: '0 auto' }}>
            <div style={{ padding: 20, borderRadius: 16, background: 'rgba(123,97,255,0.08)', border: '1px solid rgba(123,97,255,0.15)', display: 'flex', alignItems: 'center', gap: 16 }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #7B61FF33, #E85D4C33)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>&#9835;</div>
              <div style={{ flex: 1 }}><EditableText field="title" val={c.title} tag="p" style={{ fontSize: '0.88rem', fontWeight: 600 }} /><p style={{ fontSize: '0.72rem', opacity: 0.55 }}>Background Music</p></div>
              <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7B61FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}>&#9654;</div>
            </div>
          </div>
        )}
        {mod.type === 'team' && (
          <>
            <EditableText field="title" val={c.title} tag="h2" style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 700, marginBottom: 8 }} />
            {c.subtitle && <p style={{ fontSize: '0.9rem', opacity: 0.65, marginBottom: 36 }}>{c.subtitle}</p>}
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(c.members?.length || 3, 3)}, 1fr)`, gap: 20 }}>
              {c.members?.map((m: any, i: number) => (
                <div key={i} style={{ textAlign: 'center', padding: 24 }}>
                  <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.primary}33, ${colors.accent}33)`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 700, color: colors.primary }}>{m.name.charAt(0)}</div>
                  <p style={{ fontWeight: 600, fontSize: '0.88rem' }}>{m.name}</p>
                  <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{m.role}</p>
                  <p style={{ fontSize: '0.72rem', opacity: 0.5, marginTop: 6 }}>{m.bio}</p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// Right Properties Panel
function RightPanel() {
  const { state, dispatch, currentPage, selectedModule } = useEditor();
  const mod = selectedModule;
  if (!mod || !currentPage) {
    return (
      <div className="w-[260px] flex-shrink-0 flex flex-col border-l overflow-hidden" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center" style={{ color: 'var(--text-tertiary)' }}>
          <Settings size={32} className="mb-3 opacity-30" />
          <p className="text-sm font-medium">Select a module to edit</p>
          <p className="text-xs mt-1 opacity-60">Click any module or click text to edit inline</p>
        </div>
      </div>
    );
  }

  const c = mod.content as any;
  const l = (mod as any).layout || {};

  const updateContent = (updates: Record<string, any>) => dispatch({ type: 'UPDATE_MODULE_CONTENT', pageId: currentPage.id, moduleId: mod.id, content: updates });
  const updateStyles = (updates: Record<string, any>) => dispatch({ type: 'UPDATE_MODULE', pageId: currentPage.id, moduleId: mod.id, updates: { styles: { ...mod.styles, ...updates } } });
  const updateLayout = (updates: Record<string, any>) => dispatch({ type: 'UPDATE_MODULE_LAYOUT', pageId: currentPage.id, moduleId: mod.id, layout: updates });

  return (
    <div className="w-[260px] flex-shrink-0 flex flex-col border-l overflow-hidden" style={{ background: 'white', borderColor: 'var(--border-color)' }}>
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
        <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: 'var(--text-tertiary)' }}>{mod.name}</span>
        <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: 'var(--accent-light)', color: 'var(--accent)' }}>{mod.type}</span>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Visibility Toggle */}
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" checked={mod.visible} onChange={() => dispatch({ type: 'TOGGLE_MODULE_VISIBILITY', pageId: currentPage.id, moduleId: mod.id })} className="w-4 h-4 accent-[var(--accent)]" />
          <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Visible on page</span>
        </label>

        {/* Layout Controls */}
        {l.columns !== undefined && (
          <Field label="Columns"><select value={l.columns} onChange={e => updateLayout({ columns: parseInt(e.target.value) })} className="prop-input text-xs">{[1, 2, 3, 4].map(n => <option key={n} value={n}>{n} Column{n > 1 ? 's' : ''}</option>)}</select></Field>
        )}

        {/* Appearance */}
        <Field label="Background Color">
          <div className="flex items-center gap-2"><input type="color" value={mod.styles?.bgColor || '#ffffff'} onChange={e => updateStyles({ bgColor: e.target.value })} className="w-7 h-7 rounded border-none cursor-pointer" /><input type="text" value={mod.styles?.bgColor || ''} onChange={e => updateStyles({ bgColor: e.target.value })} className="prop-input text-xs flex-1" /></div>
        </Field>
        <Field label="Text Color">
          <div className="flex items-center gap-2"><input type="color" value={mod.styles?.textColor || '#1A2B3C'} onChange={e => updateStyles({ textColor: e.target.value })} className="w-7 h-7 rounded border-none cursor-pointer" /><input type="text" value={mod.styles?.textColor || ''} onChange={e => updateStyles({ textColor: e.target.value })} className="prop-input text-xs flex-1" /></div>
        </Field>
        <Field label="Text Align"><select value={mod.styles?.textAlign || 'center'} onChange={e => updateStyles({ textAlign: e.target.value as any })} className="prop-input text-xs"><option value="left">Left</option><option value="center">Center</option><option value="right">Right</option></select></Field>
        <Field label="Padding"><select value={mod.styles?.padding || '48px 24px'} onChange={e => updateStyles({ padding: e.target.value })} className="prop-input text-xs"><option value="24px 24px">Small</option><option value="48px 24px">Medium</option><option value="80px 24px">Large</option><option value="120px 24px">Extra Large</option></select></Field>

        {/* Content Quick Edit */}
        {c.title !== undefined && <Field label="Title"><input type="text" value={c.title} onChange={e => updateContent({ title: e.target.value })} className="prop-input text-xs" /></Field>}
        {c.subtitle !== undefined && <Field label="Subtitle"><input type="text" value={c.subtitle} onChange={e => updateContent({ subtitle: e.target.value })} className="prop-input text-xs" /></Field>}
        {c.buttonText !== undefined && <Field label="Button Text"><input type="text" value={c.buttonText} onChange={e => updateContent({ buttonText: e.target.value })} className="prop-input text-xs" /></Field>}
        {c.logo !== undefined && <Field label="Logo"><input type="text" value={c.logo} onChange={e => updateContent({ logo: e.target.value })} className="prop-input text-xs" /></Field>}
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <div><label className="text-xs font-semibold uppercase tracking-wider mb-1 block" style={{ color: 'var(--text-tertiary)' }}>{label}</label>{children}</div>;
}

function Toggle() {
  const [on, setOn] = useState(false);
  return <button onClick={() => setOn(!on)} className="relative w-9 h-5 rounded-full cursor-pointer border-none transition-colors" style={{ background: on ? 'var(--accent)' : 'var(--text-tertiary)' }}><div className="absolute top-0.5 w-4 h-4 rounded-full bg-white shadow-sm transition-transform" style={{ left: 2, transform: on ? 'translateX(16px)' : 'translateX(0)' }} /></button>;
}

function detectIndustryFromPage(page: Page): string {
  const text = page.modules.map(m => JSON.stringify((m as any).content)).join(' ').toLowerCase();
  if (text.includes('coffee') || text.includes('cafe') || text.includes('food') || text.includes('restaurant')) return 'Coffee & Food';
  if (text.includes('photo') || text.includes('creative') || text.includes('design') || text.includes('portfolio')) return 'Creative';
  if (text.includes('tech') || text.includes('startup') || text.includes('saas')) return 'Tech';
  if (text.includes('fitness') || text.includes('gym') || text.includes('health') || text.includes('wellness')) return 'Health';
  return 'Services';
}

function createDefaultModule(type: string): WebsiteModule {
  const id = `mod-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`;
  const base: any = { id, type, name: type.charAt(0).toUpperCase() + type.slice(1), visible: true, styles: {}, layout: {} };

  switch (type) {
    case 'hero': return { ...base, styles: { bgColor: '#1A2B3C', textColor: '#FFFFFF', textAlign: 'center' }, layout: { imagePosition: 'background', buttonLayout: 'stacked', alignment: 'center' }, content: { title: 'Your Hero Title', subtitle: 'Add a compelling subtitle here.', buttonText: 'Get Started', buttonLink: '#' } };
    case 'navbar': return { ...base, styles: { bgColor: '#FFFFFF', textColor: '#1A2B3C' }, layout: { position: 'static', style: 'solid' }, content: { logo: 'Brand', links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], ctaText: 'Get Started', ctaLink: '#' } };
    case 'text': return { ...base, styles: { bgColor: '#F5F3EE', textColor: '#1A2B3C', textAlign: 'center', padding: '60px 24px' }, layout: { alignment: 'center', maxWidth: '720px' }, content: { title: 'Section Title', body: 'Add your content here. Describe what makes your business unique and why visitors should care.' } };
    case 'features': return { ...base, styles: { bgColor: '#FFFFFF', padding: '60px 24px' }, layout: { columns: 3, cardStyle: 'flat' }, content: { title: 'Key Features', items: [{ icon: 'star', title: 'Feature 1', description: 'Describe your feature' }, { icon: 'star', title: 'Feature 2', description: 'Describe your feature' }, { icon: 'star', title: 'Feature 3', description: 'Describe your feature' }] } };
    case 'gallery': return { ...base, styles: { bgColor: '#F5F3EE', padding: '60px 24px' }, layout: { style: 'grid', columns: 3, gap: '12px' }, content: { title: 'Gallery', images: [{ src: '', alt: '1' }, { src: '', alt: '2' }, { src: '', alt: '3' }] } };
    case 'services': return { ...base, styles: { bgColor: '#F5F3EE', padding: '60px 24px' }, layout: { columns: 3, layout: 'grid' }, content: { title: 'Our Services', items: [{ title: 'Service 1', description: 'Description', icon: 'briefcase' }, { title: 'Service 2', description: 'Description', icon: 'briefcase' }] } };
    case 'testimonials': return { ...base, styles: { bgColor: '#FFFFFF', padding: '60px 24px' }, layout: { columns: 2, style: 'cards' }, content: { title: 'What People Say', items: [{ name: 'Customer', role: 'Role', text: 'Amazing experience!' }] } };
    case 'team': return { ...base, styles: { bgColor: '#F5F3EE', padding: '60px 24px' }, layout: { columns: 3, showAvatars: true }, content: { title: 'Our Team', members: [{ name: 'Name', role: 'Position', bio: 'Short bio' }] } };
    case 'pricing': return { ...base, styles: { bgColor: '#FFFFFF', padding: '60px 24px' }, layout: { columns: 3, style: 'cards' }, content: { title: 'Pricing', plans: [{ name: 'Basic', price: '$9', period: '/mo', features: ['Feature 1', 'Feature 2'] }, { name: 'Pro', price: '$29', period: '/mo', features: ['Feature 1', 'Feature 2', 'Feature 3'], highlighted: true }] } };
    case 'faq': return { ...base, styles: { bgColor: '#F5F3EE', padding: '60px 24px' }, layout: { style: 'accordion' }, content: { title: 'FAQ', items: [{ question: 'Question 1?', answer: 'Answer here.' }] } };
    case 'contact': return { ...base, styles: { bgColor: '#1A2B3C', textColor: '#FFFFFF', padding: '60px 24px' }, layout: { layout: 'centered', showMap: false }, content: { title: 'Contact Us', email: 'hello@example.com', phone: '+1 000-000-0000', showForm: true } };
    case 'stats': return { ...base, styles: { bgColor: '#FFFFFF', padding: '60px 24px' }, layout: { columns: 4, style: 'simple' }, content: { title: 'Our Impact', items: [{ value: '1,000+', label: 'Customers' }, { value: '99%', label: 'Satisfaction' }] } };
    case 'cta': return { ...base, styles: { bgColor: 'var(--accent)', textColor: '#FFFFFF', padding: '80px 24px' }, layout: { style: 'simple' }, content: { title: 'Ready to get started?', subtitle: 'Join thousands of happy customers', buttonText: 'Start Now', buttonLink: '#' } };
    case 'footer': return { ...base, styles: { bgColor: '#1A2B3C', textColor: '#FFFFFF' }, layout: { columns: 4, style: 'multi-column' }, content: { logo: 'Brand', tagline: 'Built with care.', links: [{ label: 'Home', href: '#' }, { label: 'About', href: '#' }, { label: 'Contact', href: '#' }], social: [], copyright: `\u00A9 ${new Date().getFullYear()} Brand. All rights reserved.` } };
    case 'divider': return { ...base, styles: { padding: '16px 24px' }, layout: { width: '100%', align: 'center' }, content: { style: 'line', label: '' } };
    case 'music': return { ...base, styles: { padding: '24px' }, layout: { style: 'minimal' }, content: { title: 'Background Music', trackId: 'track-1', autoplay: false, loop: true, showControls: true } };
    default: return base;
  }
}
