import { Heading, Text, Grid } from '@toucan-ui/core';
import { PageHeader, CodeBlock } from '../../../_shared/patterns';
import { STAT_TOKEN_COUNT } from '@/data/project-stats';

export default function ThemesPage() {
  return (
    <>
      <PageHeader
        title="Themes"
        description="How the override model works and how to create your own theme."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Themes' },
        ]}
      />

      <Grid gap={8}>
        <Grid gap={4}>
          <Heading level={2}>The Override Model</Heading>
          <Text>
            A theme is a partial set of token overrides scoped under a <code>[data-theme]</code> CSS selector. Themes never create new raw values — they remap at the alias or system tier by picking different steps on the raw scales the base already provides.
          </Text>
          <Text>
            A theme that overrides nothing is identical to the base. This means every theme inherits all {STAT_TOKEN_COUNT} tokens and only needs to override the ones it wants to change.
          </Text>
          <CodeBlock
            code={`/* Base (no data-theme attribute needed) */
:root {
  --color-primary: var(--color-neutral-900);
  --button-radius: var(--radius-md);
}

/* Custom theme — scoped override */
[data-theme="ocean"] {
  --color-primary: var(--color-blue-600);
  --button-radius: var(--radius-sm);
}`}
            language="css"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>How data-theme Selectors Work</Heading>
          <Text>
            Set <code>data-theme</code> on any ancestor element. All descendants inherit the overridden token values through CSS cascade. Set it on <code>&lt;html&gt;</code> for global theming, or on any container for scoped theming.
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
          <Heading level={2}>Token Override JSON Structure</Heading>
          <Text>
            Theme overrides are JSON files with the same structure as the base tokens. Only include the tokens you want to change — everything else is inherited.
          </Text>

          <Heading level={3}>Alias Overrides</Heading>
          <Text>
            Remap semantic roles to different raw values. This is the most powerful lever — a single alias change cascades to every component that references it.
          </Text>
          <CodeBlock
            code={`// src/alias/color.json — remap primary to blue
{
  "color": {
    "primary": { "$value": "{color.blue.600}", "$type": "color" },
    "primary-hover": { "$value": "{color.blue.700}", "$type": "color" }
  }
}`}
            language="json"
            filename="src/alias/color.json"
          />

          <Heading level={3}>System Overrides</Heading>
          <Text>
            Fine-tune individual component tokens. Use this when you need component-specific tweaks beyond what alias changes provide.
          </Text>
          <CodeBlock
            code={`// src/system/button.json — smaller radius for this theme
{
  "button": {
    "radius": { "$value": "{radius.sm}", "$type": "dimension" }
  }
}`}
            language="json"
            filename="src/system/button.json"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Building a Theme with Style Dictionary</Heading>
          <Text>
            Theme packages use the same Style Dictionary v5 build pipeline as the base tokens. The key difference is scoping all output under a <code>[data-theme]</code> selector.
          </Text>
          <CodeBlock
            code={`import StyleDictionary from 'style-dictionary';

const sd = new StyleDictionary({
  source: ['src/**/*.json'],
  platforms: {
    css: {
      transformGroup: 'css',
      buildPath: 'dist/css/',
      files: [{
        destination: 'variables.css',
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

          <Heading level={3}>1. Create the override files</Heading>
          <Text>
            Create JSON files under <code>src/alias/</code> and <code>src/system/</code> that override the tokens you want to change. Reference raw tokens that already exist in the base.
          </Text>

          <Heading level={3}>2. Add fonts (optional)</Heading>
          <Text>
            Create <code>css/fonts.css</code> with your font imports, and override the display/text font family tokens.
          </Text>

          <Heading level={3}>3. Build with Style Dictionary</Heading>
          <Text>
            Run Style Dictionary with <code>outputReferences: true</code> and scope output under <code>[data-theme=&quot;yourname&quot;]</code>.
          </Text>

          <Heading level={3}>4. Consume it</Heading>
          <CodeBlock
            code={`// Import after base tokens
import '@toucan-ui/tokens/css';
import './theme-ocean.css';

// Apply globally
<html data-theme="ocean">

// Or scope to a container
<div data-theme="ocean">
  <Button>Themed button</Button>
</div>`}
            language="tsx"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Example Themes</Heading>
          <Text>
            The example pages in this docs site demonstrate theming in action. Each example page applies a different set of token overrides to show how the same components adapt to different visual styles — all without changing any component code.
          </Text>
        </Grid>
      </Grid>
    </>
  );
}
