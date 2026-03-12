import { Heading, Text, Flex, Grid, Button, Section, Wrapper, GridItem } from '@toucan-ui/core';

export function HeroSection() {
  return (
    <Section id="hero" padding="lg">
      <Wrapper size="lg">
        <Grid columns={{ md: 2 }} gap={12} align="center">
          <GridItem>
            <Heading level={1} display="lg">
              One architecture. Infinite design systems.
            </Heading>
          </GridItem>
          <GridItem>
            <Flex gap={8} align="start">
              <Text as="p" size="lg" muted>
                Patterns compose atoms, atoms reference tokens, themes override
                tokens. One source, infinite skins.
              </Text>
              <Text as="p" muted>
                Toucan is a design system that builds design systems. Swap a single
                JSON file and every component, every pattern, every layout re-skins
                itself — no code changes, no overrides, no hacks.
              </Text>
              <Button as="a" href="#architecture" variant="primary" size="lg">
                Explore the system
              </Button>
            </Flex>
          </GridItem>
        </Grid>
      </Wrapper>
    </Section>
  );
}
