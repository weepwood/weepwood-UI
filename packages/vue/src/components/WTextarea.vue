<script setup lang="ts">
import { useId } from 'vue'

const model = defineModel<string>({ default: '' })
const props = withDefaults(defineProps<{
  id?: string
  label?: string
  placeholder?: string
  rows?: number
  disabled?: boolean
  readonly?: boolean
  hint?: string
  error?: string
}>(), { rows: 4 })
const generatedId = useId()
const inputId = props.id || generatedId
</script>

<template>
  <div class="wu-textarea-field">
    <label v-if="label" class="wu-textarea-field__label" :for="inputId">{{ label }}</label>
    <textarea
      :id="inputId"
      v-model="model"
      class="wu-textarea"
      :rows="rows"
      :placeholder="placeholder"
      :disabled="disabled"
      :readonly="readonly"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error || hint ? inputId + '-help' : undefined"
    />
    <span v-if="error || hint" :id="inputId + '-help'" class="wu-textarea-field__help" :class="{ 'wu-textarea-field__help--error': error }">{{ error || hint }}</span>
  </div>
</template>

<style scoped>
.wu-textarea-field { display: inline-flex; flex-direction: column; gap: 6px; min-width: 230px; width: 100%; }
.wu-textarea-field__label { color: var(--wu-text); font-size: 12px; font-weight: 600; }
.wu-textarea { display: block; min-height: 72px; width: 100%; resize: vertical; border: 1px solid var(--wu-border-strong); border-radius: var(--wu-radius-md); background: var(--wu-surface); color: var(--wu-text); padding: 10px 12px; font-size: 13px; line-height: 1.5; }
.wu-textarea::placeholder { color: var(--wu-text-muted); }
.wu-textarea:disabled { opacity: .55; cursor: not-allowed; }
.wu-textarea[aria-invalid="true"] { border-color: var(--wu-danger); }
.wu-textarea-field__help { font-size: 11px; color: var(--wu-text-muted); }
.wu-textarea-field__help--error { color: var(--wu-danger); }
</style>
