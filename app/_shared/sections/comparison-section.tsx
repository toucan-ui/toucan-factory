import { Section, Box } from '@toucan-ui/core';
import { SectionHeader, ComparisonTable } from '../patterns';
import type { ComparisonFeature } from '../patterns';
import { STAT_COMPONENT_COUNT } from '@/data/project-stats';

const products = ['Toucan', 'MUI', 'Chakra', 'Radix', 'Headless UI', 'shadcn/ui'];

const features: ComparisonFeature[] = [
  {
    feature: 'Accessible components',
    values: {
      Toucan: { text: 'Hand-crafted', variant: 'success' },
      MUI: { text: 'Yes', variant: 'success' },
      Chakra: { text: 'Yes', variant: 'success' },
      Radix: { text: 'Yes', variant: 'success' },
      'Headless UI': { text: 'Yes', variant: 'success' },
      'shadcn/ui': { text: 'Via Radix', variant: 'success' },
    },
  },
  {
    feature: 'Token architecture',
    values: {
      Toucan: { text: '3-tier cascade', variant: 'success' },
      MUI: 'Theme object',
      Chakra: 'Theme object',
      Radix: { text: 'None', variant: 'neutral' },
      'Headless UI': { text: 'None', variant: 'neutral' },
      'shadcn/ui': 'CSS variables',
    },
  },
  {
    feature: 'Theme switching',
    values: {
      Toucan: { text: 'data-theme attr', variant: 'success' },
      MUI: 'ThemeProvider',
      Chakra: 'ChakraProvider',
      Radix: { text: 'N/A', variant: 'neutral' },
      'Headless UI': { text: 'N/A', variant: 'neutral' },
      'shadcn/ui': 'CSS variables',
    },
  },
  {
    feature: 'Multi-theme from one source',
    values: {
      Toucan: { text: 'Core design', variant: 'success' },
      MUI: 'Possible (work)',
      Chakra: 'Possible (work)',
      Radix: { text: 'N/A', variant: 'neutral' },
      'Headless UI': { text: 'N/A', variant: 'neutral' },
      'shadcn/ui': 'Manual',
    },
  },
  {
    feature: 'Structure/style separation',
    values: {
      Toucan: { text: 'Strict', variant: 'success' },
      MUI: { text: 'No', variant: 'danger' },
      Chakra: { text: 'No', variant: 'danger' },
      Radix: { text: 'Yes', variant: 'success' },
      'Headless UI': { text: 'Yes', variant: 'success' },
      'shadcn/ui': 'Partial',
    },
  },
  {
    feature: 'CSS strategy',
    values: {
      Toucan: { text: 'Custom properties', variant: 'success' },
      MUI: 'Emotion/CSS-in-JS',
      Chakra: 'Emotion/CSS-in-JS',
      Radix: 'None (BYO)',
      'Headless UI': 'None (BYO)',
      'shadcn/ui': 'Tailwind',
    },
  },
  {
    feature: 'Framework-agnostic tokens',
    values: {
      Toucan: { text: 'Yes (CSS vars)', variant: 'success' },
      MUI: { text: 'No (JS)', variant: 'danger' },
      Chakra: { text: 'No (JS)', variant: 'danger' },
      Radix: { text: 'N/A', variant: 'neutral' },
      'Headless UI': { text: 'N/A', variant: 'neutral' },
      'shadcn/ui': { text: 'No (Tailwind)', variant: 'danger' },
    },
  },
  {
    feature: 'Component count',
    values: {
      Toucan: String(STAT_COMPONENT_COUNT),
      MUI: '50+',
      Chakra: '100+',
      Radix: '30+',
      'Headless UI': '16',
      'shadcn/ui': '55+',
    },
  },
  {
    feature: 'Bundle includes CSS runtime',
    values: {
      Toucan: { text: 'No', variant: 'success' },
      MUI: { text: 'Yes', variant: 'warning' },
      Chakra: { text: 'Yes', variant: 'warning' },
      Radix: { text: 'No', variant: 'success' },
      'Headless UI': { text: 'No', variant: 'success' },
      'shadcn/ui': { text: 'No', variant: 'success' },
    },
  },
  {
    feature: 'Animation system',
    values: {
      Toucan: { text: 'V2', variant: 'warning' },
      MUI: 'Built-in',
      Chakra: 'Built-in',
      Radix: { text: 'None', variant: 'neutral' },
      'Headless UI': 'Minimal',
      'shadcn/ui': 'Via Tailwind',
    },
  },
  {
    feature: 'Production maturity',
    values: {
      Toucan: { text: 'Portfolio', variant: 'warning' },
      MUI: { text: 'Enterprise', variant: 'success' },
      Chakra: { text: 'Production', variant: 'success' },
      Radix: { text: 'Production', variant: 'success' },
      'Headless UI': { text: 'Production', variant: 'success' },
      'shadcn/ui': { text: 'Production', variant: 'success' },
    },
  },
];

export function ComparisonSection() {
  return (
    <Section gap={8} id="comparison">
      <SectionHeader
        title="How Toucan compares"
        subtitle="Honest positioning. Every tool has strengths — here's where Toucan fits."
      />
      <Box padding="none" radius="md" elevation={0} overflow="scroll">
        <ComparisonTable
          products={products}
          features={features}
          highlightedProduct="Toucan"
        />
      </Box>
    </Section>
  );
}
