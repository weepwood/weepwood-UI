import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WTextarea } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Textarea',
  component: WTextarea,
  tags: ['autodocs'],
  args: { label: 'Description', placeholder: 'Write a brief description…', rows: 4, modelValue: '' },
} satisfies Meta<typeof WTextarea>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'Markdown is not supported here.' } }
export const Error: Story = { args: { error: 'Description is required.' } }
export const Disabled: Story = { args: { disabled: true } }
