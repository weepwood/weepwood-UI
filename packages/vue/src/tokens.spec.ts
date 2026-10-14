import { describe, expect, it } from 'vitest'
import { readFileSync } from 'node:fs'

describe('Design tokens isolation', () => {
  it('does not override consuming applications with global element resets', () => {
    const css = readFileSync(new URL('../../tokens/src/styles.css', import.meta.url), 'utf8')
    expect(css).not.toMatch(/(^|\n)\s*(body|button|input|textarea|select|\*)\s*\{/)
    expect(css).toContain('--wu-accent')
    expect(css).toContain('[data-theme="dark"]')
  })
})
