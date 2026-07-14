import type {
  MusicTrack, BrandMoodProfile, BrandMoodAnalysis,
  MusicRecommendation, MusicStylePreset, AnalysisStep,
  CaseStudy, PageMusicMapping
} from '@/types';

// ============================================
// Expanded Music Library
// ============================================

export const MUSIC_TRACKS: MusicTrack[] = [
  {
    id: 'track-1', title: 'Autumn Breeze', artist: 'Whispering Woods',
    album: 'Seasonal Sounds', duration: '3:42', durationSeconds: 222,
    cover: '/images/album-autumn-breeze.jpg',
    moods: ['Relaxing', 'Warm', 'Acoustic'], genre: 'Acoustic', bpm: 85,
    reason: 'Warm acoustic tones create an intimate, welcoming atmosphere perfect for artisanal brands',
    reasonZh: '温暖、低唤醒的原声吉他与品牌的自然色调和治愈定位相匹配，营造亲切温馨的氛围。',
    license: 'royalty-free', tags: ['cozy', 'coffee', 'warm', 'organic'],
  },
  {
    id: 'track-2', title: 'Sunday Morning', artist: 'Soft Horizon',
    album: 'Weekend Vibes', duration: '4:15', durationSeconds: 255,
    cover: '/images/album-sunday-morning.jpg',
    moods: ['Calm', 'Peaceful', 'Soft'], genre: 'Ambient', bpm: 72,
    reason: 'Gentle ambient textures provide a calm, professional backdrop without distraction',
    reasonZh: '轻柔的氛围音乐提供宁静专业的背景，不干扰用户浏览，适合强调简约美学的品牌。',
    license: 'royalty-free', tags: ['calm', 'professional', 'minimal'],
  },
  {
    id: 'track-3', title: 'Urban Flow', artist: 'Chillhop Beats',
    album: 'City Nights', duration: '3:28', durationSeconds: 208,
    cover: '/images/album-urban-flow.jpg',
    moods: ['Lo-Fi', 'Urban', 'Chill'], genre: 'Lo-Fi', bpm: 90,
    reason: 'Modern lo-fi beats convey creativity and forward-thinking energy for tech brands',
    reasonZh: '现代轻音乐节拍传达创意和前瞻性能量，适合文创和年轻化品牌调性。',
    license: 'royalty-free', tags: ['modern', 'creative', 'urban'],
  },
  {
    id: 'track-4', title: 'Morning Brew', artist: 'Cafe Acoustics',
    album: 'Coffee Shop Sessions', duration: '3:55', durationSeconds: 235,
    cover: '/images/album-autumn-breeze.jpg',
    moods: ['Cozy', 'Warm', 'Inviting'], genre: 'Jazz', bpm: 78,
    reason: 'Smooth jazz brings sophistication and warmth to hospitality and food brands',
    reasonZh: '流畅爵士乐带来精致感和温暖气质，与美妆护肤品牌的高端治愈定位完美契合。',
    license: 'royalty-free', tags: ['jazz', 'sophisticated', 'coffee'],
  },
  {
    id: 'track-5', title: 'Digital Dreams', artist: 'Neon Pulse',
    album: 'Future Forward', duration: '4:02', durationSeconds: 242,
    cover: '/images/album-urban-flow.jpg',
    moods: ['Modern', 'Energetic', 'Tech'], genre: 'Electronic', bpm: 120,
    reason: 'Energetic electronic pulses drive engagement for innovative, dynamic brands',
    reasonZh: '充满活力的电子脉冲驱动用户参与感，适合创新、动感十足的品牌形象。',
    license: 'royalty-free', tags: ['tech', 'energetic', 'future'],
  },
  {
    id: 'track-6', title: 'Zen Garden', artist: 'Tranquil Tones',
    album: 'Mindful Moments', duration: '5:10', durationSeconds: 310,
    cover: '/images/album-sunday-morning.jpg',
    moods: ['Serene', 'Meditative', 'Balanced'], genre: 'New Age', bpm: 65,
    reason: 'Serene new-age tones evoke balance and trust, ideal for wellness and health brands',
    reasonZh: '宁静的新世纪音乐唤起平衡与信任感，适合强调自然健康的护肤和公益品牌。',
    license: 'royalty-free', tags: ['wellness', 'calm', 'zen'],
  },
  {
    id: 'track-7', title: 'Golden Hour', artist: 'Piano Reflections',
    album: 'Light & Shadow', duration: '3:18', durationSeconds: 198,
    cover: '/images/album-autumn-breeze.jpg',
    moods: ['Elegant', 'Warm', 'Romantic'], genre: 'Cinematic', bpm: 70,
    reason: 'Elegant piano melodies with cinematic warmth create emotional storytelling moments',
    reasonZh: '优雅钢琴旋律搭配电影般的温暖质感，创造情感叙事的完美时刻，适合浪漫品牌。',
    license: 'royalty-free', tags: ['elegant', 'wedding', 'romantic', 'piano'],
  },
  {
    id: 'track-8', title: 'Neon District', artist: 'Synthwave Collective',
    album: 'Retro Future', duration: '3:45', durationSeconds: 225,
    cover: '/images/album-urban-flow.jpg',
    moods: ['Dynamic', 'Bold', 'Gaming'], genre: 'Electronic', bpm: 128,
    reason: 'Bold synthwave energy drives excitement for gaming, fitness, and entertainment brands',
    reasonZh: '大胆的合成器波能量激发兴奋感，适合年轻化、活力四射的文创品牌调性。',
    license: 'royalty-free', tags: ['gaming', 'energetic', 'bold', 'synth'],
  },
  {
    id: 'track-9', title: 'Classical Focus', artist: 'String Ensemble',
    album: 'Concentration', duration: '4:30', durationSeconds: 270,
    cover: '/images/album-sunday-morning.jpg',
    moods: ['Professional', 'Focused', 'Serious'], genre: 'Classical', bpm: 60,
    reason: 'Classical string arrangements convey authority and trust for legal and professional services',
    reasonZh: '古典弦乐编排传达权威与信任感，适合强调专业和可靠性的公益组织品牌。',
    license: 'royalty-free', tags: ['professional', 'legal', 'serious', 'classical'],
  },
  {
    id: 'track-10', title: 'Fashion Forward', artist: 'Chic Lounge',
    album: 'Runway Sessions', duration: '3:22', durationSeconds: 202,
    cover: '/images/album-autumn-breeze.jpg',
    moods: ['Stylish', 'Trendy', 'Luxury'], genre: 'Lounge', bpm: 105,
    reason: 'Sophisticated lounge beats create an upscale ambiance for fashion and luxury brands',
    reasonZh: '精致的休闲节拍营造高端氛围，与美妆护肤品牌的轻奢定位高度匹配。',
    license: 'royalty-free', tags: ['fashion', 'luxury', 'trendy', 'lounge'],
  },
  {
    id: 'track-11', title: 'Corporate Drive', artist: 'Business Pulse',
    album: 'Professional Edge', duration: '3:08', durationSeconds: 188,
    cover: '/images/album-urban-flow.jpg',
    moods: ['Motivated', 'Upbeat', 'Corporate'], genre: 'Corporate', bpm: 115,
    reason: 'Upbeat corporate music builds confidence and momentum for B2B and enterprise brands',
    reasonZh: '乐观的商务音乐建立信心和动力，适合宠物生活品牌的温馨可靠调性。',
    license: 'royalty-free', tags: ['corporate', 'b2b', 'motivated'],
  },
  {
    id: 'track-12', title: 'Nature Walk', artist: 'Forest Sounds',
    album: 'Earth Tones', duration: '4:45', durationSeconds: 285,
    cover: '/images/album-sunday-morning.jpg',
    moods: ['Organic', 'Fresh', 'Natural'], genre: 'Acoustic', bpm: 80,
    reason: 'Organic acoustic folk with nature sounds for eco-friendly and outdoor brands',
    reasonZh: '有机原声民谣搭配自然音效，与宠物生活品牌的自然温馨氛围完美契合。',
    license: 'royalty-free', tags: ['eco', 'organic', 'nature', 'fresh'],
  },
  {
    id: 'track-13', title: 'Midnight Jazz', artist: 'Blue Note Trio',
    album: 'After Hours', duration: '4:12', durationSeconds: 252,
    cover: '/images/album-autumn-breeze.jpg',
    moods: ['Sophisticated', 'Intimate', 'Moody'], genre: 'Jazz', bpm: 75,
    reason: 'Late-night jazz creates an intimate, exclusive atmosphere for fine dining and luxury venues',
    reasonZh: '深夜爵士乐营造亲密、专属的氛围，适合高端美妆和奢侈品牌的沉浸式体验。',
    license: 'royalty-free', tags: ['luxury', 'dining', 'intimate', 'moody'],
  },
  {
    id: 'track-14', title: 'Tech Vision', artist: 'Digital Horizon',
    album: 'Innovation', duration: '3:35', durationSeconds: 215,
    cover: '/images/album-urban-flow.jpg',
    moods: ['Futuristic', 'Clean', 'Innovative'], genre: 'Ambient', bpm: 95,
    reason: 'Clean ambient textures with subtle electronic elements for SaaS and tech startups',
    reasonZh: '干净的氛围质感搭配微妙电子元素，适合文创品牌的现代感与科技感结合。',
    license: 'royalty-free', tags: ['saas', 'tech', 'clean', 'minimal'],
  },
  {
    id: 'track-15', title: 'Wedding Bells', artist: 'Romantic Piano',
    album: 'Forever After', duration: '3:50', durationSeconds: 230,
    cover: '/images/album-sunday-morning.jpg',
    moods: ['Romantic', 'Dreamy', 'Emotional'], genre: 'Cinematic', bpm: 68,
    reason: 'Dreamy piano cinematic compositions for wedding photographers and romantic brands',
    reasonZh: '梦幻钢琴电影配乐，为浪漫品牌创造诗意的情感体验，适合强调美感的品牌。',
    license: 'royalty-free', tags: ['wedding', 'romantic', 'dreamy', 'emotional'],
  },
  {
    id: 'track-16', title: 'Workout Energy', artist: 'Fit Beats',
    album: 'Power Zone', duration: '3:15', durationSeconds: 195,
    cover: '/images/album-urban-flow.jpg',
    moods: ['Energetic', 'Powerful', 'Motivated'], genre: 'Electronic Pop', bpm: 135,
    reason: 'High-energy electronic pop drives motivation for fitness, gym, and sports brands',
    reasonZh: '高能量电子流行驱动激励感，适合强调活力、互动和趣味性的宠物生活品牌。',
    license: 'royalty-free', tags: ['fitness', 'gym', 'energy', 'workout'],
  },
  {
    id: 'track-17', title: 'Artisan Workshop', artist: 'Handcraft Folk',
    album: 'Makers', duration: '3:33', durationSeconds: 213,
    cover: '/images/album-autumn-breeze.jpg',
    moods: ['Handcrafted', 'Authentic', 'Rustic'], genre: 'Folk', bpm: 88,
    reason: 'Authentic folk music with handcrafted warmth for artisan and handmade brands',
    reasonZh: '真实民谣音乐搭配手工温暖质感，与文创品牌的手工艺和传统文化内核相呼应。',
    license: 'royalty-free', tags: ['artisan', 'handmade', 'rustic', 'authentic'],
  },
  {
    id: 'track-18', title: 'Minimal Space', artist: 'White Room',
    album: 'Less is More', duration: '4:00', durationSeconds: 240,
    cover: '/images/album-sunday-morning.jpg',
    moods: ['Minimal', 'Clean', 'Modern'], genre: 'Ambient', bpm: 68,
    reason: 'Ultra-minimal ambient for architecture, design studios, and minimalist brands',
    reasonZh: '极简氛围音乐适合强调留白和东方美学的文创品牌，营造宁静深远的意境。',
    license: 'royalty-free', tags: ['minimal', 'architecture', 'clean', 'design'],
  },
];

