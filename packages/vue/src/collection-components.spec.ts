import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { WEmptyState, WSegmentedControl, WSkeleton } from './index'

describe('WSkeleton', () => {
  it('uses accessible decorative markup and px dimensions', () => {
    const wrapper = mount(WSkeleton, { props: { width: 120, height: 24, rounded: true } })
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('style')).toContain('width: 120px')
    expect(wrapper.classes()).toContain('wu-skeleton--rounded')
  })
  it('respects disabled animation', () => {
    const wrapper = mount(WSkeleton, { props: { animated: false } })
    expect(wrapper.classes()).not.toContain('wu-skeleton--animated')
  })
})

describe('WEmptyState', () => {
  it('renders title, description and optional action slot', () => {
    const wrapper = mount(WEmptyState, {
      props: { title: '没有收藏', description: '先收藏一个组件库' },
      slots: { action: '<button>探索资源</button>' },
    })
    expect(wrapper.get('h3').text()).toBe('没有收藏')
    expect(wrapper.text()).toContain('先收藏一个组件库')
    expect(wrapper.get('button').text()).toBe('探索资源')
  })
  it('supports compact mode without action content', () => {
    const wrapper = mount(WEmptyState, { props: { compact: true } })
    expect(wrapper.classes()).toContain('wu-empty-state--compact')
    expect(wrapper.find('.wu-empty-state__action').exists()).toBe(false)
  })
})

describe('WSegmentedControl', () => {
  const options = [
    { label: 'Grid', value: 'grid' },
    { label: 'Disabled', value: 'disabled', disabled: true },
    { label: 'List', value: 'list' },
  ]
  it('exposes radiogroup semantics and click model updates', async () => {
    const wrapper = mount(WSegmentedControl, { props: { options, label: 'Layout', modelValue: 'grid' } })
    expect(wrapper.attributes('role')).toBe('radiogroup')
    expect(wrapper.attributes('aria-label')).toBe('Layout')
    const radios = wrapper.findAll('[role="radio"]')
    expect(radios[0].attributes('aria-checked')).toBe('true')
    expect(radios[1].attributes('disabled')).toBeDefined()
    await radios[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['list'])
  })
  it('supports arrow navigation and skips disabled choices', async () => {
    const wrapper = mount(WSegmentedControl, { props: { options, modelValue: 'grid' }, attachTo: document.body })
    await wrapper.findAll('[role="radio"]')[0].trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['list'])
    wrapper.unmount()
  })
  it('prevents updates when disabled', async () => {
    const wrapper = mount(WSegmentedControl, { props: { options, disabled: true, modelValue: 'grid' } })
    expect(wrapper.attributes('aria-disabled')).toBe('true')
    expect(wrapper.findAll('[role="radio"]').every(item => item.attributes('disabled') !== undefined)).toBe(true)
    await wrapper.findAll('[role="radio"]')[2].trigger('click')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()
  })
})
