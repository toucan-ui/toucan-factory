import { Heading, Text, Badge, Grid } from '@toucan-ui/core';
import { PageHeader, CodeBlock, FeatureCard } from '../../../_shared/patterns';
import { STAT_PATTERN_COUNT } from '@/data/project-stats';

export default function ArchitecturePage() {
  return (
    <>
      <PageHeader
        title="Architecture"
        description="Three threads, zero entanglement. How the system stays modular at every layer."
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Architecture' },
        ]}
      />

      <Grid gap={8}>
        <Grid gap={4}>
          <Heading level={2}>The Three Threads</Heading>
          <Text>
            The design system separates concerns into three independent threads. Each thread can
            evolve without affecting the others. V1 ships threads 1 and 2; thread 3 is deferred to
            V2.
          </Text>

          <Grid columns="auto" gap={4} minItemSize="var(--layout-60)">
            <FeatureCard
              title="Tokens (Aesthetics)"
              description="JSON values become CSS custom properties via Style Dictionary. Framework-agnostic. Foundation tokens ship with core. Themes override these. Every visual value comes from a var() reference — zero hardcoded values."
              icon={<Badge variant="info">1</Badge>}
            />
            <FeatureCard
              title="Components (Structure)"
              description="Accessible HTML primitives in React. Emit semantic DOM, ARIA attributes, data-* hooks, and .tcn-* classes. Each component ships with co-located atom CSS that maps tokens to visual styles."
              icon={<Badge variant="success">2</Badge>}
            />
            <FeatureCard
              title="Interaction (Motion)"
              description="Transitions, transforms, animations, easing, gestures. Deferred to V2. This separation means V1 components work perfectly — they just change state instantly."
              icon={<Badge variant="neutral">3</Badge>}
            />
          </Grid>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>The Token Cascade</Heading>
          <Text>
            Tokens flow through three tiers with strict referencing direction: raw → alias → system.
            Each tier adds semantic meaning.
          </Text>

          <Heading level={3}>Raw Tokens</Heading>
          <Text>
            Primitive values with no semantic meaning. Color scales, sizing steps, font stacks.
            These are the building blocks — the &quot;paint tubes&quot; that everything else draws
            from.
          </Text>
          <CodeBlock
            code={`{
  "color": {
    "blue": {
      "500": { "$value": "#3b82f6", "$type": "color" },
      "600": { "$value": "#2563eb", "$type": "color" }
    },
    "neutral": {
      "0": { "$value": "#ffffff", "$type": "color" },
      "900": { "$value": "#171717", "$type": "color" }
    }
  }
}`}
            language="json"
            filename="raw/color.json"
          />

          <Heading level={3}>Alias Tokens (Base Theme)</Heading>
          <Text>
            Semantic roles that reference raw values. The base theme provides neutral, functional
            defaults — neutral-900 primary, system-ui fonts, white surfaces. It ships as part of
            foundation CSS so a site with no theme loaded still renders correctly. A branded theme
            overrides these alias slots to express a different visual identity.
          </Text>
          <CodeBlock
            code={`{
  "color": {
    "primary": { "$value": "{color.neutral.900}", "$type": "color" },
    "on-primary": { "$value": "{color.white}", "$type": "color" },
    "surface": {
      "default": { "$value": "{color.neutral.0}", "$type": "color" }
    },
    "on-surface": {
      "default": { "$value": "{color.neutral.900}", "$type": "color" }
    }
  }
}`}
            language="json"
            filename="alias/color.json"
          />

          <Heading level={3}>System Tokens</Heading>
          <Text>
            Component-specific tokens that reference aliases. System tokens handle structural
            properties — sizing, spacing, radius, font weight — giving each component its own tuning
            knobs. For colors, atom CSS references alias tokens directly so theme overrides cascade
            without an extra indirection layer.
          </Text>
          <CodeBlock
            code={`{
  "button": {
    "radius": { "$value": "{radius.md}", "$type": "dimension" },
    "font-weight": { "$value": "{font.weight.medium}", "$type": "fontWeight" },
    "gap": { "$value": "{spacing.sm}", "$type": "dimension" },
    "md": {
      "padding-x": { "$value": "{spacing.lg}", "$type": "dimension" },
      "padding-y": { "$value": "{spacing.sm}", "$type": "dimension" },
      "font-size": { "$value": "{font.size.base}", "$type": "dimension" },
      "height": { "$value": "{sizing.lg}", "$type": "dimension" }
    }
  }
}`}
            language="json"
            filename="system/button.json"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Foundation CSS</Heading>
          <Text>
            Foundation CSS is the ground-zero import for any Toucan app. It concatenates the token
            tiers into a single file: raw values, base theme (alias defaults), system bindings, and
            dark mode overrides. Foundation ships with <code>@toucan-ui/core</code> so the core
            package is the only required dependency.
          </Text>
          <CodeBlock
            code={`// One import — tokens are ready
import '@toucan-ui/core/foundation';

// Foundation includes:
// 1. Raw tokens    — color scales, spacing, typography
// 2. Base theme    — neutral alias defaults (primary, surface, etc.)
// 3. System tokens — component-specific bindings
// 4. Dark mode     — [data-mode="dark"] overrides`}
            language="tsx"
            filename="app/layout.tsx"
          />
          <Text>
            The tokens package builds foundation CSS via Style Dictionary. Core copies the output at
            build time. Consumers never need to depend on <code>@toucan-ui/tokens</code> directly.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Co-located Atom CSS</Heading>
          <Text>
            Atom CSS files live alongside their components in <code>@toucan-ui/core</code>. Each
            component&apos;s entry point imports its own CSS, so importing a component automatically
            includes only that component&apos;s styles.
          </Text>
          <CodeBlock
            code={`// core/src/components/button/index.ts
import './button.css';
export { Button } from './button';`}
            language="tsx"
          />
          <CodeBlock
            code={`/* button.css — maps data attributes to token values */
.tcn-button {
  border-radius: var(--button-radius);
  font-weight: var(--button-font-weight);
  gap: var(--button-gap);
}

.tcn-button[data-variant="primary"] {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-color: transparent;
}

.tcn-button[data-size="md"] {
  height: var(--button-md-height);
  padding: var(--button-md-padding-y) var(--button-md-padding-x);
  font-size: var(--button-md-font-size);
}`}
            language="css"
            filename="button.css"
          />
          <Text>
            Unused components don&apos;t add CSS weight to your bundle. Import only{' '}
            <code>Button</code> and only button styles ship.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Component Contract Model</Heading>
          <Text>
            Components emit structure and accessibility. They render semantic HTML elements, ARIA
            attributes, <code>data-*</code> state hooks, and <code>.tcn-*</code> class names. The
            co-located atom CSS maps these hooks to token values — this is the bridge between the
            structure and aesthetics threads.
          </Text>
          <CodeBlock
            code={`<!-- Component renders structure + ARIA -->
<button
  class="tcn-button"
  data-variant="primary"
  data-size="md"
  aria-busy="false"
>
  Click me
</button>`}
            language="html"
          />
          <CodeBlock
            code={`/* Atom CSS maps structure to tokens */
.tcn-button[data-variant="primary"] {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
  border-color: transparent;
}

.tcn-button[data-size="md"] {
  height: var(--button-md-height);
  padding: var(--button-md-padding-y) var(--button-md-padding-x);
  font-size: var(--button-md-font-size);
}`}
            language="css"
          />
          <Text>
            This separation means components can be ported to any framework (Vue, Flutter) — the
            visual layer is pure CSS custom properties.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Why Interaction Is Separate</Heading>
          <Text>
            Motion is the third axis. Transitions, transforms for hover effects, animations, and
            gesture handling all live in their own thread. In V1, state changes happen instantly — a
            button goes from default to hover with no transition. This is intentional: it proves the
            system works without motion, and V2 can layer motion on top without touching component
            or token code.
          </Text>
          <Text>
            The only transforms allowed in V1 are structural: a toggle thumb&apos;s{' '}
            <code>translateX</code> to move between checked positions, or a checkbox chevron&apos;s{' '}
            <code>rotate</code>. These aren&apos;t motion — they&apos;re positional state.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Monorepo Structure</Heading>
          <CodeBlock
            code={`packages/
  tokens/        → Style Dictionary config + JSON tokens → builds foundation CSS
  core/          → React primitives + co-located atom CSS + foundation CSS
  interactions/  → Motion thread (V2)
  patterns/      → ${STAT_PATTERN_COUNT} theme-agnostic layout patterns

apps/
  docs/          → Documentation site with examples and theme switcher
  wizard/        → Visual theme configurator`}
            language="text"
          />
          <Text>
            Build order: tokens → core → patterns. Turborepo manages the dependency graph.
          </Text>
        </Grid>
      </Grid>
    </>
  );
}
