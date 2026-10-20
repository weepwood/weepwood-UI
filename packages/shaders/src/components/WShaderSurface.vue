<script setup lang="ts">
import {
  computed, defineAsyncComponent, nextTick, onBeforeUnmount, onMounted,
  ref, shallowRef, watch, type Component,
} from 'vue'
import { probeWebGPU } from '../runtime/capability'
import type { ShaderMotion, ShaderQuality, ShaderRuntimeHandle, ShaderStatus } from '../types'

defineOptions({ inheritAttrs: false })

const props = withDefaults(defineProps<{
  quality?: ShaderQuality
  motion?: ShaderMotion
  lazy?: boolean
  interactive?: boolean
  fallbackColor?: string
  borderRadius?: string
  disableTelemetry?: boolean
}>(), {
  quality: 'auto',
  motion: 'system',
  lazy: true,
  interactive: false,
  fallbackColor: 'var(--wu-surface, #fff)',
  borderRadius: 'var(--wu-radius-lg, 15px)',
  disableTelemetry: true,
})

const emit = defineEmits<{
  ready: []
  fallback: [reason: string]
  'status-change': [status: ShaderStatus]
}>()

const root = ref<HTMLElement | null>(null)
const visible = ref(!props.lazy)
const reducedMotion = ref(false)
const status = ref<ShaderStatus>('idle')
const shaderModule = shallowRef<Component | null>(null)
const shaderRef = ref<ShaderRuntimeHandle | null>(null)
let mounted = false
let epoch = 0
let observer: IntersectionObserver | undefined
let media: MediaQueryList | undefined

const staticMode = computed(() =>
  props.quality === 'static' ||
  props.motion === 'reduced' ||
  (props.motion === 'system' && reducedMotion.value)
)
const canLoad = computed(() => visible.value && !staticMode.value)
const surfaceStyle = computed(() => ({
  '--wu-shader-fallback': props.fallbackColor,
  '--wu-shader-radius': props.borderRadius,
}))

function setStatus(next: ShaderStatus) {
  if (status.value === next) return
  status.value = next
  emit('status-change', next)
}

function fallback(reason: string) {
  shaderModule.value = null
  setStatus('fallback')
  emit('fallback', reason)
}

function applyQuality() {
  // These are methods exposed by the upstream Vue Shader component.
  // Quality never passes invented props into shaders/vue.
  const shader = shaderRef.value
  if (!shader) return
  const preset = props.quality === 'auto' ? 'balanced' : props.quality
  if (preset === 'low') {
    shader.setResolutionScale?.(0.7)
    shader.setFrameRateCap?.(30)
  } else if (preset === 'balanced') {
    shader.setResolutionScale?.(0.85)
    shader.setFrameRateCap?.(45)
  } else {
    shader.setResolutionScale?.(1)
    shader.setFrameRateCap?.(null)
  }
}

async function prepare() {
  const task = ++epoch
  if (!mounted) return
  if (staticMode.value) {
    fallback('static-mode')
    return
  }
  if (!visible.value) {
    shaderModule.value = null
    setStatus('idle')
    return
  }
  setStatus('checking')
  if (!await probeWebGPU()) {
    if (mounted && task === epoch) fallback('webgpu-unavailable')
    return
  }
  if (!mounted || task !== epoch) return
  setStatus('loading')
  try {
    // No Shader package is evaluated on server render or in static mode.
    const module = await import('shaders/vue')
    if (!mounted || task !== epoch) return
    shaderModule.value = module.Shader
  } catch {
    if (mounted && task === epoch) fallback('shader-load-failed')
  }
}

async function onReady() {
  if (!mounted || staticMode.value) return
  setStatus('ready')
  await nextTick()
  applyQuality()
  emit('ready')
}

function onUnavailable(reason: unknown) {
  if (!mounted) return
  fallback(String(reason ?? 'gpu-initialization-failed'))
}

function updateReducedMotion(event: MediaQueryListEvent) {
  reducedMotion.value = event.matches
}

onMounted(() => {
  mounted = true
  if (typeof window !== 'undefined' && window.matchMedia) {
    media = window.matchMedia('(prefers-reduced-motion: reduce)')
    reducedMotion.value = media.matches
    media.addEventListener?.('change', updateReducedMotion)
  }

  if (props.lazy && root.value && typeof IntersectionObserver !== 'undefined') {
    visible.value = false
    observer = new IntersectionObserver(entries => {
      visible.value = entries.some(entry => entry.isIntersecting)
    }, { rootMargin: '128px' })
    observer.observe(root.value)
  } else {
    visible.value = true
  }
  void prepare()
})

watch(canLoad, () => {
  if (mounted) void prepare()
})
watch(() => props.quality, () => {
  if (status.value === 'ready') applyQuality()
})

onBeforeUnmount(() => {
  mounted = false
  epoch++
  observer?.disconnect()
  media?.removeEventListener?.('change', updateReducedMotion)
})
</script>

<template>
  <div
    ref="root"
    v-bind="$attrs"
    class="wu-shader-surface"
    :style="surfaceStyle"
    :data-shader-status="status"
  >
    <div class="wu-shader-surface__fallback" aria-hidden="true"
      :class="{ 'wu-shader-surface__fallback--hidden': status === 'ready' }">
      <slot name="fallback" />
    </div>
    <div v-if="shaderModule && canLoad" class="wu-shader-surface__canvas"
      :class="{ 'wu-shader-surface__canvas--interactive': interactive }" aria-hidden="true">
      <component :is="shaderModule" ref="shaderRef"
        :disable-telemetry="disableTelemetry"
        @ready="onReady" @unavailable="onUnavailable">
        <slot name="effect" />
      </component>
    </div>
    <div class="wu-shader-surface__content">
      <slot />
    </div>
  </div>
</template>
