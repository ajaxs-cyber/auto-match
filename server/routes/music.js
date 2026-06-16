/**
 * 音乐推荐与生成 API 路由
 * POST /api/music/recommend — 文本→音乐推荐
 * POST /api/music/generate — 音乐生成
 * GET  /api/music/library  — 曲库列表
 */
const express = require('express');
const router = express.Router();
const { analyzeMood } = require('../services/llm');
const { generateMusic } = require('../services/musicGen');

// 曲库数据（与前端 MUSIC_LIBRARY 保持同步）
const MUSIC_LIBRARY = [
  { id: 'lib001', title: '阳光步道',   mood: 'happy',      valence: 0.75, arousal: 0.65, bpm: 128, energy: 0.8,  mode: 'major', duration: 180, genre: 'pop', license: '授权可商用' },
  { id: 'lib002', title: '跃动节拍',   mood: 'happy',      valence: 0.80, arousal: 0.70, bpm: 140, energy: 0.85, mode: 'major', duration: 165, genre: 'electronic', license: '授权可商用' },
  { id: 'lib003', title: '微风晨光',   mood: 'happy',      valence: 0.70, arousal: 0.50, bpm: 110, energy: 0.6,  mode: 'major', duration: 200, genre: 'acoustic', license: '授权可商用' },
  { id: 'lib004', title: '湖面如镜',   mood: 'calm',       valence: 0.75, arousal: 0.15, bpm: 65,  energy: 0.15, mode: 'major', duration: 240, genre: 'ambient', license: '授权可商用' },
  { id: 'lib005', title: '星河低语',   mood: 'calm',       valence: 0.70, arousal: 0.10, bpm: 60,  energy: 0.1,  mode: 'major', duration: 300, genre: 'ambient', license: '授权可商用' },
  { id: 'lib006', title: '午后阳光',   mood: 'warm',       valence: 0.65, arousal: 0.25, bpm: 78,  energy: 0.25, mode: 'major', duration: 195, genre: 'jazz', license: '授权可商用' },
  { id: 'lib007', title: '秋叶飘零',   mood: 'sad',        valence: 0.20, arousal: 0.20, bpm: 55,  energy: 0.15, mode: 'minor', duration: 220, genre: 'classical', license: '授权可商用' },
  { id: 'lib008', title: '雨夜沉思',   mood: 'sad',        valence: 0.15, arousal: 0.25, bpm: 60,  energy: 0.2,  mode: 'minor', duration: 260, genre: 'piano', license: '授权可商用' },
  { id: 'lib009', title: '深海幽蓝',   mood: 'somber',     valence: 0.30, arousal: 0.35, bpm: 70,  energy: 0.35, mode: 'minor', duration: 210, genre: 'ambient', license: '授权可商用' },
  { id: 'lib010', title: '冲锋号角',   mood: 'triumphant', valence: 0.55, arousal: 0.80, bpm: 135, energy: 0.9,  mode: 'major', duration: 150, genre: 'orchestral', license: '授权可商用' },
  { id: 'lib011', title: '日出东方',   mood: 'triumphant', valence: 0.60, arousal: 0.75, bpm: 120, energy: 0.8,  mode: 'major', duration: 175, genre: 'cinematic', license: '授权可商用' },
  { id: 'lib012', title: '逐梦飞翔',   mood: 'triumphant', valence: 0.50, arousal: 0.70, bpm: 125, energy: 0.75, mode: 'major', duration: 190, genre: 'pop', license: '授权可商用' },
  { id: 'lib013', title: '暗流涌动',   mood: 'tense',      valence: 0.25, arousal: 0.75, bpm: 115, energy: 0.85, mode: 'minor', duration: 140, genre: 'electronic', license: '授权可商用' },
  { id: 'lib014', title: '风暴前夕',   mood: 'tense',      valence: 0.20, arousal: 0.80, bpm: 130, energy: 0.9,  mode: 'minor', duration: 155, genre: 'orchestral', license: '授权可商用' },
  { id: 'lib015', title: '竹林听雨',   mood: 'gentle',     valence: 0.50, arousal: 0.10, bpm: 50,  energy: 0.1,  mode: 'major', duration: 280, genre: 'traditional', license: '授权可商用' },
  { id: 'lib016', title: '茶香袅袅',   mood: 'gentle',     valence: 0.45, arousal: 0.15, bpm: 55,  energy: 0.12, mode: 'major', duration: 260, genre: 'acoustic', license: '授权可商用' },
  { id: 'lib017', title: '家的味道',   mood: 'warm',       valence: 0.70, arousal: 0.30, bpm: 82,  energy: 0.3,  mode: 'major', duration: 200, genre: 'acoustic', license: '授权可商用' },
  { id: 'lib018', title: '旧时光',     mood: 'warm',       valence: 0.60, arousal: 0.25, bpm: 75,  energy: 0.25, mode: 'major', duration: 220, genre: 'folk', license: '授权可商用' },
  { id: 'lib019', title: '千年回响',   mood: 'somber',     valence: 0.30, arousal: 0.45, bpm: 80,  energy: 0.45, mode: 'minor', duration: 230, genre: 'world', license: '授权可商用' },
  { id: 'lib020', title: '时光隧道',   mood: 'somber',     valence: 0.25, arousal: 0.40, bpm: 75,  energy: 0.4,  mode: 'minor', duration: 240, genre: 'ambient', license: '授权可商用' }
];

