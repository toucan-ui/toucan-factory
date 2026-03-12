# Design System Factory

A modular, token-driven design system that separates component architecture into independent threads: **Structure** (accessible primitives), **Aesthetics** (token-driven themes), and **Interaction** (pluggable motion — V2). Built to demonstrate deep design system architecture.

## Architecture

The system enforces strict separation across three threads:

1. **Tokens (Aesthetics)** — JSON values compiled to CSS custom properties via Style Dictionary. Framework-agnostic. Themes override these values. Every visual property in atom CSS references a `var()` token — zero hardcoded values.
2. **Components (Structure)** — Accessible HTML primitives in React. Emit semantic DOM, ARIA attributes, `data-*` hooks, and `.tcn-*` classes. No CSS, no visual logic.
3. **Interaction (Motion)** — Transitions, animations, gestures. Deferred to V2.

See [docs/architecture.md](docs/architecture.md) for the full architecture guide.

## Packages

| Package                   | Description                                         |
| ------------------------- | --------------------------------------------------- |
| `@toucan-ui/tokens`       | Style Dictionary config, JSON tokens, and atom CSS  |
| `@toucan-ui/core`         | React primitives — structure and accessibility only |
| `@toucan-ui/patterns`     | Theme-agnostic layout patterns composing core atoms |
| `@toucan-ui/interactions` | Motion thread (V2)                                  |

### Build Order

```
tokens → core → patterns
```

## Quick Start

```bash
# Install dependencies
pnpm install

# Build all packages
pnpm build

# Run tests
pnpm test
```

## Documentation

- [Architecture](docs/architecture.md) — threads, token cascade, surface conventions
- [Atom CSS Rules](docs/atom-css-rules.md) — V1 CSS constraints and surface/text color rules
- [Contributing](docs/contributing.md) — code style, naming conventions, how to add components

## Consuming Apps

The documentation site and theme configurator live in separate repos and consume the published npm packages:

- **[toucan-docs](https://github.com/toucan-ui/toucan-docs)** — Documentation site with examples
- **[toucan-wizard](https://github.com/toucan-ui/toucan-wizard)** — Visual theme configurator

## Key Decisions

- **Package manager**: pnpm with Turborepo
- **React**: v19
- **Accessibility**: Custom primitives (no Radix — built from scratch)
- **Token pipeline**: Style Dictionary v5 → CSS custom properties
- **Bundler**: Tsup 8 (ESM + CJS)
- **Testing**: Vitest 3

## License

MIT
