import { runBuild } from '../src/cli/build.js';
import { loadConfig } from '../src/cli/config.js';
import type { BuildOptions } from '../src/cli/build.js';

const args = process.argv.slice(2);

function printUsage() {
  console.log(`
Usage:
  toucan build [options]

Options:
  --tokens <path>   Path to token directory
  --out <path>      Output directory (default: ./toucan-out)
  --help            Show this help message

Config file:
  Create toucan.config.ts (or .js, .mjs, .json) in your project root:

    import { defineConfig } from '@toucan-ui/core/config';

    export default defineConfig({
      tokens: 'node_modules/@toucan-ui/tokens/presets/default',
      outDir: './toucan-out',
    });

  Then just run: toucan build
`);
}

function parseArgs(argv: string[]): BuildOptions {
  const options: BuildOptions = {};

  for (let i = 0; i < argv.length; i++) {
    switch (argv[i]) {
      case '--tokens':
        options.tokens = argv[++i];
        break;
      case '--out':
        options.out = argv[++i];
        break;
    }
  }

  return options;
}

async function main() {
  const command = args[0];

  if (command === '--help' || command === '-h') {
    printUsage();
    process.exit(0);
  }

  // "build" is the default command — allow bare `toucan` or `toucan build`
  const buildArgs = command === 'build' ? args.slice(1) : args;

  if (command && command !== 'build' && !command.startsWith('-')) {
    console.error(`Unknown command: ${command}`);
    printUsage();
    process.exit(1);
  }

  // Load config file, then overlay CLI flags (flags win)
  const config = await loadConfig();
  const cliOptions = parseArgs(buildArgs);

  const options: BuildOptions = {
    tokens: cliOptions.tokens ?? config.tokens,
    out: cliOptions.out ?? config.outDir,
  };

  await runBuild(options);
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
