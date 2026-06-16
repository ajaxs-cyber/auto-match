/**
 * 智能建站平台 - 后端 API 服务
 *
 * 启动方式：
 *   1. cp .env.example .env  并填入你的 API Key
 *   2. npm start
 *
 * 无 API Key 时自动使用本地算法兜底
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3001;

// ---- 中间件 ----
app.use(cors());
app.use(express.json({ limit: '5mb' }));
app.use(express.static(path.join(__dirname, '..'))); // 服务前端静态文件

// ---- 路由 ----
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/music', require('./routes/music'));
app.use('/api/config', require('./routes/config'));

// ---- 健康检查 ----
app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    hasOpenAI: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-key-here'),
    timestamp: new Date().toISOString()
  });
});

// ---- 错误处理 ----
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

// ---- 启动 ----
app.listen(PORT, () => {
  console.log(`
╔══════════════════════════════════════════════════╗
║        智能建站平台 - API 服务已启动              ║
╠══════════════════════════════════════════════════╣
║  后端地址:  http://localhost:${PORT}              ║
║  前端地址:  http://localhost:${PORT}/index.html   ║
║  API Key:   ${process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-key-here' ? '已配置 ✓' : '未配置 (使用本地算法)'} ║
╚══════════════════════════════════════════════════╝
  `);
});
