# Quality gates

Before a PR is merged:

1. `pnpm install --frozen-lockfile` succeeds.
2. `pnpm typecheck` checks component declarations and the consumer Playground.
3. `pnpm test` runs Vitest interaction and ARIA assertions.
4. `pnpm build:playground` verifies importing the **built** library package.
5. `pnpm build:storybook` produces a static site without resolving source from a deployed package.
6. Run a manual keyboard pass on Tabs (Left/Right/Home/End) and Dialog (Escape/close), including disabled controls.
7. Inspect controls in both themes and compact density. Review meaningful labels and contrast.

CI checks 1–5; 6–7 remain manual review items until browser automation and visual regression are added.

Do not merge a failing PR automatically. No npm publishing or GitHub Pages claims should be made until their respective deployment workflows succeed.
