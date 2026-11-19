<script setup lang="ts">
defineProps<{ name: string; size?: number }>()
const paths: Record<string, string> = {
  leaf: 'M12 21V9m0 6C5 15 3 11 3 5c5 0 9 2 9 8m0-4c0-4 4-7 9-7 0 6-3 10-9 10',
  grid: 'M3 3h7v7H3zm11 0h7v7h-7zM3 14h7v7H3zm11 0h7v7h-7z',
  box: 'm12 3 9 5v8l-9 5-9-5V8zm-9 5 9 5 9-5m-9 5v8',
  palette: 'M12 3a9 9 0 1 0 0 18h2a2 2 0 0 0 1-4 2 2 0 0 1 1-4h2a3 3 0 0 0 3-3c0-4-4-7-9-7ZM7 11h.01M10 7h.01M15 7h.01',
  book: 'M4 19V5a2 2 0 0 1 2-2h14v18H6a2 2 0 0 1 0-4h14M8 7h8m-8 4h6',
  arrow: 'M4 12h15m-6-6 6 6-6 6', external: 'M8 16 17 7M8 7h9v9',
  search: 'M11 17a6 6 0 1 0 0-12 6 6 0 0 0 0 12zm4-2 5 5',
  sun: 'M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8zm0-6v2m0 16v2M2 12h2m16 0h2M5 5l1 1m12 12 1 1m0-14-1 1M6 18l-1 1',
  moon: 'M20 15a8 8 0 0 1-11-11 9 9 0 1 0 11 11Z',
  chevron: 'm9 6 6 6-6 6', check: 'm5 12 4 4L19 6',
  github: 'M9 19c-4 1-4-2-6-2m13 4v-4a3 3 0 0 0-1-2c4 0 6-2 6-5a5 5 0 0 0-1-3c0-1 0-2-1-3-2 0-3 1-4 1a11 11 0 0 0-6 0C8 5 7 4 5 4c-1 1-1 2-1 3a5 5 0 0 0-1 3c0 3 2 5 6 5a3 3 0 0 0-1 2v4',
}
</script>
<template><svg :width="size ?? 18" :height="size ?? 18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path :d="paths[name]" /></svg></template>
