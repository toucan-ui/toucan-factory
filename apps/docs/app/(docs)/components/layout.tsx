import { DocsShell } from '../../_shared/docs-shell';
import { buildSections } from '../../_shared/build-sections';
import { COMPONENTS, CATEGORIES } from '../../data/component-data';

const sections = buildSections(CATEGORIES, COMPONENTS, '/components');

export default function ComponentsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell sections={sections}>{children}</DocsShell>;
}
