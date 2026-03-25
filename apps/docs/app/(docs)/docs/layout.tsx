import { DocsShell } from '../../_shared/docs-shell';
import type { SideNavSection } from '../../_shared/patterns';

const sections: SideNavSection[] = [
  {
    heading: 'Guides',
    items: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'Architecture', href: '/docs/architecture' },
      { label: 'Tokens', href: '/docs/tokens' },
      { label: 'Themes', href: '/docs/themes' },
    ],
  },
];

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell sections={sections}>{children}</DocsShell>;
}
