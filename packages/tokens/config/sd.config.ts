import StyleDictionary from 'style-dictionary';
import type { TransformedToken } from 'style-dictionary/types';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { buildResponsive } from './responsive.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = resolve(__dirname, '..');

function getTier(filePath: string): 'raw' | 'alias' | 'system' {
  if (filePath.includes('/system/')) return 'system';
  if (filePath.includes('/alias/') || filePath.includes('/dark/')) return 'alias';
  return 'raw';
}

function extractReferences(value: unknown): string[] {
  if (typeof value !== 'string') return [];
  const matches = value.match(/\{([^}]+)\}/g);
  return matches ? matches.map((m) => m.slice(1, -1)) : [];
}

function validateReferenceDirection(allTokens: TransformedToken[]): void {
  const tokensByPath = new Map<string, TransformedToken>();
  for (const token of allTokens) {
    tokensByPath.set(token.path.join('.'), token);
  }

  const errors: string[] = [];

  for (const token of allTokens) {
    const tier = getTier(token.filePath);
    const rawValue = token.original.$value ?? token.original.value;
    const refs = extractReferences(rawValue);

    for (const refPath of refs) {
      const refToken = tokensByPath.get(refPath);
      if (!refToken) continue;

      const refTier = getTier(refToken.filePath);

      if (tier === 'raw' && refTier !== 'raw') {
        errors.push(
          `Raw token "${token.path.join('.')}" cannot reference ${refTier} token "${refPath}"`,
        );
      }
      if (tier === 'alias' && refTier !== 'raw') {
        errors.push(
          `Alias token "${token.path.join('.')}" can only reference raw tokens, but references ${refTier} token "${refPath}"`,
        );
      }
      if (tier === 'system' && refTier === 'system') {
        errors.push(
          `System token "${token.path.join('.')}" cannot reference other system token "${refPath}"`,
        );
      }
    }
  }

  if (errors.length > 0) {
    throw new Error(`Reference direction violation:\n  ${errors.join('\n  ')}`);
  }
}

async function build() {
  // Raw tokens
  const sdRaw = new StyleDictionary({
    source: [resolve(root, 'src/raw/**/*.json')],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: resolve(root, 'dist/css/'),
        files: [
          {
            destination: 'raw.css',
            format: 'css/variables',
            options: {
              selector: ':root',
            },
          },
        ],
      },
    },
  });

  // Alias tokens (reference raw)
  const sdAlias = new StyleDictionary({
    log: { warnings: 'disabled' },
    source: [resolve(root, 'src/raw/**/*.json'), resolve(root, 'src/alias/**/*.json')],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: resolve(root, 'dist/css/'),
        files: [
          {
            destination: 'alias.css',
            format: 'css/variables',
            options: {
              selector: ':root',
              outputReferences: true,
            },
            filter: (token: TransformedToken) => token.filePath.includes('/alias/'),
          },
        ],
      },
    },
  });

  // System tokens (reference alias)
  const sdSystem = new StyleDictionary({
    log: { warnings: 'disabled' },
    source: [
      resolve(root, 'src/raw/**/*.json'),
      resolve(root, 'src/alias/**/*.json'),
      resolve(root, 'src/system/**/*.json'),
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: resolve(root, 'dist/css/'),
        files: [
          {
            destination: 'system.css',
            format: 'css/variables',
            options: {
              selector: ':root',
              outputReferences: true,
            },
            filter: (token: TransformedToken) => token.filePath.includes('/system/'),
          },
        ],
      },
    },
  });

  // Combined output (all tiers) with reference validation
  const sdAll = new StyleDictionary({
    source: [
      resolve(root, 'src/raw/**/*.json'),
      resolve(root, 'src/alias/**/*.json'),
      resolve(root, 'src/system/**/*.json'),
    ],
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
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: resolve(root, 'dist/css/'),
        actions: ['validate-references'],
        files: [
          {
            destination: 'variables.css',
            format: 'css/variables',
            options: {
              selector: ':root',
              outputReferences: true,
            },
          },
        ],
      },
    },
  });

  // Dark mode (all tiers with dark alias overrides)
  const sdDark = new StyleDictionary({
    log: { warnings: 'disabled' },
    source: [
      resolve(root, 'src/raw/**/*.json'),
      resolve(root, 'src/alias/**/*.json'),
      resolve(root, 'src/dark/**/*.json'),
      resolve(root, 'src/system/**/*.json'),
    ],
    platforms: {
      css: {
        transformGroup: 'css',
        buildPath: resolve(root, 'dist/css/'),
        files: [
          {
            destination: 'dark.css',
            format: 'css/variables',
            options: {
              selector: '[data-mode="dark"]',
              outputReferences: true,
            },
          },
        ],
      },
    },
  });

  await sdRaw.buildAllPlatforms();
  await sdAlias.buildAllPlatforms();
  await sdSystem.buildAllPlatforms();
  await sdAll.buildAllPlatforms();
  await sdDark.buildAllPlatforms();

  // Build responsive CSS from .css.tpl templates
  const responsiveFiles = await buildResponsive(root);

  // Concatenate fonts.css + variables.css + atom CSS + responsive CSS into index.css
  const cssDir = resolve(root, 'css');
  const distCssDir = resolve(root, 'dist/css');

  // Read fonts.css (must be first — CSS @import must precede other rules)
  let fontsCss = '';
  try {
    fontsCss = await readFile(resolve(cssDir, 'fonts.css'), 'utf-8');
  } catch {
    // No fonts.css — that's fine
  }

  const variablesCss = await readFile(resolve(distCssDir, 'variables.css'), 'utf-8');
  const darkCss = await readFile(resolve(distCssDir, 'dark.css'), 'utf-8');

  const atomFiles = (await readdir(cssDir))
    .filter((f) => f.endsWith('.css') && f !== 'fonts.css')
    .sort();
  const atomCss = await Promise.all(atomFiles.map((f) => readFile(resolve(cssDir, f), 'utf-8')));

  // Read responsive CSS from dist (built from .css.tpl templates)
  const responsiveCss = await Promise.all(
    responsiveFiles.map((f) => readFile(resolve(distCssDir, f), 'utf-8')),
  );

  const indexCss = [fontsCss, variablesCss, darkCss, ...atomCss, ...responsiveCss]
    .filter(Boolean)
    .join('\n');
  await writeFile(resolve(distCssDir, 'index.css'), indexCss);

  console.log(
    `✓ Tokens built successfully (index.css = variables + dark + ${atomFiles.length} atom files + ${responsiveFiles.length} responsive files)`,
  );
}

build();
