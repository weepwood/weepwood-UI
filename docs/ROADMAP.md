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

## v0.2.x — Personal UI collection and Inspector (PR #4)

- [x] GitHub UI inspiration directory and searchable/filterable resource cards.
- [x] Three original creative Vue components with Storybook entries.
- [x] Live Inspector with props controls, generated Vue SFC usage examples and shareable URL.
- [x] Blue / Violet / Mint / Coral accent presets with Light/Dark support and preference persistence.
- [x] Resource priority filtering and alphabetical sorting.
- [ ] Review PR CI run and browser smoke test.
- [ ] Audit color contrast, focus states, and Windows WebView2 rendering.
- [x] 收藏 JSON 导入/导出（schema v1、合并/替换、未知项过滤）。
- [x] 分段控制、空状态、骨架屏组件及 Storybook 演示。
- [x] 收藏备份与分段控制的基础回归测试。
- [ ] 浏览器视觉截图、移动端响应式回归与完整 a11y 审计。