// ============================================
// Industry Mapping
// ============================================

export const INDUSTRY_MUSIC_MAP: Record<string, string[]> = {
  'Coffee & Food': ['track-1', 'track-4', 'track-12', 'track-17'],
  'Creative': ['track-2', 'track-7', 'track-14', 'track-18'],
  'Tech': ['track-3', 'track-5', 'track-14', 'track-11'],
  'Health': ['track-6', 'track-16', 'track-12', 'track-2'],
  'Services': ['track-9', 'track-11', 'track-2', 'track-1'],
  'Retail': ['track-3', 'track-10', 'track-5', 'track-1'],
  'Education': ['track-2', 'track-6', 'track-9', 'track-4'],
  'Entertainment': ['track-5', 'track-8', 'track-16', 'track-3'],
  'Wedding': ['track-7', 'track-15', 'track-4', 'track-1'],
  'Fitness': ['track-16', 'track-8', 'track-5', 'track-6'],
  'Luxury': ['track-13', 'track-10', 'track-7', 'track-9'],
  'Legal': ['track-9', 'track-11', 'track-2', 'track-6'],
  'Fashion': ['track-10', 'track-13', 'track-5', 'track-3'],
};

// ============================================
// Genre Labels
// ============================================

export const GENRE_LABELS: Record<string, { label: string; labelZh: string; color: string }> = {
  'Acoustic': { label: 'Acoustic Folk', labelZh: '原声民谣', color: '#D4A574' },
  'Ambient': { label: 'Ambient Chill', labelZh: '氛围轻音', color: '#7B9EA8' },
  'Lo-Fi': { label: 'Lo-Fi Beats', labelZh: '轻音乐节拍', color: '#8B7EC8' },
  'Jazz': { label: 'Smooth Jazz', labelZh: '爵士', color: '#C17F59' },
  'Electronic': { label: 'Electronic', labelZh: '电子', color: '#3B82F6' },
  'New Age': { label: 'New Age', labelZh: '新世纪', color: '#4ADE80' },
  'Cinematic': { label: 'Cinematic', labelZh: '电影配乐', color: '#E879A8' },
  'Classical': { label: 'Classical', labelZh: '古典', color: '#A3A3A3' },
  'Lounge': { label: 'Lounge', labelZh: '休闲', color: '#D4A574' },
  'Corporate': { label: 'Corporate', labelZh: '商务', color: '#6366F1' },
  'Folk': { label: 'Folk', labelZh: '民谣', color: '#A16207' },
  'Electronic Pop': { label: 'Electronic Pop', labelZh: '电子流行', color: '#F59E0B' },
};

