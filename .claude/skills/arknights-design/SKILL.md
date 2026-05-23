---
name: arknights-design
description: 使用《明日方舟》设计语言和美术风格生成HTML页面。当你需要制作具有明日方舟风格的网页、博客文章、展示页面或任何HTML内容时使用。基于方舟各故事线的色彩、字体、材质体系提供模板化的设计系统，支持静态色彩注入和动态CSS动画效果。TRIGGER当用户提到"方舟风格"、"arknights设计"、"方舟UI"、或需要一个深色工业科幻风格的页面时。
---

# Arknights Design System v2

基于《明日方舟》的 UI/美术设计语言提炼的可复用 HTML/CSS/JS 设计系统。每条故事线拥有完整的差异化色彩体系、材质纹理、动画效果。

## 使用方式

1. 确定目标风格 → 从下方「故事线完整色板」中选择
2. 复制对应风格的 CSS 变量块到 `:root`
3. 从组件模式中拼装 HTML 结构
4. 在 `</body>` 前引入动态 JS 增强（陀螺仪、粒子、滚轮揭示）
5. 所有代码内联，无外部依赖

---

## 完整色板速查（14条故事线）

### 罗德岛 / 切尔诺伯格 — 废土工业
```
--accent:        #f0a030   (琥珀警戒橙)
--accent-glow:   #f0c060   (辉光)
--secondary:     #8b7355   (工业棕)
--surface:       #141418   (冷钢灰)
--surface-alt:   #1a1a20   (深灰蓝底)
--text:          #c8c8d0
--text-dim:      #909098
--border:        #2a2a32
--font-display:  "Noto Serif SC"
```
**特征**：噪点纹理 .grain · 警戒线条纹 .caution-stripe · 粗边框卡片 · 西里尔字母装饰 · 低饱和冷峻色调

### 龙门 — 赛博霓虹
```
--accent:        #4a90d9   (霓虹蓝)
--accent-glow:   #80c0ff   (电光蓝)
--secondary:     #d94a8a   (霓虹品红)
--surface:       #0d111a   (暗蓝黑)
--surface-alt:   #111827   (深蓝底)
--text:          #c8d0e0
--text-dim:      #7080a0
--border:        #1e3050
--font-display:  "Noto Sans SC"
```
**特征**：点阵字体装饰 · 扫描线 .crt-scanlines · 霓虹发光 text-shadow · 高密度信息卡片 · 粤语/英文混排

### 维多利亚 — 蒸汽贵族
```
--accent:        #b89a50   (暗金)
--accent-glow:   #d4b870   (皇家金)
--secondary:     #7b4fa0   (贵族紫)
--surface:       #1a1818   (暖炭黑)
--surface-alt:   #221e1e   (深棕底)
--text:          #d8d0c8
--text-dim:      #908878
--border:        #3a3030
--font-display:  "Noto Serif SC"
```
**特征**：华丽衬线标题 · 装饰性边框 .ornate-border · 暗金渐变 hero · 哥特风格引号 · Trajan风格大写英文

### 卡西米尔 — 骑士竞技
```
--accent:        #d4a030   (冠军金)
--accent-glow:   #f0c040   (聚光灯金)
--secondary:     #3050d4   (骑士蓝)
--tertiary:      #d43030   (竞技红)
--surface:       #1c1a18   (暖灰)
--surface-alt:   #24201c   (看台灰)
--text:          #d8d4d0
--text-dim:      #908880
--border:        #363028
--font-display:  "Noto Serif SC"
```
**特征**：赞助商标签 · 不对称杂志排版 · 烫金金属效果 · 对比色分割布局 · 赛事门票式卡片

### 莱茵生命 — 复古未来
```
--accent:        #40b4c0   (磁带青)
--accent-glow:   #80e8f0   (荧光青)
--secondary:     #f08040   (NASA橙)
--tertiary:      #f0f0e0   (实验室白)
--surface:       #111820   (深蓝灰)
--surface-alt:   #182028   (仪器灰)
--text:          #c0c8d0
--text-dim:      #708080
--border:        #283038
--font-display:  "Noto Sans SC"
--font-mono:     "JetBrains Mono"
```
**特征**：CRT 扫描线 · 打孔纸带字符 · 模块化网格 · 圆角几何按钮 · 包豪斯式留白 · 地铁拓扑图线条

