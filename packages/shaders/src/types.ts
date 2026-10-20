/** Stable Weepwood wrapper settings, not native Shaders props. */
export type ShaderQuality = 'auto' | 'high' | 'balanced' | 'low' | 'static'
export type ShaderMotion = 'system' | 'full' | 'reduced'
export type ShaderStatus = 'idle' | 'checking' | 'loading' | 'ready' | 'fallback'

export interface ShaderSurfaceProps {
  quality?: ShaderQuality
  motion?: ShaderMotion
  lazy?: boolean
  interactive?: boolean
  fallbackColor?: string
  borderRadius?: string
  disableTelemetry?: boolean
}

export interface ShaderSurfaceEvents {
  (event: 'ready'): void
  (event: 'fallback', reason: string): void
  (event: 'status-change', status: ShaderStatus): void
}

/** Public native Shader methods. Keep the wrapper isolated from renderer internals. */
export interface ShaderRuntimeHandle {
  setResolutionScale?: (scale: number) => void
  setFrameRateCap?: (fps: number | null) => void
}
