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


## 收藏备份回归用例

- JSON schema/version 严格验证，限制文件大小和条目数量。
- 合并模式不丢失原收藏；替换模式必须用户明确确认。
- 重复 ID 去重，目录外 ID 忽略并反馈数量，JSON 解析失败不覆盖已保存数据。
- 浏览器隐私：仅本地 JSON 文件和 localStorage，不进行网络上传。
- 浏览器集成与视觉截图仍需要人工验证；CI 通过不能代替浏览器实测。
