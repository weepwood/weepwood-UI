# 设计灵感与落地方案

运行 `pnpm dev:playground`，在 Design inspiration 中选择方案，再到 Components 中查看同一套 Vue 组件的表现。每个方案可独立切换明暗模式；预设只作用于 Playground，不改变发布包的默认主题。

| 方案 | 适用场景 | 设计手法 | 开源参考 |
| --- | --- | --- | --- |
| Forest Studio | 工作空间、个人效率工具 | 薄荷绿只用于选中态和主操作；内容用细边框与低对比背景分层 | [shadcn/ui](https://github.com/shadcn-ui/ui)：组合式组件、克制的表面层级 |
| Signal Blue | 监控台、运营看板 | 冷蓝区分可交互项，画布与面板用不同明度；错误/成功保留独立语义色 | [Radix Themes](https://github.com/radix-ui/themes)：按用途分配调色板与交互状态 |
| Ember Notes | 笔记、内容编辑器 | 暖色中性表面加陶土强调，扩大留白，让文本而非操作控件成为焦点 | [Open Props](https://github.com/argyleink/open-props)：以 CSS 变量组合色彩、间距和阴影 |

这些项目用于参考设计方法，示例没有引入其运行时依赖或复制其组件代码。

## 可复用页面方案

- **设置页**：以 `WTabs` 划分设置项，`WInput`/`WSwitch` 管理配置，用 `WAlert` 在保存区说明结果。静态提示不需要 live region；异步通知可使用预先挂载的 `live="polite"` 提示区域。
- **项目首页**：无项目时使用 `WEmpty` 提供创建入口；搜索无结果时改为清除筛选，不把加载失败当作空状态。已有数据时用 `WCard` 展示概要，用 `WBadge` 标记状态。
- **上传面板**：用 `WProgress` 显示进度；失败后在进度旁展示 `WAlert tone="danger"`，并提供重试。不要仅用色彩传达结果。

## 下一轮组件建议

1. **Skeleton**：给列表与详情页预留稳定布局；遵循减少动态效果偏好，并由内容区域管理 `aria-busy`。
2. **Accordion**：整理帮助和设置细项；先交付原生按钮、展开状态与键盘测试。
3. **Data table**：从语义表格、排序和空状态起步；把虚拟滚动、列拖动推迟到实际用例验证后。
