# Community Roadmap — Beyond Portfolio

This document outlines what would need to change if Design System Factory moved from a portfolio piece into a public, community-adopted project.

## Package Distribution

Publish to npm as public packages. Developers need `npm install @toucan-ui/core` — not cloning a monorepo. Changesets is already configured, so the versioning pipeline is half-built. The monorepo stays as the development environment, but the packages are the product.

## Repo Structure

Keep the monorepo for development, but docs/wizard become separate deployables. The factory packages live in one repo with independent versioning via Changesets.

Docs and wizard should live in **separate repos** consuming published packages. This forces dogfooding the install path — if the docs site can't build from a clean `npm install`, neither can anyone else's project.

## Technical Changes

### Tokens package — framework-agnostic positioning

Already framework-agnostic (CSS custom properties). Explicitly market and document this. A Vue or Svelte developer should be able to use `@toucan-ui/tokens` with their own components.

### Core package

- **Tree-shaking** — consumers only pay for what they import. Tsup with ESM handles this, but verify with bundlesize tracking.
- **CSS delivery** — currently one `index.css`. Community users will want per-component CSS imports (`@toucan-ui/tokens/css/button`) or a build plugin that extracts only what's used.
- **Peer dependencies** — React as a peer dep pinned to a range, not exact.
- **SSR compatibility** — Next.js, Remix, Astro all need to work out of the box. Every component must handle hydration correctly.

### Semantic versioning

Becomes critical. Any change to token naming, alias references, or component APIs needs proper semver. Changesets + clear migration guides for every major bump.

## What To Add

### Infrastructure

- **Dedicated docs domain** — e.g. `factory.dev` or similar
- **Bundlesize CI** — track the cost of each package per commit
- **Browser/a11y CI** — automated axe-core + cross-browser testing on every PR
- **A CLI or init tool** — `npx create-toucanui-app` or `npx @toucan-ui/cli init` that scaffolds tokens + imports

### Documentation

- **Per-component docs** — props tables, live examples, accessibility notes, do/don't guidance
- **Contribution guidelines** — component proposal process, PR templates, testing requirements
- **RFC process** — for new atoms or breaking changes, let the community weigh in before building

### Ecosystem

- **The wizard/configurator** — visual theme generation is a major selling point. Generating a theme JSON visually and exporting it is a huge DX win over editing token files manually.
- **Figma integration** — token sync between Figma variables and JSON tokens. Design systems live and die by designer adoption.

## Competitive Differentiators

The design system space is crowded (Radix, Shadcn, Chakra, Mantine, etc). The differentiators are:

1. **Three-thread architecture** — clean separation of tokens/structure/interaction is genuinely novel. Most systems tangle these together.
2. **The configurator** — visual theme generation is something most systems lack or do poorly.
3. **True token-driven theming** — not just light/dark mode, but fully customisable brand theming from one JSON file. This is what enterprise teams actually need.
4. **Built-from-scratch accessibility** — no Radix dependency means full ownership of the stack. A differentiator if the quality is there.

## Sustainability

The hardest part isn't the code — it's sustained maintenance and community building. A design system with 30+ components needs someone responding to issues, reviewing PRs, writing migration guides, and shipping regular releases. Consider co-maintainers from day one.

The technical foundation is solid: the token cascade, surface color rules, responsive system — these are production-grade decisions. The path from portfolio to community project is incremental, not a rewrite.
