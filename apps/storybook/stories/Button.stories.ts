import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WButton } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Button',
  component: WButton,
  tags: ['autodocs'],
  args: { variant: 'primary', size: 'md', disabled: false, loading: false },
  render: (args) => ({
    components: { WButton },
    setup: () => ({ args }),
    template: '<WButton v-bind="args">Continue</WButton>',
  }),
} satisfies Meta<typeof WButton>
export default meta

type Story = StoryObj<typeof meta>
export const Primary: Story = {}
export const Secondary: Story = { args: { variant: 'secondary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Danger: Story = { args: { variant: 'danger' } }
export const Loading: Story = { args: { loading: true } }
export const Disabled: Story = { args: { disabled: true } }
