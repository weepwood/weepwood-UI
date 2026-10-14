<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  /** Semantic severity of the message. */
  tone?: 'info' | 'success' | 'warning' | 'danger'
  /** Optional heading for the alert. */
  title?: string
  /** Optional visible dismissal action. */
  dismissible?: boolean
  /** Screen reader label on the dismissal button. */
  closeLabel?: string
}>(), { tone: 'info', dismissible: false, closeLabel: 'Dismiss notification' })
const emit = defineEmits<{ dismiss: [] }>()
const liveRole = computed(() => props.tone === 'warning' || props.tone === 'danger' ? 'alert' : 'status')
</script>

<template>
  <section class="wu-alert" :class="'wu-alert--' + tone" :role="liveRole">
    <span class="wu-alert__marker" aria-hidden="true" />
    <div class="wu-alert__content">
      <strong v-if="title" class="wu-alert__title">{{ title }}</strong>
      <div class="wu-alert__message"><slot /></div>
    </div>
    <button v-if="dismissible" type="button" class="wu-alert__close" :aria-label="closeLabel" @click="emit('dismiss')">×</button>
  </section>
</template>

<style scoped>
.wu-alert { --wu-alert-tone: var(--wu-accent); display:flex; align-items:flex-start; gap:12px; padding:14px 16px; border-radius:var(--wu-radius-md); border:1px solid color-mix(in srgb,var(--wu-alert-tone) 35%,var(--wu-border)); background:color-mix(in srgb,var(--wu-alert-tone) 8%,var(--wu-surface)); color:var(--wu-text); }
.wu-alert--success { --wu-alert-tone:var(--wu-success); }
.wu-alert--warning { --wu-alert-tone:var(--wu-warning); }
.wu-alert--danger { --wu-alert-tone:var(--wu-danger); }
.wu-alert__marker { flex:none; width:8px; height:8px; background:var(--wu-alert-tone); border-radius:50%; margin-top:5px; }
.wu-alert__content { flex:1; min-width:0; font-size:13px; line-height:1.55; }
.wu-alert__title { display:block; font-weight:700; margin-bottom:3px; }
.wu-alert__message { color:var(--wu-text-muted); }
.wu-alert__close { color:var(--wu-text-muted); border:0; border-radius:var(--wu-radius-sm); background:transparent; cursor:pointer; padding:0 4px; font-size:20px; line-height:1; }
.wu-alert__close:hover { background:var(--wu-surface-hover); color:var(--wu-text); }
.wu-alert__close:focus-visible { outline:2px solid var(--wu-focus); outline-offset:2px; }
</style>
