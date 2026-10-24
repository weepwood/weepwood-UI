<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue'
import {
  WBadge, WButton, WCard, WCheckbox, WDialog, WGlassPanel,
  WGradientCover, WInput, WProgress, WSelect, WSpotlightCard, WSwitch, WTabs,
} from '@weepwood/ui-vue'
import { categoryDescriptions, inspirationLibraries, type LibraryCategory } from './data/inspiration'

type Section = 'components' | 'resources' | 'favorites'
type CategoryFilter = 'All' | LibraryCategory

const section = ref<Section>('components')
const category = ref<CategoryFilter>('All')
const query = ref('')
const dark = ref(false)
const compact = ref(false)
const favoriteIds = ref<string[]>([])
const demoName = ref('Weepwood UI')
const demoSelected = ref('normal')
const demoChecked = ref(true)
const demoDialog = ref(false)
const demoCount = ref(0)
const demoProgress = ref(64)
const demoTab = ref('overview')
const copyStatus = ref('复制使用示例')

const palettes = [
  { variant: 'sunset', title: 'Gentle', subtitle: 'Sunset' },
  { variant: 'clay', title: 'Muted', subtitle: 'Clay' },
  { variant: 'ocean', title: 'Deep', subtitle: 'Ocean' },
  { variant: 'forest', title: 'Quiet', subtitle: 'Forest' },
  { variant: 'violet', title: 'Night', subtitle: 'Violet' },
  { variant: 'ember', title: 'Warm', subtitle: 'Ember' },
] as const
const categoryOptions: CategoryFilter[] = ['All', 'Vue', 'React', 'Motion', 'Desktop', 'Foundation']
const densityOptions = [
  { label: 'Normal', value: 'normal' },
  { label: 'Comfortable', value: 'comfortable' },
  { label: 'Compact', value: 'compact' },
]
const demoTabs = [
  { label: 'Overview', value: 'overview' },
  { label: 'Activity', value: 'activity' },
]

const filteredLibraries = computed(() => inspirationLibraries.filter(item => {
  if (section.value === 'favorites' && !favoriteIds.value.includes(item.id)) return false
  if (category.value !== 'All' && item.category !== category.value) return false
  const term = query.value.trim().toLowerCase()
  return !term || [item.name, item.repo, item.category, item.focus].some(value => value.toLowerCase().includes(term))
}))

const categoryCounts = computed(() => Object.fromEntries(
  categoryOptions.map(item => [item, item === 'All'
    ? inspirationLibraries.length
    : inspirationLibraries.filter(source => source.category === item).length]),
))

onMounted(() => {
  try {
    const stored = JSON.parse(localStorage.getItem('weepwood-ui-favorites-v1') || '[]')
    if (Array.isArray(stored)) {
      favoriteIds.value = stored.filter((value): value is string => typeof value === 'string')
    }
  } catch { /* Disabled storage must not prevent browsing. */ }
})

watch(favoriteIds, ids => {
  try { localStorage.setItem('weepwood-ui-favorites-v1', JSON.stringify(ids)) } catch { /* ignored */ }
}, { deep: true })

watch(dark, value => { document.documentElement.dataset.theme = value ? 'dark' : 'light' }, { immediate: true })
watch([compact, demoSelected], () => {
  document.documentElement.dataset.density = compact.value ? 'compact' : demoSelected.value
}, { immediate: true })

function navigate(next: Section) {
  section.value = next
  category.value = 'All'
  query.value = ''
}
function toggleFavorite(id: string) {
  favoriteIds.value = favoriteIds.value.includes(id)
    ? favoriteIds.value.filter(value => value !== id)
    : [...favoriteIds.value, id]
}
async function copyExample() {
  const snippet = `import { WGradientCover } from '@weepwood/ui-vue'
import '@weepwood/tokens/styles.css'
import '@weepwood/ui-vue/styles.css'

// Vue template:
// <WGradientCover variant="ocean" title="Deep" subtitle="Ocean" />`
  try {
    await navigator.clipboard.writeText(snippet)
    copyStatus.value = '已复制'
  } catch { copyStatus.value = '复制失败，请使用 Storybook 源码示例' }
}
</script>

