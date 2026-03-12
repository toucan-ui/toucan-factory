# Architecture

## Three Threads

The design system enforces strict separation across three independent threads. V1 ships threads 1 and 2 only.

### 1. Tokens (Aesthetics)

JSON values compiled to CSS custom properties via Style Dictionary v5. Entirely framework-agnostic — any frontend framework can consume the generated CSS.

Themes are partial JSON overrides that deep-merge over base tokens, scoped under `[data-theme="name"]`. Every visual value in atom CSS **must** come from a `var()` token reference — zero hardcoded pixel values, colours, or dimensions. This is what makes theme overrides work: a hardcoded value cannot be overridden.

### 2. Components (Structure)

Accessible HTML primitives implemented in React. Components emit:

- Semantic DOM elements
- ARIA attributes
- `data-*` hooks for state
- `.tcn-*` CSS classes

Components contain no CSS, no visual logic, and no animation. Component API contracts are documented independently of React for future framework portability (Vue, Flutter, etc.).

### 3. Interaction (Motion)

Transitions, transforms, animations, easing, type-ahead, drag, gestures. **Deferred to V2.** Nothing from this thread may appear in V1 code.

## Token Cascade

Three-tier referencing hierarchy (enforce referencing direction — never reference upward):

```
Raw → Alias → System
```

- **Raw**: `{category}.{property}.{variant}` — e.g. `color.blue.500`
- **Alias**: `{semantic-role}.{modifier}` — e.g. `color.primary`, `color.surface.default`
- **System**: `{component}.{role}.{state}` — e.g. `button.surface.default`, `button.on-surface.default`

### Surface / On-Surface Convention

- `surface` = background/container colour
- `on-surface` = content colour (text/icons on top of a surface)
- `on-primary` = content on primary-coloured surfaces

## Token Build Output

Token tiers are built as separate CSS files (`raw.css`, `alias.css`, `system.css`) plus a combined `variables.css`. A post-build step concatenates `variables.css` with hand-written atom CSS from the `css/` directory into `dist/css/index.css`.

Import paths:

- `@toucanui/tokens/css` — tokens + atom CSS (ground-zero import)
- `@toucanui/tokens/css/tokens` — token values only

## Build Dependency Order

```
tokens → core → patterns → docs
```

## Patterns Package

Patterns (`@toucanui/patterns`) are theme-agnostic layout components that compose core atoms. Their CSS uses `var()` token references that resolve against whichever theme's tokens are in scope.

Each pattern directory under `packages/patterns/src/` contains `{name}.tsx`, `{name}.test.tsx`, and `{name}.css`. Pattern CSS is consumed standalone, not bundled into theme packages.

## Monorepo Structure

```
packages/
  tokens/              → Style Dictionary config + JSON tokens + atom CSS
  core/                → React primitives (structure + accessibility)
  patterns/            → Theme-agnostic layout patterns
  interactions/        → Motion thread (V2)
apps/
  docs/                → Next.js documentation site
```

Root-level configs (ESLint, TypeScript, Prettier) — not internal config packages. Package tsconfigs extend `tsconfig.base.json` but do not use `references` (conflicts with `noEmit`). Turborepo handles build ordering. Root `tsconfig.json` uses `references` for IDE navigation only.