// ============================================
// Mood Labels
// ============================================

export const MOOD_LABELS: Record<string, { label: string; labelZh: string; color: string }> = {
  'Warm': { label: 'Warm', labelZh: '温暖', color: '#E85D4C' },
  'Professional': { label: 'Professional', labelZh: '专业', color: '#3B82F6' },
  'Energetic': { label: 'Energetic', labelZh: '活力', color: '#F59E0B' },
  'Calm': { label: 'Calm', labelZh: '宁静', color: '#10B981' },
  'Elegant': { label: 'Elegant', labelZh: '优雅', color: '#8B5CF6' },
  'Sophisticated': { label: 'Sophisticated', labelZh: '精致', color: '#6366F1' },
  'Modern': { label: 'Modern', labelZh: '现代', color: '#06B6D4' },
  'Minimal': { label: 'Minimal', labelZh: '极简', color: '#94A3B8' },
  'Luxury': { label: 'Luxury', labelZh: '奢华', color: '#D4AF37' },
};

// ============================================
// Music Style Presets
// ============================================

export const MUSIC_STYLE_PRESETS: MusicStylePreset[] = [
  {
    id: 'professional', name: 'Professional', nameZh: '专业商务',
    description: 'Clean, confident corporate music', descriptionZh: '干净、自信的商务音乐',
    icon: 'briefcase', genres: ['Corporate', 'Classical'],
    moodProfile: { warmth: 50, energy: 60, professionalism: 95, creativity: 40, sophistication: 75 },
  },
  {
    id: 'luxury', name: 'Luxury', nameZh: '奢华高端',
    description: 'Elegant, refined soundscapes', descriptionZh: '优雅、精致的音景',
    icon: 'crown', genres: ['Jazz', 'Lounge', 'Cinematic'],
    moodProfile: { warmth: 60, energy: 40, professionalism: 80, creativity: 65, sophistication: 95 },
  },
  {
    id: 'modern', name: 'Modern', nameZh: '现代简约',
    description: 'Clean, minimal, forward-thinking', descriptionZh: '干净、极简、前卫',
    icon: 'zap', genres: ['Ambient', 'Electronic'],
    moodProfile: { warmth: 30, energy: 70, professionalism: 85, creativity: 75, sophistication: 60 },
  },
  {
    id: 'creative', name: 'Creative', nameZh: '创意活力',
    description: 'Bold, expressive, inspiring', descriptionZh: '大胆、富有表现力、启发灵感',
    icon: 'sparkles', genres: ['Lo-Fi', 'Electronic', 'Acoustic'],
    moodProfile: { warmth: 55, energy: 80, professionalism: 45, creativity: 95, sophistication: 55 },
  },
  {
    id: 'minimal', name: 'Minimal', nameZh: '极简风格',
    description: 'Ultra-clean ambient textures', descriptionZh: '超干净的氛围质感',
    icon: 'minus', genres: ['Ambient', 'New Age'],
    moodProfile: { warmth: 40, energy: 35, professionalism: 70, creativity: 50, sophistication: 80 },
  },
  {
    id: 'corporate', name: 'Corporate', nameZh: '企业办公',
    description: 'Motivated, productive, upbeat', descriptionZh: '积极、高效、乐观',
    icon: 'building', genres: ['Corporate', 'Electronic'],
    moodProfile: { warmth: 45, energy: 75, professionalism: 90, creativity: 50, sophistication: 65 },
  },
  {
    id: 'gaming', name: 'Gaming', nameZh: '游戏娱乐',
    description: 'Dynamic, exciting, energetic', descriptionZh: '动感、刺激、充满活力',
    icon: 'gamepad', genres: ['Electronic', 'Electronic Pop'],
    moodProfile: { warmth: 25, energy: 95, professionalism: 30, creativity: 85, sophistication: 35 },
  },
  {
    id: 'fashion', name: 'Fashion', nameZh: '时尚潮流',
    description: 'Trendy, stylish, confident', descriptionZh: '时髦、有风格、自信',
    icon: 'shirt', genres: ['Lounge', 'Electronic', 'Jazz'],
    moodProfile: { warmth: 45, energy: 70, professionalism: 60, creativity: 85, sophistication: 80 },
  },
  {
    id: 'coffee', name: 'Coffee', nameZh: '咖啡休闲',
    description: 'Warm, cozy, inviting acoustic', descriptionZh: '温暖、舒适、诱人的原声',
    icon: 'coffee', genres: ['Acoustic', 'Jazz', 'Folk'],
    moodProfile: { warmth: 90, energy: 45, professionalism: 55, creativity: 60, sophistication: 65 },
  },
  {
    id: 'wedding', name: 'Wedding', nameZh: '婚礼浪漫',
    description: 'Romantic, dreamy, emotional', descriptionZh: '浪漫、梦幻、感性',
    icon: 'heart', genres: ['Cinematic', 'Acoustic', 'Classical'],
    moodProfile: { warmth: 80, energy: 40, professionalism: 60, creativity: 70, sophistication: 75 },
  },
];

