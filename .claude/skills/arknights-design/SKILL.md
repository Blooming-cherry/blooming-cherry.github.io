---
name: arknights-design
description: Use when the user asks for Arknights-themed pages, 明日方舟风格, arknights UI, dark industrial sci-fi HTML, 方舟配色, or any of the 14 story-arc palettes (罗德岛/龙门/维多利亚/卡西米尔/莱茵生命/炎国/拉特兰/叙拉古/伊比利亚/谢拉格/多索雷斯/火山旅梦/莱塔尼亚). Also use when the user says "generate a page", "create a blog template", or "make a styled HTML" in a context where a dark sci-fi industrial aesthetic fits.
---

# Arknights Design System v2

Zero-dependency HTML/CSS/JS design system based on Arknights UI language. 14 story-arc palettes, CSS animations, dynamic layers. Output: single inline HTML file.

## Workflow (strict order)

1. **Match palette** — use Quick Match table below based on user keywords
2. **Copy base.css** — inline the ENTIRE contents of `base.css` into a `<style>` tag
3. **Set CSS variables** — uncomment the matching story arc's `:root` block from base.css (default: 罗德岛 `#f0a030`)
4. **Assemble HTML** — use ONLY the component patterns listed below. Do NOT invent new components
5. **Inject dynamic JS** — copy the Dynamic Layer `<script>` block before `</body>`
6. **Output single file** — everything inline, zero CDN, zero external dependencies

## Design Rules (iron laws — never break)

1. Dark base (`#0a0a0c` level) + single accent color. Brightness reserved for `--accent` only
2. Bilingual labels: `ENGLISH / 中文` format on section headers, nav, badges
3. Card layout: `.card` with `1px solid var(--border)` + `border-radius: 6px`
4. Arrow lists: `▸` as list marker, never `•` or `-`
5. ≤3 colors: background, text, accent. No rainbow
6. Font discipline: serif display (`Noto Serif SC`), sans body (`Noto Sans SC`), mono code (`JetBrains Mono`)
7. Generous spacing: low density, large whitespace
8. Translucent borders: `rgba(255,255,255,0.06)` for subtle separation
9. Hero glow: `radial-gradient(ellipse at 50% 0%, ...)` spilling from top center
10. Zero dependencies: all inline, no CDN, no Google Fonts, no icon libraries
11. Dynamic layer: Hero MUST have particle canvas + gyroscope parallax + cursor glow + scroll reveal
12. Reveal animation: content cards use `.reveal` + IntersectionObserver

## Anti-Patterns (do NOT add)

| Forbidden | Reason |
|---|---|
| Status bars / terminal mockups | Not part of the design system |
| Hexagon decorations / grid backgrounds | Over-engineering, not in component set |
| Pagination components | Use simple prev/next links if needed |
| Stats strips / KPI counters | Not a dashboard, keep it content-focused |
| Custom logo/CSS art | Use `.site-brand` text, no SVG/icon glyphs |
| Color palettes outside the 14 | The 14 story arcs are the complete set |
| Custom variable names | Use ONLY `--accent`, `--accent-glow`, `--secondary`, `--surface`, `--surface2`, `--border`, `--text`, `--text2` |
| `--text-muted`, `--bg-deep`, `--bg-panel` etc. | These are NOT standard variables |

## Quick Match

| Keywords | Story Arc | `--accent` | Texture hints |
|---|---|---|---|
| default/none specified | 罗德岛·切尔诺伯格 | `#f0a030` | `.grain` `.caution-stripe` |
| 赛博/霓虹/都市/香港/龙门 | 龙门 | `#4a90d9` | `.crt-scanlines` `.crt-live` `.glitch` |
| 蒸汽/贵族/欧洲/古典/维多利亚 | 维多利亚 | `#b89a50` | ornate serif, gold gradient |
| 竞技/骑士/体育/杂志/卡西米尔 | 卡西米尔 | `#d4a030` | asymmetric layout, metallic |
| 科技/实验室/代码/NASA/莱茵生命 | 莱茵生命 | `#40b4c0` | `.crt-scanlines`, modular grid |
| 国风/中国/诗词/春节/炎国 | 炎国 | `#c04040` | vertical text, stamp badges |
| 宗教/神圣/天使/教堂/拉特兰 | 拉特兰 | `#d4b896` | code-art, stained glass |
| 黑帮/意大利/犯罪/红酒/叙拉古 | 叙拉古 | `#c04040` | wax seals, heraldry |
| 海洋/深海/恐怖/航海/伊比利亚 | 伊比利亚·深海 | `#3a6a9a` | caustic light, compass |
| 雪/山/西藏/信仰/谢拉格 | 谢拉格 | `#9ab8d8` | mandala, sutra bands |
| 夏天/波普/贴纸/涂鸦/多索雷斯 | 多索雷斯 | `#e87080` | `.halftone-bg`, bold outline, LIGHT bg |
| 蒸汽波/CityPop/怀旧/梦核 | 火山旅梦 | `#e8a850` | film grain, duotone, CRT |
| 音乐/歌剧/古典乐/巴洛克 | 莱塔尼亚 | `#a060c0` | staff lines, baroque scrolls |

