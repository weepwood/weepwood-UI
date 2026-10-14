import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WSwitch } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Switch',
  component: WSwitch,
  tags: ['autodocs'],
  args: { label: 'Enable notifications', modelValue: true, disabled: false },
} satisfies Meta<typeof WSwitch>
export default meta
type Story = StoryObj<typeof meta>
export const On: Story = {}
export const Off: Story = { args: { modelValue: false } }
export const Disabled: Story = { args: { disabled: true } }
