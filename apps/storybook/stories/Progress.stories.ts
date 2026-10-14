import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WProgress } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Progress',
  component: WProgress,
  tags: ['autodocs'],
  args: { label: 'Upload progress', value: 64, max: 100, showValue: true },
  render: args => ({
    components: { WProgress },
    setup: () => ({ args }),
    template: '<div style="width:320px"><WProgress v-bind="args" /></div>',
  }),
} satisfies Meta<typeof WProgress>
export default meta
type Story = StoryObj<typeof meta>
export const InProgress: Story = {}
export const Complete: Story = { args: { value: 100 } }
export const Empty: Story = { args: { value: 0 } }
export const Clamped: Story = { args: { value: 150 } }
