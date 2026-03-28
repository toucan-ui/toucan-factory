import { resolve, dirname } from 'node:path';
import { mkdir } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import { compileFoundation } from '../compiler/sd-pipeline.js';
import { buildResponsive } from '../compiler/responsive.js';
import { buildStyles } from '../compiler/assemble.js';

export interface BuildOptions {
  tokens?: string;
  out?: string;
}

const require = createRequire(import.meta.url);

function resolveDefaultPreset(): string {
  try {
    const tokensPkg = require.resolve('@toucan-ui/tokens/package.json');
    return resolve(dirname(tokensPkg), 'presets', 'default');
  } catch {
    throw new Error(
      'No tokens path specified and @toucan-ui/tokens is not installed.\n' +
        'Either set "tokens" in toucan.config.ts or pass --tokens <path>.\n' +
        'The path should point to a directory with raw/, alias/, system/, dark/ JSON.',
    );
  }
}

export async function runBuild(options: BuildOptions): Promise<void> {
  const tokenDir = options.tokens ? resolve(options.tokens) : resolveDefaultPreset();
  const outDir = resolve(options.out ?? './css/toucan');
  const foundationDir = resolve(outDir, 'foundation');

  // Core package root — navigate up from dist/bin/toucan.js
  const coreRoot = resolve(dirname(fileURLToPath(import.meta.url)), '../..');

  await mkdir(outDir, { recursive: true });

  // 1. Compile foundation CSS from user's tokens
  await compileFoundation({ tokenDir, outDir: foundationDir });

  // 2. Build responsive CSS from templates + user's breakpoint tokens
  const responsiveFiles = await buildResponsive({
    tokenDir,
    templateDirs: [
      resolve(coreRoot, 'src/components/grid'),
      resolve(coreRoot, 'src/components/flex'),
    ],
    outDir: foundationDir,
  });

  // 3. Assemble styles.css (atom CSS + responsive CSS interleaved)
  await buildStyles({
    atomDirs: [resolve(coreRoot, 'src/components'), resolve(coreRoot, 'src/utils')],
    responsiveDir: foundationDir,
    outPath: resolve(outDir, 'styles.css'),
  });

  console.log(`\n✓ Build complete → ${outDir}`);
  console.log(`  foundation.css  (${foundationDir}/foundation.css)`);
  console.log(`  styles.css      (${responsiveFiles.length} responsive + atom CSS)`);
}
