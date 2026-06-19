/**
 * 专业级预览渲染引擎 — 重写核心模块输出
 * 替换 preview.js 中的渲染函数，产出真正好看的设计
 */
(function(){
var P = window.Preview;
if (!P) return;

// 保存原版并覆盖
var _renderModule = P.renderModule;

// ---- 页头 ----
P.render_header = function(cfg, pc) {
  var site = this.esc(cfg.siteName || 'MySite');
  var nav = (cfg.navItems || []).map(function(n){return '<a href="#" style="color:inherit;text-decoration:none;font-size:0.9em;">'+this.esc(n)+'</a>';}, this).join('');
  var isDark = pc.primaryColor && pc.primaryColor.match(/#0|#1/) && !pc.primaryColor.match(/#fff|#eee/i);
  var bg = isDark ? pc.bgColor || '#0f0f1a' : 'rgba(255,255,255,0.85)';
  var clr = isDark ? '#f1f5f9' : '#1a1a2e';
  var blr = 'backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);';
  var shd = 'box-shadow:0 1px 0 rgba(0,0,0,0.06);';
  return '<header style="position:sticky;top:0;z-index:50;display:flex;justify-content:space-between;align-items:center;padding:16px 32px;background:'+bg+';'+blr+shd+'color:'+clr+';border-bottom:1px solid rgba(0,0,0,0.06);">'
    + '<strong style="font-size:1.1em;letter-spacing:-0.01em;">'+site+'</strong>'
    + '<nav style="display:flex;gap:24px;align-items:center;">'+nav+'</nav>'
    + '</header>';
};

// ---- 主视觉 (专业版, 集成文字动效/背景动效) ----
P.render_hero = function(cfg, pc) {
  var title = this.esc(cfg.title || '');
  var sub = this.esc(cfg.subtitle || '');
  var btn = this.esc(cfg.ctaText || '');
  var link = this.esc(cfg.ctaLink || '#');
  var h = cfg.height === 'fullscreen' ? '100vh' : cfg.height === 'large' ? '90vh' : cfg.height === 'small' ? '50vh' : '75vh';
  var p = pc.primaryColor || '#6366f1';
  var a = pc.accentColor || '#f59e0b';
  // 文字动效 class
  var fxClass = '';
  if (cfg.textFx === 'shiny') fxClass = ' rb-shiny-text';
  else if (cfg.textFx === 'gradient') fxClass = ' rb-gradient-text';
  else if (cfg.textFx === 'glitch') fxClass = ' rb-glitch-text';
  // 背景动效 data 属性
  var bgAttr = '';
  if (cfg.bgFx === 'aurora') bgAttr = ' data-rb-bg="aurora" data-rb-colors=\'["#6366f1","#ec4899"]\'';
  else if (cfg.bgFx === 'particles') bgAttr = ' data-rb-bg="particles" data-rb-colors=\'["#818cf8"]\'';
  else if (cfg.bgFx === 'beams') bgAttr = ' data-rb-bg="beams" data-rb-colors=\'["#a78bfa"]\'';
  return '<section style="min-height:'+h+';display:flex;align-items:center;justify-content:center;text-align:center;position:relative;overflow:hidden;background:linear-gradient(160deg,'+p+' 0%,#1e1b4b 50%,#0f0f1a 100%);"'
    + bgAttr + '>'
    + '<div style="position:absolute;inset:0;background:radial-gradient(ellipse at 30% 50%,rgba(99,102,241,0.15) 0%,transparent 50%),radial-gradient(ellipse at 70% 30%,rgba(236,72,153,0.1) 0%,transparent 50%);"></div>'
    + '<div style="position:relative;z-index:2;max-width:720px;padding:40px 24px;">'
    + '<h1 class="'+fxClass+'" style="font-family:Outfit,system-ui,sans-serif;font-size:clamp(2.2rem,5vw,4rem);font-weight:800;letter-spacing:-0.03em;line-height:1.1;color:#f8fafc;margin-bottom:16px;" data-text="'+title+'">'+title+'</h1>'
    + (sub ? '<p style="font-size:1.15rem;color:#94a3b8;max-width:500px;margin:0 auto 32px;">'+sub+'</p>' : '')
    + (btn ? '<a href="'+link+'" style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,'+p+','+a+');color:#fff;border-radius:50px;text-decoration:none;font-weight:600;font-size:1rem;box-shadow:0 4px 20px rgba(99,102,241,0.35);">'+btn+'</a>' : '')
    + '</div></section>';
};

// ---- 特点/服务 (Bento Grid) ----
P.render_features = function(cfg, pc) {
  var items = cfg.items || [];
  var title = this.esc(cfg.title || '');
  var sub = this.esc(cfg.subtitle || '');
  var html = '<section style="padding:80px 24px;background:'+(cfg.bgColor||pc.bgColor||'#f8fafc')+';">';
  html += '<div style="max-width:1100px;margin:0 auto;">';
  if (title) html += '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:'+(sub?'8px':'40px')+';color:'+(pc.textColor||'#1a1a2e')+';">'+title+'</h2>';
  if (sub) html += '<p style="text-align:center;color:#64748b;margin-bottom:48px;max-width:500px;margin-left:auto;margin-right:auto;">'+sub+'</p>';
  html += '<div class="bento-grid">';
  for (var i=0;i<items.length;i++) {
    var it = items[i];
    html += '<div class="bento-cell card-elevated" style="text-align:center;">'
      + '<div style="font-size:2.4rem;margin-bottom:16px;">'+this.esc(it.icon||'⭐')+'</div>'
      + '<h3 style="font-size:1.15rem;font-weight:600;margin-bottom:8px;color:'+(pc.textColor||'#1a1a2e')+';">'+this.esc(it.title)+'</h3>'
      + '<p style="color:#64748b;line-height:1.7;font-size:0.95rem;">'+this.esc(it.desc)+'</p>'
      + '</div>';
  }
  html += '</div></div></section>';
  return html;
};

// ---- 文本块 (编辑风, 集成文字动效) ----
P.render_text = function(cfg, pc) {
  var fxClass = '';
  if (cfg.textFx === 'shiny') fxClass = ' rb-shiny-text';
  else if (cfg.textFx === 'gradient') fxClass = ' rb-gradient-text';
  else if (cfg.textFx === 'glitch') fxClass = ' rb-glitch-text';
  return '<section style="padding:60px 24px;background:'+(cfg.bgColor||'#fff')+';">'
    + '<div style="max-width:'+(cfg.maxWidth||'720px')+';margin:0 auto;text-align:'+(cfg.align||'left')+';">'
    + (cfg.title ? '<h2 class="'+fxClass+'" style="font-size:1.8rem;font-weight:700;margin-bottom:16px;color:'+(pc.textColor||'#1a1a2e')+'" data-text="'+this.esc(cfg.title)+'">'+this.esc(cfg.title)+'</h2>' : '')
    + '<div style="line-height:1.9;color:#475569;font-size:1.05rem;">'+this.esc(cfg.content||'')+'</div>'
    + '</div></section>';
};

// ---- 价格表 ----
P.render_pricing = function(cfg, pc) {
  var items = cfg.items || [];
  var style = cfg.style || 'default';
  var isDark = style === 'dark';
  var html = '<section style="padding:80px 24px;background:'+(isDark?'#0f0f1a':'#f8fafc')+';">';
  html += '<div style="max-width:1100px;margin:0 auto;">';
  if (cfg.title) html += '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:8px;color:'+(isDark?'#f1f5f9':pc.textColor||'#1a1a2e')+';">'+this.esc(cfg.title)+'</h2>';
  if (cfg.subtitle) html += '<p style="text-align:center;color:'+(isDark?'#94a3b8':'#64748b')+';margin-bottom:48px;">'+this.esc(cfg.subtitle)+'</p>';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;align-items:start;">';
  for (var i=0;i<items.length;i++) {
    var it = items[i];
    var hl = it.highlighted;
    html += '<div class="card-elevated" style="padding:32px;text-align:center;'+(hl?'border:2px solid '+(pc.accentColor||'#f59e0b')+';transform:scale(1.03);':'')+'">';
    html += '<h3 style="font-size:1.2rem;font-weight:600;margin-bottom:8px;">'+this.esc(it.name)+'</h3>';
    html += '<div style="font-size:2.4rem;font-weight:800;margin:12px 0;color:'+(pc.textColor||'#1a1a2e')+';">'+this.esc(it.price)+'<span style="font-size:0.9rem;color:#94a3b8;font-weight:400;">'+this.esc(it.period||'')+'</span></div>';
    if (it.features && it.features.length) {
      html += '<ul style="list-style:none;padding:0;margin:20px 0;text-align:left;">';
      it.features.forEach(function(f){html += '<li style="padding:6px 0;border-bottom:1px solid #f1f5f9;color:#64748b;font-size:0.9rem;">✓ '+this.esc(f)+'</li>';},this);
      html += '</ul>';
    }
    html += '<a href="#" style="display:block;margin-top:16px;padding:12px 24px;border-radius:50px;background:'+(hl?pc.accentColor||'#f59e0b':'#f1f5f9')+';color:'+(hl?'#fff':pc.textColor||'#1a1a2e')+';text-decoration:none;font-weight:600;font-size:0.95rem;">'+this.esc(it.cta||'选择')+'</a>';
    html += '</div>';
  }
  html += '</div></div></section>';
  return html;
};

// ---- 作品集/相册 ----
P.render_gallery = function(cfg, pc) {
  var items = cfg.items || [];
  var cols = cfg.columns || 3;
  var html = '<section style="padding:60px 24px;background:#fff;">';
  html += '<div style="max-width:1100px;margin:0 auto;">';
  if (cfg.title) html += '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:40px;color:'+(pc.textColor||'#1a1a2e')+';">'+this.esc(cfg.title)+'</h2>';
  html += '<div style="display:grid;grid-template-columns:repeat('+cols+',1fr);gap:16px;">';
  for (var i=0;i<items.length;i++) {
    var it = items[i];
    var hue = (i*70)%360;
    html += '<div class="card-elevated" style="overflow:hidden;min-height:180px;display:flex;align-items:center;justify-content:center;background:linear-gradient(135deg,hsl('+hue+',60%,85%),hsl('+(hue+40)+',60%,75%));position:relative;">'
      + '<span style="font-size:3rem;opacity:0.4;">🖼</span>'
      + (it.caption ? '<div style="position:absolute;bottom:0;left:0;right:0;padding:12px;background:rgba(0,0,0,0.5);color:#fff;font-size:0.9rem;">'+this.esc(it.caption)+'</div>' : '')
      + '</div>';
  }
  html += '</div></div></section>';
  return html;
};

// ---- 联系方式 ----
P.render_contact = function(cfg, pc) {
  return '<section style="padding:80px 24px;background:'+(cfg.bgColor||'#f8fafc')+';">'
    + '<div style="max-width:600px;margin:0 auto;text-align:center;">'
    + (cfg.title ? '<h2 style="font-size:2rem;font-weight:700;margin-bottom:40px;color:'+(pc.textColor||'#1a1a2e')+';">'+this.esc(cfg.title)+'</h2>' : '')
    + '<div class="card-elevated" style="padding:40px;display:grid;grid-template-columns:repeat(auto-fit,minmax(120px,1fr));gap:24px;">'
    + (cfg.address ? '<div><div style="font-size:1.5rem;">📍</div><div style="font-size:0.9rem;color:#64748b;margin-top:8px;">'+this.esc(cfg.address)+'</div></div>' : '')
    + (cfg.phone ? '<div><div style="font-size:1.5rem;">📞</div><div style="font-weight:600;margin-top:8px;">'+this.esc(cfg.phone)+'</div></div>' : '')
    + (cfg.email ? '<div><div style="font-size:1.5rem;">✉</div><div style="color:'+(pc.primaryColor||'#6366f1')+';margin-top:8px;">'+this.esc(cfg.email)+'</div></div>' : '')
    + '</div></div></section>';
};

// ---- 页脚 ----
P.render_footer = function(cfg, pc) {
  var cols = cfg.columns || [];
  var html = '<footer style="background:#0f172a;color:#94a3b8;padding:60px 24px 30px;">';
  html += '<div style="max-width:1100px;margin:0 auto;">';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:32px;margin-bottom:40px;">';
  for (var i=0;i<cols.length;i++) {
    var c = cols[i];
    html += '<div><h4 style="color:#f1f5f9;font-size:0.95rem;margin-bottom:12px;">'+this.esc(c.title||'')+'</h4><ul style="list-style:none;padding:0;">';
    (c.items||[]).forEach(function(item){html += '<li style="padding:4px 0;font-size:0.85rem;">'+this.esc(item)+'</li>';},this);
    html += '</ul></div>';
  }
  html += '</div>';
  html += '<div style="border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;text-align:center;font-size:0.8rem;">'+this.esc(cfg.copyright||'© 2026')+'</div>';
  html += '</div></footer>';
  return html;
};

// ---- 图片 ----
P.render_image = function(cfg, pc) {
  var s = cfg.shadow||'medium';
  var shd = s==='none'?'none':s==='large'?'0 8px 32px rgba(0,0,0,0.1)':s==='small'?'0 1px 3px rgba(0,0,0,0.06)':'0 4px 16px rgba(0,0,0,0.08)';
  return '<section style="padding:40px 24px;text-align:center;">'
    + '<img src="'+(cfg.src||'')+'" alt="'+this.esc(cfg.alt)+'" style="max-width:100%;border-radius:'+(cfg.borderRadius||'12px')+';box-shadow:'+shd+';" />'
    + (cfg.caption ? '<p style="margin-top:12px;color:#64748b;font-size:0.9rem;">'+this.esc(cfg.caption)+'</p>' : '')
    + '</section>';
};

// ---- 图文 ----
P.render_imageText = function(cfg, pc) {
  var rev = cfg.reverse ? 'row-reverse' : 'row';
  return '<section style="padding:60px 24px;background:#fff;">'
    + '<div style="max-width:1000px;margin:0 auto;display:flex;flex-direction:'+rev+';align-items:center;gap:48px;flex-wrap:wrap;">'
    + '<div style="flex:1;min-width:280px;text-align:center;">'
    + '<img src="'+(cfg.src||'')+'" alt="'+this.esc(cfg.alt)+'" style="max-width:100%;border-radius:16px;box-shadow:0 4px 24px rgba(0,0,0,0.08);" />'
    + '</div>'
    + '<div style="flex:1;min-width:280px;">'
    + (cfg.title ? '<h2 style="font-size:1.8rem;font-weight:700;margin-bottom:12px;color:'+(pc.textColor||'#1a1a2e')+';">'+this.esc(cfg.title)+'</h2>' : '')
    + '<p style="line-height:1.8;color:#475569;">'+this.esc(cfg.content||'')+'</p>'
    + '</div></div></section>';
};

// ---- 团队 ----
P.render_team = function(cfg, pc) {
  var items = cfg.items || [];
  var html = '<section style="padding:60px 24px;background:#f8fafc;">';
  html += '<div style="max-width:1000px;margin:0 auto;">';
  if (cfg.title) html += '<h2 style="text-align:center;font-size:2rem;font-weight:700;margin-bottom:40px;color:'+(pc.textColor||'#1a1a2e')+';">'+this.esc(cfg.title)+'</h2>';
  html += '<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;">';
  for (var i=0;i<items.length;i++) {
    var m = items[i];
    html += '<div class="card-elevated" style="text-align:center;padding:32px 20px;">'
      + '<div style="width:64px;height:64px;border-radius:50%;background:linear-gradient(135deg,'+(pc.primaryColor||'#6366f1')+','+(pc.accentColor||'#f59e0b')+');margin:0 auto 16px;display:flex;align-items:center;justify-content:center;color:#fff;font-size:1.5rem;font-weight:700;">'+(this.esc(m.name||'').charAt(0))+'</div>'
      + '<h3 style="font-size:1.1rem;font-weight:600;">'+this.esc(m.name)+'</h3>'
      + '<div style="color:'+(pc.primaryColor||'#6366f1')+';font-size:0.85rem;margin:4px 0;">'+this.esc(m.role)+'</div>'
      + '<p style="color:#64748b;font-size:0.9rem;">'+this.esc(m.desc)+'</p>'
      + '</div>';
  }
  html += '</div></div></section>';
  return html;
};

// ---- 分割线 ----
P.render_divider = function(cfg, pc) {
  var s = cfg.style||'solid';
  var st = s==='dashed'?'dashed':s==='dotted'?'dotted':'solid';
  return '<hr style="border:none;border-top:2px '+st+' '+(cfg.color||'#e2e8f0')+';margin:40px auto;max-width:200px;" />';
};

// ---- 按钮 ----
P.render_button = function(cfg, pc) {
  return '<section style="padding:32px;text-align:center;">'
    + '<a href="'+this.esc(cfg.link||'#')+'" style="display:inline-block;padding:14px 40px;background:linear-gradient(135deg,'+(pc.primaryColor||'#6366f1')+','+(pc.accentColor||'#f59e0b')+');color:#fff;border-radius:50px;text-decoration:none;font-weight:600;font-size:1rem;box-shadow:0 4px 20px rgba(99,102,241,0.3);">'+this.esc(cfg.text||'按钮')+'</a>'
    + '</section>';
};

console.log('preview-pro: 专业渲染引擎已加载');
})();
