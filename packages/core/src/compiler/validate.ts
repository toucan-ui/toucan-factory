import type { TransformedToken } from 'style-dictionary/types';

export function getTier(filePath: string): 'raw' | 'alias' | 'system' {
  if (filePath.includes('/system/')) return 'system';
  if (filePath.includes('/alias/') || filePath.includes('/dark/')) return 'alias';
  return 'raw';
}

export function extractReferences(value: unknown): string[] {
  if (typeof value !== 'string') return [];
  const matches = value.match(/\{([^}]+)\}/g);
  return matches ? matches.map((m) => m.slice(1, -1)) : [];
}

export function validateReferenceDirection(allTokens: TransformedToken[]): void {
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
