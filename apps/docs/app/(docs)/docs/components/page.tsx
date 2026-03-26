import { Heading, Text, Grid, Link } from '@toucan-ui/core';
import { PageHeader } from '../../../_shared/patterns';
import { COMPONENTS, CATEGORIES } from '../../../data/component-data';
import { STAT_COMPONENT_COUNT } from '@/data/project-stats';

export default function ComponentsPage() {
  return (
    <>
      <PageHeader
        title="Components"
        description={`${STAT_COMPONENT_COUNT} accessible React primitives. Structure and ARIA, no visual opinions.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Components' },
        ]}
      />

      {CATEGORIES.map((cat) => {
        const items = COMPONENTS.filter((c) => c.category === cat.key).sort((a, b) =>
          a.name.localeCompare(b.name),
        );
        if (items.length === 0) return null;
        return (
          <Grid key={cat.key} gap={3}>
            <Heading level={2}>{cat.label}</Heading>
            <ul>
              {items.map((comp) => (
                <li key={comp.slug}>
                  <Link href={`/docs/components/${comp.slug}`} variant="standalone" size="sm">
                    {comp.name}
                  </Link>
                  <Text as="span" size="sm" muted>
                    {' '}
                    — {comp.description}
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
