import { defineConfig } from 'tsup';

export default defineConfig([
  {
    entry: { index: 'src/index.ts' },
    format: ['esm', 'cjs'],
    dts: true,
    clean: true,
    external: ['react', 'react-dom'],
    banner: { js: "'use client';" },
  },
  {
    entry: { 'bin/toucan': 'bin/toucan.ts' },
    format: ['esm'],
    banner: { js: '#!/usr/bin/env node' },
    external: ['style-dictionary'],
  },
  {
    entry: { 'cli/config': 'src/cli/config.ts' },
    format: ['esm'],
    dts: true,
  },
]);
