/**
 * 配置存储 API
 * POST /api/config/save    — 保存网站配置
 * GET  /api/config/:id     — 加载指定配置
 * GET  /api/config         — 配置列表
 * DELETE /api/config/:id   — 删除配置
 */
const express = require('express');
const router = express.Router();
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const DATA_DIR = path.join(__dirname, '..', 'data');
const INDEX_FILE = path.join(DATA_DIR, 'index.json');

// 确保 data 目录存在
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });
if (!fs.existsSync(INDEX_FILE)) fs.writeFileSync(INDEX_FILE, '[]');

/**
 * 读取索引
 */
function readIndex() {
  try {
    return JSON.parse(fs.readFileSync(INDEX_FILE, 'utf-8'));
  } catch {
    return [];
  }
}

/**
 * 写入索引
 */
function writeIndex(index) {
  fs.writeFileSync(INDEX_FILE, JSON.stringify(index, null, 2));
}

// POST /api/config/save
router.post('/save', (req, res) => {
  const { title, config } = req.body;
  if (!config) return res.status(400).json({ error: '缺少 config 数据' });

  const id = uuidv4().slice(0, 8);
  const timestamp = new Date().toISOString();
  const entry = {
    id,
    title: title || '未命名网站',
    createdAt: timestamp,
    updatedAt: timestamp
  };

  // 保存配置内容
  const configFile = path.join(DATA_DIR, `${id}.json`);
  fs.writeFileSync(configFile, JSON.stringify({ ...entry, config }, null, 2));

  // 更新索引
  const index = readIndex();
  index.unshift(entry);
  writeIndex(index);

  res.json({ id, message: '保存成功' });
});

// PUT /api/config/:id
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, config } = req.body;
  const configFile = path.join(DATA_DIR, `${id}.json`);

  if (!fs.existsSync(configFile)) {
    return res.status(404).json({ error: '配置不存在' });
  }

  const existing = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
  const updated = {
    ...existing,
    title: title || existing.title,
    config: config || existing.config,
    updatedAt: new Date().toISOString()
  };

  fs.writeFileSync(configFile, JSON.stringify(updated, null, 2));

  // 更新索引
  const index = readIndex();
  const idx = index.findIndex(e => e.id === id);
  if (idx !== -1) {
    index[idx].title = updated.title;
    index[idx].updatedAt = updated.updatedAt;
    writeIndex(index);
  }

  res.json({ id, message: '更新成功' });
});

// GET /api/config
router.get('/', (req, res) => {
  const index = readIndex();
  res.json(index);
});

// GET /api/config/:id
router.get('/:id', (req, res) => {
  const { id } = req.params;
  const configFile = path.join(DATA_DIR, `${id}.json`);

  if (!fs.existsSync(configFile)) {
    return res.status(404).json({ error: '配置不存在' });
  }

  const data = JSON.parse(fs.readFileSync(configFile, 'utf-8'));
  res.json(data);
});

// DELETE /api/config/:id
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const configFile = path.join(DATA_DIR, `${id}.json`);

  if (fs.existsSync(configFile)) fs.unlinkSync(configFile);

  const index = readIndex();
  writeIndex(index.filter(e => e.id !== id));

  res.json({ message: '已删除' });
});

module.exports = router;
