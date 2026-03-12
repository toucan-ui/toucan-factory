import { readdirSync, readFileSync, writeFileSync, mkdirSync } from 'fs';
import { resolve } from 'path';

const root = resolve(import.meta.dirname, '..');
const srcDir = resolve(root, 'src');
const outDir = resolve(root, 'dist/css');

mkdirSync(outDir, { recursive: true });

const patterns = readdirSync(srcDir, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort();

const chunks: string[] = [`/* ToucanUI Patterns — combined CSS */\n`];

for (const name of patterns) {
  const cssPath = resolve(srcDir, name, `${name}.css`);
  try {
    const css = readFileSync(cssPath, 'utf-8');
    chunks.push(`/* --- ${name} --- */\n${css}`);
  } catch {
    // pattern has no CSS file — skip
  }
}

writeFileSync(resolve(outDir, 'index.css'), chunks.join('\n'));
console.log(`Built dist/css/index.css (${patterns.length} patterns scanned)`);
