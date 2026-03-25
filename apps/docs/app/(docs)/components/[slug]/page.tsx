import { notFound } from 'next/navigation';
import { Heading, Text, Flex, Grid } from '@toucan-ui/core';
import { PageHeader } from '../../../_shared/patterns';
import { PropTable } from '../../../_shared/prop-table';
import { ComponentExample } from '../../../_shared/component-example';
import { COMPONENTS, COMPONENT_SLUGS } from '../../../data/component-data';

export function generateStaticParams() {
  return COMPONENT_SLUGS.map((slug) => ({ slug }));
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = COMPONENTS.find((c) => c.slug === slug);

  if (!component) notFound();

  return (
    <>
      <PageHeader
        title={component.name}
        description={component.description}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Components', href: '/components' },
          { label: component.name },
        ]}
      />

      <ComponentExample slug={slug} />

      <Grid gap={4}>
        <Heading level={2}>Props</Heading>
        <PropTable props={component.props} />
      </Grid>

      {component.accessibility.length > 0 && (
        <Grid gap={4}>
          <Heading level={2}>Accessibility</Heading>
          <ul>
            {component.accessibility.map((note) => (
              <li key={note}>
                <Text as="span" size="sm" muted>
                  {note}
                </Text>
              </li>
            ))}
          </ul>
        </Grid>
      )}

      {component.relatedTokens.length > 0 && (
        <Grid gap={4}>
          <Heading level={2}>Related Tokens</Heading>
          <Flex row wrap gap={3}>
            {component.relatedTokens.map((token) => (
              <Text key={token} as="span" size="sm">
                <code>--{token.replace(/\./g, '-')}</code>
              </Text>
            ))}
          </Flex>
        </Grid>
      )}
    </>
  );
}
