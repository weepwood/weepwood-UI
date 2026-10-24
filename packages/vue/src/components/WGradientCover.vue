<script setup lang="ts">
import { onMounted, ref } from 'vue'

type GradientCoverVariant = 'sunset' | 'clay' | 'ocean' | 'forest' | 'violet' | 'ember'

withDefaults(defineProps<{
  title?: string
  subtitle?: string
  variant?: GradientCoverVariant
}>(), {
  title: 'Soft',
  subtitle: 'Gradient',
  variant: 'sunset',
})

const noiseUrl = ref('')
let cachedNoise = ''

onMounted(() => {
  if (cachedNoise) { noiseUrl.value = cachedNoise; return }
  const canvas = document.createElement('canvas')
  canvas.width = 128
  canvas.height = 128
  const context = canvas.getContext('2d')
  if (!context) return
  const pixels = context.createImageData(128, 128)
  let seed = 25021
  for (let i = 0; i < pixels.data.length; i += 4) {
    seed ^= seed << 13
    seed ^= seed >>> 17
    seed ^= seed << 5
    const value = seed & 255
    pixels.data[i] = value
    pixels.data[i + 1] = value
    pixels.data[i + 2] = value
    pixels.data[i + 3] = 255
  }
  context.putImageData(pixels, 0, 0)
  cachedNoise = canvas.toDataURL('image/png')
  noiseUrl.value = cachedNoise
})
</script>

<template>
  <div class="wu-gradient-cover" :class="'wu-gradient-cover--' + variant" :aria-label="title + ' ' + subtitle">
    <span class="wu-gradient-cover__noise" aria-hidden="true" :style="noiseUrl ? { backgroundImage: 'url(' + noiseUrl + ')' } : undefined" />
    <span class="wu-gradient-cover__caption">
      <span>{{ title }}</span>
      <span>{{ subtitle }}</span>
    </span>
  </div>
</template>

<style scoped>
.wu-gradient-cover {
  --g-top: #c9b8df; --g-bottom: #834452;
  --g-a: #dfb6e1; --g-b: #f6a6ae; --g-c: #db754b; --g-d: #f1af62;
  position: relative; isolation: isolate; overflow: hidden;
  display: grid; place-items: center; container-type: inline-size;
  aspect-ratio: 1; width: 100%; min-width: 0; border-radius: 20px;
  box-shadow: inset 0 0 0 .5px rgb(0 0 0 / 20%);
  background:
    radial-gradient(ellipse 82% 65% at 8% 14%, var(--g-a), transparent 82%),
    radial-gradient(ellipse 75% 76% at 97% 4%, var(--g-b), transparent 85%),
    radial-gradient(ellipse 82% 75% at 7% 94%, var(--g-c), transparent 85%),
    radial-gradient(ellipse 72% 70% at 96% 94%, var(--g-d), transparent 88%),
    linear-gradient(180deg, var(--g-top), var(--g-bottom));
}
.wu-gradient-cover--clay { --g-top:#a2b3bc; --g-bottom:#554036; --g-a:#b4c0c5; --g-b:#9a9da4; --g-c:#735d58; --g-d:#4e3429; }
.wu-gradient-cover--ocean { --g-top:#8fc4dc; --g-bottom:#102b54; --g-a:#b8d4df; --g-b:#8fbed1; --g-c:#245e87; --g-d:#162e58; }
.wu-gradient-cover--forest { --g-top:#9dbfcb; --g-bottom:#163f3b; --g-a:#abcbd9; --g-b:#8ab3b6; --g-c:#357e72; --g-d:#1f4841; }
.wu-gradient-cover--violet { --g-top:#bea9d5; --g-bottom:#302149; --g-a:#ceb9d9; --g-b:#aa91c7; --g-c:#65468d; --g-d:#2c244f; }
.wu-gradient-cover--ember { --g-top:#afbbc8; --g-bottom:#8b4538; --g-a:#c6cad0; --g-b:#adb4c4; --g-c:#be7564; --g-d:#994c3b; }
.wu-gradient-cover__noise { position: absolute; inset: 0; z-index: 1; background-repeat: repeat; background-size: 128px 128px; mix-blend-mode: overlay; opacity: .4; pointer-events: none; }
.wu-gradient-cover__caption {
  position: relative; z-index: 2; display: grid; text-align: center;
  color: white; font: 400 8cqw/1.22 Inter, 'Segoe UI', sans-serif;
  letter-spacing: -.035em; text-shadow: 0 1px 12px rgb(0 0 0 / 8%);
  pointer-events: none;
}
</style>
