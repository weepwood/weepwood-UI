<script setup lang="ts">
import { useId } from 'vue'
import type { WSelectOption } from '../types'

const model = defineModel<string>({ default: '' })
const props = withDefaults(defineProps<{
  id?: string
  label?: string
  placeholder?: string
  options: WSelectOption[]
  disabled?: boolean
  hint?: string
  error?: string
}>(), { options: () => [] })
const generatedId = useId()
const selectId = props.id || generatedId
</script>

<template>
  <div class="wu-select-field">
    <label v-if="label" class="wu-select-field__label" :for="selectId">{{ label }}</label>
    <select
      :id="selectId"
      v-model="model"
      class="wu-select"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error || hint ? selectId + '-help' : undefined"
    >
      <option v-if="placeholder" value="" disabled>{{ placeholder }}</option>
      <option v-for="option in options" :key="option.value" :value="option.value" :disabled="option.disabled">{{ option.label }}</option>
    </select>
    <span v-if="error || hint" :id="selectId + '-help'" class="wu-select-field__help" :class="{ 'wu-select-field__help--error': error }">{{ error || hint }}</span>
  </div>
</template>

<style scoped>
.wu-select-field { display: inline-flex; flex-direction: column; gap: 6px; min-width: 210px; }
.wu-select-field__label { color: var(--wu-text); font-size: 12px; font-weight: 600; }
.wu-select { min-height: var(--wu-control-height); width: 100%; border: 1px solid var(--wu-border-strong); border-radius: var(--wu-radius-md); padding: 0 12px; background: var(--wu-surface); color: var(--wu-text); cursor: pointer; font-size: 13px; }
.wu-select:disabled { opacity: .55; cursor: not-allowed; }
.wu-select[aria-invalid="true"] { border-color: var(--wu-danger); }
.wu-select-field__help { color: var(--wu-text-muted); font-size: 11px; }
.wu-select-field__help--error { color: var(--wu-danger); }
</style>
