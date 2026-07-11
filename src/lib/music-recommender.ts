// ============================================================
// AutoMatch Music Recommender — Thayer Emotion Model
// Ported from js/music-recommender.js
// ============================================================

export interface MoodRegion {
  label: string;
  labelZh: string;
  valence: number;
  arousal: number;
  bpm: [number, number];
  energy: number;
  mode: 'major' | 'minor';
  desc: string;
}

export interface TextAnalysis {
  valence: number;
  arousal: number;
  keywords: string[];
  moodLabel: string;
}

export interface MusicParams {
  mood: string;
  moodLabel: string;
  moodLabelZh: string;
  description: string;
  bpm: number;
  energy: number;
  mode: string;
  valence: number;
  arousal: number;
  danceability: number;
  acousticness: number;
  instrumentalness: number;
  loudness: number;
}

export interface LibraryMatch {
  id: string;
  title: string;
  artist: string;
  mood: string;
  valence: number;
  arousal: number;
  bpm: number;
  energy: number;
  mode: string;
  duration: number;
  genre: string;
  license: string;
  score: number;
}

export interface AIPrompt {
  prompt: string;
  parameters: Record<string, unknown>;
}

export interface SynthesisParams {
  type: string;
  parameters: Record<string, unknown>;
  description: string;
  copyright: string;
}

export interface MusicRecommendation {
  textAnalysis: TextAnalysis;
  musicParams: MusicParams;
  libraryMatches: LibraryMatch[];
  aiPrompt: AIPrompt;
  synthesisParams: SynthesisParams;
}

// ---- Thayer VA Mood Regions ----
export const MOOD_REGIONS: Record<string, MoodRegion> = {
  happy: { label: 'Happy', labelZh: '欢快', valence: 0.7, arousal: 0.6, bpm: [120, 160], energy: 0.8, mode: 'major', desc: '明亮、快节奏、积极' },
  tense: { label: 'Tense', labelZh: '紧张', valence: -0.6, arousal: 0.7, bpm: [100, 140], energy: 0.9, mode: 'minor', desc: '激烈、不协和、冲击感' },
  calm: { label: 'Calm', labelZh: '平静', valence: 0.7, arousal: -0.6, bpm: [50, 80], energy: 0.2, mode: 'major', desc: '舒缓、柔和、空间感' },
  sad: { label: 'Sad', labelZh: '忧郁', valence: -0.6, arousal: -0.5, bpm: [40, 70], energy: 0.2, mode: 'minor', desc: '低沉、缓慢、暗淡' },
  warm: { label: 'Warm', labelZh: '温馨', valence: 0.5, arousal: -0.2, bpm: [65, 90], energy: 0.4, mode: 'major', desc: '温暖、亲切、中速' },
  somber: { label: 'Somber', labelZh: '深沉', valence: -0.4, arousal: 0.1, bpm: [60, 85], energy: 0.5, mode: 'minor', desc: '厚重、沉思、低沉' },
  triumphant: { label: 'Triumphant', labelZh: '激昂', valence: 0.3, arousal: 0.8, bpm: [110, 150], energy: 0.85, mode: 'major', desc: '壮丽、宏大、推进感' },
  gentle: { label: 'Gentle', labelZh: '淡雅', valence: 0.3, arousal: -0.7, bpm: [45, 65], energy: 0.15, mode: 'major', desc: '轻盈、简约、清澈' },
};

// ---- Sentiment Lexicon ----
interface SentimentEntry { words: string[]; va: { valence: number; arousal: number } }

const SENTIMENT_LEXICON: Record<string, SentimentEntry> = {
  positive_high: {
    words: ['快乐','兴奋','激动','喜悦','狂欢','热烈','振奋','庆祝','成功','胜利','happy','excited','joyful','celebrate','triumph','passionate','energetic','朝气','活力','澎湃','昂扬','辉煌'],
    va: { valence: 0.7, arousal: 0.7 }
  },
  positive_low: {
    words: ['平静','安宁','放松','舒适','温馨','温暖','宁静','祥和','惬意','悠然','calm','peaceful','relaxed','serene','gentle','tranquil','cozy','淡雅','闲适','柔美','静谧','舒缓'],
    va: { valence: 0.7, arousal: -0.6 }
  },
  negative_high: {
    words: ['愤怒','紧张','焦虑','恐惧','恐慌','激烈','冲突','危机','暴躁','不安','angry','tense','anxious','fear','panic','aggressive','frantic','紧迫','危急','震撼','压抑'],
    va: { valence: -0.6, arousal: 0.7 }
  },
  negative_low: {
    words: ['悲伤','忧郁','孤独','失落','哀伤','沉痛','凄凉','沮丧','绝望','沉重','sad','melancholy','lonely','gloomy','mournful','hopeless','despair','沧桑','感伤','凄美','暗淡'],
    va: { valence: -0.6, arousal: -0.5 }
  },
  neutral_high: {
    words: ['震撼','宏大','壮丽','磅礴','雄伟','史诗','浩瀚','远征','飞跃','epic','grand','majestic','soaring','ambitious','科技','未来','创新','前进','突破'],
    va: { valence: 0.2, arousal: 0.8 }
  },
  neutral_low: {
    words: ['深沉','沉思','冥想','内省','深邃','神秘','空灵','虚幻','deep','meditative','mysterious','ethereal','contemplative','禅意','古风','悠远','缥缈'],
    va: { valence: 0.0, arousal: -0.5 }
  },
};

