import { useState, useEffect, useCallback } from 'react';

export type ColorMode = 'light' | 'dark' | 'auto';

type ResolvedMode = 'light' | 'dark';

const STORAGE_KEY = 'tcn-color-mode';
const MEDIA_QUERY = '(prefers-color-scheme: dark)';

function getSystemPreference(): ResolvedMode {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia(MEDIA_QUERY).matches ? 'dark' : 'light';
}

function resolve(mode: ColorMode): ResolvedMode {
  return mode === 'auto' ? getSystemPreference() : mode;
}

function applyMode(resolved: ResolvedMode) {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.mode = resolved;
}

function readStored(): ColorMode {
  if (typeof window === 'undefined') return 'auto';
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored === 'light' || stored === 'dark' || stored === 'auto') return stored;
  return 'auto';
}

export function useColorMode() {
  // Initialize with SSR-safe defaults to avoid hydration mismatch.
  // The anti-FOUC script handles the correct data-mode before paint;
  // this hook syncs React state from localStorage on mount.
  const [mode, setModeState] = useState<ColorMode>('auto');
  const [resolved, setResolved] = useState<ResolvedMode>('light');

  const setMode = useCallback((next: ColorMode) => {
    setModeState(next);
    const r = resolve(next);
    setResolved(r);
    applyMode(r);
    localStorage.setItem(STORAGE_KEY, next);
  }, []);

  // Sync from localStorage on mount
  useEffect(() => {
    const stored = readStored();
    setModeState(stored);
    const r = resolve(stored);
    setResolved(r);
    applyMode(r);
  }, []);

  // Listen for OS preference changes when mode is 'auto'
  useEffect(() => {
    if (mode !== 'auto') return;

    const mql = window.matchMedia(MEDIA_QUERY);
    function onChange() {
      const r = getSystemPreference();
      setResolved(r);
      applyMode(r);
    }

    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [mode]);

  return { mode, resolved, setMode } as const;
}
