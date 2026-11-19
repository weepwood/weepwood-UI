<script setup lang="ts">
import { computed, onMounted, onUnmounted, ref, watch } from 'vue'
import { WAlert, WBadge, WButton, WCheckbox, WEmpty, WInput } from '@weepwood/ui-vue'
import Glyph from './Glyph.vue'
import Workbench from './Workbench.vue'

const nav = [
  { id: 'overview', label: 'Overview', icon: 'grid' },
  { id: 'components', label: 'Components', icon: 'box' },
  { id: 'inspiration', label: 'Design inspiration', icon: 'palette' },
]
const designs = [
  { id: 'forest', name: 'Forest Studio', tag: 'PRODUCTIVITY', color: '#91e7ba', source: 'shadcn/ui', url: 'https://github.com/shadcn-ui/ui', description: 'Quiet surfaces, soft mint accents, and a little room to breathe.', advice: 'Use a single accent for primary actions. Build workspace cards from simple borders, concise labels, and reusable primitives.' },
  { id: 'signal', name: 'Signal Blue', tag: 'DASHBOARD', color: '#89adff', source: 'Radix Themes', url: 'https://github.com/radix-ui/themes', description: 'Clear hierarchy and cool blue tones for data-rich tools.', advice: 'Use a tonal scale to distinguish the canvas, panels, and interactive states. Keep status colors separate from your brand accent.' },
  { id: 'ember', name: 'Ember Notes', tag: 'EDITORIAL', color: '#f1a984', source: 'Open Props', url: 'https://github.com/argyleink/open-props', description: 'Warm terracotta and layered neutrals for creative spaces.', advice: 'Pair warm surfaces with generous spacing and restrained shadows. Reserve the warm accent for a meaningful next step.' },
] as const
const pageFromHash = () => nav.find(item => `#${item.id}` === location.hash)?.id ?? 'overview'
const page = ref(pageFromHash())
const syncPage = () => { page.value = pageFromHash(); query.value = ''; window.scrollTo(0, 0) }
const dark = ref(true)
const theme = ref<typeof designs[number]['id']>('forest')
const design = computed(() => designs.find(item => item.id === theme.value) ?? designs[0])
watch([dark, theme], () => {
  document.documentElement.dataset.theme = dark.value ? 'dark' : 'light'
  document.documentElement.dataset.studio = theme.value
}, { immediate: true })
const query = ref('')
const search = ref<HTMLInputElement>()
const componentNames = ['Button', 'Badge', 'Switch', 'Input', 'Card', 'Checkbox', 'IconButton', 'Textarea', 'Select', 'Tabs', 'Dialog', 'Progress', 'Alert', 'Empty']
const matches = computed(() => componentNames.filter(name => name.toLowerCase().includes(query.value.trim().toLowerCase().replace(/^w(?=[a-z])/, ''))))
const keydown = (event: KeyboardEvent) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') { event.preventDefault(); search.value?.focus() }
}
onMounted(() => { window.addEventListener('hashchange', syncPage); window.addEventListener('keydown', keydown) })
onUnmounted(() => { window.removeEventListener('hashchange', syncPage); window.removeEventListener('keydown', keydown) })
const done = ref(true)
const project = ref('')
const saved = ref(false)
const added = ref(false)
const destination = ref('')
function openComponent(name: string) {
  const section = `demo-${name.toLowerCase()}`
  query.value = ''
  destination.value = section
  if (page.value === 'components') scrollToDemo()
  else location.hash = 'components'
}
function scrollToDemo() {
  if (!destination.value) return
  const target = document.getElementById(destination.value)
  target?.scrollIntoView({ block: 'start' })
  target?.focus({ preventScroll: true })
  destination.value = ''
}
watch(page, () => { if (page.value === 'components') scrollToDemo() }, { flush: 'post' })
</script>

