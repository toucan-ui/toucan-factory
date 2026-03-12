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
            The design system separates concerns into three independent threads. Each thread can evolve without affecting the others. V1 ships threads 1 and 2; thread 3 is deferred to V2.
          </Text>

          <Grid columns="auto" gap={4} minItemSize="var(--layout-60)">
            <FeatureCard
              title="Tokens (Aesthetics)"
              description="JSON values become CSS custom properties. Framework-agnostic. Themes override these. Every visual value in atom CSS comes from a var() token reference — zero hardcoded values."
              icon={<Badge variant="info">1</Badge>}
            />
            <FeatureCard
              title="Components (Structure)"
              description="Accessible HTML primitives. React implementation. Emit semantic DOM, ARIA attributes, data-* hooks, and .tcn-* classes. No CSS, no visual logic, no animation."
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
            Tokens flow through three tiers with strict referencing direction: raw → alias → system. Each tier adds semantic meaning.
          </Text>

          <Heading level={3}>Raw Tokens</Heading>
          <Text>
            Primitive values with no semantic meaning. Color scales, sizing steps, font stacks. These are the building blocks.
          </Text>
          <CodeBlock
            code={`{
  "color": {
    "blue": {
      "500": { "value": "#3b82f6" },
      "600": { "value": "#2563eb" }
    },
    "neutral": {
      "0": { "value": "#ffffff" },
      "900": { "value": "#171717" }
    }
  }
}`}
            language="json"
            filename="raw/color.json"
          />

          <Heading level={3}>Alias Tokens</Heading>
          <Text>
            Semantic roles that reference raw values. &quot;Primary&quot; maps to neutral.900 by default, but a theme can remap it to any raw value.
          </Text>
          <CodeBlock
            code={`{
  "color": {
    "primary": { "value": "{color.neutral.900}" },
    "on-primary": { "value": "{color.white}" },
    "surface": {
      "default": { "value": "{color.neutral.0}" }
    },
    "on-surface": {
      "default": { "value": "{color.neutral.900}" }
    }
  }
}`}
            language="json"
            filename="alias/color.json"
          />

          <Heading level={3}>System Tokens</Heading>
          <Text>
            Component-specific tokens that reference aliases. This is where the surface/on-surface convention maps to specific components.
          </Text>
          <CodeBlock
            code={`{
  "button": {
    "primary": {
      "surface": {
        "default": { "value": "{color.primary}" },
        "hover": { "value": "{color.primary-hover}" }
      },
      "on-surface": {
        "default": { "value": "{color.on-primary}" }
      }
    }
  }
}`}
            language="json"
            filename="system/button.json"
          />
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Component Contract Model</Heading>
          <Text>
            Components emit structure and accessibility. They render semantic HTML elements, ARIA attributes, <code>data-*</code> state hooks, and <code>.tcn-*</code> class names. The CSS lives in the tokens package as atom CSS that maps these hooks to token values.
          </Text>
          <CodeBlock
            code={`// Component renders structure + ARIA (no CSS)
<button
  class="tcn-button tcn-button-primary"
  data-size="md"
  data-loading="false"
  aria-busy="false"
>
  Click me
</button>

/* Atom CSS maps structure to tokens (no component logic) */
.tcn-button-primary {
  background: var(--button-primary-surface-default);
  color: var(--button-primary-on-surface-default);
  border-radius: var(--button-radius);
}`}
            language="tsx"
          />
          <Text>
            This separation means components can be ported to any framework (Vue, Flutter) — the visual layer is pure CSS custom properties.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Why Interaction Is Separate</Heading>
          <Text>
            Motion is the third axis. Transitions, transforms for hover effects, animations, and gesture handling all live in their own thread. In V1, state changes happen instantly — a button goes from default to hover with no transition. This is intentional: it proves the system works without motion, and V2 can layer motion on top without touching component or token code.
          </Text>
          <Text>
            The only transforms allowed in V1 are structural: a toggle thumb&apos;s <code>translateX</code> to move between checked positions, or a checkbox chevron&apos;s <code>rotate</code>. These aren&apos;t motion — they&apos;re positional state.
          </Text>
        </Grid>

        <Grid gap={4}>
          <Heading level={2}>Monorepo Structure</Heading>
          <CodeBlock
            code={`packages/
  tokens/        → Style Dictionary config + JSON tokens + atom CSS
  core/          → React primitives (structure + accessibility)
  interactions/  → Motion thread (V2)
  patterns/      → ${STAT_PATTERN_COUNT} theme-agnostic layout patterns
apps/
  docs/          → Next.js documentation site`}
            language="text"
          />
          <Text>
            Build order: tokens → core → patterns → docs. Turborepo manages the dependency graph.
          </Text>
        </Grid>
      </Grid>
    </>
  );
}
