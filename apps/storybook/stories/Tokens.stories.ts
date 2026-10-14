import type { Meta, StoryObj } from '@storybook/vue3-vite'

const tokens = [
  ['Accent', '--wu-accent'], ['Accent Muted', '--wu-accent-muted'],
  ['Canvas', '--wu-canvas'], ['Surface', '--wu-surface'], ['Hover', '--wu-surface-hover'],
  ['Text', '--wu-text'], ['Text Muted', '--wu-text-muted'],
  ['Border', '--wu-border'], ['Focus', '--wu-focus'],
  ['Success', '--wu-success'], ['Warning', '--wu-warning'], ['Danger', '--wu-danger'],
]

const meta = {
  title: 'Foundations/Tokens',
  parameters: { layout: 'fullscreen' },
} satisfies Meta
export default meta
type Story = StoryObj<typeof meta>

export const Colors: Story = {
  render: () => ({
    setup: () => ({ tokens }),
    template: `
    <section style="padding:24px;max-width:980px;font-family:var(--wu-font);color:var(--wu-text)">
      <h2 style="margin:0 0 4px">Semantic palette</h2>
      <p style="color:var(--wu-text-muted);margin:0 0 24px">These swatches always reflect the active Storybook theme.</p>
      <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px">
        <div v-for="[name, token] in tokens" :key="token" style="border:1px solid var(--wu-border);border-radius:12px;overflow:hidden;background:var(--wu-surface)">
          <div :style="{backgroundColor:'var('+token+')'}" style="height:78px;border-bottom:1px solid var(--wu-border)"></div>
          <div style="padding:12px 14px"><div style="font-size:13px;font-weight:650">{{ name }}</div><code style="font-size:11px;color:var(--wu-text-muted)">{{ token }}</code></div>
        </div>
      </div>
    </section>`,
  }),
}
export const Density: Story = {
  render: () => ({
    template: `
      <section style="max-width:620px;padding:24px;font-family:var(--wu-font);color:var(--wu-text)">
        <h2 style="margin-top:0">Density tokens</h2>
        <p style="color:var(--wu-text-muted)">Change the toolbar density to see the control height adjust.</p>
        <div style="height:var(--wu-control-height);min-width:220px;padding:0 14px;display:inline-flex;align-items:center;border-radius:var(--wu-radius-md);background:var(--wu-accent);color:var(--wu-on-accent);font-size:13px;font-weight:600">Control height: var(--wu-control-height)</div>
      </section>`,
  }),
}
