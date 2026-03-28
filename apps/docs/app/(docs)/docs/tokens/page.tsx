'use client';

import { Heading, Text, Tabs, TabList, Tab, TabPanel, Badge, Flex, Grid } from '@toucan-ui/core';
import { PageHeader, CodeBlock, FieldRow } from '../../../_shared/patterns';
import { STAT_TOKEN_COUNT } from '@/data/project-stats';

const RAW_COLORS = [
  { name: 'Blue', tokens: ['blue.50', 'blue.100', 'blue.500', 'blue.600', 'blue.700'] },
  {
    name: 'Neutral',
    tokens: [
      'neutral.0',
      'neutral.50',
      'neutral.100',
      'neutral.200',
      'neutral.300',
      'neutral.400',
      'neutral.500',
      'neutral.600',
      'neutral.700',
      'neutral.800',
      'neutral.900',
      'neutral.950',
    ],
  },
  { name: 'Red', tokens: ['red.50', 'red.100', 'red.500', 'red.600', 'red.700'] },
  { name: 'Green', tokens: ['green.50', 'green.100', 'green.500', 'green.600', 'green.700'] },
  { name: 'Amber', tokens: ['amber.50', 'amber.100', 'amber.500', 'amber.600', 'amber.700'] },
  { name: 'Cyan', tokens: ['cyan.50', 'cyan.100', 'cyan.500', 'cyan.600', 'cyan.700'] },
];

const RAW_SCALE = [
  '0 (0px)',
  '0-25 (1px)',
  '0-5 (2px)',
  '1 (4px)',
  '2 (8px)',
  '3 (12px)',
  '4 (16px)',
  '5 (20px)',
  '6 (24px)',
  '7 (28px)',
  '8 (32px)',
  '9 (36px)',
  '10 (40px)',
  '11 (44px)',
  '12 (48px)',
  '16 (64px)',
];

const RAW_LAYOUT = [
  '20 (80px)',
  '40 (160px)',
  '45 (180px)',
  '50 (200px)',
  '60 (240px)',
  '70 (280px)',
  '80 (320px)',
  '120 (480px)',
  '140 (560px)',
  '192 (768px)',
  '240 (960px)',
  '256 (1024px)',
  '300 (1200px)',
  '320 (1280px)',
];

const ALIAS_COLORS = [
  {
    name: 'Primary',
    tokens: ['color.primary', 'color.primary-hover', 'color.primary-active', 'color.on-primary'],
  },
  {
    name: 'Surface',
    tokens: ['color.surface.default', 'color.surface.muted', 'color.surface.raised'],
  },
  { name: 'On Surface', tokens: ['color.on-surface.default', 'color.on-surface.muted'] },
  { name: 'Border', tokens: ['color.border.default', 'color.border.strong', 'color.border.focus'] },
  {
    name: 'Semantic',
    tokens: [
      'color.danger',
      'color.danger-surface',
      'color.success',
      'color.success-surface',
      'color.warning',
      'color.warning-surface',
      'color.info',
      'color.info-surface',
    ],
  },
  { name: 'State', tokens: ['color.disabled', 'color.on-disabled', 'color.backdrop'] },
];

const ALIAS_TYPOGRAPHY = [
  'text.font-family',
  'text.font-family-mono',
  'heading.font-weight',
  'heading.letter-spacing',
  'display.font-family',
  'display.font-weight',
  'display.letter-spacing',
  'display.line-height',
  'body.font-weight',
  'body.font-size',
  'body.line-height',
  'body.letter-spacing',
];

const SYSTEM_COMPONENTS = [
  'Button',
  'Input',
  'Textarea',
  'Select',
  'Checkbox',
  'Toggle',
  'Radio',
  'Surface',
  'Text',
  'Badge',
  'Alert',
  'Avatar',
  'Separator',
  'Skeleton',
  'Progress',
  'Breadcrumb',
  'Table',
  'Tabs',
  'Tooltip',
  'Popover',
  'Dropdown',
  'Dialog',
  'Focus',
];

