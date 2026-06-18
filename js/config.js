/**
 * ============================================================
 * 自助建站平台 - 配置数据
 * 关键词分析规则、通用模块类型、布局模板
 * ============================================================
 */

// -----------------------------------------------------------------
// 关键词 → 网站结构 分析规则
// -----------------------------------------------------------------
const KEYWORD_PATTERNS = [
  // ===== 核心行业 (10) =====
  {
    keywords: ['电商', '商城', '店铺', '网店', '购物', 'shop', 'store', 'ecommerce', 'product', 'sell'],
    suggestion: '电商网站',
    modules: ['header', 'hero', 'features', 'products', 'testimonials', 'pricing', 'contact', 'footer'],
    template: 'card_grid',
    colorScheme: { primary: '#2563eb', accent: '#f59e0b' }
  },
  {
    keywords: ['公司', '企业', '官网', 'corporate', 'company', 'business', 'official'],
    suggestion: '企业官网',
    modules: ['header', 'hero', 'features', 'team', 'testimonials', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#1e40af', accent: '#3b82f6' }
  },
  {
    keywords: ['博客', '文章', 'blog', 'weblog', 'article', 'writing', 'news', '专栏'],
    suggestion: '博客/内容站',
    modules: ['header', 'hero', 'text', 'gallery', 'contact', 'footer'],
    template: 'blog_timeline',
    colorScheme: { primary: '#1f2937', accent: '#6366f1' }
  },
  {
    keywords: ['作品', '展示', 'portfolio', 'gallery', 'showcase', '作品集', '设计'],
    suggestion: '作品集/展示站',
    modules: ['header', 'hero', 'gallery', 'features', 'contact', 'footer'],
    template: 'card_grid',
    colorScheme: { primary: '#0f0f0f', accent: '#ec4899' }
  },
  {
    keywords: ['餐饮', '餐厅', '菜单', 'restaurant', 'menu', 'food', 'cafe', '咖啡'],
    suggestion: '餐饮/美食站',
    modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#78350f', accent: '#f97316' }
  },
  {
    keywords: ['教育', '课程', '培训', 'education', 'course', 'learn', 'tutor', '学习'],
    suggestion: '教育/课程站',
    modules: ['header', 'hero', 'features', 'pricing', 'team', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#065f46', accent: '#10b981' }
  },
  {
    keywords: ['个人', '名片', '简历', 'resume', 'personal', 'cv', 'portfolio', '自我介绍'],
    suggestion: '个人名片/简历',
    modules: ['header', 'hero', 'features', 'gallery', 'contact', 'footer'],
    template: 'minimal_action',
    colorScheme: { primary: '#1e293b', accent: '#64748b' }
  },
  {
    keywords: ['科技', 'SaaS', '软件', 'app', 'software', 'tech', 'startup', '创业'],
    suggestion: '科技/SaaS站',
    modules: ['header', 'hero', 'features', 'pricing', 'testimonials', 'contact', 'footer'],
    template: 'minimal_action',
    colorScheme: { primary: '#0f172a', accent: '#06b6d4' }
  },
  {
    keywords: ['房地产', '房产', '租房', 'realestate', 'property', 'house', '公寓', '楼盘'],
    suggestion: '房地产/房产站',
    modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'],
    template: 'card_grid',
    colorScheme: { primary: '#451a03', accent: '#d97706' }
  },
  {
    keywords: ['医疗', '健康', '医院', '诊所', 'health', 'medical', 'clinic', 'doctor'],
    suggestion: '医疗/健康站',
    modules: ['header', 'hero', 'features', 'team', 'testimonials', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#0c4a6e', accent: '#0ea5e9' }
  },

  // ===== 生活消费 (6) =====
  {
    keywords: ['摄影', '写真', '婚纱', 'photography', 'photographer', '拍照', '摄影师', '摄影工作室', '视觉'],
    suggestion: '摄影工作室',
    modules: ['header', 'hero', 'gallery', 'pricing', 'text', 'contact', 'footer'],
    template: 'portfolio_masonry',
    colorScheme: { primary: '#1a1a2e', accent: '#e2c275' }
  },
  {
    keywords: ['婚礼', '婚庆', 'wedding', 'event', '策划', '活动', '派对', '庆典', '司仪', '婚宴'],
    suggestion: '婚礼/活动策划',
    modules: ['header', 'hero', 'gallery', 'features', 'testimonials', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#831843', accent: '#fbcfe8' }
  },
  {
    keywords: ['健身', '运动', 'fitness', 'gym', 'workout', '瑜伽', '体育', '训练', '教练', '健身房'],
    suggestion: '健身/运动',
    modules: ['header', 'hero', 'features', 'pricing', 'team', 'testimonials', 'contact', 'footer'],
    template: 'minimal_action',
    colorScheme: { primary: '#171717', accent: '#ef4444' }
  },
  {
    keywords: ['美容', '美业', '美发', 'beauty', 'salon', 'spa', '美甲', '护肤', '化妆', '纹绣'],
    suggestion: '美业/美容',
    modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'],
    template: 'card_grid',
    colorScheme: { primary: '#831843', accent: '#db2777' }
  },
  {
    keywords: ['时尚', '服装', 'fashion', 'clothing', '服饰', '穿搭', '潮牌', '买手', '时装', '鞋'],
    suggestion: '时尚/服装',
    modules: ['header', 'hero', 'gallery', 'features', 'products', 'contact', 'footer'],
    template: 'card_grid',
    colorScheme: { primary: '#0f0f0f', accent: '#e11d48' }
  },
  {
    keywords: ['宠物', 'pet', 'dog', 'cat', '兽医', '宠物店', '宠物医院', '萌宠', '宠物美容', '寄养'],
    suggestion: '宠物/动物',
    modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'],
    template: 'card_grid',
    colorScheme: { primary: '#78350f', accent: '#f59e0b' }
  },

  // ===== 专业服务 (5) =====
  {
    keywords: ['律师', '法律', 'lawyer', 'legal', '律所', '诉讼', '法务', '事务所', '维权', '合同'],
    suggestion: '法律/律师',
    modules: ['header', 'hero', 'features', 'team', 'testimonials', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#1e3a5f', accent: '#94a3b8' }
  },
  {
    keywords: ['咨询', '顾问', 'consulting', 'consultant', '管理咨询', '战略', '营销策划', '品牌策划'],
    suggestion: '咨询/顾问',
    modules: ['header', 'hero', 'features', 'team', 'testimonials', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#1e293b', accent: '#f59e0b' }
  },
  {
    keywords: ['建筑', '室内设计', 'architecture', 'architect', 'design', '室内', '装修', '装潢', '景观设计'],
    suggestion: '建筑/室内设计',
    modules: ['header', 'hero', 'gallery', 'features', 'team', 'contact', 'footer'],
    template: 'portfolio_masonry',
    colorScheme: { primary: '#27272a', accent: '#a1a1aa' }
  },
  {
    keywords: ['培训', '教练', 'coach', 'training', '辅导', '技能提升', 'workshop', '导师', '成长'],
    suggestion: '培训/个人教练',
    modules: ['header', 'hero', 'features', 'pricing', 'testimonials', 'contact', 'footer'],
    template: 'minimal_action',
    colorScheme: { primary: '#4c1d95', accent: '#8b5cf6' }
  },
  {
    keywords: ['汽车', '车行', 'auto', 'car', 'vehicle', '4S', '二手车', '租车', '驾校', '修车'],
    suggestion: '汽车/交通',
    modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'],
    template: 'card_grid',
    colorScheme: { primary: '#1e293b', accent: '#3b82f6' }
  },

  // ===== 文化/娱乐 (3) =====
  {
    keywords: ['音乐', '乐队', 'musician', 'band', 'singer', '歌手', '专辑', '演出', '演唱会', '艺人'],
    suggestion: '音乐人/乐队',
    modules: ['header', 'hero', 'gallery', 'text', 'pricing', 'contact', 'footer'],
    template: 'video_showcase',
    colorScheme: { primary: '#0c0c0c', accent: '#a855f7' }
  },
  {
    keywords: ['旅游', '酒店', '旅行', 'travel', 'hotel', '度假', '民宿', '景点', '旅行社', '游记'],
    suggestion: '旅游/酒店',
    modules: ['header', 'hero', 'gallery', 'features', 'pricing', 'testimonials', 'contact', 'footer'],
    template: 'card_grid',
    colorScheme: { primary: '#0c4a6e', accent: '#38bdf8' }
  },
  {
    keywords: ['公益', '慈善', 'nonprofit', 'charity', '非营利', '捐款', '志愿者', '基金会', 'NGO', '捐助'],
    suggestion: '非营利/公益',
    modules: ['header', 'hero', 'features', 'text', 'gallery', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#064e3b', accent: '#22c55e' }
  }
];

// 默认分析结果（当无关键词匹配时）
const DEFAULT_ANALYSIS = {
  suggestion: '通用网站',
  modules: ['header', 'hero', 'features', 'text', 'contact', 'footer'],
  template: 'story_flow',
  colorScheme: { primary: '#334155', accent: '#6366f1' }
};

// -----------------------------------------------------------------
// 通用模块类型定义
// -----------------------------------------------------------------
const MODULE_TYPES = {
  header: {
    type: 'header',
    label: '页头导航',
    icon: '🗂',
    description: '网站顶部导航栏',
    defaultConfig: {
      siteName: '我的网站',
      logoUrl: '',
      navItems: ['首页', '关于', '服务', '联系'],
      layout: 'default' // default | centered | transparent
    }
  },
  hero: {
    type: 'hero',
    label: '主视觉区',
    icon: '🖼',
    description: '首页大横幅，标题+副标题+按钮',
    defaultConfig: {
      title: '欢迎来到我们的网站',
      subtitle: '用一句话描述您的核心价值',
      ctaText: '了解更多',
      ctaLink: '#',
      bgType: 'color', // color | image | gradient
      bgColor: '#1e293b',
      bgImage: '',
      textColor: '#ffffff',
      height: 'large' // small | medium | large | fullscreen
    }
  },
  text: {
    type: 'text',
    label: '文本块',
    icon: '📝',
    description: '富文本内容区域',
    defaultConfig: {
      title: '关于我们',
      content: '在这里输入您的内容。可以包含段落、标题、列表等多种文本格式。',
      align: 'left', // left | center | right
      maxWidth: '800px'
    }
  },
  image: {
    type: 'image',
    label: '图片',
    icon: '🖼',
    description: '单张图片展示',
    defaultConfig: {
      src: '',
      placeholder: 'https://via.placeholder.com/800x500/e2e8f0/64748b?text=点击上传图片',
      caption: '',
      alt: '图片描述',
      borderRadius: '8px',
      shadow: 'small' // none | small | medium | large
    }
  },
  imageText: {
    type: 'imageText',
    label: '图文混合',
    icon: '📰',
    description: '图片与文字并排展示',
    defaultConfig: {
      title: '标题',
      content: '描述文字内容',
      imageSide: 'right', // left | right
      imageSrc: '',
      imagePlaceholder: 'https://via.placeholder.com/500x400/e2e8f0/64748b?text=图片'
    }
  },
  features: {
    type: 'features',
    label: '特点/服务',
    icon: '⭐',
    description: '展示核心特点或服务项目',
    defaultConfig: {
      title: '我们的优势',
      subtitle: '为什么选择我们',
      columns: 3, // 2 | 3 | 4
      items: [
        { icon: '🚀', title: '快速', desc: '描述您的第一个优势特点' },
        { icon: '🛡', title: '安全', desc: '描述您的第二个优势特点' },
        { icon: '💡', title: '创新', desc: '描述您的第三个优势特点' }
      ],
      layout: 'card' // card | icon-top | minimal
    }
  },
  products: {
    type: 'products',
    label: '产品展示',
    icon: '📦',
    description: '产品或商品展示网格',
    defaultConfig: {
      title: '产品展示',
      items: [
        { name: '产品一', price: '¥99', desc: '产品简短描述', image: '', badge: '' },
        { name: '产品二', price: '¥199', desc: '产品简短描述', image: '', badge: '热销' },
        { name: '产品三', price: '¥299', desc: '产品简短描述', image: '', badge: '' }
      ],
      showPrice: true,
      showBadge: true
    }
  },
  pricing: {
    type: 'pricing',
    label: '价格表',
    icon: '💰',
    description: '定价方案对比',
    defaultConfig: {
      title: '定价方案',
      subtitle: '选择最适合您的方案',
      items: [
        { name: '基础版', price: '¥99', period: '/月', features: ['功能一', '功能二', '功能三'], highlighted: false, cta: '开始使用' },
        { name: '专业版', price: '¥199', period: '/月', features: ['功能一', '功能二', '功能三', '功能四', '功能五'], highlighted: true, cta: '热门推荐' },
        { name: '企业版', price: '¥499', period: '/月', features: ['全部功能', '专属支持', '定制服务'], highlighted: false, cta: '联系咨询' }
      ]
    }
  },
  team: {
    type: 'team',
    label: '团队成员',
    icon: '👥',
    description: '团队介绍卡片',
    defaultConfig: {
      title: '我们的团队',
      items: [
        { name: '张三', role: 'CEO/创始人', avatar: '', desc: '简短介绍' },
        { name: '李四', role: '技术总监', avatar: '', desc: '简短介绍' },
        { name: '王五', role: '设计总监', avatar: '', desc: '简短介绍' }
      ]
    }
  },
  testimonials: {
    type: 'testimonials',
    label: '客户评价',
    icon: '💬',
    description: '客户证言/评价轮播',
    defaultConfig: {
      title: '客户评价',
      items: [
        { quote: '非常棒的服务，强烈推荐！', author: '客户A', title: '某公司CEO', avatar: '' },
        { quote: '专业高效的团队，合作愉快。', author: '客户B', title: '某公司经理', avatar: '' },
        { quote: '质量超出预期，值得信赖。', author: '客户C', title: '某公司创始人', avatar: '' }
      ]
    }
  },
  gallery: {
    type: 'gallery',
    label: '相册/作品集',
    icon: '🎨',
    description: '图片网格展示',
    defaultConfig: {
      title: '作品展示',
      layout: 'grid', // grid | masonry | slider
      columns: 3,
      items: [
        { src: '', placeholder: '#', caption: '作品一' },
        { src: '', placeholder: '#', caption: '作品二' },
        { src: '', placeholder: '#', caption: '作品三' },
        { src: '', placeholder: '#', caption: '作品四' },
        { src: '', placeholder: '#', caption: '作品五' },
        { src: '', placeholder: '#', caption: '作品六' }
      ]
    }
  },
  contact: {
    type: 'contact',
    label: '联系方式',
    icon: '📞',
    description: '联系信息及表单',
    defaultConfig: {
      title: '联系我们',
      address: '北京市朝阳区XX路XX号',
      phone: '010-8888-8888',
      email: 'contact@example.com',
      showForm: true,
      formFields: ['name', 'email', 'message']
    }
  },
  button: {
    type: 'button',
    label: '按钮',
    icon: '🔘',
    description: '自定义按钮',
    defaultConfig: {
      text: '点击这里',
      link: '#',
      style: 'solid', // solid | outline | ghost
      size: 'medium', // small | medium | large
      align: 'center', // left | center | right
      borderRadius: '50px',
      fullWidth: false
    }
  },
  divider: {
    type: 'divider',
    label: '分隔线',
    icon: '➖',
    description: '内容分隔线',
    defaultConfig: {
      style: 'solid', // solid | dashed | dotted
      color: '#e2e8f0',
      thickness: '2px',
      width: '100%', // 百分比
      spacing: '40px'
    }
  },
  map: {
    type: 'map',
    label: '地图',
    icon: '📍',
    description: '嵌入地图',
    defaultConfig: {
      title: '我们的位置',
      address: '北京市朝阳区',
      embedUrl: '',
      height: '400px'
    }
  },
  video: {
    type: 'video',
    label: '视频',
    icon: '🎬',
    description: '嵌入视频',
    defaultConfig: {
      title: '',
      embedUrl: '',
      aspectRatio: '16/9',
      autoplay: false
    }
  },
  footer: {
    type: 'footer',
    label: '页脚',
    icon: '📋',
    description: '网站底部信息',
    defaultConfig: {
      copyright: `© ${new Date().getFullYear()} 我的网站 版权所有`,
      showSocial: true,
      socialLinks: { wechat: '', weibo: '', email: '' },
      columns: [
        { title: '关于', items: ['公司介绍', '联系方式', '加入我们'] },
        { title: '服务', items: ['服务项目', '收费标准', '常见问题'] }
      ]
    }
  },
  customHTML: {
    type: 'customHTML',
    label: '自定义代码',
    icon: '💻',
    description: '嵌入自定义HTML代码',
    defaultConfig: {
      title: '',
      html: '<!-- 在此输入自定义 HTML -->',
      height: 'auto'
    }
  },

  // ========== ReactBits 特效模块 ==========
  rbTextFx: {
    type: 'rbTextFx',
    label: '文字动效',
    icon: '✨',
    description: 'ReactBits 文字动画效果',
    defaultConfig: {
      text: '动感文字',
      effect: 'shiny',       // shiny | gradient | glitch | blur | fuzzy | split | decrypt | truefocus
      tag: 'h2',
      align: 'center',
      padding: '40px 20px',
      color1: '#6366f1',
      color2: '#ec4899',
      color3: '#f59e0b'
    }
  },
  rbBgFx: {
    type: 'rbBgFx',
    label: '动效背景',
    icon: '🌌',
    description: 'ReactBits Canvas 动画背景',
    defaultConfig: {
      effect: 'aurora',      // aurora | particles | waves | hyperspeed | galaxy | beams | noise | plasma | gridmotion | floatinglines | lightpillar | lightrays | gradientblinds
      height: '500px',
      text: '',
      subText: '',
      textColor: '#ffffff',
      colors: ['#6366f1', '#ec4899', '#10b981'],
      opacity: 0.8
    }
  },
  rbTiltedCard: {
    type: 'rbTiltedCard',
    label: '3D倾斜卡片',
    icon: '🃏',
    description: 'ReactBits TiltedCard — 鼠标跟随3D倾斜',
    defaultConfig: {
      title: '3D 倾斜卡片',
      content: '移动鼠标查看倾斜效果',
      icon: '🚀',
      tiltIntensity: 15,
      padding: '40px',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      borderRadius: '16px',
      shadow: 'medium'
    }
  },
  rbBounceCards: {
    type: 'rbBounceCards',
    label: '弹跳卡片组',
    icon: '🫧',
    description: 'ReactBits BounceCards — 弹性入场卡片',
    defaultConfig: {
      title: '弹性卡片',
      columns: 3,
      items: [
        { icon: '🚀', title: '快速', desc: '极致性能体验' },
        { icon: '🎨', title: '美观', desc: '精心设计界面' },
        { icon: '🔒', title: '安全', desc: '数据加密保护' }
      ],
      gap: '16px',
      padding: '24px',
      bgColor: '#ffffff',
      textColor: '#1e293b',
      borderRadius: '12px'
    }
  },
  rbGlassSurface: {
    type: 'rbGlassSurface',
    label: '玻璃质感',
    icon: '🪟',
    description: 'ReactBits GlassSurface — 毛玻璃效果',
    defaultConfig: {
      content: '毛玻璃质感卡片',
      padding: '40px',
      borderRadius: '16px',
      bgOpacity: 0.1,
      blur: 20,
      textColor: '#1e293b'
    }
  },
  rbCarousel: {
    type: 'rbCarousel',
    label: '轮播组件',
    icon: '🎠',
    description: 'ReactBits Carousel — 图片/内容轮播',
    defaultConfig: {
      slides: [
        { title: '幻灯片 1', content: '第一张内容', bgColor: '#667eea' },
        { title: '幻灯片 2', content: '第二张内容', bgColor: '#f093fb' },
        { title: '幻灯片 3', content: '第三张内容', bgColor: '#4facfe' }
      ],
      autoplay: true,
      interval: 4000,
      height: '400px',
      textColor: '#ffffff',
      borderRadius: '16px'
    }
  },
  rbSpotlightCard: {
    type: 'rbSpotlightCard',
    label: '聚光灯卡片',
    icon: '🔦',
    description: 'ReactBits SpotlightCard — 鼠标聚光效果',
    defaultConfig: {
      title: '聚光灯卡片',
      content: '移动鼠标查看聚光效果',
      icon: '💡',
      padding: '40px',
      bgColor: '#1e293b',
      textColor: '#f1f5f9',
      borderRadius: '16px'
    }
  },
};

// -----------------------------------------------------------------
// 布局模板
// -----------------------------------------------------------------
const LAYOUT_TEMPLATES = {
  story_flow: {
    id: 'story_flow',
    name: '叙事流布局',
    description: '自上而下的叙事节奏，适合内容型网站（企业、教育、公益）',
    preview: '📄'
  },
  card_grid: {
    id: 'card_grid',
    name: '卡片网格布局',
    description: '信息密集的卡片陈列，适合展示型网站（电商、房产、作品）',
    preview: '🔲'
  },
  minimal_action: {
    id: 'minimal_action',
    name: '极简行动布局',
    description: '简洁专注，转化优先（SaaS、个人名片、健身）',
    preview: '⚡'
  },
  portfolio_masonry: {
    id: 'portfolio_masonry',
    name: '瀑布流作品集',
    description: '错落有致的瀑布流展示，适合摄影、设计、建筑作品集',
    preview: '🏛'
  },
  ecommerce_grid: {
    id: 'ecommerce_grid',
    name: '电商网格布局',
    description: '商品橱窗式网格+筛选+购物车，适合在线商城',
    preview: '🛍'
  },
  blog_timeline: {
    id: 'blog_timeline',
    name: '博客时间线布局',
    description: '按时间排列的文章流+分类侧栏，适合博客和资讯站',
    preview: '📰'
  },
  video_showcase: {
    id: 'video_showcase',
    name: '视频展示布局',
    description: '大视频背景+内容浮层，适合音乐人、视频创作者',
    preview: '🎬'
  },
  landing_page: {
    id: 'landing_page',
    name: '营销单页布局',
    description: '全屏分区+强CTA，适合产品发布和活动推广',
    preview: '🚀'
  }
};

// -----------------------------------------------------------------
// 默认配色方案
// -----------------------------------------------------------------
const COLOR_SCHEMES = {
  // 基础主题
  light: { bg: '#ffffff', text: '#1e293b', card: '#f8fafc', muted: '#e2e8f0' },
  dark: { bg: '#0f172a', text: '#f1f5f9', card: '#1e293b', muted: '#334155' },
  warm: { bg: '#fefcfb', text: '#292524', card: '#faf5f3', muted: '#e7e5e4' },
  cool: { bg: '#f8fafc', text: '#0f172a', card: '#eef2f6', muted: '#cbd5e1' },

  // 行业专属配色
  tech: { bg: '#0b1121', text: '#e2e8f0', card: '#1a2332', muted: '#2d3a4e', primary: '#2563eb', accent: '#06b6d4' },
  health: { bg: '#f0fdfa', text: '#134e4a', card: '#ccfbf1', muted: '#99f6e4', primary: '#0f766e', accent: '#14b8a6' },
  fashion: { bg: '#fafafa', text: '#171717', card: '#f5f5f5', muted: '#e5e5e5', primary: '#0f0f0f', accent: '#e11d48' },
  food: { bg: '#fefcfb', text: '#292524', card: '#fef2e8', muted: '#fed7aa', primary: '#b45309', accent: '#f97316' },
  creative: { bg: '#0f0f1a', text: '#f1f5f9', card: '#1a1a2e', muted: '#2d2d44', primary: '#7c3aed', accent: '#ec4899' },
  nature: { bg: '#f0fdf4', text: '#14532d', card: '#dcfce7', muted: '#86efac', primary: '#16a34a', accent: '#f59e0b' },
  luxury: { bg: '#0a0a0a', text: '#faf5eb', card: '#1a1a1a', muted: '#333333', primary: '#1a1a2e', accent: '#d4a853' },
  minimal: { bg: '#ffffff', text: '#18181b', card: '#f4f4f5', muted: '#d4d4d8', primary: '#18181b', accent: '#a1a1aa' }
};

// -----------------------------------------------------------------
// 行业模板内容 — 预填充各行业的模块专属内容
// 用户匹配到对应行业后，进入编辑器可直接看到行业风格的内容
// -----------------------------------------------------------------

/**
 * 深合并工具：将 src 的属性合并到 target 中（支持嵌套对象和数组替换）
 */
function mergeDeep(target, src) {
  const result = { ...target };
  for (const key of Object.keys(src)) {
    if (src[key] && typeof src[key] === 'object' && !Array.isArray(src[key]) && result[key] && typeof result[key] === 'object') {
      result[key] = mergeDeep(result[key], src[key]);
    } else {
      result[key] = src[key];
    }
  }
  return result;
}

const TEMPLATE_CONTENT = {
  // ===== 核心行业 =====
  '电商网站': {
    header: { siteName: '优选商城', navItems: ['首页', '全部商品', '限时特惠', '关于我们', '联系我们'], style: 'floating' },
    hero: { title: '发现生活之美', subtitle: '精选好物 · 品质生活从这里开始', ctaText: '立即选购', ctaLink: '#products', bgType: 'aurora', height: 'large' },
    features: { title: '为什么选择我们', subtitle: '用心服务每一位客户', columns: 3, items: [
      { icon: '🚚', title: '极速发货', desc: '全国物流覆盖，下单后24小时内出库' },
      { icon: '🛡', title: '品质保障', desc: '严格筛选供应商，支持7天无理由退换' },
      { icon: '💎', title: '会员特权', desc: '专属折扣、生日礼遇、积分兑换好礼' }
    ]},
    products: { title: '热销爆款', items: [
      { name: '智能手表 Pro', price: '¥1,299', desc: 'AMOLED屏·14天续航·血氧监测', badge: '热卖' },
      { name: '无线降噪耳机', price: '¥899', desc: '主动降噪·Hi-Fi音质·30h续航', badge: '新品' },
      { name: '便携充电宝', price: '¥199', desc: '20000mAh·快充·小巧便携', badge: '' }
    ]},
    testimonials: { title: '听听大家怎么说', items: [
      { quote: '品质非常好，物流也很快，已经回购多次了！', author: '张女士', title: '金牌会员' },
      { quote: '客服很有耐心，退换货处理很及时，让人放心。', author: '李先生', title: '资深买家' }
    ]},
    pricing: { title: '会员权益', subtitle: '选择最适合您的方案', style: 'glass', items: [
      { name: '普通会员', price: '免费', period: '/月', features: ['基础折扣', '订单追踪', '在线客服'], highlighted: false, cta: '免费开通' },
      { name: 'VIP会员', price: '¥99', period: '/月', features: ['全场9折', '优先发货', '专属客服', '生日礼包'], highlighted: true, cta: '立即开通' },
      { name: '企业会员', price: '¥499', period: '/月', features: ['全场8折', 'API对接', '客户经理', '定制服务', '月结账单'], highlighted: false, cta: '联系商务' }
    ]},
    contact: { title: '联系我们', address: '上海市浦东新区张江高科技园区XX路XX号', phone: '400-888-8888', email: 'shop@example.com' },
    footer: { copyright: '© 2026 优选商城 All Rights Reserved', style: 'modern', columns: [
      { title: '购物指南', items: ['购物流程', '支付方式', '物流配送', '售后服务'] },
      { title: '关于我们', items: ['公司介绍', '加入我们', '联系方式', '隐私政策'] }
    ]}
  },

  '企业官网': {
    header: { siteName: 'XX集团', navItems: ['首页', '关于我们', '业务领域', '新闻中心', '加入我们', '联系我们'] },
    hero: { title: '以创新驱动未来', subtitle: '深耕行业二十载 · 服务全球千万客户', ctaText: '了解更多', bgType: 'aurora', height: 'large' },
    features: { title: '核心业务', subtitle: '多元化布局，全方位服务', layout: 'bento', columns: 4, items: [
      { icon: '🏭', title: '智能制造', desc: '工业4.0标准生产线，年产能超百亿' },
      { icon: '🌐', title: '数字科技', desc: '云计算、大数据、AI技术领先' },
      { icon: '📊', title: '金融服务', desc: '保险、证券、银行综合金融' },
      { icon: '🌱', title: '绿色能源', desc: '光伏、风电清洁能源解决方案' }
    ]},
    team: { title: '管理团队', items: [
      { name: '张明远', role: '董事长兼CEO', desc: '清华大学EMBA，20年行业管理经验' },
      { name: '李思源', role: 'CTO', desc: '前阿里技术总监，资深架构师' },
      { name: '王慧琳', role: 'CFO', desc: '注册会计师，多年上市公司财务经验' }
    ]},
    testimonials: { title: '合作伙伴评价', items: [
      { quote: 'XX集团是我们最值得信赖的战略合作伙伴，项目交付质量和效率都很高。', author: '刘总', title: '某500强企业中国区CEO' },
      { quote: '与XX集团合作多年，专业能力和服务态度都令人钦佩。', author: '陈先生', title: '某上市公司采购总监' }
    ]},
    contact: { title: '联系我们', address: '北京市朝阳区国贸CBD XX大厦', phone: '010-8888-8888', email: 'contact@xxgroup.com' },
    footer: { copyright: '© 2026 XX集团 版权所有', style: 'modern', columns: [
      { title: '业务领域', items: ['智能制造', '数字科技', '金融服务', '绿色能源'] },
      { title: '关于集团', items: ['集团简介', '发展历程', '企业文化', '社会责任'] }
    ]}
  },

  '博客/内容站': {
    header: { siteName: '知音阁', navItems: ['首页', '专栏文章', '关于我', '订阅', '联系'] },
    hero: { title: '用文字记录思考', subtitle: '关于科技、生活与成长的独立博客', ctaText: '浏览最新文章', ctaLink: '#articles', bgType: 'color', bgColor: '#1f2937', height: 'medium' },
    text: { title: '关于这个博客', content: '欢迎来到我的个人博客！这里记录了我对技术、生活、阅读的思考和感悟。我相信文字的力量——每一篇文章都是一次与读者的深度对话。无论你是偶然路过还是常驻读者，希望这里的文字能给你带来启发和温暖。', align: 'center', maxWidth: '700px' },
    gallery: { title: '生活剪影', columns: 3, items: [
      { caption: '窗外的日落' }, { caption: '书桌一角' }, { caption: '旅途风景' },
      { caption: '城市夜景' }, { caption: '咖啡时光' }, { caption: '春日的花' }
    ]},
    contact: { title: '联系我', address: '', phone: '', email: 'hello@example.com' },
    footer: { copyright: '© 2026 知音阁 · 保留所有权利', columns: [
      { title: '分类', items: ['技术', '生活', '阅读', '旅行'] },
      { title: '链接', items: ['关于我', '订阅更新', '隐私声明'] }
    ]}
  },

  '作品集/展示站': {
    header: { siteName: 'Creative Studio', navItems: ['作品', '关于', '服务', '联系'] },
    hero: { title: '设计让世界更美好', subtitle: 'UI/UX 设计 · 品牌视觉 · 创意概念', ctaText: '查看作品', ctaLink: '#gallery', bgType: 'color', bgColor: '#0f0f0f', textColor: '#ffffff', height: 'large' },
    gallery: { title: '精选作品', layout: 'grid', columns: 3, items: [
      { caption: '电商App改版设计' }, { caption: '品牌VI系统' }, { caption: '数据Dashboard' },
      { caption: '营销落地页' }, { caption: '图标设计集' }, { caption: 'Banner创意' }
    ]},
    features: { title: '服务范围', subtitle: '从品牌到产品，全链路设计服务', columns: 3, items: [
      { icon: '🎨', title: '品牌设计', desc: 'Logo设计、VI系统、品牌手册' },
      { icon: '📱', title: 'UI/UX设计', desc: 'App设计、Web设计、交互原型' },
      { icon: '🎬', title: '动效设计', desc: '交互动效、品牌视频、MG动画' }
    ]},
    contact: { title: '合作咨询', address: '北京市朝阳区798艺术区', phone: '138-8888-8888', email: 'hi@creativestudio.com' },
    footer: { copyright: '© 2026 Creative Studio', columns: [
      { title: '服务', items: ['品牌设计', 'UI/UX', '动效设计'] },
      { title: '联系', items: ['微信: creativestudio', '微博: @CreativeStudio', '邮箱: hi@creativestudio.com'] }
    ]}
  },

  '餐饮/美食站': {
    header: { siteName: '味蕾时光', navItems: ['首页', '菜单', '关于我们', '预订', '联系'] },
    hero: { title: '每一道菜都是艺术品', subtitle: '甄选食材 · 匠心烹饪 · 品味生活', ctaText: '立即预订', ctaLink: '#reservation', bgType: 'waves', height: 'large' },
    features: { title: '我们的特色', subtitle: '用心做好每一道菜', columns: 3, items: [
      { icon: '🥩', title: '甄选食材', desc: '全球优质产地直供，保证新鲜与品质' },
      { icon: '👨‍🍳', title: '匠心烹饪', desc: '三十年经验主厨团队，传承经典味道' },
      { icon: '🍷', title: '精致搭配', desc: '专业侍酒师推荐，完美餐酒搭配' }
    ]},
    gallery: { title: '菜品展示', columns: 3, items: [
      { caption: '招牌炭烤牛排' }, { caption: '法式鹅肝' }, { caption: '意式手工披萨' },
      { caption: '日式刺身拼盘' }, { caption: '秘制甜品' }, { caption: '特调鸡尾酒' }
    ]},
    pricing: { title: '套餐选择', subtitle: '适合不同场合的用餐体验', style: 'glass', items: [
      { name: '双人精选', price: '¥388', period: '/套', features: ['前菜2份', '主菜2份', '甜品1份', '饮品2杯'], highlighted: false, cta: '立即预订' },
      { name: '四人盛宴', price: '¥988', period: '/套', features: ['前菜4份', '主菜4份', '甜品2份', '酒水1瓶', '例汤4份'], highlighted: true, cta: '热销推荐' },
      { name: '商务宴请', price: '¥1,888', period: '/套', features: ['定制菜单', '私密包间', '专属服务', '精选酒水', '停车位'], highlighted: false, cta: '电话预约' }
    ]},
    contact: { title: '联系我们', address: '上海市黄浦区外滩XX号', phone: '021-8888-8888', email: 'reservation@example.com' },
    footer: { copyright: '© 2026 味蕾时光 保留权利', columns: [
      { title: '营业时间', items: ['午餐 11:30-14:00', '晚餐 17:30-22:00', '周六日正常营业'] },
      { title: '关于', items: ['品牌故事', '团队介绍', '加盟合作'] }
    ]}
  },

  '教育/课程站': {
    header: { siteName: '未来学堂', navItems: ['首页', '全部课程', '名师团队', '学习路径', '关于我们'] },
    hero: { title: '点亮你的职业未来', subtitle: '实战导向的在线课程 · 百万学员的共同选择', ctaText: '免费试听', ctaLink: '#courses', bgType: 'aurora', height: 'large' },
    features: { title: '为什么选择我们', subtitle: '不只是听课，而是真正掌握技能', columns: 3, items: [
      { icon: '🎯', title: '实战项目', desc: '每个课程包含真实企业级项目，边学边练' },
      { icon: '👨‍🏫', title: '名师指导', desc: '一线大厂资深工程师亲自授课答疑' },
      { icon: '🎓', title: '结业认证', desc: '通过考核可获得行业认可的结业证书' }
    ]},
    pricing: { title: '课程方案', subtitle: '投资自己是最好的选择', style: 'glass', items: [
      { name: '录播畅学', price: '¥299', period: '/年', features: ['全部录播课程', '学习社区', '课后练习'], highlighted: false, cta: '立即订阅' },
      { name: '实战训练营', price: '¥2,999', period: '/期', features: ['直播授课', '项目实战', '作业批改', '社群答疑', '结业证书'], highlighted: true, cta: '限时优惠' },
      { name: '1v1私教', price: '¥9,999', period: '/月', features: ['私人定制计划', '每日答疑', '简历指导', '面试模拟', '内推机会', '终身回看'], highlighted: false, cta: '咨询顾问' }
    ]},
    team: { title: '名师团队', items: [
      { name: '赵教授', role: '算法导师', desc: '前Google工程师，MIT博士' },
      { name: '孙总监', role: '前端导师', desc: '前字节跳动技术总监' },
      { name: '周老师', role: '产品导师', desc: '前腾讯产品总监，10年产品经验' }
    ]},
    contact: { title: '联系我们', address: '北京市海淀区中关村XX大厦', phone: '400-000-0000', email: 'study@futureclass.com' },
    footer: { copyright: '© 2026 未来学堂 版权所有', columns: [
      { title: '课程', items: ['前端开发', '数据分析', 'AI算法', '产品经理'] },
      { title: '关于', items: ['平台介绍', '师资力量', '学员故事', '帮助中心'] }
    ]}
  },

  '个人名片/简历': {
    header: { siteName: '陈思远', navItems: ['首页', '关于', '技能', '作品', '联系'] },
    hero: { title: '陈思远', subtitle: '全栈开发工程师 · 5年经验 · 热爱技术', ctaText: '查看简历', ctaLink: '#about', bgType: 'color', bgColor: '#1e293b', height: 'medium' },
    features: { title: '专业技能', subtitle: '', columns: 3, items: [
      { icon: '⚛️', title: '前端开发', desc: 'React/Vue/TypeScript/Next.js' },
      { icon: '⚙️', title: '后端开发', desc: 'Node.js/Python/Go/微服务' },
      { icon: '☁️', title: '云原生', desc: 'Docker/K8s/AWS/CI/CD' }
    ]},
    gallery: { title: '项目精选', columns: 2, items: [
      { caption: '电商平台 — 日活50万' }, { caption: '数据Dashboard — 实时分析' },
      { caption: 'AI聊天应用 — GPT集成' }, { caption: '支付系统 — 日均百万交易' }
    ]},
    contact: { title: '联系我', address: '杭州市西湖区', phone: '138-0000-0000', email: 'siyuan.chen@example.com' },
    footer: { copyright: '© 2026 陈思远 · 个人简历', columns: [
      { title: '社交媒体', items: ['GitHub: github.com/siyuan', '掘金: juejin.cn/user/xxx', '知乎: zhihu.com/people/xxx'] }
    ]}
  },

  '科技/SaaS站': {
    header: { siteName: 'CloudX', navItems: ['产品', '解决方案', '定价', '文档', '联系我们'], style: 'floating' },
    hero: { title: '下一代云原生平台', subtitle: '高性能 · 高可用 · 低成本 — 让技术驱动业务增长', ctaText: '免费试用', ctaLink: '#pricing', bgType: 'grid', bgColor: '#0f172a', height: 'large' },
    features: { title: '核心能力', subtitle: '一站式云服务，助力企业数字化转型', layout: 'bento', columns: 3, items: [
      { icon: '⚡', title: '毫秒级响应', desc: '全球CDN加速，边缘计算节点覆盖50+区域' },
      { icon: '🔒', title: '企业级安全', desc: 'SOC2认证，数据加密，零信任架构' },
      { icon: '📊', title: '智能分析', desc: '实时数据处理，AI驱动业务洞察' }
    ]},
    pricing: { title: '灵活定价', subtitle: '从小团队到企业级，总有适合的方案', style: 'dark', items: [
      { name: 'Starter', price: '¥99', period: '/月', features: ['10GB存储', '100万API调用', '基础分析', '社区支持'], highlighted: false, cta: '免费试用' },
      { name: 'Business', price: '¥999', period: '/月', features: ['100GB存储', '1000万API调用', '高级分析', '专属支持', 'SLA保障'], highlighted: true, cta: '最受欢迎' },
      { name: 'Enterprise', price: '定制', period: '', features: ['无限存储', '无限调用', '定制方案', '客户经理', '私有部署', 'SLA 99.99%'], highlighted: false, cta: '联系销售' }
    ]},
    testimonials: { title: '客户案例', items: [
      { quote: '迁移到CloudX后，系统响应速度提升了60%，运维成本降低了40%。', author: '王先生', title: '某电商平台CTO' },
      { quote: 'CloudX的数据分析能力让我们对用户行为有了更深的理解。', author: '林女士', title: '某SaaS公司产品总监' }
    ]},
    contact: { title: '联系我们', address: '深圳市南山区科技园XX栋', phone: '0755-8888-8888', email: 'hello@cloudx.com' },
    footer: { copyright: '© 2026 CloudX Technology', style: 'modern', columns: [
      { title: '产品', items: ['云主机', '对象存储', 'CDN加速', '数据分析'] },
      { title: '公司', items: ['关于我们', '新闻动态', '加入我们', '联系销售'] }
    ]}
  },

  '房地产/房产站': {
    header: { siteName: 'XX置业', navItems: ['首页', '楼盘列表', '户型展示', '周边配套', '联系我们'] },
    hero: { title: '找到梦想中的家', subtitle: '城市核心地段 · 品质人居典范', ctaText: '预约看房', ctaLink: '#contact', bgType: 'gradient', height: 'large' },
    features: { title: '项目亮点', subtitle: '重新定义城市宜居生活', columns: 3, items: [
      { icon: '📍', title: '黄金地段', desc: '地铁站步行3分钟，紧邻商业中心' },
      { icon: '🌳', title: '园林社区', desc: '35%绿化率，打造公园式生活社区' },
      { icon: '🏊', title: '全龄配套', desc: '泳池、健身房、儿童乐园、老年活动中心' }
    ]},
    gallery: { title: '户型鉴赏', columns: 3, items: [
      { caption: '两室一厅 89㎡ | 精致小户' }, { caption: '三室两厅 120㎡ | 经典户型' },
      { caption: '四室两厅 150㎡ | 奢阔大宅' }, { caption: '顶层复式 200㎡ | 空中别墅' }
    ]},
    pricing: { title: '价格区间', subtitle: '多种付款方式灵活选择', items: [
      { name: '精致小户', price: '¥280万', period: '起', features: ['89㎡', '精装修', '低首付20%'], highlighted: false, cta: '咨询详情' },
      { name: '经典三房', price: '¥420万', period: '起', features: ['120㎡', '品牌装修', '送车位', '低物业费'], highlighted: true, cta: '热门推荐' },
      { name: '奢阔大宅', price: '¥680万', period: '起', features: ['150㎡+', '定制装修', '双车位', '私家庭院', '管家服务'], highlighted: false, cta: '预约品鉴' }
    ]},
    contact: { title: '售楼处', address: '北京市丰台区XX路XX号售楼中心', phone: '010-6666-6666', email: 'sales@xxrealty.com' },
    footer: { copyright: '© 2026 XX置业 版权所有', columns: [
      { title: '楼盘', items: ['在售楼盘', '户型图', '周边配套', '工程进度'] },
      { title: '服务', items: ['购房指南', '贷款计算', '预约看房', '客服中心'] }
    ]}
  },

  '医疗/健康站': {
    header: { siteName: '仁爱医疗', navItems: ['首页', '科室介绍', '专家团队', '预约挂号', '关于我们'] },
    hero: { title: '守护每一个生命', subtitle: '三甲标准 · 专家坐诊 · 温馨服务', ctaText: '预约挂号', ctaLink: '#contact', bgType: 'aurora', height: 'large' },
    features: { title: '重点科室', subtitle: '汇聚权威专家，引进国际先进设备', columns: 3, items: [
      { icon: '❤️', title: '心血管科', desc: '国家级重点专科，年手术量2000+' },
      { icon: '🩺', title: '内科', desc: '呼吸、消化、内分泌等综合诊疗' },
      { icon: '🦷', title: '口腔科', desc: '种植牙、正畸、美白等全方位口腔服务' }
    ]},
    team: { title: '专家团队', items: [
      { name: '刘建国', role: '心血管科 主任医师', desc: '享受国务院特殊津贴，40年临床经验' },
      { name: '陈美玲', role: '内科 主任医师', desc: '协和医学院博士，擅长疑难杂症' },
      { name: '王浩', role: '口腔科 副主任医师', desc: '北大口腔医学院硕士，种植牙专家' }
    ]},
    testimonials: { title: '患者心声', items: [
      { quote: '感谢刘主任的精心治疗，术后恢复得很好，真心推荐！', author: '赵先生', title: '心血管科患者' },
      { quote: '医院环境好，护士也很耐心，看病体验很好。', author: '孙女士', title: '内科患者' }
    ]},
    contact: { title: '联系我们', address: '上海市徐汇区XX路XX号', phone: '021-9999-9999', email: 'info@renai.com' },
    footer: { copyright: '© 2026 仁爱医疗 版权所有', columns: [
      { title: '就医指南', items: ['预约挂号', '科室导航', '住院流程', '医保政策'] },
      { title: '关于', items: ['医院简介', '专家团队', '先进设备', '联系方式'] }
    ]}
  },

  // ===== 生活消费 =====
  '摄影工作室': {
    header: { siteName: '光影叙事', navItems: ['首页', '作品集', '套餐', '关于我', '预约'], style: 'floating' },
    hero: { title: '用镜头讲述你的故事', subtitle: '人像摄影 · 婚纱旅拍 · 商业拍摄', ctaText: '预约拍摄', ctaLink: '#contact', bgType: 'glassy', bgColor: '#1a1a2e', height: 'large' },
    gallery: { title: '作品展示', columns: 3, items: [
      { caption: '城市旅拍系列' }, { caption: '森系婚纱' }, { caption: '肖像写真' },
      { caption: '商业产品' }, { caption: '婚礼纪实' }, { caption: '创意人像' }
    ]},
    pricing: { title: '拍摄套餐', subtitle: '高品质影像服务，定格美好瞬间', items: [
      { name: '个人写真', price: '¥999', period: '/套', features: ['1套服装', '精修20张', '1小时拍摄', '电子相册'], highlighted: false, cta: '预约' },
      { name: '婚纱摄影', price: '¥4,999', period: '/套', features: ['3套服装', '精修60张', '全天拍摄', '2个场景', '相册×1'], highlighted: true, cta: '热门推荐' },
      { name: '商业拍摄', price: '¥3,000', period: '/天', features: ['产品拍摄', '精修30张', '商业授权', '3天内交付'], highlighted: false, cta: '咨询报价' }
    ]},
    text: { title: '关于摄影师', content: '我是摄影师Alex，从事人像摄影8年。我相信每一张照片都应该有温度、有故事。无论是个人写真、婚纱旅拍还是商业拍摄，我都会用专业的角度和真诚的态度，为您捕捉最动人的瞬间。', align: 'center', maxWidth: '700px' },
    contact: { title: '预约拍摄', address: '北京市朝阳区798艺术区B座', phone: '139-8888-8888', email: 'alex@momentstudio.com' },
    footer: { copyright: '© 2026 光影叙事 · 摄影工作室', style: 'modern', columns: [
      { title: '服务', items: ['人像写真', '婚纱摄影', '商业拍摄', '活动跟拍'] },
      { title: '联系', items: ['微信: momentstudio', '微博: @光影叙事', '小红书: 光影叙事'] }
    ]}
  },

  '婚礼/活动策划': {
    header: { siteName: '梦婚礼策划', navItems: ['首页', '案例展示', '服务项目', '关于我们', '联系我们'] },
    hero: { title: '许你一场梦想中的婚礼', subtitle: '用心策划 · 用爱呈现 · 让每一刻都值得铭记', ctaText: '预约咨询', ctaLink: '#contact', bgType: 'glassy', height: 'large' },
    gallery: { title: '婚礼案例', columns: 3, items: [
      { caption: '星空主题婚礼' }, { caption: '森系户外婚礼' }, { caption: '中式古典婚礼' },
      { caption: '极简白婚礼' }, { caption: '城堡婚礼' }, { caption: '海滩婚礼' }
    ]},
    features: { title: '服务流程', subtitle: '专业团队全程陪伴', columns: 4, items: [
      { icon: '💍', title: '需求沟通', desc: '深入了解您的喜好和需求' },
      { icon: '📋', title: '方案定制', desc: '量身打造专属婚礼方案' },
      { icon: '🎯', title: '统筹执行', desc: '专业团队严格把控每个细节' },
      { icon: '🥂', title: '现场督导', desc: '婚礼当天全程协调保障' }
    ]},
    testimonials: { title: '新人心声', items: [
      { quote: '太感谢梦婚礼团队了！婚礼当天一切都那么完美，朋友们都夸赞不已！', author: '晓晓 & 阿杰', title: '2025年客户' },
      { quote: '策划师非常用心，每个细节都考虑到了，超出预期的完美。', author: '婷婷 & 小陈', title: '2025年客户' }
    ]},
    contact: { title: '预约咨询', address: '杭州市西湖区龙井路XX号', phone: '0571-8888-8888', email: 'hello@dreamwedding.com' },
    footer: { copyright: '© 2026 梦婚礼策划', columns: [
      { title: '服务', items: ['婚礼策划', '活动策划', '求婚策划', '生日派对'] },
      { title: '关于', items: ['品牌故事', '团队介绍', '客户评价', '合作联系'] }
    ]}
  },

  '健身/运动': {
    header: { siteName: 'FIRE 健身', navItems: ['首页', '课程', '会籍', '教练团队', '联系我们'] },
    hero: { title: '遇见更好的自己', subtitle: '专业指导 · 科学训练 · 蜕变从这里开始', ctaText: '免费体验', ctaLink: '#contact', bgType: 'waves', bgColor: '#171717', height: 'large' },
    features: { title: '课程体系', subtitle: '多样化训练方案，满足不同需求', columns: 3, items: [
      { icon: '🏋️', title: '力量训练', desc: '专业器械+科学计划，打造有型身材' },
      { icon: '🧘', title: '瑜伽普拉提', desc: '柔韧性与核心力量的双重提升' },
      { icon: '🥊', title: '搏击操', desc: '高燃脂有氧，释放压力' }
    ]},
    pricing: { title: '会籍方案', subtitle: '选择适合你的训练计划', style: 'dark', items: [
      { name: '月卡', price: '¥599', period: '/月', features: ['无限次使用器械', '团体课程', '更衣储物'], highlighted: false, cta: '立即办理' },
      { name: '年卡', price: '¥3,999', period: '/年', features: ['全部器械', '所有团课', '体测服务', '私教9折', '停卡权益'], highlighted: true, cta: '最受欢迎' },
      { name: '私教课', price: '¥300', period: '/节', features: ['1v1指导', '定制计划', '动作纠正', '营养建议', '定期评估'], highlighted: false, cta: '预约体验' }
    ]},
    team: { title: '教练团队', items: [
      { name: 'Alex', role: 'ACE认证教练', desc: '10年健身教学经验，擅长增肌减脂' },
      { name: 'Sophia', role: '瑜伽导师', desc: 'RYT500认证，8年瑜伽教学经验' },
      { name: 'Mike', role: '搏击教练', desc: '国家一级运动员，拳击专项' }
    ]},
    contact: { title: '联系我们', address: '成都市锦江区春熙路XX号', phone: '028-8888-8888', email: 'info@firegym.com' },
    footer: { copyright: '© 2026 FIRE 健身 版权所有', columns: [
      { title: '课程', items: ['力量训练', '瑜伽', '搏击', '团操课'] },
      { title: '门店', items: ['门店地址', '营业时间', '联系我们', '加入我们'] }
    ]}
  },

  '美业/美容': {
    header: { siteName: 'LUXE 美颜中心', navItems: ['首页', '项目介绍', '作品展示', '价格', '预约'] },
    hero: { title: '绽放你的独特之美', subtitle: '科技护肤 · 专业手法 · 品质服务', ctaText: '预约体验', ctaLink: '#contact', bgType: 'gradient', height: 'large' },
    features: { title: '核心项目', subtitle: '引进国际先进设备，汇聚资深美容师', columns: 3, items: [
      { icon: '✨', title: '科技护肤', desc: '光子嫩肤、水光针、热玛吉' },
      { icon: '💇', title: '发型设计', desc: '日韩造型、染烫护理、头皮护理' },
      { icon: '💅', title: '美甲美睫', desc: '日式美甲、浮雕美甲、自然款嫁接' }
    ]},
    gallery: { title: '作品展示', columns: 3, items: [
      { caption: '水光肌护理前后' }, { caption: '气质短发造型' }, { caption: '日式美甲作品' },
      { caption: '新娘妆面' }, { caption: '渐变染发' }, { caption: '睫毛嫁接' }
    ]},
    pricing: { title: '服务价格', subtitle: '明码标价，无隐形消费', items: [
      { name: '基础护肤', price: '¥298', period: '/次', features: ['深层清洁', '面部按摩', '补水面膜', '基础护理'], highlighted: false, cta: '预约' },
      { name: 'VIP年卡', price: '¥6,999', period: '/年', features: ['12次护理', '8折购产品', '生日礼遇', '优先预约', '免费咨询'], highlighted: true, cta: '立即办理' },
      { name: '新娘套餐', price: '¥3,888', period: '/套', features: ['婚前护肤', '婚礼妆面', '发型设计', '美甲美睫', '试妆服务'], highlighted: false, cta: '咨询详情' }
    ]},
    contact: { title: '预约电话', address: '广州市天河区天河路XX号', phone: '020-8888-8888', email: 'luxe@example.com' },
    footer: { copyright: '© 2026 LUXE 美颜中心', columns: [
      { title: '项目', items: ['科技护肤', '发型设计', '美甲美睫', '新娘造型'] },
      { title: '门店', items: ['门店地址', '营业时间', '在线预约', '联系我们'] }
    ]}
  },

  '时尚/服装': {
    header: { siteName: 'MODA', navItems: ['首页', '新品', '系列', '关于品牌', '联系'] },
    hero: { title: '定义你的风格', subtitle: '2026春夏系列 · 极简 · 优雅 · 不妥协', ctaText: '探索新品', ctaLink: '#products', bgType: 'glassy', bgColor: '#0f0f0f', textColor: '#ffffff', height: 'large' },
    gallery: { title: '2026 春夏系列', columns: 3, items: [
      { caption: '都市极简' }, { caption: '度假风情' }, { caption: '通勤优雅' },
      { caption: '周末休闲' }, { caption: '晚宴礼服' }, { caption: '配饰精选' }
    ]},
    features: { title: '品牌理念', subtitle: '每一件衣物都值得被珍视', columns: 3, items: [
      { icon: '🧵', title: '匠心工艺', desc: '意大利顶级面料，手工缝制细节' },
      { icon: '♻️', title: '可持续时尚', desc: '环保材料，绿色生产，减少碳足迹' },
      { icon: '🎯', title: '精准剪裁', desc: '3D量体裁衣，完美贴合身型' }
    ]},
    products: { title: '本季新品', items: [
      { name: '真丝衬衫', price: '¥1,299', desc: '100%桑蚕丝，轻盈透气', badge: '新品' },
      { name: '羊毛西装', price: '¥3,999', desc: '澳洲美利奴羊毛，立体剪裁', badge: '热卖' },
      { name: '手工皮鞋', price: '¥2,599', desc: '意大利头层牛皮，固特异工艺', badge: '' }
    ]},
    contact: { title: '联系我们', address: '上海市静安区南京西路XX号', phone: '021-6666-6666', email: 'hello@moda.com' },
    footer: { copyright: '© 2026 MODA 时尚品牌', columns: [
      { title: '系列', items: ['春夏系列', '秋冬系列', '配饰', '限量款'] },
      { title: '服务', items: ['门店查询', '在线客服', '退换政策', '尺码指南'] }
    ]}
  },

  '宠物/动物': {
    header: { siteName: '萌宠之家', navItems: ['首页', '服务项目', '商品', '寄养', '关于我们'] },
    hero: { title: '用心呵护每一个小生命', subtitle: '宠物美容 · 医疗 · 寄养 · 用品一站式服务', ctaText: '预约服务', ctaLink: '#contact', bgType: 'color', bgColor: '#78350f', height: 'large' },
    features: { title: '服务项目', subtitle: '专业的宠物护理服务', columns: 3, items: [
      { icon: '✂️', title: '宠物美容', desc: '洗澡、剪毛、造型、SPA护理' },
      { icon: '🏥', title: '医疗服务', desc: '疫苗接种、体检、内外科诊疗' },
      { icon: '🏠', title: '宠物寄养', desc: '独立空间、24小时监护、每日遛宠' }
    ]},
    gallery: { title: '萌宠日常', columns: 3, items: [
      { caption: '美容后的毛孩子' }, { caption: '寄养区的快乐时光' }, { caption: '新到的小可爱' },
      { caption: '宠物派对' }, { caption: '户外活动' }, { caption: '暖心瞬间' }
    ]},
    pricing: { title: '服务价格', subtitle: '实惠价格，优质服务', items: [
      { name: '基础美容', price: '¥99', period: '/次', features: ['洗澡', '吹干', '剪指甲', '耳道清理'], highlighted: false, cta: '预约' },
      { name: '寄养套餐', price: '¥68', period: '/天', features: ['独立笼位', '每日遛宠', '定时喂食', '健康监测', '视频反馈'], highlighted: true, cta: '预约寄养' },
      { name: '疫苗套餐', price: '¥399', period: '/套', features: ['三针疫苗', '狂犬疫苗', '体检', '驱虫'], highlighted: false, cta: '咨询' }
    ]},
    contact: { title: '联系我们', address: '深圳市福田区XX路XX号', phone: '0755-7777-7777', email: 'pet@example.com' },
    footer: { copyright: '© 2026 萌宠之家 保留所有权利', columns: [
      { title: '服务', items: ['宠物美容', '医疗服务', '宠物寄养', '宠物用品'] },
      { title: '关于', items: ['门店介绍', '团队风采', '联系我们', '加入我们'] }
    ]}
  },

  // ===== 专业服务 =====
  '法律/律师': {
    header: { siteName: 'XX律师事务所', navItems: ['首页', '业务领域', '律师团队', '经典案例', '联系我们'] },
    hero: { title: '捍卫您的合法权益', subtitle: '专业 · 诚信 · 高效 — 我们为正义发声', ctaText: '免费咨询', ctaLink: '#contact', bgType: 'color', bgColor: '#1e3a5f', height: 'large' },
    features: { title: '业务领域', subtitle: '全领域法律服务，一站式解决方案', columns: 3, items: [
      { icon: '⚖️', title: '民商事诉讼', desc: '合同纠纷、债权债务、侵权赔偿' },
      { icon: '🏢', title: '公司法律顾问', desc: '合同审核、合规管理、股权架构' },
      { icon: '📄', title: '知识产权', desc: '商标注册、专利申请、侵权维权' }
    ]},
    team: { title: '律师团队', items: [
      { name: '马建国', role: '创始合伙人', desc: '北京大学法学博士，执业25年' },
      { name: '李雪琴', role: '高级合伙人', desc: '中国政法大学硕士，专攻商事诉讼' },
      { name: '张睿', role: '知识产权律师', desc: '专利代理人资格，技术+法律复合背景' }
    ]},
    testimonials: { title: '客户评价', items: [
      { quote: '马律师团队帮我争取到了应得的赔偿，非常专业负责。', author: '周先生', title: '合同纠纷案当事人' },
      { quote: '多亏了李律师的专业意见，帮公司避免了重大损失。', author: '某科技公司', title: '常年法律顾问客户' }
    ]},
    contact: { title: '免费咨询', address: '北京市朝阳区建国路XX号XX大厦', phone: '010-5678-5678', email: 'contact@xxlawfirm.com' },
    footer: { copyright: '© 2026 XX律师事务所 版权所有', columns: [
      { title: '业务领域', items: ['民商事诉讼', '刑事辩护', '知识产权', '公司法务'] },
      { title: '关于律所', items: ['律所简介', '律师团队', '经典案例', '在线咨询'] }
    ]}
  },

  '咨询/顾问': {
    header: { siteName: '明道咨询', navItems: ['首页', '服务', '案例', '团队', '联系'] },
    hero: { title: '洞见未来 · 智赢天下', subtitle: '战略规划 · 管理咨询 · 数字化转型', ctaText: '预约咨询', ctaLink: '#contact', bgType: 'gradient', height: 'large' },
    features: { title: '核心服务', subtitle: '深度洞察 + 实战经验 = 可落地的解决方案', columns: 3, items: [
      { icon: '🎯', title: '战略规划', desc: '企业战略梳理、商业模式创新、增长策略' },
      { icon: '📈', title: '数字化转型', desc: '数字化战略、流程再造、技术选型' },
      { icon: '👥', title: '组织管理', desc: '组织架构设计、人才发展、绩效体系' }
    ]},
    team: { title: '核心顾问', items: [
      { name: '吴明哲', role: '高级合伙人', desc: '前麦肯锡顾问，20年咨询经验' },
      { name: '林晓', role: '数字化转型总监', desc: '前IBM咨询顾问，数字化专家' },
      { name: '郑敏', role: '组织发展顾问', desc: '心理学博士，OD领域权威' }
    ]},
    testimonials: { title: '客户案例', items: [
      { quote: '明道咨询帮助我们重新梳理了战略方向，业绩增长超过30%。', author: '某制造业企业CEO', title: '' },
      { quote: '数字化转型方案非常务实，实施效果超出预期。', author: '某零售集团CIO', title: '' }
    ]},
    contact: { title: '预约咨询', address: '上海市黄浦区淮海中路XX号', phone: '021-8888-0000', email: 'hello@mingdao.com' },
    footer: { copyright: '© 2026 明道咨询 版权所有', columns: [
      { title: '服务', items: ['战略规划', '数字化转型', '组织管理', '品牌营销'] },
      { title: '关于', items: ['公司介绍', '顾问团队', '客户案例', '联系我们'] }
    ]}
  },

  '建筑/室内设计': {
    header: { siteName: '構·设计事务所', navItems: ['首页', '作品', '服务', '团队', '联系'] },
    hero: { title: '用空间讲述故事', subtitle: '建筑设计 · 室内设计 · 景观设计', ctaText: '查看作品', ctaLink: '#gallery', bgType: 'grid', bgColor: '#27272a', height: 'large' },
    gallery: { title: '精选项目', columns: 3, items: [
      { caption: '云栖别墅 — 现代极简' }, { caption: '城市办公空间' }, { caption: '日式民宿改造' },
      { caption: '商业综合体' }, { caption: '湖畔餐厅' }, { caption: '艺术展厅' }
    ]},
    features: { title: '服务范围', subtitle: '从概念到落地，全程设计服务', layout: 'bento', columns: 3, items: [
      { icon: '🏛', title: '建筑设计', desc: '住宅、商业、文化建筑方案设计' },
      { icon: '🛋', title: '室内设计', desc: '私宅、办公、商业空间整体设计' },
      { icon: '🌿', title: '景观设计', desc: '庭院、公共空间、屋顶花园' }
    ]},
    team: { title: '设计团队', items: [
      { name: '方明', role: '主持建筑师', desc: '哈佛GSD硕士，注册建筑师' },
      { name: '杨静', role: '室内设计总监', desc: '米兰理工硕士，10年高端私宅经验' },
      { name: '何川', role: '景观设计师', desc: 'ASLA会员，擅长东方园林' }
    ]},
    contact: { title: '设计咨询', address: '杭州市上城区南宋御街XX号', phone: '0571-7777-7777', email: 'studio@arc-studio.com' },
    footer: { copyright: '© 2026 構·设计事务所', columns: [
      { title: '服务', items: ['建筑设计', '室内设计', '景观设计', '顾问服务'] },
      { title: '关于', items: ['设计理念', '团队介绍', '作品案例', '联系方式'] }
    ]}
  },

  '培训/个人教练': {
    header: { siteName: '成长学院', navItems: ['首页', '课程', '教练介绍', '学员评价', '预约'] },
    hero: { title: '激发你的无限潜能', subtitle: '个人成长 · 技能提升 · 职业突破', ctaText: '预约免费咨询', ctaLink: '#contact', bgType: 'gradient', height: 'large' },
    features: { title: '课程体系', subtitle: '系统化训练，看到真正的改变', columns: 3, items: [
      { icon: '🎯', title: '目标设定', desc: '帮你找到真正重要的目标并制定路径' },
      { icon: '🧠', title: '思维升级', desc: '突破思维局限，建立成长型思维' },
      { icon: '📊', title: '效能提升', desc: '时间管理、习惯养成、高效方法论' }
    ]},
    pricing: { title: '服务方案', subtitle: '投资自己的成长', items: [
      { name: '单次咨询', price: '¥499', period: '/次', features: ['1v1深度对话', '问题诊断', '行动计划'], highlighted: false, cta: '预约' },
      { name: '月度陪伴', price: '¥1,999', period: '/月', features: ['每周1次深度辅导', '日常答疑', '作业跟进', '专属计划'], highlighted: true, cta: '立即加入' },
      { name: '年度成长', price: '¥15,000', period: '/年', features: ['50次辅导', '24h响应', '线下工作坊', '社群权益', '资源对接'], highlighted: false, cta: '咨询详情' }
    ]},
    testimonials: { title: '学员反馈', items: [
      { quote: '在老师的帮助下，我找到了职业方向，成功转行到了理想行业。', author: '小雅', title: '职业转型学员' },
      { quote: '效率提升很明显，半年内完成了三个重要项目。', author: 'James', title: '管理者效能学员' }
    ]},
    contact: { title: '预约咨询', address: '线上服务（全球）', phone: '', email: 'coach@growthacademy.com' },
    footer: { copyright: '© 2026 成长学院', columns: [
      { title: '课程', items: ['职业规划', '效能提升', '思维成长', '领导力'] },
      { title: '关于', items: ['教练介绍', '学员故事', '预约咨询', '常见问题'] }
    ]}
  },

  '汽车/交通': {
    header: { siteName: 'XX汽车', navItems: ['首页', '车型展示', '优惠活动', '售后服务', '联系我们'] },
    hero: { title: '驾驭未来，驰骋人生', subtitle: '品质好车 · 金融方案 · 终身服务', ctaText: '预约试驾', ctaLink: '#contact', bgType: 'gradient', height: 'large' },
    features: { title: '为什么选择我们', subtitle: '买车只是开始，服务永不止步', columns: 3, items: [
      { icon: '🚗', title: '品质保障', desc: '原厂授权，每一台车都经过严格检测' },
      { icon: '💰', title: '金融方案', desc: '低首付、低利率、灵活分期' },
      { icon: '🔧', title: '终身服务', desc: '免费保养、道路救援、原厂配件' }
    ]},
    gallery: { title: '热销车型', columns: 3, items: [
      { caption: '2026款 豪华轿车' }, { caption: '2026款 智能SUV' }, { caption: '2026款 纯电跑车' },
      { caption: '2026款 家用MPV' }, { caption: '2026款 硬派越野' }, { caption: '2026款 城市代步' }
    ]},
    pricing: { title: '热门车型价格', subtitle: '多种金融方案可选', items: [
      { name: '城市代步款', price: '¥9.98万', period: '起', features: ['300km续航', '智能互联', '安全气囊', '倒车影像'], highlighted: false, cta: '了解详情' },
      { name: '家庭SUV', price: '¥18.98万', period: '起', features: ['7座布局', 'L2自动驾驶', '全景天窗', '电动尾门', '360影像'], highlighted: true, cta: '预约试驾' },
      { name: '纯电旗舰', price: '¥29.98万', period: '起', features: ['600km续航', '3.8s加速', '智能座舱', '自动泊车', 'OTA升级'], highlighted: false, cta: '立即咨询' }
    ]},
    contact: { title: '联系我们', address: '成都市武侯区机场路XX号', phone: '400-999-9999', email: 'sales@xxauto.com' },
    footer: { copyright: '© 2026 XX汽车 版权所有', columns: [
      { title: '车型', items: ['轿车', 'SUV', '新能源', 'MPV'] },
      { title: '服务', items: ['预约试驾', '金融方案', '售后服务', '门店查询'] }
    ]}
  },

  // ===== 文化/娱乐 =====
  '音乐人/乐队': {
    header: { siteName: '极光乐队', navItems: ['首页', '音乐作品', '演出信息', '关于乐队', '联系'] },
    hero: { title: '极光乐队 Aurora', subtitle: '独立摇滚 · 用音乐照亮每一个夜晚', ctaText: '收听最新单曲', ctaLink: '#music', bgType: 'waves', bgColor: '#0c0c0c', textColor: '#ffffff', height: 'large' },
    gallery: { title: '演出瞬间', columns: 3, items: [
      { caption: '2025 全国巡演·北京站' }, { caption: '音乐节现场' }, { caption: '新专辑发布会' },
      { caption: '排练日常' }, { caption: '粉丝见面会' }, { caption: '录音棚花絮' }
    ]},
    text: { title: '关于极光乐队', content: '极光乐队成立于2020年，由四位热爱音乐的年轻人组成。我们的音乐融合了独立摇滚、电子和后摇元素，用旋律和歌词讲述都市年轻人的故事。首张专辑《夜行列车》获得了独立音乐大奖提名，2026年正在筹备第二张专辑。', align: 'center', maxWidth: '700px' },
    pricing: { title: '巡演门票', subtitle: '2026 全国巡演·预售已开启', style: 'dark', items: [
      { name: '早鸟票', price: '¥168', period: '/张', features: ['提前入场', '电子纪念票'], highlighted: false, cta: '抢购' },
      { name: '普通票', price: '¥268', period: '/张', features: ['现场入场', '纪念手环'], highlighted: true, cta: '立即购买' },
      { name: 'VIP票', price: '¥468', period: '/张', features: ['前排位置', '签名海报', '合影机会', '限定周边'], highlighted: false, cta: '限量发售' }
    ]},
    contact: { title: '合作联系', address: '北京东城区鼓楼东大街XX号', phone: '186-0000-0000', email: 'aurora@example.com' },
    footer: { copyright: '© 2026 极光乐队 Aurora Band', columns: [
      { title: '音乐', items: ['最新单曲', '专辑', 'MV', '歌词'] },
      { title: '演出', items: ['巡演日程', '过往演出', '粉丝俱乐部', '周边商城'] }
    ]}
  },

  '旅游/酒店': {
    header: { siteName: '山海度假酒店', navItems: ['首页', '客房', '餐饮', '体验', '预订'] },
    hero: { title: '逃离城市，遇见山海', subtitle: '面朝大海 · 背靠青山 · 心灵的栖息地', ctaText: '立即预订', ctaLink: '#pricing', bgType: 'waves', height: 'large' },
    gallery: { title: '客房展示', columns: 3, items: [
      { caption: '海景大床房' }, { caption: '山景庭院房' }, { caption: '复式家庭套房' },
      { caption: '无边泳池' }, { caption: '海景餐厅' }, { caption: '日落露台' }
    ]},
    features: { title: '独特体验', subtitle: '不止是住宿，更是一场旅行', columns: 3, items: [
      { icon: '🌅', title: '绝美日落', desc: '每天傍晚在露台欣赏最美日落' },
      { icon: '🧘', title: '日出瑜伽', desc: '专业瑜伽导师带领晨间冥想' },
      { icon: '🍽', title: '海鲜盛宴', desc: '本地渔港直供，米其林主厨料理' }
    ]},
    pricing: { title: '住宿方案', subtitle: '淡季优惠进行中', style: 'glass', items: [
      { name: '平日特惠', price: '¥688', period: '/晚', features: ['山景房', '双人早餐', '迷你吧', '延迟退房'], highlighted: false, cta: '预订' },
      { name: '周末度假', price: '¥1,288', period: '/晚', features: ['海景房', '自助晚餐', '下午茶', '瑜伽体验', '接送服务'], highlighted: true, cta: '限时优惠' },
      { name: '蜜月套餐', price: '¥3,888', period: '/2晚', features: ['蜜月套房', '烛光晚餐', 'SPA体验', '浪漫布置', '旅拍服务'], highlighted: false, cta: '咨询详情' }
    ]},
    contact: { title: '酒店预订', address: '三亚市海棠湾XX路XX号', phone: '0898-8888-8888', email: 'resort@shanhai.com' },
    footer: { copyright: '© 2026 山海度假酒店', columns: [
      { title: '住宿', items: ['客房介绍', '套房', '别墅', '长住优惠'] },
      { title: '体验', items: ['餐饮', 'SPA', '活动', '当地旅游'] }
    ]}
  },

  '非营利/公益': {
    header: { siteName: '阳光公益基金会', navItems: ['首页', '公益项目', '透明财务', '志愿者', '联系我们'] },
    hero: { title: '让爱传递，让希望发芽', subtitle: '教育助学 · 环境保护 · 灾害救助', ctaText: '加入我们', ctaLink: '#contact', bgType: 'gradient', height: 'large' },
    features: { title: '公益项目', subtitle: '聚焦三大领域，创造可持续的社会影响', columns: 3, items: [
      { icon: '📚', title: '乡村教育', desc: '已援建50所希望小学，资助10万+学生' },
      { icon: '🌏', title: '环境保护', desc: '植树造林100万棵，守护生态家园' },
      { icon: '🤝', title: '灾害救助', desc: '第一时间响应，已救助20万+受灾群众' }
    ]},
    text: { title: '我们的使命', content: '阳光公益基金会成立于2010年，是一家专注于教育、环保和灾害救助的公益组织。我们相信，每一份善意都能改变世界。过去15年，我们累计投入公益资金超过5亿元，惠及100万人次。透明、高效、可持续——这是我们对每一位捐助者的承诺。', align: 'center', maxWidth: '800px' },
    gallery: { title: '公益足迹', columns: 3, items: [
      { caption: '山区学校探访' }, { caption: '植树活动现场' }, { caption: '救灾物资发放' },
      { caption: '志愿者培训' }, { caption: '学生回访' }, { caption: '公益晚会' }
    ]},
    contact: { title: '联系我们', address: '北京市海淀区中关村XX号', phone: '010-1234-5678', email: 'hello@sunshine.org' },
    footer: { copyright: '© 2026 阳光公益基金会 京ICP备XXXX号', columns: [
      { title: '项目', items: ['乡村教育', '环境保护', '灾害救助', '志愿者'] },
      { title: '透明', items: ['财务公开', '项目报告', '审计报告', '年度报告'] }
    ]}
  }
};
const MUSIC_LIBRARY = [
  // 欢快 (high valence, high arousal)
  { id: 'lib001', title: '阳光步道',   mood: 'happy',      valence: 0.75, arousal: 0.65, bpm: 128, energy: 0.8,  mode: 'major', duration: 180, genre: 'pop', license: '授权可商用' },
  { id: 'lib002', title: '跃动节拍',   mood: 'happy',      valence: 0.80, arousal: 0.70, bpm: 140, energy: 0.85, mode: 'major', duration: 165, genre: 'electronic', license: '授权可商用' },
  { id: 'lib003', title: '微风晨光',   mood: 'happy',      valence: 0.70, arousal: 0.50, bpm: 110, energy: 0.6,  mode: 'major', duration: 200, genre: 'acoustic', license: '授权可商用' },

  // 平静 (high valence, low arousal)
  { id: 'lib004', title: '湖面如镜',   mood: 'calm',       valence: 0.75, arousal: 0.15, bpm: 65,  energy: 0.15, mode: 'major', duration: 240, genre: 'ambient', license: '授权可商用' },
  { id: 'lib005', title: '星河低语',   mood: 'calm',       valence: 0.70, arousal: 0.10, bpm: 60,  energy: 0.1,  mode: 'major', duration: 300, genre: 'ambient', license: '授权可商用' },
  { id: 'lib006', title: '午后阳光',   mood: 'warm',       valence: 0.65, arousal: 0.25, bpm: 78,  energy: 0.25, mode: 'major', duration: 195, genre: 'jazz', license: '授权可商用' },

  // 忧郁 (low valence, low arousal)
  { id: 'lib007', title: '秋叶飘零',   mood: 'sad',        valence: 0.20, arousal: 0.20, bpm: 55,  energy: 0.15, mode: 'minor', duration: 220, genre: 'classical', license: '授权可商用' },
  { id: 'lib008', title: '雨夜沉思',   mood: 'sad',        valence: 0.15, arousal: 0.25, bpm: 60,  energy: 0.2,  mode: 'minor', duration: 260, genre: 'piano', license: '授权可商用' },
  { id: 'lib009', title: '深海幽蓝',   mood: 'somber',     valence: 0.30, arousal: 0.35, bpm: 70,  energy: 0.35, mode: 'minor', duration: 210, genre: 'ambient', license: '授权可商用' },

  // 激昂 (medium-high valence, high arousal)
  { id: 'lib010', title: '冲锋号角',   mood: 'triumphant', valence: 0.55, arousal: 0.80, bpm: 135, energy: 0.9,  mode: 'major', duration: 150, genre: 'orchestral', license: '授权可商用' },
  { id: 'lib011', title: '日出东方',   mood: 'triumphant', valence: 0.60, arousal: 0.75, bpm: 120, energy: 0.8,  mode: 'major', duration: 175, genre: 'cinematic', license: '授权可商用' },
  { id: 'lib012', title: '逐梦飞翔',   mood: 'triumphant', valence: 0.50, arousal: 0.70, bpm: 125, energy: 0.75, mode: 'major', duration: 190, genre: 'pop', license: '授权可商用' },

  // 紧张 (low valence, high arousal)
  { id: 'lib013', title: '暗流涌动',   mood: 'tense',      valence: 0.25, arousal: 0.75, bpm: 115, energy: 0.85, mode: 'minor', duration: 140, genre: 'electronic', license: '授权可商用' },
  { id: 'lib014', title: '风暴前夕',   mood: 'tense',      valence: 0.20, arousal: 0.80, bpm: 130, energy: 0.9,  mode: 'minor', duration: 155, genre: 'orchestral', license: '授权可商用' },

  // 淡雅 (medium valence, low arousal)
  { id: 'lib015', title: '竹林听雨',   mood: 'gentle',     valence: 0.50, arousal: 0.10, bpm: 50,  energy: 0.1,  mode: 'major', duration: 280, genre: 'traditional', license: '授权可商用' },
  { id: 'lib016', title: '茶香袅袅',   mood: 'gentle',     valence: 0.45, arousal: 0.15, bpm: 55,  energy: 0.12, mode: 'major', duration: 260, genre: 'acoustic', license: '授权可商用' },

  // 温馨 (medium-high valence, low-medium arousal)
  { id: 'lib017', title: '家的味道',   mood: 'warm',       valence: 0.70, arousal: 0.30, bpm: 82,  energy: 0.3,  mode: 'major', duration: 200, genre: 'acoustic', license: '授权可商用' },
  { id: 'lib018', title: '旧时光',     mood: 'warm',       valence: 0.60, arousal: 0.25, bpm: 75,  energy: 0.25, mode: 'major', duration: 220, genre: 'folk', license: '授权可商用' },

  // 深沉 (low-medium valence, medium arousal)
  { id: 'lib019', title: '千年回响',   mood: 'somber',     valence: 0.30, arousal: 0.45, bpm: 80,  energy: 0.45, mode: 'minor', duration: 230, genre: 'world', license: '授权可商用' },
  { id: 'lib020', title: '时光隧道',   mood: 'somber',     valence: 0.25, arousal: 0.40, bpm: 75,  energy: 0.4,  mode: 'minor', duration: 240, genre: 'ambient', license: '授权可商用' }
];