// 情绪区域（与前端 MusicRecommender.MOOD_REGIONS 同步）
const MOOD_REGIONS = {
  happy:       { label: '欢快', valence: 0.7,  arousal: 0.6,  bpm: [120, 160], energy: 0.8,  mode: 'major' },
  tense:       { label: '紧张', valence: -0.6, arousal: 0.7,  bpm: [100, 140], energy: 0.9,  mode: 'minor' },
  calm:        { label: '平静', valence: 0.7,  arousal: -0.6, bpm: [50, 80],   energy: 0.2,  mode: 'major' },
  sad:         { label: '忧郁', valence: -0.6, arousal: -0.5, bpm: [40, 70],   energy: 0.2,  mode: 'minor' },
  warm:        { label: '温馨', valence: 0.5,  arousal: -0.2, bpm: [65, 90],   energy: 0.4,  mode: 'major' },
  somber:      { label: '深沉', valence: -0.4, arousal: 0.1,  bpm: [60, 85],   energy: 0.5,  mode: 'minor' },
  triumphant:  { label: '激昂', valence: 0.3,  arousal: 0.8,  bpm: [110, 150], energy: 0.85, mode: 'major' },
  gentle:      { label: '淡雅', valence: 0.3,  arousal: -0.7, bpm: [45, 65],   energy: 0.15, mode: 'major' }
};

/**
 * 本地情绪分析（无 API Key 时用）
 */
function localMoodAnalysis(text) {
  const lexicon = {
    positive_high: { words: ['快乐', '兴奋', '激动', '喜悦', '热烈', 'happy', 'excited', 'joyful'], va: { valence: 0.7, arousal: 0.7 } },
    positive_low:  { words: ['平静', '安宁', '放松', '舒适', 'calm', 'peaceful', 'relaxed'], va: { valence: 0.7, arousal: -0.6 } },
    negative_high: { words: ['愤怒', '紧张', '焦虑', '恐惧', 'angry', 'tense', 'anxious'], va: { valence: -0.6, arousal: 0.7 } },
    negative_low:  { words: ['悲伤', '忧郁', '失落', 'sad', 'melancholy', 'lonely'], va: { valence: -0.6, arousal: -0.5 } },
    neutral_high:  { words: ['震撼', '宏大', '壮丽', 'epic', 'grand', 'majestic'], va: { valence: 0.2, arousal: 0.8 } },
    neutral_low:   { words: ['深沉', '冥想', '神秘', 'deep', 'meditative', 'mysterious'], va: { valence: 0.0, arousal: -0.5 } }
  };

  const lower = text.toLowerCase();
  let totalV = 0, totalA = 0, count = 0;
  const matched = [];

  for (const cat of Object.values(lexicon)) {
    for (const word of cat.words) {
      if (lower.includes(word)) {
        totalV += cat.va.valence;
        totalA += cat.va.arousal;
        count++;
        matched.push(word);
      }
    }
  }

  const valence = count > 0 ? totalV / count : 0;
  const arousal = count > 0 ? totalA / count : 0;

  // 找最近的情绪区域
  let minDist = Infinity;
  let moodLabel = 'calm';
  for (const [key, region] of Object.entries(MOOD_REGIONS)) {
    const d = Math.sqrt((valence - region.valence) ** 2 + (arousal - region.arousal) ** 2);
    if (d < minDist) { minDist = d; moodLabel = key; }
  }

  return { valence, arousal, moodLabel, keywords: [...new Set(matched)] };
}