### 炎国 — 新中式
```
--accent:        #c04040   (朱砂红)
--accent-glow:   #e06060   (宫灯红)
--secondary:     #40a040   (翡翠绿)
--tertiary:      #f0e8d8   (宣纸白)
--surface:       #1a1818   (墨色底)
--surface-alt:   #241e1c   (暖墨灰)
--text:          #d8d0c8
--text-dim:      #908878
--border:        #3a3028
--font-display:  "Noto Serif SC"
```
**特征**：竖排文字装饰 · 篆刻印章徽章 · 水墨晕染背景 · 留白大面积 · 岁兽纹样 · 灯笼暖光

### 拉特兰 — 神圣科技
```
--accent:        #d4b896   (圣金箔)
--accent-glow:   #f0d8b0   (圣光)
--secondary:     #6040a0   (彩窗紫)
--tertiary:      #f0e8d0   (羊皮纸)
--surface:       #181418   (暖紫黑)
--surface-alt:   #201c20   (教堂灰)
--text:          #d8d0c8
--text-dim:      #988878
--border:        #3a3038
--font-display:  "Noto Serif SC"
```
**特征**：编程字符画 · 彩色玻璃马赛克 · 光环放射线 · 语义分割标注 · 衬线体与代码混排

### 叙拉古 — 黑帮美学
```
--accent:        #c04040   (血红)
--accent-glow:   #e06050   (酒红辉)
--secondary:     #1a1a1a   (纯黑)
--tertiary:      #d4b896   (金纹)
--surface:       #0e0a0a   (极暗红黑)
--surface-alt:   #140c0c   (暗红底)
--text:          #d0c8c0
--text-dim:      #908880
--border:        #3a2020
--font-display:  "Noto Serif SC"
```
**特征**：火漆封印 · 家族纹章边框 · 花体英文 · 暗红与极黑强对比 · 雨夜街巷背景 · 铁艺花纹

### 伊比利亚 / 深海 — 大航海深渊
```
--accent:        #3a6a9a   (深海蓝)
--accent-glow:   #50c0c0   (生物荧光)
--secondary:     #2a4060   (深渊暗蓝)
--tertiary:      #d4a840   (灯塔金)
--surface:       #0a1018   (深蓝黑)
--surface-alt:   #0e1620   (航海图蓝)
--text:          #c0c8d4
--text-dim:      #688098
--border:        #1a2a40
--font-display:  "Noto Serif SC"
```
**特征**：焦散光线效果 .caustic · 航海罗盘图标 · Art Deco 放射线 · 黄金螺旋装饰 · 水下色散 border

### 谢拉格 — 雪境信仰
```
--accent:        #9ab8d8   (冰蓝)
--accent-glow:   #c0d8f0   (雪光)
--secondary:     #d8d8e8   (银白)
--tertiary:      #4a6090   (山峦蓝)
--surface:       #101420   (雪夜蓝)
--surface-alt:   #181c28   (冰川灰)
--text:          #d0d4e0
--text-dim:      #8890a8
--border:        #283040
--font-display:  "Noto Serif SC"
```
**特征**：曼荼罗几何 · 经幡色带 · 极简线条 · 雪山渐变背景 · 藏式纹饰边框 · 高亮度低饱和

### 多索雷斯 — 70s 波普
```
--accent:        #e87080   (热粉)
--accent-glow:   #f0a0b0   (霓虹粉)
--secondary:     #40d8d8   (泳池青)
--tertiary:      #f0e840   (阳光黄)
--surface:       #f8f4f0   (近白底)
--surface-alt:   #f0ece8   (暖白)
--text:          #1a1a1a   (黑字!)
--text-dim:      #606060
--border:        #d0c8c0
--font-display:  "Noto Sans SC"
```
**特征**：粗黑描边 .bold-outline · 半调网点 · 贴纸式标签 · 无投影纯平 · 高纯色强对比 · 嬉皮涂鸦

