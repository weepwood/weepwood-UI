import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WBadge } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Badge',
  component: WBadge,
  tags: ['autodocs'],
  args: { tone: 'accent' },
  render: (args) => ({
    components: { WBadge },
    setup: () => ({ args }),
    template: '<WBadge v-bind="args">In progress</WBadge>',
  }),
} satisfies Meta<typeof WBadge>
export default meta
type Story = StoryObj<typeof meta>
export const Accent: Story = {}
export const Neutral: Story = { args: { tone: 'neutral' } }
export const Success: Story = { args: { tone: 'success' } }
export const Warning: Story = { args: { tone: 'warning' } }
export const Danger: Story = { args: { tone: 'danger' } }