<template>
  <div class="atlas">
    <aside class="atlas__sidebar">
      <a class="atlas__brand" href="https://github.com/weepwood/weepwood-UI" target="_blank" rel="noopener noreferrer">
        <span class="atlas__logo" aria-hidden="true">W</span>
        <span><strong>Weepwood UI</strong><small>Personal Design System</small></span>
      </a>
      <div class="atlas__section-label">WORKSPACE</div>
      <nav aria-label="主导航" class="atlas__nav">
        <button type="button" :class="{ active: section === 'components' }" :aria-current="section === 'components' ? 'page' : undefined" @click="navigate('components')">
          <span aria-hidden="true">◈</span> 组件实验室 <em>15</em>
        </button>
        <button type="button" :class="{ active: section === 'resources' }" :aria-current="section === 'resources' ? 'page' : undefined" @click="navigate('resources')">
          <span aria-hidden="true">▦</span> 灵感资源库 <em>{{ inspirationLibraries.length }}</em>
        </button>
        <button type="button" :class="{ active: section === 'favorites' }" :aria-current="section === 'favorites' ? 'page' : undefined" @click="navigate('favorites')">
          <span aria-hidden="true">♡</span> 我的收藏 <em>{{ favoriteIds.length }}</em>
        </button>
      </nav>
      <div class="atlas__section-label atlas__section-label--space">PREFERENCES</div>
      <div class="atlas__settings">
        <WSwitch v-model="dark" label="深色主题" />
        <WSwitch v-model="compact" label="紧凑模式" />
      </div>
      <div class="atlas__sidebar-foot">
        <span class="atlas__status-dot" /> Vue 3 · TypeScript · Storybook
        <small>原创实现 · 引用来源保留原仓库链接</small>
      </div>
    </aside>

    <main class="atlas__main">
      <header class="atlas__topbar">
        <div class="atlas__crumb">WEEPWOOD <span>/</span> {{ section === 'components' ? 'COMPONENT LAB' : section === 'favorites' ? 'SAVED RESOURCES' : 'INSPIRATION' }}</div>
        <div class="atlas__top-actions">
          <WBadge tone="accent">v0.2 · preview</WBadge>
          <a href="https://github.com/weepwood/weepwood-UI" target="_blank" rel="noopener noreferrer" class="atlas__github">GitHub ↗</a>
        </div>
      </header>

      <template v-if="section === 'components'">
        <div class="atlas__hero">
          <div class="atlas__hero-ambient" aria-hidden="true" />
          <div class="atlas__hero-body">
            <p class="atlas__overline">YOUR PERSONAL UI COLLECTION</p>
            <h1>设计灵感，<br /><span>沉淀为组件。</span></h1>
            <p class="atlas__hero-description">从开源组件库汲取灵感，以独立的 Vue 3 实现和 Storybook 示例，逐步建立自己的可复用设计语言。</p>
            <div class="atlas__hero-actions">
              <WButton variant="primary" @click="navigate('resources')">探索 40 个参考仓库 →</WButton>
              <a href="https://github.com/weepwood/weepwood-UI/tree/main/apps/storybook" target="_blank" rel="noopener noreferrer">查看 Storybook 源码 ↗</a>
            </div>
          </div>
          <WGlassPanel class="atlas__hero-note" blur="strong" elevated>
            <span class="atlas__hero-note-icon">✦</span>
            <strong>Build your own.</strong>
            <span>Collect · Explore · Rebuild</span>
          </WGlassPanel>
        </div>

        <div class="atlas__metrics" aria-label="资源概览">
          <div><strong>15</strong><span>可复用组件</span></div>
          <div><strong>03</strong><span>新增创意组件</span></div>
          <div><strong>{{ inspirationLibraries.length }}</strong><span>GitHub 参考仓库</span></div>
          <div><strong>06</strong><span>渐变封面主题</span></div>
        </div>

        <section class="atlas__section">
          <div class="atlas__heading">
            <div><p class="atlas__overline">CREATIVE COMPONENTS / 01</p><h2>柔和颗粒渐变</h2><p>6 组色系，CSS 多层渐变叠加 Canvas 噪点，无需任何图片资源。</p></div>
            <WButton size="sm" @click="copyExample">{{ copyStatus }}</WButton>
          </div>
          <div class="atlas__cover-grid">
            <div v-for="palette in palettes" :key="palette.variant" class="atlas__cover-item">
              <WGradientCover :variant="palette.variant" :title="palette.title" :subtitle="palette.subtitle" />
              <div class="atlas__cover-label"><span>{{ palette.variant }}</span><small>WGradientCover</small></div>
            </div>
          </div>
        </section>

        <section class="atlas__section">
          <div class="atlas__heading">
            <div><p class="atlas__overline">CREATIVE COMPONENTS / 02</p><h2>质感与交互</h2><p>两种轻量视觉原语，支持深浅主题、键盘焦点与减少动态效果设置。</p></div>
          </div>
          <div class="atlas__effect-grid">
            <div class="atlas__effect-demo atlas__effect-demo--glass">
              <WGlassPanel blur="strong" elevated class="atlas__glass-demo">
                <span class="atlas__pill">FROSTED SURFACE</span>
                <h3>Glass Panel</h3>
                <p>原生 backdrop-filter，颜色跟随语义化设计令牌。</p>
                <WButton size="sm" variant="primary" @click="demoDialog = true">打开示例</WButton>
              </WGlassPanel>
              <small>WGlassPanel</small>
            </div>
            <div class="atlas__effect-demo atlas__effect-demo--spot">
              <WSpotlightCard title="Follow the light" description="移动鼠标或使用 Tab 聚焦，探索轻量的光晕反馈。" />
              <small>WSpotlightCard</small>
            </div>
          </div>
        </section>

        <section class="atlas__section">
          <div class="atlas__heading"><div><p class="atlas__overline">FOUNDATION COMPONENTS / 03</p><h2>基础组件工作台</h2><p>在真实使用场景中调试表单、按钮、导航和反馈。</p></div></div>
          <div class="atlas__foundation-grid">
            <WCard title="Actions" elevated>
              <div class="atlas__control-stack">
                <div class="atlas__button-row">
                  <WButton variant="primary" @click="demoCount++">点击 {{ demoCount }} 次</WButton>
                  <WButton @click="demoDialog = true">Dialog</WButton>
                  <WButton variant="ghost">Ghost</WButton>
                </div>
                <WProgress :value="demoProgress" label="Build progress" show-value />
                <div class="atlas__button-row">
                  <WButton size="sm" @click="demoProgress = Math.max(0, demoProgress - 10)">−10%</WButton>
                  <WButton size="sm" @click="demoProgress = Math.min(100, demoProgress + 10)">+10%</WButton>
                </div>
              </div>
            </WCard>
            <WCard title="Controls">
              <div class="atlas__control-stack">
                <WInput v-model="demoName" label="Workspace name" />
                <WSelect v-model="demoSelected" label="Density" :options="densityOptions" />
                <WCheckbox v-model="demoChecked" label="启用本地编辑" />
              </div>
            </WCard>
            <WCard title="Navigation" class="atlas__foundation-wide">
              <WTabs v-model="demoTab" label="Workspace views" :items="demoTabs">
                <template #overview><p>当前项目：{{ demoName }}</p></template>
                <template #activity><p>已执行 {{ demoCount }} 次演示操作。</p></template>
              </WTabs>
            </WCard>
          </div>
        </section>
      </template>

      <template v-else>
        <div class="atlas__library-head">
          <p class="atlas__overline">CURATED OPEN SOURCE / GITHUB</p>
          <h1>{{ section === 'favorites' ? '我的收藏' : '组件灵感资源库' }}<span>.</span></h1>
          <p>筛选 40 个开源组件库。记录研究重点和官方仓库链接；借鉴实现思路，不自动复制第三方源码。</p>
        </div>
        <div class="atlas__filters">
          <label class="atlas__search">
            <span aria-hidden="true">⌕</span>
            <span class="sr-only">搜索仓库名称、分类或研究重点</span>
            <input v-model="query" type="search" placeholder="搜索仓库、技术栈、研究方向…" />
          </label>
          <div class="atlas__chips" aria-label="按技术分类筛选">
            <button v-for="item in categoryOptions" :key="item" type="button"
              :aria-pressed="category === item" :class="{ selected: category === item }" @click="category = item">
              {{ item === 'All' ? '全部' : item }} <span>{{ categoryCounts[item] }}</span>
            </button>
          </div>
        </div>
        <div class="atlas__library-summary">
          <span>展示 <strong>{{ filteredLibraries.length }}</strong> 个项目</span>
          <span>♡ 收藏记录仅保存在当前浏览器</span>
        </div>
        <div v-if="filteredLibraries.length" class="atlas__source-grid">
          <article v-for="item in filteredLibraries" :key="item.id" class="atlas__source-card">
            <div class="atlas__source-card-top">
              <span class="atlas__source-avatar" :data-category="item.category" aria-hidden="true">{{ item.name.charAt(0).toUpperCase() }}</span>
              <button type="button" class="atlas__favorite" :class="{ saved: favoriteIds.includes(item.id) }"
                :aria-label="favoriteIds.includes(item.id) ? '取消收藏 ' + item.name : '收藏 ' + item.name"
                :aria-pressed="favoriteIds.includes(item.id)" @click="toggleFavorite(item.id)">
                {{ favoriteIds.includes(item.id) ? '♥' : '♡' }}
              </button>
            </div>
            <a class="atlas__source-title" :href="item.url" target="_blank" rel="noopener noreferrer">{{ item.name }} <span>↗</span></a>
            <div class="atlas__source-path">{{ item.repo }}</div>
            <p>{{ item.focus }}</p>
            <div class="atlas__source-meta">
              <span>{{ item.category }}</span>
              <span>{{ item.priority }} 级研究优先级</span>
            </div>
          </article>
        </div>
        <div v-else class="atlas__empty"><strong>没有匹配的项目</strong><p>试试其他分类或搜索关键词。</p><WButton @click="category = 'All'; query = ''">清除筛选</WButton></div>
        <p class="atlas__license-note">许可说明：这里只保存第三方仓库元数据与链接。引入、改写或再分发任何组件前，应核查具体版本许可证、版权声明及依赖许可。部分项目具有特别的 C++ 授权或维护政策。</p>
        <div class="atlas__category-guide">
          <strong>研究路线</strong>
          <p v-for="(description, key) in categoryDescriptions" :key="key"><b>{{ key }}</b> — {{ description }}</p>
        </div>
      </template>

      <footer class="atlas__footer">WEEPWOOD UI · PERSONAL COMPONENT WORKSPACE · BUILT WITH VUE 3</footer>
    </main>

    <WDialog v-model="demoDialog" title="Glass Panel demo">
      这是 Weepwood UI 的原生组件演示。使用 Escape 或关闭按钮可以退出。
      <template #footer><WButton variant="primary" @click="demoDialog = false">关闭</WButton></template>
    </WDialog>
  </div>
</template>
