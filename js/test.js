/**
 * 诊断脚本 — 在浏览器控制台执行
 * 用法: 在页面打开时，复制以下内容到 Console 执行
 */
(function testApp() {
  console.log('%c=== 智能建站平台 诊断脚本 ===', 'font-size:16px;font-weight:bold');
  
  // 测试 1: 全局对象
  console.group('1. 全局对象检查');
  console.log('App 已加载:', typeof App !== 'undefined');
  console.log('Preview 已加载:', typeof Preview !== 'undefined');
  console.log('config 已加载:', typeof KEYWORD_PATTERNS !== 'undefined', `(${KEYWORD_PATTERNS?.length} 个模式)`);
  console.log('TEMPLATE_CONTENT 已加载:', typeof TEMPLATE_CONTENT !== 'undefined', `(${Object.keys(TEMPLATE_CONTENT || {}).length} 个行业)`);
  console.groupEnd();
  
  // 测试 2: DOM 元素
  console.group('2. 关键 DOM 元素');
  const checks = [
    'step-editor', 'module-list', 'module-palette', 'page-preview',
    'module-properties', 'config-tree-view', 'btn-to-editor'
  ];
  checks.forEach(id => {
    const el = document.getElementById(id);
    console.log(`#${id}: ${el ? 'OK' : 'MISSING!'}`, el || '');
  });
  console.groupEnd();
  
  // 测试 3: 模拟分析流程
  console.group('3. 模拟分析流程');
  console.time('analyze');
  try {
    const keywords = '我想开一家咖啡店，展示菜单和店面环境';
    const result = App.analyzeKeywords(keywords);
    console.log('analyzeKeywords 返回:', result);
    console.log('  suggestion:', result.analysis?.suggestion);
    console.log('  modules:', result.analysis?.modules?.length, '个模块');
    console.log('  colorScheme:', result.analysis?.colorScheme);
    console.timeEnd('analyze');
    
    // 手动设置 state
    App.state.analysis = result.analysis;
    App.state.keywords = keywords;
    App.renderAnalysisResult();
    App.showStep('analysis');
    console.log('已显示分析结果页面，请点击"进入编辑器"按钮');
  } catch(e) {
    console.error('分析失败:', e);
  }
  console.groupEnd();
  
  // 测试 4: 直接测试编辑器
  console.group('4. 直接进入编辑器');
  try {
    console.time('enterEditor');
    App.enterEditor();
    console.timeEnd('enterEditor');
    
    // 检查渲染结果
    const preview = document.getElementById('page-preview');
    console.log('预览内容长度:', preview?.innerHTML?.length || 0, '字符');
    console.log('预览内容开头:', preview?.innerHTML?.substring(0, 100));
    
    const moduleList = document.getElementById('module-list');
    console.log('模块列表 DOM:', moduleList?.children?.length || 0, '个子元素');
    
    const moduleProps = document.getElementById('module-properties');
    console.log('属性面板 DOM:', moduleProps?.children?.length || 0, '个子元素');
    
  } catch(e) {
    console.error('enterEditor 失败:', e);
    console.error('错误栈:', e.stack);
  }
  console.groupEnd();
  
  // 测试 5: 编辑器 tab 状态
  console.group('5. 编辑器步骤状态');
  const editorStep = document.getElementById('step-editor');
  console.log('step-editor 是否 active:', editorStep?.classList.contains('active'));
  console.log('step-editor style.display:', editorStep?.style?.display);
  console.log('step-editor 计算后 display:', editorStep && window.getComputedStyle(editorStep).display);
  console.log('step-editor 计算后 visibility:', editorStep && window.getComputedStyle(editorStep).visibility);
  console.log('step-editor 计算后 opacity:', editorStep && window.getComputedStyle(editorStep).opacity);
  console.log('step-editor innerHTML 长度:', editorStep?.innerHTML?.length || 0);
  console.groupEnd();
  
  console.log('%c诊断完成，请将以上输出截图发给我', 'color:green;font-weight:bold');
})();
