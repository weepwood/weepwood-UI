import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { WSegmentedControl } from '@weepwood/ui-vue'

const options = [
  { label: '全部', value: 'all' },
  { label: '组件', value: 'components' },
  { label: '禁用', value: 'disabled', disabled: true },
  { label: '资源', value: 'resources' },
]

const meta = {
  title: 'Components/Segmented Control',
  component: WSegmentedControl,
  tags: ['autodocs'],
  args: { label: '资源分类', options, disabled: false },
  render: args => ({
    components: { WSegmentedControl },
    setup() { return { args, selected: ref('all') } },
    template: '<WSegmentedControl v-bind="args" v-model="selected" />',
  }),
} satisfies Meta<typeof WSegmentedControl>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Disabled: Story = { args: { disabled: true } }
