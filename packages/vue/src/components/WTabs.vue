<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import type { WTabItem } from '../types'

const model = defineModel<string>({ default: '' })
const props = withDefaults(defineProps<{
  items: WTabItem[]
  label?: string
}>(), { label: 'Tabs' })
const root = ref<HTMLElement | null>(null)
const id = useId()
const enabledIndices = computed(() => props.items.flatMap((item, index) => item.disabled ? [] : [index]))
const selectedIndex = computed(() => {
  const match = props.items.findIndex(item => item.value === model.value && !item.disabled)
  return match >= 0 ? match : (enabledIndices.value[0] ?? -1)
})

function select(index: number) {
  if (!props.items[index] || props.items[index].disabled) return
  model.value = props.items[index].value
}
function onKeydown(event: KeyboardEvent, index: number) {
  const enabled = enabledIndices.value
  const current = enabled.indexOf(index)
  if (!enabled.length || current < 0) return
  let target: number
  switch (event.key) {
    case 'ArrowRight': target = enabled[(current + 1) % enabled.length]; break
    case 'ArrowLeft': target = enabled[(current - 1 + enabled.length) % enabled.length]; break
    case 'Home': target = enabled[0]; break
    case 'End': target = enabled[enabled.length - 1]; break
    default: return
  }
  event.preventDefault()
  select(target)
  root.value?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[target]?.focus()
}
</script>

<template>
  <div ref="root" class="wu-tabs">
    <div class="wu-tabs__list" role="tablist" :aria-label="label">
      <button
        v-for="(item, index) in items"
        :id="id + '-tab-' + index"
        :key="item.value"
        type="button"
        role="tab"
        class="wu-tabs__tab"
        :aria-selected="selectedIndex === index"
        :aria-controls="id + '-panel-' + index"
        :tabindex="selectedIndex === index ? 0 : -1"
        :disabled="item.disabled"
        @click="select(index)"
        @keydown="onKeydown($event, index)"
      >{{ item.label }}</button>
    </div>
    <div
      v-for="(item, index) in items"
      v-show="selectedIndex === index"
      :id="id + '-panel-' + index"
      :key="item.value"
      class="wu-tabs__panel"
      role="tabpanel"
      :aria-labelledby="id + '-tab-' + index"
      tabindex="0"
    >
      <slot :name="item.value" :item="item">{{ item.label }}</slot>
    </div>
  </div>
</template>

<style scoped>
.wu-tabs { min-width: 0; color: var(--wu-text); }
.wu-tabs__list { display: flex; flex-wrap: wrap; gap: 4px; border-bottom: 1px solid var(--wu-border); }
.wu-tabs__tab { appearance: none; position: relative; padding: 10px 14px; border: 0; background: transparent; color: var(--wu-text-muted); font-size: 13px; cursor: pointer; border-radius: var(--wu-radius-sm) var(--wu-radius-sm) 0 0; }
.wu-tabs__tab:hover:not(:disabled) { background: var(--wu-surface-hover); color: var(--wu-text); }
.wu-tabs__tab[aria-selected="true"] { color: var(--wu-accent); font-weight: 650; }
.wu-tabs__tab[aria-selected="true"]::after { position: absolute; content: ''; bottom: -1px; left: 8px; right: 8px; height: 2px; background: var(--wu-accent); border-radius: 2px; }
.wu-tabs__tab:disabled { opacity: .45; cursor: not-allowed; }
.wu-tabs__panel { min-height: 48px; padding: 18px 2px; font-size: 13px; }
</style>
