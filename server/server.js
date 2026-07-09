/**
 * AutoMatch - 后端 API 服务
 * 启动时自动检测并构建前端，然后提供静态文件服务
 */
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const { execSync } = require('child_process');

const app = express();
const PORT = process.env.PORT || 3001;

// ---- 安装依赖 & 构建前端 ----
const distPath = path.join(__dirname, '..', 'dist');
const rootPath = path.join(__dirname, '..');

// 确保 server 自身依赖已安装
if (!fs.existsSync(path.join(__dirname, 'node_modules'))) {
  console.log('安装 server 依赖...');
  execSync('npm install', { cwd: __dirname, stdio: 'inherit' });
}

if (!fs.existsSync(distPath)) {
  console.log('dist/ 不存在，正在构建前端...');
  try {
    execSync('npm install', { cwd: rootPath, stdio: 'inherit' });
    execSync('npx vite build', { cwd: rootPath, stdio: 'inherit' });
    console.log('前端构建完成 ✓');
  } catch (e) {
    console.error('前端构建失败，继续启动（仅 API 可用）:', e.message);
  }
}

// ---- 中间件 ----
app.use(cors());
app.use(express.json({ limit: '5mb' }));

if (fs.existsSync(distPath)) {
  app.use(express.static(distPath));
  // SPA fallback
  app.get(/^\/(?!api\/).*/, (req, res) => {
    res.sendFile(path.join(distPath, 'index.html'));
  });
}

// ---- API 路由 ----
app.use('/api/analyze', require('./routes/analyze'));
app.use('/api/music', require('./routes/music'));
app.use('/api/config', require('./routes/config'));

app.get('/api/status', (req, res) => {
  res.json({
    status: 'running',
    hasOpenAI: !!(process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-your-key-here'),
    frontendBuilt: fs.existsSync(distPath),
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
║         AutoMatch - API 服务已启动               ║
╠══════════════════════════════════════════════════╣
║  端口:      ${PORT}                              ║
║  前端构建:  ${fs.existsSync(distPath) ? 'dist/ 已就绪 ✓' : '❌ 仅 API 模式'} ║
║  AI Key:    ${process.env.OPENAI_API_KEY ? '已配置 ✓' : '未配置 (本地算法)'} ║
╚══════════════════════════════════════════════════╝
  `);
});
