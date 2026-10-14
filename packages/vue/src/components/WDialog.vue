<script setup lang="ts">
import { onMounted, ref, useId, watch } from 'vue'

const model = defineModel<boolean>({ default: false })
defineProps<{ title: string; closeLabel?: string }>()
const dialog = ref<HTMLDialogElement | null>(null)
const titleId = useId()

function syncDialog() {
  const element = dialog.value
  if (!element) return
  if (model.value && !element.open) element.showModal()
  if (!model.value && element.open) element.close()
}
function onClose() {
  // Covers Escape and any native close action; model remains source of truth.
  if (model.value) model.value = false
}
onMounted(syncDialog)
watch(model, syncDialog, { flush: 'post' })
</script>

<template>
  <dialog ref="dialog" class="wu-dialog" :aria-labelledby="titleId" @close="onClose">
    <div class="wu-dialog__header">
      <h2 :id="titleId">{{ title }}</h2>
      <button type="button" class="wu-dialog__close" :aria-label="closeLabel || 'Close dialog'" @click="model = false">×</button>
    </div>
    <div class="wu-dialog__body"><slot /></div>
    <div v-if="$slots.footer" class="wu-dialog__footer"><slot name="footer" /></div>
  </dialog>
</template>

<style scoped>
.wu-dialog { width: min(460px, calc(100vw - 32px)); max-height: min(80vh, 700px); padding: 0; border: 1px solid var(--wu-border); border-radius: var(--wu-radius-lg); box-shadow: var(--wu-shadow); background: var(--wu-surface); color: var(--wu-text); overflow: auto; }
.wu-dialog::backdrop { background: rgb(12 19 31 / 54%); backdrop-filter: blur(3px); }
.wu-dialog__header { display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 16px 20px; border-bottom: 1px solid var(--wu-border); }
.wu-dialog__header h2 { font-size: 16px; font-weight: 650; margin: 0; }
.wu-dialog__close { color: var(--wu-text-muted); background: transparent; border: 0; font-size: 24px; width: 32px; height: 32px; border-radius: var(--wu-radius-sm); cursor: pointer; }
.wu-dialog__close:hover { background: var(--wu-surface-hover); color: var(--wu-text); }
.wu-dialog__body { padding: 20px; line-height: 1.5; }
.wu-dialog__footer { display: flex; justify-content: flex-end; gap: 8px; padding: 12px 20px; border-top: 1px solid var(--wu-border); }
</style>
