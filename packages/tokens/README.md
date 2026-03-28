# @toucan-ui/tokens

Design token presets for [Toucan UI](https://github.com/toucan-ui/toucan-factory) — ready-made JSON themes for the token-driven design system.

## Install

```bash
npm install @toucan-ui/tokens
```

## What this package provides

`@toucan-ui/tokens` is a pure data package containing JSON token presets. It has zero dependencies and no build step. The compilation pipeline lives in `@toucan-ui/core`.

Most users don't need this package directly — `@toucan-ui/core` ships pre-compiled CSS from the default preset:

```css
@import '@toucan-ui/core/foundation';
@import '@toucan-ui/core/styles';
```

## When to install this package

Install `@toucan-ui/tokens` if you want to:

- **Use a non-default preset** with the CLI: `npx toucan build --tokens node_modules/@toucan-ui/tokens/presets/finance`
- **Inspect token values** in your tooling or scripts

## Preset structure

Each preset contains four token tiers in DTCG JSON format:

```
presets/default/
  raw/          — Primitive values (colours, sizes, font stacks)
  alias/        — Semantic mappings (--color-primary, --radius-md)
  system/       — Component-level bindings consumed by atom CSS
  dark/         — Dark mode token overrides
```

## Token architecture

Tokens are organised into three tiers that form a cascade:

| Tier       | Purpose                                              |
| ---------- | ---------------------------------------------------- |
| **Raw**    | Primitive values — colours, sizes, font stacks       |
| **Alias**  | Semantic mappings (`--color-primary`, `--radius-md`) |
| **System** | Component-level bindings consumed by atom CSS        |

Every value in the atom CSS references a `var()` token — there are zero hardcoded values.

## Related packages

| Package                                                                          | Description                               |
| -------------------------------------------------------------------------------- | ----------------------------------------- |
| [@toucan-ui/core](https://www.npmjs.com/package/@toucan-ui/core)                 | Components, build pipeline, and CLI       |
| [@toucan-ui/patterns](https://www.npmjs.com/package/@toucan-ui/patterns)         | Composable layout patterns                |
| [@toucan-ui/interactions](https://www.npmjs.com/package/@toucan-ui/interactions) | Framework-agnostic interaction primitives |

## License

MIT
