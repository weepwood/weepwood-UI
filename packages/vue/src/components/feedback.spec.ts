import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { WAlert, WSeparator, WSkeleton, WEmptyState } from './index'

describe('WAlert', () => {
  it('uses a polite role for informational feedback', () => {
    const wrapper = mount(WAlert, { props: { title: 'Saved' }, slots: { default: 'Your changes are safe.' } })
    expect(wrapper.attributes('role')).toBe('status')
    expect(wrapper.text()).toContain('Your changes are safe.')
  })
  it('uses an urgent role for danger and emits dismiss', async () => {
    const wrapper = mount(WAlert, { props: { tone: 'danger', title: 'Failed', dismissible: true } })
    expect(wrapper.attributes('role')).toBe('alert')
    expect(wrapper.get('button').attributes('aria-label')).toBe('Dismiss notification')
    await wrapper.get('button').trigger('click')
    expect(wrapper.emitted('dismiss')).toHaveLength(1)
  })
  it('has no close button unless requested', () => {
    const wrapper = mount(WAlert)
    expect(wrapper.find('button').exists()).toBe(false)
  })
})
describe('WSeparator', () => {
  it('hides decorative separators', () => {
    const wrapper = mount(WSeparator)
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.attributes('role')).toBe('none')
  })
  it('announces a structural vertical separator when requested', () => {
    const wrapper = mount(WSeparator, { props: { decorative: false, orientation: 'vertical' } })
    expect(wrapper.attributes('role')).toBe('separator')
    expect(wrapper.attributes('aria-orientation')).toBe('vertical')
  })
})
describe('WSkeleton', () => {
  it('is decorative and provides consumer-controlled geometry', () => {
    const wrapper = mount(WSkeleton, { props: { width: '32px', height: '32px', shape: 'circle' } })
    expect(wrapper.attributes('aria-hidden')).toBe('true')
    expect(wrapper.classes()).toContain('wu-skeleton--circle')
    expect(wrapper.attributes('style')).toContain('32px')
  })
})
describe('WEmptyState', () => {
  it('renders empty copy and custom action content', () => {
    const wrapper = mount(WEmptyState, { props: { title: 'No items', description: 'Create your first one.' }, slots: { action: '<button>Create</button>' } })
    expect(wrapper.get('h3').text()).toBe('No items')
    expect(wrapper.get('p').text()).toBe('Create your first one.')
    expect(wrapper.get('button').text()).toBe('Create')
  })
})
