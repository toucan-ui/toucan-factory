'use client';

import { useState, useEffect } from 'react';
import {
  Heading,
  Text,
  Badge,
  Page,
  Section,
  Box,
  Flex,
  Wrapper,
  Grid,
  Separator,
  Button,
  Slider,
  Checkbox,
  Toggle,
  Select,
  RadioGroup,
  Radio,
  Textarea,
  Drawer,
  Icon,
  Alert,
  Progress,
  Skeleton,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  ToastProvider,
  useToast,
  VisuallyHidden,
} from '@toucan-ui/core';
import {
  SideNav,
  PageHeader,
  DataTableFull,
  CodeBlock,
  AlertBanner,
  FormSection,
} from '../../../_shared/patterns';
import { CssDisclaimer } from '../../../_shared/css-disclaimer';
import { BackToDocs } from '../../../_shared/back-to-docs';
import { ExampleControls } from '../../../_shared/example-controls';
import './theme.css';
import './dashboard.css';

/* ── Icon SVGs ─────────────────────────────────────────────── */

function TerminalIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="4 17 10 11 4 5" />
      <line x1="12" y1="19" x2="20" y2="19" />
    </svg>
  );
}

function InfoIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

function AlertTriangleIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function SettingsIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z" />
    </svg>
  );
}

function CopyIcon() {
  return (
    <svg width="1em" height="1em" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
      <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
    </svg>
  );
}

/* ── Types & Config ────────────────────────────────────────── */

interface Config {
  attendees: number;
  days: number;
  ticketPrice: number;
  ticketType: string;
  venueSize: string;
  cateringTier: string;
  timezone: string;
  mealTickets: boolean;
  vipLounge: boolean;
  liveStreaming: boolean;
  swagBags: boolean;
  childcare: boolean;
  publicEvent: boolean;
  sendNotifications: boolean;
  financeNotes: string;
}

const defaultConfig: Config = {
  attendees: 500,
  days: 3,
  ticketPrice: 150,
  ticketType: 'general',
  venueSize: 'medium',
  cateringTier: 'standard',
  timezone: 'America/New_York',
  mealTickets: true,
  vipLounge: false,
  liveStreaming: false,
  swagBags: true,
  childcare: false,
  publicEvent: true,
  sendNotifications: true,
  financeNotes: '',
};

const venueSizeOptions = [
  { value: 'small', label: 'Small (≤200)' },
  { value: 'medium', label: 'Medium (≤800)' },
  { value: 'large', label: 'Large (≤2000)' },
  { value: 'arena', label: 'Arena (2000+)' },
];

const cateringTierOptions = [
  { value: 'basic', label: 'Basic' },
  { value: 'standard', label: 'Standard' },
  { value: 'premium', label: 'Premium' },
];

const timezoneOptions = [
  { value: 'America/New_York', label: 'ET (New York)' },
  { value: 'America/Chicago', label: 'CT (Chicago)' },
  { value: 'America/Denver', label: 'MT (Denver)' },
  { value: 'America/Los_Angeles', label: 'PT (Los Angeles)' },
  { value: 'Europe/London', label: 'GMT (London)' },
  { value: 'Europe/Berlin', label: 'CET (Berlin)' },
];

const sideNavSections = [
  {
    heading: 'Event',
    items: [
      { label: 'Dashboard', href: '/examples/dashboard', active: true },
      { label: 'Schedule', href: '#' },
      { label: 'Speakers', href: '#' },
      { label: 'Sponsors', href: '#' },
    ],
  },
  {
    heading: 'Admin',
    items: [
      { label: 'Registrations', href: '#' },
      { label: 'Logistics', href: '#' },
      { label: 'Settings', href: '#' },
    ],
  },
];

/* ── Calculation helpers ───────────────────────────────────── */

function venueBaseCost(size: string): number {
  switch (size) {
    case 'small': return 2000;
    case 'medium': return 5000;
    case 'large': return 10000;
    case 'arena': return 20000;
    default: return 5000;
  }
}

function venueCapacity(size: string): number {
  switch (size) {
    case 'small': return 200;
    case 'medium': return 800;
    case 'large': return 2000;
    case 'arena': return 5000;
    default: return 800;
  }
}

interface LineItem {
  category: string;
  quantity: number;
  unitCost: number;
  subtotal: number;
  status: string;
}

