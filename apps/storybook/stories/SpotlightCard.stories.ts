import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WSpotlightCard } from '@weepwood/ui-vue'

const meta = {
  title: 'Creative/Spotlight Card',
  component: WSpotlightCard,
  tags: ['autodocs'],
  args: { title: 'Follow the light', description: 'Move your pointer across this card.' },
  render: (args) => ({
    components: { WSpotlightCard },
    setup: () => ({ args }),
    template: '<div style="width:380px"><WSpotlightCard v-bind="args" /></div>',
  }),
} satisfies Meta<typeof WSpotlightCard>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
