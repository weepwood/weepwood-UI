import { describe, expect, it } from 'vitest'
import {
  createStudioLink, createVueSnippet, readStudioState, studioDefaults,
} from '../../../apps/playground/src/data/studio'

describe('component inspector URL and usage snippets', () => {
  it('returns null for missing or unknown inspector selection', () => {
    expect(readStudioState('?page=resources')).toBeNull()
    expect(readStudioState('?studio=javascript')).toBeNull()
  })

  it('round-trips allowed properties through a URL', () => {
    const input = { ...studioDefaults, title: 'Soft & Warm', subtitle: 'Peach "Sunset"',
      width: 390, variant: 'sunset' as const }
    const link = createStudioLink('https://example.com/ui?unknown=1#gallery', input)
    expect(link).not.toContain('unknown=1')
    expect(link).not.toContain('#gallery')
    expect(readStudioState(new URL(link).search)).toEqual(input)
  })

  it('clamps width and unsupported variants and truncates untrusted text', () => {
    const value = readStudioState('?studio=gradient&variant=does-not-exist&width=99999&title=' + 'a'.repeat(200))
    expect(value?.variant).toBe(studioDefaults.variant)
    expect(value?.width).toBe(440)
    expect(value?.title).toHaveLength(100)
  })

  it('escapes characters that could otherwise break generated SFC attributes', () => {
    const code = createVueSnippet({
      ...studioDefaults, title: 'A & "B" <tag>', subtitle: 'less > more',
    })
    expect(code).toContain('title="A &amp; &quot;B&quot; &lt;tag&gt;"')
    expect(code).toContain('subtitle="less &gt; more"')
    expect(code).not.toContain('title="A & "B"')
  })

  it('renders valid code for other components and handles extra query parameters', () => {
    const glass = { ...studioDefaults, component: 'glass' as const,
      title: 'Frosted surface', blur: 'medium' as const, elevated: false }
    const code = createVueSnippet(glass)
    expect(code).toContain('<WGlassPanel blur="medium" :elevated="false">')
    const link = createStudioLink('https://example.com/', glass)
    const parsed = readStudioState(new URL(link).search)
    expect(parsed?.blur).toBe('medium')
    expect(parsed?.elevated).toBe(false)
    const spotlight = createVueSnippet({ ...studioDefaults, component: 'spotlight' })
    expect(spotlight).toContain('<WSpotlightCard')
  })
})
