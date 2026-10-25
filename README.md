# Weepwood UI

**个人 Vue 3 组件库 + GitHub 设计灵感资源平台**

以组件化的方式收藏喜欢的设计，研究成熟开源组件的交互与可访问性，并通过 Vue 3 + TypeScript 独立实现可复用组件。**仓库目前为预发布项目，尚未发布至 npm。**

## 当前包含

- **15 个真实 Vue 组件**：Button、Badge、Switch、Input、Card、Checkbox、IconButton、Textarea、Select、Tabs、Dialog、Progress，以及新的 **GradientCover、GlassPanel、SpotlightCard**。
- **40 个 GitHub 开源 UI 项目链接**：Vue 3、React、Motion、Qt/WPF、基础能力；包含研究优先级、方向分类。
- **组件收藏工作台 Playground**：组件预览、资源搜索、按技术栈筛选、浏览器本地收藏、深浅主题、密度切换。
- **Storybook 10.6**：组件 Controls、文档、主题切换，创意组件对应的独立 Stories。
- **Vitest / TypeScript / CI**：组件单测，独立 Library Build，消费端 Playground，Storybook Build。
- **语义 CSS Tokens**：Fluent 风格，原生 CSS，无强制依赖第三方组件库或图片。


## 实时组件 Inspector（当前 PR）

`pnpm dev:playground` → 左侧 **实时调试台**：

- 切换 `WGradientCover`、`WGlassPanel`、`WSpotlightCard`。
- 编辑文本、渐变变体、玻璃模糊强度、阴影和预览尺寸。
- 分别查看 Vue SFC **使用示例**与当前仓库组件的 **真实实现源码**，可复制；URL 参数保存当前参数，可分享并重新打开。
- 主题预设：Blue / Violet / Mint / Coral，支持浅色/深色以及浏览器本地偏好保存。
- 资源目录支持优先级过滤与按名称排序，40 项第三方仓库仅保留外部链接。

Inspector 的「实现源码」直接加载 **本仓库** WGradientCover / WGlassPanel / WSpotlightCard 的 Vue SFC 原始文本，不是第三方库的源码查看器。分享链接只包含 Inspector 当前属性；收藏仍保存在本地浏览器，未经用户操作不会上传。

## 在线预览

Storybook（Pages 需要在仓库设置中启用 GitHub Actions 发布）：

https://weepwood.github.io/weepwood-UI/

组件收藏工作台通过 `pnpm dev:playground` 在本地启动；暂未配置独立线上部署。

## 开发

**环境：** Node.js >= 22.12，pnpm 10.17.1。

```bash
corepack enable
pnpm install --frozen-lockfile
pnpm dev                 # Storybook: http://localhost:6006
pnpm dev:playground      # Vue Playground（Vite 地址见终端）
```

```bash
pnpm typecheck
pnpm test
pnpm build:lib
pnpm build:playground
pnpm build:storybook
pnpm check
```

## 结构

```text
apps/
  playground/             # 个人 UI 工作台及 40 项资源目录
  storybook/              # 源码级组件演示和文档
packages/
  tokens/                 # CSS 设计令牌
  vue/                    # 可独立构建的 Vue 3 组件包
docs/
  INSPIRATION-LIBRARIES.md
  COMPONENTS.md
  DESIGN-SYSTEM.md
  QUALITY-GATES.md
  ROADMAP.md
```

## 在当前 workspace 中使用组件

先执行 `pnpm build:lib`，然后在 pnpm workspace 下：

```vue
<script setup lang="ts">
import { WGradientCover, WGlassPanel, WSpotlightCard } from '@weepwood/ui-vue'
import '@weepwood/tokens/styles.css'
import '@weepwood/ui-vue/styles.css'
</script>

<template>
  <div style="width: 240px">
    <WGradientCover variant="ocean" title="Deep" subtitle="Ocean" />
  </div>
  <WGlassPanel blur="strong" elevated>Frosted surface</WGlassPanel>
  <WSpotlightCard title="Follow the light" />
</template>
```

## 来源和许可原则

这里收藏的第三方项目 **只有链接和研究性描述**，不会自动拉取、捆绑或重新发布其源代码。每个第三方项目保留其各自许可要求。需要复用源码时，必须先确认许可证、版权归属及 NOTICE；商用分发尤其需要复核。参见 [灵感库完整目录](docs/INSPIRATION-LIBRARIES.md)。

Weepwood UI 自有代码以仓库根目录 [MIT License](LICENSE) 为准。

## 开发规范

- Vue 3 `<script setup>` + TypeScript；根据项目实际情况决定样式工具，目前沿用 CSS Tokens + 原生 CSS。
- 优先无障碍语义、键盘操作、`prefers-reduced-motion`；复杂交互必须补充测试。
- Storybook 是展示与文档工具，不代替组件包构建。
- **通过 PR 审查 CI，不自动合并。**

相关文档：[Design System](docs/DESIGN-SYSTEM.md) · [Component Usage](docs/COMPONENTS.md) · [Quality Gates](docs/QUALITY-GATES.md) · [Roadmap](docs/ROADMAP.md)。