### 火山旅梦 — 蒸汽波梦核
```
--accent:        #e8a850   (落日橙)
--accent-glow:   #f0c880   (余晖)
--secondary:     #d87080   (暮霭粉)
--tertiary:      #f0d890   (暖奶油)
--surface:       #1a1410   (暖棕底)
--surface-alt:   #241c14   (旧照片棕)
--text:          #d8ccc0
--text-dim:      #908870
--border:        #3a3020
--font-display:  "Noto Serif SC"
```
**特征**：胶片颗粒 · CRT 扫描线 · 色调分离 · 棕榈树落日 · 双色印刷模拟 .duotone · 熔岩灯气泡字体

### 莱塔尼亚 — 古典歌剧
```
--accent:        #a060c0   (歌剧紫)
--accent-glow:   #c080e0   (水晶紫)
--secondary:     #d4a040   (铜管金)
--tertiary:      #402060   (深紫绒)
--surface:       #141018   (深紫黑)
--surface-alt:   #1c1420   (剧院紫灰)
--text:          #d0c8d8
--text-dim:      #887898
--border:        #302838
--font-display:  "Noto Serif SC"
```
**特征**：五线谱装饰线 · 巴洛克卷草纹 · 帷幕渐变 · 乐谱符号点缀 · 华丽金色描边

---

## 动态 UI 增强

### CSS 动画类（按需添加）

```css
/* ── 呼吸辉光（badge / 按钮） ── */
@keyframes breathe {
  0%, 100% { box-shadow: 0 0 8px var(--accent-glow), 0 0 20px color-mix(in srgb, var(--accent) 30%, transparent); }
  50%      { box-shadow: 0 0 16px var(--accent-glow), 0 0 40px color-mix(in srgb, var(--accent) 50%, transparent); }
}
.breathe { animation: breathe 3s ease-in-out infinite; }

/* ── 扫描线移动 ── */
@keyframes scanlines {
  0% { background-position: 0 0; }
  100% { background-position: 0 4px; }
}
.crt-live::after {
  content: "";
  position: absolute;
  inset: 0;
  background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.06) 2px, rgba(0,0,0,0.06) 4px);
  animation: scanlines 0.1s linear infinite;
  pointer-events: none;
}

/* ── Hero 光晕浮动 ── */
@keyframes aurora {
  0%, 100% { opacity: 0.8; transform: scale(1); }
  50%      { opacity: 1; transform: scale(1.05); }
}
.hero::before { animation: aurora 6s ease-in-out infinite; }

/* ── 边框脉冲 ── */
@keyframes border-pulse {
  0%, 100% { border-color: var(--border); }
  50%      { border-color: var(--accent); }
}
.card-pulse:hover { animation: border-pulse 1.5s ease-in-out infinite; }

/* ── 故障抖动（龙门/赛博风） ── */
@keyframes glitch {
  0%, 100% { transform: translate(0); }
  20%  { transform: translate(-2px, 1px); }
  40%  { transform: translate(2px, -1px); }
  60%  { transform: translate(-1px, -1px); }
  80%  { transform: translate(1px, 1px); }
}
.glitch:hover { animation: glitch 0.3s ease-in-out; }

/* ── 浮入揭示（滚动触发） ── */
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
}
.reveal.visible { opacity: 1; transform: translateY(0); }
```

### JS 动态层（`</body>` 前引入，~2KB，无依赖）

