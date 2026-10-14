# Roadmap

## v0.1.0 — Foundation (current PR)

- Monorepo scaffolding for tokens, library, Storybook, Playground.
- Six baseline components with Storybook stories.
- Light/Dark and density tokens, source preview, basic tests.
- Package output and deploy workflow.
- Actual build verification must pass in GitHub Actions before merge.

## v0.2.0 — Basic component expansion (in progress)

- [x] IconButton, Textarea, Select, Tabs, Dialog, Progress (implementation added to PR).
- [x] Initial stories and accessible keyboard behavior for native controls and Tabs.
- [ ] CI verification of these new changes.
- [ ] Tooltip (deferred until its focus and ARIA behavior is fully tested).
- [ ] Type declaration consumption smoke tests and dependency upgrade automation.
- [ ] Comprehensive API examples and accessibility audits.

## v0.3.0 — Desktop and integration

- Fluent desktop visual tuning and compact density.
- Dropdown, Popover, Toast, context menu and navigation primitives.
- Replace selected Tauri-Desktop-Kit components behind a reviewable PR.
- Keyboard/focus verification across Windows WebView2 and browsers.

## v1.0.0 — Public release criteria

- Stable API contract and semantic versioning.
- Changesets, npm publishing after an approved release.
- Reproducible CI, tests, examples, changelog and migration notes.
- A11y checks, dark-mode contrast checks, reduced-motion review.

## Storybook ecosystem upgrade (2026-10-14)

- [x] Research Vueless, Storybook Design System, Reka UI, Nuxt UI and the Component Encyclopedia; record adoption boundaries.
- [x] Add Alert, Separator, Skeleton, EmptyState to expand to 16 components.
- [x] Add MDX onboarding, design tokens and component guidelines.
- [x] Add density toolbar and semantic color palette examples.
- [ ] Run and validate CI for the new changes.
- [ ] Add Vitest browser-mode Storybook addon once browser runtime and CI installation are provisioned.
- [ ] Visual regression baseline and multiple browser engines.
