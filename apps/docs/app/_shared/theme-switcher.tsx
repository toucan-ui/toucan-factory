'use client';

import { useState, useEffect } from 'react';
import { Button, Text, Flex } from '@toucan-ui/core';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from '@toucan-ui/core';
import { PaletteIcon } from './icons';

const THEMES = [
  { value: 'toucan', label: 'Toucan', description: 'System default' },
  { value: 'finance', label: 'Finance', description: 'Sharp & structured' },
  { value: 'wellness', label: 'Wellness', description: 'Warm & organic' },
  { value: 'editorial', label: 'Editorial', description: 'Clean & typographic' },
] as const;

const STORAGE_KEY = 'tcn-theme';

export function ThemeSwitcher() {
  const [current, setCurrent] = useState('toucan');

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) setCurrent(stored);
  }, []);

  function selectTheme(theme: string) {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(STORAGE_KEY, theme);
    setCurrent(theme);
  }

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999 }}>
      <DropdownMenu anchor="top-right">
        <DropdownMenuTrigger asChild>
          <Button
            variant="primary"
            size="md"
            iconOnly
            aria-label="Switch theme"
            title="Switch theme"
          >
            <PaletteIcon />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {THEMES.map((theme) => (
            <DropdownMenuItem key={theme.value} onSelect={() => selectTheme(theme.value)}>
              <Flex gap={0}>
                <Text size="sm" as="strong">
                  {current === theme.value ? `● ${theme.label}` : `○ ${theme.label}`}
                </Text>
                <Text size="sm" muted>
                  {theme.description}
                </Text>
              </Flex>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
