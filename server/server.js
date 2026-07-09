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

// 服务 React 构建产物
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));

// SPA fallback：非 API 路径统一返回 React index.html
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

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
  const distExists = require('fs').existsSync(distPath);
  console.log(`
╔══════════════════════════════════════════════════╗
║         AutoMatch - API 服务已启动               ║
╠══════════════════════════════════════════════════╣
║  后端地址:  http://localhost:${PORT}              ║
║  前端构建:  ${distExists ? 'dist/ 已就绪 ✓' : '❌ dist/ 不存在！请先运行 npm run build'} ║
║  API Key:   ${process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-key-here' ? '已配置 ✓' : '未配置 (使用本地算法)'} ║
╚══════════════════════════════════════════════════╝
  `);
});