// ---- Music Library (from old config.js + new data/music.ts) ----
export const EXTENDED_MUSIC_LIBRARY: LibraryMatch[] = [
  // Happy
  { id: 'lib001', title: '阳光步道', artist: 'Whispering Woods', mood: 'happy', valence: 0.75, arousal: 0.65, bpm: 128, energy: 0.8, mode: 'major', duration: 180, genre: 'pop', license: '授权可商用', score: 0 },
  { id: 'lib002', title: '跃动节拍', artist: 'Neon Pulse', mood: 'happy', valence: 0.80, arousal: 0.70, bpm: 140, energy: 0.85, mode: 'major', duration: 165, genre: 'electronic', license: '授权可商用', score: 0 },
  { id: 'lib003', title: '微风晨光', artist: 'Café Acoustics', mood: 'happy', valence: 0.70, arousal: 0.50, bpm: 110, energy: 0.6, mode: 'major', duration: 200, genre: 'acoustic', license: '授权可商用', score: 0 },
  // Calm
  { id: 'lib004', title: '湖面如镜', artist: 'Tranquil Tones', mood: 'calm', valence: 0.75, arousal: 0.15, bpm: 65, energy: 0.15, mode: 'major', duration: 240, genre: 'ambient', license: '授权可商用', score: 0 },
  { id: 'lib005', title: '星河低语', artist: 'Soft Horizon', mood: 'calm', valence: 0.70, arousal: 0.10, bpm: 60, energy: 0.1, mode: 'major', duration: 300, genre: 'ambient', license: '授权可商用', score: 0 },
  { id: 'lib006', title: '午后阳光', artist: 'Jazz Collective', mood: 'warm', valence: 0.65, arousal: 0.25, bpm: 78, energy: 0.25, mode: 'major', duration: 195, genre: 'jazz', license: '授权可商用', score: 0 },
  // Sad
  { id: 'lib007', title: '秋叶飘零', artist: 'Classical Ensemble', mood: 'sad', valence: 0.20, arousal: 0.20, bpm: 55, energy: 0.15, mode: 'minor', duration: 220, genre: 'classical', license: '授权可商用', score: 0 },
  { id: 'lib008', title: '雨夜沉思', artist: 'Piano Solo', mood: 'sad', valence: 0.15, arousal: 0.25, bpm: 60, energy: 0.2, mode: 'minor', duration: 260, genre: 'piano', license: '授权可商用', score: 0 },
  { id: 'lib009', title: '深海幽蓝', artist: 'Tranquil Tones', mood: 'somber', valence: 0.30, arousal: 0.35, bpm: 70, energy: 0.35, mode: 'minor', duration: 210, genre: 'ambient', license: '授权可商用', score: 0 },
  // Triumphant
  { id: 'lib010', title: '冲锋号角', artist: 'Orchestral Works', mood: 'triumphant', valence: 0.55, arousal: 0.80, bpm: 135, energy: 0.9, mode: 'major', duration: 150, genre: 'orchestral', license: '授权可商用', score: 0 },
  { id: 'lib011', title: '日出东方', artist: 'Cinematic Sound', mood: 'triumphant', valence: 0.60, arousal: 0.75, bpm: 120, energy: 0.8, mode: 'major', duration: 175, genre: 'cinematic', license: '授权可商用', score: 0 },
  { id: 'lib012', title: '逐梦飞翔', artist: 'Pop Ensemble', mood: 'triumphant', valence: 0.50, arousal: 0.70, bpm: 125, energy: 0.75, mode: 'major', duration: 190, genre: 'pop', license: '授权可商用', score: 0 },
  // Tense
  { id: 'lib013', title: '暗流涌动', artist: 'Electronic Lab', mood: 'tense', valence: 0.25, arousal: 0.75, bpm: 115, energy: 0.85, mode: 'minor', duration: 140, genre: 'electronic', license: '授权可商用', score: 0 },
  { id: 'lib014', title: '风暴前夕', artist: 'Orchestral Works', mood: 'tense', valence: 0.20, arousal: 0.80, bpm: 130, energy: 0.9, mode: 'minor', duration: 155, genre: 'orchestral', license: '授权可商用', score: 0 },
  // Gentle
  { id: 'lib015', title: '竹林听雨', artist: 'Traditional Ensemble', mood: 'gentle', valence: 0.50, arousal: 0.10, bpm: 50, energy: 0.1, mode: 'major', duration: 280, genre: 'traditional', license: '授权可商用', score: 0 },
  { id: 'lib016', title: '茶香袅袅', artist: 'Acoustic Trio', mood: 'gentle', valence: 0.45, arousal: 0.15, bpm: 55, energy: 0.12, mode: 'major', duration: 260, genre: 'acoustic', license: '授权可商用', score: 0 },
  // Warm
  { id: 'lib017', title: '家的味道', artist: 'Folk Ensemble', mood: 'warm', valence: 0.70, arousal: 0.30, bpm: 82, energy: 0.3, mode: 'major', duration: 200, genre: 'acoustic', license: '授权可商用', score: 0 },
  { id: 'lib018', title: '旧时光', artist: 'Vintage Band', mood: 'warm', valence: 0.60, arousal: 0.25, bpm: 75, energy: 0.25, mode: 'major', duration: 220, genre: 'folk', license: '授权可商用', score: 0 },
  // Somber
  { id: 'lib019', title: '千年回响', artist: 'World Ensemble', mood: 'somber', valence: 0.30, arousal: 0.45, bpm: 80, energy: 0.45, mode: 'minor', duration: 230, genre: 'world', license: '授权可商用', score: 0 },
  { id: 'lib020', title: '时光隧道', artist: 'Ambient Works', mood: 'somber', valence: 0.25, arousal: 0.40, bpm: 75, energy: 0.4, mode: 'minor', duration: 240, genre: 'ambient', license: '授权可商用', score: 0 },
];

