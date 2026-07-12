/**
 * AutoMatch - 后端 API 服务
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;

// ---- 安装 server 依赖 ----
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  const { execSync } = require('child_process');
  console.log('安装 server 依赖...');
  execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
}

// ---- 中间件 ----
app.use(cors());
app.use(express.json({ limit: '5mb' }));

// 服务 React 构建产物
const distPath = path.join(__dirname, '..', 'dist');
app.use(express.static(distPath));
app.get(/^\/(?!api\/).*/, (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

// ---- API 路由 ----
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/music', require('./routes/music'));
app.use('/api/config', require('./routes/config'));
app.use('/api/auth', require('./routes/auth'));

app.get('/api/status', (req, res) => {
  const hasAI = !!(process.env.DEEPSEEK_API_KEY || (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-key-here'));
  res.json({
    status: 'running',
    hasOpenAI: hasAI,  // 兼容前端字段名
    aiProvider: process.env.DEEPSEEK_API_KEY ? 'DeepSeek' : (process.env.OPENAI_API_KEY ? 'OpenAI' : 'local'),
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
  const hasAI = !!(process.env.DEEPSEEK_API_KEY || process.env.OPENAI_API_KEY);
  console.log(`AutoMatch 已启动 :${PORT} | dist/ 已就绪 | AI: ${hasAI ? '✓ DeepSeek' : '本地算法'}`);
});
