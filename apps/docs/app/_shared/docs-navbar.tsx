'use client';

import { Link, Button, useColorMode } from '@toucan-ui/core';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from '@toucan-ui/core';
import { NavBar } from './patterns';
import { ThemeToggle } from './theme-toggle';
import { AnimatedLogo } from './animated-logo';
import { MenuIcon } from './icons';
import { NAV_LINKS } from '../data/site-data';

const modeOptions: { value: 'light' | 'dark'; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function MobileMenu() {
  const { mode, setMode } = useColorMode();

  return (
    <DropdownMenu anchor="bottom-right">
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" iconOnly aria-label="Menu">
          <MenuIcon />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>Navigation</DropdownMenuLabel>
        {NAV_LINKS.map((link) => (
          <DropdownMenuItem
            key={link.href}
            onSelect={() => {
              window.location.href = link.href;
            }}
          >
            {link.label}
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuLabel>Mode</DropdownMenuLabel>
        {modeOptions.map((opt) => (
          <DropdownMenuItem key={opt.value} onSelect={() => setMode(opt.value)}>
            {mode === opt.value ? `● ${opt.label}` : `○ ${opt.label}`}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

export function DocsNavBar() {
  return (
    <NavBar
      gap={6}
      logo={
        <Link href="/" variant="standalone">
          <AnimatedLogo />
        </Link>
      }
      links={NAV_LINKS.map((link) => (
        <Link key={link.href} href={link.href} variant="standalone" size="sm">
          {link.label}
        </Link>
      ))}
      actions={<ThemeToggle />}
      mobileActions={<MobileMenu />}
    />
  );
}
