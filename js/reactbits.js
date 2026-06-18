/**
 * ============================================================
 * ReactBits 原生 JS 实现 — Canvas 背景 & 交互动效
 * 基于 reactbits.dev 的组件效果，用纯 JS 重新实现
 * ============================================================
 */
const ReactBits = {

  /* ════════════════════════════════════
   * Canvas 背景效果
   * ════════════════════════════════════ */

  activeCanvases: {},

  /** 挂载 Canvas 背景到指定容器 */
  mountBackground(container, effect, options = {}) {
    if (!container) return;
    const canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:0;';
    container.style.position = container.style.position || 'relative';
    container.style.overflow = 'hidden';
    container.appendChild(canvas);

    const id = `rb-${Date.now()}-${Math.random().toString(36).slice(2)}`;
    canvas.dataset.rbId = id;

    const ctx = canvas.getContext('2d');
    const state = { width: 0, height: 0, time: 0, options };

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      state.width = rect.width * dpr;
      state.height = rect.height * dpr;
      canvas.width = state.width;
      canvas.height = state.height;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    resize();
    window.addEventListener('resize', resize);

    const fn = this.backgrounds[effect];
    if (!fn) {
      console.warn(`ReactBits: 未知背景效果 "${effect}"`);
      return;
    }

    const loop = (ts) => {
      state.time = ts * 0.001;
      resize(); // 持续更新尺寸以适应布局变化
      const w = state.width / (Math.min(window.devicePixelRatio || 1, 2));
      const h = state.height / (Math.min(window.devicePixelRatio || 1, 2));
      ctx.clearRect(0, 0, w, h);
      fn(ctx, w, h, state);
      this.activeCanvases[id] = requestAnimationFrame(loop);
    };

    this.activeCanvases[id] = requestAnimationFrame(loop);

    return {
      destroy() {
        cancelAnimationFrame(this.activeCanvases[id]);
        delete this.activeCanvases[id];
        window.removeEventListener('resize', resize);
        canvas.remove();
      }
    };
  },

  backgrounds: {
    /** Aurora — 极光流动 */
    aurora(ctx, w, h, s) {
      const t = s.time * 0.3;
      const opts = s.options;
      const colors = opts.colors || ['#6366f1', '#ec4899', '#10b981', '#3b82f6'];
      for (let i = 0; i < colors.length; i++) {
        const cx = w * 0.3 + Math.sin(t + i * 2.1) * w * 0.4;
        const cy = h * 0.4 + Math.cos(t + i * 1.7) * h * 0.35;
        const rx = w * 0.5 + Math.sin(t * 0.7 + i) * w * 0.2;
        const ry = h * 0.4 + Math.cos(t * 0.9 + i) * h * 0.15;
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.max(rx, ry));
        grad.addColorStop(0, colors[i] + '40');
        grad.addColorStop(0.5, colors[i] + '15');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, Math.sin(t + i) * 0.3, 0, Math.PI * 2);
        ctx.fill();
      }
    },

    /** Particles — 粒子网络 */
    particles(ctx, w, h, s) {
      const opts = s.options;
      const count = opts.count || 60;
      const maxDist = opts.maxDist || 120;
      const color = opts.color || '#6366f1';
      if (!s._particles || s._particles.length !== count) {
        s._particles = Array.from({ length: count }, () => ({
          x: Math.random() * w, y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.5, vy: (Math.random() - 0.5) * 0.5,
          r: Math.random() * 2 + 1
        }));
      }
      const ps = s._particles;
      for (const p of ps) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
      }
      // 连线
      ctx.strokeStyle = color + '15';
      ctx.lineWidth = 0.5;
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x;
          const dy = ps[i].y - ps[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxDist) {
            ctx.globalAlpha = 1 - dist / maxDist;
            ctx.beginPath();
            ctx.moveTo(ps[i].x, ps[i].y);
            ctx.lineTo(ps[j].x, ps[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.globalAlpha = 1;
      for (const p of ps) {
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      s._particles = ps;
    },

    /** Waves — 波浪 */
    waves(ctx, w, h, s) {
      const t = s.time;
      const opts = s.options;
      const colors = opts.colors || ['#6366f1', '#a855f7'];
      for (let layer = 0; layer < colors.length; layer++) {
        const yOff = h * (0.5 + layer * 0.15);
        ctx.fillStyle = colors[layer] + '30';
        ctx.beginPath();
        ctx.moveTo(0, h);
        for (let x = 0; x <= w; x += 2) {
          const freq = 0.005 + layer * 0.002;
          const amp = 30 + layer * 15;
          const phase = t * (1 + layer * 0.3);
          ctx.lineTo(x, yOff + Math.sin(x * freq + phase) * amp + Math.cos(x * freq * 1.3 + phase * 0.7) * amp * 0.5);
        }
        ctx.lineTo(w, h);
        ctx.closePath();
        ctx.fill();
      }
    },

    /** Hyperspeed — 光速穿梭 */
    hyperspeed(ctx, w, h, s) {
      const opts = s.options;
      const centerColor = opts.centerColor || '#ffffff';
      const trailColor = opts.trailColor || '#6366f1';
      if (!s._hyperspeedStars) {
        s._hyperspeedStars = Array.from({ length: 200 }, () => ({
          x: Math.random() * w - w / 2,
          y: Math.random() * h - h / 2,
          z: Math.random() * 500 + 50
        }));
      }
      const cx = w / 2;
      const cy = h / 2;
      const stars = s._hyperspeedStars;
      const speed = opts.speed || 3;

      for (const star of stars) {
        star.z -= speed;
        if (star.z <= 0) {
          star.z = 500;
          star.x = (Math.random() - 0.5) * 400;
          star.y = (Math.random() - 0.5) * 400;
        }
        const sx = cx + star.x / (star.z * 0.01);
        const sy = cy + star.y / (star.z * 0.01);
        const px = cx + star.x / ((star.z + speed) * 0.01);
        const py = cy + star.y / ((star.z + speed) * 0.01);
        const alpha = 1 - star.z / 500;
        const sz = (1 - star.z / 500) * 3;

        ctx.strokeStyle = star.z > 400 ? centerColor + Math.floor(alpha * 255).toString(16).padStart(2, '0')
          : trailColor + Math.floor(alpha * 255).toString(16).padStart(2, '0');
        ctx.lineWidth = sz;
        ctx.beginPath();
        ctx.moveTo(px, py);
        ctx.lineTo(sx, sy);
        ctx.stroke();
      }
    },

    /** Galaxy — 银河旋涡 */
    galaxy(ctx, w, h, s) {
      const t = s.time * 0.2;
      const cx = w / 2;
      const cy = h / 2;
      const opts = s.options;
      const color1 = opts.color1 || '#6366f1';
      const color2 = opts.color2 || '#ec4899';
      const arms = opts.arms || 3;

      for (let i = 0; i < 3000; i++) {
        const dist = Math.random() * Math.min(w, h) * 0.45;
        const angle = (i / 3000) * Math.PI * 2 * arms + dist * 0.01 + t;
        const x = cx + Math.cos(angle) * dist;
        const y = cy + Math.sin(angle) * dist * 0.5;
        const alpha = Math.max(0, 1 - dist / (Math.min(w, h) * 0.45));
        ctx.fillStyle = dist < Math.min(w, h) * 0.15 ? color1 : color2;
        ctx.globalAlpha = alpha * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    },

    /** Beams — 光线束 */
    beams(ctx, w, h, s) {
      const t = s.time;
      const cx = w / 2;
      const cy = h / 2;
      const opts = s.options;
      const color = opts.color || '#6366f1';
      const count = opts.count || 12;

      for (let i = 0; i < count; i++) {
        const angle = (i / count) * Math.PI * 2 + t * 0.1;
        const len = Math.min(w, h) * 0.7;
        const x1 = cx;
        const y1 = cy;
        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;

        const grad = ctx.createLinearGradient(x1, y1, x2, y2);
        grad.addColorStop(0, color + '30');
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.5;
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    },

    /** Dither — 抖动点阵 */
    dither(ctx, w, h, s) {
      const opts = s.options;
      const grid = opts.grid || 4;
      const color = opts.color || '#000000';
      ctx.fillStyle = color;
      for (let y = 0; y < h; y += grid) {
        for (let x = 0; x < w; x += grid) {
          const noise = Math.random();
          const brightness = 0.5;
          if (noise > brightness) {
            const sz = (noise - brightness) * grid;
            ctx.fillRect(x, y, sz, sz);
          }
        }
      }
    },

    /** Noise — 动态噪点 */
    noise(ctx, w, h, s) {
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let i = 0; i < data.length; i += 4) {
        const v = Math.random() * 20;
        data[i] = v;
        data[i + 1] = v;
        data[i + 2] = v;
        data[i + 3] = 15;
      }
      ctx.putImageData(imageData, 0, 0);
    },

    /** LightRays — 光线 */
    lightrays(ctx, w, h, s) {
      const t = s.time * 0.5;
      const cx = w * 0.5 + Math.sin(t * 0.3) * w * 0.2;
      const cy = 0;
      const opts = s.options;
      const count = opts.count || 8;

      for (let i = 0; i < count; i++) {
        const angle = -Math.PI / 2 + (i - count / 2) * 0.15 + Math.sin(t + i) * 0.05;
        const len = h * 2;
        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;
        const grad = ctx.createLinearGradient(cx, cy, x2, y2);
        grad.addColorStop(0, 'rgba(255,255,255,0.06)');
        grad.addColorStop(1, 'transparent');
        ctx.strokeStyle = grad;
        ctx.lineWidth = 40 + Math.sin(t + i) * 20;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(x2, y2);
        ctx.stroke();
      }
    },

    /** GridMotion — 网格运动 */
    gridmotion(ctx, w, h, s) {
      const t = s.time;
      const opts = s.options;
      const spacing = opts.spacing || 50;
      const color = opts.color || '#6366f1';

      ctx.strokeStyle = color + '15';
      ctx.lineWidth = 1;

      const offsetX = (t * 20) % spacing;
      const offsetY = Math.sin(t * 0.5) * 20;

      for (let x = -spacing + offsetX; x < w + spacing; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = -spacing + offsetY; y < h + spacing; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }
    },

    /** GradientBlinds — 渐变百叶窗 (Canvas版) */
    gradientblinds(ctx, w, h, s) {
      const t = s.time;
      const opts = s.options;
      const c1 = opts.color1 || '#667eea';
      const c2 = opts.color2 || '#764ba2';

      for (let y = 0; y < h; y += 4) {
        const phase = (y + t * 50) % 8;
        const alpha = phase < 4 ? phase / 4 : (8 - phase) / 4;
        ctx.fillStyle = phase < 4 ? c1 : c2;
        ctx.globalAlpha = alpha * 0.3;
        ctx.fillRect(0, y, w, 2);
      }
      ctx.globalAlpha = 1;
    },

    /** Plasma — 等离子体 */
    plasma(ctx, w, h, s) {
      const t = s.time;
      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;
      for (let y = 0; y < h; y += 2) {
        for (let x = 0; x < w; x += 2) {
          const v1 = Math.sin(x * 0.01 + t);
          const v2 = Math.sin(y * 0.008 + t * 0.7);
          const v3 = Math.sin((x + y) * 0.007 + t * 0.5);
          const v = (v1 + v2 + v3) / 3;
          const idx = (y * w + x) * 4;
          const r = Math.floor(128 + v * 80);
          const g = Math.floor(50 + v * 40);
          const b = Math.floor(180 + v * 50);
          data[idx] = r;
          data[idx + 1] = g;
          data[idx + 2] = b;
          data[idx + 3] = 60;
        }
      }
      ctx.putImageData(imageData, 0, 0);
    },

    /** LightPillar — 光柱 */
    lightpillar(ctx, w, h, s) {
      const t = s.time;
      const count = 6;
      for (let i = 0; i < count; i++) {
        const x = w * ((i + 1) / (count + 1)) + Math.sin(t * 0.3 + i) * 30;
        const grad = ctx.createLinearGradient(x, 0, x, h);
        grad.addColorStop(0, 'rgba(99, 102, 241, 0.08)');
        grad.addColorStop(0.4, 'rgba(139, 92, 246, 0.04)');
        grad.addColorStop(1, 'transparent');
        ctx.fillStyle = grad;
        ctx.fillRect(x - 30, 0, 60, h);
      }
    },

    /** FloatingLines — 浮动线条 */
    floatinglines(ctx, w, h, s) {
      const t = s.time;
      const count = 5;
      for (let i = 0; i < count; i++) {
        const y = h * ((i + 0.5) / count) + Math.sin(t * 0.5 + i * 1.3) * 40;
        ctx.strokeStyle = `rgba(99, 102, 241, ${0.03 + i * 0.01})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        for (let x = 0; x < w; x += 4) {
          const wy = y + Math.sin(x * 0.005 + t + i) * 30 + Math.cos(x * 0.008 + t * 0.7) * 20;
          if (x === 0) ctx.moveTo(x, wy);
          else ctx.lineTo(x, wy);
        }
        ctx.stroke();
      }
    },
  },

  /* ════════════════════════════════════
   * 交互动效
   * ════════════════════════════════════ */

  /** 3D Tilt — 倾斜卡片 (Magnet/TiltedCard) */
  initTilt(el, intensity = 15) {
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty('--rb-tilt-x', `${-y * intensity}deg`);
      el.style.setProperty('--rb-tilt-y', `${x * intensity}deg`);
    };
    const handleLeave = () => {
      el.style.setProperty('--rb-tilt-x', '0deg');
      el.style.setProperty('--rb-tilt-y', '0deg');
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  },

  /** GlareHover — 光泽跟随鼠标 */
  initGlare(el) {
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      el.style.setProperty('--rb-glare-x', `${x}%`);
      el.style.setProperty('--rb-glare-y', `${y}%`);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  },

  /** SpotlightCard — 聚光灯跟随 */
  initSpotlight(el) {
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty('--rb-spot-x', `${((e.clientX - rect.left) / rect.width) * 100}%`);
      el.style.setProperty('--rb-spot-y', `${((e.clientY - rect.top) / rect.height) * 100}%`);
    };
    el.addEventListener('mousemove', handleMove);
    return () => el.removeEventListener('mousemove', handleMove);
  },

  /** CountUp — 数字滚动动画 */
  countUp(el, target, duration = 2000, decimals = 0) {
    const start = performance.now();
    const from = parseFloat(el.textContent) || 0;
    const to = parseFloat(target);
    const animate = (ts) => {
      const progress = Math.min((ts - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4); // easeOutQuart
      const current = from + (to - from) * eased;
      el.textContent = current.toFixed(decimals);
      if (progress < 1) requestAnimationFrame(animate);
      else el.textContent = target;
    };
    requestAnimationFrame(animate);
  },

  /** SplitText — 字符拆分动画 */
  animateSplitText(el) {
    const text = el.textContent || '';
    el.textContent = '';
    el.classList.add('rb-split-text');
    const chars = text.split('').map((char, i) => {
      const span = document.createElement('span');
      span.className = 'rb-split-char hidden';
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.transitionDelay = `${i * 0.03}s`;
      el.appendChild(span);
      return span;
    });
    requestAnimationFrame(() => {
      chars.forEach(c => c.classList.remove('hidden'));
      el.classList.add('revealed');
    });
  },

  /** DecryptedText — 解密文字动画 */
  animateDecrypt(el, finalText, duration = 1500) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()';
    const start = performance.now();
    const animate = (ts) => {
      const progress = Math.min((ts - start) / duration, 1);
      let result = '';
      for (let i = 0; i < finalText.length; i++) {
        if (progress > i / finalText.length) {
          result += finalText[i];
        } else {
          result += chars[Math.floor(Math.random() * chars.length)];
        }
      }
      el.textContent = result;
      if (progress < 1) requestAnimationFrame(animate);
      else el.textContent = finalText;
    };
    requestAnimationFrame(animate);
  },

  /** ScrollReveal — 滚动触发显示 */
  initScrollReveal(container = document) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed');
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    const items = container.querySelectorAll ? container.querySelectorAll('.rb-scroll-reveal') : [];
    items.forEach(el => observer.observe(el));
    return observer;
  },

  /** BlurText — 模糊渐显 */
  revealBlurText(el, delay = 0) {
    setTimeout(() => el.classList.add('revealed'), delay);
  },

  /** Magnetic — 磁吸效果 */
  initMagnet(el, strength = 0.3) {
    const handleMove = (e) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      el.style.transform = `translate(${dx}px, ${dy}px)`;
    };
    const handleLeave = () => {
      el.style.transform = 'translate(0, 0)';
    };
    el.addEventListener('mousemove', handleMove);
    el.addEventListener('mouseleave', handleLeave);
    return () => {
      el.removeEventListener('mousemove', handleMove);
      el.removeEventListener('mouseleave', handleLeave);
    };
  },

  /** TrueFocus — 文字逐个聚焦 */
  initTrueFocus(el) {
    const text = el.textContent || '';
    el.textContent = '';
    const chars = [];
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.className = 'rb-true-focus';
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i];
      span.addEventListener('mouseenter', () => span.classList.add('char-focused'));
      span.addEventListener('mouseleave', () => span.classList.remove('char-focused'));
      el.appendChild(span);
      chars.push(span);
    }
    return () => chars.forEach(s => s.remove());
  },

  /** Carousel — 轮播组件 */
  initCarousel(container, options = {}) {
    const track = container.querySelector('.rb-carousel-track');
    const slides = track.querySelectorAll('.rb-carousel-slide');
    const dotsContainer = container.querySelector('.rb-carousel-dots');
    let current = 0;
    const autoplay = options.autoplay !== false;
    const interval = options.interval || 4000;
    let timer;

    if (dotsContainer && slides.length > 0) {
      dotsContainer.innerHTML = '';
      for (let i = 0; i < slides.length; i++) {
        const dot = document.createElement('button');
        dot.className = `rb-carousel-dot${i === 0 ? ' active' : ''}`;
        dot.onclick = () => goTo(i);
        dotsContainer.appendChild(dot);
      }
    }

    const goTo = (idx) => {
      current = ((idx % slides.length) + slides.length) % slides.length;
      track.style.transform = `translateX(-${current * 100}%)`;
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.rb-carousel-dot').forEach((d, i) => {
          d.classList.toggle('active', i === current);
        });
      }
    };

    if (autoplay && slides.length > 1) {
      timer = setInterval(() => goTo(current + 1), interval);
    }

    return {
      goTo,
      next: () => goTo(current + 1),
      prev: () => goTo(current - 1),
      destroy() { clearInterval(timer); }
    };
  },

  /** 销毁所有活跃 Canvas */
  destroyAll() {
    for (const id of Object.keys(this.activeCanvases)) {
      cancelAnimationFrame(this.activeCanvases[id]);
      delete this.activeCanvases[id];
    }
  }
};

// 暴露到 window
window.ReactBits = ReactBits;
