<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  value: number
  max?: number
  label?: string
  showValue?: boolean
}>(), { max: 100, label: 'Progress', showValue: false })
const safeMax = computed(() => Number.isFinite(props.max) && props.max > 0 ? props.max : 100)
const current = computed(() => Number.isFinite(props.value) ? Math.max(0, Math.min(props.value, safeMax.value)) : 0)
const percent = computed(() => Math.round((current.value / safeMax.value) * 100))
</script>

<template>
  <div class="wu-progress">
    <div v-if="showValue" class="wu-progress__label">
      <span>{{ label }}</span><span>{{ percent }}%</span>
    </div>
    <div class="wu-progress__track" role="progressbar" :aria-label="label" :aria-valuemin="0" :aria-valuemax="safeMax" :aria-valuenow="current">
      <div class="wu-progress__fill" :style="{ width: percent + '%' }" />
    </div>
  </div>
</template>

<style scoped>
.wu-progress { display: grid; gap: 8px; min-width: 100px; width: 100%; }
.wu-progress__label { display: flex; justify-content: space-between; gap: 12px; color: var(--wu-text-muted); font-size: 12px; }
.wu-progress__track { width: 100%; height: 7px; overflow: hidden; background: var(--wu-surface-hover); border-radius: 99px; }
.wu-progress__fill { height: 100%; background: var(--wu-accent); border-radius: inherit; transition: width .2s ease; }
@media (prefers-reduced-motion: reduce) { .wu-progress__fill { transition: none; } }
</style>