// ---- Core Algorithms ----

function randomInRange(range: [number, number]): number {
  return Math.round(range[0] + Math.random() * (range[1] - range[0]));
}

export function analyzeText(text: string): TextAnalysis {
  if (!text) return { valence: 0, arousal: 0, keywords: [], moodLabel: 'calm' };
  const lower = text.toLowerCase();
  let totalValence = 0, totalArousal = 0, matchCount = 0;
  const matchedWords: string[] = [];
  let dominantCategory = '', maxCategoryScore = 0;

  for (const [category, data] of Object.entries(SENTIMENT_LEXICON)) {
    let catScore = 0;
    for (const word of data.words) {
      if (lower.includes(word.toLowerCase())) { catScore++; matchedWords.push(word); }
    }
    if (catScore > maxCategoryScore) { maxCategoryScore = catScore; dominantCategory = category; }
    const weight = catScore / Math.max(data.words.length, 1);
    totalValence += data.va.valence * weight;
    totalArousal += data.va.arousal * weight;
    matchCount += weight;
  }

  if (matchCount === 0) return { valence: 0, arousal: 0, keywords: [], moodLabel: 'calm' };
  const avgValence = totalValence / matchCount;
  const avgArousal = totalArousal / matchCount;
  const moodLabel = findNearestMood(avgValence, avgArousal);

  return { valence: Math.round(avgValence * 100) / 100, arousal: Math.round(avgArousal * 100) / 100, keywords: [...new Set(matchedWords)], moodLabel };
}

function findNearestMood(v: number, a: number): string {
  let minDist = Infinity, nearest = 'calm';
  for (const [key, region] of Object.entries(MOOD_REGIONS)) {
    const dist = Math.sqrt((v - region.valence) ** 2 + (a - region.arousal) ** 2);
    if (dist < minDist) { minDist = dist; nearest = key; }
  }
  return nearest;
}

