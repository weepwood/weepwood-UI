<script setup lang="ts">
import { computed, ref, useId } from 'vue'
import type { WSegmentedOption } from '../types'

const model = defineModel<string>({ default: '' })
const props = withDefaults(defineProps<{
  options: WSegmentedOption[]
  label?: string
  disabled?: boolean
}>(), { label: '选择选项', disabled: false })

const root = ref<HTMLElement | null>(null)
const groupId = useId()
const enabled = computed(() => props.options.flatMap((option, index) =>
  props.disabled || option.disabled ? [] : [index]))
const selected = computed(() => {
  const index = props.options.findIndex(option => option.value === model.value && !option.disabled)
  return enabled.value.includes(index) ? index : (enabled.value[0] ?? -1)
})

function select(index: number) {
  if (props.disabled || !props.options[index] || props.options[index].disabled) return
  model.value = props.options[index].value
}
function keydown(event: KeyboardEvent, index: number) {
  const indices = enabled.value
  const current = indices.indexOf(index)
  if (current < 0) return
  let next: number
  switch (event.key) {
    case 'ArrowRight': case 'ArrowDown': next = indices[(current + 1) % indices.length]; break
    case 'ArrowLeft': case 'ArrowUp': next = indices[(current - 1 + indices.length) % indices.length]; break
    case 'Home': next = indices[0]; break
    case 'End': next = indices[indices.length - 1]; break
    default: return
  }
  event.preventDefault()
  select(next)
  root.value?.querySelectorAll<HTMLButtonElement>('[role="radio"]')[next]?.focus()
}
</script>

<template>
  <div ref="root" class="wu-segmented" role="radiogroup" :aria-label="label" :aria-disabled="disabled || undefined">
    <button v-for="(option, index) in options" :id="groupId + '-' + index" :key="option.value"
      type="button" role="radio" class="wu-segmented__item"
      :aria-checked="selected === index" :tabindex="selected === index ? 0 : -1"
      :disabled="disabled || option.disabled" @click="select(index)" @keydown="keydown($event,index)">
      {{ option.label }}
    </button>
  </div>
</template>

<style scoped>
.wu-segmented { display:inline-flex; max-width:100%; padding:4px; gap:3px; align-items:stretch; border:1px solid var(--wu-border); border-radius:var(--wu-radius-md); background:var(--wu-surface-hover); }
.wu-segmented__item { border:0; border-radius:var(--wu-radius-sm); background:transparent; color:var(--wu-text-muted); padding:8px 14px; min-height:var(--wu-control-height); font-size:12px; font-weight:550; font-family:var(--wu-font); cursor:pointer; white-space:nowrap; }
.wu-segmented__item[aria-checked="true"] { background:var(--wu-surface); box-shadow:0 1px 5px rgb(0 0 0 / 9%); color:var(--wu-text); font-weight:650; }
.wu-segmented__item:hover:not(:disabled):not([aria-checked="true"]) { background:color-mix(in srgb,var(--wu-surface) 45%,transparent); }
.wu-segmented__item:disabled { opacity:.45; cursor:not-allowed; }
.wu-segmented__item:focus-visible { outline:2px solid var(--wu-focus); outline-offset:2px; }
</style>
