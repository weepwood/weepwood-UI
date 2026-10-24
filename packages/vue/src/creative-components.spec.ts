import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { WGlassPanel, WGradientCover, WSpotlightCard } from './index'

describe('creative components', () => {
  it('renders the gradient variant and both text lines', () => {
    const getContext = vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null)
    const wrapper = mount(WGradientCover, {
      props: { variant: 'ocean', title: 'Deep', subtitle: 'Ocean' },
    })
    expect(wrapper.classes()).toContain('wu-gradient-cover--ocean')
    expect(wrapper.text()).toContain('Deep')
    expect(wrapper.text()).toContain('Ocean')
    expect(wrapper.attributes('aria-label')).toBe('Deep Ocean')
    getContext.mockRestore()
  })

  it('renders glass surfaces without modifying slot content', () => {
    const wrapper = mount(WGlassPanel, {
      props: { blur: 'strong', elevated: true },
      slots: { default: '<p>Project settings</p>' },
    })
    expect(wrapper.classes()).toContain('wu-glass-panel--strong')
    expect(wrapper.classes()).toContain('wu-glass-panel--elevated')
    expect(wrapper.text()).toContain('Project settings')
  })

  it('resets the spotlight when pointer leaves', async () => {
    const wrapper = mount(WSpotlightCard)
    expect(wrapper.attributes('tabindex')).toBe('0')
    await wrapper.trigger('pointerleave')
    expect(wrapper.attributes('style')).toContain('--wu-spot-x: 50%')
    expect(wrapper.text()).toContain('Spotlight Card')
  })
})
