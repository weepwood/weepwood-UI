import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { WAlert, WEmpty } from './index'

describe('WAlert', () => {
  it('renders the title and optional message without announcing static content', () => {
    const wrapper = mount(WAlert, { props: { title: 'Saved' }, slots: { default: 'Changes applied.' } })
    expect(wrapper.get('strong').text()).toBe('Saved')
    expect(wrapper.get('.wu-alert__body').text()).toBe('Changes applied.')
    expect(wrapper.attributes('aria-live')).toBe('off')
    expect(wrapper.get('.wu-alert__icon').attributes('aria-hidden')).toBe('true')
  })

  it('allows consumers to opt into live announcements independently of tone', async () => {
    const wrapper = mount(WAlert, { props: { title: '', tone: 'danger', live: 'polite' } })
    expect(wrapper.classes()).toContain('wu-alert--danger')
    await wrapper.setProps({ title: 'Upload failed' })
    expect(wrapper.attributes('aria-live')).toBe('polite')
    expect(wrapper.get('strong').text()).toBe('Upload failed')
  })
})

describe('WEmpty', () => {
  it('omits optional regions when no content is provided', () => {
    const wrapper = mount(WEmpty, { props: { title: 'No results' } })
    expect(wrapper.text()).toBe('No results')
    expect(wrapper.find('p').exists()).toBe(false)
    expect(wrapper.find('.wu-empty__actions').exists()).toBe(false)
  })

  it('preserves the consumer action and hides the decorative icon', () => {
    const wrapper = mount(WEmpty, {
      props: { title: 'No projects', description: 'Create a project to get started.' },
      slots: { icon: '+', actions: '<button>New project</button>' },
    })
    expect(wrapper.get('p').text()).toBe('Create a project to get started.')
    expect(wrapper.get('.wu-empty__icon').attributes('aria-hidden')).toBe('true')
    expect(wrapper.get('button').text()).toBe('New project')
  })
})
