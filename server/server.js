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

app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    hasOpenAI: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-key-here'),
    timestamp: new Date().toISOString()
  });
});

app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ error: '服务器内部错误' });
});

app.listen(PORT, () => {
  console.log(`AutoMatch 已启动 :${PORT} | dist/ 已就绪 | AI: ${process.env.OPENAI_API_KEY ? '✓' : '本地算法'}`);
});
