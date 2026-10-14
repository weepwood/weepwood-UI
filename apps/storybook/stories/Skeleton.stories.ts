import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WSkeleton } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Skeleton',
  component: WSkeleton,
  tags: ['autodocs'],
  args: { width: '220px', height: '16px', shape: 'rect', animated: true },
} satisfies Meta<typeof WSkeleton>
export default meta
type Story = StoryObj<typeof meta>
export const Line: Story = {}
export const Circle: Story = { args: { width: '48px', height: '48px', shape: 'circle' } }
export const Static: Story = { args: { animated: false } }
export const ProfilePlaceholder: Story = {
  render: () => ({
    components: { WSkeleton },
    template: '<div aria-busy="true" aria-label="Loading profile" style="display:flex;align-items:center;gap:12px"><WSkeleton width="52px" height="52px" shape="circle"/><div style="display:grid;gap:8px"><WSkeleton width="150px" height="12px"/><WSkeleton width="100px" height="12px"/></div></div>',
  }),
}
