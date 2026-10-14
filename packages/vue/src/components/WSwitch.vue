<script setup lang="ts">
import { useId } from 'vue'

const model = defineModel<boolean>({ default: false })
withDefaults(defineProps<{ label?: string; disabled?: boolean }>(), { label: '' })
const inputId = useId()
</script>

<template>
  <label class="wu-switch" :for="inputId" :class="{ 'wu-switch--disabled': disabled }">
    <input :id="inputId" v-model="model" type="checkbox" role="switch" :disabled="disabled" :aria-label="label || undefined">
    <span class="wu-switch__track" aria-hidden="true"><span class="wu-switch__thumb" /></span>
    <span v-if="label || $slots.default" class="wu-switch__label"><slot>{{ label }}</slot></span>
  </label>
</template>

<style scoped>
.wu-switch { display: inline-flex; align-items: center; gap: 10px; position: relative; cursor: pointer; color: var(--wu-text); font-size: 13px; }
.wu-switch--disabled { cursor: not-allowed; opacity: .55; }
.wu-switch input { position: absolute; width: 34px; height: 20px; margin: 0; opacity: 0; cursor: inherit; }
.wu-switch__track { width: 34px; height: 20px; border-radius: 20px; display: flex; align-items: center; padding: 2px; background: var(--wu-border-strong); transition: background .15s; }
.wu-switch__thumb { width: 16px; height: 16px; border-radius: 50%; background: #fff; box-shadow: 0 1px 3px #0002; transition: transform .15s; }
.wu-switch input:checked + .wu-switch__track { background: var(--wu-accent); }
.wu-switch input:checked + .wu-switch__track .wu-switch__thumb { transform: translateX(14px); }
.wu-switch input:focus-visible + .wu-switch__track { outline: 2px solid var(--wu-focus); outline-offset: 2px; }
</style>
