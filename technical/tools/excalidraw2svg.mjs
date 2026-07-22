#!/usr/bin/env node
/**
 * Convert an Excalidraw .md file (from Obsidian Excalidraw plugin) to SVG.
 * Usage: node scripts/excalidraw2svg.mjs <input.excalidraw.md> [output.svg]
 */

import { readFileSync, writeFileSync } from 'fs';
import { createRequire } from 'module';
import { dirname, basename } from 'path';

const require = createRequire(import.meta.url);
const LZString = require('lz-string');

// Parse command line
const inputFile = process.argv[2];
const outputFile = process.argv[3] || inputFile.replace(/\.excalidraw\.md$/, '.svg');

if (!inputFile) {
  console.error('Usage: node excalidraw2svg.mjs <input.excalidraw.md> [output.svg]');
  process.exit(1);
}

// Read and decompress
const raw = readFileSync(inputFile, 'utf8');
const match = raw.match(/```compressed-json\n([A-Za-z0-9+/=\n]+)```/);
if (!match) {
  console.error('No compressed-json block found in', inputFile);
  process.exit(1);
}

const b64 = match[1].replace(/\s/g, '');
const json = LZString.decompressFromBase64(b64);
if (!json) {
  console.error('Failed to decompress data');
  process.exit(1);
}

const data = JSON.parse(json);
const elements = data.elements || [];
const appState = data.appState || {};

// Calculate bounding box
let minX = 0, minY = 0, maxX = 0, maxY = 0;
for (const el of elements) {
  if (el.isDeleted) continue;
  const x = el.x || 0, y = el.y || 0;
  const w = el.width || 0, h = el.height || 0;
  minX = Math.min(minX, x);
  minY = Math.min(minY, y);
  maxX = Math.max(maxX, x + w);
  maxY = Math.max(maxY, y + h);
  // Also check bound elements (text on arrows, etc.)
  if (el.boundElements) {
    for (const be of el.boundElements) {
      // bound elements are referenced by ID, we handle them during their own iteration
    }
  }
}

const PAD = 20;
const hasElements = elements.length > 0 && elements.some(el => !el.isDeleted);
const width = hasElements ? (maxX - minX + PAD * 2) : 800;
const height = hasElements ? (maxY - minY + PAD * 2) : 400;

if (!hasElements) {
  console.warn('⚠ Drawing has no elements — generating placeholder canvas (800x400).');
}

// Helper: map element to SVG
function renderElement(el) {
  if (el.isDeleted) return '';
  const x = (el.x || 0) - minX + PAD;
  const y = (el.y || 0) - minY + PAD;
  const w = el.width || 0;
  const h = el.height || 0;
  const stroke = el.strokeColor || '#1e1e1e';
  const fill = el.backgroundColor || 'transparent';
  const sw = el.strokeWidth || 1;
  const opacity = el.opacity ?? 100;
  const opacityAttr = opacity < 100 ? ` opacity="${opacity / 100}"` : '';

  // Handle roundness
  const roundness = el.roundness ? Math.min(w, h) / 2 * (el.roundness === 'round' ? 1 : el.roundness?.type === 3 ? 1 : 0) : 0;
  const rx = roundness > 0 ? roundness : undefined;

  let svg = '';

  switch (el.type) {
    case 'rectangle':
      svg = `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx || 0}" fill="${esc(fill)}" stroke="${esc(stroke)}" stroke-width="${sw}"${opacityAttr}/>`;
      break;
    case 'ellipse':
      const cx = x + w / 2, cy = y + h / 2;
      svg = `<ellipse cx="${cx}" cy="${cy}" rx="${w / 2}" ry="${h / 2}" fill="${esc(fill)}" stroke="${esc(stroke)}" stroke-width="${sw}"${opacityAttr}/>`;
      break;
    case 'diamond':
      const dmx = x + w / 2, dmy = y + h / 2;
      svg = `<polygon points="${x + w / 2},${y} ${x + w},${y + h / 2} ${x + w / 2},${y + h} ${x},${y + h / 2}" fill="${esc(fill)}" stroke="${esc(stroke)}" stroke-width="${sw}"${opacityAttr}/>`;
      break;
    case 'line':
    case 'arrow':
      const points = el.points || [];
      if (points.length >= 2) {
        const d = points.map((p, i) => {
          const px = x + p[0];
          const py = y + p[1];
          return i === 0 ? `M${px},${py}` : `L${px},${py}`;
        }).join(' ');
        svg = `<path d="${d}" fill="none" stroke="${stroke}" stroke-width="${sw}"${opacityAttr}/>`;
        // Arrow head
        if (el.type === 'arrow' && points.length >= 2) {
          const last = points[points.length - 1];
          const prev = points[points.length - 2];
          const lx = x + last[0], ly = y + last[1];
          const px = x + prev[0], py = y + prev[1];
          const angle = Math.atan2(ly - py, lx - px);
          const headLen = 10;
          const a1 = angle + Math.PI * 0.8;
          const a2 = angle - Math.PI * 0.8;
          svg += `<polygon points="${lx},${ly} ${lx - headLen * Math.cos(a1)},${ly - headLen * Math.sin(a1)} ${lx - headLen * Math.cos(a2)},${ly - headLen * Math.sin(a2)}" fill="${stroke}"${opacityAttr}/>`;
        }
      }
      break;
    case 'text':
      const fontSize = el.fontSize || 20;
      const fontFamily = el.fontFamily || 1;
      const ffMap = { 1: "Virgil, 'Segoe UI Emoji'", 2: "'Helvetica Neue', 'Segoe UI Emoji'", 3: "'Cascadia Code', 'Segoe UI Emoji'" };
      const textAnchor = el.textAlign === 'center' ? 'middle' : el.textAlign === 'right' ? 'end' : 'start';
      const textX = textAnchor === 'middle' ? x + w / 2 : textAnchor === 'end' ? x + w : x;
      const textY = y + fontSize;
      svg = `<text x="${textX}" y="${textY}" font-size="${fontSize}" font-family="${esc(ffMap[fontFamily] || ffMap[1])}" fill="${esc(stroke)}" text-anchor="${textAnchor}"${opacityAttr}>${escapeXml(el.text || '')}</text>`;
      break;
    default:
      svg = `<!-- unhandled element type: ${el.type} -->`;
  }

  return svg;
}

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

// Escape for use inside double-quoted SVG attributes
function esc(s) {
  return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Render SVG
const bg = appState.viewBackgroundColor || '#ffffff';
const elementsSvg = elements.map(renderElement).filter(Boolean).join('\n  ');

const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}">
  <rect width="100%" height="100%" fill="${bg}"/>
  ${elementsSvg}
</svg>`;

writeFileSync(outputFile, svgContent, 'utf8');
console.log(`✅ SVG saved: ${outputFile} (${elements.length} elements, ${width}x${height})`);
