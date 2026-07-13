import { createContext, useContext, useState, useCallback } from 'react';
import type { ReactNode } from 'react';
import type { Language, I18nContextValue } from '@/types';

const TRANSLATIONS: Record<string, Record<string, string>> = {
  // Hero
  'hero.badge': { en: 'AI Website Builder + Smart Music Matching', zh: 'AI 建站 + 智能音乐匹配' },
  'hero.headline': { en: 'Describe your business. We\'ll build the site — and find the perfect soundtrack.', zh: '描述您的业务。我们将构建网站 — 并找到完美配乐。' },
  'hero.subtitle': { en: 'AutoMatch uses AI to generate complete websites from your description, then matches background music to your brand\'s mood and industry.', zh: 'AutoMatch 使用 AI 根据您的描述生成完整网站，然后匹配符合品牌氛围和行业的背景音乐。' },
  'hero.placeholder': { en: 'A cozy coffee shop website with warm tones...', zh: '一个温馨咖啡店网站，暖色调...' },
  'hero.generate': { en: 'Generate', zh: '生成' },
  'hero.noCard': { en: 'No credit card required', zh: '无需信用卡' },
  'hero.freeStart': { en: 'Free to start', zh: '免费开始' },

  // Nav
  'nav.templates': { en: 'Templates', zh: '模板' },
  'nav.howItWorks': { en: 'How it Works', zh: '工作原理' },
  'nav.musicMatching': { en: 'Music Matching', zh: '音乐匹配' },
  'nav.pricing': { en: 'Pricing', zh: '价格' },
  'nav.signIn': { en: 'Sign In', zh: '登录' },
  'nav.getStarted': { en: 'Get Started', zh: '开始使用' },
  'nav.language': { en: '中文', zh: 'English' },

  // Features
  'features.eyebrow': { en: 'WHY AUTOMATCH', zh: '为什么选择 AUTOMATCH' },
  'features.title': { en: 'Everything you need to launch', zh: '启动所需的一切' },
  'features.subtitle': { en: 'From idea to live website — with music that fits your brand.', zh: '从想法到上线网站 — 搭配符合品牌的音乐。' },
  'features.aiDesign.title': { en: 'AI-Powered Design', zh: 'AI 驱动设计' },
  'features.aiDesign.desc': { en: 'Describe your business and watch as AI generates a complete, custom website in seconds.', zh: '描述您的业务，观看 AI 在几秒钟内生成完整的定制网站。' },
  'features.musicMatch.title': { en: 'Smart Music Matching', zh: '智能音乐匹配' },
  'features.musicMatch.desc': { en: 'AI analyzes your brand and recommends the perfect soundtrack from our curated library.', zh: 'AI 分析您的品牌，从我们精选的库中推荐完美配乐。' },
  'features.visualEdit.title': { en: 'Visual Editor', zh: '可视化编辑器' },
  'features.visualEdit.desc': { en: 'Fine-tune every detail with our intuitive, Framer-like visual editor. No coding required.', zh: '使用我们直观的类 Framer 可视化编辑器微调每个细节。无需编码。' },
  'features.export.title': { en: 'One-Click Export', zh: '一键导出' },
  'features.export.desc': { en: 'Export clean HTML/CSS/JS or deploy directly. Your code, your control.', zh: '导出干净的 HTML/CSS/JS 或直接部署。您的代码，您的控制。' },

  // How It Works
  'hiw.eyebrow': { en: 'HOW IT WORKS', zh: '工作流程' },
  'hiw.title': { en: 'Four steps to your perfect site', zh: '四步打造完美网站' },
  'hiw.step1.title': { en: 'Describe', zh: '描述' },
  'hiw.step1.desc': { en: 'Tell us about your business, audience, and style preferences in plain language.', zh: '用简单语言告诉我们您的业务、受众和风格偏好。' },
  'hiw.step2.title': { en: 'AI Analyzes', zh: 'AI 分析' },
  'hiw.step2.desc': { en: 'Our AI identifies your industry, brand tone, color palette, and optimal website structure.', zh: '我们的 AI 识别您的行业、品牌调性、配色方案和最佳网站结构。' },
  'hiw.step3.title': { en: 'AI Matches Music', zh: 'AI 匹配音乐' },
  'hiw.step3.desc': { en: 'Based on your brand profile, AI recommends the perfect soundtrack with detailed reasoning.', zh: '基于您的品牌画像，AI 推荐完美配乐并附详细解释。' },
  'hiw.step4.title': { en: 'Launch', zh: '上线' },
  'hiw.step4.desc': { en: 'Preview the complete experience, then publish or export your website code.', zh: '预览完整体验，然后发布或导出网站代码。' },

  // Music Showcase
  'music.eyebrow': { en: 'MUSIC MATCHING', zh: '音乐匹配' },
  'music.title': { en: 'Sound that fits your brand', zh: '契合品牌的声音' },
  'music.subtitle': { en: 'Our AI doesn\'t just build your site — it listens to your brand. By analyzing your industry, mood, and audience, AutoMatch recommends background music that strengthens your message.', zh: '我们的 AI 不只是建站 — 它倾听您的品牌。通过分析您的行业、情绪和受众，AutoMatch 推荐强化您信息的背景音乐。' },
  'music.feature1': { en: 'Mood-based track recommendations', zh: '基于情绪的曲目推荐' },
  'music.feature2': { en: 'Industry-curated playlists', zh: '行业精选播放列表' },
  'music.feature3': { en: 'Real-time preview with your website', zh: '与网站实时预览' },
  'music.feature4': { en: 'Licensed, royalty-free tracks', zh: '授权免版税曲目' },

  // Why Music
  'whyMusic.eyebrow': { en: 'THE SCIENCE OF SOUND', zh: '声音的科学' },
  'whyMusic.title': { en: 'Why your website needs AI music matching', zh: '为什么您的网站需要 AI 音乐匹配' },
  'whyMusic.subtitle': { en: 'Music isn\'t background noise — it\'s a strategic brand tool. Research shows that the right soundtrack transforms how visitors perceive and remember your brand.', zh: '音乐不是背景噪音 — 它是战略性品牌工具。研究表明，正确的配乐会改变访问者感知和记忆您品牌的方式。' },
  'whyMusic.stat1.num': { en: '40%', zh: '40%' },
  'whyMusic.stat1.label': { en: 'Longer site visits', zh: '更长的访问时间' },
  'whyMusic.stat1.desc': { en: 'Sites with matched background music keep visitors engaged significantly longer than silent sites.', zh: '有匹配背景音乐的网站让访问者停留时间明显更长。' },
  'whyMusic.stat2.num': { en: '3x', zh: '3倍' },
  'whyMusic.stat2.label': { en: 'Brand recall', zh: '品牌记忆' },
  'whyMusic.stat2.desc': { en: 'Audio-visual pairing creates stronger memory associations. Visitors remember brands with soundscapes 3x better.', zh: '视听配对创造更强的记忆关联。访问者对有声景品牌的记忆效果好 3 倍。' },
  'whyMusic.stat3.num': { en: 'Complete', zh: '完整' },
  'whyMusic.stat3.label': { en: 'Brand expression', zh: '品牌表达' },
  'whyMusic.stat3.desc': { en: 'Sound completes your visual identity. A luxury brand without audio is like a film without a score.', zh: '声音完善您的视觉识别。没有音频的奢侈品牌就像没有配乐的电影。' },
  'whyMusic.stat4.num': { en: 'Unique', zh: '独特' },
  'whyMusic.stat4.label': { en: 'Differentiation', zh: '差异化' },
  'whyMusic.stat4.desc': { en: 'Stand out from the thousands of generic AI-built sites. Music makes your brand instantly memorable.', zh: '从数千个通用 AI 网站中脱颖而出。音乐让您的品牌即刻令人难忘。' },
  'whyMusic.flow.title': { en: 'How AutoMatch pairs sound with design', zh: 'AutoMatch 如何将声音与设计配对' },
  'whyMusic.flow.step1': { en: 'AI Analyzes Your Brand', zh: 'AI 分析您的品牌' },
  'whyMusic.flow.step1.desc': { en: 'Our AI reads your industry, colors, typography, and content tone to understand your brand\'s emotional profile.', zh: '我们的 AI 读取您的行业、颜色、排版和内容调性，以理解品牌的情感画像。' },
  'whyMusic.flow.step2': { en: 'Matches the Soundscape', zh: '匹配音景' },
  'whyMusic.flow.step2.desc': { en: 'Based on the analysis, AI recommends music genres and specific tracks that amplify your brand message.', zh: '基于分析，AI 推荐放大品牌信息的音乐风格和具体曲目。' },
  'whyMusic.flow.step3': { en: 'Integrated Experience', zh: '整合体验' },
  'whyMusic.flow.step3.desc': { en: 'The music becomes part of your brand guide. Preview, adjust, and export the complete sensory experience.', zh: '音乐成为品牌指南的一部分。预览、调整并导出完整的感官体验。' },

  // Templates
  'templates.eyebrow': { en: 'TEMPLATES', zh: '模板' },
  'templates.title': { en: 'Start with a foundation', zh: '从基础开始' },
  'templates.subtitle': { en: 'Browse industry-specific templates, or let AI generate something unique.', zh: '浏览行业特定模板，或让 AI 生成独特的内容。' },
  'templates.search': { en: 'Search templates...', zh: '搜索模板...' },
  'templates.all': { en: 'All', zh: '全部' },

  // Pricing
  'pricing.eyebrow': { en: 'PRICING', zh: '价格' },
  'pricing.title': { en: 'Simple, transparent pricing', zh: '简单透明的定价' },
  'pricing.subtitle': { en: 'Start free. Upgrade when you\'re ready to launch.', zh: '免费开始。准备好上线时升级。' },
  'pricing.monthly': { en: 'Monthly', zh: '月付' },
  'pricing.yearly': { en: 'Yearly', zh: '年付' },
  'pricing.starter': { en: 'Starter', zh: '入门版' },
  'pricing.starter.desc': { en: 'For experimenting and learning', zh: '用于实验和学习' },
  'pricing.starter.feature1': { en: 'AI generation (3/mo)', zh: 'AI 生成（3次/月）' },
  'pricing.starter.feature2': { en: '10 templates', zh: '10 个模板' },
  'pricing.starter.feature3': { en: 'Basic editor', zh: '基础编辑器' },
  'pricing.starter.feature4': { en: 'Watermarked preview', zh: '带水印预览' },
  'pricing.pro': { en: 'Pro', zh: '专业版' },
  'pricing.pro.desc': { en: 'For creators ready to launch', zh: '为准备上线的创作者' },
  'pricing.pro.feature1': { en: 'Unlimited AI generation', zh: '无限 AI 生成' },
  'pricing.pro.feature2': { en: 'All templates', zh: '所有模板' },
  'pricing.pro.feature3': { en: 'Full editor', zh: '完整编辑器' },
  'pricing.pro.feature4': { en: 'Music matching', zh: '音乐匹配' },
  'pricing.pro.feature5': { en: 'Custom domain', zh: '自定义域名' },
  'pricing.pro.feature6': { en: 'No watermark', zh: '无水印' },
  'pricing.enterprise': { en: 'Enterprise', zh: '企业版' },
  'pricing.enterprise.desc': { en: 'For teams and agencies', zh: '为团队和代理商' },
  'pricing.enterprise.feature1': { en: 'Everything in Pro', zh: '专业版全部功能' },
  'pricing.enterprise.feature2': { en: 'Team collaboration', zh: '团队协作' },
  'pricing.enterprise.feature3': { en: 'Priority support', zh: '优先支持' },
  'pricing.enterprise.feature4': { en: 'API access', zh: 'API 访问' },
  'pricing.enterprise.feature5': { en: 'White-label export', zh: '白标导出' },
  'pricing.popular': { en: 'Most Popular', zh: '最受欢迎' },
  'pricing.startFree': { en: 'Start Free', zh: '免费开始' },
  'pricing.startPro': { en: 'Start Pro Trial', zh: '开始专业版试用' },
  'pricing.contactSales': { en: 'Contact Sales', zh: '联系销售' },

  // CTA
  'cta.title': { en: 'Ready to build something amazing?', zh: '准备好打造令人惊叹的东西了吗？' },
  'cta.subtitle': { en: 'Describe your business and let AutoMatch handle the rest.', zh: '描述您的业务，让 AutoMatch 处理其余部分。' },
  'cta.button': { en: 'Get Started Free', zh: '免费开始' },
  'cta.noCard': { en: 'No credit card required', zh: '无需信用卡' },

  // Footer
  'footer.product': { en: 'Product', zh: '产品' },
  'footer.resources': { en: 'Resources', zh: '资源' },
  'footer.company': { en: 'Company', zh: '公司' },
  'footer.copyright': { en: 'AutoMatch. All rights reserved.', zh: 'AutoMatch。保留所有权利。' },

  // Analysis Modal
  'analysis.title': { en: 'Analyzing your brand experience...', zh: '正在分析您的品牌体验...' },
  'analysis.subtitle': { en: 'Our AI is studying both visual and audio dimensions of your brand', zh: '我们的 AI 正在研究您品牌的视觉和音频维度' },
  'analysis.resultTitle': { en: 'Your brand experience is ready', zh: '您的品牌体验已就绪' },
  'analysis.resultSubtitle': { en: 'AI analyzed your description and designed a complete visual + audio identity.', zh: 'AI 分析了您的描述并设计了完整的视觉 + 音频识别。' },
  'analysis.moodProfile': { en: 'Brand Mood Profile', zh: '品牌情绪画像' },
  'analysis.musicRec': { en: 'AI Music Recommendation', zh: 'AI 音乐推荐' },
  'analysis.whyRecommend': { en: 'Why AI recommends this:', zh: 'AI 推荐原因：' },
  'analysis.alternatives': { en: 'Alternative options', zh: '备选方案' },
  'analysis.industry': { en: 'Industry', zh: '行业' },
  'analysis.soundscape': { en: 'Soundscape', zh: '音景' },
  'analysis.continue': { en: 'Continue to Editor', zh: '继续到编辑器' },
  'analysis.tryAgain': { en: 'Try Different Input', zh: '尝试不同输入' },

  // Music-specific
  'music.player.nowPlaying': { en: 'Now Playing', zh: '正在播放' },
  'music.player.recommended': { en: 'Recommended Tracks', zh: '推荐曲目' },
  'music.player.playback': { en: 'Playback', zh: '播放设置' },
  'music.player.autoplay': { en: 'Autoplay', zh: '自动播放' },
  'music.player.loop': { en: 'Loop', zh: '循环播放' },
  'music.player.upload': { en: 'Upload Custom Music', zh: '上传自定义音乐' },
  'music.reasoning.title': { en: 'AI Recommendation Reasoning', zh: 'AI 推荐逻辑' },
  'music.style.switch': { en: 'Switch Style', zh: '切换风格' },
  'music.style.current': { en: 'Current Style', zh: '当前风格' },
  'music.rematch': { en: 'Rematch Music', zh: '重新匹配音乐' },
  'music.pageMapping': { en: 'Page Music Mapping', zh: '页面音乐映射' },
  'music.library.title': { en: 'Music Library', zh: '音乐库' },
  'music.library.favorites': { en: 'Favorites', zh: '收藏' },
  'music.library.history': { en: 'History', zh: '历史' },
  'music.library.uploaded': { en: 'Uploaded', zh: '已上传' },
  'music.license.royaltyFree': { en: 'Royalty-Free', zh: '免版税' },
  'music.license.cc': { en: 'Creative Commons', zh: '知识共享' },
  'music.license.premium': { en: 'Premium', zh: '高级' },

  // Editor
  'editor.components': { en: 'Components', zh: '组件' },
  'editor.pages': { en: 'Pages', zh: '页面' },
  'editor.music': { en: 'Music', zh: '音乐' },
  'editor.styles': { en: 'Styles', zh: '样式' },
  'editor.dragToAdd': { en: 'Click to add', zh: '点击添加' },
  'editor.preview': { en: 'Preview', zh: '预览' },
  'editor.export': { en: 'Export', zh: '导出' },
  'editor.saved': { en: 'Saved', zh: '已保存' },
  'editor.emptyPage': { en: 'This page is empty', zh: '此页面为空' },
  'editor.addComponent': { en: 'Click a component from the left panel to add', zh: '从左侧面板点击组件添加' },
  'editor.selectModule': { en: 'Select a module to edit', zh: '选择模块进行编辑' },
  'editor.inlineEdit': { en: 'Click any module or click text to edit inline', zh: '点击任何模块或点击文本行内编辑' },
  'editor.pageMusic': { en: 'Page Music', zh: '页面音乐' },
  'editor.siteMusic': { en: 'Site-wide Music', zh: '全站音乐' },
  'editor.perPage': { en: 'Per-Page Music', zh: '逐页音乐' },

  // Brand Analysis
  'analysis.steps.industry': { en: 'Analyzing industry context...', zh: '正在分析行业背景...' },
  'analysis.steps.brandTone': { en: 'Detecting brand visual language...', zh: '正在检测品牌视觉语言...' },
  'analysis.steps.mood': { en: 'Mapping emotional mood profile...', zh: '正在映射情绪画像...' },
  'analysis.steps.visual': { en: 'Analyzing visual style...', zh: '正在分析视觉风格...' },
  'analysis.steps.matching': { en: 'Matching soundscape to brand DNA...', zh: '正在将音景与品牌 DNA 匹配...' },
  'analysis.warmth': { en: 'Warmth', zh: '温暖度' },
  'analysis.energy': { en: 'Energy', zh: '活力值' },
  'analysis.professionalism': { en: 'Professional', zh: '专业度' },
  'analysis.creativity': { en: 'Creative', zh: '创意值' },
  'analysis.sophistication': { en: 'Sophisticated', zh: '精致度' },
  'analysis.keywords': { en: 'Brand Keywords', zh: '品牌关键词' },
  'analysis.colorStyle': { en: 'Color Style', zh: '色彩风格' },
  'analysis.visualRhythm': { en: 'Visual Rhythm', zh: '视觉节奏' },
  'analysis.targetAudience': { en: 'Target Audience', zh: '目标受众' },
  'analysis.personality': { en: 'Brand Personality', zh: '品牌个性' },

  // Case Studies
  'cases.title': { en: 'Real Brand-Music Pairings', zh: '真实品牌-音乐配对' },
  'cases.subtitle': { en: 'See how AI matches music to different industries and brand personalities', zh: '看看 AI 如何将音乐与不同行业和品牌个性匹配' },
  'cases.metrics': { en: 'Impact Metrics', zh: '影响指标' },
  'cases.listen': { en: 'Listen', zh: '试听' },
  'cases.viewSite': { en: 'View Site', zh: '查看网站' },
};

function getTranslation(key: string, lang: string, fallback?: string): string {
  const entry = TRANSLATIONS[key];
  if (entry && entry[lang]) return entry[lang];
  return fallback || key;
}

const I18nContext = createContext<I18nContextValue>({
  lang: 'en',
  setLang: () => {},
  t: (key: string, fallback?: string) => fallback || key,
});

export function I18nProvider({ children }: { children: ReactNode }) {
  const [lang, setLang] = useState<Language>(() => {
    const saved = localStorage.getItem('automatch-lang');
    return (saved === 'en' ? 'en' : 'zh') as Language;
  });

  const t = useCallback((key: string, fallback?: string) => {
    return getTranslation(key, lang, fallback);
  }, [lang]);

  const handleSetLang = useCallback((newLang: Language) => {
    setLang(newLang);
    localStorage.setItem('automatch-lang', newLang);
  }, []);

  return (
    <I18nContext.Provider value={{ lang, setLang: handleSetLang, t }}>
      {children}
    </I18nContext.Provider>
  );
}

export function useI18n() {
  return useContext(I18nContext);
}
