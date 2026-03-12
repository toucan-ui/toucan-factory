import { defineConfig } from 'tsup';
import { readdirSync } from 'fs';

const patterns = readdirSync('src', { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name);

const entry: Record<string, string> = {};
for (const name of patterns) {
  entry[`${name}/${name}`] = `src/${name}/${name}.tsx`;
}

export default defineConfig({
  entry,
  format: ['esm', 'cjs'],
  dts: true,
  clean: true,
  external: ['react', 'react-dom', '@toucanui/core', '@toucanui/tokens'],
  banner: { js: "'use client';" },
});
