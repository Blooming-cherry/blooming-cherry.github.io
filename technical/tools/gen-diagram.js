const fs = require('fs');
const LZString = require('lz-string');

// Build a linked-list swap diagram
const elements = [
  // --- Row 1: Before swap label ---
  {
    id: 'label-before',
    type: 'text',
    x: 400, y: 40,
    width: 200, height: 30,
    text: '交换前 (before swap)',
    fontSize: 22,
    fontFamily: 2,
    textAlign: 'center',
    strokeColor: '#666666',
    backgroundColor: 'transparent',
    fillStyle: 'solid',
    strokeWidth: 1,
    roughness: 0,
    opacity: 100,
  },
  // cur node
  {
    id: 'cur',
    type: 'rectangle',
    x: 80, y: 110, width: 80, height: 50,
    strokeColor: '#1971c2', backgroundColor: '#a5d8ff',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
    roundness: { type: 3 },
  },
  { id: 'cur-label', type: 'text', x: 80, y: 125, width: 80, height: 25, text: 'cur', fontSize: 18, fontFamily: 2, textAlign: 'center', strokeColor: '#1971c2', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100 },
  // node 1 (red)
  {
    id: 'node1',
    type: 'rectangle',
    x: 230, y: 110, width: 80, height: 50,
    strokeColor: '#e03131', backgroundColor: '#ffc9c9',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
    roundness: { type: 3 },
  },
  { id: 'node1-label', type: 'text', x: 230, y: 125, width: 80, height: 25, text: 'node1', fontSize: 18, fontFamily: 2, textAlign: 'center', strokeColor: '#e03131', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100 },
  // node 2 (green)
  {
    id: 'node2',
    type: 'rectangle',
    x: 380, y: 110, width: 80, height: 50,
    strokeColor: '#2f9e44', backgroundColor: '#b2f2bb',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
    roundness: { type: 3 },
  },
  { id: 'node2-label', type: 'text', x: 380, y: 125, width: 80, height: 25, text: 'node2', fontSize: 18, fontFamily: 2, textAlign: 'center', strokeColor: '#2f9e44', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100 },
  // node 3 (gray)
  {
    id: 'node3',
    type: 'rectangle',
    x: 530, y: 110, width: 80, height: 50,
    strokeColor: '#495057', backgroundColor: '#e9ecef',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
    roundness: { type: 3 },
  },
  { id: 'node3-label', type: 'text', x: 530, y: 125, width: 80, height: 25, text: 'node3', fontSize: 18, fontFamily: 2, textAlign: 'center', strokeColor: '#495057', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100 },

  // Arrows: before row
  { id: 'arr-cur-n1', type: 'arrow', x: 160, y: 135, width: 70, height: 0, points: [[0,0],[70,0]], strokeColor: '#1971c2', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100 },
  { id: 'arr-n1-n2', type: 'arrow', x: 310, y: 135, width: 70, height: 0, points: [[0,0],[70,0]], strokeColor: '#e03131', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100 },
  { id: 'arr-n2-n3', type: 'arrow', x: 460, y: 135, width: 70, height: 0, points: [[0,0],[70,0]], strokeColor: '#2f9e44', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100 },

  // --- Row 2: After swap ---
  {
    id: 'label-after',
    type: 'text',
    x: 400, y: 260, width: 200, height: 30,
    text: '交换后 (after swap)',
    fontSize: 22, fontFamily: 2, textAlign: 'center',
    strokeColor: '#666666', backgroundColor: 'transparent',
    fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100,
  },
  // cur (unchanged)
  {
    id: 'cur2', type: 'rectangle',
    x: 80, y: 330, width: 80, height: 50,
    strokeColor: '#1971c2', backgroundColor: '#a5d8ff',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
    roundness: { type: 3 },
  },
  { id: 'cur2-label', type: 'text', x: 80, y: 345, width: 80, height: 25, text: 'cur', fontSize: 18, fontFamily: 2, textAlign: 'center', strokeColor: '#1971c2', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100 },
  // node2 (swapped to pos 1)
  {
    id: 'node2-after', type: 'rectangle',
    x: 230, y: 330, width: 80, height: 50,
    strokeColor: '#2f9e44', backgroundColor: '#b2f2bb',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
    roundness: { type: 3 },
  },
  { id: 'node2-after-label', type: 'text', x: 230, y: 345, width: 80, height: 25, text: 'node2', fontSize: 18, fontFamily: 2, textAlign: 'center', strokeColor: '#2f9e44', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100 },
  // node1 (swapped to pos 2)
  {
    id: 'node1-after', type: 'rectangle',
    x: 380, y: 330, width: 80, height: 50,
    strokeColor: '#e03131', backgroundColor: '#ffc9c9',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
    roundness: { type: 3 },
  },
  { id: 'node1-after-label', type: 'text', x: 380, y: 345, width: 80, height: 25, text: 'node1', fontSize: 18, fontFamily: 2, textAlign: 'center', strokeColor: '#e03131', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100 },
  // node3 (unchanged)
  {
    id: 'node3-after', type: 'rectangle',
    x: 530, y: 330, width: 80, height: 50,
    strokeColor: '#495057', backgroundColor: '#e9ecef',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
    roundness: { type: 3 },
  },
  { id: 'node3-after-label', type: 'text', x: 530, y: 345, width: 80, height: 25, text: 'node3', fontSize: 18, fontFamily: 2, textAlign: 'center', strokeColor: '#495057', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100 },

  // Arrows: after row
  { id: 'arr2-cur-n2', type: 'arrow', x: 160, y: 355, width: 70, height: 0, points: [[0,0],[70,0]], strokeColor: '#1971c2', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100 },
  { id: 'arr2-n2-n1', type: 'arrow', x: 310, y: 355, width: 70, height: 0, points: [[0,0],[70,0]], strokeColor: '#2f9e44', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100 },
  { id: 'arr2-n1-n3', type: 'arrow', x: 460, y: 355, width: 70, height: 0, points: [[0,0],[70,0]], strokeColor: '#e03131', backgroundColor: 'transparent', fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100 },

  // --- Annotations ---
  {
    id: 'tmp-annotation',
    type: 'text',
    x: 660, y: 100, width: 280, height: 50,
    text: 'tmp = cur->next    (= node1)',
    fontSize: 14, fontFamily: 3,
    textAlign: 'left',
    strokeColor: '#e03131', backgroundColor: '#fff0f0',
    fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100,
  },
  {
    id: 'tmp1-annotation',
    type: 'text',
    x: 660, y: 165, width: 280, height: 50,
    text: 'tmp1 = cur->next->next->next\n       (= node3)',
    fontSize: 14, fontFamily: 3,
    textAlign: 'left',
    strokeColor: '#495057', backgroundColor: '#f8f9fa',
    fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100,
  },
  {
    id: 'code-step1',
    type: 'text',
    x: 660, y: 300, width: 280, height: 60,
    text: 'cur->next = cur->next->next\ncur->next->next = tmp\ncur->next->next->next = tmp1\ncur = cur->next->next',
    fontSize: 12, fontFamily: 3,
    textAlign: 'left',
    strokeColor: '#f08c00', backgroundColor: '#fff9e6',
    fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100,
  },

  // Big swap arrow between rows
  {
    id: 'swap-big-arrow',
    type: 'arrow',
    x: 270, y: 165, width: 0, height: 155,
    points: [[0,0],[0,155]],
    strokeColor: '#f08c00', backgroundColor: 'transparent',
    fillStyle: 'solid', strokeWidth: 2, roughness: 1, opacity: 100,
  },
  {
    id: 'swap-label',
    type: 'text',
    x: 200, y: 230, width: 140, height: 30,
    text: '↕ 交换相邻节点',
    fontSize: 16, fontFamily: 2, textAlign: 'center',
    strokeColor: '#f08c00', backgroundColor: 'transparent',
    fillStyle: 'solid', strokeWidth: 1, roughness: 0, opacity: 100,
  },
];

