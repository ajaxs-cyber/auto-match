/**
 * Auth API - 用户注册/登录/验证
 */
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const { body, validationResult } = require('express-validator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();
const USERS_FILE = path.join(__dirname, '..', 'data', 'users.json');
const JWT_SECRET = process.env.JWT_SECRET || 'automatch-dev-secret-change-in-production';
const JWT_EXPIRES = '7d';

function readUsers() {
  try {
    if (!fs.existsSync(USERS_FILE)) {
      fs.writeFileSync(USERS_FILE, '[]');
      return [];
    }
    const data = fs.readFileSync(USERS_FILE, 'utf-8');
    return JSON.parse(data);
  } catch {
    return [];
  }
}

function writeUsers(users) {
  fs.writeFileSync(USERS_FILE, JSON.stringify(users, null, 2));
}

function generateToken(user) {
  return jwt.sign(
    { id: user.id, email: user.email, plan: user.plan },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES }
  );
}

// POST /api/auth/register
router.post('/register', [
  body('name').trim().notEmpty().withMessage('Name is required'),
  body('email').isEmail().normalizeEmail().withMessage('Valid email is required'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters'),
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ error: errors.array()[0].msg });
  }

  const { name, email, password } = req.body;
  const users = readUsers();

  // Check duplicate email
  if (users.find(u => u.email === email)) {
    return res.status(409).json({ error: '该邮箱已注册' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = {
      id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      email,
      name: name.trim(),
      plan: 'free',
      password: hashedPassword,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    writeUsers(users);

    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json({ user: userWithoutPassword, token });
  } catch (err) {
    console.error('Register error:', err);
    res.status(500).json({ error: '服务器错误，请重试' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: '请输入邮箱和密码' });
  }

  const users = readUsers();

  // Check demo accounts (backward compat)
  const demoAccounts = {
    'demo@automatch.com': { name: 'Demo User', plan: 'pro', password: 'demo123' },
    'free@automatch.com': { name: 'Free User', plan: 'free', password: 'free123' },
    'enterprise@automatch.com': { name: 'Enterprise User', plan: 'enterprise', password: 'enterprise123' },
  };

  const demo = demoAccounts[email.toLowerCase()];
  if (demo && password === demo.password) {
    // Auto-create demo user if not exists
    let user = users.find(u => u.email === email);
    if (!user) {
      const hashedPassword = await bcrypt.hash(demo.password, 10);
      user = {
        id: `user-demo-${Date.now()}`,
        email,
        name: demo.name,
        plan: demo.plan,
        password: hashedPassword,
        createdAt: new Date().toISOString(),
      };
      users.push(user);
      writeUsers(users);
    }
    const token = generateToken(user);
    const { password: _, ...userWithoutPassword } = user;
    return res.json({ user: userWithoutPassword, token });
  }

  // Normal login
  const user = users.find(u => u.email === email);
  if (!user) {
    return res.status(401).json({ error: '邮箱或密码错误' });
  }

  const valid = await bcrypt.compare(password, user.password);
  if (!valid) {
    return res.status(401).json({ error: '邮箱或密码错误' });
  }

  const token = generateToken(user);
  const { password: _, ...userWithoutPassword } = user;

  res.json({ user: userWithoutPassword, token });
});

// GET /api/auth/me - 验证 token，获取当前用户
router.get('/me', authMiddleware, (req, res) => {
  const users = readUsers();
  const user = users.find(u => u.id === req.user.id);
  if (!user) {
    return res.status(404).json({ error: '用户不存在' });
  }
  const { password: _, ...userWithoutPassword } = user;
  res.json({ user: userWithoutPassword });
});

module.exports = router;
