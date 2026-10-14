<script setup lang="ts">
withDefaults(defineProps<{
  orientation?: 'horizontal' | 'vertical'
  /** Decorative separators are hidden from assistive technologies. */
  decorative?: boolean
}>(), { orientation: 'horizontal', decorative: true })
</script>

<template>
  <div
    class="wu-separator"
    :class="'wu-separator--' + orientation"
    :role="decorative ? 'none' : 'separator'"
    :aria-hidden="decorative ? true : undefined"
    :aria-orientation="decorative ? undefined : orientation"
  />
</template>

<style scoped>
.wu-separator { flex:none; background:var(--wu-border); }
.wu-separator--horizontal { width:100%; height:1px; }
.wu-separator--vertical { width:1px; align-self:stretch; min-height:16px; }
</style>
