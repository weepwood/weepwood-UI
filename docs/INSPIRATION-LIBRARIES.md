# GitHub UI 组件库灵感目录

> 更新：2026-10-25。收录的是第三方仓库元数据、研究方向和链接，不包含第三方组件源码。

本目录与 `apps/playground/src/data/inspiration.ts` 同步。可在 Playground 中筛选、搜索和收藏（浏览器本地保存）。

## 使用原则

- 先研究设计语言、组件 API、无障碍、交互细节和可维护性，再独立实现 Weepwood UI 组件。
- 收藏链接 **不等于获得重新分发许可**。引用或改写第三方代码前，应核查当前分支对应版本的 LICENSE、NOTICE、依赖协议及商用限制。
- PyQt-Fluent-Widgets 与其 C++ 产品不能假定采用相同许可；PrimeVue 旧仓库的维护政策亦需单独核对。
- A/S/B 表示当前研究优先级，不代表项目质量、许可证自由程度或维护水平。

## Vue 3

| 项目 | GitHub | 研究重点 | 优先级 |
|---|---|---|---|
| Reka UI | [unovue/reka-ui](https://github.com/unovue/reka-ui) | 无样式组件、无障碍与键盘交互 | S |
| shadcn-vue | [unovue/shadcn-vue](https://github.com/unovue/shadcn-vue) | 源码分发与可定制组件 | S |
| Inspira UI | [unovue/inspira-ui](https://github.com/unovue/inspira-ui) | 背景特效、动效和卡片 | S |
| Vue Bits | [DavidHDev/vue-bits](https://github.com/DavidHDev/vue-bits) | 文本动画与交互特效 | S |
| Nuxt UI | [nuxt/ui](https://github.com/nuxt/ui) | 组件体系、主题与设计令牌 | A |
| Element Plus | [element-plus/element-plus](https://github.com/element-plus/element-plus) | 企业表单、数据表格与组件设计 | A |
| Naive UI | [tusen-ai/naive-ui](https://github.com/tusen-ai/naive-ui) | TypeScript API 与主题机制 | A |
| Arco Design Vue | [arco-design/arco-design-vue](https://github.com/arco-design/arco-design-vue) | 设计语言与中后台组件 | A |
| Varlet | [varletjs/varlet](https://github.com/varletjs/varlet) | Material 移动与跨端体验 | B |
| VueUse Motion | [vueuse/motion](https://github.com/vueuse/motion) | Vue 动画指令和 composables | A |
| Motion for Vue | [motiondivision/motion-vue](https://github.com/motiondivision/motion-vue) | 声明式动画和布局过渡 | A |
| PrimeVue（旧仓库） | [primefaces/primevue](https://github.com/primefaces/primevue) | 数据交互参考，后续维护政策需复核 | B |

## React

| 项目 | GitHub | 研究重点 | 优先级 |
|---|---|---|---|
| shadcn/ui | [shadcn-ui/ui](https://github.com/shadcn-ui/ui) | Registry、CLI、组件源码分发 | S |
| Mantine | [mantinedev/mantine](https://github.com/mantinedev/mantine) | 应用型组件、Hooks、表单 | A |
| Base UI | [mui/base-ui](https://github.com/mui/base-ui) | 无样式、可访问性和状态管理 | S |
| Radix UI | [radix-ui/primitives](https://github.com/radix-ui/primitives) | 复杂交互原语和焦点管理 | S |
| Ariakit | [ariakit/ariakit](https://github.com/ariakit/ariakit) | WAI-ARIA 与键盘导航 | A |
| MUI | [mui/material-ui](https://github.com/mui/material-ui) | Material 设计系统 | A |
| Ant Design | [ant-design/ant-design](https://github.com/ant-design/ant-design) | 企业级复杂交互 | A |
| Chakra UI | [chakra-ui/chakra-ui](https://github.com/chakra-ui/chakra-ui) | Tokens、组合与主题 | A |
| HeroUI | [heroui-inc/heroui](https://github.com/heroui-inc/heroui) | 现代视觉与交互形式 | A |
| ReUI | [keenthemes/reui](https://github.com/keenthemes/reui) | 看板、数据网格和业务 Blocks | A |
| Fluent UI React | [microsoft/fluentui](https://github.com/microsoft/fluentui) | Fluent 设计与可访问性 | S |

## 动效 / 视觉

| 项目 | GitHub | 研究重点 | 优先级 |
|---|---|---|---|
| React Bits | [DavidHDev/react-bits](https://github.com/DavidHDev/react-bits) | Shader、Canvas 和动画 | S |
| Magic UI | [magicuidesign/magicui](https://github.com/magicuidesign/magicui) | 创意动效和营销视觉 | S |
| Motion Primitives | [ibelick/motion-primitives](https://github.com/ibelick/motion-primitives) | 高级微交互和动画 | S |
| Animate UI | [imskyleen/animate-ui](https://github.com/imskyleen/animate-ui) | 动画组件组合 | A |
| Spectrum UI | [arihantcodes/spectrum-ui](https://github.com/arihantcodes/spectrum-ui) | 组件演示与 Registry | B |

## Qt / WPF / WinUI

| 项目 | GitHub | 研究重点 | 优先级 |
|---|---|---|---|
| Fluent-Qt | [calvinhxx/Fluent-QT](https://github.com/calvinhxx/Fluent-QT) | Qt C++ Fluent 风格组件 | S |
| ElaWidgetTools | [Liniyous/ElaWidgetTools](https://github.com/Liniyous/ElaWidgetTools) | Qt Widget Fluent 控件 | S |
| Qlementine | [oclero/qlementine](https://github.com/oclero/qlementine) | Qt QStyle、控件样式 | S |
| WPF UI | [lepoco/wpfui](https://github.com/lepoco/wpfui) | Windows 11 风格和导航 | S |
| ModernWpf | [Kinnara/ModernWpf](https://github.com/Kinnara/ModernWpf) | WinUI 风格 WPF 控件 | A |
| HandyControl | [HandyOrg/HandyControl](https://github.com/HandyOrg/HandyControl) | WPF 实用型控件 | A |
| MaterialDesignInXamlToolkit | [MaterialDesignInXAML/MaterialDesignInXamlToolkit](https://github.com/MaterialDesignInXAML/MaterialDesignInXamlToolkit) | XAML Material Design | A |
| Windows Community Toolkit | [CommunityToolkit/Windows](https://github.com/CommunityToolkit/Windows) | WinUI 3 原生控件 | A |
| PyQt-Fluent-Widgets | [zhiyiYo/PyQt-Fluent-Widgets](https://github.com/zhiyiYo/PyQt-Fluent-Widgets) | Python Fluent；C++ 版授权另议 | B |

## 底层能力

| 项目 | GitHub | 研究重点 | 优先级 |
|---|---|---|---|
| Floating UI | [floating-ui/floating-ui](https://github.com/floating-ui/floating-ui) | Tooltip 和 Popover 定位 | S |
| TanStack Table | [TanStack/table](https://github.com/TanStack/table) | 数据表、排序和筛选 | A |
| xyflow | [xyflow/xyflow](https://github.com/xyflow/xyflow) | 流程图和节点画布 | A |

## 规划

- [x] 首批 40 个开源项目结构化收录
- [x] 目录筛选、搜索、浏览器本地收藏
- [x] 原创创意组件：WGradientCover / WGlassPanel / WSpotlightCard
- [ ] 自动抓取 GitHub stars、license、最后提交时间（需受控服务端 API 与缓存）
- [ ] 组件视觉快照与无障碍自动化测试
- [ ] 收藏导入导出与跨端同步（需要明确数据存储方案）
- [ ] 经过审核的源码级移植与 attribution 文件
