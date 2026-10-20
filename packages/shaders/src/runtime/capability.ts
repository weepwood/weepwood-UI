/**
 * A capability probe is only a preflight check. The real renderer can still
 * reject the adapter/device, in which case Shader emits "unavailable".
 * Do not cache permanent failures: devices may recover after navigation.
 */
export async function probeWebGPU(): Promise<boolean> {
  if (typeof window === 'undefined' || typeof navigator === 'undefined') return false

  const gpu = (navigator as Navigator & {
    gpu?: { requestAdapter: () => Promise<unknown | null> }
  }).gpu
  if (!gpu || typeof gpu.requestAdapter !== 'function') return false

  try {
    return Boolean(await gpu.requestAdapter())
  } catch {
    return false
  }
}
