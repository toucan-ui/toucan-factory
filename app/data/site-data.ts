import type { FooterColumn } from '../_shared/patterns';

export type NavLinkSimple = { label: string; href: string };
export type NavLinkDropdown = {
  label: string;
  items: { label: string; href: string; description: string }[];
};
export type NavLink = NavLinkSimple | NavLinkDropdown;

export function isDropdownLink(link: NavLink): link is NavLinkDropdown {
  return 'items' in link;
}

export const NAV_LINKS: NavLink[] = [
  { label: 'Docs', href: '/docs' },
  { label: 'Components', href: '/components' },
  { label: 'Patterns', href: '/patterns' },
  {
    label: 'Examples',
    items: [
      { label: 'Dashboard', href: '/examples/dashboard', description: 'Admin dashboard with sidebar, stats, and data tables' },
      { label: 'E-commerce', href: '/examples/e-commerce', description: 'Product listing with filters, cards, and pagination' },
      { label: 'Blog', href: '/examples/blog', description: 'Article listing with featured post and categories' },
    ],
  },
];

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    heading: 'Product',
    links: [
      { label: 'Components', href: '/components' },
      { label: 'Patterns', href: '/patterns' },
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
    links: [
      { label: 'Roadmap', href: '/#roadmap' },
      { label: 'GitHub', href: 'https://github.com' },
    ],
  },
];
