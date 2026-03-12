'use client';

import { Heading, Grid } from '@toucan-ui/core';
import { LiveDemo } from './live-demo';
import { PATTERN_EXAMPLES } from '../data/pattern-examples';

export function PatternExample({ slug }: { slug: string }) {
  const example = PATTERN_EXAMPLES[slug];
  if (!example) return null;

  return (
    <Grid gap={4}>
      <Heading level={2}>Example</Heading>
      <LiveDemo code={example.code} hideHtml>
        {example.demo}
      </LiveDemo>
    </Grid>
  );
}
