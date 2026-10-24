import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WGradientCover } from '@weepwood/ui-vue'

const meta = {
  title: 'Creative/Gradient Cover',
  component: WGradientCover,
  tags: ['autodocs'],
  args: { title: 'Soft', subtitle: 'Gradient', variant: 'sunset' },
  argTypes: { variant: { control: 'select', options: ['sunset', 'clay', 'ocean', 'forest', 'violet', 'ember'] } },
  render: (args) => ({
    components: { WGradientCover },
    setup: () => ({ args }),
    template: '<div style="width:300px"><WGradientCover v-bind="args" /></div>',
  }),
} satisfies Meta<typeof WGradientCover>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const SixPalettes: Story = {
  render: () => ({
    components: { WGradientCover },
    setup: () => ({
      variants: ['sunset', 'clay', 'ocean', 'forest', 'violet', 'ember'],
      titles: ['Gentle', 'Muted', 'Deep', 'Quiet', 'Night', 'Warm'],
      subtitles: ['Sunset', 'Clay', 'Ocean', 'Forest', 'Violet', 'Ember'],
    }),
    template: `<div style="display:grid;grid-template-columns:repeat(3,1fr);gap:14px;width:min(90vw,840px)">
      <WGradientCover v-for="(variant, i) in variants" :key="variant" :variant="variant" :title="titles[i]" :subtitle="subtitles[i]" />
    </div>`,
  }),
  parameters: { layout: 'centered' },
}
