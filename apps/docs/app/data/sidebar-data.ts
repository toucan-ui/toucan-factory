import type { SideNavSection } from '../_shared/patterns';
import { buildSections } from '../_shared/build-sections';
import { COMPONENTS, CATEGORIES } from './component-data';
import { PATTERNS, PATTERN_CATEGORIES } from './pattern-data';

const GETTING_STARTED_SECTIONS: SideNavSection[] = [
  {
    heading: 'Getting Started',
    items: [
      { label: 'Getting Started', href: '/docs/getting-started' },
      { label: 'Architecture', href: '/docs/architecture' },
      { label: 'Tokens', href: '/docs/tokens' },
      { label: 'Themes', href: '/docs/themes' },
    ],
  },
];

const EXAMPLE_SECTIONS: SideNavSection[] = [
  {
    heading: 'Examples',
    items: [
      { label: 'Dashboard', href: '/examples/dashboard' },
      { label: 'E-commerce', href: '/examples/e-commerce' },
      { label: 'Blog', href: '/examples/blog' },
    ],
  },
];

export function buildUnifiedSidebar(): SideNavSection[] {
  const componentSections = buildSections(CATEGORIES, COMPONENTS, '/docs/components').map(
    (section) => ({
      ...section,
      heading: `Components: ${section.heading}`,
    }),
  );

  const patternSections = buildSections(PATTERN_CATEGORIES, PATTERNS, '/docs/patterns').map(
    (section) => ({
      ...section,
      heading: `Patterns: ${section.heading}`,
    }),
  );

  return [
    ...GETTING_STARTED_SECTIONS,
    ...componentSections,
    ...patternSections,
    ...EXAMPLE_SECTIONS,
  ];
}
