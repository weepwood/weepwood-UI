import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WEmptyState, WButton } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/EmptyState',
  component: WEmptyState,
  tags: ['autodocs'],
  args: { title: 'No projects yet', description: 'Create a project to organize your work and files.' },
  render: args => ({
    components: { WEmptyState, WButton },
    setup: () => ({ args }),
    template: '<div style="width:min(460px,90vw)"><WEmptyState v-bind="args"><template #icon>◇</template><template #action><WButton variant="primary">Create project</WButton></template></WEmptyState></div>',
  }),
} satisfies Meta<typeof WEmptyState>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const NoAction: Story = {
  render: args => ({
    components: { WEmptyState },
    setup: () => ({ args }),
    template: '<div style="width:440px"><WEmptyState v-bind="args"/></div>',
  }),
}
