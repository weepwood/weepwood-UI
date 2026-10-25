<script setup lang="ts">
import { ref } from 'vue'

withDefaults(defineProps<{
  title?: string
  description?: string
}>(), { title: 'Spotlight Card', description: 'A subtle pointer-responsive light effect.' })

const x = ref('50%')
const y = ref('50%')

function move(event: PointerEvent) {
  const bounds = (event.currentTarget as HTMLElement).getBoundingClientRect()
  if (!bounds.width || !bounds.height) return
  x.value = (((event.clientX - bounds.left) / bounds.width) * 100) + '%'
  y.value = (((event.clientY - bounds.top) / bounds.height) * 100) + '%'
}
function reset() { x.value = '50%'; y.value = '50%' }
</script>

<template>
  <article class="wu-spotlight-card" tabindex="0"
    :style="{ '--wu-spot-x': x, '--wu-spot-y': y }"
    @pointermove="move" @pointerleave="reset">
    <div class="wu-spotlight-card__content">
      <slot>
        <h3>{{ title }}</h3>
        <p>{{ description }}</p>
      </slot>
    </div>
  </article>
</template>

<style scoped>
.wu-spotlight-card {
  --wu-spot-x: 50%; --wu-spot-y: 50%;
  position: relative; isolation: isolate; overflow: hidden; min-width: 0; min-height: 180px;
  padding: 24px; border: 1px solid var(--wu-border); border-radius: var(--wu-radius-lg);
  background: var(--wu-surface); color: var(--wu-text);
}
.wu-spotlight-card::before {
  content: ''; position: absolute; inset: 0; z-index: -1; pointer-events: none;
  opacity: 0; transition: opacity .2s ease;
  background: radial-gradient(300px circle at var(--wu-spot-x) var(--wu-spot-y),
    color-mix(in srgb, var(--wu-accent) 24%, transparent), transparent 75%);
}
.wu-spotlight-card:is(:hover, :focus-visible)::before { opacity: 1; }
.wu-spotlight-card:focus-visible { outline: 2px solid var(--wu-focus); outline-offset: 3px; }
.wu-spotlight-card h3 { font-size: 18px; margin: 0 0 8px; font-weight: 650; }
.wu-spotlight-card p { color: var(--wu-text-muted); margin: 0; font-size: 13px; line-height: 1.6; }
@media (prefers-reduced-motion: reduce) {
  .wu-spotlight-card::before { transition: none; }
}
</style>
