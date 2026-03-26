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
  dts: false,
  clean: false,
  external: ['react', 'react-dom', '@toucan-ui/core', '@toucan-ui/tokens'],
  banner: { js: "'use client';" },
});
