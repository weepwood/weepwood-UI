import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WAlert } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Alert',
  component: WAlert,
  tags: ['autodocs'],
  args: { title: 'Changes saved', tone: 'success' },
  render: args => ({
    components: { WAlert },
    setup: () => ({ args }),
    template: '<WAlert v-bind="args">Check your workspace settings for details.</WAlert>',
  }),
} satisfies Meta<typeof WAlert>
export default meta
type Story = StoryObj<typeof meta>
export const Success: Story = {}
export const Information: Story = { args: { title: 'Scheduled maintenance', tone: 'info' } }
export const Warning: Story = { args: { title: 'Storage is almost full', tone: 'warning' } }
export const Danger: Story = { args: { title: 'Upload failed', tone: 'danger' } }
