/**
 * Monster Siren (塞壬唱片) music integration for Hexo.
 * Usage:
 *   {% siren "song_cid" %}         — single track player
 *   {% siren_album "album_cid" %}  — full album playlist
 *
 * Data cache: source/_data/monster-siren.json
 * Fetch script: node tools/fetch-siren-data.js
 */
const fs = require('fs');
const path = require('path');

const CACHE_FILE = path.join(__dirname, '..', 'source', '_data', 'monster-siren.json');

function loadCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
  } catch (_) {
    return { songs: {}, albums: {} };
  }
}

function aplayerHTML(song, theme) {
  const t = theme || '#c04040';
  const title = (song.name || 'Untitled').replace(/'/g, "\\'");
  const author = (song.artistes || song.artists || ['Unknown']).join(', ').replace(/'/g, "\\'");
  const url = song.sourceUrl || song.url || '';
  const cover = song.coverUrl || song.pic || '';

  if (!url) {
    return `<div class="callout" style="margin:16px 0;font-size:13px;color:var(--text2);">
      [MSR] ${song.name || 'Unknown'} — 暂无音频链接
    </div>`;
  }

  return `<div class="siren-player" style="margin:20px 0;">
<!-- APlayer assets injected by hexo-tag-aplayer -->
<div class="aplayer"
  data-id="${song.cid || ''}"
  data-name="${title}"
  data-artist="${author}"
  data-url="${url}"
  data-cover="${cover}"
  data-theme="${t}"
  data-autoplay="false"
  data-preload="auto"
  data-mutex="true"></div>
<!-- APlayer JS injected by hexo-tag-aplayer -->
</div>`;
}

// {% siren "song_cid" %} or {% siren "song_cid" "theme_color" %}
hexo.extend.tag.register('siren', function (args) {
  const cid = args[0];
  const theme = args[1] || undefined;
  const cache = loadCache();
  const song = cache.songs[cid];

  if (!song) {
    return `<div class="callout" style="margin:16px 0;font-size:13px;color:var(--text2);">
      [MSR] 未找到歌曲 CID: ${cid} — 请运行 node tools/fetch-siren-data.js 更新缓存
    </div>`;
  }

  return aplayerHTML(song, theme);
}, { ends: false });

// {% siren_album "album_cid" %} or {% siren_album "album_cid" "theme_color" %}
hexo.extend.tag.register('siren_album', function (args) {
  const cid = args[0];
  const theme = args[1] || undefined;
  const cache = loadCache();
  const album = cache.albums[cid];

  if (!album || !album.songs || album.songs.length === 0) {
    return `<div class="callout" style="margin:16px 0;font-size:13px;color:var(--text2);">
      [MSR] 未找到专辑 CID: ${cid} — 请运行 node tools/fetch-siren-data.js 更新缓存
    </div>`;
  }

  // Build APlayer playlist
  const tracks = album.songs
    .filter(s => s.sourceUrl)
    .map((s, i) => ({
      name: s.name || `Track ${i + 1}`,
      artist: (s.artistes || s.artists || ['Unknown']).join(', '),
      url: s.sourceUrl,
      cover: s.coverUrl || album.coverUrl || '',
    }));

  if (tracks.length === 0) {
    return `<div class="callout" style="margin:16px 0;font-size:13px;color:var(--text2);">
      [MSR] 专辑 ${album.name} 无可用音频链接
    </div>`;
  }

  const json = JSON.stringify(tracks);
  const t = theme || '#c04040';

  return `<div class="siren-player" style="margin:20px 0;">
<!-- APlayer assets injected by hexo-tag-aplayer -->
<div id="siren-album-${cid}" class="aplayer"></div>
<!-- APlayer JS injected by hexo-tag-aplayer -->
<script>
(function(){
  if (typeof APlayer === 'undefined') return setTimeout(arguments.callee, 200);
  new APlayer({
    container: document.getElementById('siren-album-${cid}'),
    audio: ${json},
    theme: '${t}',
    autoplay: false,
    preload: 'auto',
    mutex: true,
    listFolded: true,
    listMaxHeight: '280px'
  });
})();
</script>
</div>`;
}, { ends: false });
