# @toucan-ui/tokens

Design tokens and atom CSS for [Toucan UI](https://github.com/toucan-ui/toucan-factory) — a token-driven design system that separates structure from aesthetics.

## Install

```bash
npm install @toucan-ui/tokens
```

## Usage

### CSS (most common)

Import the full bundle — token custom properties plus all atom class styles:

```css
@import '@toucan-ui/tokens/css';
```

This gives you every `--tcn-*` custom property and every `.tcn-*` atom class in one file.

### Individual token tiers

If you only need specific tiers of the token cascade:

```css
/* Raw values (colors, sizes, radii, …) */
@import '@toucan-ui/tokens/css/raw';

/* Semantic aliases (e.g. --tcn-color-primary → --tcn-blue-500) */
@import '@toucan-ui/tokens/css/alias';

/* System-level tokens consumed by atom CSS */
@import '@toucan-ui/tokens/css/system';

/* All three tiers combined (no atom CSS) */
@import '@toucan-ui/tokens/css/variables';

/* Dark mode overrides */
@import '@toucan-ui/tokens/css/dark';
```

### JavaScript

```ts
import { TOKENS_VERSION } from '@toucan-ui/tokens';
```

## Token architecture

Tokens are organised into three tiers that form a cascade:

| Tier       | File         | Purpose                                                      |
| ---------- | ------------ | ------------------------------------------------------------ |
| **Raw**    | `raw.css`    | Primitive values — colours, sizes, font stacks               |
| **Alias**  | `alias.css`  | Semantic mappings (`--tcn-color-primary`, `--tcn-radius-md`) |
| **System** | `system.css` | Component-level bindings consumed by atom CSS                |

Every value in the atom CSS references a `var()` token — there are zero hardcoded values.

## Atom CSS

Atom CSS files provide the visual layer for Toucan UI components. Each component gets a dedicated CSS file that maps token values to class-based styles (`.tcn-button`, `.tcn-input`, etc.).

Available atoms: `accordion`, `alert`, `avatar`, `badge`, `box`, `breadcrumb`, `button`, `checkbox`, `dialog`, `drawer`, `dropdown`, `flex`, `grid`, `heading`, `icon`, `input`, `link`, `page`, `pagination`, `popover`, `progress`, `radio`, `rating`, `section`, `select`, `separator`, `skeleton`, `slider`, `table`, `tabs`, `text`, `textarea`, `toast`, `toggle`, `tooltip`, `visually-hidden`, `wrapper`.

## Dark mode

Import `dark.css` to get dark-mode token overrides. These swap alias-tier values so components adapt automatically — no class changes needed.

## Responsive utilities

Built-time responsive CSS is generated for `flex`, `grid`, and `grid-item` from template files. These are included in the main `index.css` bundle.

## Related packages

| Package                                                                          | Description                               |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| [@toucan-ui/core](https://www.npmjs.com/package/@toucan-ui/core)                 | Accessible React component primitives     |
| [@toucan-ui/patterns](https://www.npmjs.com/package/@toucan-ui/patterns)         | Composable layout patterns                |
| [@toucan-ui/interactions](https://www.npmjs.com/package/@toucan-ui/interactions) | Framework-agnostic interaction primitives |

## License

MIT
