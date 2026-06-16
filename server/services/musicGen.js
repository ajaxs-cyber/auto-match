/**
 * 音乐生成服务
 * 对接外部 AI 音乐 API（Mubert / Soundraw / AIVA）
 * 无 API Key 时返回模拟数据
 */
require('dotenv').config();

const MUBERT_KEY = process.env.MUBERT_API_KEY;
const SOUNDRAW_KEY = process.env.SOUNDRAW_API_KEY;

/**
 * 生成音乐
 * @param {object} params - { mood, bpm, energy, mode, duration }
 * @returns {object} { type, url, title, ... }
 */
async function generateMusic(params) {
  const { mood, bpm, energy, mode, duration = 60 } = params;

  // 如果有 Mubert API Key，调真实接口
  if (MUBERT_KEY) {
    return generateViaMubert({ mood, bpm, energy, duration });
  }

  // 否则返回模拟响应
  return mockGenerate({ mood, bpm, energy, mode, duration });
}

/**
 * Mubert API 接入
 * 文档：https://mubert.com/api
 */
async function generateViaMubert(params) {
  try {
    const response = await fetch('https://api.mubert.com/v2/tts/generate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${MUBERT_KEY}`
      },
      body: JSON.stringify({
        mood: params.mood,
        tempo: params.bpm,
        duration_seconds: params.duration
      })
    });

    if (!response.ok) {
      throw new Error(`Mubert API error: ${response.status}`);
    }

    const data = await response.json();
    return {
      type: 'mubert',
      url: data.audio_url || data.data?.url,
      title: `AI Generated (${params.mood})`,
      duration: params.duration,
      bpm: params.bpm,
      license: '按 Mubert 许可协议使用'
    };
  } catch (e) {
    console.error('Mubert generation failed:', e.message);
    return mockGenerate(params);
  }
}

/**
 * 模拟生成（开发/演示用）
 */
function mockGenerate(params) {
  const moodTitles = {
    happy: '阳光旋律', tense: '暗流涌动', calm: '宁静致远',
    sad: '忧伤序曲', warm: '暖阳', somber: '沉思',
    triumphant: '英雄之旅', gentle: '微风'
  };

  const filename = `ai-${params.mood}-${Date.now()}.mp3`;

  return {
    type: 'mock',
    title: `AI 生成 · ${moodTitles[params.mood] || '自定义'} (模拟)`,
    url: null,  // 真实场景下返回可播放 URL
    duration: params.duration || 60,
    bpm: params.bpm,
    energy: params.energy,
    mode: params.mode || 'major',
    format: 'mp3',
    license: '100% AI 生成，版权归平台所有',
    mockNote: '此为模拟响应。接入 Mubert/Soundraw API 后返回真实音频 URL',
    // 返回一个可播放的 Web Audio API 合成 Recipe
    synthesisRecipe: {
      waveform: params.energy > 0.6 ? 'sawtooth' : 'sine',
      bpm: params.bpm,
      duration: params.duration,
      harmonics: [1, 0.5, 0.25],
      arpeggiated: params.energy > 0.5,
      noteDensity: params.energy > 0.6 ? 'dense' : 'sparse'
    }
  };
}

module.exports = { generateMusic };