// ============================================
// Analysis Steps for AI Visualization
// ============================================

export function createAnalysisSteps(industry: string): AnalysisStep[] {
  const profile = generateBrandMoodProfile(industry);
  const analysis = generateBrandMoodAnalysis(industry);

  return [
    {
      id: 'industry', label: 'Industry Analysis', labelZh: '行业分析',
      description: `Identified industry: ${industry}`, descriptionZh: `识别行业：${getIndustryZh(industry)}`,
      status: 'pending',
      dimensions: [
        { id: 'industry', label: 'Industry', labelZh: '行业', description: 'Business sector', descriptionZh: '商业领域', icon: 'building', value: industry, valueZh: getIndustryZh(industry), confidence: 92 },
      ],
    },
    {
      id: 'brand-tone', label: 'Brand Tone', labelZh: '品牌调性',
      description: `Brand personality: ${analysis.brandPersonality}`, descriptionZh: `品牌个性：${analysis.brandPersonality}`,
      status: 'pending',
      dimensions: [
        { id: 'personality', label: 'Personality', labelZh: '个性', description: 'Brand character', descriptionZh: '品牌特征', icon: 'user', value: analysis.brandPersonality, valueZh: analysis.brandPersonality, confidence: 88 },
        { id: 'audience', label: 'Target Audience', labelZh: '目标用户', description: 'Primary audience', descriptionZh: '主要受众', icon: 'users', value: analysis.targetAudience, valueZh: analysis.targetAudience, confidence: 85 },
      ],
    },
    {
      id: 'mood', label: 'Mood Analysis', labelZh: '情绪分析',
      description: 'Mapping emotional dimensions', descriptionZh: '映射情绪维度',
      status: 'pending',
      dimensions: [
        { id: 'warmth', label: 'Warmth', labelZh: '温暖度', description: 'Emotional warmth', descriptionZh: '情感温暖', icon: 'flame', value: `${profile.warmth}%`, valueZh: `${profile.warmth}%`, confidence: 87 },
        { id: 'energy', label: 'Energy', labelZh: '活力值', description: 'Dynamic energy', descriptionZh: '动态活力', icon: 'zap', value: `${profile.energy}%`, valueZh: `${profile.energy}%`, confidence: 83 },
        { id: 'professionalism', label: 'Professional', labelZh: '专业度', description: 'Professional tone', descriptionZh: '专业调性', icon: 'briefcase', value: `${profile.professionalism}%`, valueZh: `${profile.professionalism}%`, confidence: 90 },
      ],
    },
    {
      id: 'visual', label: 'Visual Style', labelZh: '视觉风格',
      description: `Color style: ${analysis.colorStyle}`, descriptionZh: `色彩风格：${analysis.colorStyle}`,
      status: 'pending',
      dimensions: [
        { id: 'color', label: 'Color Style', labelZh: '色彩风格', description: 'Color palette analysis', descriptionZh: '配色分析', icon: 'palette', value: analysis.colorStyle, valueZh: analysis.colorStyle, confidence: 86 },
        { id: 'rhythm', label: 'Visual Rhythm', labelZh: '视觉节奏', description: 'Page pacing', descriptionZh: '页面节奏', icon: 'activity', value: analysis.visualRhythm, valueZh: analysis.visualRhythm, confidence: 80 },
      ],
    },
    {
      id: 'matching', label: 'Music Matching', labelZh: '音乐匹配',
      description: 'Matching soundscape to brand DNA', descriptionZh: '将音景与品牌 DNA 匹配',
      status: 'pending',
      dimensions: [
        { id: 'genre', label: 'Genre Match', labelZh: '风格匹配', description: 'Optimal genre', descriptionZh: '最佳风格', icon: 'music', value: 'Analyzing...', valueZh: '分析中...', confidence: 94 },
      ],
    },
  ];
}

