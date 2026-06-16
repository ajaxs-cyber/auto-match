/**
 * POST /api/analyze
 * AI 网站结构分析
 */
const express = require('express');
const router = express.Router();
const { analyzeSite } = require('../services/llm');

router.post('/', async (req, res) => {
  const { text } = req.body;

  if (!text || !text.trim()) {
    return res.status(400).json({ error: '请输入关键词描述' });
  }

  // 检查是否有 API Key
  if (!process.env.OPENAI_API_KEY || process.env.OPENAI_API_KEY === 'sk-your-key-here') {
    // 无 Key：返回模拟分析（匹配现有前端逻辑）
    return res.json(require('../services/fallbackAnalyze')(text));
  }

  try {
    const analysis = await analyzeSite(text);
    res.json(analysis);
  } catch (e) {
    console.error('Analyze error:', e.message);
    // API 调用失败时回退到本地算法
    res.json(require('../services/fallbackAnalyze')(text));
  }
});

module.exports = router;