function computeLineItems(c: Config): LineItem[] {
  const items: LineItem[] = [];

  // Venue
  items.push({
    category: 'Venue rental',
    quantity: c.days,
    unitCost: venueBaseCost(c.venueSize),
    subtotal: c.days * venueBaseCost(c.venueSize),
    status: 'Confirmed',
  });

  // Beverages
  const beverageQty = c.attendees * c.days * 4;
  items.push({
    category: 'Beverages',
    quantity: beverageQty,
    unitCost: 3,
    subtotal: beverageQty * 3,
    status: 'Confirmed',
  });

  // Security
  const guards = Math.max(2, Math.ceil(c.attendees / 100));
  items.push({
    category: 'Security',
    quantity: guards * c.days,
    unitCost: 400,
    subtotal: guards * c.days * 400,
    status: 'Confirmed',
  });

  // Meals
  if (c.mealTickets) {
    const mealQty = c.attendees * c.days * 3;
    items.push({
      category: 'Meals',
      quantity: mealQty,
      unitCost: 25,
      subtotal: mealQty * 25,
      status: 'Pending',
    });
  }

  // Swag bags
  if (c.swagBags) {
    items.push({
      category: 'Swag bags',
      quantity: c.attendees,
      unitCost: 15,
      subtotal: c.attendees * 15,
      status: 'Pending',
    });
  }

  // Live streaming
  if (c.liveStreaming) {
    items.push({
      category: 'Live streaming',
      quantity: c.days,
      unitCost: 5000,
      subtotal: c.days * 5000,
      status: 'Quote received',
    });
  }

  // Childcare
  if (c.childcare) {
    items.push({
      category: 'Childcare',
      quantity: c.days,
      unitCost: 2000,
      subtotal: c.days * 2000,
      status: 'Pending',
    });
  }

  // VIP lounge
  if (c.vipLounge) {
    items.push({
      category: 'VIP lounge',
      quantity: c.days,
      unitCost: 3000,
      subtotal: c.days * 3000,
      status: 'Pending',
    });
  }

  return items;
}

function totalBudget(items: LineItem[]): number {
  return items.reduce((sum, i) => sum + i.subtotal, 0);
}

function floorSpace(c: Config): number {
  return Math.round(c.attendees * 1.5 + (c.vipLounge ? 200 : 0));
}

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function statusVariant(status: string) {
  switch (status) {
    case 'Confirmed': return 'success' as const;
    case 'Quote received': return 'info' as const;
    case 'Pending': return 'warning' as const;
    default: return 'neutral' as const;
  }
}

/* ── Discount codes ────────────────────────────────────────── */

const discountCodes = `# DevConf 2026 — Discount Codes
export EARLYBIRD="DEVCONF-EARLY-2026"   # 20% off until May 1
export SPEAKER="DEVCONF-SPEAKER-VIP"    # complimentary pass
export STUDENT="DEVCONF-EDU-50"         # 50% student discount
export GROUP10="DEVCONF-GROUP-10PLUS"   # 15% off for 10+ tickets`;

/* ── Dashboard Content (inside ToastProvider) ──────────────── */

