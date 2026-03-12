# Contributing

## Code Style

- TypeScript strict mode
- ESM-first, CJS compatibility via Tsup
- ESLint v9 flat config (root-level `eslint.config.js`)
- TypeScript 5.7+ with `moduleResolution: "bundler"`
- Accessibility is non-negotiable — all components must pass axe-core
- Prefer composition over configuration in component APIs

## Naming Conventions

### Packages

- npm scope: `@toucan-ui/`
- CSS class prefix: `tcn-` (e.g. `.tcn-button`, `.tcn-grid`)

### Tokens

- **Raw**: `{category}.{property}.{variant}` — e.g. `color.blue.500`
- **Alias**: `{semantic-role}.{modifier}` — e.g. `color.primary`, `color.surface.default`
- **System**: `{component}.{role}.{state}` — e.g. `button.surface.default`

## Monorepo Structure

```
packages/
  tokens/        → Style Dictionary config + JSON tokens + atom CSS
  core/          → React primitives (structure + accessibility)
  patterns/      → Theme-agnostic layout patterns
  interactions/  → Motion thread (V2)
```

## Adding a New Component

### 1. Create the atom CSS

Add a CSS file in `packages/tokens/css/`. The file maps `.tcn-*` classes and `data-*` attributes to `var()` token references. See [atom-css-rules.md](atom-css-rules.md) for constraints.

If required tokens don't exist, add them at the appropriate tier (raw → alias → system).

### 2. Create the React component

Add the component in `packages/core/src/`. Components are structure and accessibility only:

- Semantic HTML elements
- ARIA attributes
- `data-*` attributes for state hooks
- `.tcn-*` CSS classes
- No inline styles, no CSS imports, no visual logic

### 3. Write tests

Each component needs a test file (`{name}.test.tsx`) covering:

- Rendering and basic props
- Accessibility (axe-core audit)
- Keyboard interaction where applicable
- ARIA attribute correctness

### 4. Adding a pattern

Patterns live in `packages/patterns/src/` and compose core atoms. Each pattern directory contains `{name}.tsx`, `{name}.test.tsx`, and `{name}.css`.

Pattern CSS uses `var()` token references and resolves against whichever theme is in scope. Patterns are theme-agnostic — they never import theme-specific values.

## Key Principles

- **No hardcoded style values** — atom CSS uses `var()` token references exclusively
- **Components emit data attributes, not styles** — visual control belongs to the token/CSS layer
- **Three-thread separation** — tokens, structure, and interaction are independent concerns
- **Theming via token overrides** — themes remap tokens under `[data-theme]` selectors, never touching component source
