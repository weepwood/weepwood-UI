<script setup lang="ts">
import { computed, onMounted, reactive, ref } from 'vue'
import { WButton, WGlassPanel, WGradientCover, WSpotlightCard } from '@weepwood/ui-vue'
import {
  componentChoices, coverChoices, createStudioLink, createVueSnippet,
  glassChoices, readStudioState, studioDefaults,
  type StudioComponent, type StudioState, type CoverVariant, type GlassBlur,
} from '../data/studio'
import './component-studio.css'

const state = reactive<StudioState>({ ...studioDefaults })
const notice = ref('')
const codeOpen = ref(true)
const snippet = computed(() => createVueSnippet(state))

onMounted(() => {
  const linked = readStudioState(window.location.search)
  if (linked) Object.assign(state, linked)
})

function chooseComponent(component: StudioComponent) {
  Object.assign(state, { ...studioDefaults, component })
  if (component === 'glass') state.title = 'Frosted surface'
  if (component === 'spotlight') state.title = 'Follow the light'
  notice.value = ''
}
function reset() { chooseComponent(state.component) }
async function copy(text: string, label: string) {
  try {
    await navigator.clipboard.writeText(text)
    notice.value = label + '已复制到剪贴板'
  } catch {
    notice.value = '复制不可用：请手动选择下方的代码，或在安全上下文中打开页面。'
  }
}
function share() { void copy(createStudioLink(window.location.href, state), '分享链接') }
function updateWidth(event: Event) {
  const number = Number((event.target as HTMLInputElement).value)
  if (Number.isFinite(number)) state.width = Math.round(Math.max(220, Math.min(440, number)))
}
function updateTitle(event: Event) { state.title = (event.target as HTMLInputElement).value.slice(0, 100) }
function updateSubtitle(event: Event) { state.subtitle = (event.target as HTMLInputElement).value.slice(0, 100) }
function updateDescription(event: Event) { state.description = (event.target as HTMLTextAreaElement).value.slice(0, 180) }
function updateVariant(event: Event) { state.variant = (event.target as HTMLSelectElement).value as CoverVariant }
function updateBlur(event: Event) { state.blur = (event.target as HTMLSelectElement).value as GlassBlur }
function updateElevated(event: Event) { state.elevated = (event.target as HTMLInputElement).checked }
</script>