export function moodToMusicParams(moodLabel: string): MusicParams {
  const region = MOOD_REGIONS[moodLabel] || MOOD_REGIONS.calm;
  return {
    mood: moodLabel,
    moodLabel: region.label,
    moodLabelZh: region.labelZh,
    description: region.desc,
    bpm: randomInRange(region.bpm),
    energy: region.energy,
    mode: region.mode,
    valence: region.valence,
    arousal: region.arousal,
    danceability: Math.min(1, Math.max(0, (region.bpm[0] / 200) + 0.2)),
    acousticness: region.energy < 0.4 ? 0.7 : 0.3,
    instrumentalness: 0.6,
    loudness: -20 + (region.energy * 15),
  };
}

export function matchFromLibrary(musicParams: MusicParams, topN = 5): LibraryMatch[] {
  return EXTENDED_MUSIC_LIBRARY
    .map(track => {
      const vaDist = Math.sqrt((track.valence - (musicParams.valence + 1) / 2) ** 2 + (track.arousal - (musicParams.arousal + 1) / 2) ** 2);
      const bpmDiff = Math.abs(track.bpm - musicParams.bpm) / 200;
      const score = 1 - (vaDist * 0.6 + bpmDiff * 0.4);
      return { ...track, score: Math.round(score * 100) / 100 };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .filter(t => t.score > 0.2);
}

export function buildAIPrompt(text: string, musicParams: MusicParams): AIPrompt {
  const region = MOOD_REGIONS[musicParams.mood] || MOOD_REGIONS.calm;
  return {
    prompt: `Generate ${musicParams.mode} mode background music, mood: ${musicParams.moodLabel}, ${region.desc}. Tempo around ${musicParams.bpm} BPM, energy level ${Math.round(musicParams.energy * 10)}/10. Suitable for: ${text.substring(0, 100)}`,
    parameters: { genre: 'ambient', mood: musicParams.mood, tempo: musicParams.bpm, energy: musicParams.energy, mode: musicParams.mode, duration: 120, format: 'mp3' },
  };
}

export function buildSynthesisParams(musicParams: MusicParams): SynthesisParams {
  const region = MOOD_REGIONS[musicParams.mood] || MOOD_REGIONS.calm;
  const recipes: Record<string, any> = {
    happy: { waveform: 'sine', harmonics: [1, 0.5, 0.25, 0.1], lfoRate: 0.3, filter: 'lowpass', filterFreq: 1200, reverb: 0.2 },
    calm: { waveform: 'sine', harmonics: [1, 0.3, 0.1], lfoRate: 0.1, filter: 'lowpass', filterFreq: 500, reverb: 0.5 },
    tense: { waveform: 'sawtooth', harmonics: [1, 0.7, 0.4, 0.2], lfoRate: 0.6, filter: 'bandpass', filterFreq: 1500, reverb: 0.1 },
    sad: { waveform: 'triangle', harmonics: [1, 0.4, 0.15], lfoRate: 0.08, filter: 'lowpass', filterFreq: 400, reverb: 0.6 },
    warm: { waveform: 'sine', harmonics: [1, 0.4, 0.2], lfoRate: 0.15, filter: 'lowpass', filterFreq: 700, reverb: 0.3 },
    somber: { waveform: 'triangle', harmonics: [1, 0.5, 0.2, 0.05], lfoRate: 0.12, filter: 'lowpass', filterFreq: 350, reverb: 0.4 },
    triumphant: { waveform: 'sawtooth', harmonics: [1, 0.6, 0.3, 0.15], lfoRate: 0.4, filter: 'bandpass', filterFreq: 2000, reverb: 0.3 },
    gentle: { waveform: 'sine', harmonics: [1, 0.25, 0.05], lfoRate: 0.05, filter: 'lowpass', filterFreq: 300, reverb: 0.7 },
  };
  const recipe = recipes[musicParams.mood] || recipes.calm;
  return {
    type: 'webaudio-synthesis',
    parameters: { ...recipe, bpm: musicParams.bpm, duration: 30, noteDensity: musicParams.energy > 0.6 ? 'dense' : 'sparse', arpeggiated: musicParams.energy > 0.5, octaveRange: musicParams.energy > 0.6 ? 3 : 2 },
    description: `前端实时合成 · ${region.labelZh}风格 · ${musicParams.bpm}BPM · ${recipe.waveform}波形`,
    copyright: '100% 自持 · 浏览器端实时生成',
  };
}

export function recommend(text: string): MusicRecommendation {
  const textAnalysis = analyzeText(text);
  const musicParams = moodToMusicParams(textAnalysis.moodLabel);
  return {
    textAnalysis,
    musicParams,
    libraryMatches: matchFromLibrary(musicParams),
    aiPrompt: buildAIPrompt(text, musicParams),
    synthesisParams: buildSynthesisParams(musicParams),
  };
}
