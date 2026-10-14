<script setup lang="ts">
withDefaults(defineProps<{
  /** Visual treatment of the button. */
  variant?: 'primary' | 'secondary' | 'ghost' | 'danger'
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  loading?: boolean
  type?: 'button' | 'submit' | 'reset'
}>(), { variant: 'secondary', size: 'md', type: 'button' })
</script>

<template>
  <button
    class="wu-button"
    :class="['wu-button--' + variant, 'wu-button--' + size]"
    :type="type"
    :disabled="disabled || loading"
    :aria-busy="loading || undefined"
  >
    <span v-if="loading" class="wu-button__spinner" aria-hidden="true" />
    <slot />
  </button>
</template>

<style scoped>
.wu-button {
  appearance: none; display: inline-flex; justify-content: center; align-items: center;
  gap: 8px; white-space: nowrap; min-height: var(--wu-control-height);
  border: 1px solid var(--wu-border); border-radius: var(--wu-radius-md);
  font-size: 13px; font-weight: 600; line-height: 1.2; cursor: pointer;
  padding: 0 14px; background: var(--wu-surface); color: var(--wu-text);
  transition: background .15s, border-color .15s, transform .15s;
}
.wu-button:hover:not(:disabled) { background: var(--wu-surface-hover); border-color: var(--wu-border-strong); }
.wu-button:active:not(:disabled) { transform: translateY(1px); }
.wu-button:disabled { cursor: not-allowed; opacity: .56; }
.wu-button--primary { background: var(--wu-accent); color: var(--wu-on-accent); border-color: transparent; }
.wu-button--primary:hover:not(:disabled) { background: var(--wu-accent-hover); border-color: transparent; }
.wu-button--danger { background: var(--wu-danger); color: #fff; border-color: transparent; }
.wu-button--danger:hover:not(:disabled) { filter: brightness(.95); border-color: transparent; background: var(--wu-danger); }
.wu-button--ghost { background: transparent; border-color: transparent; }
.wu-button--ghost:hover:not(:disabled) { border-color: transparent; }
.wu-button--sm { min-height: 28px; padding: 0 10px; font-size: 12px; }
.wu-button--lg { min-height: 44px; padding: 0 18px; font-size: 14px; }
.wu-button__spinner { width: 14px; height: 14px; border: 2px solid currentColor; border-right-color: transparent; border-radius: 50%; animation: wu-spin .75s linear infinite; }
@keyframes wu-spin { to { transform: rotate(360deg); } }
</style>