<template>
  <section class="studio">
    <header class="studio__header">
      <p class="atlas__overline">COMPONENT STUDIO / LIVE INSPECTOR</p>
      <div class="studio__headline">
        <div>
          <h1>组件调试台<span>.</span></h1>
          <p>调整真实 Vue 组件属性，实时预览变化，复制即可使用的 Vue SFC 示例。</p>
        </div>
        <WButton size="sm" variant="secondary" @click="reset">重置属性</WButton>
      </div>
    </header>
    <nav class="studio__switcher" aria-label="选择预览组件">
      <button v-for="choice in componentChoices" :key="choice.id" type="button"
        :class="{ 'studio__switcher--active': choice.id === state.component }"
        :aria-pressed="choice.id === state.component" @click="chooseComponent(choice.id)">
        <span>{{ choice.label }}</span><small>{{ choice.description }}</small>
      </button>
    </nav>

    <div class="studio__layout">
      <div class="studio__main-column">
        <section class="studio__preview">
          <div class="studio__preview-head">
            <div><strong>LIVE PREVIEW</strong><span>交互组件 · 原生渲染</span></div>
            <span>{{ state.width }}px</span>
          </div>
          <div class="studio__canvas">
            <div class="studio__canvas-grid" aria-hidden="true" />
            <div class="studio__canvas-content" :style="{ width: state.width + 'px' }">
              <WGradientCover v-if="state.component === 'gradient'" :variant="state.variant" :title="state.title" :subtitle="state.subtitle" />
              <div v-else-if="state.component === 'glass'" class="studio__glass-background">
                <WGlassPanel :blur="state.blur" :elevated="state.elevated" class="studio__glass-sample">
                  <span class="studio__eyebrow">FROSTED SURFACE</span>
                  <h3>{{ state.title }}</h3>
                  <p>Glass, light and semantic tokens.</p>
                </WGlassPanel>
              </div>
              <WSpotlightCard v-else :title="state.title" :description="state.description" />
            </div>
          </div>
          <div class="studio__preview-bottom">自动适应深浅主题 · 不加载外部图片 · 可使用 Tab 测试焦点</div>
        </section>

        <section class="studio__code-section">
          <div class="studio__code-header">
            <div><strong>VUE COMPONENT SOURCE</strong><small>可复制的组件使用示例（非第三方仓库原始源码）</small></div>
            <div class="studio__code-actions">
              <button type="button" :aria-expanded="codeOpen" @click="codeOpen = !codeOpen">{{ codeOpen ? '收起' : '展开' }}</button>
              <button type="button" @click="void copy(snippet, '代码')">复制代码</button>
            </div>
          </div>
          <pre v-if="codeOpen" tabindex="0"><code>{{ snippet }}</code></pre>
        </section>
      </div>

      <aside class="studio__inspector">
        <div class="studio__inspector-title">
          <div><strong>PROPERTIES</strong><small>实时属性控制</small></div>
          <span>◫</span>
        </div>
        <div class="studio__fields">
          <label class="studio__field">
            <span>标题文字 <em>title</em></span>
            <input :value="state.title" maxlength="100" type="text" @input="updateTitle" />
          </label>
          <template v-if="state.component === 'gradient'">
            <label class="studio__field">
              <span>第二行文字 <em>subtitle</em></span>
              <input :value="state.subtitle" maxlength="100" type="text" @input="updateSubtitle" />
            </label>
            <label class="studio__field">
              <span>渐变配色 <em>variant</em></span>
              <select :value="state.variant" @change="updateVariant">
                <option v-for="variant in coverChoices" :key="variant" :value="variant">{{ variant }}</option>
              </select>
            </label>
          </template>
          <template v-if="state.component === 'glass'">
            <label class="studio__field">
              <span>模糊强度 <em>blur</em></span>
              <select :value="state.blur" @change="updateBlur">
                <option v-for="blur in glassChoices" :key="blur" :value="blur">{{ blur }}</option>
              </select>
            </label>
            <label class="studio__checkbox">
              <input type="checkbox" :checked="state.elevated" @change="updateElevated" />
              <span>启用浮起阴影</span>
            </label>
          </template>
          <label v-if="state.component === 'spotlight'" class="studio__field">
            <span>说明 <em>description</em></span>
            <textarea :value="state.description" maxlength="180" rows="4" @input="updateDescription" />
          </label>
          <label class="studio__field studio__slider">
            <span>预览宽度 <em>{{ state.width }}px</em></span>
            <input type="range" :value="state.width" min="220" max="440" step="10" @input="updateWidth" />
            <span class="studio__slider-limits"><small>220px</small><small>440px</small></span>
          </label>
        </div>

        <div class="studio__inspector-footer">
          <WButton variant="primary" @click="share">复制分享链接</WButton>
          <WButton variant="secondary" @click="void copy(snippet, '代码')">复制 Vue 代码</WButton>
          <p role="status" aria-live="polite">{{ notice || '分享链接包含当前组件属性，可在其他浏览器打开。' }}</p>
        </div>
      </aside>
    </div>

    <section class="studio__guide">
      <h2>如何使用</h2>
      <p>这里展示的是 Weepwood UI 已实现的真实组件。左侧展示渲染结果，右侧参数面板直接修改组件 props；生成的 Vue 代码使用工作区内的 <code>@weepwood/ui-vue</code> 包。分享链接仅使用 URL 参数，不上传文字或收藏数据。</p>
    </section>
  </section>
</template>
