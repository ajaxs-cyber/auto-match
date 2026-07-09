import type { WebsiteModule, ColorPalette, FontPair } from '@/types';

interface Props {
  mod: WebsiteModule;
  colors: ColorPalette;
  fonts: FontPair;
  isSelected: boolean;
  onClick: () => void;
}

export default function ModuleRenderer({ mod, colors, fonts, isSelected, onClick }: Props) {
  const s = mod.styles;
  const baseStyle: React.CSSProperties = {
    background: s.bgColor ?? 'transparent',
    color: s.textColor ?? colors.text,
    padding: s.padding ?? '48px 24px',
    textAlign: (s.textAlign ?? 'center') as any,
    borderRadius: s.borderRadius,
    position: 'relative',
    outline: isSelected ? '3px solid var(--accent)' : '2px solid transparent',
    outlineOffset: '-2px',
    cursor: 'pointer',
    transition: 'outline 0.15s ease',
  };

  return (
    <div style={baseStyle} onClick={onClick} className="module-wrapper">
      {isSelected && (
        <div className="absolute top-2 right-2 z-10 px-2 py-1 rounded-md text-xs font-semibold text-white"
          style={{ background: 'var(--accent)' }}>
          {mod.name}
        </div>
      )}
      {renderModuleContent(mod, colors, fonts)}
    </div>
  );
}

