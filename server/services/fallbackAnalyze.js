/**
 * 本地兜底分析 — 无 API Key 时使用关键词匹配
 * 逻辑与前端的 KEYWORD_PATTERNS 保持一致 (config.js)
 */

const KEYWORD_PATTERNS = [
  // ===== 核心行业 (10) =====
  { keywords: ['电商', '商城', '购物', 'shop', 'store', '卖', '购买', '商品', '产品', '店铺', '电子商务', '零售', 'ecommerce'], suggestion: '电商网站', template: 'card_grid', modules: ['header', 'hero', 'features', 'products', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#2563eb', accent: '#f59e0b' } },
  { keywords: ['企业', '公司', '官网', 'business', 'corporate', '集团', '实业', '股份', '有限', '企业官网', '品牌', 'official'], suggestion: '企业官网', template: 'story_flow', modules: ['header', 'hero', 'features', 'team', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#1e40af', accent: '#3b82f6' } },
  { keywords: ['博客', 'blog', '文章', '写作', '自媒体', '内容', '资讯', '新闻', '专栏', '日志', '投稿', 'weblog'], suggestion: '博客/内容站', template: 'blog_timeline', modules: ['header', 'hero', 'text', 'gallery', 'contact', 'footer'], colorScheme: { primary: '#1f2937', accent: '#6366f1' } },
  { keywords: ['作品', '作品集', 'portfolio', '设计', '创意', '艺术', '摄影', '展示', 'showcase', 'gallery'], suggestion: '作品集网站', template: 'card_grid', modules: ['header', 'hero', 'gallery', 'features', 'contact', 'footer'], colorScheme: { primary: '#0f0f0f', accent: '#ec4899' } },
  { keywords: ['餐饮', '餐厅', '咖啡', 'cafe', 'restaurant', '美食', '菜单', '食品', '茶', '酒吧', '烘焙', 'food'], suggestion: '餐饮品牌站', template: 'story_flow', modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'], colorScheme: { primary: '#78350f', accent: '#f97316' } },
  { keywords: ['教育', '课程', 'edu', '学习', '培训', '学校', '教学', '网课', '在线教育', '学生', '老师', '课堂', 'course'], suggestion: '在线教育平台', template: 'story_flow', modules: ['header', 'hero', 'features', 'pricing', 'team', 'contact', 'footer'], colorScheme: { primary: '#065f46', accent: '#10b981' } },
  { keywords: ['个人', '个人主页', '自我介绍', '简历', 'about', 'profile', '名片', '介绍', 'resume', 'cv'], suggestion: '个人介绍页', template: 'minimal_action', modules: ['header', 'hero', 'features', 'gallery', 'contact', 'footer'], colorScheme: { primary: '#1e293b', accent: '#64748b' } },
  { keywords: ['科技', 'SaaS', '互联网', 'tech', '软件', 'app', 'startup', '科技公司', '数码', 'IT', '智能', '创业'], suggestion: '科技公司官网', template: 'minimal_action', modules: ['header', 'hero', 'features', 'pricing', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#0f172a', accent: '#06b6d4' } },
  { keywords: ['房地产', '地产', '楼盘', '房产', '房屋', '租房', '买房', '物业', '公寓', '别墅', '中介', 'property'], suggestion: '房产展示站', template: 'card_grid', modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'], colorScheme: { primary: '#451a03', accent: '#d97706' } },
  { keywords: ['医疗', '医院', '诊所', '医生', '健康', '医美', 'health', 'medical', '牙科', '中医', '护理', 'clinic'], suggestion: '医疗健康站', template: 'story_flow', modules: ['header', 'hero', 'features', 'team', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#0c4a6e', accent: '#0ea5e9' } },

  // ===== 生活消费 (6) =====
  { keywords: ['摄影', '写真', '婚纱', 'photography', 'photographer', '拍照', '摄影师', '摄影工作室', '视觉'], suggestion: '摄影工作室', template: 'portfolio_masonry', modules: ['header', 'hero', 'gallery', 'pricing', 'text', 'contact', 'footer'], colorScheme: { primary: '#1a1a2e', accent: '#e2c275' } },
  { keywords: ['婚礼', '婚庆', 'wedding', 'event', '策划', '活动', '派对', '庆典', '司仪', '婚宴'], suggestion: '婚礼/活动策划', template: 'story_flow', modules: ['header', 'hero', 'gallery', 'features', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#831843', accent: '#fbcfe8' } },
  { keywords: ['健身', '运动', 'fitness', 'gym', 'workout', '瑜伽', '体育', '训练', '教练', '健身房'], suggestion: '健身/运动', template: 'minimal_action', modules: ['header', 'hero', 'features', 'pricing', 'team', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#171717', accent: '#ef4444' } },
  { keywords: ['美容', '美业', '美发', 'beauty', 'salon', 'spa', '美甲', '护肤', '化妆', '纹绣'], suggestion: '美业/美容', template: 'card_grid', modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'], colorScheme: { primary: '#831843', accent: '#db2777' } },
  { keywords: ['时尚', '服装', 'fashion', 'clothing', '服饰', '穿搭', '潮牌', '买手', '时装', '鞋'], suggestion: '时尚/服装', template: 'card_grid', modules: ['header', 'hero', 'gallery', 'features', 'products', 'contact', 'footer'], colorScheme: { primary: '#0f0f0f', accent: '#e11d48' } },
  { keywords: ['宠物', 'pet', 'dog', 'cat', '兽医', '宠物店', '宠物医院', '萌宠', '宠物美容', '寄养'], suggestion: '宠物/动物', template: 'card_grid', modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'], colorScheme: { primary: '#78350f', accent: '#f59e0b' } },

  // ===== 专业服务 (5) =====
  { keywords: ['律师', '法律', 'lawyer', 'legal', '律所', '诉讼', '法务', '事务所', '维权', '合同'], suggestion: '法律/律师', template: 'story_flow', modules: ['header', 'hero', 'features', 'team', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#1e3a5f', accent: '#94a3b8' } },
  { keywords: ['咨询', '顾问', 'consulting', 'consultant', '管理咨询', '战略', '营销策划', '品牌策划'], suggestion: '咨询/顾问', template: 'story_flow', modules: ['header', 'hero', 'features', 'team', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#1e293b', accent: '#f59e0b' } },
  { keywords: ['建筑', '室内设计', 'architecture', 'architect', 'design', '室内', '装修', '装潢', '景观设计'], suggestion: '建筑/室内设计', template: 'portfolio_masonry', modules: ['header', 'hero', 'gallery', 'features', 'team', 'contact', 'footer'], colorScheme: { primary: '#27272a', accent: '#a1a1aa' } },
  { keywords: ['培训', '教练', 'coach', 'training', '辅导', '技能提升', 'workshop', '导师', '成长'], suggestion: '培训/个人教练', template: 'minimal_action', modules: ['header', 'hero', 'features', 'pricing', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#4c1d95', accent: '#8b5cf6' } },
  { keywords: ['汽车', '车行', 'auto', 'car', 'vehicle', '4S', '二手车', '租车', '驾校', '修车'], suggestion: '汽车/交通', template: 'card_grid', modules: ['header', 'hero', 'features', 'gallery', 'pricing', 'contact', 'footer'], colorScheme: { primary: '#1e293b', accent: '#3b82f6' } },

  // ===== 文化/娱乐 (3) =====
  { keywords: ['音乐', '乐队', 'musician', 'band', 'singer', '歌手', '专辑', '演出', '演唱会', '艺人'], suggestion: '音乐人/乐队', template: 'video_showcase', modules: ['header', 'hero', 'gallery', 'text', 'pricing', 'contact', 'footer'], colorScheme: { primary: '#0c0c0c', accent: '#a855f7' } },
  { keywords: ['旅游', '酒店', '旅行', 'travel', 'hotel', '度假', '民宿', '景点', '旅行社', '游记'], suggestion: '旅游/酒店', template: 'card_grid', modules: ['header', 'hero', 'gallery', 'features', 'pricing', 'testimonials', 'contact', 'footer'], colorScheme: { primary: '#0c4a6e', accent: '#38bdf8' } },
  { keywords: ['公益', '慈善', 'nonprofit', 'charity', '非营利', '捐款', '志愿者', '基金会', 'NGO', '捐助'], suggestion: '非营利/公益', template: 'story_flow', modules: ['header', 'hero', 'features', 'text', 'gallery', 'contact', 'footer'], colorScheme: { primary: '#064e3b', accent: '#22c55e' } }
];

function fallbackAnalyze(text) {
  const kw = text.toLowerCase();
  let bestMatch = null;
  let bestScore = 0;

  for (const pattern of KEYWORD_PATTERNS) {
    let score = 0;
    for (const keyword of pattern.keywords) {
      if (kw.includes(keyword.toLowerCase())) score++;
    }
    if (score > bestScore) {
      bestScore = score;
      bestMatch = pattern;
    }
  }

  const inputWords = kw.split(/[\s,，、]+/).filter(w => w.length > 0);
  if (inputWords.length >= 3) bestScore += 0.5;

  if (bestMatch && bestScore > 0) {
    return {
      suggestion: bestMatch.suggestion,
      industry: bestMatch.suggestion.replace('站', '').replace('平台', ''),
      modules: [...bestMatch.modules],
      template: bestMatch.template,
      colorScheme: { ...bestMatch.colorScheme },
      reasoning: `匹配到「${bestMatch.suggestion}」模式，得分 ${bestScore}`,
      matchedKeywords: bestMatch.keywords.filter(k => kw.includes(k.toLowerCase()))
    };
  }

  return {
    suggestion: '通用网站',
    industry: '通用',
    modules: ['header', 'hero', 'text', 'features', 'contact', 'footer'],
    template: 'story_flow',
    colorScheme: { primary: '#334155', accent: '#6366f1' },
    reasoning: '未匹配到特定行业，使用通用布局',
    matchedKeywords: []
  };
}

module.exports = fallbackAnalyze;
