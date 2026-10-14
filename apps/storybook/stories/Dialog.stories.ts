import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import { WDialog, WButton } from '@weepwood/ui-vue'

const meta = {
  title: 'Components/Dialog',
  component: WDialog,
  tags: ['autodocs'],
  args: { title: 'Confirm action', closeLabel: 'Close dialog' },
  render: args => ({
    components: { WDialog, WButton },
    setup: () => ({ args, opened: ref(false) }),
    template: `
      <div>
        <WButton variant="primary" @click="opened = true">Open dialog</WButton>
        <WDialog v-bind="args" v-model="opened">
          <p style="margin:0;color:var(--wu-text-muted)">Changes will be saved to your workspace.</p>
          <template #footer>
            <WButton @click="opened = false">Cancel</WButton>
            <WButton variant="primary" @click="opened = false">Confirm</WButton>
          </template>
        </WDialog>
      </div>`,
  }),
} satisfies Meta<typeof WDialog>
export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
