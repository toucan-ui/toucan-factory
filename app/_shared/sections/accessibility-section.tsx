import { Text, Grid, Wrapper, Section } from '@toucan-ui/core';
import { SectionHeader, FeatureCard } from '../patterns';
import { STAT_COMPONENT_COUNT, STAT_TEST_COUNT } from '@/data/project-stats';

export function AccessibilitySection() {
  return (
    <Section gap={8} id="accessibility">
      <SectionHeader
        title="Accessibility isn't a feature. It's the foundation."
        subtitle="Every component is built accessibility-first, not accessibility-patched."
      />
      <Wrapper size="xs">
        <Text as="p" muted>
          Factory&apos;s {STAT_COMPONENT_COUNT} components are built from scratch — no wrapper
          libraries, no accessibility plugins, no &quot;add ARIA later&quot;.
          Every component starts from the WAI-ARIA Authoring Practices and
          implements keyboard navigation, focus management, screen reader
          announcements, and semantic HTML as the first code written, not the
          last.
        </Text>
      </Wrapper>
      <Grid columns="auto" gap={6} minItemSize="var(--layout-60)">
        <FeatureCard
          title="Keyboard navigation"
          description="Full keyboard support across all interactive components. Tabs arrow between panels, dropdown menus support Up/Down/Home/End, dialogs trap focus, and Escape closes overlays. Tested against WAI-ARIA Authoring Practices."
        />
        <FeatureCard
          title="Screen reader semantics"
          description="Semantic HTML first, ARIA attributes where HTML falls short. Every component exposes the right roles, states, and properties. LiveRegions announce dynamic changes. Labels are required, not optional."
        />
        <FeatureCard
          title="Focus management"
          description="Custom useFocusTrap for modals and overlays. Focus returns to trigger elements on close. No focus-trapping libraries — built to understand exactly what's happening."
        />
        <FeatureCard
          title="Automated testing"
          description={`Every component runs axe-core in its test suite. ${STAT_TEST_COUNT.toLocaleString()} tests total, with accessibility assertions throughout. Not a checkbox — a continuous guarantee.`}
        />
      </Grid>
    </Section>
  );
}
