<script setup lang="ts">
withDefaults(defineProps<{
  title: string
  tone?: 'info' | 'success' | 'warning' | 'danger'
  live?: 'off' | 'polite' | 'assertive'
}>(), { tone: 'info', live: 'off' })
</script>

<template>
  <div class="wu-alert" :class="`wu-alert--${tone}`" :aria-live="live">
    <span class="wu-alert__icon" aria-hidden="true">{{ tone === 'success' ? '✓' : tone === 'info' ? 'i' : '!' }}</span>
    <div><strong>{{ title }}</strong><div v-if="$slots.default" class="wu-alert__body"><slot /></div></div>
  </div>
</template>

<style scoped>
.wu-alert { --tone: var(--wu-accent); display: flex; align-items: flex-start; gap: var(--wu-space-3); padding: var(--wu-space-4); color: var(--wu-text); background: color-mix(in srgb, var(--tone) 8%, var(--wu-surface)); border: 1px solid color-mix(in srgb, var(--tone) 30%, var(--wu-border)); border-radius: var(--wu-radius-md); font: 14px/1.5 var(--wu-font); }
.wu-alert--success { --tone: var(--wu-success); }
.wu-alert--warning { --tone: var(--wu-warning); }
.wu-alert--danger { --tone: var(--wu-danger); }
.wu-alert__icon { flex: none; display: grid; place-items: center; width: 19px; height: 19px; border: 1px solid currentColor; border-radius: 50%; color: var(--tone); font-weight: 700; }
.wu-alert__body { margin-top: var(--wu-space-1); color: var(--wu-text-muted); }
</style>
