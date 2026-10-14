<script setup lang="ts">
const model = defineModel<boolean>({ default: false })
withDefaults(defineProps<{ label?: string; disabled?: boolean }>(), { label: '' })
</script>

<template>
  <label class="wu-checkbox" :class="{ 'wu-checkbox--disabled': disabled }">
    <input v-model="model" type="checkbox" :disabled="disabled" :aria-label="label || undefined">
    <span v-if="label || $slots.default"><slot>{{ label }}</slot></span>
  </label>
</template>

<style scoped>
.wu-checkbox { display: inline-flex; align-items: center; gap: 9px; cursor: pointer; font-size: 13px; color: var(--wu-text); }
.wu-checkbox--disabled { opacity: .55; cursor: not-allowed; }
.wu-checkbox input { accent-color: var(--wu-accent); width: 16px; height: 16px; margin: 0; cursor: inherit; }
</style>
