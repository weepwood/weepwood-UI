import { describe, expect, it, vi, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { defineComponent, h, onMounted } from 'vue'
import WShaderSurface from './components/WShaderSurface.vue'
import WShaderBackground from './components/WShaderBackground.vue'
import { probeWebGPU } from './runtime/capability'

vi.mock('shaders/vue', () => ({
  Shader: defineComponent({
    emits: ['ready', 'unavailable'],
    setup(_props, { slots, emit, expose }) {
      expose({ setResolutionScale: vi.fn(), setFrameRateCap: vi.fn() })
      onMounted(() => emit('ready'))
      return () => h('div', { 'data-test': 'mock-shader' }, slots.default?.())
    },
  }),
  LinearGradient: defineComponent({
    props: ['colorA', 'colorB'],
    setup(props) {
      return () => h('span', { 'data-test': 'mock-gradient', 'data-a': props.colorA, 'data-b': props.colorB })
    },
  }),
}))

afterEach(() => {
  vi.unstubAllGlobals()
})

describe('WebGPU capability', () => {
  it('fails closed when WebGPU is missing', async () => {
    vi.stubGlobal('navigator', {})
    expect(await probeWebGPU()).toBe(false)
  })

  it('detects a rejected adapter', async () => {
    vi.stubGlobal('navigator', { gpu: { requestAdapter: () => Promise.reject(new Error('blocked')) } })
    expect(await probeWebGPU()).toBe(false)
  })

  it('accepts an available adapter', async () => {
    vi.stubGlobal('navigator', { gpu: { requestAdapter: async () => ({}) } })
    expect(await probeWebGPU()).toBe(true)
  })
})

describe('WShaderSurface', () => {
  it('never requests WebGPU in static mode and keeps accessible content', async () => {
    const requestAdapter = vi.fn(async () => ({}))
    vi.stubGlobal('navigator', { gpu: { requestAdapter } })
    const wrapper = mount(WShaderSurface, {
      props: { quality: 'static', lazy: false },
      slots: { default: '<button>Continue</button>', fallback: '<p>Static artwork</p>' },
    })
    await flushPromises()
    expect(requestAdapter).not.toHaveBeenCalled()
    expect(wrapper.attributes('data-shader-status')).toBe('fallback')
    expect(wrapper.text()).toContain('Continue')
    expect(wrapper.text()).toContain('Static artwork')
    expect(wrapper.find('[data-test="mock-shader"]').exists()).toBe(false)
    wrapper.unmount()
  })

  it('emits fallback without losing children on unsupported browsers', async () => {
    vi.stubGlobal('navigator', {})
    const wrapper = mount(WShaderSurface, {
      props: { lazy: false },
      slots: { default: 'Important content' },
    })
    await flushPromises()
    expect(wrapper.attributes('data-shader-status')).toBe('fallback')
    expect(wrapper.emitted('fallback')?.[0]).toEqual(['webgpu-unavailable'])
    expect(wrapper.text()).toContain('Important content')
    wrapper.unmount()
  })

  it('loads the shader only when the adapter succeeds', async () => {
    vi.stubGlobal('navigator', { gpu: { requestAdapter: async () => ({}) } })
    const wrapper = mount(WShaderBackground, {
      props: { lazy: false, colorA: '#111111', colorB: '#eeeeee' },
      slots: { default: '<button>Open</button>' },
    })
    await flushPromises()
    await flushPromises()
    expect(wrapper.find('[data-test="mock-shader"]').exists()).toBe(true)
    expect(wrapper.find('[data-test="mock-gradient"]').exists()).toBe(true)
    expect(wrapper.text()).toContain('Open')
    wrapper.unmount()
  })
})