function DashboardContent() {
  const [config, setConfig] = useState<Config>(defaultConfig);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  const update = <K extends keyof Config>(key: K, value: Config[K]) => {
    setConfig((prev) => ({ ...prev, [key]: value }));
  };

  const items = computeLineItems(config);
  const budget = totalBudget(items);
  const revenue = config.attendees * config.ticketPrice;
  const capacity = venueCapacity(config.venueSize);
  const fillPct = Math.round((config.attendees / capacity) * 100);
  const budgetPct = Math.min(Math.round((budget / Math.max(revenue, 1)) * 100), 100);
  const sqm = floorSpace(config);

  const overCapacity = fillPct > 90;
  const overBudget = budget > revenue;

  const handleSave = () => {
    setDrawerOpen(false);
    toast({ message: 'Configuration saved', description: 'All changes applied to the dashboard.', variant: 'success' });
  };

  const handleCopyCodes = () => {
    navigator.clipboard.writeText(discountCodes).catch(() => {});
    toast({ message: 'Codes copied to clipboard', variant: 'info' });
  };

  /* ── Table data ─────────────────────────────────────────── */

  const columns = [
    { key: 'category', label: 'Category' },
    { key: 'quantity', label: 'Quantity', mono: true },
    { key: 'unitCost', label: 'Unit Cost', mono: true },
    { key: 'subtotal', label: 'Subtotal', mono: true },
    { key: 'status', label: 'Status' },
  ];

  const rows = items.map((item) => ({
    category: item.category,
    quantity: item.quantity.toLocaleString(),
    unitCost: fmt(item.unitCost),
    subtotal: fmt(item.subtotal),
    status: { text: item.status, badge: item.status, badgeVariant: statusVariant(item.status) },
  }));

  /* ── Metric card helpers ────────────────────────────────── */

  function MetricWithPopover({
    label,
    value,
    change,
    trend,
    tooltipText,
    breakdownLines,
  }: {
    label: string;
    value: string;
    change: string;
    trend: 'up' | 'down' | 'flat';
    tooltipText: string;
    breakdownLines: string[];
  }) {
    const badgeVariant = trend === 'up' ? 'success' : trend === 'down' ? 'danger' : 'neutral';
    return (
      <Box padding="md" radius="md" elevation={1}>
        <Flex gap={2}>
          <Flex row align="center" justify="between">
            <Text size="sm" muted>{label}</Text>
            <Flex row gap={1} align="center">
              <Tooltip content={tooltipText}>
                <Icon size="sm" label={`${label} info`}>
                  <InfoIcon />
                </Icon>
              </Tooltip>
              <Popover anchor="bottom">
                <PopoverTrigger asChild>
                  <Button variant="ghost" size="sm" iconOnly aria-label={`${label} breakdown`}>
                    <Icon size="sm"><SettingsIcon /></Icon>
                  </Button>
                </PopoverTrigger>
                <PopoverContent>
                  <Flex gap={2}>
                    <Text as="strong" size="sm">{label} Breakdown</Text>
                    <Separator />
                    {breakdownLines.map((line) => (
                      <Text key={line} size="sm">{line}</Text>
                    ))}
                  </Flex>
                </PopoverContent>
              </Popover>
            </Flex>
          </Flex>
          <Heading level={3}>{value}</Heading>
          {change && (
            <Badge variant={badgeVariant} size="sm">{change}</Badge>
          )}
        </Flex>
      </Box>
    );
  }

  /* ── Render ─────────────────────────────────────────────── */

  return (
    <div className="examples-dashboard-layout">
      <Section background="default" padding="md" className="examples-dashboard-sidebar">
        <Wrapper size="full" padding="md">
          <Flex gap={4}>
            <Flex row align="center" gap={2}>
              <Icon size="lg" label="DevConf">
                <TerminalIcon />
              </Icon>
              <Text as="strong" size="lg">DevConf</Text>
            </Flex>
            <SideNav sections={sideNavSections} />
          </Flex>
        </Wrapper>
      </Section>

      <Section background="muted" className="examples-dashboard-main">
        <Flex gap={6}>
          <PageHeader
            title="Event Dashboard"
            description="Plan and track your DevConf 2026 logistics."
            breadcrumbs={[
              { label: 'Events', href: '#' },
              { label: 'DevConf 2026', href: '#' },
              { label: 'Dashboard' },
            ]}
            actions={
              <Button variant="primary" onClick={() => setDrawerOpen(true)}>
                <Flex row align="center" gap={1}>
                  <Icon size="sm"><SettingsIcon /></Icon>
                  Configure Event
                </Flex>
              </Button>
            }
          />

          {/* Conditional alerts */}
          {overCapacity && (
            <AlertBanner
              variant="warning"
              message={`Venue at ${fillPct}% capacity — ${config.attendees} attendees for a ${config.venueSize} venue (max ${capacity}).`}
              icon={<AlertTriangleIcon />}
              action={
                <Button variant="ghost" size="sm" onClick={() => setDrawerOpen(true)}>
                  Adjust
                </Button>
              }
            />
          )}
          {overBudget && (
            <AlertBanner
              variant="danger"
              message={`Budget (${fmt(budget)}) exceeds projected revenue (${fmt(revenue)}) by ${fmt(budget - revenue)}.`}
              icon={<AlertTriangleIcon />}
            />
          )}

          {/* Metrics */}
          {isLoading ? (
            <Grid columns={4} gap={4}>
              {Array.from({ length: 4 }).map((_, i) => (
                <Box key={i} padding="md" radius="md" elevation={1}>
                  <Flex gap={2}>
                    <Skeleton width="60%" height={16} />
                    <Skeleton width="40%" height={28} />
                    <Skeleton width="30%" height={16} />
                  </Flex>
                </Box>
              ))}
            </Grid>
          ) : (
            <Grid columns={4} gap={4}>
              <MetricWithPopover
                label="Projected Revenue"
                value={fmt(revenue)}
                change={revenue > 50000 ? '+strong' : 'moderate'}
                trend="up"
                tooltipText="Based on attendee count × ticket price"
                breakdownLines={[
                  `${config.attendees.toLocaleString()} attendees`,
                  `× ${fmt(config.ticketPrice)} per ticket`,
                  `= ${fmt(revenue)} total`,
                ]}
              />
              <MetricWithPopover
                label="Total Budget"
                value={fmt(budget)}
                change={overBudget ? 'over revenue' : 'within budget'}
                trend={overBudget ? 'down' : 'up'}
                tooltipText="Sum of all logistics line items"
                breakdownLines={items.map((i) => `${i.category}: ${fmt(i.subtotal)}`)}
              />
              <MetricWithPopover
                label="Attendees"
                value={`${config.attendees.toLocaleString()} / ${capacity.toLocaleString()}`}
                change={`${fillPct}% full`}
                trend={fillPct > 80 ? 'down' : 'up'}
                tooltipText="Current registrations vs venue capacity"
                breakdownLines={[
                  `Venue: ${config.venueSize}`,
                  `Capacity: ${capacity.toLocaleString()}`,
                  `Registered: ${config.attendees.toLocaleString()}`,
                  `Fill rate: ${fillPct}%`,
                ]}
              />
              <MetricWithPopover
                label="Floor Space"
                value={`${sqm.toLocaleString()} sqm`}
                change={config.vipLounge ? '+200 VIP' : 'standard'}
                trend="flat"
                tooltipText="Estimated floor space requirement"
                breakdownLines={[
                  `${config.attendees.toLocaleString()} × 1.5 sqm = ${(config.attendees * 1.5).toLocaleString()} sqm`,
                  ...(config.vipLounge ? ['+ 200 sqm VIP lounge'] : []),
                  `Total: ${sqm.toLocaleString()} sqm`,
                ]}
              />
            </Grid>
          )}

          {/* Progress bars */}
          <Grid columns={2} gap={4}>
            <Box padding="md" radius="md" elevation={1}>
              <Flex gap={2}>
                <Flex row align="center" justify="between">
                  <Text size="sm" muted>Venue Capacity</Text>
                  <Text size="sm" as="strong">{fillPct}%</Text>
                </Flex>
                <Progress value={fillPct} label="Venue capacity" />
              </Flex>
            </Box>
            <Box padding="md" radius="md" elevation={1}>
              <Flex gap={2}>
                <Flex row align="center" justify="between">
                  <Text size="sm" muted>Budget Usage</Text>
                  <Text size="sm" as="strong">{budgetPct}%</Text>
                </Flex>
                <Progress value={budgetPct} label="Budget usage" />
                {overBudget && (
                  <Alert variant="danger">
                    <Text size="sm">Budget exceeds revenue — consider reducing add-ons or increasing ticket price.</Text>
                  </Alert>
                )}
              </Flex>
            </Box>
          </Grid>

          {/* Data table */}
          {isLoading ? (
            <Box padding="md" radius="md" elevation={1}>
              <Flex gap={3}>
                <Skeleton width="30%" height={20} />
                <Separator />
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} width="100%" height={18} />
                ))}
              </Flex>
            </Box>
          ) : (
            <Box padding="md" radius="md" elevation={1}>
              <Flex gap={3}>
                <Heading level={3}>Logistics Breakdown</Heading>
                <Separator />
                <DataTableFull
                  columns={columns}
                  rows={rows}
                  caption="DevConf 2026 logistics cost breakdown"
                />
              </Flex>
            </Box>
          )}

          {/* Code block */}
          <Flex gap={2}>
            <Flex row align="center" justify="between">
              <Heading level={3}>Discount Codes</Heading>
              <Button variant="secondary" size="sm" onClick={handleCopyCodes}>
                <Flex row align="center" gap={1}>
                  <Icon size="sm"><CopyIcon /></Icon>
                  Copy Codes
                  <VisuallyHidden>to clipboard</VisuallyHidden>
                </Flex>
              </Button>
            </Flex>
            <CodeBlock code={discountCodes} language="bash" />
          </Flex>
        </Flex>
      </Section>

      {/* ── Drawer ──────────────────────────────────────────── */}
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)} anchor="right" size="lg" aria-label="Configure event">
        <Flex gap={6}>
          <Heading level={2}>Configure Event</Heading>
          <Separator />

          <FormSection title="Capacity" description="Set expected attendance and duration.">
            <Flex gap={3}>
              <Flex gap={1}>
                <Text size="sm" muted>Attendees: {config.attendees.toLocaleString()}</Text>
                <Slider label="Attendees" value={config.attendees} onChange={(v) => update('attendees', v)} min={50} max={2000} step={10} />
              </Flex>
              <Flex gap={1}>
                <Text size="sm" muted>Days: {config.days}</Text>
                <Slider label="Days" value={config.days} onChange={(v) => update('days', v)} min={1} max={5} />
              </Flex>
              <Flex gap={1}>
                <Text size="sm" muted>Ticket price: {fmt(config.ticketPrice)}</Text>
                <Slider label="Ticket price" value={config.ticketPrice} onChange={(v) => update('ticketPrice', v)} min={50} max={500} step={10} />
              </Flex>
            </Flex>
          </FormSection>

          <FormSection title="Ticket Type" description="Select the default registration tier.">
            <RadioGroup label="Ticket type" value={config.ticketType} onChange={(v) => update('ticketType', v)}>
              <Radio value="general" label="General Admission" description="Standard conference access" />
              <Radio value="vip" label="VIP" description="Priority seating + lounge access" />
              <Radio value="speaker" label="Speaker" description="Complimentary speaker pass" />
            </RadioGroup>
          </FormSection>

          <FormSection title="Venue & Catering" description="Choose venue size and food options.">
            <Select label="Venue size" options={venueSizeOptions} value={config.venueSize} onChange={(v) => update('venueSize', v)} />
            <Select label="Catering tier" options={cateringTierOptions} value={config.cateringTier} onChange={(v) => update('cateringTier', v)} />
            <Select label="Timezone" options={timezoneOptions} value={config.timezone} onChange={(v) => update('timezone', v)} />
          </FormSection>

          <FormSection title="Add-ons" description="Optional services to include.">
            <Checkbox label="Meal tickets" checked={config.mealTickets} onChange={(e) => update('mealTickets', e.target.checked)} />
            <Checkbox label="VIP lounge" checked={config.vipLounge} onChange={(e) => update('vipLounge', e.target.checked)} />
            <Checkbox label="Live streaming" checked={config.liveStreaming} onChange={(e) => update('liveStreaming', e.target.checked)} />
            <Checkbox label="Swag bags" checked={config.swagBags} onChange={(e) => update('swagBags', e.target.checked)} />
            <Checkbox label="Childcare" checked={config.childcare} onChange={(e) => update('childcare', e.target.checked)} />
          </FormSection>

          <FormSection title="Settings" description="Event visibility and notifications.">
            <Toggle label="Public event" checked={config.publicEvent} onChange={(v) => update('publicEvent', v)} />
            <Toggle label="Send notifications" checked={config.sendNotifications} onChange={(v) => update('sendNotifications', v)} />
          </FormSection>

          <FormSection title="Finance Notes" description="Optional notes for the finance team.">
            <Textarea
              label="Notes"
              hideLabel
              placeholder="Any notes for the finance team..."
              value={config.financeNotes}
              onChange={(e) => update('financeNotes', e.target.value)}
              rows={4}
            />
          </FormSection>

          <Flex row gap={2}>
            <Button variant="primary" onClick={handleSave}>Save Configuration</Button>
            <Button variant="secondary" onClick={() => setDrawerOpen(false)}>Cancel</Button>
          </Flex>
        </Flex>
      </Drawer>
    </div>
  );
}

/* ── Page ──────────────────────────────────────────────────── */

export default function DashboardPage() {
  return (
    <ToastProvider position="top-right">
      <ExampleControls>
        <BackToDocs />
        <CssDisclaimer lines={86} />
      </ExampleControls>
      <Page data-theme="devconf">
        <DashboardContent />
      </Page>
    </ToastProvider>
  );
}
