import { Wrapper, Grid } from '@toucan-ui/core';
import { HeroSection } from '../_shared/sections/hero-section';
import { ProblemSection } from '../_shared/sections/problem-section';
import { ArchitectureSection } from '../_shared/sections/architecture-section';
import { TokenSection } from '../_shared/sections/token-section';
import { ComponentGallery } from '../_shared/sections/component-gallery';
import { PatternCatalog } from '../_shared/sections/pattern-catalog';
import { ComparisonSection } from '../_shared/sections/comparison-section';
import { AccessibilitySection } from '../_shared/sections/accessibility-section';
import { GettingStartedSection } from '../_shared/sections/getting-started-section';
import { RoadmapSection } from '../_shared/sections/roadmap-section';

export default function Home() {
  return (
    <Grid gap={16}>
      <HeroSection />
      <Wrapper size="lg">
        <Grid gap={16}>
          <ProblemSection />
          <ArchitectureSection />
          <TokenSection />
          <ComponentGallery />
          <PatternCatalog />
          <ComparisonSection />
          <AccessibilitySection />
          <GettingStartedSection />
          <RoadmapSection />
        </Grid>
      </Wrapper>
    </Grid>
  );
}
