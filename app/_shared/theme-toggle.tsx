'use client';

import { Button, useColorMode } from '@toucan-ui/core';
import { SunIcon, MoonIcon } from './icons';

export function ThemeToggle() {
  const { mode, setMode } = useColorMode();

  function cycleMode() {
    setMode(mode === 'light' ? 'dark' : 'light');
  }

  const label = mode === 'light' ? 'Light mode' : 'Dark mode';

  return (
    <Button
      variant="ghost"
      size="sm"
      iconOnly
      onClick={cycleMode}
      aria-label={label}
      title={label}
    >
      {mode === 'light' ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
}
