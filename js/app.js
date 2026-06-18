/**
 * ============================================================
 * 自助建站平台 - 核心应用逻辑
 * 关键词分析 → 智能推荐 → 可视化编辑
 * ============================================================
 */

const API_BASE = window.location.origin + '/api';

const App = {
  state: {
    step: 'welcome',
    keywords: '',
    apiAvailable: false,
    analysis: null,          // { suggestion, modules, template, colorScheme }
    pageConfig: {
      title: '',
      subtitle: '',
      primaryColor: '#334155',
      accentColor: '#6366f1',
      bgColor: '#ffffff',
      textColor: '#1e293b'
    },
    modules: [],
    selectedModuleIndex: -1,
    configTree: null
  },

  init() {
    window.App = this;            // 暴露到全局，确保 inline onclick 兼容
    this.bindEvents();
    this.showStep('welcome');
    this.renderModulePalette();
    this.renderDesignStyleOptions();
    this.checkApiStatus();
  },

  /**
   * 检测后端 API 是否可用
   */
  async checkApiStatus() {
    try {
      const res = await fetch(`${API_BASE}/status`, { method: 'GET', signal: AbortSignal.timeout(2000) });
      if (res.ok) {
        const data = await res.json();
        this.state.apiAvailable = true;
        console.log(`🔌 后端 API 已连接 | AI: ${data.hasOpenAI ? '已配置 ✓' : '未配置 Key'}`);
        // 在欢迎页右上角显示连接状态
        const badge = document.querySelector('.welcome-badge');
        if (badge) {
          badge.textContent = '🚀 智能建站平台';
          badge.title = `API: 已连接 | AI: ${data.hasOpenAI ? 'GPT-4o在线' : '本地算法'}`;
          badge.style.background = '#ecfdf5';
          badge.style.color = '#059669';
        }
      }
    } catch {
      this.state.apiAvailable = false;
      console.log('🔌 后端 API 未连接，使用本地算法');
    }
  },

  /**
   * API 请求通用方法（失败时返回 null）
   */
  async apiPost(path, body) {
    if (!this.state.apiAvailable) return null;
    try {
      const res = await fetch(`${API_BASE}${path}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(15000)
      });
      if (!res.ok) throw new Error(`API error: ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`API ${path} 请求失败:`, e.message);
      return null;
    }
  },

  bindEvents() {
    // 欢迎页 → 关键词输入
    document.getElementById('btn-start-analyze').addEventListener('click', () => this.startAnalysis());

    // 回车触发分析
    document.getElementById('keyword-input').addEventListener('keydown', (e) => {
      if (e.key === 'Enter') this.startAnalysis();
    });

    // 分析页 → 编辑器
    document.getElementById('btn-to-editor').addEventListener('click', () => this.enterEditor());
    document.getElementById('btn-back-to-input').addEventListener('click', () => this.showStep('welcome'));

    // 编辑器操作
    document.getElementById('btn-preview-page').addEventListener('click', () => this.showPreview());
    document.getElementById('btn-export-config').addEventListener('click', () => this.exportConfig());
    document.getElementById('btn-export-config-preview').addEventListener('click', () => this.exportConfig());
    document.getElementById('btn-back-to-editor').addEventListener('click', () => this.showStep('editor'));
    document.getElementById('btn-publish-draft').addEventListener('click', () => this.publishDraft());

    // 模块面板点击（事件委托，兼容动态内容）
    const palette = document.getElementById('module-palette');
    if (palette) {
      palette.addEventListener('click', (e) => {
        const item = e.target.closest('.palette-item');
        if (item && item.dataset.type) {
          this.addModule(item.dataset.type);
        }
      });
    }
    document.getElementById('btn-go-music-standalone').addEventListener('click', () => this.showStep('music'));
    document.getElementById('btn-back-from-music').addEventListener('click', () => this.showStep('welcome'));
    document.getElementById('btn-analyze-music')?.addEventListener('click', () => this.analyzeMusicStandalone());
    document.getElementById('toggle-music-panel').addEventListener('click', () => this.toggleMusicPanel());

    // 预览区点击选中模块
    const previewArea = document.querySelector('.preview-area');
    if (previewArea) {
      previewArea.addEventListener('click', (e) => {
        const wrapper = e.target.closest('.preview-module-wrapper');
        if (wrapper && wrapper.dataset.moduleIndex !== undefined) {
          const index = parseInt(wrapper.dataset.moduleIndex);
          this.selectModule(index);
        }
      });

      // 预览区作为拖拽放置目标（允许从模块面板拖入）
      previewArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'copy';
        previewArea.classList.add('drag-over');
      });
      previewArea.addEventListener('dragleave', () => {
        previewArea.classList.remove('drag-over');
      });
      previewArea.addEventListener('drop', (e) => {
        e.preventDefault();
        previewArea.classList.remove('drag-over');
        const type = e.dataTransfer.getData('text/plain');
        if (type) {
          this.addModule(type);
        }
      });
    }

    // 设计风格选择
    const styleSel = document.getElementById('page-design-style');
    if (styleSel) {
      styleSel.addEventListener('change', (e) => {
        this.applyDesignStyle(e.target.value);
      });
    }

    // 页面配置变更
    ['page-title', 'page-subtitle', 'page-primary-color', 'page-accent-color', 'page-bg-color', 'page-text-color'].forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      el.addEventListener('input', (e) => {
        const key = id.replace('page-', '').replace(/-/g, '');
        const map = {
          'pagetitle': 'title',
          'pagesubtitle': 'subtitle',
          'pageprimarycolor': 'primaryColor',
          'pageaccentcolor': 'accentColor',
          'pagebgcolor': 'bgColor',
          'pagetextcolor': 'textColor'
        };
        this.state.pageConfig[map[key]] = e.target.value;
        this.renderPreview();
      });
    });
  },

  // ---- 视图切换 ----
  showStep(step) {
    this.state.step = step;
    const steps = ['welcome', 'analysis', 'editor', 'preview', 'music'];
    steps.forEach(s => {
      const el = document.getElementById(`step-${s}`);
      if (el) el.classList.toggle('active', s === step);
    });
    this.updateProgress(step);
    window.scrollTo(0, 0);
  },

  updateProgress(step) {
    const order = ['welcome', 'analysis', 'editor'];
    const idx = order.indexOf(step);
    document.querySelectorAll('.progress-bar .step').forEach((el, i) => {
      el.classList.toggle('active', i <= idx);
      el.classList.toggle('done', i < idx);
    });
  },

  // ---- 关键词分析 ----
  async startAnalysis() {
    const input = document.getElementById('keyword-input');
    const keywords = input.value.trim();
    if (!keywords) {
      input.style.borderColor = '#ef4444';
      setTimeout(() => input.style.borderColor = '', 1500);
      return;
    }

    this.state.keywords = keywords;

    // 有 API 时优先调用后端
    if (this.state.apiAvailable) {
      const result = await this.apiPost('/analyze', { text: keywords });
      if (result && result.modules) {
        this.state.analysis = {
          suggestion: result.suggestion,
          modules: result.modules,
          template: result.template || 'business',
          colorScheme: result.colorScheme || { primary: '#6366f1', accent: '#f59e0b' },
          matchScore: 1,
          matchedKeywords: result.matchedKeywords || [],
          reasoning: result.reasoning || ''
        };
        this.renderAnalysisResult();
        this.showStep('analysis');
        return;
      }
    }

    // 本地兜底
    this.analyzeKeywords(keywords);
    this.renderAnalysisResult();
    this.showStep('analysis');
  },

  analyzeKeywords(keywords) {
    const kw = keywords.toLowerCase();

    // 遍历所有模式，计算匹配度
    let bestMatch = null;
    let bestScore = 0;

    for (const pattern of KEYWORD_PATTERNS) {
      let score = 0;
      for (const keyword of pattern.keywords) {
        if (kw.includes(keyword.toLowerCase())) {
          score++;
        }
      }
      if (score > bestScore) {
        bestScore = score;
        bestMatch = pattern;
      }
    }

    // 给关键词数量加权：如果输入了多个关键词，提高匹配度
    const inputWords = kw.split(/[\s,，、]+/).filter(w => w.length > 0);
    if (inputWords.length >= 3) bestScore += 0.5;

    this.state.analysis = bestMatch && bestScore > 0
      ? {
          suggestion: bestMatch.suggestion,
          modules: [...bestMatch.modules],
          template: bestMatch.template,
          colorScheme: { ...bestMatch.colorScheme },
          matchScore: bestScore,
          matchedKeywords: bestMatch.keywords.filter(k => kw.includes(k.toLowerCase()))
        }
      : {
          ...DEFAULT_ANALYSIS,
          modules: [...DEFAULT_ANALYSIS.modules],
          colorScheme: { ...DEFAULT_ANALYSIS.colorScheme },
          matchScore: 0,
          matchedKeywords: []
        };
  },

  renderAnalysisResult() {
    var result = this.state.analysis;
    var container = document.getElementById('analysis-result');
    if (!container) return;
    var template = LAYOUT_TEMPLATES[result.template];
    var kw = this.state.keywords;
    var mods = result.modules || [];
    var cs = result.colorScheme || {};

    var html = '';
    // 卡片1: 名称+关键词
    html += '<div class="analysis-card"><h4>网站类型</h4><div class="card-value">' + this.esc(result.suggestion) + '</div><p style="color:var(--text-light);font-size:0.85em;margin-top:4px;">关键词: ' + this.esc(kw) + '</p></div>';
    // 卡片2: 配色
    html += '<div class="analysis-card"><h4>配色方案</h4><div class="colors">';
    html += '<div><div class="color-swatch" style="background:' + cs.primary + ';"></div><span style="font-size:0.75em;">主色</span></div>';
    html += '<div><div class="color-swatch" style="background:' + cs.accent + ';"></div><span style="font-size:0.75em;">强调</span></div>';
    html += '</div></div>';
    // 卡片3: 布局
    html += '<div class="analysis-card"><h4>推荐布局</h4><div class="card-value" style="font-size:1em;">' + (template ? template.name : '自适应') + '</div></div>';
    // 卡片4: 模块
    html += '<div class="analysis-card"><h4>页面模块 (' + mods.length + '个)</h4><div class="module-tags">';
    mods.forEach(function(t) {
      var m = MODULE_TYPES[t];
      html += '<span class="module-tag">' + (m ? m.icon + ' ' + m.label : t) + '</span>';
    });
    html += '</div></div>';

    container.innerHTML = html;
  },

  // ---- 进入编辑器 ----
  enterEditor() {
    try {
      const analysis = this.state.analysis;
      if (!analysis) {
        console.error('enterEditor: analysis is null, 无法进入编辑器');
        return;
      }
      const cs = analysis.colorScheme;
      if (!cs || !analysis.modules) {
        console.error('enterEditor: analysis 数据不完整', analysis);
        return;
      }

      // 初始化模块 —— 合并行业模板内容到默认配置上
      const templateContent = TEMPLATE_CONTENT[analysis.suggestion] || {};
      this.state.modules = analysis.modules.map((type, idx) => {
        const defaultCfg = JSON.parse(JSON.stringify(MODULE_TYPES[type]?.defaultConfig || {}));
        const overrideCfg = templateContent[type] || {};
        return {
          id: `mod-${Date.now()}-${idx}`,
          type: type,
          config: mergeDeep(defaultCfg, overrideCfg),
          visible: true,
          index: idx
        };
      });

      // 初始化页面配置
      this.state.pageConfig.primaryColor = cs.primary;
      this.state.pageConfig.accentColor = cs.accent;
      this.state.pageConfig.title = analysis.suggestion;
      this.state.pageConfig.subtitle = '用一句话描述您的网站核心价值';
      this.state.selectedModuleIndex = -1;

      // 填充表单
      const map = {
        'page-title': ['title', 'pageConfig'],
        'page-subtitle': ['subtitle', 'pageConfig'],
        'page-primary-color': ['primaryColor', 'pageConfig'],
        'page-accent-color': ['accentColor', 'pageConfig'],
        'page-bg-color': ['bgColor', 'pageConfig'],
        'page-text-color': ['textColor', 'pageConfig']
      };
      for (const [id, [key]] of Object.entries(map)) {
        const el = document.getElementById(id);
        if (el) el.value = this.state.pageConfig[key] || '';
      }

      document.getElementById('editor-site-name').textContent = analysis.suggestion;
      document.getElementById('editor-module-count').textContent = this.state.modules.length + ' 个模块';

      // 同步设计风格下拉
      const styleSel = document.getElementById('page-design-style');
      if (styleSel && this.state.pageConfig._designStyle) {
        styleSel.value = this.state.pageConfig._designStyle;
      }

      // 渲染
      this.renderModuleList();
      this.renderModuleProperties();
      this.renderPreview();
      this.renderConfigTree();

      this.showStep('editor');
    } catch (e) {
      console.error('enterEditor 出错:', e);
      alert('进入编辑器时发生错误，请查看控制台日志');
    }
  },

  // ---- 模块列表 ----
  renderModuleList() {
    const container = document.getElementById('module-list');
    if (!container) return;

    container.innerHTML = this.state.modules.map((mod, idx) => {
      const modType = MODULE_TYPES[mod.type];
      return `
        <div class="module-item ${idx === this.state.selectedModuleIndex ? 'selected' : ''}"
             data-index="${idx}"
             draggable="true">
          <div class="module-drag-handle" title="拖拽排序">⠿</div>
          <div class="module-item-content" onclick="App.selectModule(${idx})">
            <span class="module-item-icon">${modType ? modType.icon : '📦'}</span>
            <span class="module-item-name">${modType ? modType.label : mod.type}</span>
          </div>
          <button class="module-visibility-btn" onclick="App.toggleModuleVisibility(${idx})" title="${mod.visible ? '隐藏' : '显示'}">
            ${mod.visible ? '👁' : '👁‍🗨'}
          </button>
          <button class="module-remove-btn" onclick="App.removeModule(${idx})" title="移除模块">✕</button>
        </div>
      `;
    }).join('');

    this.setupDragAndDrop();
  },

  setupDragAndDrop() {
    const container = document.getElementById('module-list');
    let draggedEl = null;

    const items = container.querySelectorAll('.module-item');
    items.forEach(el => {
      el.addEventListener('dragstart', (e) => {
        draggedEl = el;
        el.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
      });
      el.addEventListener('dragend', () => {
        el.classList.remove('dragging');
        draggedEl = null;
      });
      el.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (el !== draggedEl) {
          const rect = el.getBoundingClientRect();
          const next = (e.clientY - rect.top) > (rect.height / 2);
          container.insertBefore(draggedEl, next ? el.nextSibling : el);
        }
      });
    });

    container.addEventListener('drop', (e) => {
      e.preventDefault();
      if (draggedEl) {
        const items = [...container.querySelectorAll('.module-item')];
        const newOrder = items.map(el => parseInt(el.dataset.index));
        this.state.modules = newOrder.map(i => this.state.modules[i]);
        this.state.modules.forEach((mod, i) => mod.index = i);
        this.state.selectedModuleIndex = -1;
        this.renderModuleList();
        this.renderPreview();
        this.renderConfigTree();
      }
    });
  },

  selectModule(index) {
    if (index < 0 || index >= this.state.modules.length) return;
    this.state.selectedModuleIndex = index;
    this.renderModuleList();
    this.renderModuleProperties();
    this.renderPreview();

    // 滚动预览区到选中模块
    setTimeout(() => {
      const wrapper = document.querySelector(`.preview-module-wrapper[data-module-index="${index}"]`);
      if (wrapper) {
        wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
        wrapper.classList.add('selected-flash');
        setTimeout(() => wrapper.classList.remove('selected-flash'), 1000);
      }
    }, 50);
  },

  toggleModuleVisibility(index) {
    this.state.modules[index].visible = !this.state.modules[index].visible;
    this.renderModuleList();
    this.renderPreview();
  },

  removeModule(index) {
    if (this.state.modules.length <= 1) {
      alert('至少保留一个模块');
      return;
    }
    this.state.modules.splice(index, 1);
    // 重新索引
    this.state.modules.forEach((m, i) => m.index = i);
    if (this.state.selectedModuleIndex >= this.state.modules.length) {
      this.state.selectedModuleIndex = this.state.modules.length - 1;
    }
    this.renderModuleList();
    this.renderModuleProperties();
    this.renderPreview();
    this.renderConfigTree();
  },

  addModule(type) {
    try {
      if (!type || !MODULE_TYPES[type]) {
        console.warn('addModule: 无效模块类型', type);
        return;
      }
      const idx = this.state.modules.length;
      const defaultCfg = JSON.parse(JSON.stringify(MODULE_TYPES[type]?.defaultConfig || {}));
      // 合并行业模板内容（如果有），让新加的模块也有丰富内容
      const analysis = this.state.analysis;
      const templateContent = analysis && TEMPLATE_CONTENT[analysis.suggestion]
        ? (TEMPLATE_CONTENT[analysis.suggestion][type] || {})
        : {};
      const config = mergeDeep(defaultCfg, templateContent);
      this.state.modules.push({
        id: `mod-${Date.now()}-${idx}`,
        type: type,
        config: config,
        visible: true,
        index: idx
      });
      this.state.selectedModuleIndex = idx;
      this.renderModuleList();
      this.renderModuleProperties();
      this.renderPreview();
      this.renderConfigTree();
      document.getElementById('editor-module-count').textContent = this.state.modules.length + ' 个模块';

      // 滚动预览到新添加的模块
      setTimeout(() => {
        const wrapper = document.querySelector(`.preview-module-wrapper[data-module-index="${idx}"]`);
        if (wrapper) {
          wrapper.scrollIntoView({ behavior: 'smooth', block: 'center' });
          wrapper.classList.add('selected-flash');
          setTimeout(() => wrapper.classList.remove('selected-flash'), 1200);
        }
      }, 100);
    } catch (e) {
      console.error('addModule 出错:', e);
    }
  },

  // ---- 设计风格选项 ----
  renderDesignStyleOptions() {
    const sel = document.getElementById('page-design-style');
    if (!sel) return;
    const styles = window.DESIGN_SYSTEM && window.DESIGN_SYSTEM.styles ? window.DESIGN_SYSTEM.styles : {};
    sel.innerHTML = '<option value="">默认风格</option>' +
      Object.entries(styles).map(([k, v]) => '<option value="' + k + '">' + v.name + '</option>').join('');
  },

  /** 应用设计风格到页面 */
  applyDesignStyle(styleKey) {
    if (!styleKey || !window.DESIGN_SYSTEM || !window.DESIGN_SYSTEM.styles[styleKey]) return;
    const s = window.DESIGN_SYSTEM.styles[styleKey].css;
    if (!s) return;
    // 同步配色
    if (s.primary) this.state.pageConfig.primaryColor = s.primary;
    if (s.accent) this.state.pageConfig.accentColor = s.accent;
    if (s.bg) this.state.pageConfig.bgColor = s.bg;
    if (s.text) this.state.pageConfig.textColor = s.text;
    this.state.pageConfig._designStyle = styleKey;
    // 刷新属性面板
    ['page-primary-color','page-accent-color','page-bg-color','page-text-color'].forEach(function(id) {
      var el = document.getElementById(id);
      if (el) el.value = this.state.pageConfig[id.replace('page-','').replace('-','') === 'primarycolor' ? 'primaryColor' : id.replace('page-','').replace('-color','')];
    });
    this.renderPreview();
  },

  // ---- 模块面板 ----
  renderModulePalette(filter = '') {
    const container = document.getElementById('module-palette');
    if (!container) return;

    const types = Object.values(MODULE_TYPES).filter(t =>
      !filter || t.label.includes(filter) || t.type.includes(filter)
    );

    container.innerHTML = types.map(t => `
      <div class="palette-item" data-type="${t.type}" draggable="true">
        <span>${t.icon}</span>
        <span>${t.label}</span>
      </div>
    `).join('');

    // 拖拽开始：保存模块类型
    container.querySelectorAll('.palette-item').forEach(el => {
      el.addEventListener('dragstart', (e) => {
        e.dataTransfer.setData('text/plain', el.dataset.type);
        e.dataTransfer.effectAllowed = 'copy';
        el.classList.add('dragging');
      });
      el.addEventListener('dragend', () => {
        el.classList.remove('dragging');
      });
    });
  },

  // ---- 模块属性面板 ----
  renderModuleProperties() {
    const container = document.getElementById('module-properties');
    if (!container) return;

    const idx = this.state.selectedModuleIndex;
    if (idx < 0 || idx >= this.state.modules.length) {
      container.innerHTML = '<div class="no-selection"><p>选择左侧模块编辑属性</p></div>';
      return;
    }

    const mod = this.state.modules[idx];
    const modType = MODULE_TYPES[mod.type];
    if (!modType) {
      container.innerHTML = '<div class="no-selection"><p>未知模块类型</p></div>';
      return;
    }
    const cfg = mod.config;

    let html = `<h4>${modType.icon} ${modType.label}</h4>`;

    // 根据模块类型生成表单
    switch (mod.type) {
      case 'header':
        html += this.buildSimpleForm(cfg, [
          { key: 'siteName', label: '网站名称', type: 'text' }
        ]);
        break;
      case 'hero':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '主标题', type: 'text' },
          { key: 'subtitle', label: '副标题', type: 'text' },
          { key: 'ctaText', label: '按钮文案', type: 'text' },
          { key: 'bgColor', label: '背景色', type: 'color' },
          { key: 'height', label: '高度', type: 'select', options: [
            { value: 'small', label: '小' }, { value: 'medium', label: '中' },
            { value: 'large', label: '大' }, { value: 'fullscreen', label: '全屏' }
          ]}
        ]);
        break;
      case 'text':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'content', label: '内容', type: 'textarea' },
          { key: 'align', label: '对齐', type: 'select', options: [
            { value: 'left', label: '左对齐' }, { value: 'center', label: '居中' }, { value: 'right', label: '右对齐' }
          ]}
        ]);
        break;
      case 'features':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'subtitle', label: '副标题', type: 'text' },
          { key: 'columns', label: '列数', type: 'select', options: [
            { value: 2, label: '2列' }, { value: 3, label: '3列' }, { value: 4, label: '4列' }
          ]}
        ]);
        html += '<label style="font-size:0.85em;color:#888;">特点项 (在下方编辑)</label>';
        break;
      case 'pricing':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'subtitle', label: '副标题', type: 'text' }
        ]);
        break;
      case 'contact':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'address', label: '地址', type: 'text' },
          { key: 'phone', label: '电话', type: 'text' },
          { key: 'email', label: '邮箱', type: 'text' }
        ]);
        break;
      case 'button':
        html += this.buildSimpleForm(cfg, [
          { key: 'text', label: '按钮文案', type: 'text' },
          { key: 'link', label: '链接', type: 'text' },
          { key: 'style', label: '样式', type: 'select', options: [
            { value: 'solid', label: '实心' }, { value: 'outline', label: '描边' }, { value: 'ghost', label: '幽灵' }
          ]},
          { key: 'size', label: '尺寸', type: 'select', options: [
            { value: 'small', label: '小' }, { value: 'medium', label: '中' }, { value: 'large', label: '大' }
          ]},
          { key: 'align', label: '对齐', type: 'select', options: [
            { value: 'left', label: '左' }, { value: 'center', label: '中' }, { value: 'right', label: '右' }
          ]}
        ]);
        break;
      case 'footer':
        html += this.buildSimpleForm(cfg, [
          { key: 'copyright', label: '版权信息', type: 'text' }
        ]);
        break;
      case 'products':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' }
        ]);
        break;
      case 'gallery':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'columns', label: '列数', type: 'select', options: [
            { value: 2, label: '2列' }, { value: 3, label: '3列' }, { value: 4, label: '4列' }
          ]}
        ]);
        break;
      case 'image':
        html += this.buildSimpleForm(cfg, [
          { key: 'caption', label: '标题/说明', type: 'text' },
          { key: 'alt', label: 'Alt文本', type: 'text' },
          { key: 'shadow', label: '阴影', type: 'select', options: [
            { value: 'none', label: '无' }, { value: 'small', label: '小' }, { value: 'medium', label: '中' }, { value: 'large', label: '大' }
          ]}
        ]);
        break;
      case 'imageText':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'content', label: '内容', type: 'textarea' },
          { key: 'imageSide', label: '图片位置', type: 'select', options: [
            { value: 'left', label: '左侧' }, { value: 'right', label: '右侧' }
          ]}
        ]);
        break;
      case 'team':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' }
        ]);
        break;
      case 'testimonials':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' }
        ]);
        break;
      case 'divider':
        html += this.buildSimpleForm(cfg, [
          { key: 'style', label: '样式', type: 'select', options: [
            { value: 'solid', label: '实线' }, { value: 'dashed', label: '虚线' }, { value: 'dotted', label: '点线' }
          ]},
          { key: 'color', label: '颜色', type: 'color' },
          { key: 'thickness', label: '粗细', type: 'select', options: [
            { value: '1px', label: '1px' }, { value: '2px', label: '2px' }, { value: '3px', label: '3px' }, { value: '4px', label: '4px' }
          ]}
        ]);
        break;

      // ── ReactBits 特效模块 ──
      case 'rbTextFx':
        html += this.buildSimpleForm(cfg, [
          { key: 'text', label: '文字内容', type: 'text' },
          { key: 'effect', label: '动画效果', type: 'select', options: [
            { value: 'shiny', label: '闪光' }, { value: 'gradient', label: '渐变' },
            { value: 'glitch', label: '故障' }, { value: 'blur', label: '模糊渐显' },
            { value: 'fuzzy', label: '毛刺' }, { value: 'truefocus', label: '聚焦' }
          ]},
          { key: 'tag', label: '字号层级', type: 'select', options: [
            { value: 'h1', label: 'H1 大标题' }, { value: 'h2', label: 'H2 标题' },
            { value: 'h3', label: 'H3 副标题' }, { value: 'p', label: '段落' }
          ]},
          { key: 'color1', label: '渐变颜色1', type: 'color' },
          { key: 'color2', label: '渐变颜色2', type: 'color' }
        ]);
        break;
      case 'rbBgFx':
        html += this.buildSimpleForm(cfg, [
          { key: 'text', label: '标题文字', type: 'text' },
          { key: 'subText', label: '副标题', type: 'text' },
          { key: 'effect', label: '背景效果', type: 'select', options: [
            { value: 'aurora', label: '极光' }, { value: 'particles', label: '粒子网络' },
            { value: 'waves', label: '波浪' }, { value: 'hyperspeed', label: '光速穿梭' },
            { value: 'galaxy', label: '银河' }, { value: 'beams', label: '光束' },
            { value: 'noise', label: '噪点' }, { value: 'plasma', label: '等离子' },
            { value: 'gridmotion', label: '运动网格' }, { value: 'floatinglines', label: '浮动线条' }
          ]},
          { key: 'height', label: '高度', type: 'text' },
          { key: 'textColor', label: '文字颜色', type: 'color' }
        ]);
        break;
      case 'rbTiltedCard':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'content', label: '内容', type: 'text' },
          { key: 'icon', label: '图标(emoji)', type: 'text' },
          { key: 'bgColor', label: '背景色', type: 'color' },
          { key: 'shadow', label: '阴影', type: 'select', options: [
            { value: 'small', label: '小' }, { value: 'medium', label: '中' }, { value: 'large', label: '大' }
          ]}
        ]);
        break;
      case 'rbBounceCards':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'columns', label: '列数', type: 'select', options: [
            { value: 2, label: '2列' }, { value: 3, label: '3列' }, { value: 4, label: '4列' }
          ]},
          { key: 'bgColor', label: '背景色', type: 'color' }
        ]);
        break;
      case 'rbGlassSurface':
        html += this.buildSimpleForm(cfg, [
          { key: 'content', label: '内容', type: 'text' },
          { key: 'bgOpacity', label: '透明(0-1)', type: 'text' },
          { key: 'borderRadius', label: '圆角', type: 'text' }
        ]);
        break;
      case 'rbCarousel':
        html += this.buildSimpleForm(cfg, [
          { key: 'height', label: '高度', type: 'text' },
          { key: 'interval', label: '自动播放(ms)', type: 'text' },
          { key: 'borderRadius', label: '圆角', type: 'text' }
        ]);
        break;
      case 'rbSpotlightCard':
        html += this.buildSimpleForm(cfg, [
          { key: 'title', label: '标题', type: 'text' },
          { key: 'content', label: '内容', type: 'text' },
          { key: 'icon', label: '图标(emoji)', type: 'text' },
          { key: 'bgColor', label: '背景色', type: 'color' },
          { key: 'textColor', label: '文字色', type: 'color' }
        ]);
        break;

      default:
        html += '<p style="color:#888;font-size:0.9em;">该模块暂无可编辑属性</p>';
    }

    html += `<button class="btn btn-secondary btn-small" onclick="App.applyModuleConfig()" style="margin-top:12px;width:100%;">应用修改</button>`;
    container.innerHTML = html;
  },

  buildSimpleForm(cfg, fields) {
    return fields.map(f => {
      const val = cfg[f.key] !== undefined ? cfg[f.key] : '';
      if (f.type === 'text') {
        return `
          <div class="form-group">
            <label>${f.label}</label>
            <input class="form-input prop-${f.key}" value="${this.esc(String(val))}" />
          </div>
        `;
      } else if (f.type === 'textarea') {
        return `
          <div class="form-group">
            <label>${f.label}</label>
            <textarea class="form-input prop-${f.key}">${this.esc(String(val))}</textarea>
          </div>
        `;
      } else if (f.type === 'color') {
        return `
          <div class="form-group">
            <label>${f.label}</label>
            <input type="color" class="form-input prop-${f.key}" value="${val}" style="height:38px;padding:4px;" />
          </div>
        `;
      } else if (f.type === 'select' && f.options) {
        return `
          <div class="form-group">
            <label>${f.label}</label>
            <select class="form-input prop-${f.key}">
              ${f.options.map(o => `<option value="${o.value}" ${String(val) === String(o.value) ? 'selected' : ''}>${o.label}</option>`).join('')}
            </select>
          </div>
        `;
      }
      return '';
    }).join('');
  },

  /** 列表项编辑器 — 支持增减 items array */
  buildListEditor(cfg, listKey, fieldDefs, defaultItem) {
    var items = cfg[listKey] || [];
    var html = '<div class="list-editor" style="margin-top:12px;border-top:1px solid var(--border);padding-top:12px;">';
    html += '<label style="font-size:0.8em;color:var(--text-light);text-transform:uppercase;letter-spacing:0.05em;">' + listKey + ' (' + items.length + '项)</label>';
    for (var i = 0; i < items.length; i++) {
      html += '<div class="list-item-editor"><div class="item-header"><span class="item-index">#' + (i+1) + '</span>';
      html += '<button class="btn-remove-item" onclick="App.removeListItem(\'' + listKey + '\',' + i + ')">删除</button>';
      html += '</div>';
      for (var j = 0; j < fieldDefs.length; j++) {
        var f = fieldDefs[j];
        var val = items[i][f.key] !== undefined ? items[i][f.key] : '';
        html += '<label style="font-size:0.75em;color:#94a3b8;display:block;margin:6px 0 2px 0;">' + f.label + '</label>';
        html += '<input class="prop-item-' + listKey + '-' + i + '-' + f.key + '" value="' + this.esc(String(val)) + '" />';
      }
      html += '</div>';
    }
    html += '<button class="btn-add-item" onclick="App.addListItem(\'' + listKey + '\')">+ 添加' + listKey + '项</button>';
    html += '</div>';
    return html;
  },

  /** 从列表编辑器的输入读取值并写回配置 */
  saveListEditorChanges() {
    var idx = this.state.selectedModuleIndex;
    if (idx < 0) return;
    var mod = this.state.modules[idx];
    // 扫描所有 prop-item-xxx 输入
    var inputs = document.querySelectorAll('[class*="prop-item-"]');
    if (inputs.length === 0) return;
    var groups = {};
    inputs.forEach(function(inp) {
      var cls = inp.className;
      var m = cls.match(/prop-item-(\w+)-(\d+)-(.+)/);
      if (!m) return;
      var listKey = m[1], i = parseInt(m[2]), fkey = m[3];
      if (!groups[listKey]) groups[listKey] = {};
      if (!groups[listKey][i]) groups[listKey][i] = {};
      groups[listKey][i][fkey] = inp.value;
    });
    for (var listKey in groups) {
      var items = mod.config[listKey] || [];
      for (var iStr in groups[listKey]) {
        var i = parseInt(iStr);
        if (i < items.length) {
          for (var fkey in groups[listKey][i]) {
            items[i][fkey] = groups[listKey][i][fkey];
          }
        }
      }
      mod.config[listKey] = items;
    }
    this.renderPreview();
    this.renderConfigTree();
  },

  addListItem(listKey) {
    var idx = this.state.selectedModuleIndex;
    if (idx < 0) return;
    var mod = this.state.modules[idx];
    if (!mod.config[listKey]) mod.config[listKey] = [];
    var item = this._getDefaultItem(listKey);
    mod.config[listKey].push(item);
    this.renderModuleProperties();
    this.renderPreview();
  },

  removeListItem(listKey, itemIdx) {
    var idx = this.state.selectedModuleIndex;
    if (idx < 0) return;
    var mod = this.state.modules[idx];
    if (mod.config[listKey] && mod.config[listKey].length > 1) {
      mod.config[listKey].splice(itemIdx, 1);
    }
    this.renderModuleProperties();
    this.renderPreview();
  },

  _getDefaultItem(listKey) {
    var defaults = {
      items: { icon: '⭐', title: '新项目', desc: '描述' },
      features: [{ icon: '⭐', title: '新特性', desc: '特性描述' }],
      slides: { title: '新幻灯片', content: '内容', bgColor: '#667eea' }
    };
    // features 用 items
    return listKey === 'items' ? { icon: '⭐', title: '新项目', desc: '描述' }
      : listKey === 'features' ? { icon: '⭐', title: '新特性', desc: '特性描述' }
      : { icon: '⭐', title: '新项目', desc: '描述' };
  },

  applyModuleConfig() {
    const idx = this.state.selectedModuleIndex;
    if (idx < 0) return;
    const mod = this.state.modules[idx];
    const cfg = mod.config;

    // 通用属性读取：遍历所有 .prop-* 输入
    const fieldKeys = Object.keys(cfg);
    fieldKeys.forEach(key => {
      const el = document.querySelector(`.prop-${key}`);
      if (el) {
        const val = el.type === 'checkbox' ? el.checked : el.value;
        if (val !== undefined && val !== null) {
          cfg[key] = val;
        }
      }
    });

    this.saveListEditorChanges();
    this.renderModuleProperties();
    this.renderPreview();
    this.renderConfigTree();
  },

  // ---- 预览 ----
  renderPreview() {
    try {
      if (window.Preview) Preview.render(this.state);
    } catch (e) {
      console.error('renderPreview 出错:', e);
    }
  },

  showPreview() {
    this.renderPreview();
    this.showStep('preview');
  },

  renderConfigTree() {
    if (window.Preview) Preview.renderConfigTree(this.state);
  },

  // ---- 导出 ----
  exportConfig() {
    const tree = Preview ? Preview.buildConfigTree(this.state) : {};
    const blob = new Blob([JSON.stringify(tree, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `website-config-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  },

  async publishDraft() {
    const tree = Preview ? Preview.buildConfigTree(this.state) : {};

    // 有 API 则保存到后端
    if (this.state.apiAvailable) {
      const result = await this.apiPost('/config/save', {
        title: this.state.pageConfig.title || '未命名网站',
        config: tree
      });
      if (result) {
        alert(`✅ 草稿已保存！\nID: ${result.id}\n可在 data/ 目录找到`);
        return;
      }
    }

    console.log('Published config:', JSON.stringify(tree, null, 2));
    alert('✅ 草稿已保存！\n配置树已输出到控制台。\n生产环境下将同步至服务器。');
  },

  // ================================================================
  // 音乐推荐
  // ================================================================

  /**
   * 切换编辑器配乐面板 + 自动分析
   */
  toggleMusicPanel() {
    const body = document.getElementById('music-panel-body');
    const icon = document.getElementById('music-toggle-icon');
    if (!body) return;

    const isOpen = body.style.display !== 'none';
    body.style.display = isOpen ? 'none' : 'block';
    icon.textContent = isOpen ? '▶' : '▼';

    if (!isOpen) {
      // 打开时自动分析
      this.recommendMusicFromPage();
    }
  },

  /**
   * 编辑器内配乐推荐：从页面内容提取文本分析
   */
  async recommendMusicFromPage() {
    const container = document.getElementById('music-recommendation-result');
    if (!container) return;

    container.innerHTML = '<div class="music-loading">分析页面内容...<br><small>基于 Thayer 情绪模型 + MIR 特征匹配</small></div>';

    // 收集页面关键词作为分析文本
    const pageTitle = this.state.pageConfig.title || '';
    const pageSubtitle = this.state.pageConfig.subtitle || '';
    const keywords = this.state.keywords || '';
    const moduleTexts = this.state.modules.map(mod => {
      const modType = MODULE_TYPES[mod.type];
      const cfg = mod.config;
      return [modType?.label || '', cfg.title || '', cfg.content || '', cfg.subtitle || ''].join(' ');
    }).join(' ');

    const text = [pageTitle, pageSubtitle, keywords, moduleTexts].join(' ').trim();
    if (!text) {
      container.innerHTML = '<div class="music-error">暂无页面内容，请在编辑器中添加模块</div>';
      return;
    }

    // 优先使用后端 API
    if (this.state.apiAvailable) {
      const result = await this.apiPost('/music/recommend', { text });
      if (result && result.textAnalysis) {
        this.renderMusicResults(result, container, 'editor');
        return;
      }
    }

    // 本地兜底
    setTimeout(() => {
      try {
        const result = MusicRecommender.recommend(text);
        this.renderMusicResults(result, container, 'editor');
      } catch (e) {
        container.innerHTML = `<div class="music-error">分析出错：${this.esc(e.message)}</div>`;
      }
    }, 400);
  },

  /**
   * 独立文字匹配音乐
   */
  async analyzeMusicStandalone() {
    const input = document.getElementById('music-text-input');
    const container = document.getElementById('music-standalone-result');
    if (!input || !container) return;

    const text = input.value.trim();
    if (!text) {
      input.style.borderColor = '#ef4444';
      setTimeout(() => input.style.borderColor = '', 1500);
      return;
    }

    container.innerHTML = '<div class="music-loading">正在分析文本情绪...<br><small>Thayer VA 模型 · 维度计算中</small></div>';

    // 优先使用后端 API
    if (this.state.apiAvailable) {
      const result = await this.apiPost('/music/recommend', { text });
      if (result && result.textAnalysis) {
        this.renderMusicResults(result, container, 'standalone');
        return;
      }
    }

    // 本地兜底
    setTimeout(() => {
      try {
        const result = MusicRecommender.recommend(text);
        this.renderMusicResults(result, container, 'standalone');
      } catch (e) {
        container.innerHTML = `<div class="music-error">分析出错：${this.esc(e.message)}</div>`;
      }
    }, 500);
  },

  /**
   * 渲染音乐推荐结果（三路径 + VA 分析）
   */
  renderMusicResults(result, container, mode = 'standalone') {
    const analysis = result.textAnalysis;
    const params = result.musicParams;
    const moodLabel = analysis.moodLabel || 'neutral';
    const moodTag = `<span class="mood-tag ${moodLabel}">${MusicRecommender.MOOD_REGIONS[moodLabel]?.label || '中性'}</span>`;

    // 把 valence/arousal 归一化到 0-1 用于进度条
    const vNorm = (analysis.valence + 1) / 2;
    const aNorm = (analysis.arousal + 1) / 2;
    const vColor = vNorm > 0.5 ? '#10b981' : '#6366f1';
    const aColor = aNorm > 0.5 ? '#f59e0b' : '#6366f1';

    container.innerHTML = `
      <div class="music-result-section">
        <div class="music-result-header">
          <h3>🎵 推荐结果 ${moodTag}</h3>
          <p style="color:var(--text-light);font-size:0.85em;">
            情绪维度：正向度 ${(analysis.valence * 100).toFixed(0)}% · 唤醒度 ${(analysis.arousal * 100).toFixed(0)}%
            ${analysis.keywords.length ? `· 匹配关键词：${analysis.keywords.slice(0, 6).join('、')}` : ''}
          </p>
        </div>

        <!-- VA 分布 -->
        <div style="margin-bottom:16px;">
          <div class="va-bar">
            <span class="va-bar-label">正向度</span>
            <div class="va-bar-track">
              <div class="va-bar-fill" style="width:${(vNorm * 100).toFixed(0)}%;background:${vColor};"></div>
            </div>
            <span style="font-size:0.8em;font-weight:600;width:36px;">${(analysis.valence * 100).toFixed(0)}%</span>
          </div>
          <div class="va-bar">
            <span class="va-bar-label">唤醒度</span>
            <div class="va-bar-track">
              <div class="va-bar-fill" style="width:${(aNorm * 100).toFixed(0)}%;background:${aColor};"></div>
            </div>
            <span style="font-size:0.8em;font-weight:600;width:36px;">${(analysis.arousal * 100).toFixed(0)}%</span>
          </div>
          <div class="va-bar">
            <span class="va-bar-label">BPM</span>
            <div class="va-bar-track">
              <div class="va-bar-fill" style="width:${(params.bpm / 200 * 100).toFixed(0)}%;background:#8b5cf6;"></div>
            </div>
            <span style="font-size:0.8em;font-weight:600;width:36px;">${params.bpm}</span>
          </div>
        </div>

        <!-- 三路径标签页 -->
        <div class="music-tabs">
          <button class="music-tab active" data-path="library" onclick="App.switchMusicTab(this, 'library')">📀 曲库匹配</button>
          <button class="music-tab" data-path="ai" onclick="App.switchMusicTab(this, 'ai')">🤖 AI 生成</button>
          <button class="music-tab" data-path="synthesis" onclick="App.switchMusicTab(this, 'synthesis')">🔊 前端合成</button>
        </div>

        <div id="music-tab-library">
          ${this.renderLibraryMatchesHTML(result.libraryMatches)}
        </div>
        <div id="music-tab-ai" style="display:none;">
          ${this.renderAIPromptHTML(result.aiPrompt)}
        </div>
        <div id="music-tab-synthesis" style="display:none;">
          ${this.renderSynthesisHTML(result.synthesisParams)}
        </div>
      </div>
    `;
  },

  /**
   * 切换音乐结果标签页
   */
  switchMusicTab(btn, path) {
    // 更新 tab 状态
    document.querySelectorAll('.music-tab').forEach(t => t.classList.remove('active'));
    btn.classList.add('active');
    // 切换内容
    ['library', 'ai', 'synthesis'].forEach(p => {
      const el = document.getElementById(`music-tab-${p}`);
      if (el) el.style.display = p === path ? 'block' : 'none';
    });
  },

  /**
   * 渲染曲库匹配列表 HTML
   */
  renderLibraryMatchesHTML(tracks) {
    if (!tracks || tracks.length === 0) {
      return '<div class="no-match">未找到匹配度足够的曲目</div>';
    }

    return tracks.map(track => {
      const pct = Math.round(track.score * 100);
      const scoreColor = pct >= 70 ? '#10b981' : pct >= 50 ? '#f59e0b' : '#94a3b8';
      return `
        <div class="track-card">
          <div class="track-score" style="background:${scoreColor};">${pct}%</div>
          <div class="track-info">
            <div class="track-title">${this.esc(track.title)}</div>
            <div class="track-meta">
              <span>${this.esc(track.genre || '')}</span>
              <span>${track.bpm} BPM</span>
              <span class="track-tag ${track.mode || 'major'}">${track.mode === 'minor' ? '小调' : '大调'}</span>
              <span>能量 ${Math.round((track.energy || 0) * 10)}/10</span>
              <span style="color:#888;">${track.license || ''}</span>
            </div>
          </div>
          <div style="font-size:0.75em;color:var(--text-light);text-align:right;">
            <div>V: ${track.valence?.toFixed(2)}</div>
            <div>A: ${track.arousal?.toFixed(2)}</div>
          </div>
        </div>
      `;
    }).join('');
  },

  /**
   * 渲染 AI 生成提示词 HTML
   */
  renderAIPromptHTML(aiPrompt) {
    if (!aiPrompt || !aiPrompt.prompt) {
      return '<div class="no-match">提示词生成失败</div>';
    }

    return `
      <div class="ai-prompt-card">${this.esc(aiPrompt.prompt)}</div>
      <div style="margin-top:8px;display:flex;gap:8px;flex-wrap:wrap;">
        <button class="btn btn-secondary btn-small" onclick="App.copyText('${this.esc(aiPrompt.prompt).replace(/'/g, "\\'")}')">📋 复制提示词</button>
      </div>
    `;
  },

  /**
   * 渲染前端合成参数 HTML
   */
  renderSynthesisHTML(synthesisParams) {
    if (!synthesisParams || !synthesisParams.parameters) {
      return '<div class="no-match">合成参数生成失败</div>';
    }

    const params = synthesisParams.parameters;
    const paramRows = Object.entries(params).map(([key, val]) => {
      const label = {
        waveform: '波形', harmonics: '谐波', lfoRate: 'LFO 速率',
        filter: '滤波器', filterFreq: '滤波频率', reverb: '混响',
        bpm: 'BPM', duration: '时长(秒)', noteDensity: '音符密度',
        arpeggiated: '琶音', octaveRange: '八度范围'
      }[key] || key;

      let display = String(val);
      if (key === 'harmonics') display = `[${val.join(', ')}]`;
      if (key === 'lfoRate' || key === 'reverb') display = val.toFixed(2);

      return `
        <div class="param-row">
          <span class="param-label">${label}</span>
          <span class="param-value">${display}</span>
        </div>
      `;
    }).join('');

    return `
      <div class="synthesis-card">
        <div style="font-weight:600;margin-bottom:8px;">${this.esc(synthesisParams.description || 'Web Audio 合成参数')}</div>
        ${paramRows}
        <div class="synthesis-copyright">${this.esc(synthesisParams.copyright || '')}</div>
      </div>
    `;
  },

  /**
   * 复制文本工具
   */
  copyText(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => {
        alert('✅ 已复制到剪贴板');
      }).catch(() => {
        // fallback
        this.fallbackCopy(text);
      });
    } else {
      this.fallbackCopy(text);
    }
  },

  fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand('copy'); alert('✅ 已复制到剪贴板'); } catch (e) { alert('❌ 复制失败'); }
    document.body.removeChild(ta);
  },

  // ---- 工具 ----
  esc(str) {
    if (!str) return '';
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
};

document.addEventListener('DOMContentLoaded', () => App.init());
