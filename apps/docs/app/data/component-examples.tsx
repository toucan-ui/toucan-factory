'use client';

import { useState } from 'react';
import {
  Button,
  Input,
  Textarea,
  Select,
  Checkbox,
  Toggle,
  RadioGroup,
  Radio,
  Text,
  Heading,
  Badge,
  Avatar,
  Separator,
  Box,
  Flex,
  Grid,
  GridItem,
  Section,
  Wrapper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableHeader,
  TableCell,
  Alert,
  Progress,
  Skeleton,
  Dialog,
  Tooltip,
  Popover,
  PopoverTrigger,
  PopoverContent,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuLabel,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabList,
  Tab,
  TabPanel,
  VisuallyHidden,
  Link,
  Icon,
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionPanel,
  Pagination,
  Slider,
  Drawer,
  FlexItem,
  Rating,
  ToastProvider,
  useToast,
} from '@toucan-ui/core';

interface ComponentExample {
  demo: React.ReactNode;
  code: string;
}

function DialogDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open dialog</Button>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Grid gap={3}>
          <Heading level={2}>Dialog Title</Heading>
          <Text>Dialog content goes here.</Text>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Grid>
      </Dialog>
    </>
  );
}

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setOpen(true)}>Open drawer</Button>
      <Drawer open={open} onClose={() => setOpen(false)} aria-label="Example drawer">
        <Grid gap={3}>
          <Heading level={2}>Drawer Title</Heading>
          <Text>Drawer content slides in from the edge.</Text>
          <Button onClick={() => setOpen(false)}>Close</Button>
        </Grid>
      </Drawer>
    </>
  );
}

function SliderDemo() {
  const [value, setValue] = useState(50);
  return (
    <Flex gap={4}>
      <Grid gap={3} className="docs-demo-constrain">
        <Text size="sm" muted>
          Value: {value}
        </Text>
        <Slider label="Volume" value={value} onChange={setValue} />
        <Slider label="Brightness" defaultValue={30} />
        <Slider label="Disabled" defaultValue={60} disabled />
      </Grid>
      <div style={{ height: '160px' }}>
        <Slider label="Vertical" defaultValue={40} orientation="vertical" />
      </div>
    </Flex>
  );
}

function PaginationDemo() {
  const [page, setPage] = useState(5);
  return (
    <Grid gap={3}>
      <Text size="sm" muted>
        Page {page} of 20
      </Text>
      <Pagination page={page} totalPages={20} onPageChange={setPage} />
    </Grid>
  );
}

function ToastDemo() {
  return (
    <ToastProvider position="top-right">
      <ToastDemoInner />
    </ToastProvider>
  );
}

function ToastDemoInner() {
  const { toast } = useToast();
  return (
    <Flex row wrap gap={3}>
      <Button variant="secondary" onClick={() => toast({ message: 'Info toast', variant: 'info' })}>
        Info
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ message: 'Saved successfully', variant: 'success' })}
      >
        Success
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ message: 'Check your input', variant: 'warning' })}
      >
        Warning
      </Button>
      <Button
        variant="secondary"
        onClick={() => toast({ message: 'Something went wrong', variant: 'danger' })}
      >
        Danger
      </Button>
    </Flex>
  );
}

