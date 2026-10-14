import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WIconButton } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/IconButton',
  component: WIconButton,
  tags: ['autodocs'],
  args: { label: 'Add to favorites', variant: 'secondary', size: 'md' },
  render: args => ({
    components: { WIconButton },
    setup: () => ({ args }),
    template: '<WIconButton v-bind="args"><span aria-hidden="true" style="font-size:18px">★</span></WIconButton>',
  }),
} satisfies Meta<typeof WIconButton>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Primary: Story = { args: { variant: 'primary' } }
export const Ghost: Story = { args: { variant: 'ghost' } }
export const Disabled: Story = { args: { disabled: true } }
export const Loading: Story = { args: { loading: true } }
