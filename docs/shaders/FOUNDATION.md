# Shader Foundation (PR 1)

This is an optional Vue 3.5+ effects package. Base components never import the GPU runtime.

## API

```vue
<script setup lang="ts">
import { WShaderBackground } from '@weepwood/ui-shaders'
import '@weepwood/ui-shaders/styles.css'
</script>
<template>
  <WShaderBackground
    color-a="#101c39" color-b="#5578df"
    quality="auto" motion="system"
    style="min-height: 280px"
  >
    <h2>Readable even without GPU</h2>
  </WShaderBackground>
</template>
```

- `WShaderSurface`: lower-level container, slots `effect`, `fallback` and default content.
- `WShaderBackground`: WebGPU LinearGradient with an independent CSS gradient fallback.
- `probeWebGPU()`: best-effort adapter check; the actual renderer may still emit unavailable.
- `quality`: high (native), balanced (0.85 scale/45 FPS), low (0.7 scale/30 FPS), auto (balanced), static (no GPU).
- `motion`: system respects prefers-reduced-motion; reduced disables GPU animation; full overrides the OS preference.
- `lazy`: waits for the surface to approach the viewport when IntersectionObserver exists.
- `disableTelemetry`: true by default. Consumers may deliberately opt in.

All appearance props are Weepwood API contracts, not native Shaders quality props. `angle` currently affects the CSS fallback only; the native `LinearGradient` receives colorA and colorB.

## Failure behavior

SSR and static mode render the CSS fallback. WebGPU probes occur only on mount.
`fallback(reason)` and `status-change(status)` provide diagnostics. Native Shader `unavailable` is treated as a final failure; all interactive content stays in regular HTML outside the GPU canvas.

## Verify

```sh
pnpm --filter @weepwood/ui-shaders build
pnpm --filter @weepwood/ui-shaders typecheck
pnpm --filter @weepwood/ui-shaders test
pnpm check
```

Validate manually on supported Chromium/WebView2 and one environment with WebGPU disabled. Visual regression and real-device FPS are not covered by jsdom. The Shaders engine is MIT licensed, but platform presets and editor assets have separate terms.
