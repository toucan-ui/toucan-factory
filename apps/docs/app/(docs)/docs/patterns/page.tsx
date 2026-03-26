import { Heading, Text, Grid, Link } from '@toucan-ui/core';
import { PageHeader } from '../../../_shared/patterns';
import { PATTERNS, PATTERN_CATEGORIES } from '../../../data/pattern-data';
import { STAT_PATTERN_COUNT } from '@/data/project-stats';

export default function PatternsPage() {
  return (
    <>
      <PageHeader
        title="Patterns"
        description={`${STAT_PATTERN_COUNT} theme-agnostic patterns. Compose core atoms, reference tokens, adapt to any theme.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Patterns' },
        ]}
      />

      {PATTERN_CATEGORIES.map((cat) => {
        const items = PATTERNS.filter((p) => p.category === cat.key).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        if (items.length === 0) return null;
        return (
          <Grid key={cat.key} gap={3}>
            <Heading level={2}>{cat.label}</Heading>
            <ul>
              {items.map((pattern) => (
                <li key={pattern.slug}>
                  <Link href={`/docs/patterns/${pattern.slug}`} variant="standalone" size="sm">
                    {pattern.name}
                  </Link>
                  <Text as="span" size="sm" muted>
                    {' '}
                    — {pattern.description}
                  </Text>
                </li>
              ))}
            </ul>
          </Grid>
        );
      })}
    </>
  );
}
