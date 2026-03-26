import { Text, Grid, Link } from '@toucan-ui/core';
import { PageHeader } from '../../_shared/patterns';

export default function DocsPage() {
  return (
    <>
      <PageHeader
        title="Documentation"
        description="Architecture guides, token reference, and theme documentation."
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Docs' }]}
      />

      <Grid gap={4}>
        <Text as="p">
          Toucan is a design system factory. It separates structure, aesthetics, and interaction
          into three independent threads — so you can swap a single token file and re-skin every
          component, pattern, and layout without changing any code.
        </Text>
        <Text as="p" muted>
          The docs cover the token architecture, component API, and pattern library. Start with the
          getting started guide to install the packages and render your first themed component.
        </Text>
        <Text as="p">
          <Link href="/docs/getting-started" variant="standalone">
            Get Started →
          </Link>
        </Text>
      </Grid>
    </>
  );
}
