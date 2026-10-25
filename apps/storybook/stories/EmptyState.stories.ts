import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WEmptyState, WButton } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Empty State',
  component: WEmptyState,
  tags: ['autodocs'],
  args: { title: '还没有收藏', description: '探索开源 UI 资源，收藏你喜欢的组件。', compact: false },
  render: args => ({
    components: { WEmptyState, WButton },
    setup: () => ({ args }),
    template: '<div style="width:420px;max-width:100%"><WEmptyState v-bind="args"><template #action><WButton variant="primary">探索组件</WButton></template></WEmptyState></div>',
  }),
} satisfies Meta<typeof WEmptyState>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Compact: Story = { args: { compact: true } }
