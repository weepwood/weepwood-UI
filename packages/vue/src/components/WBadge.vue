<script setup lang="ts">
withDefaults(defineProps<{
  tone?: 'neutral' | 'accent' | 'success' | 'warning' | 'danger'
}>(), { tone: 'neutral' })
</script>

<template>
  <span class="wu-badge" :class="'wu-badge--' + tone"><slot /></span>
</template>

<style scoped>
.wu-badge {
  display: inline-flex; align-items: center; width: fit-content;
  border-radius: 6px; padding: 2px 8px; font-size: 11px; font-weight: 650;
  line-height: 18px; background: var(--wu-surface-hover); color: var(--wu-text-muted);
}
.wu-badge--accent { color: var(--wu-accent); background: var(--wu-accent-muted); }
.wu-badge--success { color: var(--wu-success); background: color-mix(in srgb, var(--wu-success) 12%, transparent); }
.wu-badge--warning { color: var(--wu-warning); background: color-mix(in srgb, var(--wu-warning) 12%, transparent); }
.wu-badge--danger { color: var(--wu-danger); background: color-mix(in srgb, var(--wu-danger) 12%, transparent); }
</style>