## 14 Palettes (compact reference)

Each line = one `:root` block. Read base.css for the full commented-out versions.

```
罗德岛(默认): --accent #f0a030 --accent-glow #f0c060 --secondary #8b7355 --surface #141418 --surface2 #1c1c22 --border #2a2a32 --text #c8c8d0 --text2 #909098
龙门:        --accent #4a90d9 --accent-glow #80c0ff --secondary #d94a8a --surface #0d111a --surface2 #111827 --border #1e3050 --text #c8d0e0 --text2 #7080a0
维多利亚:    --accent #b89a50 --accent-glow #d4b870 --secondary #7b4fa0 --surface #1a1818 --surface2 #221e1e --border #3a3030 --text #d8d0c8 --text2 #908878
卡西米尔:    --accent #d4a030 --accent-glow #f0c040 --secondary #3050d4 --surface #1c1a18 --surface2 #24201c --border #363028 --text #d8d4d0 --text2 #908880
莱茵生命:    --accent #40b4c0 --accent-glow #80e8f0 --secondary #f08040 --surface #111820 --surface2 #182028 --border #283038 --text #c0c8d0 --text2 #708080
炎国:        --accent #c04040 --accent-glow #e06060 --secondary #40a040 --surface #1a1818 --surface2 #241e1c --border #3a3028 --text #d8d0c8 --text2 #908878
拉特兰:      --accent #d4b896 --accent-glow #f0d8b0 --secondary #6040a0 --surface #181418 --surface2 #201c20 --border #3a3038 --text #d8d0c8 --text2 #988878
叙拉古:      --accent #c04040 --accent-glow #e06050 --secondary #1a1a1a --surface #0e0a0a --surface2 #140c0c --border #3a2020 --text #d0c8c0 --text2 #908880
伊比利亚:    --accent #3a6a9a --accent-glow #50c0c0 --secondary #2a4060 --surface #0a1018 --surface2 #0e1620 --border #1a2a40 --text #c0c8d4 --text2 #688098
谢拉格:      --accent #9ab8d8 --accent-glow #c0d8f0 --secondary #d8d8e8 --surface #101420 --surface2 #181c28 --border #283040 --text #d0d4e0 --text2 #8890a8
多索雷斯:    --accent #e87080 --accent-glow #f0a0b0 --secondary #40d8d8 --surface #f8f4f0 --surface2 #f0ece8 --border #d0c8c0 --text #1a1a1a --text2 #606060 ← LIGHT bg, DARK text
火山旅梦:    --accent #e8a850 --accent-glow #f0c880 --secondary #d87080 --surface #1a1410 --surface2 #241c14 --border #3a3020 --text #d8ccc0 --text2 #908870
莱塔尼亚:    --accent #a060c0 --accent-glow #c080e0 --secondary #d4a040 --surface #141018 --surface2 #1c1420 --border #302838 --text #d0c8d8 --text2 #887898
```

## Component Patterns (use EXACTLY these)

### Hero (REQUIRED — every page must have one)
```html
<section class="hero">
  <span class="badge breathe">RHODES ISLAND / 罗德岛</span>
  <h1>Page Title / 页面标题</h1>
  <p class="subtitle">SUBTITLE / 副标题</p>
</section>
```

### Site Header (REQUIRED)
```html
<header class="site-header">
  <div class="container">
    <a href="/" class="site-brand">SITE NAME / 站点名</a>
    <ul class="site-nav">
      <li><a href="/">HOME / 首页</a></li>
      <li><a href="/archives">ARCHIVES / 归档</a></li>
    </ul>
  </div>
</header>
```

### Section Header
```html
<div class="section-header reveal">
  <span class="badge">SECTION 01</span>
  <h2>Section Title / 区块标题</h2>
</div>
```

### Card Grid
```html
<div class="card-grid">
  <div class="card reveal">
    <h3>Card Title / 卡片标题</h3>
    <div class="meta">YYYY-MM-DD / CATEGORY</div>
    <div class="tag-row"><span class="tag">TAG</span></div>
    <ul><li>List item / 列表项</li></ul>
  </div>
</div>
```

### Summary Table
```html
<table class="summary-table reveal">
  <thead><tr><th>Column A</th><th>Column B</th></tr></thead>
  <tbody><tr><td>Data</td><td>Data</td></tr></tbody>
</table>
```

### Callout / TOC
```html
<div class="callout reveal">Info / 提示</div>
<div class="callout quote reveal">Quote / 引用</div>
<nav class="toc reveal"><h3>CONTENTS / 目录</h3>...</nav>
```

