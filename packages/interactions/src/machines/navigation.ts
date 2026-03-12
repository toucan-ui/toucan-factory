import type { Item } from '../types.js';

export function getNextEnabledIndex(items: Item[], current: number, wrap: boolean): number {
  const len = items.length;
  if (len === 0) return -1;

  if (wrap) {
    for (let i = 1; i <= len; i++) {
      const idx = (current + i) % len;
      if (!items[idx].disabled) return idx;
    }
    return current;
  }

  // Clamp mode — stop at end
  for (let i = current + 1; i < len; i++) {
    if (!items[i].disabled) return i;
  }
  return current;
}

export function getPrevEnabledIndex(items: Item[], current: number, wrap: boolean): number {
  const len = items.length;
  if (len === 0) return -1;

  if (wrap) {
    for (let i = 1; i <= len; i++) {
      const idx = (current - i + len) % len;
      if (!items[idx].disabled) return idx;
    }
    return current;
  }

  // Clamp mode — stop at start
  for (let i = current - 1; i >= 0; i--) {
    if (!items[i].disabled) return i;
  }
  return current;
}

export function getFirstEnabledIndex(items: Item[]): number {
  return items.findIndex((item) => !item.disabled);
}

export function getLastEnabledIndex(items: Item[]): number {
  for (let i = items.length - 1; i >= 0; i--) {
    if (!items[i].disabled) return i;
  }
  return -1;
}
