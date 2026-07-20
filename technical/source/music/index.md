---
title: MUSIC / 塞壬唱片
date: 2026-05-24 12:00:00
type: "music"
layout: page
description: "明日方舟官方音乐厂牌塞壬唱片(Monster Siren)作品选"
---

<style>
.vinyl-stage{display:flex;flex-direction:column;align-items:center;padding:48px 0;user-select:none}
.vinyl-deck{position:relative;width:300px;height:300px;margin-bottom:24px}
.vinyl-disc{width:300px;height:300px;border-radius:50%;background:linear-gradient(135deg,#1a1a1a 0%,#333 30%,#1a1a1a 50%,#2a2a2a 70%,#111 100%);position:relative;overflow:hidden;box-shadow:0 8px 40px rgba(0,0,0,0.5),inset 0 0 0 8px #0a0a0a,inset 0 0 0 12px #1a1a1a,inset 0 0 0 16px #0a0a0a,inset 0 0 0 20px #222}
.vinyl-disc img{width:120px;height:120px;border-radius:50%;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);object-fit:cover;z-index:2;border:4px solid #1a1a1a}
.vinyl-disc .groove{position:absolute;inset:30px;border-radius:50%;border:1px solid rgba(255,255,255,0.04)}
.vinyl-disc .groove:nth-child(2){inset:60px}
.vinyl-disc .groove:nth-child(3){inset:90px}
.vinyl-disc .center-hole{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:12px;height:12px;border-radius:50%;background:#0a0a0c;z-index:3;border:2px solid #333}
.vinyl-spinning{animation:vinylSpin 3s linear infinite}
@keyframes vinylSpin{from{transform:rotate(0deg)}to{transform:rotate(360deg)}}
.vinyl-tonearm{position:absolute;top:20px;right:-30px;width:120px;height:8px;background:linear-gradient(90deg,#888,#444);border-radius:4px;transform:rotate(25deg);transform-origin:right center;z-index:5;transition:transform .4s ease}
.vinyl-tonearm::after{content:'';position:absolute;right:0;top:-4px;width:16px;height:16px;border-radius:50%;background:#666;border:2px solid #444}
.vinyl-tonearm.playing{transform:rotate(15deg)}
.vinyl-info{text-align:center;margin-bottom:20px}
.vinyl-info .track-title{font-size:20px;font-weight:700;color:#333;margin-bottom:4px}
.vinyl-info .track-artist{font-size:14px;color:#888}
.vinyl-progress-wrap{width:320px;display:flex;align-items:center;gap:10px;margin-bottom:12px}
.vinyl-progress-bar{flex:1;height:4px;background:#e0e0e0;border-radius:2px;cursor:pointer;position:relative;overflow:visible}
.vinyl-progress-fill{height:100%;background:#222;border-radius:2px;transition:width .1s linear;position:relative}
.vinyl-progress-fill::after{content:'';position:absolute;right:-6px;top:-4px;width:12px;height:12px;border-radius:50%;background:#222;opacity:0;transition:opacity .15s}
.vinyl-progress-wrap:hover .vinyl-progress-fill::after{opacity:1}
.vinyl-time{font-size:11px;color:#999;font-family:"JetBrains Mono","Consolas",monospace;min-width:38px}
.vinyl-controls{display:flex;align-items:center;gap:24px}
.vinyl-btn{width:44px;height:44px;border-radius:50%;border:2px solid #ccc;background:#fff;cursor:pointer;display:flex;align-items:center;justify-content:center;transition:all .2s;color:#333}
.vinyl-btn:hover{border-color:#333;box-shadow:0 2px 12px rgba(0,0,0,0.1)}
.vinyl-btn.play-btn{width:56px;height:56px;background:#222;border-color:#222;color:#fff}
.vinyl-btn.play-btn:hover{background:#000;border-color:#000;box-shadow:0 4px 20px rgba(0,0,0,0.25)}
.vinyl-btn svg{width:18px;height:18px}
.vinyl-btn.play-btn svg{width:22px;height:22px}
.vinyl-playlist{width:320px;margin-top:32px;border-top:1px solid #eee;padding-top:16px}
.vinyl-playlist-item{display:flex;align-items:center;gap:12px;padding:8px 12px;border-radius:4px;cursor:pointer;transition:background .15s;font-size:14px}
.vinyl-playlist-item:hover{background:#f5f5f5}
.vinyl-playlist-item.active{background:#f0f0f0;font-weight:600}
.vinyl-playlist-item .pl-num{width:24px;text-align:center;color:#999;font-size:12px}
.vinyl-playlist-item.active .pl-num{color:#222}
.vinyl-playlist-item .pl-title{flex:1;color:#333}
.vinyl-playlist-item .pl-dur{color:#999;font-size:12px}
.darkmode--activated .vinyl-info .track-title{color:#ddd}
.darkmode--activated .vinyl-info .track-artist{color:#888}
.darkmode--activated .vinyl-progress-bar{background:#333}
.darkmode--activated .vinyl-progress-fill{background:#ccc}
.darkmode--activated .vinyl-btn{background:#2a2a2a;border-color:#444;color:#ccc}
.darkmode--activated .vinyl-btn.play-btn{background:#ccc;border-color:#ccc;color:#222}
.darkmode--activated .vinyl-playlist{border-color:#333}
.darkmode--activated .vinyl-playlist-item:hover{background:#2a2a2a}
.darkmode--activated .vinyl-playlist-item.active{background:#333}
.darkmode--activated .vinyl-playlist-item .pl-title{color:#ccc}
@media(max-width:500px){.vinyl-deck{width:240px;height:240px}.vinyl-disc{width:240px;height:240px}.vinyl-disc img{width:100px;height:100px}.vinyl-progress-wrap,.vinyl-playlist{width:280px}}
</style>

<div class="vinyl-stage">
  <div class="vinyl-deck">
    <div class="vinyl-disc" id="vinylDisc">
      <div class="groove"></div>
      <div class="groove"></div>
      <div class="groove"></div>
      <img id="vinylCover" src="" alt="Cover">
      <div class="center-hole"></div>
    </div>
    <div class="vinyl-tonearm" id="vinylTonearm"></div>
  </div>

  <div class="vinyl-info">
    <div class="track-title" id="trackTitle">—</div>
    <div class="track-artist" id="trackArtist">—</div>
  </div>

  <div class="vinyl-progress-wrap">
    <span class="vinyl-time" id="timeCur">00:00</span>
    <div class="vinyl-progress-bar" id="progressBar">
      <div class="vinyl-progress-fill" id="progressFill" style="width:0%"></div>
    </div>
    <span class="vinyl-time" id="timeDur">00:00</span>
  </div>

  <div class="vinyl-controls">
    <button class="vinyl-btn" onclick="prevTrack()" title="上一首">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
    </button>
    <button class="vinyl-btn play-btn" id="playBtn" onclick="togglePlay()" title="播放/暂停">
      <svg id="playIcon" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
      <svg id="pauseIcon" viewBox="0 0 24 24" fill="currentColor" style="display:none"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
    </button>
    <button class="vinyl-btn" onclick="nextTrack()" title="下一首">
      <svg viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
    </button>
  </div>

  <div class="vinyl-playlist" id="playlist"></div>
</div>

<script>
(function(){
  // Must wait for body-end.swig to create window.__vinyl first
  function init() {
    var V = window.__vinyl;
    if (!V) { setTimeout(init, 50); return; }

    var audio = V.audio;
    var playlist = V.playlist;

    var disc = document.getElementById('vinylDisc');
    var tonearm = document.getElementById('vinylTonearm');
    var cover = document.getElementById('vinylCover');
    var titleEl = document.getElementById('trackTitle');
    var artistEl = document.getElementById('trackArtist');
    var playIcon = document.getElementById('playIcon');
    var pauseIcon = document.getElementById('pauseIcon');
    var fill = document.getElementById('progressFill');
    var bar = document.getElementById('progressBar');
    var timeCur = document.getElementById('timeCur');
    var timeDur = document.getElementById('timeDur');

    function fmt(t){var m=Math.floor(t/60);var s=Math.floor(t%60);return (m<10?'0'+m:m)+':'+(s<10?'0'+s:s)}

    function updateUI() {
      var i = V.getIdx();
      var t = playlist[i];
      cover.src = t.cover;
      titleEl.textContent = t.name;
      artistEl.textContent = t.artist + ' · ' + t.album;
      var rows = document.querySelectorAll('.vinyl-playlist-item');
      rows.forEach(function(el, j) { el.classList.toggle('active', j === i); });
      var p = !audio.paused;
      disc.classList.toggle('vinyl-spinning', p);
      tonearm.classList.toggle('playing', p);
      playIcon.style.display = p ? 'none' : 'block';
      pauseIcon.style.display = p ? 'block' : 'none';
    }

    // UI-only event listeners — guarded to prevent duplicates on PJAX re-entry
    if (!audio.__musicUIInit) {
      audio.__musicUIInit = true;
      audio.addEventListener('loadedmetadata', function() { timeDur.textContent = fmt(audio.duration); });
      audio.addEventListener('timeupdate', function() {
        if (!audio.duration) return;
        fill.style.width = (audio.currentTime / audio.duration * 100) + '%';
        timeCur.textContent = fmt(audio.currentTime);
      });
      audio.addEventListener('play', updateUI);
      audio.addEventListener('pause', updateUI);
    }

    // Progress bar click
    bar.addEventListener('click', function(e) {
      if (!audio.duration) return;
      var rect = bar.getBoundingClientRect();
      audio.currentTime = (e.clientX - rect.left) / rect.width * audio.duration;
    });

    // Render playlist
    var plEl = document.getElementById('playlist');
    plEl.innerHTML = '';
    playlist.forEach(function(t, i) {
      var item = document.createElement('div');
      item.className = 'vinyl-playlist-item';
      item.innerHTML = '<span class="pl-num">' + (i < 9 ? '0' + (i + 1) : i + 1) + '</span><span class="pl-title">' + t.name + '</span><span class="pl-dur">' + t.artist + '</span>';
      item.addEventListener('click', function() {
        V.load(i);
        if (audio.paused) V.toggle();
      });
      plEl.appendChild(item);
    });

    // Expose for HTML onclick handlers
    window.togglePlay = function() { V.toggle(); };
    window.nextTrack = function() { V.next(); };
    window.prevTrack = function() { V.prev(); };

    // Sync UI
    updateUI();
    timeDur.textContent = audio.duration ? fmt(audio.duration) : '00:00';
  }

  // Defer: on first load wait for DOM & body-end.swig; on PJAX run ASAP
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
</script>
