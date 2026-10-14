import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WSelect } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Select',
  component: WSelect,
  tags: ['autodocs'],
  args: {
    label: 'Density',
    placeholder: 'Choose a density',
    options: [
      { label: 'Compact', value: 'compact' },
      { label: 'Normal', value: 'normal' },
      { label: 'Comfortable', value: 'comfortable' },
      { label: 'Unavailable', value: 'blocked', disabled: true },
    ],
    modelValue: 'normal',
  },
} satisfies Meta<typeof WSelect>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Error: Story = { args: { error: 'Please choose an available value.' } }
export const Disabled: Story = { args: { disabled: true } }
