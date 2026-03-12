export function resolveResponsive<T extends string | number>(
  name: string,
  value: T | { base?: T; sm?: T; md?: T; lg?: T; xl?: T } | undefined,
): Record<string, string | undefined> {
  if (value == null) return {};
  if (typeof value !== 'object') return { [`data-${name}`]: String(value) };

  const attrs: Record<string, string | undefined> = {};
  if (value.base != null) attrs[`data-${name}`] = String(value.base);
  if (value.sm != null) attrs[`data-${name}-sm`] = String(value.sm);
  if (value.md != null) attrs[`data-${name}-md`] = String(value.md);
  if (value.lg != null) attrs[`data-${name}-lg`] = String(value.lg);
  if (value.xl != null) attrs[`data-${name}-xl`] = String(value.xl);
  return attrs;
}
