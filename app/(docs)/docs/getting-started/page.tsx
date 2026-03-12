import { Heading, Text, Box, Grid, Link } from '@toucan-ui/core';
import { PageHeader, CodeBlock, FieldRow } from '../../../_shared/patterns';
import { STAT_TOKEN_COUNT, STAT_COMPONENT_COUNT, STAT_PATTERN_COUNT, STAT_TEST_COUNT } from '@/data/project-stats';

export default function GettingStartedPage() {
  return (
    <>
      <PageHeader
        title="Getting Started"
        description="From zero to styled components in two imports."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Getting Started' },
        ]}
      />

      <Grid gap={8}>
        <Grid gap={4}>
          <Heading level={2}>Installation</Heading>
          <Text>Install the core packages with your package manager. The tokens package provides CSS custom properties and atom styles. The core package provides React components.</Text>
          <CodeBlock
            code={`pnpm add @toucan-ui/tokens @toucan-ui/core`}
            language="bash"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Two Imports</Heading>
          <Text>
            Every application starts with two imports: tokens (the visual foundation) and components (the structure).
          </Text>
          <CodeBlock
            code={`// 1. Base tokens + atom CSS (ground zero)
import '@toucan-ui/tokens/css';

// 2. Components (structure + accessibility)
import { Button, Input, Box } from '@toucan-ui/core';`}
            language="tsx"
            filename="app.tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Recommended App Globals</Heading>
          <Text>
            Toucan doesn&apos;t ship a CSS reset — that&apos;s your app&apos;s concern. We recommend adding these baseline styles to your global stylesheet:
          </Text>
          <CodeBlock
            code={`*,
*::before,
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: var(--text-font-family);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}`}
            language="css"
            filename="globals.css"
          />
          <Text muted size="sm">
            Toucan components work without these, but <code>box-sizing: border-box</code> and the token-based font family ensure consistent rendering across your entire app.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Your First Component</Heading>
          <Text>
            With the CSS imported, every component is automatically styled through the token cascade. No className wiring, no style props, no theme provider.
          </Text>
          <CodeBlock
            code={`function App() {
  return (
    <Box padding="lg" radius="md" elevation={1}>
      <Heading level={1}>Welcome</Heading>
      <Text>Your design system is ready.</Text>
      <Button variant="primary">Get started</Button>
    </Box>
  );
}`}
            language="tsx"
            filename="app.tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Theming</Heading>
          <Text>
            Themes override tokens via a <code>data-theme</code> attribute on any ancestor element. See the <Link href="/docs/themes" variant="inline">Themes</Link> guide for details on creating custom themes.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>What You Get</Heading>
          <Box padding="md" radius="md" elevation={0}>
            <FieldRow label="Tokens" value={`${STAT_TOKEN_COUNT} CSS custom properties across 3 tiers`} />
            <FieldRow label="Components" value={`${STAT_COMPONENT_COUNT} accessible React primitives`} />
            <FieldRow label="Patterns" value={`${STAT_PATTERN_COUNT} theme-agnostic layout patterns`} />
            <FieldRow label="Theming" value="Token override model with data-theme selectors" />
            <FieldRow label="Tests" value={`${STAT_TEST_COUNT.toLocaleString()} unit tests passing`} />
          </Box>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Next Steps</Heading>
          <Text>
            Explore the <Link href="/docs/architecture" variant="inline">architecture</Link> to understand the three-thread model, browse the <Link href="/docs/tokens" variant="inline">token reference</Link>, or dive into the <Link href="/components" variant="inline">component docs</Link>.
          </Text>
        </Grid>
      </Grid>
    </>
  );
}
