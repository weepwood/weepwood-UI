<script setup lang="ts">
withDefaults(defineProps<{
  /** Required accessible name for an icon-only button. */
  label: string
  variant?: 'primary' | 'secondary' | 'ghost'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), { variant: 'secondary', size: 'md', type: 'button' })
</script>

<template>
  <button
    class="wu-icon-button"
    :class="['wu-icon-button--' + variant, 'wu-icon-button--' + size]"
    :type="type"
    :aria-label="label"
    :aria-busy="loading || undefined"
    :disabled="disabled || loading"
  >
    <span v-if="loading" class="wu-icon-button__spinner" aria-hidden="true" />
    <slot v-else />
  </button>
</template>

<style scoped>
.wu-icon-button {
  appearance: none; display: inline-flex; align-items: center; justify-content: center;
  width: var(--wu-control-height); height: var(--wu-control-height); padding: 0;
  border: 1px solid var(--wu-border); border-radius: var(--wu-radius-md);
  color: var(--wu-text); background: var(--wu-surface); cursor: pointer;
  transition: background .15s, transform .15s;
}
.wu-icon-button:hover:not(:disabled) { background: var(--wu-surface-hover); }
.wu-icon-button:active:not(:disabled) { transform: translateY(1px); }
.wu-icon-button:disabled { opacity: .55; cursor: not-allowed; }
.wu-icon-button--primary { background: var(--wu-accent); color: var(--wu-on-accent); border-color: transparent; }
.wu-icon-button--primary:hover:not(:disabled) { background: var(--wu-accent-hover); }
.wu-icon-button--ghost { background: transparent; border-color: transparent; }
.wu-icon-button--sm { width: 28px; height: 28px; }
.wu-icon-button--lg { width: 44px; height: 44px; }
.wu-icon-button__spinner { width: 14px; height: 14px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: wu-icon-spin .8s linear infinite; }
@keyframes wu-icon-spin { to { transform: rotate(360deg); } }
</style>
