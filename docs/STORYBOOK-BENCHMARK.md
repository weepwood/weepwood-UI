# Storybook 生态调研与 Weepwood UI 落地对照（2026-10-14）

> 本文记录**可核对的公开项目**及其架构启发，不等于复制第三方源码。参考资料在 2026-10-14 查询；项目未来可能调整实现。优先保留 Vue 3 / TypeScript / 原生 CSS，不使用 Tailwind。

## 对比矩阵

| 项目 | 组件/文档技术 | 借鉴 | 不直接采用的原因 | 来源 |
| --- | --- | --- | --- | --- |
| Storybook Design System | React + Storybook + NPM + Chromatic | 组件仓库与应用解耦、文档/视觉回归与发布治理 | React 实现和历史全局样式不适合直接移植 | https://github.com/storybookjs/design-system |
| Vueless UI | Vue 3 + Storybook 10 + Tailwind v4 | 完整状态 Stories、独立主题编辑器理念、明暗主题与无障碍策略 | 样式基础依赖 Tailwind，需要转为原生 CSS Tokens | https://github.com/vuelessjs/vueless |
| Reka UI | Vue 可访问交互原语；Histoire 而非原生 Storybook | 复杂弹层/焦点/键盘规范应优先依赖成熟原语 | 它是交互原语层，不是现成的 Fluent 视觉库 | https://github.com/unovue/reka-ui |
| Nuxt UI | Vue / Nuxt + Reka UI + Tailwind | 按使用场景分类 API、组件变体、文档安装体验 | 与 Nuxt 和 Tailwind 耦合；不适合直接做 Tauri 公共包 | https://github.com/nuxt/ui |
| Storybook Component Encyclopedia | 公共 Storybook 搜索/案例索引 | 观察默认/空/加载/错误状态与源代码组织 | 是索引不是依赖；旧文章的数据量为历史值 | https://storybook.js.org/blog/component-encyclopedia |
| Learn Storybook Vue | Vue 官方教程案例 | Stories 与完整页面组合，文档与测试共同驱动 | 教学级示例，不直接覆盖大型生产系统边界 | https://github.com/chromaui/learnstorybook.com |
| GitLab UI / Pajamas | Vue 组件库、公开 Storybook Showcase、组件文档/a11y | Vue 业务组件覆盖、Storybook 分类与交互状态 | 企业体系复杂，不直接复制样式与依赖 | https://storybook.js.org/showcase/gitlab-gitlab-ui |
| kickstartDS | 设计系统 Starter + Storybook + 设计 Token stories | 从 Token 到组件、页面和发布的完整流程 | 部分教程使用旧版 Storybook 6，不照搬依赖版本 | https://github.com/kickstartDS/ds-starter |
| IBM Carbon | React/Web Components + Storybook + 独立 Tokens/Icons | 按包分层，复杂组件的状态与无障碍案例 | 非直接的 Vue 3 原生 CSS 组件库 | https://github.com/carbon-design-system/carbon |

## 在线 Storybook / 官方参考入口

- [GitLab UI Storybook Showcase](https://storybook.js.org/showcase/gitlab-gitlab-ui) — Vue 组件状态与企业级覆盖范围。
- [kickstartDS 在线 Storybook](https://www.kickstartds.com/storybook/) — Token 可视化及模块化组织。
- [Carbon Design System](https://github.com/carbon-design-system/carbon) — 组件包、Tokens、图标和 Storybook 分层。
- [Vueless UI](https://github.com/vuelessjs/vueless) — Vue 3 + Storybook 10；保留原生 CSS 的实现约束。
- [Storybook Component Encyclopedia](https://storybook.js.org/blog/component-encyclopedia) — 观察公共案例。

## 当前 Weepwood UI 的主要差距

| 能力 | 原状态 | 本 PR 改进 | 后续 |
| --- | --- | --- | --- |
| 组件广度 | 12 个，缺少反馈/占位 | 新增 Alert, Separator, Skeleton, EmptyState，共 16 个 | Tooltip、Popover、Dropdown、Toast |
| 入门文档 | README，组件 Stories 分散 | Getting Started MDX 与独立指南 | 在每个组件下加入用途/禁忌/边界 |
| Tokens 可发现性 | 有 CSS Token，但缺少视觉目录 | Tokens Story + MDX 展示语义调色板 | 可视化编辑/导出、主题校验 |
| Storybook 主题体验 | Light/Dark | 增加密度切换（独立于主题） | 主题截图、对比度测试 |
| 使用状态 | 各组件若干示例 | 反馈/加载/空状态示例和综合 Gallery | 表单、数据表格、桌面交互页面组合 |
| 自动验证 | Vitest + 构建 CI | 新增单元测试、Storybook play 场景 | 使用 Vitest browser addon 真正执行 play 的 CI |

## 开发规范

1. **不要只做静态外观。** 控件应覆盖默认、禁用、加载、异常等真正业务状态。
2. **Story 是可运行说明。** 除自动文档外，交互组件至少一个代表性的 play 场景，后续接入浏览器 CI 后执行。
3. **Token 优先。** 不在组件中写死 Light/Dark 颜色，页面级重置不进入 Tokens 包。
4. **可访问性优先。** 焦点、键盘、ARIA 的取舍要记录；Alert danger/warning 为 assertive，info/success 为 polite。
5. **并非所有框架都值得直接采用。** 第三方库只作为研究/设计依据；如引入代码或图片，先核对具体许可证与兼容性。
6. **可发布不等于已发布。** Storybook 在 Pages 上展示，npm 包发布另走版本和验收流程。

## 下一迭代优先级

- P0：为 Stories 配置 Vitest 浏览器测试，以便 play 真正纳入 CI（需要新增依赖和浏览器运行环境）。
- P0：在真实浏览器验证 Dialog 的 Escape、焦点恢复，以及 Tabs 键盘行为。
- P1：接入 Reka UI 原语实现 Tooltip、Popover、Dropdown 等难以可靠自行实现的交互。
- P1：设计系统文档中增加真实产品页面组合（桌面窗口、管理后台、数据表格）。
- P2：引入可靠的视觉回归方案（Chromatic 或 Playwright 截图），有明确基线及审批策略。

## 重要参考

- Storybook 官方 MDX https://storybook.js.org/docs/writing-docs/mdx/
- 交互测试 https://storybook.js.org/docs/writing-tests/interaction-testing/
- Vitest addon https://storybook.js.org/docs/writing-tests/integrations/vitest-addon/index
- Accessibility addon https://storybook.js.org/docs/writing-tests/accessibility-testing
