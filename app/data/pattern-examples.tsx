'use client';

import { Toggle, Input, Button, Text, Badge, Grid, Link } from '@toucan-ui/core';
import { STAT_TOKEN_COUNT, STAT_COMPONENT_COUNT, STAT_TEST_COUNT } from '@/data/project-stats';
import {
  HeroSplit,
  HeroCentered,
  HeroFull,
  MetricCard,
  FeatureCard,
  PricingCard,
  TestimonialCard,
  ProfileCard,
  ContactCard,
  AuthCard,
  DataTableFull,
  DataTableRow,
  FieldRow,
  StatsRow,
  ComparisonTable,
  NavBar,
  SideNav,
  PageHeader,
  SearchBar,
  AlertBanner,
  NotificationItem,
  CommentThread,
  ActivityItem,
  TimelineGroup,
  SectionHeader,
  CodeBlock,
  SettingsRow,
  Footer,
  FormField,
  Form,
  FormSection,
  EmptyState,
  ErrorState,
  LoadingState,
  Carousel,
  CarouselSlide,
} from '../_shared/patterns';

interface PatternExample {
  demo: React.ReactNode;
  code: string;
}

export const PATTERN_EXAMPLES: Record<string, PatternExample> = {
  'hero-split': {
    demo: (
      <HeroSplit
        title="Build better products"
        subtitle="A design system that scales with your team."
        ctaLabel="Get started"
      />
    ),
    code: `<HeroSplit
  title="Build better products"
  subtitle="A design system that scales with your team."
  ctaLabel="Get started"
/>`,
  },

  'hero-centered': {
    demo: (
      <HeroCentered
        title="Design at scale"
        subtitle="Consistent, accessible, and beautiful."
        ctaLabel="Learn more"
      />
    ),
    code: `<HeroCentered
  title="Design at scale"
  subtitle="Consistent, accessible, and beautiful."
  ctaLabel="Learn more"
/>`,
  },

  'hero-full': {
    demo: (
      <HeroFull
        title="Welcome to the future"
        subtitle="Where design meets engineering."
        ctaLabel="Explore"
      />
    ),
    code: `<HeroFull
  title="Welcome to the future"
  subtitle="Where design meets engineering."
  ctaLabel="Explore"
/>`,
  },

  'metric-card': {
    demo: (
      <Grid columns="auto" gap={3}>
        <MetricCard label="Revenue" value="$12,450" change="+12%" trend="up" />
        <MetricCard label="Users" value="1,234" change="-3%" trend="down" />
      </Grid>
    ),
    code: `<MetricCard label="Revenue" value="$12,450" change="+12%" trend="up" />
<MetricCard label="Users" value="1,234" change="-3%" trend="down" />`,
  },

  'feature-card': {
    demo: (
      <Grid columns="auto" gap={3}>
        <FeatureCard
          title="Token-driven"
          description="Every visual value comes from a token reference."
          icon={<Badge variant="info">T</Badge>}
        />
        <FeatureCard
          title="Accessible"
          description="WCAG AA compliant out of the box."
          icon={<Badge variant="success">A</Badge>}
        />
      </Grid>
    ),
    code: `<FeatureCard
  title="Token-driven"
  description="Every visual value comes from a token reference."
  icon={<Badge variant="primary">T</Badge>}
/>`,
  },

  'pricing-card': {
    demo: (
      <Grid columns="auto" gap={3}>
        <PricingCard
          tier="Starter"
          price="$0"
          period="/month"
          features={['5 projects', 'Basic support']}
          ctaLabel="Get started"
        />
        <PricingCard
          tier="Pro"
          price="$29"
          period="/month"
          features={['Unlimited projects', 'Priority support', 'Advanced analytics']}
          ctaLabel="Upgrade"
          highlighted
        />
      </Grid>
    ),
    code: `<PricingCard
  tier="Pro"
  price="$29"
  period="/month"
  features={['Unlimited projects', 'Priority support']}
  ctaLabel="Upgrade"
  highlighted
/>`,
  },

  'testimonial-card': {
    demo: (
      <TestimonialCard
        quote="The token system is elegant. Theming just works."
        name="Jane Doe"
        role="Lead Designer"
        initials="JD"
      />
    ),
    code: `<TestimonialCard
  quote="The token system is elegant. Theming just works."
  name="Jane Doe"
  role="Lead Designer"
  initials="JD"
/>`,
  },

  'profile-card': {
    demo: (
      <ProfileCard
        name="Alex Chen"
        title="Software Engineer"
        bio="Building design systems that scale."
        initials="AC"
        primaryAction="Message"
        secondaryAction="Follow"
      />
    ),
    code: `<ProfileCard
  name="Alex Chen"
  title="Software Engineer"
  bio="Building design systems that scale."
  initials="AC"
  primaryAction="Message"
  secondaryAction="Follow"
/>`,
  },

  'contact-card': {
    demo: (
      <ContactCard
        name="Sarah Miller"
        title="Product Manager"
        initials="SM"
        status="Active"
        statusVariant="success"
        email="sarah@example.com"
      />
    ),
    code: `<ContactCard
  name="Sarah Miller"
  title="Product Manager"
  initials="SM"
  status="Active"
  statusVariant="success"
  email="sarah@example.com"
/>`,
  },

  'auth-card': {
    demo: (
      <AuthCard
        title="Sign in"
        description="Enter your credentials to continue."
        fields={[
          { label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
          { label: 'Password', type: 'password', required: true },
        ]}
        submitLabel="Sign in"
      />
    ),
    code: `<AuthCard
  title="Sign in"
  description="Enter your credentials to continue."
  fields={[
    { label: 'Email', type: 'email', placeholder: 'you@example.com', required: true },
    { label: 'Password', type: 'password', required: true },
  ]}
  submitLabel="Sign in"
/>`,
  },

  'data-table-full': {
    demo: (
      <DataTableFull
        columns={[
          { key: 'name', label: 'Name' },
          { key: 'role', label: 'Role' },
          { key: 'status', label: 'Status' },
        ]}
        rows={[
          { name: 'Alice', role: 'Engineer', status: { text: 'Engineer', badge: 'Active', badgeVariant: 'success' } },
          { name: 'Bob', role: 'Designer', status: { text: 'Designer', badge: 'Away', badgeVariant: 'warning' } },
        ]}
      />
    ),
    code: `<DataTableFull
  columns={[
    { key: 'name', label: 'Name' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ]}
  rows={[
    { name: 'Alice', role: 'Engineer', status: { text: 'Active', variant: 'success' } },
    { name: 'Bob', role: 'Designer', status: { text: 'Away', variant: 'warning' } },
  ]}
/>`,
  },

  'data-table-row': {
    demo: (
      <Grid gap={3}>
        <DataTableRow label="Order ID" value="#12345" mono />
        <DataTableRow label="Status" value="Processing" status="In Progress" statusVariant="warning" />
      </Grid>
    ),
    code: `<DataTableRow label="Order ID" value="#12345" mono />
<DataTableRow label="Status" value="Processing" status="In Progress" statusVariant="warning" />`,
  },

  'field-row': {
    demo: (
      <Grid gap={3}>
        <FieldRow label="Name" value="Design System Factory" />
        <FieldRow label="Version" value="1.0.0" mono />
        <FieldRow label="License" value="MIT" />
      </Grid>
    ),
    code: `<FieldRow label="Name" value="Design System Factory" />
<FieldRow label="Version" value="1.0.0" mono />
<FieldRow label="License" value="MIT" />`,
  },

  'stats-row': {
    demo: (
      <StatsRow
        stats={[
          { label: 'Tokens', value: String(STAT_TOKEN_COUNT) },
          { label: 'Components', value: String(STAT_COMPONENT_COUNT) },
          { label: 'Tests', value: STAT_TEST_COUNT.toLocaleString() },
        ]}
      />
    ),
    code: `<StatsRow
  stats={[
    { label: 'Tokens', value: '756' },
    { label: 'Components', value: '36' },
    { label: 'Tests', value: '1,035' },
  ]}
/>`,
  },

  'comparison-table': {
    demo: (
      <ComparisonTable
        products={['Free', 'Pro', 'Enterprise']}
        features={[
          { feature: 'Projects', values: { Free: '5', Pro: 'Unlimited', Enterprise: 'Unlimited' } },
          { feature: 'Support', values: { Free: 'Community', Pro: 'Priority', Enterprise: 'Dedicated' } },
        ]}
        highlightedProduct="Pro"
      />
    ),
    code: `<ComparisonTable
  products={['Free', 'Pro', 'Enterprise']}
  features={[
    { feature: 'Projects', values: { Free: '5', Pro: 'Unlimited', Enterprise: 'Unlimited' } },
    { feature: 'Support', values: { Free: 'Community', Pro: { text: 'Priority', variant: 'primary' }, Enterprise: { text: 'Dedicated', variant: 'success' } } },
  ]}
  highlightedProduct="Pro"
/>`,
  },

  'nav-bar': {
    demo: (
      <NavBar
        logo={<Text as="strong" size="lg">Brand</Text>}
        links={
          <>
            <Link href="#" variant="standalone" size="sm">Home</Link>
            <Link href="#" variant="standalone" size="sm">About</Link>
            <Link href="#" variant="standalone" size="sm">Contact</Link>
          </>
        }
        actions={<Button variant="ghost" size="sm">Sign in</Button>}
      />
    ),
    code: `<NavBar
  logo={<Text as="strong" size="lg">Brand</Text>}
  links={<><a href="#">Home</a><a href="#">About</a></>}
  actions={<Button variant="ghost" size="sm">Sign in</Button>}
/>`,
  },

  'side-nav': {
    demo: (
      <SideNav
        sections={[
          {
            heading: 'Getting Started',
            items: [
              { label: 'Installation', href: '#', active: true },
              { label: 'Quick Start', href: '#' },
            ],
          },
          {
            heading: 'Components',
            items: [
              { label: 'Button', href: '#' },
              { label: 'Input', href: '#' },
            ],
          },
        ]}
      />
    ),
    code: `<SideNav
  sections={[
    {
      heading: 'Getting Started',
      items: [
        { label: 'Installation', href: '#', active: true },
        { label: 'Quick Start', href: '#' },
      ],
    },
  ]}
/>`,
  },

  'page-header': {
    demo: (
      <PageHeader
        title="Dashboard"
        description="Overview of your project metrics."
        breadcrumbs={[
          { label: 'Home', href: '#' },
          { label: 'Dashboard' },
        ]}
      />
    ),
    code: `<PageHeader
  title="Dashboard"
  description="Overview of your project metrics."
  breadcrumbs={[
    { label: 'Home', href: '#' },
    { label: 'Dashboard' },
  ]}
/>`,
  },

  'search-bar': {
    demo: (
      <SearchBar placeholder="Search components..." buttonLabel="Search" />
    ),
    code: `<SearchBar placeholder="Search components..." buttonLabel="Search" />`,
  },

  'alert-banner': {
    demo: (
      <Grid gap={3}>
        <AlertBanner message="New version available. Update now for latest features." variant="info" />
        <AlertBanner message="Your trial expires in 3 days." variant="warning" />
      </Grid>
    ),
    code: `<AlertBanner message="New version available." variant="info" />
<AlertBanner message="Your trial expires in 3 days." variant="warning" />`,
  },

  'notification-item': {
    demo: (
      <Grid gap={3}>
        <NotificationItem
          user="Alice"
          userInitials="A"
          message="commented on your pull request"
          timestamp="2 minutes ago"
          unread
        />
        <NotificationItem
          user="Bob"
          userInitials="B"
          message="approved your changes"
          timestamp="1 hour ago"
        />
      </Grid>
    ),
    code: `<NotificationItem
  user="Alice"
  userInitials="A"
  message="commented on your pull request"
  timestamp="2 minutes ago"
  unread
/>`,
  },

  'comment-thread': {
    demo: (
      <CommentThread
        user="Jane Smith"
        userInitials="JS"
        timestamp="March 1, 2026"
        body="This looks great! The token system is really well thought out."
        replyLabel="Reply"
      />
    ),
    code: `<CommentThread
  user="Jane Smith"
  userInitials="JS"
  timestamp="March 1, 2026"
  body="This looks great! The token system is really well thought out."
  replyLabel="Reply"
/>`,
  },

  'activity-item': {
    demo: (
      <Grid gap={3}>
        <ActivityItem
          user="Alice"
          userInitials="A"
          action="merged pull request #42"
          timestamp="2 hours ago"
        />
        <ActivityItem
          user="Bob"
          userInitials="B"
          action="deployed to production"
          timestamp="4 hours ago"
          detail="v1.2.0"
        />
      </Grid>
    ),
    code: `<ActivityItem
  user="Alice"
  userInitials="A"
  action="merged pull request #42"
  timestamp="2 hours ago"
/>`,
  },

  'timeline-group': {
    demo: (
      <TimelineGroup date="March 3, 2026">
        <ActivityItem user="Alice" userInitials="A" action="pushed 3 commits" timestamp="10:30 AM" />
        <ActivityItem user="Bob" userInitials="B" action="opened issue #15" timestamp="9:15 AM" />
      </TimelineGroup>
    ),
    code: `<TimelineGroup date="March 3, 2026">
  <ActivityItem user="Alice" userInitials="A" action="pushed 3 commits" timestamp="10:30 AM" />
  <ActivityItem user="Bob" userInitials="B" action="opened issue #15" timestamp="9:15 AM" />
</TimelineGroup>`,
  },

  'section-header': {
    demo: (
      <SectionHeader
        eyebrow="Features"
        title="Everything you need"
        subtitle="A comprehensive set of tools for building design systems."
        align="center"
      />
    ),
    code: `<SectionHeader
  eyebrow="Features"
  title="Everything you need"
  subtitle="A comprehensive set of tools for building design systems."
  align="center"
/>`,
  },

  'code-block': {
    demo: (
      <CodeBlock
        code={`import '@toucan-ui/tokens/css';
import { Button } from '@toucan-ui/core';`}
        language="tsx"
        filename="app.tsx"
      />
    ),
    code: `<CodeBlock
  code={\`import '@toucan-ui/tokens/css';
import { Button } from '@toucan-ui/core';\`}
  language="tsx"
  filename="app.tsx"
/>`,
  },

  'settings-row': {
    demo: (
      <Grid gap={3}>
        <SettingsRow
          label="Dark mode"
          description="Enable dark theme across the application."
          control={<Toggle label="Dark mode" hideLabel />}
        />
        <SettingsRow
          label="Email notifications"
          description="Receive updates via email."
          control={<Toggle label="Email notifications" hideLabel />}
        />
      </Grid>
    ),
    code: `<SettingsRow
  label="Dark mode"
  description="Enable dark theme across the application."
  control={<Toggle label="Dark mode" hideLabel />}
/>`,
  },

  footer: {
    demo: (
      <Footer
        columns={[
          { heading: 'Product', links: [{ label: 'Features', href: '#' }, { label: 'Pricing', href: '#' }] },
          { heading: 'Company', links: [{ label: 'About', href: '#' }, { label: 'Blog', href: '#' }] },
        ]}
        logo={<Text as="strong" size="lg">Brand</Text>}
        legal="2026 Brand Inc. All rights reserved."
      />
    ),
    code: `<Footer
  columns={[
    { heading: 'Product', links: [{ label: 'Features', href: '#' }] },
    { heading: 'Company', links: [{ label: 'About', href: '#' }] },
  ]}
  logo={<Text as="strong" size="lg">Brand</Text>}
  legal="2026 Brand Inc. All rights reserved."
/>`,
  },

  'form-field': {
    demo: (
      <Form>
        <FormField
          name="email"
          rules={[
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          ]}
        >
          <Input label="Email" type="email" placeholder="you@example.com" />
        </FormField>
        <FormField
          name="password"
          rules={[
            { type: 'required', message: 'Password is required' },
            { type: 'minLength', value: 8, message: 'Must be at least 8 characters' },
          ]}
        >
          <Input label="Password" type="password" />
        </FormField>
      </Form>
    ),
    code: `<FormField
  name="email"
  rules={[
    { type: 'required', message: 'Email is required' },
    { type: 'pattern', value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: 'Enter a valid email' },
  ]}
>
  <Input label="Email" type="email" placeholder="you@example.com" />
</FormField>

<FormField
  name="password"
  rules={[
    { type: 'required', message: 'Password is required' },
    { type: 'minLength', value: 8, message: 'Must be at least 8 characters' },
  ]}
>
  <Input label="Password" type="password" />
</FormField>`,
  },

  form: {
    demo: (
      <Form gap={4}>
        <FormField
          name="email"
          rules={[
            { type: 'required', message: 'Email is required' },
            { type: 'pattern', value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Enter a valid email' },
          ]}
        >
          <Input label="Email" type="email" placeholder="you@example.com" />
        </FormField>
        <FormField
          name="password"
          rules={[
            { type: 'required', message: 'Password is required' },
            { type: 'minLength', value: 8, message: 'Must be at least 8 characters' },
          ]}
        >
          <Input label="Password" type="password" />
        </FormField>
        <Button type="submit">Sign in</Button>
      </Form>
    ),
    code: `<Form
  gap={4}
  onValidSubmit={() => console.log('All fields valid!')}
  onInvalidSubmit={() => console.log('Fix errors above')}
>
  <FormField
    name="email"
    rules={[
      { type: 'required', message: 'Email is required' },
      { type: 'pattern', value: /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/, message: 'Enter a valid email' },
    ]}
  >
    <Input label="Email" type="email" placeholder="you@example.com" />
  </FormField>
  <FormField
    name="password"
    rules={[
      { type: 'required', message: 'Password is required' },
      { type: 'minLength', value: 8, message: 'Must be at least 8 characters' },
    ]}
  >
    <Input label="Password" type="password" />
  </FormField>
  <Button type="submit">Sign in</Button>
</Form>`,
  },

  'form-section': {
    demo: (
      <FormSection title="Personal Information" description="Enter your details below.">
        <Input label="Full name" placeholder="John Doe" />
        <Input label="Email" type="email" placeholder="john@example.com" />
      </FormSection>
    ),
    code: `<FormSection title="Personal Information" description="Enter your details below.">
  <Input label="Full name" placeholder="John Doe" />
  <Input label="Email" type="email" placeholder="john@example.com" />
</FormSection>`,
  },

  'empty-state': {
    demo: (
      <EmptyState
        title="No results found"
        description="Try adjusting your search or filters."
        actionLabel="Clear filters"
      />
    ),
    code: `<EmptyState
  title="No results found"
  description="Try adjusting your search or filters."
  actionLabel="Clear filters"
/>`,
  },

  'error-state': {
    demo: (
      <ErrorState
        title="Something went wrong"
        description="We couldn't load the data. Please try again."
        retryLabel="Retry"
      />
    ),
    code: `<ErrorState
  title="Something went wrong"
  description="We couldn't load the data. Please try again."
  retryLabel="Retry"
/>`,
  },

  'loading-state': {
    demo: (
      <LoadingState lines={3} showAvatar showHeading />
    ),
    code: `<LoadingState lines={3} showAvatar showHeading />`,
  },

  carousel: {
    demo: (
      <Carousel label="Feature showcase">
        <CarouselSlide>
          <div style={{ padding: 'var(--scale-8)', background: 'var(--color-info-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <Text as="span" size="lg">Slide 1 — Token-driven theming</Text>
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div style={{ padding: 'var(--scale-8)', background: 'var(--color-success-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <Text as="span" size="lg">Slide 2 — Accessible primitives</Text>
          </div>
        </CarouselSlide>
        <CarouselSlide>
          <div style={{ padding: 'var(--scale-8)', background: 'var(--color-warning-surface)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <Text as="span" size="lg">Slide 3 — Compound components</Text>
          </div>
        </CarouselSlide>
      </Carousel>
    ),
    code: `<Carousel label="Feature showcase">
  <CarouselSlide>
    <div>Slide 1 — Token-driven theming</div>
  </CarouselSlide>
  <CarouselSlide>
    <div>Slide 2 — Accessible primitives</div>
  </CarouselSlide>
  <CarouselSlide>
    <div>Slide 3 — Compound components</div>
  </CarouselSlide>
</Carousel>`,
  },
};
