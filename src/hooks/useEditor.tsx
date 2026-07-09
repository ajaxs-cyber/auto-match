import { createContext, useContext, useReducer, useCallback, useRef, useEffect } from 'react';
import type { ReactNode } from 'react';
import type { Website, Page, WebsiteModule, EditorState, EditorAction, ColorPalette, FontPair } from '@/types';

function createSnapshot(state: EditorState): Website {
  return JSON.parse(JSON.stringify(state.website));
}

function editorReducer(state: EditorState, action: EditorAction): EditorState {
  const pushUndo = (s: EditorState): EditorState => ({
    ...s,
    undoStack: [...s.undoStack, createSnapshot(state)].slice(-50),
    redoStack: [],
    saved: false,
  });

  switch (action.type) {
    case 'INIT_WEBSITE': {
      const firstPage = action.website.pages[0]?.id ?? '';
      return {
        ...state,
        website: action.website,
        currentPageId: firstPage,
        selectedModuleId: null,
        selectedElementId: null,
        undoStack: [],
        redoStack: [],
        saved: true,
        lastSaved: new Date(),
      };
    }

    case 'SELECT_PAGE':
      return { ...state, currentPageId: action.pageId, selectedModuleId: null, selectedElementId: null };

    case 'SELECT_MODULE':
      return { ...state, selectedModuleId: action.moduleId, selectedElementId: null };

    case 'SELECT_ELEMENT':
      return { ...state, selectedElementId: action.elementId };

    case 'SET_ACTIVE_PANEL':
      return { ...state, activePanel: action.panel };

    case 'ADD_PAGE': {
      return pushUndo({ ...state, website: { ...state.website, pages: [...state.website.pages, action.page] }, currentPageId: action.page.id });
    }

    case 'DELETE_PAGE': {
      if (state.website.pages.length <= 1) return state;
      const filtered = state.website.pages.filter(p => p.id !== action.pageId);
      const newCurrent = filtered.find(p => p.id === state.currentPageId)?.id ?? filtered[0].id;
      return pushUndo({ ...state, website: { ...state.website, pages: filtered }, currentPageId: newCurrent, selectedModuleId: null });
    }

    case 'DUPLICATE_PAGE': {
      const page = state.website.pages.find(p => p.id === action.pageId);
      if (!page) return state;
      const newPage: Page = { ...JSON.parse(JSON.stringify(page)), id: `page-${Date.now()}`, name: `${page.name} (Copy)`, slug: `${page.slug}-copy`, isHome: false };
      return pushUndo({ ...state, website: { ...state.website, pages: [...state.website.pages, newPage] }, currentPageId: newPage.id });
    }

    case 'SET_HOME_PAGE': {
      const pages = state.website.pages.map(p => ({ ...p, isHome: p.id === action.pageId }));
      return pushUndo({ ...state, website: { ...state.website, pages } });
    }

    case 'RENAME_PAGE': {
      const pages = state.website.pages.map(p =>
        p.id === action.pageId ? { ...p, name: action.name, slug: `/${action.name.toLowerCase().replace(/\s+/g, '-')}` } : p
      );
      return pushUndo({ ...state, website: { ...state.website, pages } });
    }

    case 'ADD_MODULE': {
      const pi = state.website.pages.findIndex(p => p.id === action.pageId);
      if (pi === -1) return state;
      const page = state.website.pages[pi];
      const modules = [...page.modules];
      const idx = action.index ?? modules.length;
      modules.splice(idx, 0, action.module);
      const newPages = [...state.website.pages];
      newPages[pi] = { ...page, modules };
      return pushUndo({ ...state, website: { ...state.website, pages: newPages }, selectedModuleId: action.module.id });
    }

    case 'DELETE_MODULE': {
      const pi = state.website.pages.findIndex(p => p.id === action.pageId);
      if (pi === -1) return state;
      const page = state.website.pages[pi];
      const modules = page.modules.filter(m => m.id !== action.moduleId);
      const newPages = [...state.website.pages];
      newPages[pi] = { ...page, modules };
      return pushUndo({ ...state, website: { ...state.website, pages: newPages }, selectedModuleId: state.selectedModuleId === action.moduleId ? null : state.selectedModuleId });
    }

    case 'DUPLICATE_MODULE': {
      const pi = state.website.pages.findIndex(p => p.id === action.pageId);
      if (pi === -1) return state;
      const page = state.website.pages[pi];
      const mi = page.modules.findIndex(m => m.id === action.moduleId);
      if (mi === -1) return state;
      const newMod = { ...JSON.parse(JSON.stringify(page.modules[mi])), id: `mod-${Date.now()}-${Math.random().toString(36).slice(2, 5)}`, name: `${page.modules[mi].name} (Copy)` };
      const modules = [...page.modules];
      modules.splice(mi + 1, 0, newMod as WebsiteModule);
      const newPages = [...state.website.pages];
      newPages[pi] = { ...page, modules };
      return pushUndo({ ...state, website: { ...state.website, pages: newPages }, selectedModuleId: newMod.id });
    }

    case 'UPDATE_MODULE': {
      const pi = state.website.pages.findIndex(p => p.id === action.pageId);
      if (pi === -1) return state;
      const page = state.website.pages[pi];
      const modules = page.modules.map(m => m.id === action.moduleId ? { ...m, ...action.updates } as WebsiteModule : m);
      const newPages = [...state.website.pages];
      newPages[pi] = { ...page, modules };
      return pushUndo({ ...state, website: { ...state.website, pages: newPages } });
    }

    case 'UPDATE_MODULE_CONTENT': {
      const pi = state.website.pages.findIndex(p => p.id === action.pageId);
      if (pi === -1) return state;
      const page = state.website.pages[pi];
      const modules = page.modules.map(m => m.id === action.moduleId ? { ...m, content: { ...(m as any).content, ...action.content } } as WebsiteModule : m);
      const newPages = [...state.website.pages];
      newPages[pi] = { ...page, modules };
      return pushUndo({ ...state, website: { ...state.website, pages: newPages } });
    }

    case 'UPDATE_MODULE_LAYOUT': {
      const pi = state.website.pages.findIndex(p => p.id === action.pageId);
      if (pi === -1) return state;
      const page = state.website.pages[pi];
      const modules = page.modules.map(m => m.id === action.moduleId ? { ...m, layout: { ...(m as any).layout, ...action.layout } } as WebsiteModule : m);
      const newPages = [...state.website.pages];
      newPages[pi] = { ...page, modules };
      return pushUndo({ ...state, website: { ...state.website, pages: newPages } });
    }

    case 'REORDER_MODULES': {
      const pi = state.website.pages.findIndex(p => p.id === action.pageId);
      if (pi === -1) return state;
      const page = state.website.pages[pi];
      const modMap = new Map(page.modules.map(m => [m.id, m]));
      const reordered = action.moduleIds.map(id => modMap.get(id)!).filter(Boolean);
      const newPages = [...state.website.pages];
      newPages[pi] = { ...page, modules: reordered };
      return pushUndo({ ...state, website: { ...state.website, pages: newPages } });
    }

    case 'TOGGLE_MODULE_VISIBILITY': {
      const pi = state.website.pages.findIndex(p => p.id === action.pageId);
      if (pi === -1) return state;
      const page = state.website.pages[pi];
      const modules = page.modules.map(m => m.id === action.moduleId ? { ...m, visible: !m.visible } : m);
      const newPages = [...state.website.pages];
      newPages[pi] = { ...page, modules };
      return pushUndo({ ...state, website: { ...state.website, pages: newPages } });
    }

    case 'UPDATE_COLORS':
      return pushUndo({ ...state, website: { ...state.website, colors: { ...state.website.colors, ...action.colors } } });

    case 'UPDATE_FONTS':
      return pushUndo({ ...state, website: { ...state.website, fonts: { ...state.website.fonts, ...action.fonts } } });

    case 'UPDATE_WEBSITE_NAME':
      return pushUndo({ ...state, website: { ...state.website, name: action.name } });

    case 'SET_PAGE_MUSIC': {
      const pages = state.website.pages.map(p => p.id === action.pageId ? { ...p, musicTrackId: action.trackId } : p);
      return pushUndo({ ...state, website: { ...state.website, pages } });
    }

    case 'SET_INLINE_EDITING':
      return { ...state, inlineEditing: action.elementId };

    case 'UNDO': {
      if (state.undoStack.length === 0) return state;
      const prev = state.undoStack[state.undoStack.length - 1];
      return { ...state, website: prev, undoStack: state.undoStack.slice(0, -1), redoStack: [...state.redoStack, createSnapshot(state)], saved: false };
    }

    case 'REDO': {
      if (state.redoStack.length === 0) return state;
      const next = state.redoStack[state.redoStack.length - 1];
      return { ...state, website: next, undoStack: [...state.undoStack, createSnapshot(state)], redoStack: state.redoStack.slice(0, -1), saved: false };
    }

    case 'SAVE':
      return { ...state, saved: true, lastSaved: new Date() };

    case 'TOGGLE_LEFT_PANEL':
      return { ...state, leftPanelOpen: !state.leftPanelOpen };

    case 'TOGGLE_RIGHT_PANEL':
      return { ...state, rightPanelOpen: !state.rightPanelOpen };

    case 'SET_PREVIEW_DEVICE':
      return { ...state, previewDevice: action.device };

    default:
      return state;
  }
}