### Footer (REQUIRED)
```html
<footer>
  &copy; YEAR <a href="/">AUTHOR</a>
  · Powered by <a href="https://hexo.io/">HEXO</a>
  · Theme <a href="#">Arknights Design</a>
</footer>
```

## Optional Texture Classes

Add to any element for visual depth:

| Class | Effect | Best for |
|---|---|---|
| `.glass` | Frosted glass panel | Nav, floating panels |
| `.grain` | Film grain overlay | 罗德岛, 火山旅梦 |
| `.halftone-bg` | Halftone dot pattern | 多索雷斯 |
| `.caution-stripe` | Warning stripe diagonal | 罗德岛, industrial |
| `.crt-scanlines::after` | CRT scanlines (static) | 龙门, 莱茵生命 |
| `.crt-live::after` | CRT scanlines (animated) | 龙门, cyberpunk |
| `.glitch` | Glitch skew on hover | 龙门 |
| `.cursor-glow` | Mouse-follow radial glow | Global (JS required) |
| `.split` | Two-column grid layout | Content pages |

## Dynamic Layer (REQUIRED — inject before `</body>`)

```html
<script>
(function(){
  /* Gyroscope parallax */
  if (window.DeviceOrientationEvent) {
    window.addEventListener('deviceorientation', function(e) {
      var hero = document.querySelector('.hero');
      if (!hero) return;
      var x = (e.gamma || 0) / 15, y = (e.beta || 0) / 20;
      var h1 = hero.querySelector('h1');
      var badge = hero.querySelector('.badge');
      if (h1) h1.style.transform = 'translate(' + x.toFixed(1) + 'px, ' + y.toFixed(1) + 'px)';
      if (badge) badge.style.transform = 'translate(' + (x*0.6).toFixed(1) + 'px, ' + (y*0.6).toFixed(1) + 'px)';
    });
  }

  /* Scroll reveal */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(e) { if (e.isIntersecting) e.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(function(el) { observer.observe(el); });

  /* Cursor glow (desktop) */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function(e) {
      document.documentElement.style.setProperty('--cursor-x', (e.clientX/window.innerWidth*100).toFixed(1)+'%');
      document.documentElement.style.setProperty('--cursor-y', (e.clientY/window.innerHeight*100).toFixed(1)+'%');
    });
    document.documentElement.classList.add('cursor-glow');
  }

  /* Hero floating particles */
  var hero = document.querySelector('.hero');
  if (hero) {
    var canvas = document.createElement('canvas');
    canvas.style.cssText = 'position:absolute;inset:0;pointer-events:none;z-index:1;opacity:0.35';
    hero.appendChild(canvas);
    var ctx = canvas.getContext('2d'), dots = [], count = 35;
    function resize() { canvas.width = hero.offsetWidth; canvas.height = hero.offsetHeight; }
    resize(); window.addEventListener('resize', resize);
    for (var i = 0; i < count; i++) {
      dots.push({ x: Math.random()*canvas.width, y: Math.random()*canvas.height,
        r: Math.random()*1.6+0.3, vx: (Math.random()-0.5)*0.25, vy: (Math.random()-0.5)*0.25 });
    }
    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      var accent = getComputedStyle(document.documentElement).getPropertyValue('--accent').trim() || '#f0a030';
      ctx.fillStyle = accent;
      dots.forEach(function(d) {
        ctx.beginPath(); ctx.arc(d.x, d.y, d.r, 0, Math.PI*2); ctx.fill();
        d.x += d.vx; d.y += d.vy;
        if (d.x < 0) d.x = canvas.width; if (d.x > canvas.width) d.x = 0;
        if (d.y < 0) d.y = canvas.height; if (d.y > canvas.height) d.y = 0;
      });
      requestAnimationFrame(draw);
    }
    draw();
  }
})();
</script>
```

Thematic CSS tweaks (e.g., `.badge-stamp` seal-style badge for 炎国) are allowed but must be ≤20 lines and must not introduce new colors outside the palette.

## Common Mistakes (from real agent failures)

| Mistake | Fix |
|---|---|
| Using amber `#f0a040` for 炎国 | 炎国 = `#c04040` (朱砂红). Always check Quick Match |
| Inventing `--bg-deep`, `--text-muted` | Use ONLY the 8 standard variable names |
| Adding status bars, hex grids, stat counters | These are NOT in the component set. Delete them |
| Pure Chinese headers, no English | Always use `ENGLISH / 中文` bilingual format |
| Skipping the Dynamic Layer `<script>` | It's REQUIRED. Inject before `</body>` |
| Using Google Fonts or CDN links | Everything inline. Zero external dependencies |
| Custom card classes like `.article-card` | Use `.card` inside `.card-grid` |
| Forgetting `breathe` animation on badge | Hero badge always gets class `breathe` |
