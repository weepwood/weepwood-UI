/**
 * Curated references are links and metadata only: no third-party source code is vendored.
 * License and maintenance status must be reviewed at the upstream repository before reuse.
 */
export type LibraryCategory = 'Vue' | 'React' | 'Motion' | 'Desktop' | 'Foundation'
export type LibraryPriority = 'S' | 'A' | 'B'
export interface InspirationLibrary {
  id: string
  name: string
  repo: string
  url: string
  category: LibraryCategory
  focus: string
  priority: LibraryPriority
}

export const categoryDescriptions: Record<LibraryCategory, string> = {
  "Vue": "Vue 3 组件与生态",
  "React": "React 设计系统",
  "Motion": "动画与创意视觉",
  "Desktop": "Qt · WPF · WinUI",
  "Foundation": "跨框架底层能力"
}

const sources: [LibraryCategory, string, string, string, LibraryPriority][] = [
  [
    "Vue",
    "Reka UI",
    "unovue/reka-ui",
    "无样式组件、无障碍与键盘交互",
    "S"
  ],
  [
    "Vue",
    "shadcn-vue",
    "unovue/shadcn-vue",
    "源码分发与可定制组件",
    "S"
  ],
  [
    "Vue",
    "Inspira UI",
    "unovue/inspira-ui",
    "背景特效、动效和卡片",
    "S"
  ],
  [
    "Vue",
    "Vue Bits",
    "DavidHDev/vue-bits",
    "文本动画与交互特效",
    "S"
  ],
  [
    "Vue",
    "Nuxt UI",
    "nuxt/ui",
    "组件体系、主题与设计令牌",
    "A"
  ],
  [
    "Vue",
    "Element Plus",
    "element-plus/element-plus",
    "企业表单、数据表格与组件设计",
    "A"
  ],
  [
    "Vue",
    "Naive UI",
    "tusen-ai/naive-ui",
    "TypeScript API 与主题机制",
    "A"
  ],
  [
    "Vue",
    "Arco Design Vue",
    "arco-design/arco-design-vue",
    "设计语言与中后台组件",
    "A"
  ],
  [
    "Vue",
    "Varlet",
    "varletjs/varlet",
    "Material 移动与跨端体验",
    "B"
  ],
  [
    "Vue",
    "VueUse Motion",
    "vueuse/motion",
    "Vue 动画指令和 composables",
    "A"
  ],
  [
    "Vue",
    "Motion for Vue",
    "motiondivision/motion-vue",
    "声明式动画和布局过渡",
    "A"
  ],
  [
    "Vue",
    "PrimeVue（旧仓库）",
    "primefaces/primevue",
    "数据交互参考，后续维护政策需复核",
    "B"
  ],
  [
    "React",
    "shadcn/ui",
    "shadcn-ui/ui",
    "Registry、CLI、组件源码分发",
    "S"
  ],
  [
    "React",
    "Mantine",
    "mantinedev/mantine",
    "应用型组件、Hooks、表单",
    "A"
  ],
  [
    "React",
    "Base UI",
    "mui/base-ui",
    "无样式、可访问性和状态管理",
    "S"
  ],
  [
    "React",
    "Radix UI",
    "radix-ui/primitives",
    "复杂交互原语和焦点管理",
    "S"
  ],
  [
    "React",
    "Ariakit",
    "ariakit/ariakit",
    "WAI-ARIA 与键盘导航",
    "A"
  ],
  [
    "React",
    "MUI",
    "mui/material-ui",
    "Material 设计系统",
    "A"
  ],
  [
    "React",
    "Ant Design",
    "ant-design/ant-design",
    "企业级复杂交互",
    "A"
  ],
  [
    "React",
    "Chakra UI",
    "chakra-ui/chakra-ui",
    "Tokens、组合与主题",
    "A"
  ],
  [
    "React",
    "HeroUI",
    "heroui-inc/heroui",
    "现代视觉与交互形式",
    "A"
  ],
  [
    "React",
    "ReUI",
    "keenthemes/reui",
    "看板、数据网格和业务 Blocks",
    "A"
  ],
  [
    "React",
    "Fluent UI React",
    "microsoft/fluentui",
    "Fluent 设计与可访问性",
    "S"
  ],
  [
    "Motion",
    "React Bits",
    "DavidHDev/react-bits",
    "Shader、Canvas 和动画",
    "S"
  ],
  [
    "Motion",
    "Magic UI",
    "magicuidesign/magicui",
    "创意动效和营销视觉",
    "S"
  ],
  [
    "Motion",
    "Motion Primitives",
    "ibelick/motion-primitives",
    "高级微交互和动画",
    "S"
  ],
  [
    "Motion",
    "Animate UI",
    "imskyleen/animate-ui",
    "动画组件组合",
    "A"
  ],
  [
    "Motion",
    "Spectrum UI",
    "arihantcodes/spectrum-ui",
    "组件演示与 Registry",
    "B"
  ],
  [
    "Desktop",
    "Fluent-Qt",
    "calvinhxx/Fluent-QT",
    "Qt C++ Fluent 风格组件",
    "S"
  ],
  [
    "Desktop",
    "ElaWidgetTools",
    "Liniyous/ElaWidgetTools",
    "Qt Widget Fluent 控件",
    "S"
  ],
  [
    "Desktop",
    "Qlementine",
    "oclero/qlementine",
    "Qt QStyle、控件样式",
    "S"
  ],
  [
    "Desktop",
    "WPF UI",
    "lepoco/wpfui",
    "Windows 11 风格和导航",
    "S"
  ],
  [
    "Desktop",
    "ModernWpf",
    "Kinnara/ModernWpf",
    "WinUI 风格 WPF 控件",
    "A"
  ],
  [
    "Desktop",
    "HandyControl",
    "HandyOrg/HandyControl",
    "WPF 实用型控件",
    "A"
  ],
  [
    "Desktop",
    "MaterialDesignInXamlToolkit",
    "MaterialDesignInXAML/MaterialDesignInXamlToolkit",
    "XAML Material Design",
    "A"
  ],
  [
    "Desktop",
    "Windows Community Toolkit",
    "CommunityToolkit/Windows",
    "WinUI 3 原生控件",
    "A"
  ],
  [
    "Desktop",
    "PyQt-Fluent-Widgets",
    "zhiyiYo/PyQt-Fluent-Widgets",
    "Python Fluent；C++ 版授权另议",
    "B"
  ],
  [
    "Foundation",
    "Floating UI",
    "floating-ui/floating-ui",
    "Tooltip 和 Popover 定位",
    "S"
  ],
  [
    "Foundation",
    "TanStack Table",
    "TanStack/table",
    "数据表、排序和筛选",
    "A"
  ],
  [
    "Foundation",
    "xyflow",
    "xyflow/xyflow",
    "流程图和节点画布",
    "A"
  ]
]

export const inspirationLibraries: InspirationLibrary[] = sources.map(([category, name, repo, focus, priority]) => ({
  id: repo.toLowerCase(),
  name,
  repo,
  url: 'https://github.com/' + repo,
  category,
  focus,
  priority,
}))
