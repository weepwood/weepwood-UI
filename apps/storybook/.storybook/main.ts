import type { StorybookConfig } from '@storybook/vue3-vite'
import { mergeConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath, URL } from 'node:url'

const config: StorybookConfig = {
  stories: ['../stories/**/*.stories.ts'],
  addons: ['@storybook/addon-docs', '@storybook/addon-a11y'],
  framework: {
    name: '@storybook/vue3-vite',
    options: { docgen: 'vue-component-meta' },
  },
  docs: { autodocs: 'tag' },
  async viteFinal(config) {
    // Preview component source directly, so Storybook HMR never relies on dist/.
    return mergeConfig(config, {
      plugins: [vue()],
      resolve: {
        alias: {
          '@weepwood/ui-shaders': fileURLToPath(new URL('../../../packages/shaders/src/index.ts', import.meta.url)),
          '@weepwood/ui-vue': fileURLToPath(new URL('../../../packages/vue/src/index.ts', import.meta.url)),
        },
      },
    })
  },
}

export default config
