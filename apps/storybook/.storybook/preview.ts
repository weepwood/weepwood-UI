import type { Preview } from '@storybook/vue3-vite'
import '@weepwood/tokens/styles.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  initialGlobals: { theme: 'light' },
  globalTypes: {
    theme: {
      description: 'Component color theme',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        dynamicTitle: true,
        items: [
          { value: 'light', title: 'Fluent Light' },
          { value: 'dark', title: 'Fluent Dark' },
        ],
      },
    },
  },
  decorators: [
    (story, context) => {
      document.documentElement.dataset.theme = String(context.globals.theme ?? 'light')
      return story()
    },
  ],
}

export default preview
