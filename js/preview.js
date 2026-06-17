/**
 * ============================================================
 * 自助建站平台 - 预览渲染 & 配置树
 * 通用模块渲染，适配各种网站类型
 * ============================================================
 */

const Preview = {
  render(state) {
    const container = document.getElementById('page-preview');
    const fullContainer = document.getElementById('page-preview-full');
    if (!container) {
      console.warn('Preview.render: #page-preview 元素未找到');
      return;
    }

    try {
      const html = this.buildPageHTML(state);
      container.innerHTML = html;
      if (fullContainer) fullContainer.innerHTML = html;
    } catch (e) {
      console.error('Preview.render 渲染出错:', e);
      container.innerHTML = '<div style="text-align:center;padding:60px;color:#ef4444;">预览渲染出错，请查看控制台日志</div>';
    }
  },

  buildPageHTML(state) {
    const { pageConfig, modules } = state || {};
    const pc = pageConfig || {};

    let modulesHTML = (modules || [])
      .filter(m => m && m.visible)
      .map(mod => this.renderModule(mod, pc))
      .join('');

    return `
      <div class="preview-page" style="--primary: ${pc.primaryColor}; --accent: ${pc.accentColor}; background: ${pc.bgColor}; color: ${pc.textColor};">
        ${modulesHTML || '<div style="text-align:center;padding:60px;color:#999;">暂无可见模块</div>'}
      </div>
    `;
  },

  renderModule(mod, pc) {
    const fn = this[`render_${mod.type}`];
    if (fn) return fn(mod.config, pc);
    return `<section class="preview-module" style="padding:40px;text-align:center;color:#999;">未知模块: ${mod.type}</section>`;
  },

  // ---- 页头 ----
  render_header(cfg, pc) {
    // 浮动玻璃态样式
    if (cfg.style === 'floating') {
      return `
        <header style="padding:16px 32px 0;position:relative;z-index:10;">
          <div style="max-width:1100px;margin:0 auto;background:rgba(255,255,255,0.12);backdrop-filter:blur(12px);-webkit-backdrop-filter:blur(12px);border-radius:60px;padding:12px 28px;display:flex;justify-content:space-between;align-items:center;color:#fff;border:1px solid rgba(255,255,255,0.15);box-shadow:0 4px 24px rgba(0,0,0,0.1);">
            <div style="font-size:1.1em;font-weight:700;">${this.esc(cfg.siteName)}</div>
            <nav style="display:flex;gap:20px;font-size:0.9em;">
              ${(cfg.navItems || []).map(item => `<span style="opacity:0.8;cursor:pointer;transition:opacity 0.2s;" onmouseover="this.style.opacity='1'" onmouseout="this.style.opacity='0.8'">${this.esc(item)}</span>`).join('')}
            </nav>
          </div>
        </header>
      `;
    }
    return `
      <header class="preview-header-bar" style="background:${pc.primaryColor};padding:16px 32px;display:flex;justify-content:space-between;align-items:center;color:#fff;">
        <div style="font-size:1.2em;font-weight:700;">${this.esc(cfg.siteName)}</div>
        <nav style="display:flex;gap:20px;font-size:0.9em;">
          ${(cfg.navItems || []).map(item => `<span style="opacity:0.85;cursor:pointer;">${this.esc(item)}</span>`).join('')}
        </nav>
      </header>
    `;
  },

  // ---- 主视觉 ----
  render_hero(cfg, pc) {
    const heights = { small: '300px', medium: '450px', large: '600px', fullscreen: '100vh' };
    const height = heights[cfg.height] || '450px';

    // 背景样式
    let bgStyle, extraClass = '', overlay;
    switch (cfg.bgType) {
      case 'aurora':
        bgStyle = `background:linear-gradient(135deg, ${pc.primaryColor}, ${pc.accentColor});`;
        extraClass = 'preview-hero-aurora';
        overlay = '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.25);z-index:0;"></div>';
        break;
      case 'waves':
        bgStyle = `background:linear-gradient(135deg, ${pc.primaryColor}, ${pc.accentColor});`;
        extraClass = 'preview-hero-waves';
        overlay = '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.3);z-index:1;"></div>';
        break;
      case 'grid':
        bgStyle = `background:${cfg.bgColor || pc.primaryColor};`;
        extraClass = 'preview-hero-grid';
        overlay = '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.3);z-index:0;"></div>';
        break;
      case 'glassy':
        bgStyle = `background:linear-gradient(135deg, ${pc.primaryColor}, ${pc.accentColor});`;
        extraClass = 'preview-hero-glassy';
        overlay = '<div class="glassy-overlay"></div>';
        break;
      case 'image':
        bgStyle = `background-image:url('${cfg.bgImage}');background-size:cover;background-position:center;`;
        extraClass = '';
        overlay = '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.35);"></div>';
        break;
      default:
        bgStyle = `background:linear-gradient(135deg, ${pc.primaryColor}, ${pc.accentColor});`;
        extraClass = '';
        overlay = '<div style="position:absolute;inset:0;background:rgba(0,0,0,0.35);"></div>';
    }

    return `
      <section class="preview-hero ${extraClass}" style="${bgStyle}height:${height};display:flex;align-items:center;justify-content:center;text-align:center;padding:40px;position:relative;">
        ${overlay}
        <div style="position:relative;z-index:2;max-width:700px;">
          <h1 style="font-size:2.8em;color:${cfg.textColor || '#fff'};margin-bottom:12px;text-shadow:0 2px 12px rgba(0,0,0,0.3);">${this.esc(cfg.title)}</h1>
          <p style="font-size:1.2em;color:${cfg.textColor || '#fff'};opacity:0.9;margin-bottom:24px;">${this.esc(cfg.subtitle)}</p>
          <a href="${this.esc(cfg.ctaLink)}" style="display:inline-block;padding:14px 40px;background:${pc.accent};color:#fff;border-radius:50px;text-decoration:none;font-weight:600;font-size:1.05em;box-shadow:0 4px 20px rgba(0,0,0,0.2);">${this.esc(cfg.ctaText)}</a>
        </div>
      </section>
    `;
  },

  // ---- 文本块 ----
  render_text(cfg, pc) {
    return `
      <section class="preview-text" style="padding:60px 32px;text-align:${cfg.align || 'left'};">
        <div style="max-width:${cfg.maxWidth || '800px'};margin:0 auto;">
          <h2 style="font-size:2em;margin-bottom:16px;color:${pc.textColor};">${this.esc(cfg.title)}</h2>
          <div style="line-height:1.8;color:${pc.textColor};opacity:0.8;font-size:1.05em;">${this.esc(cfg.content)}</div>
        </div>
      </section>
    `;
  },

  // ---- 图片 ----
  render_image(cfg, pc) {
    const shadows = { none: 'none', small: '0 2px 8px rgba(0,0,0,0.08)', medium: '0 8px 30px rgba(0,0,0,0.12)', large: '0 20px 60px rgba(0,0,0,0.15)' };
    return `
      <section class="preview-image" style="padding:40px 32px;text-align:center;">
        <div style="max-width:800px;margin:0 auto;">
          <img src="${cfg.src || cfg.placeholder}" alt="${this.esc(cfg.alt)}" style="width:100%;border-radius:${cfg.borderRadius || '8px'};box-shadow:${shadows[cfg.shadow] || 'none'};" />
          ${cfg.caption ? `<p style="margin-top:8px;color:#888;font-size:0.9em;">${this.esc(cfg.caption)}</p>` : ''}
        </div>
      </section>
    `;
  },

  // ---- 图文混合 ----
  render_imageText(cfg, pc) {
    const flexDir = cfg.imageSide === 'left' ? 'row-reverse' : 'row';
    return `
      <section class="preview-imagetext" style="padding:60px 32px;">
        <div style="display:flex;flex-direction:${flexDir};align-items:center;gap:40px;max-width:1000px;margin:0 auto;flex-wrap:wrap;">
          <div style="flex:1;min-width:280px;">
            <img src="${cfg.imageSrc || cfg.imagePlaceholder}" style="width:100%;border-radius:12px;box-shadow:0 4px 20px rgba(0,0,0,0.08);" />
          </div>
          <div style="flex:1;min-width:280px;">
            <h2 style="font-size:1.8em;margin-bottom:12px;">${this.esc(cfg.title)}</h2>
            <p style="line-height:1.7;color:${pc.textColor};opacity:0.8;">${this.esc(cfg.content)}</p>
          </div>
        </div>
      </section>
    `;
  },

  // ---- 特点/服务 ----
  render_features(cfg, pc) {
    const items = cfg.items || [];
    const cols = cfg.columns || 3;

    // Bento 布局
    if (cfg.layout === 'bento' && items.length >= 3) {
      return `
        <section class="preview-features" style="padding:60px 32px;background:#f8fafc;">
          <div style="text-align:center;margin-bottom:40px;">
            <h2 style="font-size:2em;">${this.esc(cfg.title)}</h2>
            ${cfg.subtitle ? `<p style="color:#888;margin-top:8px;">${this.esc(cfg.subtitle)}</p>` : ''}
          </div>
          <div class="preview-features-bento">
            ${items.slice(0, 5).map(item => `
              <div class="bento-item">
                <div class="bento-icon" style="font-size:2em;margin-bottom:12px;">${item.icon || '⭐'}</div>
                <h3 style="font-size:1.1em;margin-bottom:8px;">${this.esc(item.title)}</h3>
                <p style="color:#888;font-size:0.9em;line-height:1.6;">${this.esc(item.desc)}</p>
              </div>
            `).join('')}
          </div>
        </section>
      `;
    }

    // 标准网格布局
    return `
      <section class="preview-features" style="padding:60px 32px;background:#f8fafc;">
        <div style="text-align:center;margin-bottom:40px;">
          <h2 style="font-size:2em;">${this.esc(cfg.title)}</h2>
          ${cfg.subtitle ? `<p style="color:#888;margin-top:8px;">${this.esc(cfg.subtitle)}</p>` : ''}
        </div>
        <div style="display:grid;grid-template-columns:repeat(${Math.min(cols, 4)},1fr);gap:24px;max-width:1000px;margin:0 auto;">
          ${items.map(item => `
            <div style="background:#fff;padding:32px 24px;border-radius:12px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.05);transition:transform 0.2s,box-shadow 0.2s;" onmouseover="this.style.transform='translateY(-4px)';this.style.boxShadow='0 12px 40px rgba(0,0,0,0.1)';" onmouseout="this.style.transform='';this.style.boxShadow='';">
              <div style="font-size:2.5em;margin-bottom:12px;">${item.icon || '⭐'}</div>
              <h3 style="font-size:1.15em;margin-bottom:8px;">${this.esc(item.title)}</h3>
              <p style="color:#888;font-size:0.9em;line-height:1.5;">${this.esc(item.desc)}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  // ---- 产品展示 ----
  render_products(cfg, pc) {
    return `
      <section class="preview-products" style="padding:60px 32px;">
        <h2 style="text-align:center;font-size:2em;margin-bottom:40px;">${this.esc(cfg.title)}</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;max-width:900px;margin:0 auto;">
          ${(cfg.items || []).map(item => `
            <div style="background:#fff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.06);position:relative;">
              ${cfg.showBadge && item.badge ? `<span style="position:absolute;top:8px;right:8px;background:${pc.accent};color:#fff;padding:4px 10px;border-radius:20px;font-size:0.75em;font-weight:600;">${this.esc(item.badge)}</span>` : ''}
              <div style="height:160px;background:#e2e8f0;display:flex;align-items:center;justify-content:center;font-size:3em;">📦</div>
              <div style="padding:16px;">
                <h4 style="font-size:1.1em;">${this.esc(item.name)}</h4>
                ${cfg.showPrice ? `<div style="color:${pc.accent};font-weight:700;font-size:1.3em;margin:8px 0;">${this.esc(item.price)}</div>` : ''}
                <p style="color:#888;font-size:0.85em;">${this.esc(item.desc)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  // ---- 价格表 ----
  render_pricing(cfg, pc) {
    const style = cfg.style || 'default';
    let sectionBg = '#f8fafc';

    if (style === 'dark') sectionBg = '#0f172a';

    return `
      <section class="preview-pricing" style="padding:60px 32px;background:${sectionBg};">
        <div style="text-align:center;margin-bottom:40px;">
          <h2 style="font-size:2em;color:${style === 'dark' ? '#fff' : 'inherit'};">${this.esc(cfg.title)}</h2>
          ${cfg.subtitle ? `<p style="color:${style === 'dark' ? '#94a3b8' : '#888'};margin-top:8px;">${this.esc(cfg.subtitle)}</p>` : ''}
        </div>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:24px;max-width:900px;margin:0 auto;">
          ${(cfg.items || []).map(item => {
            const cardClass = style === 'glass' ? 'pricing-card-glass' : style === 'dark' ? 'pricing-card-dark' : '';
            const highlightedStyle = item.highlighted
              ? (style === 'dark' ? '' : `border:2px solid ${pc.accent};transform:scale(1.05);`)
              : '';
            const cardBg = style === 'default'
              ? `background:#fff;${item.highlighted ? `border:2px solid ${pc.accent};transform:scale(1.05);` : ''}`
              : '';

            return `
            <div class="${cardClass}" style="border-radius:16px;padding:32px 24px;text-align:center;box-shadow:0 2px 12px rgba(0,0,0,0.05);${cardBg}">
              ${item.highlighted ? `<div style="color:${pc.accent};font-size:0.85em;font-weight:600;margin-bottom:8px;">推荐</div>` : ''}
              <h3 style="font-size:1.3em;">${this.esc(item.name)}</h3>
              <div style="margin:16px 0;">
                <span class="price-number" style="font-size:2.5em;font-weight:700;">${this.esc(item.price)}</span>
                <span class="price-period" style="color:#888;">${this.esc(item.period)}</span>
              </div>
              <ul style="list-style:none;text-align:left;padding:0;">
                ${(item.features || []).map(f => `<li style="padding:6px 0;border-bottom:1px solid #f1f5f9;">✓ ${this.esc(f)}</li>`).join('')}
              </ul>
              <div class="pricing-cta" style="margin-top:20px;padding:12px 24px;background:${item.highlighted ? pc.accent : '#f1f5f9'};color:${item.highlighted ? '#fff' : pc.textColor};border-radius:50px;font-weight:600;font-size:0.95em;cursor:pointer;">${this.esc(item.cta)}</div>
            </div>
          `}).join('')}
        </div>
      </section>
    `;
  },

  // ---- 团队 ----
  render_team(cfg, pc) {
    return `
      <section class="preview-team" style="padding:60px 32px;">
        <h2 style="text-align:center;font-size:2em;margin-bottom:40px;">${this.esc(cfg.title)}</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:32px;max-width:800px;margin:0 auto;">
          ${(cfg.items || []).map(item => `
            <div style="text-align:center;">
              <div style="width:100px;height:100px;border-radius:50%;background:#e2e8f0;margin:0 auto 12px;display:flex;align-items:center;justify-content:center;font-size:2.5em;">👤</div>
              <h4 style="font-size:1.1em;">${this.esc(item.name)}</h4>
              <div style="color:${pc.accent};font-size:0.9em;margin-bottom:6px;">${this.esc(item.role)}</div>
              <p style="color:#888;font-size:0.85em;">${this.esc(item.desc)}</p>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  // ---- 客户评价 ----
  render_testimonials(cfg, pc) {
    return `
      <section class="preview-testimonials" style="padding:60px 32px;background:#f8fafc;">
        <h2 style="text-align:center;font-size:2em;margin-bottom:40px;">${this.esc(cfg.title)}</h2>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;max-width:900px;margin:0 auto;">
          ${(cfg.items || []).map(item => `
            <div style="background:#fff;padding:24px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
              <div style="font-size:2em;color:${pc.accent};margin-bottom:8px;">❝</div>
              <p style="line-height:1.6;margin-bottom:16px;font-style:italic;">${this.esc(item.quote)}</p>
              <div style="display:flex;align-items:center;gap:10px;">
                <div style="width:40px;height:40px;border-radius:50%;background:#e2e8f0;display:flex;align-items:center;justify-content:center;">👤</div>
                <div>
                  <strong style="font-size:0.95em;">${this.esc(item.author)}</strong>
                  <div style="color:#888;font-size:0.8em;">${this.esc(item.title)}</div>
                </div>
              </div>
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  // ---- 相册 ----
  render_gallery(cfg, pc) {
    const cols = cfg.columns || 3;
    return `
      <section class="preview-gallery" style="padding:60px 32px;">
        <h2 style="text-align:center;font-size:2em;margin-bottom:40px;">${this.esc(cfg.title)}</h2>
        <div style="display:grid;grid-template-columns:repeat(${Math.min(cols,4)},1fr);gap:16px;max-width:900px;margin:0 auto;">
          ${(cfg.items || []).map(item => `
            <div style="aspect-ratio:1;background:#e2e8f0;border-radius:8px;display:flex;align-items:center;justify-content:center;font-size:0.9em;color:#888;overflow:hidden;">
              ${this.esc(item.caption || '作品')}
            </div>
          `).join('')}
        </div>
      </section>
    `;
  },

  // ---- 联系方式 ----
  render_contact(cfg, pc) {
    return `
      <section class="preview-contact" style="padding:60px 32px;background:#f8fafc;">
        <div style="max-width:700px;margin:0 auto;">
          <h2 style="text-align:center;font-size:2em;margin-bottom:32px;">${this.esc(cfg.title)}</h2>
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:16px;margin-bottom:32px;">
            ${cfg.address ? `<div style="text-align:center;padding:16px;"><div style="font-size:1.5em;margin-bottom:4px;">📍</div><div style="color:#888;font-size:0.9em;">${this.esc(cfg.address)}</div></div>` : ''}
            ${cfg.phone ? `<div style="text-align:center;padding:16px;"><div style="font-size:1.5em;margin-bottom:4px;">📞</div><div style="font-weight:600;">${this.esc(cfg.phone)}</div></div>` : ''}
            ${cfg.email ? `<div style="text-align:center;padding:16px;"><div style="font-size:1.5em;margin-bottom:4px;">✉️</div><div style="color:${pc.accent};">${this.esc(cfg.email)}</div></div>` : ''}
          </div>
          ${cfg.showForm ? `
            <div style="background:#fff;padding:24px;border-radius:12px;box-shadow:0 2px 12px rgba(0,0,0,0.05);">
              <div style="display:grid;gap:12px;">
                <input placeholder="您的姓名" style="padding:10px 16px;border:1px solid #e2e8f0;border-radius:8px;" />
                <input placeholder="邮箱地址" style="padding:10px 16px;border:1px solid #e2e8f0;border-radius:8px;" />
                <textarea placeholder="留言内容" style="padding:10px 16px;border:1px solid #e2e8f0;border-radius:8px;min-height:100px;"></textarea>
                <button style="padding:12px;background:${pc.accent};color:#fff;border:none;border-radius:8px;font-weight:600;">发送留言</button>
              </div>
            </div>
          ` : ''}
        </div>
      </section>
    `;
  },

  // ---- 按钮 ----
  render_button(cfg, pc) {
    const sizes = { small: '8px 20px', medium: '12px 32px', large: '16px 48px' };
    const styles = {
      solid: `background:${pc.accent};color:#fff;border:none;`,
      outline: `background:transparent;color:${pc.accent};border:2px solid ${pc.accent};`,
      ghost: `background:transparent;color:${pc.textColor};border:none;`
    };
    return `
      <section style="padding:24px 32px;text-align:${cfg.align || 'center'};">
        <a href="${this.esc(cfg.link)}" style="display:${cfg.fullWidth ? 'block' : 'inline-block'};padding:${sizes[cfg.size] || sizes.medium};${styles[cfg.style] || styles.solid}border-radius:${cfg.borderRadius || '50px'};font-weight:600;text-decoration:none;cursor:pointer;text-align:center;">${this.esc(cfg.text)}</a>
      </section>
    `;
  },

  // ---- 分隔线 ----
  render_divider(cfg, pc) {
    const w = cfg.width || '100%';
    const val = w.includes('%') ? w : w;
    const maxW = w.includes('%') ? w : '100%';
    return `
      <section style="padding:${cfg.spacing || '40px'} 32px;">
        <hr style="border:none;border-top:${cfg.thickness || '2px'} ${cfg.style || 'solid'} ${cfg.color || '#e2e8f0'};width:${val};margin:0 auto;max-width:100%;" />
      </section>
    `;
  },

  // ---- 地图 ----
  render_map(cfg, pc) {
    return `
      <section class="preview-map" style="padding:40px 32px;">
        ${cfg.title ? `<h3 style="text-align:center;margin-bottom:16px;">${this.esc(cfg.title)}</h3>` : ''}
        <div style="height:${cfg.height || '400px'};background:#e2e8f0;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#888;">
          <div style="text-align:center;">
            <div style="font-size:3em;margin-bottom:8px;">📍</div>
            <div>${this.esc(cfg.address || '地图位置')}</div>
            <div style="font-size:0.85em;margin-top:4px;">嵌入地图API Key 配置后生效</div>
          </div>
        </div>
      </section>
    `;
  },

  // ---- 视频 ----
  render_video(cfg, pc) {
    return `
      <section class="preview-video" style="padding:40px 32px;">
        ${cfg.title ? `<h3 style="text-align:center;margin-bottom:16px;">${this.esc(cfg.title)}</h3>` : ''}
        <div style="max-width:800px;margin:0 auto;aspect-ratio:${cfg.aspectRatio || '16/9'};background:#1a1a2e;border-radius:12px;display:flex;align-items:center;justify-content:center;color:#888;">
          <div style="text-align:center;">
            <div style="font-size:3em;margin-bottom:8px;">🎬</div>
            <div>视频嵌入区域</div>
          </div>
        </div>
      </section>
    `;
  },

  // ---- 页脚 ----
  render_footer(cfg, pc) {
    const extraClass = cfg.style === 'modern' ? ' preview-footer-modern' : '';
    return `
      <footer class="preview-footer${extraClass}" style="background:${pc.primaryColor};color:#fff;padding:40px 32px 24px;">
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:32px;max-width:1000px;margin:0 auto 32px;">
          ${(cfg.columns || []).map(col => `
            <div>
              <h4 style="font-size:1em;margin-bottom:12px;opacity:0.9;">${this.esc(col.title || '')}</h4>
              <ul style="list-style:none;padding:0;">
                ${(col.items || []).map(item => `<li style="padding:4px 0;opacity:0.65;font-size:0.9em;">${this.esc(item)}</li>`).join('')}
              </ul>
            </div>
          `).join('')}
        </div>
        <div style="text-align:center;padding-top:16px;border-top:1px solid rgba(255,255,255,0.1);font-size:0.85em;opacity:0.6;">
          ${this.esc(cfg.copyright)}
        </div>
      </footer>
    `;
  },

  // ---- 自定义HTML ----
  render_customHTML(cfg, pc) {
    return `
      <section class="preview-custom" style="padding:24px 32px;">
        ${cfg.title ? `<h3 style="margin-bottom:12px;">${this.esc(cfg.title)}</h3>` : ''}
        <div style="border:1px dashed #e2e8f0;border-radius:8px;padding:16px;min-height:${cfg.height === 'auto' ? '100px' : cfg.height};color:#888;font-size:0.9em;font-family:monospace;overflow:auto;">
          ${this.esc(cfg.html || '<!-- 自定义HTML内容 -->')}
        </div>
      </section>
    `;
  },

  // ---- 配置树 ----
  buildConfigTree(state) {
    const { pageConfig, modules, analysis } = state;
    return {
      meta: {
        version: '1.0',
        generatedAt: new Date().toISOString(),
        keywords: analysis?.keywords || '',
        suggestion: analysis?.suggestion || ''
      },
      pageConfig: { ...pageConfig },
      modules: modules.map(mod => ({
        id: mod.id,
        type: mod.type,
        typeLabel: MODULE_TYPES[mod.type]?.label || mod.type,
        visible: mod.visible,
        order: mod.index,
        config: mod.config
      })),
      checksum: this.checksum(JSON.stringify({ pageConfig, modules: modules.map(m => ({ type: m.type, config: m.config })) }))
    };
  },

  renderConfigTree(state) {
    const container = document.getElementById('config-tree-view');
    if (!container) return;
    const tree = this.buildConfigTree(state);
    container.innerHTML = `<pre style="margin:0;font-size:12px;line-height:1.5;overflow:auto;max-height:300px;">${JSON.stringify(tree, null, 2)}</pre>`;
  },

  // ---- 工具 ----
  esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  },

  adjustColor(hex, amount) {
    hex = hex.replace('#', '');
    const num = parseInt(hex, 16);
    const r = Math.min(255, Math.max(0, ((num >> 16) & 0xFF) + amount));
    const g = Math.min(255, Math.max(0, ((num >> 8) & 0xFF) + amount));
    const b = Math.min(255, Math.max(0, (num & 0xFF) + amount));
    return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
  },

  checksum(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = ((hash << 5) - hash) + str.charCodeAt(i);
      hash |= 0;
    }
    return Math.abs(hash).toString(36);
  }
};
