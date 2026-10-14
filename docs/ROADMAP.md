# Roadmap

## v0.1.0 — Foundation (current PR)

- Monorepo scaffolding for tokens, library, Storybook, Playground.
- Six baseline components with Storybook stories.
- Light/Dark and density tokens, source preview, basic tests.
- Package output and deploy workflow.
- Actual build verification must pass in GitHub Actions before merge.

## v0.2.0 — Complete the basic component set

- IconButton, Textarea, Select, Tabs, Dialog, Tooltip.
- Minimum interaction stories and accessibility checks.
- Type declaration consumption smoke tests and dependency upgrade automation.
- Component API reference and controls for all components.

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
