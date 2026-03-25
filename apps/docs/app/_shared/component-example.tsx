'use client';

import { Heading, Grid } from '@toucan-ui/core';
import { LiveDemo } from './live-demo';
import { COMPONENT_EXAMPLES } from '../data/component-examples';

export function ComponentExample({ slug }: { slug: string }) {
  const example = COMPONENT_EXAMPLES[slug];
  if (!example) return null;

  return (
    <Grid gap={4}>
      <Heading level={2}>Example</Heading>
      <LiveDemo code={example.code}>{example.demo}</LiveDemo>
    </Grid>
  );
}
