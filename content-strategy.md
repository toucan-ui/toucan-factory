# Toucan UI — Content & Launch Strategy

## Target platforms

| Platform | Audience | Format | Tone |
|---|---|---|---|
| **Hacker News** | Senior engineers, CTOs, open-source contributors | Show HN post + discussion-bait | Technical, opinionated, no marketing fluff |
| **Dev.to** | Frontend/fullstack devs, early adopters | Tutorials, series, how-tos | Friendly, practical, code-heavy |
| **Medium** | Design engineers, tech leads, broader tech audience | Thought pieces, architecture deep dives | Polished, narrative-driven |
| **Reddit** (r/reactjs, r/webdev, r/frontend) | Practitioners looking for tools | Short intro + demo link | Direct, show-don't-tell |
| **Product Hunt** | Early adopters, indie devs, designers | Launch page with visuals | Benefit-led, visual |
| **Twitter/X** | Dev community, design system people | Threads, short-form, GIFs | Punchy, visual, conversational |
| **LinkedIn** | Engineering managers, design system leads | Professional narrative | Business value, team outcomes |
| **Personal blog** (toucan-docs site) | Deep-dive seekers, returning users | Long-form series, references | Authoritative, detailed |
| **YouTube / Loom** | Visual learners, tutorial seekers | Walkthroughs, live builds | Show the thing working |
| **Bluesky / Mastodon** | Open-source community, indie web | Short takes, announcements | Genuine, community-oriented |

---

## Content pillars

### Pillar 1 — "What's broken" (Problem awareness)
Why current design systems fail teams. CSS-in-JS fatigue, coupled concerns, theme-switching pain, accessibility as afterthought.

### Pillar 2 — "The three-thread model" (Architecture)
How separating Structure, Aesthetics, and Interaction solves real problems. Token-first thinking.

### Pillar 3 — "Build with it" (Practical)
Tutorials, guides, recipes. Get people using it and shipping.

### Pillar 4 — "Behind the build" (Story)
The journey of building Toucan UI. Decisions, trade-offs, lessons. Human angle.

---

## The articles

### Series A — "Token-first design systems" (Dev.to + Personal blog)

A 4-part series that builds understanding progressively. Publish weekly.

**A1: "Why your design system has a coupling problem"**
- The problem: components own their styles, themes fight components, dark mode is bolted on
- How most systems tangle structure, styling, and behaviour into one blob
- Introduce the idea of separation — but don't pitch Toucan yet
- End with: "What if we separated these concerns completely?"
- *~1,200 words. No code. Diagrams.*

**A2: "Tokens all the way down: building a CSS system with zero hardcoded values"**
- What a token cascade looks like (raw → alias → system)
- Show the before/after: hardcoded values vs var() references
- Walk through a real button example from token definition to rendered output
- Introduce Toucan's token architecture as the implementation
- *~1,500 words. Code examples. Token flow diagram.*

**A3: "Accessible by default: separating structure from style in React"**
- Why accessibility breaks when styles and structure are coupled
- The Structure thread: semantic HTML, ARIA, data hooks, no CSS
- Show a Dialog component — what the DOM looks like, what gets tested
- Compare to a typical styled-component Dialog
- *~1,500 words. Code comparisons. DOM output examples.*

**A4: "Ship a themed landing page in 15 minutes with Toucan UI"**
- Full tutorial: install, import tokens + core + patterns, build a page
- Use NavBar, HeroCentered, FeatureCard, Footer
- Switch themes by swapping token files
- Deploy to Vercel
- *~2,000 words. Step-by-step code. Screenshots.*

### Series B — "Building Toucan UI" (Medium + Personal blog)

Behind-the-scenes narrative. Publish biweekly, staggered with Series A.

**B1: "I built a design system that ships no CSS in its components"**
- The origin story — why you started Toucan
- The key insight: components should emit hooks, not styles
- What the three-thread architecture looks like in practice
- Results: bundle size, theme switching, testing simplicity
- *~1,800 words. Narrative tone. Architecture diagram.*

**B2: "Style Dictionary v5 in production: lessons from building a token pipeline"**
- Migrating from v3 to v5 (ESM, async, new constructor)
- Building the three-tier cascade (raw, alias, system)
- The post-SD build step: concatenating tokens + atom CSS
- Responsive CSS generation from templates
- Gotchas and wins
- *~1,500 words. Config snippets. Build output examples.*

**B3: "State machines over hooks: why Toucan UI's interactions are framework-agnostic"**
- The problem with React-coupled interaction logic
- Pure reducers for disclosure, dialog, tabs, listbox, menu, slider, toast
- How core wraps them in React hooks, but the machines work anywhere
- Testing a reducer vs testing a hook — the DX difference
- *~1,400 words. Reducer examples. Test comparisons.*

### Standalone pieces

**C1: "Show HN: Toucan UI — a token-driven React design system that separates structure from style"** (Hacker News)
- 3-4 paragraph intro: what it is, why it exists, what's different
- Link to docs, GitHub, npm
- Key stats: 40+ components, 37 patterns, zero CSS-in-JS, zero hardcoded values, WCAG 2.1 AA
- *~300 words. No hype. Technical substance.*

