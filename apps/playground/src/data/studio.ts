export type StudioComponent = 'gradient' | 'glass' | 'spotlight'
export type CoverVariant = 'sunset' | 'clay' | 'ocean' | 'forest' | 'violet' | 'ember'
export type GlassBlur = 'soft' | 'medium' | 'strong'
export type StudioAccent = 'blue' | 'violet' | 'mint' | 'coral'

export interface StudioState {
  component: StudioComponent
  variant: CoverVariant
  title: string
  subtitle: string
  blur: GlassBlur
  elevated: boolean
  description: string
  width: number
}

export const studioDefaults: StudioState = {
  component: 'gradient',
  variant: 'ocean',
  title: 'Deep',
  subtitle: 'Ocean',
  blur: 'strong',
  elevated: true,
  description: 'Move the pointer to reveal a subtle highlight.',
  width: 320,
}

export const componentChoices: { id: StudioComponent; label: string; description: string }[] = [
  { id: 'gradient', label: 'Gradient Cover', description: '纯 CSS 渐变与 Canvas 噪点' },
  { id: 'glass', label: 'Glass Panel', description: '语义色彩与磨砂玻璃质感' },
  { id: 'spotlight', label: 'Spotlight Card', description: '随指针变化的微妙聚光反馈' },
]
export const coverChoices: CoverVariant[] = ['sunset', 'clay', 'ocean', 'forest', 'violet', 'ember']
export const glassChoices: GlassBlur[] = ['soft', 'medium', 'strong']
export const accentChoices: { id: StudioAccent; label: string; hex: string }[] = [
  { id: 'blue', label: '蓝色', hex: '#5578df' },
  { id: 'violet', label: '薰衣草', hex: '#8a6acd' },
  { id: 'mint', label: '薄荷绿', hex: '#298b7a' },
  { id: 'coral', label: '珊瑚红', hex: '#c75d75' },
]

function oneOf<T extends string>(value: string | null, values: readonly T[], fallback: T): T {
  return values.find(choice => choice === value) ?? fallback
}

function short(value: string | null, fallback: string, max = 100): string {
  return value === null ? fallback : value.slice(0, max)
}

export function readStudioState(search: string): StudioState | null {
  const query = new URLSearchParams(search)
  const component = query.get('studio')
  if (!componentChoices.some(choice => choice.id === component)) return null

  const requestedWidth = Number(query.get('width'))
  return {
    component: component as StudioComponent,
    variant: oneOf(query.get('variant'), coverChoices, studioDefaults.variant),
    title: short(query.get('title'), studioDefaults.title),
    subtitle: short(query.get('subtitle'), studioDefaults.subtitle),
    blur: oneOf(query.get('blur'), glassChoices, studioDefaults.blur),
    elevated: query.get('elevated') === null ? studioDefaults.elevated : query.get('elevated') === 'true',
    description: short(query.get('description'), studioDefaults.description, 180),
    width: query.has('width') && Number.isFinite(requestedWidth)
      ? Math.round(Math.max(220, Math.min(440, requestedWidth)))
      : studioDefaults.width,
  }
}

function escapeAttribute(value: string): string {
  return value.replaceAll('&', '&amp;').replaceAll('"', '&quot;')
    .replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function createVueSnippet(state: StudioState): string {
  const componentName = state.component === 'gradient'
    ? 'WGradientCover' : state.component === 'glass' ? 'WGlassPanel' : 'WSpotlightCard'
  const lines = [
    '<script setup lang="ts">',
    "import { " + componentName + " } from '@weepwood/ui-vue'",
    "import '@weepwood/tokens/styles.css'",
    "import '@weepwood/ui-vue/styles.css'",
    '</script>',
    '',
    '<template>',
  ]
  if (state.component === 'gradient') {
    lines.push('  <WGradientCover', '    variant="' + state.variant + '"',
      '    title="' + escapeAttribute(state.title) + '"',
      '    subtitle="' + escapeAttribute(state.subtitle) + '"', '  />')
  } else if (state.component === 'glass') {
    lines.push('  <WGlassPanel blur="' + state.blur + '" :elevated="' + state.elevated + '">',
      '    ' + escapeAttribute(state.title || 'Frosted surface'),
      '  </WGlassPanel>')
  } else {
    lines.push('  <WSpotlightCard',
      '    title="' + escapeAttribute(state.title) + '"',
      '    description="' + escapeAttribute(state.description) + '"', '  />')
  }
  lines.push('</template>')
  return lines.join('\n')
}

export function createStudioLink(href: string, state: StudioState): string {
  const url = new URL(href)
  // Share only whitelisted settings rather than carrying unrelated query parameters.
  url.search = ''
  url.hash = ''
  url.searchParams.set('studio', state.component)
  if (state.component === 'gradient') {
    url.searchParams.set('variant', state.variant)
    url.searchParams.set('subtitle', state.subtitle)
  } else if (state.component === 'glass') {
    url.searchParams.set('blur', state.blur)
    url.searchParams.set('elevated', String(state.elevated))
  } else {
    url.searchParams.set('description', state.description)
  }
  url.searchParams.set('title', state.title)
  url.searchParams.set('width', String(state.width))
  return url.toString()
}
