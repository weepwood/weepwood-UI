<script setup lang="ts">
withDefaults(defineProps<{
  blur?: 'soft' | 'medium' | 'strong'
  elevated?: boolean
}>(), { blur: 'medium', elevated: false })
</script>

<template>
  <section class="wu-glass-panel" :class="['wu-glass-panel--' + blur, { 'wu-glass-panel--elevated': elevated }]">
    <slot />
  </section>
</template>

<style scoped>
.wu-glass-panel {
  --wu-glass-blur: 18px;
  color: var(--wu-text);
  background: color-mix(in srgb, var(--wu-surface) 74%, transparent);
  border: 1px solid color-mix(in srgb, var(--wu-border-strong) 48%, transparent);
  border-radius: var(--wu-radius-lg);
  padding: 24px;
  -webkit-backdrop-filter: blur(var(--wu-glass-blur)) saturate(1.25);
  backdrop-filter: blur(var(--wu-glass-blur)) saturate(1.25);
}
.wu-glass-panel--soft { --wu-glass-blur: 8px; }
.wu-glass-panel--strong { --wu-glass-blur: 32px; }
.wu-glass-panel--elevated { box-shadow: var(--wu-shadow); }
@supports not (backdrop-filter: blur(1px)) {
  .wu-glass-panel { background: var(--wu-surface); }
}
</style>
