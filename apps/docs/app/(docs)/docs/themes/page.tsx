import { Heading, Text, Grid, Link } from '@toucan-ui/core';
import { PageHeader, CodeBlock } from '../../../_shared/patterns';
import { STAT_TOKEN_COUNT } from '@/data/project-stats';

export default function ThemesPage() {
  return (
    <>
      <PageHeader
        title="Themes"
        description="How the base theme, override model, and branded themes work together."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Themes' },
        ]}
      />

      <Grid gap={8}>
        <Grid gap={4}>
          <Heading level={2}>The Base Theme</Heading>
          <Text>
            Foundation CSS includes a base theme — neutral, functional defaults that fill every
            alias slot. Neutral-900 primary, system-ui fonts, white surfaces. A site that imports
            only <code>@toucan-ui/core/foundation</code> with no additional theme renders cleanly
            out of the box.
          </Text>
          <Text>
            The base theme is not a brand. It is a safety net that guarantees every token has a
            value, so components never break from a missing variable.
          </Text>
          <CodeBlock
            code={`// This works — base theme provides all defaults
import '@toucan-ui/core/foundation';
import { Button } from '@toucan-ui/core';

// Button renders with neutral-900 background, white text, md radius
<Button variant="primary">Works without a theme</Button>`}
            language="tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>The Override Model</Heading>
          <Text>
            A theme is a partial set of token overrides scoped under a <code>[data-theme]</code> CSS
            selector. Themes override at the alias tier — remapping semantic roles to different raw
            values. Only include the tokens you want to change; everything else inherits from the
            base theme.
          </Text>
          <Text>
            Every theme inherits all {STAT_TOKEN_COUNT} tokens. A theme that overrides nothing is
            identical to the base.
          </Text>
          <CodeBlock
            code={`/* Base theme (ships with foundation — no attribute needed) */
:root {
  --color-primary: var(--color-neutral-900);
  --button-radius: var(--radius-md);
}

/* Branded theme — overrides only what it needs */
[data-theme="ocean"] {
  --color-primary: var(--color-blue-600);
  --color-primary-hover: var(--color-blue-700);
  --button-radius: var(--radius-sm);
}`}
            language="css"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Three Ways to Theme</Heading>

          <Heading level={3}>1. No theme (base defaults)</Heading>
          <Text>Import foundation and components. Everything works with neutral styling.</Text>
          <CodeBlock
            code={`import '@toucan-ui/core/foundation';
import { Button } from '@toucan-ui/core';`}
            language="tsx"
          />

          <Heading level={3}>2. Custom brand theme</Heading>
          <Text>
            Write a CSS file with alias overrides scoped under{' '}
            <code>[data-theme=&quot;yourname&quot;]</code>. If your brand uses colours outside the
            default raw palette, add custom raw values alongside the alias overrides.
          </Text>
          <CodeBlock
            code={`import '@toucan-ui/core/foundation';
import './my-brand-theme.css';
import { Button } from '@toucan-ui/core';

<html data-theme="my-brand">
  <Button variant="primary">Branded button</Button>
</html>`}
            language="tsx"
          />

          <Heading level={3}>3. Wizard-generated theme</Heading>
          <Text>
            Use the{' '}
            <Link href="/examples/dashboard" variant="inline">
              theme configurator
            </Link>{' '}
            to visually build a theme, then download the CSS file. Same import pattern as a custom
            theme.
          </Text>
          <CodeBlock
            code={`import '@toucan-ui/core/foundation';
import './wizard-theme.css';
import { Button } from '@toucan-ui/core';`}
            language="tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>How data-theme Selectors Work</Heading>
          <Text>
            Set <code>data-theme</code> on any ancestor element. All descendants inherit the
            overridden token values through CSS cascade. Set it on <code>&lt;html&gt;</code> for
            global theming, or on any container for scoped theming.
          </Text>
          <CodeBlock
            code={`// Global theme
<html data-theme="ocean">

// Scoped theme (only children inherit)
<div data-theme="ocean">
  <Button>Ocean-styled button</Button>
</div>`}
            language="tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>What a Theme Can Override</Heading>
          <Text>
            Themes primarily override alias tokens — the semantic layer between raw values and
            component bindings. A single alias change cascades to every component that references
            it.
          </Text>

          <Heading level={3}>Alias overrides (most common)</Heading>
          <Text>
            Remap semantic roles to different raw values. This is the most powerful lever.
          </Text>
          <CodeBlock
            code={`/* Remap primary from neutral to blue */
[data-theme="ocean"] {
  --color-primary: var(--color-blue-600);
  --color-primary-hover: var(--color-blue-700);
  --color-primary-active: var(--color-blue-800);
}`}
            language="css"
          />

          <Heading level={3}>Custom raw values (brand palettes)</Heading>
          <Text>
            If your brand uses colours outside the built-in palette, add custom raw values alongside
            your alias overrides. For example, a brand purple that doesn&apos;t exist in the default
            raw scales.
          </Text>
          <CodeBlock
            code={`[data-theme="acme"] {
  /* Custom raw values for brand palette */
  --color-acme-purple-500: #7c3aed;
  --color-acme-purple-600: #6d28d9;
  --color-acme-purple-700: #5b21b6;

  /* Alias overrides referencing custom raws */
  --color-primary: var(--color-acme-purple-500);
  --color-primary-hover: var(--color-acme-purple-600);
  --color-primary-active: var(--color-acme-purple-700);
}`}
            language="css"
          />

          <Heading level={3}>System overrides (rare)</Heading>
          <Text>
            Fine-tune individual component tokens when alias changes aren&apos;t granular enough.
            Most themes never need this.
          </Text>
          <CodeBlock
            code={`[data-theme="compact"] {
  --button-radius: var(--radius-sm);
  --button-sm-padding: var(--scale-0-5) var(--scale-2);
}`}
            language="css"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Building a Theme with Style Dictionary</Heading>
          <Text>
            For JSON-based workflows, use Style Dictionary v5 to compile token overrides into a
            scoped CSS file. This is the same pipeline that builds the foundation tokens.
          </Text>
          <CodeBlock
            code={`import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/',
      files: [{
        destination: 'ocean-theme.css',
        format: 'css/variables',
        options: {
          outputReferences: true,
          selector: '[data-theme="ocean"]',
        },
      }],
    },
  },
});

await sd.buildAllPlatforms();`}
            language="typescript"
            filename="build.ts"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Creating a New Theme</Heading>

          <Heading level={3}>1. Create alias overrides</Heading>
          <Text>
            Write a CSS file (or JSON files for Style Dictionary) that overrides the alias tokens
            you want to change. Start with primary colour and typography — these cascade the
            furthest.
          </Text>

          <Heading level={3}>2. Add custom raws if needed</Heading>
          <Text>
            If your brand palette includes colours not in the default raw scales, define them as
            custom properties in the same file.
          </Text>

          <Heading level={3}>3. Add fonts (optional)</Heading>
          <Text>
            Load your brand fonts via <code>@font-face</code>, a CDN link, or a Google Fonts import.
            Override <code>--text-font-family</code> and <code>--display-font-family</code> to
            reference them.
          </Text>

          <Heading level={3}>4. Import after foundation</Heading>
          <CodeBlock
            code={`// app/globals.css or layout.tsx
import '@toucan-ui/core/foundation';
import './my-theme.css';

// Apply globally
<html data-theme="mytheme">

// Or scope to a section
<div data-theme="mytheme">
  <Button>Themed button</Button>
</div>`}
            language="tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Dark Mode</Heading>
          <Text>
            Foundation CSS includes dark mode overrides scoped to{' '}
            <code>[data-mode=&quot;dark&quot;]</code>. These swap alias values so surfaces darken,
            text lightens, and status colours adjust contrast — all without changing component code
            or theme overrides.
          </Text>
          <CodeBlock
            code={`// Enable dark mode on any ancestor
<html data-mode="dark">

// Combine with a theme
<html data-theme="ocean" data-mode="dark">`}
            language="tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Example Themes</Heading>
          <Text>
            The example pages in this docs site demonstrate theming in action. Each example applies
            a different set of token overrides to show how the same components adapt to different
            visual styles — all without changing any component code.
          </Text>
        </Grid>
      </Grid>
    </>
  );
}
