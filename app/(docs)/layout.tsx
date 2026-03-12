import { Page } from '@toucan-ui/core';
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
          <img src="/toucan-logo.svg" alt="Toucan" height={24} className="toucan-logo" />
        }
        legal="Toucan. Built as a demonstration of token-driven design system architecture."
      />
    </Page>
  );
}
