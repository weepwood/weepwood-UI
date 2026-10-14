import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WCard, WButton, WBadge } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Card',
  component: WCard,
  tags: ['autodocs'],
  args: { title: 'Project overview', padded: true, elevated: false },
  render: (args) => ({
    components: { WCard, WButton, WBadge },
    setup: () => ({ args }),
    template: '<WCard v-bind="args" style="width:340px"><p style="margin:0;color:var(--wu-text-muted);font-size:13px">A reusable surface for content and actions.</p><template #footer><WBadge tone="success">Ready</WBadge></template></WCard>',
  }),
} satisfies Meta<typeof WCard>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const Elevated: Story = { args: { elevated: true } }
export const Flat: Story = { args: { padded: false } }