const appState = {
  gridSize: null,
  viewBackgroundColor: '#ffffff',
};

const data = {
  type: 'excalidraw',
  version: 2,
  source: 'https://github.com/zsviczian/obsidian-excalidraw-plugin/releases/tag/2.25.3',
  elements,
  appState,
};

const json = JSON.stringify(data);
const compressed = LZString.compressToBase64(json);
console.log('Elements:', elements.length);
console.log('JSON length:', json.length);
console.log('Compressed length:', compressed.length);

// Update the excalidraw file
const filePath = '/Users/a1/dev/hexo/technical/source/Excalidraw/风烟迷津 2026-07-22 11.22.11.excalidraw.md';
const frontmatter = [
  '---',
  'excalidraw-plugin: parsed',
  'tags: [excalidraw]',
  '---',
].join('\n');
const body = [
  '==⚠  Switch to EXCALIDRAW VIEW in the MORE OPTIONS menu of this document. ⚠== You can decompress Drawing data with the command palette: \'Decompress current Excalidraw file\'. For more info check in plugin settings under \'Saving\'',
  '',
  '',
  '## Drawing',
  '```compressed-json',
  compressed,
  '```',
  '%%',
].join('\n');
const content = frontmatter + '\n' + body;

fs.writeFileSync(filePath, content, 'utf8');
console.log('Updated excalidraw file:', filePath);
