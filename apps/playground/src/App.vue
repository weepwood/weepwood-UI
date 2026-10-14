<script setup lang="ts">
import { ref, watch } from 'vue'
import { WButton, WBadge, WCard, WCheckbox, WInput, WSwitch } from '@weepwood/ui-vue'

const dark = ref(false)
const compact = ref(false)
const enabled = ref(true)
const accepted = ref(false)
const name = ref('Weepwood UI')
const count = ref(0)
watch(dark, value => { document.documentElement.dataset.theme = value ? 'dark' : 'light' }, { immediate: true })
watch(compact, value => { document.documentElement.dataset.density = value ? 'compact' : 'normal' }, { immediate: true })
</script>

<template>
  <main class="workbench">
    <header class="workbench__header">
      <div>
        <p class="eyebrow">WEEPWOOD / DESIGN SYSTEM</p>
        <h1>Component playground</h1>
        <p>Test your Vue components in a real app before shipping.</p>
      </div>
      <WBadge tone="accent">v0.1.0</WBadge>
    </header>
    <div class="workbench__preferences">
      <WSwitch v-model="dark" label="Dark mode" />
      <WSwitch v-model="compact" label="Compact density" />
    </div>
    <div class="workbench__grid">
      <WCard title="Actions" elevated>
        <div class="workbench__row">
          <WButton variant="primary" @click="count++">Clicked {{ count }} times</WButton>
          <WButton variant="secondary">Secondary</WButton>
          <WButton variant="ghost">Ghost</WButton>
        </div>
      </WCard>
      <WCard title="Form controls">
        <div class="workbench__form">
          <WInput v-model="name" label="Workspace" hint="Used to identify this project" placeholder="Project name" />
          <WSwitch v-model="enabled" label="Enable sync" />
          <WCheckbox v-model="accepted" label="Accept local changes" />
          <WBadge :tone="accepted ? 'success' : 'warning'">{{ accepted ? 'Ready to publish' : 'Pending approval' }}</WBadge>
        </div>
      </WCard>
    </div>
  </main>
</template>
