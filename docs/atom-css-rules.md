# Atom CSS Rules

## V1 Constraints

Atom CSS files map `.tcn-*` classes and `data-*` attributes to `var()` token references — nothing else.

### No Hardcoded Values

Every dimension, colour, spacing, border-width, font-size, and radius **must** use a `var()` reference to a system token. If a token doesn't exist, create it. This is what makes theme overrides work — a hardcoded value cannot be overridden.

### No Motion

V1 atoms change state instantly. The following are prohibited:

- `transition` properties
- `animation` or `@keyframes`
- `transform` for motion effects (scale, rotate, translateY for hover lifts)

**Exception**: Structural transforms are allowed where position depends on state — e.g. a toggle thumb using `translateX` for its checked position.

## Surface and Text Color Rules

System tokens on `:root` bake in `:root` values at resolution time. This means themed subtrees (e.g. `[data-theme="finance"]`) don't cause system tokens to re-resolve — they still hold the base theme's values. This creates a critical constraint for how atoms handle text colour.

### Three Atom Categories

#### 1. Surface-Establishing Atoms

**Atoms**: Page, Box, Section, Dialog, Drawer, Popover

These atoms establish a visual surface and must set text colour context variables from **alias tokens** (not system tokens):

```css
--text-body-color
--text-heading-color
--text-display-color
--text-muted-color
```

Using alias tokens ensures correct resolution in themed subtrees.

#### 2. Status Surface Atoms

**Atoms**: Alert, Badge, Toast, AlertBanner

These atoms set `--text-body-color` per variant (e.g. `--text-body-color: var(--color-on-success)` for a success alert). Each variant defines the appropriate text colour for its surface.

#### 3. Content Atoms

All other atoms that render text or icons.

Content atoms read from the context variables set by their ancestor surface atom:

```css
color: var(--text-body-color); /* body text */
color: var(--text-muted-color); /* secondary text */
```

Content atoms must **never** read from system tokens directly (e.g. `--button-ghost-on-surface`). Always use the context variables.

### Summary

| Category             | Sets context vars?             | Source of values         | Examples                   |
| -------------------- | ------------------------------ | ------------------------ | -------------------------- |
| Surface-establishing | Yes                            | Alias tokens             | Page, Box, Section, Dialog |
| Status surface       | Yes (`--text-body-color` only) | Per-variant alias tokens | Alert, Badge, Toast        |
| Content              | No — reads from context        | Context variables        | Button, Input, Heading     |

Always consult `packages/tokens/css/SURFACE_COLOR_RULES.md` before writing or modifying any atom CSS.
