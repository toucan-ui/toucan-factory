import { notFound } from 'next/navigation';
import { Heading, Badge, Flex, Grid, Link } from '@toucan-ui/core';
import { PageHeader } from '../../../_shared/patterns';
import { PropTable } from '../../../_shared/prop-table';
import { PatternExample } from '../../../_shared/pattern-example';
import { PATTERNS, PATTERN_SLUGS } from '../../../data/pattern-data';

export function generateStaticParams() {
  return PATTERN_SLUGS.map((slug) => ({ slug }));
}

export default async function PatternPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const pattern = PATTERNS.find((p) => p.slug === slug);

  if (!pattern) notFound();

  return (
    <>
      <PageHeader
        title={pattern.name}
        description={pattern.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Patterns', href: '/patterns' },
          { label: pattern.name },
        ]}
      />

      <PatternExample slug={slug} />

      <Grid gap={4}>
        <Heading level={2}>Props</Heading>
        <PropTable props={pattern.props} />
      </Grid>

      {pattern.composedAtoms.length > 0 && (
        <Grid gap={4}>
          <Heading level={2}>Composed Atoms</Heading>
          <Flex row wrap gap={3}>
            {pattern.composedAtoms.map((atom) => (
              <Link key={atom} href={`/components/${atom.toLowerCase()}`} variant="standalone">
                <Badge variant="info">{atom}</Badge>
              </Link>
            ))}
          </Flex>
        </Grid>
      )}
    </>
  );
}
