import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { WAlert } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Alert',
  component: WAlert,
  tags: ['autodocs'],
  args: { title: 'Changes saved', tone: 'info' },
  render: args => ({
    components: { WAlert },
    setup() { return { args, visible: ref(true) } },
    template: '<WAlert v-if="visible" v-bind="args" @dismiss="visible = false">Review the latest updates in your workspace.</WAlert>',
  }),
} satisfies Meta<typeof WAlert>
export default meta
type Story = StoryObj<typeof meta>
export const Info: Story = {}
export const Success: Story = { args: { title: 'Successfully published', tone: 'success' } }
export const Warning: Story = { args: { title: 'Changes pending', tone: 'warning' } }
export const Danger: Story = { args: { title: 'Save failed', tone: 'danger', dismissible: true } }