export const COMPONENT_EXAMPLES: Record<string, ComponentExample> = {
  // --- Layout ---

  flex: {
    demo: (
      <Grid gap={6}>
        <Flex row wrap gap={3}>
          <Badge variant="info">React</Badge>
          <Badge variant="success">TypeScript</Badge>
          <Badge variant="warning">CSS</Badge>
          <Badge variant="danger">Accessibility</Badge>
          <Badge variant="neutral">Tokens</Badge>
        </Flex>
        <Flex row gap={4} align="center" justify="between">
          <Text as="span">Left content</Text>
          <Flex row gap={2}>
            <Button variant="secondary" size="sm">
              Cancel
            </Button>
            <Button variant="primary" size="sm">
              Save
            </Button>
          </Flex>
        </Flex>
        <Box padding="lg" radius="md" elevation={1}>
          <Flex row="md" gap={4}>
            <Avatar initials="JD" size="lg" variant="primary" />
            <Flex gap={3}>
              <Flex gap={1}>
                <Heading level={4}>Jane Doe</Heading>
                <Text size="sm" muted>
                  Product Engineer
                </Text>
              </Flex>
              <Flex row wrap gap={2}>
                <Badge variant="info" size="sm">
                  React
                </Badge>
                <Badge variant="success" size="sm">
                  TypeScript
                </Badge>
                <Badge variant="warning" size="sm">
                  Design Systems
                </Badge>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Grid>
    ),
    code: `{/* Inline badge list */}
<Flex row wrap gap={3}>
  <Badge variant="info">React</Badge>
  <Badge variant="success">TypeScript</Badge>
  <Badge variant="warning">CSS</Badge>
</Flex>

{/* Row with space-between */}
<Flex row gap={4} align="center" justify="between">
  <Text>Left content</Text>
  <Flex row gap={2}>
    <Button variant="secondary" size="sm">Cancel</Button>
    <Button variant="primary" size="sm">Save</Button>
  </Flex>
</Flex>

{/* Responsive card — stacked on mobile, row at md */}
{/* The outer Flex switches direction; inner Flex stays column */}
<Box padding="lg" radius="md" elevation={1}>
  <Flex row="md" gap={4}>
    <Avatar initials="JD" size="lg" variant="primary" />
    <Flex gap={3}>
      <Flex gap={1}>
        <Heading level={4}>Jane Doe</Heading>
        <Text size="sm" muted>Product Engineer</Text>
      </Flex>
      <Flex row wrap gap={2}>
        <Badge variant="info" size="sm">React</Badge>
        <Badge variant="success" size="sm">TypeScript</Badge>
        <Badge variant="warning" size="sm">Design Systems</Badge>
      </Flex>
    </Flex>
  </Flex>
</Box>`,
  },

  'flex-item': {
    demo: (
      <Flex row gap={3}>
        <FlexItem shrink={false}>
          <Box padding="md" radius="sm" elevation={0}>
            <Text as="span" size="sm">
              Fixed (no shrink)
            </Text>
          </Box>
        </FlexItem>
        <FlexItem grow>
          <Box padding="md" radius="sm" elevation={0}>
            <Text as="span" size="sm">
              Grows to fill space
            </Text>
          </Box>
        </FlexItem>
        <FlexItem>
          <Box padding="md" radius="sm" elevation={0}>
            <Text as="span" size="sm">
              Default
            </Text>
          </Box>
        </FlexItem>
      </Flex>
    ),
    code: `<Flex row gap={3}>
  <FlexItem shrink={false}>
    <Box padding="md">Fixed (no shrink)</Box>
  </FlexItem>
  <FlexItem grow>
    <Box padding="md">Grows to fill space</Box>
  </FlexItem>
  <FlexItem>
    <Box padding="md">Default</Box>
  </FlexItem>
</Flex>`,
  },

  grid: {
    demo: (
      <Grid gap={4}>
        <Grid columns={3} gap={3}>
          <div
            style={{
              background: 'var(--color-primary)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm" style={{ color: 'var(--color-on-primary)' }}>
              1
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-primary)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm" style={{ color: 'var(--color-on-primary)' }}>
              2
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-primary)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm" style={{ color: 'var(--color-on-primary)' }}>
              3
            </Text>
          </div>
        </Grid>
        <Grid columns="auto" gap={3} minItemSize="96px">
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-3)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              Auto 1
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-3)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              Auto 2
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-3)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              Auto 3
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-3)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              Auto 4
            </Text>
          </div>
        </Grid>
        <Grid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              Responsive 1
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              Responsive 2
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              Responsive 3
            </Text>
          </div>
        </Grid>
      </Grid>
    ),
    code: `{/* Fixed 3-column grid */}
<Grid columns={3} gap={3}>
  <div>1</div>
  <div>2</div>
  <div>3</div>
</Grid>

{/* Responsive auto-fit grid */}
<Grid columns="auto" gap={3} minItemSize="96px">
  <div>Auto 1</div>
  <div>Auto 2</div>
  <div>Auto 3</div>
  <div>Auto 4</div>
</Grid>

{/* Responsive columns: 1 col on mobile, 2 at md, 3 at lg */}
<Grid columns={{ base: 1, md: 2, lg: 3 }} gap={4}>
  <div>Responsive 1</div>
  <div>Responsive 2</div>
  <div>Responsive 3</div>
</Grid>`,
  },

  'grid-item': {
    demo: (
      <>
        <Grid columns={4} gap={3}>
          <GridItem span={2}>
            <div
              style={{
                background: 'var(--color-primary)',
                padding: 'var(--scale-4)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Text as="span" size="sm" style={{ color: 'var(--color-on-primary)' }}>
                Span 2
              </Text>
            </div>
          </GridItem>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              1 col
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              1 col
            </Text>
          </div>
          <div
            style={{
              background: 'var(--color-border-default)',
              padding: 'var(--scale-4)',
              borderRadius: 'var(--radius-sm)',
            }}
          >
            <Text as="span" size="sm">
              1 col
            </Text>
          </div>
          <GridItem span={3}>
            <div
              style={{
                background: 'var(--color-primary)',
                padding: 'var(--scale-4)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Text as="span" size="sm" style={{ color: 'var(--color-on-primary)' }}>
                Span 3
              </Text>
            </div>
          </GridItem>
          <GridItem span={{ base: 4, md: 2 }}>
            <div
              style={{
                background: 'var(--color-border-default)',
                padding: 'var(--scale-4)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Text as="span" size="sm">
                Full on mobile, half on md+
              </Text>
            </div>
          </GridItem>
          <GridItem span={{ base: 4, md: 2 }}>
            <div
              style={{
                background: 'var(--color-border-default)',
                padding: 'var(--scale-4)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Text as="span" size="sm">
                Full on mobile, half on md+
              </Text>
            </div>
          </GridItem>
        </Grid>
      </>
    ),
    code: `<Grid columns={4} gap={3}>
  <GridItem span={2}>
    <div>Spans 2 columns</div>
  </GridItem>
  <div>1 col</div>
  <div>1 col</div>
  <div>1 col</div>
  <GridItem span={3}>
    <div>Spans 3 columns</div>
  </GridItem>
  
  {/* Responsive span: full-width on mobile, half at md */}
   <GridItem span={{ base: 4, md: 2 }}>
    <div>Full on mobile, half on md+</div>
  </GridItem>
  <GridItem span={{ base: 4, md: 2 }}>
    <div>Full on mobile, half on md+</div>
  </GridItem>
</Grid>`,
  },

  page: {
    demo: (
      <Box padding="md" radius="md" elevation={1}>
        <Text as="span" size="sm">
          Page provides min-height: 100vh with themed background and text colour. Typically the
          outermost wrapper in your app.
        </Text>
      </Box>
    ),
    code: `<Page>
  <NavBar ... />
  <main>
    <Section padding="lg">
      <Wrapper size="lg">
        <Heading level={1}>Welcome</Heading>
        <Text>Your page content here.</Text>
      </Wrapper>
    </Section>
  </main>
  <Footer ... />
</Page>`,
  },

  section: {
    demo: (
      <Grid gap={0}>
        <Section background="default" padding="md">
          <Text as="span" size="sm">
            Section — default background, medium padding
          </Text>
        </Section>
        <Section background="muted" padding="lg">
          <Text as="span" size="sm">
            Section — muted background, large padding
          </Text>
        </Section>
        <Section background="default" padding="sm">
          <Text as="span" size="sm">
            Section — default background, small padding
          </Text>
        </Section>
      </Grid>
    ),
    code: `<Section background="default" padding="md">
  <Wrapper size="lg">
    <Heading level={2}>Page section</Heading>
    <Text>Content centered within the section.</Text>
  </Wrapper>
</Section>

<Section background="muted" padding="lg">
  <Wrapper size="lg">
    <Text>Full-bleed muted band with centered content.</Text>
  </Wrapper>
</Section>`,
  },

  wrapper: {
    demo: (
      <Grid gap={3}>
        <div style={{ background: 'var(--color-surface-muted)' }}>
          <Wrapper size="xs">
            <div
              style={{
                background: 'var(--color-primary)',
                padding: 'var(--scale-3)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Text as="span" size="sm" style={{ color: 'var(--color-on-primary)' }}>
                xs — 480px
              </Text>
            </div>
          </Wrapper>
        </div>
        <div style={{ background: 'var(--color-surface-muted)' }}>
          <Wrapper size="sm">
            <div
              style={{
                background: 'var(--color-primary)',
                padding: 'var(--scale-3)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Text as="span" size="sm" style={{ color: 'var(--color-on-primary)' }}>
                sm — 560px
              </Text>
            </div>
          </Wrapper>
        </div>
        <div style={{ background: 'var(--color-surface-muted)' }}>
          <Wrapper size="md">
            <div
              style={{
                background: 'var(--color-primary)',
                padding: 'var(--scale-3)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              <Text as="span" size="sm" style={{ color: 'var(--color-on-primary)' }}>
                md — 768px
              </Text>
            </div>
          </Wrapper>
        </div>
      </Grid>
    ),
    code: `{/* Wrapper sizes constrain content width and center it */}
<Wrapper size="xs">
  <div>xs — 480px max-width</div>
</Wrapper>

<Wrapper size="sm">
  <div>sm — 560px max-width</div>
</Wrapper>

<Wrapper size="md">
  <div>md — 768px max-width</div>
</Wrapper>

{/* Padding tiers control horizontal breathing room */}
<Wrapper size="lg" padding="sm">Tight padding</Wrapper>
<Wrapper size="lg" padding="xl">Generous padding</Wrapper>
<Wrapper size="lg" padding="none">No padding</Wrapper>`,
  },

  // --- Form Controls ---

  button: {
    demo: (
      <Flex row wrap gap={3}>
        <Button variant="primary">Primary</Button>
        <Button variant="secondary">Secondary</Button>
        <Button variant="ghost">Ghost</Button>
        <Button size="sm">Small</Button>
        <Button loading>Loading</Button>
      </Flex>
    ),
    code: `<Button variant="primary">Primary</Button>
<Button variant="secondary">Secondary</Button>
<Button variant="ghost">Ghost</Button>
<Button size="sm">Small</Button>
<Button loading>Loading</Button>`,
  },

  checkbox: {
    demo: (
      <Grid gap={3}>
        <Checkbox label="Accept terms and conditions" />
        <Checkbox label="Subscribe to newsletter" description="We send updates monthly" />
        <Checkbox label="Select all" indeterminate />
      </Grid>
    ),
    code: `<Checkbox label="Accept terms and conditions" />
<Checkbox label="Subscribe to newsletter" description="We send updates monthly" />
<Checkbox label="Select all" indeterminate />`,
  },

  input: {
    demo: (
      <Grid gap={3} className="docs-demo-constrain">
        <Input label="Email" placeholder="you@example.com" />
        <Input label="Password" type="password" description="At least 8 characters" />
        <Input label="Username" error="Username is already taken" />
      </Grid>
    ),
    code: `<Input label="Email" placeholder="you@example.com" />
<Input label="Password" type="password" description="At least 8 characters" />
<Input label="Username" error="Username is already taken" />`,
  },

  radio: {
    demo: (
      <RadioGroup label="Plan" defaultValue="pro">
        <Radio value="free" label="Free" description="Basic features" />
        <Radio value="pro" label="Pro" description="Advanced features" />
        <Radio value="enterprise" label="Enterprise" description="Custom solutions" />
      </RadioGroup>
    ),
    code: `<RadioGroup label="Plan" defaultValue="pro">
  <Radio value="free" label="Free" description="Basic features" />
  <Radio value="pro" label="Pro" description="Advanced features" />
  <Radio value="enterprise" label="Enterprise" description="Custom solutions" />
</RadioGroup>`,
  },

  select: {
    demo: (
      <Grid gap={3} className="docs-demo-constrain">
        <Select
          label="Country"
          options={[
            { value: 'us', label: 'United States' },
            { value: 'uk', label: 'United Kingdom' },
            { value: 'ca', label: 'Canada' },
          ]}
        />
      </Grid>
    ),
    code: `<Select
  label="Country"
  options={[
    { value: 'us', label: 'United States' },
    { value: 'uk', label: 'United Kingdom' },
    { value: 'ca', label: 'Canada' },
  ]}
/>`,
  },

  textarea: {
    demo: (
      <Grid gap={3} className="docs-demo-constrain">
        <Textarea label="Message" placeholder="Type your message..." />
        <Textarea label="Notes" description="Optional field" resize="both" />
      </Grid>
    ),
    code: `<Textarea label="Message" placeholder="Type your message..." />
<Textarea label="Notes" description="Optional field" resize="both" />`,
  },

  toggle: {
    demo: (
      <Grid gap={3}>
        <Toggle label="Dark mode" />
        <Toggle label="Notifications" description="Receive push notifications" />
        <Toggle label="Compact" size="sm" />
      </Grid>
    ),
    code: `<Toggle label="Dark mode" />
<Toggle label="Notifications" description="Receive push notifications" />
<Toggle label="Compact" size="sm" />`,
  },

  // --- Data Display ---

  avatar: {
    demo: (
      <Flex row wrap gap={3}>
        <Avatar initials="JD" size="sm" />
        <Avatar initials="AB" size="md" variant="primary" />
        <Avatar initials="XY" size="lg" variant="neutral" />
      </Flex>
    ),
    code: `<Avatar initials="JD" size="sm" />
<Avatar initials="AB" size="md" variant="primary" />
<Avatar initials="XY" size="lg" />`,
  },

  badge: {
    demo: (
      <Flex row wrap gap={3}>
        <Badge variant="neutral">Neutral</Badge>
        <Badge variant="info">Info</Badge>
        <Badge variant="success">Success</Badge>
        <Badge variant="warning">Warning</Badge>
        <Badge variant="danger">Danger</Badge>
        <Badge surface="var(--color-purple-100)" onSurface="var(--color-purple-900)">
          Custom
        </Badge>
      </Flex>
    ),
    code: `<Badge variant="neutral">Neutral</Badge>
<Badge variant="info">Info</Badge>
<Badge variant="success">Success</Badge>
<Badge variant="warning">Warning</Badge>
<Badge variant="danger">Danger</Badge>
<Badge surface="var(--color-purple-100)" onSurface="var(--color-purple-900)">Custom</Badge>`,
  },

  box: {
    demo: (
      <Grid columns="auto" gap={3} minItemSize="128px">
        <Box elevation={0} padding="md" radius="sm">
          <Text as="span" size="sm">
            Elevation 0
          </Text>
        </Box>
        <Box elevation={1} padding="md" radius="md">
          <Text as="span" size="sm">
            Elevation 1
          </Text>
        </Box>
        <Box elevation={2} padding="md" radius="md">
          <Text as="span" size="sm">
            Elevation 2
          </Text>
        </Box>
        <Box elevation={3} padding="lg" radius="lg">
          <Text as="span" size="sm">
            Elevation 3
          </Text>
        </Box>
      </Grid>
    ),
    code: `<Box elevation={0} padding="md" radius="sm">
  <Text>Elevation 0</Text>
</Box>
<Box elevation={1} padding="md" radius="md">
  <Text>Elevation 1</Text>
</Box>
<Box elevation={2} padding="md" radius="md">
  <Text>Elevation 2</Text>
</Box>
<Box elevation={3} padding="lg" radius="lg">
  <Text>Elevation 3</Text>
</Box>`,
  },

  rating: {
    demo: (
      <Flex row wrap gap={3} align="center">
        <Rating value={4} />
        <Rating value={3.5} size="lg" />
        <Rating value={2} size="sm" />
      </Flex>
    ),
    code: `<Rating value={4} />
<Rating value={3.5} size="lg" />
<Rating value={2} size="sm" />
<Rating value={4.5} max={5} label="Product rating" />`,
  },

  heading: {
    demo: (
      <Grid gap={3}>
        <Heading level={1} display="lg">
          Display Large
        </Heading>
        <Heading level={2}>Heading 2</Heading>
        <Heading level={3}>Heading 3</Heading>
        <Heading level={4}>Heading 4</Heading>
      </Grid>
    ),
    code: `<Heading level={1} display="lg">Display Large</Heading>
<Heading level={2}>Heading 2</Heading>
<Heading level={3}>Heading 3</Heading>
<Heading level={4}>Heading 4</Heading>`,
  },

  separator: {
    demo: (
      <Grid gap={3}>
        <Text>Content above</Text>
        <Separator />
        <Text>Content below</Text>
      </Grid>
    ),
    code: `<Text>Content above</Text>
<Separator />
<Text>Content below</Text>`,
  },

  table: {
    demo: (
      <Table striped>
        <TableHead>
          <TableRow>
            <TableHeader>Name</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Status</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Alice Johnson</TableCell>
            <TableCell>Engineer</TableCell>
            <TableCell>
              <Badge variant="success">Active</Badge>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Bob Smith</TableCell>
            <TableCell>Designer</TableCell>
            <TableCell>
              <Badge variant="warning">Away</Badge>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    ),
    code: `<Table striped>
  <TableHead>
    <TableRow>
      <TableHeader>Name</TableHeader>
      <TableHeader>Role</TableHeader>
      <TableHeader>Status</TableHeader>
    </TableRow>
  </TableHead>
  <TableBody>
    <TableRow>
      <TableCell>Alice Johnson</TableCell>
      <TableCell>Engineer</TableCell>
      <TableCell><Badge variant="success">Active</Badge></TableCell>
    </TableRow>
  </TableBody>
</Table>`,
  },

  text: {
    demo: (
      <Grid gap={3}>
        <Text size="lg">Large body text for emphasis.</Text>
        <Text>Default body text for content paragraphs.</Text>
        <Text size="sm" muted>
          Small muted text for captions and metadata.
        </Text>
      </Grid>
    ),
    code: `<Text size="lg">Large body text for emphasis.</Text>
<Text>Default body text for content paragraphs.</Text>
<Text size="sm" muted>Small muted text for captions and metadata.</Text>`,
  },

  // --- Feedback ---

  alert: {
    demo: (
      <Grid gap={3}>
        <Alert variant="info">This is an informational message.</Alert>
        <Alert variant="success">
          <Grid gap={1}>
            <Heading level={4}>Success</Heading>
            <Text size="sm">Your changes have been saved.</Text>
          </Grid>
        </Alert>
        <Alert variant="warning">Please review before continuing.</Alert>
        <Alert variant="danger">Something went wrong.</Alert>
        <Alert surface="hotpink" onSurface="white" border="deeppink">
          Alert with custom colors via surface props.
        </Alert>
      </Grid>
    ),
    code: `{/* Simple text */}
<Alert variant="info">This is an informational message.</Alert>

{/* Compose layout with atoms */}
<Alert variant="success">
  <Grid gap={1}>
    <Heading level={4}>Success</Heading>
    <Text size="sm">Your changes have been saved.</Text>
  </Grid>
</Alert>

<Alert variant="warning">Please review before continuing.</Alert>
<Alert variant="danger">Something went wrong.</Alert>

{/* Custom colors */}
<Alert surface="hotpink" onSurface="white" border="deeppink">
  Alert with custom colors via surface props.
</Alert>`,
  },

  progress: {
    demo: (
      <Grid gap={3} className="docs-demo-constrain">
        <Progress value={25} label="Upload progress" size="sm" />
        <Progress value={60} label="Download progress" />
        <Progress label="Processing" size="lg" />
      </Grid>
    ),
    code: `<Progress value={25} label="Upload progress" size="sm" />
<Progress value={60} label="Download progress" />
<Progress label="Processing" size="lg" /> {/* indeterminate */}`,
  },

  skeleton: {
    demo: (
      <Grid gap={3} className="docs-demo-constrain">
        <Skeleton variant="rectangular" width="100%" height={24} />
        <Skeleton variant="text" />
        <Skeleton variant="text" />
        <Grid columns="auto" gap={3}>
          <Skeleton variant="circular" width={40} height={40} />
          <Skeleton variant="rectangular" width={200} height={40} />
        </Grid>
      </Grid>
    ),
    code: `<Skeleton variant="rectangular" width="100%" height={24} />
<Skeleton variant="text" />
<Skeleton variant="circular" width={40} height={40} />
<Skeleton variant="rectangular" width={200} height={40} />`,
  },

  // --- Overlay ---

  dialog: {
    demo: <DialogDemo />,
    code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open dialog</Button>
<Dialog open={open} onClose={() => setOpen(false)}>
  <Heading level={2}>Dialog Title</Heading>
  <Text>Dialog content goes here.</Text>
  <Button onClick={() => setOpen(false)}>Close</Button>
</Dialog>`,
  },

  'dropdown-menu': {
    demo: (
      <Grid columns={2} gap={4}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" iconOnly aria-label="More options">
              <Icon size="sm">
                <svg viewBox="0 0 16 16" fill="currentColor">
                  <circle cx="8" cy="3" r="1.5" />
                  <circle cx="8" cy="8" r="1.5" />
                  <circle cx="8" cy="13" r="1.5" />
                </svg>
              </Icon>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary">Actions</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Options</DropdownMenuLabel>
            <DropdownMenuItem>Edit</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </Grid>
    ),
    code: `{/* Icon-only ghost trigger */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" iconOnly aria-label="More options">
      <Icon size="sm"><KebabIcon /></Icon>
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Duplicate</DropdownMenuItem>
    <DropdownMenuSeparator />
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>

{/* Secondary button trigger */}
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="secondary">Actions</Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem>Edit</DropdownMenuItem>
    <DropdownMenuItem>Delete</DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>`,
  },

  popover: {
    demo: (
      <Popover>
        <PopoverTrigger asChild>
          <Button variant="secondary">Open popover</Button>
        </PopoverTrigger>
        <PopoverContent maxWidth="var(--layout-80)">
          <div className="docs-demo-padded">
            <Text>Popover content can contain any elements.</Text>
          </div>
        </PopoverContent>
      </Popover>
    ),
    code: `<Popover>
  <PopoverTrigger asChild>
    <Button variant="secondary">Open popover</Button>
  </PopoverTrigger>
  <PopoverContent maxWidth="var(--layout-80)">
    <Text>Popover content can contain any elements.</Text>
  </PopoverContent>
</Popover>`,
  },

  tooltip: {
    demo: (
      <Flex row wrap gap={3}>
        <Tooltip content="Top tooltip" anchor="top">
          <Button variant="secondary">Hover me (top)</Button>
        </Tooltip>
        <Tooltip
          content={
            <>
              <Heading level={4}>Rich tooltip</Heading>
              <Text size="sm">Tooltips support structured content.</Text>
            </>
          }
          anchor="bottom"
          maxWidth="256px"
        >
          <Button variant="secondary">Hover me (bottom)</Button>
        </Tooltip>
      </Flex>
    ),
    code: `{/* Simple text */}
<Tooltip content="Top tooltip" anchor="top">
  <Button variant="secondary">Hover me (top)</Button>
</Tooltip>

{/* Rich content with custom max-width */}
<Tooltip
  content={<><Heading level={4}>Rich tooltip</Heading><Text size="sm">Tooltips support structured content.</Text></>}
  anchor="bottom"
  maxWidth="256px"
>
  <Button variant="secondary">Hover me (bottom)</Button>
</Tooltip>`,
  },

  // --- Navigation ---

  breadcrumb: {
    demo: (
      <Breadcrumb>
        <BreadcrumbItem>
          <Link href="/" variant="inline">
            Home
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem>
          <Link href="/components" variant="inline">
            Components
          </Link>
        </BreadcrumbItem>
        <BreadcrumbItem isCurrent>Breadcrumb</BreadcrumbItem>
      </Breadcrumb>
    ),
    code: `<Breadcrumb>
  <BreadcrumbItem><Link href="/">Home</Link></BreadcrumbItem>
  <BreadcrumbItem><Link href="/components">Components</Link></BreadcrumbItem>
  <BreadcrumbItem isCurrent>Breadcrumb</BreadcrumbItem>
</Breadcrumb>`,
  },

  link: {
    demo: (
      <Grid gap={3}>
        <Link href="#" variant="inline">
          Inline link with underline
        </Link>
        <Link href="#" variant="standalone">
          Standalone link
        </Link>
        <Link href="https://example.com" external>
          External link
        </Link>
      </Grid>
    ),
    code: `<Link href="/docs" variant="inline">Inline link</Link>
<Link href="/components" variant="standalone">Standalone link</Link>
<Link href="https://example.com" external>External link</Link>`,
  },

  tabs: {
    demo: (
      <Tabs defaultValue="tab1">
        <TabList>
          <Tab value="tab1">Overview</Tab>
          <Tab value="tab2">Features</Tab>
          <Tab value="tab3">Pricing</Tab>
        </TabList>
        <TabPanel value="tab1">
          <Text>Overview content here.</Text>
        </TabPanel>
        <TabPanel value="tab2">
          <Text>Features content here.</Text>
        </TabPanel>
        <TabPanel value="tab3">
          <Text>Pricing content here.</Text>
        </TabPanel>
      </Tabs>
    ),
    code: `<Tabs defaultValue="tab1">
  <TabList>
    <Tab value="tab1">Overview</Tab>
    <Tab value="tab2">Features</Tab>
    <Tab value="tab3">Pricing</Tab>
  </TabList>
  <TabPanel value="tab1"><Text>Overview content here.</Text></TabPanel>
  <TabPanel value="tab2"><Text>Features content here.</Text></TabPanel>
  <TabPanel value="tab3"><Text>Pricing content here.</Text></TabPanel>
</Tabs>`,
  },

  // --- Utility ---

  icon: {
    demo: (
      <Flex row wrap gap={3}>
        <Icon size="sm">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M8 5.5v5M5.5 8h5" />
          </svg>
        </Icon>
        <Icon size="md">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M8 5.5v5M5.5 8h5" />
          </svg>
        </Icon>
        <Icon size="lg">
          <svg
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
          >
            <circle cx="8" cy="8" r="6" />
            <path d="M8 5.5v5M5.5 8h5" />
          </svg>
        </Icon>
      </Flex>
    ),
    code: `<Icon size="sm"><PlusIcon /></Icon>
<Icon size="md"><PlusIcon /></Icon>
<Icon size="lg"><PlusIcon /></Icon>
<Icon label="Add item"><PlusIcon /></Icon>`,
  },

  'visually-hidden': {
    demo: (
      <Grid gap={3}>
        <Text size="sm" muted>
          VisuallyHidden content is not visible but remains accessible to screen readers.
        </Text>
        <Button iconOnly aria-label="Close">
          <VisuallyHidden>Close dialog</VisuallyHidden>✕
        </Button>
      </Grid>
    ),
    code: `<Button iconOnly>
  <VisuallyHidden>Close dialog</VisuallyHidden>
  ✕
</Button>`,
  },

  // --- New Components ---

  accordion: {
    demo: (
      <Grid gap={3} className="docs-demo-constrain">
        <Accordion defaultValue="features">
          <AccordionItem value="features">
            <AccordionTrigger>Features</AccordionTrigger>
            <AccordionPanel>
              <Text size="sm">
                Token-driven design system with accessible primitives, compound components, and
                theme support.
              </Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="installation">
            <AccordionTrigger>Installation</AccordionTrigger>
            <AccordionPanel>
              <Text size="sm">Install with pnpm: pnpm add @toucan-ui/core @toucan-ui/tokens</Text>
            </AccordionPanel>
          </AccordionItem>
          <AccordionItem value="usage">
            <AccordionTrigger>Usage</AccordionTrigger>
            <AccordionPanel>
              <Text size="sm">
                Import components from @toucan-ui/core and tokens CSS from @toucan-ui/tokens/css.
              </Text>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Grid>
    ),
    code: `<Accordion defaultValue="features">
  <AccordionItem value="features">
    <AccordionTrigger>Features</AccordionTrigger>
    <AccordionPanel>
      <Text>Token-driven design system...</Text>
    </AccordionPanel>
  </AccordionItem>
  <AccordionItem value="installation">
    <AccordionTrigger>Installation</AccordionTrigger>
    <AccordionPanel>
      <Text>Install with pnpm...</Text>
    </AccordionPanel>
  </AccordionItem>
</Accordion>`,
  },

  pagination: {
    demo: <PaginationDemo />,
    code: `const [page, setPage] = useState(5);

<Pagination page={page} totalPages={20} onPageChange={setPage} />`,
  },

  slider: {
    demo: <SliderDemo />,
    code: `const [value, setValue] = useState(50);

<Slider label="Volume" value={value} onChange={setValue} />
<Slider label="Brightness" defaultValue={30} />
<Slider label="Disabled" defaultValue={60} disabled />

{/* Vertical — container must have a defined height */}
<Slider label="Vertical" defaultValue={40} orientation="vertical" />`,
  },

  drawer: {
    demo: <DrawerDemo />,
    code: `const [open, setOpen] = useState(false);

<Button onClick={() => setOpen(true)}>Open drawer</Button>
<Drawer open={open} onClose={() => setOpen(false)} aria-label="Example drawer">
  <Heading level={2}>Drawer Title</Heading>
  <Text>Drawer content slides in from the edge.</Text>
  <Button onClick={() => setOpen(false)}>Close</Button>
</Drawer>`,
  },

  toast: {
    demo: <ToastDemo />,
    code: `// Wrap your app in ToastProvider
<ToastProvider position="top-right">
  <App />
</ToastProvider>

// Use the hook anywhere inside
function App() {
  const { toast } = useToast();
  return (
    <Button onClick={() => toast({ message: 'Saved!', variant: 'success' })}>
      Show toast
    </Button>
  );
}`,
  },
};
