import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WSkeleton } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Skeleton',
  component: WSkeleton,
  tags: ['autodocs'],
  args: { width: 280, height: 20, rounded: false, animated: true },
  render: args => ({
    components: { WSkeleton },
    setup: () => ({ args }),
    template: '<div style="width:320px;max-width:100%;display:grid;gap:14px"><WSkeleton v-bind="args"/><WSkeleton width="85%" height="12px"/><WSkeleton width="65%" height="12px"/><WSkeleton width="42px" height="42px" rounded /></div>',
  }),
} satisfies Meta<typeof WSkeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Static: Story = { args: { animated: false } }
