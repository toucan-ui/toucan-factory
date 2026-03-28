import { Heading, Text, Button, Section, Wrapper, Grid, Link } from '@toucan-ui/core';
import { CodeBlock } from '../_shared/patterns';

export default function Home() {
  return (
    <Section padding="lg">
      <Wrapper size="sm">
        <Grid gap={8} align="center">
          <Heading level={1} display="lg">
            One architecture. Infinite design systems.
          </Heading>
          <Text as="p" size="lg" muted>
            Patterns compose atoms, atoms reference tokens, themes override tokens. Swap a single
            JSON file and every component re-skins itself.
          </Text>
          <CodeBlock code="npm install @toucan-ui/core" language="bash" filename="Install" />
          <Button as="a" href="/docs/getting-started" variant="primary" size="lg">
            Get Started
          </Button>
          <Grid gap={3}>
            <Text as="p" size="sm">
              <Link href="/docs/tokens" variant="standalone">
                Tokens
              </Link>{' '}
              — Three-tier cascade: raw values, semantic aliases, system bindings.
            </Text>
            <Text as="p" size="sm">
              <Link href="/docs/components" variant="standalone">
                Components
              </Link>{' '}
              — Accessible React primitives. Structure and ARIA, no visual opinions.
            </Text>
            <Text as="p" size="sm">
              <Link href="/docs/patterns" variant="standalone">
                Patterns
              </Link>{' '}
              — Composed layouts that re-skin automatically under any theme.
            </Text>
          </Grid>
        </Grid>
      </Wrapper>
    </Section>
  );
}
