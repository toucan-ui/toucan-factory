import { Heading, Text, Box, Grid, Link } from '@toucan-ui/core';
import { PageHeader } from '../../_shared/patterns';
import { COMPONENTS, CATEGORIES } from '../../data/component-data';
import { STAT_COMPONENT_COUNT } from '@/data/project-stats';

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Components"
        description={`${STAT_COMPONENT_COUNT} accessible React primitives. Structure and ARIA, no visual opinions.`}
        breadcrumbs={[{ label: 'Home', href: '/' }, { label: 'Components' }]}
      />

      {CATEGORIES.map((cat) => {
        const items = COMPONENTS.filter((c) => c.category === cat.key).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        if (items.length === 0) return null;
        return (
          <Grid key={cat.key} gap={4}>
            <Heading level={2}>{cat.label}</Heading>
            <Grid columns="auto" gap={4} minItemSize="var(--layout-60)">
              {items.map((comp) => (
                <Link
                  key={comp.slug}
                  href={`/components/${comp.slug}`}
                  variant="standalone"
                  className="docs-link-card"
                >
                  <Box padding="md" radius="md" elevation={1}>
                    <Heading level={3}>{comp.name}</Heading>
                    <Text size="sm" muted>
                      {comp.description}
                    </Text>
                  </Box>
                </Link>
              ))}
            </Grid>
          </Grid>
        );
      })}
    </>
  );
}
