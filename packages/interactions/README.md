# @toucan-ui/interactions

Framework-agnostic interaction primitives for [Toucan UI](https://github.com/toucan-ui/toucan-factory). Pure state machines and DOM utilities that power keyboard navigation, focus management, and accessible widget behaviour — no React dependency required.

## Install

```bash
npm install @toucan-ui/interactions
```

## State machines

Each machine is a pure reducer function — feed it state and an action, get new state back. No side effects, easy to test, works with any framework.

### Disclosure (expand/collapse)

```ts
import { disclosureReducer, defaultDisclosureConfig } from '@toucan-ui/interactions';

const state = disclosureReducer({ open: false }, { type: 'TOGGLE' });
// → { open: true }
```

### Dialog (modal open/close)

```ts
import { dialogReducer, defaultDialogConfig } from '@toucan-ui/interactions';
```

### Tabs

```ts
import { tabsReducer, tabsKeyToAction } from '@toucan-ui/interactions';
```

### Listbox (single/multi select)

```ts
import { listboxReducer } from '@toucan-ui/interactions';
```

### Menu (dropdown menus)

```ts
import { menuReducer } from '@toucan-ui/interactions';
```

### Slider (range input)

```ts
import { sliderReducer, defaultSliderConfig } from '@toucan-ui/interactions';
```

### Toast (notification queue)

```ts
import { toastReducer } from '@toucan-ui/interactions';
```

## Navigation helpers

Index-based helpers for cycling through enabled items in a list:

```ts
import {
  getNextEnabledIndex,
  getPrevEnabledIndex,
  getFirstEnabledIndex,
  getLastEnabledIndex,
} from '@toucan-ui/interactions';
```

## DOM utilities

The `/dom` sub-export provides browser-side helpers for focus and scroll management:

```ts
import {
  createFocusTrap,
  lockScroll,
  onClickOutside,
  saveFocus,
  scrollIntoView,
  Keys,
} from '@toucan-ui/interactions/dom';
```

| Utility           | Purpose                                            |
| ----------------- | -------------------------------------------------- |
| `createFocusTrap` | Trap focus within a container (dialogs, drawers)   |
| `lockScroll`      | Prevent body scroll while overlays are open        |
| `onClickOutside`  | Detect clicks outside a target element             |
| `saveFocus`       | Save and restore focus (e.g. before/after a modal) |
| `scrollIntoView`  | Scroll an element into the visible area            |
| `Keys`            | Keyboard key constants for event handling          |

## Design philosophy

These primitives implement the **Interaction** thread of Toucan UI's three-thread architecture:

- **Structure** (`@toucan-ui/core`) — semantic DOM and ARIA
- **Aesthetics** (`@toucan-ui/tokens`) — design tokens and atom CSS
- **Interaction** (`@toucan-ui/interactions`) — state machines and DOM behaviour

Because the machines are pure reducers with no framework coupling, they can be used in React, Vue, Svelte, or vanilla JS.

## Related packages

| Package                                                                  | Description                           |
| ------------------------------------------------------------------------ | ------------------------------------- |
| [@toucan-ui/core](https://www.npmjs.com/package/@toucan-ui/core)         | Accessible React component primitives |
| [@toucan-ui/tokens](https://www.npmjs.com/package/@toucan-ui/tokens)     | Design tokens and atom CSS            |
| [@toucan-ui/patterns](https://www.npmjs.com/package/@toucan-ui/patterns) | Composable layout patterns            |

## License

MIT