function renderModuleContent(mod: WebsiteModule, colors: ColorPalette, fonts: FontPair): React.ReactNode {
  const c = mod.content as any;

  switch (mod.type) {
    case 'navbar':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 24, flexWrap: 'wrap', padding: '16px 24px' }}>
          <div style={{ fontSize: '1.15rem', fontWeight: 700, fontFamily: fonts.heading, letterSpacing: '-0.02em' }}>{c.logo}</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 24, flexWrap: 'wrap' }}>
            {c.links?.map((l: any, i: number) => <span key={i} style={{ fontSize: '0.82rem', fontWeight: 500, opacity: 0.8 }}>{l.label}</span>)}
            <span style={{ fontSize: '0.7rem', fontWeight: 600, padding: '8px 18px', borderRadius: 9999, background: colors.primary, color: 'white' }}>{c.ctaText}</span>
          </div>
        </div>
      );
    case 'hero':
      return (
        <div style={{ maxWidth: 800, margin: '0 auto', padding: '80px 24px', textAlign: (mod.styles.textAlign ?? 'center') as any }}>
          <h1 style={{ fontSize: 'clamp(1.6rem,4vw,2.8rem)', fontWeight: 700, lineHeight: 1.1, marginBottom: 16, fontFamily: fonts.heading, letterSpacing: '-0.02em' }}>{c.title}</h1>
          <p style={{ fontSize: '0.95rem', opacity: 0.8, maxWidth: 520, margin: '0 auto 28px', lineHeight: 1.6 }}>{c.subtitle}</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: (mod.styles.textAlign ?? 'center') === 'center' ? 'center' : (mod.styles.textAlign ?? 'center') === 'right' ? 'flex-end' : 'flex-start', flexWrap: 'wrap' }}>
            <span style={{ padding: '12px 28px', borderRadius: 9999, background: colors.primary, color: 'white', fontSize: '0.78rem', fontWeight: 600 }}>{c.buttonText}</span>
            {c.secondaryButtonText && <span style={{ padding: '12px 28px', borderRadius: 9999, border: `1px solid ${colors.primary}`, color: colors.primary, fontSize: '0.78rem', fontWeight: 600 }}>{c.secondaryButtonText}</span>}
          </div>
        </div>
      );
    case 'text':
      return (
        <div style={{ maxWidth: 720, margin: '0 auto', textAlign: (mod.styles.textAlign ?? 'center') as any }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 14 }}>{c.title}</h2>
          <p style={{ fontSize: '0.88rem', opacity: 0.8, lineHeight: 1.7, marginBottom: 20 }}>{c.body}</p>
          {c.buttonText && <span style={{ padding: '12px 28px', borderRadius: 9999, background: colors.primary, color: 'white', fontSize: '0.78rem', fontWeight: 600, display: 'inline-block' }}>{c.buttonText}</span>}
        </div>
      );
    case 'features':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 6 }}>{c.title}</h2>
          {c.subtitle && <p style={{ fontSize: '0.85rem', opacity: 0.65, marginBottom: 36 }}>{c.subtitle}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, textAlign: 'left' }}>
            {c.items?.map((item: any, i: number) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: '0.78rem', opacity: 0.65, lineHeight: 1.5 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'gallery':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          {c.title && <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 28 }}>{c.title}</h2>}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${Math.min(c.columns ?? 3, 3)}, 1fr)`, gap: 12 }}>
            {c.images?.map((img: any, i: number) => (
              <div key={i} style={{ aspectRatio: '4/3', borderRadius: 12, overflow: 'hidden', background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accent}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                {img.src ? <img src={img.src} alt={img.alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <span style={{ fontSize: '0.75rem', opacity: 0.4 }}>Image {i + 1}</span>}
              </div>
            ))}
          </div>
        </div>
      );
    case 'services':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 6 }}>{c.title}</h2>
          {c.subtitle && <p style={{ fontSize: '0.85rem', opacity: 0.65, marginBottom: 36 }}>{c.subtitle}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20, textAlign: 'left' }}>
            {c.items?.map((item: any, i: number) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{item.title}</h3>
                <p style={{ fontSize: '0.78rem', opacity: 0.65, lineHeight: 1.5 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'testimonials':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          {c.title && <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 28 }}>{c.title}</h2>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20, textAlign: 'left' }}>
            {c.items?.map((item: any, i: number) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ fontStyle: 'italic', marginBottom: 16, fontSize: '0.85rem', opacity: 0.85, lineHeight: 1.6 }}>&ldquo;{item.text}&rdquo;</p>
                <div>
                  <p style={{ fontWeight: 600, fontSize: '0.82rem' }}>{item.name}</p>
                  <p style={{ fontSize: '0.72rem', opacity: 0.55 }}>{item.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
    case 'team':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 6 }}>{c.title}</h2>
          {c.subtitle && <p style={{ fontSize: '0.85rem', opacity: 0.65, marginBottom: 36 }}>{c.subtitle}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 20 }}>
            {c.members?.map((m: any, i: number) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{ width: 72, height: 72, borderRadius: '50%', background: `linear-gradient(135deg, ${colors.primary}33, ${colors.accent}33)`, margin: '0 auto 12px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', fontWeight: 700, color: colors.primary }}>{(m as any).name?.charAt(0)}</div>
                <p style={{ fontWeight: 600, fontSize: '0.88rem' }}>{m.name}</p>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{m.role}</p>
                <p style={{ fontSize: '0.72rem', opacity: 0.5, marginTop: 6 }}>{m.bio}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'pricing':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 6 }}>{c.title}</h2>
          {c.subtitle && <p style={{ fontSize: '0.85rem', opacity: 0.65, marginBottom: 36 }}>{c.subtitle}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, textAlign: 'left' }}>
            {c.plans?.map((plan: any, i: number) => (
              <div key={i} style={{ padding: 28, borderRadius: 16, background: 'rgba(255,255,255,0.5)', border: `2px solid ${plan.highlighted ? colors.accent : 'rgba(0,0,0,0.05)'}`, transform: plan.highlighted ? 'scale(1.02)' : 'none' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600, marginBottom: 8 }}>{plan.name}</h3>
                <p style={{ fontSize: '1.8rem', fontWeight: 700, color: colors.primary, marginBottom: 16 }}>{plan.price}<span style={{ fontSize: '0.75rem', fontWeight: 400, opacity: 0.55 }}>{plan.period}</span></p>
                <ul style={{ listStyle: 'none', padding: 0 }}>
                  {plan.features?.map((f: string, j: number) => (
                    <li key={j} style={{ padding: '5px 0', fontSize: '0.78rem', display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ color: '#2D8A4E' }}>&#10003;</span>{f}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      );
    case 'faq':
      return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, textAlign: 'center', marginBottom: 28 }}>{c.title}</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {c.items?.map((item: any, i: number) => (
              <div key={i} style={{ padding: 18, borderRadius: 12, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <p style={{ fontWeight: 600, fontSize: '0.85rem' }}>{item.question}</p>
                <p style={{ marginTop: 8, fontSize: '0.8rem', opacity: 0.75, lineHeight: 1.5 }}>{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'products':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 6 }}>{c.title}</h2>
          {c.subtitle && <p style={{ fontSize: '0.85rem', opacity: 0.65, marginBottom: 36 }}>{c.subtitle}</p>}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, textAlign: 'left' }}>
            {c.items?.map((item: any, i: number) => (
              <div key={i} style={{ padding: 24, borderRadius: 16, background: 'rgba(255,255,255,0.5)', border: '1px solid rgba(0,0,0,0.05)' }}>
                <h3 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{item.name}</h3>
                <p style={{ fontSize: '1.2rem', fontWeight: 700, color: colors.primary, margin: '8px 0' }}>{item.price}</p>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      );
    case 'contact':
      return (
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 6 }}>{c.title}</h2>
          {c.subtitle && <p style={{ fontSize: '0.85rem', opacity: 0.65, marginBottom: 24 }}>{c.subtitle}</p>}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 20, justifyContent: 'center', marginBottom: 28 }}>
            {c.email && <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>&#9993; {c.email}</p>}
            {c.phone && <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>&#9742; {c.phone}</p>}
            {c.address && <p style={{ fontSize: '0.82rem', opacity: 0.7 }}>&#10070; {c.address}</p>}
          </div>
          {c.showForm && (
            <div style={{ maxWidth: 480, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 10, textAlign: 'left' }}>
              <input type="text" placeholder="Your Name" readOnly style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.82rem', fontFamily: 'inherit', background: 'rgba(255,255,255,0.6)' }} />
              <input type="email" placeholder="Your Email" readOnly style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.82rem', fontFamily: 'inherit', background: 'rgba(255,255,255,0.6)' }} />
              <textarea placeholder="Your Message" rows={3} readOnly style={{ padding: '10px 14px', borderRadius: 8, border: '1px solid rgba(0,0,0,0.1)', fontSize: '0.82rem', fontFamily: 'inherit', resize: 'vertical', background: 'rgba(255,255,255,0.6)' }} />
              <span style={{ padding: '10px 24px', borderRadius: 9999, background: colors.primary, color: 'white', fontSize: '0.75rem', fontWeight: 600, textAlign: 'center', display: 'inline-block', alignSelf: 'center' }}>Send Message</span>
            </div>
          )}
        </div>
      );
    case 'footer':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, justifyContent: 'space-between', alignItems: 'center', padding: '28px 0' }}>
            <div>
              <p style={{ fontWeight: 700, fontSize: '1rem' }}>{c.logo}</p>
              <p style={{ fontSize: '0.72rem', opacity: 0.5, marginTop: 2 }}>{c.tagline}</p>
            </div>
            <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
              {c.links?.map((l: any, i: number) => <span key={i} style={{ fontSize: '0.78rem', opacity: 0.6 }}>{l.label}</span>)}
            </div>
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', padding: '14px 0', textAlign: 'center' }}>
            <p style={{ fontSize: '0.68rem', opacity: 0.4 }}>{c.copyright}</p>
          </div>
        </div>
      );
    case 'carousel':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto' }}>
          <div style={{ aspectRatio: '16/7', borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${colors.primary}22, ${colors.accent}22)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <p style={{ fontSize: '1.1rem', fontWeight: 600 }}>{c.slides?.[0]?.title ?? 'Slide 1'}</p>
              {c.slides?.[0]?.subtitle && <p style={{ fontSize: '0.8rem', opacity: 0.6, marginTop: 6 }}>{c.slides[0].subtitle}</p>}
              <p style={{ fontSize: '0.72rem', opacity: 0.4, marginTop: 12 }}>Carousel ({c.slides?.length ?? 0} slides)</p>
            </div>
          </div>
        </div>
      );
    case 'video':
      return (
        <div style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
          {c.title && <h2 style={{ fontSize: 'clamp(1.3rem,2.5vw,1.8rem)', fontWeight: 700, marginBottom: 20 }}>{c.title}</h2>}
          <div style={{ aspectRatio: '16/9', borderRadius: 16, overflow: 'hidden', background: `linear-gradient(135deg, ${colors.primary}33, ${colors.accent}33)`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 56, height: 56, borderRadius: '50%', background: 'rgba(255,255,255,0.9)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem' }}>&#9654;</div>
          </div>
        </div>
      );
    case 'button':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: (c.align ?? 'center') as any }}>
          <span style={{
            padding: c.size === 'large' ? '14px 36px' : c.size === 'small' ? '8px 20px' : '12px 28px',
            borderRadius: 9999,
            fontSize: c.size === 'large' ? '0.85rem' : c.size === 'small' ? '0.72rem' : '0.78rem',
            fontWeight: 600,
            display: 'inline-block',
            background: c.variant === 'primary' ? colors.primary : c.variant === 'secondary' ? colors.accent : 'transparent',
            color: c.variant === 'outline' ? colors.primary : 'white',
            border: c.variant === 'outline' ? `2px solid ${colors.primary}` : 'none',
          }}>{c.text}</span>
        </div>
      );
    case 'divider':
      return (
        <div style={{ maxWidth: 1200, margin: '0 auto', display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, height: 1, borderTop: `2px ${c.style === 'dashed' ? 'dashed' : c.style === 'dotted' ? 'dotted' : 'solid'} rgba(0,0,0,0.1)` }} />
          {c.label && <span style={{ fontSize: '0.72rem', fontWeight: 600, opacity: 0.5, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{c.label}</span>}
          <div style={{ flex: 1, height: 1, borderTop: `2px ${c.style === 'dashed' ? 'dashed' : c.style === 'dotted' ? 'dotted' : 'solid'} rgba(0,0,0,0.1)` }} />
        </div>
      );
    case 'music':
      return (
        <div style={{ maxWidth: 600, margin: '0 auto' }}>
          <div style={{ padding: 20, borderRadius: 16, background: 'rgba(123,97,255,0.08)', border: '1px solid rgba(123,97,255,0.15)', display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'linear-gradient(135deg, #7B61FF33, #E85D4C33)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>&#9835;</div>
            <div style={{ flex: 1 }}>
              <p style={{ fontSize: '0.88rem', fontWeight: 600 }}>{c.title}</p>
              <p style={{ fontSize: '0.72rem', opacity: 0.55 }}>Background Music</p>
            </div>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#7B61FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '0.75rem' }}>&#9654;</div>
          </div>
        </div>
      );
    default:
      return <div style={{ maxWidth: 1200, margin: '0 auto', textAlign: 'center', opacity: 0.5, fontSize: '0.85rem' }}>{(mod as WebsiteModule).name}</div>;
  }
}