function getIndustryZh(industry: string): string {
  const map: Record<string, string> = {
    'Coffee & Food': '咖啡餐饮', 'Creative': '创意设计', 'Tech': '科技',
    'Health': '健康健身', 'Services': '专业服务', 'Retail': '零售电商',
    'Education': '教育培训', 'Entertainment': '娱乐', 'Wedding': '婚礼摄影',
    'Fitness': '健身运动', 'Luxury': '奢侈品牌', 'Legal': '法律金融',
    'Fashion': '时尚潮流',
  };
  return map[industry] || industry;
}

// ============================================
// Brand Mood Functions
// ============================================

export function generateBrandMoodProfile(industry: string): BrandMoodProfile {
  const profiles: Record<string, BrandMoodProfile> = {
    'Coffee & Food': { warmth: 90, energy: 45, professionalism: 60, creativity: 55, sophistication: 70 },
    'Creative': { warmth: 50, energy: 75, professionalism: 40, creativity: 95, sophistication: 65 },
    'Tech': { warmth: 30, energy: 80, professionalism: 90, creativity: 75, sophistication: 60 },
    'Health': { warmth: 70, energy: 65, professionalism: 80, creativity: 40, sophistication: 55 },
    'Services': { warmth: 60, energy: 55, professionalism: 85, creativity: 45, sophistication: 65 },
    'Retail': { warmth: 55, energy: 70, professionalism: 60, creativity: 65, sophistication: 55 },
    'Education': { warmth: 65, energy: 50, professionalism: 85, creativity: 60, sophistication: 50 },
    'Entertainment': { warmth: 45, energy: 90, professionalism: 35, creativity: 85, sophistication: 40 },
    'Wedding': { warmth: 85, energy: 35, professionalism: 55, creativity: 70, sophistication: 80 },
    'Fitness': { warmth: 35, energy: 95, professionalism: 60, creativity: 50, sophistication: 40 },
    'Luxury': { warmth: 55, energy: 40, professionalism: 85, creativity: 60, sophistication: 95 },
    'Legal': { warmth: 35, energy: 30, professionalism: 95, creativity: 20, sophistication: 80 },
    'Fashion': { warmth: 50, energy: 75, professionalism: 60, creativity: 85, sophistication: 85 },
  };
  return profiles[industry] || { warmth: 50, energy: 60, professionalism: 70, creativity: 50, sophistication: 55 };
}

