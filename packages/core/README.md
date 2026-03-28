# @toucan-ui/core

Accessible React component primitives for [Toucan UI](https://github.com/toucan-ui/toucan-factory). Each component emits semantic HTML, correct ARIA attributes, and `data-*` / `.tcn-*` hooks — with co-located atom CSS that maps these hooks to token values.

Ships the `toucan` CLI for compiling design token JSON into CSS.

## Install

```bash
npm install @toucan-ui/core
```

**Peer dependencies:** React 19, React DOM 19

## Quick start

```bash
# 1. Install a token preset (or bring your own token JSON)
npm install @toucan-ui/tokens

# 2. Build CSS from your tokens
npx toucan build --tokens node_modules/@toucan-ui/tokens/presets/default --out ./toucan-out
```

```css
/* globals.css */
/* 1. Foundation tokens (raw + alias + system + dark) */
@import './toucan-out/foundation/foundation.css';

/* 2. Component + responsive CSS */
@import './toucan-out/styles.css';
```

```tsx
import { Button, Text, Box } from '@toucan-ui/core';

function App() {
  return (
    <Box elevation="sm" radius="md" padding="lg">
      <Text>Hello from Toucan UI</Text>
      <Button variant="primary" onClick={() => alert('Clicked')}>
        Get started
      </Button>
    </Box>
  );
}
```

## CLI

```
Usage:
  toucan build [options]

Options:
  --tokens <path>   Path to token directory (raw/, alias/, system/, dark/ JSON)
  --out <path>      Output directory (default: ./toucan-out)
```

Token sources:

- **Preset**: `--tokens node_modules/@toucan-ui/tokens/presets/default`
- **Wizard output**: `--tokens ./my-wizard-output`
- **Hand-crafted**: `--tokens ./my-tokens` (must contain `raw/`, `alias/`, `system/`, `dark/` with DTCG JSON)

## Components

### Layout

`Page` · `Wrapper` · `Section` · `Box` · `Grid` · `GridItem` · `Flex` · `FlexItem`

### Typography

`Text` · `Heading` · `Link`

### Forms

`Button` · `Input` · `Textarea` · `Select` · `Checkbox` · `Toggle` · `RadioGroup` · `Radio` · `Slider`

### Data display

`Table` · `TableHead` · `TableBody` · `TableRow` · `TableHeader` · `TableCell` · `TableCaption` · `Badge` · `Avatar` · `Icon` · `Progress` · `Rating` · `Skeleton`

### Navigation

`Tabs` · `TabList` · `Tab` · `TabPanel` · `Breadcrumb` · `BreadcrumbItem` · `Pagination`

### Overlay

`Dialog` · `Drawer` · `Tooltip` · `Popover` · `PopoverTrigger` · `PopoverContent` · `DropdownMenu` · `DropdownMenuTrigger` · `DropdownMenuContent` · `DropdownMenuItem` · `DropdownMenuSeparator` · `DropdownMenuLabel`

### Feedback

`Alert` · `ToastProvider` · `Toast` · `useToast`

### Disclosure

`Accordion` · `AccordionItem` · `AccordionTrigger` · `AccordionPanel`

### Utility

`Separator` · `VisuallyHidden` · `cn` · `useColorMode`

## How it works

Toucan UI separates concerns into independent threads:

- **Structure + Aesthetics** (`@toucan-ui/core`) — semantic DOM, ARIA, keyboard behaviour, data hooks, and co-located atom CSS. Ships the CLI for compiling token JSON into CSS.
- **Interaction** (`@toucan-ui/interactions`) — state machines for keyboard and focus logic
- **Token presets** (`@toucan-ui/tokens` or custom) — JSON token definitions that the CLI compiles into foundation CSS

Components output class names like `.tcn-button` and data attributes like `data-variant="primary"`. Atom CSS targets these hooks, so you get a fully styled component with zero runtime CSS.

## Theming

The CLI compiles your token JSON into foundation CSS with neutral defaults from the alias tier. To apply your own brand, import a theme CSS file after the compiled output. Themes override alias tokens via a `data-theme` attribute on any ancestor element.

## Accessibility

Every component is built to meet WCAG 2.1 AA. Components include:

- Correct ARIA roles and attributes
- Keyboard navigation (arrow keys, Enter, Escape, Tab)
- Focus management and focus trapping (dialogs, drawers)
- Screen reader announcements (toasts, live regions)

## TypeScript

All components export their prop types (e.g. `ButtonProps`, `DialogProps`). Shared types like `Size`, `Elevation`, `Radius`, and `Breakpoint` are also exported for use in your own components.

## Related packages

| Package                                                                          | Description                               |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| [@toucan-ui/tokens](https://www.npmjs.com/package/@toucan-ui/tokens)             | Design token presets (JSON)               |
| [@toucan-ui/patterns](https://www.npmjs.com/package/@toucan-ui/patterns)         | Composable layout patterns                |
| [@toucan-ui/interactions](https://www.npmjs.com/package/@toucan-ui/interactions) | Framework-agnostic interaction primitives |

## License

MIT
