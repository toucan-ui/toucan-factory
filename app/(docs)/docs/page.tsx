import { Heading, Text, Box, Grid, Link } from '@toucan-ui/core';
import { PageHeader } from '../../_shared/patterns';

const guides = [
  {
    title: 'Getting Started',
    description: 'Install the packages, import tokens, and render your first themed component in under a minute.',
    href: '/docs/getting-started',
  },
  {
    title: 'Architecture',
    description: 'Three threads, zero entanglement. How tokens, components, and interaction stay independent.',
    href: '/docs/architecture',
  },
  {
    title: 'Tokens',
    description: 'The three-tier cascade: raw values, semantic aliases, and system tokens. Browse every token.',
    href: '/docs/tokens',
  },
  {
    title: 'Themes',
    description: 'How theme overrides work, what a theme package contains, and how to create your own.',
    href: '/docs/themes',
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHeader
        title="Documentation"
        description="Architecture guides, token reference, and theme documentation."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs' },
        ]}
      />

      <Grid columns="auto" gap={4} minItemSize="var(--layout-60)">
        {guides.map((guide) => (
          <Link key={guide.href} href={guide.href} variant="standalone" className="docs-link-card">
            <Box padding="md" radius="md" elevation={1}>
              <Heading level={3}>{guide.title}</Heading>
              <Text size="sm" muted>{guide.description}</Text>
            </Box>
          </Link>
        ))}
      </Grid>
    </>
  );
}