**C2: "The design system that doesn't own your styles"** (Reddit — r/reactjs)
- Short post: the problem, the approach, a code snippet, links
- Focus on what devs can do with it right now
- *~200 words + code block.*

**C3: "Why I stopped using CSS-in-JS and built a token-first design system"** (LinkedIn)
- Professional angle: team velocity, onboarding, maintainability
- The cost of coupled systems at scale
- How token-first thinking changes the workflow for design + eng
- *~800 words. No code. Business outcomes.*

**C4: "Toucan UI: open-source design system for React"** (Product Hunt)
- Tagline: "Structure, aesthetics, and interaction — separated by design"
- 3 key benefits: accessible by default, theme with tokens not code, zero CSS-in-JS
- Screenshots of components, the wizard, the docs
- Maker comment explaining the motivation
- *Launch page + ~150 word description.*

---

## Twitter/X thread ideas

**Thread 1: "The problem with design systems" (awareness)**
- 8-10 tweets breaking down why most design systems create coupling
- Visual: diagram of tangled vs separated concerns
- End with: "I built something different" + link to A1

**Thread 2: "Zero hardcoded values" (technical hook)**
- Show a component's CSS — every single value is a var() reference
- Walk through what happens when you swap themes
- End with: link to A2

**Thread 3: "What 40+ accessible components look like under the hood" (credibility)**
- Show the DOM output of a Dialog, Tabs, Dropdown
- Highlight ARIA attributes, keyboard handling, focus management
- End with: link to docs

**Thread 4: "I built a landing page in 15 minutes" (demo)**
- Screen recording or GIF of the process
- Code snippets in tweet images
- End with: link to A4

**Thread 5: "Ship day" (launch)**
- Announce the launch, link to Product Hunt
- Tag relevant people in the design system space
- Ask for feedback

---

## Release timeline

### Week 1 — Seed the problem
| Day | Action |
|-----|--------|
| Mon | Publish **A1** on Dev.to + personal blog |
| Tue | **Twitter thread 1** (the problem with design systems) |
| Wed | Cross-post A1 excerpt on LinkedIn |
| Fri | Share A1 in r/webdev as discussion post |

### Week 2 — Introduce the architecture
| Day | Action |
|-----|--------|
| Mon | Publish **A2** on Dev.to + personal blog |
| Tue | **Twitter thread 2** (zero hardcoded values) |
| Wed | Publish **B1** on Medium ("I built a design system that ships no CSS") |
| Thu | Share B1 on LinkedIn |
| Fri | Share A2 in r/frontend |

### Week 3 — Go deep on accessibility + interactions
| Day | Action |
|-----|--------|
| Mon | Publish **A3** on Dev.to + personal blog |
| Tue | **Twitter thread 3** (accessible components under the hood) |
| Wed | Publish **B2** on Medium (Style Dictionary v5 in production) |
| Fri | Share A3 in r/reactjs |

### Week 4 — Launch week
| Day | Action |
|-----|--------|
| Mon | Publish **A4** tutorial on Dev.to + personal blog |
| Tue | **Twitter thread 4** (build a page in 15 minutes) + **Product Hunt launch (C4)** |
| Tue | **Hacker News Show HN (C1)** — post early morning US time |
| Wed | Publish **B3** on Medium (state machines over hooks) |
| Wed | **Reddit launch posts** — r/reactjs (C2), r/webdev, r/opensource |
| Thu | **LinkedIn article (C3)** — "Why I stopped using CSS-in-JS" |
| Fri | **Twitter thread 5** (ship day recap) + thank the community |

### Week 5+ — Sustain
- Respond to every comment, issue, and PR
- Write follow-up posts based on questions that come up
- "How Toucan UI handles [X]" short posts for Dev.to
- Video walkthrough for YouTube
- Contribute to "awesome-react" lists, design system directories

---

## Principles

1. **Lead with the problem, not the product.** Weeks 1-2 should make people nod before they ever hear "Toucan UI."
2. **Show, don't tell.** Every claim needs a code snippet, diagram, or demo.
3. **No marketing voice.** Write like an engineer explaining something to a peer.
4. **Engage, don't broadcast.** Reply to every comment. Ask questions. Be in the threads.
5. **Time the launch.** Product Hunt + HN + Reddit all hit on the same day (Tuesday Week 4). Momentum compounds.
6. **One CTA per piece.** Each article drives to one thing: the next article, the docs, or the GitHub repo.

---

## Key stats to reference across all content

- 40+ accessible React components
- 37 composable layout patterns
- 3-tier token cascade (raw → alias → system)
- Zero hardcoded CSS values
- Zero CSS-in-JS runtime
- WCAG 2.1 AA accessibility
- Framework-agnostic interaction primitives
- Dark mode via token swap, no component changes
- Visual theme configurator (Toucan Wizard)
