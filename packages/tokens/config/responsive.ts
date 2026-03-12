import { readFile, writeFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

/**
 * Builds responsive CSS from .css.tpl templates.
 *
 * Template syntax: @[breakpoint.md] → literal value from breakpoint tokens.
 * Output: dist/css/*.responsive.css
 */
export async function buildResponsive(root: string): Promise<string[]> {
  const cssDir = resolve(root, 'css');
  const distCssDir = resolve(root, 'dist/css');

  // Read breakpoint tokens → { 'breakpoint.sm': '640px', ... }
  const breakpointJson = JSON.parse(
    await readFile(resolve(root, 'src/raw/breakpoint.json'), 'utf-8'),
  );

  const tokenMap = new Map<string, string>();
  for (const [key, entry] of Object.entries(breakpointJson.breakpoint)) {
    tokenMap.set(`breakpoint.${key}`, (entry as { $value: string }).$value);
  }

  // Find all .css.tpl files
  const allFiles = await readdir(cssDir);
  const tplFiles = allFiles.filter((f) => f.endsWith('.css.tpl'));

  if (tplFiles.length === 0) {
    console.log('  ⓘ No .css.tpl templates found — skipping responsive build');
    return [];
  }

  const outputFiles: string[] = [];

  for (const tplFile of tplFiles) {
    let content = await readFile(resolve(cssDir, tplFile), 'utf-8');

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
    await writeFile(resolve(distCssDir, outName), content);
    outputFiles.push(outName);
  }

  console.log(`  ✓ Responsive CSS built (${outputFiles.join(', ')})`);
  return outputFiles;
}
