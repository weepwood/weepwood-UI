<script setup lang="ts">
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <div class="wu-empty">
    <div v-if="$slots.icon" class="wu-empty__icon" aria-hidden="true"><slot name="icon" /></div>
    <strong>{{ title }}</strong>
    <p v-if="description">{{ description }}</p>
    <div v-if="$slots.actions" class="wu-empty__actions"><slot name="actions" /></div>
  </div>
</template>

<style scoped>
.wu-empty { display: grid; justify-items: center; gap: var(--wu-space-2); padding: var(--wu-space-6); text-align: center; color: var(--wu-text); border: 1px dashed var(--wu-border-strong); border-radius: var(--wu-radius-lg); font: 14px/1.5 var(--wu-font); }
.wu-empty__icon { display: grid; place-items: center; width: 40px; height: 40px; color: var(--wu-accent); background: var(--wu-accent-muted); border-radius: var(--wu-radius-md); }
p { margin: 0; max-width: 36ch; color: var(--wu-text-muted); }
.wu-empty__actions { display: flex; flex-wrap: wrap; justify-content: center; gap: var(--wu-space-2); margin-top: var(--wu-space-2); }
</style>
