/**
 * Fetch Monster Siren (塞壬唱片) music data and cache locally.
 * Run: node scripts/fetch-siren-data.js [--albums cid1,cid2,...] [--all]
 *
 * Without flags: fetches the first 20 albums (default)
 * --albums cid1,cid2: fetch specific album CIDs
 * --all: fetch ALL albums (may take a while)
 */
const https = require('https');
const fs = require('fs');
const path = require('path');

const API_BASE = 'monster-siren.hypergryph.com';
const CACHE_FILE = path.join(__dirname, '..', 'source', '_data', 'monster-siren.json');
const DELAY = 300; // ms between requests (be polite to the API)

function fetchJSON(urlPath) {
  return new Promise((resolve, reject) => {
    const opts = {
      hostname: API_BASE,
      path: urlPath,
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' },
      timeout: 15000,
    };
    https.get(opts, (res) => {
      let body = '';
      res.on('data', (chunk) => (body += chunk));
      res.on('end', () => {
        try {
          const json = JSON.parse(body);
          if (json.code === 0) resolve(json.data);
          else reject(new Error(`API error: ${json.msg || 'unknown'}`));
        } catch (e) {
          reject(new Error(`Parse error for ${urlPath}: ${e.message}`));
        }
      });
    }).on('error', reject);
  });
}

function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function fetchAlbums() {
  console.log('[MSR] Fetching album list...');
  const albums = await fetchJSON('/api/albums');
  console.log(`[MSR] Found ${albums.length} albums`);
  return albums;
}

async function fetchAlbumDetail(cid) {
  try {
    const detail = await fetchJSON(`/api/album/${cid}/detail`);
    return detail;
  } catch (e) {
    console.error(`[MSR] Failed to fetch album ${cid}: ${e.message}`);
    return null;
  }
}

async function fetchSongDetail(cid) {
  try {
    const song = await fetchJSON(`/api/song/${cid}`);
    return song;
  } catch (e) {
    console.error(`[MSR] Failed to fetch song ${cid}: ${e.message}`);
    return null;
  }
}

async function main() {
  const args = process.argv.slice(2);
  const allFlag = args.includes('--all');
  const albumsIdx = args.indexOf('--albums');
  const specificCids = albumsIdx >= 0 ? args[albumsIdx + 1].split(',') : null;

  // Load existing cache
  let cache = { songs: {}, albums: {} };
  try {
    cache = JSON.parse(fs.readFileSync(CACHE_FILE, 'utf8'));
    console.log(`[MSR] Loaded existing cache: ${Object.keys(cache.songs).length} songs, ${Object.keys(cache.albums).length} albums`);
  } catch (_) {
    console.log('[MSR] No existing cache, starting fresh');
  }

  let albumList = [];

  if (specificCids) {
    console.log(`[MSR] Fetching ${specificCids.length} specific album(s): ${specificCids.join(', ')}`);
    albumList = specificCids.map((cid) => ({ cid, name: cid }));
  } else {
    albumList = await fetchAlbums();
    if (!allFlag) {
      const count = Math.min(20, albumList.length);
      console.log(`[MSR] Limiting to first ${count} albums (use --all for everything)`);
      albumList = albumList.slice(0, count);
    }
  }

  let newSongs = 0;
  let newAlbums = 0;

  for (let i = 0; i < albumList.length; i++) {
    const album = albumList[i];
    console.log(`[MSR] [${i + 1}/${albumList.length}] Fetching album: ${album.name} (${album.cid})`);

    // Skip if already cached with songs
    if (cache.albums[album.cid] && cache.albums[album.cid].songs && cache.albums[album.cid].songs.length > 0) {
      console.log(`  -> Already cached, skipping`);
      continue;
    }

    const detail = await fetchAlbumDetail(album.cid);
    if (!detail) continue;

    // Store album
    const albumEntry = {
      cid: detail.cid || album.cid,
      name: detail.name || album.name,
      coverUrl: detail.coverUrl || album.coverUrl || '',
      intro: detail.intro || '',
      songs: [],
    };

    const songList = detail.songs || [];
    for (let j = 0; j < songList.length; j++) {
      const s = songList[j];
      // Skip if already cached with URL
      if (cache.songs[s.cid] && cache.songs[s.cid].sourceUrl) {
        albumEntry.songs.push(cache.songs[s.cid]);
        continue;
      }

      const songDetail = await fetchSongDetail(s.cid);
      await sleep(DELAY);

      if (songDetail) {
        const songEntry = {
          cid: songDetail.cid || s.cid,
          name: songDetail.name || s.name,
          artistes: songDetail.artists || songDetail.artistes || s.artistes || [],
          albumCid: album.cid,
          albumName: album.name || albumEntry.name,
          sourceUrl: songDetail.sourceUrl || '',
          coverUrl: detail.coverUrl || album.coverUrl || '',
          lyricUrl: songDetail.lyricUrl || null,
        };
        cache.songs[songEntry.cid] = songEntry;
        albumEntry.songs.push(songEntry);
        newSongs++;
        console.log(`    -> ${songEntry.name}`);
      }
    }

    cache.albums[albumEntry.cid] = albumEntry;
    newAlbums++;
    await sleep(DELAY);
  }

  // Write cache
  const dir = path.dirname(CACHE_FILE);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf8');
  console.log(`\n[MSR] Done! Cache saved to ${CACHE_FILE}`);
  console.log(`[MSR] Total: ${Object.keys(cache.songs).length} songs, ${Object.keys(cache.albums).length} albums`);
  console.log(`[MSR] New this run: ${newSongs} songs, ${newAlbums} albums`);
}

main().catch((e) => {
  console.error('[MSR] Fatal error:', e.message);
  process.exit(1);
});
