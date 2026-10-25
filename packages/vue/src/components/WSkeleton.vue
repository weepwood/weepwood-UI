<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  width?: string | number
  height?: string | number
  rounded?: boolean
  animated?: boolean
}>(), { width: '100%', height: 16, rounded: false, animated: true })

function cssSize(size: string | number): string {
  return typeof size === 'number' ? Math.max(0, size) + 'px' : size
}
const inlineStyle = computed(() => ({
  width: cssSize(props.width),
  height: cssSize(props.height),
}))
</script>

<template>
  <span class="wu-skeleton" :class="{ 'wu-skeleton--rounded': rounded, 'wu-skeleton--animated': animated }"
    :style="inlineStyle" aria-hidden="true" />
</template>

<style scoped>
.wu-skeleton { display:block; max-width:100%; flex-shrink:0; border-radius:var(--wu-radius-sm); background:var(--wu-surface-hover); }
.wu-skeleton--rounded { border-radius:9999px; }
.wu-skeleton--animated { background:linear-gradient(90deg,var(--wu-surface-hover) 22%,var(--wu-border) 50%,var(--wu-surface-hover) 78%);background-size:210% 100%;animation:wu-skeleton-shimmer 1.7s ease-in-out infinite; }
@keyframes wu-skeleton-shimmer { to { background-position-x:-210%; } }
@media(prefers-reduced-motion:reduce){.wu-skeleton--animated{animation:none;background:var(--wu-surface-hover)}}
</style>
