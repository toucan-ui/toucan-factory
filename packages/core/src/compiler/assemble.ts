import type { Dirent } from 'node:fs';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface BuildStylesOptions {
  atomDirs: string[];
  responsiveDir: string;
  outPath: string;
}

/**
 * Collects atom CSS files from the given directories, pairs each with its
 * matching responsive CSS (by filename), and concatenates them into a single
 * output file.
 */
export async function buildStyles(options: BuildStylesOptions): Promise<void> {
  const { atomDirs, responsiveDir, outPath } = options;

  const atomsByName = new Map<string, string>();

  for (const dir of atomDirs) {
    let entries: Dirent[];
    try {
      entries = await readdir(dir, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      if (entry.isDirectory()) {
        const subFiles = await readdir(resolve(dir, entry.name));
        for (const file of subFiles) {
          if (file.endsWith('.css') && !file.endsWith('.css.tpl')) {
            atomsByName.set(file, await readFile(resolve(dir, entry.name, file), 'utf-8'));
          }
        }
      } else if (entry.name.endsWith('.css') && !entry.name.endsWith('.css.tpl')) {
        atomsByName.set(entry.name, await readFile(resolve(dir, entry.name), 'utf-8'));
      }
    }
  }

  // Read responsive CSS files
  const responsiveMap = new Map<string, string>();
  try {
    const responsiveFiles = await readdir(responsiveDir);
    for (const file of responsiveFiles) {
      if (file.endsWith('.responsive.css')) {
        const atomName = file.replace('.responsive.css', '.css');
        responsiveMap.set(atomName, await readFile(resolve(responsiveDir, file), 'utf-8'));
      }
    }
  } catch {
    // No responsive dir — that's fine
  }

  // Concatenate: each atom file followed by its responsive rules
  const parts: string[] = [];

  for (const [file, content] of atomsByName) {
    parts.push(content);
    const responsive = responsiveMap.get(file);
    if (responsive) {
      parts.push(responsive);
      responsiveMap.delete(file);
    }
  }

  // Any responsive files without a matching atom
  for (const [, content] of responsiveMap) {
    parts.push(content);
  }

  await writeFile(outPath, parts.join('\n'));

  console.log(
    `  ✓ styles.css assembled (${atomsByName.size} atom files + ${responsiveMap.size === 0 ? 'responsive' : responsiveMap.size + ' unmatched responsive'} rules)`,
  );
}
