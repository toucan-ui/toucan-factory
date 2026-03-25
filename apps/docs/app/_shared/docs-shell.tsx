'use client';

import { usePathname } from 'next/navigation';
import { Wrapper, Grid, GridItem, Section } from '@toucan-ui/core';
import { SideNav } from './patterns';
import type { SideNavSection } from './patterns';
import '../docs-layout.css';

interface DocsShellProps {
  sections: SideNavSection[];
  children: React.ReactNode;
}

export function DocsShell({ sections, children }: DocsShellProps) {
  const pathname = usePathname();

  const activeSections = sections.map((section) => ({
    ...section,
    items: section.items.map((item) => ({
      ...item,
      active: item.href === pathname,
    })),
  }));

  return (
    <Section padding="md" className="docs-shell">
      <Wrapper size="lg">
        <Grid columns={{ base: 1, md: 12 }} gap={{ base: 4, md: 8 }}>
          <GridItem span={{ base: 1, md: 4 }} className="docs-shell-sidebar">
            <SideNav sections={activeSections} collapsible />
          </GridItem>
          <GridItem span={{ base: 1, md: 8 }}>
            <Grid gap={10}>{children}</Grid>
          </GridItem>
        </Grid>
      </Wrapper>
    </Section>
  );
}
