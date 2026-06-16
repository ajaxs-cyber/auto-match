/**
 * LLM 服务 — 封装 OpenAI API 调用
 * 用于网站结构分析、文字情绪分析
 */
require('dotenv').config();
const OpenAI = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || 'dummy-key'
});

const MODEL = process.env.OPENAI_MODEL || 'gpt-4o';

/**
 * AI 分析建站关键词 → 网站结构建议
 * @param {string} text - 用户输入的关键词描述
 * @returns {object} { suggestion, industry, modules, template, colorScheme }
 */
async function analyzeSite(text) {
  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: `你是一个专业的网站架构师。分析用户的建站需求，返回 JSON 格式的网站结构建议。

可用模块类型：header(页头导航), hero(主视觉区), text(文本块), image(图片), imageText(图文混合), features(特点/服务), products(产品展示), pricing(价格表), team(团队成员), testimonials(客户评价), gallery(相册/作品集), contact(联系方式), button(按钮), divider(分隔线), map(地图), video(视频), footer(页脚)

可选模板：business(商务经典), creative(创意展示), landing(营销单页)

JSON 结构：
{
  "suggestion": "网站名称建议",
  "industry": "匹配的行业",
  "modules": ["header", "hero", ...模块类型数组],
  "template": "模板名称",
  "colorScheme": { "primary": "主色HEX", "accent": "强调色HEX" },
  "reasoning": "为什么推荐这个结构的简短说明"
}

要求：
- 模块数量 6-12 个，header 开头 footer 结尾
- 根据行业选择合适的配色（科技用蓝紫、餐饮用暖色、教育用蓝绿等）
- 返回纯 JSON，不要 markdown 包裹` },
      { role: 'user', content: text }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.7,
    max_tokens: 2000
  });

  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch (e) {
    // 如果解析失败，返回兜底结构
    return {
      suggestion: '我的网站',
      industry: '通用',
      modules: ['header', 'hero', 'text', 'features', 'contact', 'footer'],
      template: 'business',
      colorScheme: { primary: '#6366f1', accent: '#f59e0b' },
      reasoning: '自动生成失败，已使用默认配置'
    };
  }
}

/**
 * AI 情绪分析 → 音乐推荐参数
 * @param {string} text - 用户输入的文字
 * @returns {object} { valence, arousal, moodLabel, keywords, description }
 */
async function analyzeMood(text) {
  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      { role: 'system', content: `分析以下文字的情绪特征，返回 JSON。

JSON 结构：
{
  "valence": 0.5,       // -1 ~ 1，正向度
  "arousal": 0.3,       // -1 ~ 1，唤醒度
  "moodLabel": "calm",  // happy/tense/calm/sad/warm/somber/triumphant/gentle
  "keywords": ["关键词1", "关键词2"],
  "description": "情绪特征的简短描述"
}

注意：valence 和 arousal 要基于实际文本内容做有意义的分析。` },
      { role: 'user', content: text }
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 500
  });

  try {
    return JSON.parse(completion.choices[0].message.content);
  } catch (e) {
    return { valence: 0, arousal: 0, moodLabel: 'neutral', keywords: [], description: '分析失败' };
  }
}

module.exports = { analyzeSite, analyzeMood };
