import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { WShaderBackground } from '@weepwood/ui-shaders'

const meta = {
  title: 'Effects/Shader Foundation',
  component: WShaderBackground,
  tags: ['autodocs'],
  parameters: { layout: 'fullscreen' },
  args: {
    colorA: '#101c39',
    colorB: '#5578df',
    angle: 135,
    quality: 'auto',
    motion: 'system',
    lazy: false,
    borderRadius: '15px',
  },
  argTypes: {
    colorA: { control: 'color' },
    colorB: { control: 'color' },
    angle: { control: { type: 'range', min: 0, max: 360, step: 5 } },
    quality: { control: 'select', options: ['auto', 'high', 'balanced', 'low', 'static'] },
    motion: { control: 'select', options: ['system', 'full', 'reduced'] },
  },
  render: (args) => ({
    components: { WShaderBackground },
    setup: () => ({ args }),
    template: `<div style="padding:32px;max-width:1100px;margin:auto">
      <WShaderBackground v-bind="args" style="min-height:320px">
        <div style="padding:64px 40px;color:#fff;text-shadow:0 1px 4px #12203e">
          <p style="font-size:12px;letter-spacing:0.2em">WEEPWOOD / SHADER FOUNDATION</p>
          <h2 style="margin:12px 0;font-size:36px">GPU when possible. Graceful otherwise.</h2>
          <p style="max-width:520px">This content stays readable when WebGPU is unsupported.</p>
        </div>
      </WShaderBackground>
    </div>`,
  }),
} satisfies Meta<typeof WShaderBackground>

export default meta
type Story = StoryObj<typeof meta>
export const Default: Story = {}
export const LowQuality: Story = { args: { quality: 'low' } }
export const StaticFallback: Story = { args: { quality: 'static' } }
export const ReducedMotion: Story = { args: { motion: 'reduced' } }
