import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WGlassPanel, WButton } from '@weepwood/ui-vue'

const meta = {
  title: 'Creative/Glass Panel',
  component: WGlassPanel,
  tags: ['autodocs'],
  args: { blur: 'medium', elevated: true },
  argTypes: { blur: { control: 'select', options: ['soft', 'medium', 'strong'] } },
  render: (args) => ({
    components: { WGlassPanel, WButton },
    setup: () => ({ args }),
    template: `<div style="padding:70px;background:linear-gradient(130deg,#adc5f5,#d4b1dd,#acc7c9);border-radius:24px">
      <WGlassPanel v-bind="args" style="width:280px">
        <strong>Personal library</strong>
        <p style="line-height:1.5;margin:12px 0">Your creative components in one place.</p>
        <WButton variant="primary">Explore library</WButton>
      </WGlassPanel>
    </div>`,
  }),
} satisfies Meta<typeof WGlassPanel>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Strong: Story = { args: { blur: 'strong' } }
