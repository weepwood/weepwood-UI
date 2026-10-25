/**
 * Versioned backup format. The backup contains only catalogue repository IDs;
 * it never serializes arbitrary localStorage values or executable content.
 */
export const FAVORITES_BACKUP_SCHEMA = 'weepwood-ui/favorites'
export const FAVORITES_BACKUP_VERSION = 1
export const FAVORITES_MAX_BYTES = 256 * 1024

export type FavoriteImportMode = 'merge' | 'replace'

export interface FavoriteBackup {
  schema: typeof FAVORITES_BACKUP_SCHEMA
  version: typeof FAVORITES_BACKUP_VERSION
  exportedAt: string
  favorites: string[]
}

export interface FavoriteImportResult {
  ids: string[]
  ignoredIds: string[]
  duplicateCount: number
}

export function normalizeFavoriteIds(ids: readonly string[], knownIds: ReadonlySet<string>): string[] {
  return [...new Set(ids.filter(id => knownIds.has(id)))]
}

export function serializeFavorites(
  ids: readonly string[],
  knownIds: ReadonlySet<string>,
  exportedAt = new Date().toISOString(),
): string {
  const backup: FavoriteBackup = {
    schema: FAVORITES_BACKUP_SCHEMA,
    version: FAVORITES_BACKUP_VERSION,
    exportedAt,
    favorites: normalizeFavoriteIds(ids, knownIds),
  }
  return JSON.stringify(backup, null, 2) + '\n'
}

export function parseFavoritesBackup(
  text: string,
  knownIds: ReadonlySet<string>,
): FavoriteImportResult {
  if (new TextEncoder().encode(text).byteLength > FAVORITES_MAX_BYTES) {
    throw new Error('备份文件过大（最大 256 KiB）')
  }

  let json: unknown
  try {
    json = JSON.parse(text) as unknown
  } catch {
    throw new Error('文件不是有效 JSON')
  }
  if (typeof json !== 'object' || json === null || Array.isArray(json)) {
    throw new Error('备份内容必须是 JSON 对象')
  }

  const backup = json as Record<string, unknown>
  if (backup.schema !== FAVORITES_BACKUP_SCHEMA || backup.version !== FAVORITES_BACKUP_VERSION) {
    throw new Error('备份格式或版本不受支持')
  }
  if (!Array.isArray(backup.favorites) || backup.favorites.length > 1000
    || backup.favorites.some(id => typeof id !== 'string' || id.length > 200)) {
    throw new Error('favorites 必须是最多 1000 项的字符串数组')
  }

  const ids = backup.favorites as string[]
  const unique = [...new Set(ids)]
  return {
    ids: unique.filter(id => knownIds.has(id)),
    ignoredIds: unique.filter(id => !knownIds.has(id)),
    duplicateCount: ids.length - unique.length,
  }
}

export function applyFavoriteImport(
  current: readonly string[],
  imported: readonly string[],
  knownIds: ReadonlySet<string>,
  mode: FavoriteImportMode,
): string[] {
  const input = mode === 'replace' ? imported : [...current, ...imported]
  return normalizeFavoriteIds(input, knownIds)
}
