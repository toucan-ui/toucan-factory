import { Grid, Section } from '@toucan-ui/core';
import { SectionHeader, FeatureCard } from '../patterns';

export function ProblemSection() {
  return (
    <Section gap={8} id="problem">
      <SectionHeader
        eyebrow="Value Gap"
        title="Design systems have a coupling problem"
        subtitle="Existing approaches tangle concerns, we ensure purposeful independence."
      />
      <Grid columns="auto" gap={6} minItemSize="var(--layout-60)">
        <FeatureCard
          title="Your components shouldn't dictate your aesthetics"
          description="Component libraries ship with baked-in styling opinions. Want a different look? You're fighting the framework — overriding CSS, wrapping components, or forking the source. The visual layer and the structural layer are glued together."
        />
        <FeatureCard
          title="Unstyled primitives are only half the answer"
          description="Headless libraries give you accessible structure but leave you to build the entire visual system from scratch. Every team reinvents token architecture, theme switching, and style composition. The hard part isn't the components — it's the system around them."
        />
        <FeatureCard
          title="Copying components doesn't scale"
          description="Copy-paste approaches feel fast until you need a second theme, a design refresh, or cross-product consistency. Without a token cascade, every component is an island. Change the brand colour and you're updating fifty files."
        />
      </Grid>
    </Section>
  );
}
