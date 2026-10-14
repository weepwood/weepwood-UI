<script setup lang="ts">
withDefaults(defineProps<{
  width?: string
  height?: string
  shape?: 'rect' | 'circle'
  animated?: boolean
}>(), { width: '100%', height: '16px', shape: 'rect', animated: true })
</script>

<template>
  <span
    class="wu-skeleton"
    :class="{ 'wu-skeleton--circle': shape === 'circle', 'wu-skeleton--animated': animated }"
    :style="{ width, height }"
    aria-hidden="true"
  />
</template>

<style scoped>
.wu-skeleton { display:inline-block; flex:none; max-width:100%; border-radius:var(--wu-radius-sm); background:var(--wu-surface-hover); vertical-align:middle; }
.wu-skeleton--circle { border-radius:9999px; }
.wu-skeleton--animated { background-image:linear-gradient(100deg,transparent 10%,color-mix(in srgb,var(--wu-border-strong) 55%,transparent) 45%,transparent 80%); background-size:200% 100%; animation:wu-skeleton-shimmer 1.6s linear infinite; }
@keyframes wu-skeleton-shimmer { 0% { background-position-x:150%; } 100% { background-position-x:-150%; } }
@media (prefers-reduced-motion:reduce) { .wu-skeleton--animated { animation:none; } }
</style>