export function generateBrandMoodAnalysis(industry: string): BrandMoodAnalysis {
  const analyses: Record<string, BrandMoodAnalysis> = {
    'Coffee & Food': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Warm', 'Artisanal', 'Cozy', 'Organic', 'Inviting'],
      colorStyle: 'Warm earth tones, natural textures',
      visualRhythm: 'Gentle, flowing, unhurried',
      targetAudience: 'Local community, lifestyle seekers',
      brandPersonality: 'Friendly, approachable, authentic',
    },
    'Creative': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Bold', 'Expressive', 'Innovative', 'Artistic', 'Dynamic'],
      colorStyle: 'Vibrant accents, dramatic contrast',
      visualRhythm: 'Dynamic, varied, engaging',
      targetAudience: 'Art enthusiasts, design-conscious clients',
      brandPersonality: 'Expressive, imaginative, boundary-pushing',
    },
    'Tech': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Modern', 'Innovative', 'Clean', 'Professional', 'Efficient'],
      colorStyle: 'Cool blues, clean whites, subtle gradients',
      visualRhythm: 'Structured, precise, progressive',
      targetAudience: 'Developers, businesses, early adopters',
      brandPersonality: 'Innovative, reliable, forward-thinking',
    },
    'Health': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Calm', 'Trustworthy', 'Holistic', 'Natural', 'Balanced'],
      colorStyle: 'Soft greens, whites, natural tones',
      visualRhythm: 'Smooth, calming, restorative',
      targetAudience: 'Health-conscious individuals, wellness seekers',
      brandPersonality: 'Caring, knowledgeable, supportive',
    },
    'Luxury': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Elegant', 'Exclusive', 'Refined', 'Prestigious', 'Timeless'],
      colorStyle: 'Deep blacks, gold accents, rich textures',
      visualRhythm: 'Slow, deliberate, commanding',
      targetAudience: 'Affluent clientele, connoisseurs',
      brandPersonality: 'Sophisticated, exclusive, confident',
    },
    'Fashion': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Trendy', 'Stylish', 'Confident', 'Avant-garde', 'Polished'],
      colorStyle: 'High contrast, bold statements, seasonal palettes',
      visualRhythm: 'Fast-paced, editorial, rhythmic',
      targetAudience: 'Fashion-forward consumers, trendsetters',
      brandPersonality: 'Bold, trendsetting, confident',
    },
    'Wedding': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Romantic', 'Dreamy', 'Emotional', 'Elegant', 'Timeless'],
      colorStyle: 'Soft pastels, whites, romantic tones',
      visualRhythm: 'Flowing, emotional, narrative',
      targetAudience: 'Engaged couples, families',
      brandPersonality: 'Romantic, attentive, detail-oriented',
    },
    'Fitness': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Energetic', 'Powerful', 'Motivated', 'Dynamic', 'Strong'],
      colorStyle: 'Bold primaries, high contrast, energetic',
      visualRhythm: 'Fast, driving, pulsing',
      targetAudience: 'Fitness enthusiasts, athletes',
      brandPersonality: 'Motivating, powerful, results-driven',
    },
    'Legal': {
      industry, moodProfile: generateBrandMoodProfile(industry),
      keywords: ['Professional', 'Authoritative', 'Trustworthy', 'Serious', 'Competent'],
      colorStyle: 'Deep navy, burgundy, traditional tones',
      visualRhythm: 'Steady, measured, authoritative',
      targetAudience: 'Businesses, individuals seeking legal help',
      brandPersonality: 'Authoritative, trustworthy, experienced',
    },
  };
  return analyses[industry] || {
    industry, moodProfile: generateBrandMoodProfile(industry),
    keywords: ['Professional', 'Reliable', 'Modern'],
    colorStyle: 'Clean, modern palette',
    visualRhythm: 'Balanced, professional',
    targetAudience: 'General audience',
    brandPersonality: 'Professional, approachable',
  };
}

// ============================================
// Recommendation Engine
// ============================================

export function getRecommendedTracks(industry: string): MusicTrack[] {
  const trackIds = INDUSTRY_MUSIC_MAP[industry] || INDUSTRY_MUSIC_MAP['Services'];
  return trackIds.map(id => MUSIC_TRACKS.find(t => t.id === id)!).filter(Boolean);
}

export function getTrackById(id: string): MusicTrack | undefined {
  return MUSIC_TRACKS.find(t => t.id === id);
}

export function generateMusicRecommendation(industry: string, style?: string): MusicRecommendation {
  const tracks = getRecommendedTracks(industry);
  const moodProfile = generateBrandMoodProfile(industry);
  const analysis = generateBrandMoodAnalysis(industry);
  const primary = tracks[0];
  const alternatives = tracks.slice(1);

  const reasonings: Record<string, string> = {
    'Coffee & Food': `Your warm, artisanal brand aesthetic with earth tones creates an intimate atmosphere. ${primary.genre} music with its organic warmth naturally complements the sensory experience of food and craft.`,
    'Creative': `Your bold, expressive brand identity calls for music that mirrors creative energy. ${primary.genre} provides an inspiring soundscape that enhances artistic expression without competing for attention.`,
    'Tech': `Your modern, forward-thinking brand benefits from ${primary.genre.toLowerCase()}'s progressive energy. The clean, structured sound reinforces innovation while maintaining professional credibility.`,
    'Health': `Your wellness-focused brand requires music that promotes calm and trust. ${primary.genre}'s serene qualities create a therapeutic environment that aligns with holistic health values.`,
    'Services': `Your professional service brand needs music that builds confidence. ${primary.genre} provides a polished, reliable audio identity that complements your expertise.`,
    'Luxury': `Your exclusive brand demands ${primary.genre.toLowerCase()}'s refined elegance. The sophisticated soundscape elevates the perceived value and creates a memorable premium experience.`,
    'Fashion': `Your trend-forward brand pairs perfectly with ${primary.genre.toLowerCase()}'s stylish energy. The contemporary beats create an aspirational atmosphere that resonates with fashion-conscious audiences.`,
    'Wedding': `Your romantic brand storytelling calls for ${primary.genre.toLowerCase()}'s emotional depth. The dreamy melodies create lasting emotional connections with your audience.`,
    'Fitness': `Your high-energy brand needs ${primary.genre.toLowerCase()}'s driving motivation. The powerful beats push performance while maintaining a professional, modern edge.`,
    'Legal': `Your authoritative brand benefits from ${primary.genre.toLowerCase()}'s gravitas. The structured, time-honored compositions convey trust and professional excellence.`,
  };

  return {
    primary,
    alternatives,
    reasoning: reasonings[industry] || `Your brand profile suggests ${primary.genre} as the ideal soundscape. The ${primary.moods.join(', ')} qualities align with your brand's emotional goals.`,
    moodProfile,
    analysis,
    style: style || 'auto',
  };
}

