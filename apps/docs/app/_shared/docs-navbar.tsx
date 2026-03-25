'use client';

import { Text, Link, Button, Flex, useColorMode } from '@toucan-ui/core';
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
import { MenuIcon, ChevronDownIcon } from './icons';
import { NAV_LINKS, isDropdownLink } from '../data/site-data';
import type { NavLink } from '../data/site-data';

const modeOptions: { value: 'light' | 'dark'; label: string }[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
];

function DesktopNavLink({ link }: { link: NavLink }) {
  if (isDropdownLink(link)) {
    return (
      <DropdownMenu anchor="bottom-left">
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="sm">
            <Flex row align="center" gap={1}>
              {link.label}
              <ChevronDownIcon />
            </Flex>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          {link.items.map((item) => (
            <DropdownMenuItem
              key={item.href}
              onSelect={() => {
                window.location.href = item.href;
              }}
            >
              <Flex gap={0}>
                <Text size="sm" as="strong">
                  {item.label}
                </Text>
                <Text size="sm" muted>
                  {item.description}
                </Text>
              </Flex>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Link href={link.href} variant="standalone" size="sm">
      {link.label}
    </Link>
  );
}

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
        {NAV_LINKS.map((link) => {
          if (isDropdownLink(link)) {
            return link.items.map((item) => (
              <DropdownMenuItem
                key={item.href}
                onSelect={() => {
                  window.location.href = item.href;
                }}
              >
                {item.label}
              </DropdownMenuItem>
            ));
          }
          return (
            <DropdownMenuItem
              key={link.href}
              onSelect={() => {
                window.location.href = link.href;
              }}
            >
              {link.label}
            </DropdownMenuItem>
          );
        })}
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
          <div className="logo-backdrop">
            <img src="/toucan-logo.svg" alt="Toucan" height={32} className="toucan-logo" />
          </div>
        </Link>
      }
      links={NAV_LINKS.map((link) => (
        <DesktopNavLink key={isDropdownLink(link) ? link.label : link.href} link={link} />
      ))}
      actions={<ThemeToggle />}
      mobileActions={<MobileMenu />}
    />
  );
}
