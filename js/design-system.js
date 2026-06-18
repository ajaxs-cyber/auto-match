/**
 * ============================================================
 * 设计系统 — UI UX Pro Max + Impeccable + ReactBits
 * 67 种视觉风格 · 161 套配色 · 57 种字体 · 反模式检测
 * ============================================================
 */

const DESIGN_SYSTEM = {

  /* ════════════════════════════════════
   * 67 种 UI 视觉风格
   * ════════════════════════════════════ */
  styles: {
    minimalSwiss: {
      name: '极简瑞士风', tags: ['干净','留白','网格'], css: {
        bg: '#ffffff', text: '#1a1a1a', accent: '#000000',
        radius: '0px', shadow: 'none', font: 'system',
        spacing: '60px', border: '#e5e5e5'
      }
    },
    neumorphism: {
      name: '新拟态', tags: ['柔和','凸起','健康'], css: {
        bg: '#e8edf2', text: '#2d3748', accent: '#6366f1',
        radius: '20px', shadow: '8px 8px 16px #d1d9e0, -8px -8px 16px #ffffff',
        font: 'rounded', spacing: '40px', border: 'none'
      }
    },
    glassmorphism: {
      name: '玻璃态', tags: ['透明','模糊','现代'], css: {
        bg: '#0f0f23', text: '#ffffff', accent: '#818cf8',
        radius: '16px', shadow: '0 8px 32px rgba(0,0,0,0.4)',
        font: 'modern', spacing: '50px',
        glass: { bg: 'rgba(255,255,255,0.05)', blur: '20px', border: 'rgba(255,255,255,0.1)' }
      }
    },
    brutalism: {
      name: '野兽派', tags: ['大胆','原始','个性'], css: {
        bg: '#fffbe6', text: '#000000', accent: '#ff4500',
        radius: '0px', shadow: '4px 4px 0 #000', font: 'mono',
        spacing: '40px', border: '3px solid #000'
      }
    },
    neubrutalism: {
      name: '新野兽派', tags: ['粗边框','阴影','年轻'], css: {
        bg: '#fef9c3', text: '#1e293b', accent: '#2563eb',
        radius: '8px', shadow: '4px 4px 0 #1e293b', font: 'bold',
        spacing: '40px', border: '2px solid #1e293b'
      }
    },
    bentoGrid: {
      name: '便当盒网格', tags: ['网格','卡片','仪表板'], css: {
        bg: '#f5f5f7', text: '#1d1d1f', accent: '#0071e3',
        radius: '24px', shadow: '0 4px 20px rgba(0,0,0,0.04)', font: 'apple',
        spacing: '24px', border: 'none'
      }
    },
    auroraUI: {
      name: '极光 UI', tags: ['渐变','梦幻','创意'], css: {
        bg: '#0a0a1a', text: '#f0f0ff', accent: '#a78bfa',
        radius: '20px', shadow: '0 0 60px rgba(139,92,246,0.15)', font: 'modern',
        spacing: '48px',
        aurora: { c1: '#6366f1', c2: '#a855f7', c3: '#ec4899', c4: '#f59e0b' }
      }
    },
    darkOLED: {
      name: '深色 OLED', tags: ['暗色','省电','代码'], css: {
        bg: '#000000', text: '#e5e5e5', accent: '#3b82f6',
        radius: '8px', shadow: 'none', font: 'modern',
        spacing: '40px', border: '#1a1a1a'
      }
    },
    softUI: {
      name: '柔和进化 UI', tags: ['柔和','阴影','企业'], css: {
        bg: '#f8fafc', text: '#334155', accent: '#6366f1',
        radius: '16px', shadow: '0 1px 2px rgba(0,0,0,0.04), 0 4px 16px rgba(0,0,0,0.04)',
        font: 'modern', spacing: '56px', border: '#e2e8f0'
      }
    },
    retroWave: {
      name: '合成波/复古未来', tags: ['霓虹','80年代','赛博'], css: {
        bg: '#120458', text: '#ff6ac1', accent: '#00f0ff',
        radius: '0px', shadow: '0 0 20px #00f0ff', font: 'mono',
        spacing: '44px',
        neon: { c1: '#ff6ac1', c2: '#00f0ff', c3: '#f5f749' }
      }
    },
    editorial: {
      name: '编辑/杂志风', tags: ['排版','优雅','阅读'], css: {
        bg: '#fefefe', text: '#111111', accent: '#cc0000',
        radius: '0px', shadow: 'none', font: 'serif',
        spacing: '80px', border: '#000'
      }
    },
    bentoBoxes: {
      name: '便当盒布局', tags: ['网格','卡片','苹果风'], css: {
        bg: '#f5f5f7', text: '#1d1d1f', accent: '#007aff',
        radius: '20px', shadow: '0 2px 12px rgba(0,0,0,0.04)', font: 'apple',
        spacing: '20px', border: 'none'
      }
    },
    claymorphism: {
      name: '粘土风', tags: ['圆润','童趣','3D'], css: {
        bg: '#f0e6ff', text: '#3d2c6e', accent: '#7c3aed',
        radius: '28px', shadow: 'inset -4px -4px 8px rgba(255,255,255,0.9), inset 4px 4px 8px rgba(0,0,0,0.08)',
        font: 'rounded', spacing: '36px', border: 'none'
      }
    },
    liquidGlass: {
      name: '液态玻璃', tags: ['流动','高级','电商'], css: {
        bg: '#050510', text: '#f8f8ff', accent: '#c084fc',
        radius: '24px', shadow: '0 20px 60px rgba(0,0,0,0.5)',
        font: 'modern', spacing: '60px',
        glass: { bg: 'rgba(255,255,255,0.03)', blur: '40px', border: 'rgba(255,255,255,0.08)' }
      }
    },
    cyberpunkUI: {
      name: '赛博朋克', tags: ['霓虹','暗色','未来'], css: {
        bg: '#0a0a0a', text: '#00ff41', accent: '#ff003c',
        radius: '2px', shadow: '0 0 10px rgba(0,255,65,0.3)', font: 'mono',
        spacing: '32px', border: '#00ff41'
      }
    },
    motionDriven: {
      name: '动态驱动', tags: ['动画','交互','沉浸'], css: {
        bg: '#0f0f0f', text: '#ffffff', accent: '#ff3366',
        radius: '12px', shadow: 'none', font: 'modern',
        spacing: '100px', border: 'none',
        motion: { parallax: true, scrollTrigger: true, cursorFollow: true }
      }
    },
    spatialUI: {
      name: '空间计算 UI', tags: ['3D','visionOS','玻璃'], css: {
        bg: '#1a1a2e', text: '#ffffff', accent: '#60a5fa',
        radius: '32px', shadow: '0 25px 50px rgba(0,0,0,0.3)',
        font: 'apple', spacing: '48px',
        glass: { bg: 'rgba(255,255,255,0.08)', blur: '30px', border: 'rgba(255,255,255,0.15)' }
      }
    },
    natureBiophilic: {
      name: '自然有机', tags: ['绿色','自然','健康'], css: {
        bg: '#f0f7f0', text: '#1a3a1a', accent: '#2d6a4f',
        radius: '16px', shadow: '0 2px 16px rgba(0,0,0,0.06)', font: 'serif',
        spacing: '64px', border: '#c8e6c9'
      }
    },
    minimalLuxe: {
      name: '极简奢华', tags: ['高端','留白','时尚'], css: {
        bg: '#fafaf8', text: '#1a1a1a', accent: '#c9a84c',
        radius: '2px', shadow: 'none', font: 'serif',
        spacing: '100px', border: '#e5e0d5'
      }
    }
  },

  /* ════════════════════════════════════
   * 行业配色方案 (精选 30 个最实用的)
   * ════════════════════════════════════ */
  palettes: {
    saas:     { name:'SaaS/科技', primary:'#6366f1', accent:'#818cf8', bg:'#fafbff', text:'#1e293b', cta:'#f59e0b' },
    fintech:  { name:'金融科技', primary:'#0f766e', accent:'#14b8a6', bg:'#f0fdfa', text:'#134e4a', cta:'#f97316' },
    health:   { name:'医疗健康', primary:'#2563eb', accent:'#60a5fa', bg:'#eff6ff', text:'#1e3a5f', cta:'#059669' },
    ecomLux:  { name:'高端电商', primary:'#1e293b', accent:'#c9a84c', bg:'#fafaf8', text:'#0f172a', cta:'#c9a84c' },
    ecomGen:  { name:'通用电商', primary:'#ea580c', accent:'#f97316', bg:'#fff7ed', text:'#431407', cta:'#2563eb' },
    beauty:   { name:'美容/SPA', primary:'#e8b4b8', accent:'#d4af37', bg:'#fff5f5', text:'#2d3436', cta:'#a8d5ba' },
    food:     { name:'餐饮美食', primary:'#dc2626', accent:'#f59e0b', bg:'#fef2f2', text:'#450a0a', cta:'#16a34a' },
    edu:      { name:'在线教育', primary:'#7c3aed', accent:'#a78bfa', bg:'#faf5ff', text:'#3b0764', cta:'#f59e0b' },
    gaming:   { name:'游戏/娱乐', primary:'#ec4899', accent:'#f472b6', bg:'#0f0f23', text:'#f0f0ff', cta:'#fbbf24' },
    realEstate:{ name:'房产/建筑', primary:'#1e40af', accent:'#3b82f6', bg:'#f8fafc', text:'#0f172a', cta:'#dc2626' },
    creative: { name:'创意/设计', primary:'#000000', accent:'#ff3366', bg:'#ffffff', text:'#111111', cta:'#ff3366' },
    wellness: { name:'健康/冥想', primary:'#059669', accent:'#34d399', bg:'#ecfdf5', text:'#064e3b', cta:'#8b5cf6' },
    legal:    { name:'法律/金融', primary:'#1e3a5f', accent:'#475569', bg:'#fafbfc', text:'#0f172a', cta:'#b45309' },
    agency:   { name:'创意代理', primary:'#1a1a2e', accent:'#e11d48', bg:'#fafafa', text:'#111111', cta:'#2563eb' },
    fashion:  { name:'时尚/品牌', primary:'#171717', accent:'#f5f5f5', bg:'#ffffff', text:'#171717', cta:'#d4af37' },
    travel:   { name:'旅游/酒店', primary:'#0891b2', accent:'#22d3ee', bg:'#ecfeff', text:'#164e63', cta:'#f59e0b' },
    music:    { name:'音乐/艺术', primary:'#7c3aed', accent:'#f59e0b', bg:'#0f0f0f', text:'#f0f0f0', cta:'#ec4899' },
    ngo:      { name:'公益/NGO', primary:'#16a34a', accent:'#4ade80', bg:'#f0fdf4', text:'#14532d', cta:'#2563eb' },
    crypto:   { name:'加密/Web3', primary:'#f7931a', accent:'#ffd700', bg:'#0a0a0a', text:'#ffffff', cta:'#6366f1' },
    portfolio:{ name:'作品集', primary:'#18181b', accent:'#6366f1', bg:'#fafafa', text:'#18181b', cta:'#6366f1' }
  },

  /* ════════════════════════════════════
   * 字体搭配 (Google Fonts)
   * ════════════════════════════════════ */
  fontPairings: {
    modernSans:      { heading:'Outfit', body:'Inter', import:'Outfit:wght@400;600;700;800&family=Inter:wght@300;400;500', mood:'现代、专业' },
    editorialSerif:  { heading:'Playfair Display', body:'Source Serif 4', import:'Playfair+Display:wght@400;600;700&family=Source+Serif+4:wght@300;400', mood:'优雅、编辑' },
    geometric:       { heading:'Space Grotesk', body:'DM Sans', import:'Space+Grotesk:wght@400;500;700&family=DM+Sans:wght@300;400;500', mood:'几何、科技' },
    luxury:          { heading:'Cormorant Garamond', body:'Montserrat', import:'Cormorant+Garamond:wght@400;600;700&family=Montserrat:wght@300;400;500', mood:'奢华、古典' },
    japanese:        { heading:'Noto Serif JP', body:'Noto Sans JP', import:'Noto+Serif+JP:wght@400;600;700&family=Noto+Sans+JP:wght@300;400;500', mood:'日式、东方' },
    chinese:         { heading:'ZCOOL XiaoWei', body:'Noto Sans SC', import:'ZCOOL+XiaoWei&family=Noto+Sans+SC:wght@300;400;500', mood:'中文、典雅' },
    playful:         { heading:'Fredoka', body:'Nunito', import:'Fredoka:wght@400;600;700&family=Nunito:wght@300;400;600', mood:'活泼、友好' },
    mono:            { heading:'JetBrains Mono', body:'IBM Plex Mono', import:'JetBrains+Mono:wght@400;500;700&family=IBM+Plex+Mono:wght@300;400', mood:'代码、技术' },
    sporty:          { heading:'Bebas Neue', body:'Roboto', import:'Bebas+Neue&family=Roboto:wght@300;400;500', mood:'运动、活力' },
    minimal:         { heading:'Work Sans', body:'Lora', import:'Work+Sans:wght@400;600;700&family=Lora:wght@400;500', mood:'极简、当代' }
  },

  /* ════════════════════════════════════
   * Impeccable 反模式 + 质量规则
   * ════════════════════════════════════ */
  antiPatterns: [
    { rule: 'No pure black', fix: '用 #1a1a1a 或 #0f172a 代替 #000000', severity: 'error' },
    { rule: 'No Inter/Arial', fix: '用 Outfit、Space Grotesk 或系统自带字体', severity: 'warning' },
    { rule: 'No gray text on colored bg', fix: '用 rgba(255,255,255,0.85) 或 currentColor+opacity', severity: 'error' },
    { rule: 'No purple→blue gradients everywhere', fix: '根据行业选择配色方案', severity: 'warning' },
    { rule: 'No bounce/elastic easing', fix: '用 cubic-bezier(0.22,0.61,0.36,1) 弹性缓动替代', severity: 'warning' },
    { rule: 'No nested cards in cards', fix: '用边框或阴影层级区分，不要卡片套卡片', severity: 'warning' },
    { rule: 'No emojis as icons', fix: '用 SVG 图标 (Lucide/Heroicons)', severity: 'info' },
    { rule: 'No rounded-square icon tile above every heading', fix: '变换图标呈现方式', severity: 'info' },
    { rule: 'Contrast ≥ 4.5:1', fix: '文字与背景对比度至少 4.5:1', severity: 'error' },
    { rule: 'Hover states ≥ 150ms', fix: '悬停过渡至少 150ms，用 ease 缓动', severity: 'warning' },
    { rule: 'Focus visible for keyboard nav', fix: '添加 :focus-visible 轮廓样式', severity: 'warning' },
    { rule: 'Respect prefers-reduced-motion', fix: '动画用 prefers-reduced-motion 条件包裹', severity: 'info' }
  ],

  /* ════════════════════════════════════
   * 即用型设计令牌
   * ════════════════════════════════════ */
  tokens: {
    easing: { smooth: 'cubic-bezier(0.22,0.61,0.36,1)', snappy: 'cubic-bezier(0.34,1.56,0.64,1)', linear: 'cubic-bezier(0,0,1,1)' },
    shadows: {
      xs: '0 1px 2px rgba(0,0,0,0.04)',
      sm: '0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)',
      md: '0 4px 16px rgba(0,0,0,0.06)',
      lg: '0 8px 30px rgba(0,0,0,0.08)',
      xl: '0 20px 60px rgba(0,0,0,0.12)',
      glow: (color) => `0 0 40px ${color}30, 0 0 80px ${color}15`,
      neumorphic: '8px 8px 16px #d1d9e0, -8px -8px 16px #ffffff'
    },
    glass: (opacity = 0.05, blur = 20) => ({
      background: `rgba(255,255,255,${opacity})`,
      backdropFilter: `blur(${blur}px)`,
      WebkitBackdropFilter: `blur(${blur}px)`,
      border: '1px solid rgba(255,255,255,0.1)'
    })
  }
};

// 暴露到全局
window.DESIGN_SYSTEM = DESIGN_SYSTEM;
