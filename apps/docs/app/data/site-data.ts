import type { FooterColumn } from '../_shared/patterns';

export type NavLink = { label: string; href: string };

export const NAV_LINKS: NavLink[] = [
  { label: 'Docs', href: '/docs' },
  { label: 'GitHub', href: 'https://github.com/toucan-ui' },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Components', href: '/docs/components' },
      { label: 'Patterns', href: '/docs/patterns' },
      { label: 'Tokens', href: '/docs/tokens' },
    ],
  },
  {
    heading: 'Resources',
    links: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'Architecture', href: '/docs/architecture' },
      { label: 'Themes', href: '/docs/themes' },
    ],
  },
  {
    heading: 'Project',
    links: [{ label: 'GitHub', href: 'https://github.com/toucan-ui' }],
  },
];
