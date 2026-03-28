import { Heading, Text, Box, Grid, Link } from '@toucan-ui/core';
import { PageHeader, CodeBlock, FieldRow } from '../../../_shared/patterns';
import {
  STAT_TOKEN_COUNT,
  STAT_COMPONENT_COUNT,
  STAT_PATTERN_COUNT,
  STAT_TEST_COUNT,
} from '@/data/project-stats';

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
          <Text>
            Install the core package — it ships accessible React components, co-located atom CSS,
            and the <code>toucan</code> CLI for compiling your token JSON into CSS. Then install a
            token preset (or bring your own).
          </Text>
          <CodeBlock code={`pnpm add @toucan-ui/core @toucan-ui/tokens`} language="bash" />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Build Your CSS</Heading>
          <Text>
            Run the <code>toucan</code> CLI to compile your token JSON into CSS. Add this to your
            build script so it runs before your app builds.
          </Text>
          <CodeBlock
            code={`npx toucan build --tokens node_modules/@toucan-ui/tokens/presets/default --out ./toucan-out`}
            language="bash"
          />
          <Text>Then import the compiled CSS and your components:</Text>
          <CodeBlock
            code={`// 1. Foundation tokens (raw + alias + system + dark)
@import './toucan-out/foundation/foundation.css';

// 2. Component + responsive CSS
@import './toucan-out/styles.css';`}
            language="css"
            filename="globals.css"
          />
          <CodeBlock
            code={`// Components — each import includes its co-located CSS
import { Button, Input, Box } from '@toucan-ui/core';`}
            language="tsx"
            filename="app.tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Recommended App Globals</Heading>
          <Text>
            Toucan doesn&apos;t ship a CSS reset — that&apos;s your app&apos;s concern. We recommend
            adding these baseline styles to your global stylesheet:
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
            Toucan components work without these, but <code>box-sizing: border-box</code> and the
            token-based font family ensure consistent rendering across your entire app.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Your First Component</Heading>
          <Text>
            With the CSS imported, every component is automatically styled through the token
            cascade. No className wiring, no style props, no theme provider.
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
            The compiled foundation includes neutral defaults from the alias tier — everything works
            out of the box. To apply your own brand, import a theme CSS file after the compiled
            output. Themes override alias tokens via a <code>data-theme</code> attribute on any
            ancestor element.
          </Text>
          <CodeBlock
            code={`/* globals.css */
@import './toucan-out/foundation/foundation.css';
@import './toucan-out/styles.css';
@import './my-theme.css';  /* alias overrides */`}
            language="css"
            filename="globals.css"
          />
          <CodeBlock
            code={`<html data-theme="my-brand">
  <App />
</html>`}
            language="tsx"
            filename="layout.tsx"
          />
          <Text>
            See the{' '}
            <Link href="/docs/themes" variant="inline">
              Themes
            </Link>{' '}
            guide for the full override model, custom raw values, and how to build a theme with
            Style Dictionary.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>What You Get</Heading>
          <Box padding="md" radius="md" elevation={0}>
            <FieldRow
              label="Tokens"
              value={`${STAT_TOKEN_COUNT} CSS custom properties across 3 tiers`}
            />
            <FieldRow
              label="Components"
              value={`${STAT_COMPONENT_COUNT} accessible React primitives`}
            />
            <FieldRow
              label="Patterns"
              value={`${STAT_PATTERN_COUNT} theme-agnostic layout patterns`}
            />
            <FieldRow label="Theming" value="Token override model with data-theme selectors" />
            <FieldRow
              label="Tests"
              value={`${STAT_TEST_COUNT.toLocaleString()} unit tests passing`}
            />
          </Box>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Next Steps</Heading>
          <Text>
            Explore the{' '}
            <Link href="/docs/architecture" variant="inline">
              architecture
            </Link>{' '}
            to understand the three-thread model, browse the{' '}
            <Link href="/docs/tokens" variant="inline">
              token reference
            </Link>
            , or dive into the{' '}
            <Link href="/docs/components" variant="inline">
              component docs
            </Link>
            .
          </Text>
        </Grid>
      </Grid>
    </>
  );
}
