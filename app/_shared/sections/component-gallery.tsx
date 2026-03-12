import {
  Tabs,
  TabList,
  Tab,
  TabPanel,
  Text,
  Heading,
  Box,
  Link,
  Grid,
  Section,
} from '@toucan-ui/core';
import { SectionHeader } from '../patterns';
import { COMPONENTS, CATEGORIES } from '@/data/component-data';
import { STAT_COMPONENT_COUNT } from '@/data/project-stats';

const categories = CATEGORIES.map((cat) => ({
  value: cat.key,
  label: cat.label,
  components: COMPONENTS
    .filter((c) => c.category === cat.key)
    .map((c) => ({ name: c.name, slug: c.slug, description: c.description })),
})).filter((cat) => cat.components.length > 0);

export function ComponentGallery() {
  return (
    <Section gap={8} id="components">
      <SectionHeader
        title={`${STAT_COMPONENT_COUNT} primitives, built from scratch`}
        subtitle="Every component is accessible by default. No Radix, no Headless UI — hand-crafted ARIA, keyboard navigation, and focus management."
      />
      <Tabs defaultValue={categories[0]?.value}>
        <TabList>
          {categories.map((cat) => (
            <Tab key={cat.value} value={cat.value}>
              {cat.label}
            </Tab>
          ))}
        </TabList>
        {categories.map((cat) => (
          <TabPanel key={cat.value} value={cat.value}>
            <Grid columns="auto" gap={4} minItemSize="var(--layout-50)">
              {cat.components.map((comp) => (
                <Link key={comp.slug} href={`/components/${comp.slug}`} variant="standalone" className="docs-link-card">
                  <Box padding="md" radius="md" elevation={1}>
                    <Heading level={4}>{comp.name}</Heading>
                    <Text muted size="sm">{comp.description}</Text>
                  </Box>
                </Link>
              ))}
            </Grid>
          </TabPanel>
        ))}
      </Tabs>
    </Section>
  );
}