export default function TokensPage() {
  return (
    <>
      <PageHeader
        title="Tokens"
        description={`${STAT_TOKEN_COUNT} CSS custom properties across three tiers. Browse the full token inventory.`}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Docs', href: '/docs' },
          { label: 'Tokens' },
        ]}
      />

      <Grid gap={8}>
        <Grid gap={4}>
          <Heading level={2}>How the Cascade Works</Heading>
          <Text>
            Tokens flow through three tiers with strict referencing direction. Raw tokens hold
            primitive values. Alias tokens (the base theme) add semantic meaning. System tokens bind
            to specific components. All three tiers ship as foundation CSS with{' '}
            <code>@toucan-ui/core</code>.
          </Text>
          <CodeBlock
            code={`/* Colors — alias tokens used directly in atom CSS */
Raw:    --color-neutral-900: #171717
Alias:  --color-primary: var(--color-neutral-900)    ← base theme default
CSS:    .tcn-button[data-variant="primary"] { background-color: var(--color-primary) }

/* Structure — system tokens add component-specific tuning */
Raw:    --radius-md: 0.5rem
System: --button-radius: var(--radius-md)
CSS:    .tcn-button { border-radius: var(--button-radius) }`}
            language="css"
          />
          <Text>
            A theme overrides at the alias tier by remapping semantic roles to different raw values.
            Colors flow directly from alias to atom CSS. Structural properties (sizing, spacing,
            radius) route through system tokens for per-component tuning.
          </Text>
        </Grid>

        <Tabs defaultValue="raw">
          <TabList>
            <Tab value="raw">Raw</Tab>
            <Tab value="alias">Alias</Tab>
            <Tab value="system">System</Tab>
          </TabList>

          <TabPanel value="raw">
            <Grid gap={8}>
              <Grid gap={4}>
                <Heading level={3}>Colors</Heading>
                <Text muted>Primitive color scales. No semantic meaning — just values.</Text>
                {RAW_COLORS.map((group) => (
                  <Grid key={group.name} gap={2}>
                    <Text as="strong">{group.name}</Text>
                    {group.tokens.map((token) => (
                      <Flex key={token} row gap={2} align="center">
                        <span
                          className="docs-token-swatch"
                          style={{ background: `var(--color-${token.replace('.', '-')})` }}
                        />
                        <Text as="span" size="sm">
                          <code>--color-{token.replace('.', '-')}</code>
                        </Text>
                      </Flex>
                    ))}
                  </Grid>
                ))}
              </Grid>

              <Grid gap={4}>
                <Heading level={3}>Scale</Heading>
                <Text muted>
                  Unified spatial scale for spacing, sizing, and gaps. Key × 4 = pixels.
                </Text>
                <Grid gap={2}>
                  {RAW_SCALE.map((s) => {
                    const key = s.split(' ')[0];
                    return (
                      <FieldRow
                        key={key}
                        label={`--scale-${key}`}
                        value={s.match(/\(.*\)/)?.[0] || ''}
                        mono
                      />
                    );
                  })}
                </Grid>
              </Grid>

              <Grid gap={4}>
                <Heading level={3}>Layout</Heading>
                <Text muted>
                  Layout-scale tokens for larger dimensions — widths, max-widths, breakpoints. Key ×
                  4 = pixels.
                </Text>
                <Grid gap={2}>
                  {RAW_LAYOUT.map((s) => {
                    const key = s.split(' ')[0];
                    return (
                      <FieldRow
                        key={key}
                        label={`--layout-${key}`}
                        value={s.match(/\(.*\)/)?.[0] || ''}
                        mono
                      />
                    );
                  })}
                </Grid>
              </Grid>

              <Grid gap={4}>
                <Heading level={3}>Other Raw Categories</Heading>
                <Text muted>
                  Typography (11 font sizes, 4 weights, 3 families, 4 line heights), Radius (5
                  steps), Shadow (4 levels), Border widths, Z-index, Opacity, Motion, and Letter
                  spacing.
                </Text>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value="alias">
            <Grid gap={8}>
              <Grid gap={4}>
                <Heading level={3}>Color Aliases</Heading>
                <Text muted>
                  Semantic color roles that reference raw values. The base theme fills every slot
                  with neutral defaults. Branded themes override these to express a different
                  identity.
                </Text>
                {ALIAS_COLORS.map((group) => (
                  <Grid key={group.name} gap={2}>
                    <Text as="strong">{group.name}</Text>
                    {group.tokens.map((token) => (
                      <Flex key={token} row gap={2} align="center">
                        <span
                          className="docs-token-swatch"
                          style={{ background: `var(--${token.replace(/\./g, '-')})` }}
                        />
                        <Text as="span" size="sm">
                          <code>--{token.replace(/\./g, '-')}</code>
                        </Text>
                      </Flex>
                    ))}
                  </Grid>
                ))}
              </Grid>

              <Grid gap={4}>
                <Heading level={3}>Typography Aliases</Heading>
                <Text muted>
                  Font family, weight, and sizing tokens for text, headings, and display text.
                </Text>
                <Grid gap={2}>
                  {ALIAS_TYPOGRAPHY.map((token) => (
                    <FieldRow
                      key={token}
                      label={`--${token.replace(/\./g, '-')}`}
                      value="(see computed value)"
                      mono
                    />
                  ))}
                </Grid>
              </Grid>
            </Grid>
          </TabPanel>

          <TabPanel value="system">
            <Grid gap={8}>
              <Grid gap={4}>
                <Heading level={3}>Component Tokens</Heading>
                <Text muted>
                  System tokens handle structural properties — sizing, spacing, radius, font weight
                  — giving each component its own tuning knobs. For colors, atom CSS references
                  alias tokens directly so theme overrides cascade without extra indirection.
                </Text>
                <Flex row wrap gap={3}>
                  {SYSTEM_COMPONENTS.map((comp) => (
                    <Badge key={comp} variant="neutral">
                      {comp}
                    </Badge>
                  ))}
                </Flex>
              </Grid>

              <Grid gap={4}>
                <Heading level={3}>Example: Button Tokens</Heading>
                <Text muted>Structural system tokens consumed by button atom CSS:</Text>
                <CodeBlock
                  code={`--button-radius       → var(--radius-md)
--button-font-weight  → var(--font-weight-medium)
--button-gap          → var(--spacing-sm)
--button-border-width → var(--border-width-thin)
--button-sm-height    → var(--sizing-md)
--button-sm-padding-x → var(--spacing-md)
--button-md-height    → var(--sizing-lg)
--button-md-padding-x → var(--spacing-lg)
--button-lg-height    → var(--sizing-xl)
--button-lg-padding-x → var(--spacing-xl)`}
                  language="css"
                />
                <Text muted>Colors reference alias tokens directly in atom CSS:</Text>
                <CodeBlock
                  code={`.tcn-button[data-variant="primary"] {
  background-color: var(--color-primary);
  color: var(--color-on-primary);
}`}
                  language="css"
                />
              </Grid>

              <Grid gap={4}>
                <Heading level={3}>Example: Surface Tokens</Heading>
                <CodeBlock
                  code={`--surface-background    → var(--color-surface-default)
--surface-border        → var(--color-border-default)
--surface-border-width  → var(--border-width-thin)
--surface-elevation-0   → var(--shadow-none)
--surface-elevation-1   → var(--shadow-sm)
--surface-elevation-2   → var(--shadow-md)
--surface-elevation-3   → var(--shadow-lg)
--surface-radius-sm     → var(--radius-sm)
--surface-radius-md     → var(--radius-md)
--surface-radius-lg     → var(--radius-lg)`}
                  language="css"
                />
              </Grid>
            </Grid>
          </TabPanel>
        </Tabs>
      </Grid>
    </>
  );
}
