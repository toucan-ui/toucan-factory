import { defineConfig } from 'tsup';
import { readdirSync } from 'fs';

const patterns = readdirSync('src', { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const entry: Record<string, string> = {};
for (const name of patterns) {
  entry[`${name}/${name}`] = `src/${name}/index.ts`;
}

export default defineConfig([
  {
    entry,
    format: ['esm', 'cjs'],
    dts: false,
    clean: true,
    external: ['react', 'react-dom', '@toucan-ui/core'],
    banner: { js: "'use client';" },
  },
  {
    entry: { 'css/index': 'src/css.ts' },
    format: ['esm'],
    dts: false,
    clean: false,
    external: ['react', 'react-dom', '@toucan-ui/core'],
  },
]);