interface EditorContextValue {
  state: EditorState;
  dispatch: React.Dispatch<EditorAction>;
  currentPage: Page | null;
  selectedModule: WebsiteModule | null;
  canUndo: boolean;
  canRedo: boolean;
  exportWebsite: () => string;
  exportZip: () => void;
}

const EditorContext = createContext<EditorContextValue | null>(null);

const initialState: EditorState = {
  website: { id: '', name: '', pages: [], colors: { primary: '#1A2B3C', accent: '#E85D4C', background: '#F5F3EE', surface: '#FFFFFF', text: '#1A2B3C', textSecondary: '#5A6B7C', textMuted: '#8A96A5' }, fonts: { heading: 'Inter', body: 'Inter' } },
  currentPageId: '',
  selectedModuleId: null,
  selectedElementId: null,
  activePanel: 'components',
  undoStack: [],
  redoStack: [],
  leftPanelOpen: true,
  rightPanelOpen: true,
  previewDevice: 'desktop',
  saved: true,
  lastSaved: null,
  inlineEditing: null,
};

export function EditorProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  const autoSaveRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPage = state.website.pages.find(p => p.id === state.currentPageId) ?? null;
  const selectedModule = currentPage?.modules.find(m => m.id === state.selectedModuleId) ?? null;
  const canUndo = state.undoStack.length > 0;
  const canRedo = state.redoStack.length > 0;

  useEffect(() => {
    autoSaveRef.current = setInterval(() => {
      if (!state.saved && state.website.id) dispatch({ type: 'SAVE' });
    }, 30000);
    return () => { if (autoSaveRef.current) clearInterval(autoSaveRef.current); };
  }, [state.saved, state.website.id]);

  const exportWebsite = useCallback(() => generateHTML(state.website), [state.website]);

  const exportZip = useCallback(() => {
    const blob = new Blob([generateHTML(state.website)], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${state.website.name.replace(/\s+/g, '-').toLowerCase()}.html`;
    a.click();
    URL.revokeObjectURL(url);
  }, [state.website]);

  return (
    <EditorContext.Provider value={{ state, dispatch, currentPage, selectedModule, canUndo, canRedo, exportWebsite, exportZip }}>
      {children}
    </EditorContext.Provider>
  );
}

export function useEditor() {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error('useEditor must be used within EditorProvider');
  return ctx;
}

function generateHTML(website: Website): string {
  const page = website.pages.find(p => p.isHome) ?? website.pages[0];
  if (!page) return '';
  const visibleModules = page.modules.filter(m => m.visible);
  const modulesHTML = visibleModules.map(mod => generateModuleHTML(mod, website.colors)).join('\n');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${website.name}</title>
<link href="https://fonts.googleapis.com/css2?family=${website.fonts.heading.replace(/\s/g, '+')}:wght@400;600;700&family=${website.fonts.body.replace(/\s/g, '+')}:wght@400;500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{font-family:'${website.fonts.body}',system-ui,sans-serif;color:${website.colors.text};line-height:1.6}
.container{max-width:1200px;margin:0 auto;padding:0 24px}
img{max-width:100%;height:auto}
a{text-decoration:none;color:inherit}
button{cursor:pointer;border:none;font-family:inherit}
.btn-primary{background:${website.colors.primary};color:#fff;padding:14px 32px;border-radius:9999px;font-weight:600;transition:all .2s;display:inline-block}
.btn-primary:hover{opacity:.9;transform:translateY(-1px)}
.btn-secondary{background:transparent;color:${website.colors.primary};padding:14px 32px;border-radius:9999px;font-weight:600;border:1px solid ${website.colors.primary};display:inline-block}
.grid-2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:24px}
.grid-4{display:grid;grid-template-columns:repeat(4,1fr);gap:24px}
@media(max-width:768px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}}
</style>
</head>
<body>
${modulesHTML}
</body>
</html>`;
}

function generateModuleHTML(mod: WebsiteModule, colors: ColorPalette): string {
  const s = mod.styles;
  const style = `background:${s.bgColor ?? 'transparent'};color:${s.textColor ?? colors.text};padding:${s.padding ?? '60px 24px'};text-align:${s.textAlign ?? 'center'};`;
  const c = mod.content as any;
  const l = (mod as any).layout || {};

  switch (mod.type) {
    case 'navbar': return `  <nav style="${style}"><div class="container" style="display:flex;align-items:center;justify-content:space-between;gap:24px;flex-wrap:wrap;padding:16px 24px"><div style="font-size:1.25rem;font-weight:700">${c.logo}</div><div style="display:flex;align-items:center;gap:32px;flex-wrap:wrap">${c.links?.map((l: any) => `<a href="${l.href}" style="font-size:0.875rem;font-weight:500;opacity:0.8">${l.label}</a>`).join('')}<a href="${c.ctaLink}" class="btn-primary" style="font-size:0.75rem;padding:10px 24px">${c.ctaText}</a></div></div></nav>`;
    case 'hero': {
      const isSplit = l.imagePosition === 'left' || l.imagePosition === 'right';
      const imageHTML = c.image ? `<div style="${isSplit ? 'flex:1;min-width:300px' : 'position:absolute;inset:0;z-index:-1;opacity:0.2'}"><img src="${c.image}" alt="" style="width:100%;height:100%;object-fit:cover;border-radius:16px"/></div>` : '';
      const contentHTML = `<div style="${isSplit ? 'flex:1;min-width:300px;text-align:' + (l.alignment || 'left') : 'text-align:' + (l.alignment || 'center')}"><h1 style="font-size:clamp(2rem,5vw,3.5rem);font-weight:700;line-height:1.1;margin-bottom:16px">${c.title}</h1><p style="font-size:1.1rem;opacity:0.8;max-width:560px;margin:0 auto 32px">${c.subtitle}</p><div style="display:flex;gap:16px;justify-content:${l.alignment === 'center' || !l.alignment ? 'center' : l.alignment === 'right' ? 'flex-end' : 'flex-start'};flex-wrap:wrap"><a href="${c.buttonLink}" class="btn-primary">${c.buttonText}</a>${c.secondaryButtonText ? `<a href="${c.secondaryButtonLink}" class="btn-secondary">${c.secondaryButtonText}</a>` : ''}</div></div>`;
      if (isSplit) return `  <section style="${style}min-height:70vh;display:flex;align-items:center"><div class="container" style="display:flex;align-items:center;gap:48px;flex-wrap:wrap">${l.imagePosition === 'left' ? imageHTML + contentHTML : contentHTML + imageHTML}</div></section>`;
      return `  <section style="${style}min-height:80vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden">${imageHTML}${contentHTML}</section>`;
    }
    case 'text': return `  <section style="${style}"><div class="container" style="text-align:${l.alignment || 'center'};max-width:${l.maxWidth || '720px'};margin:0 auto"><h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:16px">${c.title}</h2><p style="opacity:0.8;line-height:1.7;margin-bottom:24px">${c.body}</p>${c.buttonText ? `<a href="${c.buttonLink}" class="btn-primary">${c.buttonText}</a>` : ''}</div></section>`;
    case 'features': return `  <section style="${style}"><div class="container" style="text-align:center"><h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:8px">${c.title}</h2>${c.subtitle ? `<p style="opacity:0.7;margin-bottom:40px">${c.subtitle}</p>` : ''}<div class="grid-${Math.min(c.items?.length || 3, l.columns || 3)}">${c.items?.map((item: any) => `<div style="padding:24px;border-radius:16px;background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.05);text-align:left"><h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px">${item.title}</h3><p style="font-size:0.875rem;opacity:0.7">${item.description}</p></div>`).join('')}</div></div></section>`;
    case 'gallery': return `  <section style="${style}"><div class="container" style="text-align:center">${c.title ? `<h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:32px">${c.title}</h2>` : ''}<div class="grid-${Math.min(c.images?.length || 3, l.columns || 3)}">${c.images?.map((img: any) => `<img src="${img.src}" alt="${img.alt}" style="width:100%;aspect-ratio:4/3;object-fit:cover;border-radius:12px"/>`).join('')}</div></div></section>`;
    case 'services': return `  <section style="${style}"><div class="container" style="text-align:center"><h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:8px">${c.title}</h2>${c.subtitle ? `<p style="opacity:0.7;margin-bottom:40px">${c.subtitle}</p>` : ''}<div class="grid-${Math.min(c.items?.length || 3, l.columns || 3)}">${c.items?.map((item: any) => `<div style="padding:24px;border-radius:16px;background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.05);text-align:left"><h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px">${item.title}</h3><p style="font-size:0.875rem;opacity:0.7">${item.description}</p></div>`).join('')}</div></div></section>`;
    case 'testimonials': return `  <section style="${style}"><div class="container" style="text-align:center">${c.title ? `<h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:32px">${c.title}</h2>` : ''}<div class="grid-${Math.min(c.items?.length || 2, l.columns || 2)}">${c.items?.map((item: any) => `<div style="padding:24px;border-radius:16px;background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.05);text-align:left"><p style="font-style:italic;margin-bottom:16px;opacity:0.9">&ldquo;${item.text}&rdquo;</p><p style="font-weight:600;font-size:0.9rem">${item.name}</p><p style="font-size:0.8rem;opacity:0.6">${item.role}</p></div>`).join('')}</div></div></section>`;
    case 'team': return `  <section style="${style}"><div class="container" style="text-align:center"><h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:8px">${c.title}</h2>${c.subtitle ? `<p style="opacity:0.7;margin-bottom:40px">${c.subtitle}</p>` : ''}<div class="grid-${Math.min(c.members?.length || 3, l.columns || 3)}">${c.members?.map((m: any) => `<div style="text-align:center;padding:24px"><div style="width:72px;height:72px;border-radius:50%;background:linear-gradient(135deg,${colors.primary}33,${colors.accent}33);margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:1.3rem;font-weight:700;color:${colors.primary}">${m.name.charAt(0)}</div><p style="font-weight:600">${m.name}</p><p style="font-size:0.75rem;opacity:0.6">${m.role}</p><p style="font-size:0.72rem;opacity:0.5;margin-top:6px">${m.bio}</p></div>`).join('')}</div></div></section>`;
    case 'pricing': return `  <section style="${style}"><div class="container" style="text-align:center"><h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:8px">${c.title}</h2>${c.subtitle ? `<p style="opacity:0.7;margin-bottom:40px">${c.subtitle}</p>` : ''}<div class="grid-${Math.min(c.plans?.length || 3, l.columns || 3)}">${c.plans?.map((plan: any) => `<div style="padding:32px;border-radius:16px;background:rgba(255,255,255,0.5);border:2px solid ${plan.highlighted ? colors.accent : 'rgba(0,0,0,0.05)'};${plan.highlighted ? 'transform:scale(1.02)' : ''}"><h3 style="font-size:1.1rem;font-weight:600;margin-bottom:8px">${plan.name}</h3><p style="font-size:2rem;font-weight:700;color:${colors.primary};margin-bottom:16px">${plan.price}<span style="font-size:0.875rem;font-weight:400;opacity:0.6">${plan.period}</span></p><ul style="list-style:none;padding:0">${plan.features?.map((f: string) => `<li style="padding:6px 0;font-size:0.875rem;display:flex;align-items:center;gap:8px"><span style="color:#2D8A4E">&#10003;</span>${f}</li>`).join('')}</ul></div>`).join('')}</div></div></section>`;
    case 'faq': return `  <section style="${style}"><div class="container" style="max-width:800px"><h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;text-align:center;margin-bottom:32px">${c.title}</h2><div style="display:flex;flex-direction:column;gap:12px">${c.items?.map((item: any) => `<details style="padding:20px;border-radius:12px;background:rgba(255,255,255,0.5);border:1px solid rgba(0,0,0,0.05);cursor:pointer"><summary style="font-weight:600;display:flex;justify-content:space-between;align-items:center">${item.question}<span>+</span></summary><p style="margin-top:12px;opacity:0.8">${item.answer}</p></details>`).join('')}</div></div></section>`;
    case 'contact': return `  <section style="${style}"><div class="container" style="text-align:center"><h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:8px">${c.title}</h2>${c.subtitle ? `<p style="opacity:0.7;margin-bottom:24px">${c.subtitle}</p>` : ''}<div style="display:flex;flex-wrap:wrap;gap:20px;justify-content:center;margin-bottom:28px">${c.email ? `<p style="font-size:0.82rem;opacity:0.7">&#9993; ${c.email}</p>` : ''}${c.phone ? `<p style="font-size:0.82rem;opacity:0.7">&#9742; ${c.phone}</p>` : ''}${c.address ? `<p style="font-size:0.82rem;opacity:0.7">&#10070; ${c.address}</p>` : ''}</div>${c.showForm ? `<form style="max-width:480px;margin:0 auto;display:flex;flex-direction:column;gap:10px;text-align:left" onsubmit="event.preventDefault();alert('Thank you!')\"><input type=\"text\" placeholder=\"Your Name\" required style=\"padding:12px 16px;border-radius:8px;border:1px solid rgba(0,0,0,0.1);font-family:inherit\"><input type=\"email\" placeholder=\"Your Email\" required style=\"padding:12px 16px;border-radius:8px;border:1px solid rgba(0,0,0,0.1);font-family:inherit\"><textarea placeholder=\"Your Message\" rows=\"4\" required style=\"padding:12px 16px;border-radius:8px;border:1px solid rgba(0,0,0,0.1);font-family:inherit;resize:vertical\"></textarea><button type=\"submit\" class=\"btn-primary\" style=\"align-self:center\">Send Message</button></form>` : ''}</div></section>`;
    case 'footer': return `  <footer style="${style}"><div class="container"><div style="display:flex;flex-wrap:wrap;gap:40px;justify-content:space-between;align-items:center;padding:40px 0"><div><p style="font-weight:700;font-size:1.1rem;margin-bottom:4px">${c.logo}</p><p style="font-size:0.8rem;opacity:0.6">${c.tagline}</p></div><div style="display:flex;gap:24px;flex-wrap:wrap">${c.links?.map((l: any) => `<a href="${l.href}" style="font-size:0.875rem;opacity:0.7;transition:opacity 0.2s">${l.label}</a>`).join('')}</div></div><div style="border-top:1px solid rgba(255,255,255,0.1);padding:20px 0;text-align:center"><p style="font-size:0.75rem;opacity:0.5">${c.copyright}</p></div></div></footer>`;
    case 'stats': return `  <section style="${style}"><div class="container" style="text-align:center">${c.title ? `<h2 style="font-size:clamp(1.5rem,3vw,2rem);font-weight:700;margin-bottom:32px">${c.title}</h2>` : ''}<div class="grid-${Math.min(c.items?.length || 4, l.columns || 4)}">${c.items?.map((item: any) => `<div style="text-align:center;padding:24px"><p style="font-size:2.5rem;font-weight:700;color:${colors.primary}">${item.value}</p><p style="font-size:0.85rem;opacity:0.6;margin-top:4px">${item.label}</p></div>`).join('')}</div></div></section>`;
    case 'cta': return `  <section style="${style}${l.style === 'gradient' ? `background:linear-gradient(135deg,${colors.primary},${colors.accent})!important;color:white!important;` : l.style === 'boxed' ? '' : ''}"><div class="container" style="text-align:center;padding:${l.style === 'boxed' ? '48px' : '0'}"><h2 style="font-size:clamp(1.5rem,3vw,2.5rem);font-weight:700;margin-bottom:12px">${c.title}</h2>${c.subtitle ? `<p style="opacity:0.8;margin-bottom:24px">${c.subtitle}</p>` : ''}<a href="${c.buttonLink}" class="btn-primary" style="${l.style === 'gradient' ? 'background:white!important;color:' + colors.primary + '!important' : ''}">${c.buttonText}</a></div></section>`;
    default: return `  <section style="${style}"><div class="container"><p style="text-align:center;opacity:0.5">${mod.name}</p></div></section>`;
  }
}
