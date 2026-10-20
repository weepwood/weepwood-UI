<script setup lang="ts">
import { computed, defineAsyncComponent } from 'vue'
import WShaderSurface from './WShaderSurface.vue'
import type { ShaderMotion, ShaderQuality, ShaderStatus } from '../types'

// Import is deferred: no upstream runtime cost for CSS-only/SSR rendering.
const Gradient = defineAsyncComponent(async () =>
  (await import('shaders/vue')).LinearGradient
)
const props = withDefaults(defineProps<{
  colorA?: string
  colorB?: string
  angle?: number
  quality?: ShaderQuality
  motion?: ShaderMotion
  lazy?: boolean
  interactive?: boolean
  disableTelemetry?: boolean
  borderRadius?: string
}>(), {
  colorA: '#101c39',
  colorB: '#5578df',
  angle: 135,
  quality: 'auto',
  motion: 'system',
  lazy: true,
  interactive: false,
  disableTelemetry: true,
  borderRadius: 'var(--wu-radius-lg, 15px)',
})
const emit = defineEmits<{
  ready: []
  fallback: [reason: string]
  'status-change': [status: ShaderStatus]
}>()
const fallbackStyle = computed(() => ({
  background: `linear-gradient(${props.angle}deg, ${props.colorA}, ${props.colorB})`,
}))
</script>

<template>
  <WShaderSurface
    class="wu-shader-background"
    :quality="quality" :motion="motion" :lazy="lazy"
    :interactive="interactive" :disable-telemetry="disableTelemetry"
    :border-radius="borderRadius" :fallback-color="colorA"
    @ready="emit('ready')"
    @fallback="reason => emit('fallback', reason)"
    @status-change="status => emit('status-change', status)"
  >
    <template #effect>
      <Gradient :color-a="colorA" :color-b="colorB" />
    </template>
    <template #fallback>
      <div class="wu-shader-background__gradient" :style="fallbackStyle" />
    </template>
    <slot />
  </WShaderSurface>
</template>