export function getRecommendationByStyle(styleId: string): MusicRecommendation | null {
  const preset = MUSIC_STYLE_PRESETS.find(p => p.id === styleId);
  if (!preset) return null;

  const matchingTracks = MUSIC_TRACKS.filter(t => preset.genres.some(g => t.genre === g || t.genre.includes(g)));
  if (matchingTracks.length === 0) return null;

  const shuffled = [...matchingTracks].sort(() => Math.random() - 0.5);
  return {
    primary: shuffled[0],
    alternatives: shuffled.slice(1, 4),
    reasoning: `The ${preset.name} style emphasizes ${preset.description.toLowerCase()}. These tracks match your selected brand atmosphere with ${preset.moodProfile.sophistication}% sophistication alignment.`,
    moodProfile: preset.moodProfile,
    analysis: {
      industry: preset.name,
      moodProfile: preset.moodProfile,
      keywords: preset.genres,
      colorStyle: preset.description,
      visualRhythm: 'Style-driven',
      targetAudience: 'Style-aligned',
      brandPersonality: preset.name,
    },
    style: styleId,
  };
}

// ============================================
// Utility Functions
// ============================================

export function getGenreLabel(genre: string): string {
  return GENRE_LABELS[genre]?.label || genre;
}

export function getGenreLabelZh(genre: string): string {
  return GENRE_LABELS[genre]?.labelZh || genre;
}

export function getGenreColor(genre: string): string {
  return GENRE_LABELS[genre]?.color || '#888';
}

export function detectIndustry(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes('skincare') || p.includes('beauty') || p.includes('cosmetic') || p.includes('护肤') || p.includes('美容') || p.includes('化妆品') || p.includes('makeup')) return 'Beauty & Skincare';
  if (p.includes('pet') || p.includes('宠物') || p.includes('grooming') || p.includes('dog') || p.includes('cat') || p.includes('boarding') || p.includes('veterinary')) return 'Pet Lifestyle';
  if (p.includes('cultural') || p.includes('creative') || p.includes('文创') || p.includes('文化') || p.includes('studio') || p.includes('design') || p.includes('art') || p.includes('gallery') || p.includes('portfolio')) return 'Cultural & Creative';
  if (p.includes('charity') || p.includes('nonprofit') || p.includes('公益') || p.includes('慈善') || p.includes('donation') || p.includes('social impact') || p.includes('community') || p.includes('foundation')) return 'Charity & Social Impact';
  // fallback for old keywords
  if (p.includes('coffee') || p.includes('cafe') || p.includes('restaurant')) return 'Beauty & Skincare';
  if (p.includes('tech') || p.includes('startup') || p.includes('saas')) return 'Cultural & Creative';
  if (p.includes('fitness') || p.includes('gym') || p.includes('health')) return 'Pet Lifestyle';
  return 'Charity & Social Impact';
}

// ============================================
// Case Studies
// ============================================