<template>
  <div class="studio">
    <aside class="sidebar">
      <a class="brand" href="#overview"><span class="brand-mark"><Glyph name="leaf" :size="21" /></span><span>Weepwood <b>UI</b><small>DESIGN SYSTEM</small></span></a>
      <div class="side-content">
        <p class="side-label">WORKSPACE</p>
        <nav aria-label="Workspace">
          <a v-for="item in nav" :key="item.id" :href="`#${item.id}`" :aria-current="page === item.id ? 'page' : undefined"><Glyph :name="item.icon" />{{ item.label }}<span v-if="item.id === 'components'" class="nav-count">14</span></a>
        </nav>
        <p class="side-label resource-label">RESOURCES</p>
        <nav aria-label="Resources">
          <a href="https://github.com/weepwood/weepwood-UI/tree/main/docs"><Glyph name="book" />Documentation <Glyph class="nav-end" name="external" :size="14" /></a>
          <a href="https://github.com/weepwood/weepwood-UI"><Glyph name="github" />GitHub <Glyph class="nav-end" name="external" :size="14" /></a>
        </nav>
      </div>
      <div class="side-foot"><span class="status-dot"></span><div><strong>Weepwood UI</strong><small>v0.1.0 · Preview</small></div></div>
    </aside>

    <div class="studio-body">
      <header class="topbar">
        <div class="breadcrumbs"><span>Workspace</span><Glyph name="chevron" :size="12" /><strong>{{ nav.find(item => item.id === page)?.label }}</strong></div>
        <div class="top-actions">
          <div class="search-wrap" @keydown.esc="query = ''">
            <label class="search"><Glyph name="search" :size="16" /><input ref="search" v-model="query" type="search" placeholder="Search components…" aria-label="Search components" aria-controls="component-results" @keydown.enter.prevent="matches[0] && openComponent(matches[0])"><kbd>⌘ K</kbd></label>
            <div v-show="query.trim()" id="component-results" class="search-results"><button v-for="name in matches" :key="name" @click="openComponent(name)">W{{ name }}<Glyph name="arrow" :size="14" /></button><p v-if="!matches.length">No components found.</p></div>
          </div>
          <button class="theme-toggle" :aria-label="dark ? 'Switch to light mode' : 'Switch to dark mode'" @click="dark = !dark"><Glyph :name="dark ? 'sun' : 'moon'" /></button>
        </div>
      </header>

      <main class="content">
        <section v-if="page === 'overview'" class="hero" aria-labelledby="hero-title">
          <div class="hero-art" aria-hidden="true"></div>
          <div class="hero-content">
            <p class="kicker"><span class="status-dot"></span> VUE 3 DESIGN SYSTEM</p>
            <h1 id="hero-title">Design with intent.<br><em>Build with Weepwood.</em></h1>
            <p class="hero-copy">A Vue component library and design playground for building thoughtful, expressive interfaces.</p>
            <div class="hero-actions"><a class="cta primary" href="#components">Explore components <Glyph name="arrow" :size="17" /></a><a class="cta secondary" href="#inspiration">Design inspiration</a></div>
          </div>
          <span class="art-label" aria-hidden="true">FIG 01 · GROWTH RINGS</span>
        </section>

        <section v-if="page !== 'components'" class="directions" aria-labelledby="directions-title">
          <div class="section-heading"><div><p class="kicker">01 / DESIGN EXPLORATION</p><component :is="page === 'overview' ? 'h2' : 'h1'" id="directions-title">Design inspiration</component><p>Three visual directions, one flexible component system.</p></div><a v-if="page === 'overview'" href="#inspiration">Explore the gallery <Glyph name="arrow" :size="16" /></a></div>
          <div class="direction-grid">
            <button v-for="item in designs" :key="item.id" class="direction-card" :class="[item.id, { selected: theme === item.id }]" :aria-pressed="theme === item.id" @click="theme = item.id">
              <div class="mini-stage" aria-hidden="true" :style="{ '--sample': item.color }">
                <div class="mini-window"><div class="mini-bar"><i></i><i></i><i></i><span></span></div><div class="mini-body"><div class="mini-menu"><i></i><i></i><i></i></div><div class="mini-content"><b></b><i></i><div class="mini-panels"><span><b></b><i></i></span><span><b></b><i></i></span></div></div></div></div>
                <span v-if="theme === item.id" class="selected-chip"><Glyph name="check" :size="12" /> ACTIVE</span>
              </div>
              <div class="direction-info"><span class="card-tag" :style="{ color: item.color }">{{ item.tag }}</span><h3>{{ item.name }} <Glyph name="arrow" :size="16" /></h3><p>{{ item.description }}</p></div>
            </button>
          </div>
          <div v-if="page === 'inspiration'" class="design-notes">
            <div><p class="kicker">ACTIVE DIRECTION</p><h2>{{ design.name }}</h2><p>{{ design.advice }}</p><a :href="design.url">Open-source reference: {{ design.source }} <Glyph name="external" :size="14" /></a></div>
            <div class="token-row"><span v-for="token in ['accent', 'canvas', 'surface', 'border']" :key="token"><i :style="{ background: `var(--wu-${token})` }"></i>{{ token }}</span></div>
          </div>
        </section>

        <section class="component-section" aria-labelledby="component-title" v-if="page !== 'inspiration'">
          <div class="section-heading"><div><p class="kicker">02 / VUE COMPONENTS</p><component :is="page === 'components' ? 'h1' : 'h2'" id="component-title">Component library</component><p>Interactive building blocks, styled by the active direction.</p></div><WBadge v-if="page === 'components'" tone="accent">14 components</WBadge><a v-else href="#components">View all components <Glyph name="arrow" :size="16" /></a></div>
          <div class="sample-grid">
            <article id="demo-button" tabindex="-1"><h3>Buttons</h3><div class="sample-row"><WButton variant="primary" @click="saved = !saved">{{ saved ? 'Saved' : 'Save changes' }}</WButton><WButton variant="secondary" @click="saved = false">Reset</WButton></div></article>
            <article id="demo-input" tabindex="-1"><h3>Inputs</h3><WInput v-model="project" label="Project name" placeholder="e.g. Studio workspace" /></article>
            <article id="demo-checkbox" tabindex="-1"><h3>Selection</h3><WCheckbox v-model="done" label="Enable notifications" /><WBadge id="demo-badge" tabindex="-1" :tone="done ? 'success' : 'neutral'">{{ done ? 'Enabled' : 'Disabled' }}</WBadge></article>
          </div>
          <section v-if="page === 'components'" id="feedback" tabindex="-1" class="feedback">
            <h2>Feedback states</h2>
            <div class="sample-grid feedback-grid"><article id="demo-alert" tabindex="-1"><h3>Alert</h3><WAlert title="Changes saved" tone="success">Your workspace settings are up to date.</WAlert></article><article id="demo-empty" tabindex="-1"><h3>Empty state</h3><WEmpty v-if="!added" title="No projects yet" description="Create a project to start organizing your work."><template #icon><Glyph name="box" /></template><template #actions><WButton variant="primary" @click="added = true">Create example</WButton></template></WEmpty><WAlert v-else title="Example created" tone="success"><WButton size="sm" @click="added = false">Reset example</WButton></WAlert></article></div>
          </section>
          <div v-if="page === 'components'" id="workbench-demo" tabindex="-1"><Workbench /></div>
        </section>
        <footer class="footer"><span>Weepwood UI · Design system</span><a href="https://github.com/weepwood/weepwood-UI">Open source <Glyph name="external" :size="13" /></a></footer>
      </main>
    </div>
  </div>
</template>
