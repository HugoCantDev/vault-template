const fs = require('fs');
const path = require('path');

// Vault linter. Run from the vault folder: node 00-Index/vault-verify.js
// "Vault Rules" section 13 gives the meaning of each check.
const VAULT = path.resolve(__dirname, '..');

// ---- Configuration. "Building a New Vault" section 3 step 4 tells you how to set it. ----

// Removed from the front of a path: value before the folder rule runs.
const SOURCE_PREFIX = 'src/';

// A source folder that the vault groups into subsystems, keyed by its second path segment.
// Example: { Services: { LaneService: 'Lane', RoutingService: 'Routing' } }
const GROUPED = {};

// A first path segment that goes to a vault folder with a different name.
// Example: { Hubs: 'Platform', Constants: 'Platform' }
const RENAMED = {};

// A note type that goes in a fixed folder, whatever its path: field gives.
const TYPE_FOLDER = {
  'layer-overview': '01-Overviews', feature: '02-Features', 'incident-report': '03-Incidents',
  plan: '04-Plans', 'work-item': '04-Plans', 'review-record': '05-Reviews',
};

const TYPES = ['component', 'model', 'layer-overview', 'feature', 'incident-report', 'plan',
  'work-item', 'review-record', 'reference'];

// The closed layer list from "Vault Rules" section 5. Replace 'example' with the real layers.
const LAYERS = ['example', 'frontend', 'overview', 'incident', 'plan', 'review'];

const NOTE_STATUSES = ['VERIFIED', 'VERIFIED-WITH-CAVEAT', 'DRIFT', 'SKELETON', 'UNKNOWN'];
const STATUSES_BY_TYPE = {
  plan: ['PROPOSED', 'APPROVED', 'IN-PROGRESS', 'DONE', 'SUPERSEDED', 'REJECTED'],
  'work-item': ['PROPOSED', 'APPROVED', 'IN-PROGRESS', 'DONE', 'SUPERSEDED', 'REJECTED'],
  'review-record': ['PUSHED'],
};

// A note with one of these statuses claims a read of the source, so it needs the stamp.
const STAMPED = ['VERIFIED', 'VERIFIED-WITH-CAVEAT', 'DRIFT'];
const STAMP_FIELDS = ['verified_against_commit', 'verified_against_branch', 'verified_against_date'];
const CODE_TYPES = ['component', 'model'];
const MAX_BYTES = 40 * 1024;
const INDEX_DIR = '00-Index';
const TEMPLATE_DIR = '00-Index/Templates';

// ---- End of configuration. ----

function walk(dir, out) {
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.name === '.obsidian' || e.name === '.git') continue;
    const p = path.join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith('.md')) out.push(p);
  }
  return out;
}

// Obsidian does not make a link inside a code fence or a code span. Remove both before scanning.
function stripCode(text) {
  const out = [];
  let fence = null;
  for (const line of text.split('\n')) {
    const m = /^\s*(`{3,}|~{3,})/.exec(line);
    if (fence) { if (m && line.trim().startsWith(fence)) fence = null; continue; }
    if (m) { fence = m[1]; continue; }
    out.push(line.replace(/`[^`]*`/g, ''));
  }
  return out.join('\n');
}

function frontmatter(text) {
  if (!text.startsWith('---\n')) return null;
  const end = text.indexOf('\n---', 3);
  if (end < 0) return null;
  const fields = {};
  for (const line of text.slice(4, end).split('\n')) {
    const m = /^([A-Za-z_]+):\s*(.*)$/.exec(line);
    if (m) fields[m[1]] = m[2].trim();
  }
  return fields;
}

