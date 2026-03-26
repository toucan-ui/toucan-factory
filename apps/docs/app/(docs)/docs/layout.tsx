import { DocsShell } from '../../_shared/docs-shell';
import { buildUnifiedSidebar } from '../../data/sidebar-data';

const sections = buildUnifiedSidebar();

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return <DocsShell sections={sections}>{children}</DocsShell>;
}
