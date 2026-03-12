import { Text, Page } from '@toucan-ui/core';
import { Footer } from '../_shared/patterns';
import { DocsNavBar } from '../_shared/docs-navbar';
import { FOOTER_COLUMNS } from '../data/site-data';

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Page>
      <DocsNavBar />
      <main>{children}</main>
      <Footer
        columns={FOOTER_COLUMNS}
        logo={
          <Text as="strong" size="lg">Factory</Text>
        }
        legal="Design System Factory. Built as a demonstration of the design system architecture."
      />
    </Page>
  );
}
