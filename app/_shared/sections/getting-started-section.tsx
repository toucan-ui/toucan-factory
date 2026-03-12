'use client';

import { Text, Grid, Section, Wrapper } from '@toucan-ui/core';
import { SectionHeader, CodeBlock } from '../patterns';
import { STAT_TOKEN_COUNT } from '@/data/project-stats';

const gettingStartedCode = `// 1. Load the design system's CSS foundation
import '@toucan-ui/tokens/css';

// 2. Use components
import { Button, Heading, Box } from '@toucan-ui/core';

function App() {
  return (
    <Box elevation={2} padding="lg">
      <Heading level={2}>Dashboard</Heading>
      <Button variant="primary">Get started</Button>
    </Box>
  );
}`;

export function GettingStartedSection() {
  return (
    <Section id="getting-started">
      <Wrapper size="xs">
      <Grid gap={8}>
      <SectionHeader
        title="Two imports. That's it."
        subtitle="Base tokens and the components you need."
      />
      <CodeBlock code={gettingStartedCode} language="tsx" filename="App.tsx" />
      <Grid gap={4}>
        <Text as="p" muted>
          <code>@toucan-ui/tokens/css</code> loads {STAT_TOKEN_COUNT} design tokens as CSS custom
          properties plus the atom CSS that maps them to component classes. Components from{' '}
          <code>@toucan-ui/core</code> emit semantic HTML with the right classes and{' '}
          <code>data-*</code> attributes. The atom CSS does the rest.
        </Text>
        <Text as="p" muted>
          No runtime. No CSS-in-JS. No build plugin. Just CSS custom properties
          and clean HTML.
        </Text>
      </Grid>
      </Grid>
      </Wrapper>
    </Section>
  );
}
