/**
 * ============================================================
 * 音乐推荐引擎 — 基于 Thayer 情绪模型 + MIR 参数标准
 *
 * 参考依据：
 *   Thayer, R.E. (1989). The Biopsychology of Mood and Arousal
 *   Russell, J.A. (1980). A Circumplex Model of Affect
 *   Spotify Web API — Audio Features 文档
 *   MIREX — Mood Classification 任务标准
 *
 * 工作流：
 *   文本 → 情绪分析 → Valence-Arousal 映射 →
 *    → [曲库匹配 / AI 生成提示词 / 前端合成参数]
 * ============================================================
 */

const MusicRecommender = {

  // ---- Thayer VA 平面情绪区域定义 ----
  // valence: -1(负面) ~ +1(正面)
  // arousal: -1(低唤醒) ~ +1(高唤醒)
  MOOD_REGIONS: {
    // 高唤醒 + 正面 = 欢快/兴奋
    happy:       { label: '欢快', valence: 0.7,  arousal: 0.6,  bpm: [120, 160], energy: 0.8, mode: 'major', desc: '明亮、快节奏、积极' },
    // 高唤醒 + 负面 = 紧张/愤怒
    tense:       { label: '紧张', valence: -0.6, arousal: 0.7,  bpm: [100, 140], energy: 0.9, mode: 'minor', desc: '激烈、不协和、冲击感' },
    // 低唤醒 + 正面 = 平静/放松
    calm:        { label: '平静', valence: 0.7,  arousal: -0.6, bpm: [50, 80],   energy: 0.2, mode: 'major', desc: '舒缓、柔和、空间感' },
    // 低唤醒 + 负面 = 忧郁/悲伤
    sad:         { label: '忧郁', valence: -0.6, arousal: -0.5, bpm: [40, 70],   energy: 0.2, mode: 'minor', desc: '低沉、缓慢、暗淡' },
    // 中唤醒 + 正面 = 温馨
    warm:        { label: '温馨', valence: 0.5,  arousal: -0.2, bpm: [65, 90],   energy: 0.4, mode: 'major', desc: '温暖、亲切、中速' },
    // 中唤醒 + 负面 = 深沉
    somber:      { label: '深沉', valence: -0.4, arousal: 0.1,  bpm: [60, 85],   energy: 0.5, mode: 'minor', desc: '厚重、沉思、低沉' },
    // 高唤醒 + 正中 = 激昂
    triumphant:  { label: '激昂', valence: 0.3,  arousal: 0.8,  bpm: [110, 150], energy: 0.85, mode: 'major', desc: '壮丽、宏大、推进感' },
    // 低唤醒 + 正中 = 淡雅
    gentle:      { label: '淡雅', valence: 0.3,  arousal: -0.7, bpm: [45, 65],   energy: 0.15, mode: 'major', desc: '轻盈、简约、清澈' }
  },

  // ---- 情绪关键词映射表 ----
  // 用于从文本中提取情绪信号
  SENTIMENT_LEXICON: {
    // 正面高唤醒
    positive_high: {
      words: ['快乐', '兴奋', '激动', '喜悦', '狂欢', '热烈', '振奋', '庆祝', '成功', '胜利',
              'happy', 'excited', 'joyful', 'celebrate', 'triumph', 'passionate', 'energetic',
              '朝气', '活力', '澎湃', '昂扬', '辉煌'],
      va: { valence: 0.7, arousal: 0.7 }
    },
    // 正面低唤醒
    positive_low: {
      words: ['平静', '安宁', '放松', '舒适', '温馨', '温暖', '宁静', '祥和', '惬意', '悠然',
              'calm', 'peaceful', 'relaxed', 'serene', 'gentle', 'tranquil', 'cozy',
              '淡雅', '闲适', '柔美', '静谧', '舒缓'],
      va: { valence: 0.7, arousal: -0.6 }
    },
    // 负面高唤醒
    negative_high: {
      words: ['愤怒', '紧张', '焦虑', '恐惧', '恐慌', '激烈', '冲突', '危机', '暴躁', '不安',
              'angry', 'tense', 'anxious', 'fear', 'panic', 'aggressive', 'frantic',
              '紧迫', '危急', '震撼', '压抑'],
      va: { valence: -0.6, arousal: 0.7 }
    },
    // 负面低唤醒
    negative_low: {
      words: ['悲伤', '忧郁', '孤独', '失落', '哀伤', '沉痛', '凄凉', '沮丧', '绝望', '沉重',
              'sad', 'melancholy', 'lonely', 'gloomy', 'mournful', 'hopeless', 'despair',
              '沧桑', '感伤', '凄美', '暗淡'],
      va: { valence: -0.6, arousal: -0.5 }
    },
    // 中立高唤醒
    neutral_high: {
      words: ['震撼', '宏大', '壮丽', '磅礴', '雄伟', '史诗', '浩瀚', '远征', '飞跃',
              'epic', 'grand', 'majestic', 'soaring', 'ambitious',
              '科技', '未来', '创新', '前进', '突破'],
      va: { valence: 0.2, arousal: 0.8 }
    },
    // 中立低唤醒
    neutral_low: {
      words: ['深沉', '沉思', '冥想', '内省', '深邃', '神秘', '空灵', '虚幻',
              'deep', 'meditative', 'mysterious', 'ethereal', 'contemplative',
              '禅意', '古风', '悠远', '缥缈'],
      va: { valence: 0.0, arousal: -0.5 }
    }
  },

  // ---- MIR 音频特征参数标准 ----
  // 参考 Spotify Audio Features + MIREX 标准
  AUDIO_FEATURES: {
    acousticness:  { range: [0, 1], unit: 'score', desc: '声学原声程度' },
    danceability:  { range: [0, 1], unit: 'score', desc: '舞蹈适宜性' },
    energy:        { range: [0, 1], unit: 'score', desc: '能量/强度' },
    instrumentalness: { range: [0, 1], unit: 'score', desc: '器乐程度' },
    valence:       { range: [0, 1], unit: 'score', desc: '音乐正向性 (快乐vs悲伤)' },
    tempo:         { range: [0, 250], unit: 'BPM', desc: '速度' },
    mode:          { values: ['major', 'minor'], desc: '调式' },
    key:           { values: ['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'], desc: '调性' },
    loudness:      { range: [-60, 0], unit: 'dB', desc: '响度' },
    speechiness:   { range: [0, 1], unit: 'score', desc: '语音含量' }
  },

  // ================================================================
  // 核心算法：文本 → 音乐推荐
  // ================================================================

  /**
   * 1. 文本分析：提取情绪特征
   * @param {string} text - 用户输入文本
   * @returns {{ valence: number, arousal: number, keywords: string[], moodLabel: string }}
   */
  analyzeText(text) {
    if (!text) return { valence: 0, arousal: 0, keywords: [], moodLabel: 'neutral' };

    const lower = text.toLowerCase();
    let totalValence = 0;
    let totalArousal = 0;
    let matchCount = 0;
    const matchedWords = [];
    let dominantCategory = null;
    let maxCategoryScore = 0;

    for (const [category, data] of Object.entries(this.SENTIMENT_LEXICON)) {
      let catScore = 0;
      for (const word of data.words) {
        if (lower.includes(word.toLowerCase())) {
          catScore++;
          matchedWords.push(word);
        }
      }
      if (catScore > maxCategoryScore) {
        maxCategoryScore = catScore;
        dominantCategory = category;
      }
      // 加权累计
      const weight = catScore / Math.max(data.words.length, 1);
      totalValence += data.va.valence * weight;
      totalArousal += data.va.arousal * weight;
      matchCount += weight;
    }

    // 如果无匹配，使用中性默认值
    if (matchCount === 0) {
      return { valence: 0, arousal: 0, keywords: [], moodLabel: 'neutral' };
    }

    const avgValence = totalValence / matchCount;
    const avgArousal = totalArousal / matchCount;

    // 找到最近的 VA 区域
    const moodLabel = this.findNearestMood(avgValence, avgArousal);

    return {
      valence: Math.round(avgValence * 100) / 100,
      arousal: Math.round(avgArousal * 100) / 100,
      keywords: [...new Set(matchedWords)],
      moodLabel
    };
  },

  /**
   * 2. 在 VA 平面上找最近的 mood region（欧氏距离）
   * @param {number} v - valence
   * @param {number} a - arousal
   * @returns {string} mood key
   */
  findNearestMood(v, a) {
    let minDist = Infinity;
    let nearest = 'calm';
    for (const [key, region] of Object.entries(this.MOOD_REGIONS)) {
      const dist = Math.sqrt((v - region.valence) ** 2 + (a - region.arousal) ** 2);
      if (dist < minDist) {
        minDist = dist;
        nearest = key;
      }
    }
    return nearest;
  },

  /**
   * 3. 从情绪得到音乐参数
   * @param {string} moodLabel
   * @returns {object} 音乐参数
   */
  moodToMusicParams(moodLabel) {
    const region = this.MOOD_REGIONS[moodLabel];
    if (!region) return this.MOOD_REGIONS.calm;

    return {
      mood: moodLabel,
      moodLabel: region.label,
      description: region.desc,
      bpm: this.randomInRange(region.bpm),
      energy: region.energy,
      mode: region.mode,
      valence: region.valence,
      arousal: region.arousal,
      // 推导参数
      danceability: Math.min(1, Math.max(0, (region.bpm[0] / 200) + 0.2)),
      acousticness: region.energy < 0.4 ? 0.7 : 0.3,
      instrumentalness: 0.6,
      loudness: -20 + (region.energy * 15)
    };
  },

  /**
   * 4. 完整推荐管线：文本 → 三条推荐路径
   * @param {string} text
   * @returns {{ textAnalysis, musicParams, libraryMatches, aiPrompt, synthesisParams }}
   */
  recommend(text) {
    // Step 1: 文本分析
    const textAnalysis = this.analyzeText(text);

    // Step 2: 音乐参数
    const musicParams = this.moodToMusicParams(textAnalysis.moodLabel);

    // Step 3: 三条路径
    return {
      textAnalysis,
      musicParams,
      libraryMatches: this.matchFromLibrary(musicParams),
      aiPrompt: this.buildAIPrompt(text, musicParams),
      synthesisParams: this.buildSynthesisParams(musicParams)
    };
  },

  /**
   * 5. 从曲库匹配（基于 VA 距离 + BPM 相似度）
   */
  matchFromLibrary(musicParams, topN = 5) {
    const tracks = MUSIC_LIBRARY || [];
    const scored = tracks.map(track => {
      const vaDist = Math.sqrt(
        (track.valence - (musicParams.valence + 1) / 2) ** 2 +
        (track.arousal - (musicParams.arousal + 1) / 2) ** 2
      );
      const bpmDiff = Math.abs(track.bpm - musicParams.bpm) / 200;
      const score = 1 - (vaDist * 0.6 + bpmDiff * 0.4);
      return { ...track, score: Math.round(score * 100) / 100 };
    });

    return scored
      .sort((a, b) => b.score - a.score)
      .slice(0, topN)
      .filter(t => t.score > 0.2);
  },

  /**
   * 6. 构建 AI 生成提示词
   */
  buildAIPrompt(text, musicParams) {
    const region = this.MOOD_REGIONS[musicParams.mood];
    return {
      prompt: `Generate ${musicParams.mode} mode background music, mood: ${musicParams.moodLabel}, ${region.desc}. Tempo around ${musicParams.bpm} BPM, energy level ${Math.round(musicParams.energy * 10)}/10. Suitable for: ${text.substring(0, 100)}`,
      parameters: {
        genre: 'ambient',
        mood: musicParams.mood,
        tempo: musicParams.bpm,
        energy: musicParams.energy,
        mode: musicParams.mode,
        duration: 120,
        format: 'mp3'
      }
    };
  },

  /**
   * 7. 前端合成参数（Web Audio API）
   */
  buildSynthesisParams(musicParams) {
    const region = this.MOOD_REGIONS[musicParams.mood];
    const recipes = {
      happy:    { waveform: 'sine', harmonics: [1, 0.5, 0.25, 0.1],     lfoRate: 0.3, filter: 'lowpass', filterFreq: 1200, reverb: 0.2 },
      calm:     { waveform: 'sine', harmonics: [1, 0.3, 0.1],           lfoRate: 0.1, filter: 'lowpass', filterFreq: 500,  reverb: 0.5 },
      tense:    { waveform: 'sawtooth', harmonics: [1, 0.7, 0.4, 0.2], lfoRate: 0.6, filter: 'bandpass', filterFreq: 1500, reverb: 0.1 },
      sad:      { waveform: 'triangle', harmonics: [1, 0.4, 0.15],      lfoRate: 0.08, filter: 'lowpass', filterFreq: 400, reverb: 0.6 },
      warm:     { waveform: 'sine', harmonics: [1, 0.4, 0.2],           lfoRate: 0.15, filter: 'lowpass', filterFreq: 700, reverb: 0.3 },
      somber:   { waveform: 'triangle', harmonics: [1, 0.5, 0.2, 0.05], lfoRate: 0.12, filter: 'lowpass', filterFreq: 350, reverb: 0.4 },
      triumphant: { waveform: 'sawtooth', harmonics: [1, 0.6, 0.3, 0.15], lfoRate: 0.4, filter: 'bandpass', filterFreq: 2000, reverb: 0.3 },
      gentle:   { waveform: 'sine', harmonics: [1, 0.25, 0.05],         lfoRate: 0.05, filter: 'lowpass', filterFreq: 300, reverb: 0.7 }
    };

    const recipe = recipes[musicParams.mood] || recipes.calm;

    return {
      type: 'webaudio-synthesis',
      parameters: {
        ...recipe,
        bpm: musicParams.bpm,
        duration: 30,
        noteDensity: musicParams.energy > 0.6 ? 'dense' : 'sparse',
        arpeggiated: musicParams.energy > 0.5,
        octaveRange: musicParams.energy > 0.6 ? 3 : 2
      },
      description: `前端实时合成 · ${region.label}风格 · ${musicParams.bpm}BPM · ${recipe.waveform}波形`,
      copyright: '100% 自持 · 浏览器端实时生成 · 不落盘 · 无需外部依赖'
    };
  },

  // ---- 辅助工具 ----
  randomInRange(range) {
    return Math.round(range[0] + Math.random() * (range[1] - range[0]));
  },

  esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }
};
