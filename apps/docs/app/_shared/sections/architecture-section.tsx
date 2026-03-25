import { Badge, Grid, Section } from '@toucan-ui/core';
import { SectionHeader, FeatureCard } from '../patterns';
import { STAT_COMPONENT_COUNT } from '@/data/project-stats';

export function ArchitectureSection() {
  return (
    <Section gap={8} id="architecture">
      <SectionHeader
        eyebrow="Architecture"
        title="Three threads, zero entanglement"
        subtitle="Toucan separates every design system into three independent concerns. Change one without touching the others."
      />
      <Grid columns="auto" gap={6} minItemSize="var(--layout-60)">
        <FeatureCard
          icon={
            <Badge variant="info" size="sm">
              Aesthetics
            </Badge>
          }
          title="Tokens"
          description="A complete token system ships out of the box — raw values, semantic aliases, and system-level component tokens, three tiers that cascade automatically. To theme it, you only override at the system level. The Wiz'rd GUI makes that even easier: pick colours, adjust spacing, and export a ready-made theme file."
        />
        <FeatureCard
          icon={
            <Badge variant="neutral" size="sm">
              Structure
            </Badge>
          }
          title="Components"
          description={`${STAT_COMPONENT_COUNT} accessible React primitives emit semantic HTML, ARIA attributes, and data-* state hooks. They contain zero CSS, zero visual logic, zero animation. A Button renders a <button> with the right accessibility contract — what it looks like is entirely the token layer's job.`}
        />
        <FeatureCard
          icon={
            <Badge variant="warning" size="sm">
              V2
            </Badge>
          }
          title="Interaction"
          description="Transitions, easing curves, type-ahead, drag gestures — all deferred to a dedicated motion layer. V1 components change state instantly. When the interaction thread ships, it plugs in without touching structure or aesthetics. This is what strict separation buys you."
        />
      </Grid>
    </Section>
  );
}
