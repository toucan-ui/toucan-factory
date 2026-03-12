import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    projects: [
      'packages/interactions/vitest.config.ts',
      'packages/core/vitest.config.ts',
      'packages/patterns/vitest.config.ts',
    ],
    passWithNoTests: true,
  },
});
