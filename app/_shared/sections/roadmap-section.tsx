import { Heading, Text, Grid, Section, Wrapper, GridItem } from '@toucan-ui/core';
import { SectionHeader, AlertBanner, TimelineGroup } from '../patterns';
import { STAT_COMPONENT_COUNT } from '@/data/project-stats';

export function RoadmapSection() {
  return (
    <Section id="roadmap" padding="lg">
      <Wrapper size="xs">
        <Grid gap={8}>
          <Grid gap={4}>
            <SectionHeader
              title="What V1 doesn't do (and why)"
              subtitle="Shipping incomplete is a feature when the boundaries are intentional."
            />

            <AlertBanner
              variant="info"
              message="Toucan V1 ships threads 1 and 2 only. The interaction thread is an intentional V2 boundary, not an oversight."
            />

            <Text as="p" muted>
              <strong>No animation or transitions.</strong> V1 components change
              state instantly. No hover transitions, no enter/exit animations, no
              easing curves. This is intentional — the interaction thread is a V2
              concern, and mixing it into V1 would compromise the strict
              three-thread separation that makes the architecture work.
            </Text>
            <Text as="p" muted>
              <strong>No SSR optimization.</strong> Components work in SSR
              environments but haven&apos;t been optimized for streaming, selective
              hydration, or React Server Components. The docs site (Next.js 16) will
              stress-test this.
            </Text>
            <Text as="p" muted>
              <strong>{STAT_COMPONENT_COUNT} components, not 50+.</strong> Toucan ships the primitives
              that most design systems need. It doesn&apos;t include charts, date
              pickers, rich text editors, or virtualized lists. The architecture
              supports adding them — but V1 prioritizes depth over breadth.
            </Text>
            <Text as="p" muted>
              <strong>React only (for now).</strong> Components are React 19. The
              token layer is framework-agnostic (CSS custom properties), and the
              component API contracts are documented independently of React for
              future Native Web Components and Flutter portability. But today, it&apos;s React.
            </Text>

          </Grid>
          <Grid gap={4}>
            <Heading level={3}>V2 Roadmap</Heading>
            <Grid gap={4}>
              <TimelineGroup date="Interaction thread">
                <Text>
                  Pluggable motion system — transitions, transforms, easing, enter/exit
                  animations.
                </Text>
              </TimelineGroup>
              <TimelineGroup date="Additional themes">
                <Text>Out of the box themed verticals for use or inspiration, think marketing, e-commerce and editorial UI's.</Text>
              </TimelineGroup>
              <TimelineGroup date="Framework ports">
                <Text>Native Web Components and Flutter component packages using the same token layer.</Text>
              </TimelineGroup>
              <TimelineGroup date="Compound patterns">
                <Text>Multi-step forms, data grids, command palettes.</Text>
              </TimelineGroup>
              <TimelineGroup date="Design tool sync">
                <Text>Figma token plugin that reads the same JSON source.</Text>
              </TimelineGroup>
            </Grid>
          </Grid>
        </Grid>
      </Wrapper>
    </Section>
  );
}
