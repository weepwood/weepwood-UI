import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { expect } from 'storybook/test'
import { WTabs } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Tabs',
  component: WTabs,
  tags: ['autodocs'],
  args: {
    label: 'Workspace sections',
    modelValue: 'overview',
    items: [
      { label: 'Overview', value: 'overview' },
      { label: 'Activity', value: 'activity' },
      { label: 'Restricted', value: 'restricted', disabled: true },
      { label: 'Settings', value: 'settings' },
    ],
  },
  render: args => ({
    components: { WTabs },
    setup: () => ({ args, selected: ref(args.modelValue) }),
    template: `
      <WTabs v-bind="args" v-model="selected" style="width:390px">
        <template #overview>Overview panel content</template>
        <template #activity>Recent activity</template>
        <template #settings>Workspace preferences</template>
      </WTabs>`,
  }),
} satisfies Meta<typeof WTabs>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}

/** Keyboard scenario: the disabled tab is skipped. */
export const KeyboardNavigation: Story = {
  play: async ({ canvas, userEvent }) => {
    const overview = canvas.getByRole('tab', { name: 'Overview' })
    await userEvent.click(overview)
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('tab', { name: 'Activity' })).toHaveAttribute('aria-selected', 'true')
    await userEvent.keyboard('{ArrowRight}')
    await expect(canvas.getByRole('tab', { name: 'Settings' })).toHaveAttribute('aria-selected', 'true')
  },
}