export const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'case-coffee', industry: 'Coffee & Food', industryZh: '咖啡餐饮',
    brandName: 'Lumière Café',
    description: 'A warm artisanal coffee brand with earth tones and organic textures, evoking comfort and craftsmanship.',
    descriptionZh: '一个温暖的手工咖啡品牌，采用大地色调和有机纹理，唤起舒适和匠心感。',
    musicGenre: 'Acoustic Jazz', musicTitle: 'Morning Brew', musicArtist: 'Cafe Acoustics',
    coverImage: '/images/album-autumn-breeze.jpg', websiteImage: '/images/template-lumiere-cafe.jpg',
    colorPalette: { primary: '#6B3A2A', accent: '#D4A574', background: '#F5E6D3', surface: '#FFFFFF', text: '#3D2B1F', textSecondary: '#6B5344', textMuted: '#A08B7D' },
    moodProfile: { warmth: 90, energy: 45, professionalism: 60, creativity: 55, sophistication: 70 },
    reasoning: 'The warm acoustic tones of jazz mirror the sensory warmth of coffee brewing. The organic, unhurried rhythm complements the artisanal craft atmosphere.',
    reasoningZh: '爵士乐的温暖原声与咖啡冲泡的感官温暖相呼应。有机、从容的节奏与手工氛围相得益彰。',
    metrics: [{ label: 'Brand Recall', value: '+147%' }, { label: 'Time on Site', value: '+68%' }, { label: 'Conversions', value: '+32%' }],
  },
  {
    id: 'case-tech', industry: 'Tech', industryZh: '科技',
    brandName: 'Nexa Labs',
    description: 'A forward-thinking tech startup with clean design, blue accents, and a focus on innovation.',
    descriptionZh: '一家前卫的科技初创公司，拥有干净的设计、蓝色点缀，专注于创新。',
    musicGenre: 'Electronic Ambient', musicTitle: 'Digital Dreams', musicArtist: 'Neon Pulse',
    coverImage: '/images/album-urban-flow.jpg', websiteImage: '/images/template-nexa-labs.jpg',
    colorPalette: { primary: '#0E243C', accent: '#3B82F6', background: '#F8FAFC', surface: '#FFFFFF', text: '#1E293B', textSecondary: '#475569', textMuted: '#94A3B8' },
    moodProfile: { warmth: 30, energy: 80, professionalism: 90, creativity: 75, sophistication: 60 },
    reasoning: 'Electronic ambient reinforces the brand\'s innovative positioning. The progressive, clean sound signals technological advancement and modern thinking.',
    reasoningZh: '电子氛围音乐强化了品牌的创新定位。渐进、干净的声音传达了技术进步和现代思维。',
    metrics: [{ label: 'Brand Recall', value: '+203%' }, { label: 'Time on Site', value: '+92%' }, { label: 'Sign-ups', value: '+45%' }],
  },
  {
    id: 'case-wedding', industry: 'Wedding', industryZh: '婚礼摄影',
    brandName: 'Ever After Studios',
    description: 'A romantic wedding photography studio with soft pastels and dreamy visual aesthetics.',
    descriptionZh: '一家浪漫的婚礼摄影工作室，采用柔和粉彩和梦幻视觉美学。',
    musicGenre: 'Piano Cinematic', musicTitle: 'Golden Hour', musicArtist: 'Piano Reflections',
    coverImage: '/images/album-sunday-morning.jpg', websiteImage: '/images/template-frame-studio.jpg',
    colorPalette: { primary: '#8B6F5E', accent: '#E8A598', background: '#FFF8F5', surface: '#FFFFFF', text: '#5A4338', textSecondary: '#8B7355', textMuted: '#B5A396' },
    moodProfile: { warmth: 85, energy: 35, professionalism: 55, creativity: 70, sophistication: 80 },
    reasoning: 'Piano cinematic compositions evoke the emotional depth of wedding moments. The romantic melodies create a lasting emotional connection with potential clients.',
    reasoningZh: '钢琴电影配乐唤起了婚礼时刻的情感深度。浪漫的旋律与潜在客户建立了持久的情感联系。',
    metrics: [{ label: 'Brand Recall', value: '+256%' }, { label: 'Inquiries', value: '+78%' }, { label: 'Bookings', value: '+41%' }],
  },
  {
    id: 'case-fitness', industry: 'Fitness', industryZh: '健身运动',
    brandName: 'Zenith Fitness',
    description: 'A high-energy fitness brand with bold visuals and dynamic, motivating aesthetics.',
    descriptionZh: '一个高能量的健身品牌，拥有大胆的视觉效果和动感、激励的美学。',
    musicGenre: 'Electronic Pop', musicTitle: 'Workout Energy', musicArtist: 'Fit Beats',
    coverImage: '/images/album-urban-flow.jpg', websiteImage: '/images/template-zenith-fitness.jpg',
    colorPalette: { primary: '#1A2E1A', accent: '#4ADE80', background: '#F0FDF4', surface: '#FFFFFF', text: '#14532D', textSecondary: '#2D6A4F', textMuted: '#74C69D' },
    moodProfile: { warmth: 35, energy: 95, professionalism: 60, creativity: 50, sophistication: 40 },
    reasoning: 'High-energy electronic pop drives the motivation that fitness brands need. The pulsing beats create urgency and excitement that pushes visitors to take action.',
    reasoningZh: '高能量的电子流行音乐提供了健身品牌所需的动力。脉动的节拍创造了紧迫感和兴奋感，推动访问者采取行动。',
    metrics: [{ label: 'Brand Recall', value: '+178%' }, { label: 'Time on Site', value: '+56%' }, { label: 'Membership', value: '+38%' }],
  },
  {
    id: 'case-legal', industry: 'Legal', industryZh: '法律服务',
    brandName: 'Sterling & Partners',
    description: 'A prestigious law firm with traditional aesthetics, deep navy tones, and authoritative design.',
    descriptionZh: '一家享有盛誉的律师事务所，采用传统美学、深海军蓝色调和权威设计。',
    musicGenre: 'Classical Piano', musicTitle: 'Classical Focus', musicArtist: 'String Ensemble',
    coverImage: '/images/album-sunday-morning.jpg', websiteImage: '/images/template-atelier.jpg',
    colorPalette: { primary: '#1C2B4A', accent: '#8B6914', background: '#F5F3EE', surface: '#FFFFFF', text: '#1A1A1A', textSecondary: '#4A5568', textMuted: '#718096' },
    moodProfile: { warmth: 35, energy: 30, professionalism: 95, creativity: 20, sophistication: 80 },
    reasoning: 'Classical piano conveys the gravitas and tradition expected of legal services. The structured compositions signal competence, authority, and trustworthiness.',
    reasoningZh: '古典钢琴传达了法律服务所需的庄重和传统。结构化的作品标志着能力、权威和可信度。',
    metrics: [{ label: 'Brand Recall', value: '+134%' }, { label: 'Time on Site', value: '+42%' }, { label: 'Consultations', value: '+28%' }],
  },
];

// ============================================
// Page Music Mapping Helpers
// ============================================

export function createDefaultPageMusicMapping(pageId: string): PageMusicMapping {
  return {
    pageId,
    trackId: 'track-1',
    volume: 70,
    fadeIn: 2,
    fadeOut: 2,
    loop: true,
    autoplay: false,
  };
}
