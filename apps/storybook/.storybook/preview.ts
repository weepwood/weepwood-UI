import type { Preview } from '@storybook/vue3-vite'
import '@weepwood/tokens/styles.css'
import './preview.css'

const preview: Preview = {
  parameters: {
    layout: 'centered',
    controls: { expanded: true },
  },
  initialGlobals: { theme: 'light', density: 'normal' },
  globalTypes: {
    density: {
      description: 'Design density',
      toolbar: {
        title: 'Density',
        icon: 'switchalt',
        dynamicTitle: true,
        items: [
          { value: 'normal', title: 'Normal' },
          { value: 'compact', title: 'Compact' },
          { value: 'comfortable', title: 'Comfortable' },
        ],
      },
    },
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
      document.documentElement.dataset.density = String(context.globals.density ?? 'normal')
      return story()
    },
  ],
}

export default preview
