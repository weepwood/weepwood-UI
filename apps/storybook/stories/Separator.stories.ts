import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WSeparator } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Separator',
  component: WSeparator,
  tags: ['autodocs'],
  render: args => ({
    components: { WSeparator },
    setup: () => ({ args }),
    template: '<div style="display:flex; gap:14px; align-items:center; min-height:54px; min-width:300px"><span>Profile</span><WSeparator v-bind="args" /><span>Settings</span></div>',
  }),
} satisfies Meta<typeof WSeparator>
export default meta
type Story = StoryObj<typeof meta>
export const Vertical: Story = { args: { orientation: 'vertical' } }
export const Semantic: Story = { args: { orientation: 'vertical', decorative: false } }
export const Horizontal: Story = {
  args: { orientation: 'horizontal' },
  render: args => ({
    components: { WSeparator },
    setup: () => ({ args }),
    template: '<div style="display:grid; gap:12px; min-width:300px"><strong>Section heading</strong><WSeparator v-bind="args" /><span>Section content</span></div>',
  }),
}
