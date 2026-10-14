<script setup lang="ts">
import { useId } from 'vue'

const model = defineModel<string>({ default: '' })
const props = withDefaults(defineProps<{
  label?: string
  placeholder?: string
  type?: 'text' | 'email' | 'password' | 'search' | 'url'
  disabled?: boolean
  hint?: string
  error?: string
  id?: string
}>(), { type: 'text' })
const generatedId = useId()
const inputId = props.id || generatedId
</script>

<template>
  <div class="wu-field">
    <label v-if="label" class="wu-field__label" :for="inputId">{{ label }}</label>
    <input
      :id="inputId"
      v-model="model"
      class="wu-input"
      :type="type"
      :placeholder="placeholder"
      :disabled="disabled"
      :aria-invalid="error ? true : undefined"
      :aria-describedby="error || hint ? inputId + '-help' : undefined"
    >
    <span v-if="error || hint" :id="inputId + '-help'" class="wu-field__help" :class="{ 'wu-field__help--error': error }">{{ error || hint }}</span>
  </div>
</template>

<style scoped>
.wu-field { display: inline-flex; flex-direction: column; gap: 6px; min-width: 210px; }
.wu-field__label { color: var(--wu-text); font-size: 12px; font-weight: 600; }
.wu-input {
  width: 100%; min-height: var(--wu-control-height); border: 1px solid var(--wu-border-strong);
  border-radius: var(--wu-radius-md); color: var(--wu-text); background: var(--wu-surface);
  padding: 0 12px; outline: none; font-size: 13px; transition: border-color .15s, box-shadow .15s;
}
.wu-input::placeholder { color: var(--wu-text-muted); opacity: .8; }
.wu-input:focus-visible { border-color: var(--wu-focus); outline: 2px solid color-mix(in srgb, var(--wu-focus) 22%, transparent); outline-offset: 0; }
.wu-input:disabled { cursor: not-allowed; opacity: .55; }
.wu-input[aria-invalid="true"] { border-color: var(--wu-danger); }
.wu-field__help { color: var(--wu-text-muted); font-size: 11px; }
.wu-field__help--error { color: var(--wu-danger); }
</style>