/**
 * 曲库匹配算法
 */
function matchFromLibrary(valence, arousal, bpm, topN = 5) {
  return MUSIC_LIBRARY.map(t => {
    const vaDist = Math.sqrt((t.valence - (valence + 1) / 2) ** 2 + (t.arousal - (arousal + 1) / 2) ** 2);
    const bpmDiff = Math.abs(t.bpm - bpm) / 200;
    const score = 1 - (vaDist * 0.6 + bpmDiff * 0.4);
    return { ...t, score: Math.round(score * 100) / 100 };
  })
    .sort((a, b) => b.score - a.score)
    .slice(0, topN)
    .filter(t => t.score > 0.2);
}

// ---- 路由 ----

// POST /api/music/recommend
router.post('/recommend', async (req, res) => {
  const { text } = req.body;
  if (!text || !text.trim()) {
    return res.status(400).json({ error: '请输入文字' });
  }

  try {
    let moodAnalysis;

    // 有 OpenAI Key 则用 AI 分析
    if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-key-here') {
      moodAnalysis = await analyzeMood(text);
    } else {
      moodAnalysis = localMoodAnalysis(text);
    }

    const { valence, arousal, moodLabel, keywords } = moodAnalysis;
    const region = MOOD_REGIONS[moodLabel] || MOOD_REGIONS.calm;

    // 音乐参数
    const bpm = Math.round(region.bpm[0] + Math.random() * (region.bpm[1] - region.bpm[0]));
    const musicParams = {
      mood: moodLabel,
      moodLabel: region.label,
      bpm,
      energy: region.energy,
      mode: region.mode,
      valence,
      arousal
    };

    // 曲库匹配
    const libraryMatches = matchFromLibrary(valence, arousal, bpm);

    // AI 生成提示词
    const aiPrompt = {
      prompt: `Generate ${region.mode} background music, mood: ${region.label}. Tempo around ${bpm} BPM, energy level ${Math.round(region.energy * 10)}/10. Suitable for: ${text.substring(0, 100)}`,
      parameters: { mood: moodLabel, tempo: bpm, energy: region.energy, mode: region.mode }
    };

    // 前端合成参数
    const recipeTypes = {
      happy: { waveform: 'sine', filter: 'lowpass', reverb: 0.2 },
      calm: { waveform: 'sine', filter: 'lowpass', reverb: 0.5 },
      tense: { waveform: 'sawtooth', filter: 'bandpass', reverb: 0.1 },
      sad: { waveform: 'triangle', filter: 'lowpass', reverb: 0.6 },
      warm: { waveform: 'sine', filter: 'lowpass', reverb: 0.3 },
      somber: { waveform: 'triangle', filter: 'lowpass', reverb: 0.4 },
      triumphant: { waveform: 'sawtooth', filter: 'bandpass', reverb: 0.3 },
      gentle: { waveform: 'sine', filter: 'lowpass', reverb: 0.7 }
    };

    const recipe = recipeTypes[moodLabel] || recipeTypes.calm;
    const synthesisParams = {
      type: 'webaudio-synthesis',
      parameters: { ...recipe, bpm, duration: 30, noteDensity: region.energy > 0.6 ? 'dense' : 'sparse' },
      description: `前端实时合成 · ${region.label}风格 · ${bpm}BPM`,
      copyright: '100% 自持 · 浏览器端实时生成'
    };

    res.json({
      textAnalysis: { valence, arousal, keywords, moodLabel },
      musicParams,
      libraryMatches,
      aiPrompt,
      synthesisParams
    });
  } catch (e) {
    console.error('Music recommend error:', e.message);
    res.status(500).json({ error: '推荐失败' });
  }
});

// POST /api/music/generate
router.post('/generate', async (req, res) => {
  const { mood, bpm, energy, mode, duration } = req.body;
  if (!mood) return res.status(400).json({ error: '缺少 mood 参数' });

  try {
    const result = await generateMusic({ mood, bpm, energy, mode, duration });
    res.json(result);
  } catch (e) {
    res.status(500).json({ error: '生成失败' });
  }
});

// GET /api/music/library
router.get('/library', (req, res) => {
  const { mood, limit } = req.query;
  let result = MUSIC_LIBRARY;
  if (mood) result = result.filter(t => t.mood === mood);
  if (limit) result = result.slice(0, parseInt(limit));
  res.json(result);
});

module.exports = router;