```html
<script>
(function(){
  /* ── 陀螺仪视差（Diegetic Interface 核心） ── */
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(e) {
      var hero = document.querySelector('.hero');
      if (!hero) return;
      var x = (e.gamma || 0) / 15;  // -6 ~ +6
      var y = (e.beta  || 0) / 20;  // -4 ~ +4
      hero.style.setProperty('--gyro-x', (x * 2).toFixed(1) + 'px');
      hero.style.setProperty('--gyro-y', (y * 2).toFixed(1) + 'px');
      hero.querySelector('h1').style.transform =
        'translate(' + x + 'px, ' + y + 'px)';
      var badge = hero.querySelector('.badge');
      if (badge) badge.style.transform =
        'translate(' + (x * 0.6) + 'px, ' + (y * 0.6) + 'px)';
    });
  }

  /* ── 滚动揭示 ── */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) {
      if (e.isIntersecting) e.target.classList.add('visible');
    });
  }, { threshold: 0.15 });
  document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });

  /* ── 鼠标跟随辉光（桌面端） ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function(e) {
      document.documentElement.style.setProperty(
        '--cursor-x', (e.clientX / window.innerWidth * 100).toFixed(1) + '%');
      document.documentElement.style.setProperty(
        '--cursor-y', (e.clientY / window.innerHeight * 100).toFixed(1) + '%');
    });
    document.documentElement.classList.add('cursor-glow');
  }

  /* ── 浮动粒子（仅 hero 区域） ── */
  var hero = document.querySelector('.hero');
  if (hero) {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.4';
    hero.appendChild(canvas);
    var ctx = canvas.getContext('2d');
    var dots = [];
    function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
    resize(); window.addEventListener('resize', resize);
    for (var i = 0; i < 30; i++) {
      dots.push({
        x: Math.random() * (canvas.width || 300),
        y: Math.random() * (canvas.height || 200),
        r: Math.random() * 1.5 + 0.3,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3
      });
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#f0a030';
      ctx.fillStyle = accent;
      dots.forEach(function(d) {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2); ctx.fill();
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width;
        if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height;
        if (d.y > canvas.height) d.y = 0;
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
})();
</script>
```

---

## 通用组件模式

### Hero 头部
```html
<section class="hero">
  <span class="badge breathe">罗德岛 · PRTS</span>
  <h1>页面标题</h1>
  <p class="subtitle">SUBTITLE / 副标题</p>
</section>
```

### 卡片（带揭示动画）
```html
<div class="card-grid">
  <div class="card card-pulse reveal">
    <h3>卡片标题 EN</h3>
    <div class="tag-row"><span class="tag">标签A</span></div>
    <ul><li>列表内容</li></ul>
  </div>
</div>
```

### 区块标题
```html
<div class="section-header reveal">
  <span class="badge">SECTION 01</span>
  <h2>区块标题</h2>
</div>
```

### 速查表格
```html
<table class="summary-table reveal">...</table>
```

### 引用块
```html
<div class="callout reveal">...</div>
<div class="callout quote reveal">...</div>
```

---

## 设计铁律（生成时必遵守）

1. **暗色底 + 单色点缀**：深色背景 (#0a0a0c 级)，亮色仅用于强调
2. **中英混排**：英文作为"科技/专业感"文化符号
3. **卡片布局**：信息承载单位用 card，边框+圆角
4. **箭头列表**：`▸` 替代圆点
5. **≤3 色**：底色、文字色、强调色
6. **字体纪律**：标题衬线、正文无衬线、代码等宽
7. **间距充裕**：低密度、大留白
8. **半透明边框**：`rgba(255,255,255,0.06)`
9. **Hero 光晕**：radial-gradient 从顶部洒下
10. **无外部依赖**：全部内联，零 CDN
11. **动态层**：Hero 必带粒子 canvas 和陀螺仪视差
12. **揭示动画**：正文卡片使用 .reveal + IntersectionObserver

---

## 快速匹配指南

| 用户关键词 | 匹配色板 |
|-----------|---------|
| 废土、工业、军事、冷静 | 罗德岛/切尔诺伯格 `#f0a030` |
| 赛博、霓虹、都市、香港 | 龙门 `#4a90d9` |
| 蒸汽、贵族、欧洲、古典 | 维多利亚 `#b89a50` |
| 竞技、骑士、体育、杂志 | 卡西米尔 `#d4a030` |
| 科技、实验室、NASA、代码 | 莱茵生命 `#40b4c0` |
| 国风、中国、春节、诗词 | 炎国 `#c04040` |
| 宗教、神圣、天使、教堂 | 拉特兰 `#d4b896` |
| 黑帮、意大利、犯罪、红酒 | 叙拉古 `#c04040` |
| 海洋、深海、恐怖、大航海 | 伊比利亚/深海 `#3a6a9a` |
| 雪、山、宗教、西藏 | 谢拉格 `#9ab8d8` |
| 夏天、波普、复古、贴纸 | 多索雷斯 `#e87080` |
| 蒸汽波、怀旧、CityPop、梦核 | 火山旅梦 `#e8a850` |
| 音乐、歌剧、古典乐、巴洛克 | 莱塔尼亚 `#a060c0` |
| 默认/未指定 | 罗德岛通用 `#f0a030` |
