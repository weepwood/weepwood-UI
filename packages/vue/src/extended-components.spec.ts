import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'
import {
  WIconButton, WTextarea, WSelect, WTabs, WDialog, WProgress,
} from './index'

describe('WIconButton', () => {
  it('always exposes an accessible name and defaults to a safe type', () => {
    const wrapper = mount(WIconButton, { props: { label: 'Save' }, slots: { default: '★' } })
    expect(wrapper.get('button').attributes('aria-label')).toBe('Save')
    expect(wrapper.get('button').attributes('type')).toBe('button')
  })
  it('disables its action while loading', () => {
    const wrapper = mount(WIconButton, { props: { label: 'Save', loading: true } })
    expect(wrapper.get('button').attributes('disabled')).toBeDefined()
    expect(wrapper.get('button').attributes('aria-busy')).toBe('true')
  })
})

describe('WTextarea', () => {
  it('updates v-model and links help text to the control', async () => {
    const wrapper = mount(WTextarea, { props: { label: 'Notes', hint: 'Optional', modelValue: '' } })
    const textarea = wrapper.get('textarea')
    expect(textarea.attributes('aria-describedby')).toBe(wrapper.get('.wu-textarea-field__help').attributes('id'))
    await textarea.setValue('hello')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['hello'])
  })
})

describe('WSelect', () => {
  it('updates v-model and keeps disabled options disabled', async () => {
    const wrapper = mount(WSelect, {
      props: {
        label: 'Theme',
        options: [
          { label: 'Light', value: 'light' },
          { label: 'Dark', value: 'dark' },
          { label: 'Unavailable', value: 'off', disabled: true },
        ],
        modelValue: 'light',
      },
    })
    await wrapper.get('select').setValue('dark')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['dark'])
    expect(wrapper.findAll('option')[2].attributes('disabled')).toBeDefined()
  })
})

describe('WTabs', () => {
  const items = [
    { label: 'First', value: 'first' },
    { label: 'Hidden', value: 'hidden', disabled: true },
    { label: 'Last', value: 'last' },
  ]
  it('supports keyboard navigation skipping disabled tabs', async () => {
    const wrapper = mount(WTabs, { props: { items, modelValue: 'first', label: 'Panels' } })
    const first = wrapper.get('[role="tab"]')
    expect(first.attributes('aria-selected')).toBe('true')
    await first.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['last'])
    expect(wrapper.findAll('[role="tab"]')[1].attributes('disabled')).toBeDefined()
  })
  it('links the active tab to its panel and exposes a single tab stop', () => {
    const wrapper = mount(WTabs, { props: { items, modelValue: 'first' } })
    const tabs = wrapper.findAll('[role="tab"]')
    expect(tabs.filter(tab => tab.attributes('tabindex') === '0')).toHaveLength(1)
    expect(tabs[0].attributes('aria-controls')).toBe(wrapper.findAll('[role="tabpanel"]')[0].attributes('id'))
  })
})

describe('WDialog', () => {
  it('emits close on request without requiring a parent state mutation', async () => {
    // jsdom has no native showModal implementation; emulate its open state.
    Object.defineProperty(HTMLDialogElement.prototype, 'showModal', {
      configurable: true, value: function (this: HTMLDialogElement) { this.setAttribute('open', '') },
    })
    Object.defineProperty(HTMLDialogElement.prototype, 'close', {
      configurable: true, value: function (this: HTMLDialogElement) { this.removeAttribute('open') },
    })
    const wrapper = mount(WDialog, { props: { title: 'Delete file', modelValue: true } })
    expect(wrapper.get('dialog').attributes('aria-labelledby')).toBe(wrapper.get('h2').attributes('id'))
    expect(wrapper.get('dialog').attributes('open')).toBeDefined()
    await wrapper.get('button').trigger('click')
    await nextTick()
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([false])
  })
})

describe('WProgress', () => {
  it('clamps progress and publishes numeric values to assistive technology', () => {
    const wrapper = mount(WProgress, { props: { value: 180, max: 100, label: 'Uploading', showValue: true } })
    const progress = wrapper.get('[role="progressbar"]')
    expect(progress.attributes('aria-label')).toBe('Uploading')
    expect(progress.attributes('aria-valuenow')).toBe('100')
    expect(wrapper.get('.wu-progress__fill').attributes('style')).toContain('100%')
  })
  it('handles non-positive maximums safely', () => {
    const wrapper = mount(WProgress, { props: { value: 12, max: 0 } })
    expect(wrapper.get('[role="progressbar"]').attributes('aria-valuemax')).toBe('100')
  })
})
