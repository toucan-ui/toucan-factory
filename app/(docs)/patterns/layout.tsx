import { DocsShell } from '../../_shared/docs-shell';
import { buildSections } from '../../_shared/build-sections';
import { PATTERNS, PATTERN_CATEGORIES } from '../../data/pattern-data';

const sections = buildSections(PATTERN_CATEGORIES, PATTERNS, '/patterns');

export default function PatternsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell sections={sections}>{children}</DocsShell>;
}
