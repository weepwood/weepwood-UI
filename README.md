# Weepwood UI

A Vue 3 + TypeScript component library and Storybook design system for web and desktop apps.

**Status: v0.1.0 pre-release foundation (12 components, unmerged PR).** Not yet published to npm.

## What is included

- Twelve real components: `WButton`, `WBadge`, `WSwitch`, `WInput`, `WCard`, `WCheckbox`, `WIconButton`, `WTextarea`, `WSelect`, `WTabs`, `WDialog`, `WProgress`.
- Storybook 10.6 with autodocs, controls and a Light/Dark theme toolbar.
- Framework-agnostic CSS custom-property tokens, based on lessons from `Tauri-Desktop-Kit`.
- Independent library build with ES modules, CSS and Vue component declarations.
- A Vue Playground and Vitest tests.
- CI and GitHub Pages deployment workflows.

**Live docs after the deployment workflow has succeeded and Pages is enabled:** https://weepwood.github.io/weepwood-UI/

## Quick start

Requires Node.js 22.12+, pnpm 10.17.1.

    corepack enable
    pnpm install
    pnpm dev

Open http://localhost:6006 to view Storybook.

Other commands:

    pnpm test
    pnpm typecheck
    pnpm build:lib
    pnpm build:playground
    pnpm build:storybook
    pnpm check
    pnpm dev:playground

The library is intentionally private to this workspace until its package API has been validated in a consuming project. npm publication is not automated in v0.1.0.

## Workspace structure

- `packages/tokens`: shared semantic CSS tokens, color themes, density preferences.
- `packages/vue`: Vue components and independently built package.
- `apps/storybook`: interactive stories, documentation and theme toolbar.
- `apps/playground`: consumer-facing integration smoke test.
- `docs/`: design decisions, roadmap, publishing and handoff guidance.

## Usage in this workspace

Build the library first:

    pnpm build:lib

Then use it in a Vue application linked via pnpm workspace:

    import { WButton, WInput } from '@weepwood/ui-vue'
    import '@weepwood/tokens/styles.css'
    import '@weepwood/ui-vue/styles.css'

Example:

    <WButton variant="primary">Save</WButton>

The Storybook app aliases the source entry during development for hot reload. The Playground consumes the **built** package, which helps catch packaging errors.

## Development principles

- Vue 3 `<script setup>` + TypeScript.
- Native CSS: no Tailwind.
- Accessible native controls where practical; visible keyboard focus and reduced-motion support.
- Design tokens are semantic, not tied to a component's implementation.
- Storybook is a documentation/dev tool, **not** the package bundler.
- No automatic PR merges.

## CI and GitHub Pages

Pull requests run static checks, tests, package builds, Playground build, and Storybook build.
On `main`, a separate workflow deploys Storybook through the GitHub Pages Actions artifact flow.

**One-time repository setting:** Settings → Pages → Build and deployment → Source: **GitHub Actions**. Pages becomes available only after the deployment succeeds.

A committed `pnpm-lock.yaml` is used in CI with `pnpm install --frozen-lockfile`, ensuring repeatable dependency resolution. The lockfile was generated on GitHub Actions after the first online install.

## Related projects

- [Tauri Desktop Kit](https://github.com/weepwood/Tauri-Desktop-Kit): source of the initial design direction. Weepwood UI components are new reusable implementations, not a direct blind copy.
- [Style Atlas](https://github.com/weepwood/Style-Atlas): future theme/visual design reference.

See [Component Usage](docs/COMPONENTS.md), [Quality Gates](docs/QUALITY-GATES.md), [Roadmap](docs/ROADMAP.md) and [Design System](docs/DESIGN-SYSTEM.md).

## License

MIT.
