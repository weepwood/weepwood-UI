<script setup lang="ts">
defineProps<{ title: string; description?: string }>()
</script>

<template>
  <section class="wu-empty-state">
    <div v-if="$slots.icon" class="wu-empty-state__icon" aria-hidden="true"><slot name="icon" /></div>
    <h3 class="wu-empty-state__title">{{ title }}</h3>
    <p v-if="description" class="wu-empty-state__description">{{ description }}</p>
    <div v-if="$slots.action" class="wu-empty-state__actions"><slot name="action" /></div>
  </section>
</template>

<style scoped>
.wu-empty-state { display:flex; flex-direction:column; justify-content:center; align-items:center; gap:10px; padding:36px 24px; border-radius:var(--wu-radius-lg); border:1px dashed var(--wu-border-strong); background:var(--wu-surface); text-align:center; }
.wu-empty-state__icon { display:grid; place-items:center; width:52px; height:52px; border-radius:16px; font-size:23px; background:var(--wu-accent-muted); color:var(--wu-accent); margin-bottom:3px; }
.wu-empty-state__title { margin:0; font-size:15px; font-weight:700; color:var(--wu-text); }
.wu-empty-state__description { margin:0; max-width:320px; font-size:13px; line-height:1.6; color:var(--wu-text-muted); }
.wu-empty-state__actions { margin-top:10px; display:flex; justify-content:center; gap:8px; flex-wrap:wrap; }
</style>
