import StyleDictionary from 'style-dictionary';
import type { TransformedToken } from 'style-dictionary/types';
import { existsSync } from 'node:fs';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { validateReferenceDirection } from './validate.js';

export interface CompileFoundationOptions {
  tokenDir: string;
  outDir: string;
}

export async function compileFoundation(options: CompileFoundationOptions): Promise<void> {
  const { tokenDir, outDir } = options;
  await mkdir(outDir, { recursive: true });

  // ── Raw tokens ──
  const sdRaw = new StyleDictionary({
    source: [resolve(tokenDir, 'raw/**/*.json')],
    platforms: {
      foundation: {
        transformGroup: 'css',
        buildPath: outDir + '/',
        files: [
          {
            destination: 'raw.css',
            format: 'css/variables',
            options: { selector: ':root' },
          },
        ],
      },
    },
  });

  // ── Alias tokens → alias.css (reference raw) ──
  const sdAlias = new StyleDictionary({
    log: { warnings: 'disabled' },
    source: [resolve(tokenDir, 'raw/**/*.json'), resolve(tokenDir, 'alias/**/*.json')],
    platforms: {
      foundation: {
        transformGroup: 'css',
        buildPath: outDir + '/',
        files: [
          {
            destination: 'alias.css',
            format: 'css/variables',
            options: { selector: ':root', outputReferences: true },
            filter: (token: TransformedToken) => token.filePath.includes('/alias/'),
          },
        ],
      },
    },
  });

  // ── System tokens (reference alias) ──
  const sdSystem = new StyleDictionary({
    log: { warnings: 'disabled' },
    source: [
      resolve(tokenDir, 'raw/**/*.json'),
      resolve(tokenDir, 'alias/**/*.json'),
      resolve(tokenDir, 'system/**/*.json'),
    ],
    platforms: {
      foundation: {
        transformGroup: 'css',
        buildPath: outDir + '/',
        actions: ['validate-references'],
        files: [
          {
            destination: 'system.css',
            format: 'css/variables',
            options: { selector: ':root', outputReferences: true },
            filter: (token: TransformedToken) => token.filePath.includes('/system/'),
          },
        ],
      },
    },
    hooks: {
      actions: {
        'validate-references': {
          do(dictionary) {
            validateReferenceDirection(dictionary.allTokens);
            console.log(
              `  ✓ Reference direction validated (${dictionary.allTokens.length} tokens)`,
            );
          },
          undo() {},
        },
      },
    },
  });

  // ── Dark mode (only if dark/ directory exists) ──
  const hasDark = existsSync(resolve(tokenDir, 'dark'));

  if (hasDark) {
    const sdDark = new StyleDictionary({
      log: { warnings: 'disabled' },
      source: [
        resolve(tokenDir, 'raw/**/*.json'),
        resolve(tokenDir, 'alias/**/*.json'),
        resolve(tokenDir, 'dark/**/*.json'),
        resolve(tokenDir, 'system/**/*.json'),
      ],
      platforms: {
        foundation: {
          transformGroup: 'css',
          buildPath: outDir + '/',
          files: [
            {
              destination: 'dark.css',
              format: 'css/variables',
              options: { selector: '[data-mode="dark"]', outputReferences: true },
            },
          ],
        },
      },
    });
    await sdDark.buildAllPlatforms();
  }

  await sdRaw.buildAllPlatforms();
  await sdAlias.buildAllPlatforms();
  await sdSystem.buildAllPlatforms();

  // ── Concatenate foundation.css ──
  const layers = [
    await readFile(resolve(outDir, 'raw.css'), 'utf-8'),
    await readFile(resolve(outDir, 'alias.css'), 'utf-8'),
    await readFile(resolve(outDir, 'system.css'), 'utf-8'),
  ];

  if (hasDark) {
    layers.push(await readFile(resolve(outDir, 'dark.css'), 'utf-8'));
  }

  await writeFile(resolve(outDir, 'foundation.css'), layers.join('\n'));

  const tiers = hasDark ? 'raw + alias + system + dark' : 'raw + alias + system';
  console.log(`✓ Foundation built (foundation.css = ${tiers})`);
}
