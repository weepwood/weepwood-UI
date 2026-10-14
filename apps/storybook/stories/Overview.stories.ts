import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { ref } from 'vue'
import {
  WButton, WIconButton, WBadge, WInput, WTextarea, WSelect,
  WSwitch, WCheckbox, WCard, WTabs, WDialog, WProgress,
  WAlert, WSeparator, WSkeleton, WEmptyState,
} from '@weepwood/ui-vue'
import './overview.css'

const meta = {
  title: 'Foundations/Component Gallery',
  parameters: { layout: 'fullscreen' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const InteractiveGallery: Story = {
  render: () => ({
    components: {
      WButton, WIconButton, WBadge, WInput, WTextarea, WSelect,
      WSwitch, WCheckbox, WCard, WTabs, WDialog, WProgress,
      WAlert, WSeparator, WSkeleton, WEmptyState,
    },
    setup() {
      return {
        name: ref('Weepwood UI'),
        notes: ref('Design systems help product teams build consistently.'),
        variant: ref('light'),
        enabled: ref(true),
        accepted: ref(false),
        active: ref('overview'),
        progress: ref(64),
        opened: ref(false),
        options: [{ label: 'Light', value: 'light' }, { label: 'Dark', value: 'dark' }],
        tabs: [
          { label: 'Overview', value: 'overview' },
          { label: 'Activity', value: 'activity' },
          { label: 'Restricted', value: 'restricted', disabled: true },
        ],
      }
    },
    template: `
      <main class="wu-gallery">
        <div class="wu-gallery__intro">
          <div class="wu-gallery__eyebrow">DESIGN SYSTEM / WEEPWOOD</div>
          <h1>Build with clarity.</h1>
          <p>A living library of accessible, theme-aware Vue components for web and desktop applications.</p>
          <div class="wu-gallery__badges"><WBadge tone="accent">Vue 3</WBadge><WBadge tone="success">16 components</WBadge><WBadge>TypeScript</WBadge></div>
        </div>
        <div class="wu-gallery__grid">
          <WCard title="Actions">
            <div class="wu-gallery__row"><WButton variant="primary" @click="opened = true">Create project</WButton><WButton>Cancel</WButton><WButton variant="ghost">Learn more</WButton><WIconButton label="Favorite">★</WIconButton></div>
          </WCard>
          <WCard title="Form fields">
            <div class="wu-gallery__form"><WInput v-model="name" label="Project name"/><WSelect v-model="variant" label="Style" :options="options"/><WTextarea v-model="notes" label="Notes" :rows="2"/></div>
          </WCard>
          <WCard title="Preferences">
            <div class="wu-gallery__form"><WSwitch v-model="enabled" label="Enable notifications"/><WCheckbox v-model="accepted" label="Accept changes"/><WProgress :value="progress" label="Sync progress" show-value/><WButton size="sm" @click="progress = Math.min(100, progress + 10)">Advance 10%</WButton></div>
          </WCard>
          <WCard title="Navigation">
            <WTabs v-model="active" label="Project pages" :items="tabs">
              <template #overview>Overview of {{ name }}</template>
              <template #activity>Recent activity and updates</template>
            </WTabs>
          </WCard>
          <WCard title="Feedback and loading">
            <div class="wu-gallery__form">
              <WAlert tone="success" title="Changes saved">Your workspace is up to date.</WAlert>
              <WSeparator />
              <div aria-busy="true" aria-label="Loading preview" class="wu-gallery__row"><WSkeleton width="44px" height="44px" shape="circle" /><WSkeleton width="190px" height="13px" /></div>
            </div>
          </WCard>
          <WCard title="Empty state">
            <WEmptyState title="No notifications" description="You're all caught up."><template #icon>◇</template><template #action><WButton size="sm">Explore projects</WButton></template></WEmptyState>
          </WCard>
        </div>
        <WDialog v-model="opened" title="New project">
          Use this dialog to confirm an action.
          <template #footer><WButton @click="opened = false">Cancel</WButton><WButton variant="primary" @click="opened = false">Create</WButton></template>
        </WDialog>
      </main>
    `,
  }),
}
