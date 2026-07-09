import { useState } from 'react';
import { useEditor } from '@/hooks/useEditor';
import { useToast } from '@/hooks/useToast';
import { Type, Layout, Music, Image, Star, Phone, Users, HelpCircle, CreditCard, ShoppingBag, Briefcase, Video, Play, SeparatorHorizontal, CircleDot, ChevronDown, Trash2, Copy, Eye, EyeOff } from 'lucide-react';

const MODULE_ICONS: Record<string, React.ReactNode> = {
  hero: <Layout size={14} />, navbar: <CircleDot size={14} />, text: <Type size={14} />,
  features: <Star size={14} />, gallery: <Image size={14} />, products: <ShoppingBag size={14} />,
  services: <Briefcase size={14} />, testimonials: <Users size={14} />, team: <Users size={14} />,
  pricing: <CreditCard size={14} />, faq: <HelpCircle size={14} />, contact: <Phone size={14} />,
  footer: <Layout size={14} />, carousel: <Play size={14} />, video: <Video size={14} />,
  button: <CircleDot size={14} />, divider: <SeparatorHorizontal size={14} />, music: <Music size={14} />,
};

export default function PropertiesPanel() {
  const { dispatch, selectedModule, currentPage } = useEditor();
  const toast = useToast();

  if (!selectedModule || !currentPage) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-6 text-center" style={{ color: 'var(--text-tertiary)' }}>
        <Layout size={32} className="mb-3 opacity-30" />
        <p className="text-sm font-medium">Select a module to edit</p>
        <p className="text-xs mt-1 opacity-60">Click any module in the preview</p>
      </div>
    );
  }

  const mod = selectedModule;
  const c = mod.content as any;

  const updateContent = (updates: Record<string, any>) => {
    dispatch({
      type: 'UPDATE_MODULE',
      pageId: currentPage.id,
      moduleId: mod.id,
      updates: { content: { ...c, ...updates } },
    });
  };

  const updateStyles = (updates: Record<string, any>) => {
    dispatch({
      type: 'UPDATE_MODULE',
      pageId: currentPage.id,
      moduleId: mod.id,
      updates: { styles: { ...mod.styles, ...updates } },
    });
  };

  const handleDelete = () => {
    dispatch({ type: 'DELETE_MODULE', pageId: currentPage.id, moduleId: mod.id });
    toast.success('Module deleted');
  };

  const handleDuplicate = () => {
    dispatch({ type: 'DUPLICATE_MODULE', pageId: currentPage.id, moduleId: mod.id });
    toast.success('Module duplicated');
  };

  const handleToggleVisibility = () => {
    dispatch({ type: 'TOGGLE_MODULE_VISIBILITY', pageId: currentPage.id, moduleId: mod.id });
    toast.info(mod.visible ? 'Module hidden' : 'Module visible');
  };

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Module Header */}
      <div className="px-4 py-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--border-color)' }}>
        <div className="flex items-center gap-2">
          <span style={{ color: 'var(--accent)' }}>{MODULE_ICONS[mod.type]}</span>
          <span className="text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>{mod.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={handleToggleVisibility} className="p-1.5 rounded-md bg-transparent border-none cursor-pointer hover:bg-gray-100 transition-colors" title={mod.visible ? 'Hide' : 'Show'} style={{ color: mod.visible ? 'var(--success)' : 'var(--text-tertiary)' }}>
            {mod.visible ? <Eye size={14} /> : <EyeOff size={14} />}
          </button>
          <button onClick={handleDuplicate} className="p-1.5 rounded-md bg-transparent border-none cursor-pointer hover:bg-gray-100 transition-colors" title="Duplicate" style={{ color: 'var(--text-secondary)' }}>
            <Copy size={14} />
          </button>
          <button onClick={handleDelete} className="p-1.5 rounded-md bg-transparent border-none cursor-pointer hover:bg-red-50 transition-colors" title="Delete" style={{ color: 'var(--text-tertiary)' }}>
            <Trash2 size={14} />
          </button>
        </div>
      </div>

      <div className="p-4 space-y-5">
        {/* Module Name */}
        <Field label="Module Name">
          <input
            type="text"
            value={mod.name}
            onChange={(e) => dispatch({ type: 'UPDATE_MODULE', pageId: currentPage.id, moduleId: mod.id, updates: { name: e.target.value } })}
            className="prop-input"
          />
        </Field>

        {/* Content Fields - Dynamic based on module type */}
        {c.title !== undefined && (
          <Field label="Title">
            <input type="text" value={c.title} onChange={(e) => updateContent({ title: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.subtitle !== undefined && (
          <Field label="Subtitle">
            <input type="text" value={c.subtitle} onChange={(e) => updateContent({ subtitle: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.body !== undefined && (
          <Field label="Body Text">
            <textarea value={c.body} onChange={(e) => updateContent({ body: e.target.value })} rows={4} className="prop-input" style={{ resize: 'vertical' }} />
          </Field>
        )}

        {c.buttonText !== undefined && (
          <Field label="Button Text">
            <input type="text" value={c.buttonText} onChange={(e) => updateContent({ buttonText: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.buttonLink !== undefined && (
          <Field label="Button Link">
            <input type="text" value={c.buttonLink} onChange={(e) => updateContent({ buttonLink: e.target.value })} className="prop-input" placeholder="#section" />
          </Field>
        )}

        {c.logo !== undefined && (
          <Field label="Logo Text">
            <input type="text" value={c.logo} onChange={(e) => updateContent({ logo: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.ctaText !== undefined && (
          <Field label="CTA Button Text">
            <input type="text" value={c.ctaText} onChange={(e) => updateContent({ ctaText: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.email !== undefined && (
          <Field label="Email">
            <input type="text" value={c.email || ''} onChange={(e) => updateContent({ email: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.phone !== undefined && (
          <Field label="Phone">
            <input type="text" value={c.phone || ''} onChange={(e) => updateContent({ phone: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.address !== undefined && (
          <Field label="Address">
            <input type="text" value={c.address || ''} onChange={(e) => updateContent({ address: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.showForm !== undefined && (
          <Field label="Show Contact Form">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" checked={c.showForm} onChange={(e) => updateContent({ showForm: e.target.checked })} className="w-4 h-4 accent-[var(--accent)]" />
              <span className="text-xs" style={{ color: 'var(--text-secondary)' }}>Enable contact form</span>
            </label>
          </Field>
        )}

        {c.tagline !== undefined && (
          <Field label="Tagline">
            <input type="text" value={c.tagline} onChange={(e) => updateContent({ tagline: e.target.value })} className="prop-input" />
          </Field>
        )}

        {c.copyright !== undefined && (
          <Field label="Copyright">
            <input type="text" value={c.copyright} onChange={(e) => updateContent({ copyright: e.target.value })} className="prop-input" />
          </Field>
        )}

        {/* Items Editor */}
        {c.items && Array.isArray(c.items) && c.items.length > 0 && (
          <CollapsibleSection title={`Items (${c.items.length})`}>
            <div className="space-y-3">
              {c.items.map((item: any, i: number) => (
                <div key={i} className="p-3 rounded-lg space-y-2" style={{ background: 'rgba(26,43,60,0.03)', border: '1px solid var(--border-color)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold" style={{ color: 'var(--text-tertiary)' }}>#{i + 1}</span>
                    <button
                      onClick={() => {
                        const newItems = c.items.filter((_: any, idx: number) => idx !== i);
                        updateContent({ items: newItems });
                      }}
                      className="p-1 rounded bg-transparent border-none cursor-pointer hover:bg-red-50"
                      style={{ color: '#ef4444' }}
                    >
                      <Trash2 size={12} />
                    </button>
                  </div>
                  {Object.keys(item).map((key) => (
                    <div key={key}>
                      <label className="text-xs capitalize mb-1 block" style={{ color: 'var(--text-tertiary)' }}>{key}</label>
                      {typeof item[key] === 'string' && item[key].length > 40 ? (
                        <textarea
                          value={item[key]}
                          onChange={(e) => {
                            const newItems = [...c.items];
                            newItems[i] = { ...newItems[i], [key]: e.target.value };
                            updateContent({ items: newItems });
                          }}
                          rows={2}
                          className="prop-input text-xs"
                        />
                      ) : typeof item[key] === 'string' ? (
                        <input
                          type="text"
                          value={item[key]}
                          onChange={(e) => {
                            const newItems = [...c.items];
                            newItems[i] = { ...newItems[i], [key]: e.target.value };
                            updateContent({ items: newItems });
                          }}
                          className="prop-input text-xs"
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
              ))}
              <button
                onClick={() => {
                  const template = { ...c.items[0] };
                  Object.keys(template).forEach(k => template[k] = typeof template[k] === 'string' ? `New ${k}` : template[k]);
                  updateContent({ items: [...c.items, template] });
                }}
                className="w-full py-2 rounded-lg text-xs font-medium border-dashed border cursor-pointer transition-colors hover:border-[var(--accent)] hover:text-[var(--accent)]"
                style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)', background: 'transparent' }}
              >
                + Add Item
              </button>
            </div>
          </CollapsibleSection>
        )}

        {/* Navigation Links Editor */}
        {c.links && Array.isArray(c.links) && mod.type === 'navbar' && (
          <CollapsibleSection title={`Nav Links (${c.links.length})`}>
            <div className="space-y-2">
              {c.links.map((link: any, i: number) => (
                <div key={i} className="flex gap-2">
                  <input type="text" value={link.label} onChange={(e) => { const nl = [...c.links]; nl[i] = { ...nl[i], label: e.target.value }; updateContent({ links: nl }); }} className="prop-input text-xs flex-1" placeholder="Label" />
                  <input type="text" value={link.href} onChange={(e) => { const nl = [...c.links]; nl[i] = { ...nl[i], href: e.target.value }; updateContent({ links: nl }); }} className="prop-input text-xs flex-1" placeholder="#" />
                  <button onClick={() => updateContent({ links: c.links.filter((_: any, idx: number) => idx !== i) })} className="p-1 rounded bg-transparent border-none cursor-pointer hover:bg-red-50" style={{ color: '#ef4444' }}><Trash2 size={12} /></button>
                </div>
              ))}
              <button onClick={() => updateContent({ links: [...c.links, { label: 'New Link', href: '#' }] })} className="w-full py-2 rounded-lg text-xs font-medium border-dashed border cursor-pointer hover:border-[var(--accent)] hover:text-[var(--accent)]" style={{ borderColor: 'var(--border-color)', color: 'var(--text-tertiary)', background: 'transparent' }}>+ Add Link</button>
            </div>
          </CollapsibleSection>
        )}

        {/* Divider */}
        {mod.type === 'divider' && (
          <>
            <Field label="Style">
              <select value={c.style} onChange={(e) => updateContent({ style: e.target.value })} className="prop-input">
                <option value="line">Line</option>
                <option value="dashed">Dashed</option>
                <option value="dotted">Dotted</option>
                <option value="space">Space</option>
              </select>
            </Field>
            <Field label="Label (optional)">
              <input type="text" value={c.label || ''} onChange={(e) => updateContent({ label: e.target.value })} className="prop-input" placeholder="Section" />
            </Field>
          </>
        )}

        {/* Button Module */}
        {mod.type === 'button' && (
          <>
            <Field label="Button Text">
              <input type="text" value={c.text} onChange={(e) => updateContent({ text: e.target.value })} className="prop-input" />
            </Field>
            <Field label="Link">
              <input type="text" value={c.link} onChange={(e) => updateContent({ link: e.target.value })} className="prop-input" />
            </Field>
            <Field label="Variant">
              <select value={c.variant} onChange={(e) => updateContent({ variant: e.target.value })} className="prop-input">
                <option value="primary">Primary</option>
                <option value="secondary">Secondary</option>
                <option value="outline">Outline</option>
              </select>
            </Field>
            <Field label="Size">
              <select value={c.size} onChange={(e) => updateContent({ size: e.target.value })} className="prop-input">
                <option value="small">Small</option>
                <option value="medium">Medium</option>
                <option value="large">Large</option>
              </select>
            </Field>
            <Field label="Alignment">
              <select value={c.align} onChange={(e) => updateContent({ align: e.target.value })} className="prop-input">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </Field>
          </>
        )}

        {/* Styles Section */}
        <CollapsibleSection title="Appearance">
          <div className="space-y-3">
            <Field label="Background Color">
              <div className="flex items-center gap-2">
                <input type="color" value={mod.styles.bgColor || '#ffffff'} onChange={(e) => updateStyles({ bgColor: e.target.value })} className="w-8 h-8 rounded-lg border-none cursor-pointer" />
                <input type="text" value={mod.styles.bgColor || ''} onChange={(e) => updateStyles({ bgColor: e.target.value })} className="prop-input text-xs flex-1" />
              </div>
            </Field>
            <Field label="Text Color">
              <div className="flex items-center gap-2">
                <input type="color" value={mod.styles.textColor || '#1A2B3C'} onChange={(e) => updateStyles({ textColor: e.target.value })} className="w-8 h-8 rounded-lg border-none cursor-pointer" />
                <input type="text" value={mod.styles.textColor || ''} onChange={(e) => updateStyles({ textColor: e.target.value })} className="prop-input text-xs flex-1" />
              </div>
            </Field>
            <Field label="Text Align">
              <select value={mod.styles.textAlign || 'center'} onChange={(e) => updateStyles({ textAlign: e.target.value as any })} className="prop-input">
                <option value="left">Left</option>
                <option value="center">Center</option>
                <option value="right">Right</option>
              </select>
            </Field>
            <Field label="Padding">
              <select value={mod.styles.padding || '48px 24px'} onChange={(e) => updateStyles({ padding: e.target.value })} className="prop-input">
                <option value="24px 24px">Small</option>
                <option value="48px 24px">Medium</option>
                <option value="80px 24px">Large</option>
                <option value="120px 24px">Extra Large</option>
              </select>
            </Field>
          </div>
        </CollapsibleSection>
      </div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-xs font-semibold uppercase tracking-wider mb-1.5 block" style={{ color: 'var(--text-tertiary)' }}>{label}</label>
      {children}
    </div>
  );
}

function CollapsibleSection({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-t pt-3" style={{ borderColor: 'var(--border-color)' }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-1 bg-transparent border-none cursor-pointer">
        <span className="text-xs font-semibold uppercase tracking-wider" style={{ color: 'var(--text-tertiary)' }}>{title}</span>
        <ChevronDown size={14} style={{ color: 'var(--text-tertiary)', transform: open ? 'rotate(180deg)' : 'rotate(0)', transition: 'transform 0.2s' }} />
      </button>
      {open && <div className="mt-3">{children}</div>}
    </div>
  );
}
