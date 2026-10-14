import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { WButton, WInput, WSwitch, WCheckbox } from './index'

describe('WButton', () => {
  it('renders slot content and a safe default type', () => {
    const wrapper = mount(WButton, { slots: { default: 'Save' } })
    expect(wrapper.text()).toBe('Save')
    expect(wrapper.get('button').attributes('type')).toBe('button')
  })
  it('prevents actions while loading', () => {
    const wrapper = mount(WButton, { props: { loading: true } })
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
    expect(wrapper.get('button').attributes('aria-busy')).toBe('true')
  })
})

describe('WInput', () => {
  it('emits model updates when edited', async () => {
    const wrapper = mount(WInput, { props: { label: 'Name', modelValue: '' } })
    await wrapper.get('input').setValue('Weepwood')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['Weepwood'])
  })
  it('exposes invalid state accessibly', () => {
    const wrapper = mount(WInput, { props: { error: 'Required' } })
    expect(wrapper.get('input').attributes('aria-invalid')).toBe('true')
  })
})

describe('WSwitch', () => {
  it('emits toggle state', async () => {
    const wrapper = mount(WSwitch, { props: { label: 'Enable', modelValue: false } })
    await wrapper.get('input').setValue(true)
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([true])
  })
})

describe('WCheckbox', () => {
  it('supports disabled state', () => {
    const wrapper = mount(WCheckbox, { props: { label: 'Agree', disabled: true } })
    expect(wrapper.get('input').attributes('disabled')).toBeDefined()
  })
})
