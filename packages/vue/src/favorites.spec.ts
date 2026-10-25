import { describe, expect, it } from 'vitest'
import {
  applyFavoriteImport, parseFavoritesBackup, serializeFavorites, FAVORITES_MAX_BYTES,
} from '../../../apps/playground/src/data/favorites'

const known = new Set(['unovue/reka-ui', 'shadcn-ui/ui', 'lepoco/wpfui'])
describe('favorite backup portability', () => {
  it('round-trips known IDs, drops duplicates and ignores unknown IDs', () => {
    const contents = serializeFavorites(['unovue/reka-ui', 'unknown/repo', 'unovue/reka-ui'], known,
      '2026-10-25T00:00:00.000Z')
    const data = JSON.parse(contents)
    expect(data.schema).toBe('weepwood-ui/favorites')
    expect(data.version).toBe(1)
    expect(data.favorites).toEqual(['unovue/reka-ui'])
    expect(parseFavoritesBackup(contents, known).ids).toEqual(['unovue/reka-ui'])
  })
  it('never modifies state until caller applies a valid backup', () => {
    const imported = ['shadcn-ui/ui']
    expect(applyFavoriteImport(['unovue/reka-ui'], imported, known, 'merge'))
      .toEqual(['unovue/reka-ui', 'shadcn-ui/ui'])
    expect(applyFavoriteImport(['unovue/reka-ui'], imported, known, 'replace'))
      .toEqual(['shadcn-ui/ui'])
  })
  it('reports unknown IDs and duplicate count without silently adding them', () => {
    const result = parseFavoritesBackup(JSON.stringify({
      schema: 'weepwood-ui/favorites', version: 1,
      favorites: ['shadcn-ui/ui', 'elsewhere/library', 'shadcn-ui/ui'],
    }), known)
    expect(result.ids).toEqual(['shadcn-ui/ui'])
    expect(result.ignoredIds).toEqual(['elsewhere/library'])
    expect(result.duplicateCount).toBe(1)
  })
  it('rejects bad versions and invalid items safely', () => {
    expect(() => parseFavoritesBackup('{"schema":"weepwood-ui/favorites","version":2,"favorites":[]}', known))
      .toThrow('版本')
    expect(() => parseFavoritesBackup('not-json', known)).toThrow('JSON')
    expect(() => parseFavoritesBackup(JSON.stringify({
      schema: 'weepwood-ui/favorites', version: 1, favorites: [42],
    }), known)).toThrow('字符串数组')
    expect(() => parseFavoritesBackup(' '.repeat(FAVORITES_MAX_BYTES + 1), known)).toThrow('过大')
  })
})
