import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WCheckbox } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Checkbox',
  component: WCheckbox,
  tags: ['autodocs'],
  args: { label: 'Remember preferences', modelValue: true, disabled: false },
} satisfies Meta<typeof WCheckbox>
export default meta
type Story = StoryObj<typeof meta>
export const Checked: Story = {}
export const Unchecked: Story = { args: { modelValue: false } }
export const Disabled: Story = { args: { disabled: true } }
