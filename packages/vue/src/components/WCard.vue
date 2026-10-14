<script setup lang="ts">
withDefaults(defineProps<{ title?: string; padded?: boolean; elevated?: boolean }>(), {
  padded: true,
  elevated: false,
})
</script>

<template>
  <section class="wu-card" :class="{ 'wu-card--padded': padded, 'wu-card--elevated': elevated }">
    <header v-if="title || $slots.header" class="wu-card__header">
      <slot name="header">{{ title }}</slot>
    </header>
    <div class="wu-card__body"><slot /></div>
    <footer v-if="$slots.footer" class="wu-card__footer"><slot name="footer" /></footer>
  </section>
</template>

<style scoped>
.wu-card { min-width: 0; border: 1px solid var(--wu-border); border-radius: var(--wu-radius-lg); background: var(--wu-surface); color: var(--wu-text); overflow: hidden; }
.wu-card--elevated { box-shadow: var(--wu-shadow); }
.wu-card__header { font-size: 14px; font-weight: 650; padding: 16px 18px; border-bottom: 1px solid var(--wu-border); }
.wu-card--padded .wu-card__body { padding: 18px; }
.wu-card__footer { border-top: 1px solid var(--wu-border); padding: 12px 18px; }
</style>
