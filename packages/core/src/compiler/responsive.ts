import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

export interface BuildResponsiveOptions {
  tokenDir: string;
  templateDirs: string[];
  outDir: string;
}

/**
 * Builds responsive CSS from .css.tpl templates.
 *
 * Template syntax: @[breakpoint.md] → literal value from breakpoint tokens.
 * Scans multiple directories for .css.tpl files.
 */
export async function buildResponsive(options: BuildResponsiveOptions): Promise<string[]> {
  const { tokenDir, templateDirs, outDir } = options;

  // Read breakpoint tokens → { 'breakpoint.sm': '640px', ... }
  const breakpointJson = JSON.parse(
    await readFile(resolve(tokenDir, 'raw/breakpoint.json'), 'utf-8'),
  );

  const tokenMap = new Map<string, string>();
  for (const [key, entry] of Object.entries(breakpointJson.breakpoint)) {
    tokenMap.set(`breakpoint.${key}`, (entry as { $value: string }).$value);
  }

  // Collect all .css.tpl files from all template directories
  const tplEntries: { dir: string; file: string }[] = [];

  for (const dir of templateDirs) {
    try {
      const files = await readdir(dir);
      for (const file of files) {
        if (file.endsWith('.css.tpl')) {
          tplEntries.push({ dir, file });
        }
      }
    } catch {
      // Directory doesn't exist — skip
    }
  }

  if (tplEntries.length === 0) {
    console.log('  ⓘ No .css.tpl templates found — skipping responsive build');
    return [];
  }

  const outputFiles: string[] = [];

  for (const { dir, file: tplFile } of tplEntries) {
    let content = await readFile(resolve(dir, tplFile), 'utf-8');

    // Replace @[token.path] placeholders with literal values
    content = content.replace(/@\[([^\]]+)\]/g, (_match, tokenPath: string) => {
      const value = tokenMap.get(tokenPath);
      if (!value) {
        throw new Error(
          `Unresolved placeholder @[${tokenPath}] in ${tplFile}. ` +
            `Available tokens: ${[...tokenMap.keys()].join(', ')}`,
        );
      }
      return value;
    });

    // Validate no unresolved placeholders remain
    const remaining = content.match(/@\[[^\]]+\]/g);
    if (remaining) {
      throw new Error(`Unresolved placeholders in ${tplFile}: ${remaining.join(', ')}`);
    }

    // Write output: grid.responsive.css.tpl → grid.responsive.css
    const outName = tplFile.replace('.css.tpl', '.css');
    await writeFile(resolve(outDir, outName), content);
    outputFiles.push(outName);
  }

  console.log(`  ✓ Responsive CSS built (${outputFiles.join(', ')})`);
  return outputFiles;
}
