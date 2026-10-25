<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  description?: string
  compact?: boolean
}>(), {
  title: '暂无内容',
  description: '这里还没有可以展示的项目。',
  compact: false,
})
</script>

<template>
  <section class="wu-empty-state" :class="{ 'wu-empty-state--compact': compact }">
    <div class="wu-empty-state__symbol" aria-hidden="true">
      <slot name="icon">◇</slot>
    </div>
    <h3 class="wu-empty-state__title">{{ title }}</h3>
    <p v-if="description" class="wu-empty-state__description">{{ description }}</p>
    <div v-if="$slots.action" class="wu-empty-state__action"><slot name="action" /></div>
  </section>
</template>

<style scoped>
.wu-empty-state { display:flex; flex-direction:column; gap:10px; align-items:center; justify-content:center; text-align:center; padding:48px 24px; min-width:0; color:var(--wu-text); border:1px dashed var(--wu-border-strong); border-radius:var(--wu-radius-lg); background:var(--wu-surface); }
.wu-empty-state--compact { padding:24px 16px; gap:8px; }
.wu-empty-state__symbol { display:grid; place-items:center; width:52px; height:52px; border-radius:16px; background:var(--wu-accent-muted); color:var(--wu-accent); font-size:28px; }
.wu-empty-state--compact .wu-empty-state__symbol { width:40px; height:40px; font-size:22px; }
.wu-empty-state__title { font-size:16px; font-weight:650; margin:6px 0 0; }
.wu-empty-state__description { color:var(--wu-text-muted); font-size:13px; line-height:1.65; max-width:340px; margin:0; }
.wu-empty-state__action { margin-top:9px; display:flex; justify-content:center; }
</style>
