import StyleDictionary from 'style-dictionary';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const themes = ['toucan', 'finance', 'wellness', 'editorial'] as const;

async function build() {
  const builds: Promise<void>[] = [];

  for (const theme of themes) {
    for (const mode of ['light', 'dark'] as const) {
      const selector =
        mode === 'light' ? `[data-theme="${theme}"]` : `[data-theme="${theme}"][data-mode="dark"]`;

      const sd = new StyleDictionary({
        log: { warnings: 'disabled' },
        source: [resolve(__dirname, theme, 'raw.json'), resolve(__dirname, theme, `${mode}.json`)],
        platforms: {
          css: {
            transformGroup: 'css',
            buildPath: resolve(__dirname, 'dist/'),
            files: [
              {
                destination: `${theme}-${mode}.css`,
                format: 'css/variables',
                options: {
                  selector,
                  outputReferences: true,
                },
              },
            ],
          },
        },
      });

      builds.push(sd.buildAllPlatforms());
    }
  }

  await Promise.all(builds);
  console.log(`✓ Theme CSS built (${themes.length} themes × 2 modes)`);
}

build();