function folderFor(fm, dir) {
  if (fm.type && TYPE_FOLDER[fm.type]) return TYPE_FOLDER[fm.type];
  if (!fm.path) return dir;
  let p = fm.path.replace(/^["']|["']$/g, '');
  if (p.startsWith(SOURCE_PREFIX)) p = p.slice(SOURCE_PREFIX.length);
  const seg = p.split('/');
  if (GROUPED[seg[0]]) return seg[0] + '/' + (GROUPED[seg[0]][seg[1]] || '<not in GROUPED>');
  return RENAMED[seg[0]] || seg[0];
}

function frontmatterProblems(fm) {
  if (!fm) return ['no frontmatter'];
  const out = [];
  for (const f of ['title', 'type', 'layer', 'status']) if (!fm[f]) out.push('no ' + f);
  if (fm.type && !TYPES.includes(fm.type)) out.push('type "' + fm.type + '" not in TYPES');
  if (fm.layer && !LAYERS.includes(fm.layer)) out.push('layer "' + fm.layer + '" not in LAYERS');
  const allowed = STATUSES_BY_TYPE[fm.type] || NOTE_STATUSES;
  if (fm.status && !allowed.includes(fm.status)) out.push('status "' + fm.status + '" not allowed');
  if (CODE_TYPES.includes(fm.type) && !fm.path) out.push('code note with no path');
  if (STAMPED.includes(fm.status)) {
    for (const f of STAMP_FIELDS) if (!fm[f]) out.push('status ' + fm.status + ' with no ' + f);
  }
  return out;
}

const files = walk(VAULT, []);
const names = new Set(files.map((f) => path.basename(f, '.md')));
const linked = new Set();
let qualified = 0, total = 0;
const misfiled = [], badFrontmatter = [], oversize = [];

for (const f of files) {
  const rel = path.relative(VAULT, f).replace(/\\/g, '/');
  const dir = path.dirname(rel);
  // A UTF-8 BOM or CRLF line ends would hide the frontmatter, so normalize both first.
  let text = fs.readFileSync(f, 'utf8').split(String.fromCharCode(13)).join('');
  if (text.charCodeAt(0) === 0xFEFF) text = text.slice(1);

  if (Buffer.byteLength(text, 'utf8') > MAX_BYTES) oversize.push(rel);

  // Templates hold placeholder links that point at no note, so their links do not count.
  if (dir !== TEMPLATE_DIR) {
    for (const m of stripCode(text).matchAll(/\[\[([^\]]*)\]\]/g)) {
      total++;
      if (m[1].includes('/')) qualified++;
      linked.add(m[1].split(/[|#]/)[0].trim());
    }
  }

  if (rel === 'README.md' || dir === INDEX_DIR || dir.startsWith(INDEX_DIR + '/')) continue;

  const fm = frontmatter(text);
  const problems = frontmatterProblems(fm);
  if (problems.length) badFrontmatter.push(rel + '   ' + problems.join('; '));
  if (!fm) continue;

  const want = folderFor(fm, dir);
  if (want !== dir) misfiled.push(rel + '   want ' + want + '  (type=' + fm.type + ', path=' + fm.path + ')');
}

const broken = [...linked].filter((l) => l && !names.has(l)).sort();
const orphans = [...names].filter((n) => !linked.has(n) && n !== 'README').sort();

console.log('notes                 ' + files.length);
console.log('wikilinks             ' + total);
console.log('folder-qualified      ' + qualified + '   (must be 0)');
console.log('broken targets        ' + broken.length + '   (must be 0)');
console.log('orphans               ' + orphans.length + '   (must be 0)');
console.log('misfiled vs path:     ' + misfiled.length + '   (must be 0)');
console.log('bad frontmatter       ' + badFrontmatter.length + '   (must be 0)');
console.log('oversize (> 40 KB)    ' + oversize.length + '   (must be 0)');
if (broken.length) console.log('\nbroken:\n  ' + broken.join('\n  '));
if (orphans.length) console.log('\norphans:\n  ' + orphans.join('\n  '));
if (misfiled.length) console.log('\nmisfiled:\n  ' + misfiled.join('\n  '));
if (badFrontmatter.length) console.log('\nbad frontmatter:\n  ' + badFrontmatter.join('\n  '));
if (oversize.length) console.log('\noversize:\n  ' + oversize.join('\n  '));

const failed = qualified + broken.length + orphans.length + misfiled.length +
  badFrontmatter.length + oversize.length > 0;
console.log('\n' + (failed ? 'FAIL -- see "Vault Rules" section 13' : 'PASS'));
process.exit(failed ? 1 : 0);
