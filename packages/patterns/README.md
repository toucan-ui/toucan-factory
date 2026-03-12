# @toucan-ui/patterns

Theme-agnostic layout patterns that compose [Toucan UI](https://github.com/toucan-ui/toucan-factory) core atoms into ready-to-use UI sections. Each pattern is a higher-level component built from `@toucan-ui/core` primitives and styled with `@toucan-ui/tokens`.

## Install

```bash
npm install @toucan-ui/patterns @toucan-ui/core @toucan-ui/tokens
```

**Peer dependencies:** React 19, React DOM 19

## Quick start

```tsx
import { NavBar, HeroCentered, Footer } from '@toucan-ui/patterns';
import '@toucan-ui/tokens/css';
import '@toucan-ui/patterns/css';

function LandingPage() {
  return (
    <>
      <NavBar logo="Acme" links={[{ label: 'Docs', href: '/docs' }]} />
      <HeroCentered
        heading="Ship faster"
        description="A design system that gets out of your way."
        primaryAction={{ label: 'Get started', href: '/docs' }}
      />
      <Footer />
    </>
  );
}
```

## Patterns

### Page structure

`NavBar` · `SideNav` · `PageHeader` · `SectionHeader` · `Footer`

### Heroes

`HeroCentered` · `HeroSplit` · `HeroFull`

### Cards

`FeatureCard` · `MetricCard` · `PricingCard` · `ProfileCard` · `ContactCard` · `TestimonialCard` · `AuthCard`

### Content

`ActivityItem` · `CommentThread` · `NotificationItem` · `TimelineGroup` · `StatsRow` · `CodeBlock` · `CodePreview`

### Data

`DataTableFull` · `DataTableRow` · `ComparisonTable`

### Forms

`Form` · `FormField` · `FormSection` · `FormContext` · `FieldRow` · `SearchBar` · `SettingsRow`

### Feedback

`AlertBanner` · `EmptyState` · `ErrorState` · `LoadingState`

### Media

`Carousel` · `CarouselSlide`

## CSS

Patterns ship their own CSS for layout concerns (spacing, grid placement). Import it alongside the token CSS:

```css
@import '@toucan-ui/tokens/css';
@import '@toucan-ui/patterns/css';
```

## How patterns differ from core atoms

|                 | Core atoms                      | Patterns                                       |
| --------------- | ------------------------------- | ---------------------------------------------- |
| **Scope**       | Single UI element               | Composed section or layout                     |
| **Styling**     | Fully token-driven via atom CSS | Minimal layout CSS + atom CSS inheritance      |
| **Flexibility** | Maximum — every prop is exposed | Opinionated — sensible defaults, key overrides |
| **Use case**    | Build custom layouts            | Drop in common UI sections                     |

## Related packages

| Package                                                                          | Description                               |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| [@toucan-ui/core](https://www.npmjs.com/package/@toucan-ui/core)                 | Accessible React component primitives     |
| [@toucan-ui/tokens](https://www.npmjs.com/package/@toucan-ui/tokens)             | Design tokens and atom CSS                |
| [@toucan-ui/interactions](https://www.npmjs.com/package/@toucan-ui/interactions) | Framework-agnostic interaction primitives |

## License

MIT
