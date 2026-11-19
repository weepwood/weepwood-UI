import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WButton, WEmpty } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Empty',
  component: WEmpty,
  tags: ['autodocs'],
  args: { title: 'No projects yet', description: 'Create a project to start organizing your work.' },
} satisfies Meta<typeof WEmpty>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithAction: Story = {
  render: args => ({
    components: { WButton, WEmpty },
    setup: () => ({ args }),
    template: '<WEmpty v-bind="args"><template #icon>+</template><template #actions><WButton variant="primary">Create project</WButton></template></WEmpty>',
  }),
}
