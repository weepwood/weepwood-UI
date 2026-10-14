import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WInput } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Input',
  component: WInput,
  tags: ['autodocs'],
  args: { label: 'Project name', placeholder: 'Enter project name', modelValue: '' },
} satisfies Meta<typeof WInput>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const WithHint: Story = { args: { hint: 'A short, descriptive name.' } }
export const Error: Story = { args: { error: 'A project name is required.' } }
export const Disabled: Story = { args: { disabled: true } }
