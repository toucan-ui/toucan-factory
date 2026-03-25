'use client';

import { Text, Grid, Wrapper, Section } from '@toucan-ui/core';
import { SectionHeader, CodeBlock } from '../patterns';

const cascadeExample = `// Raw: the actual value
"color": { "neutral": { "900": { "value": "#171717" } } }

// Alias: semantic meaning
"color": { "primary": { "value": "{color.neutral.900}" } }

// System: component binding
"button": { "surface": { "default": { "value": "{color.primary}" } } }`;

const themeOverrideExample = `// Custom theme: remap primary to blue
"color": { "primary": { "value": "{color.blue.600}" } }

// Every component that references color.primary
// re-skins automatically. Zero component code changes.`;

const cssOutputExample = `/* Base (no theme attribute) */
:root {
  --color-primary: var(--color-neutral-900);
  --button-surface-default: var(--color-primary);
}

/* Custom theme */
[data-theme="ocean"] {
  --color-primary: var(--color-blue-600);
  /* --button-surface-default already references --color-primary */
  /* It updates automatically. That's the cascade. */
}`;

export function TokenSection() {
  return (
    <Section gap={8} id="tokens">
      <SectionHeader
        title="The cascade that makes it all work"
        subtitle="Three tiers of tokens. Each tier references the one below it. Themes override at any level."
      />
      <Grid columns="auto" gap={6} minItemSize="var(--layout-60)">
        <CodeBlock code={cascadeExample} language="json" filename="Raw → Alias → System" />
        <CodeBlock code={themeOverrideExample} language="json" filename="Theme overrides" />
        <CodeBlock code={cssOutputExample} language="css" filename="CSS output" />
      </Grid>
      <Wrapper size="xs">
        <Text as="p" muted>
          Most theming happens at the system level — partial JSON files that remap token references,
          with the CSS cascade doing the rest. When you need finer control, component-level
          overrides are there too — like giving input fields a white surface instead of inheriting
          surface-default. A theme that overrides nothing is identical to base.
        </Text>
      </Wrapper>
    </Section>
  );
}
