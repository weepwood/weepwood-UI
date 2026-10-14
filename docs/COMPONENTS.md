# Weepwood UI components

The workspace exports **16 Vue 3 components** from `@weepwood/ui-vue`. Import the design tokens and generated component stylesheet once, near the application entry:

```ts
import '@weepwood/tokens/styles.css'
import '@weepwood/ui-vue/styles.css'
```

The package is not on npm. During development, use the pnpm workspace and run `pnpm build:lib`.

| Component | Purpose | Key API |
| --- | --- | --- |
| WButton | General actions | `variant`, `size`, `loading`, `disabled`, `type` |
| WIconButton | Icon-only actions | required `label` (accessible name), `variant`, `size` |
| WBadge | Status indicators | `tone` |
| WSwitch | Boolean switch | `v-model`, `label`, `disabled` |
| WCheckbox | Native checkbox | `v-model`, `label`, `disabled` |
| WInput | Text entry | `v-model`, `label`, `hint`, `error`, `type` |
| WTextarea | Multiline entry | `v-model`, `label`, `rows`, `error` |
| WSelect | Native dropdown | `v-model`, `options`, `placeholder`, `error` |
| WCard | Surface & layout | `title`, `padded`, `elevated`; `header`, `footer` slots |
| WTabs | Tab navigation | `v-model`, `items`, named panel slots |
| WDialog | Modal | `v-model` (boolean), required `title`, `footer` slot |
| WProgress | Determinate progress | `value`, `max`, `label`, `showValue` |
| WAlert | Inline feedback | `tone`, `title`, `dismissible`, `@dismiss` |
| WSeparator | Thematic separator | `orientation`, `decorative` |
| WSkeleton | Decorative loading placeholder | `width`, `height`, `shape`, `animated` |
| WEmptyState | Blank data collection | required `title`, `description`, `icon` / `action` slots |

## Select & Tabs types

`WSelectOption` = `{ label: string; value: string; disabled?: boolean }`

`WTabItem` = `{ label: string; value: string; disabled?: boolean }`

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { WTabs, WSelect } from '@weepwood/ui-vue'
const selected = ref('general')
const tabs = [
  { label: 'General', value: 'general' },
  { label: 'Advanced', value: 'advanced' },
]
</script>
<template>
  <WTabs v-model="selected" :items="tabs" label="Settings sections">
    <template #general>General panel content</template>
    <template #advanced>Advanced panel content</template>
  </WTabs>
  <WSelect v-model="selected" label="Section" :options="tabs" />
</template>
```

`WTabs` uses automatic activation: Left / Right arrows move and select tabs, Home / End select the first / last enabled tab. Disabled tabs are skipped.

`WDialog` is based on the native `<dialog>` API (focus management, Escape behavior and modal backdrop are browser-provided). It is intended for current mainstream browsers/WebView2. The consumer controls it via a boolean `v-model`; the close button and Escape update that model.

## Visual themes

Set `document.documentElement.dataset.theme = 'dark'` for dark mode or `'light'` for the default. Set `document.documentElement.dataset.density = 'compact'` for compact controls, independently of the color theme.

## Accessibility expectations

- Use a meaningful `label` on icon buttons and progress bars.
- Provide a `label` to input fields (placeholder is not a label).
- Pass `error` when invalid; the control gains `aria-invalid` and help-text association.
- Always supply unique tab values and a matching named slot for each tab panel.
- Test interactive components via keyboard, not only mouse.

## Loading and feedback patterns

`WSkeleton` is always decorative (`aria-hidden=true`). Apply `aria-busy` to the containing region and give it an accessible label; replace skeletons with real data when loading finishes. `WAlert` emits `dismiss` rather than removing itself so consuming applications retain state ownership. `WEmptyState` is a reusable semantic `<section>` whose icon slot is decorative and action slot remains keyboard accessible.
