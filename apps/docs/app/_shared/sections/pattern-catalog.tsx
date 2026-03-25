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
import { PATTERNS, PATTERN_CATEGORIES } from '@/data/pattern-data';
import { STAT_PATTERN_COUNT } from '@/data/project-stats';

const categories = PATTERN_CATEGORIES.map((cat) => ({
  value: cat.key,
  label: cat.label,
  patterns: PATTERNS.filter((p) => p.category === cat.key).map((p) => ({
    name: p.name,
    slug: p.slug,
    description: p.description,
  })),
})).filter((cat) => cat.patterns.length > 0);

export function PatternCatalog() {
  return (
    <Section gap={8} id="patterns">
      <SectionHeader
        title={`${STAT_PATTERN_COUNT} patterns. Theme-agnostic by design.`}
        subtitle="Patterns compose atoms. Their CSS uses token references, so they re-skin automatically under any theme."
      />
      <Tabs defaultValue="heroes">
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
              {cat.patterns.map((p) => (
                <Link
                  key={p.slug}
                  href={`/patterns/${p.slug}`}
                  variant="standalone"
                  className="docs-link-card"
                >
                  <Box padding="md" radius="md" elevation={1}>
                    <Heading level={4}>{p.name}</Heading>
                    <Text muted size="sm">
                      {p.description}
                    </Text>
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
