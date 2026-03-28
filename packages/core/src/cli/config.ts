import { resolve } from 'node:path';
import { pathToFileURL } from 'node:url';
import { readFile, access } from 'node:fs/promises';

export interface ToucanConfig {
  tokens?: string;
  outDir?: string;
}

export function defineConfig(config: ToucanConfig): ToucanConfig {
  return config;
}

const CONFIG_FILES = [
  'toucan.config.json',
  'toucan.config.js',
  'toucan.config.mjs',
  'toucan.config.ts',
];

async function fileExists(filePath: string): Promise<boolean> {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function loadJsConfig(filePath: string): Promise<ToucanConfig> {
  const mod = await import(pathToFileURL(filePath).href);
  return (mod.default ?? mod) as ToucanConfig;
}

async function loadTsConfig(filePath: string): Promise<ToucanConfig> {
  // Try native import first (Node 25+ with --experimental-strip-types)
  try {
    return await loadJsConfig(filePath);
  } catch {
    // Fall back to tsx if available
    const { execSync } = await import('node:child_process');
    try {
      const json = execSync(
        `npx tsx -e "const c = await import('${pathToFileURL(filePath).href}'); console.log(JSON.stringify(c.default ?? c))"`,
        { encoding: 'utf-8', stdio: ['pipe', 'pipe', 'pipe'] },
      );
      return JSON.parse(json) as ToucanConfig;
    } catch {
      throw new Error(
        `Found toucan.config.ts but could not load it.\n` +
          `Install tsx (npm i -D tsx) or use toucan.config.json / toucan.config.js instead.`,
      );
    }
  }
}

export async function loadConfig(cwd: string = process.cwd()): Promise<ToucanConfig> {
  for (const name of CONFIG_FILES) {
    const filePath = resolve(cwd, name);
    if (!(await fileExists(filePath))) continue;

    if (name.endsWith('.json')) {
      const raw = await readFile(filePath, 'utf-8');
      return JSON.parse(raw) as ToucanConfig;
    }

    if (name.endsWith('.ts')) {
      return loadTsConfig(filePath);
    }

    return loadJsConfig(filePath);
  }

  // No config file found — CLI flags or defaults will apply
  return {};
}
