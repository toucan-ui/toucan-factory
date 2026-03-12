import { Heading, Text, Box, Grid, Link } from '@toucan-ui/core';
import { PageHeader } from '../../_shared/patterns';
import { PATTERNS, PATTERN_CATEGORIES } from '../../data/pattern-data';
import { STAT_PATTERN_COUNT } from '@/data/project-stats';

export default function PatternsPage() {
  return (
    <>
      <PageHeader
        title="Patterns"
        description={`${STAT_PATTERN_COUNT} theme-agnostic patterns. Compose core atoms, reference tokens, adapt to any theme.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Patterns' },
        ]}
      />

      {PATTERN_CATEGORIES.map((cat) => {
        const items = PATTERNS.filter((p) => p.category === cat.key).sort((a, b) => a.name.localeCompare(b.name));
        if (items.length === 0) return null;
        return (
          <Grid key={cat.key} gap={4}>
            <Heading level={2}>{cat.label}</Heading>
            <Grid columns="auto" gap={4} minItemSize="var(--layout-60)">
              {items.map((pattern) => (
                <Link key={pattern.slug} href={`/patterns/${pattern.slug}`} variant="standalone" className="docs-link-card">
                  <Box padding="md" radius="md" elevation={1}>
                    <Heading level={3}>{pattern.name}</Heading>
                    <Text size="sm" muted>{pattern.description}</Text>
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
