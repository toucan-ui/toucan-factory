# @toucan-ui/core

Accessible React component primitives for [Toucan UI](https://github.com/toucan-ui/toucan-factory). Each component emits semantic HTML, correct ARIA attributes, and `data-*` / `.tcn-*` hooks — with no baked-in styles. Pair with `@toucan-ui/tokens` for the visual layer.

## Install

```bash
npm install @toucan-ui/core @toucan-ui/tokens
```

**Peer dependencies:** React 19, React DOM 19

## Quick start

```tsx
import { Button, Text, Box } from '@toucan-ui/core';
import '@toucan-ui/tokens/css';

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

- **Structure** (`@toucan-ui/core`) — semantic DOM, ARIA, keyboard behaviour, data hooks
- **Aesthetics** (`@toucan-ui/tokens`) — design tokens and atom CSS that style the hooks
- **Interaction** (`@toucan-ui/interactions`) — state machines for keyboard and focus logic

Components output class names like `.tcn-button` and data attributes like `data-variant="primary"`. The token package provides CSS that targets these hooks, so you get a fully styled component with zero runtime CSS.

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
| [@toucan-ui/tokens](https://www.npmjs.com/package/@toucan-ui/tokens)             | Design tokens and atom CSS                |
| [@toucan-ui/patterns](https://www.npmjs.com/package/@toucan-ui/patterns)         | Composable layout patterns                |
| [@toucan-ui/interactions](https://www.npmjs.com/package/@toucan-ui/interactions) | Framework-agnostic interaction primitives |

## License

MIT
